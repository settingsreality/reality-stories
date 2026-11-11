// ===================== 8 Minutes, 20 Seconds, scene by scene (v2 vertical explainer) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
// story clock: seconds since the Sun vanished (only for c1..c6)
function since(t){const sc=sceneAt(t).id;
  if(sc==='c1')return lerp(0,4,seg(t,0,E(0)));
  if(sc==='c3')return lerp(120,330,seg(t,T(2),E(2)));
  if(sc==='c4')return lerp(330,470,seg(t,T(3),E(4)));
  if(sc==='c6'){const b=wi(7,'black');return t<b?lerp(470,500,seg(t,T(7),b)):500+(t-b)*3;}
  return null;}
// cold open: the Sun is already gone, but its last light is still on the way to Earth
function c1(t){const k=seg(t,0,E(0)),m=wi(0,'8');const SX=540,SY=420,EY=1560;
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.06,k)),1,()=>{space(t);
    const rb=150+t*55;lightBand(SX,SY,rb,1400,Math.PI*.4,Math.PI*.6,.42);
    sun(SX,SY,150,t,{gone:1});chip('GONE',SX,SY,{size:44,bg:'rgba(224,54,42,.96)'});
    earth(540,EY,120,{spin:.2+t*.01});me2({x:540,y:EY-118,h:120,brow:'flat',mouth:'smile',look:{x:0,y:-1}});
    arrow(860,620,860,1380,10,U.y,.7,34);T2('STILL ON ITS WAY',860,1430,30,U.y,{w:900,stroke:8});});
  const left=Math.max(0,500-since(t));T2(mmss(left),540,1000,190,U.y,{w:900,stroke:14});T2('UNTIL YOU KNOW',540,1120,44,U.ink,{w:900,stroke:10});}
// 150 million km: the trip takes 8 minutes 20 seconds
function c2(t){const k=seg(t,T(1),E(1)),d=wi(1,'150');const p=ss(seg(t,T(1)+.3,E(1)-.2));
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{space(t);sun(540,330,130,t);earth(540,1500,110,{spin:t*.01});
    ctx.setLineDash([14,12]);line(260,480,260,1390,5,'rgba(233,237,245,.5)');ctx.setLineDash([]);line(230,480,290,480,5,U.dim);line(230,1390,290,1390,5,U.dim);
    const py=lerp(480,1390,p);glow(540,py,70,'rgba(255,220,120,1)',.8);circ(540,py,16,'#fff6c8');for(let i=1;i<6;i++)circ(540,py-i*26,16-i*2.4,'#ffd166',.6-i*.1);
    const a=ap(t,d-.1);if(a>0){ctx.save();ctx.translate(260,935);ctx.rotate(-Math.PI/2);T2('150,000,000 km',0,-34,50,U.y,{w:900,a,stroke:8});ctx.restore();}});
  clockDial(820,930,120,p*500/600);T2(mmss(p*500),820,1100,64,U.y,{w:900,stroke:10});}
// 8 minutes of nothing changing: warm, plants growing, in light from a star that's gone
function c3(t){const k=seg(t,T(2),E(2)),wm=wi(2,'warm'),pl=wi(2,'plants'),gn=wi(2,'gone');
  vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.05,k)),1,()=>{ctx.fillStyle=vgrad(0,1500,[[0,'#3a6fb5'],[.7,'#f2b26a'],[1,'#f7d58e']]);ctx.fillRect(-300,-300,1680,1900);
    sun(820,330,100,t);if(t>gn-.15){const a=ap(t,gn-.15);ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=U.red;ctx.lineWidth=8;ctx.setLineDash([20,14]);ctx.beginPath();ctx.arc(820,330,130,0,7);ctx.stroke();ctx.setLineDash([]);ctx.restore();chip('ACTUALLY GONE',820,500,{size:40,a,bg:'rgba(224,54,42,.96)'});}
    ctx.fillStyle='#4c8a3e';ctx.fillRect(-300,1450,1680,800);ctx.fillStyle='#3d7533';for(let i=0;i<14;i++)ell(hash(i)*1080,1470+hash(i+3)*300,120,30,0,'#437f37');
    const gr=ss(seg(t,pl,pl+2.5));for(let i=0;i<5;i++)plant(140+i*200+(i>1?60:0)*(i===2?1:0),1560+(i%2)*60,1+gr*.5+(i%2)*.2,0);
    beam(820,330,Math.PI+.62,1500,380,.18,'255,226,150');
    me2({x:420,y:1560,h:520,brow:'flat',mouth:'smile',look:{x:.8,y:-.8},armL:[.3,.2],armR:[2.4,.6]});
    if(t>wm-.1)glow(420,1300,260,'rgba(255,190,90,1)',.25*ap(t,wm-.1));});}
