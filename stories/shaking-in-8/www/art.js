// ===================== Shaking in 8: places and things (v2) =====================
const K={wall:'#2a3346',wallD:'#1a2030',floor:'#3b2f2a',wood:'#6b4a33',woodD:'#4a3222',red:'#ff3b30',redD:'#b3201a',y:'#ffc93c',grn:'#5cf2a2',hood:'#3d5a80',night:'#0a1022',win:'#0d1830'};
function me(o){toon(Object.assign({jacket:K.hood,hat:'beanie',hatCol:'#f0683f',skin:'#e9b896',browCol:'#4a2e1f',stripe:false},o));}
function T2(s,x,y,size,col='#e9edf5',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){if((o.a??1)<=0)return;label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||'#e9edf5'},o));}
function popT(s,x,y,size,col,t,t0,o={}){const q=ss(seg(t,t0,t0+.25));if(q<=0)return;ctx.save();ctx.translate(x,y);const k=1.4-.4*q;ctx.scale(k,k);T2(s,0,0,size,col,{w:900,stroke:12,a:q*(o.a??1)});ctx.restore();}
// a phone (portrait) with an earthquake alert. o.n = countdown number (or text), o.flash 0..1, o.mode 'alert'|'map'|'text'
function phone(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.rot||0);
  const fl=o.flash??(.5+.5*Math.sin(t*14));glow(0,0,520,'rgba(255,59,48,1)',(o.glow??.35)*(o.mode==='text'?.3:1));
  fillRR(-210,-420,420,840,56,'#0d0f14');fillRR(-195,-405,390,810,46,'#16181f');
  ctx.save();rr(-185,-395,370,790,40);ctx.clip();
  if(o.mode==='text'){ctx.fillStyle='#0f1218';ctx.fillRect(-200,-400,400,800);fillRR(-185,-395,370,110,0,'#1b1f28');circ(-120,-340,30,'#6b7a90');T2('G',-120,-340,34,'#fff',{w:900});T2('Grandpa',10,-340,36,'#fff',{w:800,align:'left'});
    const msgs=o.msgs||[];msgs.forEach((m,i)=>{const a=m.a??1;if(a<=0)return;ctx.save();ctx.globalAlpha=a;const yy=-240+i*170;fillRR(-165,yy,320,140,26,'#2a2f3a');m.lines.forEach((l,j)=>T2(l.replace('*',''),-140,yy+38+j*40,30,l.startsWith('*')?K.y:'#eef1f6',{w:900,align:'left'}));ctx.restore();});}
  else{const bg=lerp(0,1,fl);ctx.fillStyle=`rgb(${Math.round(150+80*bg)},${Math.round(20+20*bg)},${Math.round(20+16*bg)})`;ctx.fillRect(-200,-400,400,800);
    T2('⚠',0,-300,90,'#fff',{w:900});T2('EARTHQUAKE',0,-200,52,'#fff',{w:900});T2(o.sub||'SHAKING IN',0,-130,34,'rgba(255,255,255,.85)',{w:800});
    T2(String(o.n??8),0,10,o.n!=null&&String(o.n).length>2?90:220,'#fff',{w:900});T2(o.unit??'SECONDS',0,150,32,'rgba(255,255,255,.85)',{w:800});
    fillRR(-160,220,320,130,20,'rgba(0,0,0,.25)');T2('DROP · COVER',0,262,30,'#fff',{w:900});T2('HOLD ON',0,306,30,'#fff',{w:900});}
  ctx.restore();ctx.restore();}
