(function () {
  function run(v) {
    var c = IXColor.parse(v.c), hsl = IXColor.hsl(c), hex = IXColor.hex(c);
    function pal(title, arr) {
      var row = TK.h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fit,minmax(64px,1fr));gap:8px' });
      arr.forEach(function (h) {
        var b = TK.h('button', { type: 'button', class: 'swatch', style: 'height:64px;cursor:pointer;background:' + h + ';font:12px ui-monospace,monospace;color:' + (IXColor.contrast(IXColor.parse(h), { r: 255, g: 255, b: 255 }) > 3 ? '#fff' : '#000'), 'aria-label': 'کپی ' + h, text: h });
        b.addEventListener('click', function () { TK.copy(h, null); b.textContent = 'کپی شد'; setTimeout(function () { b.textContent = h; }, 900); });
        row.appendChild(b);
      });
      return TK.h('div', null, [TK.h('h3', { class: 'res-t', text: title }), row]);
    }
    function hs(d) { return IXColor.hex(IXColor.fromHsl(hsl.h + d, hsl.s, hsl.l)); }
    var shades = [92, 80, 65, 50, 35, 22, 12].map(function (l) { return IXColor.hex(IXColor.fromHsl(hsl.h, hsl.s, l)); });
    var w = { r: 255, g: 255, b: 255 }, k = { r: 0, g: 0, b: 0 }, cw = IXColor.contrast(c, w), ck = IXColor.contrast(c, k);
    var res = TK.h('div', { class: 'res' }, [
      TK.h('div', { class: 'swatch', style: 'background:' + hex }),
      TK.R.kv({ title: 'کد رنگ', rows: [['HEX', hex], ['RGB', Math.round(c.r) + ', ' + Math.round(c.g) + ', ' + Math.round(c.b)], ['HSL', Math.round(hsl.h) + ', ' + Math.round(hsl.s) + '%, ' + Math.round(hsl.l) + '%']] }),
      TK.R.summary({ items: [{ label: 'متن سفید روی این رنگ', value: cw.toFixed(2) + ' : 1 — ' + (cw >= 4.5 ? 'AA ✓' : cw >= 3 ? 'فقط متن درشت' : 'ناکافی'), status: cw >= 4.5 ? 'good' : cw >= 3 ? 'warn' : 'bad' }, { label: 'متن سیاه روی این رنگ', value: ck.toFixed(2) + ' : 1 — ' + (ck >= 4.5 ? 'AA ✓' : ck >= 3 ? 'فقط متن درشت' : 'ناکافی'), status: ck >= 4.5 ? 'good' : ck >= 3 ? 'warn' : 'bad' }] }),
      pal('طیف روشن تا تیره', shades), pal('مکمل', [hex, hs(180)]), pal('مشابه', [hs(-30), hex, hs(30)]), pal('سه‌گانه', [hex, hs(120), hs(240)])
    ]);
    var out = document.querySelector('.tool-out'); out.replaceChildren(res);
  }
  function go() { var f = document.querySelector('#tool form'); if (!f) return; var i = f.querySelector('[name=c]'); i.addEventListener('input', function () { run({ c: i.value }); }); f.addEventListener('submit', function (e) { e.preventDefault(); run({ c: i.value }); }); run({ c: i.value }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
