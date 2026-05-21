# Salesforce Playwright Tests — Modern API Architecture

## Vision

Transform the current Playwright UI automation framework into a modern hybrid QA/SDET architecture combining:

- UI automation (Playwright)
- API automation (Salesforce REST API)
- Seed data strategy
- Backend validation
- Smart reusable clients
- Strong typing
- Enterprise-grade scalability
- Clean architecture
- Modern TypeScript patterns

---

# Target Architecture

```text
src/
 ├── api/
 │    ├── clients/
 │    │    ├── auth/
 │    │    │    └── SalesforceAuthClient.ts
 │    │    ├── base/
 │    │    │    ├── ApiClient.ts
 │    │    │    └── SalesforceApiClient.ts
 │    │    ├── leads/
 │    │    │    └── LeadsApiClient.ts
 │    │    ├── contacts/
 │    │    │    └── ContactsApiClient.ts
 │    │    ├── accounts/
 │    │    │    └── AccountsApiClient.ts
 │    │    └── tasks/
 │    │         └── TasksApiClient.ts
 │    │
 │    ├── builders/
 │    │    ├── LeadBuilder.ts
 │    │    ├── ContactBuilder.ts
 │    │    └── AccountBuilder.ts
 │    │
 │    ├── contracts/
 │    │    ├── SalesforceTokenResponse.ts
 │    │    ├── SalesforceCreateResponse.ts
 │    │    └── SalesforceErrorResponse.ts
 │    │
 │    ├── fixtures/
 │    │    └── api.fixture.ts
 │    │
 │    ├── helpers/
 │    │    ├── apiHeaders.ts
 │    │    ├── apiVersion.ts
 │    │    └── endpointBuilder.ts
 │    │
 │    └── services/
 │         ├── LeadSeedService.ts
 │         ├── ContactSeedService.ts
 │         └── CleanupService.ts
 │
 ├── components/
 ├── models/
 ├── pages/
 ├── test-data/
 └── utils/
```

---

# Architecture Philosophy

## 1. Thin Tests

Tests should describe behavior.

NOT implementation.

### Bad

```ts
await page.getByRole(...);
await page.fill(...);
await request.post(...);
```

### Good

```ts
await leadsApiClient.createLead(lead);

await leadsPage.openLead(lead.lastName);

await leadDetails.expectLeadVisible(lead.lastName);
```

---

## 2. API as Infrastructure

The API layer should become reusable infrastructure.

Meaning:

- UI tests can use it
- future API tests can use it
- seed data can use it
- cleanup services can use it
- reporting systems can use it
- future AI analysis can consume it

---

## 3. Builders Instead of Raw Objects

```ts
const lead = new LeadBuilder()
  .withFirstName("Maicon")
  .withLastName("Fang")
  .withCompany("TaskManagerPlus")
  .build();
```

Benefits:

- readable
- scalable
- reusable
- safer
- self-documenting
- avoids duplicated test-data

---

## 4. Services Layer

Tests should NOT know how data is created.

```ts
await leadSeedService.createDefaultLead();
```

Internally the service may:

- create account
- create contact
- create lead
- validate response
- attach metadata
- cleanup later

---

# Recommended API Flow

## Current Style

```text
UI creates lead
UI validates lead
```

Problems:

- slow
- flaky
- coupled to UI
- difficult setup

---

## Modern Hybrid Style

```text
API creates lead
↓
UI validates lead
↓
API validates backend
↓
API cleans environment
```

Benefits:

- faster
- deterministic
- scalable
- cleaner
- less flaky
- easier maintenance

---

# Recommended Environment Variables

```env
SF_BASE_URL=https://login.salesforce.com
SF_API_VERSION=v61.0

SF_CLIENT_ID=
SF_CLIENT_SECRET=

SF_USERNAME=
SF_PASSWORD=
SF_SECURITY_TOKEN=
```

---

# Modern Authentication Design

## SalesforceAuthClient.ts

Responsibilities:

- authenticate
- cache token
- refresh token
- expose access token
- isolate OAuth logic

---

# Recommended API Base Class

## ApiClient.ts

Responsibilities:

- request wrapper
- logging
- retries
- response validation
- timeout management
- error normalization
- headers

---

# Recommended Salesforce Base Client

## SalesforceApiClient.ts

Responsibilities:

- build Salesforce endpoints
- inject auth token
- inject API version
- create Salesforce requests
- common CRUD methods

```ts
await this.post("/sobjects/Lead", payload);
```

---

# Recommended Contracts Layer

```ts
interface SalesforceCreateResponse {
  id: string;
  success: boolean;
  errors: string[];
}
```

Benefits:

- autocomplete
- maintainability
- readability
- confidence
- refactor safety

---

# Recommended Builders Layer

## LeadBuilder.ts

```ts
const lead = LeadBuilder.default()
  .withCompany("OpenAI")
  .build();
```

---

# Recommended Seed Service

## LeadSeedService.ts

```ts
const lead = await leadSeedService.createLead();
```

Internal flow:

```text
build payload
↓
authenticate
↓
call Salesforce API
↓
validate response
↓
return typed object
```

---

# Recommended Test Style

## BEFORE

```ts
await page.goto(...);
await page.fill(...);
await page.click(...);
```

---

## AFTER

```ts
const lead = await leadSeedService.createLead();

await leadsPage.navigation.open();

await leadsPage.search.searchByText(lead.lastName);

await leadsPage.details.expectLeadVisible(lead.lastName);
```

---

# Smart Future Evolutions

## Phase 1 — Foundation

- OAuth auth client
- Base API client
- Leads API client
- First hybrid test

---

## Phase 2 — Smart Data

- Builders
- Randomized test data
- Seed services
- Cleanup services

---

## Phase 3 — Enterprise Layer

- Retries
- Logging
- Request interceptors
- Response interceptors
- API reporting
- Correlation IDs

---

## Phase 4 — Advanced QA Engineering

- Parallel seed creation
- API fixtures
- Smart cleanup tracking
- Automatic rollback
- Snapshot validation
- Contract validation

---

## Phase 5 — AI + Intelligent Automation

- Failure classification
- API anomaly detection
- Smart retry decisions
- AI-generated seed combinations
- Backend health scoring

---

# Recommended Immediate Next Step

1. Create `src/api`
2. Create `SalesforceAuthClient.ts`
3. Create `ApiClient.ts`
4. Create `SalesforceApiClient.ts`
5. Create `LeadsApiClient.ts`
6. Create first API Lead creation
7. Create first hybrid test
8. Add builders
9. Add services layer

---

# Final Recommendation

Your project is already moving beyond a simple Playwright portfolio.

The architecture direction you are taking now is much closer to:

- SDET frameworks
- Enterprise QA platforms
- Modern automation ecosystems
- API-first automation
- Scalable hybrid testing
- Intelligent test infrastructure

The key now is:

- preserve readability
- avoid overengineering too early
- evolve incrementally
- keep infrastructure reusable
- keep tests declarative

That combination is what makes frameworks feel modern, senior-level, and production-ready.