// kitchen at night, seen from the side: o.win = what's in the window (fn), o.rattle 0..1, o.tableMe = draw me under the table
function kitchen(t,o={}){const rt=o.rattle||0;
  ctx.fillStyle=vgrad(-200,1300,[[0,K.wallD],[1,K.wall]]);ctx.fillRect(-300,-300,1680,1600);
  ctx.fillStyle=vgrad(1300,2200,[[0,K.floor],[1,'#221a16']]);ctx.fillRect(-300,1300,1680,1000);line(-300,1300,1380,1300,6,'#16110e');
  // window (top right)
  const wx=o.wx??700,wy=o.wy??330,ww=360,wh=430;fillRR(wx-20,wy-20,ww+40,wh+40,10,'#d7d2c4');fillRR(wx,wy,ww,wh,4,K.win);
  ctx.save();rr(wx,wy,ww,wh,4);ctx.clip();ctx.fillStyle=vgrad(wy,wy+wh,[[0,'#0b1430'],[1,'#1f2f52']]);ctx.fillRect(wx,wy,ww,wh);circ(wx+280,wy+90,30,'#e8e4d6');
  ctx.fillStyle='#070a12';ctx.beginPath();ctx.moveTo(wx,wy+wh);for(let i=0;i<=8;i++)ctx.lineTo(wx+i*ww/8,wy+wh-60-Math.abs(Math.sin(i*1.7))*70);ctx.lineTo(wx+ww,wy+wh);ctx.fill();
  if(o.win)o.win(wx,wy,ww,wh);ctx.restore();line(wx+ww/2,wy,wx+ww/2,wy+wh,10,'#d7d2c4');line(wx,wy+wh/2,wx+ww,wy+wh/2,10,'#d7d2c4');
  // counter + sink + glasses (left)
  fillRR(-120,880,640,420,10,'#4f5a6b');fillRR(-140,850,680,50,8,'#c9c3b5');fillRR(90,860,260,30,6,'#8a9099');
  for(let i=0;i<3;i++){const s=rt>0?Math.sin(t*60+i*2)*rt*6:0;const gx=150+i*70+s,gy=820;ctx.save();ctx.globalAlpha=.75;fillRR(gx-22,gy-80,44,90,8,'rgba(200,230,255,.35)');line(gx-22,gy-80,gx+22,gy-80,3,'rgba(230,245,255,.8)');ctx.restore();
    if(rt>.2){ctx.save();ctx.globalAlpha=rt*.8;ctx.strokeStyle='#e8f2ff';ctx.lineWidth=3;for(const sd of[-1,1]){ctx.beginPath();ctx.arc(gx,gy-40,40+i*4,sd>0?-.5:Math.PI-.5,sd>0?.5:Math.PI+.5);ctx.stroke();}ctx.restore();}}
  // fridge (far left) with the rules note
  fillRR(-260,330,240,970,20,'#d9d6cc');line(-260,700,-20,700,5,'#b5b1a6');fillRR(-60,420,16,200,6,'#a9a59a');fillRR(-200,760,120,150,4,'#f4efe0');for(let j=0;j<4;j++)line(-185,800+j*26,-95,800+j*26,5,'rgba(40,40,50,.5)');
  // table (centre)
  const sh=rt>0?Math.sin(t*50)*rt*8:0;ctx.save();ctx.translate(sh,0);fillRR(120,1160,620,40,8,K.wood);fillRR(150,1195,560,26,4,K.woodD);for(const lx of[160,690])fillRR(lx,1200,26,300,4,K.woodD);
  if(o.tableMe)o.tableMe();ctx.restore();
  // ceiling light, off; o.lit for phone glow
  if(o.phoneGlow)glow(o.phoneGlow[0],o.phoneGlow[1],520,'rgba(255,59,48,1)',o.phoneGlow[2]??.35);
  const g=ctx.createRadialGradient(540,900,300,540,900,1300);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(2,3,8,.6)');ctx.fillStyle=g;ctx.fillRect(-300,-300,1680,2600);}
// top-down street map with epicenter rings; o.pts = [[x,y,a]], o.house=[x,y]
function quakeMap(t,o={}){fillAll('#0b1020');ctx.fillStyle='#121a2e';ctx.fillRect(60,330,960,1420);
  ctx.save();rr(60,330,960,1420,30);ctx.clip();ctx.fillStyle='#16203a';ctx.fillRect(60,330,960,1420);
  for(let i=0;i<9;i++){line(60,300+i*170,1020,330+i*160,26,'#22304f');}for(let i=0;i<6;i++)line(120+i*190,240,90+i*200,1680,22,'#22304f');
  const R=rng(5);for(let i=0;i<70;i++){const x=80+R()*920,y=260+R()*1400;fillRR(x,y,40+R()*30,30+R()*24,4,'#1c2742');}
  ctx.fillStyle='rgba(60,120,90,.25)';ctx.beginPath();ctx.ellipse(250,1350,220,160,.3,0,7);ctx.fill();
  const H=o.house||[560,1250];
  (o.pts||[]).forEach(([x,y,a],i)=>{if(a<=0)return;const age=o.age?o.age[i]:1;const rr2=30+((t*1.4+i*.3)%1)*90;circ(x,y,rr2,K.red,.35*a*(1-((t*1.4+i*.3)%1)));circ(x,y,18,K.red,a);circ(x,y,8,'#fff',a);
    if(i>0&&o.line){const p=o.pts[i-1];if(p[2]>0)ctx.save(),ctx.setLineDash([16,14]),ctx.strokeStyle=`rgba(255,59,48,${.6*a})`,ctx.lineWidth=5,ctx.beginPath(),ctx.moveTo(p[0],p[1]),ctx.lineTo(x,y),ctx.stroke(),ctx.restore();}});
  fillRR(H[0]-40,H[1]-30,80,60,8,'#e9e4d6');poly([[H[0]-52,H[1]-28],[H[0],H[1]-72],[H[0]+52,H[1]-28]],'#e9e4d6');glow(H[0],H[1],160,'rgba(92,242,162,1)',.25);
  if(o.you!==false){chip('YOU',H[0],H[1]+80,{size:30,bg:'rgba(92,242,162,.95)',col:'#08140e'});}
  ctx.restore();fillRR(60,330,960,90,0,'rgba(10,14,26,.9)');T2('EARTHQUAKE ALERTS',100,375,34,'#ff6b60',{w:900,align:'left'});T2(o.time||'2:10 AM',990,375,30,'#aab3c6',{w:800,align:'right'});}
// many houses at night from above with glowing phones on chargers
function town(t,o={}){fillAll('#070b16');const R=rng(8);
  for(let i=0;i<5;i++)line(-200,500+i*320,1300,420+i*330,60,'#121a2c');
  for(let i=0;i<34;i++){const x=R()*1080,y=360+R()*1300,s=.7+R()*.6;ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-70,-55,140,110,10,'#1d2740');poly([[-82,-50],[0,-110],[82,-50]],'#26324f');
    const a=ap2(t,(o.t0||0)+i*.05);if(a>0){circ(0,0,10,K.grn,a);glow(0,0,70,'rgba(92,242,162,1)',.4*a);}ctx.restore();}}
