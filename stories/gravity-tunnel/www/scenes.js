// ===================== The 42-Minute Fall, scene by scene (v2 vertical explainer) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const CX=540,CY=1000,R=420;
// p = fraction of the one-way trip (0 surface, .5 centre, 1 other side)
const posK=p=>(1-Math.cos(Math.PI*p))/2;
function tripP(t){const sc=sceneAt(t).id;
  if(sc==='c3')return lerp(0,.06,seg(t,wi(3,'step'),E(3)));
  if(sc==='c4'){const h=wi(5,'halfway'),n=wi(5,'nothing');return t<h?lerp(.06,.25,seg(t,T(4),h)):t<n?lerp(.25,1/3,seg(t,h,wi(5,'half'))):lerp(1/3,.5,ss(seg(t,wi(5,'center'),n)));}
  if(sc==='c5')return .5;
  if(sc==='c6')return lerp(.5,1,ss(seg(t,T(7),wi(7,'exactly'))));
  return null;}
function fallAt(p,h=130){const k=posK(p);const y=lerp(CY-R,CY+R,k);faller(CX,y-(p<.02?h*.5:0),h,p>.5?Math.PI:0);}
// cold open: the hole through the Earth
function c1(t){const k=seg(t,0,E(0)),f=wi(0,'42');const p=fract(t/5.4);
  vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.05,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0});const q=posK(p);faller(CX,lerp(CY-R,CY+R,q),130,0);
    arrow(800,600,800,1400,10,U.y,.8,34);});
  if(t<f-.1)T2('A HOLE THROUGH THE EARTH',540,380,62,U.ink,{w:900,stroke:10});popT('42',540,330,230,U.y,t,f-.1);popT('MINUTES',540,500,90,U.ink,t,f);}
// Hooke and Newton, 1679
function sage(x,y,h,o){const wig='#e8e1cf';ell(x,y-.78*h,.25*h,.27*h,0,wig);ell(x-.2*h,y-.6*h,.1*h,.2*h,0,wig);ell(x+.2*h,y-.6*h,.1*h,.2*h,0,wig);
  toon(Object.assign({x,y,h,hat:null,jacket:o.coat,stripe:false,skin:'#efc3a0',pants:'#2a2230'},o));ctx.save();ctx.fillStyle=wig;ctx.beginPath();ctx.arc(x,y-.85*h,.175*h,Math.PI*1.05,Math.PI*1.95);ctx.fill();ctx.restore();}
function c2(t){const k=seg(t,T(1),E(1)),y3=wi(1,'300');const fl=ss(seg(t,T(1)+.6,T(1)+2.2));
  vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.05,k)),1,()=>{space(t,{c0:'#0a0812',c1:'#1c1430'});
    sage(270,1500,640,{coat:'#6a3b5a',brow:'flat',mouth:'smile',look:{x:1,y:0},tag:'HOOKE'});sage(810,1500,640,{coat:'#2f4f7a',brow:'worried',mouth:'o',look:{x:-1,y:0},tag:'NEWTON'});
    const lx=lerp(330,700,fl),ly=900-Math.sin(fl*Math.PI)*160;ctx.save();ctx.translate(lx,ly);ctx.rotate(-.2+fl*.3);fillRR(-90,-60,180,120,8,'#f4ecd2');for(let i=0;i<4;i++)line(-66,-30+i*20,66,-30+i*20,3,'rgba(60,60,90,.4)');ctx.restore();
    chip('A LETTER, 1679',540,640,{size:44,a:ap(t,T(1)+.4)});});
  popT('300+ YEARS AGO',540,380,90,U.y,t,y3-.1);}
// same density, no air, step off: +10 m/s every second
function c3(t){const nd=wi(2,'same'),na=wi(2,'air'),st=wi(3,'step'),tn=wi(3,'ten');
  if(t<T(3)-.05){const k=seg(t,T(2),E(2));vl(vcam(540,lerp(1000,990,k),lerp(1.0,1.04,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0});faller(CX,CY-R-70,130,0,{armL:[.2,.1],armR:[.2,.1],mouth:'flat',brow:'flat'});});
    chip('SAME DENSITY ALL THE WAY',540,330,{size:44,a:ap(t,nd-.1),bg:U.y,col:'#14110a'});chip('NO AIR',540,460,{size:48,a:ap(t,na-.1),bg:'rgba(224,54,42,.96)'});return;}
  const p=tripP(t);const fy=CY-R+posK(p)*2*R;const k=seg(t,T(3),E(3));
  vl(vcam(540,lerp(700,760,k),lerp(1.7,1.5,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0});faller(CX,fy-(t<st?65:0),130,0,t<st?{armL:[.2,.1],armR:[.2,.1],mouth:'flat',brow:'flat'}:{});});
  const secs=Math.max(0,Math.floor((t-tn)/.5));if(t>tn-.1){ctx.save();ctx.translate(540,1500);fillRR(-330,-130,660,260,26,'rgba(12,16,28,.94)');T2('SPEED',0,-80,34,U.dim,{w:800});T2(`${Math.min(4,secs)*10} m/s`,0,10,120,U.y,{w:900});T2(`AFTER ${Math.min(4,secs)} s`,0,95,34,U.ink,{w:800});ctx.restore();}}
