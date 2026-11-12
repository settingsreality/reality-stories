// ===================== The Backup, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z0-9']/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
// cold open: the inner door open, light and mist, a pale barefoot figure in it; the log row in red
function s1(t){const k=ss(seg(t,0,E(0)+.4));vl(vcam(540,lerp(980,930,k),lerp(1.0,1.12,k)),1,()=>{tunnel(t,{doorOpen:1,mist:1,vy:860});
  ctx.save();ctx.globalCompositeOperation='lighter';glow(540,860,700,'rgba(220,240,255,1)',.25);ctx.restore();
  trail(9,.9,{vy:860});pale(540,1240,560,{a:.88});});
  fillRR(90,300,900,170,18,'rgba(5,7,12,.88)');ctx.strokeStyle=SV.red;ctx.lineWidth=5;rr(90,300,900,170,18);ctx.stroke();text('INNER DOOR · 03:14',540,360,'800 40px PM','#fff');
  const r=ss(seg(t,wi(0,'inside')-.1,wi(0,'inside')+.15));text('OPENED FROM INSIDE',540,430,'900 54px MS',SV.red,'center',.75+.25*Math.sin(t*8));if(r>0&&r<1)flash(.25*(1-r));}
// polar night, the entrance glowing on the slope; me with a torch
function s2(t){const k=seg(t,T(1)-.3,E(1)+.5);vl(vcam(lerp(520,560,k),lerp(1000,960,k),lerp(1.0,1.12,k)),1,()=>{polarSky(t);mountain({y:1150});entrance(600,1060,1.15,t);
  snow(t,4,90,{});me({x:280,y:1760,h:760,brow:'flat',mouth:'flat',look:{x:.9,y:-.6}});});
  if(t>wi(1,'february')-.1)label('LAST VISIT: FEBRUARY',540,430,{font:'800 40px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:70});}
// cross-section: tunnel into the mountain
function s3(t){fillAll('#081120');polarSky(t*.5);const d=ss(seg(t,T(2),wi(2,'meters')+.4));
  ctx.fillStyle=vgrad(500,1920,[[0,'#3a4a60'],[1,'#1c2636']]);ctx.beginPath();ctx.moveTo(-80,1500);ctx.lineTo(80,1100);ctx.lineTo(420,560);ctx.lineTo(760,700);ctx.lineTo(1160,980);ctx.lineTo(1160,2000);ctx.lineTo(-80,2000);ctx.fill();
  ctx.fillStyle='#e8f1fa';ctx.beginPath();ctx.moveTo(80,1100);ctx.lineTo(420,560);ctx.lineTo(760,700);ctx.lineTo(1160,980);ctx.lineTo(1160,1010);ctx.lineTo(760,735);ctx.lineTo(420,600);ctx.lineTo(100,1120);ctx.fill();
  // permafrost dots
  const R=rng(11);for(let i=0;i<80;i++)circ(R()*1080,900+R()*1000,3,'#9fd8ff',.18);
  entrance(170,1300,.45,t);const x1=lerp(240,880,d);fillRR(240,1250,x1-240,46,20,'#0b1018');
  if(d>.95){fillRR(820,1150,200,240,14,'#0b1018');ctx.save();ctx.globalCompositeOperation='lighter';glow(920,1270,260,'rgba(159,216,255,1)',.35);ctx.restore();}
  if(t>wi(2,'meters')-.2){line(240,1340,880,1340,5,SV.gold);line(240,1320,240,1360,5,SV.gold);line(880,1320,880,1360,5,SV.gold);label('120 M',560,1400,{font:'900 50px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:78});}
  if(t>wi(2,'million')-.2)label('1,000,000+ SAMPLES',540,470,{font:'900 50px MS',bg:'rgba(255,255,255,.95)',col:'#14110a',h:82});
  if(t>wi(2,'eighteen')-.2)thermo(540,680,-18,{w:420,h:200,fs:96});}
// watch room: monitors with the card taped under, me at the desk
function s4(t){const k=seg(t,T(3)-.2,E(3)+.4);vl(vcam(540,lerp(1000,940,k),lerp(1.0,1.12,k)),1,()=>{fillAll('#0b0f16');glow(540,700,700,'rgba(95,240,224,1)',.10);
  screenBox(110,330,400,280,()=>{tunnel(t*.3,{vx:200,vy:120});});screenBox(570,330,400,280,()=>{text('−18°C',200,160,'900 90px MS',SV.ice);});
  ctx.save();ctx.translate(540,800);ctx.rotate(.03);fillRR(-150,-90,300,180,6,'#f1ebdd');text('VAULT RULES',0,-50,'900 34px MS','#1b1d23');for(let i=0;i<3;i++)line(-110,-5+i*34,110-(i%2)*40,-5+i*34,6,'rgba(40,40,50,.55)');fillRR(-60,-104,120,28,3,'#d8ceb0');ctx.restore();
  fillRR(-80,1500,1240,500,0,'#1a1f28');me({x:540,y:1900,h:900,brow:'flat',mouth:'flat',look:{x:0,y:-1}});});}
function s5(t){const rv=[4,5,6].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));rulesCard(t,{reveal:rv,s:lerp(.98,1.03,seg(t,T(4),E(6)))});}
// the temperature climbing
function s6(t){const a=wi(7,'ten'),b=wi(7,'two');const v=t<a-.1?-18:t<b-.1?-10:-2;const hot=v>-18;fillAll('#07090f');glow(540,1000,800,hot?'rgba(255,70,50,1)':'rgba(120,200,255,1)',.16);
  thermo(540,560,v,{w:760,h:380,fs:200});
  // tube thermometer
  fillRR(470,880,140,620,70,'#1a2030');const f=(v+30)/34;fillRR(500,1470-560*f,80,560*f+10,40,hot?SV.red:SV.ice);circ(540,1500,90,hot?SV.red:SV.ice);
  for(const at of[a,b]){if(t>at-.1&&t<at+.15)flash(.3*(1-seg(t,at-.1,at+.15)));}}
// the tunnel: bare footprints coming out toward me
function s7(t){const k=seg(t,T(8),E(8)+.4);const fp=ss(seg(t,wi(8,'footprints')-.2,wi(8,'footprints')+.6));vl(vcam(540,lerp(980,1040,k),lerp(1.0,1.18,k)),1,()=>{tunnel(t,{doorOpen:.25,mist:.6});
  trail(14,fp);ctx.save();ctx.globalCompositeOperation='lighter';beam(540,1950,0,1100,420,.28,SV.lamp);ctx.restore();});
  if(t>wi(8,'bare')-.1)label('BARE FEET',540,470,{font:'900 50px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:80});}
// the vault hall, one crate open
function s8(t){const k=seg(t,T(9),E(9)+.4);vl(vcam(540,lerp(1000,1150,k),lerp(1.0,1.2,k)),1,()=>{vaultHall(t,{skip:(r,c)=>r>=3&&(c===1||c===2)});openCrate(540,1300,1.0,t);
  ctx.save();ctx.globalCompositeOperation='lighter';beam(150,1950,.35,1200,380,.22,SV.lamp);ctx.restore();});}
function s9(t){radio(t,{radio:1});}
// my feet: no boots
function s10(t){const at=wi(11,'boots');const rv=t>at-.15;const k=seg(t,T(11),E(11)+.4);vl(vcam(540,lerp(900,1100,k),lerp(1.0,1.15,k)),1,()=>{fillAll('#0d1726');
  ctx.fillStyle=vgrad(600,1920,[[0,'#1d3048'],[1,'#3a5878']]);ctx.fillRect(-80,600,1240,1400);const R=rng(5);for(let i=0;i<260;i++)circ(R()*1080,620+R()*1300,2+R()*3,'#eaf6ff',.25);
  // trail of prints leading to the feet
  for(let i=0;i<4;i++){const y=700+i*150,x=540+(i%2?60:-60);ctx.save();ctx.translate(x,y);ctx.scale(.9+i*.2,(.9+i*.2)*.45);ell(0,0,30,52,0,'#5a7e9e');ell(0,-6,20,36,0,'#45698a');for(let j=0;j<5;j++)circ(-20+j*10,62-Math.abs(j-1.5)*3,7-j*.7,'#45698a');ctx.restore();}
  if(rv)bareFeet(540,1500,1.1);else{for(const sx of[-1,1]){fillRR(540+sx*132-60,1000,120,470,50,'#1b2230');fillRR(540+sx*132-95,1420,190,130,40,'#14161b');}}});
  if(rv){label('NO BOOTS',540,470,{font:'900 56px MS',bg:SV.red,col:'#fff',h:88});if(t<at+.25)flash(.35*(1-seg(t,at-.15,at+.25)));}
  if(t>wi(11,'cold')-.1)thermo(820,700,-18,{k:'FLOOR',w:300,h:150,fs:70});}
// CCTV: me and Bjorn outside the outer door
function s11(t){const r=ss(seg(t,wi(12,'next')-.1,wi(12,'next')+.3));cctv(t,()=>{polarSky(t);ctx.fillStyle='#cfdbe8';ctx.fillRect(0,560,900,300);entrance(450,650,1.2,t,{doorLight:.6});
  bjorn({x:250,y:780,h:420,brow:'worried',mouth:'open',look:{x:.8,y:0},armR:[1.0,1.2],held:(x,y)=>{fillRR(x-14,y-60,28,70,6,'#1b1e26');}});me({x:680,y:780,h:410,brow:'flat',mouth:'flat',look:{x:-.3,y:0}});
  if(r>0){ctx.strokeStyle=SV.red;ctx.lineWidth=6;ctx.globalAlpha=r;rr(560,300,240,500,12);ctx.stroke();ctx.globalAlpha=1;}});
  if(r>0)label('YOU',770,1240,{font:'900 64px MS',bg:SV.red,col:'#fff',h:96,a:r});}
// looking down the tunnel at the outer door: my double, hand on the seal, door closing
function s12(t){const c=ss(seg(t,wi(13,'seal')-.2,E(13)+1.2));vl(vcam(540,lerp(960,900,seg(t,T(13),E(13))),lerp(1.0,1.25,seg(t,T(13),E(13)))),1,()=>{tunnel(t,{doorOpen:1-c*.6,mist:.4});
  ctx.save();ctx.globalCompositeOperation='lighter';glow(540,900,500,'rgba(255,240,210,1)',.25);ctx.restore();
  me({x:540,y:950,h:120,brow:'flat',mouth:'flat'});});
  sealButton(820,600,.8,c);}
// final: me, barefoot, in the tunnel, door narrowing behind
function s13(t){const f=.5+.5*Math.sin(t*11)>.2?1:.75;vl(vcam(540,1000,lerp(1.0,1.08,seg(t,T(14),E(14)))),1,()=>{tunnel(t,{doorOpen:.3*f,mist:.8});trail(8,.8);
  me({x:540,y:1880,h:1050,bare:true,brow:'scared',mouth:'o',look:{x:0,y:-.2}});});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.8,s2:.74,s3:.82,s4:.66,s5:.72,s6:.82,s7:.78,s8:.86,s9:.84,s10:.6,s11:.82,s12:.8,s13:.84};
const END_AT=null;
function temp(t){if(t<T(1))return-2;if(t<wi(7,'ten')-.1)return-18;if(t<wi(7,'two')-.1)return-10;return-2;}
function hud(t){const sc=sceneAt(t).id;const v=temp(t);const tm=t<T(1)?'3:16 AM':t<T(7)?'11:50 PM':t<T(8)?'3:14 AM':t<T(10)?'3:31 AM':'3:33 AM';
  const door=t<T(1)?'OPEN':t<T(7)?'SEALED':t<T(13)?'OPEN':'SEALING';
  const chips=[{k:'TIME',v:tm},{k:'VAULT',v:(v<0?'−':'')+Math.abs(v)+'°C',hot:v>-18},{k:'DOOR',v:door,hot:door!=='SEALED'}];
  const tag={s1:'DOOR LOG',s2:'SVALBARD',s3:'THE SEED VAULT',s4:'WATCH ROOM',s5:"BJORN'S RULES",s6:'VAULT TEMP',s7:'ACCESS TUNNEL',s8:'VAULT HALL 2',s9:'RADIO · CH 1',s10:'ACCESS TUNNEL',s11:'CAM 02',s12:'OUTER DOOR',s13:'ACCESS TUNNEL'}[sc];
  return{chips,tag,tagRed:t<T(1)||t>=T(7)};}
