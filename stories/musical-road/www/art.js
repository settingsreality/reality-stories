// ===================== Musical Road: places and things (v2, 1080x1920) =====================
const MR={vest:'#d8e83a',vestD:'#a9b82a',lamp:'255,236,196',note:'120,220,255',noteC:'#8fe6ff',road:'#1a1c22',sand:'#2a2230'};
const HZ=820,FH=3600; // horizon y, focal*camera height (screen px * m)
const STARS=(()=>{const r=rng(11),a=[];for(let i=0;i<300;i++)a.push([r()*1180-50,r()*820-40,r()<.1?2.6:1.3,.25+r()*.6]);return a;})();
function rY(z){return HZ+FH/z;}             // screen y of road depth z (m)
function rX(z,x){return 540+(FH/z)*x/1.5;}  // screen x of lateral offset x (m) at depth z
function desertSky(o={}){ctx.fillStyle=vgrad(-80,HZ+20,[[0,'#04050d'],[.65,'#0d1026'],[1,'#2a1d3a']]);ctx.fillRect(-80,-80,1240,HZ+100);
  for(const[x,y,r,a]of STARS)if(y<HZ-40)circ(x,y,r,'#eef0ff',a*(o.starA??1));
  // moon sliver
  if(o.moon!==false){circ(860,240,40,'#efe7d2');circ(878,228,38,'#0b0e22');glow(860,240,180,'rgba(230,225,255,1)',.08);}
  // mesas on the horizon
  ctx.fillStyle='#120e1c';ctx.beginPath();ctx.moveTo(-80,HZ+4);ctx.lineTo(-80,HZ-60);ctx.lineTo(90,HZ-64);ctx.lineTo(130,HZ-20);ctx.lineTo(330,HZ-16);ctx.lineTo(360,HZ-92);ctx.lineTo(520,HZ-96);ctx.lineTo(545,HZ-30);
  ctx.lineTo(760,HZ-26);ctx.lineTo(790,HZ-70);ctx.lineTo(980,HZ-74);ctx.lineTo(1010,HZ-18);ctx.lineTo(1160,HZ-14);ctx.lineTo(1160,HZ+4);ctx.fill();}
function joshua(x,y,s,c='#07060c'){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle=c;ctx.lineCap='round';
  ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(4,-120);ctx.moveTo(4,-90);ctx.quadraticCurveTo(-50,-110,-46,-160);ctx.moveTo(4,-120);ctx.quadraticCurveTo(40,-150,52,-190);ctx.moveTo(4,-120);ctx.lineTo(0,-175);ctx.stroke();
  for(const[px,py]of[[-46,-160],[52,-190],[0,-175]])circ(px,py,16,c);ctx.restore();}
// a musical note glyph
function note(x,y,s,c,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ell(0,0,16,11,-.4,c);ctx.fillStyle=c;ctx.fillRect(12,-62,5,62);
  ctx.beginPath();ctx.moveTo(17,-62);ctx.quadraticCurveTo(40,-48,32,-22);ctx.quadraticCurveTo(30,-40,17,-44);ctx.fill();ctx.restore();ctx.globalAlpha=1;}

