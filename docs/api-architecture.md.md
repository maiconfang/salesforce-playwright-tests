# Salesforce Playwright Tests
## Enterprise UI + API Automation Framework

---

# Overview

This project is an enterprise-style automation framework designed to demonstrate modern QA automation architecture using:

- Playwright
- TypeScript
- Salesforce
- API Automation
- UI Automation
- Modular Architecture
- Clean Code Principles
- Reusable Components
- Scalable Design Patterns

The main goal of this project is not only to automate tests, but also to simulate how modern automation frameworks are structured inside real enterprise environments.

This repository was intentionally designed to focus on:

- Maintainability
- Scalability
- Reusability
- Readability
- Separation of Responsibilities
- Clean Architecture
- Modern QA Engineering Practices

---

# Main Goals

This project was created to:

- Demonstrate enterprise QA automation architecture
- Build a scalable UI + API automation framework
- Showcase modern Playwright and TypeScript patterns
- Create reusable and maintainable automation layers
- Separate business logic from technical implementation
- Provide a portfolio-quality framework
- Simulate real-world engineering practices used by modern SDET teams

---

# Why This Architecture?

Most automation projects become difficult to maintain over time because:

- Test logic becomes duplicated
- UI logic is mixed with API logic
- Requests are hardcoded everywhere
- Authentication becomes messy
- Test data is inconsistent
- Validation logic is spread across the project
- Reusability becomes limited

This framework was designed specifically to avoid those problems.

The architecture separates responsibilities into specialized layers.

This makes the project:

- Easier to scale
- Easier to debug
- Easier to maintain
- Easier to extend
- Easier to onboard new engineers

---

# Project Architecture

```text
src/
├── api/
│   ├── auth/
│   ├── builders/
│   ├── clients/
│   ├── config/
│   ├── contracts/
│   ├── factories/
│   ├── fixtures/
│   ├── models/
│   ├── services/
│   ├── utils/
│   └── validators/
│
├── components/
├── pages/
├── models/
├── fixtures/
└── tests/
```

---

# API Architecture

The API layer was designed using modular enterprise patterns.

Each folder has a clear responsibility.

---

# auth/

Responsible for authentication and session management.

Example files:

```text
auth/
├── AuthSessionManager.ts
├── OAuthManager.ts
├── SalesforceAuthClient.ts
├── TokenCache.ts
```

## Purpose

This layer centralizes:

- OAuth authentication
- Token management
- Session lifecycle
- Token caching
- Authentication abstraction

## Benefits

Without this layer:

- Authentication code becomes duplicated
- Token handling becomes inconsistent
- Expiration handling becomes difficult

With this layer:

- Authentication is reusable
- Token logic is centralized
- Session handling becomes scalable

---

# builders/

Responsible for creating structured request payloads.

Example:

```text
builders/
├── AccountBuilder.ts
├── ContactBuilder.ts
├── LeadBuilder.ts
```

## Why Builders?

Builders help create clean and readable test data.

Instead of:

```ts
const lead = {
  firstName: "Maicon",
  lastName: "Fang",
  company: "OpenAI"
};
```

We can use:

```ts
const lead = new LeadBuilder()
  .withFirstName("Maicon")
  .withLastName("Fang")
  .withCompany("OpenAI")
  .build();
```

## Benefits

- Better readability
- Better maintainability
- Cleaner test setup
- Reusable data generation
- Easier future expansion

---

# clients/

Responsible for direct API communication.

Example:

```text
clients/
├── accounts/
├── auth/
├── contacts/
├── leads/
└── tasks/
```

Example client:

```text
LeadsClient.ts
```

## Responsibility

Clients should only:

- Send requests
- Receive responses
- Handle endpoints
- Handle request configuration

Clients should NOT:

- Contain business rules
- Contain validation logic
- Contain orchestration logic

---

# services/

Responsible for business orchestration.

Example:

```text
services/
├── CleanupService.ts
├── ContactSeedService.ts
├── LeadSeedService.ts
```

