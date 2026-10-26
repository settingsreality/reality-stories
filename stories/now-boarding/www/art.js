// ===================== Now Boarding: the tracker map, the phone, the house =====================
const NB={bg:'#0d1320',land:'#121a28',road:'#223047',road2:'#2d3d58',hwy:'#3b4c6b',rwy:'#2a3448',lab:'#5f6f8c',plane:'#f2c14e',home:PAL.orange};
// the route the plane takes (map units)
const ROUTE=[[-500,300],[600,300],[700,330],[740,420],[1000,420],[1060,420],[1300,420],[1800,420],[1800,740],[2560,740],[2600,740],[2600,690],[2600,662]];
const RLEN=(()=>{const a=[0];for(let i=1;i<ROUTE.length;i++)a.push(a[i-1]+Math.hypot(ROUTE[i][0]-ROUTE[i-1][0],ROUTE[i][1]-ROUTE[i-1][1]));return a;})();
const RD={exit:RLEN[3],gate:RLEN[4],fence:RLEN[5],hwy:RLEN[6],corner:RLEN[7],maple:RLEN[8],near:RLEN[9],turn:RLEN[10],end:RLEN[12]};
function routeAt(d){d=clamp(d,0,RLEN[RLEN.length-1]);let i=1;while(i<RLEN.length-1&&RLEN[i]<d)i++;const k=(d-RLEN[i-1])/(RLEN[i]-RLEN[i-1]||1);
  const[a,b]=[ROUTE[i-1],ROUTE[i]];return{x:lerp(a[0],b[0],k),y:lerp(a[1],b[1],k),h:Math.atan2(b[1]-a[1],b[0]-a[0])};}
// top-down airliner icon pointing along heading h (screen-constant size via s)
function planeIcon(x,y,h,s,col=NB.plane,glowA=0){ctx.save();ctx.translate(x,y);ctx.rotate(h);ctx.scale(s,s);if(glowA)glow(0,0,90,'rgba(242,193,78,1)',glowA);
  ctx.fillStyle=col;ctx.beginPath();ctx.ellipse(0,0,34,6,0,0,7);ctx.fill();
  poly([6,-3,-6,-34,-14,-34,-8,-3,-8,3,-14,34,-6,34,6,3],col);poly([-26,-2,-34,-14,-38,-14,-34,-2,-34,2,-38,14,-34,14,-26,2],col);ctx.restore();}
