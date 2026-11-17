TK.tool(function (v) {
  var S = TK.S;
  var sets = [];
  var amb = /[O0lI1|]/g;
  function clean(s) { return v.amb ? s.replace(amb, '') : s; }
  if (v.lower) sets.push(clean('abcdefghijklmnopqrstuvwxyz'));
  if (v.upper) sets.push(clean('ABCDEFGHIJKLMNOPQRSTUVWXYZ'));
  if (v.digit) sets.push(clean('0123456789'));
  if (v.sym) sets.push('!@#$%^&*()-_=+[]{};:,.?');
  if (!sets.length) throw new Error('حداقل یک نوع نویسه را انتخاب کنید.');
  var len = Math.max(6, Math.min(128, v.len | 0 || 16)), count = Math.max(1, Math.min(50, v.count | 0 || 5));
  if (len < sets.length) throw new Error('طول رمز کمتر از تعداد دسته‌های انتخابی است.');
  var pool = sets.join('');
  function rnd(n) { // unbiased random int in [0,n)
    var max = Math.floor(0x100000000 / n) * n, a = new Uint32Array(1);
    do { crypto.getRandomValues(a); } while (a[0] >= max);
    return a[0] % n;
  }
  function one() {
    var c = sets.map(function (s) { return s[rnd(s.length)]; });
    while (c.length < len) c.push(pool[rnd(pool.length)]);
    for (var i = c.length - 1; i > 0; i--) { var j = rnd(i + 1), t = c[i]; c[i] = c[j]; c[j] = t; }
    return c.join('');
  }
  var bits = Math.log2(pool.length) * len, list = [];
  for (var i = 0; i < count; i++) list.push(one());
  var lvl = bits >= 100 ? 'good' : bits >= 60 ? 'warn' : 'bad';
  return [S.summary([['آنتروپی تقریبی', TK.nf(bits, 0) + ' بیت', lvl], ['اندازه‌ی مجموعه نویسه', TK.nf(pool.length, 0)], ['طول', TK.nf(len, 0)]]), S.code('رمزهای ساخته‌شده', list.join('\n'))];
}, { auto: true });
