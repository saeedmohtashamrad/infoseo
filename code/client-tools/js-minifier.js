(function () {
  var KW_RE = /^(return|typeof|instanceof|in|of|new|delete|void|throw|case|do|else|yield|await)$/;
  var ID = /[A-Za-z0-9_$\u0080-\uffff\\]/;
  function tokenize(s) {
    var i = 0, n = s.length, T = [], nl = false, ws = false, last = null;
    function push(t, v) { T.push({ t: t, v: v, nl: nl, ws: ws }); last = T[T.length - 1]; nl = false; ws = false; }
    function regexAllowed() {
      if (!last) return true;
      if (last.t === 'num' || last.t === 'str' || last.t === 'tpl' || last.t === 'regex') return false;
      if (last.t === 'id') return KW_RE.test(last.v);
      return !(last.v === ')' || last.v === ']' || last.v === '}');
    }
    function readTemplate(start) {
      var j = start + 1;
      while (j < n) {
        var c = s[j];
        if (c === '\\') { j += 2; continue; }
        if (c === '`') return j + 1;
        if (c === '$' && s[j + 1] === '{') {
          var depth = 1; j += 2;
          while (j < n && depth > 0) {
            var d = s[j];
            if (d === '`') { j = readTemplate(j); continue; }
            if (d === '"' || d === "'") { j = readString(j); continue; }
            if (d === '{') depth++; else if (d === '}') depth--;
            j++;
          }
          continue;
        }
        j++;
      }
      throw new Error('قالب (template literal) بسته نشده است.');
    }
    function readString(start) {
      var q = s[start], j = start + 1;
      while (j < n) { var c = s[j]; if (c === '\\') { j += 2; continue; } if (c === q) return j + 1; if (c === '\n') throw new Error('رشته‌ی بسته‌نشده در موقعیت ' + start); j++; }
      throw new Error('رشته‌ی بسته‌نشده در موقعیت ' + start);
    }
    while (i < n) {
      var c = s[i];
      if (c === '\n' || c === '\r') { nl = true; ws = true; i++; continue; }
      if (c === ' ' || c === '\t' || c === '\f' || c === '\v' || c === '\u00a0' || c === '\ufeff' || c === '\u2028' || c === '\u2029') { ws = true; i++; continue; }
      if (c === '/' && s[i + 1] === '/') { while (i < n && s[i] !== '\n') i++; ws = true; continue; }
      if (c === '/' && s[i + 1] === '*') {
        var e = s.indexOf('*/', i + 2); if (e < 0) throw new Error('کامنت چندخطی بسته نشده است.');
        var body = s.slice(i, e + 2);
        if (s[i + 2] === '!' && TK_KEEP) { push('lic', body); nl = true; } else { if (body.indexOf('\n') > -1) nl = true; ws = true; }
        i = e + 2; continue;
      }
      if (c === '"' || c === "'") { var e2 = readString(i); push('str', s.slice(i, e2)); i = e2; continue; }
      if (c === '`') { var e3 = readTemplate(i); push('tpl', s.slice(i, e3)); i = e3; continue; }
      if (c === '/' && regexAllowed()) {
        var j = i + 1, inCls = false;
        while (j < n) { var d = s[j]; if (d === '\\') { j += 2; continue; } if (d === '\n') throw new Error('عبارت منظم نامعتبر در موقعیت ' + i); if (inCls) { if (d === ']') inCls = false; } else if (d === '[') inCls = true; else if (d === '/') break; j++; }
        j++; while (j < n && /[a-z]/i.test(s[j])) j++;
        push('regex', s.slice(i, j)); i = j; continue;
      }
      if (ID.test(c) || (c === '.' && /\d/.test(s[i + 1] || ''))) {
        var k = c === '.' ? i + 1 : i; while (k < n && (ID.test(s[k]) || (s[k] === '.' && /[\d.]/.test(s[i]) && /[\d.eE]/.test(s[k - 1] || '')) || ((s[k] === '+' || s[k] === '-') && /[eE]/.test(s[k - 1]) && /^[\d.]/.test(s.slice(i, k))))) k++;
        var v = s.slice(i, k); push(/^[\d.]/.test(v) ? 'num' : 'id', v); i = k; continue;
      }
      push('p', c); i++;
    }
    return T;
  }
  var TK_KEEP = true;
  function minify(src, keep) {
    TK_KEEP = keep;
    var T = tokenize(src), out = '', prev = null;
    T.forEach(function (t) {
      if (prev) {
        var a = prev.v[prev.v.length - 1], b = t.v[0], sep = '';
        if (t.nl && !(prev.t === 'p' && '{([,;'.indexOf(prev.v) > -1) && !(t.t === 'p' && ')]},;'.indexOf(t.v) > -1) || prev.t === 'lic') sep = '\n';
        else if (t.ws) {
          if ((ID.test(a) && ID.test(b)) || ((a === '+' || a === '-') && a === b) || (a === '/' && (b === '/' || b === '*')) || (prev.t === 'num' && b === '.') || (prev.t === 'regex' && /[a-z]/i.test(b) && false)) sep = ' ';
          if (t.t === 'p' && prev.t === 'p' && ((a === '<' && b === '!') || (a === '-' && b === '>'))) sep = ' ';
        }
        out += sep;
      }
      out += t.v; prev = t;
    });
    return out.trim();
  }
  window.IXJS = { minify: minify };
  TK.tool(function (v) {
    var out = minify(v.code, v.keep), a = new Blob([v.code]).size, b = new Blob([out]).size;
    return [TK.S.summary([['حجم اصلی', TK.nf(a, 0) + ' بایت'], ['حجم جدید', TK.nf(b, 0) + ' بایت', 'good'], ['کاهش', TK.nf(a ? (a - b) / a * 100 : 0, 1) + '٪', 'good']]), TK.S.code('کد فشرده', out, 'js'), TK.S.download('دانلود min.js', 'script.min.js', 'text/javascript', out)];
  });
})();
