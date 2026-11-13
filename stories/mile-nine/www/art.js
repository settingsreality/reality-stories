// ===================== Mile Nine: places and things (v2, 1080x1920) =====================
const MN={red:'#ff4d3d',gold:'#ffc93c',orange:'#f0683f',green:'#5cf2a2',lamp:'255,226,170',night:'#0b1220',skin:'#e9b896',flannel:'#a8352b'};
// me: orange beanie, grey hoodie
function me(o){toon(Object.assign({jacket:'#4a5566',pants:'#1b2230',hat:'beanie',hatCol:MN.orange,skin:MN.skin,browCol:'#4a2e1f',stripe:false,tag:null},o));}
// Dad: cap, beard, red flannel
function dad(o){toon(Object.assign({jacket:MN.flannel,pants:'#2a3140',hat:'cap',hatCol:'#2f4a35',skin:'#e2a985',beard:'#8a6a4a',browCol:'#6a4a32',stripe:false,tag:null},o));}
// the thing at the door: Dad's flannel and cap, no face
function wearer(x,y,h,o={}){ctx.save();ctx.globalAlpha=o.a??1;toon(Object.assign({x,y,h,jacket:o.col||'#5a2420',pants:'#151922',hat:'cap',hatCol:'#1a2a1e',blank:true,glint:o.glint??1,tag:null,stripe:false,glove:'#2a1a18'},o));ctx.restore();}

// ---------- the beacon: rugged orange satellite messenger ----------
function beacon(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.rot||0);
  const on=o.on??1,bl=on*(Math.sin(t*9)>0?1:.25);
  if(on){ctx.save();ctx.globalCompositeOperation='lighter';glow(0,-40,520,'rgba(255,70,50,1)',.30*bl);ctx.restore();}
  fillRR(-46,-330,92,90,30,'#1b1d22');// stub antenna
  fillRR(-170,-260,340,520,60,'#e8662c');fillRR(-150,-240,300,480,48,'#1d2026');
  // screen
  fillRR(-120,-210,240,170,14,o.scr||'#0d1a14');ctx.save();rr(-120,-210,240,170,14);ctx.clip();ctx.translate(-120,-210);if(o.screen)o.screen();ctx.restore();
  // buttons
  for(let i=0;i<3;i++)fillRR(-110+i*80,-10,60,40,10,'#363a44');
  // SOS cap
  fillRR(-70,70,140,120,24,'#3a3e48');text('SOS',0,140,'900 52px MS',on?MN.red:'#c94a3a');
  circ(110,-225,14,on?(bl>.5?MN.red:'#5a0f0b'):'#3a3e48');
  ctx.restore();}
function beaconScreenSOS(t){fillAll('#2a0805');text('SOS',120,82,'900 70px MS','#ff6a55');text('SENT',120,140,'800 36px PM','#ffd0c8');}

// ---------- kitchen at night, drawer open ----------
function kitchen(t,o={}){fillAll('#0c1119');ctx.fillStyle=vgrad(0,1920,[[0,'#0e1520'],[.55,'#141c28'],[1,'#0a0e15']]);ctx.fillRect(-200,-200,1480,2400);
  // window with moonlight
  fillRR(150,240,360,420,10,'#1f2a3a');fillRR(170,260,320,380,6,'#0d1830');circ(390,350,40,'#dfe8f5',.8);line(330,260,330,640,10,'#1f2a3a');line(170,450,490,450,10,'#1f2a3a');
  ctx.save();ctx.globalCompositeOperation='lighter';beam(330,450,2.6,1300,280,.06,'200,220,255');ctx.restore();
  // upper cabinets
  for(let i=0;i<2;i++)fillRR(600+i*230,220,210,380,10,'#232c3a');
  // counter + lower cabinets
  fillRR(-60,1060,1200,50,6,'#3a4352');for(let i=0;i<5;i++){fillRR(-40+i*240,1110,220,560,8,'#1d2532');fillRR(30+i*240,1150,80,14,7,'#566173');}
  fillAll2('#0a0d13',1670);
  // the open drawer (middle) with red light
  const dx=o.drawer??1;fillRR(330,1140,420,150+80*dx,10,'#2a3342');poly([330,1140,750,1140,800,1080,280,1080],'#151b25');
  if(o.beacon!==false)beacon(o.bx??540,o.by??1150,o.bs??.42,t,{on:o.on??1,rot:-.12,screen:()=>beaconScreenSOS(t)});
  if(o.on??1){ctx.save();ctx.globalCompositeOperation='lighter';glow(540,1050,700,'rgba(255,60,40,1)',.18*(Math.sin(t*9)>0?1:.4));ctx.restore();}}
