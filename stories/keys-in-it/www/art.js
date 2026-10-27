// ===================== Keys In It: the loch, the car, the water horse =====================
const KI={red:'#b0201c',redD:'#7a1410',chrome:'#c9ccd2',ink:'#1e1d1a',paper:'#d9d4c6'};
const KSTARS=(()=>{const r=rng(17),a=[];for(let i=0;i<260;i++)a.push([r()*4000-1000,r()*700-600,.6+r()*1.3,.2+r()*.7]);return a;})();
// a vintage car, side view, facing right; ground at y
function oldCar(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(o.beam){const g=ctx.createLinearGradient(230,-90,900,-40);g.addColorStop(0,'rgba(255,240,200,.45)');g.addColorStop(1,'rgba(255,240,200,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(226,-100);ctx.lineTo(950,-200);ctx.lineTo(950,40);ctx.lineTo(226,-70);ctx.fill();}
  ctx.fillStyle=KI.red;ctx.beginPath();ctx.moveTo(-250,-50);ctx.quadraticCurveTo(-260,-130,-170,-140);ctx.lineTo(-120,-142);ctx.quadraticCurveTo(-60,-230,40,-232);ctx.quadraticCurveTo(120,-230,150,-150);ctx.lineTo(210,-140);ctx.quadraticCurveTo(250,-130,250,-60);ctx.lineTo(250,-40);ctx.lineTo(-250,-40);ctx.closePath();ctx.fill();
  for(const wx of[-160,150]){ctx.fillStyle=KI.redD;ctx.beginPath();ctx.arc(wx,-48,62,Math.PI,0);ctx.fill();}
  ctx.fillStyle='#1b2533';ctx.beginPath();ctx.moveTo(-96,-146);ctx.quadraticCurveTo(-50,-212,30,-214);ctx.lineTo(30,-146);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(44,-146);ctx.lineTo(44,-214);ctx.quadraticCurveTo(110,-210,130,-150);ctx.closePath();ctx.fill();
  if(o.wet){ctx.fillStyle='rgba(160,200,230,.25)';for(let k=0;k<6;k++)ctx.fillRect(-80+k*30,-200+((o.t||0)*60+k*37)%60,3,14);}
  line(-250,-46,250,-46,6,KI.chrome);fillRR(236,-110,18,26,6,'#fff3cf');if(o.beam)glow(250,-98,90,'rgba(255,240,200,1)',.5);fillRR(-256,-104,10,20,3,'#7a0000');
  line(36,-146,36,-50,3,'rgba(0,0,0,.35)');fillRR(8,-120,26,8,3,KI.chrome);
  for(const wx of[-160,150]){circ(wx,-40,48,'#0b0c0f');circ(wx,-40,30,'#e9e6dc');circ(wx,-40,18,KI.chrome);}
  if(o.exhaust){for(let i=0;i<10;i++){const k=fract((o.t||0)*.4+i/10);circ(-270-k*120,-50-k*60,10+k*40,'#d6dde8',.18*(1-k));}}
  ctx.restore();}
function lochBG(cam,t){wl(cam,.15,()=>{const g=ctx.createLinearGradient(0,-800,0,600);g.addColorStop(0,'#02040a');g.addColorStop(1,'#141d2c');ctx.fillStyle=g;ctx.fillRect(-2000,-1500,6000,3500);for(const[x,y,r,a]of KSTARS)circ(x,y,r,'#e9eefc',a);circ(1350,-80,40,'#ece6d6');glow(1350,-80,200,'rgba(240,235,220,1)',.3);});
  wl(cam,.35,()=>{poly([-1200,560,-600,140,-200,360,300,60,800,330,1300,120,1900,380,2600,200,3200,560],'#0a0f18');});
  wl(cam,.6,()=>{poly([-1200,600,-400,330,200,500,700,360,1400,520,2100,380,3000,600],'#070b12');});}
function loch(cam,t,o){lochBG(cam,t);
  wl(cam,1,()=>{// water on the right, shore on the left
    const g=ctx.createLinearGradient(0,560,0,1300);g.addColorStop(0,'#0e1726');g.addColorStop(1,'#05080e');ctx.fillStyle=g;ctx.fillRect(-1000,560,4000,1200);
    for(let k=0;k<30;k++){const y=580+k*22;line(-1000,y+Math.sin(t+k)*3,3000,y+Math.sin(t*1.3+k*2)*3,1.5,`rgba(140,170,210,${.06+.03*Math.sin(t*2+k)})`);}
    for(let k=0;k<14;k++)ell(1350+Math.sin(t*1.5+k)*10,600+k*26,60-k*3,4,0,'rgba(236,230,214,.35)');// moon on the water
    ctx.fillStyle='#1a1916';ctx.beginPath();ctx.moveTo(-1000,620);ctx.lineTo(820,640);ctx.quadraticCurveTo(980,700,940,1300);ctx.lineTo(-1000,1300);ctx.fill();
    for(let i=0;i<400;i++){circ(-1000+hash(i)*1900,650+hash(i*3)*600,2+hash(i*7)*3,hash(i*5)>.5?'#2a2824':'#12110f');}
    if(o.mist){for(let i=0;i<8;i++){const x=((i*400+t*30)%3200)-900;ell(x,640+Math.sin(i)*40,420,50,0,'rgba(200,210,225,.08)');}}
    if(o.car){const a=o.carA??1;ctx.save();ctx.globalAlpha=a;oldCar(o.carX??640,780,1.15,{beam:o.beam,exhaust:o.exhaust,t,wet:o.wet});ctx.restore();}
    if(o.you){YOU(Object.assign({x:620,y:860,h:360,face:1,eyes:1},o.you));}
    if(o.splash){for(let i=0;i<20;i++){const k=o.splash;const a=i/20*Math.PI;circ(1000+Math.cos(a)*200*k,700-Math.sin(a)*160*k,8,'#c9d6e6',.6*(1-k));}}});
  vign(.4);}
// ---------- the old woodcut ----------
function paper(){ctx.fillStyle=KI.paper;ctx.fillRect(-900,-600,3720,2280);for(let i=0;i<900;i++){ctx.fillStyle=hash(i)>.5?'rgba(60,50,40,.06)':'rgba(255,255,255,.06)';ctx.fillRect(hash(i*3)*3720-900,hash(i*7)*2280-600,3+hash(i)*6,3+hash(i*9)*6);}ctx.strokeStyle=KI.ink;ctx.lineWidth=8;ctx.strokeRect(70,50,1780,980);}
function hatch(x0,y0,x1,y1,gap=14){ctx.save();ctx.beginPath();ctx.rect(x0,y0,x1-x0,y1-y0);ctx.clip();ctx.strokeStyle='rgba(30,29,26,.5)';ctx.lineWidth=2;for(let x=x0-400;x<x1;x+=gap){ctx.beginPath();ctx.moveTo(x,y1);ctx.lineTo(x+400,y0);ctx.stroke();}ctx.restore();}
function horse(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s*(o.face||1),s);const C=o.col||KI.ink,ph=o.gallop;
  // legs (thin, with hooves)
  for(const[lx,k]of[[-110,0],[-80,1],[95,2],[125,3]]){const a=ph!=null?Math.sin(ph+k*1.6)*.55:0;ctx.save();ctx.translate(lx,-125);ctx.rotate(a);fillRR(-8,0,16,72,7,C);ctx.save();ctx.translate(0,68);ctx.rotate(ph!=null?Math.max(0,-Math.sin(ph+k*1.6))*.9:0);fillRR(-7,0,14,58,6,C);fillRR(-10,52,22,12,3,C);ctx.restore();ctx.restore();}
  // body
  ctx.fillStyle=C;ctx.beginPath();ctx.moveTo(-150,-150);ctx.bezierCurveTo(-150,-215,-40,-205,40,-205);ctx.bezierCurveTo(110,-205,150,-195,160,-160);ctx.bezierCurveTo(165,-120,120,-110,60,-112);ctx.lineTo(-90,-112);ctx.bezierCurveTo(-140,-112,-155,-125,-150,-150);ctx.fill();
  // neck rising forward, head angled down
  ctx.beginPath();ctx.moveTo(110,-200);ctx.lineTo(150,-170);ctx.lineTo(235,-300);ctx.lineTo(195,-330);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.moveTo(190,-335);ctx.quadraticCurveTo(230,-345,300,-285);ctx.quadraticCurveTo(312,-268,295,-258);ctx.quadraticCurveTo(260,-262,228,-290);ctx.closePath();ctx.fill();
  poly([200,-332,206,-366,218,-334],C);poly([214,-330,224,-360,230,-328],C);
  // mane + tail
  ctx.strokeStyle=C;ctx.lineWidth=6;for(let k=0;k<6;k++){ctx.beginPath();ctx.moveTo(190-k*14,-330+k*24);ctx.quadraticCurveTo(170-k*14,-320+k*24,160-k*14,-300+k*24);ctx.stroke();}
  ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(-148,-170);ctx.quadraticCurveTo(-200,-140+(ph!=null?Math.sin(ph)*20:0),-190,-50);ctx.stroke();
  if(o.saddle){ctx.fillStyle='#6a4a2a';ctx.beginPath();ctx.moveTo(-50,-205);ctx.quadraticCurveTo(0,-235,50,-205);ctx.lineTo(40,-190);ctx.lineTo(-40,-190);ctx.fill();line(0,-195,0,-120,4,'#6a4a2a');}
  if(o.eye)circ(240,-306,5,'#f4efe2');
  if(o.rider){person({x:-5,y:-185,h:190,face:1,body:'#4a4a44',legs:'#3a3a34',head:'#4a4a44',hand:'#4a4a44',legA:[1.2,1.0],legB:[.3,.2],lift:20,lean:-.35,armL:-2.7,armR:-2.5});}
  ctx.restore();}
function woodcut(cam,t,o){wl(cam,1,()=>{paper();
  // hills + loch
  ctx.fillStyle='rgba(30,29,26,.85)';poly([110,520,400,300,700,440,1000,260,1300,420,1600,300,1810,460,1810,560,110,560],'rgba(30,29,26,.85)');hatch(110,560,1810,1000,18);
  ctx.fillStyle=KI.paper;ctx.fillRect(110,560,700,440);hatch(110,560,810,1000,40);
  for(let k=0;k<8;k++)line(900+k*20,600+k*48,1780,600+k*48,3,'rgba(30,29,26,.6)');
  const r=o.ride||0;
  if(o.horse){const hx=lerp(520,1450,ss(r)),sink=r>.6?(r-.6)/.4*320:0;ctx.save();ctx.beginPath();ctx.rect(70,50,1780,r>.45?820-50:950);ctx.clip();
    horse(hx,900+sink,1.2,{saddle:o.saddle,eye:1,gallop:r>0?t*12:null,rider:o.rider});ctx.restore();
    if(r>.5){for(let i=0;i<16;i++){const a=i/16*Math.PI;line(hx,820,hx+Math.cos(a)*200*(r-.4),820-Math.sin(a)*160*(r-.4),5,KI.ink);}}}
  if(o.ripples){for(let k=1;k<5;k++){ctx.strokeStyle=`rgba(30,29,26,${.6-k*.1})`;ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(1400,820,k*70+fract(t*.4)*60,k*14+fract(t*.4)*12,0,0,7);ctx.stroke();}}
  if(o.child){horse(1250,900,1.15,{eye:1,face:-1});person({x:860,y:920,h:300,face:1,body:'#3a3a36',legs:'#2a2a26',head:KI.ink,hand:KI.ink,armL:-1.9,elbowL:.2});
    if(o.stuck){text('STUCK',960,560,'500 34px PM','#7a1410');line(960,575,960,640,3,'#7a1410');}}
  if(o.caption)text(o.caption,960,150,'italic 400 56px IS',KI.ink);});vign(.25);}
// ---------- inside the car ----------
function interior(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#0a0b0d';ctx.fillRect(-900,-600,3720,2280);
  // windshield with the loch
  ctx.save();ctx.beginPath();ctx.moveTo(300,60);ctx.lineTo(1620,60);ctx.lineTo(1720,420);ctx.lineTo(200,420);ctx.closePath();ctx.clip();const g=ctx.createLinearGradient(0,60,0,420);g.addColorStop(0,'#060a14');g.addColorStop(1,'#16223a');ctx.fillStyle=g;ctx.fillRect(200,60,1520,360);
  ctx.fillStyle='#0d1420';ctx.fillRect(200,300,1520,120);if(o.beam){const g2=ctx.createLinearGradient(0,300,0,420);g2.addColorStop(0,'rgba(255,240,200,.05)');g2.addColorStop(1,'rgba(255,240,200,.3)');ctx.fillStyle=g2;ctx.beginPath();ctx.moveTo(700,420);ctx.lineTo(900,300);ctx.lineTo(1000,300);ctx.lineTo(1300,420);ctx.fill();}
  for(let k=0;k<8;k++)line(200,310+k*14,1720,310+k*14,1.5,'rgba(140,170,210,.12)');ctx.restore();
  // dashboard, radio, wheel
  fillRR(100,400,1720,260,30,'#5a1210');fillRR(140,430,1640,40,10,'#7a1410');
  fillRR(820,500,280,110,14,'#16110e');ctx.save();rr(836,514,248,82,8);ctx.clip();ctx.fillStyle='#0c1a14';ctx.fillRect(836,514,248,82);ctx.strokeStyle='#5fd0a0';ctx.lineWidth=3;ctx.beginPath();for(let x=840;x<1080;x+=4){const y=555+Math.sin(x*.06+t*5)*12*Math.sin(x*.013+t);x===840?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();ctx.restore();text('~ WATER ~',960,640,'500 18px PM','rgba(95,208,160,.7)');
  ctx.save();ctx.strokeStyle='#1a1410';ctx.lineWidth=34;ctx.beginPath();ctx.arc(480,640,230,Math.PI*1.05,Math.PI*1.95);ctx.stroke();ctx.restore();
  // keys in the ignition
  fillRR(680,560,16,40,4,KI.chrome);ctx.save();ctx.translate(688,600);ctx.rotate(Math.sin(t*3)*.15);line(0,0,0,50,3,KI.chrome);circ(0,62,14,'#c9b060');ctx.restore();
  // the seat, soaking wet
  fillRR(300,700,700,500,60,'#6a1814');fillRR(330,720,640,180,40,'#7a1c18');ctx.fillStyle='rgba(150,190,220,.28)';ctx.beginPath();ctx.ellipse(650,800,230,60,0,0,7);ctx.fill();
  for(let k=0;k<6;k++){const y=700+((t*200+k*90)%400);circ(420+k*90,y,4,'#a8c4dc',.7);}
  // gear stick: P..D
  const gx=1300,gy=760,gp=o.gear||0;fillRR(gx-60,gy,120,180,10,'#16110e');for(const[k,l]of[[0,'P'],[1,'R'],[2,'N'],[3,'D']])text(l,gx+80,gy+30+k*40,'500 26px PM',Math.round(gp*3)===k?'#ff3b30':'#666','left');
  const ky=lerp(gy+20,gy+140,gp);line(gx,ky,gx,ky-200,18,'#2a2a2a');circ(gx,ky-210,34,'#111');
  // the door, open on the left
  if(o.door){poly([-900,-600,100,40,100,1200,-900,1680],'#5a1210');line(100,40,100,1200,8,'#3a0c0a');}});vign(.45);}
