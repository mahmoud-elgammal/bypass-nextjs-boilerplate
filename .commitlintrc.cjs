module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Enforce common conventional commit hygiene
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "perf",
        "refactor",
        "docs",
        "test",
        "style",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    // Require a scope and restrict to repo modules
    "scope-empty": [2, "never"],
    "scope-enum": [
      2,
      "always",
      [
        "actions",
        "app",
        "components",
        "constants",
        "i18n",
        "lib",
        "providers",
        "queries",
        "schemas",
        "stores",
        "utils",
        "api",
        "messages",
        "config",
        "ci",
        "deps",
        "repo",
        "docs",
        "tests",
      ],
    ],
    // Keep subject tidy
    "subject-case": [2, "always", ["lower-case"]],
    "subject-full-stop": [2, "never", "."],
    // Line lengths
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 120],
    "footer-max-line-length": [2, "always", 120],
    // Spacing
    "footer-leading-blank": [2, "always"],
    "body-leading-blank": [2, "always"],
  },
};
