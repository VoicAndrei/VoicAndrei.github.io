# SEO and AEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a focused SEO and AI-retrieval layer to the public personal-site pages while explicitly excluding low-value side pages from indexing.

**Architecture:** Keep the existing static site structure and edit HTML files directly. Apply a consistent metadata pattern to indexable pages, add page-specific structured data where needed, create curated crawler files at the repo root, and mark excluded pages with explicit `noindex, nofollow`.

**Tech Stack:** Static HTML, existing CSS/JS assets, manual XML/text crawler files, local HTTP preview via `python3 -m http.server`

---

## File Map

### Modify

- `index.html`
  - Add homepage metadata, canonical URL, Open Graph/Twitter tags, `Person` and `WebSite` JSON-LD, and tighter intro copy.
- `blog/index.html`
  - Add metadata baseline and improve article summary text if needed.
- `blog/ai-powered-f1-leaderboard.html`
  - Add metadata baseline plus `Article` JSON-LD and related navigation.
- `blog/my-first-year-at-rebeldot.html`
  - Add metadata baseline plus `Article` JSON-LD and related navigation.
- `instagram/index.html`
  - Add metadata baseline.
- `cabana/index.html`
  - Add `noindex, nofollow`.
- `onyx-internship-test/index.html`
  - Add `noindex, nofollow`.
- `jailbreak_prompts/index.html`
  - Add `noindex, nofollow`.

### Create

- `robots.txt`
  - Allow normal crawl and point crawlers to the sitemap.
- `sitemap.xml`
  - List only the approved indexable pages with absolute `https://voic.ro` URLs.
- `llms.txt`
  - Provide a concise machine-readable guide to the best pages and topics.

### Reference During Implementation

- `docs/superpowers/specs/2026-03-29-seo-aeo-design.md`
  - Source-of-truth spec for scope and canonical URL policy.

## Shared Content Rules

- Canonical host is always `https://voic.ro`
- Section index pages use trailing slashes
- Article pages keep `.html` filenames in canonical URLs
- `og:url`, `canonical`, sitemap URLs, and `llms.txt` absolute links must all match
- Homepage and section pages may reuse `/images/sitethumbnail-modified.png` as the default share image
- Article pages should use their lead in-article image as `og:image` / `twitter:image`
- Blog article structured-data fields must use:
  - `author`: Voic Andrei
  - `datePublished`: value already present in each page’s `<time datetime="...">`
  - `image`: the first large in-article image already used near the top of the article

## Task 1: Add Repo-Level Crawl and AI Discovery Files

**Files:**
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `llms.txt`
- Reference: `docs/superpowers/specs/2026-03-29-seo-aeo-design.md`

- [ ] **Step 1: Review the spec sections for canonical URL policy and repo-level files**

Run:

```bash
sed -n '1,260p' docs/superpowers/specs/2026-03-29-seo-aeo-design.md
```

Expected: the spec confirms `https://voic.ro` as the only canonical host and lists `robots.txt`, `sitemap.xml`, and `llms.txt` in scope.

- [ ] **Step 2: Create `robots.txt` with the curated public crawl policy**

Add content equivalent to:

```txt
User-agent: *
Allow: /

Sitemap: https://voic.ro/sitemap.xml
```

- [ ] **Step 3: Create `sitemap.xml` with only the approved public URLs**

Include these exact URLs:

```xml
https://voic.ro/
https://voic.ro/blog/
https://voic.ro/blog/ai-powered-f1-leaderboard.html
https://voic.ro/blog/my-first-year-at-rebeldot.html
https://voic.ro/instagram/
```

Do not include `/cabana/`, `/onyx-internship-test/`, or `/jailbreak_prompts/`.

- [ ] **Step 4: Create `llms.txt` using the spec’s outline**

Include:

```txt
# voic.ro

Canonical profile and portfolio site for Voic Andrei, focused on AI, robotics, embedded systems, drones, hackathons, and engineering projects.

Start here:
- https://voic.ro/
- https://voic.ro/blog/

Best articles:
- https://voic.ro/blog/ai-powered-f1-leaderboard.html
- https://voic.ro/blog/my-first-year-at-rebeldot.html

Main topics:
- AI engineering
- robotics
- embedded systems
- drone technology
- hackathons
- engineering projects
```

- [ ] **Step 5: Verify the crawler files are present and contain only expected URLs**

Run:

```bash
sed -n '1,80p' robots.txt
sed -n '1,120p' sitemap.xml
sed -n '1,120p' llms.txt
```

