/**
 * VIDHITRA — Fractional General Counsel page JS
 * Premium Editorial Animations & Scroll Interactions
 * Uses GSAP + ScrollTrigger with lightweight fallback
 * Isolated under .fgc-* namespace
 */

(function () {
  'use strict';

  var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function hasGSAP() {
    return typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  }

  /* ── 1. Hero Entrance & Kinetic Word Reveal ───────────────── */
  function initHero() {
    var hero = document.querySelector('.fgc-hero');
    if (!hero) return;

    var h1El = document.querySelector('#fgc-hero-title');
    if (h1El && !h1El.dataset.vdSplit) {
      var text = h1El.textContent.trim();
      var words = text.split(/\s+/);
      h1El.innerHTML = '';
      words.forEach(function (word, idx) {
        var wordSpan = document.createElement('span');
        wordSpan.className = 'vd-word';
        var innerSpan = document.createElement('span');
        innerSpan.className = 'vd-word-inner';
        innerSpan.textContent = word;
        innerSpan.style.transitionDelay = (0.28 + idx * 0.08) + 's';
        wordSpan.appendChild(innerSpan);
        h1El.appendChild(wordSpan);
      });
      h1El.dataset.vdSplit = 'true';
    }

    if (isReducedMotion) {
      hero.classList.add('is-loaded');
      return;
    }

    hero.classList.add('vd-initial-prep');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        hero.classList.remove('vd-initial-prep');
        hero.classList.add('is-loaded');
      });
    });

    // Background parallax & content floating
    if (hasGSAP()) {
      if (document.querySelector('.fgc-hero__bg img')) {
        gsap.to('.fgc-hero__bg img', {
          yPercent: 14,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fgc-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }

      gsap.to('.fgc-hero__content', {
        yPercent: -10,
        opacity: 0.82,
        ease: 'none',
        scrollTrigger: {
          trigger: '.fgc-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }
  }

  /* ── 2. Understanding Section Animations (only runs if section exists) ── */
  function initIntro() {
    var intro = document.querySelector('.fgc-intro');
    if (!intro || isReducedMotion || !hasGSAP()) return;

    function fromTo(target, from, to, trigger, start) {
      if (!target || (target.length !== undefined && !target.length)) return;
      to.scrollTrigger = { trigger: trigger, start: start || 'top 85%' };
      gsap.fromTo(target, from, to);
    }

    var heading = intro.querySelector('.fgc-intro__heading');
    fromTo(heading, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, heading);

    var headingMark = intro.querySelector('.fgc-intro__heading-mark');
    if (headingMark && heading) {
      fromTo(headingMark, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out' }, heading);
    }

    var eyebrow = intro.querySelector('.fgc-intro__left .fgc-eyebrow');
    fromTo(eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, eyebrow);

    var metaContainer = intro.querySelector('.fgc-intro__meta');
    if (metaContainer) {
      fromTo(intro.querySelectorAll('.fgc-intro__meta-item'), { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power2.out' }, metaContainer);

      fromTo(intro.querySelectorAll('.fgc-intro__meta-icon'), { rotation: -30 },
        { rotation: 0, duration: 0.85, stagger: 0.1, ease: 'back.out(1.4)' }, metaContainer);

      fromTo(intro.querySelector('.fgc-intro__meta-rail'), { scaleY: 0 },
        { scaleY: 1, duration: 0.9, ease: 'power2.out', transformOrigin: 'top center' }, metaContainer);

      fromTo(intro.querySelectorAll('.fgc-intro__meta-dot'), { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'back.out(1.6)' }, metaContainer, 'top 80%');

      fromTo(intro.querySelectorAll('.fgc-intro__meta-num'), { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.45, stagger: 0.12, delay: 0.15, ease: 'back.out(1.6)' }, metaContainer, 'top 80%');
    }

    intro.querySelectorAll('.fgc-intro__right p').forEach(function (p) {
      fromTo(p, { y: 28, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0 0 0% 0)', duration: 0.9, ease: 'power3.out' }, p, 'top 88%');
    });

    var pull = intro.querySelector('.fgc-intro__pull');
    fromTo(pull, { x: 25, opacity: 0, scale: 0.98 },
      { x: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power4.out' }, pull, 'top 82%');

    var insight = intro.querySelector('.fgc-intro__insight');
    if (insight) {
      fromTo(insight, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, insight);
      fromTo(insight.querySelectorAll('.fgc-intro__insight-tag'), { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.25, ease: 'power2.out' }, insight, 'top 80%');
    }

    var leftCol = intro.querySelector('.fgc-intro__left');
    if (leftCol) {
      gsap.to(leftCol, {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: intro, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    }
  }

  /* ── 3. FGC Model: Reveal, Versus Hover & Aura Parallax ─────── */
  function initEngagementModel() {
    var section = document.querySelector('.fgc-eng') || document.querySelector('#engagement-model');
    if (!section) return;

    var versus = section.querySelector('.fgc-eng__versus');
    var panels = section.querySelectorAll('.fgc-eng__versus-panel');

    function revealOnce(el, threshold) {
      if (!el) return;
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-inview');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: threshold || 0.2 });
        io.observe(el);
      } else {
        el.classList.add('is-inview');
      }
    }

    // Section drives heading/intro/watermark; versus drives seam + cards
    revealOnce(section, 0.15);
    revealOnce(versus, 0.2);

    // Dim the inactive side, glow the seam toward the active one
    if (versus && panels.length) {
      panels.forEach(function (panel) {
        var isA = panel.classList.contains('fgc-eng__versus-panel--a');
        var focusOn = function () {
          versus.classList.remove('is-panel-a-focus', 'is-panel-b-focus');
          versus.classList.add(isA ? 'is-panel-a-focus' : 'is-panel-b-focus');
        };
        panel.addEventListener('mouseenter', focusOn);
        panel.addEventListener('focus', focusOn);
      });
      var clearFocus = function () {
        versus.classList.remove('is-panel-a-focus', 'is-panel-b-focus');
      };
      versus.addEventListener('mouseleave', clearFocus);
      versus.addEventListener('focusout', clearFocus);
    }

    // Light parallax on the aura blobs
    if (hasGSAP() && !isReducedMotion) {
      var blobs = section.querySelectorAll('.fgc-eng__aura-blob');
      if (blobs.length) {
        gsap.to(blobs, {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        });
      }
    }
  }

  /* ── 3b. Editorial Clip Reveal (continuity statement) ────── */
  function initLineReveals() {
    if (isReducedMotion || !hasGSAP()) return;

    document.querySelectorAll('.fgc-continuity__statement').forEach(function (el) {
      gsap.fromTo(el,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.2,
          ease: 'power3.out',
          clearProps: 'clipPath',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        }
      );
    });
  }

  /* ── 4. How We Work: Stage Motion ───────────────────────── */
  function initProcess() {
    var stages = document.querySelectorAll('.fgc-process__stage');
    if (!stages.length || isReducedMotion || !hasGSAP()) return;

    var overlayTitle = document.querySelector('#fgcProcessOverlayTitle');
    var numSpan = document.querySelector('#fgcProcessCurrentNum');
    var visualImg = document.querySelector('.fgc-process__visual-bg img');

    // GSAP drives the image transform, so disable the CSS transition on it
    if (visualImg) visualImg.style.transition = 'opacity 0.7s ease';

    var currentIndex = -1;

    function setActiveStage(index) {
      if (index === currentIndex) return;
      currentIndex = index;

      stages.forEach(function (stage, i) {
        stage.classList.toggle('is-active', i === index);
      });

      var activeStage = stages[index];
      if (!activeStage) return;

      var stageName = activeStage.getAttribute('data-stage-name');
      var stageNum = activeStage.getAttribute('data-stage-num');

      if (numSpan && stageNum) numSpan.textContent = stageNum;

      if (overlayTitle && stageName) {
        overlayTitle.textContent = stageName;
        gsap.fromTo(overlayTitle,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      }

      if (visualImg) {
        gsap.fromTo(visualImg,
          { scale: 1.1 },
          { scale: 1.05, duration: 0.8, ease: 'power2.out' }
        );
      }
    }

    stages.forEach(function (stage, index) {
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: function () { setActiveStage(index); },
        onEnterBack: function () { setActiveStage(index); }
      });
    });
  }

  /* ── 5. Capabilities Showcase ───────────────────────────── */
  function initCapabilitiesShowcase() {
    var showcaseSection = document.querySelector('.fgc-capabilities--showcase');
    if (!showcaseSection || isReducedMotion || !hasGSAP()) return;

    /* background zoom is handled by the scroll zoom block at the end of this file */

    var items = showcaseSection.querySelectorAll('.fgc-showcase-item');
    if (items.length) {
      // Hand these over from CSS reveal to GSAP so they don't fight each other
      items.forEach(function (el) {
        el.classList.remove('fgc-reveal', 'fgc-reveal--d1', 'fgc-reveal--d2', 'fgc-reveal--d3', 'fgc-reveal--d4');
        el.style.transition = 'none';
      });

      gsap.fromTo(items,
        { x: -25, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          clearProps: 'transform,opacity,transition', // restores CSS hover behaviour
          scrollTrigger: {
            trigger: '.fgc-showcase-list',
            start: 'top 85%'
          }
        }
      );
    }
  }

  function initShowcaseSpotlight() {
    var list = document.querySelector('.fgc-showcase-list');
    if (!list || isReducedMotion) return;

    list.addEventListener('pointermove', function (e) {
      var rect = list.getBoundingClientRect();
      list.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
      list.style.setProperty('--my', (e.clientY - rect.top) + 'px');
    });
  }

  /* ── 5b. Capabilities Staggered Entrance (only if present) ── */
  function initCapabilities() {
    var items = document.querySelectorAll('.fgc-cap-item');
    if (!items.length || isReducedMotion || !hasGSAP()) return;

    gsap.fromTo(items,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.fgc-capabilities__index',
          start: 'top 75%'
        }
      }
    );
  }

  /* ── 6. Audience / Who We Support Chapter Interactions ──── */
  function initAudience() {
    var wrap = document.querySelector('.fgc-aud-wrap');
    if (!wrap) return;

    if (isReducedMotion) {
      document.querySelectorAll('.fgc-aud-card, .fgc-aud-banner, .fgc-aud-chapter, .fgc-aud-header').forEach(function (el) {
        el.classList.add('is-inview');
        el._ready = true;
      });
      return;
    }
    if (!hasGSAP()) return;

    // Prep state to avoid FOUC before GSAP initializes
    wrap.classList.add('is-aud-prep');

    // Helper: hairline shine flash on card reveal
    function triggerShine(cardEl) {
      cardEl.classList.add('is-aud-shine');
      setTimeout(function () {
        cardEl.classList.remove('is-aud-shine');
      }, 700);
    }

    // Safety fallback: if animations fail or take too long, restore visibility
    var safetyTimeout = setTimeout(function () {
      wrap.classList.remove('is-aud-prep');
      var fallbackCards = wrap.querySelectorAll('.fgc-aud-card');
      fallbackCards.forEach(function (card) {
        if (!card._ready) {
          card._ready = true;
          card.style.willChange = '';
          if (typeof gsap !== 'undefined') {
            gsap.set(card, { clearProps: 'transform,opacity,clipPath,transition,willChange' });
            var inners = card.querySelectorAll('.fgc-aud-card__num, .fgc-aud-card__icon, .fgc-aud-card__title, .fgc-aud-card__desc');
            if (inners.length) {
              gsap.set(inners, { clearProps: 'transform,opacity' });
            }
          }
        }
      });
    }, 4000);

    // 1. Section Header Reveal (top 85%)
    var header = document.querySelector('.fgc-aud-header');
    if (header) {
      gsap.fromTo(
        header,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            once: true
          }
        }
      );
    }

    // 2. Scroll Rail (scaleY scrub from 0 to 1 across chapters block with moving dot)
    var railLine = document.querySelector('.fgc-aud-rail__line');
    var railDot = document.querySelector('.fgc-aud-rail__dot');
    if (railLine && window.innerWidth >= 992) {
      gsap.fromTo(
        railLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fgc-aud-body',
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: true,
            onUpdate: function (self) {
              if (railDot) {
                railDot.style.top = (self.progress * 100) + '%';
              }
            }
          }
        }
      );
    }

    // 3. Chapter Headers Reveal
    document.querySelectorAll('.fgc-aud-chapter').forEach(function (ch) {
      var num = ch.querySelector('.fgc-aud-chapter__numeral');
      var title = ch.querySelector('.fgc-aud-chapter__title');
      var rule = ch.querySelector('.fgc-aud-chapter__rule');

      var chTl = gsap.timeline({
        scrollTrigger: {
          trigger: ch,
          start: 'top 85%',
          once: true
        }
      });

      if (num) {
        chTl.fromTo(num, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0);
      }
      if (title) {
        chTl.fromTo(title, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 0.1);
      }
      if (rule) {
        chTl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power3.out' }, 0.2);
      }
    });

    // 4. Cards Converging Row-by-Row Entrance Reveal
    var allCards = Array.prototype.slice.call(wrap.querySelectorAll('.fgc-aud-card'));
    if (allCards.length) {
      var isMobile = window.matchMedia('(max-width: 575px)').matches;
      var easeChoice = (typeof gsap !== 'undefined' && gsap.parseEase && gsap.parseEase('expo.out')) ? 'expo.out' : 'power4.out';

      // Group cards into rows by top coordinate (within 12px)
      var rows = [];
      allCards.forEach(function (card, index) {
        var rect = card.getBoundingClientRect();
        var matchedRow = null;
        for (var r = 0; r < rows.length; r++) {
          if (Math.abs(rows[r].top - rect.top) <= 12) {
            matchedRow = rows[r];
            break;
          }
        }
        if (!matchedRow) {
          matchedRow = { top: rect.top, items: [] };
          rows.push(matchedRow);
        }

        // Determine entrance direction and start parameters
        var grid = card.closest('.fgc-aud-grid');
        var entersFrom = 'middle';

        if (isMobile) {
          entersFrom = (index % 2 === 0) ? 'left' : 'right';
        } else if (grid) {
          var gridRect = grid.getBoundingClientRect();
          var cardCenter = rect.left + rect.width / 2;
          var gridCenter = gridRect.left + gridRect.width / 2;
          var threshold = 0.08 * gridRect.width;

          if (cardCenter < gridCenter - threshold) {
            entersFrom = 'left';
          } else if (cardCenter > gridCenter + threshold) {
            entersFrom = 'right';
          } else {
            entersFrom = 'middle';
          }
        }

        var fromVars;
        if (entersFrom === 'left') {
          fromVars = {
            x: isMobile ? -60 : -110,
            y: 0,
            opacity: 0,
            clipPath: isMobile ? 'inset(0 60% 0 0 round 14px)' : 'inset(0 100% 0 0 round 14px)'
          };
        } else if (entersFrom === 'right') {
          fromVars = {
            x: isMobile ? 60 : 110,
            y: 0,
            opacity: 0,
            clipPath: isMobile ? 'inset(0 0 0 60% round 14px)' : 'inset(0 0 0 100% round 14px)'
          };
        } else {
          fromVars = {
            x: 0,
            y: 60,
            opacity: 0,
            clipPath: 'inset(100% 0 0 0 round 14px)'
          };
        }

        var inners = card.querySelectorAll('.fgc-aud-card__num, .fgc-aud-card__icon, .fgc-aud-card__title, .fgc-aud-card__desc');

        // Apply initial hidden state via GSAP and disable CSS transitions
        card.style.transition = 'none';
        card.style.willChange = 'transform, opacity';
        gsap.set(card, fromVars);
        if (inners.length) {
          gsap.set(inners, { y: 14, opacity: 0 });
        }

        matchedRow.items.push({
          card: card,
          entersFrom: entersFrom,
          fromVars: fromVars,
          inners: inners
        });
      });

      // Remove prep class in same tick now that GSAP has taken over
      wrap.classList.remove('is-aud-prep');

      // Create a ScrollTrigger timeline for each row
      rows.forEach(function (row, rowIndex) {
        if (!row.items.length) return;
        var firstCard = row.items[0].card;

        var rowTl = gsap.timeline({
          scrollTrigger: {
            trigger: firstCard,
            start: 'top 88%',
            once: true
          },
          delay: rowIndex * 0.14
        });

        row.items.forEach(function (item) {
          var card = item.card;
          var inners = item.inners;
          var cardStartTime = (item.entersFrom === 'right') ? 0.08 : 0;

          rowTl.to(
            card,
            {
              x: 0,
              y: 0,
              opacity: 1,
              clipPath: 'inset(0 0 0 0 round 14px)',
              duration: 1.05,
              ease: easeChoice,
              onComplete: function () {
                card._ready = true;
                card.style.willChange = '';
                triggerShine(card);
                gsap.set(card, { clearProps: 'transform,opacity,clipPath,transition,willChange' });
                if (inners.length) {
                  gsap.set(inners, { clearProps: 'transform,opacity' });
                }
              }
            },
            cardStartTime
          );

          if (inners.length) {
            rowTl.to(
              inners,
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.07,
                ease: 'power3.out'
              },
              cardStartTime + 0.25
            );
          }
        });
      });
    }

    // 5. 3D Tilt & Cursor Spotlight on hover (desktop pointer:fine only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      var cards = document.querySelectorAll('.fgc-aud-card');
      cards.forEach(function (card) {
        var setRotateX = gsap.quickTo(card, 'rotateX', { duration: 0.4, ease: 'power2.out' });
        var setRotateY = gsap.quickTo(card, 'rotateY', { duration: 0.4, ease: 'power2.out' });

        card.addEventListener('mousemove', function (e) {
          if (!card._ready) return;
          var rect = card.getBoundingClientRect();
          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;

          card.style.setProperty('--mx', x + 'px');
          card.style.setProperty('--my', y + 'px');

          var centerX = rect.width / 2;
          var centerY = rect.height / 2;
          var rotY = ((x - centerX) / centerX) * 4;
          var rotX = -((y - centerY) / centerY) * 4;

          setRotateX(rotX);
          setRotateY(rotY);
        });

        card.addEventListener('mouseleave', function () {
          if (!card._ready) return;
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
            clearProps: 'transform'
          });
        });
      });
    }

    // 6. Section Left Watermark Drift
    var wm = document.querySelector('.fgc-aud-watermark');
    if (wm) {
      gsap.fromTo(
        wm,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.fgc-aud-wrap',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }
  }

  /* ── 7. Generic Scroll Reveals ──────────────────────────── */
  function initGenericReveals() {
    var els = document.querySelectorAll('.fgc-reveal');
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-inview');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      els.forEach(function (el) { io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add('is-inview'); });
    }
  }

  /* ── 8. Why Continuity Matters ──────────────────────────── */
  function initContinuity() {
    var contSection = document.querySelector('.fgc-continuity');
    if (!contSection) return;

    requestAnimationFrame(function () {
      contSection.classList.add('is-loaded');
    });

    // Expanding cards auto-scroll / auto-advance loop & click interaction
    var cardsContainer = contSection.querySelector('.fgc-cont-cards');
    var cards = contSection.querySelectorAll('.fgc-cont-card');
    if (cards.length) {
      var currentIndex = 0;
      var autoTimer = null;
      var cycleInterval = 2000; // 1s per card
      var isHovered = false;
      var isInView = false;

      // Find initial active index if set in HTML
      cards.forEach(function (card, i) {
        if (card.classList.contains('is-active')) {
          currentIndex = i;
        }
      });

      function setActiveCard(index) {
        currentIndex = (index + cards.length) % cards.length;
        cards.forEach(function (card, i) {
          var isActive = i === currentIndex;
          card.classList.toggle('is-active', isActive);
          card.setAttribute('aria-pressed', String(isActive));
        });
      }

      function startAutoCycle() {
        stopAutoCycle();
        if (isReducedMotion) return;
        autoTimer = setInterval(function () {
          if (!isHovered && isInView) {
            setActiveCard(currentIndex + 1);
          }
        }, cycleInterval);
      }

      function stopAutoCycle() {
        if (autoTimer) {
          clearInterval(autoTimer);
          autoTimer = null;
        }
      }

      // Manual card click
      cards.forEach(function (card, idx) {
        card.addEventListener('click', function () {
          setActiveCard(idx);
          startAutoCycle(); // Reset interval countdown on interaction
        });
      });

      // Pause when hovering over the cards, resume on mouseleave
      if (cardsContainer) {
        cardsContainer.addEventListener('mouseenter', function () {
          isHovered = true;
        });
        cardsContainer.addEventListener('mouseleave', function () {
          isHovered = false;
        });
      }

      // Viewport-aware autoplay
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              isInView = entry.isIntersecting;
              if (isInView) {
                startAutoCycle();
              } else {
                stopAutoCycle();
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(contSection);
      } else {
        isInView = true;
        startAutoCycle();
      }
    }

    if (isReducedMotion || !hasGSAP()) return;

    var bgImg = document.querySelector('.fgc-continuity__bg img');
    if (bgImg) {
      // GSAP owns transform here; remove the CSS transition to avoid lag
      bgImg.style.transition = 'none';
      gsap.to(bgImg, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: contSection,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    var heading = document.querySelector('.fgc-continuity__heading');
    if (heading) {
      gsap.fromTo(heading,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' }
        }
      );
    }

    var statement = document.querySelector('.fgc-continuity__statement');
    if (statement) {
      gsap.fromTo(statement,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: statement, start: 'top 85%' }
        }
      );
    }

    if (cards.length) {
      gsap.fromTo(cards,
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.fgc-cont-cards',
            start: 'top 82%'
          }
        }
      );
    }
  }

  /* ── 9. Final CTA Motion Sequence ───────────────────────── */
  function initCTA() {
    var cta = document.querySelector('.fgc-cta');
    if (!cta) return;

    var card = cta.querySelector('.fgc-cta__card');
    var heading = cta.querySelector('.fgc-cta__heading');
    var accent = cta.querySelector('.fgc-cta__accent');
    var crestRing = cta.querySelector('.fgc-inv-crest__ring');
    var crestLetter = cta.querySelector('.fgc-inv-crest__letter');
    var eyebrow = cta.querySelector('.fgc-cta__eyebrow');
    var eyebrowRules = cta.querySelectorAll('.fgc-cta__eyebrow-rule');
    var line = cta.querySelector('.fgc-cta__line');
    var bodyText = cta.querySelector('.fgc-cta__text');
    var actionItems = cta.querySelectorAll('.fgc-cta__actions > *');
    var chips = cta.querySelectorAll('.fgc-cta__chip');
    var watermark = cta.querySelector('.fgc-cta__watermark');
    var auras = cta.querySelectorAll('.fgc-cta__aura');

    // Word split for heading while preserving .fgc-cta__accent
    if (heading && !heading.getAttribute('data-split')) {
      heading.setAttribute('data-split', 'true');
      var nodes = Array.prototype.slice.call(heading.childNodes);
      heading.innerHTML = '';
      nodes.forEach(function (node) {
        if (node.nodeType === 3) {
          // TEXT_NODE
          var words = node.textContent.trim().split(/\s+/);
          words.forEach(function (w) {
            if (w.length > 0) {
              var mask = document.createElement('span');
              mask.className = 'fgc-cta__word-mask';
              var wordSpan = document.createElement('span');
              wordSpan.className = 'fgc-cta__word';
              wordSpan.textContent = w;
              mask.appendChild(wordSpan);
              heading.appendChild(mask);
              heading.appendChild(document.createTextNode(' '));
            }
          });
        } else if (node.nodeType === 1) {
          // ELEMENT_NODE (e.g. .fgc-cta__accent)
          var elMask = document.createElement('span');
          elMask.className = 'fgc-cta__word-mask';
          var elClone = node.cloneNode(true);
          elClone.classList.add('fgc-cta__word');
          elMask.appendChild(elClone);
          heading.appendChild(elMask);
          heading.appendChild(document.createTextNode(' '));
        }
      });
    }

    // Re-select accent & words
    accent = cta.querySelector('.fgc-cta__accent');
    var words = cta.querySelectorAll('.fgc-cta__word');

    // Cursor spotlight on card (pointer:fine only)
    var isPointerFine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    if (isPointerFine && card) {
      var ticking = false;
      cta.addEventListener('mousemove', function (e) {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var rect = card.getBoundingClientRect();
            var mx = e.clientX - rect.left;
            var my = e.clientY - rect.top;
            card.style.setProperty('--mx', mx + 'px');
            card.style.setProperty('--my', my + 'px');
            ticking = false;
          });
          ticking = true;
        }
      });
    }

    // Magnetic pull for primary button (pointer:fine only)
    var primaryBtn = cta.querySelector('.tj-primary-btn');
    if (isPointerFine && primaryBtn && hasGSAP()) {
      var xTo = gsap.quickTo(primaryBtn, 'x', { duration: 0.35, ease: 'power3.out' });
      var yTo = gsap.quickTo(primaryBtn, 'y', { duration: 0.35, ease: 'power3.out' });

      primaryBtn.addEventListener('mousemove', function (e) {
        var r = primaryBtn.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2);
        var dy = e.clientY - (r.top + r.height / 2);
        var maxDist = 8;
        xTo((dx / (r.width / 2)) * maxDist);
        yTo((dy / (r.height / 2)) * maxDist);
      });

      primaryBtn.addEventListener('mouseleave', function () {
        gsap.to(primaryBtn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.1, 0.4)' });
      });
    }

    if (isReducedMotion || !hasGSAP()) return;

    // Entrance Timeline
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: cta,
        start: 'top 70%',
        once: true
      },
      onComplete: function () {
        if (card) gsap.set(card, { clearProps: 'transform,opacity,scale' });
        if (actionItems.length) gsap.set(actionItems, { clearProps: 'transform,opacity' });
        if (chips.length) gsap.set(chips, { clearProps: 'transform,opacity' });
      }
    });

    // 0.00s Card entrance
    if (card) {
      tl.fromTo(card,
        { y: 50, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' },
        0
      );
    }

    // 0.15s Crest ring entrance
    var crestTarget = cta.querySelector('.fgc-inv-crest');
    if (crestTarget) {
      tl.fromTo(crestTarget,
        { scale: 0.6, rotation: -90, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.4)' },
        0.15
      );
    }

    // 0.30s Eyebrow & side rules
    if (eyebrow) {
      tl.fromTo(eyebrow,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        0.30
      );
    }
    if (eyebrowRules.length) {
      tl.fromTo(eyebrowRules,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power3.out' },
        0.30
      );
    }

    // 0.40s Heading Words Rise
    if (words.length) {
      tl.fromTo(words,
        { yPercent: 115, opacity: 0 },
        { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.9, ease: 'power4.out' },
        0.40
      );
    }

    // Accent underline draw after words rise
    if (accent) {
      tl.to(accent,
        { backgroundSize: '100% 3px', duration: 0.8, ease: 'power3.out' },
        0.85
      );
    }

    // Gradient Line width draw
    if (line) {
      tl.fromTo(line,
        { width: 0, opacity: 0 },
        { width: '120px', opacity: 1, duration: 0.9, ease: 'power3.out' },
        0.65
      );
    }

    // Body Text
    if (bodyText) {
      tl.fromTo(bodyText,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 0.88, duration: 0.7, ease: 'power3.out' },
        0.75
      );
    }

    // Actions
    if (actionItems.length) {
      tl.fromTo(actionItems,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.65, ease: 'power3.out' },
        0.85
      );
    }

    // Contact chips
    if (chips.length) {
      tl.fromTo(chips,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out' },
        0.95
      );
    }

    // Scroll-linked scrub animations
    if (watermark) {
      gsap.fromTo(watermark,
        { xPercent: 6 },
        {
          xPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: cta,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );
    }

    if (auras.length) {
      gsap.to(auras, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: cta,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }

    if (card) {
      gsap.to(card, {
        yPercent: -3,
        ease: 'none',
        scrollTrigger: {
          trigger: cta,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });
    }
  }

  /* ── 10. Sticky Horizontal Section Navigation ───────────── */
  function initSubNav() {
    var subNav = document.getElementById('fgcSubNav');
    if (!subNav) return;

    var navScroll = document.getElementById('fgcSubNavScroll');
    var navBtns = subNav.querySelectorAll('.fgc-subnav__btn');
    var progressFill = document.getElementById('fgcSubNavProgressFill');
    var nextBtn = document.getElementById('fgcSubNavNext');
    var headerDuplicate = document.querySelector('.tj-header-area.header-duplicate');
    var sectionIds = ['fgc-hero', 'engagement-model', 'how-we-work', 'capabilities', 'who-we-support', 'continuity', 'contact-cta'];

    function goToSection(targetId) {
      var targetEl = document.getElementById(targetId);
      if (!targetEl) return;
      var isMobile = window.innerWidth <= 991;
      var subNavHeight = subNav.offsetHeight || 0;
      var headerOffset = subNavHeight + getPinnedHeaderHeight() + (isMobile ? 8 : 20);
      var top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    }

    function updateNextState(activeIndex) {
      if (!nextBtn) return;
      var isLast = activeIndex >= sectionIds.length - 1;
      nextBtn.classList.toggle('is-disabled', isLast);
      nextBtn.setAttribute('aria-disabled', isLast ? 'true' : 'false');
    }

    navBtns.forEach(function (btn, i) {
      btn.addEventListener('click', function (e) {
        var targetId = btn.getAttribute('data-target');
        if (!targetId) return;
        e.preventDefault();
        goToSection(targetId);
        navBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        updateNextState(i);
        if (navScroll) btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    });

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        var activeIndex = 0;
        navBtns.forEach(function (btn, i) { if (btn.classList.contains('is-active')) activeIndex = i; });
        var nextIndex = Math.min(activeIndex + 1, navBtns.length - 1);
        if (navBtns[nextIndex]) navBtns[nextIndex].click();
      });
    }

    // Measures the actual rendered height of the pinned main header
    function getPinnedHeaderHeight() {
      if (!headerDuplicate) return 0;
      var style = window.getComputedStyle(headerDuplicate);
      var rect = headerDuplicate.getBoundingClientRect();
      var isPinned = (style.position === 'fixed' || style.position === 'sticky') && rect.top <= 1 && rect.height > 0;
      return isPinned ? Math.round(rect.height) : 0;
    }

    function updateStickyOffset() {
      var offset = getPinnedHeaderHeight();
      subNav.style.top = offset + 'px';
      subNav.classList.toggle('has-sticky-header', offset > 0);
      subNav.classList.toggle('is-scrolled', window.pageYOffset > 60);
    }

    var ticking = false;
    function updateOnScroll() {
      updateStickyOffset();

      var isMobile = window.innerWidth <= 991;
      var probe = isMobile ? 120 : 180; // distance from viewport top used to decide active section
      var currentIndex = 0;
      for (var i = 0; i < sectionIds.length; i++) {
        var el = document.getElementById(sectionIds[i]);
        if (el && el.getBoundingClientRect().top <= probe) currentIndex = i;
      }

      var activeBtn = null;
      navBtns.forEach(function (btn, i) {
        btn.classList.toggle('is-active', i === currentIndex);
        if (i === currentIndex) activeBtn = btn;
      });
      updateNextState(currentIndex);

      if (activeBtn && navScroll && isMobile) {
        var btnRect = activeBtn.getBoundingClientRect();
        var scrollRect = navScroll.getBoundingClientRect();
        if (btnRect.left < scrollRect.left || btnRect.right > scrollRect.right) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }

      if (progressFill) {
        var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = scrollHeight > 0 ? (window.pageYOffset / scrollHeight) * 100 : 0;
        progressFill.style.width = Math.min(Math.max(pct, 0), 100).toFixed(1) + '%';
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(updateOnScroll); ticking = true; }
    }, { passive: true });
    window.addEventListener('resize', function () {
      updateStickyOffset();
      updateOnScroll();
    });

    updateOnScroll();
  }


  /* ── UPDATE: FGC Model entrance + gentle 3D tilt on the image ── */
  function initModelSection() {
    var media = document.getElementById('fgcModelMedia');
    var content = document.querySelector('.fgc-model-content');
    if (!media && !content) return;

    var targets = [media, content].filter(Boolean);
    function show(el) { el.classList.add('is-inview'); }

    if (!('IntersectionObserver' in window) || isReducedMotion) {
      targets.forEach(show);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    targets.forEach(function (el) { io.observe(el); });

    // tilt (desktop pointers only)
    if (media && window.matchMedia('(hover: hover) and (min-width: 992px)').matches) {
      media.addEventListener('pointermove', function (e) {
        var r = media.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        media.style.setProperty('--ry', (x * 8).toFixed(2) + 'deg');
        media.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg');
      });
      media.addEventListener('pointerleave', function () {
        media.style.setProperty('--ry', '0deg');
        media.style.setProperty('--rx', '0deg');
      });
    }
  }

  /* ── Reduced Motion Fallback ────────────────────────────── */
  function applyReducedMotion() {
    if (!isReducedMotion) return;

    document.querySelectorAll(
      '.fgc-reveal, .fgc-process__stage, .fgc-aud-card, .fgc-aud-chapter, .fgc-model__card, .fgc-cap-item, .fgc-cont-card'
    ).forEach(function (el) {
      el.classList.add('is-inview');
      el.classList.add('is-active');
    });

    var cta = document.querySelector('.fgc-cta');
    if (cta) {
      cta.classList.add('is-static');
      var line = cta.querySelector('.fgc-cta__line');
      if (line) line.style.width = '120px';
      var accent = cta.querySelector('.fgc-cta__accent');
      if (accent) accent.style.backgroundSize = '100% 3px';
    }
  }

  /* ── Main Initializer ───────────────────────────────────── */
  function init() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    initHero();
    initIntro();
    initEngagementModel();
    initModelSection();
    initLineReveals();
    initProcess();
    initCapabilitiesShowcase();
    initShowcaseSpotlight();
    initCapabilities();
    initAudience();
    initGenericReveals();
    initContinuity();
    initCTA();
    initSubNav();
    applyReducedMotion();

    function refresh() {
      if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }
    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

}());

