// ===================== 8 Minutes, 20 Seconds: art (v2 vertical, How Time Works look) =====================
const U={bg0:'#05070f',bg1:'#0c1430',grid:'rgba(120,150,220,.07)',ink:'#e9edf5',dim:'rgba(233,237,245,.6)',y:'#ffc93c',red:'#ff5a48',grn:'#3ee08a',B:'#5b8cff',or:'#ff9a3c'};
function space(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,o.c0||U.bg0],[1,o.c1||U.bg1]]);ctx.fillRect(-300,-300,1680,2520);
  const s=o.s||90;for(let x=-s*3;x<1380;x+=s)line(x,-300,x,2220,1.5,U.grid);for(let y=-s*3;y<2220;y+=s)line(-300,y,1380,y,1.5,U.grid);
  if(o.stars!==false)for(let i=0;i<70;i++)circ(hash(i*1.7)*1080,hash(i*3.3)*1920,1+hash(i*9.1)*2.2,'#dfe8ff',.25+.35*hash(i*5.5));}
function T2(s,x,y,size,col=U.ink,o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){if((o.a??1)<=0)return;label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||U.ink},o));}
function popT(s,x,y,size,col,t,t0,o={}){const q=ss(seg(t,t0,t0+.25));if(q<=0)return;ctx.save();ctx.translate(x,y);const k=1.4-.4*q;ctx.scale(k,k);T2(s,0,0,size,col,{w:900,stroke:12,a:q*(o.a??1)});ctx.restore();}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
function me2(o){toon(Object.assign({jacket:'#2f4f7a',hat:'beanie',hatCol:'#f0683f',stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}
// the Sun: hot core, corona that flickers; o.gone = 0..1 (1 = vanished, a dashed ghost outline remains)
function sun(x,y,r,t,o={}){const g=1-clamp(o.gone||0);
  if(g>0){ctx.save();ctx.globalAlpha=g;glow(x,y,r*3.2,'rgba(255,170,60,1)',.35);glow(x,y,r*1.9,'rgba(255,215,120,1)',.5);
    for(let i=0;i<18;i++){const a=i/18*6.283+t*.15,L=r*(1.12+.1*Math.sin(t*3+i*1.7));ctx.strokeStyle='rgba(255,200,90,.35)';ctx.lineWidth=r*.07;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x+Math.cos(a)*r*.95,y+Math.sin(a)*r*.95);ctx.lineTo(x+Math.cos(a)*L,y+Math.sin(a)*L);ctx.stroke();}
    ctx.fillStyle=(()=>{const q=ctx.createRadialGradient(x-r*.25,y-r*.25,r*.1,x,y,r);q.addColorStop(0,'#fff6c8');q.addColorStop(.6,'#ffcf4a');q.addColorStop(1,'#ff8a2a');return q;})();ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();
    for(let i=0;i<9;i++){const a=hash(i)*6.28,d=Math.sqrt(hash(i+4))*r*.7;circ(x+Math.cos(a)*d,y+Math.sin(a)*d,r*(.05+hash(i+9)*.06),'rgba(255,140,40,.35)');}ctx.restore();}
  if(o.gone>0){ctx.save();ctx.globalAlpha=clamp(o.gone)*.8;ctx.strokeStyle='rgba(233,237,245,.55)';ctx.lineWidth=5;ctx.setLineDash([18,14]);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();ctx.setLineDash([]);ctx.restore();}}
// a light front: a band of sunlight travelling outward, between radius r0 and r1, as an arc centred at (x,y)
function lightBand(x,y,r0,r1,a0,a1,al=.5){if(r1<=r0)return;ctx.save();ctx.beginPath();ctx.arc(x,y,r1,a0,a1);ctx.arc(x,y,Math.max(0,r0),a1,a0,true);ctx.closePath();
  const g=ctx.createRadialGradient(x,y,Math.max(0,r0),x,y,r1);g.addColorStop(0,`rgba(255,214,110,${al*.25})`);g.addColorStop(1,`rgba(255,226,140,${al})`);ctx.fillStyle=g;ctx.fill();ctx.restore();}
// gravity ripple ring
function ripple(x,y,r,a=1,col='91,140,255'){if(r<=0||a<=0)return;for(let k=0;k<3;k++){if(r-k*26<=0)break;ctx.strokeStyle=`rgba(${col},${a*(.7-k*.2)})`;ctx.lineWidth=8-k*2;ctx.beginPath();ctx.arc(x,y,r-k*26,0,7);ctx.stroke();}}
function clockDial(x,y,r,f,o={}){circ(x,y,r,'rgba(12,16,28,.95)');ctx.strokeStyle=U.ink;ctx.lineWidth=6;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();
  ctx.fillStyle=o.fill||'rgba(255,201,60,.35)';ctx.beginPath();ctx.moveTo(x,y);ctx.arc(x,y,r*.92,-Math.PI/2,-Math.PI/2+clamp(f)*6.283);ctx.closePath();ctx.fill();
  for(let i=0;i<12;i++){const a=i/12*6.283;line(x+Math.sin(a)*r*.8,y-Math.cos(a)*r*.8,x+Math.sin(a)*r*.92,y-Math.cos(a)*r*.92,4,U.dim);}
  const a=clamp(f)*6.283;line(x,y,x+Math.sin(a)*r*.78,y-Math.cos(a)*r*.78,8,o.hand||U.y);circ(x,y,10,o.hand||U.y);}
function mmss(s){s=Math.max(0,s);const m=Math.floor(s/60),q=Math.floor(s%60);return m+':'+String(q).padStart(2,'0');}
function bar(x,y,w,h,k,col,lab,val){fillRR(x,y,w,h,h/2,'rgba(255,255,255,.08)');if(k>0)fillRR(x,y,Math.max(h,w*clamp(k)),h,h/2,col);T2(lab,x,y-36,30,U.dim,{align:'left',w:800});T2(val,x+w,y-36,38,col,{align:'right',w:900});}
// a neutron star: small, blue-white, with a faint glow
function nstar(x,y,r){glow(x,y,r*4,'rgba(170,200,255,1)',.45);circ(x,y,r,'#eaf2ff');circ(x-r*.25,y-r*.25,r*.45,'#ffffff');}
// a planet with optional rings; lit = 0..1 brightness
function planet(x,y,r,col,lit,o={}){const L=clamp(lit);if(o.ring){ctx.save();ctx.strokeStyle=`rgba(230,205,150,${.25+.6*L})`;ctx.lineWidth=r*.22;ctx.beginPath();ctx.ellipse(x,y,r*2,r*.55,-.25,Math.PI,2*Math.PI);ctx.stroke();ctx.restore();}
  if(L>0)glow(x,y,r*3,'rgba(255,230,170,1)',.3*L);circ(x,y,r,shade(col,-.75+.75*L));
  if(L>0){ctx.save();ctx.globalAlpha=L;for(let i=0;i<4;i++){ctx.fillStyle=shade(col,i%2?-.15:.1);ctx.beginPath();ctx.ellipse(x,y-r*.6+i*r*.38,r*.97*Math.sqrt(1-Math.pow((-.6+i*.38),2)),r*.09,0,0,7);ctx.fill();}ctx.restore();}
  if(o.ring){ctx.save();ctx.strokeStyle=`rgba(230,205,150,${.25+.6*L})`;ctx.lineWidth=r*.22;ctx.beginPath();ctx.ellipse(x,y,r*2,r*.55,-.25,0,Math.PI);ctx.stroke();ctx.restore();}}
// thermometer
function thermo(x,y,h,k,col){fillRR(x-28,y-h,56,h,28,'rgba(255,255,255,.1)');circ(x,y+10,48,'rgba(255,255,255,.1)');circ(x,y+10,36,col);fillRR(x-14,y-h*clamp(k)+10,28,h*clamp(k),14,col);}
// a small leafy plant (leaves droop with d = 0..1)
function plant(x,y,s,d=0,col='#4fb36a'){line(x,y,x,y-90*s,8*s,'#3a7a46');for(const q of[[-1,30],[1,50],[-1,70],[1,90]]){const ly=y-q[1]*s;ctx.save();ctx.translate(x,ly);ctx.rotate(q[0]*(.9+d*.8));ell(q[0]*0,-22*s,12*s,26*s,0,shade(col,-d*.5));ctx.restore();}}
// fish
function fish(x,y,s,f=1,col='#7fd0ff'){ctx.save();ctx.translate(x,y);ctx.scale(f*s,s);ell(0,0,40,18,0,col);ctx.beginPath();ctx.moveTo(-34,0);ctx.lineTo(-62,-18);ctx.lineTo(-62,18);ctx.closePath();ctx.fillStyle=col;ctx.fill();circ(20,-4,4,'#0b1020');ctx.restore();}
