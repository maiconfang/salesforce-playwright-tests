Hi, let's work on my Quality Engineering project. Use the guidelines below to guide all your code and architecture responses:

# AI Development Guide

## Purpose

This document defines the architectural standards, coding conventions, design principles, and AI collaboration guidelines for this project.

Any new code, class, workflow, page object, component, service, test, utility, report, or feature must follow these guidelines.

The goal is not only to automate tests.

The goal is to build a modern Quality Engineering Platform capable of producing:

* Observability
* Execution timelines
* Evidence collection
* Diagnostics
* Reporting
* Historical execution analysis
* Future AI-driven analysis

---

# Core Principle

The primary asset of the project is NOT the test.

The primary asset is the execution knowledge generated during test execution.

Every action should contribute to execution history.

Every execution should generate evidence.

---

# Project Philosophy

Prioritize:

* Clarity
* Simplicity
* Maintainability
* Learning
* Observability

Avoid:

* Overengineering
* Excessive abstractions
* Premature optimization
* Complex generic frameworks

If two solutions solve the same problem, prefer the one that is easier to understand.

---

# Observability First

Observability is mandatory.

Every meaningful operation should generate execution events.

Supported event types:

* FLOW
* ACTION
* SUCCESS
* DATA
* ERROR

These events are consumed by:

* execution-flow.json
* execution-report.json
* dashboards
* analytics
* AI analysis

Code that bypasses observability should be avoided.

---

# Execution Context

Always retrieve the execution context when performing meaningful operations.

Example:

```ts
const executionContext =
  ExecutionContextManager.getContext();
```

---

# FLOW Events

FLOW events describe business-level activities.

Example:

```ts
executionContext.addStep(
  ExecutionFlowType.FLOW,
  "Opening Accounts page",
);
```

Examples:

* Opening Accounts page
* Creating Account
* Performing user login
* Executing Customer Onboarding
* Validating Opportunity

---

# ACTION Events

ACTION events describe individual operations.

Example:

```ts
executionContext.addStep(
  ExecutionFlowType.ACTION,
  "Clicking Save button",
);
```

Examples:

* Clicking Save button
* Searching Account
* Opening Opportunity
* Calling API endpoint

---

# SUCCESS Events

SUCCESS events confirm successful completion.

Example:

```ts
executionContext.addStep(
  ExecutionFlowType.SUCCESS,
  "Successfully opened Accounts page",
);
```

---

# DATA Events

Business evidence should be recorded whenever useful.

Example:

```ts
executionContext.addData(
  "Username",
  username,
  "Authentication",
);
```

Examples:

* Username
* Account Name
* Contact Name
* Opportunity Name
* Task Subject
* Salesforce Record Id
* API Response Id
* Search Criteria

---

# ERROR Events

Errors must always be captured.

Example:

```ts
catch (error) {

  executionContext.addError(
    error,
  );

  throw error;
}
```

Never swallow exceptions.

Never hide failures.

---

# Evidence Driven Testing

Tests are expected to generate evidence.

Examples:

* Input values
* Search criteria
* Business identifiers
* API responses
* Validation results
* Execution decisions

The objective is to understand exactly what happened during execution.

---

# Simplicity Over Cleverness

Prefer:

```ts
AccountPage
ContactPage
LeadPage
```

over:

```ts
GenericEntityManagerFactory
UniversalWorkflowFactory
AbstractEntityOrchestrator
```

unless there is a strong justification.

Code should be easy to understand during:

* Interviews
* Portfolio reviews
* YouTube demonstrations
* Team onboarding
* Future maintenance

---

# Explicit Code Is Preferred

Readability is more important than reducing every line of duplicated code.

A small amount of duplication is acceptable when it improves understanding.

Avoid creating generic solutions too early.

---

# Page Objects

Page Objects should:

* Encapsulate UI interactions
* Generate observability events
* Focus on a single responsibility

Page Objects should NOT:

* Coordinate business flows
* Perform orchestration
* Make architectural decisions

---

# API Clients

API clients should:

* Encapsulate API communication
* Validate responses
* Generate execution evidence
* Record important identifiers

API clients should not contain UI logic.

---

# Workflows

Workflows coordinate business operations.

Example:

```text
Create Account
Create Contact
Create Opportunity
Validate Records
```

Workflows may orchestrate:

