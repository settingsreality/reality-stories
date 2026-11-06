// ===================== Fish Finder, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
function stamp(s,x,y,t,t0,o={}){const q=ap(t,t0,.16);if(q<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(o.rot??-.12);const k=1.5-.5*q;ctx.scale(k,k);ctx.globalAlpha=q;const w=o.w||620;fillRR(-w/2,-74,w,148,16,'rgba(255,246,236,.96)');ctx.strokeStyle=FF.red;ctx.lineWidth=12;rr(-w/2,-74,w,148,16);ctx.stroke();T2(s,0,6,o.size||80,FF.red,{w:900});ctx.restore();}
const RED='#ff3b2f',GRN='#44e08a',BOT=[[37.5,40,RED],[36,37.5,'#ffb52e']];
// cold open: me in the shanty, it standing upside down under my boots
function s1(t){const k=seg(t,0,E(0)),u=wi(0,'upside');const hit=t>u-.05;const sh=hit?shakeAt(t,4,.6):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(1040,1060,k)+sh.y,lerp(1.0,1.07,k)),1,()=>{section(t,{hole:760});
    under(430,780,{glint:hit?1:.4,armL:[.15,.1],armR:[.15,.1]});murk(.22);
    me({x:430,y:ICE0,h:760,brow:'scared',mouth:'o',look:{x:0,y:1}});
    rod(560,700,740,600,{to:[760,1400]});});
  const a=ap(t,u-.1);if(a>0)label('UPSIDE DOWN',800,1330,{font:'900 64px MS',h:110,a,bg:'rgba(224,54,42,.96)'});
  if(t>u&&t<u+.08)flash(.35,'#9fd0ff');}
// outside: grandpa's shanty, his flag far out
function s2(t){const k=seg(t,T(1),E(1)),lw=wi(1,'last');vl(vcam(lerp(560,520,k),1100,lerp(1.0,1.08,k)),1,()=>{lake(t,{flag:t>lw-.2});});
  const a=ap(t,wi(1,"grandpa's")-.1);if(a>0)label("GRANDPA'S SHANTY",540,560,{font:'900 50px MS',h:90,a,bg:'rgba(255,201,60,.95)',col:'#14110a'});
  const b=ap(t,lw-.1);if(b>0)label('WENT THROUGH HERE, LAST WINTER',540,1660,{font:'900 40px MS',h:78,a:b,bg:'rgba(224,54,42,.96)'});}
// the ice: 18 in, you need 4; 40 ft of black water
function s3(t){const k=seg(t,T(2),E(2)),f=wi(2,'four'),w=wi(2,'forty');const dn=ss(seg(t,w-.4,E(2)));
  vl(vcam(540,lerp(1000,1300,dn),lerp(1.15,1.0,dn)),1,()=>{section(t,{hole:600});me({x:380,y:ICE0,h:640,brow:'flat',mouth:'flat',look:{x:.6,y:.3}});rod(480,740,590,640,{to:[600,1700]});
    // ruler on the ice
    fillRR(720,ICE0-14,70,ICE1-ICE0+28,6,'#ffc93c');for(let i=0;i<=6;i++)line(720,ICE0-10+i*(ICE1-ICE0+20)/6,745,ICE0-10+i*(ICE1-ICE0+20)/6,4,'#14110a');
    const a=ap(t,wi(2,'eighteen')-.1);if(a>0)label('18 IN',860,ICE0-70,{font:'900 46px MS',h:80,a,bg:'rgba(6,8,16,.9)'});
    const b=ap(t,f-.1);if(b>0){ctx.save();ctx.globalAlpha=b;line(-200,ICE0+25,1300,ICE0+25,6,GRN);ctx.restore();label('4 IN = SAFE TO WALK',330,ICE0+170,{font:'900 40px MS',h:74,a:b,bg:'rgba(30,140,80,.95)'});}
    const c=ap(t,w-.1);if(c>0){ctx.save();ctx.globalAlpha=c;line(600,ICE1+40,600,1880,5,'rgba(255,255,255,.5)');poly([600,1900,580,1860,620,1860],'#fff');ctx.restore();T2('40 FT',780,1500,110,'#fff',{w:900,a:c,stroke:12});}});}