// ---------- the road ahead from the cab ----------
// o: lights 0..1, gz:[z0,z1] groove zone, lit:[{z, a, foot:-1|1}] glowing grooves/footprints, notes (floating notes from the far end), flow (m/s driving), shake, dash opts
function roadPOV(t,o={}){const sh=shakeAt(t,o.shake??1.2,.5);ctx.save();ctx.translate(sh.x,sh.y);desertSky(o);
  // desert floor
  ctx.fillStyle=vgrad(HZ,1500,[[0,'#1b1424'],[1,'#3a2c33']]);ctx.fillRect(-80,HZ,1240,700);
  const L=o.lights??1;const off=((o.drive||0))%4;
  // road surface
  poly([rX(200,-4.2),rY(200),rX(200,4.2),rY(200),rX(5.2,4.2),rY(5.2),rX(5.2,-4.2),rY(5.2)],MR.road);
  // the groove zone: lighter asphalt with fine transverse grooves
  const gz=o.gz||[9,260];
  poly([rX(gz[1],-1.9),rY(gz[1]),rX(gz[1],1.9),rY(gz[1]),rX(gz[0],1.9),rY(gz[0]),rX(gz[0],-1.9),rY(gz[0])],'#262932');
  for(let z=gz[0];z<gz[1];z+=.45){const zz=z-off*.45;if(zz<gz[0])continue;const y=rY(zz);if(y-rY(zz+.45)<2.2)break;line(rX(zz,-1.9),y,rX(zz,1.9),y,Math.max(1,6/zz*4),'rgba(0,0,0,.55)');}
  // painted edge lines + dashed centre... the grooved lane is the right one
  line(rX(200,-4),rY(200),rX(5.2,-4),rY(5.2),5,'rgba(230,220,200,.35)');line(rX(200,4),rY(200),rX(5.2,4),rY(5.2),5,'rgba(230,220,200,.35)');
  for(let k=0;k<30;k++){const z=6+k*6-((o.drive||0)%6);if(z<5.4)continue;line(rX(z,-2.15),rY(z),rX(z+3,-2.15),rY(z+3),Math.max(1.5,40/z),'rgba(240,200,80,.55)');}
  // roadside joshua trees + the sign
  const R=rng(4);for(let i=0;i<14;i++){const z=12+i*16+R()*8-((o.drive||0)%16);if(z<7)continue;const side=i%2?1:-1;const xo=side*(7+R()*9);joshua(rX(z,xo),rY(z),Math.min(2.2,9/z),'#090710');}
  if(o.sign){const z=o.sign,x=rX(z,-5.2),y=rY(z),s=Math.min(3,14/z);ctx.save();ctx.translate(x,y);ctx.scale(s,s);line(0,0,0,-90,6,'#3a3a3a');fillRR(-62,-150,124,64,6,'#e8e2cf');
    note(-34,-108,.5,'#20232a');text('MUSICAL',16,-122,'900 18px MS','#20232a');text('ROAD',16,-100,'900 18px MS','#20232a');ctx.restore();}
  // headlights
  if(L>0){ctx.save();ctx.globalCompositeOperation='lighter';
    ctx.fillStyle=vgrad(HZ+20,1420,[[0,`rgba(${MR.lamp},${.02*L})`],[1,`rgba(${MR.lamp},${.28*L})`]]);
    ctx.beginPath();ctx.moveTo(rX(5.2,-3.6),rY(5.2));ctx.lineTo(rX(5.2,3.6),rY(5.2));ctx.lineTo(rX(70,3.4),rY(70));ctx.lineTo(rX(70,-3.4),rY(70));ctx.closePath();ctx.fill();
    glow(540,1150,560,`rgba(${MR.lamp},1)`,.12*L);ctx.restore();}
  // lit grooves: something stepping on them
  for(const g of (o.lit||[])){const y=rY(g.z),a=g.a??1;if(a<=0)continue;ctx.save();ctx.globalCompositeOperation='lighter';
    line(rX(g.z,-1.9),y,rX(g.z,1.9),y,Math.max(2,14/g.z*6),`rgba(${MR.note},${.7*a})`);glow(rX(g.z,0),y,Math.max(90,2200/g.z),`rgba(${MR.note},1)`,.55*a);glow(rX(g.z,0),y,Math.max(30,600/g.z),'rgba(255,255,255,1)',.5*a);
    {const ns=Math.max(.55,26/g.z),rise=(1-a)*Math.max(60,1800/g.z);note(rX(g.z,g.foot*.3)+20*ns,y-40*ns-rise,ns,'#cff4ff',Math.min(1,a*1.3));}
    if(g.foot){const fx=rX(g.z,g.foot*.18),fs=Math.max(.15,7/g.z);ell(fx,y-4*fs,10*fs,22*fs,0,`rgba(${MR.note},1)`,.9*a);ell(fx,y-30*fs,8*fs,6*fs,0,`rgba(${MR.note},1)`,.8*a);}
    ctx.restore();}
  // floating notes from the grooves
  if(o.notes){for(let j=0;j<12;j++){const q=fract(t*.18+j/12);const z=lerp(o.notesZ||120,o.notesZ2||30,hash(j*3.1));const x=rX(z,(hash(j)-.5)*3)+Math.sin(t*1.3+j)*20;
      note(x,rY(z)-q*260*(30/z+.4),Math.max(.4,22/z),MR.noteC,o.notes*Math.sin(q*Math.PI)*.9);}}
  // windshield frame
  poly([-80,-80,70,-80,150,1430,-80,1430],'#06070a');poly([1160,-80,1010,-80,930,1430,1160,1430],'#06070a');ctx.fillStyle='#06070a';ctx.fillRect(-80,-80,1240,64);
  poly([200,90,300,90,230,1300,150,1300],'#cfe0ff',.03);
  dash(t,o);ctx.restore();}
