// ===================== Green Light: places and things =====================
const GL={asph:'#1b1d22',walk:'#25272d',grass:'#11140f',red:'#ff3b30',amb:'#ffb02e',grn:'#39ff88',loop:'#39ff88',teal:'#56c7c9'};
function sigCol(s){return s==='g'?GL.grn:s==='y'?GL.amb:GL.red;}
// a signal head seen from the front: 3 lamps, state 'r'|'y'|'g'; arrow=true draws a green arrow lamp
function sigHead(x,y,s,state,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-40,-110,80,220,12,'#16181c');fillRR(-44,-114,88,228,14,'#0b0c0e');fillRR(-40,-110,80,220,12,'#1c1e23');
  const lamps=[['r',-68],['y',0],['g',68]];for(const[k,ly]of lamps){const on=state===k;circ(0,ly,28,on?sigCol(k):shade(sigCol(k),-.82));if(on){glow(0,ly,140,k==='g'?'rgba(57,255,136,1)':k==='y'?'rgba(255,176,46,1)':'rgba(255,59,48,1)',.55);}
    fillRR(-34,ly-36,68,10,4,'#0b0c0e');}
  if(o.arrow){const on=o.arrow==='g';circ(0,68,28,on?GL.grn:'#123020');if(on)glow(0,68,140,'rgba(57,255,136,1)',.55);
    ctx.fillStyle='#0b0c0e';ctx.beginPath();ctx.moveTo(-16,68);ctx.lineTo(-2,54);ctx.lineTo(-2,62);ctx.lineTo(16,62);ctx.lineTo(16,74);ctx.lineTo(-2,74);ctx.lineTo(-2,82);ctx.closePath();if(!on)ctx.globalAlpha=.4;ctx.fill();ctx.globalAlpha=1;}
  ctx.restore();}
// ---------- top-down intersection ----------
function loopRect(x,y,w,h,a){ctx.save();ctx.strokeStyle='#0c0d10';ctx.lineWidth=5;ctx.beginPath();const c=14;ctx.moveTo(x+c,y);ctx.lineTo(x+w-c,y);ctx.lineTo(x+w,y+c);ctx.lineTo(x+w,y+h-c);ctx.lineTo(x+w-c,y+h);ctx.lineTo(x+c,y+h);ctx.lineTo(x,y+h-c);ctx.lineTo(x,y+c);ctx.closePath();ctx.stroke();
  if(a>0){ctx.fillStyle=`rgba(57,255,136,${.16*a})`;ctx.fill();ctx.strokeStyle=`rgba(57,255,136,${.9*a})`;ctx.lineWidth=5;ctx.stroke();ctx.shadowColor='rgba(57,255,136,.9)';ctx.shadowBlur=24*a;ctx.stroke();}ctx.restore();}
