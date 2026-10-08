/* 3D 磁鐵實驗室：three.js r128 + OrbitControls（第一次打開才載入）
   兩根長條形磁鐵（紅 N／藍 S）：相吸、相斥、磁力線（從 N 出發回到 S 的流動線）、迴紋針聚在磁極 */
(function(){
  const M = {};
  let R, S, C, ctl, clock, stage, infoEl, ready = false, loading = null;
  let magA, magB, clipsA, clipsB, fieldGrp, dots = [], curves = [];
  let showField = true, mode = 'single', bFlip = false, anim = null;
  const L = 2.4, T = 0.55;                 // 磁鐵長度、粗細
  const A_X = -1.6;                        // 左邊磁鐵中心

  const INFO = {
    single: '一根長條形磁鐵：<b>迴紋針都聚在兩端</b>，中間幾乎沒有。磁力最強的兩端叫做<span class="key">磁極</span>（紅色 N 極、藍色 S 極）。',
    field:  '紫色的線是<b>磁力線</b>：磁力從 <b style="color:#e5484d">N 極</b>出來，繞一圈回到 <b style="color:#2f6fed">S 極</b>。兩端的線最密＝磁力最強。',
    attract:'右邊磁鐵的 <b style="color:#e5484d">N 極</b>靠近左邊磁鐵的 <b style="color:#2f6fed">S 極</b>：<span class="k-red">不同磁極互相吸引</span>，「啪」一聲吸在一起！（異極相吸）',
    repel:  '把右邊磁鐵翻過來，變成 <b style="color:#2f6fed">S 極</b>對 <b style="color:#2f6fed">S 極</b>：<span class="k-red">相同磁極互相排斥</span>，推都推不攏！（同極相斥）看磁力線互相推開。'
  };

  function load(src){ return new Promise((ok,no)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
  async function ensureLib(){
    if(!window.THREE) await load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    if(!THREE.OrbitControls) await load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js');
  }

  function letter(ch, color){
    const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d');
    g.fillStyle = '#fff'; g.beginPath(); g.arc(64,64,58,0,7); g.fill();
    g.fillStyle = color; g.font = 'bold 92px sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(ch,64,70);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map:new THREE.CanvasTexture(c), depthTest:false }));
    sp.scale.set(.42,.42,.42); sp.renderOrder = 5; return sp;
  }
  function makeMagnet(){
    const g = new THREE.Group();
    const geo = new THREE.BoxGeometry(L/2, T, T);
    const red = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color:0xe0322f, roughness:.35, metalness:.2 }));
    const blue = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color:0x2350c8, roughness:.35, metalness:.2 }));
    red.position.x = -L/4; blue.position.x = L/4; g.add(red, blue);
    const n = letter('N','#e0322f'); n.position.set(-L/2+.3, T/2+.32, 0);
    const s = letter('S','#2350c8'); s.position.set(L/2-.3, T/2+.32, 0);
    g.add(n, s); return g;           // 預設：左端 N、右端 S
  }
  function makeClips(sign){
    const g = new THREE.Group();
    const mat = new THREE.MeshStandardMaterial({ color:0xc9ced6, metalness:.9, roughness:.25 });
    for(let i=0;i<16;i++){
      const clip = new THREE.Mesh(new THREE.TorusGeometry(.13,.018,6,24), mat);
      clip.scale.set(1,2.1,1);
      const a = Math.random()*Math.PI*2, r = .12+Math.random()*.28;
      clip.position.set(sign*(L/2+.05+Math.random()*.25), Math.cos(a)*r-.12, Math.sin(a)*r);
      clip.rotation.set(Math.random()*3, Math.random()*3, Math.random()*3);
      g.add(clip);
    }
    return g;
  }

  /* ===== 磁力線：把每根磁鐵當成兩端的 +/- 磁荷，在 (x, ρ) 平面描線，再繞 x 軸轉成 3D ===== */
  function poles(){
    const p = [];
    const add = (cx, leftN) => { p.push([cx-L/2+.12, leftN? 1:-1]); p.push([cx+L/2-.12, leftN? -1:1]); };
    add(A_X, true);
    if(mode !== 'single') add(magB.position.x, !bFlip);
    return p;
  }
  function field(x, y, P){
    let fx=0, fy=0;
    for(const [px,q] of P){ const dx=x-px, dy=y, d2=dx*dx+dy*dy+1e-4, d3=d2*Math.sqrt(d2); fx+=q*dx/d3; fy+=q*dy/d3; }
    return [fx,fy];
  }
  function trace(x, y, P){
    const pts = [[x,y]];
    for(let i=0;i<900;i++){
      const [fx,fy] = field(x,y,P), m = Math.hypot(fx,fy); if(m<1e-6) break;
      x += .025*fx/m; y += .025*fy/m;
      if(y<0) y=-y;
      pts.push([x,y]);
      if(Math.abs(x)>7 || y>4.5) break;
      if(P.some(([px,q])=>q<0 && Math.hypot(x-px,y)<.12)) break;
    }
    return pts;
  }
  function buildField(){
    if(fieldGrp){ S.remove(fieldGrp); fieldGrp.traverse(o=>{ if(o.geometry) o.geometry.dispose(); }); }
    fieldGrp = new THREE.Group(); dots = []; curves = [];
    const P = poles(), lineMat = new THREE.MeshBasicMaterial({ color:0x8b5cf6, transparent:true, opacity:.55 });
    const dotMat = new THREE.MeshBasicMaterial({ color:0xffd23f });
    const starts = [];
    P.filter(p=>p[1]>0).forEach(([px])=>{ for(let k=1;k<=6;k++){ const a = k/7*Math.PI; starts.push([px+.13*Math.cos(a), .13*Math.sin(a)]); } });
    const planes = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3];
    starts.forEach(([sx,sy])=>{
      const pts = trace(sx, sy, P); if(pts.length<8) return;
      planes.forEach((ang,pi)=>{
        if(pi%2 && mode==='single') return;
        const v = pts.filter((_,i)=>i%3===0).map(([x,r])=>new THREE.Vector3(x, r*Math.cos(ang), r*Math.sin(ang)));
        if(v.length<3) return;
        const cv = new THREE.CatmullRomCurve3(v);
        fieldGrp.add(new THREE.Mesh(new THREE.TubeGeometry(cv, Math.min(120,v.length*2), .016, 5, false), lineMat));
        const d = new THREE.Mesh(new THREE.SphereGeometry(.045,8,8), dotMat);
        d.userData = { cv, t:Math.random() }; fieldGrp.add(d); dots.push(d);
      });
    });
    fieldGrp.visible = showField; S.add(fieldGrp);
  }

  function setInfo(k){ if(infoEl) infoEl.innerHTML = '<p>'+INFO[k]+'</p>'; }
  function placeB(x){ magB.position.x = x; clipsB.position.x = x; }
  function moveB(to, done){
    const from = magB.position.x; if(fieldGrp) fieldGrp.visible = false;
    anim = { from, to, t:0, dur: Math.abs(to-from)>.01 ? .9 : .01, done };
  }

  function build(){
    S.add(new THREE.HemisphereLight(0xffffff, 0xb0a890, .9));
    const sun = new THREE.DirectionalLight(0xffffff, .7); sun.position.set(3,6,4); S.add(sun);
    const table = new THREE.Mesh(new THREE.BoxGeometry(14,.2,7), new THREE.MeshStandardMaterial({ color:0xd9b98c, roughness:.8 }));
    table.position.y = -T/2-.1-.02; S.add(table);
    magA = makeMagnet(); magA.position.x = A_X; S.add(magA);
    magB = makeMagnet(); S.add(magB);
    clipsA = new THREE.Group(); clipsA.add(makeClips(-1), makeClips(1)); clipsA.position.x = A_X; S.add(clipsA);
    clipsB = new THREE.Group(); S.add(clipsB);
    M.mode('single');
  }

  function loop(){ requestAnimationFrame(loop); frame(Math.min(clock.getDelta(), .05)); }
  function frame(dt){
    if(anim){
      anim.t += dt/anim.dur; const k = Math.min(1, anim.t), e = k<.5? 2*k*k : 1-Math.pow(-2*k+2,2)/2;
      placeB(anim.from + (anim.to-anim.from)*e);
      if(k>=1){ const d = anim.done; anim = null; buildField(); d && d(); }
    }
    dots.forEach(d=>{ d.userData.t = (d.userData.t + dt*.22) % 1; d.position.copy(d.userData.cv.getPointAt(d.userData.t)); });
    ctl.update(); R.render(S, C);
  }
  function resize(){
    if(!R) return; const w = stage.clientWidth, h = Math.round(w*0.62);
    R.setSize(w, h); C.aspect = w/h; C.updateProjectionMatrix();
  }

  M.init = function(el){
    if(ready || loading) return loading;
    stage = el; infoEl = document.getElementById(el.id+'-info'); el.classList.add('loading');
    loading = ensureLib().then(()=>{
      R = new THREE.WebGLRenderer({ antialias:true }); R.setPixelRatio(Math.min(devicePixelRatio,2));
      R.setClearColor(0xeef3ff); el.appendChild(R.domElement);
      S = new THREE.Scene(); C = new THREE.PerspectiveCamera(42, 1.6, .1, 100); C.position.set(.5, 2.5, 6.6);
      ctl = new THREE.OrbitControls(C, R.domElement); ctl.enableDamping = true; ctl.target.set(.5,.4,0);
      ctl.minDistance = 3; ctl.maxDistance = 14; ctl.maxPolarAngle = Math.PI*0.49;
      clock = new THREE.Clock(); build(); resize(); addEventListener('resize', resize);
      el.classList.remove('loading'); ready = true; loop();
    }).catch(()=>{ el.classList.remove('loading'); el.innerHTML = '<p style="padding:30px">3D 需要網路載入 three.js，請確認連線後重新整理。</p>'; });
    return loading;
  };
  M.mode = function(m){
    if(!ready && !S) return;
    mode = m; clipsB.clear();
    if(m === 'single'){
      magB.visible = false; clipsA.visible = true; bFlip = false; magB.rotation.y = 0;
      placeB(6); buildField(); setInfo('single');
    } else {
      magB.visible = true; clipsA.visible = false;
      bFlip = (m === 'repel'); magB.rotation.y = bFlip ? Math.PI : 0;
      // 左邊磁鐵 A 的右端是 S；B 不翻轉時左端是 N（相吸），翻轉後左端變 S（相斥）
      placeB(A_X + L + 2.2); buildField();
      setTimeout(()=>{
        if(m === 'attract') moveB(A_X + L + .02, ()=>setInfo('attract'));
        else moveB(A_X + L + 1.9, ()=>setInfo('repel'));
      }, 500);
      setInfo(m === 'attract' ? 'attract' : 'repel');
    }
  };
  M.field = function(on){ showField = on === undefined ? !showField : on; if(fieldGrp) fieldGrp.visible = showField; if(showField) setInfo('field'); };
  M.reset = function(){ if(!ready) return; showField = true; C.position.set(.5,2.5,6.6); ctl.target.set(.5,.4,0); M.mode('single'); };
  M._frame = frame;   // 測試用：預覽面板隱藏時 requestAnimationFrame 不會跑
  window.Magnet3D = M;
})();
