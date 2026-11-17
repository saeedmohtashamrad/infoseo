(function () {
  var SIZES = [16, 32, 48, 180, 192, 512];
  function toBlob(c) { return new Promise(function (r) { c.toBlob(r, 'image/png'); }); }
  function ico(pngs) { // PNG-in-ICO, sizes 16/32/48
    var n = pngs.length, head = 6 + 16 * n, off = head, buf = [];
    var hdr = new DataView(new ArrayBuffer(head)); hdr.setUint16(2, 1, true); hdr.setUint16(4, n, true);
    pngs.forEach(function (p, i) { var o = 6 + 16 * i; hdr.setUint8(o, p.s === 256 ? 0 : p.s); hdr.setUint8(o + 1, p.s === 256 ? 0 : p.s); hdr.setUint16(o + 4, 1, true); hdr.setUint16(o + 6, 32, true); hdr.setUint32(o + 8, p.buf.byteLength, true); hdr.setUint32(o + 12, off, true); off += p.buf.byteLength; });
    buf.push(hdr.buffer); pngs.forEach(function (p) { buf.push(p.buf); });
    return new Blob(buf, { type: 'image/x-icon' });
  }
  TK.tool(function (v) {
    var f = v.img && v.img[0]; if (!f) throw new Error('یک تصویر انتخاب کنید.');
    if (f.size > 15 * 1024 * 1024) throw new Error('حداکثر حجم تصویر ۱۵ مگابایت است.');
    var url = URL.createObjectURL(f);
    return new Promise(function (res, rej) { var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { rej(new Error('تصویر خوانده نشد.')); }; im.src = url; }).then(function (im) {
      URL.revokeObjectURL(url);
      var side = Math.min(im.naturalWidth, im.naturalHeight), sx = (im.naturalWidth - side) / 2, sy = (im.naturalHeight - side) / 2, outs = [];
      return SIZES.reduce(function (p, s) {
        return p.then(function () {
          var c = document.createElement('canvas'); c.width = c.height = s; var g = c.getContext('2d');
          if (v.bg !== 'transparent') { g.fillStyle = v.bg; g.fillRect(0, 0, s, s); }
          g.imageSmoothingQuality = 'high'; g.drawImage(im, sx, sy, side, side, 0, 0, s, s);
          return toBlob(c).then(function (b) { return b.arrayBuffer().then(function (buf) { outs.push({ s: s, blob: b, buf: buf }); }); });
        });
      }, Promise.resolve()).then(function () {
        var icoBlob = ico(outs.filter(function (o) { return o.s <= 48; }));
        var res = TK.h('div', { class: 'res' });
        var grid = TK.h('div', { style: 'display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px' });
        function dl(name, blob, label) { var u = URL.createObjectURL(blob); return TK.h('div', { class: 'kpi' }, [TK.h('a', { href: u, download: name, class: 'btn btn--sm btn--ghost', text: label || name, style: 'width:100%' })]); }
        outs.forEach(function (o) {
          var u = URL.createObjectURL(o.blob);
          grid.appendChild(TK.h('div', { class: 'kpi', style: 'text-align:center' }, [TK.h('img', { src: u, alt: 'آیکن ' + o.s, width: Math.min(o.s, 64), height: Math.min(o.s, 64), style: 'background:repeating-conic-gradient(#e2e8f0 0 25%,#fff 0 50%) 50%/12px 12px;margin:0 auto 6px;display:block' }), TK.h('a', { href: u, download: 'favicon-' + o.s + '.png', class: 'btn btn--sm btn--ghost', text: o.s + '×' + o.s, style: 'width:100%' })]));
        });
        grid.appendChild(dl('favicon.ico', icoBlob, 'favicon.ico'));
        res.appendChild(TK.h('h3', { class: 'res-t', text: 'آیکن‌های ساخته‌شده' })); res.appendChild(grid);
        var html = '<link rel="icon" href="/favicon.ico" sizes="48x48">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">\n<link rel="apple-touch-icon" href="/favicon-180.png">\n<link rel="manifest" href="/site.webmanifest">';
        var man = JSON.stringify({ name: 'نام سایت', short_name: 'سایت', icons: [{ src: '/favicon-192.png', sizes: '192x192', type: 'image/png' }, { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' }], theme_color: '#6366f1', background_color: '#ffffff', display: 'standalone' }, null, 2);
        [['کد HTML برای head', html], ['فایل site.webmanifest', man]].forEach(function (c) { res.appendChild(TK.R.code({ title: c[0], text: c[1] })); });
        var out = document.querySelector('.tool-out'); out.replaceChildren(res); out.setAttribute('aria-busy', 'false'); return null;
      });
    });
  });
})();
