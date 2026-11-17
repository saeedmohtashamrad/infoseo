(function () {
  function go() {
    var f = document.querySelector('#tool form'); if (!f) return;
    var stage = document.getElementById('f-stage'), wrap = document.getElementById('f-wrap'), fr = document.getElementById('f-frame');
    function apply() {
      var p = f.size.value.split('x').map(Number), w = p[0], h = p[1];
      if (f.rot.checked) { var t = w; w = h; h = t; }
      var avail = stage.clientWidth - 16, sc = Math.min(1, avail / w);
      fr.style.width = w + 'px'; fr.style.height = h + 'px';
      wrap.style.transform = 'scale(' + sc + ')'; wrap.style.width = w + 'px'; wrap.style.height = h + 'px';
      stage.style.height = (h * sc + 16) + 'px'; stage.style.overflowX = 'hidden';
    }
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var u = f.url.value.trim(); if (!u) { f.url.focus(); return; }
      if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
      try { var o = new URL(u); if (o.protocol !== 'https:') throw 0; fr.src = o.href; } catch (x) { alert('فقط آدرس https معتبر پذیرفته می‌شود.'); return; }
      apply();
    });
    f.size.addEventListener('change', apply); f.rot.addEventListener('change', apply); window.addEventListener('resize', TK.debounce(apply, 150));
    apply();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
