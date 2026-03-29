# SEO and AI Retrieval Optimization Design

Date: 2026-03-29
Project: `voic.ro` personal website
Status: Approved design, ready for planning after spec review and user signoff

## Goal

Improve discoverability for a combination of:

- personal brand searches for Voic Andrei
- portfolio and project credibility
- blog/article visibility
- AI retrieval and citation quality

The website should present a clear, high-signal public surface for search engines and AI systems without over-optimizing the site or turning it into a content-heavy SEO project.

## Desired Outcome

After this work:

- search engines should get complete metadata for the pages that matter
- social platforms should render better page previews
- AI systems should be able to identify the site as the canonical source for Voic Andrei's profile, projects, and articles
- irrelevant side pages should stop competing for crawl/index attention

## In Scope

Indexable pages:

- `/`
- `/blog/`
- `/blog/ai-powered-f1-leaderboard.html`
- `/blog/my-first-year-at-rebeldot.html`
- `/instagram/` as a lower-priority but still indexable page

Excluded from search/index strategy:

- `/cabana/`
- `/onyx-internship-test/`
- `/jailbreak_prompts/`

Global crawl/config files:

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`

## Out of Scope

- redesigning the site layout
- adding new project pages or a CMS
- building automation around sitemap generation
- aggressive keyword targeting or programmatic SEO
- backlink work, Search Console setup, or off-site distribution

## Current State Summary

The site already has:

- page titles across the main pages
- meta descriptions on the two blog article pages
- crawlable visible text and many images with `alt` text
- analytics instrumentation

The site does not currently have a deliberate SEO/AEO layer:

- homepage meta description is missing
- canonical tags are missing
- Open Graph and Twitter metadata are missing
- structured data is missing
- `robots.txt`, `sitemap.xml`, and `llms.txt` are missing
- excluded side pages are not intentionally de-emphasized

## Strategy

Use a hybrid strategy centered on canonical personal-brand signaling:

1. Establish the homepage as the canonical entity source for Voic Andrei.
2. Add the standard technical SEO baseline on all indexable pages.
3. Add structured data for the homepage and blog articles.
4. Limit crawl/index attention to the pages that support the personal brand, portfolio, and blog goals.
5. Add a lightweight AI-facing retrieval layer through better copy, structured data, and `llms.txt`.

This approach keeps the implementation small and static-site friendly while improving branded discovery, long-tail article visibility, and machine understanding.

## Canonical URL Policy

Use one canonical host and one path convention everywhere:

- canonical host: `https://voic.ro`
- do not use `https://www.voic.ro`
- homepage canonical: `https://voic.ro/`
- section index pages use trailing slashes: `https://voic.ro/blog/` and `https://voic.ro/instagram/`
- file-based article pages keep their filename form: `https://voic.ro/blog/ai-powered-f1-leaderboard.html` and `https://voic.ro/blog/my-first-year-at-rebeldot.html`

Apply this same policy consistently across:

- `link rel="canonical"`
- Open Graph URLs
- sitemap entries
- any absolute URLs listed in `llms.txt`

## Page-Level Design

### Homepage

Purpose:

- act as the canonical profile and portfolio landing page
- explain who Voic Andrei is in language suitable for both humans and machine retrieval

Changes:

- add a meta description
- add a canonical URL
- add Open Graph metadata
- add Twitter card metadata
- add `Person` JSON-LD
- add `WebSite` JSON-LD if useful alongside `Person`
- tighten hero/about copy so it explicitly describes AI, robotics, embedded systems, drones, hackathons, and portfolio work
- improve internal links toward blog and flagship projects

Expected result:

- stronger branded search snippets
- better identity resolution by AI systems
- better preview cards when the homepage is shared

### Blog Index

Purpose:

- act as the content hub for articles related to AI, engineering, robotics, and project stories

Changes:

- add meta description
- add canonical URL
- add Open Graph metadata
- add Twitter card metadata
- ensure each visible article entry has a concise, descriptive summary

Expected result:

- stronger topical signal for the blog as a content section
- improved crawl/navigation path into the article pages

### Blog Articles

Purpose:

- maximize article clarity, shareability, and machine understanding

Changes:

- keep the existing descriptions
- add canonical URLs
- add Open Graph metadata
- add Twitter card metadata
- add `Article` JSON-LD with headline, description, author, date published, and primary image
- add lightweight related-navigation links where appropriate

