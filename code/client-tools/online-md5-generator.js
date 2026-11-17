TK.tool(function (v) {
  var S = TK.S;
  var f = v.file && v.file[0];
  if (!f && !v.text) throw new Error('متن بنویسید یا فایلی انتخاب کنید.');
  if (typeof SparkMD5 === 'undefined') throw new Error('کتابخانه‌ی MD5 بارگذاری نشد؛ صفحه را دوباره باز کنید.');
  if (!f) return [S.code('MD5 متن (UTF-8)', SparkMD5.hash(v.text)), S.summary([['طول متن', TK.nf(v.text.length, 0) + ' نویسه']])];
  if (f.size > 100 * 1024 * 1024) throw new Error('حداکثر اندازه‌ی فایل ۱۰۰ مگابایت است.');
  return new Promise(function (res, rej) {
    var chunk = 2 * 1024 * 1024, i = 0, sp = new SparkMD5.ArrayBuffer(), r = new FileReader();
    r.onerror = function () { rej(new Error('خواندن فایل ممکن نشد.')); };
    r.onload = function (e) { sp.append(e.target.result); i++; next(); };
    function next() { if (i * chunk >= f.size) { res([S.code('MD5 فایل', sp.end()), S.kv('فایل', [['نام', f.name], ['اندازه', TK.nf(f.size / 1024, 1) + ' کیلوبایت']])]); return; } r.readAsArrayBuffer(f.slice(i * chunk, Math.min(f.size, (i + 1) * chunk))); }
    next();
  });
});
