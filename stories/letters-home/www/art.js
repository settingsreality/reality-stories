// ===================== Letters Home: places and things (v2) =====================
const L={sea0:'#0a1626',sea1:'#12243a',sky0:'#05080f',sky1:'#16223a',red:'#ff4d3d',y:'#ffc93c',grn:'#5cf2a2',ghost:'#ff6a4d',paper:'#e9dfc6',coat:'#2b3a55'};
function me(o){toon(Object.assign({jacket:L.coat,hat:'beanie',hatCol:'#f0683f',tag:'3RD\nOFFICER',skin:'#e9b896',browCol:'#4a2e1f',stripe:false},o));}
function nkosi(o){toon(Object.assign({jacket:'#e2a53a',hat:'cap',hatCol:'#26303f',tag:'BOSUN\nNKOSI',skin:'#7a4a30',browCol:'#1a0f0a',stripe:true},o));}
function T2(s,x,y,size,col='#e9edf5',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){if((o.a??1)<=0)return;label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||'#e9edf5'},o));}
function popT(s,x,y,size,col,t,t0,o={}){const q=ss(seg(t,t0,t0+.25));if(q<=0)return;ctx.save();ctx.translate(x,y);const k=1.4-.4*q;ctx.scale(k,k);T2(s,0,0,size,col,{w:900,stroke:12,a:q*(o.a??1)});ctx.restore();}
function stormSky(y1,t,o={}){ctx.fillStyle=vgrad(-300,y1,[[0,L.sky0],[1,L.sky1]]);ctx.fillRect(-300,-300,1680,y1+310);
  const R=rng(4);for(let i=0;i<9;i++){const x=((R()*1600+t*(20+R()*30))%1800)-400,y=R()*y1*.8;ell(x,y,260+R()*200,60+R()*40,0,'rgba(40,52,78,.55)');}
  if(o.flash){ctx.save();ctx.globalAlpha=o.flash;ctx.fillStyle='#b8c6ff';ctx.fillRect(-300,-300,1680,y1+310);ctx.restore();}}
function sea(y0,t,o={}){ctx.fillStyle=vgrad(y0,2200,[[0,L.sea1],[1,L.sea0]]);ctx.fillRect(-300,y0,1680,2400);
  for(let r=0;r<16;r++){const d=Math.pow(r/16,1.6),y=y0+10+d*(2000-y0),A=6+d*40,wl=120+d*300;ctx.strokeStyle=`rgba(160,200,230,${.10+.15*d})`;ctx.lineWidth=2+d*4;ctx.beginPath();
    for(let x=-300;x<=1380;x+=20){const yy=y+Math.sin(x/wl*6.28+t*(1.2+r*.1)+r)*A;x===-300?ctx.moveTo(x,yy):ctx.lineTo(x,yy);}ctx.stroke();}}
// the ghost ship: old three-master, torn sails, red glow; x,y = waterline centre; s = scale
function ghostShip(x,y,s,t,o={}){ctx.save();ctx.translate(x,y+Math.sin(t*1.3)*6*s);ctx.rotate(Math.sin(t*.9)*.03);ctx.scale(s,s);ctx.globalAlpha=o.a??1;
  glow(0,-260,700,'rgba(255,90,60,1)',.28*(o.glowK??1));const H='#1a0d0d',S='rgba(255,140,110,.30)',SL='rgba(255,170,140,.6)';
  ctx.fillStyle=H;ctx.beginPath();ctx.moveTo(-430,-80);ctx.lineTo(430,-110);ctx.lineTo(360,40);ctx.lineTo(-330,40);ctx.closePath();ctx.fill();
  fillRR(-470,-170,150,100,10,H);fillRR(300,-150,110,60,8,H);line(430,-110,600,-210,10,H);
  for(const[mx,mh]of[[-220,560],[30,680],[260,520]]){line(mx,-90,mx,-90-mh,14,H);line(mx-120,-90-mh*.75,mx+120,-90-mh*.75,8,H);line(mx-100,-90-mh*.45,mx+100,-90-mh*.45,8,H);
    for(const[a,b,w]of[[.75,.47,120],[.45,.15,100]]){ctx.fillStyle=S;ctx.beginPath();ctx.moveTo(mx-w,-90-mh*a);ctx.lineTo(mx+w,-90-mh*a);ctx.quadraticCurveTo(mx+w*1.1,-90-mh*(a+b)/2,mx+w*.8,-90-mh*b);
      for(let k=0;k<6;k++)ctx.lineTo(mx+w*.8-k*w*.32,-90-mh*b-(k%2?30:0));ctx.closePath();ctx.fill();ctx.strokeStyle=SL;ctx.lineWidth=3;ctx.stroke();}}
  for(let i=0;i<5;i++)circ(-300+i*130,-60,10,'#ffb08f',.6+.4*Math.sin(t*3+i));ctx.restore();}