function dash(t,o={}){const on=o.dashOn??1;ctx.fillStyle=vgrad(1320,1940,[[0,'#17151b'],[1,'#07060a']]);ctx.beginPath();ctx.moveTo(-80,1430);ctx.quadraticCurveTo(540,1300,1160,1430);ctx.lineTo(1160,2000);ctx.lineTo(-80,2000);ctx.fill();
  // speedometer
  const sp=o.speed??55,gx=540,gy=1590;circ(gx,gy,120,'#0b0b0f');ctx.strokeStyle=`rgba(255,170,70,${.25+.45*on})`;ctx.lineWidth=7;ctx.beginPath();ctx.arc(gx,gy,100,Math.PI*.8,Math.PI*2.2);ctx.stroke();
  for(let k=0;k<=8;k++){const a=Math.PI*.8+Math.PI*1.4*k/8;line(gx+Math.cos(a)*84,gy+Math.sin(a)*84,gx+Math.cos(a)*98,gy+Math.sin(a)*98,4,`rgba(255,190,110,${.3+.5*on})`);}
  const a=Math.PI*.8+Math.PI*1.4*clamp(sp/80);line(gx,gy,gx+Math.cos(a)*86,gy+Math.sin(a)*86,7,'#ffb35a');circ(gx,gy,12,'#2a2a30');
  text(String(Math.round(sp)),gx,gy+70,'900 44px MS',sp<1?'#ff4d3d':`rgba(255,200,120,${.4+.6*on})`);if(on>.1)glow(gx,gy,190,'rgba(255,160,60,1)',.12*on);
  if(o.warn){circ(gx-150,gy-40,16,'#ff3b2f',o.warn);glow(gx-150,gy-40,70,'rgba(255,60,40,1)',.5*o.warn);text('ENGINE',gx-150,gy,'800 22px MS','#ff6a5a',"center",o.warn);}
  // rules card taped on the left
  if(o.card!==false){ctx.save();ctx.translate(180,1560);ctx.rotate(-.08);fillRR(-100,-75,200,150,6,'#efe9db');text('RULES',0,-40,'900 26px MS','#1d1f25');for(let k=0;k<3;k++)line(-70,-8+k*26,64-(k%2)*30,-8+k*26,5,'rgba(40,40,50,.55)');
    ctx.globalAlpha=.7;fillRR(-60,-88,52,22,3,'#d9cfb2');fillRR(18,-88,52,22,3,'#d9cfb2');ctx.globalAlpha=1;ctx.restore();}
  // radio on the right
  fillRR(800,1490,210,130,14,'#1b1e26');fillRR(818,1508,174,62,8,o.radio?'#0e2a1c':'#0b1712');
  if(o.radio)waveform(905,1539,150,46,t,o.radio,'#5cf2a2',12);else text('CREW',905,1550,'800 26px MS','#2f6b4a');
  if(o.radio)glow(905,1540,240,'rgba(80,255,160,1)',.22*o.radio);
  line(820,1960,780,1740,26,'#111015');}

