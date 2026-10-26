// ===================== Restart Required: the sky, the bar, the box, the cursor =====================
const RR={bar:'#f4f6fb',barBg:'rgba(244,246,251,.18)',ui:'#eef1f7',btn:'#2f6fe0'};
const RSTARS=(()=>{const r=rng(12),a=[];for(let i=0;i<420;i++)a.push([r()*4200-1100,r()*1000-600,.6+r()*1.5,.25+r()*.7]);return a;})();
const BLD=(()=>{const r=rng(4),a=[];let x=-1000;while(x<2900){const w=120+r()*200,h=160+r()*460;a.push({x,w,h,win:r()});x+=w+10+r()*30;}return a;})();
// the bar, always the same distance away (drawn at parallax 0 so it never moves with the camera)
function skyBar(pct,a=1,y=250){ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.globalAlpha=a;const x0=-40,x1=1960;fillRR(x0,y-9,x1-x0,18,9,RR.barBg);
  const xf=lerp(x0,x1,clamp(pct/100));fillRR(x0,y-9,Math.max(18,xf-x0),18,9,RR.bar);ctx.shadowColor='rgba(220,235,255,.9)';ctx.shadowBlur=30;fillRR(x0,y-4,Math.max(10,xf-x0),8,4,'#fff');ctx.shadowBlur=0;
  text(`UPDATING   ${Math.floor(pct)}%`,960,y+58,'500 34px PM','rgba(244,246,251,.9)');ctx.restore();}
function cityNight(cam,t,o){wl(cam,.15,()=>{const g=ctx.createLinearGradient(0,-800,0,800);g.addColorStop(0,'#03050c');g.addColorStop(1,'#18203a');ctx.fillStyle=g;ctx.fillRect(-2000,-1500,6000,3500);
    const mv=o.starMove||0;for(let i=0;i<RSTARS.length;i++){let[x,y,r,a]=RSTARS[i];if(mv&&i%23===0){const dx=Math.sin(i)*260*mv,dy=Math.cos(i*3)*90*mv;line(x,y,x+dx,y+dy,2.2,`rgba(255,233,176,${.35*(o.trail??1)})`);x+=dx;y+=dy;circ(x,y,4,'#ffe9b0',1);glow(x,y,30,'rgba(255,233,176,1)',.5);continue;}circ(x,y,r,'#e9eefc',a);}
    circ(1500,-60,46,'#ece6d6');glow(1500,-60,220,'rgba(240,235,220,1)',.3);});
  wl(cam,.6,()=>{for(const b of BLD){ctx.fillStyle='#0b0e17';ctx.fillRect(b.x,780-b.h*.8,b.w,b.h*.8+600);}});
  wl(cam,1,()=>{if(!o.house)for(const b of BLD){ctx.fillStyle='#10141f';ctx.fillRect(b.x+40,820-b.h,b.w,b.h+600);for(let k=0;k<Math.floor(b.h/60);k++)for(let j=0;j<Math.floor(b.w/50);j++)if(hash(b.x+k*7+j*13)>.62-b.win*.2)fillRR(b.x+52+j*50,840-b.h+k*60,22,28,2,'rgba(240,170,90,.55)');}
    ctx.fillStyle='#090b10';ctx.fillRect(-1000,820,4000,900);
    if(o.plane!=null){const px=lerp(-300,2300,o.plane),py=lerp(520,40,o.plane);ctx.save();ctx.translate(px,py);ctx.rotate(-.18);ctx.scale(2.2,2.2);fillRR(-70,-8,140,16,8,'#2a2f3a');poly([-10,0,20,-46,30,-46,20,0],'#2a2f3a');poly([-10,0,20,46,30,46,20,0],'#2a2f3a');poly([-66,0,-80,-24,-72,-24,-56,0],'#2a2f3a');circ(-68,0,5,Math.sin(t*8)>0?'#ff3b30':'#3a0d0a');ctx.restore();}
    if(o.wires){for(const wy of[330,450]){ctx.strokeStyle='#020306';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-1000,wy);ctx.quadraticCurveTo(960,wy+70,2900,wy);ctx.stroke();
      for(let i=0;i<46;i++){const x=-900+i*84+hash(i+wy)*20;const yy=wy+70*(1-((x-960)/1940)**2)-2;bird(x,yy,2.1)}}line(-300,280,-300,900,22,'#020306');line(2200,280,2200,900,22,'#020306');}
    if(o.crowd){for(let i=0;i<14;i++){const x=-200+i*170+hash(i)*60,h=300+hash(i*3)*80;person({x,y:1000,h,face:hash(i*5)>.5?1:-1,body:'#2b3242',legs:'#0e1015',head:'#0d0f13',hand:'#0d0f13',armL:2.9,elbowL:-.3,held:(hx,hy)=>{fillRR(hx-10,hy-34,20,34,4,'#0b0c0f');glow(hx,hy-20,60,'rgba(170,200,255,1)',.45);},headTilt:-.35});}
      YOU({x:960,y:1040,h:360,face:1,eyes:0,armL:2.9,elbowL:-.3,headTilt:-.35});}
    if(o.house){ctx.fillStyle='#0b0d12';ctx.fillRect(-1000,820,4000,900);for(let i=-3;i<=3;i++){const hx=980+i*360,me=i===0;const c=me?'#1d2333':'#11141c';fillRR(hx-130,600,260,220,4,c);poly([hx-160,610,hx+160,610,hx,470],me?'#141927':'#0b0d14');fillRR(hx-90,650,70,70,3,me?'rgba(240,170,90,.85)':(hash(i+5)>.5?'rgba(240,170,90,.35)':'#0b0d12'));fillRR(hx+30,700,56,120,3,'#0a0c10');}
      glow(910,690,160,'rgba(240,170,90,1)',.35);}});
  if(o.pct!=null)skyBar(o.pct,o.barA??1);
  if(o.dialog)dialogBox(o.dialog,t,o.hover);
  if(o.cursor)cursor(o.cursor.x,o.cursor.y,o.cursor.s||1,o.cursor.a??1);
  vign(.35);}
