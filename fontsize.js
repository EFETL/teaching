/* fontsize.js — teaching.efetl.com 通用「字體大小」調整（100%～400%）
 * 用法：在頁面 </body> 前加  <script src="/fontsize.js" defer></script>
 * 做法：用 CSS zoom 縮放整頁（等同瀏覽器放大，版面會自動重排），設定存在 localStorage，跨頁沿用。
 * 面板本身不跟著放大，固定在左下角。列印時自動還原。 */
(function () {
  if (window.__efetlFs) return; window.__efetlFs = 1;
  var KEY = 'efetl-fs', MIN = 100, MAX = 400, STEP = 25;
  var root = document.documentElement;
  var cur = parseInt(localStorage.getItem(KEY) || '100', 10);
  if (!(cur >= MIN && cur <= MAX)) cur = 100;

  var box = document.createElement('div');
  box.id = 'efetl-fs';
  box.setAttribute('role', 'group'); box.setAttribute('aria-label', '字體大小');
  box.innerHTML =
    '<button type="button" data-a="dn" aria-label="縮小字體">A−</button>' +
    '<input type="range" min="' + MIN + '" max="' + MAX + '" step="' + STEP + '" aria-label="字體大小百分比">' +
    '<button type="button" data-a="up" aria-label="放大字體">A＋</button>' +
    '<span class="v"></span>' +
    '<button type="button" data-a="rs" aria-label="還原">還原</button>';
  var st = document.createElement('style');
  st.textContent =
    '#efetl-fs{position:fixed;left:10px;bottom:10px;z-index:2147483000;display:flex;align-items:center;gap:6px;' +
    'background:rgba(255,255,255,.96);border:1px solid #bbb;border-radius:26px;padding:6px 10px;box-shadow:0 2px 10px rgba(0,0,0,.25);' +
    'font:16px/1 "Noto Sans TC","Microsoft JhengHei",sans-serif;color:#222;transform-origin:left bottom}' +
    '#efetl-fs button{border:1px solid #999;background:#f4f4f4;border-radius:16px;min-width:38px;height:34px;padding:0 8px;font-size:16px;cursor:pointer;color:#222}' +
    '#efetl-fs button:hover{background:#ddd}' +
    '#efetl-fs input{width:110px}' +
    '#efetl-fs .v{min-width:46px;text-align:center;font-weight:700}' +
    '@media print{#efetl-fs{display:none!important}html{zoom:1!important}}';
  document.head.appendChild(st);

  var sl = box.querySelector('input'), vv = box.querySelector('.v');
  function apply(n, save) {
    n = Math.max(MIN, Math.min(MAX, Math.round(n / STEP) * STEP));
    cur = n;
    root.style.zoom = n === 100 ? '' : (n / 100);
    box.style.zoom = n === 100 ? '' : (100 / n);   // 面板維持原大小
    sl.value = n; vv.textContent = n + '%';
    if (save !== false) localStorage.setItem(KEY, String(n));
  }
  box.addEventListener('click', function (e) {
    var a = e.target && e.target.getAttribute && e.target.getAttribute('data-a');
    if (a === 'up') apply(cur + STEP); else if (a === 'dn') apply(cur - STEP); else if (a === 'rs') apply(100);
  });
  sl.addEventListener('input', function () { apply(parseInt(sl.value, 10)); });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
      if (e.key === '+' || e.key === '=') { apply(cur + STEP); e.preventDefault(); }
      else if (e.key === '-' || e.key === '_') { apply(cur - STEP); e.preventDefault(); }
    }
  });
  function mount() { document.body.appendChild(box); apply(cur, false); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
