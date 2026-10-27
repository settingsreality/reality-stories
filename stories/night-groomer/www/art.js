// ===================== Night Groomer: places and things (v2, 1080x1920) =====================
const NG={red:'#c63a2b',cat:'#d8432f',lamp:'255,236,196',snowD:'#17223a',snowM:'#2a3a5c',dash:'#0b0d12'};
const NSTARS=(()=>{const r=rng(7),a=[];for(let i=0;i<260;i++)a.push([r()*1180-50,r()*1300-60,r()<.12?2.6:1.4,.25+r()*.6]);return a;})();
function nightSky(y1,o={}){ctx.fillStyle=vgrad(-60,y1,[[0,'#03050c'],[.6,'#0a1122'],[1,'#162038']]);ctx.fillRect(-80,-80,1240,y1+90);
  for(const[x,y,r,a]of NSTARS)if(y<y1-30)circ(x,y,r,'#e6ecff',a*(o.starA??1));}
// a skier who isn't: red groomer jacket, name tag, dark helmet, no face
function them(x,y,h,o={}){toon(Object.assign({x,y,h,jacket:NG.red,hat:'helm',hatCol:'#121418',blank:true,glint:o.glint??0,tag:'NIGHT\nGROOMER',armL:[.06,.04],armR:[.06,.04],pants:'#1a1d24'},o));}
function me(o){toon(Object.assign({jacket:NG.red,hat:'beanie',hatCol:'#f0683f',tag:'NIGHT\nGROOMER',skin:'#e9b896',browCol:'#4a2e1f'},o));}

