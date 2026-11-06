/* Legal Information page: sidebar picks ONE document at a time (Disclaimer / Terms / Privacy / Cookie); its numbered points read top to bottom. Vanilla JS. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* hero reveal + soft blob parallax */
  $(".li-reveal[data-d]").forEach(function (e) { e.style.setProperty("--d", e.getAttribute("data-d")); });
  var rv = $(".li-reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle("is-in", e.isIntersecting); });
    }, { threshold: 0.08 });
    rv.forEach(function (t) { io.observe(t); });
  } else rv.forEach(function (t) { t.classList.add("is-in"); });
  if (!reduce && matchMedia("(hover: hover)").matches) {
    var hero = document.querySelector(".li-hero"), bl = $(".li-blob[data-depth]"), raf;
    if (hero) hero.addEventListener("pointermove", function (e) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var r = hero.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        bl.forEach(function (b) { var d = +b.getAttribute("data-depth"); b.style.translate = nx * d + "px " + ny * d + "px"; });
      });
    });
  }

  var docs = $("[data-doc]"), links = $(".li-side__link");
  if (!docs.length) return;
  var side = document.querySelector(".li-side"), sideNav = document.querySelector(".li-side__nav"),
      layout = document.querySelector(".li-layout"), main = document.querySelector(".li-main"),
      read = document.querySelector(".li-read"), rPct = read.querySelector(".li-read__pct"),
      rNow = read.querySelector(".li-read__now"), rNo = read.querySelector(".li-read__no"),
      rTtl = read.querySelector(".li-read__ttl"), rCnt = read.querySelector(".li-read__cnt");
  docs.forEach(function (d) { d._secs = $(".li-sec", d); });
  var di = -1, curSec = -1, fx = [];

  /* title effect (same as the site headings): grey text fills with colour as you scroll past it */
  function titleFx(d) {
    fx.forEach(function (t) { t.kill(); }); fx = [];
    if (reduce || !window.gsap || !window.ScrollTrigger) return;
    var h2 = docs[d].querySelector(".li-h2"); if (!h2) return;
    gsap.registerPlugin(ScrollTrigger);
    if (!h2._li) { h2._li = new SplitText(h2, { type: "lines" }); }
    h2.classList.add("li-fx");
    h2._li.lines.forEach(function (el) {
      gsap.set(el, { backgroundPositionX: "100%" });
      var tw = gsap.to(el, { backgroundPositionX: "0%", ease: "none", scrollTrigger: { trigger: el, scrub: 1, start: "top 85%", end: "bottom center" } });
      fx.push(tw.scrollTrigger, tw);
    });
    ScrollTrigger.refresh();
  }

  /* every point card fades up as it scrolls into view (the last one too) */
  var cardIO = ("IntersectionObserver" in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("is-in"); });
  }, { threshold: 0.06, rootMargin: "0px 0px -6% 0px" }) : null;
  docs.forEach(function (d) { d._secs.forEach(function (sc) { if (cardIO) cardIO.observe(sc); else sc.classList.add("is-in"); }); });

  function pinned() {
    var h = document.querySelector(".tj-header-area.header-duplicate"); if (!h) return 0;
    var cs = getComputedStyle(h), r = h.getBoundingClientRect();
    return (cs.position === "fixed" || cs.position === "sticky") && r.top <= 1 ? r.height : 0;
  }
  function stickyOff() { return pinned() + (matchMedia("(max-width: 991px)").matches && side ? side.offsetHeight : 0); }
  function docName(i) { return links[i].querySelector(".li-side__t").textContent; }

  /* scroll helper: instant by default (the page CSS has scroll-behavior: smooth, so "auto" would still glide) */
  function jumpTo(y, smooth) {
    var el = document.documentElement, prev = el.style.scrollBehavior;
    el.style.scrollBehavior = smooth ? "smooth" : "auto";
    window.scrollTo(0, y);
    el.style.scrollBehavior = prev;
  }

  /* open one document, hide the rest */
  function openDoc(d, user, secIdx) {
    d = Math.max(0, Math.min(docs.length - 1, d));
    var changed = d !== di; di = d;
    docs.forEach(function (x, i) { x.classList.toggle("is-open", i === d); });
    links.forEach(function (l, n) {
      l.classList.toggle("is-active", n === d);
      if (n === d) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
    });
    if (sideNav && sideNav.scrollWidth > sideNav.clientWidth) {
      var l = links[d]; sideNav.scrollTo({ left: l.offsetLeft - (sideNav.clientWidth - l.offsetWidth) / 2, behavior: reduce || !user ? "auto" : "smooth" });
    }
    if (user && history.replaceState) history.replaceState(null, "", "#" + docs[d].id);
    if (changed) { curSec = -1; docs.forEach(function (x, i) { if (i !== d) x._secs.forEach(function (sc) { sc.classList.remove("is-in"); }); }); }
    var target = secIdx != null ? docs[d]._secs[secIdx] : null;
    if (user || target) {
      var r = (target || main).getBoundingClientRect(), off = stickyOff();
      /* a different document was just swapped in, so jump straight to its start. A smooth scroll gets cancelled by the layout change and the page stayed half-way down. */
      if (target || r.top < off + 4) jumpTo(Math.max(r.top + scrollY - off - 24, 0), user && !changed && !reduce);
    }
    onScroll(true);
    if (changed) titleFx(d);
  }

  /* reading progress: follows the scroll position inside the open document */
  function onScroll(force) {
    var off = pinned();
    if (layout) layout.style.setProperty("--li-top", off + "px");
    if (di < 0) return;
    var doc = docs[di], secs = doc._secs, line = innerHeight * 0.4 + off,
        h = document.documentElement, atEnd = scrollY + innerHeight >= h.scrollHeight - 6, r = doc.getBoundingClientRect(),
        p = Math.min(1, Math.max(0, (line - r.top) / Math.max(doc.offsetHeight, 1)));
    if (atEnd) p = 1;
    read.style.setProperty("--rp", p.toFixed(4)); rPct.textContent = Math.round(p * 100) + "%";
    var si = 0;
    secs.forEach(function (sc, i) { if (sc.getBoundingClientRect().top <= line) si = i; });
    if (atEnd) si = secs.length - 1;
    if (si === curSec && !force) return;
    curSec = si;
    secs.forEach(function (sc, i) { sc.classList.toggle("is-current", i === si); });
    var sc = secs[si]; if (!sc) return;
    rNow.classList.add("is-swap");
    setTimeout(function () {
      rNo.textContent = sc.querySelector(".li-num").textContent;
      rTtl.textContent = sc.querySelector("h3").textContent;
      rCnt.textContent = docName(di) + " \u2022 " + (si + 1) + " of " + secs.length;
      rNow.classList.remove("is-swap");
    }, reduce || force ? 0 : 160);
  }
  var tick = false;
  addEventListener("scroll", function () { if (!tick) { tick = true; requestAnimationFrame(function () { tick = false; onScroll(); }); } }, { passive: true });
  addEventListener("resize", function () { onScroll(true); });

  links.forEach(function (l, n) {
    l.addEventListener("click", function (e) { e.preventDefault(); openDoc(n, true); });
  });

  /* deep links: #privacy  or  #privacy-5 (scrolls to the 5th point) */
  function fromHash() {
    var m = /^#([a-z]+)(?:-(\d+))?$/i.exec(decodeURIComponent(location.hash || "")), i = -1;
    if (!m) return null;
    links.forEach(function (l, n) { if (l.getAttribute("data-target") === m[1]) i = n; });
    return i < 0 ? null : { d: i, s: m[2] ? +m[2] - 1 : null };
  }
  addEventListener("hashchange", function () { var h = fromHash(); if (h) openDoc(h.d, true, h.s); });

  var h0 = fromHash();
  openDoc(h0 ? h0.d : 0, false, null);
  if (h0 && h0.s != null) setTimeout(function () { openDoc(h0.d, false, h0.s); }, 150);
})();