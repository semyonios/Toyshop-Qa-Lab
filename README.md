# ToyShop QA Lab

Pet project for practicing manual QA and basic frontend quality engineering.

## Goal
Practice testing of a mini e-commerce application:
- Functional testing
- Bug reporting
- Test documentation
- Basic automation checks (lint, formatting, smoke tests)

## Tech Stack
- HTML / CSS / JavaScript
- LocalStorage (demo persistence)
- Node.js tooling: ESLint, Prettier, Node test runner
- GitHub Actions CI

## Important Note About Roles
`admin/user` role switching is a **frontend-only demo** for QA scenarios. It is not secure authentication and must be moved to backend/API in real production systems.

## Run Locally
1. Start static server (example):
   `python3 -m http.server 5500`
2. Open:
   `http://localhost:5500/index.html`

## Quality Commands
- `npm install`
- `npm run lint`
- `npm run format:check`
- `npm test`

## Status
In progress
