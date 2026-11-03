// ===================== Dead Pixel, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const SQ={x:560,y:1180,s:690};
const armThrow=[2.4,.5];
// wrench bursts out of the square at the camera
function flyWrench(t,t0,o={}){const q=seg(t,t0,t0+.7);if(t<t0)return;const e=q*q;const x=lerp(SQ.x,o.x??640,e),y=lerp(SQ.y,o.y??860,e),s=lerp(.25,3.2,e);wrench(x,y,s,t*7);}
// cold open
function s1(t){const k=seg(t,0,E(0)),th=wi(0,'threw');vl(vcam(lerp(540,560,k),lerp(1040,1100,k),lerp(1.0,1.1,k)),1,()=>{shop(t);deadSq(SQ.x,SQ.y,SQ.s,t);
  me({x:190,y:1800,h:900,brow:t>th?'scared':'worried',mouth:t>th?'open':'o',look:{x:.9,y:-.2},armR:[.1,.1],armL:[.1,.1]});flyWrench(t,th+.25);});
  if(t>th+.8&&t<th+1)flash(.4,'#fff');}
function s2(t){const c=wi(1,'customer'),d=wi(1,'one',0),h=wi(1,'hair');
  if(t<c-.05){const k=seg(t,T(1),c);vl(vcam(540,lerp(1080,1040,k),lerp(1.05,1.12,k)),1,()=>{shop(t);bench(1400,t);lampHead(800,1040,t);me({x:400,y:1750,h:1050,brow:'flat',mouth:'smile',look:{x:.8,y:.6},armR:[1.1,1.2],armL:[1.1,1.2],held:(x,y)=>{fillRR(x-50,y-60,100,190,14,'#14161c');wall(x-42,y-52,84,174);}});bench(1560,t);});return;}
  if(t<d-.05){const k=seg(t,c,d);vl(vcam(540,lerp(960,900,k),lerp(1.0,1.3,k)),1,()=>{fillAll('#2b1f1a');bench(1500,t);phoneBig(540,960,1400,t,{dot:6+k*6});ctx.strokeStyle=DP.red;ctx.lineWidth=7;ctx.beginPath();ctx.arc(540-343+686*DOT[0],960-700+1400*DOT[1],60,0,7);ctx.stroke();});return;}
  const k=seg(t,d,E(1));subpix(k,t);label('ONE DEAD PIXEL',540,380,{font:'900 48px MS',h:84,bg:'rgba(224,54,42,.96)'});
  const a=ap(t,h-.5,.5);hair(-60,1560,1140,1330,a);if(a>0)label('ABOUT 0.06 MM',540,1530,{font:'900 44px MS',h:78,a,bg:'rgba(255,201,60,.95)',col:'#14110a'});}
// the note, Marty's photo
function s3(t){const k=seg(t,T(2),E(2)),b=wi(2,'old'),n=wi(2,'never');
  vl(vcam(lerp(540,520,k),lerp(960,1000,k),lerp(1.0,1.1,k)),1,()=>{fillAll('#2b1f1a');bench(1200,t);glow(540,1300,800,`rgba(${DP.lamp},1)`,.4);phoneBack(540,950,1.3,t);
    ctx.save();ctx.translate(540,1050);ctx.rotate(.05);fillRR(-260,-180,520,360,6,'#ffe9a8');fillRR(-260,-180,520,76,6,'#e0362a');T2('RULES',0,-142,48,'#fff',{w:900});for(let i=0;i<3;i++)line(-200,-50+i*70,200-(i*40),-50+i*70,12,'rgba(30,30,40,.7)');fillRR(-120,-210,240,50,4,'rgba(210,205,180,.8)');ctx.restore();
    const p=ap(t,b-.1,.5);if(p>0){ctx.save();ctx.globalAlpha=p;polaroid(760,480,lerp(1.3,1.25,p),.08,t);ctx.restore();}
    const m=ap(t,n-.1,.4);if(m>0)label('MISSING 2 YEARS',760,770,{font:'900 42px MS',h:76,a:m,bg:'rgba(224,54,42,.96)'});});}
