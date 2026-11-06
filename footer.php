<!-- JS here -->
      <script src="assets/js/jquery.min.js"></script>
      <script src="assets/js/bootstrap.bundle.min.js"></script>

      <script src="assets/js/gsap.min.js"></script>
      <script src="assets/js/gsap-scroll-to-plugin.min.js"></script>
      <script src="assets/js/gsap-scroll-trigger.min.js"></script>
      <script src="assets/js/gsap-split-text.min.js"></script>
      <script src="assets/js/smooth-scroll.min.js"></script>

      <script src="assets/js/appear.min.js"></script>
      <script src="assets/js/wow.min.js"></script>
      <script src="assets/js/odometer.min.js"></script>
      <script src="assets/js/jquery-knob.js"></script>
      <script src="assets/js/swiper.min.js"></script>
      <script src="assets/js/nice-select.js"></script>
      <script src="assets/js/venobox.min.js"></script>
      <script src="assets/js/meanmenu.js"></script>
      <script src="assets/js/main.js?v=3"></script>
      
      <script src="assets/js/vidhitra-capabilities.js"></script>


      <style>
#tjFooterWordmark {
    position: relative;
    width: 100%;
    height: clamp(180px, 24vw, 440px);
    overflow: hidden;
}

/* GSAP animates THIS element */
#tjFooterWordmark .tj-wordmark-stage {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: max-content;
    transform-origin: center bottom;
    will-change: transform;
}

/* ID selector beats any older .tj-wordmark-letters rule, even with !important */
#tjFooterWordmark .tj-wordmark-letters {
    position: static !important;
    display: block !important;
    left: auto !important;
    bottom: auto !important;
    transform: none !important;
    width: max-content !important;
    max-width: none !important;
    white-space: nowrap !important;
    color: #fff !important;
    font-family: "Cormorant Garamond", "Bodoni 72", Didot, "Bodoni MT", "Times New Roman", serif !important;
    font-size: clamp(160px, 21vw, 430px) !important;
    font-weight: 500 !important;
    line-height: 0.68 !important;
    letter-spacing: -0.055em !important;
    margin: 0;
    padding: 0;
}

#tjFooterWordmark .tj-wm-char {
    display: inline !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
}

@media (max-width: 991px) {
    #tjFooterWordmark { height: 230px; }
    #tjFooterWordmark .tj-wordmark-letters { font-size: 28vw; letter-spacing: -0.05em; }
}

/* ===== Footer image (shown as it is, original colours) ===== */
.tj-footer-area .tj-footer-bgimg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center bottom;
    opacity: 1;
    pointer-events: none;
    user-select: none;
    z-index: 0;
}
.tj-footer-area .container-fluid,

.tj-footer-area .tj-footer-bottom { position: relative; z-index: 2; }

/* ===== Clean footer: one soft theme-purple (#9A0064) fade over the image, flat rows, thin dividers ===== */
.tj-footer-area::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
        to bottom,
        rgba(84, 8, 64, 0.76) 0%,
        rgba(98, 6, 72, 0.68) 45%,
        rgba(154, 0, 100, 0.34) 70%,
        rgba(154, 0, 100, 0) 92%
    );
}
.tj-footer-area .tj-footer-rows {
    background: none;
    border: 0 !important;
    border-top: 1px solid rgba(255, 255, 255, 0.28) !important;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
}
.tj-footer-area .tj-footer-row {
    border-color: rgba(255, 255, 255, 0.22) !important;
    padding: 22px 0;
    align-items: flex-start;
}
.tj-footer-area .tj-row-label,
.tj-footer-area .tj-row-label a,
.tj-footer-area .tj-row-links a,
.tj-footer-area .tj-row-contact a,
.tj-footer-area .tj-row-note,
.tj-footer-area .tj-footer-brand .tagline {
    color: #fff !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
}
.tj-footer-area .tj-row-label { font-weight: 600; }
.tj-footer-area .tj-row-links a,
.tj-footer-area .tj-row-contact a { font-weight: 400; opacity: 0.92; }
.tj-footer-area .tj-row-links a:hover,
.tj-footer-area .tj-row-contact a:hover { opacity: 1; }
.tj-footer-area .tj-row-note { opacity: 0.7; }
@media (max-width: 991px) {
    .tj-footer-area .tj-footer-bgimg { object-position: 70% bottom; }
}
      </style>

