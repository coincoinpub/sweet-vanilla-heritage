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

  // ---- Logo du header : clic = on revoit l'animation d'intro
  var brandLink = document.querySelector('.site-header .brand');
  if (brandLink) {
    brandLink.addEventListener('click', function () {
      try { sessionStorage.removeItem('svh_intro_seen'); } catch (e) {}
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

  // ---- Carrousel (sélection produits)
  var carousels = Array.prototype.slice.call(document.querySelectorAll('.carousel'));
  carousels.forEach(function (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var prevBtn = carousel.querySelector('.carousel-arrow--prev');
    var nextBtn = carousel.querySelector('.carousel-arrow--next');
    var dotsWrap = carousel.parentNode.querySelector('.carousel-dots');
    if (!track) return;

    var cards = Array.prototype.slice.call(track.children);
    var dots = [];

    if (dotsWrap && cards.length > 1) {
      cards.forEach(function (card, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Aller à la sélection ' + (i + 1));
        dot.addEventListener('click', function () {
          track.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
        });
        dotsWrap.appendChild(dot);
      });
      dots = Array.prototype.slice.call(dotsWrap.children);
    }

    function scrollByCard(dir) {
      var first = cards[0];
      var gap = first ? (cards[1] ? cards[1].offsetLeft - first.offsetLeft : first.getBoundingClientRect().width) : 300;
      track.scrollBy({ left: dir * gap, behavior: 'smooth' });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByCard(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByCard(1); });

    var updateTicking = false;
    function updateState() {
      updateTicking = false;
      var maxScroll = track.scrollWidth - track.clientWidth - 2;
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft >= maxScroll;
      if (prevBtn) prevBtn.disabled = atStart;
      if (nextBtn) nextBtn.disabled = maxScroll <= 0 ? true : atEnd;

      if (dots.length) {
        var activeIndex = 0;
        var closest = Infinity;
        cards.forEach(function (c, i) {
          var diff = Math.abs(c.offsetLeft - track.scrollLeft);
          if (diff < closest) { closest = diff; activeIndex = i; }
        });
        dots.forEach(function (d, i) { d.classList.toggle('is-active', i === activeIndex); });
      }
    }

    track.addEventListener('scroll', function () {
      if (!updateTicking) {
        updateTicking = true;
        window.requestAnimationFrame(updateState);
      }
    }, { passive: true });
    window.addEventListener('resize', updateState);
    updateState();
  });
});
