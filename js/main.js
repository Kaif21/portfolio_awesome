/* Kaif Hossain — portfolio interactions
   Deliberately small: reveal-on-scroll, mobile menu, project filters, mailto form.
   Everything degrades gracefully without JavaScript. */

(function () {
  'use strict';

  /* ── Scroll reveal ─────────────────────────────────────────
     Adds .is-visible to each .reveal element once it enters the
     viewport. Respects prefers-reduced-motion (CSS handles it). */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Mobile menu ─────────────────────────────────────────── */
  var menu = document.getElementById('mobile-menu');
  var openBtn = document.getElementById('menu-open');
  var closeBtn = document.getElementById('menu-close');

  function setMenu(open) {
    if (!menu) return;
    menu.classList.toggle('hidden', !open);
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) closeBtn.focus();
  }

  if (openBtn && menu) {
    openBtn.addEventListener('click', function () { setMenu(true); });
    closeBtn.addEventListener('click', function () { setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
    menu.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });
  }

  /* ── Project filters ─────────────────────────────────────── */
  var filterWrap = document.getElementById('project-filters');
  var cards = document.querySelectorAll('.project-card');

  if (filterWrap && cards.length) {
    filterWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      filterWrap.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });

      var filter = btn.getAttribute('data-filter');
      cards.forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  }

  /* ── Contact form → mail client ──────────────────────────── */
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var subject = encodeURIComponent(
        '[Portfolio Inquiry] ' + (data.get('service') || 'General') + ' — ' + data.get('name')
      );
      var body = encodeURIComponent(
        'Name: ' + data.get('name') +
        '\nEmail: ' + data.get('email') +
        '\nCompany: ' + (data.get('company') || '—') +
        '\nService: ' + (data.get('service') || '—') +
        '\n\n' + data.get('message')
      );
      window.location.href = 'mailto:kaif.bd21@gmail.com?subject=' + subject + '&body=' + body;
      if (status) {
        status.textContent = 'Opening your mail client — thank you.';
        status.className = 'text-sm text-success';
      }
    });
  }

  /* ── Footer year ─────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