// gravity also moves at the speed of light: Earth keeps circling an empty spot
const OX=540,OY=920,OR=360;
function orbitBase(t,o={}){space(t,{stars:true});ctx.strokeStyle='rgba(91,140,255,.45)';ctx.lineWidth=4;ctx.setLineDash([12,12]);ctx.beginPath();ctx.arc(OX,OY,OR,0,7);ctx.stroke();ctx.setLineDash([]);}
const eAng=t=>-Math.PI*.15+t*.09;
function c4(t){const k=seg(t,T(3),E(4)),ins=wi(3,'instantly'),no=wi(4,'no'),sp=wi(4,'speed'),em=wi(4,'empty');const ex=OX+Math.cos(eAng(t))*OR,ey=OY+Math.sin(eAng(t))*OR;
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{orbitBase(t);sun(OX,OY,90,t,{gone:1});
    if(t<no){const a=ap(t,ins-.4),an=eAng(t)+Math.PI/2;arrow(ex,ey,ex+Math.cos(an)*360,ey+Math.sin(an)*360,10,U.red,a,34);T2('?',ex+Math.cos(an)*420,ey+Math.sin(an)*420,110,U.red,{w:900,a,stroke:10});}
    else{const r=lerp(100,OR+60,seg(t,no,E(4)));lightBand(OX,OY,r-70,r,0,6.283,.45);ripple(OX,OY,r,.9);}
    earth(ex,ey,64,{spin:t*.02});});
  popT('GRAVITY',540,250,96,U.B,t,sp-.4);popT('= SPEED OF LIGHT',540,370,72,U.y,t,sp);
  const a=ap(t,em-.1);if(a>0)chip('AN EMPTY SPOT',540,OY,{size:40,a,bg:U.y,col:'#14110a'});}
// 2017: two neutron stars, 130 million light-years; the race arrives 1.7 seconds apart
function c5(t){const k=seg(t,T(5),E(6)),col=wi(5,'collided'),ly=wi(5,'130'),yr=wi(5,'2017'),rc=wi(6,'raced'),ap17=wi(6,'1.7');
  if(t<T(6)-.05){vl(vcam(540,lerp(960,940,k),lerp(1.0,1.05,k)),1,()=>{space(t,{c0:'#07050f',c1:'#170c2a'});
      const q=clamp((col-t)/4),r=Math.max(0,q)*240+(t<col?10:0),a=t*(3+(1-q)*9);
      if(t<col){nstar(540+Math.cos(a)*r,720+Math.sin(a)*r*.45,40);nstar(540-Math.cos(a)*r,720-Math.sin(a)*r*.45,40);for(let i=1;i<5;i++)ripple(540,720,((t*240+i*110)%460),.35);}
      else{const b=t-col;glow(540,720,200+b*120,'rgba(255,230,160,1)',Math.max(.15,.9-b*.25));circ(540,720,40+b*6,'#fff8e0');ripple(540,720,120+b*260,Math.max(0,1-b*.3));}});
    popT('2 DEAD STARS',540,280,84,U.ink,t,T(5)+.4);chip('130 MILLION LIGHT-YEARS',540,1300,{size:46,a:ap(t,ly-.1),bg:U.y,col:'#14110a'});popT('2017',540,1470,130,U.y,t,yr-.1);return;}
  vl(vcam(540,lerp(960,960,k),1),1,()=>{space(t);const p=ss(seg(t,rc-.3,ap17-.4));
    for(const [x,lab,c] of[[340,'GRAVITY RIPPLE',U.B],[740,'LIGHT',U.y]]){fillRR(x-70,300,140,1250,70,'rgba(255,255,255,.05)');T2(lab,x,250,36,c,{w:900});}
    line(250,1500,830,1500,6,U.dim);T2('EARTH',540,1555,40,U.ink,{w:900});
    const y1=lerp(380,1470,p),y2=lerp(380,1470,clamp(p*.985));ripple(340,y1,58,1);circ(340,y1,22,'#bcd0ff');glow(740,y2,90,'rgba(255,220,120,1)',.8);circ(740,y2,24,'#fff6c8');});
  popT('1.7 SECONDS',540,1700,110,U.y,t,ap17-.1);chip('AFTER 130 MILLION YEARS',540,1830,{size:36,a:ap(t,ap17+.3)});}
