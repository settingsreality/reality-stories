// ===================== Do Not Disturb, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const RED='rgba(216,50,42,.96)',YEL='rgba(255,201,60,.95)',DK='rgba(6,8,16,.9)',TEAL='rgba(31,143,138,.96)';
function stamp(s,x,y,t,t0,o={}){const q=ap(t,t0,.16);if(q<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(o.rot??-.1);const k=1.5-.5*q;ctx.scale(k,k);ctx.globalAlpha=q;const w=o.w||620;fillRR(-w/2,-74,w,148,16,'rgba(255,246,236,.96)');ctx.strokeStyle=o.col||DN.red;ctx.lineWidth=12;rr(-w/2,-74,w,148,16);ctx.stroke();T2(s,0,6,o.size||80,o.col||DN.red,{w:900});ctx.restore();}
function shockRing(x,y,q,s=1){if(q<=0||q>=1)return;ctx.save();ctx.strokeStyle=`rgba(255,255,255,${.8*(1-q)})`;ctx.lineWidth=14*(1-q)+2;ctx.beginPath();ctx.ellipse(x,y,(80+q*900)*s,(40+q*420)*s,0,0,7);ctx.stroke();ctx.restore();}
// cold open: the sign has flipped, the sky dims, something knocks on the sky
function s1(t){const k=seg(t,0,E(0)),kn=wi(0,'knocked');const ks=[kn,kn+.35,kn+.7];const hit=ks.find(x=>t>x&&t<x+.2);const sh=hit!=null?shakeAt(t,12,1):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(1040,1000,k)+sh.y,lerp(1.0,1.06,k)),1,()=>{sky(t,{k:1,dim:.55+.25*ap(t,kn-.6,.6)});town(t,1720,{lit:.1});
    hotelHung(t,600,1720,{flip:1,lit:.85,swing:2});knuckles(520,lerp(-200,120,ap(t,kn-.5,.5)),1.3,ap(t,kn-.6,.5));ks.forEach(x=>shockRing(520,280,seg(t,x,x+.8)));});
  const a=Math.max(t<1.5?1:0,ap(t,wi(0,'please')-.1));if(a>0)label('IT FLIPPED',300,1520,{font:'900 56px MS',h:96,a,bg:TEAL});}
// the Grand Halverson at night: 12 floors
function s2(t){const k=seg(t,T(1),E(1)),tw=wi(1,'twelve');const n=Math.min(12,Math.floor(12*clamp(seg(t,tw-.2,tw+1.2))));
  vl(vcam(560,lerp(1060,1020,k),lerp(1.02,1.08,k)),1,()=>{sky(t,{k:0});town(t,1720,{lit:.5});const top=hotel(560,1720,{lit:.55,neon:.6+.4*Math.sin(t*3)**2});
    if(n>0){for(let f=0;f<n;f++){const y=1720-40-f*FH-FH/2+10;T2(String(f+1),800,y,40,DN.amber,{w:900});}}});
  const a=ap(t,tw-.1);if(a>0)label('12 FLOORS',540,380,{font:'900 60px MS',h:104,a,bg:YEL,col:'#14110a'});}
// 4 a.m.: the desk phone rings
function s3(t){const k=seg(t,T(2),E(2)),ca=wi(2,'called'),hg=wi(2,'hanging');const ring=t<ca+.8;
  vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.08,k)),1,()=>{fillAll('#3a2a26');for(let x=-400;x<1480;x+=90)line(x,-400,x,1300,6,'rgba(0,0,0,.15)');glow(540,500,800,`rgba(${DN.win},1)`,.3);
    T2('RECEPTION',540,420,70,'#e8c88a',{w:900});me({x:420,y:1500,h:760,brow:t>hg?'worried':'flat',mouth:t>hg?'o':'flat',look:{x:.5,y:.2},armR:t>ca+.5?[2.6,1.2]:[.12,.1]});
    fillRR(-200,1200,1500,500,20,'#5a3a2e');fillRR(-200,1190,1500,40,10,'#7a5240');phone(760,1160,1,t,ring);circ(300,1170,30,'#d9c27a');});
  ctx.save();ctx.translate(540,1560);fillRR(-230,-80,460,160,22,DK);T2('4:00 AM',0,6,90,DN.amber,{w:900});ctx.restore();
  const a=ap(t,hg-.1);if(a>0)label('A SIGN ON THE ROOF?',540,1760,{font:'900 50px MS',h:90,a,bg:RED});}
