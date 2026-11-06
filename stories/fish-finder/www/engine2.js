// ---------- v2: full 1080x1920 vertical frame. Loaded after engine.js (all its helpers still work). ----------
const VW=1080,VH=1920;
function blackout(a,c='#000'){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle=c;ctx.fillRect(0,0,VW,VH);ctx.restore();}
function flash(a,c='#fff'){blackout(a,c);}
// vertical camera: cam {x,y,z} = world point at screen centre (540,960), zoom z; p = parallax depth (1 = normal)
function vl(cam,p,fn){const Z=1+(cam.z-1)*p;const ox=cam.x*p+(1-p)*540,oy=cam.y*p+(1-p)*960;ctx.save();ctx.translate(540,960);ctx.scale(Z,Z);ctx.translate(-ox,-oy);
  fn({x0:ox-540/Z-40,x1:ox+540/Z+40,y0:oy-960/Z-40,y1:oy+960/Z+40,Z});ctx.restore();}
function shakeAt(t,amp,f=1){return{x:(Math.sin(t*31*f)+Math.sin(t*47*f+1))*amp,y:(Math.sin(t*37*f+2)+Math.sin(t*53*f+4))*amp*.7};}
function vgrad(y0,y1,stops){const g=ctx.createLinearGradient(0,y0,0,y1);stops.forEach(([k,c])=>g.addColorStop(k,c));return g;}
function fillAll(c){ctx.fillStyle=c;ctx.fillRect(-2000,-2000,6000,7000);}
// falling snow in screen space: n flakes, wind px/s, fall px/s; mask(x,y)->alpha mult (e.g. brighter in headlight beams)
const _SNOW={};
function snow(t,seed,n,o={}){const key=seed+':'+n;if(!_SNOW[key]){const R=rng(seed),a=[];for(let i=0;i<n;i++)a.push({x:R()*1300-110,y:R()*2100-90,r:1.5+R()*R()*7,s:.5+R(),ph:R()*6.28});_SNOW[key]=a;}
  const fall=o.fall??140,wind=o.wind??-30,x0=o.x0??-110,y0=o.y0??-90,W=o.w??1300,H=o.h??2100;
  for(const f of _SNOW[key]){const x=x0+((f.x-x0+wind*t*f.s+Math.sin(t*1.3+f.ph)*18)%W+W)%W,y=y0+((f.y-y0+fall*t*f.s)%H+H)%H;
    const m=o.mask?o.mask(x,y):1;if(m<=.01)continue;circ(x,y,f.r*(o.scale||1),o.col||'#eef3ff',clamp((o.a??.75)*m*(.4+.6*f.s/1.5)));}}
// a headlight cone from (x,y) aimed at angle a (radians, 0 = up), length L, half-width w at the far end
function beam(x,y,a,L,w,alpha=.35,col='255,244,214'){ctx.save();ctx.translate(x,y);ctx.rotate(a);const g=ctx.createLinearGradient(0,0,0,-L);
  g.addColorStop(0,`rgba(${col},${alpha})`);g.addColorStop(.55,`rgba(${col},${alpha*.45})`);g.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=g;
  ctx.beginPath();ctx.moveTo(-14,0);ctx.lineTo(-w,-L);ctx.quadraticCurveTo(0,-L*1.05,w,-L);ctx.lineTo(14,0);ctx.closePath();ctx.fill();ctx.restore();}
function inBeam(px,py,x,y,a,L,w){const dx=px-x,dy=py-y,ca=Math.cos(a),sa=Math.sin(a);const lx=dx*ca+dy*sa,ly=-dx*sa+dy*ca;const d=-ly;if(d<0||d>L)return 0;
  const half=14+(w-14)*d/L;return clamp(1-Math.abs(lx)/half)*(1-d/L*.6);}
function label(s,x,y,o={}){ctx.save();ctx.font=o.font||'800 30px MS';const w=ctx.measureText(s).width+(o.px??26)*2,h=o.h||52;
  ctx.globalAlpha=o.a??1;fillRR(x-(o.align==='left'?0:w/2),y-h/2,w,h,o.r??10,o.bg||'rgba(10,12,16,.85)');if(o.stroke){ctx.strokeStyle=o.stroke;ctx.lineWidth=3;rr(x-(o.align==='left'?0:w/2),y-h/2,w,h,o.r??10);ctx.stroke();}
  ctx.fillStyle=o.col||'#fff';ctx.textAlign=o.align==='left'?'left':'center';ctx.textBaseline='middle';ctx.fillText(s,x+(o.align==='left'?(o.px??26):0),y+2);ctx.restore();}
