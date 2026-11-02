// ===================== Second Moon, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
// cold open: huge moon over the hill, glowing side swings round to my town
function s1(t){const k=seg(t,0,E(0)+.6),tr=wi(0,'turned'),q=ss(seg(t,tr-.2,tr+.9));
  vl(vcam(540,lerp(980,930,k),lerp(1.0,1.1,k)),1,()=>townHill(t,{hz:1450,noDome:true,beam:q,bx:790,ba:.02,moon:()=>moon2(lerp(560,640,q),560,330,t,{dir:lerp(-.5,1.25,q),turn:lerp(.28,.92,q)}),
    fig:()=>me({x:300,y:1960,h:880,brow:q>.3?'scared':'worried',mouth:q>.3?'open':'o',look:{x:.8,y:-1},armR:[.1,.1],armL:[.1,.1]})}));
  if(Math.abs(t-tr)<.2)flash(.35*(1-Math.abs(t-tr)/.2),'#bfefff');}
// real: Earth, the bus-sized rock, 57 days
function s2(t){const k=seg(t,T(1),E(1)+.5);const rk=wi(1,'rock'),d57=wi(1,'fiftyseven');
  vl(vcam(540,lerp(980,930,k),lerp(1.0,1.06,k)),1,()=>{nightSky(t,2100);earth(540,1060,240,{spin:t*.05});
    ctx.strokeStyle='rgba(255,201,60,.5)';ctx.lineWidth=5;ctx.setLineDash([18,16]);ctx.beginPath();ctx.ellipse(540,1060,430,250,-.4,0,7);ctx.stroke();ctx.setLineDash([]);
    const a=t*.8-1.2,rx=540+Math.cos(a)*430*Math.cos(.4)+Math.sin(a)*250*Math.sin(.4),ry=1060-Math.cos(a)*430*Math.sin(.4)+Math.sin(a)*250*Math.cos(.4);
    glow(rx,ry,50,'rgba(255,220,150,1)',.6);lumpy(15,rx,ry);ctx.fillStyle='#b8a890';ctx.fill();
    label('REAL: 2024 PT5',540,430,{font:'900 44px MS',h:74,a:ap(t,wi(1,'2024')-.2),bg:'rgba(255,201,60,.95)',col:'#14110a'});
    const b=ap(t,rk-.1);if(b>0){ctx.save();ctx.globalAlpha=b;ctx.translate(540,1560);ctx.scale(.55,.55);fillRR(-420,-180,840,190,24,'#f2b632');fillRR(-420,-120,840,12,0,'#14110a');for(let i=0;i<7;i++)fillRR(-390+i*114,-160,90,60,8,'#26324a');circ(-260,20,52,'#14110a');circ(250,20,52,'#14110a');ctx.restore();label('ABOUT THIS BIG',540,1450,{font:'900 34px MS',a:b});}
    const m=ap(t,d57-.1);if(m>0){ctx.save();ctx.translate(540,640);ctx.scale(.7+.3*m,.7+.3*m);T2('57 DAYS',0,0,150,'#ffc93c',{w:900,a:m,stroke:12});ctx.restore();}});}
// the town calm, then the little observatory, me inside
function s3(t){const k=seg(t,T(2),E(2)+.5),c=wi(2,'i');
  if(t<c-.05){vl(vcam(540,lerp(1050,1000,k*2),1.05),1,()=>townHill(t,{hz:1450,allLit:true,moon:()=>moon2(760,520,70,t,{dir:-.5,turn:.3})}));return;}
  vl(vcam(lerp(500,560,k),lerp(1020,960,k),lerp(1.05,1.14,k)),1,()=>{domeRoom(t,{open:.35,a:.75,mx:600,my:200,mr:60});me({x:250,y:1860,h:1000,brow:'flat',mouth:'smile',look:{x:.8,y:-.5},armR:[.5,.9],armL:[.1,.1]});});}
// why it's impossible
function s4(t){const k=seg(t,T(3),E(3)+.5),dk=wi(3,'dark'),th=wi(3,'this');
  vl(vcam(540,960,lerp(1.0,1.05,k)),1,()=>{nightSky(t,2100);circ(0,960,250,'#ffb93c');glow(0,960,620,'rgba(255,190,70,1)',.55);T2('SUN',110,960,56,'#14110a',{w:900});
    for(let i=0;i<4;i++){const y=500+i*300;line(300,y,470,y,8,'rgba(255,201,60,.7)');poly([470,y-20,510,y,470,y+20],'rgba(255,201,60,.8)');}
    moon2(760,560,210,t,{dir:Math.PI,turn:.5,normal:true});T2('NORMAL MOON',760,830,44,'#fff',{w:900,stroke:8});
    const q=ap(t,wi(3,'that')-.1,.5);if(q>0){ctx.save();ctx.globalAlpha=q;moon2(760,1240,210,t,{dir:0,turn:.5});T2('THIS ONE',760,1500,48,'#7fe9ff',{w:900,stroke:8});ctx.restore();}
    const d=ap(t,dk-.1);if(d>0)label('SHOULD BE DARK',770,1240,{font:'900 44px MS',h:76,a:d,bg:'rgba(224,54,42,.95)'});});
  if(Math.abs(t-th)<.14)flash(.22,'#bfefff');}
