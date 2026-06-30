# property-calc

Next.js 14 property calculator website. This is a replica of an existing site, built with SEO as a primary concern.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Content:** MDX via next-mdx-remote
- **SEO:** next-seo (metadata), next-sitemap (sitemap generation)
- **Language:** TypeScript

## Dev

```bash
npm run dev    # starts on :3000 (or next available port)
npm run build  # production build
npm run lint   # ESLint
```

## SEO — primary concern

SEO is not an afterthought on this project. Every change must consider:

- Semantic HTML with correct heading hierarchy (one `<h1>` per page)
- All pages need `<title>` and `<meta description>` via next-seo
- Prefer SSG over SSR/CSR — content must be crawler-accessible
- Descriptive `alt` text on all images
- Keyword-relevant URL slugs
- All new routes must appear in the sitemap (next-sitemap config)
- Never render indexable content client-side only

## Git workflow

- Work on feature branches, merge to `master` via PR
- `master` is protected — no direct pushes
- Branches are deleted automatically after merge
- PRs created via `gh pr create`
