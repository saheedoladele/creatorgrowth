# Creator Growth Platform

Frontend foundation for Creator Growth Platform, a premium SaaS product for content creators, businesses, and marketing agencies. The product will be used to manage legitimate social media growth campaigns, paid promotions, creator collaborations, and performance analytics across Facebook, Instagram, and TikTok.

This repository currently contains the application shell only. Product screens, authentication, integrations, and campaign workflows are intentionally not implemented yet.

## Technology stack

- [Next.js](https://nextjs.org) App Router
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org) in strict mode
- [Tailwind CSS](https://tailwindcss.com) v4
- [shadcn/ui](https://ui.shadcn.com) with CSS variables
- [Lucide React](https://lucide.dev) for icons
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

npm is the package manager.

## Prerequisites

- Node.js 20.9 or newer
- npm 11 or newer

## Installation

```bash
npm install
```

## Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other local commands:

```bash
npm run lint
npm run typecheck
npm run format
npm run format:check
```

Prettier formats the code. ESLint handles code quality. `eslint-config-prettier` turns off ESLint rules that conflict with Prettier, and Prettier is not run as an ESLint rule.

## Production build

```bash
npm run build
npm run start
```

## Folder structure

```text
src/
  app/            Routes, root layout, global CSS, and metadata
  components/     Shared UI. ui/ holds shadcn primitives. shared/ holds application components.
  features/       Feature modules for upcoming product areas
  hooks/          Reusable React hooks that are not owned by one feature
  lib/            Shared helpers. utils.ts exposes the cn class name helper
  services/       Future API and integration clients
  types/          Shared TypeScript types
  constants/      Shared constant values
  config/         Application configuration, including site metadata
  styles/         Additional global stylesheets
  assets/         Files imported from TypeScript or CSS
public/
  images/         Images served from the site root
  icons/          Icons served from the site root
```

`src/app/globals.css` holds the active design tokens. Tailwind CSS and shadcn/ui read that file, so theme changes belong there. `src/styles/typography.css` holds the semantic type scale.

Surfaces are cool neutrals. Primary is a dark navy indigo, and accent is a restrained violet. Spacing follows Tailwind's 0.25rem scale. Corner radius comes from the `--radius` token (`0.5rem`). Geist is the sans-serif UI font. Light, dark, and system themes are class-based through `next-themes`.

The temporary design-system reference is available at `/design-system` while the dev server is running.

## Contribution guidelines

- Keep each change focused on one concern.
- Leave TypeScript strict mode enabled and do not introduce `any`.
- Add product UI in `src/features` or, for shared primitives, in `src/components`.
- Add shadcn/ui components with the CLI so `components.json` stays the source of truth:

  ```bash
  npx shadcn@latest add <component>
  ```

- Run `npm run format`, `npm run lint`, and `npm run typecheck` before opening a pull request.
- Do not commit secrets, credentials, or `.env` files.
