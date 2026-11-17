TK.tool(function (v) {
  var S = TK.S, nf = TK.nf;
  var base = v.da * 1 + v.traffic / 100;
  var ageM = Math.min(1.5, 1 + v.age * .05), typeM = { guest: 1.4, insert: 1, sidebar: .3 }[v.type], relM = { hi: 1.3, mid: 1, lo: .4 }[v.rel];
  var mid = base * ageM * typeM * relM, lo = mid * .6, hi = mid * 1.5;
  return [S.summary([['برآورد میانی', '$' + nf(mid, 0), 'good'], ['حداقل', '$' + nf(lo, 0)], ['حداکثر', '$' + nf(hi, 0)]]),
    S.kv('فرمول', [['پایه', 'اعتبار + ترافیک ÷ ۱۰۰ = ' + nf(base, 1)], ['ضریب قدمت', nf(ageM, 2)], ['ضریب نوع لینک', nf(typeM, 2)], ['ضریب ارتباط', nf(relM, 2)]]),
    S.alert('warn', 'این عدد قیمت بازار نیست. لینک‌های پولی باید rel="sponsored" داشته باشند و خرید لینک برای دستکاری رتبه با قوانین گوگل مغایر است.')];
});
