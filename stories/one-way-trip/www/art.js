// ===================== No One to Come Back To: motion graphics for time dilation =====================
const OW={cy:'#6fd3ff',cyA:'rgba(111,211,255,',or:'#f0683f',orA:'rgba(240,104,63,',wh:'#eef2f8',dim:'rgba(238,242,248,.55)',bg0:'#02040b',bg1:'#0a1328'};
const STARS3=[1,2,3].map(L=>{const r=rng(40+L),a=[];for(let i=0;i<260;i++)a.push([r()*2600-340,r()*1500-210,(.5+r()*1.2)*(L*.5+.5),.25+r()*.7]);return a;});
// ---------- shared pieces ----------
function spaceBG(t,o={}){ctx.save();ctx.setTransform(SC,0,0,SC,0,0);const g=ctx.createLinearGradient(0,0,0,1080);g.addColorStop(0,OW.bg0);g.addColorStop(1,OW.bg1);ctx.fillStyle=g;ctx.fillRect(0,0,1920,1080);
  glow(1500,260,700,'rgba(90,60,160,1)',.18);glow(400,860,600,'rgba(40,90,170,1)',.16);
  const st=o.streak||0,drift=o.drift??10;
  STARS3.forEach((L,li)=>{for(const[x0,y0,r,a]of L){let x=((x0-t*drift*(li+1))%2600+2600)%2600-340,y=y0;
    if(st>0){const dx=x-960,dy=y-540,d=Math.hypot(dx,dy)+1;const len=st*d*.35*(li+1)*.5;ctx.strokeStyle=`rgba(220,235,255,${a})`;ctx.lineWidth=r;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dx/d*len,y+dy/d*len);ctx.stroke();}
    else circ(x,y,r,'#e9eefc',a);}});ctx.restore();}
function pill(x,y,label,val,col,a=1,w=520){if(a<=0)return;ctx.save();ctx.setTransform(SC,0,0,SC,0,0);ctx.globalAlpha=a;fillRR(x,y,w,110,24,'rgba(6,10,22,.82)');ctx.strokeStyle=col;ctx.lineWidth=3;rr(x,y,w,110,24);ctx.stroke();
  text(label,x+30,y+42,'500 24px PM',col,'left');text(val,x+30,y+92,'500 46px PM',OW.wh,'left');ctx.restore();}
function caption2(s,a,y=990,col=OW.wh,size=40){if(a<=0)return;ctx.save();ctx.setTransform(SC,0,0,SC,0,0);text(s,960,y,`500 ${size}px PM`,col,'center',a);ctx.restore();}
function photon(x,y,r=12,a=1){glow(x,y,r*7,'rgba(111,211,255,1)',.55*a);circ(x,y,r,'#e8f8ff',a);}
function mirror(x,y,w){fillRR(x-w/2,y-9,w,18,9,'#c9d6e6');fillRR(x-w/2,y-9,w,6,3,'#ffffff');}
function astronaut(p){const h=p.h;person(Object.assign({body:'#e4e6ea',legs:'#d0d3d8',head:'#e4e6ea',hand:'#c9ccd2',shoe:'#9aa0a8',stripe:OW.or},p));
  const f=p.face||1,hy=p.y-1.0*h-(p.lift||0);ctx.save();ctx.translate(p.x,0);ctx.scale(f,1);ell(.035*h,hy,.06*h,.048*h,0,'#c88a2e');ell(.05*h,hy-.012*h,.025*h,.014*h,-.4,'rgba(255,240,200,.7)');ctx.restore();
  fillRR(p.x-.16*h*f-.06*h,p.y-.78*h,.12*h,.2*h,.02*h,'#cfd2d8');}