// minute 8:20: the sky goes black and the Earth flies off in a straight line
function c6(t){const k=seg(t,T(7),E(7)),b=wi(7,'black'),fl=wi(7,'flies'),s30=wi(7,'30');
  vl(vcam(540,lerp(960,960,k),lerp(1.0,.92,k)),1,()=>{orbitBase(t);sun(OX,OY,90,t,{gone:1});
    const a0=eAng(b);const ex0=OX+Math.cos(a0)*OR,ey0=OY+Math.sin(a0)*OR;let ex,ey;
    if(t<fl){const a=eAng(Math.min(t,fl));ex=OX+Math.cos(a)*OR;ey=OY+Math.sin(a)*OR;}else{const a=eAng(fl);const an=a+Math.PI/2;const d=(t-fl)*120;ex=OX+Math.cos(a)*OR+Math.cos(an)*d;ey=OY+Math.sin(a)*OR+Math.sin(an)*d;
      ctx.setLineDash([10,10]);line(OX+Math.cos(a)*OR,OY+Math.sin(a)*OR,ex,ey,5,'rgba(255,201,60,.7)');ctx.setLineDash([]);}
    if(t<b){const r=lerp(OR-140,OR+20,seg(t,T(7),b));lightBand(OX,OY,r-70,r,0,6.283,.45);ripple(OX,OY,r,.9);}
    earth(ex,ey,64,{spin:t*.02});if(t<b)glow(ex,ey,140,'rgba(255,220,140,1)',.35);});
  if(t>b)blackout(.35*ap(t,b,.15));popT('SKY: BLACK',540,430,96,U.ink,t,b-.05);popT('30 km/s',540,1640,150,U.y,t,s30-.1);chip('STRAIGHT LINE',540,1790,{size:42,a:ap(t,fl)});}
// planets still lit: Jupiter > 1 hour, Saturn > 2 hours
function night(t){ctx.fillStyle=vgrad(0,1920,[[0,'#020308'],[1,'#070a14']]);ctx.fillRect(-300,-300,1680,2520);for(let i=0;i<120;i++)circ(hash(i*1.7)*1080,hash(i*3.3)*1500,1+hash(i*9.1)*2,'#dfe8ff',.3+.4*hash(i*5.5));
  ctx.fillStyle='#03040a';ctx.beginPath();ctx.moveTo(-300,1560);for(let x=-300;x<=1380;x+=60)ctx.lineTo(x,1520+Math.sin(x*.013)*40+Math.sin(x*.041)*14);ctx.lineTo(1380,2300);ctx.lineTo(-300,2300);ctx.closePath();ctx.fill();}
function c7(t){const k=seg(t,T(8),E(9)),js=wi(8,'still'),hr=wi(8,'hour'),sa=wi(9,'saturn'),two=wi(9,'two'),nl=wi(9,'exists');const dim=t>nl?1-.6*ap(t,nl,.8):1;
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.05,k)),1,()=>{night(t);
    planet(280,820,60,'#d9a877',dim);if(t>sa-.3)planet(800,620,44,'#e3c98f',dim*ap(t,sa-.3),{ring:true});
    me2({x:540,y:1700,h:300,brow:'worried',mouth:'o',look:{x:-.3,y:-1}});});
  chip('JUPITER',280,925,{size:38,a:ap(t,js-.3)});chip('SATURN',800,740,{size:38,a:ap(t,sa-.2)});
  popT('+1 HOUR',280,1015,80,U.y,t,hr-.2);popT('+2 HOURS',800,830,80,U.y,t,two-.1);
  // little diagram: the light goes Sun -> Jupiter -> Earth, a longer trip
  const a=ap(t,wi(8,'longer')-.2);if(a>0){ctx.save();ctx.globalAlpha=a;fillRR(110,230,860,260,28,'rgba(12,16,28,.92)');sun(220,360,40,t,{gone:1});circ(560,300,12,'#d9a877');circ(880,400,14,'#5b8cff');
    arrow(260,350,545,305,6,U.y,1,18);arrow(570,310,862,395,6,U.y,1,18);T2('SUN',220,440,26,U.dim,{w:800});T2('JUPITER',560,260,26,U.dim,{w:800});T2('EARTH',880,450,26,U.dim,{w:800});ctx.restore();}}