// the fish finder: rings, blips, bottom band
function s4(t){const k=seg(t,T(3),E(3)),b=wi(3,'blips'),bo=wi(3,'bottom');
  const fish=t>b-.1?[[14,15,GRN,.9],[22.5,23.5,'#ffb52e',.9],[29,29.8,GRN,.8]]:[];const bot=t>bo-.1?BOT:[];
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.06,k)),1,()=>{fillAll('#1a1410');glow(540,900,900,`rgba(${FF.lamp},1)`,.25);flasher(540,900,380,{bands:[[0,.6,GRN],...fish,...bot],read:'40.0'});});
  const a=ap(t,b);if(a>0)label('FISH',830,520,{font:'900 50px MS',h:88,a,bg:'rgba(30,140,80,.95)'});
  const c=ap(t,bo);if(c>0)label('BOTTOM: 40 FT',540,1450,{font:'900 50px MS',h:90,a:c,bg:'rgba(224,54,42,.96)'});}
// grandpa's rules, taped to the screen
function s5(t){const rv=[5,6,7].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(4),E(7));
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{fillAll('#1a1410');glow(540,900,900,`rgba(${FF.lamp},1)`,.22);flasher(540,1250,330,{bands:[[0,.6,GRN],...BOT],read:'40.0'});note(540,860,{reveal:rv,circle:[0,ap(t,wi(6,'look')-.1,.6),ap(t,wi(7,'cut')-.1,.6)]});});}
// 12:40, a red blip rises: 30, 20, 10
function s6(t){const k=seg(t,T(8),E(8)),l=wi(8,'lifted'),a30=wi(8,'thirty'),a20=wi(8,'twenty'),a10=wi(8,'ten');
  const d=t<l?39:t<a30?lerp(39,30,ss(seg(t,l,a30))):t<a20?lerp(30,20,ss(seg(t,a30,a20))):t<a10?lerp(20,10,ss(seg(t,a20,a10))):lerp(10,8,seg(t,a10,E(8)+1));
  const sh=t>a10?shakeAt(t,4,.5):{x:0,y:0};
  vl(vcam(540+sh.x,960+sh.y,lerp(1.0,1.12,k)),1,()=>{fillAll('#1a1410');glow(540,900,900,'rgba(255,90,70,1)',.18*seg(t,l,a10));flasher(540,900,400,{bands:[[0,.6,GRN],...BOT,[d,d+1.6,RED]],read:d.toFixed(1),readCol:t>l?RED:GRN});});
  ctx.save();ctx.translate(540,1560);fillRR(-260,-90,520,180,22,'rgba(6,8,16,.92)');T2('12:40 AM',0,6,96,FF.amber,{w:900});ctx.restore();}
// it stopped right under the ice, six feet tall
function s7(t){const k=seg(t,T(9),E(9)),s6=wi(9,'six'),b=wi(9,'bigger');const grow=ss(seg(t,s6-.2,s6+.6));
  vl(vcam(540,lerp(960,930,k),lerp(1.04,1.0,k)),1,()=>{fillAll('#160c0c');glow(540,900,900,'rgba(255,60,50,1)',.25);flasher(540,900,400,{bands:[[0,.6,GRN],...BOT,[1,lerp(2.5,7,grow),RED]],read:'1.0',readCol:RED});});
  const a=ap(t,s6-.1);if(a>0)label('6 FT TALL',540,1460,{font:'900 64px MS',h:110,a,bg:'rgba(224,54,42,.96)'});
  stamp('BIGGER THAN ME',540,1680,t,b-.03,{w:760,size:76});}
// looking down the hole: the sole of a boot
function s8(t){const k=seg(t,T(10),E(10)),h=wi(10,'headlamp'),s=wi(10,'sole');const pale=ap(t,wi(10,'pale')-.2,.8)*.45+ap(t,s-.1,.3)*.55;
  vl(vcam(540,lerp(960,1000,k),lerp(1.0,1.18,k)),1,()=>{holeView(t,{sole:t>h?pale:0});});
  if(t>s&&t<s+.08)flash(.4,'#cfe8ff');const a=ap(t,s);if(a>0)label('A BOOT. FROM BELOW.',540,1560,{font:'900 54px MS',h:96,a,bg:'rgba(224,54,42,.96)'});}
