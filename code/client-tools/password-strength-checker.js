(function () {
  var COMMON = ['password', 'passw0rd', 'p@ssw0rd', '123456', '12345678', '123456789', '1234567', '111111', '000000', 'qwerty', 'qwertyuiop', 'abc123', 'iloveyou', 'admin', 'welcome', 'letmein', 'monkey', 'dragon', 'login', 'football', '654321', '123123', 'zxcvbnm', 'asdfghjkl', 'iran', 'iran1234', 'tehran', 'salam', 'salam123', '1q2w3e4r', 'qazwsx', '1qaz2wsx'];
  var ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1234567890'];
  function seqs(p) {
    var l = p.toLowerCase(), hit = false;
    ROWS.forEach(function (r) { for (var i = 0; i + 4 <= r.length; i++) { var s = r.slice(i, i + 4); if (l.indexOf(s) > -1 || l.indexOf(s.split('').reverse().join('')) > -1) hit = true; } });
    for (var i = 0; i + 4 <= l.length; i++) { var a = l.charCodeAt(i); if (l.charCodeAt(i + 1) === a + 1 && l.charCodeAt(i + 2) === a + 2 && l.charCodeAt(i + 3) === a + 3) hit = true; }
    return hit;
  }
  function human(sec) {
    if (sec < 1) return 'کمتر از یک ثانیه'; var u = [[31536000 * 1e9, 'میلیارد سال'], [31536000 * 1e6, 'میلیون سال'], [31536000 * 1e3, 'هزار سال'], [31536000, 'سال'], [86400, 'روز'], [3600, 'ساعت'], [60, 'دقیقه']];
    for (var i = 0; i < u.length; i++) if (sec >= u[i][0]) return TK.nf(sec / u[i][0], 0) + ' ' + u[i][1]; return TK.nf(sec, 0) + ' ثانیه';
  }
  TK.tool(function (v) {
    var p = v.pw, S = TK.S, issues = [], good = [];
    var pool = 0; if (/[a-z]/.test(p)) pool += 26; if (/[A-Z]/.test(p)) pool += 26; if (/\d/.test(p)) pool += 10; if (/[^\w\s؀-ۿ]/.test(p)) pool += 32; if (/[؀-ۿ]/.test(p)) pool += 32; if (/\s/.test(p)) pool += 1;
    var len = Array.from(p).length, bits = len * Math.log2(Math.max(pool, 2));
    var low = p.toLowerCase();
    if (COMMON.some(function (c) { return low === c || low.replace(/[^a-z0-9]/g, '') === c; })) { issues.push('این رمز در فهرست رمزهای بسیار رایج است.'); bits = Math.min(bits, 10); }
    else if (COMMON.some(function (c) { return low.indexOf(c) > -1 && c.length >= 5; })) { issues.push('شامل یک رمز رایج است.'); bits *= .6; }
    if (/(.)\1{2,}/.test(p)) { issues.push('تکرار پشت‌سرهم یک نویسه.'); bits *= .8; }
    if (seqs(p)) { issues.push('الگوی ترتیبی یا کیبوردی (مثل 1234 یا qwer).'); bits *= .75; }
    if (/^\d+$/.test(p)) { issues.push('فقط عدد است.'); bits *= .8; }
    if (/^[a-zA-Z]+$/.test(p)) issues.push('فقط حروف است؛ عدد یا نماد اضافه کنید یا طولش را بیشتر کنید.');
    if (/(19|20|13|14)\d\d/.test(p)) { issues.push('شامل سال است (قابل‌حدس).'); bits *= .9; }
    if (len < 12) issues.push('کوتاه‌تر از ۱۲ نویسه است.'); else good.push('طول مناسب (' + len + ' نویسه).');
    if (pool >= 62) good.push('ترکیب انواع نویسه.');
    var score = Math.max(0, Math.min(100, Math.round(bits / 80 * 100)));
    var label = score >= 80 ? 'بسیار قوی' : score >= 60 ? 'قوی' : score >= 40 ? 'متوسط' : 'ضعیف';
    var sec = Math.pow(2, bits) / 2 / 1e10;
    var checks = good.map(function (g) { return ['pass', g]; }).concat(issues.map(function (i) { return ['warn', i]; }));
    return [S.score(score, label, 'قدرت رمز'), S.summary([['آنتروپی تقریبی', TK.nf(bits, 0) + ' بیت', score >= 60 ? 'good' : score >= 40 ? 'warn' : 'bad'], ['طول', TK.nf(len, 0)], ['زمان شکستن (آفلاین، تخمینی)', human(sec)]]), S.checks('نکات', checks)];
  });
})();
