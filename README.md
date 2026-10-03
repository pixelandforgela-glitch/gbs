# GBS USA (`gbs-usa.build`)

Hand-written static website for Green Building Solutions USA. HTML and CSS only. No framework and no build step.

The site files are in [`gbs-site/dist/`](gbs-site/dist/). That folder is what gets published. Instructions for people and for AI coding tools are in [`AGENTS.md`](AGENTS.md). Follow that file.

## Preview

From this folder:

```bash
python3 -m http.server --directory gbs-site/dist
```

Then open http://127.0.0.1:8000/. The not-found page is http://127.0.0.1:8000/404.html (Python does not attach it to unknown URLs; Cloudflare Pages does).

## Deploy

Cloudflare Pages, free plan, connected to this GitHub repo.

- Production branch: `main`
- Framework preset: None
- Build command: empty
- Build output directory: `gbs-site/dist`

A pull request gets a preview URL once the Pages project exists. Merging to `main` deploys. Blair approves merges.

The live domain still points at the previous host until DNS is cut over at GoDaddy. That cutover is separate. Do not change email DNS records (MX, SPF, DKIM, DMARC).

## Product copy

Unconfirmed specs are not on the public pages. The removed text is saved in [`gbs-site/pending-claims.md`](gbs-site/pending-claims.md), outside the published folder, so a confirmed line can be restored exactly.