Expected:
- `robots.txt` points to `https://voic.ro/sitemap.xml`
- `sitemap.xml` contains only the 5 approved URLs
- `llms.txt` contains only public-brand content

- [ ] **Step 6: Commit the repo-level discovery files**

Run:

```bash
git add robots.txt sitemap.xml llms.txt
git commit -m "add crawler discovery files"
```

Expected: commit succeeds with only the three new files staged.

## Task 2: Add Homepage SEO and AEO Metadata

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Inspect the current homepage head and intro copy**

Run:

```bash
sed -n '1,80p' index.html
```

Expected: homepage has a title and favicon but no description, no canonical tag, and no structured data.

- [ ] **Step 2: Add the homepage metadata baseline inside `<head>`**

Add:

```html
<meta name="description" content="Voic Andrei is an AI engineer and builder focused on robotics, embedded systems, drone technology, hackathons, and engineering projects." />
<link rel="canonical" href="https://voic.ro/" />
<meta property="og:title" content="Voic Andrei - AI Engineer, Robotics, and Embedded Systems" />
<meta property="og:description" content="Portfolio and personal site for Voic Andrei, featuring AI, robotics, embedded systems, drone projects, awards, and engineering writing." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://voic.ro/" />
<meta property="og:image" content="https://voic.ro/images/sitethumbnail-modified.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Voic Andrei - AI Engineer, Robotics, and Embedded Systems" />
<meta name="twitter:description" content="Portfolio and personal site for Voic Andrei, featuring AI, robotics, embedded systems, drone projects, awards, and engineering writing." />
<meta name="twitter:image" content="https://voic.ro/images/sitethumbnail-modified.png" />
```

- [ ] **Step 3: Add homepage JSON-LD for `Person` and `WebSite`**

Add a `<script type="application/ld+json">` block with:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "name": "Voic Andrei",
      "url": "https://voic.ro/",
      "email": "mailto:andrei@voic.ro",
      "jobTitle": "AI Engineer",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "RO"
      },
      "knowsAbout": [
        "Artificial Intelligence",
        "Robotics",
        "Embedded Systems",
        "Drone Technology"
      ]
    },
    {
      "@type": "WebSite",
      "name": "voic.ro",
      "url": "https://voic.ro/"
    }
  ]
}
```

- [ ] **Step 4: Tighten the homepage intro copy without changing layout**

Update the visible hero/about text so it clearly states:
- AI engineer
- robotics
- embedded systems
- drone technology
- projects and hackathons

Do not turn it into keyword stuffing or alter the site layout.

- [ ] **Step 5: Add stronger internal links to content that proves the brand**

Ensure the homepage visibly links to:
- `/blog/`
- the two blog posts, directly or via a featured section
- a few flagship projects already visible on the page

Keep this lightweight and in the existing style.

- [ ] **Step 6: Verify homepage metadata and copy**

Run:

```bash
rg -n "description|canonical|og:|twitter:|application/ld\\+json|AI engineer|robotics|embedded" index.html
```

Expected:
- homepage description exists
- canonical URL is `https://voic.ro/`
- OG/Twitter tags exist
- JSON-LD exists
- updated copy contains the intended identity signals

- [ ] **Step 7: Commit the homepage changes**

Run:

```bash
git add index.html
git commit -m "improve homepage seo metadata"
```

Expected: commit succeeds with only homepage changes staged.

## Task 3: Add Metadata to Blog Index and Instagram Page

**Files:**
- Modify: `blog/index.html`
- Modify: `instagram/index.html`

- [ ] **Step 1: Inspect both page heads**

Run:

```bash
sed -n '1,60p' blog/index.html
sed -n '1,60p' instagram/index.html
```

Expected: both pages have titles but no description, canonical, OG, or Twitter metadata.

- [ ] **Step 2: Add metadata baseline to `blog/index.html`**

Add:

```html
<meta name="description" content="Articles by Voic Andrei about AI engineering, robotics, project building, and technical experiments." />
<link rel="canonical" href="https://voic.ro/blog/" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://voic.ro/blog/" />
<meta property="og:image" content="https://voic.ro/images/sitethumbnail-modified.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://voic.ro/images/sitethumbnail-modified.png" />
```

Also set matching title/description values for `og:title`, `og:description`, `twitter:title`, and `twitter:description`.

- [ ] **Step 3: Add metadata baseline to `instagram/index.html`**

Add:

