TK.tool(function (v) {
  var norm = function (s) { return v.ws ? s.trim() : s; };
  var A = v.a.split(/\r?\n/), B = v.b.split(/\r?\n/);
  if (A.length > 3000 || B.length > 3000) throw new Error('حداکثر ۳٬۰۰۰ خط برای هر طرف مجاز است.');
  var n = A.length, m = B.length, dp = [];
  for (var i = 0; i <= n; i++) dp.push(new Uint16Array(m + 1));
  for (i = n - 1; i >= 0; i--) for (var j = m - 1; j >= 0; j--) dp[i][j] = norm(A[i]) === norm(B[j]) ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  var out = [], add = 0, del = 0; i = 0; j = 0;
  while (i < n && j < m) {
    if (norm(A[i]) === norm(B[j])) { out.push('  ' + A[i]); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push('- ' + A[i]); i++; del++; }
    else { out.push('+ ' + B[j]); j++; add++; }
  }
  while (i < n) { out.push('- ' + A[i++]); del++; }
  while (j < m) { out.push('+ ' + B[j++]); add++; }
  var res = [TK.S.summary([['خط اضافه‌شده', TK.nf(add, 0), add ? 'good' : 'info'], ['خط حذف‌شده', TK.nf(del, 0), del ? 'bad' : 'info'], ['بدون تغییر', TK.nf(m - add, 0)]])];
  if (!add && !del) res.push(TK.S.alert('ok', 'دو متن یکسان هستند.'));
  else {
    var wrap = out.map(function (l) { return l; }).join('\n');
    res.push(TK.S.code('تفاوت‌ها (- حذف، + اضافه)', wrap.length > 80000 ? wrap.slice(0, 80000) + '\n…' : wrap, 'diff'));
  }
  return res;
});
