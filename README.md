# Salesforce Playwright Tests

Automated testing framework for Salesforce CRM using Playwright and TypeScript.

This project was created to explore real-world enterprise test automation scenarios using Salesforce as a practical learning environment.

#Salesforce is a cloud-based CRM (Customer Relationship Management) platform used by companies to manage customers, sales, support, automation, and business workflows in one centralized system.


The main goal is to simulate modern QA workflows involving UI testing, API validation, environment configuration, and scalable automation practices.

---

# Technologies

- Playwright
- TypeScript
- Node.js
- dotenv

---

# Current Features

- Salesforce login automation
- Environment variable support
- Secure credential configuration
- Playwright test execution
- Initial Page Object Model structure

---

# Planned Features

This project will continue evolving with more enterprise-oriented automation scenarios, including:

- Leads workflows
- Contacts validation
- Tasks management
- Opportunities automation
- API integration testing
- Hybrid UI + API validation
- Multi-environment execution
- Test reporting
- Trace Viewer analysis
- Retry strategies
- Dynamic locator handling
- Authentication flows
- Data-driven testing

---

# Project Structure

```txt
salesforce-playwright-tests/
│
├── tests/
├── pages/
├── playwright.config.ts
├── .env.example
├── package.json
└── README.md
```

---

# Salesforce Credentials and Environment Configuration

You can find your Salesforce account information in:

```txt
Settings → Personal Information
```

Important fields:

- Username
- Email
- Organization information

Example `.env` configuration:

```env
BASE_URL=https://login.salesforce.com

SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
```

⚠️ Never commit your real `.env` file to GitHub.

Use `.env.example` as a safe template for the repository.

---

# Run Tests

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

---

# Future Vision

The purpose of this repository is not only to automate Salesforce workflows, but also to study how enterprise systems behave in real-world QA environments.

Future videos and updates may include:

- UI + API automation strategies
- Enterprise authentication challenges
- Salesforce dynamic components
- Automation architecture discussions
- Reporting and debugging techniques
- CI/CD integration
- Scalable automation practices

---

# Commands run playwright
npx playwright codegen // record elements of screen

npx playwright test tests/leads/leads.create.spec.ts
npx playwright test tests/leads/ --headed // Run in visual mode
npx playwright test tests/leads/ // Run all test inside the folder "leads"
npx playwright test -g "should cancel lead creation without saving data" --headed // only this test in browser
npx playwright test -g "should cancel lead creation without saving data" --debug --headed
npx playwright test tests/components/search/search.component.spec.ts


---

## Running Tests in Headed Mode (Debugging UI Execution)

By default, the project runs in headless mode for faster and more stable automated execution.
File `playwright.config.ts`

```ts
headless: true
```

If you want to visually debug the tests and watch the browser execution in real time, you can use headed mode.

### Run tests with visible browser

```bash
npx playwright test --headed
```

### Run tests with Playwright Inspector (debug mode)

```bash
npx playwright test --debug
```

This mode is especially useful for:

- Debugging flaky tests
- Inspecting Salesforce UI behavior
- Validating locators and synchronization
- Understanding page transitions and overlays
- Step-by-step execution analysis

### Optional: Change the configuration permanently

You can also update the Playwright configuration:

```ts
headless: false
```

However, using `--headed` is recommended because it keeps CI/CD pipelines optimized for headless execution.

---

# Author

Created by Maicon Fang as part of his continuous journey in Software Quality Assurance, Test Automation, and enterprise application testing.