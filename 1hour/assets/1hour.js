/* 一小時銜接包：依 window.UNIT 資料渲染整頁 */
(function(){
  const U = window.UNIT; if(!U) return;
  const $ = (s,el=document)=>el.querySelector(s);
  const esc = s => String(s);           // 內容由我們撰寫，允許內嵌 HTML（上下標、粗體）
  const L = 'ABCD';
  const KEY = '1hour:'+location.pathname;
  const store = {
    get(){ try{ return JSON.parse(localStorage.getItem(KEY)||'{}'); }catch(e){ return {}; } },
    set(v){ try{ localStorage.setItem(KEY, JSON.stringify(v)); }catch(e){} }
  };
  const st = Object.assign({done:{}, debt:{}, wrong:{}}, store.get());
  const save = ()=>store.set(st);

  if(U.color){ document.documentElement.style.setProperty('--main', U.color); }
  if(U.soft){ document.documentElement.style.setProperty('--main-soft', U.soft); }
  document.title = U.code+' '+U.title+'｜一小時銜接包';

  /* ---------- 題目元件 ---------- */
  function quiz(q, id, opts={}){
    const box = document.createElement('div'); box.className='q';
    box.innerHTML = (q.src?`<div class="src">${esc(q.src)}</div>`:'') +
      `<div>${esc(q.q)}</div>` + (q.fig?`<div class="fig">${q.fig}</div>`:'') +
      `<div class="opts">${q.opts.map((o,i)=>`<button class="opt" data-i="${i}">(${L[i]}) ${esc(o)}</button>`).join('')}</div>` +
      `<div class="exp"><b>答案 (${L[q.ans]})</b>　${esc(q.exp)}</div>`;
    const exp = $('.exp',box);
    if(opts.reveal){                      // 典型題：先想，再點看解析
      box.querySelectorAll('.opt').forEach(b=>b.disabled=true);
      const r = document.createElement('button'); r.className='btn ghost reveal'; r.textContent='想好了，看答案與解析';
      r.onclick=()=>{ box.querySelectorAll('.opt')[q.ans].classList.add('ok'); exp.classList.add('show'); r.remove(); };
      box.appendChild(r);
      return box;
    }
    box.querySelectorAll('.opt').forEach(b=>{
      b.onclick=()=>{
        const i=+b.dataset.i, right = i===q.ans;
        box.querySelectorAll('.opt').forEach(x=>x.disabled=true);
        b.classList.add(right?'ok':'bad');
        if(!right) box.querySelectorAll('.opt')[q.ans].classList.add('ok');
        exp.classList.add('show');
        if(opts.onAnswer) opts.onAnswer(right);
      };
    });
    return box;
  }

  /* ---------- 頁首 ---------- */
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="hero"><div class="in">
    <div class="crumb"><a href="../">一小時銜接包</a> ／ <a href="./">${esc(U.exam)}</a></div>
    <h1>${esc(U.code)}　${esc(U.title)}</h1>
    <p>${esc(U.subtitle)}</p>
    <span class="pill">⏱ 60 分鐘</span><span class="pill">📄 依 ${U.nSchools} 校段考卷歸納</span><span class="pill">${esc(U.range)}</span>
  </div></header>`);

  const W = document.getElementById('app');

  /* ---------- 進度條 ---------- */
  const secs = U.plan;               // [{id,name,min}]
  const total = secs.reduce((a,s)=>a+s.min,0);
  W.insertAdjacentHTML('beforeend', `<div class="plan"><div class="bar">${secs.map(s=>`<div class="seg" data-s="${s.id}" style="flex:${s.min}" title="${s.name} ${s.min} 分"></div>`).join('')}</div>
    <div class="row"><span id="planTxt">按「開始計時」，照色條一段一段往下走</span>
    <span><button class="btn warm" id="timerBtn">▶ 開始計時</button></span></div></div>`);
  let t0=null, tick=null;
  function paintPlan(){
    let acc=0; const el=t0?(Date.now()-t0)/60000:0; let nowName='';
    secs.forEach(s=>{
      const seg=$(`.seg[data-s="${s.id}"]`); seg.classList.remove('now','done');
      if(st.done[s.id]) seg.classList.add('done');
      else if(t0 && el>=acc && el<acc+s.min){ seg.classList.add('now'); nowName=s.name; }
      acc+=s.min;
    });
    const n = secs.filter(s=>st.done[s.id]).length;
    $('#planTxt').textContent = t0 ? `已過 ${Math.floor(el)} 分／${total} 分　建議現在：${nowName||'收尾'}　（完成 ${n}/${secs.length} 段）`
                                    : `共 ${total} 分鐘、${secs.length} 段；已完成 ${n} 段`;
  }
  $('#timerBtn').onclick=function(){
    if(t0){ clearInterval(tick); t0=null; this.textContent='▶ 開始計時'; }
    else { t0=Date.now(); tick=setInterval(paintPlan,15000); this.textContent='■ 停止計時'; }
    paintPlan();
  };
  function doneBtn(id){
    const b=document.createElement('button'); b.className='btn ghost done-btn';
    const upd=()=>{ b.textContent = st.done[id]?'✅ 這段完成了（再按取消）':'☐ 這段讀完，打勾'; };
    b.onclick=()=>{ st.done[id]=!st.done[id]; save(); upd(); paintPlan(); }; upd();
    return b;
  }
  function section(id, title, tag){
    const s=secs.find(x=>x.id===id);
    W.insertAdjacentHTML('beforeend', `<h2 id="${id}">${title}${s?`<span class="tag">約 ${s.min} 分</span>`:''}${tag?`<span class="tag">${tag}</span>`:''}</h2>`);
  }

  /* ---------- ① 重點地圖 ---------- */
  section('map','🗺 重點地圖：這章到底考什麼');
  const mc=document.createElement('div'); mc.className='card';
  mc.innerHTML = `<p class="muted small">統計 ${U.nSchools} 所學校 114 學年度第一次段考卷，每個觀念「有幾校出題」。A 級＝必考，下面做成精華卡；B 級＝知道就好，在後面快速帶過。點一列可直接跳過去。</p>
    <div class="map">${U.map.map(m=>`<div class="mrow" data-go="${m.go}"><div class="nm"><span class="lv ${m.lv}">${m.lv}</span>${esc(m.name)}</div>
      <div class="mbar"><i style="width:${m.n/U.nSchools*100}%"></i></div><div class="ct">${m.n}/${U.nSchools}</div></div>`).join('')}</div>`;
  mc.appendChild(doneBtn('map')); W.appendChild(mc);
  mc.querySelectorAll('.mrow').forEach(r=>r.onclick=()=>document.getElementById(r.dataset.go)?.scrollIntoView({behavior:'smooth'}));

  /* ---------- ② 精華卡 ---------- */
  section('cards','💡 精華卡：A 級必考觀念');
  W.insertAdjacentHTML('beforeend', `<p class="muted">每張卡照順序走：<b>一句話</b> → <b>圖／公式</b> → <b>典型題</b>（先自己想） → <b>陷阱</b> → <b>換你做</b>（做對才算懂）。</p>`);
  U.cards.forEach((c,ci)=>{
    const d=document.createElement('div'); d.className='card ess'; d.id=c.id;
    d.innerHTML = `<div class="head"><h3>${ci+1}. ${esc(c.title)}</h3><span class="freq">${U.nSchools} 校中 ${c.n} 校考</span></div>
      <div class="step one"><div class="lab">① 一句話</div>${esc(c.one)}</div>
      ${c.fig||c.formula?`<div class="step"><div class="lab">② 圖／公式</div>${c.formula?`<div>${c.formula}</div>`:''}${c.fig?`<div class="fig">${c.fig}</div>`:''}</div>`:''}
      <div class="step ex"><div class="lab">③ 典型題（先自己想答案）</div></div>
      <div class="step trap"><div class="lab">④ 陷阱：最常錯在這</div>${esc(c.trap)}</div>
      <div class="step pr"><div class="lab">⑤ 換你做（點選項）</div></div>`;
    $('.ex',d).appendChild(quiz(c.ex,c.id+'-ex',{reveal:true}));
    $('.pr',d).appendChild(quiz(c.pr,c.id+'-pr'));
    d.appendChild(doneBtn(c.id));
    W.appendChild(d);
  });

  /* ---------- ③ 名詞對照 ---------- */
  section('terms','📖 名詞對照：老師下一堂會說出口的詞');
  const tc=document.createElement('div'); tc.className='card';
  tc.innerHTML=`<div class="terms">${U.terms.map(t=>`<div class="term"><b>${esc(t[0])}</b><br>${esc(t[1])}</div>`).join('')}</div>`;
  tc.appendChild(doneBtn('terms')); W.appendChild(tc);

  /* ---------- ④ B 級快速帶過 ---------- */
  section('blist','⚡ B 級：一句話帶過');
  const bc=document.createElement('div'); bc.className='card';
  bc.innerHTML=`<div class="blist">${U.blist.map(b=>`<div class="bitem" id="${b.id||''}"><b>${esc(b.t)}</b>${esc(b.d)}</div>`).join('')}</div>`;
  bc.appendChild(doneBtn('blist')); W.appendChild(bc);

  /* ---------- ⑤ 銜接檢查 ---------- */
  section('check','✅ 銜接檢查：做得出來就接得上');
  const cc=document.createElement('div'); cc.className='card';
  cc.innerHTML=`<p class="muted small">${esc(U.checkNote)}</p><div class="score" id="score">得分：0 / ${U.check.length}</div>`;
  let right=0, answered=0;
  U.check.forEach((q,i)=>{
    const w=document.createElement('div'); w.className='cq';
    w.innerHTML=`<b>第 ${i+1} 題</b>`;
    w.appendChild(quiz(q,'ck'+i,{onAnswer:ok=>{
      answered++; if(ok) right++;
      st.wrong['ck'+i] = ok ? undefined : q.debt;
      save(); renderDebt();
      $('#score').textContent=`得分：${right} / ${U.check.length}`+(answered===U.check.length?(right===U.check.length?'　🎉 全對，可以接下一堂課！':'　錯的題目已自動加進下面的欠債清單'):'');
    }}));
    cc.appendChild(w);
  });
  cc.appendChild(doneBtn('check')); W.appendChild(cc);

  /* ---------- ⑥ 欠債清單 ---------- */
  section('debt','📋 欠債清單：這一小時沒練到、回家要補的');
  const dc=document.createElement('div'); dc.className='card debt'; W.appendChild(dc);
  function renderDebt(){
    const auto = Object.entries(st.wrong).filter(([k,v])=>v);
    dc.innerHTML = auto.map(([k,v])=>`<label><input type="checkbox" data-k="${k}" ${st.debt[k]?'checked':''}><span><span class="auto">［銜接檢查答錯］</span>${esc(v)}</span></label>`).join('') +
      U.debts.map((d,i)=>`<label><input type="checkbox" data-k="d${i}" ${st.debt['d'+i]?'checked':''}><span>${esc(d)}</span></label>`).join('');
    dc.querySelectorAll('input').forEach(x=>x.onchange=()=>{ st.debt[x.dataset.k]=x.checked; save(); });
  }
  renderDebt();

  /* ---------- 下一堂課 ---------- */
  W.insertAdjacentHTML('beforeend', `<div class="card next"><h3>➡ 下一堂課銜接</h3>${esc(U.next)}</div>
    <p class="muted small">資料來源：${esc(U.sources)}。典型題與練習題依各校常考題型改編，數字與情境已調整。</p>
    <footer>全民補習班　一小時銜接包</footer>`);
  paintPlan();
})();
