TK.tool(function (v) {
  var S = TK.S;
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  var lines = ['<meta charset="utf-8">', '<meta name="viewport" content="width=device-width, initial-scale=1">', '<title>' + esc(v.title.trim()) + '</title>'];
  if (v.desc.trim()) lines.push('<meta name="description" content="' + esc(v.desc.trim().replace(/\s+/g, ' ')) + '">');
  if (v.robots) lines.push('<meta name="robots" content="' + esc(v.robots) + '">');
  if (v.author.trim()) lines.push('<meta name="author" content="' + esc(v.author.trim()) + '">');
  var u = v.url.trim();
  if (u) { if (!/^https?:\/\//i.test(u)) throw new Error('آدرس کانونیکال باید با http:// یا https:// شروع شود.'); lines.push('<link rel="canonical" href="' + esc(u) + '">'); }
  var html = '<html lang="' + v.lang + '" dir="' + (v.lang === 'en' ? 'ltr' : 'rtl') + '">';
  var tl = Array.from(v.title.trim()).length, dl = Array.from(v.desc.trim()).length;
  var host = ''; try { host = u ? new URL(u).hostname : 'example.com'; } catch (e) { host = 'example.com'; }
  var prev = TK.h('div', { class: 'preview-card', dir: v.lang === 'en' ? 'ltr' : 'rtl', style: 'padding:14px;border:1px solid var(--line);border-radius:12px;max-width:600px;background:#fff' }, [
    TK.h('div', { text: host, dir: 'ltr', style: 'font-size:13px;color:#475569' }),
    TK.h('div', { text: v.title.trim().slice(0, 60) + (tl > 60 ? '…' : ''), style: 'font-size:19px;color:#1a0dab;margin:2px 0' }),
    TK.h('div', { text: v.desc.trim().slice(0, 160) + (dl > 160 ? '…' : ''), style: 'font-size:14px;color:#334155' })]);
  var out = [
    S.summary([['طول عنوان', TK.nf(tl, 0) + ' کاراکتر', tl >= 30 && tl <= 60 ? 'good' : 'warn'], ['طول توضیحات', dl ? TK.nf(dl, 0) + ' کاراکتر' : 'ندارد', dl >= 120 && dl <= 160 ? 'good' : 'warn']]),
    S.code('کد متا تگ‌ها', lines.join('\n'), 'html'),
    S.code('تگ html پیشنهادی', html, 'html')
  ];
  if (tl > 60) out.push(S.alert('warn', 'عنوان بلندتر از حدود ۶۰ کاراکتر است و ممکن است در نتایج گوگل بریده شود.'));
  if (dl === 0) out.push(S.alert('warn', 'توضیحات متا خالی است؛ گوگل خودش متنی انتخاب خواهد کرد.'));
  else if (dl > 160) out.push(S.alert('warn', 'توضیحات بلندتر از ۱۶۰ کاراکتر است و ممکن است بریده شود.'));
  window.__previewNode = prev;
  setTimeout(function () { var o = document.querySelector('.tool-out .res'); if (o) { var w = TK.h('div'); w.appendChild(TK.h('h3', { class: 'res-t', text: 'پیش‌نمایش تقریبی در گوگل' })); w.appendChild(prev); o.insertBefore(w, o.children[1]); } }, 0);
  return out;
});
