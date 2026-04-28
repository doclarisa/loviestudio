document.addEventListener('DOMContentLoaded', function () {
  var btn = document.querySelector('.nav-hamburger');
  var nav = document.querySelector('.nav-links');
  if (!btn || !nav) return;

  var backdrop = document.createElement('div');
  backdrop.className = 'nav-backdrop';
  document.body.appendChild(backdrop);

  function openMenu() {
    nav.classList.add('nav-open');
    backdrop.classList.add('is-visible');
    btn.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    nav.classList.remove('nav-open');
    backdrop.classList.remove('is-visible');
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', function () {
    nav.classList.contains('nav-open') ? closeMenu() : openMenu();
  });

  backdrop.addEventListener('click', closeMenu);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
});