// one week: around freezing; one year: colder than the South Pole in winter
function c8(t){const k=seg(t,T(10),E(10)),fz=wi(10,'freezing'),yr=wi(10,'year'),sp=wi(10,'south');const ice=t<yr?.35*ap(t,fz-.3,1.2):.35+.5*ap(t,yr,2);
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.05,k)),1,()=>{space(t);earth(540,760,300,{spin:.3});ctx.save();ctx.globalAlpha=ice;circ(540,760,301,'#e8f2ff',ice);ctx.restore();
    for(let i=0;i<10;i++){const a=hash(i)*6.28,r=Math.sqrt(hash(i+2))*280;if(ice>.3)line(540+Math.cos(a)*r,760+Math.sin(a)*r,540+Math.cos(a+.3)*(r+40),760+Math.sin(a+.3)*(r+40),3,'rgba(150,190,230,'+ice+')');}});
  const tC=t<yr?lerp(15,0,ap(t,fz-.3,1)):lerp(0,-73,ap(t,yr,2.5));thermo(170,1560,380,(tC+80)/100,tC>0?U.or:'#7fc4ff');
  T2(Math.round(tC)+'°C',600,1260,120,tC>0?U.or:'#9fd2ff',{w:900,stroke:12});T2(t<yr?'1 WEEK':'1 YEAR',600,1400,64,U.ink,{w:900,stroke:10});
  chip('SOUTH POLE WINTER ≈ −60°C',600,1560,{size:38,a:ap(t,sp-.1),bg:U.y,col:'#14110a'});}
// under the ice, Earth's own heat keeps water liquid; life holds on down there
function c9(t){const k=seg(t,T(11),E(11)),lq=wi(11,'liquid'),dn=wi(11,'down');
  vl(vcam(540,lerp(980,1040,k),lerp(1.0,1.06,k)),1,()=>{ctx.fillStyle='#03050a';ctx.fillRect(-300,-300,1680,2520);
    ctx.fillStyle='#dfeaf5';ctx.fillRect(-300,300,1680,170);for(let i=0;i<12;i++)line(hash(i)*1080,300,hash(i)*1080+40,470,3,'rgba(120,150,190,.6)');
    ctx.fillStyle=vgrad(470,1700,[[0,'#0c2b4a'],[1,'#071a2c']]);ctx.fillRect(-300,470,1680,1240);
    ctx.fillStyle='#2a1c18';ctx.beginPath();ctx.moveTo(-300,1720);for(let x=-300;x<=1380;x+=60)ctx.lineTo(x,1700+Math.sin(x*.02)*30);ctx.lineTo(1380,2300);ctx.lineTo(-300,2300);ctx.fillStyle='#2a1c18';ctx.fill();
    const v=ap(t,lq-.6,1);glow(540,1700,320,'rgba(255,120,40,1)',.25+.5*v);fillRR(500,1560,80,160,14,'#3a2620');for(let i=0;i<6;i++){const y=1540-((t*90+i*80)%380);circ(540+Math.sin(t*2+i)*20,y,12+i,'rgba(255,170,90,'+(.35*v)+')');}
    if(t>dn-.6){const a=ap(t,dn-.6);ctx.save();ctx.globalAlpha=a;fish(380+Math.sin(t*.8)*60,1480,1,1);fish(720-Math.sin(t*.7)*60,1400,.8,-1,'#ffb36b');for(let i=0;i<5;i++){line(420+i*30,1720,420+i*30,1630-i*8,10,'#e8e2d8');circ(420+i*30,1625-i*8,10,'#e0483c');}ctx.restore();}});
  chip('FROZEN OCEAN',540,385,{size:40,col:'#14110a',bg:'rgba(240,246,255,.95)'});chip("EARTH'S OWN HEAT",540,1830,{size:42,a:ap(t,lq-.6),bg:'rgba(224,110,42,.96)'});popT('LIQUID',540,900,140,'#7fd0ff',t,lq-.1);}
