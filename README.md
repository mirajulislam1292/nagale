# Nagale

Bangladesh-focused marketplace frontend. Clients describe work and review proposals; providers find matched gigs and deliver through an order workspace. A separate backend implementation will supply identity, matching, verification, payments and moderation.

## Scaffold status

This is the new build requested in the master specification. Infrastructure is being prepared first. The empty pipeline shell is not the product and must not replace the existing public domain.

## Stack

The scaffold uses Vite, React 18, strict TypeScript, Tailwind CSS 3.4, Vitest, ESLint and Prettier. React Router 6, react-i18next, Lucide, Testing Library and visual QA tools will be installed at their implementation steps, avoiding unused dependencies in the scaffold. Versions and the dependency lockfile are pinned. Use Node 20 from `.nvmrc`.

## Commands

`npm ci`, `npm run dev`, `npm run lint`, `npm run type-check`, `npm test`, `npm run check:unused`, `npm run build`, `npm run preview`.

## Configuration

Copy `.env.example` to `.env.local`. All `VITE_` variables are public browser configuration; secrets must never use that prefix. Production remains in demo mode until a real backend exists. No credentials belong in this repository.

## Ownership

Private repository. All rights reserved. No public license is granted.
