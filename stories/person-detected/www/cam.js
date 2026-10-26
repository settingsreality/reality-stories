// ===================== Person Detected: home cameras =====================
// places (drawn in plain greys/colours; the camera look is applied after)
function porch(t){ctx.fillStyle='#1a1d22';ctx.fillRect(-900,-600,3720,2280);
  // siding
  for(let y=-600;y<820;y+=46){ctx.fillStyle=y%92?'#23272e':'#20242a';ctx.fillRect(-900,y,3720,46);}
  // door + frame + porch light
  fillRR(760,160,400,660,6,'#2e333b');fillRR(790,190,340,630,4,'#3a4049');for(const[x,y]of[[820,230],[980,230],[820,470],[980,470]])fillRR(x,y,130,200,4,'#343a43');circ(1100,520,12,'#9aa0a8');
  fillRR(1240,280,50,80,10,'#55595f');glow(1265,330,260,'rgba(255,240,210,1)',.22);
  // porch floor, steps, mat, plants
  ctx.fillStyle='#2b2f35';ctx.fillRect(-900,820,3720,140);fillRR(820,830,280,40,8,'#3a3330');for(let i=0;i<3;i++)fillRR(500-i*60,960+i*60,920+i*120,60,4,'#262a2f');
  for(const px of[560,1360]){fillRR(px-40,720,80,100,10,'#3d3a36');for(let k=0;k<7;k++)ell(px-40+k*14,690-Math.abs(3-k)*12,26,60,(k-3)*.25,'#2f3a30');}
  line(300,820,300,560,10,'#30343a');line(1620,820,1620,560,10,'#30343a');line(300,560,1620,560,6,'#30343a');}
function driveway(t){ctx.fillStyle='#14171b';ctx.fillRect(-900,-600,3720,2280);ctx.fillStyle='#1f2328';ctx.fillRect(-900,520,3720,1400);
  fillRR(-200,120,900,420,6,'#2a2e34');for(let y=150;y<540;y+=50)line(-200,y,700,y,3,'#22262c');
  // car
  fillRR(900,560,700,190,40,'#3a3f47');fillRR(1020,470,440,120,40,'#3a3f47');fillRR(1050,490,170,80,16,'#1c2026');fillRR(1240,490,190,80,16,'#1c2026');circ(1040,760,60,'#0e1013');circ(1460,760,60,'#0e1013');
  line(1800,900,1800,100,12,'#2a2e34');glow(1800,100,300,'rgba(255,230,190,1)',.2);}
function hallway2(t){ctx.fillStyle='#16191e';ctx.fillRect(-900,-600,3720,2280);
  // one-point perspective down the hall toward the camera
  const vx=960,vy=440;ctx.fillStyle='#22262c';ctx.beginPath();ctx.moveTo(-900,-600);ctx.lineTo(vx-170,vy-150);ctx.lineTo(vx-170,vy+150);ctx.lineTo(-900,1680);ctx.fill();ctx.beginPath();ctx.moveTo(2820,-600);ctx.lineTo(vx+170,vy-150);ctx.lineTo(vx+170,vy+150);ctx.lineTo(2820,1680);ctx.fill();
  ctx.fillStyle='#1b1f24';ctx.beginPath();ctx.moveTo(-900,1680);ctx.lineTo(vx-170,vy+150);ctx.lineTo(vx+170,vy+150);ctx.lineTo(2820,1680);ctx.fill();
  fillRR(vx-170,vy-150,340,300,4,'#2a2f36');fillRR(vx-60,vy-110,120,260,3,'#30363e');
  for(const s of[-1,1])for(const k of[.35,.65]){const x=vx+s*lerp(170,1500,k),w=lerp(60,420,k),y0=lerp(vy-130,-300,k),y1=lerp(vy+150,1300,k);ctx.fillStyle='#2c3138';ctx.beginPath();ctx.moveTo(x,y0);ctx.lineTo(x+s*w,y0-s*0-w*.4);ctx.lineTo(x+s*w,y1+w*.4);ctx.lineTo(x,y1);ctx.fill();}
  // runner rug
  ctx.fillStyle='#262126';ctx.beginPath();ctx.moveTo(vx-80,vy+150);ctx.lineTo(vx+80,vy+150);ctx.lineTo(vx+700,1680);ctx.lineTo(vx-700,1680);ctx.fill();}
function kitchen(t){ctx.fillStyle='#d9d2c4';ctx.fillRect(-900,-600,3720,2280);ctx.fillStyle='#b9ab96';ctx.fillRect(-900,860,3720,900);
  fillRR(-100,420,700,440,6,'#8a7a64');fillRR(-120,400,740,30,4,'#6e604c');fillRR(-60,120,600,200,6,'#a99a82');glow(1500,100,600,'rgba(255,240,210,1)',.5);fillRR(1350,80,400,300,6,'#e9f2f8');line(1550,80,1550,380,10,'#c9c0b2');
  // table and two chairs
  fillRR(900,600,700,34,8,'#7a5a3e');line(960,634,960,860,16,'#6a4c32');line(1540,634,1540,860,16,'#6a4c32');
  for(const[cx,f]of[[860,1],[1640,-1]]){fillRR(cx-60,660,120,24,6,'#6a4c32');line(cx-50,684,cx-50,860,10,'#5a3e28');line(cx+50,684,cx+50,860,10,'#5a3e28');fillRR(cx-f*60-10,460,20,224,6,'#6a4c32');}
  fillRR(1180,570,90,40,10,'#e9e4d8');circ(1225,560,6,'#c9c0b2');}
