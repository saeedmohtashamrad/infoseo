TK.tool(function (v) {
  var M = [];
  function mask(m) { M.push(m); return '\u0001' + (M.length - 1) + '\u0001'; }
  var s = v.code.replace(/<(pre|textarea|script|style)\b[\s\S]*?<\/\1\s*>/gi, mask).replace(/<!--\[if[\s\S]*?<!\[endif\]-->/gi, mask).replace(/<!--(?!\[if)[\s\S]*?-->/g, '');
  s = s.replace(/\s+/g, ' ');
  if (v.strict) s = s.replace(/>\s+</g, '><');
  else s = s.replace(/\s*(<\/?(?:html|head|body|title|meta|link|base|div|p|section|article|header|footer|nav|main|aside|ul|ol|li|dl|dt|dd|table|thead|tbody|tfoot|tr|td|th|form|h[1-6]|hr|br|blockquote|figure|figcaption|details|summary|fieldset|legend|option|select|\u0001)\b[^>]*>|\u0001\d+\u0001)\s*/gi, '$1');
  s = s.trim();
  var out = s.replace(/\u0001(\d+)\u0001/g, function (m, i) { return M[+i]; });
  var a = new Blob([v.code]).size, b = new Blob([out]).size;
  return [TK.S.summary([['حجم اصلی', TK.nf(a, 0) + ' بایت'], ['حجم جدید', TK.nf(b, 0) + ' بایت', 'good'], ['کاهش', TK.nf(a ? (a - b) / a * 100 : 0, 1) + '٪', 'good']]), TK.S.code('HTML فشرده', out, 'html'), TK.S.download('دانلود', 'page.min.html', 'text/html', out)];
});