## Purpose

Services orchestrate:

- Multiple requests
- Multiple clients
- Data preparation
- Workflow execution

Example:

A service may:

1. Create an account
2. Create a contact
3. Link the contact to the account
4. Validate the creation

This should NOT happen inside a client.

---

# contracts/

Responsible for API contracts and response typing.

Example:

```text
contracts/
├── SalesforceCreateResponse.ts
├── SalesforceErrorResponse.ts
├── SalesforceTokenResponse.ts
```

## Purpose

Contracts provide:

- Strong typing
- Predictable responses
- Safer API handling
- Better developer experience

## Benefits

- Better IntelliSense
- Better maintainability
- Safer refactoring
- Reduced runtime errors

---

# factories/

Responsible for centralized object creation.

Example:

```text
factories/
├── ApiClientFactory.ts
├── ServiceFactory.ts
```

## Purpose

Factories help:

- Centralize dependency creation
- Standardize object initialization
- Reduce duplicated setup logic

This pattern is heavily used in enterprise systems.

---

# fixtures/

Responsible for reusable Playwright fixtures.

Example:

```text
fixtures/
├── api.fixture.ts
```

## Benefits

Fixtures help:

- Inject reusable services
- Reduce boilerplate
- Improve test readability
- Standardize setup

Example:

```ts
test("Create lead", async ({ leadService }) => {
  await leadService.createLead();
});
```

---

# models/

Represents application entities.

Example:

```text
models/
├── Account.ts
├── Contact.ts
├── Lead.ts
```

## Purpose

Models represent business entities.

Examples:

- Lead
- Account
- Contact
- Task

Models help standardize data representation across the framework.

---

# utils/

Responsible for reusable technical utilities.

Example:

```text
utils/
├── apiHeaders.ts
├── apiVersion.ts
├── endpointBuilder.ts
│
├── logger/
│   ├── ApiLogger.ts
│   ├── RequestLogger.ts
│   └── ResponseLogger.ts
```

## Why utils?

Utilities centralize reusable logic.

Examples:

- Header creation
- Endpoint generation
- API version management
- Logging
- Request tracking

## Logger Benefits

The logging architecture helps:

- Debug API failures
- Trace requests
- Improve observability
- Analyze execution flow

This becomes extremely important in enterprise environments.

# Logging Architecture

The framework uses two different logging approaches intentionally.

## Global Framework Logger

Location:

src/utils/logger/

Purpose:

- UI automation logs
- Synchronization logs
- Framework execution logs
- Reusable debug messages
- Generic framework observability

Example responsibilities:

- Locator tracing
- Synchronization debugging
- Execution flow visibility
- UI interaction logs

This logger was designed to provide lightweight and reusable logging across the entire framework.

---

## API Specialized Loggers

Location:

src/api/utils/logger/

Purpose:

- API request logging
- API response logging
- HTTP tracing
- API observability
- Request/response debugging

Example responsibilities:

- Request payload logging
- Response body logging
- HTTP status tracing
- API execution visibility

These loggers are intentionally separated from the global framework logger because API observability has different responsibilities and requirements.

---

## Why Separate Loggers?

This separation follows enterprise architecture principles:

- Separation of Concerns
- Reusability
- Maintainability
- Low Coupling
- Specialized Responsibilities

Instead of creating a single large logger responsible for everything, the framework keeps generic logging and API logging isolated.

This improves long-term scalability and keeps the architecture cleaner and easier to evolve.


---

# Environment-Based Logging

The framework uses environment-driven logging behavior.

This allows different execution environments to control logging verbosity without changing the framework code.

---

## Local Development

Local execution uses the `.env` file.

Example:

