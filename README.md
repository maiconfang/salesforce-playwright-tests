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

# Author

Created by Maicon Fang as part of his continuous journey in Software Quality Assurance, Test Automation, and enterprise application testing.


Video hoje rsrsr
Hello everyone! 👋

In this video, I’d like to share the evolution of my Salesforce Playwright automation framework project.

Recently, I’ve been focusing a lot on improving the project architecture and making the framework more scalable, organized, and closer to what we often see in enterprise environments.

Some of the things I’ve been working on include:

• better separation of responsibilities
• reusable components
• cleaner page organization
• centralized actions and synchronization
• improved maintainability
• a more modular structure for future growth
• Page Object Pattern (POM)
• component-based architecture
• composition over inheritance
• layered architecture
• reusable UI actions
• declarative test design

The main goal is not only to automate tests, but also to build a framework that is easier to maintain, expand, and understand over time.

In this project, Pages are responsible for orchestrating flows, while Components encapsulate reusable UI behaviors such as navigation, forms, searches, synchronization, and actions.

I’m also trying to keep the tests more readable and business-oriented, focusing more on intention rather than implementation details.

In the video, I’ll show part of the project structure, explain some architectural decisions, and demonstrate how the framework is evolving step by step. 😊


----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

# Topics and Ideas to Mention in the Video

## Project Evolution

* The project started much simpler and evolved over time
* The architecture improved as new challenges appeared
* The framework is being built incrementally instead of overengineering too early

---

## Main Goals of the Framework

* Build a scalable automation framework
* Improve maintainability
* Reduce duplicated logic
* Keep the project organized as it grows
* Make the framework easier to understand and expand

---

## Architectural Improvements

* Better separation of responsibilities
* Cleaner page organization
* Reusable components
* Centralized synchronization and actions
* Modular architecture prepared for future growth

---

## Patterns and Approaches Being Used

* Page Object Pattern (POM)
* Component-based architecture
* Composition over inheritance
* Layered architecture
* Reusable UI actions
* Declarative test design
* Centralized synchronization strategy

---

## Why These Decisions Matter

* Reduce maintenance effort
* Improve readability
* Avoid duplicated logic
* Make tests more reusable
* Keep the framework easier to scale
* Make business flows easier to understand

---

## Readability and Business-Oriented Tests

* Focus more on intention rather than implementation details
* Keep tests cleaner and more readable
* Make tests closer to real business flows

Example:
Instead of:

```ts
page.locator(...).click();
```

Using:

```ts
await leadsPage.createLead(...);
```

---

## Component Reusability

* Components can be reused across different Salesforce modules
* Navigation, forms, searches, synchronization, and actions are isolated into reusable pieces

---

## Synchronization Strategy

* Centralized synchronization helps reduce flaky tests
* Wait logic is isolated and reusable
* Better stability and maintainability

---

## Framework Philosophy

* Avoid creating a “magic framework”
* Keep the project understandable and easy to navigate
* Architecture should evolve based on real problems and real project needs

---

## Learning and Continuous Improvement

* The project is also part of a continuous learning journey
* The framework evolves step by step as new ideas and improvements are explored

---

## Future Vision

* Prepare the framework for future modules and integrations
* Continue improving scalability and maintainability
* Expand reusable architecture patterns over time




-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------

This diagram represents the current architecture and flow of my Salesforce Playwright automation framework project.

The main goal of this structure is to create a framework that is scalable, organized, reusable, and easier to maintain as the project grows.

At the top, we have the test layer, where the Playwright test specifications are executed. These tests focus more on business flows and high-level actions instead of low-level implementation details.

The tests interact with the UI layer through Pages and Components.

The Pages work as orchestrators, meaning they coordinate the flow of the automation. Instead of containing all the logic directly inside the tests, the Pages delegate responsibilities to reusable Components.

The Components encapsulate reusable UI behaviors such as:

* navigation
* forms
* synchronization
* actions
* searches

This helps reduce duplicated logic and improves maintainability.

One important part of the architecture is the centralized synchronization strategy. Instead of spreading waits and retry logic across the tests, synchronization is isolated into reusable components to improve stability and reduce flaky tests.

Another important part is the reusable UI actions layer, which centralizes common operations like clicking, filling inputs, and interacting with elements. This makes the framework cleaner and easier to evolve over time.

The diagram also shows the API layer, which is separated from the UI layer. The idea behind this separation is to keep responsibilities isolated and prepare the framework for future hybrid automation strategies.

The API layer contains:

* authentication
* base API communication
* domain-specific clients

This architecture also follows several modern automation patterns, including:

* Page Object Pattern
* Component-based architecture
* Composition over inheritance
* Layered architecture
* Declarative test design

One thing I’m trying to achieve with this project is making the tests more readable and closer to business flows instead of focusing too much on implementation details.

Overall, this project is evolving step by step with a strong focus on maintainability, scalability, readability, and reusable architecture.


-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------------

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

