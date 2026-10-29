// ===================== Olo: art (v2 vertical, How Time Works look) =====================
const U={bg0:'#05070f',bg1:'#0c1430',grid:'rgba(120,150,220,.07)',ink:'#e9edf5',dim:'rgba(233,237,245,.6)',y:'#ffc93c',red:'#ff5a48',
  S:'#5b8cff',M:'#3ee08a',L:'#ff6a4d',olo:'#00ffc6',oloG:'rgba(0,255,198,1)',teal:'#4fd1c5'};
function space(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,o.c0||U.bg0],[1,o.c1||U.bg1]]);ctx.fillRect(-100,-100,1280,2120);
  const s=o.s||90;for(let x=-s;x<1180;x+=s)line(x,-20,x,1940,1.5,U.grid);for(let y=0;y<1940;y+=s)line(-20,y,1100,y,1.5,U.grid);}
function T2(s,x,y,size,col=U.ink,o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px MS`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||U.ink},o));}
function me2(o){toon(Object.assign({jacket:'#2f4f7a',hat:'beanie',hatCol:'#f0683f',stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}
// the olo swatch: a glowing, shimmering rounded square. sat 0..1 (0 = grey)
function oloSwatch(x,y,w,h,t,o={}){const sat=o.sat??1,a=o.a??1;if(a<=0)return;ctx.save();ctx.globalAlpha=a;
  const c=mixHex('#7d8a87',U.olo,sat);glow(x,y,Math.max(w,h)*.95,`rgba(${hexRgb(c)},1)`,.55*sat+.08);
  fillRR(x-w/2,y-h/2,w,h,o.r??40,c);
  // slow shimmer bands
  ctx.save();rr(x-w/2,y-h/2,w,h,o.r??40);ctx.clip();for(let i=0;i<4;i++){const yy=y-h/2+fract(t*.12+i*.25)*h*1.4-h*.2;
    ctx.fillStyle=`rgba(255,255,255,${.07*sat})`;ctx.beginPath();ctx.ellipse(x,yy,w*.8,h*.08,-.2,0,7);ctx.fill();}ctx.restore();
  ctx.strokeStyle=`rgba(255,255,255,${.35*sat+.1})`;ctx.lineWidth=4;rr(x-w/2,y-h/2,w,h,o.r??40);ctx.stroke();ctx.restore();}
function hexRgb(h){const n=parseInt(h.slice(1),16);return`${n>>16&255},${n>>8&255},${n&255}`;}
function mixHex(a,b,k){const A=hexRgb(a).split(',').map(Number),B=hexRgb(b).split(',').map(Number);return'#'+A.map((v,i)=>Math.round(lerp(v,B[i],clamp(k))).toString(16).padStart(2,'0')).join('');}
// a big eye, front view. look: pupil offset; beam: laser into pupil (0..1)
function eye(x,y,s,t,o={}){const lx=(o.look?.x||0)*40*s,ly=(o.look?.y||0)*25*s;
  ctx.save();ctx.translate(x,y);ctx.fillStyle='#e9b896';ctx.beginPath();ctx.ellipse(0,0,330*s,200*s,0,0,7);ctx.fill();
  ctx.fillStyle='#f6f3ec';ctx.beginPath();ctx.moveTo(-290*s,0);ctx.quadraticCurveTo(0,-230*s,290*s,0);ctx.quadraticCurveTo(0,230*s,-290*s,0);ctx.fill();
  ctx.save();ctx.beginPath();ctx.moveTo(-290*s,0);ctx.quadraticCurveTo(0,-230*s,290*s,0);ctx.quadraticCurveTo(0,230*s,-290*s,0);ctx.clip();
  circ(lx,ly,120*s,o.iris||'#3d6f8f');for(let i=0;i<24;i++){const a=i/24*6.28;line(lx+Math.cos(a)*55*s,ly+Math.sin(a)*55*s,lx+Math.cos(a)*115*s,ly+Math.sin(a)*115*s,3*s,'rgba(20,40,60,.35)');}
  circ(lx,ly,(o.pupil||55)*s,'#0b0d12');circ(lx+30*s,ly-35*s,16*s,'#fff',.9);ctx.restore();
  ctx.strokeStyle='#3b2a22';ctx.lineWidth=10*s;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-290*s,0);ctx.quadraticCurveTo(0,-230*s,290*s,0);ctx.stroke();
  for(let i=-3;i<=3;i++){const px=i*70*s,py=-112*s+Math.abs(i)*i*0*s-(1-Math.abs(i)/4)*0;line(px,py-(1-Math.abs(i)/4)*6*s,px*1.12,py-50*s,6*s,'#3b2a22');}
  ctx.restore();
  if(o.beam>0){const bx=x+lx,by=y+ly;ctx.save();ctx.globalAlpha=o.beam;line(o.from?.x??1100,o.from?.y??-60,bx,by,14,'rgba(62,224,138,.35)');line(o.from?.x??1100,o.from?.y??-60,bx,by,5,'#c8ffe0');glow(bx,by,60,'rgba(62,224,138,1)',.8);ctx.restore();}}
// a cone cell glyph: rounded cone shape pointing up, colored
function coneCell(x,y,s,col,o={}){const a=o.a??1;if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);
  if(o.fire>0)glow(0,-60,170,`rgba(${hexRgb(col)},1)`,.6*o.fire);
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-55,80);ctx.lineTo(-40,-60);ctx.quadraticCurveTo(0,-170,40,-60);ctx.lineTo(55,80);ctx.closePath();ctx.fill();
  fillRR(-60,80,120,120,40,shade(col,-.3));circ(0,140,24,shade(col,-.55));
  for(let i=0;i<5;i++)line(-38+i*2,-40+i*24,38-i*2,-40+i*24,4,'rgba(255,255,255,.25)');ctx.restore();}
// response curves: wavelength 400..700 nm on x. Peaks S 420, M 534, L 564 (approx, human cones)
const PEAK={S:420,M:534,L:564},WID={S:28,M:42,L:48};
function resp(k,nm){return Math.exp(-(((nm-PEAK[k])/WID[k])**2)/2);}
function nmCol(nm){// rough visible-spectrum colour
  const st=[[400,'#7a3cff'],[450,'#2f5cff'],[490,'#00c8ff'],[520,'#2cff5a'],[570,'#f5ff2c'],[600,'#ff9a1f'],[650,'#ff2a1f'],[700,'#b01010']];
  for(let i=0;i<st.length-1;i++)if(nm<=st[i+1][0])return mixHex(st[i][1],st[i+1][1],(nm-st[i][0])/(st[i+1][0]-st[i][0]));return st[st.length-1][1];}
function curves(x,y,w,h,o={}){// axes + spectrum strip
  for(let i=0;i<=60;i++){const nm=400+i*5;fillRR(x+i/60*w-1,y+h+20,w/60+2,26,0,nmCol(nm));}
  T2('400 nm',x,y+h+80,24,U.dim,{align:'left'});T2('700 nm',x+w,y+h+80,24,U.dim,{align:'right'});T2('WAVELENGTH',x+w/2,y+h+80,24,U.dim);
  line(x,y+h,x+w,y+h,3,U.dim);
  for(const k of['S','M','L']){const al=o.alpha?.[k]??1;if(al<=0)continue;const col=U[k];ctx.save();ctx.globalAlpha=al;
    ctx.beginPath();for(let i=0;i<=150;i++){const nm=400+i*2,px=x+i/150*w,py=y+h-resp(k,nm)*h*.9;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}
    ctx.strokeStyle=col;ctx.lineWidth=o.lw?.[k]||8;ctx.stroke();ctx.lineTo(x+w,y+h);ctx.lineTo(x,y+h);ctx.closePath();ctx.fillStyle=`rgba(${hexRgb(col)},${o.fill?.[k]??.12})`;ctx.fill();
    T2(k,x+(PEAK[k]-400)/300*w+(k==='M'?-34:k==='L'?34:0),y+h-h*.9-36,40,col,{w:900});ctx.restore();}}
// retina mosaic: fixed random layout of cones (approx 60% L, 30% M, 10% S)
const MOS=(()=>{const R=rng(41),a=[];const sp=46;for(let r=0;r<19;r++)for(let c=0;c<15;c++){const x=c*sp*1.0+(r%2)*sp*.5+(R()-.5)*8,y=r*sp*.87+(R()-.5)*8;
  const q=R();a.push({x,y,k:q<.1?'S':q<.42?'M':'L',ph:R()});}return a;})();
function mosaic(cx,cy,s,t,o={}){const W0=15*46,H0=19*46*.87;ctx.save();ctx.translate(cx,cy);ctx.scale(s,s);ctx.translate(-W0/2,-H0/2);
  fillRR(-40,-40,W0+80,H0+80,60,'#2a1018');
  for(const c of MOS){const lab=o.labelK?o.labelK(c):1;const col=lab>0?mixHex('#6a4a50',U[c.k],lab):'#6a4a50';circ(c.x,c.y,19,col);circ(c.x-5,c.y-6,6,'rgba(255,255,255,.25)');
    const hit=o.hit?o.hit(c):0;if(hit>0){glow(c.x,c.y,48,'rgba(200,255,225,1)',.9*hit);circ(c.x,c.y,10,'#f2fff8',hit);}}
  if(o.scanY!=null){const yy=o.scanY*H0;line(-40,yy,W0+40,yy,6,'rgba(255,201,60,.9)');glow(W0/2,yy,300,'rgba(255,201,60,1)',.15);}
  ctx.restore();}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
function meter(x,y,h,k,col,lab){fillRR(x-34,y-h,68,h,20,'rgba(255,255,255,.08)');fillRR(x-34,y-h*k,68,Math.max(20,h*k),20,col);if(k>.6)glow(x,y-h*k,80,`rgba(${hexRgb(col)},1)`,.35);T2(lab,x,y+46,40,col,{w:900});}
function stamp(s,x,y,a,col=U.red,size=64,rot=-.08){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(1+(1-a)*.6,1+(1-a)*.6);ctx.globalAlpha=a;ctx.font=`900 ${size}px MS`;const w=ctx.measureText(s).width+60;
  ctx.strokeStyle=col;ctx.lineWidth=8;rr(-w/2,-size*.85,w,size*1.7,18);ctx.stroke();T2(s,0,0,size,col,{w:900});ctx.restore();}
// the Oz rig: a lab bench with optics and a bite bar
function ozRig(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  fillRR(-420,120,840,40,10,'#3a4258');fillRR(-400,160,30,260,6,'#2a3044');fillRR(370,160,30,260,6,'#2a3044');
  fillRR(-360,-60,380,180,24,'#c9cfda');fillRR(-340,-40,120,60,12,'#1b1f2a');for(let i=0;i<3;i++)circ(-120+i*60,-10,14,i===1?U.M:'#7a8296');
  fillRR(20,-10,200,70,16,'#9aa3b5');circ(240,25,48,'#1b1f2a');circ(240,25,30,'#2c6a5a');glow(240,25,70,'rgba(62,224,138,1)',.35+.25*Math.sin(t*6));
  fillRR(300,-30,40,140,10,'#6d7690');fillRR(300,-36,110,16,8,'#e6e9ef');
  ctx.restore();}