// dawn: the door hanger, 40 m tall
function s4(t){const k=seg(t,T(3),E(3)),fo=wi(3,'forty'),dn=wi(3,'disturb');
  vl(vcam(lerp(500,460,k),lerp(1120,1060,k),lerp(.92,.98,k)),1,()=>{sky(t,{k:1});town(t,1720,{lit:.15});hotelHung(t,600,1720,{lit:.3});
    const a=ap(t,fo-.1,.6);if(a>0){ctx.save();ctx.globalAlpha=a;line(150,1720,150,1720-1000*a,7,DN.amber);line(120,1720,180,1720,7,DN.amber);ctx.restore();T2('40 M',230,1100,100,'#fff',{w:900,a,stroke:12});}});
  stamp('DO NOT DISTURB',540,330,t,dn-.03,{w:820,size:74});}
// the hole is looped around our roof: the hotel is a doorknob
function s5(t){const k=seg(t,T(4),E(4)),lo=wi(4,'looped'),dk=wi(4,'doorknob');const z=lerp(1.0,1.9,ss(seg(t,T(4),lo+.6)));
  vl(vcam(600,lerp(1000,780,ss(seg(t,T(4),lo+.6))),z),1,()=>{sky(t,{k:1});town(t,1720,{lit:.15});const{hy}=hotelHung(t,600,1720,{lit:.3});
    const q=ap(t,dk-.15,.5);if(q>0){ctx.save();ctx.globalAlpha=q;ctx.setLineDash([18,12]);ctx.strokeStyle=DN.amber;ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(600,hy+80,240,260,0,0,7);ctx.stroke();ctx.setLineDash([]);fillRR(560,hy+330,80,400,10,'rgba(255,201,60,.25)');ctx.restore();}});
  const a=ap(t,dk-.1);if(a>0)label('= A DOORKNOB',540,1520,{font:'900 64px MS',h:110,a,bg:YEL,col:'#14110a'});}
// the binder: exterior signage, 3 rules
function s6(t){const rv=[6,7,8].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(5),E(8));
  vl(vcam(540,lerp(980,950,k),lerp(1.0,1.04,k)),1,()=>{fillAll('#3a2a26');glow(540,700,900,`rgba(${DN.win},1)`,.3);binder(540,900,{reveal:rv,circle:[0,ap(t,wi(7,'nobody')-.1,.6),ap(t,wi(8,'housekeeping')-.1,.6)]});});}
// empty streets: not one car, not one bird
function s7(t){const k=seg(t,T(9),E(9)),car=wi(9,'car'),bd=wi(9,'bird');
  vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.06,k)),1,()=>{sky(t,{k:1});
    // power lines with no birds
    for(const y of[520,580,640]){ctx.strokeStyle='#1c1f2a';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-200,y);ctx.quadraticCurveTo(540,y+80,1300,y);ctx.stroke();}
    town(t,1420,{lit:.05});fillRR(-500,1420,2100,700,0,'#2a2f3d');for(let x=-480;x<1600;x+=160)fillRR(x,1640,80,14,4,'#e8d27a');
    // window frame, me looking out
    ctx.fillStyle='#3a2a26';ctx.fillRect(-500,-500,560,3000);ctx.fillRect(1020,-500,600,3000);ctx.fillRect(-500,1840,2100,600);line(540,-500,540,1840,24,'#3a2a26');
    me({x:220,y:2000,h:900,brow:'worried',mouth:'flat',look:{x:1,y:-.2}});});
  const a=ap(t,car-.1);if(a>0)label('0 CARS',800,1180,{font:'900 56px MS',h:96,a,bg:RED});
  const b=ap(t,bd-.1);if(b>0)label('0 BIRDS',800,360,{font:'900 56px MS',h:96,a:b,bg:RED});}