const ap2=(t,a,d=.3)=>ss(seg(t,a,a+d));
// cross-section diagram: fast P-wave ring, alert flies ahead, slow S-wave
function waves(t,t0,o={}){ctx.fillStyle=vgrad(0,1920,[[0,'#0e1630'],[.45,'#1a2440'],[.46,'#4a3a2c'],[1,'#2a2018']]);ctx.fillRect(-300,-300,1680,2520);
  for(let i=0;i<10;i++)line(-200,1000+i*90,1300,1010+i*92,2,'rgba(0,0,0,.25)');
  const ex=160,ey=1500;circ(ex,ey,22,K.red);glow(ex,ey,160,'rgba(255,59,48,1)',.4);T2('QUAKE',ex,ey+60,30,'#ffb3ad',{w:900});
  const k=Math.max(0,t-t0);const rp=Math.min(1500,120+k*420),rs=Math.min(1500,80+k*210);
  ctx.save();ctx.beginPath();ctx.rect(-300,880,1680,1100);ctx.clip();ctx.lineWidth=10;ctx.strokeStyle='rgba(255,201,60,.9)';ctx.beginPath();ctx.arc(ex,ey,rp,0,7);ctx.stroke();
  ctx.lineWidth=26;ctx.strokeStyle='rgba(255,59,48,.85)';ctx.beginPath();ctx.arc(ex,ey,rs,0,7);ctx.stroke();ctx.restore();
  // houses on the surface
  for(let i=0;i<5;i++){const hx=260+i*190,hy=880;const hit=Math.hypot(hx-ex,hy-ey)<rp;fillRR(hx-50,hy-80,100,80,6,'#2c3a5c');poly([[hx-60,hy-78],[hx,hy-130],[hx+60,hy-78]],'#34456b');
    if(hit){circ(hx,hy-40,9,K.grn);glow(hx,hy-40,60,'rgba(92,242,162,1)',.5);}
    const al=hit?ss(seg(Math.hypot(hx-ex,hy-ey),0,rp)):0;}
  if(rp>400){const a=ss(seg(rp,400,700));arrow(300,640,1000,640,10,K.grn,a);chip('ALERT',650,560,{size:34,a,bg:K.grn,col:'#08140e'});}
  chip('FAST FIRST WAVE',380,1150,{size:30,a:ss(seg(k,.2,.6)),bg:K.y,col:'#14110a'});chip('STRONG SHAKING',700,1700,{size:30,a:ss(seg(k,.8,1.2)),bg:K.red});}