// ---------- grooves diagram: a tire over grooves, spacing = pitch ----------
function grooveDiagram(t,o={}){fillAll('#0b0d14');ctx.save();ctx.globalAlpha=.25;for(let x=0;x<=1080;x+=60)line(x,0,x,1920,1,'#2b3550');for(let y=0;y<=1920;y+=60)line(0,y,1080,y,1,'#2b3550');ctx.restore();
  // asphalt cross-section
  const gy=1180;fillRR(-40,gy,1160,260,0,'#262932');
  const spA=o.spread??1;let x=-20;let i=0;while(x<1120){const w=18;fillRR(x,gy-2,w,40,4,'#0b0c10');x+=lerp(70,38,x/1120)*spA;i++;}
  label('WIDE GAPS = LOW NOTE',260,gy+120,{font:'800 30px MS',a:o.lab??1});label('TIGHT GAPS = HIGH NOTE',820,gy+120,{font:'800 30px MS',a:o.lab??1,bg:'rgba(255,201,60,.95)',col:'#14110a'});
  // tire rolling
  const tx=lerp(150,930,fract(t*.12)),r=170;ctx.save();ctx.translate(tx,gy-r);ctx.rotate(t*2.2);circ(0,0,r,'#15161b');circ(0,0,r*.62,'#3c404a');circ(0,0,r*.25,'#9aa1ad');
  for(let k=0;k<6;k++){const a=k/6*6.283;line(Math.cos(a)*r*.3,Math.sin(a)*r*.3,Math.cos(a)*r*.58,Math.sin(a)*r*.58,10,'#2a2d34');}ctx.restore();
  // sound rising: waves, tighter on the right
  const f=lerp(1,2.4,(tx-150)/780);for(let k=0;k<5;k++){const q=fract(t*1.2+k/5);ctx.strokeStyle=`rgba(${MR.note},${.7*(1-q)})`;ctx.lineWidth=6;ctx.beginPath();ctx.arc(tx,gy-r*2,40+q*260/f,Math.PI*1.15,Math.PI*1.85);ctx.stroke();}
  for(let j=0;j<5;j++){const q=fract(t*.4+j/5);note(tx-120+j*60,gy-2*r-60-q*300,.9,MR.noteC,Math.sin(q*Math.PI));}
  text('MUSICAL ROADS ARE REAL',540,360,'900 64px MS','#ffffff');text('grooves cut into the asphalt',540,430,'800 36px MS','rgba(255,255,255,.6)');}

// ---------- Lancaster, California ----------
function lancaster(t,o={}){desertSky({moon:false});ctx.fillStyle=vgrad(HZ,1920,[[0,'#3a2b3a'],[1,'#57423d']]);ctx.fillRect(-80,HZ,1240,1200);
  // daylight-ish dusk band
  glow(540,HZ,900,'rgba(255,150,90,1)',.25);
  // road going off to the horizon, grooved strip on it
  poly([500,HZ,580,HZ,1300,1920,-220,1920],'#2a2b31');poly([545,HZ,575,HZ,980,1920,560,1920],'#33363f');
  for(let k=0;k<70;k++){const q=Math.pow(k/70,2.2);const y=lerp(HZ,1920,q);const xl=lerp(545,560,q),xr=lerp(575,980,q);line(xl,y,xr,y,Math.max(1,q*8),'rgba(0,0,0,.5)');}
  // a car driving it
  const k=fract(t*.08);const cy=lerp(1500,1100,k),cs=lerp(1,.55,k),cx=lerp(760,640,k);ctx.save();ctx.translate(cx,cy);ctx.scale(cs,cs);
  fillRR(-120,-80,240,90,22,'#c8cdd6');fillRR(-90,-140,180,70,20,'#aab2bf');fillRR(-80,-130,160,50,14,'#2b3346');circ(-80,14,30,'#15161b');circ(80,14,30,'#15161b');circ(-100,-40,12,'#ff3b2f');circ(100,-40,12,'#ff3b2f');ctx.restore();
  for(let j=0;j<8;j++){const q=fract(t*.35+j/8);note(cx-140+j*40+Math.sin(t+j)*12,cy-80-q*420,1,j%2?'#ffc93c':MR.noteC,Math.sin(q*Math.PI)*.95);}
  for(let i=0;i<6;i++)joshua(80+i*190+hash(i)*60,HZ+40+hash(i*2)*90,.7+hash(i*5)*.5,'#140f18');
  label('LANCASTER, CALIFORNIA',540,520,{font:'900 44px MS',a:o.lab??1});
  label('THE WILLIAM TELL OVERTURE',540,600,{font:'800 32px MS',a:o.lab2??1,bg:'rgba(255,201,60,.95)',col:'#14110a'});
  if(o.lab3)label('…OUT OF TUNE',540,668,{font:'800 30px MS',a:o.lab3,bg:'rgba(224,54,42,.95)'});}

