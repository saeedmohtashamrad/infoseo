TK.tool(function (v) {
  var f = v.img && v.img[0]; if (!f) throw new Error('یک تصویر انتخاب کنید.');
  if (typeof jsQR === 'undefined') throw new Error('کتابخانه‌ی خواندن QR بارگذاری نشد؛ صفحه را دوباره باز کنید.');
  if (f.size > 15 * 1024 * 1024) throw new Error('حداکثر حجم تصویر ۱۵ مگابایت است.');
  var url = URL.createObjectURL(f);
  return new Promise(function (res, rej) { var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { rej(new Error('تصویر خوانده نشد.')); }; im.src = url; }).then(function (im) {
    URL.revokeObjectURL(url);
    var sc = Math.min(1, 1600 / Math.max(im.naturalWidth, im.naturalHeight)), w = Math.round(im.naturalWidth * sc), h = Math.round(im.naturalHeight * sc);
    var c = document.createElement('canvas'); c.width = w; c.height = h; var g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(im, 0, 0, w, h);
    var d = g.getImageData(0, 0, w, h), r = jsQR(d.data, w, h, { inversionAttempts: 'attemptBoth' });
    if (!r) throw new Error('QR کدی در این تصویر پیدا نشد؛ تصویر واضح‌تر یا با حاشیه‌ی سفید بیشتر امتحان کنید.');
    var out = [TK.S.code('محتوای QR کد', r.data)];
    var isUrl = /^https?:\/\//i.test(r.data);
    if (isUrl) {
      var host = ''; try { host = new URL(r.data).hostname; } catch (e) {}
      out.push(TK.S.kv('تحلیل لینک', [['دامنه', host], ['https', /^https:/i.test(r.data) ? 'بله' : 'خیر']]));
      if (/^xn--|\.xn--|[^\x00-\x7f]/.test(host)) out.push(TK.S.alert('warn', 'دامنه شامل نویسه‌های بین‌المللی (IDN/Punycode) است؛ ممکن است جعل یک دامنه‌ی معتبر باشد.'));
      out.push(TK.S.alert('info', 'لینک باز نشد. پیش از ورود به آن، دامنه را بررسی کنید.'));
    } else if (/^WIFI:/i.test(r.data)) out.push(TK.S.alert('info', 'این QR اطلاعات اتصال به شبکه‌ی Wi-Fi است.'));
    return out;
  });
});
