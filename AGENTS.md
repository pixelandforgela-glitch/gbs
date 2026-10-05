# GBS USA website (`gbs-usa.build`)

This is the only instruction file for this repo. `CLAUDE.md`, `GEMINI.md`, and `.github/copilot-instructions.md` only point here. If a tool loads one of those, come back and follow this file.

Green Building Solutions USA sells building materials to construction professionals. The public site is a small hand-written static site: HTML and CSS, no framework, no build. The only JavaScript is the Span chat widget Blair approved on Oct 4, 2026. Blair owns it and is the only person who merges to `main`.

## Where the files are

| Path | What it is |
|---|---|
| `gbs-site/dist/` | The website. This is the only folder a host may publish. |
| `gbs-site/dist/index.html` | Home page |
| `gbs-site/dist/mgo-products/index.html` | MgO product page |
| `gbs-site/dist/qrock-acoustic-sheathing/index.html` | Q-Rock product page |
| `gbs-site/dist/style.css` | Site styles, including the brand block at the bottom |
| `gbs-site/dist/products.css` | Product-page styles, including table styles for later |
| `gbs-site/pending-claims.md` | Product copy taken off the public pages. **Never publish this file.** |
| `gbs-site.tar.gz` | Old ChatGPT Sites export. Do not edit it, do not serve it, do not treat it as the site. |

Header, footer, phone, email, and the partner row are copied in each HTML file. There is no shared template and there must not be a build step to create one.

The HTML and CSS are packed onto long lines. Edit the exact text you mean to change. Do not reflow a whole file unless that is the task.

## Preview locally

From the repo root:

```bash
python3 -m http.server --directory gbs-site/dist
```

Open `http://127.0.0.1:8000/`.

Python’s server does not use `404.html` for unknown paths. Open `http://127.0.0.1:8000/404.html` to preview the not-found page. On Cloudflare Pages, that file is the body of a real 404 for any missing URL, so every asset and link in `404.html` stays root-absolute (`/style.css`, not `style.css`).

## Brand

Use the existing tokens and classes. Do not restyle the site for its own sake.

- `--ink: #1B2320`
- `--green: #2F6E51`
- `--lime: #E8E4DB`
- `--paper: #F7F6F2`
- `--muted: #28332E`
- Accent `#C77B2E`
- Type: Space Grotesk (headings), Inter (body), IBM Plex Mono (labels). The CSS falls back to Arial. Fonts load from Google Fonts in `style.css`. Do not add another font service.
- Reuse `.button`, `.button.small`, `.button.light`, `.eyebrow`, `.section`, `.text-link`, `.contact`, `.partners`.

Approved product sentences already on the home page. These are the only product claims you may reuse. Do not add numbers, ratings, or certifications to them.

- MgO: “Mineral-based magnesium oxide panels designed for fire resistance, durability and dimensional stability.”
- Q-Rock: “Acoustic and fire-rated sheathing for quieter multifamily, hospitality, medical and commercial spaces.”

## Hard rules

- No framework, no bundler, no `package.json`, no npm, no Node build, no React/Vue/Next, no templating step, no site generator.
- No JavaScript except one approved script. On Oct 4, 2026 Blair approved the Span chat widget loaded from `https://span.scaffold.site/widget-loader.js`. The exact tag sits immediately before `</body>` on `gbs-site/dist/index.html`, `gbs-site/dist/mgo-products/index.html`, and `gbs-site/dist/qrock-acoustic-sheathing/index.html`. Do not add it to `404.html`. Do not add any other script.
- Near-zero cost, simple enough for one person. Cloudflare Pages on the free plan is the host. Do not add paid services, analytics, trackers, cookies, or a form backend unless Blair asks in that task. The Span widget above is the one exception already approved.
- Do not publish unconfirmed product claims. That includes the Q-Rock SKU matrix, thicknesses, pallet counts, the 30/60/120-minute sentence, recycled-fiber, antimicrobial, and low-VOC claims, and the MgO “Magnum 111”, fiberglass-reinforced, and mold/mildew/insect claims. Full removed text is in `gbs-site/pending-claims.md`. Do not put it back, and do not hide it in HTML comments (view-source is public).
- Do not invent product data, prices, certifications, test results, warranties, lead times, testimonials, project photos, or company details. If it is not already on a public page or written in this file as approved, leave it out.
- Do not publish placeholder contact details. Never replace the live phone, email, or footer with a `PLACEHOLDER_` token or a guess.
- Live details, until Blair confirms any change: phone `833-264-7336` (`tel:+18332647336`), email `info@gbs-usa.build`, footer locations `Orlando, Florida · Los Angeles, California`, copyright `© 2026 Green Building Solutions LLC.`
- Never touch email DNS. MX, SPF, DKIM, DMARC, and `google-site-verification` stay as they are. DMARC is `p=reject`. A bad edit bounces all GBS mail. Do not add a second SPF record.
- DNS stays at GoDaddy. Pointing `gbs-usa.build` at Cloudflare Pages is a later cutover. It is not part of ordinary content work. Do not change nameservers or A records unless Blair’s task is the cutover itself.
- Do not add prices, price ranges, or “starting at” figures.
- `gbs-site/dist/` is the only publishable folder. Notes, claim archives, and instructions stay outside it.

