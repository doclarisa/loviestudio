/* Lovie Project Studio — article.js
   Handles: TOC active state via IntersectionObserver
*/

(function () {
  'use strict';

  const tocLinks = document.querySelectorAll('.toc-link');
  if (!tocLinks.length) return;

  const sectionIds = Array.from(tocLinks).map(link =>
    link.getAttribute('href').replace('#', '')
  );

  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  // Track which section is most visible
  let activeId = null;

  const setActive = id => {
    if (id === activeId) return;
    activeId = id;
    tocLinks.forEach(link => {
      const isActive = link.getAttribute('href') === '#' + id;
      link.classList.toggle('is-active', isActive);
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }
  );

  sections.forEach(section => observer.observe(section));

  // Fallback: set first section active on load
  setActive(sections[0].id);
})();
