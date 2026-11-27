// ===================== Sailing Stones, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const HY=1050; // horizon in the wide shots
// cold open: the truck on the dry lake, the big rock behind it slides closer on "moved"
function s1(t){const k=seg(t,0,E(0)+.4),mv=wi(0,'moved');const slide=ss(seg(t,mv-.1,mv+.7));const sh=t>mv&&t<mv+.6?shakeAt(t,6):{x:0,y:0};
  vl(vcam(500+sh.x,lerp(1180,1150,k)+sh.y,lerp(1.0,1.1,k)),1,()=>{sky(HY);mountains(HY,'#0a0e1a',2);playa(HY,{seed:4});
    const rx=lerp(150,250,slide);trail([[-300,1580,22],[rx-60,1572,26]],1);rock(rx,1580,1.35,{seed:7,glint:.0});
    truck(700,1600,1.0,{lights:true,tailGlow:1,inside:()=>me({x:-10,y:-150,h:150,brow:'scared',mouth:'o',look:{x:-1,y:0}})});});
  chip('NO ICE',540,320,{size:46,bg:'rgba(224,54,42,.96)'});const a=ap(t,mv);if(a>0)T2('+1 METER',250,1330,64,SS.red,{a,w:900,stroke:10});}
// the Racetrack: a dry lake full of rocks with trails
function s2(t){const k=seg(t,T(1),E(1)+.5),rs=wi(1,'rocks');
  vl(vcam(540,lerp(1100,1000,k),lerp(1.12,1.0,k)),1,()=>{sky(HY-80,{mx:860,my:420});mountains(HY-80,'#0a0e1a',5);
    playa(HY-80,{seed:9});const R=rng(33);
    for(let i=0;i<14;i++){const d=Math.pow(R(),1.3),y=HY-40+d*900,x=R()*1080,s=.12+d*.6,L=(80+R()*300)*(.3+d),ang=R()*.8-.4;const a=ap(t,T(1)+i*.25+.6,.6);
      trail([[x-Math.cos(ang)*L,y-Math.sin(ang)*L*.3,4+s*20],[x-40*s,y,4+s*22]],a);rock(x,y,s,{seed:i+2});}
    truck(840,1820,.45,{tailGlow:1});me({x:700,y:1830,h:150,brow:'flat',mouth:'flat',look:{x:-.6,y:0}});});
  chip('RACETRACK PLAYA',540,300,{size:40,a:ap(t,T(1)+1.2)});chip('DEATH VALLEY, CALIFORNIA',540,385,{size:30,a:ap(t,T(1)+1.6),bg:'rgba(12,16,28,.75)'});}
// the real explanation: thin ice + light wind, a few meters a minute
function s3(t){const k=seg(t,T(2),E(2)),ic=wi(2,'ice'),wd=wi(2,'wind'),mm=wi(2,'meters');const mvp=ss(seg(t,wd,E(2)+.5));
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{ctx.fillStyle=vgrad(0,1920,[[0,'#2b3d66'],[.55,'#d79a6b'],[1,'#e8c38a']]);ctx.fillRect(-300,-300,1680,2520);
    mountains(1000,'#3c2f3c',1);ctx.fillStyle='#8b7d66';ctx.fillRect(-300,1000,1680,1300);
    // cross-section: mud, a thin layer of water, a floating ice sheet
    fillRR(-100,1180,1280,700,0,'#6d5f4c');fillRR(-100,1150,1280,40,0,'rgba(120,170,210,.55)');
    const ia=ap(t,ic-.3);if(ia>0){ctx.save();ctx.globalAlpha=ia;fillRR(-100+mvp*160,1132,1300,24,6,'rgba(225,245,255,.85)');ctx.restore();}
    const rx=330+mvp*160;rock(rx,1180,1.0,{seed:3});trail([[140,1182,18],[rx-90,1182,20]],1);
    const wa=ap(t,wd-.2);for(let i=0;i<4;i++)arrow(-40+((t*240+i*260)%1100),900+i*50,80+((t*240+i*260)%1100),900+i*50,8,'#f4f1e8',wa*.8,22);});
  chip('THIN ICE',760,1080,{size:36,a:ap(t,ic-.2),bg:'rgba(225,245,255,.95)',col:'#14202c'});chip('LIGHT WIND',540,790,{size:36,a:ap(t,wd-.1)});
  popT('A FEW METERS',540,1520,84,SS.y,t,mm-.1);popT('A MINUTE',540,1620,70,'#f4f1e8',t,mm+.3);chip('REAL · FILMED IN 2013',540,300,{size:36,a:ap(t,T(2)+.2),bg:SS.y,col:'#14110a'});}
