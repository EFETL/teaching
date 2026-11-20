/* fontsize.js — teaching.efetl.com 通用「字體大小」調整（100%～400%）
 * 用法：在頁面 </body> 前加  <script src="/fontsize.js" defer></script>
 * 做法：對 body 底下的「內容區塊」逐一套用 CSS zoom（等同瀏覽器放大，版面自動重排）；
 *       固定在畫面上的浮動元件（手寫工具列／畫布、回頂端鈕、本面板）不縮放，所以手寫筆的座標不會跑掉。
 *       設定存在 localStorage，跨頁沿用；列印時自動還原。 */
(function () {
  if (window.__efetlFs) return; window.__efetlFs = 1;
  var KEY = 'efetl-fs', MIN = 100, MAX = 400, STEP = 25;
  var cur = parseInt(localStorage.getItem(KEY) || '100', 10);
  if (!(cur >= MIN && cur <= MAX)) cur = 100;
  var SKIP = /^(SCRIPT|STYLE|LINK|META|TEMPLATE|NOSCRIPT|BR)$/;

  var box = document.createElement('div');
  box.id = 'efetl-fs'; box.setAttribute('data-nofs', '1');
  box.setAttribute('role', 'group'); box.setAttribute('aria-label', '字體大小');
  box.innerHTML =
    '<button type="button" data-a="dn" aria-label="縮小字體">A−</button>' +
    '<input type="range" min="' + MIN + '" max="' + MAX + '" step="' + STEP + '" aria-label="字體大小百分比">' +
    '<button type="button" data-a="up" aria-label="放大字體">A＋</button>' +
    '<span class="v"></span>' +
    '<button type="button" data-a="rs" aria-label="還原">還原</button>';
  var st = document.createElement('style');
  st.textContent =
    '#efetl-fs{position:fixed;left:10px;bottom:62px;z-index:2147483000;display:flex;align-items:center;gap:6px;' +
    'background:rgba(255,255,255,.96);border:1px solid #bbb;border-radius:26px;padding:6px 10px;box-shadow:0 2px 10px rgba(0,0,0,.25);' +
    'font:16px/1 "Noto Sans TC","Microsoft JhengHei",sans-serif;color:#222}' +
    '#efetl-fs button{border:1px solid #999;background:#f4f4f4;border-radius:16px;min-width:38px;height:34px;padding:0 8px;font-size:16px;cursor:pointer;color:#222;font-family:inherit}' +
    '#efetl-fs button:hover{background:#ddd}' +
    '#efetl-fs input{width:110px}' +
    '#efetl-fs .v{min-width:46px;text-align:center;font-weight:700}' +
    '@media print{#efetl-fs{display:none!important}}';
  document.head.appendChild(st);

  var sl = box.querySelector('input'), vv = box.querySelector('.v');

  /* 取得要縮放的區塊：body 的子元素（排除固定定位的浮動元件）；手寫功能的 #penZoom 外殼則改取它的子元素 */
  function targets() {
    var out = [];
    (function walk(parent) {
      Array.prototype.forEach.call(parent.children, function (e) {
        if (SKIP.test(e.tagName) || e.getAttribute('data-nofs')) return;
        if (e.id === 'penZoom') { walk(e); return; }
        var pos = getComputedStyle(e).position;
        if (pos === 'fixed') return;
        out.push(e);
      });
    })(document.body);
    return out;
  }
  var lastSet = [];
  function paint() {
    lastSet.forEach(function (e) { if (e.__fs) { e.style.zoom = ''; e.__fs = 0; } });
    lastSet = [];
    if (cur === 100) return;
    targets().forEach(function (e) { e.style.zoom = cur / 100; e.__fs = 1; lastSet.push(e); });
  }
  function apply(n, save) {
    n = Math.max(MIN, Math.min(MAX, Math.round(n / STEP) * STEP));
    cur = n; sl.value = n; vv.textContent = n + '%';
    if (save !== false) localStorage.setItem(KEY, String(n));
    paint();
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
  /* 頁面後來才加入的區塊（例如第一次開手寫會把內容包進 #penZoom）也要跟上 */
  var t = 0;
  function mount() {
    document.body.appendChild(box);
    apply(cur, false);
    new MutationObserver(function (m) {
      if (cur === 100 || t) return;
      t = setTimeout(function () { t = 0; paint(); }, 80);
    }).observe(document.body, { childList: true });
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
