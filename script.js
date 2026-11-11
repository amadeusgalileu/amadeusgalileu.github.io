// Original portfolio order and image dimensions are preserved.
const NOTES = {};
const COUNT = 132;
const editorial = document.getElementById('editorial');
const overview = document.getElementById('overview');
const editorialTab = document.getElementById('editorialTab');
const overviewTab = document.getElementById('overviewTab');
const overviewGrid = document.createElement('div');
overviewGrid.className = 'overview-grid';
overview.append(overviewGrid);
let overviewScrollY = 0;
let openedFromOverview = false;
const backButton = document.createElement('button');
backButton.className = 'back-to-overview';
backButton.type = 'button';
backButton.textContent = '← BACK TO OVERVIEW';
backButton.hidden = true;
document.body.append(backButton);
function path(n) { return `page-${String(n).padStart(3, '0')}.jpg`; }
function switchView(which, options = {}) {
  const isEditorial = which === 'editorial';
  editorial.hidden = !isEditorial;
  overview.hidden = isEditorial;
  editorialTab.classList.toggle('active', isEditorial);
  overviewTab.classList.toggle('active', !isEditorial);
  editorialTab.setAttribute('aria-selected', String(isEditorial));
  overviewTab.setAttribute('aria-selected', String(!isEditorial));
  backButton.hidden = !(isEditorial && openedFromOverview);
  if (!options.preserveScroll) window.scrollTo({ top: 0, behavior: 'instant' });
}
for (let i = 1; i <= COUNT; i += 2) {
  const spread = document.createElement('section');
  spread.className = 'spread';
  for (let n = i; n <= Math.min(i + 1, COUNT); n++) {
    const page = document.createElement('div');
    page.className = 'page';
    page.id = `page-${n}`;
    const img = document.createElement('img');
    img.src = path(n);
    img.alt = `TOCA — page ${n}`;
    img.loading = n <= 4 ? 'eager' : 'lazy';
    page.append(img);
    if (NOTES[n]) {
      page.classList.add('has-note');
      page.tabIndex = 0;
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.textContent = NOTES[n];
      page.append(overlay);
      page.addEventListener('click', () => page.classList.toggle('open'));
      page.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          page.classList.toggle('open');
        }
      });
    }
    spread.append(page);
    const thumb = document.createElement('button');
    thumb.className = 'thumb';
    thumb.type = 'button';
    thumb.setAttribute('aria-label', `View page ${n} in editorial`);
    const small = document.createElement('img');
    small.src = path(n);
    small.loading = 'lazy';
    small.alt = '';
    const number = document.createElement('span');
    number.textContent = String(n).padStart(3, '0');
    thumb.append(small, number);
    thumb.addEventListener('click', () => {
      overviewScrollY = window.scrollY;
      openedFromOverview = true;
      switchView('editorial');
      requestAnimationFrame(() => document.getElementById(`page-${n}`).scrollIntoView({ block: 'start', behavior: 'instant' }));
    });
    overviewGrid.append(thumb);
  }
  editorial.append(spread);
}
backButton.addEventListener('click', () => {
  openedFromOverview = false;
  switchView('overview', { preserveScroll: true });
  requestAnimationFrame(() => window.scrollTo({ top: overviewScrollY, behavior: 'instant' }));
});
editorialTab.addEventListener('click', () => {
  openedFromOverview = false;
  switchView('editorial');
});
overviewTab.addEventListener('click', () => {
  openedFromOverview = false;
  switchView('overview');
});
if (new URLSearchParams(location.search).get('view') === 'overview') switchView('overview');
