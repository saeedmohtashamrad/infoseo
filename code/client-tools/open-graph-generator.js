TK.tool(function (v) {
  var S = TK.S;
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  if (!/^https?:\/\//i.test(v.url.trim())) throw new Error('آدرس صفحه باید با http:// یا https:// شروع شود.');
  if (v.image.trim() && !/^https?:\/\//i.test(v.image.trim())) throw new Error('آدرس تصویر باید کامل (با https://) باشد.');
  var l = ['<meta property="og:type" content="' + v.type + '">', '<meta property="og:title" content="' + esc(v.title.trim()) + '">'];
  if (v.desc.trim()) l.push('<meta property="og:description" content="' + esc(v.desc.trim().replace(/\s+/g, ' ')) + '">');
  l.push('<meta property="og:url" content="' + esc(v.url.trim()) + '">');
  if (v.site.trim()) l.push('<meta property="og:site_name" content="' + esc(v.site.trim()) + '">');
  l.push('<meta property="og:locale" content="' + v.locale + '">');
  if (v.image.trim()) l.push('<meta property="og:image" content="' + esc(v.image.trim()) + '">');
  l.push('<meta name="twitter:card" content="' + (v.image.trim() ? 'summary_large_image' : 'summary') + '">', '<meta name="twitter:title" content="' + esc(v.title.trim()) + '">');
  if (v.desc.trim()) l.push('<meta name="twitter:description" content="' + esc(v.desc.trim().replace(/\s+/g, ' ')) + '">');
  if (v.image.trim()) l.push('<meta name="twitter:image" content="' + esc(v.image.trim()) + '">');
  var out = [S.code('کد Open Graph و Twitter Card', l.join('\n'), 'html')];
  if (!v.image.trim()) out.push(S.alert('warn', 'بدون og:image، لینک شما در شبکه‌های اجتماعی بدون تصویر نمایش داده می‌شود.'));
  if (Array.from(v.title.trim()).length > 70) out.push(S.alert('warn', 'عنوان بلند است و در برخی پلتفرم‌ها بریده می‌شود.'));
  return out;
});
