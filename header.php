<!-- shared: Libre Baskerville italic for the "lead" paragraph style (same as contact page) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@1,400;1,600;1,700&display=swap" rel="stylesheet">
<!-- start: Search Popup -->
<div class="search_popup vd-sp" role="dialog" aria-modal="true" aria-label="Site search">
   <span class="vd-sp-orb vd-sp-orb--1"></span>
   <span class="vd-sp-orb vd-sp-orb--2"></span>
   <span class="vd-sp-orb vd-sp-orb--3"></span>
   <span class="vd-sp-grid"></span>
   <div class="search_close">
      <button type="button" class="search_close_btn" aria-label="Close search">
         <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 1L1 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1 1L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
         </svg>
      </button>
   </div>
   <div class="container">
      <div class="row">
         <div class="col-xxl-12">
            <div class="tj_search_wrapper">
               <div class="search_form">
                  <form action="#" id="vdSearchForm" autocomplete="off">
                     <div class="search_input">
                        <span class="vd-sp-eyebrow">Vidhitra &bull; Quick Search</span>
                        <h4 class="title">Search <em>Pages, Services, Insights</em> or FAQs.</h4>
                        <div class="search-box vd-sp-box">
                           <i class="tji-search vd-sp-lead"></i>
                           <input class="search-input-field" id="vdSearchInput" type="search" placeholder="Start typing — e.g. Fractional, Contracts, Contact..." aria-label="Search" />
                           <span class="vd-sp-kbd" aria-hidden="true">ESC</span>
                           <button type="submit" aria-label="Search"><i class="tji-search"></i></button>
                        </div>
                        <div class="vd-sp-chips" id="vdSearchChips"></div>
                        <div class="vd-sp-meta" id="vdSearchMeta"></div>
                        <ul class="vd-sp-results" id="vdSearchResults" role="listbox"></ul>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>

<div class="search-popup-overlay"></div>
<!-- end: Search Popup -->

