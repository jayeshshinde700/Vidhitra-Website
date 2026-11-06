<?php
require __DIR__ . '/insights-data.php';
$lead = $insights[0];
$recommended = array_slice($insights, 1, 5);
$grid = array_slice($insights, 1);
$page_title = 'Insights | Vidhitra Corporate Advisors LLP';
$page_desc = 'Insights from Vidhitra Corporate Advisors LLP: articles, legal updates and guides on fractional general counsel, corporate law, governance, compliance and contracts.';
$page_canonical = 'https://www.vidhitra.com/insights.php';
include __DIR__ . '/insights-head.php';
?>

<main id="primary" class="site-main">
<!-- Hero banner (Vidhitra) -->
<section class="tj-page-header in-hero" style="background-image:url('assets/images/vidhitra/new/insights.jpg')">
  <div class="in-blob in-blob--1" data-depth="40"></div><div class="in-blob in-blob--2" data-depth="-60"></div>
  <div class="in-wrap">
    <span class="in-eyebrow">Vidhitra Corporate Advisors LLP</span>
    <h1 class="tj-page-title in-title text-anim" id="in-title">Insights</h1>
    <p class="in-hero__p in-reveal" data-d=".5">Articles, legal updates and guides to help you understand the legal dimensions of your business decisions.</p>
    <div class="in-crumb in-reveal" data-d=".7"><a href="index.php">Home</a><span>/</span><span>Insights</span></div>
  </div>
  <!-- Latest Updates deck: newest 4 items from insights-data.php (auto-updates when a new article is added) -->
  <?php $deck = in_latest($insights, 4); ?>
  <div class="in-deck" id="inDeck" role="region" aria-label="Latest updates">
    <div class="in-deck__stack">
      <?php foreach ($deck as $n => $d): ?>
      <a class="in-deck__c<?= $n === 0 ? ' is-front' : '' ?>" href="<?= in_e($d['url']) ?>" style="--i:<?= $n ?>;--p:<?= $n ?>;z-index:<?= count($deck) - $n ?>">
        <span class="in-deck__top">
          <span class="in-deck__ic"><i class="fa <?= in_e($d['icon']) ?>"></i></span>
          <?php if (in_is_new($d)): ?><span class="in-deck__new">New</span><?php endif; ?>
        </span>
        <span class="in-deck__in">
          <strong class="in-deck__t"><?= in_e($d['title']) ?></strong>
          <span class="in-deck__date"><i class="fa fa-calendar"></i><?= in_e($d['date']) ?></span>
        </span>
        <em class="in-deck__type"><?= in_e($d['type']) ?> <i class="fa fa-arrow-right"></i></em>
      </a>
      <?php endforeach; ?>
    </div>
  </div>
  <span class="in-scroll"></span>
</section>

