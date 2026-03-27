---
trigger: always_on
---

# Strict Commit Message Generation Rule

You are an expert developer generating commit messages. You MUST strictly adhere to the Conventional Commits format and the project's `commitlint` configuration. If you fail, the commit hook will reject the commit.

## Format Requirements
`<type>(<scope>): <subject>`

[optional blank line]
[optional body]

[optional blank line]
[optional footer]

## Allowed Values
- **type**: MUST be exactly one of: `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `style`, `build`, `ci`, `chore`, `revert`.
- **scope**: MANDATORY. MUST be exactly one of: `actions`, `app`, `components`, `constants`, `i18n`, `lib`, `providers`, `queries`, `schemas`, `stores`, `utils`, `api`, `messages`, `config`, `ci`, `deps`, `repo`, `docs`, `tests`.

## Strict Constraints
1. **Subject Case**: The `<subject>` MUST be completely in lower-case. No uppercase letters allowed anywhere in the subject.
2. **No Period**: Do NOT end the `<subject>` with a period (`.`).
3. **Lengths**:
   - Header (first line) MUST be <= 100 characters.
   - Body lines MUST be <= 120 characters.
   - Footer lines MUST be <= 120 characters.
4. **Spacing**:
   - If providing a body, there MUST be exactly one blank line between the header and the body.
   - If providing a footer, there MUST be exactly one blank line before the footer.

## Strict Output Requirements
- Output ONLY the raw commit message.
- Do NOT wrap the message in markdown code blocks (e.g., no ```bash or ```).
- Do NOT include any introductory explanations, greetings, or conversational text.

## Examples

**GOOD:**
feat(components): add primary button variant

**GOOD (with body):**
fix(api): resolve timeout issue on user fetch

increased the timeout threshold from 5s to 10s to handle slow network conditions.

**BAD (Will be rejected):**
- `Feat(components): Add primary button` (Rejection reason: Uppercase letters in subject and type)
- `fix(API): fix timeout.` (Rejection reason: Uppercase scope, subject has uppercase, ends with period)
- `chore: update dependencies` (Rejection reason: Missing scope)
- `chore(database): update schema` (Rejection reason: Invalid scope 'database')