function s4(t){const rv=[3,4,5].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(3),E(5));ticket(t,{reveal:rv,cy:lerp(780,750,k),s:lerp(.98,1.04,k)});}
// same spot on every screen
function s5(t){const lp=wi(6,'laptop'),tv=wi(6,'tv'),e=wi(6,'every');const R=ap(t,e-.1,.4);const k=seg(t,T(6),E(6));
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.05,k)),1,()=>{fillAll('#141821');glow(540,960,900,`rgba(${DP.lamp},1)`,.15);
    phoneBig(800,1400,560,t,{dot:10});const ph=ap(t,T(6),.3);
    const a=ap(t,lp-.2);if(a>0){ctx.save();ctx.globalAlpha=a;screenSet(70,1170,560,350,{dot:12,ring:R});fillRR(10,1530,680,30,10,'#3a3e4b');ctx.restore();}
    const b=ap(t,tv-.2);if(b>0){ctx.save();ctx.globalAlpha=b;screenSet(70,350,940,560,{dot:16,ring:R});ctx.restore();}
    if(R>0){ctx.strokeStyle=DP.red;ctx.lineWidth=9;ctx.beginPath();ctx.arc(800-137+274*DOT[0],1400-280+560*DOT[1],lerp(170,40,R),0,7);ctx.stroke();}});
  if(R>0&&R<1)flash(.12);}
function s6(t){const o=wi(7,'off'),st=wi(7,'stayed'),fl=wi(7,'floating');const k=seg(t,T(7),E(7));
  if(t<fl-.1){vl(vcam(540,960,lerp(1.0,1.2,seg(t,st,fl))),1,()=>{fillAll('#07080d');const off=t>o-.1;screenSet(70,500,940,560,{off,dot:18});if(!off){}else{glow(540+200,700,400,'rgba(255,60,50,1)',.07);}});if(Math.abs(t-o)<.1)flash(.5);return;}
  const q=ss(seg(t,fl-.1,fl+1.3));vl(vcam(540,lerp(960,1000,k),1.05),1,()=>{fillAll('#0b0d14');glow(300,1000,700,`rgba(${DP.lamp},1)`,.12);
    // the TV turned side-on, and the dot floating out in front of it
    poly([820,420,1030,340,1030,1460,820,1380],'#1a1d27');poly([820,420,840,412,840,1388,820,1380],'#3a3e4b');
    const dx=lerp(830,370,q),dy=lerp(860,860,q);ctx.setLineDash([22,18]);line(dx,dy,830,860,6,'rgba(255,90,70,.8)');ctx.setLineDash([]);
    deadSq(dx,dy,62,t);ctx.strokeStyle=DP.red;ctx.lineWidth=6;ctx.beginPath();ctx.arc(dx,dy,84,0,7);ctx.stroke();
    const g=ap(t,wi(7,'glass')-.2);if(g>0)label('NOTHING BEHIND IT',430,1120,{font:'900 44px MS',h:78,a:g,bg:'rgba(224,54,42,.96)'});
    me({x:120,y:1880,h:1000,brow:'scared',mouth:'o',look:{x:.9,y:-.3}});});}
// doubling, against the door
function night(t){const a=wi(8,'doubled'),b=wi(8,'door');return Math.round(lerp(1,16,ss(seg(t,a,b))));}
function sizeAt(n){return .06*Math.pow(2,n-1);}// mm
function sizeStr(n){const m=sizeAt(n);return m<1?m.toFixed(2)+' MM':m<10?m.toFixed(1)+' MM':m<1000?(m/10).toFixed(1)+' CM':(m/1000).toFixed(1)+' M';}
function s7(t){const n=night(t),cont=lerp(1,16,ss(seg(t,wi(8,'doubled'),wi(8,'door'))));const px=sizeAt(cont)/1964*940;const S=Math.max(5,px);const k=seg(t,T(8),E(8)),d=wi(8,'door');
  vl(vcam(600,lerp(1140,1160,k),lerp(1.0,1.0,k)),1,()=>{shop(t,{noOpen:true});deadSq(700,1640-S/2,S,t);me({x:170,y:1700,h:760,brow:n>12?'scared':'worried',mouth:n>12?'open':'o',look:{x:.9,y:-.1}});});
  ctx.save();ctx.translate(540,420);const sc=1+.08*Math.sin(cont*Math.PI);ctx.scale(sc,sc);fillRR(-400,-120,800,240,24,'rgba(6,8,16,.92)');T2('NIGHT '+n,0,-58,60,'#fff',{w:900});T2(sizeStr(n),0,44,104,n>=16?DP.red:DP.amber,{w:900});ctx.restore();
  if(t>d&&t<d+.12)flash(.25);}
