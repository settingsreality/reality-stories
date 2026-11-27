// ===================== Your Head Is Older, scene by scene (v2 vertical explainer) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9'.]/g,'').replace(/\.$/,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
// cold open: me, a clock at my head spinning fast, a clock at my feet crawling
function c1(t){const k=seg(t,0,E(0)),ms=wi(0,'measured');
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.07,k)),1,()=>{space(t);
    ctx.fillStyle='#16324f';ctx.beginPath();ctx.ellipse(540,2350,1300,700,0,0,7);ctx.fill();
    me2({x:470,y:1660,h:1100,brow:'worried',mouth:'o',look:{x:.8,y:-.6}});
    arrow(780,620,700,720,8,U.y,1,26);arrow(780,1560,700,1600,8,U.B,1,26);
    clk(880,560,110,t*1.6,{hand:U.y,rim:U.y,glow:'rgba(255,201,60,1)'});clk(880,1530,110,t*.12,{hand:U.B,rim:U.B});});
  T2('HEAD',880,720,46,U.y,{w:900,stroke:10});T2('FAST',880,775,40,U.ink,{w:900,stroke:8});
  T2('FEET',880,1690,46,U.B,{w:900,stroke:10});T2('SLOW',880,1745,40,U.ink,{w:900,stroke:8});
  popT('MEASURED ✓',540,250,92,U.grn,t,ms-.05);}
// gravity slows time: clocks near a heavy planet tick slower
function c2(t){const k=seg(t,T(1),E(1)),sl=wi(1,'slows'),cl=wi(1,'closer');
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{space(t);
    // warped grid sheet
    for(let i=-6;i<=6;i++){ctx.strokeStyle='rgba(91,140,255,.35)';ctx.lineWidth=3;ctx.beginPath();for(let x=-100;x<=1180;x+=20){const d=(x-540)/260;const y=1500+i*36+ (1/(1+d*d))*260*(1-Math.abs(i)/9);x===-100?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}
    earth(540,1620,180,{spin:.2});
    const rates=[[540,1330,.25],[540,1030,.7],[540,730,1.3]];const a=ap(t,cl-.2);
    rates.forEach(([x,y,r],i)=>{clk(x,y,92,t*r,{hand:i===0?U.B:i===2?U.y:U.ink});});
    if(a>0){T2('SLOWER',780,1300,42,U.B,{w:900,stroke:8,a});T2('FASTER',780,730,42,U.y,{w:900,stroke:8,a});arrow(300,1300,300,760,10,U.y,a,30);T2('HIGHER',300,1350,32,U.dim,{w:900,a});}});
  popT('GRAVITY',540,200,100,U.B,t,T(1)+.1);popT('SLOWS TIME',540,320,90,U.y,t,sl-.05);}
// feet live in slower time
function c3(t){const k=seg(t,T(2),E(2)),fe=wi(2,'feet',1),sl=wi(2,'slower');
  vl(vcam(540,lerp(1000,1060,k),lerp(1.0,1.08,k)),1,()=>{space(t);
    for(let i=0;i<12;i++){const y=1720-i*120;ctx.fillStyle=`rgba(91,140,255,${.32-i*.026})`;ctx.fillRect(-300,y-120,1680,120);}
    ctx.fillStyle='#2a5a3a';ctx.beginPath();ctx.ellipse(540,2420,1500,720,0,0,7);ctx.fill();
    me2({x:540,y:1720,h:1050,brow:'flat',mouth:'flat',look:{x:0,y:1}});
    const a=ap(t,sl-.3);if(a>0){glow(540,1700,260,'rgba(91,140,255,1)',.6*a);}});
  chip('EARTH',540,1850,{size:40,bg:'rgba(42,90,58,.95)'});
  const a=ap(t,fe-.1);chip('← CLOSER TO EARTH',780,1560,{size:34,a,bg:U.B});popT('SLOWER TIME',540,300,96,U.B,t,sl-.05);}
// 2010, NIST: two atomic clocks, one lifted about a foot
function c4(t){const k=seg(t,T(3),E(3)),yr=wi(3,'2010'),ni=wi(3,'nist'),lf=wi(3,'lifted'),ft=wi(3,'foot');const up=ss(seg(t,lf,lf+1.2));
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.05,k)),1,()=>{space(t,{stars:false,c0:'#0a0d16',c1:'#151b2a'});table(1350);
    atomClock(300,1220,1.1,'0000');const ly=1220-up*330;fillRR(700,ly+130,200,1350-ly-130,8,'#4a5568');for(let i=0;i<6;i++)line(700,ly+150+i*(1350-ly-150)/6,900,ly+150+i*(1350-ly-150)/6,3,'#2d3442');
    atomClock(800,ly,1.1,'0000');
    if(up>0){arrow(1000,1220,1000,ly+10,8,U.y,up,26);}
});
  popT('2010',540,260,140,U.y,t,yr-.05);chip('NIST LAB',540,400,{size:40,a:ap(t,ni-.1)});popT('≈ 1 FOOT',820,640,84,U.y,t,ft-.05);}
