import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Playwright configuration for the Salesforce automation framework.
 *
 * This configuration defines:
 * - global test behavior
 * - execution timeouts
 * - browser/runtime settings
 * - multi-project execution strategy
 * - authentication setup flow
 * - UI/API project separation
 *
 * Architecture Overview:
 *
 * The framework uses a multi-project Playwright architecture
 * to isolate different execution responsibilities:
 *
 * - setup     → authentication/bootstrap
 * - chromium  → UI/browser automation
 * - api       → API/service validation
 *
 * Benefits:
 * - clearer execution boundaries
 * - better scalability
 * - isolated execution contexts
 * - improved maintainability
 * - enterprise-style organization
 * - optimized CI/CD execution
 *
 * UI Project:
 * - Executes browser-based tests
 * - Uses authenticated storageState
 * - Focused on business flows and UI validation
 *
 * API Project:
 * - Executes API-only tests
 * - Does not launch browser instances
 * - Optimized for backend/service validation
 *
 * Execution Observability:
 * - UI tests generate execution-flow.json artifacts
 * - Execution telemetry is isolated per test
 * - Supports structured execution tracking
 * - Enables future observability dashboards and AI analysis
 *
 * Execution Isolation:
 * - UI tests only run under tests/ui
 * - API tests only run under tests/api
 * - Prevents cross-project execution conflicts
 *
 * This configuration was designed incrementally
 * as part of the framework evolution process,
 * focusing on readability, scalability,
 * execution clarity, and maintainability.
 */
export default defineConfig({

  testDir: './tests',

  fullyParallel: false,

  timeout: 60000,

  expect: {
    timeout: 15000,
  },

  use: {

    baseURL:
      process.env.BASE_URL,

    headless: true,

    actionTimeout: 15000,

    permissions: ['geolocation'],

    geolocation: {
      latitude: 46.0878,
      longitude: -64.7782,
    },

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',
  },

  projects: [

    /**
     * Authentication setup project.
     *
     * Responsible for:
     * - authenticating the user
     * - generating storageState
     * - preparing authenticated UI sessions
     */
    {
      name: 'setup',

      testMatch: /.*\.setup\.ts/,

      use: {
        storageState: undefined,
      },
    },

    /**
     * UI automation project.
     *
     * Executes:
     * - Playwright UI tests
     * - Browser-based Salesforce flows
     * - End-to-end user interactions
     *
     * Uses authenticated session generated
     * by the setup project.
     */
    {
      name: 'chromium',

      dependencies: ['setup'],

      testMatch: [
        'tests/ui/**/*.spec.ts',
      ],

      use: {
        storageState:
          'playwright/.auth/user.json',
      },
    },

    /**
     * Dedicated API project.
     *
     * Avoids:
     * - Browser startup
     * - UI authentication
     * - storageState dependencies
     *
     * Recommended for:
     * - REST API tests
     * - Salesforce integrations
     * - Service validation
     * - Contract testing
     */
    {
      name: 'api',

      testMatch: [
        'tests/api/**/*.spec.ts',
      ],

      use: {

        baseURL:
          process.env.SF_INSTANCE_URL,

        headless: true,
      },
    },
  ],
});