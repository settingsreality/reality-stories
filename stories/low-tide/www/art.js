// ===================== Low Tide: places and things (v2, 1080x1920) =====================
const LT={sea0:'#071225',sea1:'#0d2340',wood:'#5a4330',woodD:'#3a2a1d',woodL:'#7a5c40',lamp:'255,232,190',coast:'#1f3b6b',vis:'#e8d23a'};
const LSTARS=(()=>{const r=rng(11),a=[];for(let i=0;i<200;i++)a.push([r()*1180-50,r()*900-40,r()<.1?2.4:1.3,.25+r()*.6]);return a;})();
function lsky(y1,o={}){const d=o.dawn||0;ctx.fillStyle=vgrad(-60,y1,[[0,d?'#2b2f4a':'#03060e'],[.7,d?'#8c6a7a':'#0b1530'],[1,d?'#e0a48a':'#16264a']]);ctx.fillRect(-80,-80,1240,y1+90);
  for(const[x,y,r,a]of LSTARS)if(y<y1-40)circ(x,y,r,'#e6ecff',a*(1-d));if(o.moon!==false&&!d){circ(820,260,40,'#efeadc');glow(820,260,200,'rgba(230,230,255,1)',.12);}}
function seaBand(y0,t,o={}){const d=o.dawn||0;ctx.fillStyle=vgrad(y0,2000,[[0,d?'#5d6a86':'#0d2340'],[1,d?'#1c2840':'#040a16']]);ctx.fillRect(-80,y0,1240,2100-y0);
  for(let k=0;k<26;k++){const y=y0+Math.pow(k/26,1.7)*(1960-y0);const a=.03+.06*(k/26);const off=Math.sin(t*.6+k)*20*(o.still?0:1);line(-80,y,1160,y+off*.1,1.5+(k/26)*2,`rgba(180,205,240,${a})`);}
  if(o.moonPath!==false&&!d){for(let k=0;k<18;k++){const y=y0+20+k*k*3.2;const w=10+k*9;ctx.globalAlpha=.10;fillRR(820-w/2+Math.sin(t*1.3+k)*6*(o.still?0:1),y,w,3+k*.4,2,'#f4efe0');}ctx.globalAlpha=1;}}
// a wet bare footprint (pointing up = -y), s = length
function footprint(x,y,s,rot=0,a=1,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a;const c=o.c||'rgba(8,14,24,.82)';
  ell(0,0,s*.2,s*.5,0,c);ell(-s*.02,-s*.18,s*.24,s*.26,0,c);for(let i=0;i<5;i++){const tx=-s*.18+i*s*.09,ty=-s*.56-Math.sin(i/4*Math.PI)*s*.05+i*s*.01;circ(tx,ty,s*(.07-.008*i),c);}
  ell(-s*.05,-s*.1,s*.05,s*.14,-.2,'rgba(200,225,255,.22)');ctx.restore();}
function drip(x,y,t,seed,a=1){const k=fract(t*.7+hash(seed));circ(x,y+k*60,3.5,'#cfe3ff',a*(1-k));}

// ---------- the ladder from above (cold open) ----------
function ladderDown(t,o={}){fillAll('#03060c');
  // the sea far below, black with moon glints
  ctx.fillStyle=vgrad(900,1920,[[0,'#06101f'],[1,'#02060c']]);ctx.fillRect(-80,900,1240,1100);
  for(let k=0;k<30;k++){const x=hash(k*7.1)*1100,y=1000+hash(k*3.3)*900;fillRR(x,y+Math.sin(t+k)*6,40+hash(k)*80,3,2,'rgba(220,230,255,.07)');}
  // hut floor edge + door frame at top
  ctx.fillStyle=vgrad(0,330,[[0,'#2a1f16'],[1,'#3f2f21']]);ctx.fillRect(-80,-80,1240,410);for(let i=0;i<9;i++)line(-80,40+i*36,1160,40+i*36,3,'rgba(0,0,0,.25)');
  // the ladder going down in perspective
  const top=330,bot=1700;const L=(k)=>({y:lerp(top,bot,Math.pow(k,1.3)),w:lerp(560,240,k)});
  for(const s of[-1,1]){ctx.fillStyle=LT.woodD;ctx.beginPath();ctx.moveTo(540+s*290,top);ctx.lineTo(540+s*310,top);ctx.lineTo(540+s*130,bot);ctx.lineTo(540+s*112,bot);ctx.fill();}
  const n=9;for(let r=0;r<n;r++){const k=r/(n-1);const{y,w}=L(k);fillRR(540-w/2,y-14+k*8,w,30-k*14,6,r%2?LT.wood:LT.woodL);
    const fa=o.prints??1;if(fa>0&&r<n-1){const side=r%2?1:-1;footprint(540+side*w*.2,y+8,lerp(230,80,k),side*.08,fa,{c:'rgba(10,16,26,.92)'});drip(540+side*w*.2,y+30,t,r,fa);}}
  if((o.prints??1)>0){footprint(470,250,250,-.1,1,{c:'rgba(10,16,26,.92)'});footprint(640,120,250,.06,1,{c:'rgba(10,16,26,.92)'});drip(470,280,t,41);drip(640,150,t,42);}
  // flashlight
  ctx.save();ctx.globalCompositeOperation='lighter';beam(540,-80,Math.PI,1500,520,.20*(o.light??1),LT.lamp);glow(540,700,560,`rgba(${LT.lamp},1)`,.10*(o.light??1));ctx.restore();
  snowMist(t);}
