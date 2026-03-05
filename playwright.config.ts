import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './src/tests',

    fullyParallel: true,

    reporter: 'html',

    use: {
        baseURL: 'https://practicesoftwaretesting.com',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
    ],
});