// Dot's rules, taped to the dash
function s4(t){if(t<T(4)-.05){const k=seg(t,T(3),E(3)+.4);vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.08,k)),1,()=>{fillAll('#07080b');
      fillRR(-100,1250,1280,800,40,'#16181f');glow(540,1300,700,'rgba(92,242,162,1)',.08);ctx.fillStyle='#0c0e14';ctx.fillRect(-100,-100,1280,1150);fillRR(80,120,920,800,40,'#121a2c');ctx.save();rr(80,120,920,800,40);ctx.clip();sky(900,{mx:760,my:300});playa(780,{lit:.6});rock(300,860,.35,{seed:4});ctx.restore();
      fillRR(-100,1100,1280,180,30,'#1b1e26');
      ctx.save();ctx.translate(540,1560);ctx.rotate(-.03);fillRR(-300,-260,600,520,10,'#f1ebdd');text('RULES',-240,-180,'900 64px MS','#1b1d23','left');for(let j=0;j<6;j++)line(-240,-90+j*60,lerp(-240,240,ap(t,T(3)+.5+j*.15)),-90+j*60,8,'rgba(30,30,40,.5)');ctx.restore();});return;}
  const rv=[4,5,6].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(4),E(6));rulesCard(t,{reveal:rv,cy:lerp(780,760,k),s:lerp(.98,1.03,k)});}
// the stone tracker: 162, then 163
function s5(t){const k=seg(t,T(7),E(7)),n3=wi(7,'163');const a=ap(t,n3-.2);
  vl(vcam(540,lerp(960,900,k),lerp(1.0,1.08,k)),1,()=>{tablet(t,{extra:a,time:t<wi(7,'two')?'5:12 PM':'2:04 AM'});});
  const n=t<n3?162:163;T2(String(n),540,1760,150,t<n3?'#f4f1e8':SS.red,{w:900,stroke:14});T2('STONES',540,1860,40,U2.dim,{w:900});}
const U2={dim:'rgba(233,237,245,.65)'};
// the new one by the old campsite: its trail starts at an empty sleeping bag
function s6(t){const k=seg(t,T(8),E(8)+.4),sb=wi(8,'empty');const tr=ss(seg(t,wi(8,'trail')-.2,sb+.6));
  vl(vcam(lerp(540,420,k),lerp(1250,1350,k),lerp(1.0,1.15,k)),1,()=>{sky(900,{moon:false});mountains(900,'#0a0e1a',7);playa(900,{seed:12,lit:.5});
    beam(1000,2100,-.55,1700,360,.28);fillRR(800,1180,26,60,4,'#3a3f48');fillRR(760,1120,110,70,10,'#4a3a2a');text('CAMP 4',815,1155,'900 24px MS','#e9e2cf');
    sleepingBag(330,1720,1.0);const rx=lerp(380,700,tr),ry=lerp(1640,1380,tr);trail([[380,1650,30],[rx,ry,26]],1);rock(rx,ry,.7,{seed:9,glint:ap(t,sb+.2)*.7});});
  chip('STONE #163',700,1180,{size:36,a:ap(t,T(8)+.6),bg:SS.red});}