// ---------- a1/d4: home, a hundred years later ----------
function ruins(cam,t,o){wl(cam,.2,()=>{const g=ctx.createLinearGradient(0,-600,0,700);g.addColorStop(0,'#1a1430');g.addColorStop(.6,'#5a3550');g.addColorStop(1,'#d4825a');ctx.fillStyle=g;ctx.fillRect(-1600,-1200,5120,2800);circ(1300,120,90,'#f6d8b0',.9);glow(1300,120,400,'rgba(255,200,150,1)',.35);});
  wl(cam,.5,()=>{for(let i=0;i<12;i++){const x=-700+i*300,h=300+hash(i)*400;ctx.fillStyle='#2a2030';ctx.beginPath();ctx.moveTo(x,820);ctx.lineTo(x,820-h);ctx.lineTo(x+80,820-h-hash(i*3)*60);ctx.lineTo(x+160,820-h+30);ctx.lineTo(x+240,820-h-20);ctx.lineTo(x+240,820);ctx.fill();}});
  wl(cam,1,()=>{for(let i=0;i<7;i++){const x=-500+i*420,h=260+hash(i+9)*360;ctx.fillStyle='#1c1622';ctx.beginPath();ctx.moveTo(x,860);ctx.lineTo(x,860-h);ctx.lineTo(x+120,860-h+40);ctx.lineTo(x+200,860-h-30);ctx.lineTo(x+300,860-h+60);ctx.lineTo(x+300,860);ctx.fill();
      for(let k=0;k<6;k++)fillRR(x+30+(k%3)*90,860-h+80+Math.floor(k/3)*90,40,50,3,'#0e0b12');
      ctx.strokeStyle='#2f5a2a';ctx.lineWidth=6;for(let v=0;v<4;v++){ctx.beginPath();ctx.moveTo(x+40+v*70,860-h+20);ctx.quadraticCurveTo(x+60+v*70,860-h/2,x+30+v*70,860);ctx.stroke();}}
    ctx.fillStyle='#2a2a1e';ctx.fillRect(-900,860,3720,900);for(let i=0;i<120;i++){const x=-900+hash(i)*3720;line(x,860,x+(hash(i*3)-.5)*30,860-30-hash(i*7)*60,4,'#3d5a2a');}
    for(const tx of[200,1650]){line(tx,860,tx,560,26,'#2a1e14');for(let k=0;k<5;k++)circ(tx+(hash(k+tx)-.5)*200,560-hash(k*3+tx)*120,90,'#22381e',.95);}
    // the capsule
    ctx.save();ctx.translate(1350,860);poly([-140,0,140,0,90,-220,-90,-220],'#c9ccd2');poly([-90,-220,90,-220,40,-280,-40,-280],'#aeb2b8');fillRR(-40,-170,80,90,10,'#1b2533');fillRR(-150,-10,300,20,6,'#6a6e74');
    for(let i=0;i<8;i++){const k=fract(t*.25+i/8);circ(-120+i*30,-10-k*120,10+k*40,'#cfc6c0',.12*(1-k));}ctx.restore();
    if(o.you!==false)astronaut({x:o.youX??960,y:880,h:360,face:o.face??-1,eyes:0});
    if(o.family){for(const[fx,h]of[[1120,330],[1200,270],[1260,200]])person({x:fx,y:880,h,face:-1,body:'#3a3f4a',legs:'#24272e',head:'#151719',hair:'#2a2420',hand:'#151719'});}});
  vign(.4);}
// ---------- b1: the spacetime "speedometer" ----------
function stArrow(cam,t,o){spaceBG(t,{drift:6});wl(cam,1,()=>{const ox=640,oy=900,R=620;ctx.strokeStyle='rgba(238,242,248,.25)';ctx.lineWidth=3;ctx.setLineDash([10,10]);ctx.beginPath();ctx.arc(ox,oy,R,-Math.PI/2,0);ctx.stroke();ctx.setLineDash([]);
  line(ox,oy,ox+R+120,oy,5,OW.dim);line(ox,oy,ox,oy-R-120,5,OW.dim);text('SPACE  →',ox+R+40,oy+50,'500 30px PM',OW.dim);text('TIME',ox-70,oy-R-80,'500 30px PM',OW.dim,'right');
  const th=lerp(Math.PI/2,.18,o.v||0);const ex=ox+Math.cos(th)*R,ey=oy-Math.sin(th)*R;
  line(ox,oy,ex,oy,10,OW.cyA+'.6)');line(ox,oy,ox,ey,10,OW.orA+'.85)');line(ex,ey,ex,oy,3,'rgba(238,242,248,.3)');line(ex,ey,ox,ey,3,'rgba(238,242,248,.3)');
  line(ox,oy,ex,ey,12,OW.wh);const a=Math.atan2(ey-oy,ex-ox);poly([ex,ey,ex-Math.cos(a-.4)*50,ey-Math.sin(a-.4)*50,ex-Math.cos(a+.4)*50,ey-Math.sin(a+.4)*50],OW.wh);
  text('YOUR MOTION',ox+(ex-ox)/2,oy+100,'500 30px PM',OW.cy);text('YOUR TIME',ox-30,ey+(oy-ey)/2,'500 30px PM',OW.or,'right');
  // the ship, faster as v rises
  const sx=1400+((t*(80+1400*(o.v||0)))%700),sy=300;ship(sx,sy,.8,{flame:o.v||0});});}
