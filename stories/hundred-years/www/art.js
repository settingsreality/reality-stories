// ===================== 100 Years Old: the house, the yokai, the rooms =====================
const HY={paper:'#e7dcc2',ink:'#2a221a',siding:'#3a3f47',sidingM:'#8d939b',trim:'#c9c2b2',trimN:'#6f6a60',wood:'#5a3e28',woodD:'#3e2a1a'};
const HSTARS=(()=>{const r=rng(31),a=[];for(let i=0;i<300;i++)a.push([r()*3600-800,r()*700-500,.6+r()*1.3,.2+r()*.7]);return a;})();
// ---------- the house from the street ----------
// o.morning (0 night .. 1 grey dawn), o.lights (0..1), o.door (true/false), o.sign 'up'|'snapped', o.stretch (breathing)
function houseExt(cam,t,o){const m=o.morning||0;
  wl(cam,.25,()=>{const g=ctx.createLinearGradient(0,-600,0,800);g.addColorStop(0,m?'#5d6878':'#03050b');g.addColorStop(1,m?'#a7a9a8':'#151b2a');ctx.fillStyle=g;ctx.fillRect(-1600,-1200,5120,2800);
    if(!m){for(const[x,y,r,a]of HSTARS)circ(x,y,r,'#e9eefc',a);circ(1500,40,44,'#ece6d6');glow(1500,40,200,'rgba(240,235,220,1)',.3);}});
  wl(cam,.6,()=>{ctx.fillStyle=m?'#4a5040':'#0a0d0c';for(let i=0;i<9;i++){const x=-500+i*380;ctx.beginPath();ctx.ellipse(x,700,220,320,0,0,7);ctx.fill();}});
  wl(cam,1,()=>{ctx.fillStyle=m?'#59614c':'#0d110d';ctx.fillRect(-900,820,3720,900);
    const st=o.stretch||0;ctx.save();ctx.translate(960,820);ctx.scale(1-st*.03,1+st*.06);ctx.translate(-960,-820);
    const sid=m?HY.sidingM:HY.siding,trim=m?HY.trim:HY.trimN;
    // body + gable roof + porch
    fillRR(560,250,800,570,4,sid);for(let y=262;y<820;y+=24)line(560,y,1360,y,2,'rgba(0,0,0,.15)');
    poly([520,262,1400,262,960,10],m?'#3a3c40':'#16181c');poly([600,250,1320,250,960,40],m?'#4a4d52':'#1d2025');
    fillRR(900,110,120,90,4,trim);ctx.fillStyle=m?'#bfc3c6':'#0d1018';ctx.fillRect(912,122,96,66);
    // windows (lit or dark)
    const L=o.lights??1;const win=(x,y)=>{fillRR(x-8,y-8,136,176,4,trim);ctx.fillStyle=m?'#2a2e33':(L>0?`rgba(${Math.round(60+180*L)},${Math.round(40+120*L)},${Math.round(20+60*L)},1)`:'#0b0d12');ctx.fillRect(x,y,120,160);line(x+60,y,x+60,y+160,6,trim);line(x,y+80,x+120,y+80,6,trim);if(!m&&L>0)glow(x+60,y+80,180,'rgba(255,190,110,1)',.3*L);};
    win(620,310);win(1180,310);win(620,560);win(1180,560);
    // porch roof + posts + steps
    fillRR(700,560,520,30,4,trim);for(const px of[720,1200])fillRR(px-10,590,20,230,4,trim);for(let k=0;k<3;k++)fillRR(820-k*30,820+k*24,280+k*60,24,3,m?'#77706a':'#2a2622');
    // the front door (or the wall where it was)
    if(o.door!==false){fillRR(900,620,120,200,4,HY.woodD);fillRR(910,632,100,180,3,HY.wood);circ(995,725,7,'#c9a33a');fillRR(930,650,60,50,3,m?'#2a2e33':(L>0?'#c08040':'#0b0d12'));}
    else{ctx.fillStyle=sid;ctx.fillRect(896,616,128,208);for(let y=626;y<820;y+=24)line(896,y,1024,y,2,'rgba(0,0,0,.15)');ctx.fillStyle='rgba(255,255,255,.07)';ctx.fillRect(904,624,112,196);}
    fillRR(890,808,140,14,4,m?'#6a4a30':'#2a1e14');text('WELCOME',960,820,'500 10px PM',m?'#c9b89a':'#4a3a2a');fillRR(1046,640,20,24,4,'#2a2622');
    text('EST. 1926',960,606,'500 20px PM',m?'#3a3a3a':'#8a8478');
    ctx.restore();
    // FOR SALE sign
    if(o.sign==='up'){line(1520,980,1520,700,10,'#d9d5cc');line(1520,720,1720,720,8,'#d9d5cc');fillRR(1560,730,170,110,4,'#f2efe6');text('FOR',1645,775,'500 30px PM','#b02a20');text('SALE',1645,815,'500 30px PM','#b02a20');}
    if(o.sign==='snapped'){line(1520,980,1520,880,10,'#d9d5cc');ctx.save();ctx.translate(1600,960);ctx.rotate(.35);line(-80,0,140,0,10,'#d9d5cc');fillRR(-20,8,170,110,4,'#f2efe6');text('FOR',65,53,'500 30px PM','#b02a20');text('SALE',65,93,'500 30px PM','#b02a20');ctx.restore();}
    // the path to the door
    ctx.fillStyle=m?'#8a847a':'#1d1c1a';ctx.beginPath();ctx.moveTo(880,892);ctx.lineTo(1040,892);ctx.lineTo(1160,1700);ctx.lineTo(760,1700);ctx.fill();});
  vignA(.4);}
