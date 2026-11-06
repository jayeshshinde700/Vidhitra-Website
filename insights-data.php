<?php
/*
 * INSIGHTS DATA + HELPERS (shared by insights.php and article.php)
 * ---------------------------------------------------------------
 * IMAGES: put article images in   assets/images/insights/   (e.g. assets/images/insights/my-article.jpg)
 *         and set 'img' => 'assets/images/insights/my-article.jpg'.   Leave 'img' => '' to show the gradient placeholder.
 *         Recommended size: 1600 x 900 px (16:9), JPG/WebP, under 300 KB.
 * ARTICLE PAGE: 'url' => 'article.php?slug=<slug>'  opens article.php for that item.
 *         Add the full text in 'body' (HTML: <p>, <h2 class="sec-title tj-text-invert">, <ul>, <blockquote>). No 'body' = placeholder text is shown.
 * 'cat' must match a key in $cats, 'type' must match an item in $types.
 * Replace this array with real articles (or a database query) when the client provides content.
 *
 * HERO "LATEST UPDATES" CARDS (insights.php): the newest 4 items by 'date' appear there AUTOMATICALLY.
 *         Just add a new item to $insights (any position) with a correct 'date' like 'Oct 19, 2026'.
 *         Items dated within the last 14 days get a gold "New" tag.
 */
$cats = [
  'fractional-gc' => 'Fractional GC',
  'corporate-law' => 'Corporate Law',
  'governance'    => 'Governance',
  'compliance'    => 'Compliance',
  'contracts'     => 'Contracts',
  'data-tech'     => 'Data & Technology',
];
$types = ['Article', 'Legal Update', 'Guide'];
$ph = 'Two or three lines summarising the article. Placeholder text to be replaced with real content.';

$insights = [
  [ /* ---- FILLED SAMPLE ARTICLE (opens article.php) ---- */
    'slug'=>'why-growing-companies-choose-a-fractional-general-counsel',
    'cat'=>'fractional-gc','type'=>'Article','icon'=>'fa-balance-scale',
    'img'=>'assets/images/insights/fractional-gc-lead.jpg',
    'title'=>'Why Growing Companies Are Choosing a Fractional General Counsel',
    'excerpt'=>'Senior legal judgement no longer needs a full-time hire. A fractional model gives growing businesses strategic legal leadership across contracts, governance and risk, without the cost and commitment of building an in-house team.',
    'date'=>'Oct 8, 2026','read'=>'6 min read',
    'url'=>'article.php?slug=why-growing-companies-choose-a-fractional-general-counsel',
    'body'=>'
<p class="vd-lead">Most growing businesses reach the same point: contracts are piling up, regulators are asking more questions, and every important decision seems to carry a legal footnote. The question is no longer whether you need senior legal thinking, but how to get it without building a full department.</p>
<h2 class="sec-title tj-text-invert">The gap between outsourced and in-house</h2>
<p>Traditionally, companies had two options. They could send each problem to an external law firm and pay by the hour, or hire a full-time General Counsel and carry that cost whether the workload is heavy or light. The first option rarely builds institutional memory. The second can be hard to justify until a business is considerably larger.</p>
<p>A fractional General Counsel sits between the two. It is a senior lawyer who works with your business on a defined, recurring basis, understands how you operate, and is available when decisions are being made rather than after they have gone wrong.</p>
<h2 class="sec-title tj-text-invert">What a fractional GC actually does</h2>
<p>The role is practical rather than theoretical. Typical areas of work include:</p>
<ul>
<li>Reviewing, negotiating and standardising commercial contracts</li>
<li>Setting up governance, approvals and board-level reporting</li>
<li>Keeping the business ahead of compliance obligations</li>
<li>Advising leadership on risk before a decision is final</li>
<li>Coordinating external counsel so that specialist work stays focused and cost-effective</li>
</ul>
<blockquote>The value is not in answering legal questions. It is in helping leadership ask the right ones earlier.</blockquote>
<h2 class="sec-title tj-text-invert">When the model makes sense</h2>
<p>A fractional arrangement tends to suit businesses that have outgrown ad-hoc legal help but do not yet need a full-time team: companies that are scaling quickly, entering new markets, raising capital, or dealing with a growing volume of contracts and regulatory touchpoints.</p>
<h2 class="sec-title tj-text-invert">Questions to ask before you start</h2>
<p>Before engaging a fractional General Counsel, it helps to be clear about what you expect. Which decisions currently wait on legal input? Where is the biggest recurring risk? What would you like the legal function to look like in two years? Clear answers make the scope, cadence and success measures far easier to agree.</p>
<p>If you are weighing up how legal leadership could support your next stage of growth, we would be glad to talk it through.</p>'
  ],
  ['slug'=>'placeholder-2','cat'=>'corporate-law','type'=>'Legal Update','icon'=>'fa-gavel','img'=>'assets/images/insights/insight-02-corporate-law.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Oct 7, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-3','cat'=>'governance','type'=>'Guide','icon'=>'fa-file-text-o','img'=>'assets/images/insights/insight-03-governance.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Oct 6, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-4','cat'=>'compliance','type'=>'Legal Update','icon'=>'fa-shield','img'=>'assets/images/insights/insight-04-compliance.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Oct 3, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-5','cat'=>'contracts','type'=>'Article','icon'=>'fa-pencil-square-o','img'=>'assets/images/insights/insight-05-contracts.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Oct 1, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-6','cat'=>'data-tech','type'=>'Legal Update','icon'=>'fa-lock','img'=>'assets/images/insights/insight-06-data-tech.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Sep 29, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-7','cat'=>'corporate-law','type'=>'Article','icon'=>'fa-building-o','img'=>'assets/images/insights/insight-07-corporate-law.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Sep 26, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-8','cat'=>'contracts','type'=>'Guide','icon'=>'fa-check-square-o','img'=>'assets/images/insights/insight-08-contracts.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Sep 24, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-9','cat'=>'governance','type'=>'Article','icon'=>'fa-users','img'=>'assets/images/insights/insight-09-governance.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Sep 22, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-10','cat'=>'compliance','type'=>'Guide','icon'=>'fa-list-alt','img'=>'assets/images/insights/insight-10-compliance.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Sep 19, 2026','read'=>'X min read','url'=>'#'],
  ['slug'=>'placeholder-11','cat'=>'fractional-gc','type'=>'Legal Update','icon'=>'fa-briefcase','img'=>'assets/images/insights/insight-11-fractional-gc.jpg','title'=>'Article Title Placeholder','excerpt'=>$ph,'date'=>'Sep 17, 2026','read'=>'X min read','url'=>'#'],
];


