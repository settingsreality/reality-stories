// ===================== Sailing Stones: places and things (v2) =====================
// Draw in a 1080x1920 world. vl(cam,depth,fn) sets the camera.
const SS={mud:'#b9ae96',mudD:'#6f6756',crack:'rgba(40,34,28,.55)',rock:'#4b4038',rockL:'#7a6a5b',sky0:'#04060d',sky1:'#18213a',red:'#ff4d3d',y:'#ffc93c',grn:'#5cf2a2',ranger:'#56683a'};
const STARS=(()=>{const r=rng(11),a=[];for(let i=0;i<240;i++)a.push([r()*1200-60,r()*1300-60,r()<.12?2.6:1.3,.25+r()*.6]);return a;})();
function sky(y1,o={}){ctx.fillStyle=vgrad(-80,y1,[[0,SS.sky0],[.7,'#0c1326'],[1,SS.sky1]]);ctx.fillRect(-300,-300,1680,y1+310);
  for(const[x,y,r,a]of STARS)if(y<y1-20)circ(x,y,r,'#e8eeff',a*(o.starA??1));
  if(o.moon!==false){circ(o.mx??820,o.my??260,44,'#ece6d6');glow(o.mx??820,o.my??260,260,'rgba(220,225,255,1)',.12);}}
function mountains(y,col='#0a0e1a',seed=3){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-300,y+200);for(let x=-300;x<=1380;x+=40){const h=Math.abs(Math.sin(x*.004+seed))*140+Math.abs(Math.sin(x*.013+seed*2))*60;ctx.lineTo(x,y-h);}ctx.lineTo(1380,y+200);ctx.closePath();ctx.fill();}
// perspective playa from horizon hy down to the bottom; moonlit cracked mud
function playa(hy,o={}){const lit=o.lit??1;ctx.fillStyle=vgrad(hy,2000,[[0,shade(SS.mudD,-.35)],[.35,shade(SS.mud,-.35+.25*lit)],[1,shade(SS.mud,-.15+.1*lit)]]);ctx.fillRect(-300,hy,1680,2300-hy);
  const R=rng(o.seed||5);ctx.strokeStyle=SS.crack;
  for(let row=1;row<34;row++){const z=1/(row*.09+.02);const y=hy+(2000-hy)/(z*0.25+1)*0+ hy*0;}
  for(let i=0;i<34;i++){const d=Math.pow(i/34,1.8),y=hy+8+d*(2100-hy);const cw=40+d*260;ctx.lineWidth=1+d*3;
    for(let x=-300+R()*cw;x<1380;x+=cw*(.8+R()*.5)){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+cw*(.3+R()*.4),y+(R()-.5)*cw*.15);ctx.lineTo(x+cw*(.15+R()*.3),y-cw*(.12+R()*.1)*(.3+d));ctx.stroke();}}
  if(o.vign!==false){const g=ctx.createRadialGradient(540,1400,200,540,1400,1300);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(3,4,10,.65)');ctx.fillStyle=g;ctx.fillRect(-300,hy,1680,2300-hy);}}
// a rock: irregular lump, seed shapes it
function rock(x,y,s,o={}){const R=rng(o.seed||1),n=9,pts=[];for(let i=0;i<n;i++){const a=Math.PI+i/(n-1)*Math.PI;pts.push([Math.cos(a)*(1+R()*.25),Math.sin(a)*(.8+R()*.35)]);}
  ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,4,120,26,0,'rgba(0,0,0,.45)');ctx.fillStyle=o.col||SS.rock;ctx.beginPath();ctx.moveTo(-110,0);pts.forEach(([u,v])=>ctx.lineTo(u*110,v*110));ctx.lineTo(110,0);ctx.closePath();ctx.fill();
  ctx.fillStyle=o.hi||SS.rockL;ctx.globalAlpha=.55;ctx.beginPath();ctx.moveTo(-60,-60);ctx.quadraticCurveTo(10,-115,70,-70);ctx.quadraticCurveTo(10,-85,-60,-60);ctx.fill();ctx.globalAlpha=1;
  if(o.glint){for(const sx of[-1,1])circ(sx*28,-40,7,'#f4f1e8',o.glint);}ctx.restore();}