// ---------- the cab, looking up the slope ----------
// o: crest (y of the slope's top edge), figs [{d 0 near..1 far, x -1..1, glint}], crowd 0..1, cable 0..1, pull (uphill drag), lights 0..1,
//    radio 0..1 (waveform), card true, shake
function cabPOV(t,o={}){const crest=o.crest??600,L=o.lights??1;const sh=shakeAt(t,o.shake??1.6,.5);ctx.save();ctx.translate(sh.x,sh.y);
  nightSky(crest+40);
  // the far ridge beyond the crest
  ctx.fillStyle='#0b1222';ctx.beginPath();ctx.moveTo(-80,crest+10);for(let x=-80;x<=1160;x+=60)ctx.lineTo(x,crest-40-Math.abs(Math.sin(x*.004+1.3))*120-hash(x)*30);ctx.lineTo(1160,crest+10);ctx.fill();
  // slope surface + corduroy
  ctx.fillStyle=vgrad(crest,1500,[[0,'#1a2642'],[1,'#2b3d63']]);ctx.fillRect(-80,crest,1240,1500-crest+80);
  const flow=(t*(40+(o.pull||0)*260))%1;
  for(let i=-16;i<=16;i++){const xb=540+i*90;line(xb,1500,540+(xb-540)*.06,crest,2.5,'rgba(170,190,230,.10)');}
  for(let k=0;k<10;k++){const q=((k+flow)/10);const y=crest+(1500-crest)*q*q;line(-80,y,1160,y,1.5,`rgba(170,190,230,${.03+.05*q})`);}
  // headlight pool
  if(L>0){ctx.save();ctx.globalCompositeOperation='lighter';
    ctx.fillStyle=vgrad(crest,1400,[[0,`rgba(${NG.lamp},${.05*L})`],[1,`rgba(${NG.lamp},${.30*L})`]]);
    ctx.beginPath();ctx.moveTo(250,1400);ctx.lineTo(830,1400);ctx.lineTo(1000,crest+30);ctx.lineTo(80,crest+30);ctx.closePath();ctx.fill();
    glow(540,1050,620,`rgba(${NG.lamp},1)`,.16*L);beam(360,1400,-.16,1100,330,.14*L);beam(720,1400,.16,1100,330,.14*L);ctx.restore();}
  // anchor post at the crest + the cable over the cab roof
  if(o.anchor||o.cable){line(540,crest-70,540,crest+14,9,'#07090d');circ(540,crest-74,7,'#ff3b2f',.6+.4*Math.sin(t*6));glow(540,crest-74,40,'rgba(255,60,40,1)',.35);}
  if(o.cable){const v=o.taut?Math.sin(t*70)*1.2:0;ctx.strokeStyle=`rgba(205,214,230,${.75*o.cable})`;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(560,-40);
    ctx.quadraticCurveTo(552+v,crest*.5+(o.taut?0:40),540,crest-50);ctx.stroke();}
  // the crowd at the anchor
  if(o.crowd>0){const R=rng(5);const n=Math.round(30*o.crowd);const pts=[];for(let i=0;i<n;i++){const a=R()*6.28,rr=50+R()*260;pts.push([540+Math.cos(a)*rr*1.5,crest+14+Math.sin(a)*rr*.16+R()*14,(o.crowdH||110)*(.8+R()*.45)]);}
    pts.sort((p,q)=>p[1]-q[1]);for(const[x,y,h]of pts)them(x,y,h,{armR:[2.2,.3],armL:[2.0,.4],stripe:h>60,tag:null,glint:o.glint||0});}
  // figures on the slope, far ones first
  for(const f of (o.figs||[]).slice().sort((a,b)=>b.d-a.d)){const k=Math.pow(1-f.d,1.8);const y=lerp(crest+10,1500,k),h=lerp(60,1250,k),x=540+f.x*lerp(80,620,k);
    ctx.save();ctx.globalAlpha=f.a??1;glow(x,y-h*.5,h*.6,`rgba(${NG.lamp},1)`,.10*L);ell(x,y-h*.02,h*.16,h*.035,0,'rgba(5,8,16,.55)');poly([x-h*.1,y,x+h*.1,y,x+h*.05,y-h*.55*(1-f.d*.5),x-h*.05,y-h*.55*(1-f.d*.5)],'rgba(5,8,16,1)',.28*L);them(x,y,h,{glint:f.glint??0});ctx.restore();}
  // snow, bright where the beams are
  snow(t,11,240,{fall:150+(o.pull||0)*700,wind:-40,a:.85,mask:(x,y)=>y>1390?0:.18+L*1.6*Math.max(inBeam(x,y,360,1400,-.16,1100,330),inBeam(x,y,720,1400,.16,1100,330))});
  // windshield frame + glass
  ctx.fillStyle='#06070a';poly([-80,-80,60,-80,170,1420,-80,1420],'#06070a');poly([1160,-80,1020,-80,910,1420,1160,1420],'#06070a');ctx.fillRect(-80,-80,1240,70);
  poly([190,80,300,80,210,1300,120,1300],'#cfe0ff',.035);poly([760,80,800,80,760,1100,730,1100],'#cfe0ff',.025);
  if(o.wiper!==false){line(330,1370,700,1330,9,'#050608');}
  dashboard(t,o);
  ctx.restore();}
function dashboard(t,o={}){ctx.fillStyle=vgrad(1300,1940,[[0,'#151821'],[1,'#06070a']]);ctx.beginPath();ctx.moveTo(-80,1420);ctx.quadraticCurveTo(540,1290,1160,1420);ctx.lineTo(1160,2000);ctx.lineTo(-80,2000);ctx.fill();
  line(-80,1418,1160,1418,3,'rgba(255,255,255,.04)');
  // gauges
  for(const[gx,v]of[[420,.35+.03*Math.sin(t*3)],[640,.62+(o.gauge||0)]]){circ(gx,1560,74,'#0a0c10');ctx.strokeStyle='rgba(255,170,70,.55)';ctx.lineWidth=6;ctx.beginPath();ctx.arc(gx,1560,60,Math.PI*.8,Math.PI*2.2);ctx.stroke();
    const a=Math.PI*.8+Math.PI*1.4*clamp(v);line(gx,1560,gx+Math.cos(a)*50,1560+Math.sin(a)*50,5,'#ffb35a');glow(gx,1560,110,'rgba(255,160,60,1)',.12);}
  // the rules card taped to the dash
  if(o.card!==false){ctx.save();ctx.translate(165,1540);ctx.rotate(-.07);fillRR(-95,-70,190,140,6,'#efe9db');for(let k=0;k<4;k++)line(-70,-30+k*24,60-(k%2)*30,-30+k*24,5,'rgba(40,40,50,.55)');
    ctx.globalAlpha=.7;fillRR(-60,-82,52,22,3,'#d9cfb2');fillRR(18,-82,52,22,3,'#d9cfb2');ctx.globalAlpha=1;ctx.restore();}
  // radio
  fillRR(820,1470,200,130,14,'#1b1e26');fillRR(838,1488,164,62,8,o.radio?'#0e2a1c':'#0b1712');
  if(o.radio)waveform(920,1519,140,46,t,o.radio,'#5cf2a2',12);else text('CH 2',920,1530,'800 26px MS','#2f6b4a');
  circ(1000,1575,8,o.radio?'#5cf2a2':'#1f3a2b');if(o.radio)glow(920,1520,240,'rgba(80,255,160,1)',.22*o.radio);
  // joystick
  line(960,1900,935,1700,26,'#101218');circ(935,1690,30,'#1b1e26');}

