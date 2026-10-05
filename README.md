# SAIS UAQ Website

Sharjah American International School — Umm Al Quwain Campus website, built with Next.js and Sanity.

The site started as a copy of the Sharjah campus site
([razanKurouni/SAIS_Sharjah_Website](https://github.com/razanKurouni/SAIS_Sharjah_Website)) and uses its own
Sanity project (`zpdqig01`, dataset `abudhabi`).

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Framer Motion
- Sanity Content Lake (`@sanity/client`), Studio served at `/studio`

## Run locally

```bash
npm install
cp .env.local.example .env.local   # then fill in the values
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## How content and design are split

The CMS only holds **content**: words, images, files, links and SEO. Everything about **how it looks**
lives in the code, so editors never see color or layout fields, and the dataset stays far below the
2,000-attribute limit of Sanity's free plan (about 200 attributes in use).

| Where | What |
| --- | --- |
| `sanity/schemas/` | The content model: `page` (hero + sections), `siteSettings` (menu & footer), `newsPost`, and a few shared objects (`card`, `entry`, `cta`, `picture`). |
| `src/content/page-spec.ts` | The list of pages, their routes, and the sections ("slots") each page renders. Shared by the Studio, the migration script, the frontend and the search index. |
| `src/design/page-design.ts` | Colors, themes, image positions and other design tokens per page and section. Edit here to change the look. |
| `src/design/inner-navigation.ts` | The sub-navigation shown under the hero of some pages. |
| `src/design/forms.ts` | The Book a Tour form fields. |
| `src/lib/adapters/` | Turns CMS sections into the props the page components expect. |
| `src/lib/sanity.ts` | Data access: `getPage`, `getSiteSettings`, `getHomepage`, and one `getXPage()` per route. |

Every section type shares the same field names (`heading`, `body`, `image`, `cards`, `entries`, `ctas`…),
which is what keeps the attribute count small. Keep that in mind when adding fields: prefer reusing an
existing field name over inventing a new one.

### Which fields the Studio shows

Inside a section the Studio only shows the fields that section actually uses; empty optional fields are
hidden (`sanity/schemas/visibility.js`). The list of used fields per page section is generated from the
content into `src/content/slot-fields.ts`:

```bash
npm run content:slot-fields
```

To make a hidden field editable for one section, add its name to that section's entry in
`src/content/slot-fields.ts` (for example add `"subtitle"` under `heading`). A field that already has
content is always shown.

### Adding a section to a page

1. Add a slot to the page in `src/content/page-spec.ts` (slot id, kind, label).
2. Map it in the page's adapter in `src/lib/adapters/pages.ts`.
3. Render it in the page under `src/app/`.
4. Put any colors for it in `src/design/page-design.ts`.
5. Create the section in the Studio with the same `slot` id (the migration script does this automatically
   when it copies content), then run `npm run content:slot-fields` so its fields show up.

## Sanity project

`.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=zpdqig01
NEXT_PUBLIC_SANITY_DATASET=abudhabi
SANITY_AUTH_TOKEN=...   # write token, only needed for scripts
```

### Copying content from the Sharjah site

`scripts/migrate-from-sharjah.mjs` converts the Sharjah site's content (old page-specific model) into this
model, uploads the images and files, and writes everything to the UAQ project. It is safe to re-run.

```bash
SOURCE_SANITY_TOKEN=<read token for the Sharjah project> npm run content:migrate
```

### Checking the attribute usage

```bash
npm run content:attributes
```

## Deploying

The site is deployed on Vercel (Hobby plan, private repository). Vercel only deploys commits whose author
is the GitHub account that owns the Vercel project (`razanKurouni`); a commit attributed to any other
GitHub account is left in the **BLOCKED** state. Commit with an email that belongs to that account, for
example the GitHub no-reply address:

```bash
git config user.name "razanKurouni"
git config user.email "249701379+razanKurouni@users.noreply.github.com"
```

## Notes

- Pages keep working when a section is missing in the CMS: the components fall back to their built-in copy.
- The Book a Tour form posts to `/api/book-a-tour`; the recipient address is edited in the Studio
  (Book a Tour page → Tour Form), the mail provider is configured through environment variables
  (see `EMAIL_SETUP.md`).
