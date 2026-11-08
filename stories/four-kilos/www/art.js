// ===================== Four Kilos: places and things (v2, 1080x1920) =====================
const FK={uni:'#2d3f66',uniD:'#1f2c4a',tile:'#16233d',tileL:'#20314f',gold:'#ffc93c',red:'#ff4d3d',lamp:'255,226,170',bone:'#d8cdb4',boneD:'#a79a7e'};
function me(o){toon(Object.assign({jacket:FK.uni,pants:'#141a2a',hat:'beanie',hatCol:'#f0683f',tag:'SECURITY',skin:'#e9b896',browCol:'#4a2e1f',stripe:false},o));}
function dolores(o){toon(Object.assign({jacket:FK.uni,pants:'#141a2a',hat:'cap',hatCol:'#1a2238',tag:'DOLORES',skin:'#c98f68',browCol:'#d8d4cc',stripe:false},o));}
function ghost(x,y,h,o={}){ctx.save();ctx.globalAlpha=o.a??.55;toon(Object.assign({x,y,h,jacket:FK.uni,pants:'#141a2a',hat:'cap',hatCol:'#101626',blank:true,glint:o.glint??.7,tag:o.tag||'SECURITY',stripe:false},o));ctx.restore();}
// perspective floor. tile(i,j) returns [x,y] screen for grid corner; i across -7..7, j depth 0..14
function floorPt(i,j,o={}){const hz=o.hz??1000,by=o.by??1720;const q=1/(1+j*.28);return[540+i*170*q,hz+(by-hz)*q];}
function hall(t,o={}){const hz=o.hz??1000;
  ctx.fillStyle=vgrad(-60,hz+30,[[0,'#090d18'],[.6,'#121c30'],[1,'#1c2a44']]);ctx.fillRect(-80,-80,1240,hz+120);
  // tall arched windows with moonlight
  for(const x of[150,540,930]){ctx.save();ctx.fillStyle='rgba(120,160,220,.16)';ctx.beginPath();ctx.moveTo(x-95,hz-210);ctx.lineTo(x-95,330);ctx.arc(x,330,95,Math.PI,0);ctx.lineTo(x+95,hz-210);ctx.fill();for(let k=-1;k<=1;k++)line(x+k*48,250,x+k*48,hz-210,5,'#0b111e');for(let k=0;k<5;k++)line(x-95,370+k*90,x+95,370+k*90,5,'#0b111e');ctx.restore();}
  // floor tiles
  ctx.fillStyle=vgrad(hz,1950,[[0,'#16233d'],[1,'#27395c']]);ctx.fillRect(-80,hz,1240,1400);
  for(let i=-14;i<=14;i++){const a=floorPt(i-.5,0,o),b=floorPt(i-.5,16,o);line(a[0],a[1],b[0],b[1],2.5,'rgba(190,210,255,.14)');}
  for(let j=0;j<=16;j++){const a=floorPt(-14,j-.5,o),b=floorPt(14,j-.5,o);line(a[0],a[1],b[0],b[1],2.5,'rgba(190,210,255,.14)');}
  if(o.lit)for(const L of o.lit)tileGlow(L.i,L.j,L.c||FK.gold,L.a??1,o);}
function tileGlow(i,j,c,a,o={}){const P=[floorPt(i-.5,j-.5,o),floorPt(i+.5,j-.5,o),floorPt(i+.5,j+.5,o),floorPt(i-.5,j+.5,o)];const rgb=c===FK.red?'255,70,50':'255,201,60';
  poly(P.flat(),c,.75*a);ctx.save();ctx.globalCompositeOperation='lighter';const m=[(P[0][0]+P[2][0])/2,(P[0][1]+P[2][1])/2];glow(m[0],m[1],260/(1+j*.28),`rgba(${rgb},1)`,.5*a);
  // light rising off the tile
  ctx.fillStyle=`rgba(${rgb},${.13*a})`;ctx.beginPath();ctx.moveTo(P[0][0],P[0][1]);ctx.lineTo(P[1][0],P[1][1]);ctx.lineTo(P[1][0],P[1][1]-520/(1+j*.28));ctx.lineTo(P[0][0],P[0][1]-520/(1+j*.28));ctx.fill();ctx.restore();}