// ---------- me on the road at night with a broom ----------
function me(o){toon(Object.assign({jacket:MR.vest,hat:'beanie',hatCol:'#f0683f',tag:'NIGHT\nCREW',skin:'#e9b896',browCol:'#4a2e1f',pants:'#232634'},o));}
function crewNight(t,o={}){desertSky();ctx.fillStyle=vgrad(HZ,1920,[[0,'#1b1424'],[1,'#2e2430']]);ctx.fillRect(-80,HZ,1240,1200);
  poly([470,HZ,610,HZ,1500,1920,-420,1920],MR.road);poly([548,HZ,600,HZ,1180,1920,560,1920],'#272a33');
  for(let k=0;k<90;k++){const q=Math.pow(k/90,2);const y=lerp(HZ,1920,q);line(lerp(548,560,q),y,lerp(600,1180,q),y,Math.max(1,q*9),'rgba(0,0,0,.55)');}
  // county truck with amber beacon
  ctx.save();ctx.translate(250,1240);fillRR(-200,-210,400,200,24,'#d9d4c4');fillRR(-200,-300,190,110,18,'#cfc9b8');fillRR(-185,-285,160,70,10,'#22324a');circ(-120,0,48,'#121318');circ(120,0,48,'#121318');
  text('COUNTY ROADS',60,-110,'900 30px MS','#3a3a42');const b=.5+.5*Math.sin(t*8);circ(-105,-316,18,'#ffb020',.6+.4*b);glow(-105,-316,260,'rgba(255,170,40,1)',.35*b);ctx.restore();
  glow(250,1100,700,'rgba(255,170,40,1)',.06*(1+Math.sin(t*8)));
  // me sweeping
  const sw=Math.sin(t*3.2);me({x:700,y:1820,h:900,brow:'flat',mouth:'flat',look:{x:-.4,y:.6},armR:[.5+.25*sw,.6],armL:[.3+.2*sw,.8],
    held:(hx,hy,h)=>{line(hx,hy,hx-120+sw*30,hy+280,12,'#6b4a2b');fillRR(hx-190+sw*30,hy+270,150,40,8,'#2a2a2a');}});
  label('NIGHT CREW',700,790,{font:'800 34px MS',a:o.lab??1});}