// ---------- the yokai, as a painted scroll ----------
function scrollBG(){ctx.fillStyle=HY.paper;ctx.fillRect(-900,-600,3720,2280);for(let i=0;i<900;i++){ctx.fillStyle=hash(i)>.5?'rgba(120,90,50,.05)':'rgba(255,255,255,.05)';ctx.fillRect(hash(i*3)*3720-900,hash(i*7)*2280-600,3+hash(i)*6,3+hash(i*9)*6);}
  ctx.strokeStyle='rgba(140,30,20,.35)';ctx.lineWidth=6;ctx.strokeRect(80,60,1760,960);}
function umbrella(x,y,t,s=1){const hop=Math.abs(Math.sin(t*3))*60;ctx.save();ctx.translate(x,y-hop);ctx.scale(s,s);ctx.rotate(Math.sin(t*3)*.08);
  ctx.fillStyle='#b8482e';ctx.beginPath();ctx.moveTo(0,-260);ctx.lineTo(-170,20);ctx.quadraticCurveTo(0,-20,170,20);ctx.closePath();ctx.fill();for(const k of[-1,-.5,0,.5,1])line(0,-260,k*170,k?18:-10,3,HY.ink);
  ctx.fillStyle='#e9e2cf';ctx.beginPath();ctx.ellipse(0,-120,34,26,0,0,7);ctx.fill();circ(0,-118,14,HY.ink);circ(4,-122,4,'#fff');
  poly([-30,-40,30,-40,10,30,-6,30],'#c0392b');line(0,10,0,170,10,HY.ink);ell(0,176,30,10,0,HY.ink);ctx.restore();}
function lantern(x,y,t,s=1){ctx.save();ctx.translate(x,y+Math.sin(t*2)*10);ctx.scale(s,s);line(0,-250,0,-190,4,HY.ink);fillRR(-60,-200,120,24,6,HY.ink);
  ctx.fillStyle='#efe2b8';ctx.beginPath();ctx.ellipse(0,-60,110,150,0,0,7);ctx.fill();for(let k=-4;k<=4;k++)line(-104*Math.cos(k*.33),-60+k*34,104*Math.cos(k*.33),-60+k*34,2,'rgba(42,34,26,.35)');
  glow(0,-60,200,'rgba(255,190,90,1)',.35);const op=.5+.5*Math.sin(t*2.4);ctx.fillStyle='#2a1010';ctx.beginPath();ctx.ellipse(10,-10,70,12+op*30,.1,0,7);ctx.fill();
  poly([20,0+op*20,80,10+op*20,110,60+op*40,60,30+op*20],'#c0392b');circ(-30,-110,14,HY.ink);circ(40,-114,10,HY.ink);fillRR(-60,80,120,22,6,HY.ink);ctx.restore();}