function ship(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);if(o.flame){const f=o.flame;for(let k=0;k<3;k++){ell(-150-k*40*f,0,60+90*f,14-k*3,0,k?'rgba(111,211,255,.35)':'rgba(255,255,255,.8)');}glow(-170,0,140,'rgba(111,211,255,1)',.4*f);}
  ctx.fillStyle='#d9dde3';ctx.beginPath();ctx.moveTo(170,0);ctx.quadraticCurveTo(120,-46,-40,-46);ctx.lineTo(-130,-30);ctx.lineTo(-130,30);ctx.lineTo(-40,46);ctx.quadraticCurveTo(120,46,170,0);ctx.fill();
  poly([-60,-44,-130,-100,-150,-100,-110,-30],'#aeb4bc');poly([-60,44,-130,100,-150,100,-110,30],'#aeb4bc');fillRR(40,-22,70,30,14,'#1b2533');fillRR(-90,-8,120,6,3,OW.or);ctx.restore();}
// ---------- b2/b3/b4: the light clock ----------
// tri(t,P) = 0..1..0 bounce position for a clock with bounce period P
const tri=(t,P)=>{const u=fract(t/P);return u<.5?u*2:2-u*2;};
function lightClock(cam,t,o){spaceBG(t,{drift:4});wl(cam,1,()=>{const cx=960,top=230,bot=850,P=o.P||1.2;
  if(o.inShip){ctx.save();ctx.translate(cx,540);ctx.strokeStyle='rgba(238,242,248,.5)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(700,0);ctx.quadraticCurveTo(560,-380,-200,-380);ctx.lineTo(-640,-320);ctx.lineTo(-640,320);ctx.lineTo(-200,380);ctx.quadraticCurveTo(560,380,700,0);ctx.stroke();ctx.restore();
    astronaut({x:1380,y:840,h:300,face:-1,eyes:0});}
  mirror(cx,top,360);mirror(cx,bot,360);const k=tri(t,P);const py=lerp(bot-18,top+18,k);
  for(let j=1;j<14;j++){const kk=tri(t-j*.03,P);circ(cx,lerp(bot-18,top+18,kk),12-j*.7,OW.cy,.35*(1-j/14));}photon(cx,py);
  const ticks=Math.floor(t/P*2);if(o.ticks!==false)pill(80,80,'ONE BOUNCE = ONE TICK','TICK  '+(ticks%1000),OW.cy,o.pillA??1,560);});vign(.3);}
// seen from Earth: the clock flies past, the light zig-zags
function earthView(cam,t,o){spaceBG(t,{drift:2});wl(cam,1,()=>{const top=260,bot=820,P=o.P||1.6,v=o.v||520;const t0=o.t0||0,tt=t-t0;
  const sx=-300+((tt*v)%2600);// ship x
  // path traced in Earth frame
  ctx.save();ctx.strokeStyle=OW.cyA+'.85)';ctx.lineWidth=5;ctx.shadowColor=OW.cy;ctx.shadowBlur=18;ctx.beginPath();const n=Math.floor(tt/(P/2));
  for(let i=0;i<=n+1;i++){const ti=Math.min(tt,i*P/2);const x=-300+((ti*v)%2600),y=i%2?top+18:bot-18;if(x>sx+2)break;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}
  const k=tri(tt,P);ctx.lineTo(sx,lerp(bot-18,top+18,k));ctx.stroke();ctx.restore();
  // the ship around the clock
  ctx.save();ctx.translate(sx,540);ctx.strokeStyle='rgba(238,242,248,.45)';ctx.lineWidth=4;rr(-230,-330,460,660,60);ctx.stroke();ctx.restore();
  mirror(sx,top,300);mirror(sx,bot,300);photon(sx,lerp(bot-18,top+18,k));
  if(o.compare){const a=o.compare;ctx.save();ctx.globalAlpha=a;const bx=1450;line(bx,bot,bx,top,6,OW.cyA+'.5)');line(bx,bot,bx+360,top,8,OW.cy);line(bx,top,bx+360,top,3,OW.dim);
    text('ON BOARD',bx-30,540,'500 28px PM',OW.dim,'right');ctx.save();ctx.translate(bx+240,520);ctx.rotate(-1.0);text('FROM EARTH: LONGER',0,0,'500 30px PM',OW.cy);ctx.restore();ctx.restore();}});vign(.3);}
