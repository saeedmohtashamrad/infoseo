(function () {
  function wifiEsc(s) { return s.replace(/([\;,:"])/g, '\\$1'); }
  TK.tool(function (v) {
    if (typeof qrcode === 'undefined') throw new Error('کتابخانه‌ی QR بارگذاری نشد؛ صفحه را دوباره باز کنید.');
    var text = v.text.trim(); if (!text) throw new Error('محتوا را وارد کنید.');
    var data = text;
    if (v.type === 'wifi') data = 'WIFI:T:' + (v.enc === 'nopass' ? 'nopass' : v.enc) + ';S:' + wifiEsc(text) + ';' + (v.enc !== 'nopass' ? 'P:' + wifiEsc(v.pass || '') + ';' : '') + ';';
    else if (v.type === 'email') { if (!/^\S+@\S+\.\S+$/.test(text)) throw new Error('ایمیل معتبر وارد کنید.'); data = 'mailto:' + text; }
    else if (v.type === 'tel') { if (!/^\+?[\d\s()-]{5,20}$/.test(text)) throw new Error('شماره‌ی تلفن معتبر وارد کنید.'); data = 'tel:' + text.replace(/[\s()-]/g, ''); }
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];
    var qr = qrcode(0, v.ecc); qr.addData(data); try { qr.make(); } catch (e) { throw new Error('محتوا برای یک QR کد بیش از حد طولانی است.'); }
    var n = qr.getModuleCount(), quiet = 4, tot = n + quiet * 2, size = +v.size || 512, cell = Math.max(1, Math.floor(size / tot)), px = cell * tot;
    var c = document.createElement('canvas'); c.width = c.height = px; var g = c.getContext('2d');
    g.fillStyle = v.bg; g.fillRect(0, 0, px, px); g.fillStyle = v.fg;
    var path = '';
    for (var r = 0; r < n; r++) for (var k = 0; k < n; k++) if (qr.isDark(r, k)) { g.fillRect((k + quiet) * cell, (r + quiet) * cell, cell, cell); path += 'M' + (k + quiet) + ' ' + (r + quiet) + 'h1v1h-1z'; }
    var png = c.toDataURL('image/png');
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + tot + ' ' + tot + '" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="' + v.bg + '"/><path fill="' + v.fg + '" d="' + path + '"/></svg>';
    var cr = (function () { var a = IXlum(v.fg), b = IXlum(v.bg); return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); })();
    var out = [TK.S.summary([['ابعاد ماتریس', n + '×' + n], ['اندازه‌ی تصویر', px + ' پیکسل'], ['کنتراست رنگ‌ها', TK.nf(cr, 1) + ' : 1', cr >= 4 ? 'good' : 'warn']]), { type: 'image', src: png, alt: 'QR کد ساخته‌شده', title: 'QR کد' }];
    if (cr < 4) out.push(TK.S.alert('warn', 'کنتراست رنگ‌ها کم است؛ ممکن است QR با گوشی خوانده نشود. QR تیره روی زمینه‌ی روشن بهتر است.'));
    if (v.fg.toLowerCase() > v.bg.toLowerCase() && IXlum(v.fg) > IXlum(v.bg)) out.push(TK.S.alert('info', 'QR معکوس (روشن روی تیره) در برخی اسکنرها خوانده نمی‌شود.'));
    out.push(TK.S.download('دانلود SVG', 'qrcode.svg', 'image/svg+xml', svg));
    setTimeout(function () { var o = document.querySelector('.tool-out .res'); if (!o) return; var a = TK.h('a', { class: 'btn btn--ghost', href: png, download: 'qrcode.png' }, [TK.icon('download', 18), ' دانلود PNG']); o.appendChild(a); }, 0);
    return out;
  });
  function IXlum(hex) { var m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex); if (!m) return 0; var f = function (x) { x = parseInt(x, 16) / 255; return x <= .03928 ? x / 12.92 : Math.pow((x + .055) / 1.055, 2.4); }; return .2126 * f(m[1]) + .7152 * f(m[2]) + .0722 * f(m[3]); }
})();