// ---------- the mountain, wide ----------
function mountainWide(t,o={}){nightSky(1300);circ(830,330,46,'#e8e4d8');circ(848,318,44,'#0a1122');glow(820,330,200,'rgba(220,225,255,1)',.08);
  // far range
  ctx.fillStyle='#0f182c';ctx.beginPath();ctx.moveTo(-80,1100);for(let x=-80;x<=1160;x+=40)ctx.lineTo(x,900-Math.abs(Math.sin(x*.006))*220-hash(x*.3)*40);ctx.lineTo(1160,1100);ctx.fill();
  // the big mountain, moonlit snow
  ctx.fillStyle=vgrad(560,1700,[[0,'#c3cfe3'],[.45,'#7b8db0'],[1,'#2f3f60']]);ctx.beginPath();ctx.moveTo(-120,1700);ctx.lineTo(180,1180);ctx.lineTo(420,760);ctx.lineTo(560,560);ctx.lineTo(700,780);ctx.lineTo(880,1000);ctx.lineTo(1200,1600);ctx.lineTo(1200,1800);ctx.lineTo(-120,1800);ctx.fill();
  ctx.globalAlpha=.55;poly([560,560,700,780,880,1000,1200,1600,1200,1800,760,1800,620,900],'#2a3858');ctx.globalAlpha=1;
  // tree bands between runs
  const R=rng(21);for(let i=0;i<420;i++){const u=R(),v=R();const band=Math.floor(R()*3);const bx=[260,520,760][band];const y=lerp(900,1650,v);const x=bx+(y-900)*[-.55,-.1,.35][band]+(R()-.5)*90*(1+v);
    const s=8+18*v;poly([x,y-s*2.2,x-s,y,x+s,y],'#0b1420');}
  // Widow's Run: the steep one, and the cat's lights crawling up it
  const k=o.cat??.5;const cx=lerp(330,470,k),cy=lerp(1380,880,k);
  ctx.save();ctx.globalCompositeOperation='lighter';beam(cx,cy,.25,170,55,.45);glow(cx+16,cy-30,70,`rgba(${NG.lamp},1)`,.4);ctx.restore();
  fillRR(cx-14,cy-9,28,16,4,'#d8432f');circ(cx+12,cy-4,4,'#fff6d8');
  if(o.label)label("WIDOW'S RUN",cx+150,cy+40,{font:'800 30px MS',a:o.label});
  // forest + lodge
  for(let i=0;i<46;i++){const x=i*26-40+hash(i)*14,h=120+hash(i*3.3)*140;poly([x,1920-h-120,x-38,1920-110,x+38,1920-110],'#060a12');}
  ctx.fillStyle='#05080e';ctx.fillRect(-80,1800,1240,200);
  snow(t,3,140,{fall:90,wind:-20,a:.55});}

