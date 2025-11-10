# Storybook

Run locally
- `pnpm storybook` → http://localhost:6006
- Global config at `.storybook/` (preview with global CSS and basic i18n mocks).

Stories
- Co-locate stories next to components as `*.stories.tsx`.
- Example: `src/components/ThemeToggle.stories.tsx:1`.

Build static
- `pnpm build-storybook` produces `storybook-static/`.
- CI builds and deploys to GitHub Pages (`docs/ci-cd.md`).

Tips
- Keep stories minimal and focused on states.
- Use args/controls for interactive variants.

