(function () {
  var MAP = { 'ا': 'a', 'آ': 'a', 'ب': 'b', 'پ': 'p', 'ت': 't', 'ث': 's', 'ج': 'j', 'چ': 'ch', 'ح': 'h', 'خ': 'kh', 'د': 'd', 'ذ': 'z', 'ر': 'r', 'ز': 'z', 'ژ': 'zh', 'س': 's', 'ش': 'sh', 'ص': 's', 'ض': 'z', 'ط': 't', 'ظ': 'z', 'ع': 'a', 'غ': 'gh', 'ف': 'f', 'ق': 'gh', 'ک': 'k', 'گ': 'g', 'ل': 'l', 'م': 'm', 'ن': 'n', 'و': 'v', 'ه': 'h', 'ی': 'y', 'ئ': 'e', 'ء': '', 'ة': 'h', 'ؤ': 'o', 'أ': 'a', 'إ': 'e' };
  var STOP = ['و', 'در', 'به', 'از', 'که', 'را', 'با', 'برای', 'این', 'آن', 'یا', 'تا', 'بر', 'the', 'a', 'an', 'of', 'and', 'to', 'in', 'for'];
  TK.tool(function (v) {
    var s = v.title.replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/[ً-ٟـ]/g, '')
      .replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 0x6f0; }).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 0x660; }).toLowerCase();
    var words = s.split(/[^\p{L}\p{N}]+/u).filter(Boolean);
    if (v.stop) { var f = words.filter(function (w) { return STOP.indexOf(w) < 0; }); if (f.length) words = f; }
    var slug = words.join('-');
    if (v.mode === 'latin') slug = slug.replace(/[؀-ۿ]/g, function (c) { return MAP[c] !== undefined ? MAP[c] : ''; }).replace(/-+/g, '-').replace(/[^a-z0-9-]/g, '');
    var max = Math.max(10, v.max | 0 || 70);
    if (slug.length > max) slug = slug.slice(0, max).replace(/-[^-]*$/, '') || slug.slice(0, max);
    slug = slug.replace(/^-+|-+$/g, '');
    if (!slug) throw new Error('از این عنوان اسلاگ معتبری ساخته نشد.');
    return [TK.S.code('اسلاگ پیشنهادی', slug), TK.S.kv('جزئیات', [['طول', TK.nf(slug.length, 0) + ' کاراکتر'], ['نمونه آدرس', '/blog/' + slug], ['شکل کدگذاری‌شده', '/blog/' + encodeURIComponent(slug)]])];
  });
})();
