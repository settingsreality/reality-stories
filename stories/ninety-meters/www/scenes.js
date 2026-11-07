// ===================== 90 Meters, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const RED='rgba(224,54,42,.96)',YEL='rgba(255,201,60,.95)',DK='rgba(6,8,16,.9)';
function stamp(s,x,y,t,t0,o={}){const q=ap(t,t0,.16);if(q<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(o.rot??-.1);const k=1.5-.5*q;ctx.scale(k,k);ctx.globalAlpha=q;const w=o.w||620;fillRR(-w/2,-74,w,148,16,'rgba(255,246,236,.96)');ctx.strokeStyle=NM.red;ctx.lineWidth=12;rr(-w/2,-74,w,148,16);ctx.stroke();T2(s,0,6,o.size||80,NM.red,{w:900});ctx.restore();}
const fakeIn=(g)=>(x,y)=>fake({x,y,h:180,glint:g,harness:false,armL:[.1,.1],armR:[.1,.1]});
// cold open: the whole tower. Lift climbing with "Rosa" in it, Rosa on the radio at the bottom, me at the top
function s1(t){const k=seg(t,0,E(0)),p=wi(0,'partner'),b=wi(0,'bottom');const ly=lerp(yOf(52),yOf(66),ss(k));
  vl(vcam(540,lerp(1060,1000,k),lerp(.98,1.04,k)),1,()=>{shaft(t,{door:true});
    cage(CX,ly,{who:fakeIn(t>p?1:.5)});
    me({x:860,y:Y90,h:190,brow:'scared',mouth:'o',look:{x:-.6,y:1}});
    rosa({x:470,y:Y0,h:200,brow:'worried',mouth:'open',look:{x:.4,y:-1},armR:[2.6,.2]});beam(505,Y0-150,.25,900,140,.16,'255,247,214');
    radio(330,Y0-120,.55,t,ap(t,wi(0,'radio')-.1)*(t<E(0)+.4?1:0));});
  const cy=lerp(1060,1000,k),z=lerp(.98,1.04,k);const a=Math.max(t<1.2?1:0,ap(t,p-.1));if(a>0)label('ROSA?',540+(CX-540)*z,960+(ly-270-cy)*z,{font:'900 52px MS',h:92,a,bg:RED});
  const c=ap(t,b-.1);if(c>0)label('ROSA, ON THE RADIO',540,1720,{font:'900 46px MS',h:84,a:c,bg:YEL,col:'#14110a'});}
// outside: the wind farm, our tower, 90 m
function s2(t){const k=seg(t,T(1),E(1)),n=wi(1,'ninety');const H=1280;
  vl(vcam(540,lerp(1080,1000,k),lerp(1.0,1.06,k)),1,()=>{farm(t);turbine(560,1700,H,560,t*.25+1,t);
    me({x:500,y:1720,h:70,harness:false});rosa({x:600,y:1720,h:70,harness:false});
    const a=ap(t,n-.1,.6);if(a>0){ctx.save();ctx.globalAlpha=a;const y1=1700-H*a;line(900,1700,900,y1,6,NM.amber);line(870,1700,930,1700,6,NM.amber);line(870,y1,930,y1,6,NM.amber);ctx.restore();T2('90 M',960,1700-H/2,96,'#fff',{w:900,a,stroke:12});}});
  const a=ap(t,wi(1,'rosa')-.1);if(a>0)label('ME + ROSA',540,1810,{font:'900 44px MS',h:80,a,bg:YEL,col:'#14110a'});}
// the nacelle: as big as a bus; a 50 m blade
function s3(t){const k=seg(t,T(2),E(2)),bu=wi(2,'bus'),fi=wi(2,'fifty');
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.07,k)),1,()=>{nightSky(2000);const rot=-.25+t*.03;
    // tower top + nacelle, big
    poly([600,1940,780,1940,760,1000,620,1000],'#c9ced8');fillRR(380,780,620,240,60,'#dfe3ea');fillRR(380,960,620,60,20,'#b7bdc8');
    T2('NACELLE',690,880,56,'#3a4354',{w:900,a:ap(t,wi(2,'nacelle')-.1)});
    const hx=330,hy=900;for(let j=0;j<3;j++){const a=rot+j*Math.PI*2/3;ctx.save();ctx.translate(hx,hy);ctx.rotate(a);poly([-40,0,40,0,18,-1500,-6,-1500],'#e8ebf0');ctx.restore();}ell(hx,hy,90,110,0,'#e8ebf0');
    const b=ap(t,bu-.15,.5);if(b>0){ctx.save();ctx.globalAlpha=b;ctx.setLineDash([22,14]);ctx.strokeStyle=NM.amber;ctx.lineWidth=8;rr(390,800,600,200,30);ctx.stroke();ctx.setLineDash([]);
      for(const wx of[460,860])circ(wx,1000,34,NM.amber);for(let i=0;i<5;i++)fillRR(430+i*110,830,80,70,8,'rgba(255,201,60,.35)');ctx.restore();label('= 1 BUS',690,1110,{font:'900 50px MS',h:88,a:b,bg:YEL,col:'#14110a'});}
    const f=ap(t,fi-.1,.5);if(f>0){const a=rot;ctx.save();ctx.translate(hx,hy);ctx.rotate(a);ctx.globalAlpha=f;line(90,-120,90,-120-1380*f,6,NM.red);ctx.restore();T2('50 M',hx+300,hy-380,110,'#fff',{w:900,a:f,stroke:12});}});}