// the higher clock ran faster
function c5(t){const k=seg(t,T(4),E(4)),ex=wi(4,'exactly'),ei=wi(4,'einstein');const dt=Math.max(0,t-T(4));
  vl(vcam(540,lerp(960,960,k),lerp(1.04,1.08,k)),1,()=>{space(t,{stars:false,c0:'#0a0d16',c1:'#151b2a'});table(1350);
    const lo=String(Math.floor(dt*311)%10000).padStart(4,'0'),hi=String(Math.floor(dt*311*1.0+dt*9)%10000).padStart(4,'0');
    atomClock(300,1220,1.1,lo);fillRR(700,1020,200,330,8,'#4a5568');atomClock(800,890,1.1,hi);
    chip('LOW',300,1440,{size:36});chip('HIGH',800,1440,{size:36,bg:U.y,col:'#14110a'});});
  popT('FASTER',800,640,96,U.y,t,T(4)+.4);popT('EINSTEIN ✓',540,1700,96,U.grn,t,ei-.05);}
// over 79 years: about 90 billionths of a second
function c6(t){const k=seg(t,T(5),E(5)),y79=wi(5,'79year'),bn=wi(5,'90');const f=ss(seg(t,y79,bn-.2));
  vl(vcam(540,lerp(960,950,k),lerp(1.0,1.04,k)),1,()=>{space(t);
    const age=Math.round(f*79);const h=lerp(380,800,clamp(f*3));me2({x:540,y:1250,h,brow:'flat',mouth:'smile',look:{x:0,y:0}});
    bar(160,1400,760,40,f,U.y,'LIFE',age+' YEARS');});
  popT('79 YEARS',540,300,110,U.ink,t,y79-.05);
  const a=ap(t,bn-.1);if(a>0){T2('0.00000009 s',540,1620,96,U.y,{w:900,stroke:12,a});T2('90 BILLIONTHS OF A SECOND',540,1730,40,U.ink,{w:900,stroke:8,a});}}
// GPS satellites: 20,000 km up, gain 45 microseconds a day
const ex7=540,ey7=1450;
function c7(t){const k=seg(t,T(6),E(6)),ti=wi(6,'tiny'),gp=wi(6,'gps'),km=wi(6,'20000'),wk=wi(6,'weaker'),g45=wi(6,'45');
  vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.03,k)),1,()=>{space(t);earth(ex7,ey7,170,{spin:t*.01});
    ctx.strokeStyle='rgba(255,201,60,.4)';ctx.lineWidth=4;ctx.setLineDash([14,12]);ctx.beginPath();ctx.arc(ex7,ey7,720,0,7);ctx.stroke();ctx.setLineDash([]);
    for(let i=0;i<3;i++){const a=-Math.PI/2+(i-1)*.55+t*.03;const sx=ex7+Math.cos(a)*720,sy=ey7+Math.sin(a)*720;sat(sx,sy,.6,a+Math.PI/2);if(i===1&&t>g45-.2)clk(sx,sy+110,58,t*1.4,{hand:U.grn,rim:U.grn});}
    const a=ap(t,km-.1);if(a>0){line(ex7+40,ey7-180,ex7+40,ey7-700,4,'rgba(233,237,245,.6)');T2('20,000 km',ex7+60,ey7-450,48,U.y,{w:900,stroke:8,a,align:'left'});}
    if(t>wk-.2){const q=ap(t,wk-.2);for(let r=260;r<720;r+=90){ctx.strokeStyle=`rgba(91,140,255,${q*(.35*(1-(r-260)/460))})`;ctx.lineWidth=6;ctx.beginPath();ctx.arc(ex7,ey7,r,0,7);ctx.stroke();}T2('WEAKER GRAVITY',540,1840,40,U.B,{w:900,stroke:8,a:q});}});
  popT('TINY.',540,250,90,U.dim,t,ti-.05,{a:t<gp?1:.0});popT('+45 µs',540,300,120,U.grn,t,g45-.05);chip('EVERY DAY',540,420,{size:38,a:ap(t,g45+.3)});}