/* section-end shapes: top one while the section is on screen, bottom one while its foot is on screen (plays on scroll down and up) */
(function () {
   if (!("IntersectionObserver" in window)) return;
   var io = new IntersectionObserver(
      function (es) {
         es.forEach(function (e) {
            var s = e.target.closest("section");
            s.classList.toggle(e.target === s ? "fgc-in" : "fgc-end", e.isIntersecting);
         });
      },
      { rootMargin: "0px 0px -10% 0px" }
   );
   document.querySelectorAll("main > section:not(.tj-page-header)").forEach(function (s) {
      var m = document.createElement("i");
      m.style.cssText = "position:absolute;left:0;bottom:0;width:1px;height:1px;pointer-events:none";
      s.appendChild(m);
      s.classList.add("fgc-p");
      io.observe(s);
      io.observe(m);
   });
   /* roof shape takes the footer's own colour */
   var f = document.querySelector(".tj-footer-area"), c = document.getElementById("continuity");
   if (f && c) {
      var cs = getComputedStyle(f), g = cs.backgroundImage.match(/rgba?\([^)]+\)|#[0-9a-f]{3,8}/i);
      var col = g ? g[0] : cs.backgroundColor;
      if (col && col !== "rgba(0, 0, 0, 0)") c.style.setProperty("--fgc-footer", col);
   }
})();