function fillAll2(c,y){ctx.fillStyle=c;ctx.fillRect(-200,y,1480,2400);}

// ---------- night ridge with a tent ----------
function ridge(t,o={}){ctx.fillStyle=vgrad(-100,1500,[[0,'#060b18'],[.6,'#101c33'],[1,'#1d2c44']]);ctx.fillRect(-200,-200,1480,2400);
  const R=rng(9);for(let i=0;i<160;i++){circ(R()*1200-60,R()*1000-60,R()*2.2+.6,'#fff',.25+.5*R()*(.6+.4*Math.sin(t*2+i)));}
  circ(820,300,70,'#e9eef7',.95);glow(820,300,300,'rgba(220,230,255,1)',.18);
  poly([-200,1100,100,820,300,900,560,700,780,860,1000,760,1300,980,1300,2200,-200,2200],'#16233a');
  poly([-200,1300,160,1080,420,1180,700,1040,960,1160,1300,1060,1300,2200,-200,2200],'#1c2b44');
  // pines
  for(let i=0;i<14;i++){const x=-60+i*90+hash(i)*40,y=1230+hash(i+3)*80,h=120+hash(i+7)*90;poly([x,y-h,x-h*.28,y,x+h*.28,y],'#0c1626');}
  ctx.fillStyle=vgrad(1250,1920,[[0,'#20304a'],[1,'#121b2b']]);ctx.fillRect(-200,1250,1480,900);
  if(o.tent!==false)tent(o.tx??540,o.ty??1500,o.ts??1,t,o);}
function tent(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const lit=o.lit??1;if(lit){ctx.save();ctx.globalCompositeOperation='lighter';glow(0,-120,520,'rgba(255,200,120,1)',.32*lit);ctx.restore();}
  poly([-300,0,0,-300,300,0],lit?'#d98a3a':'#7a4a24');poly([0,-300,300,0,360,-20,60,-310],lit?'#a8622a':'#5a3418');
  poly([-90,0,0,-200,90,0],lit?'#ffcf7a':'#2a1a10');line(0,-300,0,-340,8,'#555');
  // flap open, empty inside
  line(-300,0,-400,30,4,'rgba(200,200,200,.4)');line(300,0,420,26,4,'rgba(200,200,200,.4)');
  ctx.restore();}

// ---------- phone ----------
function phone(x,y,s,fn,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.rot||0);
  ctx.save();ctx.globalCompositeOperation='lighter';glow(0,0,700,'rgba(140,190,255,1)',.12);ctx.restore();
  fillRR(-330,-640,660,1280,80,'#101216');fillRR(-305,-615,610,1230,62,'#0d1118');fillRR(-70,-598,140,30,15,'#050608');
  ctx.save();rr(-305,-615,610,1230,62);ctx.clip();ctx.translate(-305,-615);fn();ctx.restore();ctx.restore();}
// a chat bubble inside the phone (screen coords, 610 wide)
function bubble(y,lines,o={}){const mine=o.mine,w=o.w??500,h=40+lines.length*56;const x=mine?610-30-w:30;
  fillRR(x,y,w,h,30,mine?'#2f7cf6':(o.bg||'#262b36'));lines.forEach((s,i)=>text(s,x+28,y+56+i*56,o.font||'700 40px MS',o.col||'#fff','left'));return y+h+24;}
