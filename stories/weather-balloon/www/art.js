// ===================== Weather Balloon: places and things (v2, 1080x1920) =====================
const WB={crt:'#5cf2a2',crtD:'#0b1f16',red:'#ff4d3d',latex:'#f1ece2',jacket:'#2f4f7a',lamp:'255,226,170'};
const WSTARS=(()=>{const r=rng(11),a=[];for(let i=0;i<300;i++)a.push([r()*1180-50,r()*1500-60,r()<.12?2.6:1.3,.25+r()*.65]);return a;})();
function starSky(y1,o={}){ctx.fillStyle=vgrad(-60,y1,o.stops||[[0,'#02040b'],[.65,'#08112a'],[1,'#17264a']]);ctx.fillRect(-80,-80,1240,y1+90);
  for(const[x,y,r,a]of WSTARS)if(y<y1-20)circ(x,y,r,'#e6ecff',a*(o.starA??1));}
function me(o){toon(Object.assign({jacket:WB.jacket,hat:'beanie',hatCol:'#f0683f',tag:'NIGHT\nTECH',skin:'#e9b896',browCol:'#4a2e1f'},o));}

// ---------- the balloon: latex sphere, neck, line, orange parachute, white sonde box ----------
// o: line (px), stretch 0..1 (thin, veined, near bursting), pulse 0..1 (throbs), glowA (warm glow), sonde false
function balloon(x,y,r,t,o={}){const pu=(o.pulse||0)*beatK(t,o.bpm||72)*.06;const R=r*(1+pu);const st=o.stretch||0;
  if(o.glowA)glow(x,y,R*2.4,'rgba(255,170,120,1)',o.glowA*(.6+.4*beatK(t,o.bpm||72)));
  // latex
  const g=ctx.createRadialGradient(x-R*.35,y-R*.4,R*.08,x,y,R);g.addColorStop(0,'#ffffff');g.addColorStop(.45,st>.5?'#f3d8cc':WB.latex);g.addColorStop(1,st>.5?'#a98f8a':'#a9a69f');
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,R*(1-st*.04),R*(1.04+st*.03),0,0,Math.PI*2);ctx.fill();
  if(st>0){ctx.save();ctx.globalAlpha=.35*st;ctx.strokeStyle='#b5534a';ctx.lineWidth=Math.max(1.5,R*.008);const Rr=rng(3);
    for(let i=0;i<9;i++){let a=Rr()*6.28,px=x+Math.cos(a)*R*.2,py=y+Math.sin(a)*R*.2;ctx.beginPath();ctx.moveTo(px,py);for(let k=0;k<6;k++){a+=(Rr()-.5)*.9;const d=R*(.12+Rr()*.12);px+=Math.cos(a)*d;py+=Math.sin(a)*d;ctx.lineTo(px,py);}ctx.stroke();}ctx.restore();}
  // neck
  poly([x-R*.09,y+R*1.0,x+R*.09,y+R*1.0,x+R*.04,y+R*1.16,x-R*.04,y+R*1.16],'#c9c3b8');
  if(o.sonde===false)return;const L=o.line??R*2.2;const sway=Math.sin(t*1.1)*R*.05;
  line(x,y+R*1.16,x+sway,y+R*1.16+L,Math.max(1.5,R*.012),'rgba(230,230,230,.7)');
  // parachute (folded, orange) on the line, then the sonde
  const py=y+R*1.16+L*.35;ctx.fillStyle='#ff8a3d';ctx.beginPath();ctx.ellipse(x+sway*.35,py,R*.13,R*.07,0,Math.PI,0);ctx.fill();
  const bx=x+sway,by=y+R*1.16+L;fillRR(bx-R*.09,by,R*.18,R*.13,R*.02,'#f4f4f2');line(bx,by+R*.13,bx,by+R*.3,Math.max(1,R*.008),'#ddd');
  if(o.blink)circ(bx+R*.05,by+R*.04,Math.max(2,R*.018),WB.red,.5+.5*Math.sin(t*8));}
