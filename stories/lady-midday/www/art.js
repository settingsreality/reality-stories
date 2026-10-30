// ===================== Lady Midday: places and things (v2, 1080x1920) =====================
const LM={sky0:'#f3efe2',sky1:'#f7d98c',wheat:'#d9a93f',wheatD:'#a8772a',wheatL:'#f2cd6a',dust:'205,170,110',road:'#b89a72',van:'#e9e6df',vanT:'#3b6fb6',dress:'#f6f3ea',sun:'255,246,214'};
function me(o){toon(Object.assign({jacket:'#6b4a2b',hat:'beanie',hatCol:'#f0683f',tag:'DELIVERY',skin:'#e9b896',browCol:'#4a2e1f',pants:'#2b2a28'},o));}
function grandma(o){toon(Object.assign({jacket:'#5a7a5e',hat:null,skin:'#e3b190',browCol:'#c9c4bb',pants:'#3a3a40',stripe:false,tag:null},o));
  const h=o.h,x=o.x,y=o.y,hy=y-.83*h,r=.17*h,sc=o.scarf||'#b8423a';ctx.save();ctx.translate(x,hy);ctx.fillStyle=sc;ctx.beginPath();ctx.arc(0,-.01*h,r*1.08,Math.PI*1.0,Math.PI*2.0);ctx.fill();
  poly([-r*1.08,-.01*h,-r*.75,.07*h,-r*1.18,.13*h],sc);poly([r*1.08,-.01*h,r*.75,.07*h,r*1.18,.13*h],sc);
  for(let k=0;k<5;k++)circ(-r*.7+k*r*.35,-r*.55,.012*h,'#f2e3c4',.8);ctx.restore();}
// Lady Midday: tall, white dress to the ground, long pale hair, no face, a sickle
function midday(x,y,h,o={}){ctx.save();ctx.translate(x,y);const sw=Math.sin((o.t||0)*1.3)*.02*h;
  glow(0,-.5*h,h*.7,`rgba(${LM.sun},1)`,.25*(o.glow??1));
  ctx.fillStyle=LM.dress;ctx.beginPath();ctx.moveTo(-.07*h,-.66*h);ctx.quadraticCurveTo(-.2*h,-.3*h,-.26*h+sw,0);ctx.lineTo(.26*h+sw,0);ctx.quadraticCurveTo(.2*h,-.3*h,.07*h,-.66*h);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(170,160,140,.35)';ctx.beginPath();ctx.moveTo(0,-.6*h);ctx.quadraticCurveTo(.08*h,-.3*h,.12*h+sw,0);ctx.lineTo(.26*h+sw,0);ctx.quadraticCurveTo(.2*h,-.3*h,.07*h,-.66*h);ctx.fill();
  line(-.07*h,-.62*h,-.13*h,-.38*h,.035*h,LM.dress);line(.07*h,-.62*h,.16*h,-.42*h,.035*h,LM.dress);
  if(o.sickle!==false){const sx=.16*h,sy=-.42*h;line(sx,sy,sx+.02*h,sy-.08*h,.016*h,'#5b4128');ctx.strokeStyle='#cfd5dd';ctx.lineWidth=.014*h;ctx.lineCap='round';ctx.beginPath();ctx.arc(sx+.08*h,sy-.1*h,.07*h,Math.PI*1.05,Math.PI*2.1);ctx.stroke();
    glow(sx+.12*h,sy-.16*h,.05*h,'rgba(255,255,255,1)',.6*(o.glint??.5));}
  ctx.fillStyle='#ece6d4';ctx.beginPath();ctx.moveTo(-.075*h,-.8*h);ctx.quadraticCurveTo(-.1*h,-.55*h,-.06*h,-.48*h);ctx.lineTo(.06*h,-.48*h);ctx.quadraticCurveTo(.1*h,-.55*h,.075*h,-.8*h);ctx.fill();
  circ(0,-.78*h,.065*h,'#ece6d4');ell(0,-.765*h,.045*h,.052*h,0,o.face||'#cfc7b2');
  if(o.eyes)for(const s of[-1,1])circ(s*.018*h,-.77*h,.007*h,'#1a1a1a',o.eyes);
  ctx.restore();}