// ---------- my hand on the door ----------
function handDoor(cam,t,o){wl(cam,1,()=>{const g=ctx.createLinearGradient(0,-600,0,1700);g.addColorStop(0,'#c0261f');g.addColorStop(1,'#6a110d');ctx.fillStyle=g;ctx.fillRect(-900,-600,3720,2280);
  glow(700,200,700,'rgba(255,220,200,1)',.12);line(-900,880,2820,880,10,KI.chrome);
  // the paint around the palm pulls like skin
  const st=o.stick||0;ctx.strokeStyle=`rgba(60,8,6,${.6*st})`;ctx.lineWidth=4;for(let k=0;k<14;k++){const a=k/14*6.283;ctx.beginPath();ctx.moveTo(960+Math.cos(a)*220,520+Math.sin(a)*170);ctx.quadraticCurveTo(960+Math.cos(a+.2)*300,520+Math.sin(a+.2)*230,960+Math.cos(a)*360,520+Math.sin(a)*280);ctx.stroke();}
  ell(960,520,250*(1+.04*st*Math.sin(t*3)),190,0,`rgba(255,120,110,${.12*st})`);
  // hand
  const pull=o.pull||0;ctx.save();ctx.translate(lerp(0,-40,pull*Math.abs(Math.sin(t*6))),0);ell(980,600,180,150,0,'#c99a7a');for(let k=0;k<4;k++)fillRR(820+k*90,300,72,260,36,'#d4a684');fillRR(1110,480,170,70,35,'#d4a684');
  line(980,740,1300,1200,180,'#262a33');ctx.restore();
  if(o.knife){const k=o.knife;ctx.save();ctx.translate(1550,900);ctx.rotate(-.5);fillRR(-40,-20,220,40,12,'#3a3a3a');ctx.save();ctx.translate(0,0);ctx.rotate(lerp(Math.PI,0,k));fillRR(-200,-12,200,24,4,'#d9dde2');ctx.restore();circ(0,0,10,'#888');ctx.restore();ell(1720,960,120,90,-.4,'#c99a7a');}});vign(.45);}
function vign(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
