---
position: 1
title: "Syntax Cheatsheet"
toc: true
katex: true
---


## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Text Formatting

```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
> Blockquote
\*This text is not italic\*
```

**Bold text**  
*Italic text*  
***Bold and italic***  
~~Strikethrough~~  
`Inline code`

> This is a blockquote.

\*This text is not italic\*

---

## Lists

```markdown
- Item 1
- Item 2
  - Nested item
    - Sub-item

1. First
2. Second
3. Third
```

- Item 1
- Item 2
  - Nested item
    - Sub-item

1. First  
2. Second  
3. Third

---

## Links

```markdown
[Website for project](http://localhost:8080)
<https://example.com>
```

[Website for project](http://localhost:8080) 
<https://example.com>

---

## Images

```markdown
![Alt text](/images/cat.png)
![Alt text - missing image](/images/not_existing_image.png)
```

![Example image](/images/cat.png)
![Alt text - missing image](/images/not_existing_image.png)

Two images side by side (HTML):

```html
<p>
  <img src="/images/cat.png" width="45%">
  <img src="/images/cat.png" width="45%">
</p>
```

---

## Code Blocks

```markdown
    ```javascript
    function greet(name) {
    return `Hello, ${name}!`;
    }
    ```
```


```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

---

## Tables

```markdown
| Name | Role | Age |
|------|------|-----:|
| John | Dev  |  28  |
| Anna | QA   |  25  |
```

| Name | Role | Age |
|------|------|-----:|
| John | Dev  |  28  |
| Anna | QA   |  25  |

---

## Task Lists

```markdown
- [x] Write documentation  
- [ ] Add more examples
```

- [x] Write documentation  
- [ ] Add more examples

---

## Horizontal Rule

```markdown
---
```

---

---

## KaTeX (Math)

```markdown
Inline math: $E = mc^2$

Block math:
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

Inline math: $E = mc^2$

Block math:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

<br>

---

## HTML Support

```html
<div style="color: blue;">This is raw HTML content.</div>
```

<div style="color: blue;">This is raw HTML content.</div>
