````md
# Salesforce Playwright Tests

Automated testing framework for Salesforce CRM using Playwright and TypeScript.

## Technologies
- Playwright
- TypeScript
- Node.js

## Features
- Login automation
- Leads validation
- Contacts workflows
- Tasks management
- Enterprise UI testing

## Salesforce Credentials and Environment Configuration

You can find your Salesforce account information in:

```txt
Settings → Personal Information
````

Important fields:

* Username
* Email
* Organization information

Example `.env` configuration:

```env
BASE_URL=https://login.salesforce.com

SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
```

⚠️ Never commit your real `.env` file to GitHub.

Use `.env.example` as a safe template for the repository.

## Run tests

```bash
npx playwright test
```

```
```
