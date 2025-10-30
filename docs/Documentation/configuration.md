---
position: 4
title: "Configuration"
toc: true
katex: true
---


# Quickstart

- The configuration of the website is in `/settings.toml`, it uses a [toml file format](https://toml.io/en/).
- If you want to just test this project, you dont need to touch it.

# Sample config

- For the time you will mess up your configuration, you can reference this one.
>```toml
>[global]
>site-prefix = "Docsmark"
>site-favicon = "/assets/favicon.ico"
>highlight-color = "#4fc3f7"
>
>[meta]
>meta-description = "The official Docsmark Documentation"
># Facebook
>facebook-url = "http://localhost:8080"
>facebook-type = "website"
>facebook-title = "Docsmark Documentation"
>facebook-description = "http://localhost:8080"
>facebook-image = ""
># Twitter
>twitter-card = "summary_large_image"
>twitter-domain = "localhost:8080"
>twitter-url = "http://localhost:8080"
>twitter-title = "Docsmark"
>twitter-description = "Docsmark Documentation"
>twitter-image = ""
>
>[navbar]
>home-button = "Docsmark"
>
>[homepage]
>title = "Docsmark"
>description = "The official Docsmark Documentation"
>```

<br>

# The whole configuration

## Global
- In this part we will look into this part of the config.
>```toml
>[global]
>site-prefix = "Docsmark"
>site-favicon = "/assets/favicon.ico"
>highlight-color = "#4fc3f7"
>```
### site-prefix
- Its just the site name in the tab, if you have this project deployed and you just visit the page on http://localhost:8080/, just look on the tab and you will see `Docsmark` in there.
- Also when you are in the documentation, it will be prefix (so thats why its called site-prefix) - it will look like this `site-prefix | docs site`.
- Example: `Docsmark | Configuration`
### site-favicon
- It just sets the site icon that you will see in the tab, now its a cat that I like nothing more, nothing less, you can put there whatever you want.
- This just specifies the path, you dont even need to have it in assets folder, but you need to have in the `public` folder, otherwise you cant access it
- Example: `/assets/favicon.ico`
### hightlight-color
- Sets the highlight color that the site will use in the css.
- You can use only hex maybe in the future I will add the support for rgb too.
- Example: `#4fc3f7`

## Meta
- These settings define the metadata used for SEO and social previews. Also it creates the embed message, that is kinda cool to have tbh.
>```toml
>[meta]
>meta-description = "The official Docsmark Documentation"
># Facebook
>facebook-url = "http://localhost:8080"
>facebook-type = "website"
>facebook-title = "Docsmark Documentation"
>facebook-description = "http://localhost:8080"
>facebook-image = ""
># Twitter
>twitter-card = "summary_large_image"
>twitter-domain = "localhost:8080"
>twitter-url = "http://localhost:8080"
>twitter-title = "Docsmark"
>twitter-description = "Docsmark Documentation"
>twitter-image = ""
>```

## Navbar
>```toml
>[navbar]
>home-button = "Docsmark"
>```

### home-button
- Just the text that will bring you home, its on the left of the sidebar
- Example: `Docsmark`

## Homepage
>```toml
>[homepage]
>title = "Docsmark"
>description = "The official Docsmark Documentation"
>```
### title
- The title of the homepage
- Example: `Docsmark`

### description
- The description of the homepage
- Example: `The official Docsmark Documentation`