function sandal(x,y,t,s=1){const w=Math.sin(t*5);ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(w*.06);line(-40,30,-60+w*20,90,8,HY.ink);line(40,30,60-w*20,90,8,HY.ink);
  fillRR(-70,-120,140,170,40,'#c9a86a');for(let k=0;k<6;k++)line(-60,-100+k*26,60,-100+k*26,2,'rgba(42,34,26,.3)');line(0,-120,-50,-40,6,'#7a2a20');line(0,-120,50,-40,6,'#7a2a20');
  circ(-26,-60,12,'#fff');circ(-24,-60,6,HY.ink);circ(26,-60,12,'#fff');circ(28,-60,6,HY.ink);line(-90,-40,-130,-10+w*10,7,HY.ink);line(90,-40,130,-10-w*10,7,HY.ink);ctx.restore();}
function yokai(cam,t,o){wl(cam,1,()=>{scrollBG();
  if(o.title){const a=o.title;text('TSUKUMOGAMI',960,300,'400 110px IS',`rgba(42,34,26,${a})`);text('100 YEARS  →  A SOUL',960,400,'500 40px PM',`rgba(140,30,20,${a})`);}
  if(o.u)umbrella(560,740,t,1.05*o.u);if(o.l)lantern(960,600,t,1.0*o.l);if(o.s)sandal(1380,760,t,1.0*o.s);
  for(const[x,lab,k]of[[560,'UMBRELLA',o.u],[960,'LANTERN',o.l],[1380,'SANDAL',o.s]])if(k)text(lab,x,1000,'500 30px PM',`rgba(42,34,26,${k*.7})`);});}
// the pile thrown out before its hundredth year; something in it opens an eye
function discard(cam,t,o){wl(cam,1,()=>{scrollBG();
  // a wooden gate and the pile
  fillRR(260,240,40,640,4,HY.woodD);fillRR(1620,240,40,640,4,HY.woodD);fillRR(220,220,1480,40,6,HY.woodD);line(220,880,1700,880,4,'rgba(42,34,26,.6)');
  ctx.save();ctx.translate(960,880);
  fillRR(-260,-120,180,120,20,'#6a6a62');circ(-170,-130,20,'#4a4a44');line(-80,-80,-30,-110,10,'#4a4a44');// teapot
  ctx.save();ctx.rotate(-.4);fillRR(-40,-300,30,300,8,'#b8482e');ctx.restore();// umbrella
  fillRR(-20,-160,160,160,30,'#efe2b8');fillRR(140,-80,140,80,30,'#c9a86a');fillRR(260,-60,120,60,24,'#c9a86a');// lantern, sandals
  fillRR(-420,-90,150,90,10,'#7a5a3a');// box
  const e=o.eye||0;if(e>0){ctx.fillStyle='#f4efe2';ctx.beginPath();ctx.ellipse(-170,-60,40,22*e,0,0,7);ctx.fill();circ(-170,-60,14*e,HY.ink);circ(-166,-64,4*e,'#fff');}
  ctx.restore();
  if(o.label)text(o.label,960,170,'500 36px PM',`rgba(140,30,20,${o.labelA??1})`);});}