// the speed limit
function speedSign(cam,t,o){spaceBG(t,{streak:.15});wl(cam,1,()=>{for(let i=0;i<6;i++){const y=200+i*130,x=((t*1400+i*500)%2800)-500;ctx.save();ctx.shadowColor=OW.cy;ctx.shadowBlur=20;line(x,y,x+260,y,6,OW.cy);ctx.restore();}
  ctx.save();ctx.translate(960,560);ctx.scale(o.s??1,o.s??1);fillRR(-330,-380,660,760,36,'#f4f4f0');ctx.strokeStyle='#111';ctx.lineWidth=14;rr(-300,-350,600,700,26);ctx.stroke();
  text('SPEED',0,-220,'500 90px PM','#111');text('LIMIT',0,-110,'500 90px PM','#111');text('299,792',0,90,'500 120px PM','#111');text('km / second',0,180,'500 50px PM','#111');text('FOR EVERYONE',0,290,'500 38px PM','#c0392b');ctx.restore();});vign(.35);}
// two clocks: Earth's ticks fast, the moving ship's ticks slow
function twoClocks(cam,t,o){spaceBG(t,{drift:3});wl(cam,1,()=>{const top=300,bot=780;const P1=1.0,P2=o.P2||2.6;
  for(const[cx,P,lab,col]of[[560,P1,'EARTH',OW.or],[1360,P2,'SHIP',OW.cy]]){mirror(cx,top,280);mirror(cx,bot,280);const k=tri(t,P);photon(cx,lerp(bot-18,top+18,k));
    text(lab,cx,200,'500 44px PM',col);text(String(Math.floor(t/P*2)%1000).padStart(3,'0')+' TICKS',cx,880,'500 44px PM',OW.wh);}
  if(o.ecg){const a=o.ecg;ctx.save();ctx.globalAlpha=a;fillRR(80,930,1760,130,20,'rgba(6,10,22,.85)');for(const[x0,P,col]of[[120,.8,OW.or],[1000,2.2,OW.cy]]){ctx.strokeStyle=col;ctx.lineWidth=4;ctx.beginPath();
    for(let x=0;x<760;x+=4){const ph=fract((x/760*3-t/P));const y=995-(ph>.48&&ph<.52?Math.sin((ph-.48)/.04*Math.PI)*45:0)+(ph>.53&&ph<.56?12:0);x?ctx.lineTo(x0+x,y):ctx.moveTo(x0+x,y);}ctx.stroke();}ctx.restore();}});vign(.3);}
// ---------- c1: GPS ----------
function gps(cam,t,o){spaceBG(t,{drift:2});wl(cam,1,()=>{const cx=700,cy=560;glow(cx,cy,520,'rgba(80,160,255,1)',.25);circ(cx,cy,300,'#123a6a');ctx.save();ctx.beginPath();ctx.arc(cx,cy,300,0,7);ctx.clip();
  for(const[x,y,rx,ry]of[[-80,-60,140,90],[120,40,110,150],[-150,140,90,60],[60,-170,80,50]])ell(cx+x+Math.sin(t*.2)*10,cy+y,rx,ry,.3,'#2f6a3a');ctx.restore();
  for(let k=0;k<3;k++){ctx.strokeStyle='rgba(238,242,248,.18)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(cx,cy,460,170,k*1.05+.3,0,7);ctx.stroke();const a=t*.4+k*2.1;const sx=cx+Math.cos(a)*460*Math.cos(k*1.05+.3)-Math.sin(a)*170*Math.sin(k*1.05+.3),sy=cy+Math.cos(a)*460*Math.sin(k*1.05+.3)+Math.sin(a)*170*Math.cos(k*1.05+.3);
    fillRR(sx-14,sy-10,28,20,4,'#d9dde3');line(sx-50,sy,sx+50,sy,6,'#3a6fb0');}
  // a phone map, drifting
  const dr=o.drift||0;ctx.save();ctx.translate(1440,560);fillRR(-200,-380,400,760,50,'#0b0c0f');fillRR(-182,-362,364,724,40,'#e9edf2');ctx.save();rr(-182,-362,364,724,40);ctx.clip();
  for(let k=-4;k<5;k++){line(-200,k*90,200,k*90+30,14,'#ffffff');line(k*90,-400,k*90-30,400,14,'#ffffff');}
  const dx=dr*240,dy=-dr*160;line(0,0,dx,dy,4,'rgba(208,58,42,.8)');circ(0,0,18,'#3a8ad0',.5);circ(dx,dy,18,'#3a8ad0');glow(dx,dy,60,'rgba(58,138,208,1)',.4);ctx.restore();
  text('+'+Math.round(dr*10)+' km',dx>0?60:0,300,'500 40px PM','#d03a2a');ctx.restore();
  pill(80,80,'SATELLITE CLOCKS','+38 μs / day',OW.cy,o.pillA??1,520);});vign(.3);}
