// ===================== Steps: the bedroom, the phone, the ring =====================
// side view, from a camera on a shelf: nightstand + phone on the left, the bed, you asleep
function bedCam(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#1c2026';ctx.fillRect(-900,-600,3720,2280);ctx.fillStyle='#15181d';ctx.fillRect(-900,860,3720,800);
  // wall details
  fillRR(1300,140,300,220,6,'#262b33');fillRR(1320,160,260,180,4,'#2e343d');
  // nightstand + lamp + phone
  fillRR(260,600,240,260,8,'#3a3530');fillRR(280,640,200,20,4,'#2a2622');line(330,600,330,470,8,'#4a4540');ell(330,460,60,36,0,'#5a554e');
  const ph=o.phone||'up';if(ph!=='gone'){fillRR(400,584,70,14,4,'#0b0c0e');if(ph==='up'){glow(435,584,80,'rgba(200,220,255,1)',.35);fillRR(404,582,62,6,3,'#bcd0ff');}}
  // bed
  fillRR(560,640,1080,140,14,'#2e3440');fillRR(560,600,1080,60,20,'#4a5468');line(580,780,580,860,16,'#20242c');line(1620,780,1620,860,16,'#20242c');fillRR(520,460,50,400,10,'#20242c');
  fillRR(600,560,200,60,20,'#d5dae2');
  // you, asleep (a head on the pillow, a shape under the blanket)
  circ(680,560,40,'#111317');ell(670,532,40,22,-.2,PAL.orange);ctx.fillStyle='#5a6478';ctx.beginPath();ctx.moveTo(700,600);ctx.quadraticCurveTo(900,520+Math.sin(t*1.2)*4,1200,560);ctx.quadraticCurveTo(1450,560,1580,600);ctx.lineTo(1580,640);ctx.lineTo(700,640);ctx.fill();
  if(o.dirt)for(let i=0;i<14;i++)circ(900+hash(i)*600,610+hash(i*3)*20,3+hash(i*5)*4,'#2a2018');});
  if(o.ir!==false){ctx.save();ctx.setTransform(1,0,0,1,0,0);const img=ctx.getImageData(0,0,1080,608);const d=img.data;const f=Math.floor(t*12);for(let i=0;i<d.length;i+=4){const isO=d[i]>200&&d[i+1]<140;if(isO)continue;const n=((i*7919+f*104729)%37)-18;const v=(d[i]*.3+d[i+1]*.59+d[i+2]*.11)*1.5+n;d[i]=v*.9;d[i+1]=v;d[i+2]=v*.92;}ctx.putImageData(img,0,0);
    ctx.font='500 18px PM';ctx.textAlign='left';ctx.fillStyle='#e8e8e8';ctx.fillText('BEDROOM CAM  '+(o.stamp||'03:11:58'),40,60);if(Math.sin(t*5)>0){ctx.fillStyle='#ff3b30';ctx.beginPath();ctx.arc(1010,54,8,0,7);ctx.fill();}ctx.fillStyle='#e8e8e8';ctx.fillText('REC',960,60);ctx.restore();}}