function bird(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,-12,10,13,0,'#05060a');circ(-2,-26,7,'#05060a');poly([-6,-26,-14,-24,-6,-22],'#05060a');line(2,0,2,-4,2,'#05060a');ctx.restore();}
function dialogBox(a,t,hover){ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.globalAlpha=a;const w=1040,h=440,x=960-w/2,y=360;const s=.9+.1*ss(a);ctx.translate(960,y+h/2);ctx.scale(s,s);ctx.translate(-960,-(y+h/2));
  glow(960,y+h/2,800,'rgba(200,220,255,1)',.25);fillRR(x,y,w,h,34,'rgba(238,241,247,.96)');fillRR(x,y,w,70,34,'rgba(220,225,235,1)');ctx.fillStyle='rgba(220,225,235,1)';ctx.fillRect(x,y+40,w,30);
  for(const[k,c]of[[0,'#ff5f57'],[1,'#febc2e'],[2,'#28c840']])circ(x+40+k*34,y+35,11,c);
  text('Restart required',960,y+160,'500 64px IS','#111');text('To finish updating, reality needs to restart.',960,y+222,'400 32px PM','#555');
  fillRR(x+120,y+290,360,96,22,hover==='now'?'#1f57c2':RR.btn);text('Now',x+300,y+352,'500 40px PM','#fff');
  fillRR(x+w-480,y+290,360,96,22,hover==='tonight'?'#c9ced8':'#dfe3ea');text('Tonight',x+w-300,y+352,'500 40px PM','#222');ctx.restore();}
function cursor(x,y,s,a){ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.shadowColor='rgba(220,235,255,.8)';ctx.shadowBlur=30;
  ctx.fillStyle='#fff';ctx.strokeStyle='#111';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,96);ctx.lineTo(24,74);ctx.lineTo(40,110);ctx.lineTo(56,102);ctx.lineTo(40,68);ctx.lineTo(72,68);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.stroke();ctx.restore();}
