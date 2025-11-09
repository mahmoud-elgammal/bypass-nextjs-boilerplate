FROM mcr.microsoft.com/devcontainers/typescript-node:20

SHELL ["/bin/bash", "-lc"]

# Enable corepack and pnpm
RUN corepack enable && corepack prepare pnpm@10.12.1 --activate

# Install Playwright browsers and OS deps
RUN pnpm dlx playwright install --with-deps

