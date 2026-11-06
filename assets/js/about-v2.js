/* ==========================================================
   VIDHITRA — ABOUT PAGE v2  (needs GSAP + ScrollTrigger, which
   your theme already loads in footer.php)
   Load AFTER footer.php:  <script src="assets/js/about-v2.js"></script>
   ========================================================== */
(function () {
  "use strict";

  var page = document.querySelector(".ab-page");
  if (!page) return;

  /* ---------- helpers ---------- */
  function q(s, r) { return (r || document).querySelector(s); }
  function qa(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function debounce(fn, ms) { var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); }; }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;
  var mqDesk = window.matchMedia("(min-width: 992px)");
  var hasG = !!(window.gsap && window.ScrollTrigger);
  if (hasG) gsap.registerPlugin(ScrollTrigger);

  var PIN_SCROLL = true;    /* true = pinned scroll story, false = plays on its own (no extra scroll space) */

  var TOP = 135;
  function measureTop() {
    var hdr = q(".header-duplicate"), sub = q("#vdPageSubnav");
    TOP = (hdr ? hdr.offsetHeight : 90) + (sub ? sub.offsetHeight : 45);
    page.style.setProperty("--ab-top", TOP + "px");
  }

  /* ---------- registry, so everything can be rebuilt at a breakpoint ---------- */
  var made = [];      // tweens / timelines / ScrollTrigger instances
  var cleared = [];   // elements whose inline transforms must be reset
  function reg(a) { made.push(a); return a; }
  function cleanup() {
    made.forEach(function (a) {
      try { if (a.scrollTrigger) a.scrollTrigger.kill(); a.kill(); } catch (e) {}
    });
    made.length = 0;
    if (cleared.length) gsap.set(cleared, { clearProps: "transform,opacity,width,x,y,xPercent,scale,rotation,clipPath,--vp" });
    cleared.length = 0;
  }

  /* ==========================================================
     RUN-ONCE SETUP (event listeners, DOM prep)
     ========================================================== */

  /* shaped section edges: the next section's colour rises into the one above */
  function setupSeams() {
    var cs = getComputedStyle(page);
    function cv(n) { return cs.getPropertyValue(n).trim(); }
       var SEAMS = [
  { id: "who-we-are",          shape: "vee",   v: "--ab-persp" },
  { id: "how-we-work",         shape: "vee",   v: "--ab-persp", top: true },   // NEW: fixes the plain join
  { id: "how-we-work",         shape: "vee",   v: "--ab-blush" },
  { id: "experience",          shape: "ridge", v: "--ab-pink" },
  { id: "values",              shape: "steps", v: "--nm-bg", flip: true },
  { id: "thought-behind-name", shape: "vee",   v: "--ab-night" }
];
    var holders = [];
    SEAMS.forEach(function (s) {
      var sec = document.getElementById(s.id);
      if (!sec) return;
      var h = document.createElement("div");
      h.className = "ab-seam ab-seam--" + s.shape + (s.top ? " ab-seam--top" : "") + (s.flip ? " ab-seam--flip" : "");
      h.setAttribute("aria-hidden", "true");
      var sp = document.createElement("span");
      var shape = document.createElement("i");
      shape.style.background = cv(s.v);
      sp.appendChild(shape);
      h.appendChild(sp);
      sec.appendChild(h);
      holders.push(h);
    });
    if (reduce || !("IntersectionObserver" in window)) return;
    holders.forEach(function (h) { h.classList.add("is-prep"); });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    holders.forEach(function (h) { io.observe(h); });
  }

  /* section 2: a spotlight that follows the cursor (or drifts by itself) */
  function setupSpot() {
    var spot = q("#abSpot");
    if (!spot) return;
    if (reduce) { spot.classList.add("is-static"); return; }
    var auto = true, visible = false;
    function set(x, y) { spot.style.setProperty("--sx", x + "px"); spot.style.setProperty("--sy", y + "px"); }
    if (canHover) {
      spot.addEventListener("pointermove", function (e) {
        auto = false;
        var r = spot.getBoundingClientRect();
        set(e.clientX - r.left, e.clientY - r.top);
      });
      spot.addEventListener("pointerleave", function () { auto = true; });
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }, { threshold: 0 }).observe(spot);
    } else { visible = true; }
    (function tick(ts) {
      if (auto && visible) {
        var r = spot.getBoundingClientRect(), t = ts / 1000;
        set(r.width * (0.5 + 0.4 * Math.sin(t * 0.35)), r.height * (0.5 + 0.34 * Math.sin(t * 0.52 + 1)));
      }
      requestAnimationFrame(tick);
    })(0);
  }

  /* section 2: the panel and photo slide in, and the divider draws itself, when the section scrolls into view */
  function setupPerspDivider() {
    var stage = q("#abPerspStage"), d = q(".ab-persp__div");
    if (!stage || reduce || !("IntersectionObserver" in window)) return;
    stage.classList.add("is-prep");
    if (d) d.classList.add("is-prep");
    new IntersectionObserver(function (en, obs) {
      if (en[0].isIntersecting) {
        stage.classList.add("is-in");
        if (d) d.classList.add("is-in");
        obs.disconnect();
      }
    }, { threshold: 0.12 }).observe(stage);
  }

  /* section 5: leadership pop-up (split card) + card tilt */
  function setupLeadership() {
    var modal = q("#abModal");
    if (!modal) return;
    document.body.appendChild(modal);      /* lives on <body>, so it sits above the site header */
    var nameEl = q("#abModalName"), roleEl = q("#abModalRole"), monoEl = q("#abModalMono"), bodyEl = q("#abModalBody");
    var lastBtn = null;

    function open(card, btn) {
      lastBtn = btn;
      nameEl.textContent = q(".ab-pcard__name", card).textContent;
      monoEl.textContent = q(".ab-pcard__mono", card).textContent;
      roleEl.innerHTML = "";
      q(".ab-pcard__role", card).textContent.split("|").forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t.trim();
        roleEl.appendChild(li);
      });
      bodyEl.innerHTML = q(".ab-pcard__full", card).innerHTML;
      bodyEl.scrollTop = 0;
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("ab-locked");
      q(".ab-modal__x", modal).focus();
    }
        var closing = false;
    function close() {
      if (closing || !modal.classList.contains("is-open")) return;
      closing = true;

      function finish() {
        modal.classList.remove("is-open", "is-closing");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("ab-locked");
        closing = false;
        if (lastBtn) lastBtn.focus();
      }

      if (reduce) { finish(); return; }   /* reduced-motion users: close instantly */

      modal.classList.add("is-closing");
      setTimeout(finish, 900);            /* same 0.9s as the CSS animation */
    }
    qa(".ab-pcard").forEach(function (card) {
      var btn = q(".ab-pcard__btn", card);
      btn.addEventListener("click", function () { open(card, btn); });
      if (canHover && !reduce) {
        var inner = q(".ab-pcard__in", card);
        card.addEventListener("pointermove", function (e) {
          var r = card.getBoundingClientRect();
          inner.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 8 + "deg");
          inner.style.setProperty("--rx", (0.5 - (e.clientY - r.top) / r.height) * 8 + "deg");
        });
        card.addEventListener("pointerleave", function () {
          inner.style.setProperty("--rx", "0deg");
          inner.style.setProperty("--ry", "0deg");
        });
      }
    });
    qa("[data-ab-close]", modal).forEach(function (b) { b.addEventListener("click", close); });
    modal.addEventListener("click", function (e) { if (e.target === modal) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* section 8: the reveal opens from the button (angular diamond), when the section shows */
  function setupCta() {
    var sec = q("#cta"), btn = q("#abBtn");
    if (!sec || !btn) return;
    function origin() {
      var s = sec.getBoundingClientRect(), b = btn.getBoundingClientRect();
      sec.style.setProperty("--ix", (b.left - s.left + b.width / 2) + "px");
      sec.style.setProperty("--iy", (b.top - s.top + b.height / 2) + "px");
    }
    origin();
    window.addEventListener("resize", debounce(origin, 200));
    window.addEventListener("load", origin);
    if (reduce || !("IntersectionObserver" in window)) { sec.classList.add("is-in"); return; }
    new IntersectionObserver(function (en, obs) {
      if (en[0].isIntersecting) { origin(); sec.classList.add("is-in"); obs.disconnect(); }
    }, { threshold: 0.4 }).observe(sec);
  }

  /* ==========================================================
     REBUILDABLE SCROLL ANIMATIONS (GSAP)
     ========================================================== */

  /* 1 · the window opens: a slanted panel of photo grows to fill the stage; the heading moves to the top,
         the three pillars rise, and the closing statement appears under them on the same photo */
    var lastFit = null;

  function initWho() {
    var win = q("#abWin"), sec = q("#who-we-are");
    if (!win) return;
    var pin = mqDesk.matches && !reduce;
    win.classList.toggle("is-pin", pin);
    if (sec) sec.classList.toggle("has-pin", pin);

    var band = q(".ab-who__band", win), bp = q("p", band), quote = q(".ab-who__quote", band);

    if (!pin) {
      lastFit = null;
      if (band && !reduce) {
        var bt = gsap.timeline({ scrollTrigger: { trigger: band, start: "top 88%", once: true } });
        bt.fromTo(band, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power3.inOut" }, 0)
          .fromTo(bp, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.45);
        reg(bt);
        cleared.push(band, bp);
      }
      return;
    }

    if (!bp.getAttribute("data-split")) {
      var parts = bp.textContent.trim().split(/\s+/);
      bp.textContent = "";
      parts.forEach(function (w, i) {
        var s = document.createElement("span");
        s.className = "ab-w"; s.textContent = w; bp.appendChild(s);
        if (i < parts.length - 1) bp.appendChild(document.createTextNode(" "));
      });
      bp.setAttribute("data-split", "1");
    }
    var words = qa(".ab-w", bp);

    var photo = q(".ab-win__photo", win), img = q("img", photo), shade = q(".ab-win__shade", win), veil = q(".ab-win__veil", win);
    var frame = q(".ab-win__frame", win), intro = q(".ab-win__intro", win), head = q(".ab-win__head", win), cols = qa(".ab-win__col", win);
    /* both shapes are 4-point polygons in %, so GSAP can morph one into the other */
    var ARCH = "polygon(64% 14%, 93% 14%, 93% 79%, 58% 86%)";
    var FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

    /* does the whole stage fit on this screen? (the stage is as tall as its content now) */
    var fits = win.offsetHeight <= (window.innerHeight - TOP);
    lastFit = fits;
    var canPin = PIN_SCROLL && fits;

    var st;
    if (canPin) {
      st = {
        trigger: win,
        start: function () { return "top top+=" + TOP; },
        end: function () { return "+=" + Math.round(window.innerHeight * 4.6); },
        pin: true, scrub: 0.7, anticipatePin: 1, invalidateOnRefresh: true
      };
    } else if (PIN_SCROLL) {
      /* screen too short to pin: nothing is cut off, the same animation just scrubs while scrolling past */
      st = { trigger: win, start: "top 65%", end: "bottom 80%", scrub: 0.7, invalidateOnRefresh: true };
    } else {
      st = { trigger: win, start: "top 62%", once: true };
    }

        /* HOLD = how long the panel rests, fully visible, before it starts to grow.
       Raise it for a longer pause, lower it for a shorter one. */
    var H = 0.6;

    var tl = gsap.timeline({ defaults: { ease: "none" }, scrollTrigger: st });
    tl.to({}, { duration: H }, 0)   /* the hold: nothing moves, the panel + heading stay on screen */
      /* act 1: the panel opens into the full photo; the big intro slides away */
      .fromTo(photo, { clipPath: ARCH }, { clipPath: FULL, duration: 0.45, ease: "power2.inOut" }, H + 0.12)
      .fromTo(img, { scale: 1.25 }, { scale: 1, duration: 0.6 }, H + 0.12)
      .to(frame, { opacity: 0, duration: 0.2 }, H + 0.14)
      .to(intro, { x: -90, opacity: 0, duration: 0.22, ease: "power2.in" }, H + 0.14)
      /* act 2: tint, heading at top, three cards rise */
      .fromTo(shade, { opacity: 0 }, { opacity: 1, duration: 0.2 }, H + 0.58)
      .fromTo(cols, { y: 90, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, stagger: 0.12, ease: "power3.out" }, H + 0.66)
      /* act 3: statement under the cards */
      .to(veil, { opacity: 1, duration: 0.25 }, H + 1.2)
      .fromTo(quote, { scale: 0, opacity: 0, rotation: -25 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.3, ease: "back.out(2)" }, H + 1.3)
      .fromTo(words, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.2, stagger: 0.015, ease: "power2.out" }, H + 1.35)
      /* act 4: short rest before the pin releases */
      .to({}, { duration: 0.35 }, H + 1.95);
    if (head) tl.fromTo(head, { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }, H + 0.6);
    if (!PIN_SCROLL) tl.timeScale(0.42);
    reg(tl);

    if (canPin) {
      /* V drops after the pin releases */
      reg(gsap.fromTo(win, { "--vp": 0 }, {
        "--vp": 1, ease: "power2.inOut",
        scrollTrigger: {
          trigger: win,
          start: function () { return tl.scrollTrigger.end; },
          end:   function () { return tl.scrollTrigger.end + 450; },
          scrub: 0.6, invalidateOnRefresh: true
        }
      }));
    } else {
      gsap.set(win, { "--vp": 1 });   /* no pin: the V is simply there */
    }

    cleared.push(win, photo, img, shade, veil, frame, intro, quote);
    if (head) cleared.push(head);
    cleared.push.apply(cleared, cols);
    cleared.push.apply(cleared, words);
  }

    window.addEventListener("resize", debounce(function () {
    if (!hasG || !mqDesk.matches || reduce) return;
    var win = q("#abWin");
    if (!win) return;
    var fits = win.offsetHeight <= (window.innerHeight - TOP);
    if (lastFit !== null && fits !== lastFit) build();
  }, 250));

  /* 5 · two curtain doors slide apart as the cards come into view */
  function initLdr() {
    var stage = q("#abLdrStage");
    if (!stage) return;
    if (window.innerWidth < 768 || reduce) { stage.classList.add("is-open"); return; }
    stage.classList.remove("is-open");
    var dl = q(".ab-ldr__door--l", stage), dr = q(".ab-ldr__door--r", stage), cards = qa(".ab-pcard", stage);
    var tl = gsap.timeline({ scrollTrigger: { trigger: stage, start: "top 82%", end: "top 24%", scrub: 0.8 } });
    tl.to(dl, { xPercent: -101, ease: "power2.inOut" }, 0)
      .to(dr, { xPercent: 101, ease: "power2.inOut" }, 0)
      .fromTo(cards, { scale: 0.94, opacity: 0.5 }, { scale: 1, opacity: 1, ease: "none" }, 0);
    reg(tl);
    cleared.push(dl, dr);
    cleared.push.apply(cleared, cards);
  }

  /* ===== Thought Behind Our Name: VIDHI + TARA → VIDHITRA ===== */
(function () {
  "use strict";
  var sec = document.getElementById("thought-behind-name");
  if (!sec) return;
  function q(s) { return sec.querySelector(s); }
  function qa(s) { return Array.prototype.slice.call(sec.querySelectorAll(s)); }

  var pin = q(".nm-pin"), stage = q(".nm-stage"), row = q(".nm-row"),
      gl = q(".nm-g--l"), gr = q(".nm-g--r"), a = q(".nm-a"),
      L = qa(".nm-g--l .nm-l"), R = qa(".nm-g--r .nm-l"),
      ghL = q(".nm-ghost--l"), ghR = q(".nm-ghost--r"),
      lines = qa(".nm-line"),
      vidWrap = q(".nm-video"), vid = q(".nm-video video"),
      capL = q(".nm-cap--l"), capR = q(".nm-cap--r"), caps = q(".nm-caps"),
      copy = q(".nm-copy"), rule = q(".nm-rule"), beam = q(".nm-beam"), star = q(".nm-star");
      

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var desk = window.matchMedia("(min-width: 992px)");
  var aW = 0;

  function clamp(x) { return Math.min(1, Math.max(0, x)); }
  function seg(p, s, e) { return clamp((p - s) / (e - s)); }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
  function out(t) { return 1 - Math.pow(1 - t, 3); }

  /* galaxy video only plays while the section is on screen */
  var inView = false, lastP = 0;
  function vidState(p) {
    if (!vid) return;
    var want = p > .35 && inView && !reduce;
    if (want && vid.paused) { var pr = vid.play(); if (pr && pr.catch) pr.catch(function () {}); }
    else if (!want && !vid.paused) vid.pause();
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (en) { inView = en[0].isIntersecting; vidState(lastP); }, { threshold: 0 }).observe(sec);
  }

  function measure() { a.style.width = ""; aW = a.offsetWidth; }

  function render(p) {
    var m = ease(seg(p, .52, .76));

    /* the two words slide in, then close the gap; the first A of TARA dissolves */
    gr.style.marginLeft = ((1 - m) * .5) + "em";
    a.style.width = ((1 - m) * aW) + "px";
    gl.style.transform = "translate3d(" + (-(1 - out(seg(p, 0, .3))) * 24) + "vw,0,0)";
    gr.style.transform = "translate3d(" + ((1 - out(seg(p, .1, .4))) * 24) + "vw,0,0)";

    L.forEach(function (el, i) {
      var e = out(seg(p, i * .025, .2 + i * .025));
      el.style.opacity = e;
      el.style.transform = "translate3d(0," + ((1 - e) * 70) + "%,0) rotate(" + (-(1 - e) * 8) + "deg)";
    });
    R.forEach(function (el, j) {
      var e = out(seg(p, .1 + j * .025, .32 + j * .025));
      el.style.opacity = el === a ? e * (1 - seg(p, .5, .64)) : e;
      el.style.transform = "translate3d(0," + ((1 - e) * 70) + "%,0) rotate(" + ((1 - e) * 8) + "deg)";
    });

    /* ghost Sanskrit words */
    var go = out(seg(p, .04, .3)) * (1 - seg(p, .54, .74));
    ghL.style.opacity = go; ghR.style.opacity = go;
    ghL.style.transform = "translate3d(" + (-p * 5) + "vw,-50%,0)";
    ghR.style.transform = "translate3d(" + (p * 5) + "vw,-50%,0)";

    /* angular stairs + frames draw themselves */
    lines.forEach(function (l, i) { l.style.strokeDashoffset = 1 - seg(p, .04 + i * .08, .5 + i * .06); });

    /* the warm light background fades into the galaxy video; text switches to light while it is on */
    var vo = out(seg(p, .5, .82));
    lastP = p;
    if (vidWrap) vidWrap.style.opacity = vo;
    sec.classList.toggle("is-galaxy", vo > .45);
    vidState(p);

    /* captions out, copy in */
    var ci = seg(p, .2, .34), co = 1 - seg(p, .56, .7);
    caps.style.opacity = ci * co;
    capL.style.transform = "translate3d(0," + ((1 - ci) * 24) + "px,0)";
    capR.style.transform = "translate3d(0," + ((1 - ci) * 24) + "px,0)";
    var c = out(seg(p, .76, .94));
    copy.style.opacity = c;
    copy.style.transform = "translate3d(0," + ((1 - c) * 30) + "px,0)";
    copy.style.pointerEvents = c > .9 ? "auto" : "none";
    rule.style.transform = "scaleX(" + out(seg(p, .8, .96)) + ")";

    /* star lands on the join (where the A was), beam drops onto it */
    var sr = stage.getBoundingClientRect(), ar = a.getBoundingClientRect(), rr = row.getBoundingClientRect();
    var x = ar.left + ar.width / 2 - sr.left, y = rr.top - sr.top + rr.height * .1;
    var se = out(seg(p, .62, .78));
    star.style.left = x + "px"; star.style.top = y + "px";
    star.style.opacity = se;
    star.style.transform = "translate(-50%,-110%) scale(" + se + ") rotate(" + (-(1 - se) * 120) + "deg)";
    beam.style.left = x + "px";
    beam.style.height = Math.max(0, y - star.offsetHeight * 1.1) + "px";
    beam.style.transform = "scaleY(" + out(seg(p, .7, .84)) + ")";
  }

  function scrollProgress() {
    var top = parseFloat(getComputedStyle(sec.closest(".ab-page") || document.body).getPropertyValue("--ab-top")) || 135;
    var total = pin.offsetHeight - stage.offsetHeight;
    if (total <= 0) return 1;
    return clamp(((top - pin.getBoundingClientRect().top) / total) / .9);
  }

  var raf = null, timed = false;
  function onScroll() {
    if (!desk.matches || reduce) return;
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = null; render(scrollProgress()); });
  }

  function playOnce() {            /* phones / tablets: plays by itself when it scrolls into view */
    if (timed) return; timed = true;
    var t0 = null;
    (function step(ts) {
      if (!t0) t0 = ts;
      var p = clamp((ts - t0) / 4600);
      render(p);
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }

  function setup() {
    measure();
    if (reduce) { sec.classList.add("is-static"); render(1); return; }
    if (desk.matches) { render(scrollProgress()); }
    else if (timed) { render(1); }
    else { render(0); }
  }

  if ("IntersectionObserver" in window && !reduce) {
    new IntersectionObserver(function (en, obs) {
      if (en[0].isIntersecting && !desk.matches) { playOnce(); obs.disconnect(); }
    }, { threshold: .35 }).observe(stage);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () { setup(); });
  window.addEventListener("load", setup);
  if (desk.addEventListener) desk.addEventListener("change", setup);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setup);
  setup();
})();

  /* ==========================================================
     BUILD / REBUILD
     ========================================================== */
  function build() {
    if (!hasG) {
      qa(".ab-ldr__stage").forEach(function (s) { s.classList.add("is-open"); });
      return;
    }
    cleanup();
    measureTop();
    initWho();
    initLdr();
   
    ScrollTrigger.refresh();
  }