// ---------- c2: the speed slider ----------
function speedPanel(cam,t,o){spaceBG(t,{streak:o.streak||0,drift:20});wl(cam,1,()=>{fillRR(260,180,1400,720,40,'rgba(8,12,26,.88)');ctx.strokeStyle='rgba(238,242,248,.2)';ctx.lineWidth=3;rr(260,180,1400,720,40);ctx.stroke();
  text('REALITY SETTINGS',330,250,'500 26px PM',OW.dim,'left');text('SPEED',330,350,'500 44px PM',OW.wh,'left');
  const p=o.pct||0;const x0=330,x1=1590,pos=lerp(x0,x1,o.knob??(p/100));fillRR(x0,400,x1-x0,20,10,'rgba(238,242,248,.15)');fillRR(x0,400,pos-x0,20,10,OW.cy);circ(pos,410,30,OW.wh);glow(pos,410,90,'rgba(111,211,255,1)',.4);
  text(o.label||'0%',x1,350,'500 64px PM',OW.cy,'right');text('OF LIGHT SPEED',x1,390,'500 22px PM',OW.dim,'right');
  text('YOUR CLOCK RUNS AT',330,540,'500 30px PM',OW.dim,'left');text(o.rate||'100%',330,660,'500 120px PM',OW.or,'left');
  text('1 SECOND FOR YOU =',1590,540,'500 30px PM',OW.dim,'right');text(o.earth||'1 s',1590,660,'500 90px PM',OW.wh,'right');text('ON EARTH',1590,710,'500 28px PM',OW.dim,'right');
  if(o.years){const a=o.years;ctx.globalAlpha=a;line(330,780,1590,780,2,'rgba(238,242,248,.2)');text('1 YEAR FOR YOU',600,860,'500 46px PM',OW.cy);text('70 YEARS ON EARTH',1320,860,'500 46px PM',OW.or);ctx.globalAlpha=1;}});vign(.3);}
// ---------- d1: the round trip ----------
function starMap(cam,t,o){spaceBG(t,{drift:1});wl(cam,1,()=>{const ex=360,sx=1560,y=520;ctx.setLineDash([14,12]);line(ex,y,sx,y,3,'rgba(238,242,248,.3)');ctx.setLineDash([]);
  glow(ex,y,120,'rgba(80,160,255,1)',.5);circ(ex,y,30,'#2f7ad0');text('EARTH',ex,y+90,'500 30px PM',OW.dim);glow(sx,y,160,'rgba(255,220,140,1)',.6);circ(sx,y,26,'#ffe9b0');text('A STAR',sx,y+90,'500 30px PM',OW.dim);
  text('50 LIGHT-YEARS',960,y-60,'500 34px PM',OW.wh);const k=o.k||0;const there=k<.5?k*2:2-k*2;const px=lerp(ex+40,sx-40,there);ctx.save();ctx.translate(px,y+(k<.5?-30:30));ctx.scale(k<.5?.45:-.45,.45);ship(0,0,1,{flame:1});ctx.restore();});
  pill(120,760,'YOU',(o.you??0).toFixed(1)+' YEARS',OW.cy,1,560);pill(1240,760,'EARTH',Math.round(o.earth??0)+' YEARS',OW.or,1,560);vign(.25);}
// ---------- d2: a hundred years; the twin diagram ----------
function century(cam,t,o){spaceBG(t,{drift:1});wl(cam,1,()=>{const yr=Math.round(lerp(2026,2126,o.k||0));text(String(yr),960,330,'500 220px PM',OW.or);
  const fade=o.k||0;ctx.save();ctx.translate(960,700);ctx.rotate(-.03);fillRR(-330,-180,660,380,8,'#f2efe6');ctx.save();ctx.beginPath();ctx.rect(-300,-150,600,290);ctx.clip();ctx.fillStyle=`rgb(${Math.round(lerp(90,170,fade))},${Math.round(lerp(120,150,fade))},${Math.round(lerp(160,120,fade))})`;ctx.fillRect(-300,-150,600,290);
  ctx.globalAlpha=1-fade*.85;for(const[px,h]of[[-170,230],[-60,200],[50,250],[160,150]])person({x:px,y:140,h,face:1,body:'#3a3f4a',legs:'#24272e',head:'#151719',hair:'#2a2420',hand:'#151719'});ctx.restore();ctx.restore();});vign(.3);}