// every trail turns to point at my truck
function s7(t){const k=seg(t,T(9),E(9)+.4),tn=wi(9,'turned'),tk=wi(9,'truck');
  vl(vcam(540,lerp(960,1100,k),lerp(1.0,1.12,k)),1,()=>{tablet(t,{extra:1,turn:ss(seg(t,tn-.2,tk)),time:'2:09 AM'});});
  const a=ap(t,tk-.1);if(a>0)chip('YOUR TRUCK',540,1700,{size:42,a,bg:SS.red});}
// the big one at my bumper
function s8(t){const k=seg(t,T(10),E(10)),sc=wi(10,'scraped'),bm=wi(10,'bumper'),rd=wi(10,'radio');const sh=t>sc&&t<sc+.7?shakeAt(t,10):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(1100,1060,k)+sh.y,lerp(1.0,1.1,k)),1,()=>{sky(820,{mx:200,my:240});mountains(820,'#0a0e1a',4);playa(820,{seed:15,lit:.6});
    truckRear(540,1180,1.05,{inside:()=>me({x:-60,y:-330,h:150,brow:'scared',mouth:'open',look:{x:0,y:1}})});
    const p=ss(seg(t,T(10),bm));const rx=lerp(330,470,p),ry=lerp(1480,1330,p);trail([[-200,2000,90],[rx-60,ry+20,70]],1);rock(rx,ry,1.25,{seed:7,glint:p*.8});glow(rx,ry-60,380,'rgba(255,60,40,1)',.22);});
  popT('2 METERS',540,330,110,SS.red,t,wi(10,'two')-.05);}
// Dot on the radio
function s9(t){const sw=wi(11,'sideways');vl(vcam(540,lerp(960,1000,seg(t,T(11),E(11))),lerp(1.0,1.06,seg(t,T(11),E(11)))),1,()=>meRadio(t,{radio:t<E(11)?1:.2,back:()=>rock(560,620,.5,{seed:7,glint:.7})}));
  popT('STEP SIDEWAYS',540,1320,86,SS.y,t,sw-.1);}
// I step out sideways: a groove, not a print; the trail runs back to the driver's seat
function s10(t){const g=wi(12,'groove'),bh=T(13),dz=wi(13,'dozed');const back=ss(seg(t,bh-.3,bh+1.6));const z=lerp(1.9,1.0,back);const cy=lerp(1640,1260,back),cx=lerp(470,560,back);
  vl(vcam(cx,cy,z),1,()=>{sky(900,{mx:880,my:250});mountains(900,'#0a0e1a',6);playa(900,{seed:18,lit:.7});
    truck(760,1500,.85,{tailGlow:.6});
    const st=ss(seg(t,T(12)+.4,E(12)));const mx=lerp(560,420,st);trail([[640,1470,40],[mx+10,1640,44]],ap(t,g-.6,.8));
    me({x:mx,y:1660,h:440,brow:t>dz?'scared':'worried',mouth:t>g?'o':'flat',look:{x:t>bh?.8:0,y:t>bh?-.2:1}});stoneLegs(mx,1660,440,t>dz?ap(t,dz,2)*.34:0);
    if(t>dz){glow(720,1380,200,'rgba(255,201,60,1)',.35*ap(t,dz));}});
  if(t<T(13))popT('GROOVE',540,560,110,SS.y,t,g-.1);const a=ap(t,dz-.1);if(a>0)chip('DRIVER\'S SEAT',820,560,{size:38,a,bg:SS.y,col:'#14110a'});}
// Dot arrives; she counts 164
function s11(t){const n=wi(14,'164');vl(vcam(540,lerp(1000,960,seg(t,T(14),E(14))),lerp(1.0,1.08,seg(t,T(14),E(14)))),1,()=>{sky(HY,{mx:200});mountains(HY,'#0a0e1a',3);playa(HY,{seed:21});
    farLights(560,HY+30,ap(t,T(14)-.3));const R=rng(40);for(let i=0;i<9;i++){const d=R(),y=HY+60+d*700,x=R()*1080;rock(x,y,.15+d*.5,{seed:i+20});}
    ctx.save();ctx.translate(840,1650);ctx.rotate(-.1);fillRR(-150,-120,300,240,24,'#1b1e26');fillRR(-125,-95,250,110,12,'#0e2a1c');waveform(0,-40,220,80,t,1,'#5cf2a2',11);ctx.restore();});
  popT('164',540,560,190,SS.red,t,n-.05);}