function sunSky(y1,o={}){ctx.fillStyle=vgrad(-80,y1,[[0,'#fffaf0'],[.55,LM.sky0],[1,LM.sky1]]);ctx.fillRect(-80,-80,1240,y1+90);
  glow(o.sx??760,o.sy??200,520,`rgba(${LM.sun},1)`,.8);circ(o.sx??760,o.sy??200,90,'#fffdf4');}
function wheatField(t,hz,o={}){ctx.fillStyle=vgrad(hz,2000,[[0,'#e8c879'],[.4,LM.wheat],[1,LM.wheatD]]);ctx.fillRect(-80,hz,1240,2100-hz);
  const R=rng(o.seed||3);for(let i=0;i<(o.n||900);i++){const v=Math.pow(R(),1.6),y=hz+v*(2000-hz),x=R()*1240-80,h=6+70*v;const sw=Math.sin(t*1.7+x*.01)*h*.15;
    line(x,y,x+sw,y-h,1+2.5*v,R()<.5?LM.wheatD:LM.wheatL);ell(x+sw,y-h,1.5+3*v,4+8*v,.2,R()<.5?'#e2b850':'#c58e34');}}
function haze(t,y0,y1,a=.25){ctx.save();ctx.globalAlpha=a;for(let k=0;k<6;k++){const y=y0+(y1-y0)*k/6+Math.sin(t*3+k)*6;ctx.fillStyle='rgba(255,250,235,.15)';ctx.fillRect(-80,y,1240,4+Math.sin(t*5+k*2)*3);}ctx.restore();}
function dustDevil(x,y,h,t,a=1){ctx.save();for(let k=0;k<70;k++){const q=k/70,r=lerp(18,h*.28,q*q),ang=t*7+k*.9;const px=x+Math.cos(ang)*r+Math.sin(t*2+q*4)*20,py=y-q*h;
  circ(px,py,10+q*30,`rgba(${LM.dust},${.22*a*(1-q*.5)})`);}glow(x,y-h*.3,h*.4,`rgba(${LM.dust},1)`,.3*a);ctx.restore();}
// ---------- the van cab, looking down the dirt road ----------
function cabPOV(t,o={}){const hz=o.hz??760;const sh=shakeAt(t,o.shake??1.2,.5);ctx.save();ctx.translate(sh.x,sh.y);
  sunSky(hz+20,{sx:820,sy:230});
  ctx.fillStyle='#9c8a5e';ctx.beginPath();ctx.moveTo(-80,hz+6);for(let x=-80;x<=1160;x+=40)ctx.lineTo(x,hz-8-hash(x*.7)*22);ctx.lineTo(1160,hz+6);ctx.fill();
  fillRR(150,hz-150,44,150,10,'#b5a98c');ell(172,hz-150,22,12,0,'#c9bea2');
  wheatField(t,hz,{seed:5,n:700});
  const flow=o.stopped?0:(t*.6)%1;ctx.fillStyle=vgrad(hz,1500,[[0,'#cdb48c'],[1,LM.road]]);ctx.beginPath();ctx.moveTo(500,hz);ctx.lineTo(580,hz);ctx.lineTo(1000,1500);ctx.lineTo(80,1500);ctx.fill();
  for(let k=0;k<8;k++){const q=fract(k/8+flow);const y=hz+(1500-hz)*q*q;ctx.globalAlpha=.25;line(540-(460*q*q)*.5,y,540+(460*q*q)*.5,y,1+3*q,'#8f7652');ctx.globalAlpha=1;}
  haze(t,hz-40,hz+60,.6);
  if(o.devil>0)dustDevil(lerp(980,120,o.devilX??.5),hz+160,560,t,o.devil);
  if(o.fig){const f=o.fig,k=Math.pow(1-f.d,1.7);const y=lerp(hz+8,1520,k),h=lerp(70,1500,k),x=540+f.x*lerp(120,700,k);ctx.save();ctx.globalAlpha=f.a??1;
    midday(x,y,h,{t,glint:f.glint,eyes:f.eyes});
    const R=rng(9);for(let i=0;i<140;i++){const xx=x+(R()-.5)*h*.8,yy=y+h*.02,hh=h*(.06+R()*.14);line(xx,yy,xx+Math.sin(t*2+i)*4,yy-hh,2+h*.004,R()<.5?LM.wheatD:LM.wheatL);}ctx.restore();}
  for(let i=0;i<40;i++){const R=hash(i*7.1),x=fract(R*13+t*.04*(1+R))*1240-80,y=200+fract(R*29)*1100;circ(x,y,1.5+R*3,'rgba(255,240,200,.5)');}
  poly([-80,-80,40,-80,150,1420,-80,1420],'#1d1b19');poly([1160,-80,1040,-80,930,1420,1160,1420],'#1d1b19');ctx.fillStyle='#1d1b19';ctx.fillRect(-80,-80,1240,60);
  poly([200,80,300,80,220,1300,140,1300],'#ffffff',.06);
  fillRR(420,-10,240,80,16,'#2a2724');fillRR(432,2,216,56,10,'#d9c48e');
  vanDash(t,o);
  ctx.restore();}
