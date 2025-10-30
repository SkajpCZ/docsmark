---
position: 3
title: "Deployment"
toc: true
katex: true
---


# What do you need?

- Just [docker](https://www.docker.com/) and some text editor ([vs code](https://code.visualstudio.com/), [vim](https://www.vim.org/), [nvim](https://neovim.io/), [nano](https://www.nano-editor.org/), [emacs](https://www.gnu.org/software/emacs/), [notepad](https://apps.microsoft.com/detail/9msmlrh6lzf3?hl=en-us&gl=US), [excel](https://www.microsoft.com/en-us/microsoft-365/excel), ...)

- You can also just deploy it using [nodejs](https://nodejs.org/) and [npm](https://www.npmjs.com/package/npm) without [docker](https://www.docker.com/), but I dont really recommend it, you can just do it for a really quick test but its up to you.

- But i recommend going with [docker](https://www.docker.com/) because its guaranteed that it will work and its also better for setting it up with [nginx reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) for example (my usecase personally)

<br>

# Recommended deployment

## For setting up/testing purposes

- You just need docker really for this
- The website will be at http://localhost:8080/

>```bash
>cd docsmark
>docker compose up
>```

## For server deployment (or just somewhere permanent)

- You will want to customize the site a bit of course, to know more go to [Configuration docs](http://localhost:8080/Documentation/configuration.md)
- We will use basically the same command but with `-d` added, it means detached, so it will run background
>```bash
>cd docsmark
>docker compose up -d
>```

## Quick reminder when new version releases

- Once I release a new version you would want to run this command inside the directory, also you can add `-d` to have it run in the background
>```bash
>cd docsmark
>docker compose up --build
>```

<br>

# Other ways to deploy it

## Using nodejs and npm
- You will need at least the [version 22 of nodejs](https://nodejs.org/en/download), but its up to you (this is the same as in the Dockerfile)
- And also you need [npm](https://www.npmjs.com/package/npm), which you gotta install either from package manager or by running some scripts
- The default port is the same so the website will be at http://localhost:8080/
>```bash
>cd docsmark
>npm install
>npm start
>```
- You can also change the port on which the webpage will run with this
>```bash
>PORT=1234 npm start
>```

<br>

# Reverse proxies

- This project was built with reverse proxies in mind, I personally use [nginx reverse proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) with [certbot](https://certbot.eff.org/), but you can run use whaterver you want.

## nginx sample (works on my server)
>```bash
>server {
>    if ($host = docs.example.com) {
>        return 301 https://$host$request_uri;
>    } # managed by Certbot
>
>
>    listen 80;
>    server_name docs.example.com;
>
>    # Redirect HTTP to HTTPS
>    return 301 https://$host$request_uri;
>
>
>}
>
>server {
>    listen 443 ssl;
>    server_name docs.example.com;
>    include /etc/letsencrypt/options-ssl-nginx.conf;
>    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
>
>    # Your reverse proxy settings
>    location / {
>        proxy_pass http://localhost:8080;  # Change this to your internal server
>        proxy_set_header Host $host;
>        proxy_set_header X-Real-IP $remote_addr;
>        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
>        proxy_set_header X-Forwarded-Proto $scheme;
>    }
>
>
>
>    ssl_certificate /etc/letsencrypt/live/docs.example.com/fullchain.pem; # managed by Certbot
>    ssl_certificate_key /etc/letsencrypt/live/docs.example.com/privkey.pem; # managed by Certbot
>}
>```