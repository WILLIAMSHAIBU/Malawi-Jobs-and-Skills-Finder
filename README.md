# Malawi Jobs and Skills Finder

A responsive, dependency-free web application that brings remote opportunities
and programming learning resources together.

## Pages

- `index.html` - home page with featured jobs and repositories
- `jobs.html` - Remotive job search and category filters
- `skills.html` - GitHub repository search and language filters
- `favorites.html` - saved jobs and repositories from `localStorage`

## APIs

- Remotive: `https://remotive.com/api/remote-jobs`
- GitHub: `https://api.github.com/search/repositories`

Both APIs are public. Their usage limits and availability are controlled by the
providers.

## Run locally

Install Node.js 20.19 or newer, then install the project dependencies:

```sh
npm install
```

Start the Vite development server:

```sh
npm run dev
```

Vite prints the local URL when the server starts.

Create and preview a production build:

```sh
npm run build
npm run preview
```

The production files are written to `dist/`. All four HTML pages are included
in the build.

## Project structure

- `src/main.js` starts the home page
- `src/jobs.js` manages remote-job search
- `src/skills.js` manages repository search
- `src/favorites.js` renders saved items
- `src/remotive.js` and `src/github.js` communicate with the APIs
- `src/storage.js` manages browser favourites
- `src/display.js` creates consistent resource cards
- `src/navigation.js` manages responsive navigation