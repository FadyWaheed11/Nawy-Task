# Nawy Task - Playwright Automation Framework

**GitHub Repository:** [https://github.com/FadyWaheed11/Nawy-Task.git](https://github.com/FadyWaheed11/Nawy-Task.git)

This repository contains an automated testing framework built with [Playwright](https://playwright.dev/) and TypeScript.

## 📁 Project Structure

The automation project follows an organized structure based on the Page Object Model (POM) and modular architecture:

```text
Nawy-Task/
├── .github/                 # GitHub Actions CI/CD workflows
├── src/                     # Source folder containing the core framework
│   ├── apis/                # API helper classes and request definitions
│   ├── pages/               # Page Object Model (POM) UI classes
│   ├── test-data/           # Test fixtures, JSON files, etc.
│   ├── tests/               # Playwright test execution files (*.spec.ts)
│   └── utils/               # Common helper functions and utilities
├── package.json             # Project dependencies and configurations
├── package-lock.json        # Dependency lock file
├── playwright.config.ts     # Main Playwright configuration definition
└── auth.json                # Saved authentication state
```

## 🚀 How to Install Dependencies

To get started, make sure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/FadyWaheed11/Nawy-Task.git
   cd Nawy-Task
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Install required Playwright browser binaries:
   ```bash
   npx playwright install
   ```

## 🧪 How to Run Tests Locally

You can run the full UI and API test suite locally by running the default Playwright test command:

```bash
# Run all tests in headless mode
npx playwright test

# Run all tests in UI mode (Interactive)
npx playwright test --ui

# Run tests with a visible browser (Headed mode)
npx playwright test --headed
```

Once the tests complete, you can view the HTML report using:

```bash
npx playwright show-report
```

## 🌐 How to Run Tests in Different Browsers

The framework uses `playwright.config.ts` which is set up to run against multiple browser engines. You can specify a targeted browser engine using the `--project` flag.

Run tests exclusively in **Chromium** (represents Google Chrome, Microsoft Edge):
```bash
npx playwright test --project=chromium
```

Run tests exclusively in **Firefox**:
```bash
npx playwright test --project=firefox
```

If you wish to run tests in all configured browsers concurrently:
```bash
npx playwright test
```
