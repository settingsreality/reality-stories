// ---------- shared helpers ----------
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const seg=(t,a,b)=>clamp((t-a)/(b-a));
const ss=x=>{x=clamp(x);return x*x*(3-2*x);};
const lerp=(a,b,k)=>a+(b-a)*k;
const fract=x=>x-Math.floor(x);
const hash=n=>fract(Math.sin(n*127.1+311.7)*43758.5453);
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const PAL={sky0:'#070a14',sky1:'#14162a',sky2:'#2a1e2a',bldA:'#1c2230',bldB:'#121726',winLit:'#f0a050',winDark:'#0e121b',street:'#16181e',walk:'#24262d',
  lamp:'#ffd9a0',orange:'#f0683f',you:'#262a33',skin:'#8a6a58',gray:'#5f6670',yellow:'#d9a63a',teal:'#3f7f86',taxi:'#d9b13a'};
let ctx; // the context every helper draws into (swapped for offscreen passes)
function rr(x,y,w,h,r){r=Math.min(r,Math.abs(w)/2,Math.abs(h)/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}
function fillRR(x,y,w,h,r,c){ctx.fillStyle=c;rr(x,y,w,h,r);ctx.fill();}
function circ(x,y,r,c,a=1){if(r<=0)return;ctx.globalAlpha=a;ctx.fillStyle=c;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.globalAlpha=1;}
function ell(x,y,rx,ry,rot,c,a=1){ctx.globalAlpha=a;ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),rot,0,7);ctx.fill();ctx.globalAlpha=1;}
function glow(x,y,r,c,a=.55){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,c);g.addColorStop(1,'rgba(0,0,0,0)');ctx.globalAlpha=a;ctx.fillStyle=g;ctx.fillRect(x-r,y-r,2*r,2*r);ctx.globalAlpha=1;}
function line(x1,y1,x2,y2,w,c){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
function poly(pts,c,a=1){ctx.globalAlpha=a;ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(pts[0],pts[1]);for(let i=2;i<pts.length;i+=2)ctx.lineTo(pts[i],pts[i+1]);ctx.closePath();ctx.fill();ctx.globalAlpha=1;}
function text(s,x,y,font,c,align='center',a=1){ctx.globalAlpha=a;ctx.font=font;ctx.fillStyle=c;ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillText(s,x,y);ctx.globalAlpha=1;}
function shade(hex,k){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.round(clamp(k<0?v*(1+k):v+(255-v)*k,0,255));return'#'+((f(r)<<16)|(f(g)<<8)|f(b)).toString(16).padStart(6,'0');}
// camera keyframes [[t,{x,y,z}],...]: eases between consecutive keys, holds outside
function keys(t,K){if(t<=K[0][0])return Object.assign({},K[0][1]);for(let i=0;i<K.length-1;i++){const[a,A]=K[i],[b,Bk]=K[i+1];if(t<=b){const k=ss((t-a)/(b-a));return{x:lerp(A.x,Bk.x,k),y:lerp(A.y,Bk.y,k),z:lerp(A.z,Bk.z,k)};}}return Object.assign({},K[K.length-1][1]);}
function shake(c,t,amp,f=1){c.x+=(Math.sin(t*1.7*f)+Math.sin(t*2.9*f+1))*amp;c.y+=(Math.sin(t*2.3*f+2)+Math.sin(t*1.3*f+4))*amp*.7;return c;}
// world-space parallax layer: cam = point of the world (at parallax 1) shown at frame centre
function wl(cam,p,fn){const Z=1+(cam.z-1)*p;const ox=cam.x*p+(1-p)*960,oy=cam.y*p+(1-p)*540;ctx.save();ctx.translate(960,540);ctx.scale(Z,Z);ctx.translate(-ox,-oy);
  fn({x0:ox-960/Z-40,x1:ox+960/Z+40,y0:oy-540/Z-40,y1:oy+540/Z+40,Z});ctx.restore();}

// ---------- environment ----------
const SKYSTARS=(()=>{const r=rng(3),a=[];for(let i=0;i<220;i++)a.push([r()*2600-340,r()*620-40,[1,1.4,2][Math.floor(r()*3)],.3+r()*.6]);return a;})();
function sky(moon=true,mx=1380,my=190){const g=ctx.createLinearGradient(0,-100,0,1080);g.addColorStop(0,PAL.sky0);g.addColorStop(.7,PAL.sky1);g.addColorStop(1,PAL.sky2);ctx.fillStyle=g;ctx.fillRect(-600,-400,3120,1880);
  for(const[x,y,r,a]of SKYSTARS)circ(x,y,r,'#e9eefc',a);if(moon){circ(mx,my,110,'#ece6d6',.05);circ(mx,my,70,'#ece6d6',.06);circ(mx,my,44,'#ece6d6');}}
function streetLamp(x,base,h=420,dir=1){line(x,base,x,base-h,7,'#0b0d12');line(x,base-h,x+50*dir,base-h,7,'#0b0d12');fillRR(x+50*dir-26,base-h-4,52,11,4,PAL.lamp);
  glow(x+50*dir,base-h+10,190,'rgba(255,180,106,1)',.42);}
function lampPool(x,base){ctx.save();ctx.translate(x,base);ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,0,0,0,260);g.addColorStop(0,'rgba(240,160,80,.26)');g.addColorStop(1,'rgba(240,160,80,0)');ctx.fillStyle=g;ctx.fillRect(-260,-260,520,520);ctx.restore();}

