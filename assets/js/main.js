// Sweet Vanilla Heritage — interactions de base
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      var expanded = nav.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
      });
    });
  }

  // Mark active nav link based on current page
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  // Set current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Intro cinématique (logo + vanille) — jouée une fois par session, accueil uniquement
  var intro = document.querySelector('.intro-loader');
  if (intro) {
    var alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem('svh_intro_seen') === '1'; } catch (e) { alreadySeen = false; }

    if (alreadySeen) {
      intro.parentNode.removeChild(intro);
    } else {
      document.body.classList.add('intro-active');
      var hideIntro = function () {
        intro.classList.add('is-hidden');
        document.body.classList.remove('intro-active');
        try { sessionStorage.setItem('svh_intro_seen', '1'); } catch (e) {}
        setTimeout(function () {
          if (intro.parentNode) intro.parentNode.removeChild(intro);
        }, 1200);
      };
      var introTimer = setTimeout(hideIntro, 3400);
      intro.addEventListener('click', function () {
        clearTimeout(introTimer);
        hideIntro();
      });
    }
  }

  // ---- Reveal au scroll
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal, .reveal-stagger'));
  if (revealEls.length) {
    var revealNow = function (el) { el.classList.add('is-visible'); };

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealNow(entry.target);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px 120px 0px' });
      revealEls.forEach(function (el) { io.observe(el); });
    }

    // Filet de sécurité : si l'IntersectionObserver rate un élément (saut de
    // scroll rapide, ancre, etc.), on révèle quand même tout ce qui est déjà
    // passé dans la fenêtre visible.
    var sweepReveal = function () {
      var vh = window.innerHeight;
      revealEls.forEach(function (el) {
        if (el.classList.contains('is-visible')) return;
        var rect = el.getBoundingClientRect();
        if (rect.top < vh && rect.bottom > 0) revealNow(el);
      });
    };
    sweepReveal();
    window.addEventListener('scroll', sweepReveal, { passive: true });
    window.addEventListener('resize', sweepReveal);
    window.addEventListener('load', sweepReveal);
    // Dernier filet : si jamais rien n'a marché, tout révéler après un délai.
    setTimeout(function () { revealEls.forEach(revealNow); }, 3000);
  }
});