function vanDash(t,o={}){ctx.fillStyle=vgrad(1300,1940,[[0,'#3a3632'],[1,'#141210']]);ctx.beginPath();ctx.moveTo(-80,1420);ctx.quadraticCurveTo(540,1300,1160,1420);ctx.lineTo(1160,2000);ctx.lineTo(-80,2000);ctx.fill();
  ctx.strokeStyle='#121110';ctx.lineWidth=40;ctx.beginPath();ctx.arc(260,1960,330,Math.PI*1.12,Math.PI*1.9);ctx.stroke();
  fillRR(840,1760,240,200,8,'#b88a55');line(840,1830,1080,1830,10,'#d9c38f');
  gpsScreen(t,650,1560,o.gps||'map',o);}
function gpsScreen(t,x,y,mode,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(.04);line(0,140,40,260,22,'#141210');fillRR(-210,-140,420,280,24,'#121212');
  const W=380,H=240;ctx.save();rr(-W/2,-H/2,W,H,14);ctx.clip();
  if(mode==='map'){ctx.fillStyle='#e9eef2';ctx.fillRect(-200,-130,400,260);for(let i=0;i<8;i++)line(-200+i*60,-140,-160+i*60,140,6,'#d7dde3');line(-30,140,40,-140,22,'#ffffff');line(-30,140,40,-140,12,'#4f8de0');
    circ(-12,80,14,'#1f6fe0');poly([-12,58,-24,86,0,86],'#fff');fillRR(-180,-115,200,44,8,'#1f6fe0');text('STOP 6 · 2.4 MI',-80,-88,'800 22px MS','#fff');}
  else{ctx.fillStyle='#ffffff';ctx.fillRect(-200,-130,400,260);
    if(mode==='q'){const k=o.qk??1;ctx.globalAlpha=clamp(k);text(o.q1||'',0,-50,'900 28px MS','#1b1b1b');text(o.q2||'',0,-12,'900 28px MS','#1b1b1b');ctx.globalAlpha=1;
      if(o.btn){fillRR(-170,40,150,50,10,'#1b1b1b');text('ANSWER',-95,67,'800 20px MS','#fff');fillRR(20,40,150,50,10,'#ececec');text('IGNORE',95,67,'800 20px MS','#b5b5b5');}}}
  ctx.restore();if(mode!=='map')glow(0,0,520,'rgba(255,255,255,1)',.28);ctx.restore();}
