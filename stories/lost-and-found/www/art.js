// ===================== Lost & Found: the box and everything in it =====================
const LF={card:'#b88a55',cardD:'#8e6538',cardL:'#cfa572',tape:'rgba(225,215,170,.75)',ink:'#151515'};
// ---------- small things, drawn top-down at (x,y) ----------
function keys(x,y,s=1,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.strokeStyle='#b8b8b0';ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,0,38,0,7);ctx.stroke();
  for(const[a,c]of[[-.6,'#c9b060'],[.3,'#a8aab0'],[1.2,'#a8aab0']]){ctx.save();ctx.rotate(a);fillRR(30,-14,40,28,10,c);fillRR(66,-7,90,14,3,c);for(let k=0;k<4;k++)fillRR(100+k*12,7,8,8+(k%2)*6,2,c);ctx.restore();}
  ctx.save();ctx.rotate(2.6);fillRR(30,-18,110,36,12,'#2f6fb0');circ(118,0,10,'#1b3a5c');ctx.restore();ctx.restore();}
function wallet(x,y,s=1,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);fillRR(-110,-75,220,150,14,'#5a3a24');line(-100,-20,100,-20,3,'#3e2818');fillRR(30,-10,70,40,6,'#4a3020');ctx.restore();}
function crackLines(seed,k){const r=rng(seed);ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2;const cx=40,cy=-120;for(let i=0;i<9;i++){let x=cx,y=cy;ctx.beginPath();ctx.moveTo(x,y);const a=r()*6.283;const L=(60+r()*170)*k;for(let j=0;j<5;j++){x+=Math.cos(a+(r()-.5)*.8)*L/5;y+=Math.sin(a+(r()-.5)*.8)*L/5;ctx.lineTo(x,y);}ctx.stroke();}}
function phoneTop(x,y,s=1,rot=0,crack=0,lit=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);fillRR(-90,-180,180,360,26,'#0b0c0f');fillRR(-80,-168,160,336,20,lit?'#1b2333':'#111318');if(lit)glow(0,0,200,'rgba(120,150,220,1)',.25);
  if(crack>0){ctx.save();rr(-80,-168,160,336,20);ctx.clip();crackLines(77,crack);ctx.restore();}ctx.restore();}
function headphones(x,y,s=1,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.strokeStyle='#d9d9d4';ctx.lineWidth=18;ctx.beginPath();ctx.arc(0,30,100,Math.PI*1.05,Math.PI*1.95);ctx.stroke();ell(-96,40,30,46,0,'#e9e9e4');ell(96,40,30,46,0,'#e9e9e4');ctx.restore();}
function watch(x,y,s=1,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);fillRR(-24,-110,48,220,14,'#2a2a2a');circ(0,0,46,'#c9c9c4');circ(0,0,38,'#111');line(0,0,0,-26,4,'#eee');line(0,0,18,8,4,'#eee');ctx.restore();}
function glasses(x,y,s=1,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.strokeStyle='#111';ctx.lineWidth=10;for(const sx of[-60,60]){ctx.beginPath();ctx.ellipse(sx,0,50,38,0,0,7);ctx.stroke();}line(-12,-6,12,-6,8,'#111');ctx.fillStyle='rgba(180,200,230,.18)';for(const sx of[-60,60]){ctx.beginPath();ctx.ellipse(sx,0,46,34,0,0,7);ctx.fill();}ctx.restore();}
function collar(x,y,s=1,rot=0,t=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.strokeStyle='#b02a20';ctx.lineWidth=20;ctx.beginPath();ctx.ellipse(0,0,90,64,0,0,7);ctx.stroke();fillRR(-14,-74,28,24,4,'#c9b060');
  const sw=Math.sin(t*9)*.3;ctx.save();ctx.translate(0,66);ctx.rotate(sw);circ(0,26,22,'#d9c070');text('LUNA',0,32,'500 13px PM','#5a4a20');ctx.restore();ctx.restore();}
function smallBox(x,y,s=1,rot=0,lab=1){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);fillRR(-110,-80,220,160,6,LF.cardD);fillRR(-110,-12,220,24,2,LF.tape);fillRR(-12,-80,24,160,2,LF.tape);
  if(lab){ctx.globalAlpha=lab;fillRR(-90,-66,180,46,4,'#f2efe6');ctx.strokeStyle=LF.ink;ctx.lineWidth=4;ctx.beginPath();for(let k=0;k<6;k++){ctx.moveTo(-76+k*20,-44);ctx.quadraticCurveTo(-66+k*20,-60,-58+k*20,-40);}ctx.stroke();text('OCT 27',0,52,'italic 400 34px IS',LF.ink);ctx.globalAlpha=1;}ctx.restore();}
