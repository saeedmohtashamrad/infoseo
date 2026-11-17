TK.tool(function (v) {
  var S = TK.S, L = [];
  if (v.preset === 'block') { L.push('User-agent: *', 'Disallow: /'); }
  else {
    L.push('User-agent: *');
    if (v.preset === 'wp') L.push('Disallow: /wp-admin/', 'Allow: /wp-admin/admin-ajax.php', 'Disallow: /wp-login.php', 'Disallow: /?s=', 'Disallow: /search/');
    var extra = v.disallow.split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean);
    var bad = extra.filter(function (x) { return x[0] !== '/' && x[0] !== '*'; });
    if (bad.length) throw new Error('مسیرها باید با / شروع شوند: ' + bad.join('، '));
    extra.forEach(function (p) { L.push('Disallow: ' + p); });
    if (v.preset === 'allow' && !extra.length) L.push('Disallow:');
    if (v.delay) L.push('Crawl-delay: ' + Math.round(v.delay));
  }
  var out = [];
  if (v.sitemap.trim()) {
    if (!/^https?:\/\//i.test(v.sitemap.trim())) throw new Error('آدرس Sitemap باید کامل باشد.');
    L.push('', 'Sitemap: ' + v.sitemap.trim());
  }
  var txt = L.join('\n') + '\n';
  out.push(S.code('محتوای robots.txt', txt, 'text'), S.download('دانلود robots.txt', 'robots.txt', 'text/plain', txt));
  if (v.preset === 'block') out.unshift(S.alert('error', 'این تنظیم کل سایت را برای ربات‌ها مسدود می‌کند؛ روی سایت زنده استفاده نکنید.'));
  if (v.delay) out.push(S.alert('info', 'Googlebot دستور Crawl-delay را نادیده می‌گیرد.'));
  return out;
});
