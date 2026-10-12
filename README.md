# Raghav Mittal — Developer Portfolio

A single-page React portfolio showcasing selected projects, professional experience, skills, education and contact details.

Website: [raghavmittal.co.uk](https://raghavmittal.co.uk)

## Stack and structure

React 18, Vite 6, plain CSS, Vercel Analytics and Playwright.

| Path | Purpose |
|---|---|
| `src/main.jsx` | Page components and project/experience/skills/education content |
| `src/styles.css` | Responsive page styling |
| `public/` | Profile photo, CV and locally hosted project media |
| `tests/portfolio.spec.js` | Browser checks |
| `playwright.config.js` | Desktop/mobile projects and target URL |
| `vite.config.js` | Vite React plugin |

## Local setup

Use Node.js 22 LTS and npm. Git is needed only for cloning; alternatively extract a ZIP and open its root folder in a terminal.

```bash
git clone https://github.com/mittalraghav45/raghav-portfolio.git
cd raghav-portfolio
npm install
npm run dev
```

Open the URL printed by Vite, normally http://localhost:5173. Stop with Ctrl+C. No backend, database or environment file is needed for the current page.

Use `npm install` for the current snapshot because its lockfile differs from `package.json`. The repository also tracks some Windows-specific `node_modules` files. Install dependencies for your own operating system rather than relying on those copies. Removing tracked dependencies and synchronising the lockfile are follow-up housekeeping tasks.

## Edit content

Update the arrays and markup in `src/main.jsx`. Put local media in `public/` and reference it from the root, for example `/cloud-surgery-demo.webm`. The CV link uses `/Raghav_CV.pdf`; preserve filename case. Some project videos use external Dropbox links, so their availability depends on that service.

## Build and preview

```bash
npm run build
npm run preview
```

Build output is `dist/`. Preview normally serves http://localhost:4173. Vercel should use `npm run build` and `dist` as the output directory.

## Browser checks

Install Playwright's Chromium browser:

```bash
npx playwright install chromium
```

The test configuration defaults to the **published website**, and does not start a local server. For local checks, keep `npm run dev` running and use a second terminal.

macOS/Linux:
```bash
BASE_URL=http://localhost:5173 npm run test:e2e
```

PowerShell:
```powershell
$env:BASE_URL = "http://localhost:5173"
npm run test:e2e
```

The suite targets desktop Chromium and a mobile viewport. This documentation pass reviewed configuration; it did not certify the website or rerun the browser suite.

## Troubleshooting

- If Vite selects another port, use that exact URL in `BASE_URL`.
- Missing CV/photo/video: check the file exists in `public/` and matches case exactly.
- External video fails: check the original media URL and sharing permissions.
- Dependency/platform errors: reinstall dependencies locally; tracked Windows packages are not portable.
- Published changes depend on the connected hosting branch and a successful deployment.

This repository implements a portfolio page; technology names listed in its content are not necessarily dependencies used by the page itself.
