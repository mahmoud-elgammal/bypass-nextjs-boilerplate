# Releasing

Branching model
- `main` → stable releases (tags: `vX.Y.Z`).
- `beta` → pre-releases (channel `beta`, tags: `vX.Y.Z-beta.N`).
- `alpha` → pre-releases (channel `alpha`, tags: `vX.Y.Z-alpha.N`).

Semantic Release
- Automated via CI (`.github/workflows/ci.yml:1`) after all checks pass.
- Conventional commits determine version bump and release notes.
- Update repo metadata and URLs in `.releaserc:1` as needed.

Storybook
- Built and deployed to `gh-pages`. Enable GitHub Pages to serve `gh-pages` branch.

Lighthouse CI
- Runs on production build in CI. Thresholds configured in `lighthouserc.json:1`.