* API Clients
* Page Objects
* Builders
* Validators

Workflows are responsible for business flow execution.

---

# Hybrid Tests

Hybrid tests combine:

* API
* UI
* Observability

Example:

```text
Create Account via API
↓
Open Salesforce UI
↓
Validate Account
↓
Generate execution evidence
```

The goal is evidence-driven validation.

Not simple UI automation.

---

# Reporting Mindset

Before implementing a new feature, ask:

"What evidence will this generate?"

If the answer is "none", reconsider the implementation.

---

# Navigation Strategy

Prefer stable navigation.

When Salesforce modules can be accessed directly:

```text
/lightning/o/Account/list
/lightning/o/Contact/list
/lightning/o/Opportunity/list
/lightning/o/Task/list
```

prefer direct navigation over unnecessary UI clicks.

However, observability must always be preserved.

---

# Documentation

Document important workflows.

Document architectural decisions.

Document non-obvious implementation choices.

Future maintainers should understand why a decision was made.

---

# Architectural Decision Records (ADR)

## Purpose

Architectural Decision Records preserve the reasoning behind important technical decisions.

The goal is to answer:

* What was decided?
* Why was it decided?
* What alternatives were considered?
* What tradeoffs were accepted?

This prevents architectural knowledge from being lost over time.

---

## When To Create An ADR

Create an ADR when a decision:

* Changes architecture
* Establishes a project standard
* Impacts maintainability
* Impacts observability
* Impacts reporting
* Impacts evidence collection
* Introduces a long-term pattern

Examples:

* ExecutionContext architecture
* Hybrid testing strategy
* Reporting architecture
* Dashboard architecture
* AI integration
* Salesforce navigation

---

## ADR Template

```md
# ADR-XXX - Decision Title

## Status

Accepted

## Date

YYYY-MM-DD

## Context

Describe the problem.

## Decision

Describe the chosen solution.

## Alternatives Considered

### Option A

Pros:
- Item

Cons:
- Item

### Option B

Pros:
- Item

Cons:
- Item

## Consequences

Describe tradeoffs and expected outcomes.

## Notes

Additional observations.
```

---

# Existing Architectural Decisions

## ADR-001 - ExecutionContext For Observability

Status: Accepted

Decision:

ExecutionContext is the single source of truth for execution observability.

Reason:

Provides structured evidence collection and reporting.

---

## ADR-002 - Evidence Driven Testing

Status: Accepted

Decision:

Tests should generate evidence, not only pass/fail results.

Reason:

Execution history is more valuable than a binary result.

---

## ADR-003 - Hybrid Testing Strategy

Status: Accepted

Decision:

Combine API and UI validation whenever possible.

Reason:

Provides faster setup and stronger validation.

---

## ADR-004 - Direct Salesforce Navigation

Status: Accepted

Decision:

When stable Salesforce URLs exist, prefer direct navigation.

Examples:

* /lightning/o/Account/list
* /lightning/o/Contact/list
* /lightning/o/Opportunity/list
* /lightning/o/Task/list

Reason:

Faster execution, fewer UI dependencies, improved stability.

Observability must still be preserved.

---

# AI Assistant Notes

When helping with this project:

* Preserve observability.
* Preserve execution flow generation.
* Preserve evidence collection.
* Preserve reporting capabilities.
* Prefer simple and explicit solutions.
* Avoid overengineering.
* Avoid unnecessary abstractions.
* Reuse existing patterns whenever possible.
* Consider current project architecture before proposing new classes.
* Follow the coding style already present in the project.
* Consider execution-flow.json impact before proposing changes.
* Consider execution-report.json impact before proposing changes.
* Think of the project as a Quality Engineering Platform, not just a Playwright framework.
* Prioritize maintainability over sophistication.
* Prefer solutions that are easy to explain in interviews, GitHub repositories, and YouTube videos.
* If unsure between two approaches, choose the one that is easier for humans to understand.
* Suggest architectural improvements when appropriate.
* Always consider observability, evidence generation, diagnostics, and reporting before proposing code.

---

# Final Rule

The framework should continuously evolve.

However, every evolution should improve at least one of the following:

* Observability
* Evidence Collection
* Diagnostics
* Reporting
* Maintainability
* Learning Value

Automation alone is not enough.

The long-term objective is to build a modern, observable, evidence-driven Quality Engineering Platform.