/* Who This Model Is Designed For: chips start stacked at the centre, then separate into their places while scrolling */
(function () {
   var ul = document.querySelector(".fgc-fit__chips");
   if (!ul) return;
   var chips = [].slice.call(ul.children);
   var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
   var pos = [], ticking = false;
   chips.forEach(function (c) { c.classList.add("fgc-sp"); });

   function measure() {                      /* natural positions (offset* ignores transforms) */
      var cx = ul.offsetLeft + ul.offsetWidth / 2, cy = ul.offsetTop + ul.offsetHeight / 2;
      pos = chips.map(function (c) {
         return { x: cx - (c.offsetLeft + c.offsetWidth / 2), y: cy - (c.offsetTop + c.offsetHeight / 2) };
      });
   }
   function frame() {
      ticking = false;
      var vh = window.innerHeight, top = ul.getBoundingClientRect().top;
      var p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.9 - top) / (vh * 0.55)));
      chips.forEach(function (c, i) {
         var q = Math.min(1, Math.max(0, p * 1.5 - i * 0.06)), k = 1 - (1 - q) * (1 - q) * (1 - q), r = 1 - k;
         c.style.setProperty("--tx", (pos[i].x * r).toFixed(1) + "px");
         c.style.setProperty("--ty", (pos[i].y * r).toFixed(1) + "px");
         c.style.setProperty("--r", ((i - 4) * 4 * r).toFixed(1) + "deg");
         c.style.setProperty("--sc", (0.55 + 0.45 * k).toFixed(3));
         c.style.setProperty("--op", Math.min(1, k * 1.6).toFixed(3));
      });
   }
   function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
   function init() { measure(); frame(); }
   window.addEventListener("scroll", req, { passive: true });
   window.addEventListener("resize", function () { measure(); req(); });
   window.addEventListener("load", init);
   init();
})();