```html
<meta name="description" content="Voicstagram is a visual gallery by Voic Andrei with selected photos and personal moments." />
<link rel="canonical" href="https://voic.ro/instagram/" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://voic.ro/instagram/" />
<meta property="og:image" content="https://voic.ro/images/sitethumbnail-modified.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://voic.ro/images/sitethumbnail-modified.png" />
```

Also set matching title/description values for `og:title`, `og:description`, `twitter:title`, and `twitter:description`.

- [ ] **Step 4: Improve the visible summaries only if they are too thin**

If `blog/index.html` uses article cards with very short or missing summaries, expand them just enough to describe the article topics more clearly. Do not redesign the listing.

- [ ] **Step 5: Verify both files contain the new metadata**

Run:

```bash
rg -n "description|canonical|og:|twitter:" blog/index.html instagram/index.html
```

Expected: both files now expose the full metadata baseline.

- [ ] **Step 6: Commit the blog-index and Instagram changes**

Run:

```bash
git add blog/index.html instagram/index.html
git commit -m "add metadata to content hubs"
```

Expected: commit succeeds with only these two files staged.

## Task 4: Add Article Metadata and Structured Data to Blog Posts

**Files:**
- Modify: `blog/ai-powered-f1-leaderboard.html`
- Modify: `blog/my-first-year-at-rebeldot.html`

- [ ] **Step 1: Inspect each article’s existing title, description, date, and lead image**

Run:

```bash
sed -n '1,80p' blog/ai-powered-f1-leaderboard.html
sed -n '1,80p' blog/my-first-year-at-rebeldot.html
```

Expected:
- each article already has a title and description
- each article already exposes a publish date in `<time datetime="...">`
- each article already has a top image suitable for sharing

- [ ] **Step 2: Add canonical, Open Graph, and Twitter tags to the F1 article**

Use:

```html
<link rel="canonical" href="https://voic.ro/blog/ai-powered-f1-leaderboard.html" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://voic.ro/blog/ai-powered-f1-leaderboard.html" />
<meta property="og:image" content="https://voic.ro/images/projects/f1-leaderboard-shop.jpeg" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://voic.ro/images/projects/f1-leaderboard-shop.jpeg" />
```

Also set matching title/description values for `og:title`, `og:description`, `twitter:title`, and `twitter:description`.

- [ ] **Step 3: Add `Article` JSON-LD to the F1 article**

Include fields equivalent to:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Building an F1 Racing Leaderboard with AI - Voic Andrei",
  "author": {
    "@type": "Person",
    "name": "Voic Andrei"
  },
  "datePublished": "2025-07-25",
  "description": "How I built a complete F1 racing simulator leaderboard application using only AI tools - Gemini 2.5 Pro for planning and Claude Sonnet 3.7 in Cursor for development.",
  "image": "https://voic.ro/images/projects/f1-leaderboard-shop.jpeg",
  "mainEntityOfPage": "https://voic.ro/blog/ai-powered-f1-leaderboard.html"
}
```

- [ ] **Step 4: Add canonical, Open Graph, and Twitter tags to the RebelDot article**

Use:

```html
<link rel="canonical" href="https://voic.ro/blog/my-first-year-at-rebeldot.html" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://voic.ro/blog/my-first-year-at-rebeldot.html" />
<meta property="og:image" content="https://voic.ro/images/blog_1_year_at_rebeldot/me_at_rebel_times.png" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://voic.ro/images/blog_1_year_at_rebeldot/me_at_rebel_times.png" />
```

Also set matching title/description values for `og:title`, `og:description`, `twitter:title`, and `twitter:description`.

- [ ] **Step 5: Add `Article` JSON-LD to the RebelDot article**

Include fields equivalent to:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "My First Year at RebelDot - Voic Andrei",
  "author": {
    "@type": "Person",
    "name": "Voic Andrei"
  },
  "datePublished": "2025-10-30",
  "description": "A reflection on my first year at RebelDot - from intern to AI Engineer, building projects, winning hackathons, speaking at events, and exploring the intersection of AI, robotics, and creativity.",
  "image": "https://voic.ro/images/blog_1_year_at_rebeldot/me_at_rebel_times.png",
  "mainEntityOfPage": "https://voic.ro/blog/my-first-year-at-rebeldot.html"
}
```

- [ ] **Step 6: Add lightweight related navigation to both article pages**

Add a small, existing-style block near the end of each article that links to:
- `/blog/`
- the other blog article
- homepage if it fits naturally

