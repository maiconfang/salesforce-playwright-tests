import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  use: {
    baseURL: process.env.BASE_URL,

    headless: true,

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
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],
});