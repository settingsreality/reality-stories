// ===================== 0.4 Miles, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const RING=[[150,880,16],[320,850,20],[780,860,18],[940,890,14],[560,800,26]];
function bigKm(s,sub,y,col,a=1){ctx.save();ctx.translate(540,y);ctx.globalAlpha=a;fillRR(-360,-130,720,260,26,'rgba(6,8,16,.92)');T2(sub,0,-82,40,'#cfd8ea',{w:800});T2(s,0,30,130,col,{w:900});ctx.restore();}
// cold open: phone in my hand over the dark marsh
function s1(t){const k=seg(t,0,E(0)),h=wi(0,'for');const hrs=t>h-.1;const dots=[];
  vl(vcam(540,lerp(980,1000,k),lerp(1.0,1.08,k)),1,()=>{marsh(t,{board:.75,wisps:[[300,860,14],[720,840,20],[900,880,12]]});
    phone(620,1230,1120,(w,h)=>mapS(w,h,t,{batt:5,line:1,dots:[[.5,.3,'',''],[.8,.5,'','']]}),{rot:.07,glow:.28});
    ctx.fillStyle='#e9b896';ell(860,1620,95,170,.3,'#e9b896');for(let i=0;i<4;i++)line(880,1450+i*62,760,1420+i*64,50,'#e9b896');line(1000,2000,890,1640,150,'#d98a2b');});
  if(hrs){const q=ap(t,h-.1);bigKm('3 HOURS','SAME NUMBER FOR',1730,PM.red,q);}}
function s2(t){const a=wi(1,'added'),m=wi(1,'marked'),s=wi(1,'shortcut'),k=seg(t,T(1),E(1));
  if(t<wi(1,'then')-.1){const q=seg(t,T(1),a);vl(vcam(540,lerp(1100,1060,q),lerp(1,1.08,q)),1,()=>{marsh(t,{dusk:true});me({x:540,y:1760,h:760,brow:'flat',mouth:'smile',look:{x:.3,y:-.3},armR:[.6,1.5]});});
    label('EASY LOOP: 4.0 MI',540,540,{font:'900 50px MS',h:88,bg:'rgba(255,201,60,.95)',col:'#14110a'});return;}
  const q=ss(seg(t,a-.1,m));vl(vcam(540,lerp(980,960,k),lerp(1,1.04,k)),1,()=>{marsh(t,{dusk:true});phone(540,1030,1400,(w,h)=>mapS(w,h,t,{batt:62,line:q,mx:.3,my:.63}),{glow:.2});});
  const b=ap(t,m-.1);if(b>0){ctx.save();ctx.translate(690,560);ctx.rotate(-.05);ctx.globalAlpha=b;fillRR(-210,-60,420,120,16,PM.blue);T2('SHORTCUT',0,4,62,'#fff',{w:900});ctx.restore();}}
function s3(t){const k=seg(t,T(2),E(2)),c=wi(2,'card');vl(vcam(540,lerp(1140,1100,k),lerp(1,1.1,k)),1,()=>{marsh(t,{dusk:true,board:.5});fillRR(120,860,60,800,10,'#5a4630');fillRR(880-900+60,640,700,250,10,'#3f6a3a');T2('MARSH LOOP',390,720,68,'#f2ecd0',{w:900});T2('CLOSES AT SUNSET',390,810,44,'#f2ecd0',{w:800});
    ranger({x:330,y:1860,h:900,mouth:'flat',brow:'worried',look:{x:.8,y:0},armR:[1.0,.5]});me({x:800,y:1860,h:900,mouth:'smile',brow:'flat',look:{x:-.8,y:0}});
    const q=ap(t,c-.2);if(q>0){ctx.save();ctx.translate(530,1320);ctx.rotate(-.1);ctx.globalAlpha=q;fillRR(-100,-64,200,128,8,'#efe6c6');fillRR(-100,-64,200,34,8,'#3f6a3a');for(let i=0;i<3;i++)line(-76,-8+i*24,70,-8+i*24,6,'#7a7460');ctx.restore();}});}