// Ruth tapes the rules on
function s5(t){const k=seg(t,T(4),E(4)+.5);vl(vcam(lerp(470,420,k),lerp(1060,1160,k),lerp(1.05,1.22,k)),1,()=>{domeRoom(t,{open:.3,a:.45,mx:600,my:160,mr:50,note:t>wi(4,'taped')+.1});
    const h=ap(t,wi(4,'taped')-.3,.5);ruth({x:200,y:1880,h:1150,brow:'flat',mouth:'flat',look:{x:.8,y:-.2},armR:[lerp(.1,1.5,h),lerp(.1,.5,h)]});});}
function s6(t){const rv=[5,6,7].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(5),E(7));rulesCard(t,{reveal:rv,cy:lerp(780,760,k),s:lerp(.98,1.03,k)});}
// night after night: bigger, a km counter
function s7(t){const k=seg(t,T(8),E(8)+.3);const a=wi(8,'three'),b=wi(8,'two'),c=wi(8,'ninety');const q=t<a?0:t<b?1:t<c?2:3;const r=[90,150,230,380][q],km=['384,400','300,000','200,000','90,000'][q];const cut=[0,a,b,c][q];const p=ss(seg(t,cut,cut+.3));
  vl(vcam(540,lerp(980,1000,k),1+.1*p),1,()=>{domeRoom(t,{open:.85,a:.6,mx:580,my:430,mr:r+.0,shaft:q/3,note:true});});
  const sc=.7+.3*p;ctx.save();ctx.translate(540,1280);ctx.scale(sc,sc);fillRR(-400,-120,800,240,24,'rgba(6,8,16,.9)');T2(km,0,-20,120,q===3?SM.red:'#ffc93c',{w:900});T2('KILOMETERS AWAY',0,76,38,'#dfe6f5',{w:800});ctx.restore();
  if(t>c&&t<c+.12)flash(.3,'#bfefff');}
// logs going quiet
function s8(t){const n=wi(9,'one'),q=wi(9,'went');const rows=[0,1,2,3,4].map(j=>ap(t,T(9)+.2+j*.22));const dead=[0,1,2,3,4].map(j=>t>lerp(n-.05,q+.3,j/4)?1:0);
  const k=seg(t,T(9),E(9)+.5);vl(vcam(540,lerp(820,880,k),lerp(1.0,1.08,k)),1,()=>logScreen(t,{rows,dead}));}
// tonight it turned; the dome jams
function s9(t){const k=seg(t,T(10),E(10)+.4),b=wi(10,'hit'),j=wi(10,'jammed');const op=lerp(.8,.5,ss(seg(t,b+.3,j)));const sh=shakeAt(t,t>j?7:0,.5);const tu=ss(seg(t,T(10),wi(10,'i')));
  vl(vcam(lerp(620,740,seg(t,b-.3,b))+sh.x,lerp(900,1150,seg(t,b-.3,b))+sh.y,lerp(1.0,1.2,seg(t,b-.3,b))),1,()=>{domeRoom(t,{open:op,a:.45,mx:580,my:420,mr:320,moon:{dir:lerp(-.5,1.4,tu),turn:lerp(.4,.95,tu)},shaft:tu,btn:t>b,pct:t>j?'JAMMED':'CLOSING',pctRed:t>j});
    me({x:560,y:1910,h:1000,brow:t>j?'scared':'worried',mouth:t>j?'open':'o',look:{x:.9,y:-.3},armR:[1.3,.5],armL:[.1,.1]});});
  if(t>j-.02&&t<j+.15)flash(.25,'#ff4d3d');}
// Ruth on the phone
function s10(t){const k=seg(t,T(11),E(11)+.5),d=wi(11,'it',3);const late=t>d-.1;
  vl(vcam(540,lerp(1000,960,k),lerp(1.05,1.15,k)),1,()=>{domeRoom(t,{open:.5,a:.45,mx:580,my:430,mr:late?lerp(320,420,seg(t,d,E(11))):320,moon:{dir:1.4,turn:.95},shaft:1,pct:'JAMMED',pctRed:true});
    me({x:400,y:1960,h:1250,brow:'scared',mouth:'o',look:{x:.6,y:-.9},armL:[.1,.1],armR:[2.2,1.5],held:(hx,hy)=>{fillRR(hx-22,hy-62,44,110,8,'#14161c');fillRR(hx-17,hy-55,34,94,4,'#5cf2a2');}});});
  fillRR(620,1250,400,190,22,'rgba(10,14,18,.92)');waveform(820,1320,320,90,t,.85,SM.led,13);T2('RUTH · CALLING',820,1400,30,SM.led,{w:800});}