// the rules, taped by the hatch
function s4(t){const rv=[4,5,6].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(3),E(6));
  vl(vcam(540,lerp(980,950,k),lerp(1.0,1.04,k)),1,()=>{fillAll('#2a3242');for(let x=-400;x<1480;x+=120)line(x,-400,x,2400,4,'rgba(10,14,20,.35)');glow(540,700,900,`rgba(${NM.lamp},1)`,.3);
    rulesCard(540,900,{reveal:rv,circle:[ap(t,wi(4,'down')-.1,.6),ap(t,wi(5,'nobody')-.1,.6),ap(t,wi(6,'knock')-.1,.6)]});
    fillRR(140,1450,800,40,6,'#a8b1bd');T2('▼ FLOOR HATCH ▼',540,1530,40,'#d8dde4',{w:900});});}
// Rosa climbs down the ladder, 300 rungs
function s5(t){const k=seg(t,T(7),E(7)+.5),cl=wi(7,'climbed');const d=ss(seg(t,cl-.2,E(7)+.6));const ry=lerp(yOf(86),yOf(30),d);
  vl(vcam(540,lerp(700,ry-200,ss(k)),1.25),1,()=>{shaft(t);cage(CX,Y90+228,{lit:.5});
    me({x:860,y:Y90,h:190,brow:'flat',mouth:'flat',look:{x:-.8,y:1}});
    rosa({x:LX,y:ry,h:200,brow:'flat',mouth:'flat',look:{x:0,y:-1},armL:[2.9,.1],armR:[2.7,.2],step:Math.sin(t*6)});});
  const n=Math.round(300*clamp(seg(t,wi(7,'three')-1.2,E(7))));ctx.save();ctx.translate(540,1580);fillRR(-300,-90,600,180,22,DK);T2(`RUNG ${Math.max(1,n)}/300`,0,6,80,NM.amber,{w:900});ctx.restore();}
// 2:20: the lift drops to the bottom, empty
function s6(t){const k=seg(t,T(8),E(8)),dr=wi(8,'dropped'),em=wi(8,'empty');const f=ss(seg(t,dr-.1,dr+1.1));const ly=lerp(Y90+228,Y0,f*f);const sh=t>dr+1&&t<dr+1.5?shakeAt(t,10,1):{x:0,y:0};
  vl(vcam(540+sh.x,960+sh.y,lerp(.98,1.0,k)),1,()=>{shaft(t);cage(CX,ly,{lit:.8+.2*Math.sin(t*40)});me({x:860,y:Y90,h:190,brow:'scared',mouth:'o',look:{x:-.6,y:1}});
    if(f>0&&f<1){ctx.save();ctx.globalAlpha=.4;for(let i=1;i<5;i++)fillRR(CX-85,ly-220-i*60,170,24,6,'rgba(200,210,225,.25)');ctx.restore();}});
  ctx.save();ctx.translate(540,300);fillRR(-230,-80,460,160,22,DK);T2('2:20 AM',0,6,90,NM.amber,{w:900});ctx.restore();
  stamp('EMPTY',540,1500,t,em-.03,{w:520,size:96});}
