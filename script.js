/* tsukijifishmarket.org — interactions
   mobile nav · FAQ accordion · card-grid type filter · topic banner
   soft-nav interceptor (E.5) · plan pill */

(function () {
  'use strict';

  var burger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () { mobileNav.classList.toggle('open'); });
  }

  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () { btn.parentElement.classList.toggle('open'); });
  });

  var planPill = document.querySelector('.plan-pill');
  if (planPill) {
    window.addEventListener('scroll', function () {
      planPill.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
  }

  /* ---------- lite YouTube: the iframe loads only on click ---------- */
  document.querySelectorAll('.lite-yt__frame[data-yt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + btn.dataset.yt + '?autoplay=1&rel=0';
      f.title = btn.getAttribute('aria-label') || 'YouTube video';
      f.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
      f.setAttribute('allowfullscreen', '');
      f.setAttribute('loading', 'lazy');
      btn.innerHTML = '';
      btn.appendChild(f);
    }, { once: true });
  });

  /* ---------- catalogue filter (type axis, card grid) ---------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.filter-chip'));
  var banner = document.getElementById('topicBanner');
  var countEl = document.getElementById('tourCount');
  var activeType = 'all';

  var topicMessages = {
    auction: "No tour can sell you a place on the tuna-auction observation deck — Toyosu's official rules bar agencies from applying, and the free 2F walkway needs no booking at all. What auction tours legitimately sell is dawn logistics, the walkway, and breakfast: see our honest breakdown on the Toyosu tuna auction tour page. Showing auction & Toyosu products.",
    "private-tour": "Generic customisable Tokyo private tours (where the market is one optional stop) aren't listed in this catalogue — one strong option is placed on the tours page's private section instead. Showing all tours.",
    december: "In December 2025 the market association formally asked operators to pause guided food strolls in the year-end crush. It was December-only and has not been reissued — but if you're booking for late December, read our visiting-responsibly page first. Showing all tours."
  };

  function setActiveType(type) {
    activeType = type || 'all';
    chips.forEach(function (c) { c.classList.toggle('active', c.dataset.filter === activeType); });
    applyFilters();
  }
  function showTopicBanner(topic) {
    if (!banner || !topicMessages[topic]) return;
    banner.textContent = topicMessages[topic];
    banner.classList.add('visible');
  }
  function hideTopicBanner() { if (banner) banner.classList.remove('visible'); }

  function applyFilters() {
    var visible = 0;
    document.querySelectorAll('.tour-card-grid .tour-card, .disclosure-block .mini-list li[data-tags]').forEach(function (card) {
      var tags = (card.dataset.tags || card.dataset.type || '').split(/\s+/).filter(Boolean);
      var match = activeType === 'all' || tags.indexOf(activeType) !== -1;
      if (match) { card.classList.remove('tour-row-hidden'); visible++; }
      else { card.classList.add('tour-row-hidden'); }
    });
    if (countEl) countEl.textContent = visible;
  }

  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () { setActiveType(chip.dataset.filter); });
    });
    var params = new URLSearchParams(window.location.search);
    var qType = params.get('type');
    var qTopic = params.get('topic');
    if (qType && chips.some(function (c) { return c.dataset.filter === qType; })) {
      setActiveType(qType);
    } else {
      applyFilters();
    }
    if (qTopic && topicMessages[qTopic]) showTopicBanner(qTopic);
  }

  /* ---------- soft-navigation interceptor (blueprint E.5) ---------- */
  var isToursPage = /^\/tours(\.html)?\/?$/.test(window.location.pathname);
  if (isToursPage && chips.length) {
    document.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.indexOf('/tours?') !== 0) return;
      var target = new URL(href, window.location.origin);
      var newType = target.searchParams.get('type');
      var newTopic = target.searchParams.get('topic');
      if (!newType && !newTopic) return;
      if (newType && !chips.some(function (c) { return c.dataset.filter === newType; })) return;
      if (newTopic && !topicMessages[newTopic]) return;

      e.preventDefault();
      setActiveType(newType || 'all');
      if (newTopic) showTopicBanner(newTopic); else hideTopicBanner();

      var url = new URL(window.location.href);
      if (newType) url.searchParams.set('type', newType); else url.searchParams.delete('type');
      if (newTopic) url.searchParams.set('topic', newTopic); else url.searchParams.delete('topic');
      history.replaceState({}, '', url.toString());

      var scrollTarget = newTopic ? (banner || document.querySelector('.filter-bar'))
                                  : document.querySelector('.filter-bar');
      if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();
