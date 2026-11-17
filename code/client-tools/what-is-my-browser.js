TK.tool(function () {
  var S = TK.S, n = navigator, ua = n.userAgent;
  function det() {
    var b = /Edg\//.test(ua) ? 'Microsoft Edge' : /OPR\//.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome / Chromium' : /Safari\//.test(ua) ? 'Safari' : 'نامشخص';
    var m = ua.match(/(Edg|OPR|Firefox|Chrome|Version)\/([\d.]+)/); return b + (m ? ' ' + m[2] : '');
  }
  function os() { return /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS / iPadOS' : /Mac OS/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'نامشخص'; }
  var q = function (s) { return window.matchMedia && matchMedia(s).matches; };
  var yn = function (b) { return b ? 'بله' : 'خیر'; };
  var uad = n.userAgentData;
  return [
    S.kv('مرورگر و سیستم', [['مرورگر', det()], ['سیستم‌عامل', os()], ['موتور', /Gecko\//.test(ua) && /Firefox/.test(ua) ? 'Gecko' : /AppleWebKit/.test(ua) ? 'WebKit / Blink' : 'نامشخص'], ['موبایل', yn(uad ? uad.mobile : /Mobi|Android|iPhone/.test(ua))], ['User-Agent', ua]]),
    S.kv('نمایشگر', [['اندازه‌ی صفحه', screen.width + '×' + screen.height], ['اندازه‌ی پنجره (viewport)', innerWidth + '×' + innerHeight], ['تراکم پیکسل (DPR)', String(window.devicePixelRatio)], ['عمق رنگ', screen.colorDepth + ' بیت'], ['جهت', (screen.orientation && screen.orientation.type) || 'نامشخص'], ['حالت تیره', yn(q('(prefers-color-scheme: dark)'))], ['کاهش انیمیشن', yn(q('(prefers-reduced-motion: reduce)'))]]),
    S.kv('زبان و منطقه', [['زبان اصلی', n.language || 'نامشخص'], ['فهرست زبان‌ها', (n.languages || []).join(', ') || 'نامشخص'], ['منطقه‌ی زمانی', Intl.DateTimeFormat().resolvedOptions().timeZone || 'نامشخص'], ['تقویم', Intl.DateTimeFormat().resolvedOptions().calendar]]),
    S.kv('قابلیت‌ها', [['کوکی فعال', yn(n.cookieEnabled)], ['آنلاین', yn(n.onLine)], ['لمسی', yn(n.maxTouchPoints > 0) + (n.maxTouchPoints ? ' (' + n.maxTouchPoints + ' نقطه)' : '')], ['تعداد هسته‌ی پردازنده', String(n.hardwareConcurrency || 'نامشخص')], ['حافظه‌ی تقریبی', n.deviceMemory ? n.deviceMemory + ' گیگابایت' : 'نامشخص'], ['Do Not Track', n.doNotTrack === '1' ? 'فعال' : 'غیرفعال/نامشخص'], ['WebGL', yn((function () { try { return !!document.createElement('canvas').getContext('webgl'); } catch (e) { return false; } })())], ['Service Worker', yn('serviceWorker' in n)]])
  ];
}, { auto: true });