// 9:00: the wind flips the sign
function s8(t){const k=seg(t,T(10),E(10)),wd=wi(10,'wind'),to=wi(10,'turned');const fl=ss(seg(t,to-.6,E(10)+.2));
  vl(vcam(560,lerp(1000,960,k),lerp(.98,1.04,k)),1,()=>{sky(t,{k:1,dim:.2*fl});town(t,1720,{lit:.15});hotelHung(t,600,1720,{lit:.4,flip:fl,swing:t>wd?4:1,rot:-.2+Math.sin(t*3)*.06*seg(t,wd,to)});
    if(t>wd)for(let i=0;i<8;i++){const y=300+i*140,x=fract(t*.8+hash(i))*1500-200;line(x,y,x+160,y,4,'rgba(255,255,255,.35)');}});
  ctx.save();ctx.translate(540,330);fillRR(-230,-80,460,160,22,DK);T2('9:00 AM',0,6,90,DN.amber,{w:900});ctx.restore();}
// the sky goes dim, like someone leaning over a bed
function s9(t){const k=seg(t,T(11),E(11)),di=wi(11,'dim'),le=wi(11,'leaning');const d=ap(t,di-.2,1.2);
  vl(vcam(560,lerp(1060,1000,k),lerp(1.0,.94,k)),1,()=>{sky(t,{k:1,dim:.25+.5*d});
    // a vast soft silhouette leaning in over the town
    const q=ap(t,le-.3,1.4);ctx.save();ctx.globalAlpha=.55*q;ctx.fillStyle='#05060c';ctx.beginPath();ctx.ellipse(lerp(1500,700,q),-200,900,700,-.3,0,7);ctx.fill();ctx.beginPath();ctx.ellipse(lerp(1700,1000,q),-650,380,380,0,0,7);ctx.fill();ctx.restore();
    town(t,1720,{lit:.15});hotelHung(t,600,1720,{lit:.7,flip:1});});
  stamp('PLEASE MAKE UP ROOM',540,1560,t,T(11)+.05,{w:900,size:64,col:DN.teal});}
// three knocks, every window rings: "Housekeeping."
function s10(t){const k=seg(t,T(12),E(12)),ks=[wi(12,'three'),wi(12,'knocks'),wi(12,'so')],hk=wi(12,'housekeeping');const hit=ks.find(x=>t>x&&t<x+.2);const sh=hit!=null?shakeAt(t,14,1):{x:0,y:0};
  const ring=Math.max(0,...ks.map(x=>{const q=seg(t,x,x+.6);return q>0&&q<1?1-q:0;}));
  vl(vcam(560+sh.x,lerp(1000,980,k)+sh.y,lerp(.96,1.0,k)),1,()=>{sky(t,{k:1,dim:.8});knuckles(560,lerp(-120,140,ap(t,ks[0]-.5,.5)),1.4,1);ks.forEach(x=>shockRing(560,300,seg(t,x,x+.8)));
    town(t,1720,{lit:.15});hotelHung(t,600,1720,{lit:.85,flip:1,ring});});
  ks.forEach((x,i)=>{const a=ap(t,x-.03,.12);if(a>0&&t<hk-.2)T2('KNOCK',[300,780,540][i],[700,700,860][i],90,'#fff',{w:900,a,stroke:12});});
  const a=ap(t,hk-.1);if(a>0)T2('HOUSEKEEPING.',540,760,96,'#fff',{w:900,a,stroke:14});}
