# My Code Portfolio

A personal portfolio for **Teddy Baraka**, focused on **red team cybersecurity** and **AI-powered solutions**.  
The site is a static multi-page experience styled like a code editor:
- `index.html` as a terminal-style intro
- `about.html` as a `README.md` profile
- `projects.html` as a live GitHub-backed project view
- `contact.html` as a `contact.json` view

**Live site:** [teddyportfolio.vercel.app](https://teddyportfolio.vercel.app)

## Project structure

| File | Purpose |
|---|---|
| `index.html` | Homepage and quick links |
| `about.html` | Red team + AI profile details |
| `projects.html` | Project cards container and fallback messaging |
| `contact.html` | Contact details |
| `style.css` | Shared styling tokens and page styles |
| `site-header.js` | Shared header/nav renderer for all pages |
| `projects.js` | Loads and renders featured GitHub repositories |

## Running locally

No build step is required:

```bash
python3 -m http.server
```

Then open `http://localhost:8000`.

## Projects data

Featured repositories are controlled by the `REPOS` array in `projects.js`.

The projects page fetches repo data from:

`https://api.github.com/users/Tbaraka/repos?per_page=100&sort=updated`

Then it maps your `REPOS` list to the returned data and renders only matches.

## API reliability and fallback behavior

GitHub API requests can fail because of rate limits or temporary network/API issues.  
To keep the page usable, `projects.js` includes graceful fallbacks:
- If some repos are missing, available repos still render
- If API loading fails completely, clickable repo cards are still rendered from `REPOS`
- `projects.html` also shows a fallback note linking to your GitHub profile

## Tech stack

- HTML, CSS, vanilla JavaScript
- [GitHub REST API](https://docs.github.com/en/rest)
- Fonts via Google Fonts (JetBrains Mono, Inter)

## Deployment

Deployed on [Vercel](https://vercel.com) and auto-updated from `main`.

## Author

**Teddy Baraka**  
[GitHub](https://github.com/Tbaraka) · [LinkedIn](https://www.linkedin.com/in/teddy-baraka)
