/* 3D 透視植物：three.js r128 + OrbitControls（第一次打開才載入） */
(function(){
  const P = {};
  let R, S, C, ctl, clock, box, labelEl, infoEl;
  let skins = [], inner = [], flows = { w: [], f: [], a: [] }, rays, leafMats = [];
  const mode = { x:false, w:false, s:false, f:false };
  const parts = {};            // name -> {objs:[], anchor:Vector3, dist}
  let tween = null, ready = false, loading = null;

  const INFO = {
    '根':  '根長在土裡，<b>抓住土壤</b>，並從土裡<span class="k-water">吸收水分</span>（藍色）。這棵植物有一條明顯的主根，是<b>軸根</b>。',
    '莖':  '莖<b>支撐</b>植物往上長。打開透視可以看到莖裡的「水管」：<span class="k-water">藍色送水往上</span>、<span class="k-food">橘色送養分往下</span>。',
    '葉':  '葉子照<span class="k-sun">陽光</span>、接觸<span class="k-air">空氣</span>，用水<b>製造養分</b>（光合作用）。葉子在莖上<b>互相錯開</b>（互生），每片都照得到陽光。',
    '花':  '花由外而內有<b>花萼、花瓣、雄蕊、雌蕊</b>。中間的雌蕊以後會長成果實。',
    '果實':'果實<b>保護種子</b>。成熟時顏色鮮豔，吸引動物來吃，把種子帶到別的地方。',
    '種子':'打開透視，看到果實<b>裡面的種子</b>！種子在適當的環境會發芽，長成新植物。'
  };

  function load(src){ return new Promise((ok,no)=>{ const s=document.createElement('script'); s.src=src; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
  async function ensureLib(){
    if(!window.THREE) await load('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
    if(!THREE.OrbitControls) await load('https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js');
  }

  function skinMat(color, opts){
    const m = new THREE.MeshStandardMaterial(Object.assign({ color, roughness:.65, metalness:0, transparent:true, opacity:1, side:THREE.DoubleSide }, opts||{}));
    m.userData.base = m.opacity; skins.push(m); return m;
  }
  function innerMat(color){
    const m = new THREE.MeshBasicMaterial({ color, transparent:true, opacity:0 });
    inner.push(m); return m;
  }
  function addPart(name, obj, anchor, dist){
    obj.traverse(o=>{ if(o.isMesh) o.userData.part = name; });
    (parts[name] = parts[name] || { objs:[], anchor, dist }).objs.push(obj);
  }
  function tube(points, r, mat, seg){
    const curve = new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));
    return new THREE.Mesh(new THREE.TubeGeometry(curve, seg||32, r, 10, false), mat);
  }

  function build(){
    S = new THREE.Scene();
    S.background = new THREE.Color(0xeef6ff);
    S.add(new THREE.HemisphereLight(0xffffff, 0x8d6e63, .85));
    const sunLight = new THREE.DirectionalLight(0xfff3c4, .9); sunLight.position.set(-5,9,4); S.add(sunLight);

    // 透明玻璃盆＋土壤
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(2.35,2.1,2.9,48,1,true),
      new THREE.MeshStandardMaterial({ color:0xbfe0ff, transparent:true, opacity:.07, side:THREE.DoubleSide, depthWrite:false }));
    pot.position.y = -1.45; S.add(pot);
    const soil = new THREE.Mesh(new THREE.CylinderGeometry(2.25,2.05,2.7,48), skinMat(0x6d4c41, { roughness:1 }));
    soil.position.y = -1.4; S.add(soil); soil.userData.part = '根';
    soil.material.userData.xray = .12;

    // 根
    const rootMat = skinMat(0xc49a63);
    const roots = new THREE.Group();
    const tapPts = [[0,0,0],[.05,-.7,.03],[-.04,-1.5,0],[.03,-2.4,.02]];
    roots.add(tube(tapPts, .11, rootMat));
    const lat = [];
    for(let i=0;i<9;i++){
      const y = -.35 - i*.22, a = i*2.4, len = .9 - i*.05;
      const p = [[0,y,0],[Math.cos(a)*len*.5, y-.2, Math.sin(a)*len*.5],[Math.cos(a)*len, y-.55, Math.sin(a)*len]];
      roots.add(tube(p, .035, rootMat, 16)); lat.push(p[2]);
    }
    S.add(roots); addPart('根', roots, new THREE.Vector3(0,-1.3,0), 5.5);
    roots.add(tube(tapPts, .04, innerMat(0x2f80ed)));   // 根裡的水管

    // 莖（外皮＋兩條管子）
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(.15,.2,6,28), skinMat(0x4caf50));
    stem.position.y = 3; S.add(stem); addPart('莖', stem, new THREE.Vector3(0,2.6,0), 6.5);
    const xyl = new THREE.Mesh(new THREE.CylinderGeometry(.05,.05,6.1,12), innerMat(0x2f80ed)); xyl.position.set(-.06,3,0); S.add(xyl);
    const phl = new THREE.Mesh(new THREE.CylinderGeometry(.045,.045,6.1,12), innerMat(0xf2792b)); phl.position.set(.06,3,0); S.add(phl);

    // 葉（互生）
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0,0); leafShape.bezierCurveTo(.42,.28,.5,.95,0,1.5); leafShape.bezierCurveTo(-.5,.95,-.42,.28,0,0);
    const leafGeo = new THREE.ShapeGeometry(leafShape, 24);
    leafGeo.rotateZ(-Math.PI/2); leafGeo.rotateX(-Math.PI/2);
    const leafInfo = [];
    const H = [1.5,2.4,3.3,4.2,5.0], A = [0, Math.PI, .7, Math.PI+.7, 1.4];
    const leaves = new THREE.Group();
    H.forEach((h,i)=>{
      const g = new THREE.Group(); g.position.set(0,h,0); g.rotation.y = A[i];
      const tilt = new THREE.Group(); tilt.rotation.z = .35; g.add(tilt);
      const pet = new THREE.Mesh(new THREE.CylinderGeometry(.03,.04,.5,8), skinMat(0x66bb6a)); pet.rotation.z = Math.PI/2; pet.position.x = .3; tilt.add(pet);
      const lm = skinMat(0x43a047, { emissive:0x000000 }); leafMats.push(lm);
      const lf = new THREE.Mesh(leafGeo, lm); lf.position.x = .5; lf.rotation.x = (i%2?-1:1)*.75; lf.scale.setScalar(1.15 - i*.06); tilt.add(lf);
      const rib = new THREE.Mesh(new THREE.CylinderGeometry(.018,.018,1.5,6), new THREE.MeshBasicMaterial({ color:0xc5e1a5 }));
      rib.rotation.z = Math.PI/2; rib.position.set(1.2,.01,0); rib.scale.y = 1.15 - i*.06; tilt.add(rib);
      const vein = new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,1.6,6), innerMat(0x2f80ed)); vein.rotation.z = Math.PI/2; vein.position.set(1.15,.03,0); tilt.add(vein);
      leaves.add(g); leafInfo.push({ g, tilt, len:(1.15 - i*.06)*1.6 });
    });
    S.add(leaves); addPart('葉', leaves, new THREE.Vector3(.4,3.2,.3), 6);

    // 花
    const flower = new THREE.Group(); flower.position.set(0,6.05,0);
    const petShape = new THREE.Shape(); petShape.moveTo(0,0); petShape.bezierCurveTo(.25,.15,.25,.55,0,.65); petShape.bezierCurveTo(-.25,.55,-.25,.15,0,0);
    const petGeo = new THREE.ShapeGeometry(petShape, 16);
    for(let i=0;i<5;i++){
      const p = new THREE.Mesh(petGeo, skinMat(0xf48fb1)); p.rotation.order='YXZ'; p.rotation.y = i*Math.PI*2/5; p.rotation.x = -1.05; flower.add(p);
      const sp = new THREE.Mesh(new THREE.ConeGeometry(.06,.3,6), skinMat(0x558b2f)); sp.rotation.order='YXZ'; sp.rotation.y = i*Math.PI*2/5+.6; sp.rotation.x = 2.2; sp.position.y = -.05; flower.add(sp);
    }
    for(let i=0;i<6;i++){
      const a = i*Math.PI/3, st = new THREE.Group(); st.rotation.y = a;
      const fil = new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,.42,6), skinMat(0xfff59d)); fil.position.set(.1,.2,0); fil.rotation.z = -.35; st.add(fil);
      const an = new THREE.Mesh(new THREE.SphereGeometry(.04,10,8), skinMat(0xf9a825)); an.position.set(.17,.4,0); st.add(an);
      flower.add(st);
    }
    const pis = new THREE.Mesh(new THREE.CylinderGeometry(.03,.07,.55,10), skinMat(0x9ccc65)); pis.position.y = .27; flower.add(pis);
    const stig = new THREE.Mesh(new THREE.SphereGeometry(.06,10,8), skinMat(0x7cb342)); stig.position.y = .56; flower.add(stig);
    S.add(flower); addPart('花', flower, new THREE.Vector3(0,6.2,0), 3.2);

    // 果實＋種子
    const fb = new THREE.Group(); fb.position.set(0,3.85,0); fb.rotation.y = 2.4;
    const br = new THREE.Mesh(new THREE.CylinderGeometry(.04,.05,.8,8), skinMat(0x4caf50)); br.rotation.z = Math.PI/2.6; br.position.set(.32,-.1,0); fb.add(br);
    const fruit = new THREE.Mesh(new THREE.SphereGeometry(.42,32,24), skinMat(0xd32f2f, { roughness:.35 })); fruit.position.set(.72,-.55,0); fb.add(fruit);
    fruit.material.userData.xray = .22;
    const seeds = new THREE.Group(); seeds.position.copy(fruit.position);
    for(let i=0;i<7;i++){
      const s = new THREE.Mesh(new THREE.SphereGeometry(.055,10,8), new THREE.MeshStandardMaterial({ color:0xf5e6b8, roughness:.8 }));
      s.scale.set(1,.7,1.4); const a=i*0.9, r=.18; s.position.set(Math.cos(a)*r, (i%3-1)*.12, Math.sin(a)*r); seeds.add(s);
    }
    seeds.visible = false; fb.add(seeds);
    S.add(fb);
    fb.updateMatrixWorld(true);
    const fruitW = fruit.getWorldPosition(new THREE.Vector3());
    addPart('果實', fruit, fruitW.clone(), 2.6);
    addPart('種子', seeds, fruitW.clone(), 2.0);
    P._seeds = seeds;

    // 太陽與光線
    const sun = new THREE.Mesh(new THREE.SphereGeometry(.55,24,16), new THREE.MeshBasicMaterial({ color:0xffd54f }));
    sun.position.set(-4.5,8.5,2.5); S.add(sun);
    rays = new THREE.Group(); S.add(rays); rays.visible = false;

    // 粒子路徑
    S.updateMatrixWorld(true);
    const leafPts = leafInfo.map(L=>{
      const base = L.tilt.localToWorld(new THREE.Vector3(.1,0,0));
      const mid  = L.tilt.localToWorld(new THREE.Vector3(.5+L.len*.45,.02,0));
      const tip  = L.tilt.localToWorld(new THREE.Vector3(.5+L.len*.85,.02,0));
      return { base, mid, tip };
    });
    const V = (x,y,z)=>new THREE.Vector3(x,y,z);
    leafPts.forEach((L,i)=>{
      const t = lat[(i*2)%lat.length];
      flows.w.push(new THREE.CatmullRomCurve3([V(...t), V(0,t[1]+.3,0), V(-.06,0,0), V(-.06,L.base.y,0), L.base, L.mid, L.tip]));
      flows.f.push(new THREE.CatmullRomCurve3([L.tip, L.mid, L.base, V(.06,L.base.y,0), V(.06,0,0), V(0,-1.2,0), V(...lat[(i*2+1)%lat.length])]));
      const ray = new THREE.CatmullRomCurve3([sun.position.clone(), L.mid.clone().lerp(sun.position,.5), L.mid]);
      flows.a.push({ curve: ray, kind:'sun' });
      flows.a.push({ curve: new THREE.CatmullRomCurve3([V(5,L.mid.y+.6,2), V(3,L.mid.y+.3,1), L.mid]), kind:'air' });
    });
    flows.w.push(new THREE.CatmullRomCurve3([V(...lat[3]), V(0,-1,0), V(-.06,0,0), V(-.06,6,0), V(0,6.3,0)]));
    flows.f.push(new THREE.CatmullRomCurve3([leafPts[2].tip, leafPts[2].base, V(.06,leafPts[2].base.y,0), V(.06,3.85,0), fruitW]));

    makeParticles('w', flows.w, 0x2f80ed, 7, .085, .16);
    makeParticles('f', flows.f, 0xf2792b, 7, .085, .14);
    makeParticles('sun', flows.a.filter(a=>a.kind==='sun').map(a=>a.curve), 0xffc107, 5, .09, .2);
    makeParticles('air', flows.a.filter(a=>a.kind==='air').map(a=>a.curve), 0x90a4ae, 4, .07, .12);
  }

  const dots = { w:[], f:[], sun:[], air:[] };
  function makeParticles(kind, curves, color, per, size, speed){
    const geo = new THREE.SphereGeometry(size, 10, 8), mat = new THREE.MeshBasicMaterial({ color });
    curves.forEach(c=>{ for(let k=0;k<per;k++){ const m = new THREE.Mesh(geo, mat); m.visible=false; m.userData={ c, t:k/per, speed }; S.add(m); dots[kind].push(m); } });
  }

  function applyMode(){
    const xr = mode.x;
    skins.forEach(m=>{ const target = xr ? (m.userData.xray ?? .2) : m.userData.base; m.opacity = target; m.depthWrite = !xr || target > .5; m.needsUpdate = true; });
    inner.forEach(m=>{ m.opacity = xr ? .95 : 0; });
    P._seeds.visible = xr;
    dots.w.forEach(d=>d.visible = mode.w);
    dots.f.forEach(d=>d.visible = mode.f);
    dots.sun.forEach(d=>d.visible = mode.s);
    dots.air.forEach(d=>d.visible = mode.s);
    box.querySelectorAll('[data-m]').forEach(b=>b.classList.toggle('on', !!mode[b.dataset.m]));
  }

  function focus(name){
    const p = parts[name]; if(!p) return;
    if(name==='根' || name==='種子'){ mode.x = true; applyMode(); }
    const dir = C.position.clone().sub(ctl.target).normalize();
    tween = { t:0, fromT: ctl.target.clone(), toT: p.anchor.clone(), fromP: C.position.clone(), toP: p.anchor.clone().add(dir.multiplyScalar(p.dist)) };
    showLabel(name);
    box.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on', b.dataset.p===name));
    infoEl.innerHTML = `<h4>🔍 ${name}</h4><p>${INFO[name]}</p>`;
  }
  let labelPart = null;
  function showLabel(name){ labelPart = name; labelEl.textContent = name; labelEl.style.opacity = 1; }

  function resize(){
    const w = box.querySelector('.p3d-stage').clientWidth, h = Math.round(w * (w < 600 ? 1.15 : .8));
    R.setSize(w, h); C.aspect = w/h; C.updateProjectionMatrix();
  }

  function loop(){
    requestAnimationFrame(loop);
    const stage = box.querySelector('.p3d-stage');
    if(!stage.offsetParent) return;                       // 看不到時不算圖
    const dt = Math.min(clock.getDelta(), .05);
    if(tween){ tween.t = Math.min(1, tween.t + dt*1.4); const e = 1-Math.pow(1-tween.t,3);
      ctl.target.lerpVectors(tween.fromT, tween.toT, e); C.position.lerpVectors(tween.fromP, tween.toP, e); if(tween.t>=1) tween=null; }
    for(const k in dots){ for(const d of dots[k]){ if(!d.visible) continue; d.userData.t = (d.userData.t + dt*d.userData.speed) % 1; d.position.copy(d.userData.c.getPointAt(d.userData.t)); } }
    const glow = mode.s ? (Math.sin(performance.now()/300)*.5+.5) : 0;
    leafMats.forEach(m=>m.emissive.setRGB(glow*.35, glow*.32, 0));
    ctl.update();
    R.render(S, C);
    if(labelPart){ const v = parts[labelPart].anchor.clone().project(C);
      labelEl.style.left = ((v.x+1)/2*100)+'%'; labelEl.style.top = ((1-v.y)/2*100)+'%'; }
  }

  P.init = async function(el){
    box = el;
    if(ready || loading) return loading;
    loading = (async()=>{
      const stage = box.querySelector('.p3d-stage'); stage.classList.add('loading');
      try{ await ensureLib(); }catch(e){ stage.innerHTML = '<p style="padding:20px">3D 模型需要網路才能載入，請連上網路後重新整理。</p>'; return; }
      R = new THREE.WebGLRenderer({ antialias:true }); R.setPixelRatio(Math.min(devicePixelRatio, 2));
      stage.appendChild(R.domElement);
      labelEl = document.createElement('span'); labelEl.className = 'p3d-label'; stage.appendChild(labelEl);
      infoEl = box.querySelector('.p3d-info');
      C = new THREE.PerspectiveCamera(42, 1, .1, 100); C.position.set(8, 7, 10.5);
      build();
      ctl = new THREE.OrbitControls(C, R.domElement); ctl.target.set(0,2.4,0); ctl.enableDamping = true; ctl.minDistance = 1.8; ctl.maxDistance = 22;
      ctl.autoRotate = true; ctl.autoRotateSpeed = 1.6;
      clock = new THREE.Clock();
      resize(); addEventListener('resize', resize);
      // 點選部位
      let down = null; const ray = new THREE.Raycaster(), mv = new THREE.Vector2();
      R.domElement.addEventListener('pointerdown', e=>{ down=[e.clientX,e.clientY]; ctl.autoRotate=false; });
      R.domElement.addEventListener('pointerup', e=>{
        if(!down || Math.hypot(e.clientX-down[0], e.clientY-down[1]) > 6) return;
        const r = R.domElement.getBoundingClientRect(); mv.set((e.clientX-r.left)/r.width*2-1, -(e.clientY-r.top)/r.height*2+1);
        ray.setFromCamera(mv, C);
        const hit = ray.intersectObjects(S.children, true).find(h=>h.object.userData.part && h.object.visible);
        if(hit) focus(hit.object.userData.part);
      });
      stage.classList.remove('loading'); ready = true; applyMode(); loop();
    })();
    return loading;
  };
  P.toggle = function(k){ if(!ready) return; mode[k] = !mode[k]; if((k==='w'||k==='f') && mode[k]) mode.x = true; applyMode();
    const msg = { x: mode.x ? '透視模式：外皮變透明，看到<b>土裡的根</b>、莖裡的<span class="k-water">藍色水管</span>和<span class="k-food">橘色養分管</span>、果實裡的<b>種子</b>。' : '回到一般模式。',
      w: '💧 <span class="k-water">藍色水分</span>從根吸進來，經過莖的水管<b>往上</b>，送到每一片葉子和花。',
      s: '☀️ <span class="k-sun">陽光</span>照在葉子上、<span class="k-air">空氣</span>進入葉子，葉子發亮代表正在<b>製造養分</b>。',
      f: '🍬 <span class="k-food">橘色養分</span>從葉子出發，經過莖<b>往下</b>送到根，也送到果實。' }[k];
    if(mode[k] || k==='x') infoEl.innerHTML = '<p>'+msg+'</p>'; };
  P.all = function(){ if(!ready) return; Object.assign(mode, { x:true, w:true, s:true, f:true }); applyMode();
    infoEl.innerHTML = '<p>🌱 全部一起看：<span class="k-water">藍色水分往上</span>、<span class="k-sun">陽光</span>照葉子、<span class="k-food">橘色養分送全身</span>。用手指轉轉看！</p>'; };
  P.part = function(n){ if(ready){ ctl.autoRotate=false; focus(n); } };
  P.spin = function(btn){ if(!ready) return; ctl.autoRotate = !ctl.autoRotate; btn.classList.toggle('on', ctl.autoRotate); };
  P.reset = function(){ if(!ready) return; Object.assign(mode, { x:false, w:false, s:false, f:false }); applyMode(); labelPart=null; labelEl.style.opacity=0;
    tween = { t:0, fromT: ctl.target.clone(), toT: new THREE.Vector3(0,2.4,0), fromP: C.position.clone(), toP: new THREE.Vector3(8,7,10.5) };
    ctl.autoRotate = true; box.querySelectorAll('[data-p]').forEach(b=>b.classList.remove('on'));
    infoEl.innerHTML = '<p class="ph">👆 用手指<b>拖曳旋轉</b>、兩指<b>縮放</b>；點植物的部位看說明。</p>'; };
  window.Plant3D = P;
})();
