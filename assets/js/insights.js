/* Insights page: scroll reveal, hero deck, card DEAL / FLIP / TILT / SHUFFLE, topic filter + search, newsletter form (front-end demo) */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia && matchMedia("(hover: hover)").matches;
  var canWAAPI = typeof Element !== "undefined" && !!Element.prototype.animate;
  var motion = !reduce && canWAAPI;
  var EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
  var $ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- scroll reveal ---------- */
  $(".in-reveal[data-d]").forEach(function (e) { e.style.setProperty("--d", e.getAttribute("data-d")); });
  var rv = $(".in-reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (t) { io.observe(t); });
  } else rv.forEach(function (t) { t.classList.add("is-in"); });

  /* ---------- hero: blob + deck parallax ---------- */
  if (!reduce && canHover) {
    var hero = document.querySelector(".in-hero"), bl = $(".in-blob[data-depth]"), deck = document.querySelector(".in-deck"), raf;
    if (hero) {
      hero.addEventListener("pointermove", function (e) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          var r = hero.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
          bl.forEach(function (b) { var d = +b.getAttribute("data-depth"); b.style.translate = nx * d + "px " + ny * d + "px"; });
          if (deck) { deck.style.setProperty("--dy", nx * -22 + "deg"); deck.style.setProperty("--dx", ny * 16 + "deg"); }
        });
      });
      hero.addEventListener("pointerleave", function () { if (deck) { deck.style.setProperty("--dy", "0deg"); deck.style.setProperty("--dx", "0deg"); } });
    }
  }

  /* ---------- hero: LATEST UPDATES deck — classic "deal to back" cycling ----------
     Cards are the newest items from insights-data.php. Every few seconds the front card is pulled out
     and tucked under the deck, revealing the next update. Pauses on hover/focus, off-screen or hidden tab. */
  (function () {
    var box = document.getElementById("inDeck");
    if (!box) return;
    var cards = $(".in-deck__c", box), N = cards.length;
    if (!N) return;
    var order = cards.map(function (c, i) { return i; });
    var DELAY = 4200, FIRST = 3200, timer = null, busy = false, hold = false, onScreen = true;

    function paint() {
      order.forEach(function (ci, p) {
        var c = cards[ci], front = p === 0;
        c.style.setProperty("--p", p);
        c.style.zIndex = N - p;
        c.classList.toggle("is-front", front);
        c.setAttribute("tabindex", front ? "0" : "-1");
        c.setAttribute("aria-hidden", front ? "false" : "true");
      });
    }
    function stop() { clearTimeout(timer); }
    function schedule(ms) {
      stop();
      if (reduce || N < 2 || hold || !onScreen || document.hidden) return;
      timer = setTimeout(next, ms || DELAY);
    }
    function next() {
      if (busy) return;
      var front = cards[order[0]];
      if (reduce) { order.push(order.shift()); paint(); schedule(); return; }
      busy = true;
      front.classList.add("is-lift");                 /* 1. pull the top card out */
      setTimeout(function () {
        order.push(order.shift());                    /* 2. send it to the bottom of the deck */
        front.classList.remove("is-lift");
        paint();                                      /* 3. it slides back in behind the others */
        setTimeout(function () { busy = false; }, 650);
        schedule();
      }, 560);
    }
    function prev() {
      if (busy) return;
      order.unshift(order.pop());                     /* bottom card comes back to the top */
      paint();
      schedule();
    }
    function goTo(ci) {
      if (busy || order[0] === ci) return;
      var k = order.indexOf(ci);
      order = order.slice(k).concat(order.slice(0, k));
      paint();
      schedule();
    }

    /* SWIPE (touch + mouse drag): left = next card, right = previous card */
    var stack = box.querySelector(".in-deck__stack"), sx = null, sy = 0, swiped = false, byPointer = false;
    stack.addEventListener("pointerdown", function (e) { sx = e.clientX; sy = e.clientY; swiped = false; byPointer = true; });
    stack.addEventListener("pointerup", function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      sx = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { swiped = true; dx < 0 ? next() : prev(); }
    });
    stack.addEventListener("pointercancel", function () { sx = null; });
    stack.addEventListener("dragstart", function (e) { e.preventDefault(); });

    /* a swipe never opens the link; a card peeking from behind is brought to the front instead of opening */
    cards.forEach(function (c, ci) {
      c.addEventListener("click", function (e) {
        if (swiped) { e.preventDefault(); swiped = false; return; }
        if (order[0] !== ci) { e.preventDefault(); goTo(ci); }
      });
    });

    function pause() { hold = true; stop(); }
    function resume() { hold = false; schedule(); }
    if (canHover) { box.addEventListener("mouseenter", pause); box.addEventListener("mouseleave", resume); }
    /* keyboard focus pauses; a tap/click focus must not stop autoplay */
    box.addEventListener("focusin", function () { if (!byPointer) pause(); byPointer = false; });
    box.addEventListener("focusout", function (e) { if (hold && !box.contains(e.relatedTarget) && !box.matches(":hover")) resume(); });
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : schedule(); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) {
        var was = onScreen;
        onScreen = es[0].isIntersecting;
        if (was !== onScreen) onScreen ? schedule() : stop();
      }, { threshold: 0.25 }).observe(box);
    }

    paint();
    schedule(FIRST); /* wait for the deal-in entrance before the first cycle */
  })();

  /* ---------- TEXT ANIMATIONS: word-by-word reveal + block reveals ---------- */
  function splitWords(el) {
    if (el.getAttribute("data-split")) return;
    el.setAttribute("data-split", "1");
    var n = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var parts = c.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
          parts.forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(" ")); return; }
            var o = document.createElement("span"), i = document.createElement("span");
            o.className = "in-w"; i.className = "in-w__i"; i.style.setProperty("--wi", n++); i.textContent = t;
            o.appendChild(i); frag.appendChild(o);
          });
          c.parentNode.replaceChild(frag, c);
        } else if (c.nodeType === 1) walk(c);
      });
    })(el);
  }
  var textEls = $(".in-art__body blockquote, .in-lead h2, .in-news h2");
  var blockEls = $(".in-art__body > p:not(.vd-lead), .in-art__body li");
  textEls.forEach(function (e) { splitWords(e); e.classList.add("in-tx"); });
  blockEls.forEach(function (e, i) { e.classList.add("in-tx"); });
  /* stagger list items */
  $(".in-art__body ul").forEach(function (ul) { $("li", ul).forEach(function (li, i) { li.style.setProperty("--d", (i * 0.09).toFixed(2)); }); });
  /* FGC-style lead paragraph: its gold/maroon bar grows when it scrolls into view (theme: .vd-lead.is-inview) */
  var leads = $(".vd-lead");
  if ("IntersectionObserver" in window) {
    var lio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-inview"); lio.unobserve(e.target); } }); }, { threshold: 0.3 });
    leads.forEach(function (l) { lio.observe(l); });
  } else leads.forEach(function (l) { l.classList.add("is-inview"); });
  var tx = textEls.concat(blockEls);
  if ("IntersectionObserver" in window && !reduce) {
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); tio.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    tx.forEach(function (t) { tio.observe(t); });
  } else tx.forEach(function (t) { t.classList.add("is-in"); });

  /* ---------- cards ---------- */
  var grid = document.getElementById("inGrid");
  var cards = $(".in-card");
  var empty = document.getElementById("inEmpty"), clear = document.getElementById("inClear"),
      input = document.getElementById("inSearch"), shuffleBtn = document.getElementById("inShuffle"),
      drops = $(".in-drop"), state = { cat: "all", type: "all" };

  function vis() { return cards.filter(function (c) { return !c.classList.contains("is-hidden"); }); }
  function snapshot(list) {
    var m = new Map();
    list.forEach(function (c) { m.set(c, c.getBoundingClientRect()); });
    return m;
  }
  function kill(c) { if (c.getAnimations) c.getAnimations().forEach(function (a) { a.cancel(); }); c.style.zIndex = ""; }

  /* DEAL: cards start as one stacked deck, get riffled, then dealt out into the grid */
  function deal() {
    var list = vis();
    if (!list.length) return;
    var g = grid.getBoundingClientRect(), f = list[0].getBoundingClientRect();
    var cx = g.left + g.width / 2, cy = f.top + f.height / 2, n = list.length;
    list.forEach(function (c, i) {
      var r = c.getBoundingClientRect(),
          dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2),
          side = i % 2 ? 1 : -1, j = i % 3 - 1, st = "translate(" + dx + "px," + (dy - i * 2) + "px) ";
      c.style.zIndex = n - i;
      var a = c.animate([
        { offset: 0,    opacity: 0, transform: "translate(" + dx + "px," + (dy + 80) + "px) rotate(" + side * 16 + "deg) scale(.78)", easing: "ease-out" },
        { offset: 0.16, opacity: 1, transform: st + "rotate(" + j * 2 + "deg) scale(.96)", easing: "ease-in-out" },
        { offset: 0.34, opacity: 1, transform: "translate(" + (dx + side * 96) + "px," + (dy - i * 2) + "px) rotate(" + side * 9 + "deg) scale(.96)", easing: "ease-in-out" },
        { offset: 0.5,  opacity: 1, transform: "translate(" + (dx - side * 44) + "px," + (dy - i * 2) + "px) rotate(" + -side * 5 + "deg) scale(.96)", easing: "ease-in-out" },
        { offset: 0.64, opacity: 1, transform: st + "rotate(" + j * 2 + "deg) scale(.96)", easing: EASE },
        { offset: 1,    opacity: 1, transform: "none" }
      ], { duration: 2100, delay: i * 95, fill: "backwards" });
      a.onfinish = a.oncancel = function () { c.style.zIndex = ""; };
    });
    grid.classList.remove("is-armed");
  }

  /* FLIP-style re-layout: cards glide from their old spot to their new one */
  function play(prev, lift) {
    vis().forEach(function (c, i) {
      var p = prev.get(c), r = c.getBoundingClientRect();
      if (p) {
        var dx = p.left - r.left, dy = p.top - r.top;
        if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
        var rot = (Math.random() * 2 - 1) * (lift ? 14 : 6);
        var frames = lift
          ? [{ transform: "translate(" + dx + "px," + dy + "px) rotate(" + rot + "deg)" },
             { offset: 0.45, transform: "translate(" + dx * 0.4 + "px," + (dy * 0.4 - 46) + "px) rotate(" + -rot + "deg) scale(1.07)" },
             { transform: "none" }]
          : [{ transform: "translate(" + dx + "px," + dy + "px) rotate(" + rot + "deg)" }, { transform: "none" }];
        c.style.zIndex = 5;
        var a = c.animate(frames, { duration: lift ? 1100 : 800, delay: lift ? Math.random() * 180 : i * 40, easing: EASE, fill: "backwards" });
        a.onfinish = a.oncancel = function () { c.style.zIndex = ""; };
      } else {
        c.animate([
          { opacity: 0, transform: "translateY(36px) rotate(-7deg) scale(.88)" },
          { opacity: 1, transform: "none" }
        ], { duration: 750, delay: 120 + i * 60, easing: EASE, fill: "backwards" });
      }
    });
  }

  /* arm the deal-in */
  if (grid && motion && "IntersectionObserver" in window) {
    grid.classList.add("is-armed");
    var go = new IntersectionObserver(function (es) {
      if (es.some(function (e) { return e.isIntersecting; })) { go.disconnect(); deal(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -18% 0px" });
    go.observe(grid);
    setTimeout(function () { grid.classList.remove("is-armed"); }, 8000); /* safety net */
  }

  /* ---------- dropdown filters + search (cards shuffle out, survivors glide, new ones deal in) ---------- */
  function closeAll(except) { drops.forEach(function (d) { if (d !== except) { d.classList.remove("is-open"); d.querySelector(".in-drop__btn").setAttribute("aria-expanded", "false"); } }); }
  drops.forEach(function (d) {
    var btn = d.querySelector(".in-drop__btn"), label = btn.querySelector("[data-label]");
    btn.addEventListener("click", function (e) {
      e.stopPropagation(); closeAll(d);
      var open = d.classList.toggle("is-open"); btn.setAttribute("aria-expanded", open);
    });
    $(".in-drop__panel button", d).forEach(function (o) {
      o.addEventListener("click", function () {
        var v = o.getAttribute("data-v");
        state[d.getAttribute("data-key")] = v;
        $(".in-drop__panel button", d).forEach(function (x) { x.classList.toggle("is-sel", x === o); });
        label.textContent = v === "all" ? label.getAttribute("data-label") : o.textContent;
        d.classList.toggle("is-set", v !== "all"); d.classList.remove("is-open");
        apply();
      });
    });
  });
  document.addEventListener("click", function () { closeAll(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
  if (clear) clear.addEventListener("click", function () {
    state.cat = state.type = "all"; if (input) input.value = "";
    drops.forEach(function (d) {
      var l = d.querySelector("[data-label]"); l.textContent = l.getAttribute("data-label"); d.classList.remove("is-set");
      $(".in-drop__panel button", d).forEach(function (x) { x.classList.toggle("is-sel", x.getAttribute("data-v") === "all"); });
    });
    apply();
  });

  var timer = null;
  function apply() {
    if (!grid || !input) return;
    var q = (input.value || "").trim().toLowerCase();
    clearTimeout(timer);
    cards.forEach(kill);
    var ok = new Map(), any = state.cat !== "all" || state.type !== "all" || !!q;
    cards.forEach(function (c) {
      ok.set(c, (state.cat === "all" || c.getAttribute("data-cat") === state.cat) &&
                (state.type === "all" || c.getAttribute("data-type") === state.type) &&
                (!q || c.textContent.toLowerCase().indexOf(q) > -1));
    });
    var prev = snapshot(vis()), leaving = vis().filter(function (c) { return !ok.get(c); });
    function finish() {
      var shown = 0;
      cards.forEach(function (c) { var o = ok.get(c); c.classList.toggle("is-hidden", !o); if (o) shown++; });
      grid.classList.toggle("is-filtered", any);
      if (clear) clear.hidden = !any;
      if (empty) empty.classList.toggle("is-show", shown === 0);
      if (motion) play(prev);
    }
    if (motion && leaving.length) {
      leaving.forEach(function (c, i) {
        c.animate([{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-18px) rotate(" + (i % 2 ? 8 : -8) + "deg) scale(.82)" }],
          { duration: 260, easing: "ease-in", fill: "forwards" });
      });
      timer = setTimeout(finish, 250);
    } else finish();
  }
  if (input) input.addEventListener("input", apply);

  /* ---------- SHUFFLE button ---------- */
  if (shuffleBtn && grid) shuffleBtn.addEventListener("click", function () {
    if (shuffleBtn.disabled) return;
    var kids = $(".in-card", grid), before = kids.slice(), prev = snapshot(vis());
    cards.forEach(kill);
    for (var tries = 0; tries < 5; tries++) {
      for (var i = kids.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = kids[i]; kids[i] = kids[j]; kids[j] = t; }
      if (kids.some(function (k, x) { return k !== before[x]; })) break;
    }
    kids.forEach(function (k) { grid.appendChild(k); });
    if (motion) {
      shuffleBtn.disabled = true; shuffleBtn.classList.add("is-busy"); grid.classList.add("is-shuffling");
      play(prev, true);
      setTimeout(function () { shuffleBtn.disabled = false; shuffleBtn.classList.remove("is-busy"); grid.classList.remove("is-shuffling"); }, 1350);
    }
  });

  /* ---------- 3D tilt + glare (desktop) ---------- */
  function tilt(el, max) {
    var target = el;
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      target.style.setProperty("--ry", (x - 0.5) * max + "deg");
      target.style.setProperty("--rx", (0.5 - y) * max * 0.8 + "deg");
      target.style.setProperty("--gx", x * 100 + "%");
      target.style.setProperty("--gy", y * 100 + "%");
    });
    el.addEventListener("pointerleave", function () {
      target.style.setProperty("--ry", "0deg"); target.style.setProperty("--rx", "0deg");
    });
  }
  if (!reduce && canHover) {
    cards.forEach(function (c) { tilt(c, 9); });
    var ft = document.querySelector(".in-featured");
    if (ft) tilt(ft, 5);
  }

  /* ---------- touch: tap = flip, tap again = open ---------- */
  if (window.matchMedia && matchMedia("(hover: none)").matches) {
    cards.forEach(function (c) {
      c.addEventListener("click", function (e) {
        var back = e.target.closest && e.target.closest(".in-card__flipback");
        if (back) { e.preventDefault(); c.classList.remove("is-flipped"); return; }
        if (!c.classList.contains("is-flipped")) {
          e.preventDefault();
          cards.forEach(function (x) { if (x !== c) x.classList.remove("is-flipped"); });
          c.classList.add("is-flipped");
        }
      });
    });
  }

  /* ---------- article page: reading progress + copy link ---------- */
  var bar = document.querySelector(".in-progress b");
  if (bar) {
    var tick = function () {
      var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
      bar.parentNode.style.setProperty("--p", max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    window.addEventListener("scroll", tick, { passive: true }); tick();
  }
  var copy = document.getElementById("inCopy"), copied = document.getElementById("inCopied");
  if (copy) copy.addEventListener("click", function () {
    var done = function () { copied.classList.add("is-show"); setTimeout(function () { copied.classList.remove("is-show"); }, 2000); };
    if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, done); else done();
  });

  /* ---------- newsletter: front-end only. Connect to your mail/DB handler (e.g. a PHP file) before going live. ---------- */
  var form = document.getElementById("inForm"), thanks = document.getElementById("inThanks");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var em = document.getElementById("inEmail");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)) { em.focus(); em.style.outline = "2px solid #e5c058"; return; }
    em.style.outline = ""; form.style.display = "none"; thanks.classList.add("is-show");
  });
})();