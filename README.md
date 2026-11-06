# GrowFund

A crowdfunding web app where campaign creators raise money for their causes and donors discover and support campaigns. Built as the final team project of the [Gaza Sky Geeks](https://gazaskygeeks.com) Code to Career frontend program (Aug – Dec 2025).

**Live:** [grow-fund-beta.vercel.app](https://grow-fund-beta.vercel.app)

## Features

- Campaign discovery with search and filtering, plus campaign creation
- Campaign details page with donation checkout
- Donation success and failure pages, and printable invoices
- Donor home and donor profile pages
- Campaign creator profile
- Notifications
- Authentication: register, login, role selection, password recovery

## Tech stack

| Area | Tools |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript (strict) |
| Styling | Tailwind CSS v4, Radix UI primitives |
| Data | TanStack Query, Axios |
| Forms | React Hook Form with schema validation |
| Quality | ESLint, Prettier |
| Deploy | Vercel |

## Team and my role

This was a team project with 6 contributors ([see contributors](https://github.com/ZenatyAh/grow-fund/graphs/contributors)).

I was the **team lead**: I split the work into tasks, planned the sprints in Jira, merged pull requests into the `stage` branch, and tracked milestones.

I also set up the project foundation the team built on:
- Initialized the Next.js + TypeScript + Tailwind project and its folder structure
- Chose and installed the core libraries (TanStack Query, React Hook Form, Zod)
- Configured ESLint, and wrote the initial project docs and API specs

As a developer, I built or worked on these pages:
- Campaigns list with filtering and sharing
- Campaign details and checkout
- Donation success and failure pages
- Donor home and donor profile
- Campaign creator profile

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

More documentation (architecture, conventions, onboarding) is in [`docs/`](./docs).

## Author

**Ahmed Zenaty** · [GitHub](https://github.com/ZenatyAh) · [LinkedIn](https://www.linkedin.com/in/ahmed-zenaty/)