// a trail (groove) through points [[x,y,w],...]
function trail(pts,a=1){if(pts.length<2||a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.lineCap='round';ctx.lineJoin='round';
  for(const[c,k,dx]of[['rgba(255,248,230,.35)',1.25,-2],['rgba(38,30,24,.75)',1,0]]){ctx.strokeStyle=c;for(let i=1;i<pts.length;i++){ctx.lineWidth=pts[i][2]*k;ctx.beginPath();ctx.moveTo(pts[i-1][0]+dx,pts[i-1][1]+dx);ctx.lineTo(pts[i][0]+dx,pts[i][1]+dx);ctx.stroke();}}ctx.restore();}
// pickup truck, side view facing right; x,y = ground centre; s scale
function truck(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,6,330,30,0,'rgba(0,0,0,.5)');
  const B='#e6e4dc',G=SS.ranger;fillRR(-320,-170,640,110,24,B);fillRR(-60,-300,250,150,30,B);fillRR(-320,-110,640,40,10,G);
  fillRR(-40,-280,100,110,14,o.win||'#1d2a3c');fillRR(75,-280,100,110,14,o.win||'#1d2a3c');if(o.inside)o.inside();
  fillRR(-320,-200,250,40,8,shade(B,-.12));fillRR(300,-160,30,40,8,'#ffeec2');fillRR(-330,-160,24,34,6,o.tail||'#c23a2a');
  for(const wx of[-200,200]){circ(wx,-50,68,'#15171c');circ(wx,-50,32,'#8c8f96');}
  if(o.lights)beam(325,-140,Math.PI/2,1100,240,.32);if(o.tailGlow)glow(-330,-143,140,'rgba(255,60,40,1)',.5*o.tailGlow);ctx.restore();}
// truck rear view (from behind, slightly low)
function truckRear(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,10,360,40,0,'rgba(0,0,0,.5)');
  fillRR(-320,-330,640,260,26,'#e6e4dc');fillRR(-200,-470,400,160,30,'#d9d7cf');fillRR(-170,-450,340,110,16,'#1d2a3c');if(o.inside)o.inside();
  fillRR(-330,-120,660,60,12,'#8c8f96');fillRR(-300,-300,70,60,10,'#c23a2a');fillRR(230,-300,70,60,10,'#c23a2a');glow(-265,-270,160,'rgba(255,60,40,1)',.45);glow(265,-270,160,'rgba(255,60,40,1)',.45);
  fillRR(-90,-230,180,50,6,'#f2efe4');text('RANGER',0,-204,'900 30px MS',SS.ranger);
  for(const wx of[-260,260])fillRR(wx-70,-100,140,110,24,'#15171c');ctx.restore();}
function me(o){toon(Object.assign({jacket:SS.ranger,hat:'beanie',hatCol:'#f0683f',tag:'NIGHT\nRANGER',skin:'#e9b896',browCol:'#4a2e1f',stripe:false},o));}
// stone legs: grey overlay from the feet up to fraction k of height
function stoneLegs(x,y,h,k){if(k<=0)return;ctx.save();ctx.beginPath();ctx.rect(x-h*.3,y-h*k,h*.6,h*k+h*.06);ctx.clip();ctx.globalAlpha=.85;
  for(const s of[-1,1]){line(x+s*.07*h,y-.36*h,x+s*.075*h,y-.03*h,.11*h,SS.rock);ell(x+s*.08*h,y-.02*h,.095*h,.045*h,0,SS.rock);}fillRR(x-.2*h,y-.66*h,.4*h,.36*h,.1*h,SS.rock);
  for(let i=0;i<8;i++)line(x-.15*h+hash(i)*.3*h,y-hash(i+3)*h*k,x-.15*h+hash(i)*.3*h+12,y-hash(i+3)*h*k+30,3,'rgba(20,16,12,.6)');ctx.restore();}
