<?php
/**
 * Vidhitra contact form handler.
 *
 * 1. Every valid enquiry is SAVED first in /enquiries/enquiries.log (works on localhost too).
 * 2. Then an email is sent to $to:
 *      - if $smtp['host'] is filled  -> through that SMTP server (use this on XAMPP / localhost)
 *      - otherwise                   -> PHP mail() (works on most live hosting)
 * The visitor sees "success" when the enquiry was saved or emailed.
 */

/* ================= SETTINGS ================= */
$to   = 'info@vidhitra.com';              // where enquiries are delivered
$from = 'no-reply@vidhitra.com';          // used with mail(); must be an address on your own domain

$smtp = [
    'host'   => '',                       // e.g. 'smtp.gmail.com'  (leave '' to use mail())
    'port'   => 587,                      // 587 = TLS, 465 = SSL
    'secure' => 'tls',                    // 'tls' or 'ssl'
    'user'   => '',                       // e.g. 'yourname@gmail.com'
    'pass'   => '',                       // Gmail: use an "App password", not your normal password
];
/* ============================================= */

ini_set('display_errors', '0');
ob_start();

$isAjax = (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest')
       || (isset($_SERVER['HTTP_ACCEPT']) && strpos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

function respond($ok, $error, $isAjax, $extra = []) {
    while (ob_get_level() > 0) { ob_end_clean(); }   // drop any stray warnings so the JSON stays valid
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(array_merge($ok ? ['ok' => true] : ['ok' => false, 'error' => $error], $extra));
    } else {
        header('Location: contact.php' . ($ok ? '?sent=1' : '?error=1') . '#get-in-touch');
    }
    exit;
}

function clean($v) { return trim(preg_replace('/[\r\n]+/', ' ', strip_tags((string)$v))); }

/** Minimal SMTP client (STARTTLS / SSL + AUTH LOGIN). Returns true or an error string. */
function smtp_send($cfg, $to, $subject, $body, $fromEmail, $fromName, $replyEmail, $replyName) {
    $prefix = ($cfg['secure'] === 'ssl') ? 'ssl://' : '';
    $ctx = stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]]); // XAMPP often lacks a CA bundle
    $fp = @stream_socket_client($prefix . $cfg['host'] . ':' . $cfg['port'], $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) return "SMTP connect failed: $errstr ($errno)";
    stream_set_timeout($fp, 15);

    $read = function () use ($fp) {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            if (isset($line[3]) && $line[3] === ' ') break;
        }
        return $data;
    };
    $cmd = function ($c, $expect) use ($fp, $read) {
        fwrite($fp, $c . "\r\n");
        $r = $read();
        return (substr($r, 0, 3) === (string)$expect) ? true : trim($r);
    };

    $r = $read();
    if (substr($r, 0, 3) !== '220') { fclose($fp); return 'SMTP greeting: ' . trim($r); }

    $r = $cmd('EHLO localhost', 250);
    if ($r !== true) { fclose($fp); return 'EHLO: ' . $r; }

    if ($cfg['secure'] === 'tls') {
        $r = $cmd('STARTTLS', 220);
        if ($r !== true) { fclose($fp); return 'STARTTLS: ' . $r; }
        if (!@stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) { fclose($fp); return 'TLS handshake failed'; }
        $r = $cmd('EHLO localhost', 250);
        if ($r !== true) { fclose($fp); return 'EHLO(2): ' . $r; }
    }

    if ($cfg['user'] !== '') {
        if (($r = $cmd('AUTH LOGIN', 334)) !== true) { fclose($fp); return 'AUTH: ' . $r; }
        if (($r = $cmd(base64_encode($cfg['user']), 334)) !== true) { fclose($fp); return 'AUTH user: ' . $r; }
        if (($r = $cmd(base64_encode($cfg['pass']), 235)) !== true) { fclose($fp); return 'AUTH failed (check user / app password): ' . $r; }
    }

    if (($r = $cmd('MAIL FROM:<' . $fromEmail . '>', 250)) !== true) { fclose($fp); return 'MAIL FROM: ' . $r; }
    if (($r = $cmd('RCPT TO:<' . $to . '>', 250)) !== true) { fclose($fp); return 'RCPT TO: ' . $r; }
    if (($r = $cmd('DATA', 354)) !== true) { fclose($fp); return 'DATA: ' . $r; }

    $headers = "Date: " . date('r') . "\r\n"
        . "From: " . $fromName . " <" . $fromEmail . ">\r\n"
        . "To: <" . $to . ">\r\n"
        . "Reply-To: " . $replyName . " <" . $replyEmail . ">\r\n"
        . "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n"
        . "Message-ID: <" . uniqid('vd', true) . "@vidhitra.com>\r\n"
        . "MIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n";

    $body = preg_replace("/\r\n|\r|\n/", "\r\n", $body);
    $body = preg_replace('/^\./m', '..', $body);                      // dot-stuffing
    fwrite($fp, $headers . "\r\n" . $body . "\r\n.\r\n");
    $r = $read();
    $cmd('QUIT', 221);
    fclose($fp);
    return (substr($r, 0, 3) === '250') ? true : 'Send: ' . trim($r);
}

