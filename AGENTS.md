# Repository Guidelines

## Project Structure & Module Organization
The root `index.html` renders the main personal site. Subdirectories `blog/`, `cabana/`, `instagram/`, and `onyx-internship-test/` host niche pages; keep new sections in their own folder and mirror the existing link structure. Shared assets live in `assets/` (compiled CSS in `assets/css`, authored Sass in `assets/sass`, ES5 scripts in `assets/js`, fonts in `assets/webfonts`). Place images in `images/` or the relevant gallery subfolder; large photo sets under `instagram/photos` should retain the timestamped naming used today.

## Build, Test, and Development Commands
`python3 -m http.server 8000` — serve the site locally from the repo root and preview via http://localhost:8000/.
`sass assets/sass/main.scss assets/css/main.css` — rebuild the primary stylesheet after changing any Sass partial.
`sass --watch assets/sass/main.scss:assets/css/main.css` — watch Sass sources and auto-compile while iterating on styles.

## Coding Style & Naming Conventions
Match the existing tab-based indentation in HTML, Sass, and JS files, keeping attribute values in double quotes and wrapping long text at logical breakpoints. Extend Sass by adding partials beneath `assets/sass/libs/` and importing them through `main.scss`; keep variables and palette tweaks inside `_vars.scss`. JavaScript enhancements should sit in `assets/js/main.js` and follow the current jQuery IIFE pattern. Name new images with `YYYYMMDD_label.ext` to stay consistent with gallery assets.

## Testing Guidelines
There is no automated suite, so run the local server and click through `index.html`, `blog/index.html`, and `instagram/index.html` on desktop and mobile breakpoints, checking the developer console for errors. After Sass changes, confirm `assets/css/main.css` is regenerated and minify if needed. When adding media, verify lightbox behavior and download sizes before publishing.

## Commit & Pull Request Guidelines
Write short, imperative commit messages similar to `git commit -m "update cv link"`; group unrelated work into separate commits. Pull requests should summarize the intent, list the pages or assets touched, and note manual checks performed. Attach before/after screenshots for layout or gallery updates and mention any new external dependencies or tracking scripts so reviewers can audit them quickly.
