# Salesforce Playwright Tests

Modern Salesforce automation framework built with Playwright and TypeScript using enterprise-grade architecture patterns, reusable UI components, and scalable automation design principles.

---

# Project Goals

This project was designed not only to automate Salesforce workflows, but also to demonstrate:

- Clean Architecture
- Separation of Concerns
- Component-Driven Automation
- Reusable UI Behaviors
- Enterprise Automation Patterns
- Scalable Test Design
- Modern SDET Practices

---

# Architecture Highlights

## Component-Driven Architecture

The framework follows a reusable UI component architecture where specialized components are responsible for isolated UI behaviors.

Examples:

- `TextboxComponent`
- `ComboboxComponent`
- `NumberInputComponent`
- `AddressComponent`
- `CrudActionsComponent`

This approach improves:

- Maintainability
- Reusability
- Scalability
- Readability
- Test stability

---

## Separation of Concerns (SoC)

Each layer has a single responsibility.

### Pages

Responsible for:

- Business flow orchestration
- Navigation
- Workflow coordination

Example:

- `LeadsPage`

---

### Form Components

Responsible for:

- Form orchestration
- UI coordination
- Validation behavior

Example:

- `LeadFormComponent`

---

### UI Components

Responsible for:

- Reusable UI interactions
- Encapsulated field behavior
- Specialized UI logic

Examples:

- `TextboxComponent`
- `ComboboxComponent`
- `AddressComponent`

---

# Enterprise Automation Concepts

This framework applies concepts commonly used in enterprise automation teams:

- Page Component Model (PCM)
- Component Composition
- Domain-Oriented Test Design
- Encapsulation
- Reusable UI Libraries
- UI Behavior Abstraction
- Synchronization Strategy
- Clean Code Principles

---

# Clean Code Principles

The framework prioritizes:

- Small focused methods
- Readable business-oriented naming
- Reusable behaviors
- Explicit intent
- Reduced duplication
- High maintainability
- Scalable architecture

---

# Example Architecture

```text
src/
 ├── components/
 │    ├── crud/
 │    ├── forms/
 │    │    ├── address/
 │    │    ├── combobox/
 │    │    ├── number-input/
 │    │    └── textbox/
 │    ├── modal/
 │    ├── search/
 │    ├── toast/
 │    └── validation/
 │
 ├── pages/
 │    ├── BasePage.ts
 │    ├── LeadsPage.ts
 │    └── LoginPage.ts
 │
 ├── tests/
 │    ├── auth/
 │    ├── leads/
 │    └── contacts/
 │
 └── models/
```

---

# Example of Modern Form Organization

Instead of creating one large form method, the framework separates business sections into focused methods.

Example:

```ts
await this.fillPersonalInformation(lead);

await this.fillContactInformation(lead);

await this.fillAddressInformation(lead);

await this.fillBusinessInformation(lead);
```

Benefits:

- Better readability
- Easier maintenance
- Easier debugging
- More scalable forms
- Clear business context

---

# Synchronization Strategy

The framework centralizes synchronization logic to reduce flaky tests and improve reliability.

Examples:

- `waitUntilClickable()`
- UI rendering stabilization
- Reusable synchronization patterns

---

# Current Design Philosophy

This framework intentionally avoids:

- Overengineering
- Generic automation engines
- Excessive abstractions
- Reflection-heavy frameworks
- Complex dynamic field engines

The goal is to keep the framework:

- Clean
- Readable
- Sustainable
- Enterprise-ready
- Easy to maintain for years

---

# Future Improvements

Planned improvements include:

- ToastComponent
- ModalComponent
- ValidationComponent
- Synchronization Layer
- Loading Components
- Fluent APIs
- Workflow Layer
- Enhanced Reporting

---

# Technologies

- Playwright
- TypeScript
- Node.js
- Salesforce
- Page Component Model
- Modern UI Automation Patterns

---

# Purpose of This Repository

This repository serves as:

- Automation portfolio
- Enterprise architecture showcase
- Modern SDET reference project
- Salesforce automation study platform
- Long-term scalable automation framework

---

# Author

Maicon Fang

QA Engineer | Automation Engineer | SDET-Oriented Architecture

Focused on scalable automation frameworks, reusable UI architecture, and enterprise testing practices.