// ---------- the farmland, wide ----------
function farmWide(t,o={}){sunSky(900,{sx:540,sy:300});
  wheatField(t,900,{seed:11,n:1100});
  ctx.fillStyle='#c6aa80';ctx.beginPath();ctx.moveTo(530,900);ctx.lineTo(550,900);ctx.lineTo(760,2000);ctx.lineTo(320,2000);ctx.fill();
  haze(t,860,1000,.6);
  const k=o.van??.5;const vy=lerp(1500,1180,k),s=lerp(1,.6,k),vx=lerp(560,548,k);van(vx,vy,s,t);
  if(o.label)label('104°F',vx+250*s,vy-330*s,{font:'900 48px MS',a:o.label,h:72,bg:'rgba(214,58,40,.95)'});
  for(let i=0;i<60;i++){const R=hash(i*3.7),x=fract(R*13+t*.05)*1240-80,y=500+fract(R*29)*1300;circ(x,y,2+R*3,'rgba(255,240,200,.5)');}}
function van(x,y,s,t){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,10,170,24,0,'rgba(80,60,30,.35)');
  fillRR(-150,-300,300,290,26,LM.van);fillRR(-130,-280,260,110,14,'#2f3640');fillRR(-150,-120,300,40,6,LM.vanT);circ(-110,-40,22,'#fff6c8');circ(110,-40,22,'#fff6c8');
  fillRR(-60,-60,120,30,6,'#c9c6bf');fillRR(-150,-10,300,24,8,'#3a3a3a');ctx.restore();
  for(let i=0;i<14;i++){const q=fract(i/14+t*.5);circ(x+(hash(i)-.5)*160*s,y-q*120*s,(12+q*40)*s,`rgba(${LM.dust},${.25*(1-q)})`);}}
// ---------- grandma's kitchen ----------
function kitchen(t,o={}){fillAll('#e8d6b4');ctx.fillStyle=vgrad(0,1300,[[0,'#f1e2c3'],[1,'#d9c19a']]);ctx.fillRect(-80,-80,1240,1400);
  fillRR(560,200,440,420,10,'#7a5a3a');ctx.save();rr(580,220,400,380,6);ctx.clip();sunSky(500,{sx:820,sy:300});wheatField(t,500,{seed:2,n:200});ctx.restore();line(780,220,780,600,10,'#7a5a3a');line(580,410,980,410,10,'#7a5a3a');
  circ(260,380,110,'#f8f4ea');ctx.strokeStyle='#3a2a1a';ctx.lineWidth=10;ctx.beginPath();ctx.arc(260,380,110,0,7);ctx.stroke();line(260,380,260,300,10,'#1b1b1b');line(260,380,262,315,6,'#1b1b1b');
  ctx.fillStyle='#8a6440';ctx.fillRect(-80,1300,1240,700);for(let i=0;i<6;i++)line(-80,1300+i*110,1160,1300+i*110,3,'rgba(0,0,0,.15)');
  const hold=o.hold??1;
  grandma({x:440,y:1760,h:1250,brow:o.brow||'worried',mouth:'flat',look:o.look||{x:.6,y:.3},armR:[lerp(.1,1.15,hold),lerp(.1,.9,hold)],
    held:(hx,hy,h)=>{ctx.save();ctx.translate(hx+30,hy-40);ctx.rotate(-.12);fillRR(-80,-110,170,210,8,'#f6f0e2');for(let k=0;k<5;k++)line(-55,-60+k*34,60-(k%2)*35,-60+k*34,6,'rgba(40,40,50,.55)');text('RULES',5,-78,'900 26px MS','#1d1f25');ctx.restore();}});}