## Workflow

1. Branch from `main`.
2. Edit `gbs-site/dist/` for anything the browser should show. Put unpublished notes next to it, not inside it.
3. Preview with the command above. Click every link you touched.
4. Open a pull request. Describe what changed, what you did not do, and why.
5. After the Pages project exists, the PR gets a Cloudflare preview URL. Check that, not only your laptop.
6. Stop. Blair reviews and merges. A merge to `main` is what deploys. Do not merge your own PR.

Until Blair connects this repo in Cloudflare Pages **and** later cuts the domain over, a merge updates GitHub only. `https://gbs-usa.build` is still the existing ChatGPT Site (OpenAI Sites) until that cutover. Do not create a new ChatGPT Site. Do not expect a git push, by itself, to change the live domain today.

## Cloudflare Pages

Blair connects the GitHub repo once, in the Cloudflare dashboard (Workers & Pages → Create → Pages → Connect to Git). Use the free plan. Settings:

| Setting | Value |
|---|---|
| Production branch | `main` |
| Framework preset | None |
| Build command | empty (no build) |
| Build output directory | `gbs-site/dist` |
| Root directory | `/` (repository root) |
| Pull request previews | On |
| Environment variables | none |

Do not add `wrangler.toml`, `package.json`, `vercel.json`, or a Pages Function. Do not set a custom domain in the same step as ordinary content edits.

Pages sets `Content-Type` itself. Checked against the live project and the Pages asset MIME rules: `.webp` is `image/webp`, `robots.txt` is `text/plain; charset=utf-8`, and `sitemap.xml` is `application/xml`. Do not add a `_headers` `Content-Type` for those. The first matching rule replaces the type, and a second rule that matches the same path appends another value. That is why `/magnum.webp` was sent as `image/webp, image/webp` while both `/magnum.webp` and `/*.webp` were listed. There is no `_headers` file. Pages already sends `X-Content-Type-Options: nosniff`.

`404.html` is served automatically for unknown paths. Keep it.

`robots.txt` allows the site and points at the sitemap. `sitemap.xml` lists only `https://gbs-usa.build/`. Leave `/mgo-products/` and `/qrock-acoustic-sheathing/` out of the sitemap until Blair confirms the spec copy. Both pages can stay indexable; they use the approved blurbs. Do not add `noindex` to them unless Blair asks.

Canonical and `og:url` on the three public pages use `https://gbs-usa.build/...`.

## Checks before a PR

```bash
python3 -m http.server --directory gbs-site/dist
```

```bash
grep -RInE -i 'Magnum 111|fiberglass|mildew|antimicrobial|[Ll]ow-VOC|recycled fiber|30-, 60-|120-minute|Per pallet|\bQR-' gbs-site/dist
```

That grep must print nothing. Also confirm `833-264-7336`, `info@gbs-usa.build`, and `© 2026 Green Building Solutions LLC.` are still on every page you edited.

## Known open items

Blair has not answered these. Do not guess.

1. Confirm or drop each line in `gbs-site/pending-claims.md`, including sentences that were removed only because they sat in the same block as an unconfirmed claim.
2. Spec sheets, fire and acoustic data, and PDFs. No tables go back on the site until Blair supplies the values.
3. A few lines are still public because they were not in the removal list (named at the bottom of `pending-claims.md`). Do not treat them as confirmed specs, and do not add more like them.
4. Sales mailbox. `info@gbs-usa.build` stays on the site.
5. Legal name, headquarters, the Los Angeles line, and the phone. Live footer and phone stay as written above. Public sources disagree; do not pick a winner.
6. Quote form, thank-you page, and privacy policy. Not built. “Discuss your project” is a `mailto:info@gbs-usa.build` link.
7. FAQ, gallery, downloads, and accessories content. Those URLs are not pages. Home links go to a mailto or to a section that exists.
8. Old PDF path `/wp-content/uploads/2025/11/QRockFlyer_Approved.pdf`. Leave it a 404 until Blair supplies a file and asks for a redirect.
9. Magnum’s permission for its data and logo, and the exact relationship wording.
10. Sundello section. Approved sentence exists and is **not** on the site yet: “Sundello Homes is a partnership between Enterlectual and Green Building Solutions USA. Sundello homes are built with GBS's non-combustible, fire- and hurricane-rated MgO and steel materials, with Florida and Miami-Dade approval.” Do not add it unless the task asks. Do not add approval numbers.
11. Whether to compress `hero.png` (about 2.7 MB). Ask first. Keep the current alt text and dimensions if you do.
12. Domain cutover from the ChatGPT Site to Cloudflare Pages, including `www`. DNS stays at GoDaddy. Export the zone first. Change only the web records Pages tells Blair to change. Do not touch mail records. Do not do this as a side effect of a content PR.
