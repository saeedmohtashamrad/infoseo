(function () {
  var ONES = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه', 'ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  var TENS = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  var HUND = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  var SCALE = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوادریلیون'];
  function three(n) {
    var p = [], h = Math.floor(n / 100), r = n % 100;
    if (h) p.push(HUND[h]);
    if (r) { if (r < 20) p.push(ONES[r]); else { p.push(TENS[Math.floor(r / 10)]); if (r % 10) p.push(ONES[r % 10]); } }
    return p.join(' و ');
  }
  function words(str) {
    var neg = str[0] === '-'; if (neg) str = str.slice(1);
    var parts = str.split('.'), ip = parts[0].replace(/^0+(?=\d)/, '');
    if (ip.length > 15) throw new Error('حداکثر ۱۵ رقم صحیح پشتیبانی می‌شود.');
    var out;
    if (/^0+$/.test(ip)) out = 'صفر';
    else {
      var groups = [], s = ip; while (s.length) { groups.unshift(parseInt(s.slice(-3), 10)); s = s.slice(0, -3); }
      var segs = [];
      groups.forEach(function (g, i) { var sc = groups.length - 1 - i; if (g) segs.push(three(g) + (SCALE[sc] ? ' ' + SCALE[sc] : '')); });
      out = segs.join(' و ');
    }
    if (parts[1]) { var d = parts[1].replace(/0+$/, ''); if (d) out += ' ممیز ' + d.split('').map(function (c) { return c === '0' ? 'صفر' : ONES[+c]; }).join(' ') ; }
    return (neg ? 'منفی ' : '') + out;
  }
  function toEn(t) { return t.replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 0x6f0; }).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 0x660; }); }
  TK.tool(function (v) {
    var t = v.text, r;
    if (v.to === 'en') r = toEn(t);
    else if (v.to === 'fa') r = toEn(t).replace(/\d/g, function (d) { return '۰۱۲۳۴۵۶۷۸۹'[d]; });
    else if (v.to === 'ar') r = toEn(t).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; });
    else {
      var lines = t.split(/\r?\n/).filter(function (x) { return x.trim(); });
      r = lines.map(function (l) { var n = toEn(l).replace(/[,٬،\s]/g, ''); if (!/^-?\d+(\.\d+)?$/.test(n)) throw new Error('«' + l.trim() + '» عدد معتبر نیست.'); return words(n); }).join('\n');
    }
    return [TK.S.code('نتیجه', r)];
  });
})();