// a sauropod-ish skeleton, facing left. scale s, x/y = hips on the ground line
function skeleton(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const B=o.col||FK.bone,D=FK.boneD;
  // legs
  for(const lx of[-40,60,-260,-170]){line(lx,-330,lx+12,-160,26,B);line(lx+12,-160,lx-4,-12,22,B);ell(lx-8,-6,36,12,0,D);}
  // spine + ribs
  ctx.strokeStyle=B;ctx.lineWidth=26;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(420,-250);ctx.quadraticCurveTo(160,-440,-120,-410);ctx.quadraticCurveTo(-360,-400,-520,-600);ctx.stroke();
  for(let k=0;k<11;k++){const q=k/10;const px=lerp(-250,120,q),py=-395-Math.sin(q*3.1)*30;ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(px,py);ctx.quadraticCurveTo(px+34,py+110,px-8,py+190-Math.abs(q-.5)*60);ctx.stroke();}
  // skull
  fillRR(-600,-650,120,62,28,B);circ(-540,-628,14,'#0b1120');for(let k=0;k<5;k++)line(-592+k*16,-592,-592+k*16,-572,6,B);
  // tail vertebrae
  for(let k=0;k<7;k++)circ(430+k*44,-240+k*30,15-k,B);
  // plinth
  ctx.restore();fillRR(x-430*s*1.25,y-4,860*s*1.25,44*s,10,'#0d1422');}
// display case with a small artefact
function caseBox(x,y,s,glowA=.0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-110,-30,220,60,6,'#0d1422');fillRR(-96,-230,192,200,8,'rgba(150,190,240,.14)');ctx.strokeStyle='rgba(200,225,255,.5)';ctx.lineWidth=4;rr(-96,-230,192,200,8);ctx.stroke();
  circ(0,-110,38,'#b08f5a');circ(-10,-122,10,'#7a5f36');glow(0,-110,120,'rgba(255,220,160,1)',.22+glowA);ctx.restore();}
// flashlight cone from (x,y)
function torch(x,y,a,L,w,al=.32){ctx.save();ctx.globalCompositeOperation='lighter';beam(x,y,a,L,w,al,FK.lamp);ctx.restore();}
function readout(x,y,kg,o={}){const w=o.w??340,h=o.h??150;fillRR(x-w/2,y-h/2,w,h,16,'#05070c');ctx.strokeStyle=o.hot?FK.red:'rgba(255,255,255,.25)';ctx.lineWidth=5;rr(x-w/2,y-h/2,w,h,16);ctx.stroke();
  text(o.k||'WEIGHT',x,y-h/2+24,'800 22px MS','rgba(255,255,255,.6)');text(kg+' KG',x,y+22,`900 ${o.fs||74}px MS`,o.hot?FK.red:FK.gold);}
// ---------- the alarm console: floor map ----------
const GALS=[[120,330,420,420,'DINOSAURS'],[560,330,400,300,'MINERALS'],[120,770,300,420,'ICE AGE'],[440,650,520,540,'EARLY HUMANS']];
function floorMap(t,o={}){fillAll('#080c14');ctx.fillStyle=vgrad(0,1920,[[0,'#0a1020'],[1,'#060810']]);ctx.fillRect(-80,-80,1240,2080);
  fillRR(70,260,940,1030,24,'#0d1526');ctx.strokeStyle='rgba(120,190,255,.35)';ctx.lineWidth=4;rr(70,260,940,1030,24);ctx.stroke();
  const sz=44;for(const[x,y,w,h,n]of GALS){fillRR(x,y,w,h,8,'#111d33');for(let i=0;i<=w/sz;i++)line(x+i*sz,y,x+i*sz,y+h,1.5,'rgba(120,190,255,.14)');for(let j=0;j<=h/sz;j++)line(x,y+j*sz,x+w,y+j*sz,1.5,'rgba(120,190,255,.14)');
    ctx.strokeStyle='rgba(120,190,255,.5)';ctx.lineWidth=3;rr(x,y,w,h,8);ctx.stroke();text(n,x+w/2,y+h-22,'800 24px MS','rgba(170,210,255,.55)');}
  // cases in the rooms
  for(const[x,y]of[[230,470],[420,620],[640,430],[860,520],[240,960],[560,800],[800,900],[640,1080],[870,1100]])fillRR(x-16,y-16,32,32,5,'rgba(120,190,255,.42)');
  // exit door
  fillRR(960,1140,50,120,6,'#163a2a');text('EXIT',985,1125,'800 24px MS','#6cf0ae');
  (o.marks||[]).forEach(m=>{const k=m.a??1;fillRR(m.x-22,m.y-22,44,44,5,m.c||FK.gold);ctx.globalAlpha=1;ctx.save();ctx.globalCompositeOperation='lighter';glow(m.x,m.y,110,m.c===FK.red?'rgba(255,70,50,1)':'rgba(255,201,60,1)',.5*k);ctx.restore();
    if(m.t)label(m.t,m.x,m.y-62,{font:'800 30px MS',bg:m.c===FK.red?'#ff4d3d':'rgba(255,201,60,.96)',col:m.c===FK.red?'#fff':'#14110a',h:48});});
  ctx.globalAlpha=1;}