// ---------- the card, close ----------
const RULES=[["BETWEEN NOON AND ONE,","NEVER STOP","IN THE FIELDS."],["IF SHE ASKS YOU","SOMETHING,","ANSWER."],["NEVER","CHANGE THE","SUBJECT."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#2a2118');glow(540,900,900,'rgba(255,220,150,1)',.18);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.025+(o.tilt||0));
  ctx.fillStyle='rgba(0,0,0,.4)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f6f0e2');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');line(-290,-470,-290,470,2,'rgba(200,80,80,.25)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text("GRANDMA'S RULES",-330,-360,'900 62px MS','#1b1d23','left');line(-330,-330,190,-338,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 44px MS',j===(r===0?1:2)||(r===2&&j===1)?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+40,420,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('12:00 – 1:00',220,430,'800 40px MS','#a3261b');
  ctx.restore();}
// ---------- the legend: Lady Midday in the field ----------
function legend(t,o={}){sunSky(1150,{sx:540,sy:560});glow(540,560,900,`rgba(${LM.sun},1)`,.5);
  wheatField(t,1150,{seed:21,n:900});haze(t,1100,1250,.5);
  midday(540,1700,1250,{t,glint:.5+.5*Math.sin(t*3),glow:1.4});
  const R=rng(4);for(let i=0;i<200;i++){const x=540+(R()-.5)*1000,y=1720-R()*40,hh=80+R()*160;line(x,y,x+Math.sin(t*2+i)*6,y-hh,4,R()<.5?LM.wheatD:LM.wheatL);}
  if(o.l1)label('LADY MIDDAY',540,250,{font:'900 54px MS',a:o.l1,h:80,bg:'rgba(20,16,10,.88)'});
  if(o.l2)label('POŁUDNICA · SLAVIC FIELD SPIRIT',540,340,{font:'800 28px MS',a:o.l2,bg:'rgba(255,201,60,.95)',col:'#14110a'});
  if(o.l3)label('THE HOTTEST HOUR',820,880,{font:'800 30px MS',a:o.l3,bg:'rgba(214,58,40,.95)'});}
// ---------- the GPS, close ----------
function gpsClose(t,o={}){fillAll('#1a1714');const sh=shakeAt(t,o.shake??.6,.4);ctx.save();ctx.translate(sh.x,sh.y);
  ctx.save();ctx.translate(540,820);ctx.scale(2.4,2.4);gpsScreen(t,0,0,o.mode||'q',o);ctx.restore();
  if(o.refl){ctx.save();ctx.globalAlpha=.5*o.refl;midday(900,1960,600,{t,glint:.8});ctx.restore();}
  ctx.restore();}
// ---------- side window: stopped next to the wheat ----------
function sideWindow(t,o={}){fillAll('#1d1b19');
  ctx.save();rr(60,160,960,1120,40);ctx.clip();sunSky(700,{sx:300,sy:260});wheatField(t,700,{seed:8,n:500});
  if(o.fig)midday(lerp(720,600,o.fig),lerp(800,1100,o.fig),lerp(300,820,o.fig),{t,glint:.6});
  const R=rng(12);for(let i=0;i<170;i++){const x=60+R()*960,y=1290,hh=280+R()*560;const sw=Math.sin(t*1.5+i)*14;line(x,y,x+sw,y-hh,6,R()<.5?LM.wheatD:LM.wheatL);ell(x+sw,y-hh,9,26,.2,R()<.5?'#e2b850':'#c58e34');}
  ctx.restore();ctx.strokeStyle='#0f0e0d';ctx.lineWidth=40;rr(60,160,960,1120,40);ctx.stroke();
  ctx.fillStyle='#2b2825';ctx.fillRect(-80,1300,1240,700);fillRR(700,1380,300,40,16,'#3a3632');
  me({x:300,y:2380,h:1500,brow:o.brow||'worried',mouth:o.mouth||'flat',look:{x:.9,y:-.3}});}
// ---------- the phone ----------
function phone(t,o={}){fillAll('#1a1714');glow(540,900,900,'rgba(255,240,200,1)',.12);
  ctx.save();ctx.translate(540,860);ctx.rotate(-.05);fillRR(-300,-560,600,1120,70,'#0d0d0f');fillRR(-275,-530,550,1060,52,'#f2f2f4');
  fillRR(-60,-515,120,30,15,'#0d0d0f');
  text(o.clock||'12:20',0,-380,'900 120px MS','#1b1b1b');text('104°F · EXTREME HEAT',0,-300,'800 26px MS','#c0392b');
  const k=o.msg??1;if(k>0){ctx.globalAlpha=clamp(k*2);fillRR(-245,-230,490,210,30,'#ffffff');circ(-185,-165,34,'#b8423a');text('G',-185,-163,'900 34px MS','#fff');
    text('Grandma',-130,-180,'800 30px MS','#1b1b1b','left');text('now',215,-180,'600 22px MS','#888','right');
    text('Stop answering.',-130,-120,'800 36px MS','#1b1b1b','left');text('Drive.',-130,-70,'900 36px MS','#c0392b','left');ctx.globalAlpha=1;}
  ctx.restore();
  ctx.save();ctx.translate(840,1500);ctx.rotate(-.5);fillRR(-90,-60,200,150,60,'#e9b896');fillRR(-150,-30,120,70,30,'#e9b896');ctx.restore();
  ctx.fillStyle='#6b4a2b';ctx.beginPath();ctx.moveTo(860,1580);ctx.lineTo(1160,1480);ctx.lineTo(1160,2000);ctx.lineTo(920,2000);ctx.fill();}
// ---------- the hospital ----------
function hospital(t,o={}){fillAll('#cfe0dc');ctx.fillStyle=vgrad(0,1400,[[0,'#dfeae6'],[1,'#b9cfca']]);ctx.fillRect(-80,-80,1240,1500);ctx.fillStyle='#9fb5b0';ctx.fillRect(-80,1400,1240,600);
  fillRR(140,180,800,520,14,'#e9efee');ctx.save();rr(160,200,760,480,8);ctx.clip();sunSky(520,{sx:760,sy:300});wheatField(t,520,{seed:15,n:220});if(o.fig)midday(380,610,190,{t,glow:.8,glint:.8});ctx.restore();
  line(540,200,540,680,12,'#e9efee');
  fillRR(800,760,240,170,14,'#1f2a2a');ctx.strokeStyle='#5cf2a2';ctx.lineWidth=5;ctx.beginPath();for(let i=0;i<=40;i++){const x=815+i*5.25,q=fract(i/40-t*.6);const y=845-(q>.45&&q<.5?60:q>.5&&q<.55?-30:0);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();
  fillRR(80,1150,920,90,30,'#f4f7f6');fillRR(60,1220,960,60,10,'#7f9692');line(120,1280,120,1500,16,'#7f9692');line(960,1280,960,1500,16,'#7f9692');
  ell(260,1120,140,85,0,'#ffffff');circ(260,1080,95,'#e3b190');
  ctx.fillStyle='#b8423a';ctx.beginPath();ctx.arc(260,1072,103,Math.PI*1.0,Math.PI*2.0);ctx.fill();
  for(const s of[-1,1])line(260+s*30,1085,260+s*30+s*22,1088,8,'#5a3a2a');line(242,1130,278,1130,7,'#7a3a33');
  ctx.fillStyle='#d9e6f2';ctx.beginPath();ctx.moveTo(350,1060);ctx.quadraticCurveTo(700,1000,960,1080);ctx.lineTo(980,1180);ctx.lineTo(330,1180);ctx.fill();
  ctx.save();ctx.translate(760,1520);ctx.rotate(.04);fillRR(-190,-180,380,350,12,'#6b4a2b');fillRR(-165,-150,330,300,8,'#fbfaf6');text('PATIENT CHART',0,-105,'900 28px MS','#1b1b1b');
  text('ADMITTED: JULY',0,-45,'800 28px MS','#1b1b1b');ctx.globalAlpha=clamp(o.chart??1);text('HEATSTROKE',0,30,'900 44px MS','#c0392b');ctx.globalAlpha=1;text('NO PHONE',0,100,'800 26px MS','#555');ctx.restore();}
