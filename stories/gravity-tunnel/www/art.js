// ===================== The 42-Minute Fall: art (v2 vertical, How Time Works look) =====================
const U={bg0:'#05070f',bg1:'#0c1430',grid:'rgba(120,150,220,.07)',ink:'#e9edf5',dim:'rgba(233,237,245,.6)',y:'#ffc93c',red:'#ff5a48',grn:'#3ee08a',B:'#5b8cff',rock:'#b5653a',rockD:'#7a3f22'};
function space(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,o.c0||U.bg0],[1,o.c1||U.bg1]]);ctx.fillRect(-300,-300,1680,2520);
  const s=o.s||90;for(let x=-s*3;x<1380;x+=s)line(x,-300,x,2220,1.5,U.grid);for(let y=-s*3;y<2220;y+=s)line(-300,y,1380,y,1.5,U.grid);}
function T2(s,x,y,size,col=U.ink,o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||U.ink},o));}
function popT(s,x,y,size,col,t,t0,o={}){const q=ss(seg(t,t0,t0+.25));if(q<=0)return;ctx.save();ctx.translate(x,y);const k=1.4-.4*q;ctx.scale(k,k);T2(s,0,0,size,col,{w:900,stroke:12,a:q*(o.a??1)});ctx.restore();}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
function me2(o){toon(Object.assign({jacket:'#2f4f7a',hat:'beanie',hatCol:'#f0683f',stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}
// a small falling me, rotated (rot), centred on (x,y)
function faller(x,y,h,rot,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot||0);me2(Object.assign({x:0,y:h*.5,h,brow:'scared',mouth:'o',armL:[2.6,.3],armR:[2.6,.3]},o));ctx.restore();}
// Earth cut in half: o.layers = real layers; o.tunnel = angle (0 = straight down through the centre) or chord {a1,a2}
function cut(cx,cy,R,o={}){glow(cx,cy,R*1.5,'rgba(110,168,255,1)',.14);
  if(o.layers){circ(cx,cy,R,'#6a8f4e');circ(cx,cy,R*.985,'#b5653a');circ(cx,cy,R*.55,'#e0852f');circ(cx,cy,R*.19,'#ffd166');glow(cx,cy,R*.6,'rgba(255,190,90,1)',.35);
    if(o.names){T2('CRUST',cx+R*.72,cy-R*.95,30,U.ink,{w:800,a:o.names});T2('MANTLE',cx+R*.45,cy-R*.62,36,'#fff',{w:900,a:o.names});T2('OUTER CORE',cx+24,cy-R*.37,28,'#2a1608',{w:900,a:o.names,align:'left'});T2('INNER',cx+16,cy,22,'#2a1608',{w:900,a:o.names,align:'left'});}}
  else{ctx.fillStyle=(()=>{const g=ctx.createRadialGradient(cx-R*.3,cy-R*.3,R*.1,cx,cy,R);g.addColorStop(0,'#c9773f');g.addColorStop(1,'#8d4826');return g;})();ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.fill();
    for(let i=0;i<40;i++){const a=hash(i)*6.28,r=Math.sqrt(hash(i+3))*R*.92;circ(cx+Math.cos(a)*r,cy+Math.sin(a)*r,3+hash(i+7)*5,'rgba(255,220,180,.18)');}}
  ctx.strokeStyle='#4f9a5c';ctx.lineWidth=Math.max(6,R*.025);ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.stroke();
  ctx.strokeStyle='rgba(140,190,255,.5)';ctx.lineWidth=Math.max(3,R*.012);ctx.beginPath();ctx.arc(cx,cy,R*1.03,0,7);ctx.stroke();
  const tun=(x1,y1,x2,y2)=>{line(x1,y1,x2,y2,Math.max(16,R*.07),'#0b0d14');line(x1,y1,x2,y2,Math.max(3,R*.01),'rgba(255,201,60,.35)');};
  if(o.tunnel!=null)tun(cx,cy-R,cx,cy+R);
  for(const c of(o.chords||[])){tun(cx+Math.cos(c[0])*R,cy+Math.sin(c[0])*R,cx+Math.cos(c[1])*R,cy+Math.sin(c[1])*R);}}
// position along a chord from angle a1 to a2 for phase p (0 = start, 1 = other end): harmonic motion
function chordPos(cx,cy,R,a1,a2,p){const k=(1-Math.cos(Math.PI*p))/2;const x1=cx+Math.cos(a1)*R,y1=cy+Math.sin(a1)*R,x2=cx+Math.cos(a2)*R,y2=cy+Math.sin(a2)*R;return[lerp(x1,x2,k),lerp(y1,y2,k),Math.atan2(y2-y1,x2-x1)-Math.PI/2];}
function bar(x,y,w,h,k,col,lab,val,o={}){fillRR(x,y,w,h,h/2,'rgba(255,255,255,.08)');if(k>0)fillRR(x,y,Math.max(h,w*clamp(k)),h,h/2,col);T2(lab,x,y-36,30,U.dim,{align:'left',w:800});T2(val,x+w,y-36,38,col,{align:'right',w:900});}
function clockDial(x,y,r,mins,o={}){circ(x,y,r,'rgba(12,16,28,.95)');ctx.strokeStyle=U.ink;ctx.lineWidth=6;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();
  const f=clamp(mins/60);ctx.fillStyle='rgba(255,201,60,.35)';ctx.beginPath();ctx.moveTo(x,y);ctx.arc(x,y,r*.92,-Math.PI/2,-Math.PI/2+f*6.283);ctx.closePath();ctx.fill();
  for(let i=0;i<12;i++){const a=i/12*6.283;line(x+Math.sin(a)*r*.8,y-Math.cos(a)*r*.8,x+Math.sin(a)*r*.92,y-Math.cos(a)*r*.92,4,U.dim);}
  const a=f*6.283;line(x,y,x+Math.sin(a)*r*.78,y-Math.cos(a)*r*.78,8,U.y);circ(x,y,10,U.y);}
function bullet(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-60,-14,90,28,6,'#c99a3a');ctx.beginPath();ctx.moveTo(30,-14);ctx.quadraticCurveTo(70,0,30,14);ctx.closePath();ctx.fillStyle='#d9b06a';ctx.fill();ctx.restore();}
function sat(x,y,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-60,-10,40,20,3,'#5b8cff');fillRR(20,-10,40,20,3,'#5b8cff');fillRR(-18,-18,36,36,6,'#dfe6ee');ctx.restore();}