function waveform(x,y,w,h,t,on,col='#5cf2a2',n=11){for(let i=0;i<n;i++){const k=on*(.25+.75*Math.abs(Math.sin(t*9+i*1.7)*Math.sin(t*4.3+i*.6)));const bh=Math.max(6,h*k);fillRR(x+i*w/n-w/2,y-bh/2,w/n*.55,bh,4,col);}}

// ---------- toon: big-head cartoon person, front view ----------
// o: {x,y (feet), h, skin, jacket, pants, boots, hat:'beanie'|'cap'|'helm'|null, hatCol, beard, face:-1..1 (turn), look:{x,y} (-1..1),
//     brow:'flat'|'worried'|'scared'|'angry', mouth:'flat'|'o'|'frown'|'smile'|'grit'|'open', eyes:1 (0 = hidden face), blink:0..1,
//     armL/armR:[shoulder, elbow] radians (0 = hanging), held:fn(hx,hy,h), tag:'NAME', stripe:true, bob, blank:true (no face, dark head)}
function toon(o){const h=o.h||600,x=o.x,y=o.y,f=o.face||0;ctx.save();ctx.translate(x,y+(o.bob||0));
  const J=o.jacket||'#c63a2b',Jd=shade(J,-.28),P=o.pants||'#1d222c',B=o.boots||'#14161b',S=o.skin||'#e7b48f';
  // legs
  const hip=-.36*h;for(const s of[-1,1]){line(s*.07*h,hip,s*.075*h+(o.step?o.step*s*.03*h:0),-.03*h,.1*h,P);ell(s*.08*h+f*.02*h,-.02*h,.085*h,.04*h,0,B);}
  // back arm, torso, front arm
  const shY=-.62*h;const arm=(s,a,e,c)=>{const sx=s*.17*h,L=.17*h;const ex=sx+Math.sin(a*s)*L*s*0+s*Math.sin(a)*L,ey=shY+.02*h+Math.cos(a)*L;
    const hx=ex+s*Math.sin(a+e)*L,hy=ey+Math.cos(a+e)*L;line(sx,shY+.03*h,ex,ey,.085*h,c);line(ex,ey,hx,hy,.078*h,c);circ(hx,hy,.045*h,o.glove||'#202329');return[hx,hy];};
  const aL=o.armL||[.12,.1],aR=o.armR||[.12,.1];
  fillRR(-.19*h,shY-.05*h,.38*h,(hip-shY)+.12*h,.1*h,J);
  fillRR(-.19*h,hip-.03*h,.38*h,.06*h,.03*h,Jd);
  if(o.stripe!==false){ctx.globalAlpha=.85;fillRR(-.19*h,-.5*h,.38*h,.035*h,.01*h,'#dfe4ea');ctx.globalAlpha=1;}
  line(f*.02*h,shY-.02*h,f*.02*h,hip,.008*h,Jd);
  if(o.tag){fillRR(-.125*h+f*.02*h,shY+.03*h,.11*h,.05*h,.008*h,'#f2f2ee');if(h>400){ctx.fillStyle='#1b1d22';const lines=String(o.tag).split('\n');let fs=.018*h;ctx.font=`800 ${fs}px MS`;
    const mw=Math.max(...lines.map(s=>ctx.measureText(s).width));if(mw>.095*h){fs*=.095*h/mw;ctx.font=`800 ${fs}px MS`;}ctx.textAlign='center';ctx.textBaseline='middle';
    lines.forEach((s,k)=>ctx.fillText(s,-.07*h+f*.02*h,shY+.055*h+(k-(lines.length-1)/2)*fs*1.08));}}
  const hL=arm(-1,aL[0],aL[1],J),hR=arm(1,aR[0],aR[1],shade(J,-.08));
  // collar
  ell(f*.02*h,shY-.04*h,.13*h,.05*h,0,Jd);
  // head
  const hx=f*.04*h,hy=-.83*h,r=.17*h;ctx.save();ctx.translate(hx,hy);ctx.rotate(o.tilt||0);
  if(o.blank){circ(0,0,r,o.hatCol||'#121418');fillRR(-.13*h,-.03*h,.26*h,.06*h,.03*h,'#24272e');if(o.glint)for(const s of[-1,1])circ(s*.055*h,0,.009*h,'#f4f1e8',o.glint);}
  else{circ(0,0,r,S);ell(-r*.95,.01*h,.03*h,.045*h,0,shade(S,-.08));ell(r*.95,.01*h,.03*h,.045*h,0,shade(S,-.08));
    if(o.beard){ctx.fillStyle=o.beard;ctx.beginPath();ctx.ellipse(0,.07*h,.15*h,.12*h,0,0,Math.PI);ctx.fill();ell(0,.03*h,.11*h,.04*h,0,o.beard);}
    const lx=(o.look?o.look.x:0)*.014*h+f*.05*h,ly=(o.look?o.look.y:0)*.012*h;const br=o.brow||'flat';const big=br==='scared'?1.22:1;const bl=clamp(o.blink||0);
    for(const s of[-1,1]){const ex=s*.062*h+f*.03*h,ey=-.005*h;ell(ex,ey,.04*h*big,.05*h*big*(1-bl*.9),0,'#fbfaf6');if(bl<.8)circ(ex+lx,ey+ly,.021*h,'#15171c');if(bl<.8)circ(ex+lx+.007*h,ey+ly-.008*h,.006*h,'#fff');
      // brows
      const by=ey-.075*h*(br==='scared'?1.2:1);let a=0;if(br==='worried'||br==='scared')a=s*-.35;if(br==='angry')a=s*.4;
      ctx.save();ctx.translate(ex,by);ctx.rotate(a);fillRR(-.04*h,-.008*h,.08*h,.016*h,.008*h,o.browCol||'#3b2a22');ctx.restore();}
    const my=.075*h,mx=f*.03*h,m=o.mouth||'flat';ctx.fillStyle='#4a1f1c';ctx.strokeStyle='#4a1f1c';ctx.lineWidth=.012*h;ctx.lineCap='round';
    if(m==='o')ell(mx,my,.022*h,.03*h,0,'#3a1715');else if(m==='open'){ell(mx,my,.04*h,.032*h,0,'#3a1715');}
    else if(m==='grit'){fillRR(mx-.045*h,my-.016*h,.09*h,.032*h,.01*h,'#f6f3ee');ctx.strokeRect(mx-.045*h,my-.016*h,.09*h,.032*h);}
    else{ctx.beginPath();if(m==='frown'){ctx.moveTo(mx-.035*h,my+.012*h);ctx.quadraticCurveTo(mx,my-.018*h,mx+.035*h,my+.012*h);}else if(m==='smile'){ctx.moveTo(mx-.035*h,my-.006*h);ctx.quadraticCurveTo(mx,my+.026*h,mx+.035*h,my-.006*h);}else{ctx.moveTo(mx-.028*h,my);ctx.lineTo(mx+.028*h,my);}ctx.stroke();}}
  // hats
  const hc=o.hatCol||'#f0683f';
  if(o.hat==='beanie'){ctx.fillStyle=hc;ctx.beginPath();ctx.arc(0,-.02*h,r*1.02,Math.PI*1.02,Math.PI*1.98);ctx.fill();fillRR(-r*1.06,-.07*h,r*2.12,.06*h,.025*h,shade(hc,-.15));circ(0,-r-.03*h,.035*h,shade(hc,.1));}
  if(o.hat==='cap'){ctx.fillStyle=hc;ctx.beginPath();ctx.arc(0,-.03*h,r*1.0,Math.PI*1.05,Math.PI*1.95);ctx.fill();fillRR(-r*1.02,-.06*h,r*2.04,.035*h,.015*h,shade(hc,-.2));ell(.06*h*(f||1),-.06*h,.1*h,.022*h,0,shade(hc,-.25));}
  if(o.hat==='helm'){ctx.fillStyle=hc;ctx.beginPath();ctx.arc(0,-.01*h,r*1.08,Math.PI*1.0,Math.PI*2.0);ctx.fill();}
  ctx.restore();
  if(o.held)o.held(o.heldHand==='L'?hL[0]:hR[0],o.heldHand==='L'?hL[1]:hR[1],h);
  ctx.restore();}
