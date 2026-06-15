// --- Curated list of repos to feature. ---

const REPOS = [
  'Distributed-Key-Value-Store',
  'MamaFua-Pro',
  'Supervised-ML',
  'LinearModelsML',
  'cyber-essentials-labs',
  'cryptography-labs-',
  'Rock-Paper-Scissor-Game-'
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

async function loadProjects() {
  const grid = document.getElementById('project-grid');
  const fallback = document.getElementById('fallback-note');
  if (!grid) return;

  renderSkeletons(grid);

  try {
    const results = await Promise.all(
      REPOS.map((repo) =>
        fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo}`).then((res) => {
          if (!res.ok) throw new Error(`GitHub API error for ${repo}: ${res.status}`);
          return res.json();
        })
      )
    );

    renderCards(grid, results);
  } catch (err) {
    console.error(err);
    grid.innerHTML = '';
    if (fallback) fallback.hidden = false;
  }
}

loadProjects();
