// ===================== Mimic: the aquarium at night =====================
function bez(p0,p1,p2,p3,u){const v=1-u;return[v*v*v*p0[0]+3*v*v*u*p1[0]+3*v*u*u*p2[0]+u*u*u*p3[0],v*v*v*p0[1]+3*v*v*u*p1[1]+3*v*u*u*p2[1]+u*u*u*p3[1]];}
function arm(p0,p1,p2,p3,w0,w1,striped,c1,c2){const N=26;let prev=bez(p0,p1,p2,p3,0);ctx.lineCap='round';
  for(let i=1;i<=N;i++){const u=i/N;const p=bez(p0,p1,p2,p3,u);ctx.strokeStyle=striped&&Math.floor(i/3)%2?c2:c1;ctx.lineWidth=lerp(w0,w1,u);ctx.beginPath();ctx.moveTo(prev[0],prev[1]);ctx.lineTo(p[0],p[1]);ctx.stroke();prev=p;}}
// the octopus. pose: rest | flat | lion | snake | stand | wave ; o.k blends from 'rest' (0..1)
const OPOSE={
  rest:{m:[0,-60,48,58,0],arms:[[-1,.2],[-1,.6],[-1,1.0],[-1,1.4],[1,.2],[1,.6],[1,1.0],[1,1.4]].map(([s,a])=>[[s*20,-10],[s*(60+a*30),10],[s*(100+a*50),-20+a*10],[s*(70+a*80),30]])},
  lion:{m:[0,-120,46,60,0],arms:[-2.6,-2.2,-1.8,-1.4,-1.0,-.6,-.2,.2].map(a=>[[0,-80],[Math.cos(a-1.57)*80,-80+Math.sin(a-1.57)*80],[Math.cos(a-1.57)*170,-80+Math.sin(a-1.57)*170],[Math.cos(a-1.57)*250,-80+Math.sin(a-1.57)*250]])},
  flat:{m:[60,-20,70,24,0],arms:[0,1,2,3,4,5,6,7].map(i=>{const dy=(i-3.5)*6;return[[20,-10+dy*.5],[-60,-10+dy],[-160,-8+dy*1.4],[-240,-6+dy*1.8]];})},
  snake:{m:[0,30,30,30,0],arms:[[[0,0],[-120,-10],[-260,10],[-380,0]],[[0,0],[120,-10],[260,10],[380,0]],[[0,20],[0,30],[0,30],[0,32]],[[0,20],[0,30],[0,30],[0,32]],[[0,20],[0,30],[0,30],[0,32]],[[0,20],[0,30],[0,30],[0,32]],[[0,20],[0,30],[0,30],[0,32]],[[0,20],[0,30],[0,30],[0,32]]]},
  stand:{m:[0,-300,44,56,0],arms:[[[-8,-250],[-20,-160],[-30,-80],[-34,0]],[[8,-250],[20,-160],[30,-80],[34,0]],[[-20,-250],[-90,-240],[-150,-200],[-190,-130]],[[20,-250],[90,-240],[150,-200],[190,-130]],[[-10,-250],[-40,-230],[-40,-210],[-20,-205]],[[10,-250],[40,-230],[40,-210],[20,-205]],[[0,-250],[-10,-225],[10,-215],[0,-205]],[[0,-250],[10,-225],[-10,-215],[0,-205]]]}};
function octopus(x,y,s,t,o){const P=OPOSE[o.pose||'rest'],R=OPOSE[o.from||'rest'];const k=o.k??1;const L=(a,b)=>lerp(a,b,k);
  ctx.save();ctx.translate(x,y);ctx.scale(s*(o.face||1),s);const striped=o.striped??true;const c1=o.c1||'#5a3420',c2=o.c2||'#eadcc2';
  const wob=(i,j)=>Math.sin(t*2+i*1.3+j)*(o.pose==='stand'?2:6)*j;
  for(let i=0;i<8;i++){const a=P.arms[i],b=R.arms[i];const pts=[0,1,2,3].map(j=>[L(b[j][0],a[j][0])+wob(i,j),L(b[j][1],a[j][1])+wob(i+3,j)*.6]);
    if(o.pose==='wave'||o.wave){if(i===3){const w=Math.sin(t*5)*30;pts[2]=[150,-300];pts[3]=[170+w,-400];}}
    arm(pts[0],pts[1],pts[2],pts[3],o.pose==='stand'&&i<2?22:18,4,striped,c1,c2);}
  const m=[0,1,2,3].map(j=>L(R.m[j],P.m[j]));ctx.fillStyle=c1;ctx.beginPath();ctx.ellipse(m[0],m[1],m[2],m[3],0,0,7);ctx.fill();
  if(striped){ctx.strokeStyle=c2;ctx.lineWidth=6;for(let j=-1;j<=1;j++){ctx.beginPath();ctx.ellipse(m[0],m[1]+j*14,m[2]*.85,m[3]*.15,0,0,Math.PI);ctx.stroke();}}
  // eyes: two bumps, each with a horizontal pupil
  for(const sx of[-1,1]){const ex=m[0]+sx*m[2]*.55,ey=m[1]+m[3]*.55;circ(ex,ey,10,'#d8c9a8');fillRR(ex-7,ey-2,14,4,2,'#111');}
  ctx.restore();}
