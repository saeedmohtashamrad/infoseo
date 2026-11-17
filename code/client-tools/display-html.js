(function () {
  function go() {
    var ta = document.getElementById('f-code'), fr = document.getElementById('f-prev'); if (!ta || !fr) return;
    var upd = TK.debounce(function () { fr.srcdoc = ta.value; }, 250);
    ta.addEventListener('input', upd); upd();
    document.querySelectorAll('#tool [data-w]').forEach(function (b) { b.addEventListener('click', function () { var w = b.getAttribute('data-w'); fr.style.width = w === '100%' ? '100%' : w + 'px'; }); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
})();
