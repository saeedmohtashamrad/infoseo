TK.tool(function (v) {
  var S = TK.S, seen = {}, ok = [], bad = [];
  v.urls.split(/\r?\n/).map(function (x) { return x.trim(); }).filter(Boolean).forEach(function (u) {
    try { var o = new URL(u); if (!/^https?:$/.test(o.protocol)) throw 0; if (!seen[o.href]) { seen[o.href] = 1; ok.push(o.href); } } catch (e) { bad.push(u); }
  });
  if (!ok.length) throw new Error('هیچ آدرس معتبری پیدا نشد.');
  if (ok.length > 5000) throw new Error('حداکثر ۵۰۰۰ آدرس مجاز است.');
  var today = new Date().toISOString().slice(0, 10);
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;'); }
  var x = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
  ok.forEach(function (u) {
    var r = '  <url><loc>' + esc(u) + '</loc>';
    if (v.lastmod) r += '<lastmod>' + today + '</lastmod>';
    if (v.freq) r += '<changefreq>' + v.freq + '</changefreq>';
    if (v.prio) r += '<priority>' + v.prio + '</priority>';
    x.push(r + '</url>');
  });
  x.push('</urlset>');
  var xml = x.join('\n') + '\n';
  var hosts = {}; ok.forEach(function (u) { hosts[new URL(u).host] = 1; });
  var out = [S.summary([['آدرس معتبر', TK.nf(ok.length, 0), 'good'], ['نامعتبر / نادیده', TK.nf(bad.length, 0), bad.length ? 'warn' : 'good'], ['دامنه‌ها', TK.nf(Object.keys(hosts).length, 0)]])];
  if (Object.keys(hosts).length > 1) out.push(S.alert('warn', 'آدرس‌ها متعلق به چند دامنه‌اند؛ هر sitemap باید فقط شامل یک دامنه باشد.'));
  if (bad.length) out.push(S.list('آدرس‌های نادیده‌گرفته‌شده', bad.slice(0, 20)));
  out.push(S.code('sitemap.xml', xml.length > 60000 ? xml.slice(0, 60000) + '\n… (برای دیدن همه، فایل را دانلود کنید)' : xml, 'xml'), S.download('دانلود sitemap.xml', 'sitemap.xml', 'application/xml', xml));
  return out;
});