// container ship side view, bridge at the back (left); x,y = waterline centre
function cargoShip(x,y,s,t,o={}){ctx.save();ctx.translate(x,y+Math.sin(t*1.1)*4*s);ctx.scale(s,s);
  ctx.fillStyle='#262b33';ctx.beginPath();ctx.moveTo(-620,-120);ctx.lineTo(640,-120);ctx.lineTo(560,40);ctx.lineTo(-600,40);ctx.closePath();ctx.fill();fillRR(-620,-30,1240,30,0,'#7a2420');
  const C=['#a33a2d','#2f6aa3','#c99a2e','#3c7a4a','#7a7f88'];const R=rng(3);for(let c=0;c<12;c++)for(let r=0;r<3;r++)fillRR(-380+c*80,-180-r*55,74,50,3,C[Math.floor(R()*5)]);
  fillRR(-600,-360,170,240,8,'#d9d6cc');for(let r=0;r<4;r++)fillRR(-590,-350+r*55,150,26,3,r===0?'#ffd98a':'#2a3548');line(-520,-360,-520,-440,8,'#9aa0aa');
  circ(-520,-445,9,L.red,.6+.4*Math.sin(t*4));glow(-520,-445,60,'rgba(255,77,61,1)',.4);circ(620,-130,8,L.grn);ctx.restore();}
// the bridge interior with the screen; o.screen(fn) draws onto the screen in its own coords (0..800 x 0..560)
function bridge(t,o={}){fillAll('#070a12');
  fillRR(-100,120,1280,700,0,'#0d1424');ctx.save();rr(-100,120,1280,700,0);ctx.clip();stormSky(560,t,{flash:o.flash});sea(560,t);if(o.out)o.out();ctx.restore();
  for(const x of[-100,330,760,1180])fillRR(x-20,100,40,740,6,'#151a24');fillRR(-200,80,1480,60,0,'#151a24');
  fillRR(-200,820,1480,1300,0,'#121826');fillRR(-200,820,1480,40,0,'#1d2433');
  if(o.me)o.me();
  // console + screen
  fillRR(90,1180,900,800,30,'#1a202c');fillRR(130,1220,820,580,20,'#05090f');ctx.save();rr(140,1230,800,560,16);ctx.clip();ctx.translate(140,1230);if(o.screen)o.screen();ctx.restore();
  glow(540,1500,600,'rgba(92,242,162,1)',.08);}
