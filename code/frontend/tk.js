/* InfoSEO tool kit: result renderer (safe DOM, no innerHTML with data), form handler for server tools,
   helpers for client-side tools. Result contract mirrors app/Tools/R.php. */
(function () {
  'use strict';
  var SVG = 'http://www.w3.org/2000/svg';

  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (attrs[k] == null || attrs[k] === false) continue;
      if (k === 'class') el.className = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c != null) el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return el;
  }
  function icon(name, size) {
    var s = document.createElementNS(SVG, 'svg');
    s.setAttribute('class', 'ic'); s.setAttribute('width', size || 18); s.setAttribute('height', size || 18);
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
    var u = document.createElementNS(SVG, 'use'); u.setAttribute('href', '/assets/img/icons.svg#' + name);
    s.appendChild(u); return s;
  }
  var ltrRe = /^[\x00-\x7f]*$/;
  function cell(td, v) { td.textContent = v; if (ltrRe.test(v) && v.length) td.className = 'ltr'; return td; }

  function copy(text, btn) {
    var done = function () { if (!btn) return; var o = btn.getAttribute('data-l') || btn.textContent; btn.setAttribute('data-l', o); btn.textContent = 'کپی شد ✓'; setTimeout(function () { btn.textContent = o; }, 1600); };
    if (navigator.clipboard && window.isSecureContext) { navigator.clipboard.writeText(text).then(done, fallback); } else fallback();
    function fallback() {
      var ta = h('textarea', { 'aria-hidden': 'true', style: 'position:fixed;opacity:0;top:0' }); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {} ta.remove();
    }
  }
  function download(name, mime, content) {
    var b = new Blob([content], { type: mime + ';charset=utf-8' });
    var a = h('a', { href: URL.createObjectURL(b), download: name }); document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  function safeSrc(s) { return /^(data:image\/(png|jpeg|webp|gif);base64,|https:\/\/)/i.test(s) ? s : ''; }

  var R = {
    summary: function (s) {
      var w = h('div', { class: 'kpis' });
      s.items.forEach(function (i) { w.appendChild(h('div', { class: 'kpi kpi--' + (i.status || 'info') }, [h('span', { text: i.label }), h('b', { text: i.value })])); });
      return w;
    },
    kv: function (s) {
      var tb = h('tbody'); s.rows.forEach(function (r) { var tr = h('tr'); tr.appendChild(h('th', { scope: 'row', text: r[0] })); tr.appendChild(cell(h('td'), r[1])); tb.appendChild(tr); });
      return h('div', null, [s.title ? h('h3', { class: 'res-t', text: s.title }) : null, h('div', { class: 'tscroll' }, [h('table', { class: 'rtable kvt' }, [tb])])]);
    },
    table: function (s) {
      var tr = h('tr'); s.head.forEach(function (x) { tr.appendChild(h('th', { scope: 'col', text: x })); });
      var tb = h('tbody'); s.rows.forEach(function (r) { var row = h('tr'); r.forEach(function (c) { row.appendChild(cell(h('td'), c)); }); tb.appendChild(row); });
      return h('div', null, [s.title ? h('h3', { class: 'res-t', text: s.title }) : null, h('div', { class: 'tscroll' }, [h('table', { class: 'rtable' }, [h('thead', null, [tr]), tb])])]);
    },
    checks: function (s) {
      var ul = h('ul', { class: 'checks' });
      var ic = { pass: 'circle-check', warn: 'triangle-alert', fail: 'circle-x', info: 'info' };
      var tx = { pass: 'موفق', warn: 'هشدار', fail: 'ناموفق', info: 'اطلاعات' };
      s.items.forEach(function (i) {
        var st = ic[i.status] ? i.status : 'info';
        ul.appendChild(h('li', { class: 'check check--' + st }, [icon(ic[st], 20), h('span', { class: 'sr-only', text: tx[st] + ': ' }), h('div', null, [h('strong', { text: i.label }), i.detail ? h('small', { text: i.detail }) : null])]));
      });
      return h('div', null, [s.title ? h('h3', { class: 'res-t', text: s.title }) : null, ul]);
    },
    code: function (s) {
      var b = h('button', { class: 'btn btn--sm btn--light', type: 'button', text: 'کپی' });
      b.addEventListener('click', function () { copy(s.text, b); });
      return h('div', null, [s.title ? h('h3', { class: 'res-t', text: s.title }) : null, h('div', { class: 'codeblock' }, [h('pre', { tabindex: '0' }, [h('code', { text: s.text })]), b])]);
    },
    text: function (s) { return h('div', null, [s.title ? h('h3', { class: 'res-t', text: s.title }) : null, h('p', { text: s.text, style: 'white-space:pre-wrap' })]); },
    alert: function (s) { return h('div', { class: 'alert alert--' + (['error', 'warn', 'info', 'ok'].indexOf(s.kind) > -1 ? s.kind : 'info'), role: s.kind === 'error' ? 'alert' : null }, [icon(s.kind === 'ok' ? 'circle-check' : s.kind === 'info' ? 'info' : 'triangle-alert', 20), h('div', { text: s.text })]); },
    score: function (s) {
      var c = s.value >= 90 ? 'var(--ok)' : s.value >= 50 ? '#d97706' : 'var(--bad)';
      var ring = h('div', { class: 'score__ring', style: '--v:' + (+s.value | 0) + ';--sc:' + c, role: 'img', 'aria-label': s.label + ': ' + s.value + ' از ۱۰۰' }, [h('b', { text: String(s.value) })]);
      return h('div', null, [s.title ? h('h3', { class: 'res-t', text: s.title }) : null, h('div', { class: 'score' }, [ring, h('strong', { text: s.label })])]);
    },
    image: function (s) {
      var src = safeSrc(s.src); if (!src) return null;
      return h('div', null, [s.title ? h('h3', { class: 'res-t', text: s.title }) : null, h('img', { src: src, alt: s.alt || '', loading: 'lazy', style: 'border-radius:12px;border:1px solid var(--line)' })]);
    },
    download: function (s) {
      var b = h('button', { class: 'btn btn--ghost', type: 'button' }, [icon('download', 18), ' ' + s.label]);
      b.addEventListener('click', function () { download(s.filename, s.mime, s.content); });
      return b;
    },
    list: function (s) {
      var ul = h('ul', { class: 'rlist' }); s.items.forEach(function (i) { ul.appendChild(h('li', { text: i })); });
      return h('div', null, [s.title ? h('h3', { class: 'res-t', text: s.title }) : null, ul]);
    }
  };

  function render(out, sections) {
    out.replaceChildren();
    var res = h('div', { class: 'res' });
    (sections || []).forEach(function (s) { var f = R[s && s.type]; var n = f && f(s); if (n) res.appendChild(n); });
    out.appendChild(res);
    out.setAttribute('aria-busy', 'false');
    if (res.getBoundingClientRect().top > window.innerHeight * .85) res.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth', block: 'start' });
  }
  function error(out, msg) { render(out, [{ type: 'alert', kind: 'error', text: msg }]); }
  function loading(out) { out.setAttribute('aria-busy', 'true'); out.replaceChildren(h('div', { class: 'skeleton', role: 'status' }, [h('span', { class: 'sr-only', text: 'در حال پردازش…' })])); }

  function values(form) {
    var o = {};
    Array.prototype.forEach.call(form.elements, function (el) {
      if (!el.name) return;
      if (el.type === 'checkbox') o[el.name] = el.checked;
      else if (el.type === 'file') o[el.name] = el.files;
      else if (el.type === 'number' || el.type === 'range') o[el.name] = el.value === '' ? '' : +el.value;
      else if (el.type === 'radio') { if (el.checked) o[el.name] = el.value; }
      else o[el.name] = el.value;
    });
    return o;
  }
  function validate(form) {
    var ok = true, first = null;
    form.querySelectorAll('.field').forEach(function (f) {
      var el = f.querySelector('input,textarea,select'); var old = f.querySelector('.field-err'); if (old) old.remove();
      f.classList.remove('is-invalid'); if (el) el.removeAttribute('aria-invalid');
      if (el && el.required && !String(el.value).trim()) {
        ok = false; f.classList.add('is-invalid'); el.setAttribute('aria-invalid', 'true');
        f.appendChild(h('div', { class: 'field-err', role: 'alert', text: 'این فیلد الزامی است.' })); first = first || el;
      }
    });
    if (first) first.focus();
    return ok;
  }
  function busy(form, on) {
    var b = form.querySelector('button[type=submit]'); if (!b) return;
    b.disabled = on; b.classList.toggle('is-busy', on);
    var l = b.querySelector('.btn__l'); if (!l) return;
    if (on) { l.setAttribute('data-o', l.textContent); l.textContent = 'در حال پردازش…'; } else if (l.getAttribute('data-o')) l.textContent = l.getAttribute('data-o');
  }

  /* server / hybrid tools: <form data-tform> inside #tool[data-endpoint] */
  function bindServer(root) {
    var form = root.querySelector('form[data-tform]'); var out = root.querySelector('.tool-out');
    if (!form || !root.getAttribute('data-endpoint')) return;
    var ctl = null;
    form.addEventListener('reset', function () { out.replaceChildren(); if (ctl) ctl.abort(); });
    form.addEventListener('submit', function (e) {
      e.preventDefault(); if (!validate(form)) return;
      if (ctl) ctl.abort(); ctl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 70000);
      loading(out); busy(form, true);
      fetch(root.getAttribute('data-endpoint'), { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(values(form)), credentials: 'same-origin', signal: ctl && ctl.signal })
        .then(function (r) { return r.json().catch(function () { return { ok: false, error: { message: 'پاسخ نامعتبر از سرور دریافت شد.' } }; }); })
        .then(function (j) { if (j.ok) render(out, j.data.sections); else error(out, (j.error && j.error.message) || 'خطای ناشناخته.'); root.dispatchEvent(new CustomEvent('tk:done', { detail: j })); })
        .catch(function (err) { error(out, err && err.name === 'AbortError' ? 'زمان پردازش به پایان رسید. دوباره تلاش کنید.' : 'ارتباط با سرور برقرار نشد.'); })
        .then(function () { clearTimeout(timer); busy(form, false); });
    });
  }

  /* client tools: TK.tool(async function (values) { return [sections] }) uses the default form */
  function clientTool(fn, opts) {
    function go() {
      var root = document.getElementById('tool'); if (!root) return;
      var form = root.querySelector('form[data-tform]'); var out = root.querySelector('.tool-out');
      if (!form) return;
      var run = function (e) {
        if (e) e.preventDefault();
        if (!validate(form)) return;
        try {
          var r = fn(values(form), { form: form, out: out });
          if (r && typeof r.then === 'function') { loading(out); r.then(function (s) { if (s) render(out, s); }, function (er) { error(out, er && er.message ? er.message : 'خطا در پردازش.'); }); }
          else if (r) render(out, r);
        } catch (er) { error(out, er && er.message ? er.message : 'خطا در پردازش.'); }
      };
      form.addEventListener('submit', run);
      form.addEventListener('reset', function () { out.replaceChildren(); });
      if (opts && opts.auto) run();
      if (opts && opts.live) form.addEventListener('input', function () { if (opts.live === true || form.querySelector('[name]')) run(); });
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', go); else go();
  }

  /* section builders for client tools (same shapes as app/Tools/R.php) */
  var S = {
    summary: function (items) { return { type: 'summary', items: items.map(function (i) { return { label: i[0], value: String(i[1]), status: i[2] || 'info' }; }) }; },
    kv: function (title, rows) { return { type: 'kv', title: title, rows: rows.map(function (r) { return [String(r[0]), String(r[1])]; }) }; },
    table: function (title, head, rows) { return { type: 'table', title: title, head: head, rows: rows.map(function (r) { return r.map(String); }) }; },
    checks: function (title, items) { return { type: 'checks', title: title, items: items.map(function (i) { return { status: i[0], label: i[1], detail: i[2] || '' }; }) }; },
    code: function (title, text, lang) { return { type: 'code', title: title, text: String(text), lang: lang || '' }; },
    text: function (text, title) { return { type: 'text', title: title || '', text: String(text) }; },
    alert: function (kind, text) { return { type: 'alert', kind: kind, text: text }; },
    score: function (value, label, title) { return { type: 'score', value: Math.max(0, Math.min(100, Math.round(value))), label: label, title: title || '' }; },
    list: function (title, items) { return { type: 'list', title: title, items: items.map(String) }; },
    download: function (label, filename, mime, content) { return { type: 'download', label: label, filename: filename, mime: mime, content: content }; }
  };
  var FA = '۰۱۲۳۴۵۶۷۸۹';
  function fa(n) { return String(n).replace(/\d/g, function (d) { return FA[d]; }); }
  function nf(n, d) { return fa(Number(n).toLocaleString('en-US', { maximumFractionDigits: d == null ? 2 : d })).replace(/,/g, '٬').replace(/\./g, '٫'); }
  function debounce(f, ms) { var t; return function () { var a = arguments, c = this; clearTimeout(t); t = setTimeout(function () { f.apply(c, a); }, ms); }; }
  function el(id) { return document.getElementById(id); }

  window.TK = { S: S, fa: fa, nf: nf, debounce: debounce, el: el, h: h, icon: icon, render: render, error: error, loading: loading, copy: copy, download: download, values: values, tool: clientTool, R: R };

  function init() { var r = document.getElementById('tool'); if (r && r.getAttribute('data-mode') !== 'client') bindServer(r); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