const OTHER=(()=>{const r=rng(8),a=[];for(let i=0;i<26;i++)a.push({x:r()*6000-1600,y:r()*3000-1000,h:r()*6.28,v:20+r()*30});return a;})();
const HOUSES=(()=>{const r=rng(5),a=[];for(let bx=0;bx<5;bx++)for(let by=0;by<3;by++)for(let k=0;k<6;k++){const x=1860+bx*300+k*44,y=480+by*300+(k%2?0:160);if(Math.abs(x-2600)<40&&Math.abs(y-600)<60)continue;if(r()>.2)a.push([x,y]);}return a;})();
function mapView(cam,t,o){wl(cam,1,({Z})=>{ctx.fillStyle=NB.bg;ctx.fillRect(-4000,-3000,10000,7000);
  const s=1/Z;// keep strokes/labels readable at any zoom
  // fields
  ctx.fillStyle=NB.land;ctx.fillRect(-1600,-1200,7000,3600);for(let i=0;i<40;i++){ctx.strokeStyle='rgba(255,255,255,.025)';ctx.lineWidth=2*s;ctx.strokeRect(-1600+hash(i)*6000,-1000+hash(i*3)*3000,200+hash(i*7)*400,160+hash(i*9)*300);}
  // airport
  fillRR(-700,140,1760,580,20,'#161f30');ctx.save();ctx.setLineDash([16*s,12*s]);ctx.strokeStyle='rgba(160,175,200,.5)';ctx.lineWidth=3*s;ctx.strokeRect(-640,160,1690,540);ctx.restore();
  fillRR(-600,276,1400,48,6,NB.rwy);for(let x=-560;x<760;x+=70)fillRR(x,297,36,6,2,'rgba(255,255,255,.55)');text('RWY 9',-560,262,`500 ${18*s}px PM`,NB.lab,'left');
  fillRR(560,404,520,32,6,NB.rwy);line(700,330,740,420,26,NB.rwy);
  fillRR(820,460,180,100,8,'#28324a');for(const gx of[850,900,950])line(gx,460,gx,436,6,'#3a4766');text('GATES',910,600,`500 ${16*s}px PM`,NB.lab);
  // highway + roads
  line(1300,-1200,1300,2400,40,NB.hwy);text('HWY 9',1330,0,`500 ${18*s}px PM`,NB.lab,'left');
  line(1060,420,1800,420,16,NB.road2);text('AIRPORT RD',1520,400,`500 ${15*s}px PM`,NB.lab);
  for(let k=0;k<6;k++){line(1800+k*300,300,1800+k*300,1350,12,NB.road);}for(let k=0;k<4;k++){line(1800,440+k*300,3300,440+k*300,12,NB.road);}
  text('MAPLE ST',2200,724,`500 ${15*s}px PM`,NB.lab);text('OAK ST',1820,600,`500 ${15*s}px PM`,NB.lab,'left');
  for(const[x,y]of HOUSES)fillRR(x-14,y-14,28,28,3,'#1d2840');
  // home
  fillRR(2574,610,52,46,4,'#3a2a24');fillRR(2590,656,20,84,2,'#1d2840');
  if(o.pin!==false){const py=600;ctx.save();ctx.translate(2600,py);ctx.scale(s*1.4,s*1.4);ctx.fillStyle=NB.home;ctx.beginPath();ctx.arc(0,-34,18,0,7);ctx.fill();poly([-14,-24,14,-24,0,0],NB.home);circ(0,-34,7,'#0d1320');text('HOME',0,-62,'500 15px PM',NB.home);ctx.restore();}
  // other flights
  if(o.others){for(const p of OTHER){const x=p.x+Math.cos(p.h)*p.v*t,y=p.y+Math.sin(p.h)*p.v*t;planeIcon(x,y,p.h,s*.8,'#8ea0c4');}}
  // the trail + the plane
  if(o.d!=null){const d=o.d;ctx.save();ctx.strokeStyle='rgba(242,193,78,.55)';ctx.lineWidth=5*s;ctx.lineJoin='round';ctx.beginPath();let first=true;
    for(let x=Math.max(0,d-2600);x<=d;x+=8){const p=routeAt(x);first?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y);first=false;}ctx.stroke();ctx.restore();
    const p=routeAt(d);planeIcon(p.x,p.y,o.h??p.h,s*1.4,NB.plane,.35);
    if(o.tag){ctx.save();ctx.translate(p.x,p.y);ctx.scale(s,s);fillRR(30,-70,150,38,8,'rgba(13,19,32,.9)');text('SR 2207',105,-44,'500 20px PM',NB.plane);ctx.restore();}}
  });
  // app chrome (screen space)
  ctx.save();ctx.setTransform(SC,0,0,SC,0,0);
  fillRR(1640,96,240,54,27,'rgba(13,19,32,.85)');circ(1676,123,9,'#ff3b30',.6+.4*Math.sin(t*5));text('LIVE',1700,133,'500 26px PM','#e8ecf4','left');
  if(o.card)flightCard(o.card,t);
  if(o.card&&o.card.boarding){const a=o.card.boarding,p=.75+.25*Math.sin(t*6);ctx.globalAlpha=a;fillRR(560,120,1300,230,36,'rgba(14,20,33,.96)');ctx.strokeStyle=`rgba(240,104,63,${p})`;ctx.lineWidth=6;rr(560,120,1300,230,36);ctx.stroke();
    text('SR 2207',620,185,'500 34px PM',NB.plane,'left');text('now',1820,185,'500 28px PM','#8a96aa','right');text('NOW BOARDING',1210,295,'500 96px PM',`rgba(240,104,63,${p})`);ctx.globalAlpha=1;}
  ctx.restore();}