// the camera's view: o.place, the night look, the boxes, the overlay
function camView(cam,t,o){wl(cam,1,()=>{({porch,driveway,hallway2,kitchen})[o.place](t);
    if(o.you)YOU(Object.assign({h:420,eyes:1},o.you));
    for(const b of o.boxes||[]){if((b.a??1)<=0)continue;ctx.save();ctx.globalAlpha=b.a??1;ctx.strokeStyle=b.col||'#39ff88';ctx.lineWidth=5;ctx.strokeRect(b.x-b.w/2,b.y-b.h,b.w,b.h);
      const lw=Math.max(140,b.label.length*20);ctx.fillStyle=b.col||'#39ff88';ctx.fillRect(b.x-b.w/2-2.5,b.y-b.h-44,lw,44);ctx.font='500 28px PM';ctx.textAlign='left';ctx.fillStyle='#0b0d10';ctx.fillText(b.label,b.x-b.w/2+10,b.y-b.h-12);ctx.restore();}});
  if(o.night){ctx.save();ctx.setTransform(1,0,0,1,0,0);const img=ctx.getImageData(0,0,1080,608);const d=img.data;const f=Math.floor(t*15);for(let i=0;i<d.length;i+=4){const isBox=d[i+1]>200&&d[i]<120;if(isBox)continue;const n=((i*7919+f*104729)%41)-20;const v=(d[i]*.3+d[i+1]*.59+d[i+2]*.11)*1.25+n;d[i]=v*.92;d[i+1]=v;d[i+2]=v*.95;}ctx.putImageData(img,0,0);ctx.restore();}
  // fisheye vignette + overlay text
  ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,260,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.7)');ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);
  ctx.font='500 17px PM';ctx.textAlign='left';ctx.fillStyle='rgba(255,255,255,.85)';ctx.fillText((o.camName||'FRONT DOOR')+' · '+(o.stamp||'3:12:04 AM'),36,64);if(o.live){ctx.fillStyle='#ff3b30';ctx.fillText('● LIVE',940,64);}ctx.restore();}
// the phone: lock screen with alerts
function phoneAlerts(cam,t,o){wl(cam,1,()=>{ctx.fillStyle=o.bg||'#0d0f13';ctx.fillRect(-900,-600,3720,2280);ctx.save();ctx.translate(960,560);ctx.rotate(-.04);
  fillRR(-280,-560,560,1120,70,'#111');fillRR(-262,-540,524,1080,56,'#1b2333');const g=ctx.createLinearGradient(0,-540,0,540);g.addColorStop(0,'#2a3550');g.addColorStop(1,'#141a26');ctx.fillStyle=g;fillRR(-262,-540,524,1080,56,null);ctx.fill();
  text(o.time||'3:12',0,-330,'500 120px PM','#f4f2ee');
  (o.alerts||[]).forEach((a,i)=>{const k=a.k??1;if(k<=0)return;ctx.save();ctx.globalAlpha=k;ctx.translate(0,(1-k)*-40);fillRR(-240,-200+i*150,480,130,26,'rgba(235,240,248,.92)');fillRR(-220,-180+i*150,60,60,14,'#3a8ad0');circ(-190,-150+i*150,14,'#fff');
    text(a.title,-140,-160+i*150,'500 26px PM','#111','left');text(a.sub,-140,-120+i*150,'400 24px PM','#333','left');text('now',220,-160+i*150,'400 20px PM','#666','right');ctx.restore();});
  ctx.fillStyle='#1c1f25';ctx.beginPath();ctx.ellipse(-60,640,330,190,-.2,0,7);ctx.fill();for(let i=0;i<4;i++)fillRR(230,300+i*80,130,62,28,'#1c1f25');ctx.restore();});}
// the face library: you, and the new one
function faces(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#0d0f13';ctx.fillRect(-900,-600,3720,2280);fillRR(560,40,800,1000,40,'#f2f3f5');text('Familiar faces',620,140,'500 44px PM','#111','left');text('Only you live here',620,190,'400 28px PM','#777','left');
  // tile 1: you
  fillRR(620,240,300,300,24,'#d9dde3');circ(770,400,90,'#111317');ell(770,330,92,46,0,PAL.orange);text('Me',770,600,'500 34px PM','#111');
  // tile 2: new, empty box
  const a=o.newTile||0;if(a>0){ctx.save();ctx.globalAlpha=a;fillRR(1000,240,300,300,24,'#d9dde3');ctx.strokeStyle='#39b86b';ctx.lineWidth=6;ctx.strokeRect(1060,290,180,220);text('Me',1150,600,'500 34px PM','#111');fillRR(1180,250,110,40,12,'#f0683f');text('NEW',1235,280,'500 24px PM','#fff');ctx.restore();}});}