function twins(cam,t,o){spaceBG(t,{drift:1});wl(cam,1,()=>{const ox=700,oy=980,top=140;line(ox,oy,ox,top,8,OW.or);text('EARTH',ox,oy+50,'500 30px PM',OW.or);
  const tx=ox+520,ty=(oy+top)/2;const k=o.k||0;const half=Math.min(1,k*2),back=Math.max(0,k*2-1);line(ox,oy,lerp(ox,tx,half),lerp(oy,ty,half),8,OW.cy);if(back>0)line(tx,ty,lerp(tx,ox,back),lerp(ty,top,back),8,OW.cy);
  for(let i=0;i<=20;i++){const y=lerp(oy,top,i/20);line(ox-14,y,ox+14,y,3,OW.orA+'.7)');}
  for(const[a,b]of[[0,.5],[.5,1]]){for(let i=0;i<=2;i++){const u=lerp(a,b,i/2);const x=u<=.5?lerp(ox,tx,u*2):lerp(tx,ox,(u-.5)*2),y=u<=.5?lerp(oy,ty,u*2):lerp(ty,top,(u-.5)*2);circ(x,y,7,OW.cy);}}
  if(k>.45){text('TURNAROUND',tx+30,ty,'500 30px PM',OW.cy,'left');}
  text('TIME ↑',ox-40,top+10,'500 26px PM',OW.dim,'right');
  if(o.figs){const a=o.figs;ctx.globalAlpha=a;person({x:1500,y:900,h:300,face:-1,body:'#4a4f5a',legs:'#2a2d33',head:'#151719',hair:'#d9d6cc',hand:'#151719',lean:.18});text('AGED 100 YEARS',1500,960,'500 26px PM',OW.or);
    astronaut({x:1760,y:900,h:300,face:-1,eyes:0});text('AGED 1.5',1760,960,'500 26px PM',OW.cy);ctx.globalAlpha=1;}});vign(.25);}
// ---------- d3: Andromeda ----------
function galaxy(x,y,s,rot,col,a=1){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s*.45);glow(0,0,300,col,.5*a);for(let arm=0;arm<2;arm++)for(let i=0;i<160;i++){const r=20+i*1.6,th=i*.06+arm*Math.PI;circ(Math.cos(th)*r+(hash(i+arm*200)-.5)*20,Math.sin(th)*r+(hash(i*3+arm)-.5)*20,2+hash(i*7)*2,'#eef2ff',.5*a);}circ(0,0,30,'#fff3d8',a);ctx.restore();}
function andromeda(cam,t,o){spaceBG(t,{drift:1});wl(cam,1,()=>{galaxy(380,560,1.2,.2,'rgba(150,170,255,1)');text('MILKY WAY',380,820,'500 28px PM',OW.dim);galaxy(1560,480,1.0,-.5,'rgba(220,180,255,1)');text('ANDROMEDA',1560,720,'500 28px PM',OW.dim);
  const k=o.k||0;ctx.save();ctx.strokeStyle=OW.cyA+'.6)';ctx.lineWidth=4;ctx.setLineDash([16,12]);ctx.beginPath();ctx.moveTo(380,560);ctx.quadraticCurveTo(960,260,1560,480);ctx.stroke();ctx.restore();
  const u=k,qx=(1-u)*(1-u)*380+2*(1-u)*u*960+u*u*1560,qy=(1-u)*(1-u)*560+2*(1-u)*u*260+u*u*480;circ(qx,qy,10,'#fff');glow(qx,qy,60,'rgba(111,211,255,1)',.6);
  text('2.5 MILLION LIGHT-YEARS',960,300,'500 30px PM',OW.wh);});
  pill(120,800,'YOU (1 g THE WHOLE WAY)',Math.round(lerp(0,28,o.k||0))+' YEARS',OW.cy,1,640);pill(1160,800,'EARTH',Math.round(lerp(0,2500000,o.e??(o.k||0))).toLocaleString('en-US')+' YEARS',OW.or,1,640);vign(.25);}
function earthFade(cam,t,o){spaceBG(t,{drift:1});wl(cam,1,()=>{const cx=960,cy=560;glow(cx,cy,560,'rgba(80,160,255,1)',.2);circ(cx,cy,360,'#05101e');ctx.save();ctx.beginPath();ctx.arc(cx,cy,360,0,7);ctx.clip();
  const L=1-(o.k||0);for(let i=0;i<700;i++){const a=hash(i)*6.283,r=Math.sqrt(hash(i*3))*350;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.9;if(Math.sin(x*.02)+Math.cos(y*.018)>.3)circ(x,y,2+hash(i*5)*2,'#f0b060',L*(.5+hash(i*9)*.5));}
  ctx.restore();ctx.strokeStyle='rgba(120,180,255,.35)';ctx.lineWidth=6;ctx.beginPath();ctx.arc(cx,cy,362,0,7);ctx.stroke();});
  pill(1160,800,'EARTH',Math.round(2500000).toLocaleString('en-US')+' YEARS',OW.or,1,640);vign(.3);}