// gravity gets weaker: only the Earth below you pulls; half at halfway, nothing at the centre
function c4(t){const p=tripP(t),kk=posK(p);const r=R*Math.abs(1-2*kk);const k=seg(t,T(4),E(5));
  vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.04,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0});ctx.save();ctx.fillStyle='rgba(5,7,15,.55)';ctx.beginPath();ctx.arc(CX,CY,R,0,Math.PI*2);ctx.moveTo(CX+Math.max(1,r),CY);ctx.arc(CX,CY,Math.max(1,r),0,Math.PI*2,true);ctx.fill();ctx.restore();
    if(r>4){ctx.strokeStyle=U.y;ctx.lineWidth=6;ctx.setLineDash([16,12]);ctx.beginPath();ctx.arc(CX,CY,r,0,7);ctx.stroke();ctx.setLineDash([]);}
    const fy=lerp(CY-R,CY+R,kk);faller(CX,fy,120,0);if(r>30)arrow(CX+110,fy,CX+110,fy+Math.min(220,r*.6),12,U.red,1,30);});
  const a=ap(t,wi(4,'less')-.1);if(a>0)chip('ONLY THE EARTH BELOW YOU PULLS',540,1720,{size:40,a,bg:U.y,col:'#14110a'});
  ctx.save();ctx.translate(140,1560);bar(0,0,800,44,Math.abs(Math.cos(Math.PI*p)),U.grn,'YOUR WEIGHT',Math.round(Math.abs(Math.cos(Math.PI*p))*100)+'%');ctx.restore();
  popT('0%',820,1000,120,U.y,t,wi(5,'nothing')-.05);}
// fastest at the centre: 7.9 km/s, ~9x a rifle bullet
function c5(t){const k=seg(t,T(6),E(6)),e=wi(6,'eight'),b=wi(6,'rifle');
  vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.08,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0});for(let i=0;i<6;i++)line(CX-40+i*16,CY-260-i*30,CX-40+i*16,CY-80,4,'rgba(255,255,255,.4)');faller(CX,CY,140,0);});
  popT('7.9 km/s',540,330,140,U.y,t,e-.1);
  const a=ap(t,b-.4);if(a>0){ctx.save();ctx.globalAlpha=a;ctx.translate(120,1560);bar(0,0,840,40,1,U.y,'YOU, AT THE CENTER','7.9 km/s');ctx.translate(0,150);bar(0,0,840,40,.9/7.9,'#c99a3a','RIFLE BULLET','~0.9 km/s');bullet(170,20,1);ctx.restore();}}
// slowing down, stop exactly at the far surface: 42 minutes
function c6(t){const p=tripP(t),ex=wi(7,'exactly');const k=seg(t,T(7),E(7));
  vl(vcam(540,lerp(1000,1060,k),lerp(1.0,1.06,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0});const fy=lerp(CY-R,CY+R,posK(p));faller(CX,fy+(t>ex?60:0),130,Math.PI);
    if(t<ex)arrow(CX+120,fy+80,CX+120,fy-60,12,U.red,1,30);});
  clockDial(860,330,130,42.2*p);T2(`${(42.2*p).toFixed(0)} MIN`,560,330,96,U.y,{w:900,stroke:12});
  const a=ap(t,ex);if(a>0)chip('STOP. OTHER SIDE.',540,1700,{size:52,a,bg:U.y,col:'#14110a'});}
// and back again forever: 84 minutes
function c7(t){const k=seg(t,T(8),E(8)),ft=wi(8,'forever'),e=wi(8,'84');const p=t<wi(8,'back')?1:(1+(t-wi(8,'back'))/1.6)%2;const pp=p>1?2-p:p;
  vl(vcam(540,lerp(1000,980,k),lerp(1.05,1.0,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0});faller(CX,lerp(CY-R,CY+R,posK(pp)),120,p>1?0:Math.PI);
    arrow(CX+160,CY+200,CX+160,CY-200,10,U.y,.7,30);arrow(CX-160,CY-200,CX-160,CY+200,10,U.y,.7,30);});
  popT('FOREVER',540,330,110,U.ink,t,ft-.1);popT('84 MIN',540,1640,140,U.y,t,e-.1);chip('ONE ROUND TRIP',540,1780,{size:40,a:ap(t,e)});}