function polaroid(x,y,s=1,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);fillRR(-110,-130,220,260,4,'#f2efe6');ctx.fillStyle='#10131a';ctx.fillRect(-94,-114,188,188);
  fillRR(-80,-20,160,60,10,'#2e3440');circ(-50,-24,18,'#111317');ell(-52,-34,18,10,0,PAL.orange);glow(0,-60,120,'rgba(150,180,255,1)',.12);text('3:12 AM',0,108,'italic 400 26px IS','#333');ctx.restore();}
// ---------- the porch ----------
function porch(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#1d2027';ctx.fillRect(-900,-600,3720,2280);for(let y=-600;y<760;y+=40)line(-900,y,2820,y,2,'rgba(0,0,0,.2)');
  fillRR(760,40,400,720,6,'#2c2018');fillRR(780,60,360,700,4,'#3a2a1e');circ(1100,420,12,'#b8a050');fillRR(1240,160,50,80,10,'#4a4d52');const fl=1-.06*(Math.sin(t*13)>.92?1:0);glow(1265,210,520,'rgba(255,220,160,1)',.42*fl);
  ctx.fillStyle='#2a2622';ctx.fillRect(-900,760,3720,900);for(let x=-900;x<2820;x+=120)line(x,760,x,1700,3,'rgba(0,0,0,.3)');
  fillRR(760,770,400,60,8,'#4a3a2a');text('WELCOME',960,812,'500 26px PM','#2a1e14');
  // the box on the mat
  const bx=o.boxX??960,by=o.boxY??840;fillRR(bx-170,by-260,340,260,6,LF.card);fillRR(bx-170,by-260,340,40,4,LF.cardL);fillRR(bx-20,by-260,40,260,2,LF.tape);fillRR(bx-170,by-140,340,30,2,LF.tape);
  fillRR(bx-140,by-110,170,80,4,'#f2efe6');text('LOST &',bx-55,by-78,'500 26px PM',LF.ink);text('FOUND',bx-55,by-46,'500 26px PM',LF.ink);ctx.strokeStyle=LF.ink;ctx.lineWidth=3;ctx.beginPath();for(let k=0;k<5;k++){ctx.moveTo(bx+40+k*20,by-80);ctx.quadraticCurveTo(bx+50+k*20,by-96,bx+58+k*20,by-74);}ctx.stroke();
  ell(bx,by+6,190,18,0,'rgba(0,0,0,.4)');});vignA(.45);}
// ---------- the box from above ----------
// o.show: list of item names visible; o.gone: names that vanished; o.smallLab; o.crack
const ITEMS={photo:[1320,300,1,-.25],keys:[700,420,1,.3],wallet:[1150,380,1,-.2],phone:[960,620,1,.15],headphones:[1250,700,1,.4],watch:[640,720,1,-.5],glasses:[1100,880,1,.1],collar:[760,900,1,.2]};
function boxTop(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#14110e';ctx.fillRect(-900,-600,3720,2280);
  // flaps + walls
  poly([360,160,1560,160,1700,40,220,40],LF.cardL);poly([360,1000,1560,1000,1700,1120,220,1120],LF.cardL);poly([360,160,360,1000,220,1120,220,40],LF.card);poly([1560,160,1560,1000,1700,1120,1700,40],LF.card);
  fillRR(360,160,1200,840,4,'#6a4a2c');ctx.fillStyle='rgba(0,0,0,.35)';ctx.fillRect(360,160,1200,40);ctx.fillRect(360,160,40,840);
  const show=o.show||[],gone=o.gone||[];const vis=n=>show.includes(n)&&!gone.includes(n);
  if(o.small)smallBox(960,560,1.6,0,o.smallLab??1);
  if(vis('photo')){ctx.save();ctx.globalAlpha=o.photoA??1;polaroid(...ITEMS.photo);ctx.restore();}if(vis('collar'))collar(...ITEMS.collar,t);if(vis('glasses'))glasses(...ITEMS.glasses);if(vis('watch'))watch(...ITEMS.watch);
  if(vis('headphones'))headphones(...ITEMS.headphones);if(vis('wallet'))wallet(...ITEMS.wallet);if(vis('phone'))phoneTop(...ITEMS.phone,o.crack??1);if(vis('keys'))keys(...ITEMS.keys);
  for(const n of gone){const p=ITEMS[n];if(!p)continue;ctx.save();ctx.globalAlpha=.5;ctx.strokeStyle='#d03a2a';ctx.lineWidth=6;ctx.setLineDash([16,12]);ctx.strokeRect(p[0]-130,p[1]-110,260,220);ctx.restore();}
  if(o.lid){ctx.save();ctx.globalAlpha=o.lid;fillRR(560,300,800,480,6,'#f3efe2');for(let y=360;y<760;y+=44)line(580,y,1340,y,2,'rgba(80,110,160,.25)');fillRR(900,280,120,50,2,LF.tape);
    const msg="Don't open the small one.";const n=Math.floor(msg.length*clamp(o.write??1));ctx.font='italic 400 74px IS';ctx.fillStyle='#1d2a6a';ctx.textAlign='center';ctx.fillText(msg.slice(0,n),960,560);ctx.restore();}});
  vignA(.4);}