// ---------- characters ----------
// flat side-view person. face 1 = facing right. walk = gait phase (null = standing). crouch 0..1
function person(p){const h=p.h,f=p.face||1;ctx.save();ctx.translate(p.x,p.y);ctx.scale(f,1);
  const cr=p.crouch||0,L1=.27*h,L2=.27*h,ph=p.walk;
  const legs=[0,1].map(k=>{let ta=.05*(k?-1:1),sa=ta;if(ph!=null){const s=Math.sin(ph+k*Math.PI);ta=s*.42;sa=ta-Math.max(0,-Math.cos(ph+k*Math.PI))*.75;}
    if(p.legA){ta=p.legA[k];sa=p.legB[k];}ta=lerp(ta,[1.45,1.1][k],cr);sa=lerp(sa,[-.25,-.55][k],cr);return{ta,sa};});
  const hipH=Math.max(...legs.map(l=>Math.cos(l.ta)*L1+Math.cos(l.sa)*L2));const hipY=-hipH-(p.lift||0);
  const lw=.075*h,legC=p.legs||'#14161b';
  for(const l of legs){const kx=Math.sin(l.ta)*L1,ky=hipY+Math.cos(l.ta)*L1,fx=kx+Math.sin(l.sa)*L2,fy=Math.min(0,ky+Math.cos(l.sa)*L2);
    line(0,hipY,kx,ky,lw,legC);line(kx,ky,fx,fy,lw,legC);fillRR(fx-.025*h,fy-.035*h,.1*h,.04*h,.015*h,p.shoe||'#cfc8b8');}
  ctx.save();ctx.translate(0,hipY);ctx.rotate((p.lean||0)+cr*.5);ctx.translate(0,-hipY);
  const shY=hipY-.34*h,arm=.36*h,aw=.062*h;const backC=shade(p.body,-.25);
  const drawArm=(a,e,c,sx)=>{const ex=sx+Math.sin(a)*arm*.5,ey=shY+.02*h+Math.cos(a)*arm*.5;const hx=ex+Math.sin(a+e)*arm*.5,hy=ey+Math.cos(a+e)*arm*.5;line(sx,shY+.02*h,ex,ey,aw,c);line(ex,ey,hx,hy,aw,c);circ(hx,hy,.034*h,p.hand||'#15171c');return[hx,hy];};
  drawArm(p.armR??-.18,p.elbowR??.25,backC,-.02*h);
  fillRR(-.115*h,shY-.02*h,.23*h,hipY-shY+.08*h,.075*h,p.body);
  if(p.coat)fillRR(-.12*h,hipY-.02*h,.24*h,.17*h,.04*h,p.body);
  if(p.stripe)fillRR(-.115*h,shY+.1*h,.23*h,.035*h,.01*h,p.stripe);
  ctx.save();const hy=shY-.12*h;ctx.translate(0,shY-.03*h);ctx.rotate(p.headTilt||0);ctx.translate(0,-(shY-.03*h));
  circ(0,hy,.09*h,p.head||'#0d0f13');
  if(p.hair)ell(-.012*h,hy-.035*h,.088*h,.06*h,0,p.hair);
  if(p.hood){ctx.fillStyle=p.hood;ctx.beginPath();ctx.arc(-.01*h,hy,.105*h,Math.PI*.55,Math.PI*2.05);ctx.fill();}
  if(p.beanie){ctx.fillStyle=p.beanie;ctx.beginPath();ctx.arc(0,hy-.012*h,.094*h,Math.PI*1.03,Math.PI*1.97);ctx.fill();fillRR(-.1*h,hy-.035*h,.2*h,.032*h,.012*h,shade(p.beanie,-.18));}
  if(p.eyes)circ(.05*h,hy-.002*h,.011*h,'#fff8e0',p.eyes);
  ctx.restore();
  const hand=drawArm(p.armL??.12,p.elbowL??.25,p.body,.02*h);
  if(p.held)p.held(hand[0],hand[1],h);
  ctx.restore();ctx.restore();}