/* HOME-PAGE BUTTON (same markup/animation as index.php: .tj-primary-btn). $tag = a | button | span */
function in_btn($label, $tag = 'a', $attrs = '', $class = '', $icon = 'fa-arrow-right') {
  return '<' . $tag . ' ' . $attrs . ' class="tj-primary-btn ' . $class . '"><span class="btn_inner"><span class="btn_icon"><span><i class="fa ' . $icon . '"></i><i class="fa ' . $icon . '"></i></span></span><span class="btn_text"><span>' . $label . '</span></span></span></' . $tag . '>';
}

function in_e($s) { return htmlspecialchars($s, ENT_QUOTES, 'UTF-8'); }

/* LATEST: newest $n items by 'date' (newest first) — feeds the hero "Latest Updates" card deck */
function in_latest($items, $n = 4) {
  usort($items, function ($a, $b) { return (int) strtotime($b['date']) <=> (int) strtotime($a['date']); });
  return array_slice($items, 0, $n);
}

/* NEW tag: true when the item is dated within the last $days days */
function in_is_new($a, $days = 14) {
  $t = strtotime($a['date']);
  return $t && $t <= time() && (time() - $t) <= $days * 86400;
}

/* image block: real <img> when 'img' is set, otherwise gradient placeholder */
function in_media($a, $class = '') {
  if (!empty($a['img'])) return '<div class="in-media ' . $class . '"><img src="' . in_e($a['img']) . '" alt="' . in_e($a['title']) . '" loading="lazy"></div>';
  return '<div class="in-media in-ph ' . $class . '"><i class="fa ' . $a['icon'] . '"></i><span>Image placeholder</span></div>';
}

/* flip card: front = image/title/meta, back = excerpt + read button */
function in_card($a, $cats, $i = 0) {
  $c = in_e($cats[$a['cat']]);
  ob_start(); ?>
      <a class="in-card" href="<?= in_e($a['url']) ?>" data-cat="<?= $a['cat'] ?>" data-type="<?= in_e($a['type']) ?>">
        <div class="in-card__tilt"><div class="in-card__inner">
          <div class="in-card__face in-card__front">
            <div class="in-media-wrap"><?= in_media($a) ?><em class="in-card__hint"><i class="fa fa-refresh"></i></em></div>
            <div class="in-card__body">
              <div class="in-card__top"><span class="in-card__cat"><?= $c ?></span><span class="in-card__type"><?= in_e($a['type']) ?></span></div>
              <h3><?= in_e($a['title']) ?></h3>
              <div class="in-meta"><span><i class="fa fa-calendar"></i><?= in_e($a['date']) ?></span><span><i class="fa fa-clock-o"></i><?= in_e($a['read']) ?></span></div>
            </div>
          </div>
          <div class="in-card__face in-card__back">
            <i class="fa <?= $a['icon'] ?> in-card__mark"></i>
            <span class="in-card__flipback" aria-hidden="true"><i class="fa fa-refresh"></i></span>
            <div>
              <span class="in-card__cat"><?= $c ?> &middot; <?= in_e($a['type']) ?></span>
              <h3><?= in_e($a['title']) ?></h3>
              <p><?= in_e($a['excerpt']) ?></p>
            </div>
            <div>
              <div class="in-meta"><span><i class="fa fa-calendar"></i><?= in_e($a['date']) ?></span><span><i class="fa fa-clock-o"></i><?= in_e($a['read']) ?></span></div>
              <?= in_btn('Read article', 'span', '', 'white-btn') ?>
            </div>
          </div>
        </div></div>
      </a>
<?php return ob_get_clean();
}