function carTop(x,y,s,col,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.rot||0);
  if(o.beams){const g=ctx.createLinearGradient(100,0,520,0);g.addColorStop(0,'rgba(255,240,200,.35)');g.addColorStop(1,'rgba(255,240,200,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(96,-40);ctx.lineTo(520,-110);ctx.lineTo(520,110);ctx.lineTo(96,40);ctx.fill();}
  fillRR(-104,-46,208,92,22,col);fillRR(-30,-38,70,76,10,'#141a22');fillRR(48,-38,26,76,8,'#2a3646');fillRR(-70,-36,26,72,8,'#2a3646');
  fillRR(96,-38,10,18,3,'#fff3cf');fillRR(96,20,10,18,3,'#fff3cf');fillRR(-106,-38,8,16,3,'#c0392b');fillRR(-106,22,8,16,3,'#c0392b');
  if(o.you){circ(-2,-16,13,'#111317');ell(-6,-16,13,9,0,PAL.orange);}ctx.restore();}
function topInt(cam,t,o){wl(cam,1,()=>{ctx.fillStyle=GL.grass;ctx.fillRect(-900,-600,3720,2280);
  // sidewalks + roads
  ctx.fillStyle=GL.walk;ctx.fillRect(-900,340,3720,400);ctx.fillRect(760,-600,400,2280);
  ctx.fillStyle=GL.asph;ctx.fillRect(-900,380,3720,320);ctx.fillRect(800,-600,320,2280);
  for(let i=0;i<500;i++){ctx.fillStyle=hash(i)>.5?'rgba(255,255,255,.025)':'rgba(0,0,0,.08)';ctx.fillRect(hash(i*3)*3720-900,380+hash(i*7)*320,5,5);ctx.fillRect(800+hash(i*11)*320,hash(i*13)*2280-600,5,5);}
  // lane lines (yellow centre, white lane)
  for(let x=-900;x<780;x+=90)fillRR(x,536,50,8,3,'#c9a33a');for(let x=1140;x<2820;x+=90)fillRR(x,536,50,8,3,'#c9a33a');
  for(let y=-600;y<360;y+=90)fillRR(956,y,8,50,3,'#c9a33a');for(let y=720;y<1680;y+=90)fillRR(956,y,8,50,3,'#c9a33a');
  for(let x=-900;x<780;x+=90)fillRR(x,618,46,5,2,'#9aa0a8');
  line(780,546,780,700,10,'#d9dde2');line(806,360,960,360,10,'#d9dde2');
  // turn arrow painted in the turn lane
  ctx.fillStyle='rgba(217,221,226,.6)';ctx.beginPath();ctx.moveTo(560,580);ctx.lineTo(640,580);ctx.lineTo(640,568);ctx.lineTo(668,586);ctx.lineTo(640,604);ctx.lineTo(640,592);ctx.lineTo(560,592);ctx.fill();
  const d=o.det||{};
  loopRect(640,630,120,58,d.mine||0);loopRect(640,552,120,58,d.turn||0);loopRect(822,236,116,110,d.side||0);
  // streetlamps
  for(const[x,y]of[[740,330],[1180,330],[740,750],[1180,750]]){glow(x,y,240,'rgba(255,190,120,1)',.16);circ(x,y,9,'#2a2c31');}
  if(o.car!==false)carTop(o.carX??690,659,.9,'#34424f',{beams:true,you:true});
  // signal heads (top-down symbols) with state lights
  const s=o.sig||{};const lamp=(x,y,st,lab,arrow)=>{fillRR(x-22,y-22,44,44,8,'#0b0c0e');circ(x,y,13,sigCol(st));glow(x,y,90,st==='g'?'rgba(57,255,136,1)':'rgba(255,59,48,1)',.5);
    if(arrow){ctx.fillStyle='#0b0c0e';ctx.beginPath();ctx.moveTo(x+9,y);ctx.lineTo(x-3,y-8);ctx.lineTo(x-3,y+8);ctx.fill();}
    if(lab)text(lab,x,y+52,'500 22px PM','rgba(242,238,230,.75)');};
  lamp(1180,660,s.mine||'r','YOU');lamp(1180,580,s.turn||'r','TURN',true);lamp(880,780,s.side||'r','SIDE ST');
  if(o.labels){text('LOOP',700,725,'500 22px PM','rgba(57,255,136,.8)');}});}
// ---------- the loop, cut through the road ----------
function loopCut(cam,t,o){wl(cam,1,()=>{const g=ctx.createLinearGradient(0,-600,0,700);g.addColorStop(0,'#05070c');g.addColorStop(1,'#141826');ctx.fillStyle=g;ctx.fillRect(-900,-600,3720,1300);
  ctx.fillStyle='#2a2c31';ctx.fillRect(-900,700,3720,140);ctx.fillStyle='#1b1c20';ctx.fillRect(-900,840,3720,900);
  for(let i=0;i<300;i++){ctx.fillStyle=hash(i)>.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.18)';const x=hash(i*3)*3720-900,y=705+hash(i*7)*130;ctx.fillRect(x,y,6+hash(i)*6,4+hash(i*9)*4);}
  // the saw cuts with wire
  for(const x of[660,1260]){fillRR(x-10,700,20,60,3,'#0d0e10');for(let k=0;k<3;k++)circ(x,744-k*12,6,PAL.orange);}
  line(1260,760,1660,760,6,PAL.orange);line(1660,760,1660,520,6,PAL.orange);fillRR(1600,400,120,140,8,'#2a2f36');fillRR(1612,412,96,40,4,'#11141a');
  const det=o.det||0;circ(1660,500,12,det>0.5?GL.grn:'#123020');if(det>.5)glow(1660,500,90,'rgba(57,255,136,1)',.5);text('DETECTOR',1660,585,'500 18px PM','rgba(242,238,230,.6)');
  // field lines
  const sq=1-.35*det;ctx.save();ctx.lineWidth=3;for(let k=1;k<=5;k++){const ph=fract(t*.4+k*.2);ctx.strokeStyle=`rgba(86,199,201,${.5-k*.07})`;ctx.setLineDash([18,14]);ctx.lineDashOffset=-t*40;
    ctx.beginPath();ctx.ellipse(960,744,300+k*70,(60+k*48)*sq,0,Math.PI,2*Math.PI);ctx.stroke();}ctx.setLineDash([]);ctx.restore();
  text('LOOP OF WIRE',960,880,'500 26px PM','rgba(240,104,63,.9)');
  if(o.car)car(o.carX??960,700,1.25,{col:'#3a4a5c',beam:true});
  if(o.bike!=null){ctx.save();ctx.globalAlpha=o.bike;cyclist(o.bikeX??960,700,1.1,0);ctx.restore();}
  if(o.label)text(o.label,960,960,'500 30px PM','rgba(242,238,230,.85)');});}
// ---------- through the windshield ----------
function dashView(cam,t,o){wl(cam,1,()=>{const vp=[960,470];const g=ctx.createLinearGradient(0,-600,0,500);g.addColorStop(0,'#04060b');g.addColorStop(1,'#151a28');ctx.fillStyle=g;ctx.fillRect(-900,-600,3720,1100);
  // buildings
  for(let i=0;i<14;i++){const x=-600+i*230,h=120+hash(i)*220;ctx.fillStyle=i%2?'#0d1017':'#10141c';ctx.fillRect(x,470-h,200,h);for(let k=0;k<6;k++)if(hash(i*7+k)>.75)fillRR(x+20+(k%3)*60,470-h+20+Math.floor(k/3)*50,22,26,2,'rgba(240,160,80,.55)');}
  // road
  ctx.fillStyle='#14161b';ctx.beginPath();ctx.moveTo(vp[0]-40,vp[1]);ctx.lineTo(vp[0]+40,vp[1]);ctx.lineTo(2400,1180);ctx.lineTo(-480,1180);ctx.fill();
  ctx.fillStyle='#191b21';ctx.fillRect(-900,478,3720,26);// cross street
  const sp=o.speed||0,off=o.off??t*sp;
  for(let k=0;k<10;k++){const z=fract(k/10-off*.08);const y=lerp(vp[1]+6,1180,z*z),w=lerp(2,26,z*z),x=lerp(vp[0],vp[0]+120,z*z);if(z>.03)fillRR(x-w/2,y,w,lerp(4,80,z*z),2,'rgba(201,163,58,.75)');}
  // streetlamps passing
  for(let k=0;k<6;k++){const z=fract(k/6-off*.08);const zz=z*z;for(const s of[-1,1]){const x=vp[0]+s*lerp(60,1500,zz),y=lerp(vp[1]-6,-200,zz);line(x,lerp(vp[1]+4,1100,zz),x,y,lerp(1,12,zz),'#0b0d12');glow(x-s*lerp(4,40,zz),y,lerp(20,260,zz),'rgba(255,190,120,1)',.35);}}
  // signals ahead
  if(o.ahead){for(let k=0;k<4;k++){const z=fract(k/4-off*.05);const zz=z*z;const y=lerp(vp[1]-30,-40,zz);const s=lerp(.08,.9,zz);line(vp[0]-1400*zz-200,y-120*s,vp[0]+1400*zz+200,y-120*s,lerp(1,4,zz),'#0b0d12');sigHead(vp[0]+lerp(0,140,zz),y,s,'g');}}
  else if(!o.nosig){line(-200,150,2120,150,4,'#0b0d12');sigHead(o.sigX??1040,270,.75,o.light||'r');if(o.arrow)sigHead(820,270,.75,'r',{arrow:o.arrow});}
  // windshield frame, hood, dash, wheel
  ctx.fillStyle='#07080a';ctx.beginPath();ctx.moveTo(-900,-600);ctx.lineTo(2820,-600);ctx.lineTo(2820,40);ctx.lineTo(-900,40);ctx.fill();
  poly([-900,40,-120,40,-460,1180,-900,1180],'#07080a');poly([2820,40,2040,40,2380,1180,2820,1180],'#07080a');
  ctx.fillStyle='#0c0d10';ctx.beginPath();ctx.moveTo(-900,1180);ctx.lineTo(-900,880);ctx.quadraticCurveTo(960,820,2820,880);ctx.lineTo(2820,1180);ctx.fill();
  fillRR(-200,930,2320,300,30,'#0a0b0d');glow(520,990,90,'rgba(255,140,60,1)',.25);glow(780,990,90,'rgba(120,200,255,1)',.2);
  ctx.save();ctx.strokeStyle='#050506';ctx.lineWidth=46;ctx.beginPath();ctx.arc(600,1220,330,Math.PI*1.08,Math.PI*1.92);ctx.stroke();ctx.restore();circ(330,1010,30,'#15171c');circ(870,1010,30,'#15171c');
  // rear-view mirror with the empty road behind
  const mx=o.mx??1180,my=o.my??120;line(mx,40,mx,my-50,14,'#07080a');ctx.save();rr(mx-210,my-60,420,120,20);ctx.fillStyle='#050608';ctx.fill();rr(mx-200,my-52,400,104,16);ctx.clip();
  const mg=ctx.createLinearGradient(0,my-52,0,my+52);mg.addColorStop(0,'#0a0d14');mg.addColorStop(1,'#16181e');ctx.fillStyle=mg;ctx.fillRect(mx-200,my-52,400,104);
  ctx.fillStyle='#1b1d22';ctx.beginPath();ctx.moveTo(mx-6,my-6);ctx.lineTo(mx+6,my-6);ctx.lineTo(mx+160,my+52);ctx.lineTo(mx-160,my+52);ctx.fill();
  for(let k=0;k<5;k++){const z=fract(k/5+off*.08);line(mx-z*60,my-6+z*58,mx-z*60,my-2+z*62,2+z*3,'rgba(201,163,58,.6)');}
  for(const s of[-1,1])glow(mx+s*120,my-30,40,'rgba(255,190,120,1)',.35);
  if(o.mirrorRed)glow(mx,my+20,60,'rgba(255,59,48,1)',o.mirrorRed*.35);
  ctx.restore();});}
// ---------- out the driver's window: the empty lane ----------
function sideWindow(cam,t,o){wl(cam,1,()=>{const g=ctx.createLinearGradient(0,-600,0,560);g.addColorStop(0,'#05070d');g.addColorStop(1,'#1c2234');ctx.fillStyle=g;ctx.fillRect(-900,-600,3720,1200);
  for(let i=0;i<10;i++){const x=-500+i*300,h=160+hash(i+4)*240;ctx.fillStyle='#10141c';ctx.fillRect(x,560-h,260,h);for(let k=0;k<4;k++)if(hash(i*5+k)>.6)fillRR(x+30+k*55,560-h+30,24,28,2,'rgba(240,160,80,.5)');}
  ctx.fillStyle='#1d2027';ctx.fillRect(-900,560,3720,1100);
  for(const x of[200,900,1600]){line(x,560,x,60,10,'#0b0d12');glow(x+30,70,300,'rgba(255,190,120,1)',.45);}
  // wet road: streaks of the streetlights and the green arrow
  const refl=(x,c,a)=>{for(let k=0;k<26;k++){const y=600+k*10;ctx.fillStyle=c.replace('A',String(Math.max(0,(a-k*.008)*(1+.25*Math.sin(t*3+k)))));ctx.fillRect(x-40+Math.sin(k*1.7+t*2)*10,y,80,5);}};
  for(const x of[230,930,1630])refl(x,'rgba(255,190,120,A)',.32);
  if(o.arrow==='g')refl(1720,'rgba(57,255,136,A)',.5);
  line(-900,640,2820,640,6,'rgba(217,221,226,.55)');
  // the gap: a car-sized patch where the reflections are blocked
  if(o.gap){ctx.save();ctx.globalAlpha=o.gap;ctx.fillStyle='#1d2027';rr(520,600,1000,170,30);ctx.fill();ctx.fillStyle='#0d0f13';ctx.beginPath();ctx.ellipse(1020,775,520,24,0,0,7);ctx.fill();ctx.restore();}
  // pole + signal with the arrow
  line(1720,560,1720,140,16,'#0b0d12');sigHead(1720,200,.85,'r',{arrow:o.arrow||'r'});
  if(o.vapor)puffs(480,730,t,o.vapor*1.6,16,4);
  // window frame (door, pillar, mirror)
  ctx.fillStyle='#07080a';ctx.beginPath();ctx.rect(-900,-600,3720,2280);ctx.moveTo(-60,60);ctx.quadraticCurveTo(-60,-40,60,-40);ctx.lineTo(1960,-40);ctx.lineTo(1960,860);ctx.lineTo(-60,860);ctx.closePath();ctx.fill('evenodd');
  fillRR(-900,860,3720,600,0,'#0b0c0f');line(-60,880,1960,880,8,'#1a1c21');
  fillRR(40,880,300,180,30,'#0b0c0f');ctx.save();rr(56,894,268,150,22);ctx.clip();ctx.fillStyle='#141821';ctx.fillRect(56,894,268,150);ctx.fillStyle='#1d2027';ctx.fillRect(56,980,268,70);line(56,1000,324,1000,3,'rgba(217,221,226,.4)');ctx.restore();
  if(o.hand)circ(1700,860,34,'#15171c');});}
// ---------- the garage, from the driveway ----------
function puffs(x,y,t,a,n=12,seed=1){for(let i=0;i<n;i++){const k=fract(t*.3+i/n+hash(i+seed)*.2);const px=x+(hash(i*3+seed)-.5)*40+k*120+Math.sin(t*1.3+i)*20,py=y-k*200;circ(px,py,16+k*64,'#d6dde8',a*.17*(1-k)*(k<.08?k/.08:1));}}
function garage(cam,t,o){wl(cam,.3,()=>{const g=ctx.createLinearGradient(0,-600,0,700);g.addColorStop(0,'#03050a');g.addColorStop(1,'#111521');ctx.fillStyle=g;ctx.fillRect(-1600,-1200,5120,2800);for(const[x,y,r,a]of SKYSTARS)circ(x,y-300,r,'#e9eefc',a*.7);});
  wl(cam,1,()=>{
    // house
    ctx.fillStyle='#22252b';ctx.fillRect(120,140,1680,780);for(let y=150;y<920;y+=30)line(120,y,1800,y,2,'rgba(0,0,0,.18)');poly([60,150,1860,150,960,-120],'#15171b');
    // garage interior
    const ox=440,oy=300,ow=1040,oh=600,bot=oy+oh;
    const ig=ctx.createLinearGradient(0,oy,0,bot);ig.addColorStop(0,o.light?'#3c3a36':'#141414');ig.addColorStop(1,o.light?'#2a2826':'#0d0d0d');ctx.fillStyle=ig;ctx.fillRect(ox,oy,ow,oh);
    fillRR(ox+40,oy+60,300,22,3,'#2a2622');fillRR(ox+40,oy+150,300,22,3,'#2a2622');for(let k=0;k<5;k++)fillRR(ox+60+k*55,oy+30,40,30,3,'#3a3430');
    ctx.fillStyle=o.light?'#47433e':'#151515';ctx.beginPath();ctx.moveTo(ox,bot);ctx.lineTo(ox+ow,bot);ctx.lineTo(ox+ow-60,oy+420);ctx.lineTo(ox+60,oy+420);ctx.fill();
    if(o.light){circ(960,oy+24,12,'#fff3d0');glow(960,oy+40,520,'rgba(255,230,180,1)',.35);}
    ell(1230,bot-40,130,22,0,'rgba(0,0,0,.35)');// oil stain in the empty bay
    // tire tracks: mine (left) + the other one (right)
    const tr=(x,a)=>{if(a<=0)return;ctx.save();ctx.globalAlpha=a;for(const dx of[-120,120]){const g2=ctx.createLinearGradient(0,oy+430,0,1080);g2.addColorStop(0,'rgba(10,12,16,0)');g2.addColorStop(1,'rgba(10,12,16,.75)');ctx.fillStyle=g2;ctx.beginPath();ctx.moveTo(x+dx*0.8-16,oy+430);ctx.lineTo(x+dx*0.8+16,oy+430);ctx.lineTo(x+dx*1.4+40,1080);ctx.lineTo(x+dx*1.4-40,1080);ctx.fill();}ctx.restore();};
    tr(720,o.myTracks??1);tr(1230,o.tracks||0);
    // my car (rear view) with me in it
    const cx=720,cy=bot;fillRR(cx-210,cy-210,420,170,40,'#34424f');fillRR(cx-160,cy-300,320,110,40,'#2c3844');fillRR(cx-140,cy-284,280,80,24,'#141a22');
    circ(cx-60,cy-246,22,'#111317');ell(cx-62,cy-262,22,12,0,PAL.orange);
    for(const s of[-1,1]){fillRR(cx+s*170-30,cy-170,60,30,8,o.tail?'#ff3b30':'#5a1a16');if(o.tail)glow(cx+s*170,cy-155,110,'rgba(255,59,48,1)',.45);fillRR(cx+s*150-34,cy-48,68,50,10,'#0b0c0f');}
    fillRR(cx-50,cy-120,100,36,4,'#d8d4c6');text('7GL 314',cx,cy-94,'500 20px PM','#222');
    if(o.exhaustMine)puffs(cx-110,cy-40,t,o.exhaustMine,8,3);
    // the empty bay: exhaust from nowhere
    if(o.vapor)puffs(1170,cy-36,t,o.vapor,14,9);
    // the door coming down
    const c=clamp(o.door??0);if(c>0){const dh=oh*c;ctx.fillStyle='#cfcac2';ctx.fillRect(ox,oy,ow,dh);for(let k=1;k<5;k++){const y=oy+dh-k*(oh/4);if(y>oy)line(ox,y,ox+ow,y,4,'rgba(0,0,0,.25)');}line(ox,oy+dh,ox+ow,oy+dh,6,'#8f8a82');
      ctx.fillStyle='rgba(0,0,0,.45)';ctx.fillRect(ox,oy,ow,dh);}
    // frame
    ctx.strokeStyle='#d9d5cc';ctx.lineWidth=18;ctx.strokeRect(ox-9,oy-9,ow+18,oh+18);
    // photo eyes + beam
    const by=bot-30;fillRR(ox+6,by-14,26,28,5,'#2b2f36');fillRR(ox+ow-32,by-14,26,28,5,'#2b2f36');circ(ox+19,by,5,GL.amb);
    const brk=o.brk;const blink=brk!=null&&Math.sin(t*14)>0;circ(ox+ow-19,by,5,brk!=null?(blink?'#ff3b30':'#3a0d0a'):GL.grn);
    if(o.beam){ctx.save();ctx.globalAlpha=o.beam;const x1=brk!=null?brk:ox+ow-32;line(ox+32,by,x1,by,3,'rgba(255,70,60,.9)');ctx.shadowColor='rgba(255,70,60,1)';ctx.shadowBlur=14;line(ox+32,by,x1,by,2,'rgba(255,120,110,1)');ctx.restore();
      if(brk!=null){glow(brk,by,60,'rgba(255,59,48,1)',.7*o.beam);circ(brk,by,6,'#ffd0c8',o.beam);}}
    // driveway
    ctx.fillStyle='#232427';ctx.beginPath();ctx.moveTo(ox-40,bot+9);ctx.lineTo(ox+ow+40,bot+9);ctx.lineTo(ox+ow+400,1700);ctx.lineTo(ox-400,1700);ctx.fill();
    // motion floodlight
    fillRR(930,200,60,30,6,'#2a2c31');if(o.flood){glow(960,230,700,'rgba(230,240,255,1)',.22*o.flood);fillRR(934,206,52,18,4,'#f4f6ff');}
  });}
function vign(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
