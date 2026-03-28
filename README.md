# 🤵 Butler CV

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

A fast, minimal, and opinionated CV builder designed to create professional resumes in minutes, not hours.

---

## 🎯 Project Goal

**Butler CV** aims to remove the friction from CV creation. We believe you shouldn't need a design degree to look professional on paper.

- **ATS-Friendly**: Clean layouts that pass through automated screening systems.
- **Strong Defaults**: Pre-configured styles that look great out of the box.
- **Opinionated**: Fewer choices means less time wasted on fonts and margins.
- **Zero Account Required**: Your data stays in your browser.

---

## ✨ Features

- ⚡ **Live Preview**: See changes instantly as you type.
- 📋 **Form-Based Editing**: Simple inputs for all your career details.
- 🔄 **Sortable Sections**: Drag and drop to reorder your experience, skills, and more.
- 👁️ **Toggle Visibility**: Hide sections or entries without deleting them.
- 💾 **Local Autosave**: Data persists automatically to your browser's local storage.
- 📄 **PDF Export**: Generate high-quality PDFs using modern browser technologies.
- 🧪 **Regression Tested**: Core logic is covered by automated unit tests ensuring stability.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [MUI (Material UI)](https://mui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **PDF Generation**: [html2canvas](https://html2canvas.hertzen.com/) & [jsPDF](https://github.com/parallax/jsPDF)
- **Testing**: [Vitest](https://vitest.dev/), [Testing Library](https://testing-library.com/) & [Playwright](https://playwright.dev/)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/HenintsoaPaul/butler-cv.git

# Install dependencies
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install
```

### Development

```bash
# Start the development server
npm run dev
```

### Testing

We use Vitest for unit/integration testing and Playwright for end-to-end testing.

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run e2e tests in UI mode
npx playwright test --ui
```

---

## 🧩 CV Sections

- **Personal Information**: Name, Title, Contact Info, Summary.
- **Professional Experience**: Roles, Companies, Dates, Achievements.
- **Education**: Degrees, Institutions, GPA.
- **Skills**: Categorized skills (Languages, Tools, etc.).
- **Projects**: Portfolio highlights with links.
- **Certifications**: Professional credentials.

---

## 🧠 Philosophy

> *"Less choice. Better defaults. Faster results."*

Butler CV focuses on content over decoration. By limiting customization to what actually matters for recruiters, we ensure you spend your time writing about your achievements rather than fighting with a text editor.

---

## 📋 Roadmap

- [ ] Multiple Template Styles (Modern, Elegant, Creative)
- [ ] AI-Assisted Content Suggestions
- [ ] Job-Specific CV Guidance
- [ ] Import from JSON/LinkedIn
- [ ] Cloud Synchronization (Opt-in)

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