// it mirrors me
function s9(t){const k=seg(t,T(11),E(11)),st=wi(11,'stepped'),st2=wi(11,'stepped',1);const mv=ss(seg(t,st,st+.6)),mv2=ss(seg(t,st2,st2+.6));const x=lerp(560,380,mv);const ux=lerp(560,380,mv2);
  vl(vcam(540,lerp(1060,1040,k),lerp(1.0,1.05,k)),1,()=>{section(t,{hole:820});under(ux,760,{glint:1});murk(.2);me({x,y:ICE0,h:760,brow:'scared',mouth:'o',look:{x:0,y:1}});});
  const a=ap(t,wi(11,'reflection')-.1);if(a>0)label('IT MIRRORS ME',540,1840,{font:'900 56px MS',h:96,a,bg:'rgba(224,54,42,.96)'});}
// the line goes tight, I grab the knife
function s10(t){const k=seg(t,T(12),E(12)),ti=wi(12,'tight'),kn=wi(12,'knife'),r3=wi(12,'rule');const bend=ss(seg(t,ti-.1,ti+.3));const sh=t>ti?shakeAt(t,6,.8):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(860,820,k)+sh.y,lerp(1.15,1.25,k)),1,()=>{section(t,{hole:700});me({x:400,y:ICE0,h:800,brow:t>ti?'scared':'flat',mouth:t>ti?'grit':'flat',look:{x:.7,y:.5}});
    const tx=lerp(700,690,bend),ty=lerp(560,720,bend);rod(470,690,tx,ty,{to:[700,1500],tight:t>ti});if(t>kn-.1)knife(330,620,1.1,.5);});
  stamp('RULE 3: CUT THE LINE',540,1560,t,r3-.03,{w:900,size:64});}
// three knocks under my boots
function s11(t){const k=seg(t,T(13),E(13)),ks=[wi(13,'three'),wi(13,'slow'),wi(13,'knocks')],g=wi(13,'grandpa');
  const hitAt=ks.find(x=>t>x&&t<x+.25);const sh=hitAt!=null?shakeAt(t,10,1):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(1000,1040,k)+sh.y,lerp(1.05,1.12,k)),1,()=>{section(t,{hole:780});me({x:440,y:ICE0,h:800,brow:'scared',mouth:'o',look:{x:0,y:1}});
    ks.forEach((x,i)=>{const q=seg(t,x,x+.6);if(q>0&&q<1){ctx.save();ctx.strokeStyle=`rgba(255,255,255,${.8*(1-q)})`;ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(440,ICE1,120+q*360,30+q*60,0,0,7);ctx.stroke();ctx.restore();}});});
  ks.forEach((x,i)=>{const a=ap(t,x-.03,.12);if(a>0)T2('KNOCK',540,[1260,1440,1620][i],80,'#fff',{w:900,a,stroke:12});});
  const a=ap(t,g-.1);if(a>0)label("GRANDPA'S KNOCK",540,1820,{font:'900 54px MS',h:96,a,bg:'rgba(255,201,60,.95)',col:'#14110a'});}
// on the screen: the blip holds a rod, its line runs up through my hole, to my hook
function s12(t){const k=seg(t,T(14),E(14)),r=wi(14,'rod'),u=wi(14,'up'),hk=wi(14,'hook');const zin=ss(seg(t,T(14)-.1,r));
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.06,k)),1,()=>{fillAll('#160c0c');glow(540,900,900,'rgba(255,60,50,1)',.22);flasher(540,900,400,{bands:[[0,.6,GRN],...BOT,[1,7,RED,1-zin*.6]]});
    // zoom window: red sonar silhouette, upside down, holding a rod
    ctx.save();ctx.beginPath();ctx.arc(540,900,250,0,7);ctx.clip();fillAll('rgba(10,4,4,.95)');for(let i=0;i<14;i++)line(290,650+i*36,790,650+i*36,1.5,'rgba(255,80,60,.1)');
    T2('ZOOM 0-8 FT',540,690,30,'#ff8a7a',{f:'PM',w:500});line(290,720,790,720,4,'rgba(160,220,255,.7)');T2('ICE',740,705,24,'#a8dcff',{w:800});
    ctx.globalAlpha=ss(seg(t,T(14),r));ctx.save();ctx.translate(500,725);ctx.scale(1,-1);ctx.shadowColor=RED;ctx.shadowBlur=24;toon({x:0,y:0,h:330,blank:true,hatCol:RED,jacket:RED,pants:'#c42a20',boots:'#ff6a5a',glove:RED,stripe:false,glint:0,armR:[1.9,.3]});ctx.restore();
    const ra=ap(t,r-.1,.4);if(ra>0){ctx.globalAlpha=ra;line(612,868,640,725,6,'#ffd0c8');}
    const ua=ss(seg(t,u-.2,hk));if(ua>0){ctx.globalAlpha=1;ctx.strokeStyle='#fff';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(640,725);ctx.lineTo(640,lerp(725,600,ua));ctx.stroke();}
    ctx.restore();});
  const a=ap(t,hk-.1);if(a>0)label('TO MY HOOK',540,1440,{font:'900 64px MS',h:110,a,bg:'rgba(224,54,42,.96)'});}
