---
trigger: always_on
---

# Commit Message Rules

Generate commit messages strictly following the Conventional Commits format to pass the commitlint hook.

Format: `<type>(<scope>): <subject>`

Constraints:
1. type: Must be EXACTLY one of: feat, fix, perf, refactor, docs, test, style, build, ci, chore, revert.
2. scope: Mandatory. Must be EXACTLY one of: actions, app, components, constants, i18n, lib, providers, queries, schemas, stores, utils, api, messages, config, ci, deps, repo, docs, tests.
3. subject: MUST be entirely lower-case.
4. subject-full-stop: Do NOT end the subject line with a period (.).
5. header-max-length: The first line (header) must be 100 characters or less.
6. body-max-line-length: Body lines must be 120 characters or less.
7. footer-max-line-length: Footer lines must be 120 characters or less.
8. body-leading-blank: If there is a body, there MUST be a blank line between the header and the body.
9. footer-leading-blank: If there is a footer, there MUST be a blank line before it.
10. output: Provide ONLY the raw commit message without any markdown formatting or code blocks.