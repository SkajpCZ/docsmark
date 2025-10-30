const express = require('express');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItToc = require('markdown-it-toc-done-right');
const markdownItKatex = require('markdown-it-katex');
const markdownItTaskLists = require('markdown-it-task-lists');
const hljs = require('highlight.js');
const markdownItMultimdTable = require('markdown-it-multimd-table');
const toml = require('toml');

const VERSION = "1.0.1";

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const configFile = path.join(__dirname, 'settings.toml');
let siteSettings = {};

try {
  const tomlContent = fs.readFileSync(configFile, 'utf-8');
  siteSettings = toml.parse(tomlContent);
  console.log("Loaded settings:",siteSettings);
} catch (err) {
  console.error("Failed to load TOML settings:", err);
}

const docsDir = path.join(__dirname, 'docs');

function getDocsStructure(dir) {
  const categories = {};
  const folders = fs.readdirSync(dir, { withFileTypes: true });
  folders.forEach(folder => {
    if (folder.isDirectory()) {
      let files = fs.readdirSync(path.join(dir, folder.name))
        .filter(f => f.endsWith('.md'))
        .map(file => {
          const content = fs.readFileSync(path.join(dir, folder.name, file), 'utf-8');
          const { data } = matter(content);
          return { 
            file, 
            position: data.position || 999, 
            title: data.title || file,
            icon: data.icon || null
            };
        });
      files.sort((a, b) => a.position - b.position);
      categories[folder.name] = files;
    }
  });
  return categories;
}

// Homepage redirect
app.get('/', (req, res) => {
  const categories = getDocsStructure(docsDir);
  res.render('index', { categories, siteSettings, VERSION });
});

// Individual category page
app.get('/:category', (req, res) => {
  const { category } = req.params;
  const categories = getDocsStructure(docsDir);
  const categoryPath = path.join(docsDir, category);
  
  if (!fs.existsSync(categoryPath)) return res.status(404).send('Category not found');
  
  const categoryFiles = categories[category];
  const firstFile = categoryFiles[0];
  const filePath = path.join(category, firstFile.file);

  res.render('category', {
    title: category,
    categories,
    firstCategoryFile: firstFile,
    firstCategoryFilePath: filePath,
    currentCategory: category,
    siteSettings,
    VERSION
  });
});

// Individual doc page
app.get('/:category/:file', (req, res) => {
  const { category, file } = req.params;
  const categories = getDocsStructure(docsDir);
  const filePath = path.join(docsDir, category, file);

  if (!fs.existsSync(filePath)) return res.status(404).send('File not found');

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(raw);
  const tocHeadings = [];

  const md = new MarkdownIt({
    breaks: true,
    linkify: true,
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try { return `<pre class="hljs"><code>` + hljs.highlight(str, { language: lang }).value + `</code></pre>`; } catch (__) {}
      } return `<pre class="hljs"><code>` + md.utils.escapeHtml(str) + `</code></pre>`;
    }}).use(markdownItMultimdTable, { multiline: true, rowspan: true, headerless: true })
    .use(markdownItAnchor, {
    slugify: s => s
      .replace(/\/\//g, '').replace(/\\/g, '')  // Remove // anywhere
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove accents
      .replace(/[^\w\s-<>]/g, '')      // keep alphanumerics and allowed chars
      .replace(/\//g, '')              // remove slashes
      .trim()
      .replace(/\s+/g, '-')            // replace spaces with -
      .toLowerCase()}).use(markdownItToc).use(markdownItTaskLists, { enabled: true, label: true });

  // Collect headings h1-h3
  md.core.ruler.push('collect_headings', state => {
    state.tokens.forEach((token, idx) => {
      if (token.type === 'heading_open') {
        const level = parseInt(token.tag.slice(1));
        if (level <= 3) {
          const contentToken = state.tokens[idx + 1];
          let text = contentToken.content;
          text = text.replace(/\/\//g, '').replace(/\\/g, ''); // Remove // anywhere

          // Slug / id
          const slug = text
            .normalize("NFD")                         // remove accents
            .replace(/[\u0300-\u036f]/g, '')          // remove diacritics
            .replace(/[^\w\s-<>]/g, '')               // allow letters, digits, whitespace, dash, <, >
            .replace(/\//g, '')                       // remove slashes
            .trim()
            .replace(/\s+/g, '-')                     // replace spaces with -
            .toLowerCase();

          tocHeadings.push({ text, id: slug, level });

          token.attrs = token.attrs || [];
          token.attrs.push(['id', slug]);
        }
      }
    });
  });
  
  if (data.katex) md.use(markdownItKatex);

  const html = md.render(content);

  res.render('layout', {
    title: data.title || file,
    categories,
    body: html,
    currentFile: file,
    currentCategory: category,
    tocHeadings,
    siteSettings,
    VERSION
  });
});


const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log('Application started on port', port)
})