function snowMist(t){for(let i=0;i<6;i++){const y=600+i*220+Math.sin(t*.3+i)*30;ctx.globalAlpha=.05;fillRR(-100+Math.sin(t*.2+i)*60,y,1300,90,45,'#c8d6ee');}ctx.globalAlpha=1;}

// ---------- the causeway, wide ----------
function causeway(t,o={}){lsky(980);ctx.save();ctx.translate(780,980);ctx.scale(1.8,1.8);ctx.translate(-780,-980);const tide=o.tide??0;
  // the island: rock + castle + priory arch
  ctx.fillStyle='#0b1428';ctx.beginPath();ctx.moveTo(560,980);ctx.lineTo(640,880);ctx.lineTo(700,860);ctx.lineTo(760,900);ctx.lineTo(900,960);ctx.lineTo(1160,970);ctx.lineTo(1160,990);ctx.lineTo(560,990);ctx.fill();
  poly([660,870,680,800,700,790,720,800,730,860],'#0b1428');fillRR(690,770,24,30,3,'#0b1428');circ(712,820,4,'#f0c070',.8);
  ctx.strokeStyle='#0b1428';ctx.lineWidth=8;ctx.beginPath();ctx.arc(900,955,26,Math.PI,0);ctx.stroke();ctx.restore();
  seaBand(980,t);
  // the road disappearing into the sea
  const ry=lerp(1500,1180,tide);ctx.fillStyle='#1b1f27';ctx.beginPath();ctx.moveTo(380,1920);ctx.lineTo(700,1920);ctx.lineTo(560,990);ctx.lineTo(548,990);ctx.fill();
  for(let k=0;k<12;k++){const q=k/12;const y=lerp(1920,1000,q),x=lerp(540,554,q);fillRR(x-4,y,8,lerp(40,6,q),2,'rgba(240,240,230,.55)');}
  // water over the far road
  ctx.fillStyle=vgrad(990,ry,[[0,'rgba(13,35,64,1)'],[1,'rgba(13,35,64,.6)']]);ctx.fillRect(300,990,480,ry-990);line(330,ry,760,ry,3,'rgba(200,220,255,.25)');
  // marker posts along the road
  for(let k=0;k<9;k++){const q=Math.pow(k/9,1.4);const y=lerp(1880,1010,q),h=lerp(220,16,q);for(const s of[-1,1]){const x=lerp(540+s*260,553+s*20,q);line(x,y,x,y-h,lerp(10,2,q),'#d8d2c0');}}
  // the refuge hut on stilts, mid distance
  hutTiny(830,1180,.95,t);
  // my car with its lights on, water to the wheels
  ctx.save();ctx.translate(560,1640);fillRR(-150,-90,300,90,20,'#5b6b80');fillRR(-110,-150,220,70,18,'#4a5a70');fillRR(-90,-140,180,50,10,'#1a2433');
  ctx.globalCompositeOperation='lighter';beam(-90,-50,0,420,120,.12,LT.lamp);beam(90,-50,0,420,120,.12,LT.lamp);glow(0,-60,220,`rgba(${LT.lamp},1)`,.15);ctx.restore();
  ctx.fillStyle=`rgba(13,35,64,${.65+.2*tide})`;ctx.fillRect(300,1640-tide*60,600,300);line(300,1640-tide*60,900,1640-tide*60,3,'rgba(200,220,255,.3)');
  snowMist(t);}
function hutTiny(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);for(const lx of[-70,70])line(lx,0,lx,-200,12,'#1b140e');line(-70,-100,70,-150,6,'#1b140e');
  fillRR(-110,-330,220,140,6,'#2b2117');poly([-130,-330,0,-400,130,-330],'#1e1710');fillRR(-30,-300,60,50,4,`rgba(${LT.lamp},.35)`);for(let k=0;k<7;k++)line(110,-190+k*30,110,-190+k*30+18,6,'#1b140e');ctx.restore();}