Expected result:

- better article snippets
- better social previews
- stronger AI citation and summarization quality

### Instagram Page

Purpose:

- remain publicly visible, but secondary to the homepage and blog

Changes:

- add the same metadata baseline as other indexable pages
- keep descriptions concise and accurate

Expected result:

- cleaner indexing without over-investing in a lower-priority page

### Excluded Pages

Pages:

- `/cabana/`
- `/onyx-internship-test/`
- `/jailbreak_prompts/`

Changes:

- add `meta name="robots" content="noindex, nofollow"` to each page
- exclude them from `sitemap.xml`
- avoid routing internal brand-significant links toward them

Expected result:

- reduced crawl/index noise
- clearer site focus around the pages that matter

## Repo-Level Files

### robots.txt

Purpose:

- provide a simple crawler policy and point crawlers to the sitemap

Design:

- allow normal crawling of the public site
- reference the canonical sitemap location
- avoid unnecessary complexity

### sitemap.xml

Purpose:

- advertise only the pages intended for indexing

Design:

- include homepage, blog index, both blog articles, and Instagram page
- omit the excluded side pages
- keep the sitemap intentionally small and curated

### llms.txt

Purpose:

- provide a compact machine-readable guide for AI systems and agentic tools

Design:

- identify the site owner and site purpose
- list the best pages to read first
- emphasize homepage, blog index, and the two flagship blog posts
- optionally reference major portfolio sections if they are clearly addressable

Proposed outline:

- site name and owner
- one short paragraph describing the site as the canonical profile and portfolio for Voic Andrei
- a short "Start here" list with homepage and blog index
- a short "Best articles" list with the two blog posts
- a short "Main topics" list such as AI, robotics, embedded systems, drones, hackathons, and engineering projects

## Metadata Pattern

Each indexable page should have a consistent metadata pattern appropriate to its content:

- `<title>`
- `meta name="description"`
- `link rel="canonical"`
- Open Graph title, description, URL, type, and image
- Twitter card title, description, and image

Structured data should be page-specific:

- homepage: `Person` and possibly `WebSite`
- article pages: `Article`

No structured data is needed on excluded pages.

Image strategy should also be consistent:

- homepage and section pages may reuse the existing site thumbnail if no better dedicated share asset exists
- article pages should prefer a representative in-article hero image
- `og:image` and `twitter:image` should always use absolute `https://voic.ro/...` URLs

## Content Adjustments

The copy changes should be minimal and intentional.

Homepage copy should make the following ideas explicit:

- AI engineer
- robotics
- embedded systems
- drone technology
- hackathons, talks, and engineering projects
- Romania / Cluj context if it reads naturally

The goal is not keyword stuffing. The goal is to make the homepage more quoteable and easier for both search engines and AI systems to summarize correctly.

## Internal Linking

Internal linking should support the information architecture without adding clutter.

Preferred direction:

- homepage links toward blog and flagship project proofs
- blog index links into both articles
- article pages link back to blog index and, if appropriate, to relevant project references

This keeps the public site centered on identity, proof, and content.

## Risks

Main risks:

- homepage copy becomes unnatural or too optimized
- metadata becomes inconsistent across pages
- canonicals point to the wrong URLs
- excluded pages remain indexable through omission or inconsistent markup
- structured data is technically present but semantically weak

## Verification

Manual verification is sufficient for this static site.

Required checks:

- inspect the final HTML head for each page class
- confirm excluded pages contain `noindex, nofollow`
- confirm only desired pages appear in `sitemap.xml`
- confirm `robots.txt` references the sitemap
- confirm homepage exposes the intended `Person` data
- confirm article pages expose the intended `Article` data
- confirm social preview tags are present on indexable pages
- run the site locally and spot-check key pages on desktop and mobile

## Implementation Notes

Keep the implementation simple:

- edit HTML pages directly
- add the three root crawler files manually
- do not introduce build tooling for metadata generation
- preserve the current site structure and styling

## Planning Readiness

This spec is ready for implementation planning because it defines:

- which pages are indexable
- which pages are intentionally excluded
- which metadata layers belong on each page type
- which repo-level crawl files are required
- what content adjustments are in scope
- what risks and verification steps matter