// speed takes away 7: +45 - 7 = +38
function c8(t){const k=seg(t,T(7),E(7)),sp=wi(7,'speed'),s7=wi(7,'7'),f38=wi(7,'38');
  vl(vcam(540,960,lerp(1.0,1.03,k)),1,()=>{space(t);
    const base=1350,sc=14;const a1=ap(t,T(7)-.1),a2=ap(t,s7-.1),a3=ap(t,f38-.1);
    line(120,base,960,base,5,U.dim);
    fillRR(200,base-45*sc*a1,180,45*sc*a1,14,U.grn);T2('+45',290,base-45*sc-50,64,U.grn,{w:900,a:a1});T2('GRAVITY',290,base+50,32,U.dim,{w:900});
    fillRR(450,base,180,7*sc*a2,14,U.red);T2('−7',540,base+7*sc+50,64,U.red,{w:900,a:a2});T2('SPEED',540,base-40,32,U.dim,{w:900,a:a2});
    fillRR(700,base-38*sc*a3,180,38*sc*a3,14,U.y);T2('+38',790,base-38*sc-50,64,U.y,{w:900,a:a3});T2('TOTAL',790,base+50,32,U.dim,{w:900});
    if(t>sp-.2){const a=ap(t,sp-.2);sat(540,500,.8*a+.001,Math.sin(t*2)*.1);for(let i=0;i<4;i++)line(330-i*40,480+i*14,420-i*40,480+i*14,5,`rgba(233,237,245,${a*.5})`);}});
  popT('µs FAST, EVERY DAY',540,1600,56,U.ink,t,f38+.2);}
// your map would drift 10 km a day
function c9(t){const k=seg(t,T(8),E(8)),k10=wi(8,'10');const d=ss(seg(t,T(8)+.6,E(8)));
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.05,k)),1,()=>{space(t,{stars:false});cityMap(540,1000,940,1300);pin(380,1300,U.grn);T2('YOU',380,1340,30,U.ink,{w:900,stroke:6});
    const px=lerp(380,820,d),py=lerp(1250,520,d);ctx.setLineDash([12,10]);line(380,1250,px,py,6,'rgba(255,90,72,.8)');ctx.setLineDash([]);glow(px,py,60,'rgba(91,140,255,1)',.8);circ(px,py,22,'#5b8cff');ctx.strokeStyle='#fff';ctx.lineWidth=6;ctx.beginPath();ctx.arc(px,py,22,0,7);ctx.stroke();
    chip('MAP SAYS YOU',px,py-60,{size:30,bg:U.red});});
  popT((d*10).toFixed(1)+' km',540,250,110,U.y,t,k10-.05);chip('PER DAY, UNCORRECTED',540,1820,{size:38,a:ap(t,T(8)+.3),bg:U.red});}
// 2022: across one millimeter
function c10(t){const k=seg(t,T(9),E(9)),yr=wi(9,'2022'),mm=wi(9,'millimeter');
  vl(vcam(540,lerp(960,960,k),lerp(1.0,1.1,k)),1,()=>{space(t,{stars:false,c0:'#0a0d16',c1:'#151b2a'});
    fillRR(240,680,600,900,40,'rgba(95,216,255,.07)');for(let i=0;i<60;i++){const y=740+i*13.5;circ(540+Math.sin(i*1.3+t*2)*120,y,7,'#8fe6ff',.4+.4*hash(i));}
    glow(540,1130,380,'rgba(95,216,255,1)',.25);
    line(900,740,900,1530,6,U.y);line(870,740,930,740,6,U.y);line(870,1530,930,1530,6,U.y);
    clk(240,860,70,t*1.06,{hand:U.y,rim:U.y});clk(240,1420,70,t*1.0,{hand:U.B,rim:U.B});});
  popT('2022',540,280,140,U.y,t,yr-.05);popT('1 mm',900,1640,96,U.y,t,mm-.05);chip('ATOM CLOUD',540,1660,{size:32,a:ap(t,T(9)+.8)});}
// every inch of you
function c11(t){const k=seg(t,T(10),E(10)),ev=wi(10,'every');
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.04,k)),1,()=>{space(t);me2({x:430,y:1720,h:1150,brow:'worried',mouth:'o',look:{x:.8,y:0}});
    for(let i=0;i<7;i++){const y=1640-i*190,r=lerp(.3,1.6,i/6);const a=ap(t,T(10)+i*.18);if(a<=0)continue;ctx.save();ctx.globalAlpha=a;line(640,y,790,y,4,U.dim);clk(860,y,62,t*r,{hand:i>4?U.y:i<2?U.B:U.ink,rim:i>4?U.y:i<2?U.B:U.ink});ctx.restore();}});
  popT('EVERY INCH',540,230,100,U.y,t,ev-.05);}
