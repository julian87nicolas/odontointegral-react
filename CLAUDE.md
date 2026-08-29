# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Institutional single-page site for "Aura Odontología" (a dental clinic in Mendoza, Argentina), built with Create React App. Content, labels, and comments are in Spanish — match that when editing UI copy.

## Commands

- `npm start` — dev server (CRA)
- `npm run build` — production build into `build/`
- `npm test` — Jest/Testing Library in interactive watch mode (CRA default). Run a single file non-interactively with `CI=true npx react-scripts test src/App.test.js`.
- `npm run eject` — irreversible CRA config eject; do not run without explicit user request.

There is no separate lint script; ESLint runs via `react-app`/`react-app/jest` config embedded in `package.json` as part of `npm start`/`npm run build`.

Node >=18.18.0 / npm >=9 are required (see `package.json` `engines`).

## Architecture

- Entry: `src/index.js` mounts `App` (`src/App.js`), which wraps everything in `ClinicProvider` and `BrowserRouter`. Routing is minimal — a single `/` route rendering `Main`, with any other path redirected to `/`. This is effectively a one-page site, not a multi-route app.
- `src/context/ClinicContext.js` is the single source of truth for clinic data: contact info, insurers, and local fallback testimonials. Components read it via `useClinic()` rather than receiving props — check this file first when clinic details (phone, address, WhatsApp number, insurer list) need to change.
- `src/components/Main.js` lazy-loads `Insurers`, `Content`, `Gallery`, `Specialties`, `Testimonials`, and `ContactForm` behind one `Suspense` (fallback `null`), in that render order; `Intro` (the hero) loads eagerly since it's above the fold. Preserve this eager/lazy split and ordering when adding sections.
- Visual design is intentionally minimal/Apple-inspired: system-font stack (`-apple-system, BlinkMacSystemFont, ...`, no Google Fonts), large tight-tracking headings, mostly flat white/grey backgrounds, and the brand colors (`--brand` cyan, `--brand-strong` blue, `--accent` coral) used sparingly (links, one CTA, small highlights) rather than as dominant section backgrounds. Icons are hand-drawn inline SVGs in `src/components/Icons.js` — there is no FontAwesome or other icon-font dependency.
- Each component owns a co-located stylesheet under `src/components/styles/` (e.g. `Nav.js` → `styles/nav.css`); there's no CSS-in-JS or shared component-scoped styling system. Global tokens (CSS variables, base/reset, responsive breakpoints) live in `src/index.css`.
- Theme switching is manual, not just `prefers-color-scheme`: `Nav.js` toggles `data-theme` on `document.documentElement` and persists the choice to `localStorage` under `"theme"`. Dark-theme variable overrides live in `src/index.css` under `:root[data-theme="dark"]`. Brand logo assets are swapped by theme (`aura-light.*` / `aura-dark.*`).
- Scroll-reveal animations are wired generically in `App.js`: any element with class `reveal` is observed via `IntersectionObserver` and gets `is-visible` added when it scrolls into view (with a 1200ms fallback timer so content isn't stuck hidden if the observer fails). A `reveal-scale` modifier (defined in `src/index.css`) fades in with a slight scale instead of a vertical slide — used on the hero photo. Stagger entrances by setting an inline `--reveal-delay` CSS var (seconds) on individual `reveal` elements, e.g. per grid item in `Specialties.js` or per card in `Testimonials.js`. Add the `reveal` class to new sections to opt into this rather than writing custom scroll logic.
- `Insurers.js` holds the searchable obras-sociales list (extracted from the hero so the hero stays a simple headline/CTA/photo block).
- `Specialties.js` renders all treatments as a static responsive grid (hairline top border per tile, no icons) — no carousel/auto-scroll there. `Gallery.js` is the one exception: a horizontal scroll-snap photo strip (real clinic/team photos) with manual prev/next buttons — user-controlled, never auto-advancing.
- `Testimonials.js` optionally calls the Google Places API (`places.googleapis.com`) directly from the client using `REACT_APP_GOOGLE_MAPS_API_KEY` (see `.env.example`) to fetch and show live 5-star reviews, resolving the place via `googlePlaceId`/`googlePlaceQuery` from `ClinicContext`. If the key is absent or any request fails, it silently falls back to the local `testimonials` array from `ClinicContext` — this fallback path is intentional, not an error state.
- `ContactForm.js` renders a dark closing CTA band followed by the actual form, and has two independent submission paths: (1) building a prefilled `wa.me`/`api.whatsapp.com` link opened in a new tab, and (2) posting JSON to `https://formsubmit.co/ajax/<email>` for direct email delivery (with a hidden `_honey` honeypot field against bots). Both share the same client-side validation (`validate()`) but manage separate sent/error state — keep them independent when modifying one.
- `Content.js` covers the "who we treat" statement, the ubicación block, and horarios; it lazy-mounts the embedded Google Maps `iframe` only once its container intersects the viewport (via `IntersectionObserver`), to avoid loading the map iframe upfront. The ubicación block is a 3-column grid (address / storefront photo / map).
- Photos in `public/images/` (hero, ubicación storefront shot, `Gallery.js` photos) are real clinic photography, not stock — sourced from client-provided shoots, resized with `sips` and converted to WebP with `cwebp`. When swapping any of them, keep that pipeline (resize to the display width, `cwebp -q ~78`) rather than shipping full-resolution originals.