<!-- start: Footer -->
<footer class="tj-footer-area">
    <img class="tj-footer-bgimg" src="assets/images/vidhitra/banners/image.png" alt="" aria-hidden="true" loading="lazy" />
    <div class="container-fluid px-0 px-md-5">
    <!-- Top: brand + socials -->
    <div class="tj-footer-top">
        <div class="tj-footer-brand">
            <p class="tagline">
                Fractional General Counsel — ongoing legal counsel integrated with your business.
            </p>
        </div>
        <ul class="tj-footer-socials">
            <li>
                <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            </li>
            <li>
                <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
            </li>
            <li>
                <a href="#" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
            </li>
        </ul>
    </div>

    <!-- Pentagram-style stacked rows: label LEFT, content RIGHT, divider between each -->
    <div class="tj-footer-rows">
        <div class="tj-footer-row">
            <div class="tj-row-label">Fractional Legal Counsel</div>
            <div class="tj-row-content tj-row-links">
                <a href="fractional-general-counsel.php#understanding"
                >Understanding Fractional General Counsel</a
                >
                <a href="fractional-general-counsel.php#engagement-model">The Engagement Model</a>
                <a href="fractional-general-counsel.php#how-we-work">How We Work</a>
                <a href="capabilities.html">Our Capabilities</a>
                <a href="who-we-work-with.html">Who We Support</a>
                <a href="the-vidhitra-approach.html">Our Approach</a>
            </div>
        </div>

        <div class="tj-footer-row">
            <div class="tj-row-label">Capabilities</div>
            <div class="tj-row-content tj-row-links tj-row-links-wide">
                <a href="service-details.html">Corporate Law &amp; Strategic Advisory</a>
                <a href="service-details.html">Infrastructure, Projects &amp; Bid Advisory</a>
                <a href="commercial-contracts-contracting-framework.php">Commercial Contracts &amp; Contracting Systems</a>
                <a href="regulatory-compliance-risk-advisory.php">Regulatory Compliance &amp; Risk Advisory</a>
                <a href="technology-it-digital-business.php">Technology, IT &amp; Digital Business</a>
                <a href="service-details.html">Employment &amp; Workforce Advisory</a>
                <a href="service-details.html">Market Entry, Startups &amp; Emerging Businesses</a>
            </div>
        </div>

        <div class="tj-footer-row">
            <div class="tj-row-label">Firm</div>
            <div class="tj-row-content tj-row-links">
                <a href="about.php">About Vidhitra</a>
                <a href="the-vidhitra-approach.html">Our Approach</a>
                <a href="leadership.html">Leadership</a>
                <a href="insights.php">Insights</a>
                <a href="faq.php">FAQs</a>
            </div>
        </div>

        <div class="tj-footer-row">
            <div class="tj-row-label"><a href="legal-information.php" style="color:inherit;text-decoration:none">Legal Information</a></div>
            <div class="tj-row-content tj-row-links">
                <a href="legal-information.php#disclaimer">Disclaimer</a>
                <a href="legal-information.php#terms">Terms of Use</a>
                <a href="legal-information.php#privacy">Privacy Policy</a>
                <a href="legal-information.php#cookies">Cookie Policy</a>
            </div>
        </div>

        <div class="tj-footer-row">
            <div class="tj-row-label">Contact Details</div>
            <div class="tj-row-content tj-row-contact">
                <a href="mailto:info@vidhitra.com">info@vidhitra.com</a>
                <a href="tel:+91XXXXXXXXXX">+91 XXX XXX XXXX</a>
                <span class="tj-row-note">Pan-India</span>
            </div>
        </div>
    </div>

    <!-- Large animated wordmark -->
    <div class="tj-footer-wordmark" id="tjFooterWordmark" aria-label="Vidhitra">
    <div class="tj-wordmark-stage" id="tjWordmarkStage">
        <span class="tj-wordmark-letters">VIDHITRA</span>
    </div>
</div>
    </div>

    <!-- Bottom bar -->
    <div class="tj-footer-bottom px-4">
    <p class="copyright">
        &copy; <span id="tjFooterYear">2026</span> Vidhitra Corporate Advisors LLP. All rights reserved. |
        Developed By <a href="https://hsdigitalmedia.com/" target="_blank">HS Digital Media®</a>
    </p>
    <ul class="tj-footer-bottom-links">
        <li><a href="legal-information.php#disclaimer">Disclaimer</a></li>
        <li><a href="legal-information.php#privacy">Privacy Policy</a></li>
        <li><a href="sitemap.html">Sitemap</a></li>
    </ul>
    </div>
</footer>
<!-- end: Footer -->