// it comes back up: 10, 40, 70 m
function s7(t){const k=seg(t,T(9),E(9)),a10=wi(9,'ten'),a40=wi(9,'forty'),a70=wi(9,'seventy');
  const m=t<a10?lerp(0,10,ss(seg(t,T(9),a10))):t<a40?lerp(10,40,ss(seg(t,a10,a40))):t<a70?lerp(40,70,ss(seg(t,a40,a70))):lerp(70,74,seg(t,a70,E(9)+1));
  const ly=yOf(m);vl(vcam(540,lerp(ly-120,ly-160,k),1.3),1,()=>{shaft(t);cage(CX,ly,{who:fakeIn(.25+.5*seg(t,a40,a70))});});
  ctx.save();ctx.translate(540,1620);fillRR(-300,-100,600,200,24,DK);T2(`LIFT ${Math.round(m)} M`,0,6,104,t>a70?NM.red:NM.amber,{w:900});T2('▲',250,6,60,NM.red,{a:.5+.5*Math.sin(t*8)});ctx.restore();}
// the radio: Rosa at the bottom, not in the lift
function s8(t){const k=seg(t,T(10),E(10)),cr=wi(10,'crackled'),no=wi(10,"i'm",1);const on=t>cr?1:0;
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.06,k)),1,()=>{fillAll('#141a24');glow(540,800,800,'rgba(92,242,162,1)',.08*on);radio(470,1060,2.3,t,on);
    ctx.save();ctx.beginPath();ctx.arc(800,1470,250,0,7);ctx.clip();fillAll('#0e1420');glow(820,1480,260,'rgba(120,150,210,1)',.2);
      line(700,1180,700,1800,8,'#aab3bf');line(760,1180,760,1800,8,'#aab3bf');for(let y=1200;y<1800;y+=30)line(700,y,760,y,5,'#aab3bf');
      rosa({x:880,y:1700,h:300,brow:'scared',mouth:'open',look:{x:-.3,y:-1},armR:[2.8,.2],harness:true});beam(910,1500,-.1,600,120,.2,'255,247,214');ctx.restore();
    ctx.strokeStyle=NM.amber;ctx.lineWidth=8;ctx.beginPath();ctx.arc(800,1470,250,0,7);ctx.stroke();T2('BASE CAM',800,1195,30,NM.amber,{w:900});});
  const a=ap(t,no-.1);if(a>0)label("I'M NOT IN THE LIFT",540,1830,{font:'900 60px MS',h:104,a,bg:RED});}
// the knock: two, then one
function s9(t){const k=seg(t,T(11),E(11)),kn=wi(11,'knock'),two=wi(11,'two'),one=wi(11,'one');const ks=[two,two+.32,one];
  const hit=ks.find(x=>t>x&&t<x+.22);const sh=hit!=null?shakeAt(t,12,1):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(1000,1040,k)+sh.y,lerp(1.0,1.08,k)),1,()=>{const r=ks.map(x=>seg(t,x,x+.7)).find(q=>q>0&&q<1);hatchTop(t,{crack:.6,ring:r});});
  ks.forEach((x,i)=>{const a=ap(t,x-.03,.12);if(a>0)T2('KNOCK',[330,750,540][i],[1580,1580,1760][i],84,'#fff',{w:900,a,stroke:12});});
  const a=ap(t,kn-.1);if(a>0)label('OUR KNOCK',540,380,{font:'900 56px MS',h:96,a,bg:YEL,col:'#14110a'});}
// "Let me in, it's freezing": frost creeps in, a hard hat under the gap
function s10(t){const k=seg(t,T(12),E(12)),fr=wi(12,'freezing'),le=wi(12,'let');
  vl(vcam(540,lerp(1000,1100,k),lerp(1.05,1.18,k)),1,()=>{hatchTop(t,{crack:.5,frost:ss(seg(t,T(12),E(12)+.6)),eyes:ap(t,wi(12,'voice')-.2,.8)});});
  const a=ap(t,le-.1);if(a>0)label('LET ME IN',540,300,{font:'900 64px MS',h:110,a,bg:RED});
  const b=ap(t,fr-.1);if(b>0)label('IT’S FREEZING',540,430,{font:'900 48px MS',h:86,a:b,bg:'rgba(120,180,230,.95)',col:'#08121e'});}