// path through the map, q in 0..1
const PATH=[[230,520],[420,580],[640,480],[860,560],[800,860],[560,850],[300,960],[640,1040]];
function pathPt(q){const n=PATH.length-1,u=clamp(q)*n,i=Math.min(n-1,Math.floor(u)),f=u-i;return[lerp(PATH[i][0],PATH[i+1][0],f),lerp(PATH[i][1],PATH[i+1][1],f)];}
// ---------- rules card ----------
const RULES=[["A 4 KG STEP AT 2 AM","IS NORMAL.","LEAVE IT ALONE."],["NEVER STAND ON A","TILE IT'S","STANDING ON."],["IF YOUR NUMBER","DROPS,","STOP WALKING."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#07080b');glow(300,1650,500,'rgba(120,160,255,1)',.10);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.025);ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f1ebdd');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('NIGHT RULES',-330,-360,'900 76px MS','#1b1d23','left');line(-330,-336,120,-344,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 42px MS',j===2?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+40,420,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— D.',300,430,'800 40px MS','#3b3d44');ctx.restore();}
// ---------- the mat: cutaway ----------
function matDiagram(t,o={}){fillAll('#090e1a');const p=o.press??0;
  label('UNDER THE GALLERY FLOOR',540,430,{font:'800 34px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:60,a:o.lab??1});
  // boot pressing
  const by=880+p*26;fillRR(380,by-330,300,240,30,'#3a4766');fillRR(330,by-130,420,130,50,'#2a3350');fillRR(300,by-30,500,44,14,'#475578');text('STEP',540,by-210,'900 56px MS','#fff');
  // floor layers
  const y=930+p*12;fillRR(120,y,840,60,8,'#3a5078');for(let i=0;i<6;i++)line(120+i*168,y,120+i*168,y+60,3,'rgba(0,0,0,.3)');text('TILE',200,y+30,'800 26px MS','#cfe0ff');
  const m=y+70;fillRR(120,m,840,50,8,'#caa23b');text('PRESSURE MAT',540,m+25,'800 28px MS','#14110a');
  fillRR(120,m+60,840,110,8,'#16233d');for(let i=0;i<14;i++){const x=150+i*57;line(x,m+60,x+24,m+170,4,'rgba(255,255,255,.1)');}
  // wire to readout
  ctx.strokeStyle=FK.gold;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(900,m+25);ctx.lineTo(1000,m+25);ctx.lineTo(1000,1380);ctx.lineTo(760,1380);ctx.stroke();
  if(p>0){for(let j=0;j<5;j++){const q=fract(t*.8+j/5);circ(lerp(900,1000,clamp(q*2)),m+25,6,'#fff',.9*Math.sin(q*Math.PI));}}
  readout(540,1380,o.kg??81,{k:'GALLERY 3 · TILE 214',w:420,h:190,fs:96});}
// ---------- CCTV frame ----------
function cctv(t,fn,o={}){fillAll('#060810');fillRR(70,o.top??260,940,o.h??860,20,'#0a0f1b');ctx.save();rr(90,(o.top??260)+20,900,(o.h??860)-40,14);ctx.clip();ctx.translate(90,(o.top??260)+20);fn();ctx.restore();
  for(let y=(o.top??260)+20;y<(o.top??260)+(o.h??860)-20;y+=6)line(90,y,990,y,1,'rgba(0,0,0,.25)');text(o.cam||'CAM 01 · LOBBY',130,(o.top??260)+60,'500 30px PM','rgba(190,255,220,.8)','left');}
function door(x,y,h,o={}){fillRR(x-h*.32,y-h,h*.64,h,8,'#1a2438');fillRR(x-h*.28,y-h*.95,h*.56,h*.93,5,'rgba(110,160,230,.25)');text('EXIT',x,y-h-30,'800 40px MS','#6cf0ae');glow(x,y-h-30,120,'rgba(100,255,170,1)',.3);}
// ---------- radio ----------
function radio(t,o={}){fillAll('#07090f');ctx.fillStyle=vgrad(0,1920,[[0,'#0c1220'],[1,'#05070a']]);ctx.fillRect(-80,-80,1240,2080);glow(540,1250,800,'rgba(80,255,160,1)',.14);
  me({x:540,y:2300,h:1950,brow:o.brow||'scared',mouth:o.mouth||'open',look:o.look||{x:.8,y:.7},armR:[.1,.1],armL:[.1,.1]});
  ctx.save();ctx.translate(830,1290);ctx.rotate(-.08);fillRR(-190,-230,380,520,30,'#1b1e26');line(120,-230,120,-430,14,'#111318');fillRR(-160,-195,320,150,14,'#0e2a1c');waveform(0,-120,280,110,t,o.radio??1,'#5cf2a2',13);circ(130,-10,15,'#5cf2a2');for(let i=0;i<6;i++)line(-140,30+i*22,70,30+i*22,7,'#111318');ctx.restore();}