<style>
/* ===== SEARCH POPUP — premium animated redesign ===== */
.search_popup.vd-sp{
  background:linear-gradient(135deg,#6d0049 0%,#9A0064 45%,#b3207f 100%) !important;
  background-size:200% 200% !important;
  animation:vdSpBg 14s ease infinite;
  overflow:hidden auto; max-height:100vh;
  padding-top:80px !important; padding-bottom:70px !important;
  border-bottom:3px solid transparent;
  border-image:linear-gradient(90deg,#e8c27a,#00a39c,#e8c27a) 1;
  box-shadow:0 30px 80px rgba(60,0,40,.45);
}
@keyframes vdSpBg{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.vd-sp-grid{position:absolute;inset:0;pointer-events:none;opacity:.12;
  background-image:linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px);
  background-size:46px 46px;-webkit-mask-image:radial-gradient(ellipse at 50% 0%,#000 0%,transparent 70%);mask-image:radial-gradient(ellipse at 50% 0%,#000 0%,transparent 70%)}
.vd-sp-orb{position:absolute;border-radius:50%;filter:blur(60px);pointer-events:none;opacity:.55}
.vd-sp-orb--1{width:360px;height:360px;background:#e8c27a;top:-140px;left:-80px;animation:vdSpFloat 9s ease-in-out infinite}
.vd-sp-orb--2{width:300px;height:300px;background:#00a39c;bottom:-120px;right:8%;animation:vdSpFloat 11s ease-in-out infinite reverse}
.vd-sp-orb--3{width:220px;height:220px;background:#ff5fb8;top:20%;right:-60px;animation:vdSpFloat 13s ease-in-out infinite}
@keyframes vdSpFloat{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,28px) scale(1.15)}}
.vd-sp .container{position:relative;z-index:2}

/* close button */
.vd-sp .search_close{z-index:5}
.vd-sp .search_close .search_close_btn{width:52px;height:52px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(6px);transition:all .4s ease}
.vd-sp .search_close .search_close_btn:hover{background:#fff;transform:rotate(90deg) scale(1.08);box-shadow:0 0 0 8px rgba(255,255,255,.15)}
.vd-sp .search_close .search_close_btn svg{width:18px;height:18px}
.vd-sp .search_close .search_close_btn svg path{fill:none !important;stroke:#fff}
.vd-sp .search_close .search_close_btn:hover svg path{stroke:#9A0064}
.vd-sp .search_close .search_close_btn:hover svg{transform:none}

/* staggered entrance */
.vd-sp .vd-sp-eyebrow,.vd-sp .title,.vd-sp .vd-sp-box,.vd-sp .vd-sp-chips{opacity:0;transform:translateY(26px);transition:opacity .6s ease,transform .6s cubic-bezier(.2,.8,.2,1)}
.vd-sp.search-opened .vd-sp-eyebrow{opacity:1;transform:none;transition-delay:.35s}
.vd-sp.search-opened .title{opacity:1;transform:none;transition-delay:.45s}
.vd-sp.search-opened .vd-sp-box{opacity:1;transform:none;transition-delay:.58s}
.vd-sp.search-opened .vd-sp-chips{opacity:1;transform:none;transition-delay:.72s}

.vd-sp-eyebrow{display:inline-block;color:#ffe3a6;font-size:12px;letter-spacing:.22em;text-transform:uppercase;font-weight:700;margin-bottom:12px;
  padding:6px 14px;border:1px solid rgba(255,227,166,.45);border-radius:50px;background:rgba(255,255,255,.08)}
.tj_search_wrapper .search_form form .search_input .title{font-size:clamp(26px,3.4vw,42px);font-weight:700;margin-bottom:28px;line-height:1.15}
.tj_search_wrapper .search_form form .search_input .title em{font-style:normal;
  background:linear-gradient(90deg,#fff,#ffe3a6,#7ff0e8,#fff);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  -webkit-text-fill-color:transparent;animation:vdSpShine 5s linear infinite}
@keyframes vdSpShine{to{background-position:250% 0}}

/* search box with glowing animated border */
.tj_search_wrapper .search_form form .search_input .vd-sp-box{border-radius:14px;padding:2px;
  background:linear-gradient(120deg,rgba(255,255,255,.35),rgba(232,194,122,.9),rgba(0,163,156,.9),rgba(255,255,255,.35));
  background-size:300% 300%;animation:vdSpBorder 6s linear infinite;box-shadow:0 12px 40px rgba(40,0,28,.35);transition:box-shadow .4s,transform .4s}
@keyframes vdSpBorder{0%{background-position:0% 50%}100%{background-position:300% 50%}}
.vd-sp-box:focus-within{box-shadow:0 0 0 6px rgba(255,255,255,.14),0 18px 50px rgba(40,0,28,.5) !important;transform:translateY(-2px) !important}
.tj_search_wrapper .search_form form .search_input .vd-sp-box input[type=search]{
  border:0 !important;border-radius:12px;background:rgba(70,0,46,.92) !important;padding:22px 150px 22px 58px !important;font-size:17px;color:#fff;outline:0;box-shadow:none}
.tj_search_wrapper .search_form form .search_input .vd-sp-box input[type=search]::placeholder{color:rgba(255,255,255,.55)}
.vd-sp-box input[type=search]::-webkit-search-cancel-button{display:none}
.vd-sp-lead{position:absolute;left:22px;top:50%;transform:translateY(-50%);z-index:2;color:#ffe3a6;font-size:20px;pointer-events:none;animation:vdSpPulse 2.4s ease-in-out infinite}
@keyframes vdSpPulse{0%,100%{transform:translateY(-50%) scale(1)}50%{transform:translateY(-50%) scale(1.2)}}
.vd-sp-kbd{position:absolute;right:84px;top:50%;transform:translateY(-50%);z-index:2;font-size:11px;letter-spacing:.1em;color:rgba(255,255,255,.7);
  border:1px solid rgba(255,255,255,.3);border-radius:6px;padding:3px 8px;pointer-events:none}
.tj_search_wrapper .search_form form .search_input .vd-sp-box button{right:8px !important;inset-inline-end:8px !important;top:50% !important;height:calc(100% - 16px) !important;width:62px !important;border:0 !important;
  border-radius:10px;background:linear-gradient(135deg,#e8c27a,#f6dba0);color:#6d0049 !important;transition:transform .3s,box-shadow .3s}
.tj_search_wrapper .search_form form .search_input .vd-sp-box button:hover{transform:translateY(-50%) scale(1.06) !important;box-shadow:0 0 0 6px rgba(232,194,122,.3)}

/* quick chips */
.vd-sp-chips{display:flex;flex-wrap:wrap;gap:10px;margin-top:22px;align-items:center}
.vd-sp-chips::before{content:"Popular:";color:rgba(255,255,255,.7);font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin-right:4px}
.vd-sp-chip{cursor:pointer;color:#fff;font-size:14px;padding:7px 16px;border-radius:50px;border:1px solid rgba(255,255,255,.35);background:rgba(255,255,255,.1);
  backdrop-filter:blur(4px);transition:all .3s ease}
.vd-sp-chip:hover{background:#fff;color:#9A0064;transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.25)}
.vd-sp.has-query .vd-sp-chips{display:none}

/* results */
.vd-sp-meta{color:rgba(255,255,255,.75);font-size:13px;letter-spacing:.06em;margin:22px 0 4px;min-height:18px}
.vd-sp-results{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.vd-sp-results li{margin:0;opacity:0;transform:translateY(18px) scale(.97);animation:vdSpIn .5s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--i) * 55ms)}
@keyframes vdSpIn{to{opacity:1;transform:none}}
.vd-sp-results a{position:relative;display:flex;align-items:center;gap:16px;padding:14px 18px;border-radius:14px;overflow:hidden;text-decoration:none;
  background:rgba(255,255,255,.96);border:1px solid rgba(255,255,255,.6);box-shadow:0 8px 24px rgba(40,0,28,.18);transition:transform .35s ease,box-shadow .35s ease}
.vd-sp-results a::before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:linear-gradient(180deg,#9A0064,#00a39c);transform:scaleY(0);transform-origin:top;transition:transform .35s ease}
.vd-sp-results a::after{content:"\2192";position:absolute;right:18px;top:50%;transform:translate(-14px,-50%);opacity:0;color:#9A0064;font-size:20px;transition:all .35s ease}
.vd-sp-results a:hover,.vd-sp-results a.is-active{transform:translateY(-4px);box-shadow:0 16px 36px rgba(40,0,28,.32)}
.vd-sp-results a:hover::before,.vd-sp-results a.is-active::before{transform:scaleY(1)}
.vd-sp-results a:hover::after,.vd-sp-results a.is-active::after{opacity:1;transform:translate(0,-50%)}
.vd-sp-ico{flex:0 0 46px;height:46px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:16px;font-weight:700;
  background:linear-gradient(135deg,#9A0064,#d0399a);box-shadow:0 6px 14px rgba(154,0,100,.35);transition:transform .45s ease}
.vd-sp-results a:hover .vd-sp-ico,.vd-sp-results a.is-active .vd-sp-ico{transform:rotate(360deg) scale(1.08)}
.vd-sp-txt{min-width:0;padding-right:30px}
.vd-sp-tag{display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#00756f;font-weight:700;margin-bottom:2px}
.vd-sp-name{display:block;font-size:17px;font-weight:700;color:#2b0a21;line-height:1.25}
.vd-sp-desc{display:block;font-size:13px;color:#6B6B6B;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vd-sp-results mark{background:linear-gradient(120deg,#ffe3a6,#ffd37a);color:#4a0033;padding:0 2px;border-radius:3px}
.vd-sp-empty{grid-column:1/-1;color:#fff;text-align:center;padding:26px;border:1px dashed rgba(255,255,255,.5);border-radius:14px;background:rgba(255,255,255,.08)}
.vd-sp-empty b{color:#ffe3a6}
@media (max-width:767px){
  .vd-sp-results{grid-template-columns:1fr}
  .tj_search_wrapper .search_form form .search_input .vd-sp-box input[type=search]{padding-right:90px !important;font-size:15px}
  .vd-sp-kbd{display:none}
  .search_popup.vd-sp{padding-top:70px !important}
}
@media (prefers-reduced-motion:reduce){.vd-sp *,.vd-sp{animation:none !important}}

/* ===== LIGHT GLASS / TRANSPARENT THEME (no dark background) ===== */
.search_popup.vd-sp{background:rgba(255,255,255,.22) !important;background-size:auto !important;animation:none !important;
  -webkit-backdrop-filter:blur(26px) saturate(170%);backdrop-filter:blur(26px) saturate(170%);
  box-shadow:0 24px 70px rgba(154,0,100,.18) !important}
.search-popup-overlay{background:rgba(255,255,255,.12) !important;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}
.vd-sp-orb{opacity:.28}
.vd-sp-grid{opacity:.10;background-image:linear-gradient(rgba(154,0,100,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(154,0,100,.6) 1px,transparent 1px)}
.vd-sp-eyebrow{color:#7a004e;border-color:rgba(154,0,100,.35);background:rgba(255,255,255,.35)}
.tj_search_wrapper .search_form form .search_input .title{color:#3b0028 !important}
.tj_search_wrapper .search_form form .search_input .title em{background:linear-gradient(90deg,#9A0064,#00756f,#c0398f,#9A0064);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent}
.tj_search_wrapper .search_form form .search_input .vd-sp-box{background:linear-gradient(120deg,rgba(154,0,100,.55),rgba(232,194,122,.95),rgba(0,163,156,.85),rgba(154,0,100,.55));background-size:300% 300%;box-shadow:0 12px 36px rgba(154,0,100,.18)}
.tj_search_wrapper .search_form form .search_input .vd-sp-box input[type=search]{background:rgba(255,255,255,.55) !important;color:#3b0028 !important;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.tj_search_wrapper .search_form form .search_input .vd-sp-box input[type=search]::placeholder{color:rgba(59,0,40,.55)}
.vd-sp-box:focus-within{box-shadow:0 0 0 6px rgba(154,0,100,.12),0 16px 40px rgba(154,0,100,.28) !important}
.vd-sp-lead{color:#9A0064}
.vd-sp-kbd{color:rgba(59,0,40,.65);border-color:rgba(59,0,40,.25)}
.tj_search_wrapper .search_form form .search_input .vd-sp-box button{background:linear-gradient(135deg,#9A0064,#c0398f);color:#fff !important}
.tj_search_wrapper .search_form form .search_input .vd-sp-box button i{color:#fff}
.vd-sp .search_close .search_close_btn{background:rgba(255,255,255,.5);border-color:rgba(154,0,100,.35)}
.vd-sp .search_close .search_close_btn svg path{stroke:#9A0064}
.vd-sp .search_close .search_close_btn:hover{background:#9A0064}
.vd-sp .search_close .search_close_btn:hover svg path{stroke:#fff}
.vd-sp-chips::before{color:rgba(59,0,40,.65)}
.vd-sp-chip{color:#5a003b;border-color:rgba(154,0,100,.3);background:rgba(255,255,255,.45)}
.vd-sp-chip:hover{background:#9A0064;color:#fff}
.vd-sp-meta{color:rgba(59,0,40,.7)}
.vd-sp-results a{background:rgba(255,255,255,.72);border-color:rgba(255,255,255,.8);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);box-shadow:0 8px 24px rgba(154,0,100,.14)}
.vd-sp-empty{color:#3b0028;border-color:rgba(154,0,100,.35);background:rgba(255,255,255,.4)}
.vd-sp-empty b{color:#9A0064}

/* ===== COMPACT SINGLE-COLUMN SUGGESTION LIST (no scrolling) ===== */
.search_popup.vd-sp{overflow:hidden auto}
.vd-sp-results{grid-template-columns:1fr !important;gap:0;margin-top:8px;border-radius:16px;overflow:hidden;
  background:rgba(255,255,255,.78);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);box-shadow:0 14px 40px rgba(154,0,100,.16);border:1px solid rgba(255,255,255,.85)}
.vd-sp-results li:empty{display:none}
.vd-sp-results:empty{display:none}
.vd-sp-results a{background:transparent !important;border:0 !important;border-bottom:1px solid rgba(154,0,100,.09) !important;border-radius:0 !important;box-shadow:none !important;padding:11px 20px;gap:14px;backdrop-filter:none}
.vd-sp-results li:last-child a{border-bottom:0 !important}
.vd-sp-results a:hover,.vd-sp-results a.is-active{transform:none;background:rgba(154,0,100,.07) !important}
.vd-sp-ico{flex:0 0 40px;height:40px;font-size:15px}
.vd-sp-txt{display:flex;flex-direction:column;padding-right:36px}
.vd-sp-name{order:1;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vd-sp-tag{order:2;text-transform:none;letter-spacing:0;font-size:13px;font-weight:500;color:#8a6a80;margin:2px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.vd-sp-desc{display:none}
.vd-sp-empty{border-radius:0}
@media (max-width:767px){.vd-sp-results a{padding:10px 14px}}

/* ===== ALL RESULTS, SCROLL INSIDE THE BOX ONLY + READABLE ON ANY BACKGROUND ===== */
.search_popup.vd-sp{overflow:hidden !important;padding-bottom:40px !important;background:rgba(255,255,255,.6) !important;
  -webkit-backdrop-filter:blur(28px) saturate(150%);backdrop-filter:blur(28px) saturate(150%)}
.vd-sp-results{max-height:max(230px,calc(100vh - 345px));overflow-y:auto !important;overflow-x:hidden;overscroll-behavior:contain;scrollbar-width:thin;scrollbar-color:#9A0064 transparent}
.vd-sp:not(.has-query) .vd-sp-results{max-height:max(230px,calc(100vh - 410px))}
.vd-sp-results::-webkit-scrollbar{width:7px}
.vd-sp-results::-webkit-scrollbar-track{background:transparent}
.vd-sp-results::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#9A0064,#c0398f);border-radius:10px}
.vd-sp-results li{animation-delay:min(calc(var(--i) * 55ms),440ms)}
.tj_search_wrapper .search_form form .search_input .title{color:#2d0020 !important;filter:drop-shadow(0 2px 12px rgba(255,255,255,.85))}
.tj_search_wrapper .search_form form .search_input .title em{background-image:linear-gradient(90deg,#8a0058,#00615c,#a8307c,#8a0058) !important}
.vd-sp-eyebrow{color:#6d0049;background:rgba(255,255,255,.7)}
.vd-sp-meta{color:#4a2a40;font-weight:600}
.vd-sp-chips::before{color:#4a2a40}
.vd-sp-chip{background:rgba(255,255,255,.75);color:#4a0033}
</style>

<script>
(function(){
  var SEED=[
    {t:'Home',u:'index.php',g:'Page',d:'Vidhitra Corporate Advisors — legal clarity for growing businesses',k:'home main start welcome vidhitra corporate advisors',lv:1},
    {t:'Fractional General Counsel',u:'fractional-general-counsel.php',g:'Service',d:'In-house legal leadership without the full-time cost',k:'fractional fgc general counsel gc in-house legal outsourced part time',lv:1},
    {t:'Capabilities',u:'capabilities.html',g:'Service',d:'The full range of legal & advisory capabilities',k:'capabilities services practice areas expertise offerings',lv:1},
    {t:'Corporate Law & Strategic Advisory',u:'corporate-law-strategic-advisory.php',g:'Service',d:'Corporate structuring, transactions and strategic counsel',k:'corporate law strategic advisory mergers acquisitions structuring transactions governance',lv:1},
    {t:'About Vidhitra',u:'about.php',g:'Company',d:'Who we are, our values and the way we practise',k:'about us company team values story who we are',lv:1},
    {t:'Insights',u:'insights.php',g:'Resources',d:'Articles, legal updates and guides',k:'insights blog articles news legal updates guides resources',lv:1},
    {t:'FAQs',u:'faq.php',g:'Help',d:'Answers to the questions clients ask most',k:'faq faqs questions answers help doubts',lv:1},
    {t:'Contact',u:'contact.php',g:'Get in touch',d:'Talk to the Vidhitra team or book a consultation',k:'contact reach enquiry inquiry email phone call consultation book appointment address',lv:1},
    {t:'Legal Information',u:'legal-information.php',g:'Legal',d:'Disclaimer, terms and legal notices',k:'legal information disclaimer terms privacy policy notice',lv:1}
  ];
  var CHIPS=['Fractional General Counsel','Capabilities','Insights','FAQs','Contact'];
  function rows(){return Math.max(3,Math.min(8,Math.floor((window.innerHeight-340)/68)))}
  var CK='vdSearchIdx_v2';
  var pop,inp,res,meta,chips,form,active=-1,INDEX=[],crawled=[],crawling=false,lastQ='',typingT;
  var BASE=document.baseURI;

  /* ---------- helpers ---------- */
  function abs(u){try{return new URL(u,BASE).href}catch(e){return u}}
  SEED.forEach(function(s){s.u=abs(s.u);s.pg=1});
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function clean(s){return (s||'').replace(/\s+/g,' ').trim()}
  function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\u0900-\u097f\s]/g,' ').replace(/\s+/g,' ').trim()}
  function hl(text,terms){var out=esc(text);terms.forEach(function(w){if(!w||w.length<2)return;var r=new RegExp('('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig');out=out.replace(r,'<mark>$1</mark>')});return out}
  function lev(a,b,max){
    if(a===b)return 0;var la=a.length,lb=b.length;if(Math.abs(la-lb)>max)return max+1;
    var prev=[],cur=[],i,j;for(j=0;j<=lb;j++)prev[j]=j;
    for(i=1;i<=la;i++){cur[0]=i;var rowMin=cur[0];
      for(j=1;j<=lb;j++){cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a.charAt(i-1)===b.charAt(j-1)?0:1));if(cur[j]<rowMin)rowMin=cur[j]}
      if(rowMin>max)return max+1;var t=prev;prev=cur;cur=t}
    return prev[lb]}

  /* ---------- search engine ---------- */
  function prep(it){
    if(it._p)return it;
    it._t=norm(it.t);it._tw=it._t.split(' ').filter(Boolean);
    var kk=norm((it.k||'')+' '+(it.d||'')+' '+(it.g||'')),seen={},kw=[];
    kk.split(' ').forEach(function(w){if(w.length>2&&!seen[w]){seen[w]=1;kw.push(w)}});
    it._k=' '+kk+' ';it._kw=kw.slice(0,500);
    it._ac=it._tw.length>=3?it._tw.map(function(w){return w.charAt(0)}).join(''):'';
    it._p=1;return it}
  function tokScore(w,it){
    var s=0,i,x,tw=it._tw;
    for(i=0;i<tw.length;i++){x=tw[i];
      if(x===w)s=Math.max(s,12);else if(x.indexOf(w)===0)s=Math.max(s,10);else if(w.length>2&&x.indexOf(w)>-1)s=Math.max(s,7)}
    if(it._ac&&it._ac===w)s=Math.max(s,11);
    if(s>=10)return s;
    if(w.length>=2){
      if(it._k.indexOf(' '+w)>-1)s=Math.max(s,w.length>2?4:2.5);
      else if(w.length>2&&it._k.indexOf(w)>-1)s=Math.max(s,2.5)}
    if(s<4&&w.length>=4){
      var m=w.length>=8?2:1,d;
      for(i=0;i<tw.length;i++){x=tw[i];d=lev(w,x,m);if(d<=m)s=Math.max(s,6-d)}
      if(s<2){for(i=0;i<it._kw.length;i++){x=it._kw[i];if(Math.abs(x.length-w.length)<=m&&lev(w,x,m)<=m){s=Math.max(s,2);break}}}}
    return s}
  function bonus(it,qn){
    var b=0;if(it._t.indexOf(qn)===0)b+=14;else if(it._t.indexOf(qn)>-1)b+=8;
    if(it._k.indexOf(qn)>-1)b+=3;
    b+=it.lv===1?4:it.lv===2?2:0;if(it.pg)b+=5;return b}
  function search(q){
    var qn=norm(q);if(!qn)return{list:[],mode:'none'};
    var terms=qn.split(' '),out=[],i,j,it,s,t,ok,n,mode='and';
    for(i=0;i<INDEX.length;i++){it=prep(INDEX[i]);s=0;ok=true;
      for(j=0;j<terms.length;j++){t=tokScore(terms[j],it);if(!t){ok=false;break}s+=t}
      if(ok)out.push({it:it,s:s+bonus(it,qn)})}
    if(!out.length&&terms.length>1){mode='or';
      for(i=0;i<INDEX.length;i++){it=prep(INDEX[i]);s=0;n=0;
        for(j=0;j<terms.length;j++){t=tokScore(terms[j],it);if(t){s+=t;n++}}
        if(n)out.push({it:it,s:s*n/terms.length})}}
    out.sort(function(a,b){return b.s-a.s||a.it.t.length-b.it.t.length});
    var seen={},list=[];
    out.forEach(function(x){var k=x.it._t+'|'+x.it.u;if(!seen[k]){seen[k]=1;list.push(x.it)}});
    return{list:list,mode:mode}}

  /* ---------- site crawler (reads every page's real content) ---------- */
  var SKIP='script,style,noscript,template,header,footer,nav,aside,.hamburger-area,.search_popup,.search-popup-overlay,.vd-side-menu,.vd-sp';
  function snippet(h){
    var n=h,txt='',c=0,el;
    while(c<3&&txt.length<170){el=n.nextElementSibling;
      while(!el&&n.parentElement&&n.parentElement.tagName!=='BODY'){n=n.parentElement;el=n.nextElementSibling}
      if(!el)break;txt+=' '+clean(el.textContent);n=el;c++}
    return clean(txt).slice(0,260)}
  function anchorId(h){
    if(h.id)return h.id;var p=h.parentElement;
    while(p&&p.tagName!=='BODY'){if(p.id&&!/wrapper|content|smooth|main|root|app|page|container/i.test(p.id))return p.id;p=p.parentElement}
    return ''}
  function extract(doc,url){
    var items=[],fileU=url.split('#')[0];
    var md=doc.querySelector('meta[name="description"]'),mk=doc.querySelector('meta[name="keywords"]');
    var mdesc=md?clean(md.getAttribute('content')):'',mkeys=mk?clean(mk.getAttribute('content')):'';
    var docTitle=clean((doc.title||'').split(/\s[|\u2013\u2014-]\s/)[0]);
    doc.querySelectorAll(SKIP).forEach(function(n){if(n.parentNode)n.parentNode.removeChild(n)});
    var h1=doc.querySelector('h1'),title=clean(h1?h1.textContent:'')||docTitle;
    if(!title)return items;
    items.push({t:title,u:fileU,g:'Page',d:mdesc.slice(0,125),k:mkeys+' '+docTitle+' '+clean(doc.body?doc.body.textContent:'').slice(0,1800),lv:1,pg:1});
    var hs=doc.querySelectorAll('h1,h2,h3,h4'),cnt=0;
    for(var i=0;i<hs.length&&cnt<150;i++){
      var h=hs[i],tx=clean(h.textContent);
      if(tx.length<3||tx.length>115||/placeholder|lorem ipsum/i.test(tx)||tx===title)continue;
      var u=fileU,a=h.querySelector('a[href]')||h.closest('a[href]');
      if(a&&/\.php(\?|$)/i.test(a.getAttribute('href')||'')&&a.getAttribute('href').charAt(0)!=='#'){try{u=new URL(a.getAttribute('href'),url).href}catch(e){}}
      else{var id=anchorId(h);if(id)u=fileU+'#'+id}
      var sn=snippet(h);
      items.push({t:tx,u:u,g:title,d:sn.slice(0,130),k:sn+' '+title,lv:parseInt(h.tagName.charAt(1),10)});cnt++}
    return items}
  function pageUrls(){
    var set={},list=[];
    function add(h){if(!h)return;var u;try{u=new URL(h,BASE)}catch(e){return}
      if(u.origin!==location.origin||!/\.(php|html?)$/i.test(u.pathname))return;
      if(/(header|footer|submit|insights-data|insights-head)\./i.test(u.pathname))return;
      var k=u.origin+u.pathname+u.search;if(!set[k]){set[k]=1;list.push(k)}}
    SEED.forEach(function(s){add(s.u)});
    document.querySelectorAll('header a[href],nav a[href],footer a[href],a[href*="article.php"]').forEach(function(a){add(a.getAttribute('href'))});
    return list}
  function rebuild(){
    var done={},seedPage={},merged=[],seen={};
    crawled.forEach(function(c){done[c.u.split('#')[0]]=1});
    SEED.forEach(function(s){if(s.u.indexOf('#')<0)seedPage[s.u]=s});
    function push(it){var k=norm(it.t)+'|'+it.u;if(seen[k])return;seen[k]=1;merged.push(it)}
    SEED.forEach(function(s){if(!done[s.u.split('#')[0]])push(s)});
    crawled.forEach(function(c){var sp=c.pg&&seedPage[c.u];
      if(sp)c={t:sp.t,u:c.u,g:sp.g,d:sp.d||c.d,k:sp.k+' '+c.k,lv:1,pg:1};push(c)});
    INDEX=merged}
  function crawl(){
    try{var c=JSON.parse(sessionStorage.getItem(CK)||'null');
      if(c&&Date.now()-c.t<600000&&c.items&&c.items.length){crawled=c.items;rebuild();return}}catch(e){}
    if(!window.fetch||location.protocol==='file:')return;
    crawling=true;showMeta();
    var queue=pageUrls(),seen={},items=[],running=0,idx=0;
    queue.forEach(function(k){seen[k]=1});
    function finish(){if(!crawling)return;crawling=false;
      try{sessionStorage.setItem(CK,JSON.stringify({t:Date.now(),items:crawled}))}catch(e){}
      showMeta();refresh()}
    function next(){
      if(idx>=queue.length){if(running===0)finish();return}
      var u=queue[idx++];running++;
      fetch(u,{credentials:'same-origin'}).then(function(r){return r.ok?r.text():''}).then(function(html){
        if(!html)return;
        var doc=new DOMParser().parseFromString(html,'text/html');
        doc.querySelectorAll('a[href*="article.php?slug="]').forEach(function(a){
          try{var x=new URL(a.getAttribute('href'),u),k=x.origin+x.pathname+x.search;if(!seen[k]){seen[k]=1;queue.push(k)}}catch(e){}});
        items=items.concat(extract(doc,u));crawled=items.slice();rebuild();
        if(pop.classList.contains('search-opened')&&lastQ)refresh()
      }).catch(function(){}).then(function(){running--;next()})}
    for(var i=0;i<3;i++)next()}

  /* ---------- rendering ---------- */
  function showMeta(extra){
    if(extra!==undefined){meta.textContent=extra+(crawling?'  •  indexing site…':'');return}
    if(!lastQ)meta.textContent=crawling?'Suggested pages  •  indexing site…':'Suggested pages'}
  function render(q){
    lastQ=q.trim();
    var terms=norm(q).split(' ').filter(Boolean),list,mode='and',total=0;
    if(!terms.length){list=SEED.filter(function(s){return s.u.indexOf('#')<0}).slice(0,6);total=list.length;showMeta()}
    else{var r=search(q);list=r.list;mode=r.mode;total=list.length;list=list.slice(0,80);
      showMeta(total?(mode==='or'?'Related results':total+' result'+(total>1?'s':''))+'':'')}
    active=list.length&&terms.length?0:-1;
    if(!list.length){res.innerHTML='<li class="vd-sp-empty" style="--i:0">No match for <b>&ldquo;'+esc(q)+'&rdquo;</b>'+(crawling?' yet — still indexing the site, one moment…':'. Try a shorter word like “Fractional”, “Contact” or “Insights”.')+'</li>';return}
    var hterms=q.toLowerCase().split(/\s+/).filter(Boolean);
    res.innerHTML=list.map(function(it,i){
      return '<li style="--i:'+i+'" role="option"><a href="'+esc(it.u)+'" class="'+(i===active?'is-active':'')+'"><span class="vd-sp-wave"></span><span class="vd-sp-ico">'+esc(it.t.charAt(0).toUpperCase())+'</span><span class="vd-sp-txt"><span class="vd-sp-tag">'+esc(it.g)+(it.pg?'':' &rsaquo; Section')+'</span><span class="vd-sp-name">'+hl(it.t,hterms)+'</span><span class="vd-sp-desc">'+esc(it.d||'')+'</span></span></a></li>'}).join('')}
  function refresh(){render(inp.value)}
  function setActive(n){var a=res.querySelectorAll('a');if(!a.length)return;active=(n+a.length)%a.length;a.forEach(function(x,i){x.classList.toggle('is-active',i===active)});a[active].scrollIntoView({block:'nearest'})}
  function go(a){
    var u;try{u=new URL(a.href)}catch(e){location.href=a.href;return}
    var same=u.origin===location.origin&&u.pathname===location.pathname&&u.search===location.search;
    if(same&&u.hash){var b=pop.querySelector('.search_close_btn');if(b)b.click();
      setTimeout(function(){var el=document.getElementById(u.hash.slice(1));if(el)el.scrollIntoView({behavior:'smooth',block:'start'});try{history.replaceState(null,'',u.hash)}catch(e){}},450);return}
    location.href=a.href}

  function init(){
    pop=document.querySelector('.search_popup.vd-sp');if(!pop)return;
    INDEX=SEED.slice();
    inp=document.getElementById('vdSearchInput');res=document.getElementById('vdSearchResults');meta=document.getElementById('vdSearchMeta');chips=document.getElementById('vdSearchChips');form=document.getElementById('vdSearchForm');
    chips.innerHTML=CHIPS.map(function(c){return '<span class="vd-sp-chip" data-q="'+esc(c)+'">'+esc(c)+'</span>'}).join('');
    chips.addEventListener('click',function(e){var c=e.target.closest('.vd-sp-chip');if(!c)return;inp.value=c.getAttribute('data-q');pop.classList.add('has-query');render(inp.value);inp.focus()});
    inp.addEventListener('input',function(){
      pop.classList.toggle('has-query',!!inp.value.trim());pop.classList.add('is-typing');
      clearTimeout(typingT);typingT=setTimeout(function(){pop.classList.remove('is-typing')},900);render(inp.value)});
    inp.addEventListener('keydown',function(e){
      if(e.key==='ArrowDown'){e.preventDefault();setActive(active+1)}
      else if(e.key==='ArrowUp'){e.preventDefault();setActive(active-1)}});
    res.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;e.preventDefault();go(a)});
    form.addEventListener('submit',function(e){e.preventDefault();var a=res.querySelectorAll('a');if(a.length)go(a[active>-1?active:0])});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&pop.classList.contains('search-opened')){var b=pop.querySelector('.search_close_btn');if(b)b.click()}});
    new MutationObserver(function(){
      if(pop.classList.contains('search-opened')){render(inp.value);setTimeout(function(){inp.focus()},650)}
    }).observe(pop,{attributes:true,attributeFilter:['class']});
    render('');
    setTimeout(crawl,1200);
    /* typing placeholder: page names one by one */
    var NAMES=['Home','Fractional General Counsel','Capabilities','About','Insights','FAQs','Contact'],ni=0,ci=0,del=false,timer;
    function tick(){
      clearTimeout(timer);
      if(inp.value||!pop.classList.contains('search-opened')){timer=setTimeout(tick,400);return}
      var w=NAMES[ni],delay=del?35:75;
      if(!del){ci++;if(ci>=w.length){del=true;delay=1100}}
      else{ci--;if(ci<=0){del=false;ni=(ni+1)%NAMES.length;delay=300}}
      inp.placeholder='Search '+w.slice(0,ci);
      timer=setTimeout(tick,delay)}
    tick()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  window.__vdSearch={search:search,extract:extract,setIndex:function(a){crawled=a;rebuild()},get index(){return INDEX}};
})();
</script>


    <style>
/* ===== SIDEBAR: glass drawer (slides over the page, page never moves) ===== */
body.vd-menu-open { margin-left: 0 !important; }
body.vd-menu-open .tj-header-area.header-duplicate { left: 0 !important; width: 100% !important; }

/* invisible catcher: clicking anywhere outside (incl. the 4-square button) closes the drawer */
body .body-overlay {
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  opacity: 1 !important;
}
body.vd-menu-open .body-overlay { visibility: visible !important; }

body .hamburger-area {
  inset-inline-start: 0 !important;
  left: 0 !important;
  top: var(--vd-sb-top, 108px) !important;                         /* starts below the navbar */
  height: calc(100vh - var(--vd-sb-top, 108px)) !important;
  width: min(300px, 86vw) !important;
  transform: translate3d(-110%, 0, 0);
  visibility: hidden;
  transition: transform .6s cubic-bezier(.22, 1, .36, 1), visibility 0s linear .6s !important;
  box-shadow: 18px 0 50px -18px rgba(58, 24, 55, .45) !important;
  border-right: 1px solid rgba(255, 255, 255, .55);
  border-radius: 0 22px 0 0;
  will-change: transform;
}
body .hamburger-area.opened {
  transform: translate3d(0, 0, 0);
  visibility: visible;
  transition: transform .6s cubic-bezier(.22, 1, .36, 1), visibility 0s !important;
}
/* translucent frosted glass */
body .hamburger-area .hamburger_bg {
  background: linear-gradient(165deg, rgba(255,255,255,.74) 0%, rgba(252,240,248,.66) 100%) !important;
  -webkit-backdrop-filter: blur(14px) saturate(1.4);
  backdrop-filter: blur(14px) saturate(1.4);
}
/* gold / plum accent on top */
body .hamburger-area .hamburger_wrapper::before {
  content: "";
  position: absolute; left: 25px; right: 20px; top: 0; height: 3px;
  background: linear-gradient(90deg, #c5981a, #e6c867 45%, #9a0064);
  border-radius: 0 0 3px 3px;
}
/* close button: visible on a light panel */
body .hamburger-area .hamburger_close_btn {
  width: 38px; height: 38px;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 20px;
  color: #9a0064 !important;
  background: rgba(154, 0, 100, .08);
  border: 1px solid rgba(154, 0, 100, .18);
  border-radius: 50%;
  transition: background .3s ease, color .3s ease, transform .4s ease;
}
body .hamburger-area .hamburger_close_btn:hover {
  background: #9a0064; color: #fff !important; transform: rotate(90deg);
}
/* crisp, always-readable text (dark on the light glass, on any page background) */
body .hamburger-area .vd-side-menu > ul > li > a,
body .hamburger-area .vd-side-row > a { color: #1c0b1a; text-shadow: none; }
body .hamburger-area .vd-side-sub li a {
  color: #3a1837;
  border-left: 2px solid rgba(197, 152, 26, .8);
  text-shadow: none;
}
body .hamburger-area .vd-side-sub li a:hover { color: #9a0064; }
body .hamburger-area .vd-has-sub.is-open > .vd-side-row > a { color: #9a0064; }
body .hamburger-area .vd-side-toggle {
  color: #9a0064;
  border: 1px solid rgba(154, 0, 100, .35);
  background: rgba(255, 255, 255, .55);
}
body .hamburger-area .vd-side-toggle:hover,
body .hamburger-area .vd-has-sub.is-open > .vd-side-row .vd-side-toggle {
  background: #c5981a; border-color: #c5981a; color: #fff;
}
/* menu links: gold bar slides in on hover */
body .hamburger-area .vd-side-menu a { position: relative; transition: color .3s ease, padding-left .3s ease; }
body .hamburger-area .vd-side-menu a:hover { color: #9a0064; padding-left: 10px; }
body .hamburger-area .vd-side-menu a::before {
  content: ""; position: absolute; left: 0; top: 50%;
  width: 3px; height: 0; background: linear-gradient(#e6c867, #c5981a);
  transform: translateY(-50%); transition: height .3s ease;
}
body .hamburger-area .vd-side-menu a:hover::before { height: 18px; }
/* items fade up one by one */
body .hamburger-area .vd-side-menu > ul > li,
body .hamburger-area .hamburger-socials { opacity: 0; transform: translateY(14px); transition: opacity .45s ease, transform .45s ease; }
body .hamburger-area.opened .vd-side-menu > ul > li,
body .hamburger-area.opened .hamburger-socials { opacity: 1; transform: none; }
body .hamburger-area.opened .vd-side-menu > ul > li:nth-child(1) { transition-delay: .20s; }
body .hamburger-area.opened .vd-side-menu > ul > li:nth-child(2) { transition-delay: .26s; }
body .hamburger-area.opened .vd-side-menu > ul > li:nth-child(3) { transition-delay: .32s; }
body .hamburger-area.opened .vd-side-menu > ul > li:nth-child(4) { transition-delay: .38s; }
body .hamburger-area.opened .vd-side-menu > ul > li:nth-child(5) { transition-delay: .44s; }
body .hamburger-area.opened .vd-side-menu > ul > li:nth-child(6) { transition-delay: .50s; }
body .hamburger-area.opened .vd-side-menu > ul > li:nth-child(7) { transition-delay: .56s; }
body .hamburger-area.opened .hamburger-socials { transition-delay: .64s; }
@media (prefers-reduced-motion: reduce) {
  body .hamburger-area, body .hamburger-area * { transition: none !important; }
}
</style>
<script>
/* sidebar top = bottom edge of whichever navbar is visible right now */
(function () {
  var sb = document.querySelector(".hamburger-area");
  if (!sb) return;
  function setTop() {
    var best = 0;
    document.querySelectorAll(".tj-header-area").forEach(function (hd) {
      var cs = getComputedStyle(hd);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      var r = hd.getBoundingClientRect();
      if (r.height > 0 && r.bottom > 0 && r.top < window.innerHeight) best = Math.max(best, r.bottom);
    });
    sb.style.setProperty("--vd-sb-top", Math.round(best) + "px");
  }
  new MutationObserver(function () { if (sb.classList.contains("opened")) setTop(); })
    .observe(sb, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("scroll", function () { if (sb.classList.contains("opened")) setTop(); }, { passive: true });
  window.addEventListener("resize", function () { if (sb.classList.contains("opened")) setTop(); });
  setTop();
})();
</script>
<script>
/* Esc key closes the sidebar (4-square button / outside click already close it) */
document.addEventListener("keydown", function (e) {
  if (e.key !== "Escape") return;
  var b = document.querySelector(".hamburger-area.opened .hamburgerCloseBtn");
  if (b) b.click();
});
</script>
<!-- start: Hamburger Menu -->
    <div class="body-overlay"></div>
    <div class="hamburger-area" data-lenis-prevent>
    <div class="hamburger_bg"></div>
    <div class="hamburger_wrapper">
        <div class="hamburger_top d-flex align-items-center justify-content-between">
            <div class="hamburger_logo">
                <a href="index.php" class="mobile_logo">
                <h3 class="align-items-center my-auto">Vidhitra</h3>
                </a>
            </div>
            <div class="hamburger_close">
                <button class="hamburger_close_btn hamburgerCloseBtn">
                <i class="fa-thin fa-times"></i>
                </button>
            </div>
        </div>

            <!-- OLD (keep it but hidden so nothing else breaks) -->
            <div class="hamburger_menu d-none">
               <div class="mobile_menu"></div>
            </div>

            <!-- NEW: full site menu inside hamburger -->
            <nav class="vd-side-menu" aria-label="Site menu">
               <ul>
                  <li><a href="index.php">Home</a></li>
                  <li>
                     <a href="fractional-general-counsel.php"
                        >Fractional General Counsel</a
                     >
                  </li>

                  <li class="vd-has-sub">
                     <div class="vd-side-row">
                        <a href="capabilities.html">Capabilities</a>
                        <button
                           type="button"
                           class="vd-side-toggle"
                           aria-label="Toggle Capabilities submenu"
                        >
                           <i class="fa fa-angle-down"></i>
                        </button>
                     </div>
                     <ul class="vd-side-sub">
                        <li>
                           <a href="corporate-law-strategic-advisory.php"
                              >Corporate Law &amp; Strategic Advisory</a
                           >
                        </li>
                        <li>
                           <a href="commercial-contracts-contracting-framework.php"
                              >Commercial Contracts &amp; Business
                              Relationships</a
                           >
                        </li>
                        <li>
                           <a href="infrastructure-project-bid-advisory.php"
                              >Infrastructure, Projects &amp; Bids</a
                           >
                        </li>
                        <li>
                           <a href="regulatory-compliance-risk-advisory.php"
                              >Regulatory Compliance &amp; Business Risk</a
                           >
                        </li>
                        <li>
                           <a href="technology-it-digital-business.php"
                              >Technology, IT &amp; Digital Business</a
                           >
                        </li>
                        <li>
                           <a href="employement-workforce-advisory.php"
                              >Employment &amp; Workforce Matters</a
                           >
                        </li>
                        <li>
                           <a href="market-entry-startup-emerging-business.php"
                              >Market Entry, Startups &amp; Emerging
                              Businesses</a
                           >
                        </li>
                     </ul>
                  </li>

                  <li class="vd-has-sub">
                     <div class="vd-side-row">
                        <a href="about.php">About</a>
                        <button
                           type="button"
                           class="vd-side-toggle"
                           aria-label="Toggle About submenu"
                        >
                           <i class="fa fa-angle-down"></i>
                        </button>
                     </div>
                     <ul class="vd-side-sub">
                        <li><a href="about.php">About Vidhitra</a></li>
                        <li>
                           <a href="the-vidhitra-approach.html">Our Approach</a>
                        </li>
                        <li><a href="leadership.html">Leadership</a></li>
                     </ul>
                  </li>

                  <li><a href="insights.php">Insights</a></li>
                  <li><a href="faq.php">FAQs</a></li>
                  <li><a href="contact.php">Contact</a></li>
               </ul>
            </nav>

            <div class="hamburger-socials">
               <h4 class="hamburger-title">Follow us</h4>
               <ul>
                  <!-- TODO: replace # with actual social links once client confirms active profiles -->
                  <li>
                     <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                  </li>
                  <li>
                     <a href="#"><i class="fa-brands fa-instagram"></i></a>
                  </li>
                  <li>
                     <a href="#"><i class="fa-brands fa-twitter"></i></a>
                  </li>
               </ul>
            </div>
         </div>
      </div>
      <!-- end: Hamburger Menu -->

      <!-- start: Header Area -->
      <header class="tj-header-area header-6 style-6 header-absolute">
         <div class="header-bottom">
            <div class="container">
               <div class="row">
                  <div class="col-12">
                     <div class="header-wrapper">
                        <!-- logo -->
                        <div class="site-logo">
                           <a class="logo" href="index.php">
                              <!-- <img src="assets/images/vidhitra/logo.webp" class="logo" alt="Vidhitra Corporate Advisors LLP"> -->
                              <h3 class="align-items-center my-auto">
                                 Vidhitra
                              </h3>
                           </a>
                        </div>

                        <!-- main navigation -->
                        <div class="mainmenu d-lg-block d-none" id="main-menu">
                           <ul>
                              <li class="current-menu-ancestor">
                                 <a href="index.php">Home</a>
                              </li>

                              <li class="has-dropdown">
                                 <a href="fractional-general-counsel.php"
                                    >Fractional General Counsel</a
                                 >
                                 <ul class="sub-menu mega-menu-service">
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#engagement-model"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-business"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >FGC Model</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#how-we-work"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-process"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >How We Work</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#capabilities"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-strategic"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Expertise</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#who-we-support"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-leadership"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Who We Support</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#continuity"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-optimization"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Why Continuity</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                 </ul>
                              </li>

                              <li class="has-dropdown">
                                 <a href="capabilities.html">Capabilities</a>

                                 <ul class="sub-menu mega-menu-service">
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="corporate-law-strategic-advisory.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-business"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Corporate Law &amp; Strategic
                                             Advisory</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="commercial-contracts-contracting-framework.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-strategic"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Commercial Contracts &amp;
                                             Business Relationships</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="infrastructure-project-bid-advisory.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-process"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Infrastructure, Projects &amp;
                                             Bids</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="regulatory-compliance-risk-advisory.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-optimization"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Regulatory Compliance &amp;
                                             Business Risk</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="technology-it-digital-business.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-executive"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Technology, IT &amp; Digital
                                             Business</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="employement-workforce-advisory.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-leadership"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Employment &amp; Workforce
                                             Matters</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <!-- NOTE: theme only ships 6 service icon classes — reused "strategic" here for the 7th.
                           Consider asking the theme's icon font for a closer match (e.g. a "growth" or "startup" glyph). -->
                                       <a
                                          class="mega-menu-service-single"
                                          href="market-entry-startup-emerging-business.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-strategic"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Market Entry, Startups &amp;
                                             Emerging Businesses</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                 </ul>
                              </li>

                              <li class="has-dropdown">
                                 <a href="about.php">About</a>

                                 <ul class="sub-menu mega-menu-service">
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="about.php"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Who We Are</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="the-vidhitra-approach.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Our Perspective</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >How We Work</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Experience</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>

                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Leadership</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>

                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Values</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Thought Behind Our Name</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Get In Touch</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                 </ul>
                              </li>

                              <li><a href="insights.php">Insights</a></li>
                              <li><a href="faq.php">FAQs</a></li>
                              <li><a href="contact.php">Contact</a></li>
                           </ul>
                        </div>

                        <div class="header_right_info d-none d-md-inline-flex">
                           <!-- search btn -->
                           <button
                              class="header_search d-none d-lg-inline-flex"
                           >
                              Explore
                              <i class="tji-search"></i>
                           </button>

                           <!-- menu bar -->
                           <button class="menu_btn d-none d-xl-inline-flex">
                              <span class="cubes">
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                              </span>
                           </button>
                        </div>

                        <!-- menu bar -->
                        <button class="menu_btn d-lg-none hamburgerBtn">
                           <span class="cubes">
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                           </span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>

      <header class="tj-header-area header-6 style-6 header-duplicate header-sticky" >
         <div class="header-bottom">
            <div class="container-fluid">
               <div class="row">
                  <div class="col-12">
                     <div class="header-wrapper">
                        <!-- logo -->
                        <div class="site-logo">
                           <a class="logo" href="index.php">
                              <!-- <img src="assets/images/vidhitra/logo.webp" class="logo" alt="Vidhitra Corporate Advisors LLP"> -->
                              <h3>Vidhitra</h3>
                           </a>
                        </div>

                        <!-- main navigation -->
                        <div class="mainmenu d-lg-block d-none">
                           <ul>
                              <li class="current-menu-ancestor">
                                 <a href="index.php">Home</a>
                              </li>

                              <li class="has-dropdown">
                                 <a href="fractional-general-counsel.php"
                                    >Fractional General Counsel</a
                                 >
                                 <ul class="sub-menu mega-menu-service">
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#engagement-model"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-business"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >FGC Model</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#how-we-work"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-process"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >How We Work</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#capabilities"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-strategic"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Expertise</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#who-we-support"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-leadership"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Who We Support</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="fractional-general-counsel.php#continuity"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-optimization"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Why Continuity</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                 </ul>
                              </li>

                              <li class="has-dropdown">
                                 <a href="capabilities.html">Capabilities </a>

                                 <ul class="sub-menu mega-menu-service">
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="corporate-law-strategic-advisory.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-business"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Corporate Law &amp; Strategic
                                             Advisory</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="commercial-contracts-contracting-framework.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-strategic"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Commercial Contracts &amp;
                                             Business Relationships</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="infrastructure-project-bid-advisory.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-process"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Infrastructure, Projects &amp;
                                             Bids</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="regulatory-compliance-risk-advisory.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-optimization"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Regulatory Compliance &amp;
                                             Business Risk</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="technology-it-digital-business.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-executive"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Technology, IT &amp; Digital
                                             Business</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="employement-workforce-advisory.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-leadership"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Employment &amp; Workforce
                                             Matters</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="market-entry-startup-emerging-business.php"
                                       >
                                          <span class="mega-menu-service-icon"
                                             ><i class="tji-strategic"></i
                                          ></span>
                                          <span class="mega-menu-service-title"
                                             >Market Entry, Startups &amp;
                                             Emerging Businesses</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                 </ul>
                              </li>

                              <li class="has-dropdown">
                                 <a href="about.php">About</a>
                                 <ul class="sub-menu mega-menu-service">
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="about.php"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Who We Are</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="the-vidhitra-approach.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Our Perspective</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >How We Work</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Experience</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Leadership</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Values</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Thought Behind Our Name</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                    <li>
                                       <a
                                          class="mega-menu-service-single"
                                          href="leadership.html"
                                       >
                                          <span class="mega-menu-service-title"
                                             >Get In Touch</span
                                          >
                                          <span class="mega-menu-service-nav"
                                             ><i class="fa fa-arrow-right"></i
                                             ><i class="fa fa-arrow-right"></i
                                          ></span>
                                       </a>
                                    </li>
                                 </ul>
                              </li>

                              <li><a href="insights.php">Insights</a></li>
                              <li><a href="faq.php">FAQs</a></li>
                              <li><a href="contact.php">Contact</a></li>
                           </ul>
                        </div>

                        <div class="header_right_info d-none d-md-inline-flex">
                           <!-- search btn -->
                           <button
                              class="header_search d-none d-lg-inline-flex"
                           >
                              Explore
                              <i class="tji-search"></i>
                           </button>
                           <!-- menu bar -->
                           <button class="menu_btn d-none d-xl-inline-flex">
                              <span class="cubes">
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                              </span>
                           </button>
                        </div>

                        <!-- menu bar -->
                        <button class="menu_btn d-lg-none hamburgerBtn">
                           <span class="cubes">
                              <span></span>
                              <span></span>
                              <span></span>
                              <span></span>
                           </span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </header>


      <script>
         (function () {
            var sidebar = document.querySelector(".hamburger-area");
            if (!sidebar) return;

            function sync() {
               document.body.classList.toggle(
                  "vd-menu-open",
                  sidebar.classList.contains("opened"),
               );
               // let GSAP/ScrollTrigger recalc after the slide finishes
               clearTimeout(window.__vdMenuT);
               window.__vdMenuT = setTimeout(function () {
                  if (window.ScrollTrigger) ScrollTrigger.refresh();
               }, 1100);
            }

            new MutationObserver(sync).observe(sidebar, {
               attributes: true,
               attributeFilter: ["class"],
            });
            sync();
         })();
      </script>