/* sections 3, 4, 6, 7: words rise, then everything fades up once when the section scrolls in */
function setupRedesign() {
  function split(node, c) {
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
      if (n.nodeType === 3) {
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          var w = document.createElement("span"); w.className = "ab-wm";
          var s = document.createElement("span");
          s.style.setProperty("--i", c.i++); s.textContent = part;
          w.appendChild(s); frag.appendChild(w);
        });
        n.parentNode.replaceChild(frag, n);
      } else if (n.nodeType === 1) { split(n, c); }
    });
  }
  qa(".ab-sw").forEach(function (el) { split(el, { i: 0 }); });

  var secs = qa(".ab-rv");
  if (reduce || !("IntersectionObserver" in window)) return;
  secs.forEach(function (s) { s.classList.add("is-prep"); });
  var io = new IntersectionObserver(function (en, obs) {
    en.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-inview"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  secs.forEach(function (s) { io.observe(s); });
}

/* values: work out how far each card must travel from the grid centre to its own place */
function setupValuesFly() {
  var grid = q(".ab-vals__grid"), cards = qa(".ab-vals__card");
  if (!grid || !cards.length) return;
  function measure() {
    var g = grid.getBoundingClientRect(), gx = g.left + g.width / 2, gy = g.top + g.height / 2;
    cards.forEach(function (c) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--dx", (gx - (r.left + r.width / 2)).toFixed(1) + "px");
      c.style.setProperty("--dy", (gy - (r.top + r.height / 2)).toFixed(1) + "px");
    });
  }
  measure();
  window.addEventListener("resize", debounce(measure, 200));
  window.addEventListener("load", measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
}

/* section 3: the tile icon follows the point being hovered, or cycles by itself */
function setupNeed() {
  var items = qa(".ab-need__item"), icos = qa(".ab-need__ico"), card = q(".ab-need__card");
  if (!items.length || items.length !== icos.length || !card) return;
  var cur = -1, timer = null;

  function on(i) {
    if (i === cur) return;
    cur = i;
    items.forEach(function (el, k) { el.classList.toggle("is-on", k === i); });
    icos.forEach(function (el, k) { el.classList.toggle("is-on", k === i); });
  }
  function stop() { clearInterval(timer); timer = null; }
  function start() {
    if (reduce || timer) return;
    timer = setInterval(function () { on((cur + 1) % items.length); }, 3200);
  }

  items.forEach(function (el, i) {
    el.addEventListener("pointerenter", function () { stop(); on(i); });
  });
  card.addEventListener("pointerleave", start);

  on(0);
  start();
}


  /* ---------- go ---------- */
  setupSeams();
  setupSpot();
  setupPerspDivider();
  setupLeadership();
  setupRedesign();
  setupCta();
  build();
  setupValuesFly();
  setupNeed();

  var rebuild = debounce(build, 150);
  if (mqDesk.addEventListener) mqDesk.addEventListener("change", rebuild); else mqDesk.addListener(rebuild);
  window.addEventListener("load", function () { if (hasG) { measureTop(); ScrollTrigger.refresh(); } });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (hasG) ScrollTrigger.refresh(); });
})();