// the finger
function s8(t){const p=wi(9,'pressed'),no=wi(9,'no'),w=wi(9,"wasn't");const k=seg(t,T(9),E(9)),e=ss(seg(t,p-.2,p+.25));const dz=lerp(1,1.12,k);
  vl(vcam(540,960,dz),1,()=>{ctx.fillStyle=DP.wall;ctx.fillRect(-300,-200,1680,2400);glow(200,1100,900,`rgba(${DP.lamp},1)`,.3);
    const tip=lerp(380,700,e)+(t>w?20:0);line(-160,1180,tip-320,1080,180,'#3f5f8a');ell(tip-260,1070,120,104,-.2,'#e9b896');for(const[a,b]of[[-50,70],[0,100],[50,105]])line(tip-280,1070+b-30,tip-120,1090+b-30,62,'#e0ad8a');line(tip-260,1010,tip+40,985,66,'#e9b896');ell(tip-260,1100,70,50,0,'#e9b896');
    deadSq(960,1000,880,t);
    if(e>.9){for(let i=0;i<14;i++){const q=Math.floor(t*12),s=26,x=520+Math.round(hash(i+q)*5)*s,y=930+Math.round(hash(i*2+q)*7)*s;ctx.fillStyle=['#ff3a44','#3cf07e','#3a7aff','#000'][i%4];ctx.fillRect(x,y,s,s);}}});
  const a=ap(t,no-.1);if(a>0)label('NO SURFACE',540,560,{font:'900 50px MS',h:88,a,bg:'rgba(224,54,42,.96)'});}
// the wrench goes in, ten seconds, it comes back
function s9(t){const th=wi(10,'threw'),tn=wi(10,'ten'),fl=wi(10,'flying');const k=seg(t,T(10),E(10)),sh=t>fl?shakeAt(t,6,.6):{x:0,y:0};
  vl(vcam(560+sh.x,lerp(1080,1140,k)+sh.y,lerp(1.0,1.06,k)),1,()=>{shop(t);deadSq(SQ.x,SQ.y,SQ.s,t);const up=t<th+.9;
    if(up){const q=seg(t,th,th+.8),x=lerp(180,SQ.x,q),y=lerp(1120,SQ.y-120*Math.sin(q*3.14),q);if(q<1)wrench(x,y,lerp(.8,.15,q),t*9);}
    me({x:180,y:1800,h:880,brow:t>fl?'scared':'worried',mouth:t>fl?'open':'flat',look:{x:.9,y:-.1},armR:t<th+.3?armThrow:[.2,.2],armL:[.1,.1]});flyWrench(t,fl+.05,{x:560,y:900});});
  const c=ap(t,tn-.2,.2)*(t<fl?1:0);if(c>0){const v=Math.ceil(lerp(10,0,seg(t,tn,fl)));T2(String(v),600,1040,220,DP.amber,{w:900,stroke:14,a:c});}
  if(t>fl+.55&&t<fl+.75)flash(.5);}
// Marty's phone lands
function s10(t){const c=wi(11,'came'),m=wi(11,"marty's"),o=wi(11,'one');const k=seg(t,T(11),E(11)),land=wi(11,'out');
  if(t<m-.05){vl(vcam(560,lerp(1160,1220,k),1.04),1,()=>{shop(t);deadSq(SQ.x,SQ.y,SQ.s,t);const q=ss(seg(t,c-.2,land+.3)),x=lerp(SQ.x,620,q),y=lerp(SQ.y,1690,q*q),s=lerp(.1,1,q);ctx.save();ctx.translate(x,y);ctx.rotate(q*6.28+.4);ctx.scale(s,s);fillRR(-60,-120,120,240,18,'#14161c');fillRR(-50,-110,100,220,10,'#5cd2ff');ctx.restore();
      me({x:190,y:1800,h:880,brow:'scared',mouth:'o',look:{x:.9,y:.8}});});if(Math.abs(t-land-.3)<.08)flash(.25);return;}
  const q=seg(t,m,E(11));vl(vcam(540,lerp(1000,960,q),lerp(1.0,1.15,q)),1,()=>{fillAll('#22242e');ctx.fillStyle=vgrad(0,1920,[[0,'#30333f'],[1,'#191b23']]);ctx.fillRect(-200,-200,1480,2400);glow(540,900,700,'rgba(92,200,255,1)',.35);
    ctx.save();ctx.translate(540,900);ctx.rotate(.09);phoneBig(0,0,1240,t,{chat:true});line(-180,-420,80,-120,5,'rgba(220,235,255,.6)');line(80,-120,20,60,5,'rgba(220,235,255,.6)');line(80,-120,240,-40,4,'rgba(220,235,255,.5)');T2('MARTY',0,-400,76,'#fff',{w:900});T2('LAST SEEN 2 YEARS AGO',0,-330,28,'#8fa0b5',{w:700});
    const b=ap(t,o-.1);if(b>0){fillRR(-240,-110,480,240,28,'rgba(255,255,255,'+(.95*b)+')');T2('1 NEW MESSAGE',0,-30,44,'#1b1d23',{w:900,a:b});for(let i=0;i<2;i++)fillRR(-180,20+i*44,i?240:360,20,8,'rgba(30,30,40,'+(.25*b)+')');}ctx.restore();});}
