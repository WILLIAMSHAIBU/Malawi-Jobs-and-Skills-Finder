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

Use a local web server because the application uses ES modules:

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000/index.html>.

## Project structure

- `src/main.js` starts the home page
- `src/jobs.js` manages remote-job search
- `src/skills.js` manages repository search
- `src/favorites.js` renders saved items
- `src/remotive.js` and `src/github.js` communicate with the APIs
- `src/storage.js` manages browser favourites
- `src/display.js` creates consistent resource cards
- `src/navigation.js` manages responsive navigation