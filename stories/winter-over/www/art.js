// ===================== Winter-Over: places and things (v2, 1080x1920) =====================
const WO={red:'#c8322a',redD:'#8f1f1a',ice:'#cfe3ff',snow:'#dfe9f7',led:'#5cf2a2',ledR:'#ff4d3d',amber:'#ffb14a',sky0:'#02040c',sky1:'#0a1430',aur:'80,255,170'};
const STARS=(()=>{const r=rng(17),a=[];for(let i=0;i<340;i++)a.push([r()*1200-60,r()*1300-60,r()<.08?2.6:1.3,.25+r()*.6]);return a;})();
function T2(s,x,y,size,col='#fff',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
// polar night sky with an aurora
function polarSky(t,o={}){const hz=o.hz??1150;ctx.fillStyle=vgrad(-80,hz,[[0,WO.sky0],[.7,WO.sky1],[1,'#1a2a4a']]);ctx.fillRect(-100,-100,1280,hz+120);
  for(const[x,y,r,a]of STARS)if(y<hz-30)circ(x,y,r,'#eef3ff',a*(.75+.25*Math.sin(t*2+x)));
  const A=o.aur??1;if(A>0){ctx.save();ctx.globalCompositeOperation='lighter';for(let b=0;b<3;b++){ctx.beginPath();const y0=300+b*110;
      for(let i=0;i<=40;i++){const x=-80+i*31,y=y0+Math.sin(i*.35+t*.4+b)*70+Math.sin(i*.13-t*.25)*50;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
      for(let i=40;i>=0;i--){const x=-80+i*31,y=y0+Math.sin(i*.35+t*.4+b)*70+Math.sin(i*.13-t*.25)*50+190+Math.sin(i*.5+t)*40;ctx.lineTo(x,y);}ctx.closePath();
      ctx.fillStyle=vgrad(y0-120,y0+260,[[0,`rgba(${WO.aur},0)`],[.5,`rgba(${WO.aur},${.16*A})`],[1,`rgba(${WO.aur},0)`]]);ctx.fill();}ctx.restore();}
  // ice plateau
  ctx.fillStyle=vgrad(hz,1960,[[0,'#2a3a5a'],[1,'#121a2c']]);ctx.fillRect(-100,hz,1280,1000);}
// the elevated station: a long box on stilts, lit windows
function station(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  for(let i=0;i<9;i++)fillRR(-520+i*130,-40,22,140,4,'#2b3346');
  fillRR(-560,-250,1120,220,14,'#7d8aa3');fillRR(-560,-250,1120,30,10,'#97a4bd');
  for(let i=0;i<14;i++){const lit=(o.dark&&i>5)?0:hash(i*7.3)>.25?1:0;fillRR(-530+i*78,-180,48,64,6,lit?'#ffd88a':'#1b2233');if(lit)glow(-506+i*78,-148,60,'rgba(255,210,130,1)',.25);}
  fillRR(-560,-60,1120,26,6,'#4a556d');
  // tall tower on the end + flag
  fillRR(420,-420,110,180,10,'#6f7c96');line(475,-420,475,-560,6,'#cfd6e3');poly([478,-560,560,-540,478,-520],WO.red);
  text('SOUTH POLE',-200,-280,'900 46px MS','rgba(220,230,255,.55)');ctx.restore();}
// a flag on a bamboo pole (flag lines mark safe routes on the ice)
function flagPole(x,y,s,t,col='#1a1a1a',seed=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);line(0,0,0,-260,8,'#c9a96a');
  const w=Math.sin(t*6+seed)*14;ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(2,-258);ctx.quadraticCurveTo(60,-250+w*.4,110,-236+w);ctx.lineTo(108,-190+w);ctx.quadraticCurveTo(60,-200+w*.4,2,-200);ctx.closePath();ctx.fill();ctx.restore();}
// the flag line stretching away into the dark. o.fig = figure at distance index, o.light
function flagLine(t,o={}){polarSky(t,{hz:1000,aur:o.aur??.8});
  const sh=shakeAt(t,o.shake??0,.4);ctx.save();ctx.translate(sh.x,sh.y);
  // drifting snow streaks
  for(let i=0;i<10;i++){const k=i/10,z=Math.pow(1-k,1.6);const y=1000+z*900,x=540+(i%2?1:-1)*lerp(40,330,z),sc=lerp(.25,1.8,z);flagPole(x,y,sc,t,i%3===2?'#2a7a3a':'#151515',i);}
  if(o.fig){const z=o.figZ??.2,y=1000+z*900,x=540+lerp(40,330,z)*-.2,h=lerp(120,700,z);ctx.save();ctx.globalAlpha=o.fig;
    if(o.figHat==='beanie'){toon({x,y,h,jacket:WO.red,hat:'beanie',hatCol:'#f0683f',skin:'#a9b3c8',browCol:'#4a2e1f',tag:'COMMS',brow:'flat',mouth:'smile',look:{x:0,y:0},armR:[.1,.1],armL:[.1,.1]});
      ctx.save();ctx.globalCompositeOperation='lighter';for(const sx of[-1,1])glow(x+sx*.062*h,y-.835*h,.05*h,'rgba(200,230,255,1)',.5*(o.glint??0));ctx.restore();}
    else toon({x,y,h,jacket:WO.red,hat:o.figHat||'helm',hatCol:o.figHatCol||'#222833',blank:true,stripe:true,armR:[o.wave?1.6+Math.sin(t*5)*.3:.1,o.wave?.4:.1],armL:[.1,.1],glint:o.glint??0});ctx.restore();}
  if(o.beam)beam(o.beamX??540,1960,o.beamA??0,1200,260,.22*o.beam);
  snow(t,7,140,{fall:60,wind:-420,a:.6,scale:1.2});ctx.restore();}
// me: comms tech, orange beanie, red station fleece
function me(o){toon(Object.assign({jacket:WO.red,hat:'beanie',hatCol:'#f0683f',tag:'COMMS',skin:'#e9b896',browCol:'#4a2e1f',pants:'#232634'},o));}
function jo(o){toon(Object.assign({jacket:'#2f5d8a',hat:'helm',hatCol:'#c9c4bb',tag:'JO\nMANAGER',skin:'#d9a27c',browCol:'#9a948c',pants:'#1f2430'},o));}
// the headcount board: big number + 41 badge cells
function board(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  fillRR(-470,-420,940,840,30,'#0d1118');fillRR(-450,-400,900,800,22,'#060a0f');glow(0,0,700,o.bad?'rgba(255,60,50,1)':'rgba(92,242,162,1)',.12);
  T2('HEADCOUNT · 20:00',0,-345,40,'rgba(200,230,255,.6)',{w:800,f:'PM'});
  const n=o.n??41,bad=n!==40;T2(String(n),-110,-170,230,bad?WO.ledR:WO.led,{w:900});T2('/ 40',170,-130,90,'rgba(200,230,255,.55)',{w:900});
  // badge grid: 41 cells (the last one is the extra)
  for(let i=0;i<n;i++){const c=i%9,r=Math.floor(i/9);const cx=-360+c*90,cy=20+r*72;const extra=i===40;const fl=extra?(.6+.4*Math.sin(t*9)):1;
    const col=extra?WO.ledR:(o.hl===i?WO.amber:WO.led);fillRR(cx-34,cy-26,68,52,8,col);ctx.globalAlpha=fl;if(extra)glow(cx,cy,80,'rgba(255,60,50,1)',.6);ctx.globalAlpha=1;
    circ(cx,cy-6,10,'rgba(0,0,0,.35)');fillRR(cx-16,cy+6,32,12,6,'rgba(0,0,0,.35)');}
  ctx.restore();}
// the comms room: desk, monitors, radio; the board on the wall
function commsRoom(t,o={}){fillAll('#090c12');ctx.fillStyle=vgrad(0,1920,[[0,'#0e1420'],[1,'#06080c']]);ctx.fillRect(-100,-100,1280,2120);
  // small round-cornered window: polar night outside
  fillRR(80,220,330,420,30,'#0a1430');ctx.save();rr(80,220,330,420,30);ctx.clip();ctx.translate(80,220);ctx.scale(.31,.31);polarSky(t,{hz:1000});
  if(o.winFig)for(let i=0;i<5;i++)flagPole(700+i*120,1000+i*60,.5+i*.15,t,'#151515',i);ctx.restore();line(80,430,410,430,6,'#1b2230');
  board(720,520,o.bs??.48,t,{n:o.n??41,hl:o.hl});
  if(o.fig)o.fig();
  // the desk
  fillRR(-60,1380,1200,60,8,'#3a3026');ctx.fillStyle='#120f0c';ctx.fillRect(-60,1440,1200,600);
  // radio
  fillRR(760,1250,260,140,16,'#1b1e26');fillRR(780,1270,220,70,10,o.radio?'#0e2a1c':'#0b1712');if(o.radio)waveform(890,1305,190,50,t,o.radio,WO.led,12);else text('CH 1',890,1316,'800 28px MS','#2f6b4a');
  if(o.radio)glow(890,1300,260,'rgba(80,255,160,1)',.22*o.radio);}
// rules card
const RULES=[["FORTY BADGES,","EVERY NIGHT,","BY 8:00."],["NEVER GO PAST","THE FLAG LINE","ALONE."],["IF THE COUNT IS WRONG,","LOCK YOUR DOOR","AND WAIT FOR ME."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#07090d');glow(300,1650,500,'rgba(255,90,60,1)',.08);glow(900,1600,420,`rgba(${WO.aur},1)`,.06);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.02);
  ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f1ebdd');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('WINTER RULES',-330,-360,'900 76px MS','#1b1d23','left');line(-330,-330,160,-338,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 42px MS',j===2?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+40,420,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— JO',290,430,'800 40px MS','#3b3d44');
  if(o.q>0){ctx.save();ctx.globalAlpha=o.q;ctx.translate(250,430);ctx.rotate(.12);ctx.strokeStyle='#e0362a';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(40,0,110,56,0,0,7);ctx.stroke();text('?',190,-10,'900 120px MS','#e0362a');ctx.restore();}
  ctx.restore();}
// a corridor with crew in doorways; o.k = how many counted, o.n total faces
function corridor(t,o={}){fillAll('#0b0e14');const vx=540,vy=760;
  // floor, ceiling, walls in one-point perspective
  poly([-80,1920,1160,1920,vx+90,vy+130,vx-90,vy+130],'#2a2f3a');poly([-80,-80,1160,-80,vx+90,vy-130,vx-90,vy-130],'#151a24');
  poly([-80,-80,vx-90,vy-130,vx-90,vy+130,-80,1920],'#1d2330');poly([1160,-80,vx+90,vy-130,vx+90,vy+130,1160,1920],'#1a202c');
  fillRR(vx-90,vy-130,180,260,4,'#05070a');
  for(let i=0;i<6;i++){const z=Math.pow(.62,i);const y0=lerp(vy-130,-80,z),y1=lerp(vy+130,1920,z);const xl=lerp(vx-90,-80,z),xr=lerp(vx+90,1160,z);
    line(xl,y0,xr,y0,Math.max(2,10*z),'rgba(255,240,210,'+(.25*z+.05)+')');glow((xl+xr)/2,y0+8,300*z,'rgba(255,230,190,1)',.12*z);}
  // crew standing along the hall, numbered as counted
  const P=[[250,1640,620],[840,1560,520],[380,1220,330],[700,1150,280],[480,1000,190],[610,960,160]];
  P.forEach(([x,y,h],i)=>{toon({x,y,h,jacket:['#2f5d8a','#5a7a3a','#7a3d6a','#8a6a2f','#3d6a7a','#6a4a3a'][i],hat:i%2?'cap':'helm',hatCol:['#3a2a20','#202838','#a0a0a0','#3a2a20','#d0c080','#202020'][i],skin:['#e7b48f','#c98e6a','#f0c7a4','#a8714f','#e7b48f','#d9a27c'][i],brow:'flat',mouth:i===1?'smile':'flat',look:{x:(540-x)/700,y:.3},stripe:false,tag:o.tags?['ENG','MED','COOK','IT','SCI','FUEL'][i]:null});
    const c=o.count?o.count[i]:0;if(c>0)label(String(o.num0+i),x,y-h*1.07,{font:`900 ${Math.round(lerp(26,54,h/620))}px MS`,a:c,bg:'rgba(255,201,60,.95)',col:'#14110a'});});}
// the badge log screen
function logScreen(t,o={}){fillAll('#050a08');ctx.save();ctx.globalAlpha=.08;for(let y=0;y<1920;y+=6)line(-80,y,1160,y,2,'#5cf2a2');ctx.restore();
  T2('BADGE LOG · TONIGHT',80,250,46,WO.led,{align:'left',f:'PM',w:500});line(80,290,1000,290,3,'rgba(92,242,162,.4)');
  const L=[['19:52','GALLEY','KIM'],['19:54','LAB','ORTEGA'],['19:55','GYM','PATEL'],['19:58','GALLEY','JO'],['19:59','OUTSIDE · FLAG LINE',o.who||'JO']];
  L.forEach(([tm,pl,nm],j)=>{const a=o.rows?o.rows[j]:1;if(a<=0)return;const y=420+j*150;const hot=j===4,dup=j===3&&o.dup;
    ctx.save();ctx.globalAlpha=a;if(hot){fillRR(50,y-60,980,120,12,'rgba(255,60,50,.16)');ctx.strokeStyle=WO.ledR;ctx.lineWidth=4;rr(50,y-60,980,120,12);ctx.stroke();}
    if(dup){ctx.strokeStyle=WO.amber;ctx.lineWidth=4;rr(50,y-60,980,120,12);ctx.stroke();}
    T2(tm,80,y,46,hot?WO.ledR:'rgba(170,240,200,.8)',{align:'left',f:'PM',w:500});T2(pl,300,y,hot?36:42,hot?WO.ledR:WO.led,{align:'left',f:'PM',w:500});
    T2(nm,1000,y,52,hot?(o.mine?WO.amber:WO.ledR):(dup?WO.amber:'#e9f6ef'),{align:'right',w:900});ctx.restore();});
  if(o.cursor)fillRR(80,1240,30,50,2,WO.led);}
// me close at the desk, Jo in the doorway behind
function behind(t,o={}){fillAll('#080a10');ctx.fillStyle=vgrad(0,1920,[[0,'#121826'],[1,'#06080c']]);ctx.fillRect(-100,-100,1280,2120);
  // doorway, lit corridor behind
  fillRR(560,220,380,980,6,'#d8c9a8');glow(750,700,600,'rgba(255,220,170,1)',.25);fillRR(560,220,380,980,6,'rgba(255,230,190,.25)');
  ctx.strokeStyle='#2a2f3a';ctx.lineWidth=24;ctx.strokeRect(560,220,380,980);
  ctx.save();ctx.globalAlpha=o.jo??1;jo({x:750,y:1200,h:900,brow:o.joBrow||'flat',mouth:o.joMouth||'flat',look:{x:-.3,y:.4},armR:[o.point?1.3:.1,o.point?.2:.1]});ctx.restore();
  me({x:300,y:2500,h:2100,brow:o.brow||'scared',mouth:o.mouth||'o',look:{x:.9,y:-.2},armR:[.1,.1],armL:[.1,.1]});}
// a badge card
function badge(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.rot||0);fillRR(-170,-230,340,460,24,'#f3f1ea');fillRR(-170,-230,340,90,24,WO.red);ctx.fillStyle=WO.red;ctx.fillRect(-170,-170,340,30);
  T2('USAP · SOUTH POLE',0,-188,24,'#fff',{w:900});fillRR(-110,-120,220,190,14,'#cdd6e3');
  ctx.save();rr(-110,-120,220,190,14);ctx.clip();toon({x:0,y:260,h:330,jacket:o.jacket||WO.red,hat:o.hat||'beanie',hatCol:o.hatCol||'#f0683f',skin:'#e9b896',browCol:'#4a2e1f',stripe:false,brow:'flat',mouth:'flat'});ctx.restore();
  T2(o.name||'COMMS TECH',0,120,o.nameSize||40,'#16181d',{w:900});T2(o.sub||'#41 · OUTSIDE',0,175,32,WO.ledR,{w:900});ctx.restore();}
