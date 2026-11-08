// ===================== Four Kilos, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z']/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
// cold open: me on the red tile, skeleton looming, the readout
function s1(t){const k=ss(seg(t,0,E(0)+.4));vl(vcam(540,lerp(1000,940,k),lerp(1.0,1.09,k)),1,()=>{hall(t,{lit:[{i:0,j:0,c:FK.red,a:.8+.2*Math.sin(t*9)},{i:2.2,j:1,a:.95}]});skeleton(640,1000,.92);
  const g=floorPt(2.2,1);ghost(g[0],g[1],760,{a:.72,glint:1,tag:null});me({x:370,y:1800,h:960,brow:'scared',mouth:'o',look:{x:.5,y:1}});});readout(540,430,31,{k:'SECURITY · YOU',hot:true,w:440,h:190,fs:100});}
// the hall, alone with the dinosaurs
function s2(t){const k=seg(t,T(1)-.3,E(1)+.5);vl(vcam(lerp(500,560,k),lerp(1020,960,k),lerp(1.0,1.14,k)),1,()=>{hall(t);skeleton(660,1020,1.0);torch(420,1420,.32,950,300,.34);me({x:370,y:1720,h:880,brow:'flat',mouth:'flat',look:{x:.8,y:-.5},armR:[1.3,.2],held:(x,y,h)=>{fillRR(x-18,y-14,76,28,8,'#333');}});});}
function s3(t){const p=ss(seg(t,wi(2,'one')-.1,wi(2,'one')+.3));matDiagram(t,{press:p,kg:t>wi(2,'shows')-.1?81:'—',lab:1});}
function s4(t){const k=seg(t,T(3),E(3)+.4);vl(vcam(540,lerp(1050,970,k),lerp(1.02,1.14,k)),1,()=>{hall(t,{hz:900});skeleton(740,920,.7);dolores({x:540,y:1760,h:1200,brow:'worried',mouth:'flat',look:{x:.5,y:.3},armR:[1.1,.9],held:(hx,hy)=>{ctx.save();ctx.translate(hx+30,hy-40);ctx.rotate(-.12);fillRR(-80,-110,170,210,8,'#efe9db');for(let k=0;k<5;k++)line(-55,-60+k*34,60-(k%2)*35,-60+k*34,6,'rgba(40,40,50,.55)');text('RULES',5,-78,'900 26px MS','#1d1f25');ctx.restore();}});});}
function s5(t){const rv=[4,5,6].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));rulesCard(t,{reveal:rv,s:lerp(.98,1.03,seg(t,T(4),E(6)))});}
// the map: a step going case to case
function s6(t){const q=seg(t,T(7)+.4,E(7));const n=Math.floor(q*PATH.length*.999);const marks=[];for(let i=0;i<n;i++)marks.push({x:PATH[i][0],y:PATH[i][1],a:.35});const p=pathPt(q);floorMap(t,{marks:marks.concat([{x:p[0],y:p[1],t:'4 KG'}])});}
// the lit tile, empty, down the hall
function s7(t){const k=seg(t,T(8),E(8)+.5);const on=ss(seg(t,wi(8,'lit')-.15,wi(8,'lit')+.2));vl(vcam(540,lerp(1120,1040,k),lerp(1.05,1.3,k)),1,()=>{hall(t,{lit:[{i:0,j:1.5,a:on}]});skeleton(860,1000,.75);caseBox(210,1240,1.1);torch(540,1920,0,900,250,.4);});if(on>.5)label('NOBODY',540,1420,{font:'900 44px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:68,a:on});readout(540,430,4,{k:'THIS TILE',w:380,h:170,fs:88});}
// my boot on the tile: 9
function s8(t){const at=wi(9,'nine'),j=t>at-.05;vl(vcam(540,1040,lerp(1,1.1,seg(t,T(9),E(9)+.4))),1,()=>{hall(t,{by:1700,hz:700});const c=j?FK.red:FK.gold,rgb=j?'255,70,50':'255,201,60';poly([200,1340,880,1340,1010,1660,70,1660],c,.8);ctx.save();ctx.globalCompositeOperation='lighter';glow(540,1500,620,`rgba(${rgb},1)`,.4);ctx.restore();
  const y=1500;fillRR(350,y-620,300,460,50,'#3a4766');fillRR(300,y-200,420,200,70,'#2a3350');fillRR(270,y-30,480,60,24,'#141a2a');});
  readout(540,430,j?9:4,{k:'THIS TILE',hot:j,w:420,h:190,fs:100});if(j)flash(.4*(1-seg(t,at,at+.2)));}
// my own number
function s9(t){const at=wi(10,'seventy');const hot=t>at-.05;fillAll('#07090f');glow(540,1100,800,hot?'rgba(255,70,50,1)':'rgba(120,170,255,1)',.16);readout(540,520,hot?76:81,{k:'SECURITY · YOU',hot,w:700,h:320,fs:170});
  me({x:540,y:2380,h:1500,brow:hot?'scared':'worried',mouth:hot?'o':'flat',look:{x:0,y:-.8}});if(hot)flash(.35*(1-seg(t,at,at+.2)));}
// IT up, ME down, bars
function s10(t){const q=ss(seg(t,T(11),E(11)+.3));const it=Math.round(lerp(9,54,q)),m=Math.round(lerp(76,31,q));floorMap(t,{marks:[{x:640,y:1040,t:'YOU '+m,c:FK.red},{x:lerp(420,560,q),y:lerp(900,1000,q),t:'IT '+it}]});
  fillRR(90,1420,900,350,24,'#0a0f1b');text('IT',170,1520,'900 54px MS',FK.gold,'left',1);text(it+' KG',960,1520,'900 74px MS',FK.gold,'right');fillRR(170,1555,740,28,10,'#1a2236');fillRR(170,1555,740*it/85,28,10,FK.gold);
  text('YOU',170,1670,'900 54px MS',FK.red,'left',1);text(m+' KG',960,1670,'900 74px MS',FK.red,'right');fillRR(170,1705,740,28,10,'#1a2236');fillRR(170,1705,740*m/85,28,10,FK.red);}
function s11(t){radio(t,{radio:1});}
function s12(t){const c=ss(seg(t,wi(13,'three'),wi(13,'three')+.7));rulesCard(t,{reveal:[1,1,1],circle:[0,0,c],cy:520,s:.62});
  vl(vcam(540,960,1),1,()=>{fillRR(90,1090,900,460,20,'#0a1020');for(let i=0;i<14;i++){fillRR(120+i*58,1370,50,50,6,'#1b2a48');}door(960,1420,250);me({x:210,y:1430,h:300,brow:'scared',mouth:'o',look:{x:1,y:0}});});
  if(t>wi(13,'forty')-.1)label('40 TILES',560,1280,{font:'900 58px MS',bg:'#ff4d3d',col:'#fff',h:92});}
// the log
function s13(t){const at=wi(14,'dolores');fillAll('#07090f');fillRR(60,300,960,1220,22,'#0a0f1b');text('TILE LOG · 4 KG STEP',540,370,'900 40px MS',FK.gold);
  const rows=['02:00  DINOSAURS   4 KG','02:06  MINERALS    4 KG','02:13  ICE AGE     4 KG','02:21  HUMANS      4 KG','02:28  LOBBY       4 KG'];rows.forEach((r,i)=>text(r,110,470+i*72,'500 40px PM','rgba(190,255,220,.85)','left',ss(seg(t,T(14)+i*.2,T(14)+i*.2+.4))));
  const h=t>at-.1;fillRR(110,890,860,300,16,h?'#2a0d0b':'#111a2c');text('BADGE ON RECORD',540,950,'800 34px MS','rgba(255,255,255,.6)');
  if(h){text('DOLORES',540,1070,'900 130px MS',FK.gold);text('ID 0041 · NIGHT SECURITY',540,1150,'500 34px PM','#fff');flash(.4*(1-seg(t,at,at+.2)));}else text('SEARCHING…',540,1070,'500 56px PM','rgba(190,255,220,.6)');}
// she walked out; a 4kg shadow stayed
function s14(t){const q=seg(t,T(15),wi(15,'floor'));const g=ss(seg(t,wi(15,'four')-.1,wi(15,'four')+.3));cctv(t,()=>{ctx.fillStyle='#16233d';ctx.fillRect(0,0,900,820);ctx.fillStyle='#26385a';ctx.fillRect(0,600,900,220);for(let i=0;i<9;i++)line(i*100,600,i*130-130,820,3,'rgba(190,210,255,.14)');door(750,620,480);
  dolores({x:lerp(220,690,q),y:760,h:520,brow:'flat',mouth:'flat',look:{x:1,y:0},face:.6});if(g>0)ghost(250,760,420,{a:.5*g,glint:1,tag:'DOLORES'});},{cam:'CAM 01 · 4 YEARS AGO'});if(g>0)readout(540,1370,4,{k:'STILL ON THE FLOOR',hot:true,w:640,h:230,fs:140});}
function s15(t){const f=.5+.5*Math.sin(t*13)>.2?1:.7;vl(vcam(540,1040,lerp(1.0,1.1,seg(t,T(16),E(16)))),1,()=>{hall(t,{lit:[{i:0,j:0,c:FK.red,a:f},{i:2.6,j:1.2,a:.9}]});skeleton(620,1000,.9);const g=floorPt(2.6,1.2);ghost(g[0],g[1],400,{a:.75,glint:1,tag:null});me({x:470,y:2120,h:900,brow:'scared',mouth:'o',look:{x:.4,y:.2}});});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15};
const FADES={};
const CAPY={s1:.7,s2:.74,s3:.76,s4:.76,s5:.72,s6:.76,s7:.8,s8:.76,s9:.74,s10:.69,s11:.84,s12:.82,s13:.84,s14:.84,s15:.74};
const END_AT=null;
function kgs(t){if(t<T(1))return[54,31];if(t<wi(9,'nine'))return[4,81];if(t<wi(10,'seventy'))return[9,81];if(t<T(11))return[9,76];const q=seg(t,T(11),E(11)+.3);return[Math.round(lerp(9,54,q)),Math.round(lerp(76,31,q))];}
function hud(t){const sc=sceneAt(t).id;const[it,m]=kgs(t);const hot=m<81;const tm=t<T(1)?'3:04 AM':t<T(7)?'11:40 PM':t<T(8)?'2:00 AM':t<T(12)?'2:41 AM':'3:04 AM';
  const chips=[{k:'TIME',v:tm},{k:'YOU',v:m+' KG',hot}];if(t<T(1)||t>=T(7))chips.push({k:'IT',v:it+' KG',hot:it>4});
  const tag={s1:'GALLERY 3',s2:'NATURAL HISTORY',s3:'FLOOR ALARM',s4:"DOLORES' RULES",s5:"DOLORES' RULES",s6:'FLOOR MAP',s7:'GALLERY 3',s8:'GALLERY 3',s9:'FLOOR ALARM',s10:'FLOOR MAP',s11:'RADIO · CH 2',s12:"DOLORES' RULES",s13:'TILE LOG',s14:'CAM 01',s15:'GALLERY 3'}[sc];return{chips,tag,tagRed:hot};}
