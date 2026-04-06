/* Lovie Project Studio — main.js */

document.addEventListener('DOMContentLoaded', function () {

  // Mobile nav toggle
  var hamburger = document.querySelector('.nav-hamburger');
  var navLinks  = document.querySelector('.nav-links');

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    hamburger.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  });

  // Close on nav link click (covers anchor links and page navigation)
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });

  // Close on outside tap
  document.addEventListener('click', function (e) {
    if (navLinks.classList.contains('is-open') &&
        !navLinks.contains(e.target) &&
        !hamburger.contains(e.target)) {
      navLinks.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });

});
