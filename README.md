# SAIS UAQ Website

Sharjah American International School — Umm Al Quwain Campus website, built with Next.js and Sanity.

This project started as a copy of the Sharjah campus site
([razanKurouni/SAIS_Sharjah_Website](https://github.com/razanKurouni/SAIS_Sharjah_Website))
and points at its own Sanity dataset, `sais-uaq`, inside the shared `SAIS` Sanity project.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Framer Motion
- Sanity Content Lake (`@sanity/client`)

## Run locally

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

## Sanity config

`.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=uwffig4f
NEXT_PUBLIC_SANITY_DATASET=sais-uaq
```

The Studio is served at `/studio` and reads the same dataset.

## Seeding the UAQ dataset from the Sharjah content

To start the UAQ site with the Sharjah content as a base and then edit it in the Studio:

```bash
# export the Sharjah dataset
npx sanity dataset export sais-sharjah sais-sharjah.tar.gz

# import it into the UAQ dataset
npx sanity dataset import sais-sharjah.tar.gz sais-uaq
```

The `scripts/` folder also contains the per-page seed scripts (`npm run seed:*`). They all
write to `NEXT_PUBLIC_SANITY_DATASET`, so with `.env.local` set to `sais-uaq` they will populate
the UAQ dataset. They require a `SANITY_AUTH_TOKEN` with write access.

## Notes

- Homepage content is loaded from the `homepage` singleton document; older `homeSection` documents are used as a fallback.
- Uploaded images are read from `images[]` and fallback placeholders from `imagePlaceholders[]`.
- Page models are defined in `sanity/schemas/`.
