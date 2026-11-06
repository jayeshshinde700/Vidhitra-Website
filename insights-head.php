<?php /* shared <head> for insights.php + article.php. Expects: $page_title, $page_desc, $page_canonical, optional $page_og_image */ ?>
<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="<?= in_e($page_desc) ?>" />
  <meta name="author" content="Vidhitra Corporate Advisors LLP" />
  <meta name="robots" content="index, follow" />
  <title><?= in_e($page_title) ?></title>
  <link rel="canonical" href="<?= in_e($page_canonical) ?>" />
  <meta property="og:title" content="<?= in_e($page_title) ?>" />
  <meta property="og:description" content="<?= in_e($page_desc) ?>" />
  <?php if (!empty($page_og_image)): ?><meta property="og:image" content="https://www.vidhitra.com/<?= in_e($page_og_image) ?>" /><?php endif; ?>
  <meta name="theme-color" content="#005c59" />
  <link rel="icon" type="image/x-icon" href="assets/images/vidhitra/logo.webp" />

  <!-- Google Fonts: Barlow Condensed, DM Serif Display & Libre Franklin -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Serif+Display:ital@0;1&family=Libre+Franklin:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">

  <!-- CSS here -->
  <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/css/font-awesome-pro.min.css" />
  <link rel="stylesheet" href="assets/css/animate.css" />
  <link rel="stylesheet" href="assets/css/solvior-icons.css" />
  <link rel="stylesheet" href="assets/css/swiper.min.css" />
  <link rel="stylesheet" href="assets/css/odometer-theme-default.css" />
  <link rel="stylesheet" href="assets/css/nice-select.css" />
  <link rel="stylesheet" href="assets/css/venobox.min.css" />
  <link rel="stylesheet" href="assets/css/meanmenu.css" />
  <link rel="stylesheet" href="assets/css/main.css?v=<?= filemtime('assets/css/main.css') ?>" />
  <link rel="stylesheet" href="assets/css/insights.css?v=<?= filemtime('assets/css/insights.css') ?>" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
  <div class="mouseCursor cursor-outer"></div>
  <div class="mouseCursor cursor-inner"><span><i class="tji-angle-left"></i>Drag<i class="tji-angle-right"></i></span>
  </div>

  <?php include 'header.php' ?>
