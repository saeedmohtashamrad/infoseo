TK.tool(function (v) {
  var S = TK.S, enc = new TextEncoder();
  function hex(buf) { return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join(''); }
  function b64(bytes) { var s = ''; bytes.forEach(function (b) { s += String.fromCharCode(b); }); return btoa(s); }
  if (v.algo === 'b64e') return [S.code('Base64', b64(enc.encode(v.text)))];
  if (v.algo === 'b64d') {
    try { var bin = atob(v.text.trim().replace(/-/g, '+').replace(/_/g, '/')); var bytes = Uint8Array.from(bin, function (c) { return c.charCodeAt(0); }); return [S.code('متن رمزگشایی‌شده', new TextDecoder('utf-8', { fatal: true }).decode(bytes))]; }
    catch (e) { throw new Error('ورودی Base64 معتبر نیست یا متن UTF-8 نیست.'); }
  }
  if (!window.crypto || !crypto.subtle) throw new Error('مرورگر شما Web Crypto را پشتیبانی نمی‌کند (یا صفحه با HTTPS باز نشده است).');
  if (v.algo === 'HMAC-SHA256') {
    if (!v.key) throw new Error('برای HMAC کلید را وارد کنید.');
    return crypto.subtle.importKey('raw', enc.encode(v.key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']).then(function (k) { return crypto.subtle.sign('HMAC', k, enc.encode(v.text)); }).then(function (sig) { return [S.code('HMAC-SHA256 (hex)', hex(sig))]; });
  }
  return crypto.subtle.digest(v.algo, enc.encode(v.text)).then(function (d) {
    var out = [S.code(v.algo + ' (hex)', hex(d)), S.code(v.algo + ' (Base64)', b64(new Uint8Array(d)))];
    if (v.algo === 'SHA-1') out.unshift(S.alert('warn', 'SHA-1 از نظر امنیتی قدیمی است.'));
    return out;
  });
});
