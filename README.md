# VoicAndrei.github.io

Personal website for **Andrei Voic**.

- Live: https://voicandrei.github.io/
- Sections: home, blog, projects, and **Voicstagram** (a simple photo gallery).

## Repo structure (high level)

- `index.html` — main landing page
- `assets/` — CSS/JS/fonts + template assets
- `images/` — site images and project media
- `blog/` — blog pages
- `instagram/` — **Voicstagram**
  - `instagram/index.html` — gallery page
  - `instagram/photos/` — gallery images

## Local development

This is a static site. Any local web server works.

### Option A: Python
```bash
python3 -m http.server 8080
```
Open: http://127.0.0.1:8080

### Option B: Node
```bash
npx serve .
```

## Deploy

This repo is published via **GitHub Pages**.

- Default flow: open a PR and merge (branch protection is enabled).
- Once merged to the publishing branch, GitHub Pages updates the site.

## Updating Voicstagram

1. Add an image to `instagram/photos/`
2. Add a new `<article>` entry in `instagram/index.html` under the right year section
3. Open a PR

## Credits

The base site theme started from **Strata by HTML5 UP**.
See `README.txt` for original template notes/credits.
