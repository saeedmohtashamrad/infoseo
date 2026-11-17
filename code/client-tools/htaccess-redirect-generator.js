TK.tool(function (v) {
  var S = TK.S, c = v.code, o = [];
  function host(u) { var m = String(u).trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, ''); return m; }
  function esc(h) { return h.replace(/\./g, '\\.'); }
  if (v.type === 'https') o.push('RewriteEngine On', 'RewriteCond %{HTTPS} off', 'RewriteCond %{HTTP:X-Forwarded-Proto} !https', 'RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [L,R=' + c + ']');
  else if (v.type === 'nonwww') o.push('RewriteEngine On', 'RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]', 'RewriteRule ^(.*)$ https://%1/$1 [L,R=' + c + ']');
  else if (v.type === 'www') o.push('RewriteEngine On', 'RewriteCond %{HTTP_HOST} !^www\\. [NC]', 'RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [L,R=' + c + ']');
  else if (v.type === 'slash') o.push('RewriteEngine On', 'RewriteCond %{REQUEST_FILENAME} !-d', 'RewriteRule ^(.+)/$ /$1 [L,R=' + c + ']');
  else if (v.type === 'page') {
    var f = v.from.trim(), t = v.to.trim();
    if (!f || f[0] !== '/' || /\s/.test(f)) throw new Error('آدرس قدیمی باید با / شروع شود و فاصله نداشته باشد (مثل /old-page).');
    if (!t || !(/^https?:\/\//i.test(t) || t[0] === '/') || /\s/.test(t)) throw new Error('آدرس جدید باید کامل (https://…) یا مسیر (با /) باشد و فاصله نداشته باشد.');
    o.push('Redirect ' + c + ' ' + f + ' ' + t);
  } else if (v.type === 'domain') {
    var h = host(v.to); if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(h)) throw new Error('دامنه‌ی جدید را درست وارد کنید (مثل new-site.com).');
    o.push('RewriteEngine On', 'RewriteRule ^(.*)$ https://' + h + '/$1 [L,R=' + c + ']');
  }
  var txt = '# --- شروع قانون ریدایرکت ---\n' + o.join('\n') + '\n# --- پایان ---\n';
  return [S.code('کد .htaccess', txt, 'apache'), S.alert('warn', 'قبل از ذخیره از فایل .htaccess پشتیبان بگیرید و پس از اعمال، رفتار را تست کنید. این قوانین روی Apache و LiteSpeed کار می‌کنند، نه Nginx.')];
});
