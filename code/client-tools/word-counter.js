TK.tool(function (v) {
  var t = v.text || '';
  var S = TK.S, nf = TK.nf;
  var words = (t.match(/[\p{L}\p{N}][\p{L}\p{N}'’‌-]*/gu) || []).length;
  var chars = Array.from(t).length;
  var noSpace = Array.from(t.replace(/\s/g, '')).length;
  var sentences = (t.match(/[^.!?؟…\n]+[.!?؟…]+|[^.!?؟…\n]+$/gm) || []).filter(function (x) { return /[\p{L}\p{N}]/u.test(x); }).length;
  var paras = t.split(/\n\s*\n/).filter(function (x) { return x.trim(); }).length;
  var lines = t.split('\n').filter(function (x) { return x.trim(); }).length;
  var mins = words / 200;
  var read = mins < 1 ? 'کمتر از ۱ دقیقه' : nf(Math.ceil(mins), 0) + ' دقیقه';
  return [
    S.summary([['کلمه', nf(words, 0), 'good'], ['کاراکتر', nf(chars, 0)], ['کاراکتر بدون فاصله', nf(noSpace, 0)], ['جمله', nf(sentences, 0)]]),
    S.kv('جزئیات', [['پاراگراف', nf(paras, 0)], ['خط غیرخالی', nf(lines, 0)], ['زمان تقریبی مطالعه', read], ['میانگین طول کلمه', words ? nf(noSpace / words, 1) + ' حرف' : '—']])
  ];
}, { live: true });
