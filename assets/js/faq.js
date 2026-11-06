/**
 * VIDHITRA CORPORATE ADVISORS LLP: FAQ page
 * Scroll-driven Q&A: each section pins and the question changes as you scroll (no clicks needed).
 * Namespace: .fq-
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mq = window.matchMedia('(max-width: 991px)');
  var secs = Array.prototype.slice.call(document.querySelectorAll('.fq-sec'));
  var page = document.querySelector('.fq-page');

  /* ---------- 1. split titles + answers into words ---------- */
  function words(el, cls, max) {
    var w = el.textContent.trim().split(/\s+/);
    el.innerHTML = w.map(function (t, i) {
      return '<span class="' + cls + '"><span style="--i:' + Math.min(i, max) + '">' + t.replace(/&/g, '&amp;') + '</span></span>';
    }).join(' ');
  }
  document.querySelectorAll('.fq-sec__title').forEach(function (t) { t.setAttribute('aria-label', t.textContent.trim()); words(t, 'fq-w', 99); });
  document.querySelectorAll('.fq-slide__a').forEach(function (p) { words(p, 'fq-aw', 70); });

  /* ---------- 2. entrance once per section ---------- */
  secs.forEach(function (s) { s.classList.add('is-prep'); });
  function seen(list, options, cls, target) {
    if (reduce || !('IntersectionObserver' in window)) { list.forEach(function (el) { (target ? target(el) : el).classList.add(cls); }); return; }
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) { if (e.isIntersecting) { (target ? target(e.target) : e.target).classList.add(cls); obs.unobserve(e.target); } });
    }, options);
    list.forEach(function (el) { io.observe(el); });
  }
  seen(secs, { threshold: 0.1 }, 'is-inview');
  var ends = [];
  document.querySelectorAll('.fq-sec--plum').forEach(function (sec) {
    var m = document.createElement('span'); m.className = 'fq-end-sentinel'; m.setAttribute('aria-hidden', 'true'); sec.appendChild(m); ends.push(m);
  });
  seen(ends, { threshold: 0, rootMargin: '0px 0px -10% 0px' }, 'is-end', function (el) { return el.parentNode; });

  /* mobile: each answer card reveals its words when it scrolls in */
  seen(Array.prototype.slice.call(document.querySelectorAll('.fq-slide')), { threshold: 0.25 }, 'is-seen');

  /* section numerals 01-05: split into digits, roll in whenever the section is on screen (re-plays on scroll back) */
  document.querySelectorAll('.fq-num').forEach(function (n) {
    var t = n.textContent.trim();
    n.innerHTML = t.split('').map(function (d, i) { return '<span class="fq-nd"><span style="--i:' + i + '">' + d + '</span></span>'; }).join('');
  });
  if (reduce || !('IntersectionObserver' in window)) { secs.forEach(function (s) { s.classList.add('is-num'); }); }
  else {
    var nio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('is-num', e.isIntersecting); });
    }, { threshold: 0.12 });
    secs.forEach(function (s) { nio.observe(s); });
  }

  /* ---------- 3. scroll-driven questions ---------- */
  var topOffset = 150, pinTop = 150;
  var state = secs.map(function (sec) {
    var n = +sec.getAttribute('data-n');
    sec.querySelector('.fq-track').style.setProperty('--n', n);
    return {
      sec: sec, n: n, idx: -1,
      track: sec.querySelector('.fq-track'), pin: sec.querySelector('.fq-pin'),
      items: sec.querySelectorAll('.fq-item'), slides: sec.querySelectorAll('.fq-slide'), imgs: sec.querySelectorAll('.fq-photo__img'), card: sec.querySelector('.fq-card'),
      list: sec.querySelector('.fq-list')
    };
  });
  function activate(st, i) {
    if (st.idx === i) return;
    st.idx = i;
    st.items.forEach(function (it, k) { it.classList.toggle('is-active', k === i); });
    st.slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
    var per = st.n / st.imgs.length, on = Math.min(st.imgs.length - 1, Math.floor(i / per));
    st.imgs.forEach(function (im, k) { im.classList.toggle('is-on', k === on); });
  }
  var ticking = false;
  function frame() {
    ticking = false;
    var vh = window.innerHeight;
    state.forEach(function (st) {
      if (mq.matches) { if (st.idx !== -2) { st.idx = -2; st.slides.forEach(function (s) { s.classList.remove('is-active'); }); } return; }
      var r = st.track.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) { if (r.top > vh + 50 && st.idx !== 0 && st.idx !== -1) activate(st, 0); return; }
      var range = r.height - st.pin.offsetHeight;
      var p = Math.min(1, Math.max(0, (pinTop - r.top) / range));
      var i = Math.min(st.n - 1, Math.floor(p * st.n));
      activate(st, i);
      var sp = (p * st.n - i);                       /* progress inside the current question → overall fill below */
      var overall = Math.min(1, (i + Math.min(1, sp)) / st.n);
      st.sec.style.setProperty('--sp', overall.toFixed(3));
    });
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  mq.addEventListener ? mq.addEventListener('change', function () { state.forEach(function (s) { s.idx = -1; }); req(); }) : mq.addListener(req);

  state.forEach(function (st) { st.items.forEach(function (it, i) { it.style.setProperty('--k', i); }); });

  /* clicking a question simply scrolls to its place in the section */
  state.forEach(function (st) {
    st.items.forEach(function (it, i) {
      it.querySelector('.fq-item__btn').addEventListener('click', function () {
        var r = st.track.getBoundingClientRect(), range = r.height - st.pin.offsetHeight;
        var y = window.scrollY + r.top - pinTop + range * (i + 0.5) / st.n;
        window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  });

  /* ---------- 4. sticky sub-nav pin + scroll-spy ---------- */
  var subnav = document.getElementById('vdPageSubnav');
  var spacer = document.getElementById('vdPageSubnavSpacer');
  var tabsWrap = document.getElementById('vdPageSubnavTabs');
  if (!subnav || !tabsWrap) return;

  var tabs = Array.prototype.slice.call(tabsWrap.querySelectorAll('a'));
  var targets = tabs.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  var stickyHeader = document.querySelector('.header-duplicate');
  var subnavTop = 0, headerHeight = 0, subnavHeight = subnav.offsetHeight;

  function measure() {
    var wasSticky = subnav.classList.contains('is-sticky');
    if (wasSticky) { subnav.classList.remove('is-sticky'); spacer.classList.remove('is-active'); }
    headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
    subnavHeight = subnav.offsetHeight;
    subnavTop = subnav.getBoundingClientRect().top + window.scrollY;
    spacer.style.height = subnavHeight + 'px';
    pinTop = headerHeight + subnavHeight;
    if (page) page.style.setProperty('--fq-top', pinTop + 'px');
    if (wasSticky) { subnav.classList.add('is-sticky'); spacer.classList.add('is-active'); }
  }
  function onScroll() {
    if (window.scrollY >= subnavTop - headerHeight) {
      subnav.classList.add('is-sticky');
      subnav.style.top = headerHeight + 'px';
      spacer.classList.add('is-active');
    } else {
      subnav.classList.remove('is-sticky');
      subnav.style.top = '';
      spacer.classList.remove('is-active');
    }
  }
  measure(); onScroll(); frame();
  window.addEventListener('load', function () { measure(); onScroll(); });
  window.addEventListener('resize', function () { measure(); onScroll(); });
  window.addEventListener('scroll', onScroll, { passive: true });

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.scrollY - (headerHeight + subnavHeight);
      window.scrollTo({ top: top, behavior: reduce ? 'auto' : 'smooth' });
    });
  });

  if ('IntersectionObserver' in window && targets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          tabs.forEach(function (t) { t.classList.toggle('active', t.getAttribute('href') === '#' + id); });
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    targets.forEach(function (sec) { spy.observe(sec); });
  }
})();
/* HAVE MORE QUESTIONS? — play the closing section's entrance once when it scrolls into view */
(function () {
  var sec = document.querySelector('.fq-more');
  if (!sec) return;
  if (!('IntersectionObserver' in window)) { sec.classList.add('is-in'); return; }
  var io = new IntersectionObserver(function (es) {
    if (es[0].isIntersecting) { sec.classList.add('is-in'); io.disconnect(); }
  }, { threshold: 0.25 });
  io.observe(sec);
})();