// the phone in your hand: the step count, or the walk map
function stepPhone(cam,t,o){wl(cam,1,()=>{ctx.fillStyle=o.bg||'#0d0f13';ctx.fillRect(-900,-600,3720,2280);ctx.save();ctx.translate(960,560);ctx.rotate(-.04);
  fillRR(-280,-560,560,1120,70,'#111');fillRR(-262,-540,524,1080,56,'#f4f5f7');
  if(o.mode!=='map'){text('STEPS · LAST NIGHT',0,-400,'500 30px PM','#777');const k=o.k??1;ctx.strokeStyle='#e3e6ea';ctx.lineWidth=34;ctx.beginPath();ctx.arc(0,-130,170,0,7);ctx.stroke();ctx.strokeStyle='#ff5a3a';ctx.lineCap='round';ctx.beginPath();ctx.arc(0,-130,170,-Math.PI/2,-Math.PI/2+Math.PI*2*Math.min(1,k*1.3));ctx.stroke();
    text(Math.round(4212*k).toLocaleString('en-US'),0,-110,'500 96px PM','#111');text('steps',0,-50,'400 30px PM','#777');text('2:58 AM – 3:52 AM',0,140,'500 30px PM','#333');text('You were asleep',0,190,'400 26px PM','#999');}
  else{text('WALK · 3:12 AM',0,-440,'500 30px PM','#777');// a floor plan: room, bed, nightstand
    ctx.save();ctx.translate(0,-80);fillRR(-220,-300,440,600,10,'#e9ecf0');ctx.strokeStyle='#c9ced6';ctx.lineWidth=6;ctx.strokeRect(-220,-300,440,600);fillRR(-90,-160,180,300,10,'#c9ced6');fillRR(-90,-160,180,60,10,'#b9bec6');fillRR(-170,-180,60,50,6,'#b9a890');text('bed',0,10,'500 26px PM','#777');
      const k=o.route||0;const laps=7;const N=Math.floor(400*k);ctx.strokeStyle='#ff5a3a';ctx.lineWidth=5;ctx.lineJoin='round';ctx.beginPath();for(let i=0;i<=N;i++){const u=i/400*laps*Math.PI*2-Math.PI*.75;const rx=150+Math.sin(i*.7)*4,ry=230+Math.cos(i*.9)*4;const x=Math.cos(u)*rx,y=Math.sin(u)*ry-10;i?ctx.lineTo(x,y):ctx.moveTo(-140,-155);}ctx.stroke();
      circ(-140,-155,12,'#3a8ad0');if(N>0){const u=N/400*laps*Math.PI*2-Math.PI*.75;circ(Math.cos(u)*150,Math.sin(u)*230-10,14,'#ff5a3a');}ctx.restore();
    text(Math.round(4212*(o.route||0)).toLocaleString('en-US')+' steps · '+Math.round(40*(o.route||0))+' min',0,380,'500 30px PM','#333');}
  ctx.fillStyle='#1c1f25';ctx.beginPath();ctx.ellipse(-60,640,330,190,-.2,0,7);ctx.fill();for(let i=0;i<4;i++)fillRR(230,300+i*80,130,62,28,'#1c1f25');ctx.restore();});}
// straight down on the bedroom: carpet, bed, the worn ring, and (at the end) what walks it
function topDown(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#3a3330';ctx.fillRect(-900,-600,3720,2280);for(let i=0;i<1400;i++){ctx.fillStyle=hash(i)>.5?'rgba(255,255,255,.03)':'rgba(0,0,0,.05)';ctx.fillRect(hash(i*3)*3720-900,hash(i*7)*2280-600,4,4);}
  const cx=960,cy=540;const r=o.ring||0;if(r>0){ctx.save();ctx.globalAlpha=r;ctx.strokeStyle='rgba(205,190,170,.45)';ctx.lineWidth=90;ctx.beginPath();ctx.ellipse(cx,cy,520,400,0,0,7);ctx.stroke();ctx.strokeStyle='rgba(120,100,85,.35)';ctx.lineWidth=6;for(let k=-1;k<=1;k++){ctx.beginPath();ctx.ellipse(cx,cy,520+k*30,400+k*30,0,0,7);ctx.stroke();}ctx.restore();}
  // bed
  fillRR(cx-300,cy-220,600,440,20,'#4a5468');fillRR(cx-300,cy-220,140,440,20,'#d5dae2');fillRR(620,cy-300,120,100,8,'#3a3530');
  const carried=o.carry||0;
  if(carried<1){circ(cx-230,cy,46,'#111317');ell(cx-262,cy,22,44,0,PAL.orange);ctx.fillStyle='#5a6478';ctx.beginPath();ctx.ellipse(cx+40,cy,230,150,0,0,7);ctx.fill();}
  if(o.walker){const a=o.walker.ang;const x=cx+Math.cos(a)*520,y=cy+Math.sin(a)*400;ctx.save();ctx.translate(x,y);ctx.rotate(a+Math.PI/2);ctx.globalAlpha=o.walker.a??1;
    ell(0,0,90,46,0,'#050506');circ(0,-6,34,'#020203');for(const s of[-1,1])line(s*80,10,s*140,80,14,'#050506');
    if(carried>0){ctx.rotate(Math.PI/2);ell(0,-120,60,130,0,'#5a6478');circ(0,-250,40,'#111317');ell(0,-280,40,20,0,PAL.orange);}
    ctx.restore();}
  if(o.label)text(o.label,cx,cy+560,'500 40px PM','rgba(244,230,220,.85)','center',o.labelA??1);});}