```env
DEBUG_LOGS=true


# validators/

Responsible for validation logic.

Example:

```text
validators/
├── AuthValidator.ts
├── LeadValidator.ts
```

## Purpose

Validators centralize assertions and response validation.

Instead of placing assertions everywhere:

```ts
expect(response.status()).toBe(201);
```

We can use:

```ts
LeadValidator.expectLeadCreated(response);
```

## Benefits

- Cleaner tests
- Reusable validation logic
- Better maintainability
- Standardized assertions

---

# UI Automation Architecture

The UI layer follows a component-driven architecture.

---

# pages/

Pages orchestrate business flows.

Examples:

- LeadsPage
- LoginPage
- AccountsPage

Pages should:

- Represent business screens
- Coordinate components
- Expose business actions

Pages should NOT:

- Contain low-level UI implementation details

---

# components/

Components encapsulate reusable UI behavior.

Examples:

- ModalComponent
- ToastComponent
- NavigationComponent
- SearchComponent
- SynchronizationComponent

## Benefits

This architecture allows:

- Reusable UI interactions
- Cleaner pages
- Reduced duplication
- Better scalability

---

# Synchronization Strategy

One of the biggest challenges in UI automation is synchronization.

This project uses centralized synchronization strategies to reduce flaky tests.

Examples:

- waitUntilClickable()
- networkidle waits
- reusable retry logic
- component synchronization

## Goal

The objective is to create:

- Stable tests
- Predictable execution
- Reliable automation

---

# Why Separation Matters

This project intentionally separates:

- API logic
- UI logic
- Validation logic
- Business orchestration
- Test data generation
- Authentication
- Logging

This separation is extremely important for long-term maintainability.

---

# Benefits of This Architecture

## Scalability

New domains can be added easily.

Example:

```text
clients/
├── opportunities/
├── cases/
├── products/
```

---

## Reusability

Services and components can be reused across multiple tests.

---

## Maintainability

Changes are isolated.

Example:

If authentication changes:

Only the auth layer may require updates.

---

## Readability

Tests become more declarative.

Instead of:

```ts
await page.locator(...).click();
await page.locator(...).fill(...);
await request.post(...);
```

We can write:

```ts
await leadsPage.createLead();
await leadService.seedLead();
```

---

## Enterprise Readiness

This architecture follows patterns commonly found in:

- Large enterprise automation frameworks
- Internal QA platforms
- SDK-based automation systems
- Scalable SDET projects

---

# Future Evolution Possibilities

This framework was intentionally designed for future expansion.

Possible future improvements:

- Retry strategies
- Metrics collection
- API tracing
- AI-assisted analysis
- HTML reporting
- Distributed execution
- Advanced observability
- Performance testing integration
- Multi-environment execution
- CI/CD optimization

---

# Can This Architecture Be Reused in Other Projects?

Yes.

One of the main goals was to create a reusable framework structure.

This architecture can be adapted for:

- Salesforce
- REST APIs
- Playwright UI automation
- Enterprise applications
- Internal automation platforms
- Hybrid UI/API testing projects

Only the business-specific implementations would change.

The architecture itself remains reusable.

---

# Expected Outcomes

This project aims to achieve:

- High-quality automation architecture
- Reduced maintenance costs
- Improved scalability
- Cleaner test organization
- Better debugging capabilities
- Enterprise-grade structure
- Long-term sustainability

---

# Technical Stack

- Playwright
- TypeScript
- Node.js
- Salesforce APIs
- Modern QA Architecture Patterns

---

# Design Philosophy

This framework follows these principles:

- Clean Code
- Single Responsibility Principle
- Composition over Inheritance
- Separation of Concerns
- Reusability
- Scalability
- Maintainability
- Declarative Testing
- Enterprise Architecture

---

# Final Thoughts

This project is more than a test automation repository.

It represents an effort to build a modern QA engineering platform capable of evolving over time while maintaining clean architecture principles.

The objective is not only to automate tests, but also to create a sustainable and scalable automation ecosystem that reflects modern software engineering practices.



npx playwright test tests/api/leads/leads.create.api.spec.ts --project=chromium --no-deps
npx playwright test tests/api/discovery/discovery.api.spec.ts --project=chromium --no-deps
npx playwright test tests/api/leads/leads.create.api.spec.ts --project=api
