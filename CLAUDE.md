# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A Shopify Hydrogen storefront ("Plants") built on React Router 7, deployed to Shopify Oxygen. It's a combined e-commerce + personal photography/journal site: product/collection/cart/account routes alongside `photography.*`, `plants.blog.*`, `about`, `trails`, and `web-dev` content routes.

## Commands

```bash
npm run dev         # start local dev server (shopify hydrogen dev --codegen)
npm run build       # production build (shopify hydrogen build --codegen)
npm run preview     # preview a production build
npm run lint        # eslint .
npm run typecheck   # react-router typegen && tsc --noEmit
npm run codegen     # regenerate GraphQL types (shopify hydrogen codegen && react-router typegen)
```

There is no test suite/runner configured in this repo (no test script, no `*.test.*` files). Don't assume Jest/Vitest exists.

Run `npm run codegen` after adding or editing any GraphQL query/mutation/fragment — it regenerates `storefrontapi.generated.d.ts` and `customer-accountapi.generated.d.ts`, which route types depend on. Run `npm run typecheck` after route or loader changes since React Router generates per-route types under `.react-router/` (`./+types/<route>`).

## Architecture

**Routing**: File-based routing via `@react-router/fs-routes` (`app/routes.ts` → `flatRoutes()`), wrapped in `hydrogenRoutes()` from `@shopify/hydrogen`. Routes live in `app/routes/` using flat-file naming (e.g. `photography.film-and-gear.nikon-f6.tsx` → `/photography/film-and-gear/nikon-f6`). `$` segments are splat/catch-all routes (e.g. `account.$.tsx`, `$.tsx` as the 404 catch-all). Bracketed filenames like `[robots.txt].tsx` and `[sitemap.xml].tsx` produce literal static paths.

**Request lifecycle**: `server.ts` is the Oxygen worker entry. It builds a per-request `HydrogenRouterContextProvider` via `app/lib/context.ts` (`createHydrogenRouterContext`), then hands off to React Router's request handler. It also commits session cookies and runs `storefrontRedirect` for unmatched 404s. Any new backend integration (CMS client, 3P SDK, etc.) should be added to `additionalContext` in `app/lib/context.ts`, which augments the global `HydrogenAdditionalContext` type so it's available as `context.<name>` in every loader/action.

**Root layout** (`app/root.tsx`): loads header/footer menu data (`HEADER_QUERY`/`FOOTER_QUERY` from `app/lib/fragments.ts`), sets up `Analytics.Provider`, and renders `PageLayout`. `shouldRevalidate` is customized to skip root-loader revalidation on GET sub-navigations for performance — be aware this can cause stale header/footer/cart data if you don't account for it. Stylesheets (`tailwind.css`, `reset.css`, `app.css`) are linked directly in the `Layout` component rather than via route `links()`, intentionally, to avoid an HMR `insertBefore` bug.

**GraphQL**: Two separate GraphQL projects configured in `.graphqlrc.ts` — the Storefront API (queries anywhere under `app/**` except `app/graphql/`) and the Customer Account API (`app/graphql/customer-account/*`). Shared fragments (cart, header, footer) live in `app/lib/fragments.ts`. Types are generated, not hand-written — never manually edit `storefrontapi.generated.d.ts` / `customer-accountapi.generated.d.ts`.

**React Router, not Remix**: this project migrated from Remix to React Router v7. Always import router hooks/components (`useLoaderData`, `Link`, `Form`, `useNavigation`, `useSubmit`, etc.) from `react-router`, never from `@remix-run/react` or `react-router-dom`. See `.cursor/rules/hydrogen-react-router.mdc` for the full Remix→React Router package mapping if porting old examples.

**UI/styling**: Tailwind CSS v4 (`app/styles/tailwind.css`, config-free/CSS-based). shadcn/ui is configured (`components.json`, style "new-york", base color neutral) with generated primitives in `app/components/ui/` (e.g. `button.tsx`) built on `class-variance-authority` + `tailwind-merge` (see `app/lib/utils.ts` for the `cn()` helper). Feature components (product, cart, plant pages, photography pages) live flat in `app/components/`, not under `ui/`.

**Photography section**: image galleries use `@fancyapps/ui` (Fancybox) via `app/lib/useFancybox.tsx` / `app/lib/fancyboxOptions.ts`, plus a masonry grid (`MasonryGallery`/`MasonryGalleryImage`) and `react-grid-gallery` (vendored under `app/components/react-grid-gallery/`). Per-page-type SEO metadata is centralized in dedicated `app/lib/photography*SeoData.ts` files (camera body, film format, film stock, journal, landing page, lens) rather than inlined per-route.

**Sessions/cart**: custom session handling in `app/lib/session.ts` (`AppSession`), wired into the Hydrogen context in `app/lib/context.ts`. Cart uses a custom `CART_QUERY_FRAGMENT` from `app/lib/fragments.ts`.

## Environment

Local env vars live in `.env` (MiniOxygen-injected, gitignored) — see `env.d.ts`/`types.d.ts` for the `Env` shape. Use `h2 link` or `h2 env pull` (Shopify CLI) to sync real storefront env vars locally; don't hand-edit secrets into `.env` beyond what's already templated.