function flightCard(c,t){const x=40,y=c.boarding?660:740,w=700,h=c.boarding?380:300;fillRR(x,y,w,h,26,'rgba(14,20,33,.94)');ctx.strokeStyle='rgba(120,140,180,.25)';ctx.lineWidth=2;rr(x,y,w,h,26);ctx.stroke();
  text('SR 2207',x+32,y+62,'500 40px PM',NB.plane,'left');text('DEN  →  PIT',x+w-32,y+62,'500 30px PM','#c9d2e4','right');
  const stc=c.status==='Arrived'?'#39ff88':c.status==='Landed'?'#56c7c9':'#f2c14e';fillRR(x+32,y+96,280,52,26,'rgba(255,255,255,.06)');circ(x+60,y+122,9,stc);text(c.status.toUpperCase(),x+82,y+132,'500 28px PM',stc,'left');
  text('ALT',x+32,y+206,'500 22px PM','#6f7f9c','left');text(c.alt||'0 ft',x+32,y+246,'500 32px PM','#e8ecf4','left');
  text('SPEED',x+260,y+206,'500 22px PM','#6f7f9c','left');text((c.spd??0)+' mph',x+260,y+246,'500 32px PM','#e8ecf4','left');
  text('GATE',x+480,y+206,'500 22px PM','#6f7f9c','left');text(c.boarding?'HOME':(c.gate||'B14'),x+480,y+246,'500 32px PM',c.boarding?'#f0683f':'#e8ecf4','left');
  if(c.boarding){const a=c.boarding*(.65+.35*Math.sin(t*6));fillRR(x+32,y+282,w-64,68,14,`rgba(240,104,63,${.18*a})`);text('NOW BOARDING',x+w/2,y+330,'500 40px PM',`rgba(240,104,63,${a})`);}}
// ---------- the phone in your hand ----------
function phone(cam,t,draw){wl(cam,1,()=>{ctx.fillStyle='#0d0f13';ctx.fillRect(-900,-600,3720,2280);glow(960,540,700,'rgba(120,150,220,1)',.12);ctx.save();ctx.translate(960,560);ctx.rotate(-.04);
  fillRR(-280,-560,560,1120,70,'#111');fillRR(-262,-540,524,1080,56,'#f4f5f7');ctx.save();rr(-262,-540,524,1080,56);ctx.clip();draw();ctx.restore();
  ctx.fillStyle='#1c1f25';ctx.beginPath();ctx.ellipse(-60,640,330,190,-.2,0,7);ctx.fill();for(let i=0;i<4;i++)fillRR(230,300+i*80,130,62,28,'#1c1f25');ctx.restore();});}
function airlineScreen(k){ctx.fillStyle='#f4f5f7';ctx.fillRect(-262,-540,524,1080);fillRR(-262,-540,524,170,0,'#1e2d4a');text('FLIGHT STATUS',0,-430,'500 28px PM','#cdd7ea');
  text('SR 2207',0,-300,'500 64px PM','#111');text('Denver  →  Pittsburgh',0,-240,'400 28px PM','#555');
  const a=ss(k);fillRR(-200,-170,400,80,40,`rgba(214,48,39,${a})`);text('CANCELLED',0,-117,'500 36px PM',`rgba(255,255,255,${a})`);
  text('Departure: never left the gate',0,-20,'400 24px PM','#666');text('Aircraft: none assigned',0,20,'400 24px PM','#666');}
function textScreen(k){ctx.fillStyle='#f4f5f7';ctx.fillRect(-262,-540,524,1080);fillRR(-262,-540,524,150,0,'#e9ebef');circ(0,-470,34,'#8a96aa');text('Dad',0,-405,'500 26px PM','#222');
  text('11:58 PM',0,-330,'400 20px PM','#999');const b=ss(k);if(b>0){ctx.save();ctx.globalAlpha=b;ctx.translate(0,(1-b)*30);fillRR(-236,-310,460,250,30,'#e3e5ea');
    text('Stuck at the airport.',-206,-245,'400 36px IS','#111','left');text('Flight cancelled.',-206,-190,'400 36px IS','#111','left');text("Don't wait up.",-206,-135,'400 36px IS','#111','left');ctx.restore();}}