// ---------- Ray and the rules ----------
function rayYard(t,o={}){fillAll('#17130f');ctx.fillStyle=vgrad(0,1300,[[0,'#100d0b'],[1,'#2a211b']]);ctx.fillRect(-80,-80,1240,1400);ctx.fillStyle='#14100d';ctx.fillRect(-80,1300,1240,700);
  // shelves of road paint + cones
  for(let i=0;i<4;i++){fillRR(640,300+i*220,420,16,4,'#2a2420');for(let j=0;j<4;j++)fillRR(660+j*96,230+i*220,70,70,8,['#d8c23a','#e8e2cf','#c84a2a','#d8c23a'][j]);}
  for(let j=0;j<3;j++){poly([780+j*110,1300,840+j*110,1300,810+j*110,1160],'#e8641e');fillRR(772+j*110,1290,76,18,4,'#e8641e');}
  line(380,-80,380,170,4,'#0a0a0a');poly([310,170,450,170,420,130,340,130],'#2b2b2b');glow(380,200,700,'rgba(255,200,130,1)',.3);
  const hold=o.hold??1;
  toon({x:380,y:1720,h:1250,jacket:'#c8662a',hat:'cap',hatCol:'#3a4a2f',beard:'#d9d6cf',browCol:'#d0ccc4',skin:'#d39a74',tag:'RAY',brow:'worried',mouth:'flat',look:o.look||{x:.6,y:.3},
    armR:[lerp(.1,1.15,hold),lerp(.1,.9,hold)],held:(hx,hy,h)=>{ctx.save();ctx.translate(hx+30,hy-40);ctx.rotate(-.12);fillRR(-80,-110,170,210,8,'#efe9db');
      for(let k=0;k<5;k++)line(-55,-60+k*34,60-(k%2)*35,-60+k*34,6,'rgba(40,40,50,.55)');text('RULES',5,-78,'900 26px MS','#1d1f25');ctx.restore();}});}

