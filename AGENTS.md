# Repository Guidelines

## Project Structure & Module Organization
This is a Vue 3 + TypeScript portfolio built with Vite. Application entry points live in `src/main.ts` and `src/App.vue`. Page sections are split into single-file components under `src/components/`, such as `HeroSection.vue`, `ProjectsSection.vue`, and `ContactSection.vue`. Shared global styling is in `src/style.css`, with static public assets in `public/` and imported source assets in `src/assets/`. Build and TypeScript configuration lives in `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, and `tsconfig.node.json`.

## Build, Test, and Development Commands
Install dependencies with:

```sh
npm install
```

Run the local development server with:

```sh
npm run dev
```

Create a production build with:

```sh
npm run build
```

This runs `vue-tsc -b` for type checking, then builds with Vite. Preview the production output locally with:

```sh
npm run preview
```

## Coding Style & Naming Conventions
Use Vue single-file components with `<script setup lang="ts">`. Follow the existing style: two-space indentation, single quotes in TypeScript imports and strings, PascalCase component names, and descriptive section component filenames ending in `Section.vue` when they represent page sections. Keep component logic close to the component that owns it, and use `src/style.css` for shared layout, theme variables, and cross-section styles.

## Testing Guidelines
No test runner is currently configured. Before adding behavior-heavy changes, consider adding Vue Test Utils with Vitest and placing tests beside the relevant component or in a dedicated `src/__tests__/` directory. Use names like `HeroSection.test.ts` and focus on user-visible behavior, rendered content, and component state. Until tests exist, always run `npm run build` before submitting changes to catch TypeScript and production build issues.

## Commit & Pull Request Guidelines
The current Git history only contains `initial commit`, so there is no established commit convention yet. Use short, imperative commit messages such as `Add contact section animation` or `Update project cards`. Pull requests should include a concise summary, screenshots or screen recordings for visual changes, any linked issue, and the commands run for verification, especially `npm run build`.

## Security & Configuration Tips
Do not commit secrets, private contact credentials beyond intended public portfolio details, or local environment files. Keep external links using `target="_blank"` paired with `rel="noopener"` as shown in existing components.
