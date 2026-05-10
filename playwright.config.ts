
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

console.log('Loaded BASE_URL:', process.env.BASE_URL);

export default defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL,
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});

