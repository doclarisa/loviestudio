/* Lovie Project Studio — main.js */

document.addEventListener('DOMContentLoaded', function () {

  var btn = document.querySelector('.nav-hamburger');
  var nav = document.querySelector('.nav-links');

  if (!btn || !nav) return;

  function toggleNav(e) {
    e.preventDefault();
    e.stopPropagation();
    var open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('nav-open', open);
  }

  btn.addEventListener('click', toggleNav);
  btn.addEventListener('touchend', toggleNav);

  // Close on nav link tap
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  });

  // Close on outside tap
  document.addEventListener('touchend', function (e) {
    if (nav.classList.contains('is-open') &&
        !nav.contains(e.target) &&
        !btn.contains(e.target)) {
      nav.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    }
  });

});
