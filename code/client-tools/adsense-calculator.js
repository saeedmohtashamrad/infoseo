TK.tool(function (v) {
  var S = TK.S, nf = TK.nf;
  var imp = v.visits * v.pv * v.ads, clicks = imp * v.ctr / 100, gross = clicks * v.cpc, net = gross * v.share / 100;
  var d = net, m = net * 30, y = net * 365;
  var fx = function (n) { return '$' + nf(n, 2); };
  return [S.summary([['روزانه', fx(d), 'good'], ['ماهانه (۳۰ روز)', fx(m), 'good'], ['سالانه', fx(y), 'good'], ['کلیک روزانه', nf(clicks, 1)]]),
    S.kv('جزئیات محاسبه', [['نمایش تبلیغ روزانه', nf(imp, 0)], ['کلیک روزانه', nf(clicks, 2)], ['درآمد ناخالص', fx(gross)], ['سهم ناشر', nf(v.share, 0) + '٪'], ['RPM تقریبی (به ازای ۱۰۰۰ بازدید)', fx(v.visits ? net / v.visits * 1000 : 0)]]),
    S.alert('info', 'این رقم برآوردی بر پایه‌ی ورودی‌های شماست و تضمین درآمد نیست.')];
});
