# Quality Dashboard Architecture

## Overview

The Quality Dashboard is a reporting and diagnostics platform designed to transform raw test execution artifacts into actionable quality intelligence.

Unlike traditional reporting tools that focus only on execution statistics, this solution combines execution results with execution context to provide deeper insights into failures, business flows, test data, and recommendations.

The platform currently generates a single consolidated artifact:

```text
execution-report.json
```

This report becomes the source of truth for future dashboards, analytics, AI integrations, and quality investigations.

---

# Vision

Traditional reports answer:

* Did the test pass?
* Did the test fail?

The Quality Dashboard aims to answer:

* What failed?
* Where did it fail?
* Which business flow was affected?
* Which data was involved?
* Why did it fail?
* What should be done next?

---

# Data Sources

## Source #1 - Playwright Results

File:

```text
reports/raw/playwright-results.json
```

Purpose:

Execution statistics and test outcomes.

Provides:

* Test name
* Status
* Duration
* Project
* Passed
* Failed
* Skipped

---

## Source #2 - Execution Flow

File:

```text
test-results/**/execution-flow.json
```

Purpose:

Execution context and diagnostics.

Provides:

* FLOW events
* ACTION events
* SUCCESS events
* DATA events
* ERROR events
* Timestamps
* Technical context
* Failure evidence

---

# Reporting Pipeline

```text
playwright-results.json
            │
            ▼
 PlaywrightResultsParser
            │
            ▼
     Parsed Results
            │
            ▼
 ExecutionContextParser
            │
            │ enriches using
            ▼
   execution-flow.json
            │
            ▼
     ExecutionReport
            │
            ▼
 execution-report.json
```

---

# Core Components

## PlaywrightResultsParser

Responsibilities:

* Read playwright-results.json
* Extract execution results
* Calculate basic execution metrics
* Build test result objects

Output:

```text
PlaywrightTestResult[]
```

---

## ExecutionContextParser

Responsibilities:

* Read execution-flow.json
* Correlate execution evidence
* Identify failures
* Extract test data
* Build diagnostics
* Generate intelligent insights

Output:

```text
ExecutionReport
```

---

# Current Report Structure

## Summary

Provides high-level execution metrics.

Example:

```json
{
  "summary": {
    "totalTests": 31,
    "executedTests": 24,
    "successRate": 95.83,
    "executionStatus": "UNSTABLE"
  }
}
```

---

## Statistics

Provides observability metrics.

Example:

```json
{
  "statistics": {
    "flows": 47,
    "actions": 9,
    "successes": 50,
    "dataEvents": 32,
    "errors": 2
  }
}
```

---

# Failure Intelligence

## Failure Journey

Captures the path that led to the failure.

Example:

```json
{
  "failureJourney": {
    "businessFlow": "Filling Lead form",
    "lastSuccessfulStep": "Rating",
    "failedStep": "No. of Employees"
  }
}
```

Benefits:

* Faster troubleshooting
* Better failure visibility
* Easier root cause analysis

---

## Root Cause Analysis

Example:

```json
{
  "rootCause": "LOCATOR_FAILURE"
}
```

---

## Recommendation Engine

Example:

```json
{
  "recommendation":
    "Verify locator strategy and accessible name."
}
```

---

# Test Data Visibility

The platform captures the data used during execution.

Example:

```json
{
  "testData": [
    {
      "field": "Company",
      "value": "IT QA"
    },
    {
      "field": "Rating",
      "value": "Hot"
    }
  ]
}
```

Benefits:

* Faster reproduction
* Better debugging
* Improved traceability

---

# Business Impact

Provides business-level context.

Example:

```json
{
  "businessImpact": {
    "flow": "Filling Lead form",
    "failedStep": "No. of Employees",
    "recordsAffected": 1
  }
}
```

Purpose:

* Understand affected flows
* Measure impact
* Improve prioritization

---

# Current Value Delivered

Today the platform can answer:

## What failed?

```text
should create a new lead
```

## Where did it fail?

```text
No. of Employees
```

## Which flow failed?

```text
Filling Lead form
```

## Why did it fail?

```text
LOCATOR_FAILURE
```

## What should be done?

```text
Verify locator strategy and accessible name.
```

## Which data was involved?

```text
Company = IT QA
Rating = Hot
```

---

# Dashboard Vision

Future React dashboard views may include:

* Executive Summary
* Failed Tests
* Failure Journey
* Test Data Explorer
* Business Impact View
* Recommendations
* Quality Insights

The dashboard will consume:

```text
execution-report.json
```

without directly reading Playwright artifacts.

---

# Future Evolution

Potential future enhancements:

* Timeline Visualization
* Top Failures
* Recommended Actions
* Quality Insights
* Impacted Components
* Historical Trends
* AI Analysis
* Agent-Based Investigation

---

# Key Takeaway

The objective is not to build another test report.

The objective is to transform execution data into quality intelligence.

```text
Test Results
+
Execution Context
=
Intelligent Report
```