// ---------- two sets of keys ----------
function twoKeys(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#3a2c20';ctx.fillRect(-900,-600,3720,2280);for(let x=-900;x<2820;x+=90)line(x,-600,x,1700,2,'rgba(0,0,0,.18)');
  keys(640,560,1.6,.4);text('IN THE BOX',640,920,'500 34px PM','rgba(244,230,220,.8)');
  // my hand holding mine
  ell(1300,600,170,110,.3,'#c99a7a');for(let k=0;k<4;k++)fillRR(1180+k*60,470,52,150,24,'#c99a7a');keys(1300,520,1.6,.4);for(let k=0;k<4;k++)fillRR(1180+k*60,540,52,120,24,'#d4a684');
  text('IN MY POCKET',1300,920,'500 34px PM','rgba(244,230,220,.8)');
  if(o.match){ctx.save();ctx.globalAlpha=o.match;ctx.strokeStyle='#f0683f';ctx.lineWidth=4;ctx.setLineDash([14,10]);line(800,400,1140,400,4,'#f0683f');ctx.restore();text('SAME SCRATCHES',970,370,'500 30px PM',`rgba(240,104,63,${o.match})`);}});vignA(.4);}
// ---------- the phone hits the floor ----------
function floorDrop(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#8a8478';ctx.fillRect(-900,-600,3720,2280);for(let i=0;i<14;i++)for(let j=0;j<10;j++){ctx.strokeStyle='rgba(0,0,0,.15)';ctx.lineWidth=3;ctx.strokeRect(-900+i*280,-600+j*280,280,280);}
  const d=o.drop??1;const s=lerp(2.2,1.3,d),y=lerp(300,560,d);ell(960,600,130*lerp(.6,1,d),40,0,`rgba(0,0,0,${.35*d})`);phoneTop(960,y,s,lerp(-.6,.2,d),o.crack||0,1);
  if(o.compare){phoneTop(1500,560,1.0,.15,1,0);text('THE ONE IN THE BOX',1500,830,'500 30px PM','rgba(30,30,30,.8)');}});vignA(.35);}
// ---------- the dog on the couch ----------
function couch(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#1d1c22';ctx.fillRect(-900,-600,3720,2280);ctx.fillStyle='#141318';ctx.fillRect(-900,860,3720,900);glow(1500,300,600,'rgba(255,200,140,1)',.15);
  fillRR(400,600,1100,180,40,'#3a4252');fillRR(400,440,1100,200,50,'#454e60');fillRR(340,520,110,300,40,'#3a4252');fillRR(1450,520,110,300,40,'#3a4252');
  ctx.save();ctx.translate(960,640);ctx.scale(1.9,1.9+Math.sin(t*1.4)*.02);ell(0,-20,120,44,0,'#c9a06a');circ(100,-40,40,'#c9a06a');ell(118,-70,14,26,.5,'#a07a4a');circ(116,-44,4,'#111');ctx.restore();
  if(o.noCollar)text('NO COLLAR',960,980,'500 34px PM','rgba(240,104,63,.85)');});vignA(.45);}
// ---------- a week of losing things ----------
function week(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#0f1014';ctx.fillRect(-900,-600,3720,2280);const days=['MON','TUE','WED','THU','FRI','SAT','SUN'];const icons=[null,'keys','headphones','wallet','watch','glasses','collar'];
  for(let i=0;i<7;i++){const x=180+i*260,on=(o.day??0)>=i;fillRR(x,280,220,520,20,on?'#1d2028':'#15171c');text(days[i],x+110,340,'500 34px PM',on?'#e8ecf4':'#555');
    const ic=icons[i];if(ic&&on){const f={keys,wallet,phone:phoneTop,headphones,watch,glasses,collar}[ic];ctx.save();ctx.translate(x+110,560);ctx.scale(.7,.7);ctx.translate(-(x+110),-560);f(x+110,560,1,0,t);ctx.restore();
      const xk=ss(clamp((o.day-i)*2));if(xk>0){line(x+40,480,lerp(x+40,x+180,xk),lerp(480,660,xk),10,'#d03a2a');}text('LOST',x+110,760,'500 26px PM',`rgba(208,58,42,${xk})`);}}});vignA(.3);}
function vignA(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
