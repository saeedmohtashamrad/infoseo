(function () {
  var STOP = 'و در به از که را این آن با برای است بود شد می‌شود شود هم یا تا بر هر اگر ولی اما نیز چه همه یک دو کرد کنید کنم کند باید بین پس مثل خود های ها ای بی تر ترین هیچ چون the a an of and to in is are for on with that this it as by at be or from'.split(/\s+/);
  TK.tool(function (v) {
    var S = TK.S, nf = TK.nf;
    var text = v.text.replace(/[ي]/g, 'ی').replace(/[ك]/g, 'ک').toLowerCase();
    var all = text.match(/[\p{L}\p{N}][\p{L}\p{N}‌]*/gu) || [];
    if (all.length < 5) throw new Error('متن خیلی کوتاه است؛ حداقل چند جمله وارد کنید.');
    var stop = v.stop; var set = {}; STOP.forEach(function (w) { set[w] = 1; });
    function count(n) {
      var m = {};
      for (var i = 0; i + n <= all.length; i++) {
        var g = all.slice(i, i + n);
        if (stop && (set[g[0]] || set[g[n - 1]])) continue;
        if (n === 1 && g[0].length < 2) continue;
        var k = g.join(' '); m[k] = (m[k] || 0) + 1;
      }
      return Object.keys(m).map(function (k) { return [k, m[k]]; }).filter(function (x) { return n === 1 ? x[1] > 1 || all.length < 60 : x[1] > 1; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 15);
    }
    function rows(a) { return a.map(function (x) { return [x[0], nf(x[1], 0), nf(x[1] / all.length * 100, 2) + '٪']; }); }
    var out = [S.summary([['کل کلمات', nf(all.length, 0)], ['کلمات یکتا', nf(new Set(all).size, 0)]])];
    if (v.kw.trim()) {
      var kw = (v.kw.match(/[\p{L}\p{N}][\p{L}\p{N}‌]*/gu) || []).join(' ').toLowerCase();
      var n = kw.split(' ').length, c = 0;
      for (var i = 0; i + n <= all.length; i++) if (all.slice(i, i + n).join(' ') === kw) c++;
      var d = c * n / all.length * 100;
      out.push(S.summary([['تکرار «' + v.kw.trim() + '»', nf(c, 0)], ['تراکم', nf(d, 2) + '٪', d > 4 ? 'bad' : d > 0 ? 'good' : 'warn']]));
      if (d > 4) out.push(S.alert('warn', 'تراکم این عبارت بالاست؛ ممکن است متن تکراری و غیرطبیعی به نظر برسد.'));
      if (c === 0) out.push(S.alert('info', 'این عبارت در متن پیدا نشد.'));
    }
    [['کلمات پرتکرار', 1], ['عبارت‌های دوکلمه‌ای', 2], ['عبارت‌های سه‌کلمه‌ای', 3]].forEach(function (p) {
      var r = rows(count(p[1])); if (r.length) out.push(S.table(p[0], ['عبارت', 'تکرار', 'تراکم'], r));
    });
    return out;
  });
})();