/* Why Continuity Matters: words rise one by one, and the whole entrance replays every time the section scrolls into view (down or up) */
(function () {
   var sec = document.querySelector(".fgc-need");
   if (!sec) return;
   sec.querySelectorAll(".fgc-need__body p").forEach(function (p) {
      var t = p.textContent.trim();
      p.setAttribute("aria-label", t);
      p.innerHTML = t.split(/\s+/).map(function (w, i) {
         return '<span class="fgc-cw" aria-hidden="true"><span style="--i:' + Math.min(i, 90) + '">' + w + "</span></span>";
      }).join(" ");
   });
   if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sec.classList.add("is-inview");
      return;
   }
   sec.classList.add("is-prep");
   new IntersectionObserver(function (es) {
      var e = es[0];
      if (!e.isIntersecting) sec.classList.remove("is-inview");              /* fully out of view: reset */
      else if (e.intersectionRatio >= 0.25) sec.classList.add("is-inview");  /* coming in: play */
   }, { threshold: [0, 0.25] }).observe(sec);
})();

/* The FGC Model: card slides in from the top-left corner (replays on every visit), body text rises word by word */
(function () {
   var sec = document.querySelector(".tj-fgc-model-section"), media = document.getElementById("fgcModelMedia"), content = document.querySelector(".fgc-model-content");
   if (!sec || !media) return;

   sec.querySelectorAll(".fgc-model-body p").forEach(function (p) {
      var t = p.textContent.trim();
      p.setAttribute("aria-label", t);
      p.innerHTML = t.split(/\s+/).map(function (w, i) {
         return '<span class="fgc-cw" aria-hidden="true"><span style="--i:' + Math.min(i, 70) + '">' + w + "</span></span>";
      }).join(" ");
   });

   var targets = [media, content].filter(Boolean);
   if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      targets.forEach(function (t) { t.classList.add("is-inview"); });
      return;
   }
   new IntersectionObserver(function (es) {
      var e = es[0];
      if (!e.isIntersecting) targets.forEach(function (t) { t.classList.remove("is-inview"); });
      else if (e.intersectionRatio >= 0.2) targets.forEach(function (t) { t.classList.add("is-inview"); });
   }, { threshold: [0, 0.2] }).observe(sec);

})();