// go down: the center of the Earth, slowest of all
function c12(t){const k=seg(t,T(11),E(11)),dn=wi(11,'down'),ce=wi(11,'center'),sl=wi(11,'slowest');const z=lerp(1,1.12,ss(seg(t,ce,E(11))));
  vl(vcam(540,lerp(960,1000,k),z),1,()=>{space(t);cutEarth(540,1050,560,t);
    me2({x:540,y:490,h:130,brow:'flat',mouth:'o',look:{x:0,y:1}});arrow(600,520,600+0*(1),980,10,U.y,ap(t,dn-.1),30);
    if(t>sl-.3)clk(700,1180,80,t*.05,{hand:U.B,rim:U.B,glow:'rgba(91,140,255,1)'});});
  chip('CORE',540,1050,{size:40,a:ap(t,ce-.1),bg:'rgba(200,90,30,.95)'});popT('SLOWEST',540,250,110,U.B,t,sl-.05);popT('OF ALL',540,370,80,U.ink,t,sl+.3);}
// 4.5 billion years: the core is ~2.5 years younger than the surface
function c13(t){const k=seg(t,T(12),E(12)),bn=wi(12,'4.5'),y25=wi(12,'2.5'),yg=wi(12,'younger');
  vl(vcam(540,lerp(980,960,k),lerp(1.04,1.0,k)),1,()=>{space(t);cutEarth(540,1150,420,t);
    const f=ss(seg(t,bn,y25));bar(150,560,780,38,f,U.or,'SURFACE AGE',(f*4.5).toFixed(1)+' BILLION YRS');
    bar(150,700,780,38,f*.9999,U.B,'CORE AGE',f>.99?'2.5 YRS LESS':(f*4.5).toFixed(1)+' BILLION YRS');});
  popT('2.5 YEARS',540,1700,120,U.y,t,y25-.05);chip('YOUNGER',540,1830,{size:44,a:ap(t,yg-.1),bg:U.y,col:'#14110a'});popT('4.5 BILLION YEARS',540,270,72,U.ink,t,bn-.05);}
// top floor or basement?
function c14(t){const k=seg(t,T(13),TL.total),tp=wi(13,'top'),bs=wi(13,'basement');const fl=t<bs?8:0;
  vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.05,k)),1,()=>{space(t);ctx.fillStyle='#16324f';ctx.fillRect(-300,1560,1680,900);ctx.fillStyle='#0d1e30';ctx.fillRect(-300,1560,1680,40);
    tower(540,1740,520,150,10,-1);fillRR(280,1560,520,180,8,'#1a1f2b');
    const fy=fl===8?1740-150*9+20:1580;me2({x:540,y:fy+110,h:110,brow:'flat',mouth:'smile',look:{x:.5,y:0}});
    clk(880,1740-150*9+70,60,t*1.2,{hand:U.y,rim:U.y});clk(880,1650,60,t*.4,{hand:U.B,rim:U.B});});
  chip('TOP FLOOR',200,1740-150*9+70,{size:32,a:ap(t,tp-.1),bg:U.y,col:'#14110a'});chip('BASEMENT',200,1650,{size:32,a:ap(t,bs-.1),bg:U.B});}
const SCENES={c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14};
const FADES={};
const CAPY={c1:.62,c2:.24,c3:.62,c4:.8,c5:.13,c6:.6,c7:.7,c8:.13,c9:.88,c10:.73,c11:.13,c12:.15,c13:.68,c14:.12};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const chips=[];
  const m={c1:[['HEAD','FAST',1],['FEET','SLOW']],c2:[['GRAVITY','SLOWS TIME']],c3:[['HEAD → FEET','≈ 1.7 m']],c4:[['LIFT','≈ 33 cm']],c5:[['HIGH CLOCK','FASTER',1]],
    c6:[['GAP','90 ns / 79 YRS']],c7:[['ORBIT','20,000 km'],['GRAVITY','+45 µs/day']],c8:[['NET','+38 µs/day',1]],c9:[['DRIFT','≈10 km/day',1]],c10:[['GAP','1 mm']],
    c11:[['EVERY INCH','DIFFERENT']],c12:[['DEPTH','6,371 km']],c13:[['CORE','2.5 YRS YOUNGER',1]],c14:[['YOU PICK','UP / DOWN']]}[sc]||[];
  for(const[k,v,h]of m)chips.push({k,v,hot:!!h});
  const tag={c1:'REAL PHYSICS',c2:'EINSTEIN',c3:'YOUR BODY',c4:'THE TEST',c5:'THE RESULT',c6:'HOW MUCH?',c7:'GPS',c8:'THE MATH',c9:'WHY IT MATTERS',c10:'EVEN SMALLER',c11:'YOU',c12:'GO DOWN',c13:'THE CORE',c14:'YOUR CHOICE'}[sc];
  return{chips,tag};}