<script>
window.addEventListener("load", function () {
    if (!window.gsap || !window.ScrollTrigger) {
        console.warn("Wordmark: GSAP or ScrollTrigger not loaded");
        return;
    }
    gsap.registerPlugin(ScrollTrigger);

    const wordmark = document.getElementById("tjFooterWordmark");
    const stage    = document.getElementById("tjWordmarkStage");
    if (!wordmark || !stage) return;

    let tween;

    function build() {
        if (tween) {
            tween.scrollTrigger && tween.scrollTrigger.kill();
            tween.kill();
        }
        gsap.set(stage, { clearProps: "transform" });

        const START_SCALE = 0.12;   // small starting size
        const DURATION    = 2.5;    // seconds, bigger = slower

        const finalScale = wordmark.clientWidth / stage.offsetWidth;
        const startY     = -(wordmark.clientHeight - stage.offsetHeight * START_SCALE);

        tween = gsap.fromTo(
            stage,
            {
                xPercent: -50,
                y: startY,
                scale: START_SCALE,
                transformOrigin: "center bottom",
            },
            {
                xPercent: -50,
                y: 0,
                scale: finalScale,
                duration: DURATION,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: wordmark,
                    start: "top 80%",                 // plays once the wordmark area is visible
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true,
                },
            }
        );
    }

    function init() {
        build();
        ScrollTrigger.refresh();
    }

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(init);
    else init();

    let t;
    window.addEventListener("resize", function () {
        clearTimeout(t);
        t = setTimeout(init, 150);
    });
});
</script>

<script>
         document.getElementById("tjFooterYear").textContent = new Date().getFullYear();

         (function () {
            const wrapEl = document.querySelector(".tj-wordmark-letters");
            if (!wrapEl) return;

            const text = wrapEl.textContent.trim();
            wrapEl.textContent = "";
            const chars = text.split("");
            const minSize = 0.4;
            const maxSize = 1;

            chars.forEach((ch, i) => {
               const span = document.createElement("span");
               span.textContent = ch;
               span.className = "tj-wm-char";
               const progress = chars.length > 1 ? i / (chars.length - 1) : 1;
               const size = minSize + (maxSize - minSize) * progress;
               span.style.fontSize = size + "em";
               span.style.transitionDelay = progress * 0.4 + "s";
               wrapEl.appendChild(span);
            });

            const wordmarkEl = document.getElementById("tjFooterWordmark");
            const observer = new IntersectionObserver(
               (entries) => {
                  entries.forEach((entry) => {
                     if (entry.isIntersecting) {
                        wordmarkEl.classList.add("is-revealed");
                        observer.unobserve(entry.target);
                     }
                  });
               },
               { threshold: 0.3 }
            );
            observer.observe(wordmarkEl);
         })();

         /* ===== Automatically Fit Vidhitra to Full Width ===== */

         (function () {
            const wordmark = document.getElementById("tjFooterWordmark");

            if (!wordmark) return;

            const letters = wordmark.querySelector(".tj-wordmark-letters");

            if (!letters) return;

            function fitWordmark() {
               // Reset scaling before measuring
               letters.style.setProperty("--wordmark-scale", "1");

               const availableWidth = wordmark.clientWidth;
               const textWidth = letters.scrollWidth;

               if (availableWidth > 0 && textWidth > 0) {
                  const scale = availableWidth / textWidth;

                  letters.style.setProperty("--wordmark-scale", scale.toFixed(4));
               }
            }

            // Wait for the font to load before measuring
            if (document.fonts && document.fonts.ready) {
               document.fonts.ready.then(fitWordmark);
            } else {
               fitWordmark();
            }

            window.addEventListener("resize", fitWordmark);

            // Recalculate if the footer/container width changes
            if ("ResizeObserver" in window) {
               const observer = new ResizeObserver(fitWordmark);
               observer.observe(wordmark);
            }
         })();
      </script>

      <script>
         // Auto-updates the copyright year — no manual edits needed each year
         document.getElementById("tjFooterYear").textContent = new Date().getFullYear();
      </script>


<script>
(function () {
document
    .querySelectorAll(".vd-side-menu .vd-side-toggle")
    .forEach(function (btn) {
        btn.addEventListener("click", function () {
            var li = btn.closest(".vd-has-sub");
            var sub = li.querySelector(".vd-side-sub");
            var open = li.classList.toggle("is-open");
            sub.style.maxHeight = open
            ? sub.scrollHeight + "px"
            : "0px";
        });
    });

// close the sidebar when a normal link is clicked (optional, nice on same-page anchors)
document.querySelectorAll(".vd-side-menu a").forEach(function (a) {
    a.addEventListener("click", function () {
        var closeBtn = document.querySelector(".hamburgerCloseBtn");
        if (closeBtn && /^#/.test(a.getAttribute("href") || ""))
            closeBtn.click();
    });
});
})();
</script>