const YOU=o=>person(Object.assign({h:330,body:PAL.you,legs:'#16181d',beanie:PAL.orange,stripe:PAL.orange,head:'#111317',hand:'#15171c'},o));
// the thing: too tall, too thin, arms that hang to its knees, two white pinpoints
function thing(x,y,h,o={}){const f=o.face||1,ph=o.walk;ctx.save();ctx.translate(x,y);ctx.scale(f,1);const C='#020203';
  const L1=.25*h,L2=.25*h;const hipY=-(L1+L2);
  for(const k of[0,1]){let ta=k?-.04:.04,sa=ta;if(ph!=null){const s=Math.sin(ph+k*Math.PI);ta=s*.3;sa=ta-Math.max(0,-Math.cos(ph+k*Math.PI))*.55;}
    const kx=Math.sin(ta)*L1,ky=hipY+Math.cos(ta)*L1;line(0,hipY,kx,ky,.03*h,C);line(kx,ky,kx+Math.sin(sa)*L2,Math.min(0,ky+Math.cos(sa)*L2),.026*h,C);}
  ctx.save();ctx.translate(0,hipY);ctx.rotate(o.lean||0);ctx.translate(0,-hipY);
  const shY=hipY-.37*h;
  ctx.fillStyle=C;ctx.beginPath();ctx.moveTo(-.035*h,hipY+.02*h);ctx.lineTo(-.06*h,shY+.02*h);ctx.quadraticCurveTo(0,shY-.03*h,.06*h,shY+.02*h);ctx.lineTo(.035*h,hipY+.02*h);ctx.closePath();ctx.fill();
  const arm=.6*h,el=o.elbow??.06;for(const[s,k]of[[-1,.6],[1,1]]){const sw=(o.arm||0)+s*.04+Math.sin((ph||0)+k*3)*.04;const ex=s*.05*h+Math.sin(sw)*arm*.5,ey=shY+.02*h+Math.cos(sw)*arm*.5;
    const hx=ex+Math.sin(sw+el)*arm*.5,hy=ey+Math.cos(sw+el)*arm*.5;line(s*.05*h,shY+.02*h,ex,ey,.02*h,C);line(ex,ey,hx,hy,.017*h,C);
    for(let j=-1;j<=1;j++)line(hx,hy,hx+Math.sin(sw+el)*.06*h+j*.012*h,hy+Math.cos(sw+el)*.06*h,.007*h,C);}
  line(0,shY,0,shY-.04*h,.03*h,C);
  ctx.save();const hy=shY-.1*h;ctx.translate(0,shY-.04*h);ctx.rotate(o.tilt||0);ctx.translate(0,-(shY-.04*h));
  ell(0,hy,.042*h,.068*h,0,C);if(o.rim)ell(0,hy,.042*h,.068*h,0,'rgba(0,0,0,0)');
  const ey=o.eyes??1;if(ey>0){glow(.016*h,hy-.012*h,(o.eyeGlow||.07)*h,'rgba(235,240,255,1)',.35*ey);circ(.026*h,hy-.012*h,.0075*h+(o.eyeR||0),'#f6f3ea',ey);circ(.006*h,hy-.012*h,.0075*h+(o.eyeR||0),'#f6f3ea',ey);}
  ctx.restore();ctx.restore();ctx.restore();}
