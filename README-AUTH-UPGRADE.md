# Playwright Authentication Upgrade

This package adds enterprise-style Playwright authentication using storageState.

## What changed

- Login is executed once using a setup project
- Session is reused across all tests
- Faster execution
- Less flaky Salesforce tests
- Cleaner test files

## Files

### playwright.config.ts
Replace your existing config file.

### tests/auth.setup.ts
New authentication setup file.

### tests/leads/leads.create.spec.ts
Updated example without repeated login steps.

### .gitignore
Add:

playwright/.auth/

## Run tests

npx playwright test

Playwright will:
1. Execute auth.setup.ts
2. Save authenticated session
3. Reuse session for all tests
