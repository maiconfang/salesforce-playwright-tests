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

# Quality Reporting Engine

The framework includes a Quality Reporting Engine designed to transform raw Playwright execution artifacts into actionable quality intelligence.

Instead of relying only on execution status and stack traces, the reporting engine combines execution statistics with execution context to provide richer failure diagnostics.

Generated Artifacts:

- playwright-results.json
- execution-flow.json
- execution-report.json

Current Capabilities:

- Execution Summary
- Failure Diagnostics
- Root Cause Analysis
- Recommendations
- Failure Journey
- Test Data Visibility
- Business Impact Analysis

Reporting Pipeline:

playwright-results.json
+
execution-flow.json
↓
execution-report.json

Additional documentation:

- docs/execution-observability.md
- docs/quality-dashboard-architecture.md
- docs/quality-dashboard-roadmap.md

---

# Execution Observability

This framework includes an execution observability layer designed to provide human-readable and machine-readable execution telemetry during test execution.

Instead of relying only on raw Playwright errors and stack traces, the framework generates structured execution events that help explain:

- what the test was trying to do
- which business flow was being executed
- which UI action was performed
- where the failure happened
- the technical reason behind the failure

Each test execution generates an isolated execution-flow.json file containing semantic execution events.

Example:

```json
[
  {
    "type": "FLOW",
    "message": "Opening Leads page",
    "timestamp": "2026-05-25 16:48:00"
  },
  {
    "type": "ACTION",
    "message": "Clicking Leads navigation link",
    "timestamp": "2026-05-25 16:48:00"
  },
  {
    "type": "ERROR",
    "message": "Failed to click Leads navigation link",
    "timestamp": "2026-05-25 16:48:30",
    "summary": "Leads navigation link was not visible after 30 seconds",
    "error": "locator.waitFor: Timeout 30000ms exceeded..."
  }
]
```

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

npx playwright test tests/ui/leads/leads.create.spec.ts
npx playwright test tests/ui/leads/ --headed // Run in visual mode
npx playwright test tests/ui/leads/ // Run all test inside the folder "leads"
npx playwright test -g "should cancel lead creation without saving data" --headed // only this test in browser
npx playwright test -g "should cancel lead creation without saving data" --debug --headed
npx playwright test tests/components/search/search.component.spec.ts

npx playwright test --headed // seeing with browser
npx playwright test // without browser


# API
npx playwright test tests/api  // run all test inside folder "api" 

npx playwright test tests/api/leads/leads.hybrid.spec.ts
npx playwright test tests/api/leads/leads.hybrid.spec.ts --project=chromium

npx playwright test tests/api/leads/leads.api.spec.ts --grep "should delete a lead"

npx playwright test tests/api/leads/leads.create.api.spec.ts
npx playwright test tests/api/leads/leads.get.api.spec.ts
npx playwright test tests/api/leads/leads.update.api.spec.ts
npx playwright test tests/api/leads/leads.delete.api.spec.ts

npx playwright test tests/api/account/accounts.get.api.spec.ts
npx playwright test tests/api/account/accounts.create.api.spec.ts
npx playwright test tests/api/account/accounts.update.api.spec.ts
npx playwright test tests/api/accounts/accounts.delete.api.spec.ts

npx playwright test tests/api/contact/contacts.create.api.spec.ts
npx playwright test tests/api/contact/contacts.get.api.spec.ts
npx playwright test tests/api/contact/contacts.update.api.spec.ts
npx playwright test tests/api/contact/contacts.delete.api.spec.ts

npx playwright test tests/api/task/tasks.create.api.spec.ts
npx playwright test tests/api/task/tasks.get.api.spec.ts
npx playwright test tests/api/task/tasks.update.api.spec.ts
npx playwright test tests/api/task/tasks.delete.api.spec.ts

npx playwright test tests/api/opportunity/opportunities.create.api.spec.ts
npx playwright test tests/api/opportunity/opportunities.get.api.spec.ts
npx playwright test tests/api/opportunity/opportunities.update.api.spec.ts
npx playwright test tests/api/opportunity/opportunities.delete.api.spec.ts

# Terminal
tree /F /A | findstr /V /I "node_modules .git test-results" > estrutura.txt // show the structure of my project

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

# SOLID, DRY and Clean Code in This Project

As the framework started growing, I realized the importance of improving the architecture and organizing the project in a cleaner and more maintainable way.

Because of that, I naturally started applying concepts such as SOLID principles, DRY, and Clean Code during the evolution of the framework.

The goal is not to overcomplicate the project, but to create a structure that is easier to maintain, scale, reuse, and understand over time.

## Some examples in the project

### SOLID Principles

Responsibilities are separated across different layers and components.

Examples:

* Pages orchestrate flows
* Components encapsulate reusable UI behaviors
* Synchronization logic is isolated
* UI actions are centralized

This helps keep the framework more modular and maintainable.

---

### DRY (Don't Repeat Yourself)

Reusable logic is centralized to reduce duplicated code.

Examples:

* reusable components
* centralized actions
* centralized synchronization
* reusable navigation flows

This helps reduce maintenance effort and improves consistency across the framework.

---

### Clean Code

The project also focuses on readability and organization.

Examples:

* clearer naming conventions
* smaller responsibilities
* layered architecture
* readable business-oriented tests
* separation between implementation details and test intention

The idea is to make the framework easier to navigate and understand, especially as it continues to grow.

---

Overall, these concepts are helping the framework evolve into a cleaner, more scalable, and more reusable automation architecture.

# Author

Created by Maicon Fang as part of his continuous journey in Software Quality Assurance, Test Automation, and enterprise application testing.