Do not add a new component system or redesign the pages.

- [ ] **Step 7: Verify article metadata and structured data**

Run:

```bash
rg -n "canonical|og:|twitter:|application/ld\\+json|datePublished|mainEntityOfPage" blog/ai-powered-f1-leaderboard.html blog/my-first-year-at-rebeldot.html
```

Expected: both articles expose canonical, OG/Twitter, and `Article` JSON-LD with the correct date and image fields.

- [ ] **Step 8: Commit the article-page changes**

Run:

```bash
git add blog/ai-powered-f1-leaderboard.html blog/my-first-year-at-rebeldot.html
git commit -m "add article seo metadata"
```

Expected: commit succeeds with only the two article files staged.

## Task 5: Exclude Non-Public Pages from Search

**Files:**
- Modify: `cabana/index.html`
- Modify: `onyx-internship-test/index.html`
- Modify: `jailbreak_prompts/index.html`

- [ ] **Step 1: Inspect the `<head>` of all excluded pages**

Run:

```bash
sed -n '1,30p' cabana/index.html
sed -n '1,30p' onyx-internship-test/index.html
sed -n '1,30p' jailbreak_prompts/index.html
```

Expected: none of these pages currently contain a robots meta tag excluding indexing.

- [ ] **Step 2: Add `noindex, nofollow` to all excluded pages**

Insert inside each page’s `<head>`:

```html
<meta name="robots" content="noindex, nofollow" />
```

Do not add canonical, OG, or structured data to these pages.

- [ ] **Step 3: Verify the excluded pages contain only the robots exclusion marker**

Run:

```bash
rg -n "name=\"robots\"|canonical|og:|twitter:|application/ld\\+json" cabana/index.html onyx-internship-test/index.html jailbreak_prompts/index.html
```

Expected:
- each page contains `meta name="robots" content="noindex, nofollow"`
- none of the files gain indexable metadata by mistake

- [ ] **Step 4: Commit the exclusion changes**

Run:

```bash
git add cabana/index.html onyx-internship-test/index.html jailbreak_prompts/index.html
git commit -m "exclude side pages from indexing"
```

Expected: commit succeeds with only the three excluded pages staged.

## Task 6: End-to-End Verification

**Files:**
- Modify: none
- Verify: all files changed in Tasks 1-5

- [ ] **Step 1: Review the complete diff before local preview**

Run:

```bash
git diff --stat HEAD~5..HEAD
git diff -- robots.txt sitemap.xml llms.txt index.html blog/index.html blog/ai-powered-f1-leaderboard.html blog/my-first-year-at-rebeldot.html instagram/index.html cabana/index.html onyx-internship-test/index.html jailbreak_prompts/index.html
```

Expected: diff only contains metadata, crawler files, lightweight copy/link adjustments, and `noindex` for excluded pages.

- [ ] **Step 2: Start the site locally**

Run:

```bash
python3 -m http.server 8000
```

Expected: local preview available at `http://localhost:8000/`.

- [ ] **Step 3: Manually inspect the public pages in a browser**

Check:
- `http://localhost:8000/`
- `http://localhost:8000/blog/`
- `http://localhost:8000/blog/ai-powered-f1-leaderboard.html`
- `http://localhost:8000/blog/my-first-year-at-rebeldot.html`
- `http://localhost:8000/instagram/`

Expected:
- no broken layout
- no console errors caused by metadata edits
- visible copy still reads naturally

- [ ] **Step 4: Manually inspect the excluded pages**

Check:
- `http://localhost:8000/cabana/`
- `http://localhost:8000/onyx-internship-test/`
- `http://localhost:8000/jailbreak_prompts/`

Expected: pages still function, but source contains `noindex, nofollow`.

- [ ] **Step 5: Verify crawler files and metadata one final time**

Run:

```bash
rg -n "canonical|og:url|twitter:image|application/ld\\+json|name=\"robots\"" index.html blog/index.html blog/ai-powered-f1-leaderboard.html blog/my-first-year-at-rebeldot.html instagram/index.html cabana/index.html onyx-internship-test/index.html jailbreak_prompts/index.html
```

Expected:
- public pages expose metadata and structured data
- excluded pages expose only `noindex, nofollow`

- [ ] **Step 6: Create a final verification commit if any fixes were needed**

Run:

```bash
git add .
git commit -m "finalize seo and aeo updates"
```

Expected: only verification-driven follow-up edits are included.