function s4(t){const rv=[3,4,5].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));card(t,{reveal:rv,cy:lerp(800,780,seg(t,T(3),E(5)))});}
function s5(t){const w=wi(6,'willothewisp'),l=wi(6,'little'),n=wi(6,'never'),k=seg(t,T(6),E(6));const wx=lerp(700,860,k),tx=lerp(200,500,k);
  vl(vcam(540,lerp(1120,1080,k),lerp(1.0,1.06,k)),1,()=>{bookBog(t,k);const a=ap(t,l-.2);if(t>n){poly([0,0,0,0],'#000');}traveler(tx,1560+(t>n?ss(seg(t,n,E(6)))*260:0),640);if(a>0){glow(wx,1160,340,`rgba(${PM.wisp},1)`,.7*a);circ(wx,1160+Math.sin(t*2)*16,20,'#f2fff9',a);}
    ctx.fillStyle='#2a1c10';ctx.fillRect(-300,1760,1680,500);});
  T2('WILL-O\'-THE-WISP',540,470,76,'#f4e6c0',{w:900,stroke:10});T2('CENTURIES OF BOG STORIES',540,560,38,'#e6d3a6',{w:800,stroke:7});}
function s6(t){const e=wi(7,'ended'),b=wi(7,'blue'),l=wi(7,'light'),k=seg(t,T(7),E(7));const L=lerp(.95,.42,ss(seg(t,e-.5,e+.3)));
  vl(vcam(540,lerp(1100,1030,k),lerp(1.0,1.08,k)),1,()=>{marsh(t,{board:L,wisps:t>l-.2?[[700,850,22,ap(t,l-.2,.6)]]:[]});
    if(t>b-.1&&t<l){}});
  const a=ap(t,e-.1);if(a>0)label('BOARDWALK ENDS',300,1050,{font:'900 44px MS',h:80,a,bg:'rgba(224,54,42,.96)'});
  const c=ap(t,b-.1);if(c>0&&t<l+.8)label('BLUE LINE KEEPS GOING',620,1200,{font:'900 40px MS',h:74,a:c,bg:PM.blue});
  const d=ap(t,l-.05);if(d>0){ctx.strokeStyle=`rgba(255,201,60,${d})`;ctx.lineWidth=7;ctx.beginPath();ctx.arc(700,850,lerp(170,90,d),0,7);ctx.stroke();}}
function s7(t){const s=wi(8,'stayed'),f=wi(8,'faster',0),g=wi(8,'faster',1),st=wi(8,'stopped'),i=wi(8,'it',2),k=seg(t,T(8),E(8));
  const walking=t<st;const off=walking?(t*150)%300:0;
  vl(vcam(540,1100,1.0),1,()=>{marsh(t,{board:false,hz:760,wisps:[[860,lerp(1010,1010,0),26]]});
    ctx.fillStyle='rgba(20,34,50,.0)';ctx.fillRect(0,0,0,0);
    me({x:210,y:1540,h:620,brow:'worried',mouth:'flat',look:{x:.9,y:-.1},bob:walking?Math.abs(Math.sin(t*7))*-18:0,step:walking?Math.sin(t*7)*1.2:0});
    // the ruler
    const by=1640;line(210,by,860,by,10,PM.amber);for(const x of[210,860])line(x,by-30,x,by+30,10,PM.amber);
    T2('0.4 MI',535,by-60,84,PM.amber,{w:900,stroke:10});});
  if(t>st){const a=ap(t,st,.2);T2('STOPPED',540,520,84,PM.red,{w:900,stroke:10,a});}if(t>i){const a=ap(t,i,.2);T2('IT STOPPED',540,620,70,'#fff',{w:900,stroke:9,a});}}
const D=[[.62,.26,'dan_trails','ACTIVE 2019'],[.8,.5,'lena.h','ACTIVE 2011'],[.3,.34,'w.ashby','ACTIVE 1931',1,1]];
function s8(t){const a=wi(9,'second'),b=wi(9,'third'),c=wi(9,'my'),k=seg(t,T(9),E(9));const w=[[700,850,22],[300,860,16,ap(t,a-.1,.4)],[900,870,14,ap(t,b-.1,.4)]];
  if(t<c-.3){vl(vcam(540,lerp(1040,1000,k),1.04),1,()=>{marsh(t,{board:.42,wisps:w});});return;}
  vl(vcam(540,1000,lerp(1.0,1.04,k)),1,()=>{marsh(t,{board:.42,wisps:w});phone(540,1040,1400,(w2,h)=>mapS(w2,h,t,{batt:11,line:1,dots:[[.62,.26,'','',ap(t,c-.2,.3)],[.8,.5,'','',ap(t,c,.3)],[.3,.34,'','',ap(t,c+.2,.3)]]}),{glow:.15});});}
