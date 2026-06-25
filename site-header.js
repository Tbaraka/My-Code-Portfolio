const NAV_ITEMS = [
  { href: 'index.html', label: 'index.html' },
  { href: 'about.html', label: 'about.md' },
  { href: 'projects.html', label: 'projects.json' },
  { href: 'contact.html', label: 'contact.json' }
];

function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop();
  return page || 'index.html';
}

function renderHeader(container) {
  const currentPage = getCurrentPage();
  const tabs = NAV_ITEMS.map((item) => {
    const activeClass = item.href === currentPage ? ' active' : '';
    return `<a href="${item.href}" class="tab${activeClass}">${item.label}</a>`;
  }).join('');

  container.innerHTML = `
    <div class="titlebar">
      <div class="traffic-lights">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <nav class="tabs" aria-label="Primary">
        ${tabs}
      </nav>
    </div>
  `;
}

document.querySelectorAll('[data-site-header]').forEach(renderHeader);