// ---------- e1: the equations ----------
function equation(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#0a1630';ctx.fillRect(-900,-600,3720,2280);for(let x=-900;x<2820;x+=60)line(x,-600,x,1700,1,'rgba(120,170,255,.08)');for(let y=-600;y<1700;y+=60)line(-900,y,2820,y,1,'rgba(120,170,255,.08)');
  const a=o.eq??1;ctx.globalAlpha=a;text('G',700,420,'italic 400 150px IS',OW.wh);text('μν',770,450,'italic 400 70px IS',OW.wh,'left');text('= 8πG',1040,420,'italic 400 150px IS',OW.wh);text('T',1330,420,'italic 400 150px IS',OW.wh);text('μν',1385,450,'italic 400 70px IS',OW.wh,'left');
  text("EINSTEIN'S FIELD EQUATIONS",960,540,'500 30px PM',OW.dim);ctx.globalAlpha=1;
  const b=o.name||0;if(b>0){ctx.globalAlpha=b;text('MIGUEL ALCUBIERRE · 1994',960,700,'500 50px PM',OW.cy);text('"The warp drive: hyper-fast travel within general relativity"',960,770,'italic 400 40px IS',OW.dim);ctx.globalAlpha=1;}});vign(.3);}
// ---------- e2: the warp bubble surface ----------
function fWarp(r,R=1,sg=4){return (Math.tanh(sg*(r+R))-Math.tanh(sg*(r-R)))/(2*Math.tanh(sg*R));}
function warpSurface(cam,t,o){spaceBG(t,{streak:o.streak||0,drift:30});wl(cam,1,()=>{const N=34,ext=3.2,cx=960,cy=520,S=210;const A=(o.amp??1)*1.6*(1+.06*Math.sin(t*2));
  const P=(x,y)=>{const r=Math.hypot(x,y);const dr=.01;const df=(fWarp(r+dr)-fWarp(r-dr))/(2*dr);const h=-A*(x/(r+1e-6))*df;return[cx+(x-y)*S*.62,cy+(x+y)*S*.3-h*S*.45];};
  ctx.lineWidth=2;for(let i=0;i<=N;i++){for(const dir of[0,1]){ctx.beginPath();for(let j=0;j<=N*2;j++){const u=-ext+2*ext*i/N,v=-ext+2*ext*j/(N*2);const x=dir?v:u,y=dir?u:v;const p=P(x,y);j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}
    ctx.strokeStyle=`rgba(111,211,255,${.16+.22*(i%4===0)})`;ctx.stroke();}}
  const sp=P(0,0);ctx.save();ctx.translate(sp[0],sp[1]-40);ctx.scale(.42,.42);ctx.rotate(Math.atan2(.3,.62));ship(0,0,1,{});ctx.restore();glow(sp[0],sp[1]-40,180,'rgba(111,211,255,1)',.25);
  if(o.labels){const a=o.labels;const f=P(1.6,-.2),b=P(-1.6,.2);ctx.globalAlpha=a;text('SPACE SQUEEZED',f[0]+120,f[1]+140,'500 32px PM',OW.or);text('SPACE STRETCHED',b[0]-120,b[1]-150,'500 32px PM',OW.cy);ctx.globalAlpha=1;}});vign(.3);}
// a moving walkway: you stand still, the floor carries you
function walkway(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#1a1d24';ctx.fillRect(-900,-600,3720,2280);fillRR(-900,700,3720,160,0,'#2a2f38');for(let k=0;k<40;k++){const x=((k*120-t*300)%4800+4800)%4800-900;line(x,710,x,850,4,'#3a414c');}
  fillRR(-900,690,3720,14,0,'#8a96aa');astronaut({x:960,y:780,h:380,face:1,eyes:0});for(let i=0;i<10;i++){const x=((i*400-t*300)%4000+4000)%4000-900;fillRR(x,300,160,240,10,'#232733');}});
  caption2('YOU STAND STILL · THE FLOOR MOVES',1,140,OW.cy,36);vign(.3);}
// ---------- e3: same time; home ----------
function analog(x,y,r,tm,col,label){circ(x,y,r,'rgba(6,10,22,.85)');ctx.strokeStyle=col;ctx.lineWidth=8;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();for(let k=0;k<12;k++){const a=k/12*6.283;line(x+Math.cos(a)*r*.8,y+Math.sin(a)*r*.8,x+Math.cos(a)*r*.92,y+Math.sin(a)*r*.92,4,OW.dim);}
  const a=tm*6.283/12-Math.PI/2;line(x,y,x+Math.cos(a)*r*.75,y+Math.sin(a)*r*.75,6,OW.wh);const b=tm*6.283/144-Math.PI/2;line(x,y,x+Math.cos(b)*r*.5,y+Math.sin(b)*r*.5,10,OW.wh);circ(x,y,10,col);text(label,x,y+r+70,'500 40px PM',col);}
