/* mobile.js — teaching.efetl.com 手機版面微調（只在窄螢幕／手機上作用，電腦版完全不變）
 * 1) 補上 viewport 設定（少數舊頁面沒有）
 * 2) 選單頁（首頁／各科首頁）手機改單欄、字加大
 * 3) 太寬的表格自動加「左右滑動」外框，不再把整頁撐寬
 * 4) 小於 13px 的字加大到 13px（手機上看得清楚）
 * 5) 仍然比螢幕寬的固定版面（例如 A4 試卷版面）：讓手機自動縮到剛好一頁寬，可雙指放大
 * 用法：<script src="/mobile.js" defer></script> */
(function () {
  if (window.__efetlMob) return; window.__efetlMob = 1;
  var NARROW = 820;
  function isNarrow() { return Math.min(window.innerWidth, screen.width || 9999) <= NARROW || /Android|iPhone|iPad|Mobile/i.test(navigator.userAgent) && window.innerWidth <= 1024; }

  var vp = document.querySelector('meta[name=viewport]');
  if (!vp) { vp = document.createElement('meta'); vp.name = 'viewport'; vp.content = 'width=device-width, initial-scale=1'; document.head.appendChild(vp); }

  var st = document.createElement('style');
  st.textContent =
    '@media(max-width:480px){' +
    '.hubgrid,.vgrid{grid-template-columns:1fr!important;gap:14px!important}' +
    '.hub-top,.vol-top{height:108px!important}' +
    '.hub-body p,.vol-body p{font-size:15.5px!important;line-height:1.6!important}' +
    '.hub-body h2,.vol-body h2{font-size:22px!important}' +
    '.hub-go,.vol-body .go{font-size:16px!important;padding:8px 22px!important}' +
    '}' +
    '.efetl-tw{overflow-x:auto;-webkit-overflow-scrolling:touch;max-width:100%}' +
    '@media(max-width:820px){body{-webkit-text-size-adjust:100%;text-size-adjust:100%}img,video{max-width:100%;height:auto}}';
  document.head.appendChild(st);

  function wrapTables() {
    document.querySelectorAll('table').forEach(function (t) {
      var p = t.parentElement;
      if (!p || p.classList.contains('efetl-tw') || t.closest('.efetl-tw')) return;
      if (t.offsetWidth > (p.clientWidth || window.innerWidth) + 2 || t.scrollWidth > window.innerWidth) {
        var w = document.createElement('div'); w.className = 'efetl-tw';
        p.insertBefore(w, t); w.appendChild(t);
      }
    });
  }
  function bumpSmallText() {
    var all = document.body.querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      if (e.children.length) continue;
      var tx = (e.textContent || '').trim(); if (tx.length < 2) continue;
      var tag = e.tagName; if (/^(SCRIPT|STYLE|SVG|CANVAS|OPTION)$/.test(tag)) continue;
      var fs = parseFloat(getComputedStyle(e).fontSize);
      if (fs && fs < 13) e.style.fontSize = '13px';
    }
  }
  function fitWide() {
    var sw = Math.max(document.documentElement.scrollWidth, document.body ? document.body.scrollWidth : 0);
    var iw = window.innerWidth;
    if (sw > iw + 6 && sw < 2600) vp.content = 'width=' + sw + ', initial-scale=' + (iw / sw).toFixed(3) + ', minimum-scale=' + (iw / sw / 2).toFixed(3);
  }
  function run() {
    if (!isNarrow()) return;
    wrapTables(); bumpSmallText();
    setTimeout(function () { wrapTables(); fitWide(); }, 400);
  }
  if (document.readyState === 'complete') setTimeout(run, 50); else window.addEventListener('load', function () { setTimeout(run, 50); });
})();