// ---------- the kitchen: one candle on a cupcake ----------
function kitchen(cam,t,o){const L=o.lights??1;wl(cam,1,()=>{ctx.fillStyle=`rgb(${Math.round(30+40*L)},${Math.round(26+30*L)},${Math.round(22+20*L)})`;ctx.fillRect(-900,-600,3720,2280);
  for(let x=-900;x<2820;x+=60)line(x,-600,x,760,2,'rgba(0,0,0,.12)');// old wallpaper stripes
  // floorboards (o.creak makes them ripple)
  const cr=o.creak||0;ctx.fillStyle=`rgb(${Math.round(40+30*L)},${Math.round(28+20*L)},${Math.round(18+12*L)})`;ctx.fillRect(-900,760,3720,900);
  for(let k=0;k<12;k++){const y0=780+k*34;ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=3;ctx.beginPath();for(let x=-900;x<2820;x+=40){const y=y0+Math.sin(x*.01-t*4+k*.7)*cr*10*(k/12+.3);x===-900?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}
  // window, cabinets, hanging lamp
  fillRR(1300,140,360,300,4,'#2a2622');ctx.fillStyle='#070a12';ctx.fillRect(1316,156,328,268);line(1480,156,1480,424,8,'#2a2622');
  fillRR(-200,120,800,240,6,'#4a3626');for(let k=0;k<4;k++)fillRR(-180+k*196,140,176,200,4,'#553e2c');fillRR(-200,520,800,240,6,'#4a3626');fillRR(-220,500,840,30,4,'#6a5038');
  line(960,-600,960,180,4,'#111');poly([890,180,1030,180,1000,140,920,140],'#2a2a2a');if(L>0){circ(960,190,18,`rgba(255,220,160,${L})`);glow(960,240,700,'rgba(255,200,130,1)',.32*L);}
  // table + cupcake + candle
  fillRR(700,560,620,30,6,'#6a4a30');line(740,590,740,760,16,'#4a3220');line(1280,590,1280,760,16,'#4a3220');
  fillRR(970,500,80,60,10,'#c9a86a');ell(1010,500,48,26,0,'#f0d8e0');line(1010,450,1010,480,8,'#9fd0f0');
  if(o.candle){const f=1+.12*Math.sin(t*23)+.08*Math.sin(t*31);ell(1010,436,8*f,16*f,0,'#ffcf6a');glow(1010,436,160,'rgba(255,190,90,1)',.55);}
  else if(o.smoke){for(let i=0;i<12;i++){const k=fract(t*.5+i/12);circ(1010+Math.sin(k*8+i)*20*k,446-k*300,6+k*24,'#9a9a9a',o.smoke*.25*(1-k));}}
  if(o.you)YOU(Object.assign({x:820,y:760,h:380,face:1,eyes:1,legA:[1.45,1.45],legB:[.1,.05],lift:120},o.you));});
  if(L<1){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle=`rgba(0,0,0,${(1-L)*.55})`;ctx.fillRect(0,0,1080,608);ctx.restore();}
  vignA(.4);}
// ---------- the hallway that keeps getting longer ----------
function hallway(cam,t,o){const st=o.stretch||0;wl(cam,1,()=>{ctx.fillStyle='#0f0d0c';ctx.fillRect(-900,-600,3720,2280);
  const vx=960,vy=470,depth=lerp(1,5,st);const nd=Math.round(lerp(2,9,st));
  // walls/floor/ceiling converging
  const far=lerp(220,60,st);ctx.fillStyle='#2a2420';poly([-900,-600,vx-far,vy-far*.9,vx-far,vy+far*.9,-900,1680],'#2a2420');poly([2820,-600,vx+far,vy-far*.9,vx+far,vy+far*.9,2820,1680],'#2a2420');
  poly([-900,1680,vx-far,vy+far*.9,vx+far,vy+far*.9,2820,1680],'#3a2a1c');poly([-900,-600,vx-far,vy-far*.9,vx+far,vy-far*.9,2820,-600],'#1d1916');
  for(let k=0;k<14;k++){const z=k/14;line(lerp(-900,vx-far,z),lerp(1680,vy+far*.9,z),lerp(2820,vx+far,z),lerp(1680,vy+far*.9,z),2,'rgba(0,0,0,.25)');}
  fillRR(vx-far,vy-far*.9,far*2,far*1.8,2,'#0a0908');
  // doors along both walls (more appear as it stretches)
  for(let i=0;i<nd;i++){const z=(i+.5)/nd;const zz=Math.pow(z,.7);for(const s of[-1,1]){const x=lerp(s<0?-500:2420,vx+s*far,zz),h=lerp(900,far*1.5,zz),w=lerp(260,far*.35,zz),y=lerp(1180,vy+far*.9,zz);
    ctx.fillStyle=i>=2&&st>0?'#2e1f14':'#3e2a1a';ctx.fillRect(s<0?x:x-w,y-h,w,h);circ(s<0?x+w*.8:x-w*.8,y-h*.45,Math.max(1,w*.05),'#8a7a3a');}}
  // the light at the end dims
  glow(vx,vy-far*.6,lerp(400,140,st),'rgba(255,200,130,1)',.35*(o.lights??1));
  if(o.you)YOU(Object.assign({x:960,y:1160,h:520,face:1,eyes:0},o.you));});vignA(.5);}
// ---------- the front door from inside ----------
function doorInside(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#211c18';ctx.fillRect(-900,-600,3720,2280);for(let x=-900;x<2820;x+=60)line(x,-600,x,900,2,'rgba(0,0,0,.12)');ctx.fillStyle='#2a1f16';ctx.fillRect(-900,900,3720,900);
  // side windows with latches
  for(const wx of[420,1340]){fillRR(wx,180,160,520,4,'#3a2e24');ctx.fillStyle='#090c14';ctx.fillRect(wx+14,194,132,492);const lk=(o.latch||0)>(wx<900?0:.5);fillRR(wx+50,430,60,26,4,'#8a7a3a');ctx.save();ctx.translate(wx+80,443);ctx.rotate(lk?0:-1.2);fillRR(-6,-30,12,34,4,'#b8a050');ctx.restore();}
  // the door
  fillRR(700,100,520,800,6,HY.woodD);fillRR(720,120,480,760,4,HY.wood);for(const[x,y,w,h]of[[760,160,180,260],[980,160,180,260],[760,480,180,360],[980,480,180,360]])fillRR(x,y,w,h,4,'#4e3420');
  // deadbolt + knob
  fillRR(1130,400,50,70,8,'#8a7a3a');ctx.save();ctx.translate(1155,435);ctx.rotate((o.lock||0)*Math.PI/2);fillRR(-6,-24,12,48,4,'#c9b060');ctx.restore();
  const warm=o.warm||0;circ(1150,560,30,'#b8a050');if(warm)glow(1150,560,140,'rgba(255,90,40,1)',.45*warm);
  if(o.hand){const k=o.hand;circ(lerp(1500,1170,k),lerp(900,570,k),44,'#15171c');line(lerp(1500,1170,k),lerp(900,570,k),lerp(1800,1500,k),lerp(1200,900,k),60,'#262a33');}
  });vignA(.45);}