// ---------- the garage: Walt and the rules ----------
function garage(t,o={}){fillAll('#1c1714');ctx.fillStyle=vgrad(0,1300,[[0,'#120f0d'],[1,'#2a211b']]);ctx.fillRect(-80,-80,1240,1400);
  ctx.fillStyle='#16120f';ctx.fillRect(-80,1300,1240,700);for(let i=0;i<8;i++)line(-80,1300+i*90,1160,1300+i*90,2,'rgba(0,0,0,.25)');
  // the snowcat behind him
  catSide(800,1290,1.25,0,{lights:.6});
  // hanging lamp
  line(540,-80,540,170,4,'#0a0a0a');poly([470,170,610,170,580,130,500,130],'#2b2b2b');glow(540,200,700,'rgba(255,200,130,1)',.32);
  ctx.save();ctx.globalCompositeOperation='lighter';beam(540,180,Math.PI,1250,520,.10,'255,210,150');ctx.restore();
  const hold=o.hold??1;
  toon({x:420,y:1720,h:1250,jacket:NG.red,hat:'cap',hatCol:'#2c3a4f',beard:'#d9d6cf',browCol:'#d0ccc4',skin:'#d9a27c',tag:'WALT',brow:o.brow||'worried',mouth:'flat',look:o.look||{x:.6,y:.3},
    armR:[lerp(.1,1.15,hold),lerp(.1,.9,hold)],held:(hx,hy,h)=>{ctx.save();ctx.translate(hx+30,hy-40);ctx.rotate(-.12);fillRR(-80,-110,170,210,8,'#efe9db');
      for(let k=0;k<5;k++)line(-55,-60+k*34,60-(k%2)*35,-60+k*34,6,'rgba(40,40,50,.55)');text('RULES',5,-78,'900 26px MS','#1d1f25');ctx.restore();}});}

// ---------- the card, close ----------
const RULES=[["IF YOU SEE A SKIER","AFTER MIDNIGHT,","DON'T STOP."],["ON WIDOW'S RUN,","NEVER UNHOOK","THE WINCH."],["IF THE RADIO SAYS","YOUR NAME,","DON'T ANSWER."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#07080b');glow(300,1650,500,'rgba(255,160,60,1)',.10);glow(900,1600,420,'rgba(80,255,160,1)',.06);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.025+(o.tilt||0));
  ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f1ebdd');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('RULES',-330,-360,'900 92px MS','#1b1d23','left');line(-330,-336,-30,-344,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 44px MS',j===2?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+40,420,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— W.',300,430,'800 40px MS','#3b3d44');
  ctx.restore();}

// ---------- the diagram: the slope, the cable, the anchor ----------
function slopeDiagram(t,o={}){nightSky(1920,{starA:.8});const A={x:960,y:520},B={x:-60,y:1640};const ang=Math.atan2(A.y-B.y,A.x-B.x);
  ctx.fillStyle=vgrad(520,1920,[[0,'#9fb0cc'],[.5,'#5a6c90'],[1,'#22304d']]);ctx.beginPath();ctx.moveTo(B.x,B.y);ctx.lineTo(A.x,A.y);ctx.lineTo(1160,A.y);ctx.lineTo(1160,2000);ctx.lineTo(-80,2000);ctx.fill();
  line(B.x,B.y,A.x,A.y,4,'rgba(255,255,255,.55)');
  // anchor
  line(A.x,A.y,A.x,A.y-150,14,'#0b0d12');fillRR(A.x-40,A.y-12,80,24,6,'#0b0d12');circ(A.x,A.y-156,10,'#ff3b2f');glow(A.x,A.y-156,70,'rgba(255,60,40,1)',.45+.2*Math.sin(t*5));
  // the cat on the slope
  const k=o.cat??.47;const px=lerp(B.x,A.x,k),py=lerp(B.y,A.y,k);
  ctx.save();ctx.translate(px,py);ctx.rotate(ang);const boom=catSide(0,0,.62,0,{lights:1,ret:true});ctx.restore();
  const bx=px+Math.cos(ang)*boom.x-Math.sin(ang)*boom.y,by=py+Math.sin(ang)*boom.x+Math.cos(ang)*boom.y;
  // the cable
  const c=o.cable??1;ctx.strokeStyle='rgba(225,232,245,.95)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(lerp(bx,A.x,c),lerp(by,A.y-150,c));ctx.stroke();
  if(o.pulse){for(let j=0;j<6;j++){const q=fract(t*.6+j/6);circ(lerp(bx,A.x,q),lerp(by,A.y-150,q),7,'#fff',.8*Math.sin(q*Math.PI));}}
  if(o.labels){label('ANCHOR',A.x-60,A.y-230,{font:'800 30px MS',a:o.labels});label('STEEL CABLE · 1 KM+',(bx+A.x)/2-150,(by+A.y-150)/2-40,{font:'800 30px MS',a:o.labels,bg:'rgba(255,201,60,.95)',col:'#14110a'});
    label("WIDOW'S RUN",300,1640,{font:'800 30px MS',a:o.labels});}
  snow(t,5,120,{fall:110,wind:-30,a:.5});}
// the snowcat, side view, facing right. Returns the winch boom tip (local coords * s) when o.ret
function catSide(x,y,s,rot,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);
  if(o.lights){ctx.save();ctx.globalCompositeOperation='lighter';beam(250,-150,Math.PI/2,700,200,.35*o.lights);ctx.restore();}
  fillRR(-330,-110,600,110,55,'#14161b');for(let i=0;i<9;i++)circ(-270+i*66,-55,24,'#24272e');
  fillRR(-300,-260,520,160,26,NG.cat);fillRR(-60,-380,240,150,22,shade(NG.cat,-.08));fillRR(-40,-362,200,104,14,'#22324a');glow(60,-310,120,'rgba(255,220,160,1)',.25);
  poly([270,-200,330,-200,350,-20,300,-20],'#b9bfc9');fillRR(-380,-150,90,60,10,'#2a2d34');
  // winch tower + boom
  line(-200,-260,-180,-420,22,'#2a2d34');line(-180,-420,60,-450,14,'#2a2d34');circ(-190,-330,40,'#3a3e47');circ(-190,-330,18,'#888f9b');
  fillRR(230,-215,26,22,6,'#fff6d8');
  ctx.restore();return o.ret?{x:60*s,y:-450*s}:null;}

