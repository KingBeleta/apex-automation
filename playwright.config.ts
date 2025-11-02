import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  fullyParallel: true,
  workers: 3,
  timeout: 60 * 1000,
  retries: 1,
  reporter: [['html', { outputFolder: 'test-results/html', open: 'never' }]],

  use: {
    headless: true,
    baseURL: 'https://demoqa.com',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
  },

  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
      },
    },
  ],
});