// the twist: the Sun you see is already 8 minutes old
function c10(t){const k=seg(t,T(12),TL.total),old=wi(12,'old'),gn=wi(13,'gone');const g=t>gn?.55*ap(t,gn-.1,1.2):0;
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.06,k)),1,()=>{ctx.fillStyle=vgrad(0,1500,[[0,'#2f5f9f'],[.75,'#e7a865'],[1,'#f2cf86']]);ctx.fillRect(-300,-300,1680,1900);
    sun(540,470,140,t);if(g>0){ctx.save();ctx.globalAlpha=g;ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=6;ctx.setLineDash([18,14]);ctx.beginPath();ctx.arc(540,470,175,0,7);ctx.stroke();ctx.setLineDash([]);ctx.restore();}
    ctx.fillStyle='#4c8a3e';ctx.fillRect(-300,1450,1680,800);beam(540,470,Math.PI,1400,420,.16,'255,226,150');
    me2({x:540,y:1620,h:520,brow:t>gn?'worried':'flat',mouth:t>gn?'o':'smile',look:{x:0,y:-1}});});
  const a=ap(t,old-.2);if(a>0){T2('THIS LIGHT IS',540,690,44,U.ink,{w:900,stroke:10,a});}popT('8 MIN OLD',540,780,96,U.y,t,old-.1);}
const SCENES={c1,c2,c3,c4,c5,c6,c7,c8,c9,c10};
const FADES={};
const CAPY={c1:.66,c2:.6,c3:.45,c4:.75,c5:.6,c6:.13,c7:.62,c8:.13,c9:.6,c10:.5};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const s=since(t);const chips=[];
  if(sc==='c1'){chips.push({k:'SUN',v:'GONE',hot:true});chips.push({k:'YOU KNOW IN',v:mmss(500-s)});}
  else if(sc==='c2')chips.push({k:'SUN → EARTH',v:'8 MIN 20 S'});
  else if(sc==='c3'||sc==='c4'){chips.push({k:'SUN GONE FOR',v:mmss(s),hot:true});chips.push({k:'SKY',v:'BRIGHT'});}
  else if(sc==='c5'){chips.push({k:'EVENT',v:'GW170817'});chips.push({k:'GAP',v:'1.7 s'});}
  else if(sc==='c6'){const b=t>=wi(7,'black');chips.push({k:'SUN GONE FOR',v:mmss(Math.min(s,500)),hot:true});chips.push({k:'SKY',v:b?'BLACK':'BRIGHT',hot:b});}
  else if(sc==='c7'){chips.push({k:'SKY',v:'BLACK',hot:true});chips.push({k:'PLANETS',v:'STILL LIT'});}
  else if(sc==='c8'){const y=t>=wi(10,'year');chips.push({k:'TIME',v:y?'1 YEAR':'1 WEEK'});chips.push({k:'SURFACE',v:y?'< −60°C':'≈ 0°C',hot:y});}
  else if(sc==='c9'){chips.push({k:'TIME',v:'YEARS'});chips.push({k:'DEEP OCEAN',v:'LIQUID'});}
  else chips.push({k:'SUNLIGHT AGE',v:'8 MIN 20 S'});
  const tag={c1:'REAL PHYSICS',c2:'THE TRIP',c3:'MINUTES 2 TO 6',c4:'WHAT ABOUT GRAVITY?',c5:'HOW WE KNOW',c6:'8:20',c7:'THE WEIRD PART',c8:'THE COLD',c9:'DOWN THERE',c10:'THE TWIST'}[sc];
  return{chips,tag,tagRed:sc==='c6'};}