// ---------- the rules card ----------
const RULES=[["DRIVE IT AT","EXACTLY","55."],["IF IT PLAYS A SONG","YOU DON'T KNOW,","DON'T SLOW DOWN."],["NEVER STAND","ON THE GROOVES","AFTER DARK."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#07080b');glow(300,1650,500,'rgba(255,160,60,1)',.10);glow(900,1600,420,`rgba(${MR.note},1)`,.06);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.025);
  ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f1ebdd');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('RULES',-330,-360,'900 92px MS','#1b1d23','left');line(-330,-336,-30,-344,7,'#1b1d23');note(250,-360,1.4,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 44px MS',j===2?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+40,420,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— RAY',290,430,'800 40px MS','#3b3d44');
  ctx.restore();}

// ---------- a music staff with slow notes (the song nobody knows) ----------
function staffOverlay(t,a,o={}){if(a<=0)return;ctx.save();ctx.globalAlpha=a;const y0=o.y??330;fillRR(60,y0-90,960,300,24,'rgba(6,8,14,.72)');
  for(let k=0;k<5;k++)line(100,y0+k*30,980,y0+k*30,3,`rgba(${MR.note},.55)`);
  const pts=[3,1,4,2,5,3,6,4];const n=o.n??pts.length;for(let j=0;j<Math.min(n,pts.length);j++){const x=170+j*105,y=y0+120-pts[j]*15;const p=j===Math.floor(n)-1?1+.25*Math.sin(t*10):1;
    ctx.save();ctx.globalAlpha=a*(j<n-1?.75:1);note(x,y,1.1*p,MR.noteC);ctx.restore();}
  ctx.restore();}

// ---------- me and the radio ----------
function meRadio(t,o={}){fillAll('#07080d');ctx.fillStyle=vgrad(0,1920,[[0,'#0e1020'],[1,'#05060a']]);ctx.fillRect(-80,-80,1240,2080);
  // side window: the dark road and a glowing groove
  fillRR(110,150,860,520,30,'#11142a');ctx.save();rr(110,150,860,520,30);ctx.clip();ctx.fillStyle=vgrad(150,670,[[0,'#0a0c1c'],[.5,'#1c1426'],[1,'#2a2030']]);ctx.fillRect(110,150,860,520);
  ctx.fillStyle='#120e1c';ctx.fillRect(110,430,860,240);ctx.fillStyle='#1d1f26';ctx.fillRect(110,520,860,150);for(let k=0;k<20;k++)line(130+k*44,520,130+k*44+30,670,4,'rgba(0,0,0,.5)');
  if(o.glowX!=null){ctx.save();ctx.globalCompositeOperation='lighter';line(o.glowX,520,o.glowX+30,670,10,`rgba(${MR.note},.8)`);glow(o.glowX+15,600,140,`rgba(${MR.note},1)`,.5);ctx.restore();}
  ctx.restore();
  me({x:540,y:2420,h:2000,brow:o.brow||'worried',mouth:o.mouth||'flat',look:o.look||{x:.8,y:.7},armR:[.1,.1],armL:[.1,.1]});
  glow(880,1640,800,'rgba(80,255,160,1)',.20*(o.radio??.3));
  ctx.save();ctx.translate(830,1600);ctx.rotate(-.08);fillRR(-200,-150,400,300,26,'#1b1e26');fillRR(-170,-120,340,130,14,'#0e2a1c');
  if(o.radio>.05)waveform(0,-55,300,100,t,o.radio,'#5cf2a2',13);else text('CREW · CH 1',0,-40,'800 40px MS','#2f6b4a');
  circ(150,90,14,o.radio>.05?'#5cf2a2':'#1f3a2b');for(let i=0;i<5;i++)line(-150,50+i*16,60,50+i*16,6,'#111318');ctx.restore();}

// ---------- the door: the last note right outside ----------
function doorView(t,o={}){fillAll('#05060a');
  // the window glass looking down at the road beside the door
  fillRR(90,200,900,900,40,'#0d1020');ctx.save();rr(90,200,900,900,40);ctx.clip();ctx.fillStyle=vgrad(200,1100,[[0,'#0b0d1a'],[1,'#1e2028']]);ctx.fillRect(90,200,900,900);
  for(let k=0;k<14;k++){const y=380+k*58;line(60,y,1020,y+20,10,'rgba(0,0,0,.55)');}
  const g=o.glow??1;ctx.save();ctx.globalCompositeOperation='lighter';const y=380+8*58;line(60,y,1020,y+20,18,`rgba(${MR.note},${.8*g})`);glow(540,y+10,520,`rgba(${MR.note},1)`,.45*g);
  // two bare footprints of light, right under the window
  for(const s of[-1,1]){const fx=540+s*70,fy=y+(s>0?-40:30);ell(fx,fy,32,70,s*.06,`rgba(${MR.note},1)`,.85*g*(o.feet??1));for(let k=0;k<5;k++)circ(fx-26+k*13,fy-82+Math.abs(k-1.6)*5,9-Math.abs(k-1)*1.3,`rgba(${MR.note},1)`,.8*g*(o.feet??1));}
  ctx.restore();ctx.restore();
  // the door panel and handle
  ctx.fillStyle=vgrad(1100,1920,[[0,'#1a1a20'],[1,'#0a0a0d']]);ctx.fillRect(-80,1100,1240,900);line(-80,1110,1160,1110,8,'#2a2a32');
  fillRR(640,1300,260,90,40,'#2b2c33');fillRR(670,1320,200,50,25,'#0d0d10');circ(300,1340,22,o.locked?'#ff3b2f':'#3a3a44');text(o.locked?'LOCKED':'',300,1410,'800 26px MS','#ff6a5a');
  if(o.notes)for(let j=0;j<6;j++){const q=fract(t*.3+j/6);note(380+j*70,900-q*500,1.3,MR.noteC,o.notes*Math.sin(q*Math.PI));}}
function meClose(t,o={}){fillAll('#07080d');glow(540,900,900,`rgba(${MR.note},1)`,.16);
  me({x:820,y:2600,h:3000,brow:'scared',mouth:o.mouth||'o',look:{x:-.9,y:.2},armR:[.1,.1],armL:[.1,.1]});
  if(o.notes)for(let j=0;j<5;j++){const q=fract(t*.25+j/5);note(150+j*35,1300-q*700,1.4,MR.noteC,o.notes*Math.sin(q*Math.PI));}}
