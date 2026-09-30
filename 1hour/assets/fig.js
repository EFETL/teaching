/* 小型座標圖產生器：用資料座標畫 x-t / v-t / a-t 圖 */
window.FIG = {
  plot(o){
    const W=o.w||360, H=o.h||220, Lm=46, Rm=18, Tm=16, Bm=36;
    const xmin=o.xmin||0, xmax=o.xmax, ymin=o.ymin||0, ymax=o.ymax;
    const sx=t=>Lm+(t-xmin)/(xmax-xmin)*(W-Lm-Rm);
    const sy=v=>Tm+(ymax-v)/(ymax-ymin)*(H-Tm-Bm);
    const y0=sy(Math.max(ymin,0)), c=o.color||'#0e7490';
    let s=`<svg viewBox="0 0 ${W} ${H}" width="${W}" xmlns="http://www.w3.org/2000/svg" font-size="13" font-family="sans-serif">`;
    s+=`<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8z" fill="#475569"/></marker></defs>`;
    (o.xticks||[]).forEach(t=>{ s+=`<line x1="${sx(t)}" y1="${Tm}" x2="${sx(t)}" y2="${H-Bm}" stroke="#eef2f6"/><text x="${sx(t)}" y="${H-Bm+16}" text-anchor="middle" fill="#5b6472">${t}</text>`; });
    (o.yticks||[]).forEach(v=>{ s+=`<line x1="${Lm}" y1="${sy(v)}" x2="${W-Rm}" y2="${sy(v)}" stroke="#eef2f6"/><text x="${Lm-6}" y="${sy(v)+4}" text-anchor="end" fill="#5b6472">${v}</text>`; });
    (o.fill||[]).forEach(f=>{ s+=`<polygon points="${f.pts.map(p=>sx(p[0])+','+sy(p[1])).join(' ')}" fill="${f.color||c}" opacity="${f.op||.18}"/>`; });
    s+=`<line x1="${Lm}" y1="${y0}" x2="${W-Rm+6}" y2="${y0}" stroke="#475569" stroke-width="1.5" marker-end="url(#ah)"/>`;
    s+=`<line x1="${Lm}" y1="${H-Bm+4}" x2="${Lm}" y2="${Tm-8}" stroke="#475569" stroke-width="1.5" marker-end="url(#ah)"/>`;
    s+=`<text x="${W-Rm}" y="${ymin<0?y0+18:y0-6}" text-anchor="end" fill="#1f2937">${o.xl||'t（s）'}</text>`;
    s+=`<text x="${Lm+6}" y="${Tm+2}" fill="#1f2937">${o.yl||''}</text>`;
    (o.lines||[]).forEach(l=>{
      s+=`<polyline points="${l.pts.map(p=>sx(p[0])+','+sy(p[1])).join(' ')}" fill="none" stroke="${l.color||c}" stroke-width="3" stroke-linejoin="round" ${l.dash?'stroke-dasharray="6 5"':''}/>`;
      if(l.label){ const p=l.lab||l.pts[l.pts.length-1]; s+=`<text x="${sx(p[0])+4}" y="${sy(p[1])-6}" fill="${l.color||c}" font-weight="700" font-size="14">${l.label}</text>`; }
    });
    (o.notes||[]).forEach(n=>{ s+=`<text x="${sx(n[0])}" y="${sy(n[1])}" text-anchor="middle" fill="${n[3]||'#92400e'}" font-weight="700" font-size="14">${n[2]}</text>`; });
    return s+'</svg>';
  }
};