// ---------- the hut, close, me climbing ----------
function hutClose(t,o={}){lsky(1200);seaBand(1200,t);const w=o.water??0;
  for(const lx of[300,780]){fillRR(lx-18,860,36,1100,6,LT.woodD);}line(300,1250,780,1450,14,LT.woodD);line(780,1250,300,1450,14,LT.woodD);
  fillRR(200,420,680,460,10,LT.wood);for(let i=0;i<10;i++)line(200,440+i*44,880,440+i*44,3,'rgba(0,0,0,.2)');poly([170,430,540,250,910,430],LT.woodD);
  fillRR(260,520,200,160,10,'#1a2433');glow(360,600,140,`rgba(${LT.lamp},1)`,.15);fillRR(560,520,240,360,8,LT.woodD);circ(770,700,8,'#b89a6a');
  text('REFUGE',540,480,'900 44px MS','#e8e0cc');
  // ladder down from the door
  for(const s of[-1,1])line(680+s*70,880,680+s*90,1900,14,LT.woodD);for(let k=0;k<9;k++){const y=930+k*110;line(610,y,770,y,12,LT.wood);}
  // the rising water around the stilts
  const wy=lerp(1700,1420,w);ctx.fillStyle='rgba(10,30,58,.85)';ctx.fillRect(-80,wy,1240,600);for(let k=0;k<5;k++)line(-80,wy+k*40,1160,wy+k*40+Math.sin(t+k)*6,3,'rgba(180,210,250,.18)');
  if(o.me)me2({x:690,y:lerp(1560,1180,o.climb??0)+40,h:520,look:{x:.2,y:-1},brow:'worried',mouth:'grit',armL:[2.7,.2],armR:[2.5,.3]});
  snowMist(t);}