// ---------- the living room ----------
function room(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#16151a';ctx.fillRect(-900,-600,3720,2280);ctx.fillStyle='#100f13';ctx.fillRect(-900,860,3720,900);
  // window with the street outside
  const wx=1300,wy=120,ww=520,wh=520;ctx.save();rr(wx,wy,ww,wh,6);ctx.clip();const g=ctx.createLinearGradient(0,wy,0,wy+wh);g.addColorStop(0,'#070a12');g.addColorStop(1,'#151b29');ctx.fillStyle=g;ctx.fillRect(wx,wy,ww,wh);
  ctx.fillStyle='#1b1f27';ctx.fillRect(wx,wy+380,ww,140);line(wx+400,wy+400,wx+400,wy+120,6,'#0b0d12');glow(wx+400,wy+130,160,'rgba(255,190,120,1)',.45);ctx.restore();
  ctx.strokeStyle='#2a2830';ctx.lineWidth=18;ctx.strokeRect(wx,wy,ww,wh);line(wx+ww/2,wy,wx+ww/2,wy+wh,10,'#2a2830');line(wx,wy+wh/2,wx+ww,wy+wh/2,10,'#2a2830');
  fillRR(wx-60,wy-30,60,wh+100,6,'#2b2026');fillRR(wx+ww,wy-30,60,wh+100,6,'#2b2026');
  // lamp off, couch
  fillRR(-100,640,900,140,30,'#2e3440');fillRR(-100,520,900,160,40,'#363d4b');fillRR(-140,560,80,240,30,'#2e3440');fillRR(760,560,80,240,30,'#2e3440');
  if(o.sit){YOU({x:380,y:770,h:380,face:1,eyes:1,legA:[1.45,1.45],legB:[.1,.05],lift:110,armL:2.1,elbowL:-1.2,held:(hx,hy,h)=>{fillRR(hx-6,hy-30,22,40,5,'#0b0c0f');glow(hx+40,hy-30,120,'rgba(150,180,255,1)',.5);}});}
  if(o.atWindow){YOU({x:1560,y:880,h:420,face:-1,eyes:0,armL:2.0,elbowL:-1.0,held:(hx,hy)=>{fillRR(hx-10,hy-30,22,40,5,'#0b0c0f');glow(hx,hy-20,90,'rgba(150,180,255,1)',.4);}});}});}
// ---------- out the window: the empty street ----------
function street(cam,t,o){wl(cam,1,()=>{const g=ctx.createLinearGradient(0,-600,0,600);g.addColorStop(0,'#04060c');g.addColorStop(1,'#141a28');ctx.fillStyle=g;ctx.fillRect(-900,-600,3720,1300);for(const[x,y,r,a]of SKYSTARS)circ(x,y-200,r,'#e9eefc',a*.6);
  for(let i=0;i<7;i++){const x=-300+i*420;fillRR(x,300,300,260,4,'#141821');poly([x-20,300,x+320,300,x+150,190],'#0e1118');fillRR(x+120,470,50,90,3,'#0b0d12');}
  ctx.fillStyle='#1c1f26';ctx.fillRect(-900,560,3720,260);ctx.fillStyle='#15171c';ctx.fillRect(-900,820,3720,900);
  for(let x=-900;x<2820;x+=120)fillRR(x,688,60,6,2,'rgba(201,163,58,.5)');
  streetLamp(1500,560,360,-1);lampPool(1450,700);
  // my driveway, right in front of the window
  ctx.fillStyle='#22252b';ctx.beginPath();ctx.moveTo(700,820);ctx.lineTo(1220,820);ctx.lineTo(1500,1300);ctx.lineTo(420,1300);ctx.fill();
  if(o.wind){for(let i=0;i<30;i++){const k=fract(t*.6+i/30);circ(lerp(600,1300,hash(i)),lerp(1200,860,k),2+hash(i*3)*3,'#8a8f99',o.wind*(1-k)*.6);}}
  // window frame
  ctx.fillStyle='#0b0b0e';ctx.beginPath();ctx.rect(-900,-600,3720,2280);ctx.rect(-40,-80,2000,1240);ctx.fill('evenodd');line(960,-80,960,1160,22,'#0b0b0e');line(-40,540,1960,540,22,'#0b0b0e');
  });}
function vign(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