function s11(t){const a=wi(12,'broken',0),b=wi(12,'broken',1),c=wi(12,'three'),r=wi(12,'i',0);const st=[seg(t,a-.45,a+.2),seg(t,b-.45,b+.2),0];const ci=ap(t,c,.7);ticket(t,{reveal:[1,1,1],strike:st,circle:[0,0,ci],cy:lerp(760,720,seg(t,T(12),E(12))),s:.9});
  const q=ap(t,r-.05,.18);if(q>0){ctx.save();ctx.translate(540,740);ctx.rotate(-.18);ctx.scale(1.4-.4*q,1.4-.4*q);ctx.globalAlpha=q;ctx.strokeStyle=DP.red;ctx.lineWidth=14;rr(-300,-100,600,200,18);ctx.stroke();fillRR(-300,-100,600,200,18,'rgba(255,245,235,.92)');T2('I READ IT',0,6,96,DP.red,{w:900});ctx.restore();}}
// the message
function s12(t){const a=wi(13,'you',0),b=wi(13,'you',1),c=wi(13,'you',2),k=seg(t,T(13),E(13));
  vl(vcam(540,lerp(860,880,k),lerp(1.0,1.08,k)),1,()=>{fillAll('#101218');phoneBig(540,860,1500,t,{chat:true});T2('MARTY',540,300,64,'#fff',{w:900});
    const bub=(y,h,tt,col,txt)=>{const q=ap(t,tt-.1,.25);if(q<=0)return;ctx.save();ctx.globalAlpha=q;fillRR(240,y,600,h,34,col);txt.forEach((s,i)=>T2(s,540,y+56+i*66,50,col==='#ffc93c'?'#14110a':'#14161c',{w:800}));ctx.restore();};
    bub(420,180,a,'#e9edf4',['You never fix','a dead pixel.']);bub(630,110,b,'#e9edf4',['You know that.']);bub(770,300,c,'#ffc93c',['You replace','the whole','panel.']);});}
// the sky lifts
function s13(t){const l=wi(14,'lifted'),too=wi(14,'tool'),un=wi(14,'under');const k=ss(seg(t,l-.1,E(14)+.3)),tq=ss(seg(t,wi(14,'like')-.1,un+.4)),e=seg(t,T(14),E(14));const sh=shakeAt(t,lerp(0,5,k),.5);
  vl(vcam(540+sh.x,lerp(1020,960,e)+sh.y,lerp(1.05,1.0,e)),1,()=>{street(t);skyLift(t,k*.85,tq);});}
// the world goes cell by cell; the square stays
function s14(t){const k=seg(t,T(15),E(16)+1.5),e=seg(t,T(15),E(15));vl(vcam(540,lerp(1080,1100,e),1.05),1,()=>{shop(t);swapCells(lerp(.3,.75,k),1100,0);deadSq(SQ.x,1200,SQ.s,t);me({x:170,y:1800,h:880,brow:'scared',mouth:'flat',look:{x:.9,y:-.1}});});}
function s15(t){const k=seg(t,T(15),E(16)+1.5),e=seg(t,T(16),TL.total);vl(vcam(540,lerp(1100,1160,e),1.05),1,()=>{shop(t);swapCells(lerp(.75,1.02,seg(t,T(16),TL.total)),1100,0);deadSq(SQ.x,1300,SQ.s,t);me({x:170,y:1800,h:880,brow:'scared',mouth:'o',look:{x:.9,y:-.1}});});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15};
const FADES={};
const CAPY={s1:.86,s2:.86,s3:.87,s4:.87,s5:.5,s6:.82,s7:.34,s8:.8,s9:.2,s10:.86,s11:.87,s12:.87,s13:.5,s14:.86,s15:.22};
const END_AT=null;
const NIGHTS={};
function hud(t){const sc=sceneAt(t).id;const chips=[];const i=+sc.slice(1);const n=i===7?night(t):(i<=1||i>=8)?16:i<=4?1:2;
  chips.push({k:'NIGHT',v:String(n),hot:n>=16});chips.push({k:'SIZE',v:sizeStr(n),hot:n>=16});
  if(i>=9&&i<=12)chips.push({k:'RULES BROKEN',v:i===9?'1/3':i===10||i===11?'2/3':'3/3',hot:i===12});
  if(i>=13)chips.push({k:'RULES BROKEN',v:'3/3',hot:true});
  const tag={s1:'SCREEN REPAIR',s2:'TICKET Nº 0001',s3:"MARTY'S NOTE",s4:"MARTY'S RULES",s5:'SAME SPOT',s6:'SCREENS OFF',s7:'IT DOUBLES',s8:'RULE 1',s9:'RULE 2',s10:'IT CAME BACK',s11:'RULE 3',s12:'1 MESSAGE',s13:'THE SKY',s14:'THE WAY OUT',s15:'THE WAY OUT'}[sc];
  return{chips,tag,tagRed:i>=8||i===1};}
