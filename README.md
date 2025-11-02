# Apex Automation (Playwright + TypeScript)

End-to-end automated testing framework for Apex demo web apps, built with **Playwright**, **TypeScript**, and **Modular Utilities** for reusable and maintainable test scripts.

---

### 🚀 Features

- ✅ Modular Page Object + Utility structure  
- 🔁 Serial and Parallel test execution  
- 🧰 Reusable test data and locators  
- 📸 Automatic screenshot and video recording  
- 🧼 Cache and cookie clearing before each test  
- 📊 HTML, JSON, and video reports for analysis


### 📹 Test Artifacts

Screenshots, videos, and reports are automatically stored in test-results/.

These are excluded from version control using .gitignore.


### 🤖 Tech Stack

- Playwright
- TypeScript
- Node.js
- JavaScript utilities
- JSON-based test data


### ⚙️ Setup Instructions

#### 1. Clone the repo
- git clone https://github.com/KingBeleta/apex-automation.git
- cd apex-automation

#### 2. Install dependencies
- npm install

#### 3. Run Tests
- All Tests(Parallel) = npx playwright test

- Individually(Serial) = Ctrl + ; F


### 🔭 Scope

• **Web Tables: Edit values in the table, submit the form, and verify the changes are saved.**

• **Forms: Fill and submit the student form using multiple data sets.**

• **Widgets (Select Menu): Select a value from each type of dropdown.**


### 💡 Test Strategy

This project follows a **data-driven testing approach**, allowing a **single reusable test** to validate multiple scenarios through different sets of test data.

One test script, many datasets

### 🧩 Key Principles:
- **One test script, many datasets**  
  Each test dynamically loads data from JSON files (e.g. `td.studentData.json`), iterating through multiple student profiles or form inputs.
- **Serial execution for shared states**  
  Within each test file, executions run in serial mode (`test.describe.serial`) to maintain consistency where data overlap might occur.
- **Parallel execution across suites**  
  Independent modules (Forms, Widgets, WebTables, etc.) are run in parallel for faster execution.
- **Generic Utility Functions**  
  Common interactions like field input, dropdown selection, or modal verification are handled via reusable helpers in `/utils/`.
- **Environment Stability**  
  Each test starts with a clean browser context—cookies, cache, and sessions are cleared to ensure data isolation.


