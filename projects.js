const REPOS = [
  'cyber-essentials-labs',
  'cryptography-labs-',
  'simamaCV',
  'Distributed-Key-Value-Store',
  'Supervised-ML',
  'ibia'
];

const GITHUB_USER = 'Tbaraka';

const LANG_COLORS = {
  JavaScript: '#e6b450',
  Python: '#2dd4bf',
  HTML: '#f07178',
  CSS: '#7aa2f7',
  'C++': '#bb9af7',
  Kotlin: '#9ece6a'
};

function formatRepoName(name) {
  return name
    .replace(/-+$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderSkeletons(grid) {
  grid.innerHTML = REPOS.map(() => '<div class="project-card skeleton"></div>').join('');
}

function renderCards(grid, repos) {
  grid.innerHTML = repos
    .map((repo) => {
      const langColor = LANG_COLORS[repo.language] || null;
      const langBadge = repo.language
        ? `<span class="project-lang"${langColor ? ` style="--lang-color:${langColor}"` : ''}>${escapeHtml(repo.language)}</span>`
        : '';

      return `
        <a class="project-card" href="${repo.html_url}" target="_blank" rel="noopener">
          <div class="project-card-header">
            <h3 class="project-name">${escapeHtml(formatRepoName(repo.name))}</h3>
            ${langBadge}
          </div>
          <p class="project-description">${escapeHtml(repo.description || 'No description provided.')}</p>
          <div class="project-footer">
            <span class="project-stars">★ ${repo.stargazers_count}</span>
            <span class="project-link">View repo →</span>
          </div>
        </a>
      `;
    })
    .join('');
}

function renderRepoLinkFallback(grid) {
  grid.innerHTML = REPOS.map((name) => {
    const displayName = escapeHtml(formatRepoName(name));
    const repoUrl = `https://github.com/${GITHUB_USER}/${name}`;
    return `
      <a class="project-card" href="${repoUrl}" target="_blank" rel="noopener">
        <div class="project-card-header">
          <h3 class="project-name">${displayName}</h3>
        </div>
        <p class="project-description">Open this repository on GitHub.</p>
        <div class="project-footer">
          <span class="project-stars">-</span>
          <span class="project-link">View repo →</span>
        </div>
      </a>
    `;
  }).join('');
}

async function loadProjects() {
  const grid = document.getElementById('project-grid');
  const fallback = document.getElementById('fallback-note');
  if (!grid) return;

  renderSkeletons(grid);

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: 'application/vnd.github+json'
      }
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const allRepos = await res.json();
    const repoMap = new Map(allRepos.map((repo) => [repo.name.toLowerCase(), repo]));
    const featuredRepos = REPOS.map((name) => repoMap.get(name.toLowerCase())).filter(Boolean);
    const missingRepos = REPOS.filter((name) => !repoMap.has(name.toLowerCase()));

    if (!featuredRepos.length) {
      throw new Error('No featured repos found.');
    }

    if (missingRepos.length) {
      console.warn('Some featured repos were not found and were skipped:', missingRepos);
    }

    renderCards(grid, featuredRepos);
  } catch (err) {
    console.error(err);
    renderRepoLinkFallback(grid);
    if (fallback) fallback.hidden = false;
  }
}

loadProjects();