function s9(t){const h=wi(9+1,'hikers'),y=wi(10,'2019'),x=wi(10,'2011'),o=wi(10,'one'),k=seg(t,T(10),E(10));
  vl(vcam(540,lerp(1040,1000,k),lerp(1.02,1.08,k)),1,()=>{fillAll('#101c2a');phone(540,1070,1420,(w,h2)=>{const d=D.map((q,i)=>[q[0],q[1],q[2],q[3],ap(t,[y,x,o][i]-.3,.3),q[5]]);mapS(w,h2,t,{batt:7,line:1,dots:d});},{glow:.2});});
  const a=ap(t,wi(10,'existed')-.3);if(a>0)label('APP LAUNCHED 2013',540,1420,{font:'900 50px MS',h:90,a,bg:'rgba(224,54,42,.96)'});}
function s10(t){const b=wi(11,'battery'),w=wi(11,'water'),k=seg(t,T(11),E(11));const wy=lerp(1700,1420,ss(seg(t,w-.2,w+.8)));
  vl(vcam(540,lerp(1180,1200,k),lerp(1.0,1.1,k)),1,()=>{fillAll('#10203a');ctx.fillStyle=vgrad(600,1500,[[0,'#172544'],[1,'#2c4a6a']]);ctx.fillRect(-300,300,1680,1400);
    // boots
    for(const s of[-1,1]){line(540+s*150,700,540+s*150,1500,150,'#2b3142');fillRR(540+s*150-92,1380,190,230,32,'#14161b');ell(540+s*150+(s>0?30:-30),1610,130,52,0,'#14161b');}
    ctx.fillStyle='rgba(50,110,150,.72)';ctx.fillRect(-300,wy,1680,1000);for(let i=0;i<10;i++){const y=wy+i*i*7;line(hash(i)*900,y,hash(i)*900+300,y,5,'rgba(220,240,255,.4)');}
    for(const s of[-1,1]){ctx.strokeStyle='rgba(235,245,255,.7)';ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(540+s*150,wy+8,120+Math.sin(t*3)*16,22,0,0,7);ctx.stroke();}});
  ctx.save();ctx.translate(540,420);fillRR(-300,-120,600,240,24,'rgba(6,8,16,.92)');T2('BATTERY',0,-72,40,'#cfd8ea',{w:800});T2('3%',0,30,130,PM.red,{w:900});ctx.restore();}
// the phone with nobody holding it
function s11(t){const c=wi(12,'closest'),p=wi(12,'phone'),n=wi(12,'nobody'),k=seg(t,T(12),E(12));const x=lerp(560,540,k),d=ss(seg(t,T(12),E(12)));
  vl(vcam(540,lerp(1000,1040,k),lerp(1.0,1.2,k)),1,()=>{marsh(t,{board:false,wisps:[[150,860,12],[900,850,14]]});const s=lerp(240,760,d),y=lerp(860,1080,d),b=Math.sin(t*2)*14;
    glow(x,y,s*1.6,`rgba(${PM.wisp},1)`,.55);phone(x,y+b,s,(w,h)=>{ctx.fillStyle='#bdf7dd';ctx.fillRect(0,0,w,h);if(d>.25){T2('0.4 MI',w/2,h*.4,h*.1,'#14362a',{w:900});T2('TRAILHEAD',w/2,h*.5,h*.05,'#14362a',{w:800});}},{glow:0});
    if(t>n-.2){const a=ap(t,n-.2,.4);ctx.strokeStyle=`rgba(255,77,61,${a})`;ctx.setLineDash([26,20]);ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(x,1280,200,430,0,0,7);ctx.stroke();ctx.setLineDash([]);}});
  const a=ap(t,n);if(a>0)label('NOBODY',540,1420,{font:'900 64px MS',h:110,a,bg:'rgba(224,54,42,.96)'});}
// the trail is made of lights
function chainPts(n){const P=[];for(let i=0;i<n;i++){const k=i/(n-1);P.push([lerp(120,900,k)+Math.sin(k*9)*210,lerp(1720,430,k)]);}return P;}
function s12(t){const k=seg(t,T(13),E(13)),i=wi(13,'every'),a=wi(13,'is');const q=ss(seg(t,T(13)+.4,a+.3));vl(vcam(540,960,lerp(1.0,1.05,k)),1,()=>{fillAll('#0d1a2c');ctx.fillStyle='#142a3a';ell(540,960,800,1100,0,'#142a3a');for(let n=0;n<60;n++){const R=hash(n);line(hash(n+.3)*1100,hash(n+.7)*1900,hash(n+.3)*1100+30,hash(n+.7)*1900-60,6,'#1f4040');}
    const P=chainPts(16),n=Math.ceil(lerp(4,16,q));for(let j=0;j<n;j++)wisp(P[j][0],P[j][1],16,t+j,{hz:-5000});ctx.setLineDash([]);if(q>.1){ctx.strokeStyle='rgba(57,168,255,.6)';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(P[0][0],P[0][1]);for(let j=1;j<n;j++)ctx.lineTo(P[j][0],P[j][1]);ctx.stroke();}
    me({x:P[0][0]+60,y:1840,h:220,brow:'scared',mouth:'o'});});
  const b=ap(t,a-.2);if(b>0)label('EVERY LIGHT IS A HIKER',540,380,{font:'900 50px MS',h:90,a:b,bg:'rgba(224,54,42,.96)'});}
