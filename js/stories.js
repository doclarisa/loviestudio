/* Lovie Project Studio — stories.js
   Handles: era/theme filtering, active pills, clear, empty state, results count
*/

(function () {
  'use strict';

  // ── State ────────────────────────────────────────────────────
  const state = {
    era:   'all',
    theme: 'all',
  };

  // ── DOM refs ─────────────────────────────────────────────────
  const grid         = document.getElementById('stories-grid');
  const emptyState   = document.getElementById('stories-empty');
  const resultsCount = document.getElementById('results-count');
  const activeBar    = document.getElementById('filter-active-bar');
  const pillsWrap    = document.getElementById('filter-pills');
  const clearAllBtn  = document.getElementById('filter-clear-all');
  const emptyClearBtn= document.getElementById('empty-clear-btn');
  const filterCount  = document.getElementById('filter-count');
  const filterToggle = document.getElementById('filter-toggle');
  const filterPanels = document.getElementById('filter-panels');

  const allCards     = Array.from(grid.querySelectorAll('.story-card'));
  const filterBtns   = Array.from(document.querySelectorAll('.filter-btn'));

  // Label maps for readable pill text
  const eraLabels = {
    'ancient':    'Ancient World',
    'medieval':   'Medieval',
    'gilded-age': 'Gilded Age',
    'wwi':        'WWI Era',
    'wwii':       'WWII Era',
    'cold-war':   'Cold War',
    'modern':     'Modern',
  };
  const themeLabels = {
    'espionage':           'Espionage',
    'royal-scandals':      'Royal Scandals',
    'forgotten-disasters': 'Forgotten Disasters',
    'survival-stories':    'Survival Stories',
    'business-industry':   'Business & Industry',
  };

  // ── Filter & render ──────────────────────────────────────────
  function applyFilters() {
    let visible = 0;

    allCards.forEach(card => {
      const matchEra   = state.era   === 'all' || card.dataset.era   === state.era;
      const matchTheme = state.theme === 'all' || card.dataset.theme === state.theme;
      const show = matchEra && matchTheme;
      card.classList.toggle('is-hidden', !show);
      if (show) visible++;
    });

    // Results count
    resultsCount.innerHTML = `Showing <strong>${visible}</strong> ${visible === 1 ? 'story' : 'stories'}`;

    // Empty state
    emptyState.hidden = visible > 0;

    // Active filter bar
    updateActiveBar();
    updateFilterBtnStyles();
  }

  function updateFilterBtnStyles() {
    filterBtns.forEach(btn => {
      const type  = btn.dataset.filterType;
      const value = btn.dataset.filterValue;
      btn.classList.toggle('is-active',
        (type === 'era'   && state.era   === value) ||
        (type === 'theme' && state.theme === value)
      );
    });
  }

  function updateActiveBar() {
    const activeFilters = [];
    if (state.era   !== 'all') activeFilters.push({ type: 'era',   value: state.era,   label: eraLabels[state.era] });
    if (state.theme !== 'all') activeFilters.push({ type: 'theme', value: state.theme, label: themeLabels[state.theme] });

    // Badge count on mobile toggle
    const count = activeFilters.length;
    filterCount.textContent = count;
    filterCount.hidden = count === 0;

    if (count === 0) {
      activeBar.hidden = true;
      pillsWrap.innerHTML = '';
      return;
    }

    activeBar.hidden = false;
    pillsWrap.innerHTML = activeFilters
      .map(f => `
        <button class="filter-pill" data-pill-type="${f.type}" aria-label="Remove ${f.label} filter">
          ${f.label}
          <span class="filter-pill-remove" aria-hidden="true">✕</span>
        </button>
      `).join('');

    // Pill remove handlers
    pillsWrap.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state[pill.dataset.pillType] = 'all';
        applyFilters();
      });
    });
  }

  // ── Filter button click ──────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const type  = btn.dataset.filterType;
      const value = btn.dataset.filterValue;

      // If already active, toggle back to 'all'
      if (state[type] === value && value !== 'all') {
        state[type] = 'all';
      } else {
        state[type] = value;
      }
      applyFilters();
    });
  });

  // ── Clear all ────────────────────────────────────────────────
  function clearAll() {
    state.era   = 'all';
    state.theme = 'all';
    applyFilters();
  }

  if (clearAllBtn)    clearAllBtn.addEventListener('click', clearAll);
  if (emptyClearBtn)  emptyClearBtn.addEventListener('click', clearAll);

  // ── Mobile filter toggle ─────────────────────────────────────
  if (filterToggle && filterPanels) {
    filterToggle.addEventListener('click', () => {
      const open = filterPanels.classList.toggle('is-open');
      filterToggle.setAttribute('aria-expanded', open);
    });
  }

  // ── Init ─────────────────────────────────────────────────────
  applyFilters();

})();