/* Capabilities background picture: smooth, eased zoom + soft parallax as you scroll (both directions).
   Values are eased towards their target every frame (lerp), so the motion glides instead of jumping with the scrollbar. */
(function () {
   var sec = document.querySelector(".fgc-capabilities--showcase");
   var img = sec && sec.querySelector(".fgc-showcase-bg__img");
   if (!img || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
   var curS = 1, curY = 0, tgtS = 1, tgtY = 0, running = false, visible = true;
   function target() {
      var r = sec.getBoundingClientRect(), vh = window.innerHeight;
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));   /* 0 = just entering, 1 = just left */
      var k = 1 - Math.abs(2 * p - 1);                                    /* 0 -> 1 -> 0 */
      k = k * k * (3 - 2 * k);
      tgtS = 1.04 + 0.14 * k;                                             /* gentle zoom */
      tgtY = (0.5 - p) * 5;                                               /* parallax, in % of the image height */
   }
   function loop() {
      target();
      curS += (tgtS - curS) * 0.07;
      curY += (tgtY - curY) * 0.07;
      img.style.scale = curS.toFixed(4);
      img.style.translate = "0 " + curY.toFixed(3) + "%";
      if (visible && (Math.abs(tgtS - curS) > 0.0004 || Math.abs(tgtY - curY) > 0.004)) { requestAnimationFrame(loop); }
      else { running = false; }
   }
   function kick() { if (!running && visible) { running = true; requestAnimationFrame(loop); } }
   if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) kick(); }, { rootMargin: "200px 0px" }).observe(sec);
   }
   window.addEventListener("scroll", kick, { passive: true });
   window.addEventListener("resize", kick);
   target(); curS = tgtS; curY = tgtY; kick();
})();

/* Get in Touch: the background video only plays while the section is on screen */
(function () {
   var sec = document.getElementById("cta"), v = sec && sec.querySelector(".fgc-gt__video");
   if (!v) return;
   if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); return; }
   if (!("IntersectionObserver" in window)) return;
   new IntersectionObserver(function (es) {
      if (es[0].isIntersecting) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); }
      else v.pause();
   }, { threshold: 0.05 }).observe(sec);
})();