// the tank, close: sand, rocks, light from above, glass frame
function tank(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#050a10';ctx.fillRect(-900,-600,3720,2280);
  const X0=180,X1=1740,Y0=80,Y1=1000;const g=ctx.createLinearGradient(0,Y0,0,Y1);g.addColorStop(0,'#0e5a7a');g.addColorStop(1,'#06283a');ctx.fillStyle=g;ctx.fillRect(X0,Y0,X1-X0,Y1-Y0);
  ctx.save();ctx.beginPath();ctx.rect(X0,Y0,X1-X0,Y1-Y0);ctx.clip();
  for(let i=0;i<6;i++){const x=300+i*260+Math.sin(t*.3+i)*30;const gg=ctx.createLinearGradient(x,Y0,x+80,Y1);gg.addColorStop(0,'rgba(200,240,255,.12)');gg.addColorStop(1,'rgba(200,240,255,0)');ctx.fillStyle=gg;ctx.beginPath();ctx.moveTo(x,Y0);ctx.lineTo(x+60,Y0);ctx.lineTo(x+220,Y1);ctx.lineTo(x+100,Y1);ctx.fill();}
  ctx.fillStyle='#c9b48a';ctx.beginPath();ctx.moveTo(X0,880);for(let x=X0;x<=X1;x+=40)ctx.lineTo(x,880+Math.sin(x*.01)*14);ctx.lineTo(X1,Y1);ctx.lineTo(X0,Y1);ctx.fill();
  for(const[x,y,r]of[[360,880,90],[1560,890,120],[1400,900,60]])ell(x,y,r,r*.6,0,'#3a4a50');
  for(let i=0;i<30;i++){const x=X0+hash(i)*(X1-X0),y=Y1-((t*60+i*70)%(Y1-Y0));circ(x+Math.sin(t+i)*8,y,3+hash(i*3)*4,'rgba(220,245,255,.35)');}
  if(o.octo)octopus(o.octo.x,o.octo.y,o.octo.s||1,t,o.octo);
  ctx.restore();
  // glass frame + lid
  ctx.strokeStyle='#1a1f26';ctx.lineWidth=40;ctx.strokeRect(X0,Y0,X1-X0,Y1-Y0);fillRR(X0-30,Y0-60,X1-X0+60,40,6,o.lidOpen?'#2a3038':'#1f242b');
  ctx.fillStyle='rgba(255,255,255,.04)';ctx.beginPath();ctx.moveTo(X0+100,Y0);ctx.lineTo(X0+300,Y0);ctx.lineTo(X0+120,Y1);ctx.lineTo(X0,Y1);ctx.fill();
  if(o.label)text(o.label,960,1060,'500 40px PM','rgba(200,235,255,.8)','center',o.labelA??1);
  if(o.guard)YOU(Object.assign({h:520,eyes:1},o.guard));
  if(o.puddle)ell(1000,1080,260,40,0,'rgba(120,170,200,.25)');});}