function s13(t){const a=wi(14,'adds'),k=seg(t,T(14),E(14));vl(vcam(540,lerp(1020,980,k),1.02),1,()=>{fillAll('#0d1a2c');T2('TRAIL LENGTH',540,560,48,'#cfd8ea',{w:800});
    const n=Math.floor(lerp(2,9,ss(seg(t,T(14),E(14)))));for(let j=0;j<n;j++){const x=110+j*100;fillRR(x,720,86,300,8,j===n-1?PM.amber:PM.blue);T2('+0.4',x+43,870,30,j===n-1?'#14110a':'#fff',{w:900});wisp(x+43,660,12,t+j,{hz:-5000});}
    bigKm('0.4 MI','STILL TO GO',1240,'#fff');});}
function s14(t){const r=wi(15,'refreshed'),u=wi(15,'updated'),n=wi(15,'new'),b=wi(15,'me'),k=seg(t,T(15),E(15));
  vl(vcam(540,lerp(1020,960,k),lerp(1.0,1.06,k)),1,()=>{fillAll('#0d1426');phone(540,1070,1420,(w,h)=>{mapS(w,h,t,{batt:2,line:1,mx:.72,my:.34,dots:D.map(q=>[q[0],q[1],'','',1])});const a=ap(t,u-.1,.25);if(a>0){ctx.globalAlpha=a;fillRR(40,h*.42,w-80,h*.36,26,'#fff');T2('TRAIL UPDATED',w/2,h*.47,62,'#16202c',{w:900});T2('+0.4 MI',w/2,h*.55,88,PM.blue,{w:900});ctx.globalAlpha=1;}const c=ap(t,n-.1,.25);if(c>0){ctx.globalAlpha=c;T2('NEW WAYPOINT',w/2,h*.63,44,'#6a7686',{w:800});T2('ADDED BY:',w/2,h*.67,36,'#6a7686',{w:800});T2('YOU',w/2,h*.725,96,PM.red,{w:900});ctx.globalAlpha=1;}},{glow:.2});});if(t>b&&t<b+.09)flash(.35);}
function s15(t){const k=seg(t,T(16),TL.total);const a=[[120,870,16],[290,820,22],[800,830,24],[960,880,14],[540,780,30]];
  vl(vcam(540,lerp(1160,1190,k),lerp(1.0,1.06,k)),1,()=>{marsh(t,{board:false,wisps:a});beam(420,1500,.5,800,240,.5);
    me({x:420,y:1890,h:760,brow:'scared',mouth:'o',look:{x:.8,y:-.5},armR:[1.6,.4],held:(x,y)=>{phone(x+20,y-30,220,(w,h)=>{ctx.fillStyle='#1a0a0a';ctx.fillRect(0,0,w,h);T2('1%',w/2,h/2,80,PM.red,{w:900});},{glow:.3});}});});
}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15};
const FADES={};
const CAPY={s1:.18,s2:.87,s3:.14,s4:.9,s5:.86,s6:.87,s7:.86,s8:.14,s9:.9,s10:.87,s11:.86,s12:.87,s13:.87,s14:.9,s15:.22};
const END_AT=null;
const BAT={s1:5,s2:62,s3:64,s4:64,s5:31,s6:31,s7:18,s8:11,s9:7,s10:3,s11:3,s12:2,s13:2,s14:2,s15:1};
function hud(t){const sc=sceneAt(t).id;const i=+sc.slice(1);const b=BAT[sc];const chips=[{k:'TRAILHEAD',v:'0.4 MI',hot:i===1||i>=7},{k:'BATTERY',v:b+'%',hot:b<=5}];
  if(i===1||i>=8)chips.push({k:'WALKING',v:'3 HRS'});
  const tag={s1:'SAME NUMBER',s2:'MARSH LOOP',s3:'THE GATE',s4:"RANGER'S CARD",s5:'THE OLD STORY',s6:'MILE 4',s7:'0.4 AHEAD',s8:'ON MY MAP',s9:'LAST ACTIVE',s10:'3%',s11:'THE CLOSEST ONE',s12:'THE TRAIL',s13:'+0.4',s14:'TRAIL UPDATED',s15:'1%'}[sc];
  return{chips,tag,tagRed:i===1||i>=9};}