// AIS/radar screen: own ship centre; contacts; o.ghost = {x,y,a}
function aisScreen(t,o={}){ctx.fillStyle='#04120c';ctx.fillRect(0,0,800,560);for(let i=1;i<5;i++){ctx.strokeStyle='rgba(92,242,162,.18)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(400,300,i*60,0,7);ctx.stroke();}
  const sw=(t*1.2)%6.283;ctx.save();ctx.globalAlpha=.25;ctx.fillStyle='#5cf2a2';ctx.beginPath();ctx.moveTo(400,300);ctx.arc(400,300,260,sw-.4,sw);ctx.fill();ctx.restore();
  poly([[400,282],[412,312],[388,312]],'#5cf2a2');
  (o.ships||[[180,140,'MSC ANNA'],[640,420,'CAPE ROSE'],[600,120,'TRITON V']]).forEach(([x,y,n])=>{poly([[x,y-12],[x+10,y+10],[x-10,y+10]],'#9fe8c4');T2(n,x+18,y,20,'#9fe8c4',{w:800,align:'left'});});
  const g=o.ghost;if(g&&g.a>0){ctx.save();ctx.globalAlpha=g.a;circ(g.x,g.y,26+8*Math.sin(t*6),L.red,.3);poly([[g.x,g.y-16],[g.x+13,g.y+13],[g.x-13,g.y+13]],L.red);T2(g.label||'NO NAME',g.x+24,g.y-2,24,L.red,{w:900,align:'left'});ctx.restore();}
  T2('AIS · '+(o.time||'04:00'),20,30,22,'#5cf2a2',{w:800,align:'left'});
  if(o.wind){arrow(700,520,620,470,6,'#9fe8c4',1,16);T2('WIND',700,540,18,'#9fe8c4',{w:800});}}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
// an envelope; o.to, o.from, o.stamp, o.hand (handwriting font)
function envelope(x,y,s,rot,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);ctx.fillStyle='rgba(0,0,0,.35)';rr(-205,-125,420,260,10);ctx.fill();
  fillRR(-210,-130,420,260,8,o.wet?'#cfc3a6':L.paper);ctx.strokeStyle='rgba(120,100,70,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-210,-130);ctx.lineTo(0,10);ctx.lineTo(210,-130);ctx.stroke();
  if(o.wet){ell(-80,40,90,50,.3,'rgba(90,80,60,.25)');ell(120,-60,60,40,0,'rgba(90,80,60,.2)');}
  if(o.to)o.to.forEach((l,j)=>T2(l,-150,10+j*44,o.big?34:30,'#2a2418',{w:700,f:'PM',align:'left'}));
  if(o.stamp){ctx.save();ctx.translate(130,-75);ctx.rotate(-.2);ctx.strokeStyle=L.red;ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,58,0,7);ctx.stroke();T2(o.stamp[0],0,-14,18,L.red,{w:900});T2(o.stamp[1],0,14,20,L.red,{w:900});ctx.restore();}
  if(o.seal){circ(0,10,28,'#8a1f1a');circ(0,10,18,'#a8302a');}
  ctx.restore();}
const RULES=[["EVERY SHIP ON THE","SCREEN MUST HAVE","A NAME."],["NEVER ANSWER A","SHIP THAT SAILS","AGAINST THE WIND."],["IF SOMEONE HANDS YOU","LETTERS, NEVER READ","WHO THEY'RE FOR."]];
function rulesCard(t,o={}){const cy=o.cy??780,s=o.s??1;fillAll('#120c08');glow(540,800,800,'rgba(255,190,110,1)',.14);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.02+(o.tilt||0));
  ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();fillRR(-420,-490,840,980,12,'#3a2a1c');fillRR(-400,-470,800,940,8,'#efe6cf');
  for(let k=0;k<17;k++)line(-370,-330+k*48,370,-330+k*48,2,'rgba(120,90,60,.18)');line(-300,-470,-300,470,3,'rgba(190,60,50,.35)');
  text('SHIP\'S LOG',-270,-380,'700 34px PM','#5a4a36','left');text('RULES',-270,-310,'900 84px MS','#1b1d23','left');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-200+r*220;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),210);ctx.clip();
    text(`${r+1}.`,-270,y0,'900 48px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-200,y0+j*54,'800 40px MS',j===2?'#a3261b':'#1b1d23','left'));ctx.restore();}
  text('— NKOSI',250,420,'800 38px MS','#3b3d44');ctx.restore();}
// a ghost crewman reaching out a bundle of letters
function ghostHand(x,y,s,a){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.globalAlpha=a;glow(0,0,260,'rgba(255,120,90,1)',.3);
  line(-300,120,-20,10,60,'rgba(255,150,120,.55)');for(let i=0;i<4;i++)envelope(40+i*8,-10-i*10,.32,-.15+i*.08,{});ctx.restore();}