// ---------- the winch, close ----------
function winchDrum(t,o={}){const sh=shakeAt(t,o.shake??5,1);ctx.save();ctx.translate(sh.x,sh.y);fillAll('#0b0d11');
  ctx.fillStyle=vgrad(0,1920,[[0,'#10131a'],[1,'#07080b']]);ctx.fillRect(-80,-80,1240,2080);
  for(let i=0;i<6;i++)line(-80,300+i*260,1160,240+i*260,30,'rgba(255,255,255,.02)');
  // beacon
  const bl=.5+.5*Math.sin(t*9);glow(170,330,420,'rgba(255,50,30,1)',.35*bl);circ(170,330,40,'#ff3b2f',.6+.4*bl);
  // drum
  const x0=150,x1=930,y0=520,y1=920,sp=t*(o.spin??3);
  ctx.save();ctx.beginPath();ctx.rect(x0,y0,x1-x0,y1-y0);ctx.clip();ctx.fillStyle=vgrad(y0,y1,[[0,'#3a404c'],[.35,'#8a93a3'],[.6,'#4a515e'],[1,'#1c2027']]);ctx.fillRect(x0,y0,x1-x0,y1-y0);
  for(let i=-30;i<30;i++){const yy=y0+((i*26+sp*140)%(y1-y0+52)+(y1-y0+52))%(y1-y0+52)-26;ctx.strokeStyle='rgba(20,24,30,.55)';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(x0,yy);ctx.lineTo(x1,yy-40);ctx.stroke();
    ctx.strokeStyle='rgba(220,228,240,.25)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x0,yy-6);ctx.lineTo(x1,yy-46);ctx.stroke();}ctx.restore();
  ell(x0,(y0+y1)/2,46,(y1-y0)/2+60,0,'#2a2f38');ell(x1,(y0+y1)/2,46,(y1-y0)/2+60,0,'#2a2f38');ell(x1,(y0+y1)/2,20,60,0,'#5a616e');
  // the cable leaving, tight
  const v=Math.sin(t*80)*2;line(700,y0+10,980+v,-60,9,'#c9d0dc');line(700,y0+10,980+v,-60,3,'#ffffff');
  text('REELING IN',540,1150,'900 96px MS','#ff4d3d');text('NOBODY IS PRESSING IT',540,1225,'800 36px MS','rgba(255,255,255,.6)');
  snow(t,9,160,{fall:-260,wind:-520,a:.6,scale:1.3});ctx.restore();}

// ---------- me and the radio ----------
function meRadio(t,o={}){fillAll('#07090d');ctx.fillStyle=vgrad(0,1920,[[0,'#0c1220'],[1,'#05070a']]);ctx.fillRect(-80,-80,1240,2080);
  // back window: the slope behind, a red jacket in it
  fillRR(120,140,840,520,30,'#101a2e');ctx.save();rr(120,140,840,520,30);ctx.clip();ctx.fillStyle=vgrad(140,660,[[0,'#0a1222'],[1,'#22304f']]);ctx.fillRect(120,140,840,520);
  if(o.back)them(740,640,170,{glint:.6});ctx.restore();
  me({x:540,y:2420,h:2000,brow:o.brow||'worried',mouth:o.mouth||'flat',look:o.look||{x:.8,y:.7},blink:o.blink||0,armR:[.1,.1],armL:[.1,.1]});
  glow(900,1640,800,'rgba(80,255,160,1)',.20*(o.radio??.3));
  // radio in the foreground
  ctx.save();ctx.translate(840,1600);ctx.rotate(-.08);fillRR(-200,-150,400,300,26,'#1b1e26');fillRR(-170,-120,340,130,14,'#0e2a1c');
  if(o.radio>.05)waveform(0,-55,300,100,t,o.radio,'#5cf2a2',13);else text('CH 2 · BASE',0,-40,'800 40px MS','#2f6b4a');
  circ(150,90,14,o.radio>.05?'#5cf2a2':'#1f3a2b');for(let i=0;i<5;i++)line(-150,50+i*16,60,50+i*16,6,'#111318');ctx.restore();}

// ---------- the release lever ----------
function lever(t,o={}){const y=o.y??1560;fillRR(200,y-60,680,380,30,'#15181f');fillRR(220,y-40,640,70,16,'#2a0d0b');text('WINCH RELEASE',540,y+10,'900 46px MS','#ff4d3d');
  fillRR(500,y+220,80,60,10,'#0b0c10');line(540,y+250,520,y+90,34,'#2a2d34');circ(520,y+90,46,'#e0362a');glow(520,y+90,120,'rgba(255,60,40,1)',.25);
  const tr=Math.sin(t*23)*6*(o.shake??1);
  ctx.save();ctx.translate(700+tr-(o.hand??0)*60,y+120-(o.hand??0)*20);ctx.rotate(-.35);fillRR(-60,-50,150,110,40,'#202329');fillRR(60,-30,90,46,22,'#202329');fillRR(-140,-20,100,80,18,NG.red);ctx.restore();}

// ---------- their jackets, then mine ----------
function jackets(t,o={}){fillAll('#05070b');glow(540,1500,1100,`rgba(${NG.lamp},1)`,.22);
  const R=rng(31);for(const[x,h,y]of[[175,1050,1850],[905,1050,1850],[540,1250,2000]]){ell(x,y-h*.5,h*.3,h*.55,0,`rgba(${NG.lamp},1)`,.05);them(x,y,h,{glint:.85});}
  snow(t,13,180,{fall:120,wind:-40,a:.75});}
function myTag(t,o={}){fillAll('#07090d');glow(540,1100,900,`rgba(${NG.lamp},1)`,.14);
  me({x:825,y:2595,h:3000,brow:'scared',mouth:'o',look:{x:-.2,y:1},armR:[.1,.1],armL:[.1,.1]});}
