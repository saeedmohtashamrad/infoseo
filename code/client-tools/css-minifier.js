(function () {
  function minify(src, keep) {
    var M = [];
    function mask(m) { M.push(m); return '\u0000' + (M.length - 1) + '\u0000'; }
    // protect strings, then comments, then url()
    var s = src.replace(/"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'/g, mask);
    s = s.replace(/\/\*[\s\S]*?\*\//g, function (m) { return m.charAt(2) === '!' && keep ? mask(m) : ''; });
    s = s.replace(/url\(\s*([^'")\s\u0000][^)]*?)\s*\)/gi, function (m, u) { return mask('url(' + u + ')'); });
    s = s.replace(/\s+/g, ' ').replace(/ : /g, ':')
      .replace(/\s*([{};,>])\s*/g, '$1')
      .replace(/:\s+/g, ':')
      .replace(/\(\s+/g, '(').replace(/\s+\)/g, ')')
      .replace(/;}/g, '}')
      .replace(/\s*!important/gi, '!important')
      .replace(/([^\d.])0(px|em|rem|%|pt|vh|vw)(?![a-z0-9])/gi, '$10')
      .trim();
    return s.replace(/\u0000(\d+)\u0000/g, function (m, i) { return M[+i]; });
  }
  window.IXCSS = { minify: minify };
  TK.tool(function (v) {
    var out = minify(v.code, v.keep), a = new Blob([v.code]).size, b = new Blob([out]).size;
    return [TK.S.summary([['حجم اصلی', TK.nf(a, 0) + ' بایت'], ['حجم جدید', TK.nf(b, 0) + ' بایت', 'good'], ['کاهش', TK.nf(a ? (a - b) / a * 100 : 0, 1) + '٪', 'good']]), TK.S.code('CSS فشرده', out, 'css'), TK.S.download('دانلود min.css', 'style.min.css', 'text/css', out)];
  });
})();
