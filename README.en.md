<div align="center">

# Evgeny.dev

**A developer's personal portfolio · Android / Web / UI & UX**

Thoughtful applications, modern interfaces and digital products.

[Русский](README.md) · [English](README.en.md) · [Development guide (RU)](docs/DEVELOPMENT.md) · [Get in touch](https://t.me/moii_telega)

![React 19](https://img.shields.io/badge/React_19-171717?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-171717?style=flat&logo=typescript&logoColor=white)
![Vite 8](https://img.shields.io/badge/Vite_8-171717?style=flat&logo=vite&logoColor=white)
![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-171717?style=flat&logo=tailwindcss&logoColor=white)

![Evgeny.dev cover — Building Digital Experiences](public/assets/social-preview.png)

</div>

## The project

Evgeny's portfolio brings together custom project covers, a live GitHub catalog and an interactive terminal. A monochrome palette, expressive typography and fluid motion connect the work, the stack and the developer's story.

The site is a static application. No backend or API keys are required to get started.

## Features

| | What to explore |
| :--- | :--- |
| **Project catalog** | Filters, detailed project dialogs and GitHub synchronization with cached or local data when the API is unavailable. |
| **Two languages** | English and Russian, browser language detection and a saved manual preference. |
| **Motion** | GSAP, Motion and Lenis power smooth scrolling, transitions and a character navigation HUD with section titles and scroll progress. |
| **Interactive terminal** | Run `help`, `skills`, `contact`, `cat about.txt`, `sudo hire-me` or `clear`. Includes command history and shortcuts. |
| **Accessibility** | Keyboard-operated dialogs, focus management and reduced motion support. |
| **Contact form** | Connect an HTTP endpoint or prepare an email in the visitor's mail client. |

## Quick start

Requires **Node.js 22.12+** and **npm 10+**. Recommended project environment: Node.js 24 and npm 11.19.0.

```sh
git clone https://github.com/moii-dev/Evgeny.dev.git
cd Evgeny.dev
npm ci --ignore-scripts
npm run dev
```

Open [localhost:3000](http://localhost:3000). Local development works without an `.env` file.

## Make it yours

| Content | Source |
| :--- | :--- |
| Projects, descriptions and covers | [`src/data/featuredProjects.ts`](src/data/featuredProjects.ts) |
| Technologies and categories | [`src/data/techStack.ts`](src/data/techStack.ts) |
| Contact details and availability | [`src/config/contactConfig.ts`](src/config/contactConfig.ts) |
| GitHub account to synchronize | `fetchGitHubRepos` call in [`src/App.tsx`](src/App.tsx) |
| Translations | [`src/i18n/locales/`](src/i18n/locales/) |
| Portrait, images and fonts | [`public/assets/`](public/assets/) |

For deployment, copy [`.env.example`](.env.example) to `.env.local`, set `VITE_SITE_URL` and run `npm run build`. Publish the resulting `dist/` directory to a static host. All `VITE_` values are public; never store secrets in them. `VITE_BASE_PATH` optionally overrides the deployment subdirectory inferred from the site URL.

`VITE_CONTACT_FORM_ENDPOINT` connects an optional HTTP(S) form endpoint; leaving it empty uses the mail client flow. `VITE_TELEGRAM_URL` overrides the Telegram profile.

## Validation

```sh
npm test                  # Unit tests
npm run lint              # Strict TypeScript checks
npm run build             # Typecheck and production build
npm run test:browser      # Browser regressions
npm run test:i18n:browser # Localization checks
```

Before browser checks, build the app and install Chromium (`npx playwright install chromium`) or set `CHROME_PATH`. [GitHub Actions](https://github.com/moii-dev/Evgeny.dev/actions/workflows/checks.yml) runs typecheck, unit tests, the build and the main browser suite on pushes and pull requests.

## Further reading

- [Development, deployment and browser testing (RU)](docs/DEVELOPMENT.md)
- [Contributing](CONTRIBUTING.md)
- Quality history: [initial audit](PROJECT_AUDIT.md), [fix report](PROJECT_FIX_REPORT.md), [follow-up audit](PROJECT_AUDIT_AFTER.md)

---

<div align="center">

**Have a project in mind?**

[Telegram](https://t.me/moii_telega) · [Email](mailto:eugene.oshepkov.work@gmail.com) · [GitHub](https://github.com/moii-dev)

</div>