// the twist: the town is the room, the hotel is the knob on a giant door
function s11(t){const k=seg(t,T(13),E(13)),kn=wi(13,'doorknob'),rm=wi(13,'town');const z=lerp(1.6,.42,ss(seg(t,kn-1.2,rm+.3)));
  // draw the town inside the knob plate, then the room around it
  vl(vcam(560,lerp(1200,960,ss(seg(t,kn-1.2,rm+.3))),z),1,()=>{fillAll('#5d4a3e');for(let x=-3000;x<4000;x+=260)line(x,-3000,x,4000,6,'rgba(0,0,0,.08)');
    fillRR(-1600,-2400,2300,4600,30,'#3d2c24');fillRR(-1540,-2340,2180,4480,20,'#4c372d');ctx.strokeStyle='rgba(0,0,0,.25)';ctx.lineWidth=16;rr(-1420,-2200,1940,2000,20);ctx.stroke();rr(-1420,0,1940,2000,20);ctx.stroke();
    fillRR(-3000,2200,7000,1000,0,'#2c2320');// floor
    ctx.save();ctx.beginPath();ctx.ellipse(600,1150,700,700,0,0,7);ctx.clip();sky(t,{k:1,dim:.6});town(t,1720,{lit:.15});hotelHung(t,600,1720,{lit:.85,flip:1});ctx.restore();
    ctx.strokeStyle='#a9864a';ctx.lineWidth=70;ctx.beginPath();ctx.ellipse(600,1150,700,700,0,0,7);ctx.stroke();
    // a giant bed in the room, out of focus
    fillRR(1700,1300,2400,900,60,'#e9e2d2');fillRR(1700,1200,500,300,60,'#f6f1e4');});
  const a=ap(t,kn-.1);if(a>0)label('HOTEL = DOORKNOB',540,330,{font:'900 56px MS',h:96,a,bg:YEL,col:'#14110a'});
  const b=ap(t,rm-.1);if(b>0)label('TOWN = THE ROOM',540,460,{font:'900 56px MS',h:96,a:b,bg:RED});}
// the card under my office door
function s12(t){const k=seg(t,T(14),E(14)),sl=wi(14,'slid');const q=ss(seg(t,sl-.3,sl+.7));
  vl(vcam(540,lerp(980,1020,k),lerp(1.0,1.08,k)),1,()=>{fillAll('#3a2a26');fillRR(140,-200,800,1500,10,'#5a3a2e');fillRR(200,-140,680,640,10,'#6a4636');fillRR(200,580,680,640,10,'#6a4636');circ(820,700,26,'#d9b45a');
    fillRR(-400,1300,1900,800,0,'#2a2220');glow(540,1300,500,'rgba(255,240,200,1)',.4);fillRR(140,1290,800,14,4,'#fff3d0');
    card(540,lerp(1300,1560,q),q,lerp(.1,-.04,q));});}
// last line: on the roof, my hand on the giant sign, the shadow overhead
function s13(t){const k=seg(t,T(15),TL.total),kn=Math.floor((t-T(15)-1.2)/.7);const hit=t>T(15)+1.2&&fract((t-T(15)-1.2)/.7)<.12&&kn<3;const sh=hit?shakeAt(t,8,1):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(900,940,k)+sh.y,lerp(1.0,1.05,k)),1,()=>{sky(t,{k:1,dim:.85});ctx.save();ctx.globalAlpha=.6;ctx.fillStyle='#05060c';ctx.beginPath();ctx.ellipse(800,-200,1000,700,-.3,0,7);ctx.fill();ctx.restore();
    fillRR(-300,1500,1700,600,10,'#3a2b2a');// roof
    hanger(820,700,1500,{flip:1,rot:-.12+Math.sin(t*2)*.02});
    me({x:380,y:1560,h:820,brow:'worried',mouth:'o',look:{x:.8,y:-.6},armR:[2.3,.3],tag:'NIGHT\nMANAGER'});});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.3,s2:.62,s3:.68,s4:.76,s5:.62,s6:.88,s7:.52,s8:.82,s9:.62,s10:.5,s11:.8,s12:.3,s13:.52};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const i=+sc.slice(1);const chips=[];
  chips.push({k:'TIME',v:i===1?'9:01 AM':i<3?'3:40 AM':i<7?'4:0'+(i-2)+' AM':i===7?'8:12 AM':'9:0'+(i-8)+' AM',hot:i===1||i>=8});
  chips.push({k:'SIGN',v:i===1||i>=8?'FLIPPED':i>=3?'DO NOT DISTURB':'NONE',hot:i===1||i>=8});
  chips.push({k:'CHECKED OUT',v:'0'});
  const tag={s1:'HOUSEKEEPING',s2:'GRAND HALVERSON',s3:'FRONT DESK',s4:'THE SIGN',s5:'THE DOORKNOB',s6:'RULES',s7:'EMPTY TOWN',s8:'RULE 3',s9:'MAKE UP ROOM',s10:'KNOCK KNOCK KNOCK',s11:'THE ROOM',s12:'A CARD',s13:'FLIP IT BACK?'}[sc];
  return{chips,tag,tagRed:i===1||i>=8};}
