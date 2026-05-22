import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

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

    {
      name: 'setup',

      testMatch: /.*\.setup\.ts/,

      use: {
        storageState: undefined,
      },
    },

    {
      name: 'chromium',

      dependencies: ['setup'],

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

      use: {

        baseURL:
          process.env.SF_INSTANCE_URL,

        headless: true,
      },
    },
  ],
});