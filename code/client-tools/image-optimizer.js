(function () {
  var qv = document.getElementById('f-qv'), q = document.getElementById('f-q');
  if (q) q.addEventListener('input', function () { qv.textContent = q.value; });
  function load(file) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), im = new Image();
      im.onload = function () { URL.revokeObjectURL(url); res(im); };
      im.onerror = function () { URL.revokeObjectURL(url); rej(new Error('تصویر «' + file.name + '» خوانده نشد.')); };
      im.src = url;
    });
  }
  function toBlob(c, type, qual) { return new Promise(function (res) { c.toBlob(res, type, qual); }); }
  var EXT = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' };
  TK.tool(function (v) {
    var files = Array.from(v.files || []);
    if (!files.length) throw new Error('حداقل یک تصویر انتخاب کنید.');
    if (files.length > 20) throw new Error('حداکثر ۲۰ فایل در هر بار.');
    var maxw = Math.max(64, Math.min(8000, v.maxw | 0 || 1600)), qual = (v.q || 80) / 100, fmt = v.fmt;
    var res = TK.h('div', { class: 'res' }), rows = [];
    return files.reduce(function (p, f) {
      return p.then(function () {
        if (f.size > 25 * 1024 * 1024) throw new Error('«' + f.name + '» بزرگ‌تر از ۲۵ مگابایت است.');
        return load(f).then(function (im) {
          var w = im.naturalWidth, h = im.naturalHeight, sc = Math.min(1, maxw / w), cw = Math.round(w * sc), ch = Math.round(h * sc);
          var c = document.createElement('canvas'); c.width = cw; c.height = ch; var g = c.getContext('2d');
          if (fmt === 'image/jpeg') { g.fillStyle = '#fff'; g.fillRect(0, 0, cw, ch); }
          g.imageSmoothingQuality = 'high'; g.drawImage(im, 0, 0, cw, ch);
          return toBlob(c, fmt, qual).then(function (b) {
            if (!b) throw new Error('مرورگر شما از این فرمت خروجی پشتیبانی نمی‌کند.');
            var url = URL.createObjectURL(b), name = f.name.replace(/\.[^.]+$/, '') + '-opt.' + EXT[fmt];
            var pct = (f.size - b.size) / f.size * 100;
            var a = TK.h('a', { class: 'btn btn--sm btn--primary', href: url, download: name, text: 'دانلود' });
            rows.push(TK.h('div', { class: 'check check--' + (pct > 0 ? 'pass' : 'warn') }, [TK.h('img', { src: url, alt: '', width: 56, height: 56, style: 'object-fit:cover;border-radius:8px;flex:none' }), TK.h('div', { style: 'flex:1;min-width:0' }, [TK.h('strong', { text: f.name, style: 'overflow-wrap:anywhere' }), TK.h('small', { text: TK.nf(f.size / 1024, 1) + ' → ' + TK.nf(b.size / 1024, 1) + ' کیلوبایت (' + (pct > 0 ? '−' : '+') + TK.nf(Math.abs(pct), 0) + '٪) · ' + w + '×' + h + ' → ' + cw + '×' + ch })]), a]));
          });
        });
      });
    }, Promise.resolve()).then(function () {
      res.appendChild(TK.h('h3', { class: 'res-t', text: 'نتیجه' })); rows.forEach(function (r) { res.appendChild(r); });
      var out = document.querySelector('.tool-out'); out.replaceChildren(res); out.setAttribute('aria-busy', 'false'); return null;
    });
  });
})();