// the second safety line, tight, into the dark behind me
function s11(t){const k=seg(t,T(13),E(13)),cl=wi(13,'clipped'),se=wi(13,'second'),ti=wi(13,'tight'),dk=wi(13,'dark');const pan=ss(seg(t,ti-.3,dk+.4));
  vl(vcam(lerp(380,640,pan),960,lerp(1.15,1.05,pan)),1,()=>{nacelleIn(t,{eyes:ap(t,dk+.15,.8),ex:1010,eh:600,body:.22});
    me({x:250,y:1180,h:620,brow:t>se?'scared':'flat',mouth:t>se?'o':'flat',look:{x:.9,y:-.2}});
    lanyard(450,430,250,1180-.45*620,false);const sl=ap(t,se-.15,.6);if(sl>0){ctx.save();ctx.globalAlpha=sl;lanyard(470,430,lerp(560,1010,sl),lerp(520,1180-.45*600,sl),t>ti-.1,'#ffcf3a');ctx.restore();}});
  const a=ap(t,cl-.1);if(a>0&&t<se+.2)label('MY LINE',540,320,{font:'900 50px MS',h:88,a,bg:'rgba(224,90,43,.96)'});
  const b=ap(t,se-.1);if(b>0)label('A SECOND LINE',540,320,{font:'900 56px MS',h:96,a:b,bg:YEL,col:'#14110a'});}
// the count: two up, two down, so who is the third?
function s12(t){const k=seg(t,T(14),E(14)),bo=wi(14,'both'),cl=wi(14,'climb');
  vl(vcam(540,lerp(1000,980,k),lerp(.97,1.02,k)),1,()=>{shaft(t,{door:true});cage(CX,yOf(86),{who:fakeIn(1)});
    me({x:860,y:Y90,h:190,brow:'scared',mouth:'o',look:{x:.8,y:0}});const q=ap(t,cl-.3,.8);fake({x:250,y:Y90,h:200,glint:1,blank:true});ctx.save();ctx.globalAlpha=1-q;ctx.fillStyle='#2e3748';fillRR(140,Y90-250,260,250,16,'#3a4457');ctx.restore();
    rosa({x:470,y:Y0,h:200,brow:'scared',mouth:'o',look:{x:.4,y:-1},armR:[2.6,.2]});});
  const a=ap(t,bo-.1);if(a>0){label('ROSA?',CX,190,{font:'900 46px MS',h:80,a,bg:RED});label('ROSA',470,1530,{font:'900 46px MS',h:80,a,bg:YEL,col:'#14110a'});}
  stamp('WHO CLIMBED UP WITH ME?',540,1220,t,cl-.03,{w:960,size:62});}
// last line: hatch knocking, the radio glowing, something behind me
function s13(t){const k=seg(t,T(15),TL.total),kn=Math.floor((t-T(15))/.75);const hit=fract((t-T(15))/.75)<.12&&kn<3;const sh=hit?shakeAt(t,8,1):{x:0,y:0};
  vl(vcam(500+sh.x,lerp(900,940,k)+sh.y,lerp(1.1,1.16,k)),1,()=>{nacelleIn(t,{eyes:1,ex:900,eh:640,body:.5});me({x:300,y:1180,h:640,brow:'scared',mouth:'o',look:{x:-.4,y:.8},armR:[2.0,.6],harness:true});
    radio(420,780,.7,t,1);if(hit)glow(150,1185,260,'rgba(255,255,255,1)',.35);});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.44,s2:.36,s3:.74,s4:.86,s5:.18,s6:.6,s7:.2,s8:.17,s9:.3,s10:.82,s11:.72,s12:.52,s13:.52};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const i=+sc.slice(1);const chips=[];
  chips.push({k:'TIME',v:i===1?'2:24 AM':i<5?'1:40 AM':i===5?'2:00 AM':i===6?'2:20 AM':'2:2'+Math.min(9,i-4)+' AM',hot:i===1||i>=6});
  const lift=i===1?'66 M':i===6?'FALLING':i===7?'RISING':i>=8?'86 M':'90 M';chips.push({k:'LIFT',v:lift,hot:i===1||i>=6});
  chips.push({k:'UP',v:i>=12?'3?':i===1||i>=9?'2?':i>=5?'1':'2',hot:i===1||i>=9});
  const tag={s1:'90 METERS UP',s2:'WIND FARM',s3:'THE NACELLE',s4:'RULES',s5:'THE LADDER',s6:'RULE 2',s7:'RISING',s8:'THE RADIO',s9:'RULE 3',s10:'THE HATCH',s11:'SAFETY LINE',s12:'RULE 1',s13:'KNOCK OR RADIO'}[sc];
  return{chips,tag,tagRed:i===1||i>=6};}