// ---------- the wall that talks: wood grain with a face ----------
function grainWall(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#3a2818';ctx.fillRect(-900,-600,3720,2280);
  for(let k=0;k<60;k++){ctx.strokeStyle=`rgba(${k%3?20:70},${k%3?12:44},${k%3?6:24},.5)`;ctx.lineWidth=3+(k%4);ctx.beginPath();for(let y=-600;y<1700;y+=40){const x=-900+k*64+Math.sin(y*.006+k)*30+((Math.hypot(k*64-1860,y-540)<500)?Math.sin(Math.atan2(y-540,k*64-1860)*2)*40:0);y===-600?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}
  for(let x=-900;x<2820;x+=320)line(x,-600,x,1700,6,'rgba(0,0,0,.4)');
  const f=o.face||0,mo=o.mouth||0;if(f>0){ctx.save();ctx.globalAlpha=f;for(const ex of[800,1120]){ctx.fillStyle='#120a05';ctx.beginPath();ctx.ellipse(ex,420,70,44,0,0,7);ctx.fill();ctx.strokeStyle='rgba(90,60,30,.8)';ctx.lineWidth=6;for(let r=80;r<200;r+=30){ctx.beginPath();ctx.ellipse(ex,420,r,r*.62,0,0,7);ctx.stroke();}}
    ctx.fillStyle='#0a0603';ctx.beginPath();ctx.ellipse(960,760,180,20+mo*90,0,0,7);ctx.fill();ctx.restore();}});vignA(.55);}
function vignA(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