// the night side of the Earth, with the cursor gliding over it
const EARTH=(()=>{const r=rng(21),a=[];for(let i=0;i<900;i++){const ang=r()*6.283,rad=Math.sqrt(r())*500;const x=Math.cos(ang)*rad,y=Math.sin(ang)*rad;const land=Math.sin(x*.012+1)*Math.cos(y*.016)+Math.sin(x*.005-y*.007)>.35;if(land)a.push([x,y,r()]);}return a;})();
function earth(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#02030a';ctx.fillRect(-900,-600,3720,2280);for(const[x,y,r,a]of RSTARS)circ(x+400,y+500,r,'#e9eefc',a*.6);
  ctx.save();ctx.translate(960,560);glow(0,0,620,'rgba(70,120,220,1)',.35);circ(0,0,500,'#050b1c');ctx.save();ctx.beginPath();ctx.arc(0,0,500,0,7);ctx.clip();
  for(let i=-6;i<=6;i++){const dx=Math.sin(i*.9)*40;ctx.fillStyle='rgba(20,40,70,.25)';ctx.fillRect(-500,i*80+dx,1000,30);}
  for(const[x,y,r]of EARTH){circ(x,y,1.5+r*2.5,'#f0b060',.55+r*.4);if(r>.93)glow(x,y,30,'rgba(255,180,90,1)',.4);}ctx.restore();ctx.restore();
  // the bar seen from space: a ring around the planet
  ctx.save();ctx.translate(960,560);ctx.rotate(-.2);ctx.strokeStyle='rgba(244,246,251,.25)';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(0,0,640,120,0,0,7);ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(0,0,640,120,0,Math.PI*.1,Math.PI*1.95);ctx.stroke();ctx.restore();});
  if(o.cursor)cursor(o.cursor.x,o.cursor.y,o.cursor.s||.5,1);vign(.3);}
// phone: the memes, then the notification
function phone(cam,t,draw){wl(cam,1,()=>{ctx.fillStyle='#0d0f13';ctx.fillRect(-900,-600,3720,2280);glow(960,540,700,'rgba(120,150,220,1)',.12);ctx.save();ctx.translate(960,560);ctx.rotate(-.04);
  fillRR(-280,-560,560,1120,70,'#111');ctx.save();rr(-262,-540,524,1080,56);ctx.clip();draw();ctx.restore();
  ctx.fillStyle='#1c1f25';ctx.beginPath();ctx.ellipse(-60,640,330,190,-.2,0,7);ctx.fill();for(let i=0;i<4;i++)fillRR(230,300+i*80,130,62,28,'#1c1f25');ctx.restore();});}
function memeFeed(scroll,t){ctx.fillStyle='#f4f5f7';ctx.fillRect(-262,-540,524,1080);ctx.save();ctx.translate(0,-scroll);
  const post=(y,user,cap,pct)=>{circ(-210,y,22,'#9aa6ba');text(user,-176,y+8,'500 22px PM','#222','left');text(cap,-230,y+60,'400 26px IS','#111','left');
    fillRR(-240,y+84,480,220,14,'#0b1020');ctx.save();rr(-240,y+84,480,220,14);ctx.clip();const g=ctx.createLinearGradient(0,y+84,0,y+304);g.addColorStop(0,'#060a16');g.addColorStop(1,'#1a2240');ctx.fillStyle=g;ctx.fillRect(-240,y+84,480,220);
    fillRR(-230,y+140,460,10,5,'rgba(255,255,255,.2)');fillRR(-230,y+140,460*pct/100,10,5,'#fff');text(`UPDATING ${pct}%`,0,y+180,'500 18px PM','#fff');for(let k=0;k<8;k++)fillRR(-230+k*60,y+250-hash(k)*40,50,100,2,'#10141f');ctx.restore();
    text('♥ '+Math.round(80+hash(y)*900)+'k',-230,y+340,'500 20px PM','#c0392b','left');};
  post(-460,'@skywatch','day 7 of the sky updating',7);post(-60,'@notabot','me waiting for the sky to finish',12);post(340,'@gg','if it hits 100 im calling in sick',19);ctx.restore();}
function notif(k,t){const g=ctx.createLinearGradient(0,-540,0,540);g.addColorStop(0,'#1b2440');g.addColorStop(1,'#0a0d18');ctx.fillStyle=g;ctx.fillRect(-262,-540,524,1080);
  text('11:59',0,-330,'500 120px PM','#f4f2ee');text('Tuesday',0,-260,'400 30px PM','rgba(244,242,238,.7)');
  if(k>0){ctx.save();ctx.globalAlpha=k;ctx.translate(0,(1-k)*-40);fillRR(-240,-200,480,330,26,'rgba(235,240,248,.94)');fillRR(-216,-176,56,56,14,'#111');circ(-188,-148,16,'#fff');
    text('REALITY',-144,-158,'500 22px PM','#333','left');text('now',216,-158,'400 20px PM','#777','right');text('You choose.',-216,-60,'400 44px IS','#111','left');
    fillRR(-216,-10,200,80,18,RR.btn);text('Now',-116,42,'500 30px PM','#fff');fillRR(16,-10,200,80,18,'#dfe3ea');text('Tonight',116,42,'500 30px PM','#222');ctx.restore();}}
function vign(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