// the gallery: tanks glowing in the dark, the long floor
function gallery(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#04070b';ctx.fillRect(-900,-600,3720,2280);
  for(let i=0;i<5;i++){const x=-500+i*700;const g=ctx.createLinearGradient(0,180,0,760);g.addColorStop(0,'#0e5a7a');g.addColorStop(1,'#062234');ctx.fillStyle=g;ctx.fillRect(x,180,560,580);ctx.strokeStyle='#11161c';ctx.lineWidth=20;ctx.strokeRect(x,180,560,580);glow(x+280,470,520,'rgba(60,170,220,1)',.25);
    if(i===2&&o.octo)octopus(x+280,760,.8,t,o.octo);}
  const fg=ctx.createLinearGradient(0,760,0,1300);fg.addColorStop(0,'#0b1a24');fg.addColorStop(1,'#05090d');ctx.fillStyle=fg;ctx.fillRect(-900,760,3720,900);
  for(const p of o.prints||[])ell(p.x,p.y,18,6,0,`rgba(130,190,220,${.5*p.a})`);
  if(o.door){fillRR(o.door,300,220,460,6,'#1a2028');fillRR(o.door+20,320,180,440,4,'#232a33');text('STAFF ONLY',o.door+110,280,'500 26px PM','rgba(244,230,220,.6)');if(o.doorOpen){ctx.fillStyle='#000';ctx.fillRect(o.door+20,320,180*o.doorOpen,440);}}
  if(o.guard){const g2=o.guard;YOU(Object.assign({h:420,eyes:1},g2));if(g2.light){ctx.save();const gg=ctx.createLinearGradient(g2.x,0,g2.x+(g2.face||1)*900,0);gg.addColorStop(0,'rgba(255,245,215,.35)');gg.addColorStop(1,'rgba(255,245,215,0)');ctx.fillStyle=gg;ctx.beginPath();ctx.moveTo(g2.x+(g2.face||1)*60,g2.y-220);ctx.lineTo(g2.x+(g2.face||1)*900,g2.y-420);ctx.lineTo(g2.x+(g2.face||1)*900,g2.y+60);ctx.closePath();ctx.fill();ctx.restore();}}
  if(o.fake){const f=o.fake;YOU(Object.assign({h:420,eyes:1},f));if(f.tentacle){const sx=f.x+(f.face||1)*20,sy=f.y-300;const w=Math.sin(t*4)*40;arm([sx,sy],[sx+(f.face||1)*60,sy-60],[sx+(f.face||1)*90+w,sy-150],[sx+(f.face||1)*50+w*1.5,sy-230],16,4,false,'#262a33','#262a33');}}});}
// a security monitor look: grey, noisy, timestamped
function cctvize(t,name,stamp){ctx.save();ctx.setTransform(1,0,0,1,0,0);const img=ctx.getImageData(0,0,1080,608);const d=img.data;const f=Math.floor(t*12);for(let i=0;i<d.length;i+=4){const n=((i*7919+f*104729)%37)-18;const v=(d[i]*.3+d[i+1]*.59+d[i+2]*.11)*1.35+n;d[i]=d[i+1]=d[i+2]=v;}ctx.putImageData(img,0,0);
  ctx.fillStyle='rgba(255,255,255,.04)';for(let y=0;y<608;y+=4)ctx.fillRect(0,y,1080,1);ctx.font='500 18px PM';ctx.textAlign='left';ctx.fillStyle='#e8e8e8';ctx.fillText(name+'  '+stamp,40,60);if(Math.sin(t*5)>0){ctx.fillStyle='#ff3b30';ctx.beginPath();ctx.arc(1010,54,8,0,7);ctx.fill();}ctx.fillStyle='#e8e8e8';ctx.fillText('REC',960,60);ctx.restore();}
// the break room, and the empty parking space
function breakRoom(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#1d2228';ctx.fillRect(-900,-600,3720,2280);ctx.fillStyle='#14181d';ctx.fillRect(-900,860,3720,800);fillRR(1300,200,300,200,6,'#0b0f14');text(o.clock||'6:00',1450,330,'500 90px PM','#ff5a3a');
  fillRR(500,620,700,30,6,'#3a3f46');line(560,650,560,860,12,'#2a2e34');line(1140,650,1140,860,12,'#2a2e34');fillRR(820,580,90,40,10,'#c9c0b2');
  YOU(Object.assign({x:560,y:860,h:360,face:1,legA:[1.45,1.45],legB:[.1,.05],lift:110,eyes:1,lean:o.sleep?.9:.1,armL:o.sleep?1.4:1.0,elbowL:.2,armR:o.sleep?1.2:.9,elbowR:.2},o.you||{}));});}
function lot(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#06080c';ctx.fillRect(-900,-600,3720,2280);for(let i=0;i<300;i++)circ(hash(i)*3000-500,hash(i*7)*500-300,.6+hash(i*3)*1.2,'#e9eefc',.3+.4*hash(i*5));
  ctx.fillStyle='#14171c';ctx.fillRect(-900,560,3720,1200);line(1500,900,1500,180,14,'#2a2e34');glow(1500,190,500,'rgba(255,220,170,1)',.4);ctx.fillStyle='rgba(255,220,170,.1)';ctx.beginPath();ctx.moveTo(1500,190);ctx.lineTo(1100,1000);ctx.lineTo(1900,1000);ctx.fill();
  for(let i=0;i<5;i++){const x=200+i*360;line(x,700,x-80,1000,6,'#e9e4d8');}
  fillRR(1640,600,520,170,30,'#3a3f47');fillRR(1720,520,330,110,30,'#3a3f47');circ(1720,780,46,'#0e1013');circ(2080,780,46,'#0e1013');
  text('NIGHT SECURITY',1010,1060,'500 40px PM','rgba(233,228,216,.7)');for(const p of o.prints||[])ell(p.x,p.y,16,6,0,'rgba(130,190,220,.35)');});}