function s11(t){const c3=ap(t,wi(12,'three'),.7),q=ap(t,wi(12,'the')-.1,.4);rulesCard(t,{reveal:[1,1,1],circle:[0,0,c3],q,cy:lerp(760,720,seg(t,T(12),E(12))),s:.86});}
// the telescope moves on its own; light pours out
function s12(t){const k=seg(t,T(13),E(13)+.5),mv=wi(13,'moved'),sw=wi(13,'swung'),li=wi(13,'light');const a=lerp(.45,1.15,ss(seg(t,mv-.1,sw+.8)));const L=ap(t,li-.1,.7);const[ex,ey]=eyepiecePt(590,1160,a);
  vl(vcam(lerp(560,520,k),lerp(1020,1120,k),lerp(1.0,1.18,k)),1,()=>{domeRoom(t,{open:.5,a,mx:580,my:430,mr:380,moon:{dir:1.4,turn:.95},shaft:.6,pct:'JAMMED',pctRed:true});
    me({x:210,y:1960,h:1050,brow:L>.2?'scared':'worried',mouth:L>.2?'open':'o',look:{x:.9,y:-.6},armR:[.1,.1],armL:[.1,.1]});
    if(L>0){ctx.save();ctx.globalCompositeOperation='lighter';beam(ex,ey,-2.05+.0,1100,300,.75*L,SM.glow);beam(ex,ey,-2.05,800,140,.7*L,'230,250,255');ctx.restore();glow(ex,ey,240,`rgba(${SM.glow},1)`,.85*L);circ(ex,ey,34,'#fff',L);}});}
// the eye
function s13(t){const k=seg(t,T(14),E(14)+.5),tw=wi(14,'the',1);const p=ss(seg(t,tw+.4,E(14)));vl(vcam(540,960,lerp(1.0,1.1,k)),1,()=>eyeView(t,k,p));
  if(Math.abs(t-tw)<.16)flash(.4*(1-Math.abs(t-tw)/.16),'#fff');}
// the question: me in the eyepiece light, dome half shut
function s14(t){const k=seg(t,T(15),TL.total),a=1.15;const[ex,ey]=eyepiecePt(590,1160,a);
  vl(vcam(520,lerp(1120,1060,k),lerp(1.15,1.05,k)),1,()=>{domeRoom(t,{open:.5,a,mx:580,my:430,mr:380,moon:{dir:1.4,turn:.95},shaft:.6,pct:'JAMMED',pctRed:true});
    me({x:210,y:1960,h:1050,brow:'scared',mouth:'flat',look:{x:.9,y:-.6},armR:[.1,.1],armL:[.1,.1]});
    ctx.save();ctx.globalCompositeOperation='lighter';beam(ex,ey,-2.05,1100,300,.6,SM.glow);ctx.restore();glow(ex,ey,240,`rgba(${SM.glow},1)`,.8);circ(ex,ey,34,'#fff',1);});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14};
const FADES={};
const CAPY={s1:.8,s2:.4,s3:.86,s4:.14,s5:.64,s6:.86,s7:.82,s8:.84,s9:.3,s10:.8,s11:.86,s12:.3,s13:.84,s14:.2};
const END_AT=null;
const NIGHTS={s1:90,s7:null,s9:90,s10:90,s11:90,s12:90,s13:90,s14:90};
function hud(t){const sc=sceneAt(t).id;const late=['s1','s9','s10','s11','s12','s13','s14'].includes(sc);const chips=[];
  chips.push({k:'TIME',v:late?'23:47':(sc==='s2'?'2024':'NIGHT')});
  if(sc==='s7'){const a=wi(8,'three'),b=wi(8,'two'),c=wi(8,'ninety');chips.push({k:'DISTANCE',v:(t<a?'384K':t<b?'300K':t<c?'200K':'90K')+' KM',hot:t>=c});}
  else if(sc!=='s2')chips.push({k:'DISTANCE',v:late?'90K KM':'384K KM',hot:late});
  if(late&&sc!=='s1')chips.push({k:'DOME',v:'50%',hot:true});
  const tag={s1:'WRONG SIDE',s2:'REAL: 2024 PT5',s3:'THE OBSERVATORY',s4:'IMPOSSIBLE',s5:"RUTH'S RULES",s6:"RUTH'S RULES",s7:'CLOSER EVERY NIGHT',s8:'WORLDWIDE LOG',s9:'IT TURNED',s10:'INCOMING CALL',s11:"RUTH'S RULES",s12:'NOT ME',s13:'THE EYEPIECE',s14:'THE EYEPIECE'}[sc];
  return{chips,tag,tagRed:late};}