const RULES=[["COUNT THE STONES","AT SUNDOWN, AND","AGAIN AT SUNRISE."],["NEVER FALL","ASLEEP ON","THE PLAYA."],["IF ONE MOVES WITH","NO ICE, NEVER STAND","IN ITS TRAIL."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#07080b');glow(300,1650,500,'rgba(255,160,60,1)',.10);glow(900,1600,420,'rgba(80,255,160,1)',.06);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.025+(o.tilt||0));
  ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f1ebdd');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('RULES',-330,-360,'900 92px MS','#1b1d23','left');line(-330,-336,-30,-344,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 44px MS',j===2?'#a3261b':'#1b1d23','left'));ctx.restore();}
  text('— DOT',290,430,'800 40px MS','#3b3d44');ctx.restore();}
// GPS tablet with the playa map; stones = dots with trails. o.turn 0..1 rotates every trail toward the truck; o.extra = show stone 163
const MAPST=(()=>{const R=rng(21),a=[];for(let i=0;i<46;i++){a.push({x:150+R()*780,y:420+R()*1000,ang:-.6+R()*.5+Math.PI*1.25,L:60+R()*130});}return a;})();
function tablet(t,o={}){fillAll('#06070b');glow(540,960,900,'rgba(80,140,255,1)',.08);fillRR(70,250,940,1400,50,'#15171d');fillRR(100,290,880,1320,30,'#0f1d18');
  ctx.save();rr(100,290,880,1320,30);ctx.clip();for(let i=0;i<12;i++){line(100,290+i*120,980,290+i*120,2,'rgba(92,242,162,.08)');line(100+i*80,290,100+i*80,1610,2,'rgba(92,242,162,.08)');}
  ell(540,950,400,560,0,'rgba(185,174,150,.12)');const TX=540,TY=1480;
  for(const s of MAPST){const tgt=Math.atan2(TY-s.y,TX-s.x)+Math.PI;const a=lerp(s.ang,tgt,ss(o.turn||0));const ex=s.x+Math.cos(a)*s.L,ey=s.y+Math.sin(a)*s.L;
    line(s.x,s.y,ex,ey,4,'rgba(92,242,162,.45)');circ(s.x,s.y,9,'#5cf2a2');}
  if(o.extra>0){const a=o.extra;line(300,760,230,640,5,`rgba(255,77,61,${a})`);circ(300,760,14,SS.red,a);circ(300,760,30+10*Math.sin(t*6),SS.red,.25*a);circ(230,640,10,'#e9e2cf',a);}
  fillRR(TX-26,TY-14,52,28,6,'#e6e4dc');if(o.turn>0)circ(TX,TY,60+12*Math.sin(t*5),SS.red,.25*o.turn);ctx.restore();
  fillRR(100,290,880,90,0,'rgba(5,10,8,.8)');text('STONE TRACKER',140,338,'900 38px MS','#5cf2a2','left');text(o.time||'2:04 AM',940,338,'800 34px MS','#9fb8aa','right');}
// a sleeping bag, empty, unzipped, on the mud
function sleepingBag(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ell(0,10,240,50,0,'rgba(0,0,0,.4)');fillRR(-230,-60,460,110,50,'#2f5f8f');fillRR(-230,-60,200,110,50,'#264f78');
  ctx.fillStyle='#1a3550';ctx.beginPath();ctx.ellipse(-30,-5,190,40,0,0,7);ctx.fill();line(-210,-30,200,-30,4,'#9db6cc');fillRR(180,-70,90,80,30,'#2f5f8f');ctx.restore();}
// my radio, with Dot on it
function meRadio(t,o={}){fillAll('#07090d');ctx.fillStyle=vgrad(0,1920,[[0,'#0c1220'],[1,'#05070a']]);ctx.fillRect(-80,-80,1240,2080);
  fillRR(120,140,840,520,30,'#101a2e');ctx.save();rr(120,140,840,520,30);ctx.clip();sky(660,{moon:false});playa(520,{lit:.6,vign:false});if(o.back)o.back();ctx.restore();
  me({x:540,y:2420,h:2000,brow:o.brow||'scared',mouth:o.mouth||'o',look:o.look||{x:.8,y:.7},armR:[.1,.1],armL:[.1,.1]});
  glow(840,1600,800,'rgba(80,255,160,1)',.20*(o.radio??.3));
  ctx.save();ctx.translate(840,1600);ctx.rotate(-.08);fillRR(-200,-150,400,300,26,'#1b1e26');fillRR(-170,-120,340,130,14,'#0e2a1c');
  if(o.radio>.05)waveform(0,-55,300,100,t,o.radio,'#5cf2a2',13);else text('CH 1 · DOT',0,-40,'800 40px MS','#2f6b4a');
  circ(150,90,14,o.radio>.05?'#5cf2a2':'#1f3a2b');for(let i=0;i<5;i++)line(-150,50+i*16,60,50+i*16,6,'#111318');ctx.restore();}
// a pair of headlights far away on the playa
function farLights(x,y,a){if(a<=0)return;for(const s of[-1,1]){glow(x+s*22,y,90,'rgba(255,240,200,1)',.5*a);circ(x+s*22,y,7,'#fff8e0',a);}ctx.save();ctx.globalAlpha=.25*a;ctx.fillStyle='rgba(255,240,200,.5)';ctx.beginPath();ctx.moveTo(x-30,y);ctx.lineTo(x-260,y+260);ctx.lineTo(x+260,y+260);ctx.lineTo(x+30,y);ctx.fill();ctx.restore();}
function T2(s,x,y,size,col='#e9edf5',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){if((o.a??1)<=0)return;label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||'#e9edf5'},o));}
function popT(s,x,y,size,col,t,t0,o={}){const q=ss(seg(t,t0,t0+.25));if(q<=0)return;ctx.save();ctx.translate(x,y);const k=1.4-.4*q;ctx.scale(k,k);T2(s,0,0,size,col,{w:900,stroke:12,a:q*(o.a??1)});ctx.restore();}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
