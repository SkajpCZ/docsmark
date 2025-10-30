# docsmark | v1.0.0
Simple dockerized markdown documentation website written in nodejs



# Why docsmark?

I created this simple project because all of the available projects are just too complicated, bloated and just not good. This project aims to simplify making documentation with markdown.

# How docsmark?

Basically all you need to have is `docker`, and some text editor

The default port of the website is `8080`, so once you deploy it just visit `http://localhost:8080/` and you will be able to access the whole documentation of this project

### Edit the `settings.toml`

You will find here all of the quick settings like page title, descriptions, highlight color and other stuff.


### For testing the site out

```bash
cd docsmark
docker compose up
```

### Once you are happy with it, you can deploy it with

```bash
cd docsmark
docker compose up -d
```
the `-d` is just making it detached, so you can run it in the background


Keep in mind that all of the documentation for this project is available once you deploy it, you can just visit `http://localhost:8080/`


# When docsmark?

A lot of times you need documentation for your projects or something else, this is when you will want use my project. Its simple to setup, you can get it running in like 3 minutes. All you need to do is edit one toml file, add few images and also add the markdown documentation and you are all set.