function dog(x,y,s,f=1){ctx.save();ctx.translate(x,y);ctx.scale(f*s,s);const C='#6a4a34',D=shade(C,-.3);
  for(const[lx,a]of[[-30,-.25],[-14,.15],[16,-.2],[32,.25]])line(lx,-30,lx+Math.sin(a)*30,0,8,lx===-14||lx===32?C:D);
  ell(0,-38,44,19,0,C);line(-40,-46,-62,-72,7,C);ell(48,-58,19,16,-.25,C);
  poly([56,-64,88,-66,88,-58,60,-54],C);poly([60,-50,84,-44,80,-36,58,-44],C);poly([62,-55,86,-58,82,-46,62,-49],'#1a0d0a');
  ell(40,-72,7,13,.5,D);circ(55,-64,2.6,'#000');line(28,-52,44,-46,5,'#b23a2e');ctx.restore();}
function breath(x,y,r,a=.5,seed=1,grow=1){const R=rng(seed);for(let i=0;i<10;i++)circ(x+(R()-.3)*r*1.7*grow,y+(R()-.5)*r*.8*grow,r*(.3+R()*.45)*grow,'#e6ecf6',a*.32);}
function car(x,y,s,o={}){const f=o.face||1,col=o.col||PAL.taxi;ctx.save();ctx.translate(x,y);ctx.scale(s*f,s);
  if(o.beam){const g=ctx.createLinearGradient(180,-60,760,-40);g.addColorStop(0,'rgba(255,240,200,.5)');g.addColorStop(1,'rgba(255,240,200,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(170,-76);ctx.lineTo(780,-170);ctx.lineTo(780,40);ctx.lineTo(170,-50);ctx.fill();}
  fillRR(-190,-118,380,80,18,col);poly([-110,-116,-66,-178,86,-178,128,-116],shade(col,-.15));
  poly([-94,-118,-58,-166,6,-166,6,-118],'#1b2533');poly([18,-118,18,-166,78,-166,112,-118],'#1b2533');
  if(o.riders)for(const rx of o.riders){circ(rx,-140,15,'#0c0e12');}
  if(o.wiper!=null)line(116,-118,116-Math.cos(o.wiper)*48,-118-Math.sin(o.wiper)*48,4,'#0b0d12');
  if(o.sign){fillRR(-32,-204,64,26,5,'#f2e6b0');text('TAXI',0,-185,'700 17px Arial','#222');}
  for(const wx of[-118,118]){circ(wx,-38,36,'#0b0c0f');circ(wx,-38,15,'#55575c');}fillRR(176,-98,16,20,4,'#fff3cf');fillRR(-194,-98,10,20,3,'#c0392b');ctx.restore();}
function bus(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const col=o.col||'#3c5b63';fillRR(-420,-300,840,250,24,col);
  for(let i=0;i<6;i++){fillRR(-388+i*120,-272,98,94,10,'#22323b');glow(-339+i*120,-225,80,'rgba(200,225,215,1)',.12);
    const r=hash(i*3.1+.5);if(r>.3){circ(-339+i*120+(r-.6)*30,-214,15,'#0c0e12');fillRR(-357+i*120+(r-.6)*30,-199,36,30,10,'#0c0e12');}}
  fillRR(-420,-150,840,14,4,shade(col,-.25));for(const wx of[-260,260]){circ(wx,-50,48,'#0b0c0f');circ(wx,-50,20,'#4a4c50');}
  fillRR(402,-122,18,28,5,'#fff3cf');fillRR(-424,-122,10,28,3,'#c0392b');text('24',360,-240,'600 26px Arial','#f2c14e');ctx.restore();}
function cyclist(x,y,s,tilt){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(tilt);ctx.strokeStyle='#0b0d12';ctx.lineWidth=7;
  for(const wx of[-72,72]){ctx.beginPath();ctx.arc(wx,-48,46,0,7);ctx.stroke();}const fc='#3f7f86';
  line(-72,-48,-8,-48,7,fc);line(-8,-48,40,-120,7,fc);line(72,-48,46,-128,7,fc);line(-26,-118,40,-120,7,fc);line(40,-128,58,-140,6,'#111');
  person({x:-20,y:-60,h:230,body:'#3f6f76',legs:'#14161b',lean:.62,armL:1.9,elbowL:-.4,armR:1.7,elbowR:-.3,legA:[1.2,.4],legB:[.2,-.3]});ctx.restore();}
function busStop(x,y){line(x-110,y,x-110,y-300,8,'#2b2f36');line(x+110,y,x+110,y-300,8,'#2b2f36');fillRR(x-130,y-320,260,26,6,'#2b2f36');
  ctx.fillStyle='rgba(159,195,214,.16)';ctx.fillRect(x-106,y-294,212,210);fillRR(x+40,y-280,60,170,4,'#d9e4ee');glow(x+70,y-195,170,'rgba(210,228,245,1)',.3);
  fillRR(x-90,y-110,140,14,3,'#2b2f36');}

// ---------- rain ----------
function makeRain(seed,n,x0,x1,y0,y1,r=[1.6,3.2]){const R=rng(seed),a=[];for(let i=0;i<n;i++)a.push({x:lerp(x0,x1,R()),y:lerp(y0,y1,R()),r:lerp(r[0],r[1],R()),a:.35+R()*.5,s:R()});a.sort((p,q)=>p.x-q.x);return a;}
function lb(a,v){let lo=0,hi=a.length;while(lo<hi){const m=(lo+hi)>>1;if(a[m].x<v)lo=m+1;else hi=m;}return lo;}
function drawDrops(drops,view,o={}){const fall=o.fall||0,len=o.len||0,t=o.t||0;const y0=o.y0??-60,H=(o.y1??1150)-y0;
  for(let i=lb(drops,view.x0-20);i<drops.length;i++){const d=drops[i];if(d.x>view.x1+20)break;
    let y=d.y;if(fall>0)y=y0+((d.y-y0+fall*(.8+d.s*.4))%H+H)%H;if(y<view.y0||y>view.y1)continue;
    if(o.skip&&o.skip(d))continue;let x=d.x;if(o.shiver){const v=o.shiver(d);if(v>0){x+=Math.sin(t*47+d.s*60)*v;y+=Math.cos(t*53+d.s*40)*v*.6;}}
    if(len>1){ctx.globalAlpha=1;ctx.strokeStyle=`rgba(214,226,255,${d.a*.55})`;ctx.lineWidth=1.3+d.r*.25;ctx.beginPath();ctx.moveTo(x,y-len);ctx.lineTo(x,y);ctx.stroke();}
    else{ctx.globalAlpha=d.a;ctx.fillStyle=o.col||'#dfe7ff';ctx.fillRect(x-d.r*.5,y-d.r*2.6,d.r,d.r*2.6);ctx.fillRect(x-d.r*.75,y-d.r*.9,d.r*1.5,d.r*1.1);}}
  ctx.globalAlpha=1;}
function splash(x,y,k,s=1){if(k<=0||k>=1)return;for(let i=0;i<7;i++){const a=i/7*6.283+.4;line(x+Math.cos(a)*8*s*k,y+Math.sin(a)*8*s*k,x+Math.cos(a)*(10+22*k)*s,y+Math.sin(a)*(10+22*k)*s,2.2,`rgba(225,235,255,${.85*(1-k)})`);}
  circ(x,y,6*s*(1-k),'#e6eeff',.6*(1-k));}

// ---------- the freeze grade: offscreen pass, drained of colour, keeps alpha ----------
let MAIN,OFF,OFFX,SC=.5625;
function graded(k,fn){if(k<=.001){fn();return;}const keep=ctx;OFFX.setTransform(1,0,0,1,0,0);OFFX.globalCompositeOperation='source-over';OFFX.clearRect(0,0,OFF.width,OFF.height);OFFX.setTransform(SC,0,0,SC,0,0);
  ctx=OFFX;fn();OFFX.setTransform(1,0,0,1,0,0);OFFX.globalCompositeOperation='source-atop';OFFX.fillStyle=`rgba(60,95,170,${.14*k})`;OFFX.fillRect(0,0,OFF.width,OFF.height);OFFX.globalCompositeOperation='source-over';
  ctx=keep;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.filter=`saturate(${1-.8*k}) brightness(${1-.08*k})`;ctx.drawImage(OFF,0,0);ctx.filter='none';ctx.restore();}