// any tunnel: same 42 minutes
const A1=-Math.PI/2-.55,A2=-Math.PI/2+.55;
function c8(t){const any=wi(9,'anywhere'),ny=wi(9,'new'),f2=wi(9,'42'),st=wi(10,'steep'),ex=wi(10,'exactly');const k=seg(t,T(9),E(10));
  const p=t<ny?0:Math.min(1,(t-ny)/(Math.max(.5,f2-ny)))%1.0001;const ph=t<ny?0:((t-ny)/3.2)%2;const pp=ph>1?2-ph:ph;
  vl(vcam(540,lerp(1000,990,k),lerp(1.0,1.04,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0,chords:[[A1,A2]]});
    const[x1,y1]=chordPos(CX,CY,R,-Math.PI/2,Math.PI/2,pp);circ(x1,y1,26,U.y);const[x2,y2]=chordPos(CX,CY,R,A1,A2,pp);circ(x2,y2,26,U.grn);
    const a=ap(t,ny-.1);if(a>0){T2('NEW YORK',CX+Math.cos(A1)*R-60,CY+Math.sin(A1)*R-60,36,U.ink,{w:900,a});T2('LONDON',CX+Math.cos(A2)*R+60,CY+Math.sin(A2)*R-60,36,U.ink,{w:900,a});}
    if(t>st-.2){const a2=ap(t,st-.2);ctx.save();ctx.globalAlpha=a2;arrow(CX,CY-R*.82+40,CX+180,CY-R*.82+40,8,U.grn,1,24);arrow(CX+30,CY-200,CX+30,CY+40,8,U.y,1,24);ctx.restore();}});
  popT('42 MIN',300,1640,110,U.y,t,f2-.1);popT('42 MIN',780,1640,110,U.grn,t,f2+.1);
  const a=ap(t,ex-.1);if(a>0)chip('LESS STEEP = SLOWER, BUT SHORTER',540,350,{size:40,a,bg:U.y,col:'#14110a'});}
// an orbit, seen from the side
function c9(t){const k=seg(t,T(11),E(11)),o=wi(11,'orbit'),sd=wi(11,'side');const th=-Math.PI/2+(t-T(11))*1.1;
  vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.04,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0});ctx.strokeStyle='rgba(91,140,255,.6)';ctx.lineWidth=4;ctx.setLineDash([12,10]);ctx.beginPath();ctx.arc(CX,CY,R*1.06,0,7);ctx.stroke();ctx.setLineDash([]);
    const sx=CX+Math.cos(th)*R*1.06,sy=CY+Math.sin(th)*R*1.06;const fy=CY+Math.sin(th)*R;sat(sx,sy,1.2);
    if(t>sd-.3){ctx.save();ctx.globalAlpha=ap(t,sd-.3);ctx.setLineDash([10,10]);line(sx,sy,CX,fy,4,'rgba(255,255,255,.7)');ctx.setLineDash([]);ctx.restore();}
    circ(CX,fy,26,U.y);});
  popT('84 MIN ORBIT',540,1620,96,U.B,t,T(11));const a=ap(t,sd-.2);if(a>0)chip('YOUR FALL = THE ORBIT, SEEN FROM THE SIDE',540,1770,{size:36,a,bg:U.y,col:'#14110a'});}
// the real Earth: 38 minutes
function c10(t){const k=seg(t,T(12),E(12)),h=wi(12,'heavier'),e=wi(12,'38');
  vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.05,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0,layers:true,names:ap(t,h-.2)});});
  popT('38 MIN',540,1640,150,U.y,t,e-.1);chip('THE REAL EARTH',540,330,{size:48,a:ap(t,T(12))});}
// the catch: the centre is about as hot as the surface of the Sun
function c11(t){const k=seg(t,T(13),TL.total),h=wi(13,'hot'),j=wi(13,'jump');
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.06,k)),1,()=>{space(t);cut(CX,CY,R,{tunnel:0,layers:true});glow(CX,CY,R*.7,'rgba(255,230,140,1)',.25+.1*Math.sin(t*6));me2({x:CX-120,y:CY-R+10,h:260,brow:'worried',mouth:'o',look:{x:.8,y:1}});});
  const a=ap(t,h-.3);if(a>0){chip('CENTER ~ 5,200°C',540,1700,{size:46,a,bg:'rgba(224,54,42,.96)'});chip("SUN'S SURFACE ~ 5,500°C",540,1810,{size:38,a:ap(t,h)});}}
const SCENES={c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11};
const FADES={};
const CAPY={c1:.6,c2:.86,c3:.86,c4:.13,c5:.6,c6:.75,c7:.6,c8:.75,c9:.13,c10:.75,c11:.75};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const p=tripP(t);const chips=[];
  if(p!=null){chips.push({k:'FALLING',v:(42.2*p).toFixed(1)+' MIN'});chips.push({k:'SPEED',v:(7.9*Math.sin(Math.PI*p)).toFixed(1)+' km/s',hot:p>.3&&p<.7});chips.push({k:'WEIGHT',v:Math.round(Math.abs(Math.cos(Math.PI*p))*100)+'%'});}
  else chips.push({k:'TRIP',v:sc==='c10'?'38 MIN':'42 MIN'});
  const tag={c1:'REAL PHYSICS',c2:'HOOKE & NEWTON',c3:'STEP 1',c4:'GRAVITY FADES',c5:'TOP SPEED',c6:'THE OTHER SIDE',c7:'FOREVER',c8:'THE WEIRD PART',c9:'IT\'S AN ORBIT',c10:'THE REAL EARTH',c11:'THE CATCH'}[sc];
  return{chips,tag,tagRed:false};}
