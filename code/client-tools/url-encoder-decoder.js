TK.tool(function (v) {
  var r;
  try { r = v.op === 'encode' ? (v.full ? encodeURI(v.text) : encodeURIComponent(v.text)) : (v.full ? decodeURI(v.text) : decodeURIComponent(v.text)); }
  catch (e) { throw new Error('رشته‌ی ورودی برای رمزگشایی معتبر نیست (دنباله‌ی % ناقص یا نامعتبر).'); }
  return [TK.S.code(v.op === 'encode' ? 'نتیجه‌ی رمزگذاری' : 'نتیجه‌ی رمزگشایی', r), TK.S.summary([['طول ورودی', TK.nf(v.text.length, 0)], ['طول خروجی', TK.nf(r.length, 0)]])];
});