function syncClocks(cam,t,o){spaceBG(t,{drift:3});wl(cam,1,()=>{const tm=t*2;analog(620,500,230,tm,OW.or,'EARTH');analog(1300,500,230,tm,OW.cy,'SHIP');text('=',960,530,'500 140px PM',OW.wh);});
  caption2('SAME TIME',o.same??1,1000,OW.wh,46);vign(.3);}
function homecoming(cam,t,o){wl(cam,1,()=>{const g=ctx.createLinearGradient(0,-600,0,800);g.addColorStop(0,'#0b1024');g.addColorStop(1,'#2a2440');ctx.fillStyle=g;ctx.fillRect(-900,-600,3720,2280);for(const[x,y,r,a]of STARS3[0])circ(x,y-300,r,'#e9eefc',a*.6);
  fillRR(560,300,800,560,6,'#2a2630');poly([520,310,1400,310,960,100],'#1d1a22');for(const[wx,wy]of[[640,400],[1160,400]]){fillRR(wx,wy,140,160,4,'#f0b060');glow(wx+70,wy+80,240,'rgba(255,190,110,1)',.35);}fillRR(900,620,120,240,4,'#f0b060');glow(960,740,400,'rgba(255,190,110,1)',.4);
  ctx.fillStyle='#16141a';ctx.fillRect(-900,860,3720,900);astronaut({x:820,y:900,h:340,face:1,eyes:0});for(const[fx,h]of[[1000,320],[1090,250],[1150,190]])person({x:fx,y:900,h,face:-1,body:'#3a3f4a',legs:'#24272e',head:'#151719',hair:'#2a2420',hand:'#151719',armL:-1.3,elbowL:.3});});vign(.35);}
// ---------- e4: negative energy; cause and effect ----------
function negEnergy(cam,t,o){spaceBG(t,{drift:2});wl(cam,1,()=>{const x0=420,x1=1500,y=540;fillRR(x0,y-50,x1-x0,100,50,'rgba(238,242,248,.1)');const zero=lerp(x0,x1,.62);line(zero,y-90,zero,y+90,6,OW.wh);text('0',zero,y-110,'500 40px PM',OW.wh);
  const v=o.v||0;const xv=lerp(zero,x0+20,v);fillRR(Math.min(xv,zero),y-40,Math.abs(zero-xv),80,40,`rgba(208,58,42,${.6+.3*Math.sin(t*6)})`);text('NEGATIVE ENERGY',(xv+zero)/2,y+150,'500 44px PM','#ff6a5a');
  text('?',x0-60,y+30,'500 140px PM','rgba(255,106,90,'+(o.q||0)+')');text("NOBODY KNOWS HOW TO MAKE IT",960,860,'500 34px PM','rgba(238,242,248,'+(o.q||0)+')');});vign(.3);}
function causality(cam,t,o){spaceBG(t,{drift:2});wl(cam,1,()=>{const y=560;line(240,y,1680,y,6,OW.dim);poly([1700,y,1660,y-24,1660,y+24],OW.dim);text('TIME →',1680,y+70,'500 30px PM',OW.dim,'right');
  const k=o.k||0;const leave=lerp(600,1250,ss(k)),arrive=lerp(1250,600,ss(k));circ(leave,y,22,OW.or);text('YOU LEAVE',leave,y-50,'500 36px PM',OW.or);circ(arrive,y,22,OW.cy);text('YOU ARRIVE',arrive,y+80,'500 36px PM',OW.cy);
  if(k>.6){ctx.strokeStyle='rgba(238,242,248,.5)';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(arrive,y+110);ctx.quadraticCurveTo(960,y+330,leave,y+110);ctx.stroke();text('CAUSE ↔ EFFECT ?',960,y+300,'500 40px PM',OW.wh);}});vign(.3);}
// ---------- f1: leaving ----------
function departure(cam,t,o){spaceBG(t,{streak:o.streak||0,drift:8});wl(cam,1,()=>{const k=o.k||0;glow(lerp(400,200,k),lerp(820,900,k),lerp(400,200,k),'rgba(80,160,255,1)',.4);circ(lerp(400,200,k),lerp(820,900,k),lerp(260,90,k),'#123a6a');
  ship(lerp(900,1500,k),lerp(560,420,k),lerp(1.1,.4,k),{flame:1});});vign(.35);}
function vign(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
