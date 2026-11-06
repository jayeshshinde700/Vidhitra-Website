/* Contact page animations + form (vanilla JS, no dependencies) */
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var page = document.querySelector(".ct-page");
  if (!page) return;

  /* ---------- 1. split headlines into masked words ---------- */
  page.querySelectorAll(".ct-split").forEach(function (el) {
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "ct-w";
            var s = document.createElement("span"); s.textContent = part; s.style.setProperty("--i", i++);
            w.appendChild(s); frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) { walk(n); }
      });
    })(el);
  });

  /* ---------- 1b. main heading: word-by-word reveal, same as the Fractional General Counsel hero ---------- */
  page.querySelectorAll(".ct-fgc").forEach(function (el) {
    var i = 0;
    el.setAttribute("aria-label", el.textContent.trim().replace(/\s+/g, " "));
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "vd-word"; w.setAttribute("aria-hidden", "true");
            var s = document.createElement("span"); s.className = "vd-word-inner"; s.textContent = part;
            s.style.transitionDelay = (0.28 + i++ * 0.08) + "s";
            w.appendChild(s); frag.appendChild(w);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1) { walk(n); }
      });
    })(el);
    if (reduce || !("IntersectionObserver" in window)) { el.classList.add("is-loaded"); return; }
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle("is-loaded", e.isIntersecting); });
    }, { threshold: 0.2 }).observe(el);
  });

  /* ---------- 2. scroll reveal (replays every time the section comes back into view) ---------- */
  var grid = page.querySelector(".ct-grid");
  var targets = page.querySelectorAll(".ct-reveal, .ct-steps");
  page.querySelectorAll(".ct-reveal[data-d]").forEach(function (el) { el.style.setProperty("--d", el.getAttribute("data-d")); });
  if ("IntersectionObserver" in window && !reduce) {
    function groupOf(el) { return el === grid ? grid.querySelectorAll(".ct-reveal") : [el]; }
    var enter = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) groupOf(e.target).forEach(function (t) { t.classList.add("is-in"); }); });
    }, { threshold: 0, rootMargin: "0px 0px -10% 0px" });
    var leave = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (!e.isIntersecting) groupOf(e.target).forEach(function (t) { t.classList.remove("is-in"); }); });
    }, { threshold: 0 });
    targets.forEach(function (t) { if (!grid || !grid.contains(t)) { enter.observe(t); leave.observe(t); } });
    /* intro (from the left) and form (from the right) arrive together, smoothly, when the section enters */
    if (grid) { enter.observe(grid); leave.observe(grid); }

    /* pause looping animations of sections that are off-screen (keeps scrolling smooth) */
    var po = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle("is-off", !e.isIntersecting); });
    }, { rootMargin: "120px 0px" });
    page.querySelectorAll(".ct-main, .ct-process, .ct-cta").forEach(function (s) { po.observe(s); });
  } else { targets.forEach(function (t) { t.classList.add("is-in"); }); }

  /* ---------- 2b. headline text effect: same as the rest of the site (.text-anim), but replays ---------- */
  if (window.gsap && window.SplitText && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    page.querySelectorAll(".ct-text").forEach(function (el) {
      var split = new SplitText(el, { type: "chars, words" });
      gsap.from(split.chars, {
        duration: 1, delay: 0.1, x: 20, autoAlpha: 0, stagger: 0.03, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play reset play reset" }
      });
    });
  }

  /* ---------- 2c. "What happens next" section wipes in from its diagonal edge on scroll (replays) ---------- */
  var proc = page.querySelector(".ct-process");
  if (proc && "IntersectionObserver" in window && !reduce) {
    proc.classList.add("ct-wipe");
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { proc.classList.toggle("is-in", e.isIntersecting); });
    }, { threshold: 0, rootMargin: "0px 0px -22% 0px" }).observe(proc);
  }

  /* ---------- 3. card tilt + glow ---------- */
  if (!reduce && window.matchMedia("(hover: hover)").matches) {
    page.querySelectorAll(".ct-card, .ct-step__card").forEach(function (c) {
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        c.style.setProperty("--mx", x + "px"); c.style.setProperty("--my", y + "px");
        c.style.setProperty("--ry", ((x / r.width) - 0.5) * 7 + "deg");
        c.style.setProperty("--rx", (0.5 - (y / r.height)) * 7 + "deg");
      });
      c.addEventListener("pointerleave", function () { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
    });

    /* blob parallax following the cursor */
    var main = page.querySelector(".ct-main"), blobs = page.querySelectorAll(".ct-blob[data-depth]"), raf;
    if (main) main.addEventListener("pointermove", function (e) {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var r = main.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        blobs.forEach(function (b) { var d = +b.getAttribute("data-depth"); b.style.translate = nx * d + "px " + ny * d + "px"; });
      });
    });

    /* magnetic buttons */
    page.querySelectorAll(".ct-cta__btn").forEach(function (b) {
      b.addEventListener("pointermove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + ((e.clientX - r.left - r.width / 2) * 0.18) + "px," + ((e.clientY - r.top - r.height / 2) * 0.3) + "px)";
      });
      b.addEventListener("pointerleave", function () { b.style.transform = ""; });
    });
  }

  /* ---------- 4. form ---------- */
  var form = document.getElementById("ctForm");
  if (!form) return;
  var card = document.getElementById("ctFormCard"), bar = document.getElementById("ctProgress"),
      btn = document.getElementById("ctSubmit");
  var required = ["ctName", "ctOrg", "ctEmail", "ctMessage"].map(function (id) { return document.getElementById(id); });
  var consent = document.getElementById("ctConsent");

  function topicChosen() { return !!form.querySelector('input[name="topic"]:checked'); }
  function progress() {
    var done = required.filter(function (f) { return f.value.trim(); }).length + (topicChosen() ? 1 : 0) + (consent.checked ? 1 : 0);
    bar.style.setProperty("--p", (done / (required.length + 2)).toFixed(3));
  }
  form.addEventListener("input", progress); form.addEventListener("change", progress);

  function setInvalid(el, bad) { var f = el.closest(".ct-field"); if (f) f.classList.toggle("is-invalid", bad); }
  function validate() {
    var ok = true, first = null;
    required.forEach(function (f) {
      var v = f.value.trim(), bad = !v || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
      setInvalid(f, bad); if (bad) { ok = false; first = first || f; }
    });
    var ph = document.getElementById("ctPhone"), phBad = ph.value.trim() && !/^[0-9+()\-\s]{7,20}$/.test(ph.value.trim());
    setInvalid(ph, !!phBad); if (phBad) { ok = false; first = first || ph; }
    var tf = document.getElementById("ctTopicField"); tf.classList.toggle("is-invalid", !topicChosen());
    if (!topicChosen()) { ok = false; first = first || tf; }
    setInvalid(consent, !consent.checked); if (!consent.checked) { ok = false; first = first || consent; }
    /* Do NOT scroll the page here: on the home page the scroll-linked (GSAP) animation would replay and the
       form/text would glitch and slide. Just focus the first wrong field; scroll only if it is really off-screen. */
    if (first) {
      var tgt = first.matches && first.matches("input,textarea,select,button") ? first : first.querySelector("input,textarea");
      if (tgt && tgt.focus) { try { tgt.focus({ preventScroll: true }); } catch (err) { tgt.focus(); } }
      var rc = first.getBoundingClientRect();
      if (rc.top < 80 || rc.bottom > window.innerHeight - 20) first.scrollIntoView({ behavior: "auto", block: "nearest" });
    }
    return ok;
  }
  form.addEventListener("input", function (e) { var f = e.target.closest(".ct-field"); if (f) f.classList.remove("is-invalid"); });
  form.addEventListener("change", function (e) { var f = e.target.closest(".ct-field"); if (f) f.classList.remove("is-invalid"); });

  /* ---------- enquiry received popup ---------- */
  var pop = document.getElementById("ctPopup"), popWrap = document.getElementById("ctPopupWrap"), popClose = document.getElementById("ctPopupClose");
  var popBig = popWrap.querySelector(".ct-popup-shape-big"), popSmall = popWrap.querySelector(".ct-popup-shape-small"), lastFocus = null;
  function openPopup() {
    lastFocus = document.activeElement;
    pop.classList.remove("is-closing"); pop.classList.add("is-active"); pop.setAttribute("aria-hidden", "false");
    var sbw = window.innerWidth - document.documentElement.clientWidth;
    if (sbw > 0) document.documentElement.style.setProperty("--ct-sbw", sbw + "px");
    document.documentElement.classList.add("ct-popup-open");
    setTimeout(function () { popClose.focus(); }, 60);
  }
  function closePopup() {
    pop.classList.add("is-closing");
    setTimeout(function () {
      pop.classList.remove("is-active", "is-closing"); pop.setAttribute("aria-hidden", "true");
      document.documentElement.classList.remove("ct-popup-open");
      document.documentElement.style.removeProperty("--ct-sbw");
      form.reset(); progress();
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, reduce ? 0 : 350);
  }
  popClose.addEventListener("click", closePopup);
  pop.addEventListener("click", function (e) { if (e.target === pop) closePopup(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && pop.classList.contains("is-active")) closePopup(); });
  pop.addEventListener("mousemove", function (e) { /* only the background shapes drift with the cursor */
    if (reduce) return;
    var r = popWrap.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    popBig.style.transform = "translate(-50%,-50%) translate3d(" + x * 50 + "px," + y * 50 + "px,0)";
    popSmall.style.transform = "translate3d(" + x * -70 + "px," + y * -70 + "px,0)";
  });
  function sent() { openPopup(); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validate()) return;
    btn.classList.add("is-loading"); btn.querySelectorAll(".btn_icon i").forEach(function (i) { i.className = "fa fa-spinner"; });
    fetch(form.getAttribute("action"), { method: "POST", body: new FormData(form), headers: { "X-Requested-With": "XMLHttpRequest", "Accept": "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j.ok) throw new Error(j.error || "failed"); sent(); })
      .catch(function () { alert("Sorry, we could not send your enquiry right now. Please email us at info@vidhitra.com."); })
      .then(function () { btn.classList.remove("is-loading"); btn.querySelectorAll(".btn_icon i").forEach(function (i) { i.className = "fa fa-arrow-right"; }); });
  });

  progress();
  if (/[?&]sent=1/.test(location.search)) sent();
})();