<div class="in-page">
  <div class="in-wrap">

    <!-- Section heading (same structure as the Fractional General Counsel page) -->
    <div class="in-sechead">
      <div class="sec-heading style-2">
        <span class="sub-title">Latest Insights</span>
        <h2 class="sec-title tj-text-invert">Practical Legal Thinking for Growing Businesses</h2>
      </div>
      <p class="vd-lead">Perspectives from our team on contracts, governance, compliance and the legal side of running and growing a business.</p>
    </div>

    <!-- Lead story + Recommended -->
    <section class="in-top" id="inTop">
      <a class="in-lead in-reveal" href="<?= in_e($lead['url']) ?>">
        <?= in_media($lead, 'in-media--lead') ?>
        <span class="in-cat"><?= in_e($cats[$lead['cat']]) ?> <b>&middot;</b> Featured</span>
        <h2><span><?= in_e($lead['title']) ?></span></h2>
        <p><?= in_e($lead['excerpt']) ?></p>
        <span class="in-foot"><span><?= in_e($lead['type']) ?> <b>&bull;</b> <?= in_e($lead['date']) ?> <b>&bull;</b> <?= in_e($lead['read']) ?></span><?= in_btn('Read article', 'span') ?></span>
      </a>
      <aside class="in-rec in-reveal" data-d=".12" aria-label="Recommended">
        <h3>Recommended</h3>
        <ol>
          <?php foreach ($recommended as $n => $r): ?>
          <li><a href="<?= in_e($r['url']) ?>">
            <span class="in-rec__n"><?= $n + 1 ?></span>
            <span class="in-rec__t"><span class="in-cat"><?= in_e($cats[$r['cat']]) ?></span><strong><?= in_e($r['title']) ?></strong><em><?= in_e($r['type']) ?> <b>&bull;</b> <?= in_e($r['date']) ?></em></span>
          </a></li>
          <?php endforeach; ?>
        </ol>
      </aside>
    </section>

    <!-- All insights heading -->
    <div class="in-sechead in-sechead--grid">
      <div class="sec-heading style-2">
        <span class="sub-title">All Insights</span>
        <h2 class="sec-title tj-text-invert">Explore by Topic and Type</h2>
      </div>
    </div>

    <!-- Filter by -->
    <div class="in-filterbar in-reveal">
      <span class="in-filterlabel">Filter by:</span>
      <div class="in-drops">
        <div class="in-drop" data-key="cat">
          <button class="in-drop__btn" type="button" aria-expanded="false"><span data-label="Topics">Topics</span><i class="fa fa-caret-down"></i></button>
          <div class="in-drop__panel" role="listbox">
            <button type="button" class="is-sel" data-v="all">All topics</button>
            <?php foreach ($cats as $k => $l): ?><button type="button" data-v="<?= $k ?>"><?= in_e($l) ?></button><?php endforeach; ?>
          </div>
        </div>
        <div class="in-drop" data-key="type">
          <button class="in-drop__btn" type="button" aria-expanded="false"><span data-label="Types">Types</span><i class="fa fa-caret-down"></i></button>
          <div class="in-drop__panel" role="listbox">
            <button type="button" class="is-sel" data-v="all">All types</button>
            <?php foreach ($types as $t): ?><button type="button" data-v="<?= in_e($t) ?>"><?= in_e($t) ?></button><?php endforeach; ?>
          </div>
        </div>
        <button class="in-clear" id="inClear" type="button" hidden>Clear all</button>
      </div>
      <div class="in-tools">
        <?= in_btn('Shuffle', 'button', 'id="inShuffle" type="button" aria-label="Shuffle the cards"', 'in-shuffle-btn', 'fa-random') ?>
        <label class="in-search"><i class="fa fa-search"></i>
          <input type="search" id="inSearch" placeholder="Search insights" aria-label="Search insights" />
        </label>
      </div>
    </div>

    <!-- Cards -->
    <div class="in-grid" id="inGrid">
      <?php foreach ($grid as $i => $a) echo in_card($a, $cats, $i); ?>
    </div>
    <p class="in-empty" id="inEmpty">No insights match your search. Try another topic or keyword.</p>

    <!-- CTA -->
    <div class="in-cta in-reveal">
      <span class="in-cta__photo" aria-hidden="true"></span>
      <span class="in-cta__tint" aria-hidden="true"></span>
      <div class="in-cta__glass">
        <div class="sec-heading style-2 text-center">
          <span class="sub-title">Take the Discussion Further</span>
          <h2 class="sec-title tj-text-invert">Explore the Legal Questions Shaping Your Business</h2>
        </div>
        <div class="in-cta__orn" aria-hidden="true"><i></i><b></b><i></i></div>
        <p>Our insights examine legal developments, commercial considerations and emerging issues relevant to business decisions. For a question specific to your organisation, we welcome a direct enquiry.</p>
        <?= in_btn('Get in Touch', 'a', 'href="contact.php"', 'white-btn') ?>
      </div>
    </div>

  </div>
</div>
</main>

  <?php include 'footer.php' ?>

  <script src="assets/js/insights.js?v=<?= filemtime('assets/js/insights.js') ?>"></script>
</body>
</html>