function me2(o){toon(Object.assign({jacket:'#2f4f7a',hat:'beanie',hatCol:'#f0683f',stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}

// ---------- out of the window: the pilgrim posts and the light ----------
function window_(t,o={}){lsky(860,{moon:true});seaBand(860,t,{still:o.still});
  // posts receding diagonally
  const P=[];for(let k=0;k<12;k++){const q=k/11;P.push({x:lerp(980,330,Math.pow(q,.7)),y:lerp(1500,880,Math.pow(q,.6)),h:lerp(360,30,Math.pow(q,.6))});}
  for(const p of P.slice().reverse()){line(p.x,p.y,p.x,p.y-p.h,lerp(4,16,p.h/360),'#1a140f');ell(p.x,p.y+4,p.h*.08+4,p.h*.02+2,0,'rgba(200,220,255,.12)');}
  // the light under the water
  if(o.lk!=null){const k=o.lk;let x,y,r;if(k<1){const f=k*(P.length-1),i=Math.floor(f),u=f-i;const a=P[Math.min(P.length-1,P.length-1-i)],b=P[Math.max(0,P.length-2-i)];const st=ss(clamp((u-.55)/.45));x=lerp(a.x,b.x,st);y=lerp(a.y,b.y,st)+10;r=lerp(18,60,1-a.h/360+.0);}
    else{const q=ss(clamp(k-1));x=lerp(P[0].x,560,q);y=lerp(P[0].y,1700,q);r=lerp(60,160,q);}
    ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,r*6,'rgba(150,230,220,1)',.45);ell(x,y,r*1.6,r*.5,0,'rgba(190,255,240,.6)');ell(x,y,r*.7,r*.22,0,'rgba(240,255,250,.8)');ctx.restore();}
  // window frame + condensation
  ctx.fillStyle='#120d09';ctx.fillRect(-80,-80,1240,240);ctx.fillRect(-80,1640,1240,400);ctx.fillRect(-80,-80,150,2100);ctx.fillRect(1010,-80,150,2100);fillRR(70,860,940,26,4,'#120d09');
  for(let i=0;i<40;i++)circ(80+hash(i*1.7)*920,170+hash(i*2.9)*1460,6+hash(i)*16,'#dfe9ff',.05);}

// ---------- the still water and the light crossing it ----------
function stillWater(t,o={}){lsky(700,{moon:true});ctx.fillStyle=vgrad(700,1920,[[0,'#0b1d38'],[1,'#030812']]);ctx.fillRect(-80,700,1240,1300);
  circ(820,980,36,'#efeadc',.3);for(let k=0;k<10;k++)line(-80,760+k*k*12,1160,760+k*k*12,1,'rgba(180,210,250,.05)');
  const k=o.k??0;const x=lerp(380,560,k),y=lerp(820,1650,ss(k)),r=lerp(40,260,ss(k));ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,r*3,'rgba(150,230,220,1)',.28);ell(x,y,r,r*.3,0,'rgba(190,255,240,.35)');ctx.restore();
  // the stilts of my hut, foreground
  for(const lx of[120,960])fillRR(lx-30,-80,60,2100,8,'#120d09');}

// ---------- inside the hut: holding the door ----------
function inside(t,o={}){fillAll('#0d0a08');ctx.fillStyle=vgrad(0,1920,[[0,'#1d1610'],[1,'#0b0806']]);ctx.fillRect(-80,-80,1240,2100);
  for(let i=0;i<14;i++)line(-80+i*90,-80,-80+i*90,2000,4,'rgba(0,0,0,.25)');
  // the door (right), shaking a little when the ladder creaks
  const sh=(o.knock||0)*Math.sin(t*60)*6;fillRR(560+sh,380,420,1180,10,LT.woodD);for(let i=0;i<6;i++)line(560+sh,450+i*190,980+sh,450+i*190,5,'rgba(0,0,0,.35)');circ(600+sh,980,14,'#b89a6a');
  ctx.save();ctx.globalCompositeOperation='lighter';glow(770,1570,260,'rgba(150,230,220,1)',.08*(o.under||0));ctx.restore();
  line(560,1565,980,1565,4,`rgba(170,240,230,${.5*(o.under||0)})`);
  // me pressed against it
  const tr=(o.tremble||0)*Math.sin(t*40)*4;me2({x:470+tr,y:1720,h:1150,face:.6,look:{x:1,y:.1},brow:'scared',mouth:o.mouth||'grit',armR:[1.55,.15],armL:[1.4,.4],tilt:.06});
  // flashlight on the floor
  ctx.save();ctx.translate(250,1760);ctx.rotate(-.2);fillRR(-60,-14,120,28,10,'#2b2b2b');ctx.restore();ctx.save();ctx.globalCompositeOperation='lighter';beam(300,1750,1.2,900,300,.12,LT.lamp);ctx.restore();}

// ---------- dawn: the coastguard at the ladder ----------
function dawnLadder(t,o={}){lsky(1100,{dawn:1});seaBand(1100,t,{dawn:1});
  // ladder close, rungs with prints facing up, drying
  for(const s of[-1,1])line(540+s*190,-80,540+s*230,2000,26,LT.woodD);for(let k=0;k<10;k++){const y=80+k*200;fillRR(330,y,420,30,6,LT.wood);footprint(470+(k%2)*130,y+6,92,0,.65*(o.prints??1),{c:'rgba(40,40,52,.75)'});}
  // the coastguard below, in a small boat
  const b=o.boat??1;ctx.save();ctx.translate(560,1760);fillRR(-300,-30,600,90,40,'#d9662b');fillRR(-300,-30,600,24,12,'#efe9dc');ctx.restore();
  toon({x:420,y:1760,h:700,jacket:'#203a66',hat:'helm',hatCol:'#f2f0ea',stripe:true,skin:'#d9a27c',beard:null,brow:o.brow||'worried',mouth:o.mouth||'flat',look:o.look||{x:.7,y:-1},armR:[2.8,.2],tag:'COASTGUARD'});}
function cgFace(t,o={}){lsky(1920,{dawn:1});const back=o.back||0;
  toon({x:540,y:2600+back*500,h:2200,jacket:'#203a66',hat:'helm',hatCol:'#f2f0ea',stripe:true,skin:'#d9a27c',brow:'scared',mouth:'open',look:{x:.3,y:-.2},tag:'COASTGUARD',armL:[.1,.1],armR:[.1,.1]});
  for(const s of[-1,1])line(540+s*470,-80,540+s*500,2000,30,LT.woodD);}

// ---------- me, and what's behind me ----------
function behindMe(t,o={}){fillAll('#0b0806');ctx.fillStyle=vgrad(0,1920,[[0,'#1a130e'],[1,'#080605']]);ctx.fillRect(-80,-80,1240,2100);
  // dawn light from the open door (left)
  ctx.save();ctx.globalCompositeOperation='lighter';glow(0,900,900,'rgba(255,190,150,1)',.18);ctx.restore();
  // the dark corner behind me: something tall, two glints
  const g=o.glint??1;ctx.fillStyle='rgba(0,0,0,.6)';ctx.beginPath();ctx.ellipse(800,780,170,520,0,0,7);ctx.fill();
  if(g>0){circ(770,520,7,'#f2efe6',g);circ(830,520,7,'#f2efe6',g);glow(800,520,60,'rgba(235,240,255,1)',.2*g);}
  for(let k=0;k<6;k++)footprint(820-k*60,1840-k*120,70,-.4,.5,{c:'rgba(6,10,16,.7)'});
  me2({x:430,y:2350,h:1850,brow:'scared',mouth:'flat',look:{x:-.2,y:.1},armL:[.1,.1],armR:[.1,.1]});}