// hooked on each other: both rods, one line through the hole
function s13(t){const k=seg(t,T(15),E(15)),p=wi(15,'pulls');const tug=Math.sin(t*5)*.5+.5;
  vl(vcam(540,lerp(1040,1060,k),lerp(1.0,1.05,k)),1,()=>{section(t,{hole:640});
    under(420,720,{glint:1});ctx.save();ctx.translate(0,ICE1*2);ctx.scale(1,-1);rod(550,830,630,750+(1-tug)*14,{});ctx.restore();murk(.18);
    me({x:420,y:ICE0,h:720,brow:'scared',mouth:'grit',look:{x:.6,y:.5}});rod(550,720,630,640+tug*14,{});
    line(630,640+tug*14,640,ICE0,4,'rgba(245,250,255,.95)');line(640,ICE1,630,1470-(1-tug)*14,4,'rgba(245,250,255,.95)');
    T2('↑',780,790,90,FF.red,{w:900,a:tug});T2('↓',780,1420,90,FF.red,{w:900,a:1-tug});});
  const a=ap(t,p-.1);if(a>0)label('WHOEVER REELS FIRST WINS',540,1840,{font:'900 48px MS',h:88,a,bg:'rgba(224,54,42,.96)'});}
// last line: me, rod in one hand, knife in the other, knocking under the floor
function s14(t){const k=seg(t,T(16),TL.total),kn=Math.floor((t-T(16))/.9);const hit=fract((t-T(16))/.9)<.12&&kn<3;const sh=hit?shakeAt(t,7,1):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(860,900,k)+sh.y,lerp(1.15,1.22,k)),1,()=>{section(t,{hole:700});murk(.1);me({x:420,y:ICE0,h:820,brow:'scared',mouth:'o',look:{x:.5,y:.7}});rod(500,700,690,620,{to:[700,1500],tight:true});knife(310,640,1.1,.4);
    glow(700,ICE1+60,240,'rgba(200,235,255,1)',.3);});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14};
const FADES={};
const CAPY={s1:.52,s2:.68,s3:.52,s4:.84,s5:.9,s6:.2,s7:.13,s8:.2,s9:.52,s10:.52,s11:.52,s12:.2,s13:.52,s14:.52};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const i=+sc.slice(1);const chips=[];
  chips.push({k:'TIME',v:i===1?'12:58 AM':i<6?'11:52 PM':i===6?'12:40 AM':i<=10?'12:4'+Math.min(9,i-4)+' AM':'12:5'+(i-9)+' AM',hot:i===1||i>=6});
  const dep=i===1||i>=7?'0 FT':i===6?'RISING':null;if(dep)chips.push({k:'BLIP',v:dep,hot:true});
  chips.push({k:'ICE',v:'18 IN'});if(i===1||i>=10)chips.push({k:'LINE',v:'TIGHT',hot:true});
  const tag={s1:'UNDER THE ICE',s2:"GRANDPA'S LAKE",s3:'18 INCHES',s4:'FISH FINDER',s5:'RULES',s6:'RISING',s7:'RULE 2',s8:'DOWN THE HOLE',s9:'REFLECTION',s10:'RULE 3',s11:'KNOCK KNOCK KNOCK',s12:'THE SCREEN',s13:'HOOKED',s14:'CUT OR REEL'}[sc];
  return{chips,tag,tagRed:i===1||i>=6};}