// they were making room: a ring of stones with one gap, and me standing in it
function s12(t){const k=seg(t,T(15),E(15)+.8),mr=wi(15,'making');
  vl(vcam(540,lerp(1100,1000,k),lerp(1.15,1.0,k)),1,()=>{fillAll('#2e2a24');playa(-200,{seed:25,lit:.55,vign:true});
    const N=12;for(let i=0;i<N;i++){if(i===3)continue;const a=i/N*6.283-Math.PI/2;const r=lerp(470,360,ap(t,mr-.4,1.2));const x=540+Math.cos(a)*r,y=1080+Math.sin(a)*r*.9;
      trail([[x+Math.cos(a)*300,y+Math.sin(a)*270,40],[x+Math.cos(a)*40,y+Math.sin(a)*36,54]],.6);rock(x,y,.55,{seed:i+30});}
    const ga=3/N*6.283-Math.PI/2,gx=540+Math.cos(ga)*400,gy=1080+Math.sin(ga)*360;glow(gx,gy,180,'rgba(255,201,60,1)',.4*ap(t,mr-.2));
    me({x:gx,y:gy+60,h:300,brow:'scared',mouth:'o',look:{x:-.6,y:.3}});stoneLegs(gx,gy+60,300,.5);});
  popT('MAKING ROOM',540,300,96,SS.y,t,mr-.05);}
// end: me, stone to the waist, Dot's headlights coming
function s13(t){const k=seg(t,T(16),TL.total);
  vl(vcam(540,lerp(1040,1000,k),lerp(1.0,1.06,k)),1,()=>{sky(900,{mx:840,my:230});mountains(900,'#0a0e1a',8);playa(900,{seed:30,lit:.6});farLights(220,940,1);
    rock(160,1500,.6,{seed:41});rock(930,1560,.7,{seed:42});
    me({x:540,y:2100,h:1100,brow:'worried',mouth:'frown',look:{x:-.5,y:-.2}});stoneLegs(540,2100,1100,lerp(.5,.62,k));});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.24,s2:.6,s3:.6,s4:.88,s5:.1,s6:.3,s7:.16,s8:.82,s9:.13,s10:.13,s11:.4,s12:.62,s13:.88};
const END_AT=null;
function clockAt(t){const m=Math.floor(lerp(124,140,clamp((t-T(7))/(TL.total-T(7)))));return Math.floor(m/60)+':'+String(m%60).padStart(2,'0')+' AM';}
function hud(t){const sc=sceneAt(t).id;const chips=[];
  chips.push({k:'TIME',v:t<T(1)?'2:11 AM':t<wi(7,'two')?'SUNDOWN':clockAt(t)});
  const n=t<T(7)?163:t<wi(7,'163')?162:t<wi(14,'164')?163:164;chips.push({k:'STONES',v:String(n),hot:t>=wi(7,'163')||t<T(1)});
  chips.push({k:'ICE',v:'NONE',hot:true});
  if(sc==='s8')chips.push({k:'BUMPER',v:'2 m',hot:true});
  const tag={s1:'RACETRACK PLAYA',s2:'DEATH VALLEY',s3:'REAL',s4:"DOT'S RULES",s5:'STONE TRACKER',s6:'CAMP 4',s7:'STONE TRACKER',s8:'BEHIND ME',s9:'RADIO · DOT',s10:'RULE 2',s11:'RADIO · DOT',s12:'164',s13:'SUNRISE IN 4 HOURS'}[sc];
  return{chips,tag,tagRed:sc==='s8'||sc==='s12'};}