function arrow(x1,y1,x2,y2,w,c,a=1,head=26){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
const RULES=[["WHEN THE PHONE SAYS","DROP: DROP, COVER,","AND HOLD ON."],["THE ALERTS ARE","NEVER","WRONG."],["IF IT WARNS YOU AND","NOTHING SHAKES: PHONE","DOWN. DON'T MOVE."]];
function rulesCard(t,o={}){const cy=o.cy??780,s=o.s??1;ctx.fillStyle=vgrad(0,1920,[[0,'#d9d6cc'],[1,'#a9a59a']]);ctx.fillRect(-300,-300,1680,2520);line(-300,1500,1380,1500,8,'#8f8b80');
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.02+(o.tilt||0));
  ctx.fillStyle='rgba(0,0,0,.25)';rr(-400,-470,820,960,16);ctx.fill();fillRR(-410,-480,820,960,10,'#fbf6e6');
  circ(0,-460,34,'#e0483c');circ(-8,-468,10,'#ff9a90');
  for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  text('RULES',-330,-360,'900 92px MS','#1b1d23','left');line(-330,-336,-30,-344,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 42px MS',j===2?'#a3261b':'#1b1d23','left'));ctx.restore();}
  text('— GRANDPA',250,430,'800 40px MS','#3b3d44');ctx.restore();}
// the thing outside: huge dark crouched figure, faceless, head tilted, a hand on the glass
function listener(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha=o.a??1;const c=o.col||'#04060b';glow(-30,-80,330,'rgba(170,190,255,1)',.35);
  ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(0,260,330,330,0,Math.PI,0);ctx.fill();
  ctx.save();ctx.translate(-30,-80);ctx.rotate(o.tilt??-.35);ctx.beginPath();ctx.ellipse(0,0,120,150,0,0,7);ctx.fill();
  // one ear-like hollow pressed toward us
  ell(70,10,30,52,.2,'#0f1424');ctx.restore();
  if(o.hand){ctx.fillStyle=c;for(let i=0;i<4;i++){fillRR(150+i*36,-60-Math.abs(i-1.5)*20,24,170,12,c);}fillRR(140,40,160,120,30,c);}
  ctx.restore();}
// close-up of my hand holding the phone, shaking
function handPhone(t,o={}){const amp=o.amp??1;const sx=Math.sin(t*38)*12*amp,sy=Math.cos(t*31)*9*amp;
  ctx.save();ctx.translate(540+sx,1080+sy);ctx.rotate(-.06+Math.sin(t*27)*.02*amp);
  // ghost copies for the tremor
  for(const g of[-1,1]){ctx.save();ctx.globalAlpha=.18*amp;ctx.translate(g*16*amp,0);fillRR(-230,-450,460,900,60,'#0d0f14');ctx.restore();}
  phone(0,0,1.05,t,{mode:o.mode||'alert',n:o.n,sub:o.sub,unit:o.unit,flash:o.flash,glow:.4});
  // fingers + thumb
  ctx.fillStyle='#e0ab88';for(let i=0;i<4;i++)fillRR(205,-200+i*120,90,95,40,'#e0ab88');fillRR(-300,60,130,90,45,'#e0ab88');fillRR(-60,300,380,500,120,'#e0ab88');fillRR(-60,640,380,600,40,K.hood);
  ctx.restore();
  if(amp>.3){ctx.save();ctx.strokeStyle=`rgba(255,255,255,${.35*amp})`;ctx.lineWidth=5;for(const sd of[-1,1])for(let k=0;k<3;k++){ctx.beginPath();ctx.arc(540,1080,560+k*50,sd>0?-.4:Math.PI-.4,sd>0?.4:Math.PI+.4);ctx.stroke();}ctx.restore();}}