// 0..1 heartbeat envelope (sharp at the beat)
function beatK(t,bpm){const p=fract(t*bpm/60);return Math.exp(-p*9)+.35*Math.exp(-Math.pow((p-.28)*14,2));}
// ECG value for phase 0..1
function ecgV(p){return .12*Math.exp(-Math.pow((p-.1)*28,2))-.18*Math.exp(-Math.pow((p-.2)*90,2))+1*Math.exp(-Math.pow((p-.225)*120,2))-.28*Math.exp(-Math.pow((p-.25)*80,2))+.25*Math.exp(-Math.pow((p-.45)*16,2));}
// a scrolling trace: kind 'ecg' | 'flat' | 'press' (soft pressure pulse)
function trace(x,y,w,h,t,o={}){const bpm=o.bpm||72,col=o.col||WB.crt,sec=o.sec||3,n=180;ctx.save();ctx.strokeStyle=col;ctx.lineWidth=o.lw||6;ctx.lineJoin='round';ctx.shadowColor=col;ctx.shadowBlur=18;ctx.beginPath();
  for(let i=0;i<=n;i++){const u=i/n;const tt=t-sec*(1-u)+(o.ph||0);let v=0;if(o.kind==='ecg')v=ecgV(fract(tt*bpm/60));else if(o.kind==='press')v=.5*beatK(tt,bpm)-.15;else v=(hash(Math.floor(tt*30))-.5)*.04;
    v*=o.amp??1;const px=x+u*w,py=y-v*h;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();
  circ(x+w,y-((o.kind==='ecg'?ecgV(fract((t+(o.ph||0))*bpm/60)):o.kind==='press'?.5*beatK(t,bpm)-.15:0)*(o.amp??1))*h,9,'#fff');ctx.restore();}

// ---------- the plains at launch time, wide ----------
function plains(t,o={}){const hz=1260;
  ctx.fillStyle=vgrad(-80,hz,[[0,'#0b1430'],[.55,'#3b3a66'],[.85,'#c0655a'],[1,'#f2a25e']]);ctx.fillRect(-80,-80,1240,hz+80);
  for(const[x,y,r,a]of WSTARS)if(y<500)circ(x,y,r,'#e6ecff',a*.5*(1-y/500));
  glow(760,hz,520,'rgba(255,160,90,1)',.35);
  // ground
  ctx.fillStyle=vgrad(hz,1920,[[0,'#1b1a24'],[1,'#07080b']]);ctx.fillRect(-80,hz,1240,800);
  for(let i=0;i<60;i++){const y=hz+8+i*i*.18,x=(hash(i*7)*1240)-80;line(x,y,x+40+hash(i)*80,y,2,'rgba(255,170,110,.06)');}
  // far fence + power poles
  for(let i=0;i<9;i++){const x=-40+i*150;line(x,hz-8,x,hz+18,3,'#0d0e14');}
  line(-80,hz-2,1160,hz-4,1.5,'rgba(0,0,0,.6)');
  // the station: low building, mast with anemometer, launch shed
  ctx.fillStyle='#0c0d13';ctx.fillRect(560,hz-150,380,165);poly([540,hz-150,960,hz-150,930,hz-185,570,hz-185],'#10121a');
  fillRR(610,hz-110,70,48,4,`rgba(${WB.lamp},.9)`);glow(645,hz-86,160,`rgba(${WB.lamp},1)`,.3);
  line(900,hz-185,900,hz-430,7,'#0c0d13');for(const s of[-1,1])line(900,hz-430,900+s*40,hz-440,4,'#0c0d13');
  const sp=t*5;for(let k=0;k<3;k++){const a=sp+k*2.09;circ(900+Math.cos(a)*40,hz-440+Math.sin(a)*6,9,'#0c0d13');}
  circ(900,hz-460,6,WB.red,.6+.4*Math.sin(t*4));
  fillRR(330,hz-120,180,135,6,'#0e1017');fillRR(350,hz-100,140,115,4,'#1c1e28');
  // me letting go, the balloon rising
  const rel=o.rel??0;
  me({x:430,y:hz+430,h:520,brow:'flat',mouth:'flat',look:{x:.3,y:-1},armR:[lerp(2.9,2.5,rel),lerp(.1,.4,rel)],armL:[.2,.2]});
  const by=lerp(hz+30-260,hz-860,ss(rel)),bx=lerp(545,600,rel);balloon(bx,by,95,t,{line:150});
  if(o.label)label('6:00 PM LAUNCH',540,1700,{font:'800 34px MS',a:o.label,bg:'rgba(255,201,60,.95)',col:'#14110a'});}

// ---------- the climb, as a diagram ----------
function climb(t,o={}){fillAll('#060914');starSky(1920,{starA:.55,stops:[[0,'#02040b'],[.5,'#0a1430'],[1,'#2a2a52']]});
  const y0=1700,y1=260,X=150;line(X,y1-40,X,y0,4,'rgba(255,255,255,.45)');
  for(let f=0;f<=100;f+=20){const y=lerp(y0,y1,f/100);line(X-14,y,X+14,y,4,'rgba(255,255,255,.45)');text(f?f+',000 FT':'0',X+30,y+12,'800 30px MS','rgba(255,255,255,.7)','left');}
  ctx.fillStyle='#0b0c12';ctx.fillRect(-80,y0,1240,400);line(-80,y0,1160,y0,3,'rgba(255,255,255,.2)');
  const k=o.k??0;const y=lerp(y0-120,y1+130,k),r=lerp(55,250,Math.pow(k,1.3));const bx=650;
  // ghost trail of past sizes
  for(let j=1;j<=4;j++){const kk=k*j/5;ctx.save();ctx.globalAlpha=.12;balloon(bx,lerp(y0-120,y1+130,kk),lerp(55,250,Math.pow(kk,1.3)),t,{sonde:false});ctx.restore();}
  balloon(bx,y,r,t,{line:r*.6+60});
  if(o.l1)label('≈ 5 FT WIDE',bx+250,y0-50,{font:'800 32px MS',a:o.l1});
  if(o.l2)label('1,000 FT / MINUTE',X+230,lerp(y0,y1,.45),{font:'800 32px MS',a:o.l2,align:'left',bg:'rgba(255,201,60,.95)',col:'#14110a'});
  if(o.l3){ctx.save();ctx.globalAlpha=o.l3;const hx=bx-r-170,hy=y+r*.6;poly([hx-90,hy,hx+90,hy,hx+90,hy-110,hx,hy-180,hx-90,hy-110],'rgba(255,255,255,.18)');ctx.restore();
    label('HOUSE-SIZED',bx,y+r+90,{font:'800 32px MS',a:o.l3});}
  if(o.pop){const p=o.pop;ctx.save();ctx.globalAlpha=clamp(p*3);for(let i=0;i<14;i++){const a=i/14*6.28;line(bx+Math.cos(a)*r*1.05,y+Math.sin(a)*r*1.05,bx+Math.cos(a)*r*(1.25+p*.5),y+Math.sin(a)*r*(1.25+p*.5),10,'#ffc93c');}ctx.restore();
    text('POP',bx,y+18,'900 130px MS','#ffc93c');}}

// ---------- inside: the radio desk, the card on the wall ----------
function deskRoom(t,o={}){fillAll('#14110f');ctx.fillStyle=vgrad(0,1300,[[0,'#100e0d'],[1,'#2a221c']]);ctx.fillRect(-80,-80,1240,1400);
  // window: night plains, a pale dot high up
  fillRR(90,170,430,560,14,'#0a0f1d');ctx.save();rr(90,170,430,560,14);ctx.clip();starSky(730,{starA:.8});ctx.fillStyle='#07080c';ctx.fillRect(90,640,430,100);
  if(o.dot)circ(300,320,5,'#f6efe4',o.dot);ctx.restore();line(305,170,305,730,8,'#1a1512');line(90,450,520,450,8,'#1a1512');
  // corkboard + card
  fillRR(600,180,420,520,10,'#5a3f27');for(let i=0;i<30;i++)circ(620+hash(i)*380,200+hash(i*3.1)*480,3,'#3e2b1a');
  ctx.save();ctx.translate(810,440);ctx.rotate(.04);fillRR(-150,-190,300,380,6,'#efe9db');text('RULES',0,-120,'900 54px MS','#1b1d23');for(let k=0;k<6;k++)line(-110,-50+k*44,110-(k%2)*50,-50+k*44,6,'rgba(40,40,50,.5)');
  text('— MAE',60,160,'800 30px MS','#3b3d44');ctx.globalAlpha=.75;fillRR(-60,-205,120,34,4,'#d8ceb0');ctx.restore();
  // desk, radio, monitor glow
  ctx.fillStyle='#231b15';ctx.fillRect(-80,1180,1240,800);line(-80,1180,1160,1180,4,'rgba(255,255,255,.05)');
  fillRR(640,1000,330,190,16,'#1b1e26');fillRR(660,1020,290,90,10,WB.crtD);text('CH 4 · BASE',805,1078,'800 34px MS','#2f6b4a');circ(930,1150,10,'#1f3a2b');
  glow(540,600,900,`rgba(${WB.lamp},1)`,.12);
  const k=o.look??0;me({x:420,y:2050,h:1350,brow:'flat',mouth:'flat',look:{x:lerp(-.2,1,k),y:-.6},face:.15,armR:[.15,.1],armL:[.15,.1]});}

// ---------- the card, close ----------
const RULES=[["EVERY BALLOON GOES","UP ON TIME.","NO MATTER WHAT."],["IF ONE STOPS CLIMBING,","WRITE IT DOWN.","DON'T REPORT IT."],["IF ONE EVER READS WARM,","LET IT POP.","NEVER BRING IT DOWN."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#0d0a08');glow(540,900,900,`rgba(${WB.lamp},1)`,.10);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.02+(o.tilt||0));
  ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f1ebdd');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('RULES',-330,-360,'900 92px MS','#1b1d23','left');line(-330,-336,-30,-344,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 42px MS',j===1?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(20,y0+40,420,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— MAE',290,430,'800 40px MS','#3b3d44');
  ctx.restore();}

// ---------- the monitor (full frame CRT) ----------
// o.mode: 'temp' | 'alt' | 'press' | 'ecg' | 'sync'; o.alt (ft), o.flat 0..1 (altitude graph goes flat), o.hot
function monitor(t,o={}){fillAll('#050807');const sh=shakeAt(t,o.shake??0,1);ctx.save();ctx.translate(sh.x,sh.y+90);
  fillRR(40,150,1000,1240,40,'#15181d');fillRR(80,190,920,1160,26,WB.crtD);glow(540,770,800,'rgba(80,255,160,1)',.10);
  ctx.save();rr(80,190,920,1160,26);ctx.clip();for(let y=190;y<1350;y+=8)line(80,y,1000,y,2,'rgba(0,0,0,.25)');
  text('RADIOSONDE · FLIGHT 2',120,250,'800 34px PM','rgba(92,242,162,.7)','left');text(o.clock||'7:02 PM',960,250,'800 34px PM','rgba(92,242,162,.7)','right');line(120,275,960,275,2,'rgba(92,242,162,.3)');
  const C=WB.crt,R=WB.red;
  // altitude graph
  if(o.mode==='alt'||o.mode==='temp'||o.mode==='press'){const gx=140,gy=760,gw=800,gh=380;text('ALTITUDE',gx,330,'800 30px MS','rgba(92,242,162,.7)','left');
    line(gx,gy,gx+gw,gy,2,'rgba(92,242,162,.3)');line(gx,gy,gx,gy-gh,2,'rgba(92,242,162,.3)');
    const fl=o.flat??1;ctx.save();ctx.strokeStyle=C;ctx.lineWidth=6;ctx.shadowColor=C;ctx.shadowBlur=14;ctx.beginPath();ctx.moveTo(gx,gy);const xs=gx+gw*.62;ctx.lineTo(xs,gy-gh*.82);ctx.lineTo(lerp(xs,gx+gw,fl),gy-gh*.82);ctx.stroke();ctx.restore();
    circ(lerp(xs,gx+gw,fl),gy-gh*.82,10,'#fff');if(o.stopLabel)label('STOPPED',gx+gw-150,gy-gh*.82-60,{font:'900 36px MS',a:o.stopLabel,bg:R});
    text((o.alt??58112).toLocaleString('en-US')+' FT',gx+gw,330,'900 52px PM',C,'right');}
  // readouts
  if(o.mode==='temp'||o.mode==='press'){const y=870;text('AIR (EXPECTED)',140,y,'800 30px MS','rgba(92,242,162,.7)','left');text('−70°F',940,y,'900 56px PM',C,'right');
    text('SENSOR',140,y+110,'800 30px MS','rgba(255,90,72,.9)','left');const hb=o.hot?beatK(t,72):0;text('98.6°F',940,y+125,`900 ${Math.round(104+hb*14)}px PM`,R,'right');if(o.hot)glow(760,y+90,260,'rgba(255,60,40,1)',.25+.25*hb);}
  if(o.mode==='press'){const y=1180;text('PRESSURE',140,y,'800 30px MS','rgba(92,242,162,.7)','left');trace(140,y+120,800,170,t,{kind:'press',col:C,amp:o.amp??1});
    if(o.count)text(o.count,940,y,'900 44px PM',R,'right');}
  if(o.mode==='ecg'){text('PRESSURE',140,330,'800 30px MS','rgba(255,90,72,.9)','left');trace(140,900,800,420,t,{kind:'ecg',col:R,lw:9});text('72 BPM',940,330,'900 56px PM',R,'right');
    ctx.globalAlpha=.08*beatK(t,72);ctx.fillStyle=R;ctx.fillRect(80,190,920,1160);ctx.globalAlpha=1;}
  if(o.mode==='sync'){const b=o.bpm||96;text('BALLOON',140,340,'800 32px MS','rgba(255,90,72,.9)','left');text(b+' BPM',940,340,'900 50px PM',R,'right');trace(140,620,800,240,t,{kind:'ecg',col:R,bpm:b,lw:8});
    text('YOU',140,840,'800 32px MS','rgba(92,242,162,.8)','left');text(b+' BPM',940,840,'900 50px PM',C,'right');trace(140,1130,800,240,t,{kind:'ecg',col:C,bpm:b,lw:8});
    if(o.sync)label('IN SYNC',540,1260,{font:'900 40px MS',a:o.sync,bg:R});}
  ctx.restore();
  // reflection of me in the glass (cold open)
  if(o.face){glow(540,1700,520,'rgba(255,60,40,1)',.22);me({x:540,y:2480,h:1000,brow:'scared',mouth:'o',look:{x:0,y:-1}});}
  ctx.restore();}

// ---------- me and the radio ----------
function meRadio(t,o={}){fillAll('#07090d');ctx.fillStyle=vgrad(0,1920,[[0,'#0c1220'],[1,'#05070a']]);ctx.fillRect(-80,-80,1240,2080);
  fillRR(120,140,840,520,30,'#101a2e');ctx.save();rr(120,140,840,520,30);ctx.clip();starSky(660,{starA:.9});ctx.fillStyle='#06070b';ctx.fillRect(120,600,840,80);
  if(o.dot){circ(700,300,7,'#f6efe4');glow(700,300,40,'rgba(255,180,140,1)',.3*beatK(t,72));}ctx.restore();
  me({x:540,y:2420,h:2000,brow:o.brow||'worried',mouth:o.mouth||'flat',look:o.look||{x:.8,y:.7},armR:[.1,.1],armL:[.1,.1]});
  glow(900,1640,800,'rgba(80,255,160,1)',.20*(o.radio??.3));
  ctx.save();ctx.translate(840,1600);ctx.rotate(-.08);fillRR(-200,-150,400,300,26,'#1b1e26');fillRR(-170,-120,340,130,14,WB.crtD);
  if(o.radio>.05)waveform(0,-55,300,100,t,o.radio,WB.crt,13);else text('CH 4 · BASE',0,-40,'800 40px MS','#2f6b4a');
  circ(150,90,14,o.radio>.05?WB.crt:'#1f3a2b');for(let i=0;i<5;i++)line(-150,50+i*16,60,50+i*16,6,'#111318');ctx.restore();}

// ---------- the cut-down switch ----------
function cutSwitch(t,o={}){const y=o.y??1560;fillRR(200,y-80,680,400,30,'#15181f');text('CUT DOWN',540,y-10,'900 56px MS',WB.red);
  fillRR(440,y+40,200,220,18,'#0b0c10');fillRR(470,y+70,140,160,12,'#2a0d0b');
  // guard cover, lifting
  const g=o.guard??0;ctx.save();ctx.translate(540,y+70);ctx.scale(1,lerp(1,-.25,g));fillRR(-90,0,180,170,14,'rgba(255,77,61,.55)');ctx.restore();
  line(540,y+150,540,y+90,30,'#cfd3da');circ(540,y+88,22,'#e8ebf0');
  const tr=Math.sin(t*23)*6*(o.shake??1);ctx.save();ctx.translate(760+tr-(o.hand??0)*120,y+170-(o.hand??0)*20);ctx.rotate(-.3);fillRR(-60,-50,150,110,40,'#e9b896');fillRR(60,-30,90,46,22,'#e9b896');fillRR(-160,-25,120,90,18,WB.jacket);ctx.restore();}

// ---------- the end: the balloon overhead, enormous, stretched, beating ----------
function bigSky(t,o={}){starSky(1920,{starA:1});const hz=1650;
  ctx.fillStyle='#06070b';ctx.fillRect(-80,hz,1240,400);ctx.fillStyle='#0b0c12';ctx.fillRect(700,hz-70,240,72);fillRR(740,hz-50,50,32,3,`rgba(${WB.lamp},.9)`);glow(765,hz-34,120,`rgba(${WB.lamp},1)`,.3);
  line(920,hz-70,920,hz-230,5,'#0b0c12');
  const r=o.r??330;balloon(540,o.y??620,r,t,{stretch:o.stretch??1,pulse:o.pulse??1,glowA:o.glowA??.25,line:o.line??r*1.4,blink:true,bpm:o.bpm||72});
  if(o.tiny)me({x:250,y:hz+40,h:200,brow:'scared',mouth:'o',look:{x:.4,y:-1}});}
