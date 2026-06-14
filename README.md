# My Code Portfolio

A personal developer portfolio for **Teddy Baraka**, built as a static, multi-page site styled like a code editor. The homepage opens as a terminal, the about page reads like a `README.md`, the contact page is a `contact.json` view, and the projects page pulls live data from the GitHub API.

**Live site:** [teddyportfolio.vercel.app](https://teddyportfolio.vercel.app)

## Live structure

| Page | Description |
|---|---|
| `index.html` | Terminal-style hero with a typed intro and links to the other "files" |
| `about.html` | Bio and tech stack, styled as a README file view |
| `projects.html` | Project grid populated live from the GitHub API (see [Projects data](#projects-data)) |
| `contact.html` | Contact details styled as a JSON file |
| `style.css` | Shared stylesheet — all design tokens (colors, type, spacing) live here as CSS variables |
| `projects.js` | Fetches repo data from GitHub and renders the project cards |

## Running locally

This is a static site — no build step required. From the project root:

```bash
python3 -m http.server
```

Then open `http://localhost:8000` in your browser. Opening `index.html` directly via `file://` also works for everything except the projects page, since some browsers block API requests from `file://` origins — use the local server for the full experience.

## Projects data

`projects.html` doesn't hardcode project descriptions. Instead, `projects.js` fetches each repo's live metadata (description, primary language, star count) from `https://api.github.com/repos/Tbaraka/<repo-name>`.

To add, remove, or reorder projects, edit the `REPOS` array at the top of `projects.js`:

```js
const REPOS = [
  'redstore-',
  'slot-machine-',
  // add or remove repo names here
];
```

Since the descriptions come straight from GitHub, **keep each featured repo's "About" description on GitHub up to date** — that's what visitors will see here.

If the GitHub API is unreachable or rate-limited, the page falls back to a message linking to the GitHub profile directly, and a `<noscript>` block provides static links for visitors without JavaScript.

## Customizing the design

All colors, fonts, and spacing are defined as CSS variables at the top of `style.css`:

```css
:root {
  --bg: #0a0e14;
  --accent: #2dd4bf;
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Inter', sans-serif;
  /* ... */
}
```

Changing these values updates the look across every page consistently.

## Tech stack

- HTML, CSS, vanilla JavaScript — no framework or build tools
- [GitHub REST API](https://docs.github.com/en/rest) for live project data
- Fonts: [JetBrains Mono](https://www.jetbrains.com/lp/mono/) and [Inter](https://rsms.me/inter/), via Google Fonts

## Deployment

Deployed on [Vercel](https://vercel.com) at [teddyportfolio.vercel.app](https://teddyportfolio.vercel.app), redeploying automatically on pushes to `main`. As a static site with no build step, any static host (Vercel, Netlify, GitHub Pages) works equally well.

## Author

**Teddy Baraka** — [GitHub](https://github.com/Tbaraka) · [LinkedIn](https://www.linkedin.com/in/teddy-baraka)