/* ---------- validate ---------- */
if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(false, 'Invalid request', $isAjax);
if (!empty($_POST['company_website'])) respond(true, '', $isAjax);          // honeypot: pretend success to bots

$name  = clean($_POST['full_name'] ?? '');
$org   = clean($_POST['organisation'] ?? '');
$email = clean($_POST['email'] ?? '');
$phone = clean($_POST['phone'] ?? '');
$topic = clean($_POST['topic'] ?? '');
$msg   = trim(strip_tags($_POST['message'] ?? ''));
$agree = !empty($_POST['consent']);

if ($name === '' || $org === '' || $topic === '' || $msg === '' || !$agree || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Please fill all required fields', $isAjax);
}

/* ---------- 1. save the enquiry (always) ---------- */
$saved = false;
$dir = __DIR__ . '/enquiries';
if (!is_dir($dir)) { @mkdir($dir, 0755, true); }
if (is_dir($dir)) {
    if (!file_exists($dir . '/.htaccess')) {
        @file_put_contents($dir . '/.htaccess', "<IfModule mod_authz_core.c>\nRequire all denied\n</IfModule>\n<IfModule !mod_authz_core.c>\nDeny from all\n</IfModule>\n");
    }
    $row = json_encode([
        'time' => date('Y-m-d H:i:s'), 'name' => $name, 'organisation' => $org, 'email' => $email,
        'phone' => $phone, 'topic' => $topic, 'message' => $msg, 'ip' => $_SERVER['REMOTE_ADDR'] ?? '',
    ], JSON_UNESCAPED_UNICODE) . "\n";
    $saved = @file_put_contents($dir . '/enquiries.log', $row, FILE_APPEND | LOCK_EX) !== false;
}

/* ---------- 2. email it ---------- */
$subject = 'Website enquiry: ' . $topic . ' - ' . $name;
$body = "New enquiry from the Vidhitra website\n\n"
      . "Name: $name\nOrganisation: $org\nEmail: $email\nPhone: " . ($phone ?: '-') . "\nHow can we help: $topic\n\n"
      . "Message:\n$msg\n\n"
      . "Consent given: yes\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? '-') . "\nTime: " . date('d M Y, H:i:s') . "\n";

$mailed = false;
$mailError = '';
if ($smtp['host'] !== '') {
    $sender = $smtp['user'] !== '' ? $smtp['user'] : $from;       // Gmail etc. require From = login address
    $r = smtp_send($smtp, $to, $subject, $body, $sender, 'Vidhitra Website', $email, $name);
    $mailed = ($r === true);
    if (!$mailed) $mailError = (string)$r;
} else {
    $headers = "From: Vidhitra Website <$from>\r\nReply-To: $name <$email>\r\nContent-Type: text/plain; charset=UTF-8\r\n";
    $mailed = @mail($to, $subject, $body, $headers);
    if (!$mailed) $mailError = 'mail() is not configured on this server';
}
if (!$mailed && $mailError !== '') { error_log('[vidhitra contact] ' . $mailError); }

if ($saved || $mailed) {
    respond(true, '', $isAjax, ['mailed' => $mailed, 'saved' => $saved]);
}
respond(false, 'Could not save or send the enquiry', $isAjax);
