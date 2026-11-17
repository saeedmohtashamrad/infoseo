TK.tool(function (v) {
  var c = IXColor.parse(v.c); if (!c) throw new Error('این مقدار رنگ معتبر نیست؛ نمونه: #6366f1 یا rgb(99,102,241)');
  var hsl = IXColor.hsl(c), r = Math.round(c.r) / 255, g = Math.round(c.g) / 255, b = Math.round(c.b) / 255, k = 1 - Math.max(r, g, b);
  var cm = k === 1 ? [0, 0, 0, 100] : [(1 - r - k) / (1 - k) * 100, (1 - g - k) / (1 - k) * 100, (1 - b - k) / (1 - k) * 100, k * 100];
  var hex = IXColor.hex(c);
  var sw = TK.h('div', { class: 'swatch', style: 'background:' + hex + ';max-width:240px', role: 'img', 'aria-label': 'نمونه رنگ ' + hex });
  setTimeout(function () { var o = document.querySelector('.tool-out .res'); if (o) o.insertBefore(sw, o.firstChild); }, 0);
  return [TK.S.kv('معادل‌ها', [['HEX', hex], ['RGB', 'rgb(' + Math.round(c.r) + ', ' + Math.round(c.g) + ', ' + Math.round(c.b) + (c.a < 1 ? ', ' + c.a : '') + ')'], ['HSL', 'hsl(' + Math.round(hsl.h) + ', ' + Math.round(hsl.s) + '%, ' + Math.round(hsl.l) + '%)'], ['CMYK (تقریبی)', cm.map(function (x) { return Math.round(x) + '%'; }).join(', ')]]), TK.S.summary([['کنتراست با سفید', IXColor.contrast(c, { r: 255, g: 255, b: 255 }).toFixed(2) + ' : 1'], ['کنتراست با سیاه', IXColor.contrast(c, { r: 0, g: 0, b: 0 }).toFixed(2) + ' : 1']])];
});