function chatHeader(title,sub){fillRR(0,0,610,200,0,'#151a24');text(title,305,128,'900 40px MS','#fff');text(sub,305,170,'600 26px MS','rgba(255,255,255,.55)');}

// ---------- topo map ----------
function topo(t,o={}){fillAll('#e9e2cc');ctx.fillStyle='#e9e2cc';
  for(let k=0;k<22;k++){ctx.strokeStyle=k%5===0?'rgba(150,100,60,.55)':'rgba(150,100,60,.28)';ctx.lineWidth=k%5===0?4:2;ctx.beginPath();
    for(let a=0;a<=64;a++){const th=a/64*6.283,r=60+k*42+Math.sin(th*3+k*.4)*24+Math.sin(th*5+1)*12;const x=360+Math.cos(th)*r*1.15,y=620+Math.sin(th)*r*.9;a?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
  // forest patches
  ctx.fillStyle='rgba(120,160,90,.25)';for(let i=0;i<8;i++){ell(100+hash(i)*900,1100+hash(i+9)*700,120,70,hash(i+2),'rgba(120,160,90,.25)');}
  // highway
  ctx.strokeStyle='#d26b2a';ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(-50,1250);ctx.bezierCurveTo(300,1180,600,1500,1150,1450);ctx.stroke();
  ctx.strokeStyle='#f6d36b';ctx.lineWidth=5;ctx.stroke();
  // trail
  ctx.setLineDash([18,14]);ctx.strokeStyle='#a3261b';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(150,1240);ctx.bezierCurveTo(180,1000,260,900,330,780);ctx.bezierCurveTo(380,690,420,650,400,600);ctx.stroke();ctx.setLineDash([]);
  if(o.title!==false)text('HOLLOW RIDGE',380,330,'900 46px MS','#5a3a20');
  // town / house
  if(o.house!==false){const hx=o.hx??900,hy=o.hy??1640;poly([hx-50,hy,hx,hy-50,hx+50,hy],'#1b2230');fillRR(hx-38,hy,76,60,4,'#1b2230');fillRR(hx-10,hy+24,20,36,3,MN.gold);text('HOME',hx,hy+110,'900 40px MS','#1b2230');}}
// a map pin
function pin(x,y,s,col,lab){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.save();ctx.globalCompositeOperation='multiply';ell(0,6,30,10,0,'rgba(0,0,0,.35)');ctx.restore();
  ctx.beginPath();ctx.moveTo(0,0);ctx.bezierCurveTo(-60,-70,-60,-140,0,-140);ctx.bezierCurveTo(60,-140,60,-70,0,0);ctx.fillStyle=col;ctx.fill();circ(0,-95,20,'#fff');ctx.restore();
  if(lab)label(lab,x,y-s*190,{font:'900 44px MS',bg:col,col:'#fff',h:72});}
// the dotted track from mile nine to home; k = 0..1 progress
const TRACK=[[400,600],[350,720],[300,840],[240,960],[200,1080],[170,1200],[260,1250],[400,1300],[540,1390],[680,1450],[800,1500],[880,1580],[900,1640]];
function trackPt(k){const n=TRACK.length-1,f=clamp(k)*n,i=Math.min(n-1,Math.floor(f)),u=f-i;return[lerp(TRACK[i][0],TRACK[i+1][0],u),lerp(TRACK[i][1],TRACK[i+1][1],u)];}
function track(k,t){const n=Math.floor(k*24);for(let i=0;i<=n;i++){const[x,y]=trackPt(i/24);circ(x,y,13,'#fff');circ(x,y,9,MN.red);}
  const[x,y]=trackPt(k);ctx.save();ctx.globalCompositeOperation='multiply';ctx.restore();circ(x,y,30+8*Math.sin(t*8),'rgba(255,77,61,.35)');circ(x,y,18,MN.red);circ(x,y,7,'#fff');}

// ---------- rules card (on the back of the beacon) ----------
const RULES=[["NEVER CANCEL","AN SOS","YOU DIDN'T SEND."],["ALWAYS ANSWER","THE CHECK-IN."]];
function rulesCard(t,o={}){fillAll('#0a0c11');glow(540,960,700,'rgba(255,120,60,1)',.10);
  ctx.save();ctx.translate(540,o.cy??820);ctx.scale(o.s??1,o.s??1);ctx.rotate(-.02);
  // beacon back plate
  fillRR(-440,-560,880,1120,90,'#e8662c');fillRR(-410,-530,820,1060,70,'#2a2e36');
  // taped index card
  fillRR(-360,-420,720,820,10,'#f1ebdd');for(let k=0;k<15;k++)line(-330,-300+k*48,330,-300+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.8;fillRR(-300,-450,150,52,4,'#d8ceb0');fillRR(150,-450,150,52,4,'#d8ceb0');fillRR(-300,350,150,52,4,'#d8ceb0');fillRR(150,350,150,52,4,'#d8ceb0');ctx.globalAlpha=1;
  text("DAD'S RULES",-300,-320,'900 70px MS','#1b1d23','left');line(-300,-296,160,-302,7,'#1b1d23');
  for(let r=0;r<2;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-200+r*270;ctx.save();ctx.beginPath();ctx.rect(-340,y0-60,680*clamp(k*1.15),240);ctx.clip();
    text(`${r+1}.`,-300,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>{const last=j===RULES[r].length-1;text(s2,-220,y0+j*58,'800 46px MS',last?'#a3261b':'#1b1d23','left');});ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+50,350,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— DAD',230,310,'800 40px MS','#3b3d44');ctx.restore();}

// ---------- front door from the hallway ----------
function frontDoor(t,o={}){fillAll('#0c1018');ctx.fillStyle=vgrad(0,1920,[[0,'#121824'],[1,'#080a10']]);ctx.fillRect(-200,-200,1480,2400);
  // wall + floor
  fillAll2('#1a1410',1560);for(let i=0;i<8;i++)line(-200+i*200,1560,-600+i*300,2000,4,'rgba(0,0,0,.35)');
  // door
  fillRR(250,330,580,1240,12,'#3a2a20');fillRR(270,350,540,1200,8,'#4a3628');
  // frosted window lit by the porch light
  const pl=o.porch??1;fillRR(360,430,360,520,10,pl?'#c9a46a':'#2a2f3a');ctx.save();rr(360,430,360,520,10);ctx.clip();
  if(pl){ctx.save();ctx.globalCompositeOperation='lighter';glow(540,520,500,'rgba(255,220,150,1)',.45);ctx.restore();}
  if(o.fig){ctx.globalAlpha=o.fig;wearer(540,1150,760,{glint:o.glint??1,col:'#2a1612'});ctx.globalAlpha=1;}
  for(let i=0;i<40;i++){ell(360+hash(i)*360,430+hash(i+40)*520,40,26,hash(i+80),'rgba(255,255,255,.07)');}ctx.restore();
  line(540,430,540,950,6,'#3a2a20');line(360,690,720,690,6,'#3a2a20');
  // knob + chain
  circ(740,1060,22,'#c9a23a');circ(740,1060,10,'#8a6a1a');line(690,960,780,980,5,'#8a8a90');
  // light under the door
  if(pl){ctx.save();ctx.globalCompositeOperation='lighter';fillRR(270,1548,540,10,4,'rgba(255,220,150,.8)');glow(540,1560,400,'rgba(255,220,150,1)',.18);ctx.restore();}
  // shadow feet in the gap
  if(o.feet){fillRR(430,1548,70,10,3,'#000');fillRR(580,1548,70,10,3,'#000');}}
