// ===================== Second Moon: places and things (v2, 1080x1920) =====================
const SM={sky0:'#04050f',sky1:'#0c1236',sky2:'#1a1f52',lit:'#e6fbff',litD:'#7fdcf2',glow:'120,230,255',rock:'#1a1e2b',wall:'#161c30',wallD:'#0d1120',steel:'#8d97ad',red:'#ff4d3d',led:'#5cf2a2',amber:'#ffb14a'};
const STARS=(()=>{const r=rng(23),a=[];for(let i=0;i<300;i++)a.push([r()*1300-110,r()*1500-100,r()<.08?3:1.5,.25+r()*.6]);return a;})();
function T2(s,x,y,size,col='#fff',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function nightSky(t,hz=1500){ctx.fillStyle=vgrad(-100,hz,[[0,SM.sky0],[.65,SM.sky1],[1,SM.sky2]]);ctx.fillRect(-200,-200,1480,hz+220);
  for(const[x,y,r,a]of STARS)if(y<hz-20)circ(x,y,r,'#eef3ff',a*(.75+.25*Math.sin(t*2+x)));}
const lumpy=(r,x=0,y=0)=>{ctx.beginPath();for(let i=0;i<=56;i++){const a=i/56*6.2832,b=r*(1+.035*Math.sin(a*3+1)+.022*Math.sin(a*7+2)+.012*Math.sin(a*13));const px=x+Math.cos(a)*b,py=y+Math.sin(a)*b;i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.closePath();};
const CRAT=(()=>{const r=rng(9),a=[];for(let i=0;i<20;i++){const q=r()*6.28,d=Math.sqrt(r())*.86;a.push([Math.cos(q)*d,Math.sin(q)*d,.05+r()*.13]);}return a;})();
// the wrong moon. dir = angle the lit side points (0 = right, PI = left); turn 0..1 = crescent..full face
function moon2(x,y,r,t,o={}){const dir=o.dir??Math.PI*.8,turn=o.turn??.22,lit=o.lit??SM.lit,hal=o.halo??1;ctx.save();ctx.translate(x,y);
  if(hal>0){ctx.save();ctx.globalCompositeOperation='lighter';const c=o.normal?'rgba(255,245,215,1)':`rgba(${SM.glow},1)`;
    const lx=Math.cos(dir)*r*.5*(1-turn),ly=Math.sin(dir)*r*.5*(1-turn);glow(lx,ly,r*2.6,c,.28*hal*(.85+.15*Math.sin(t*2.3)));glow(lx,ly,r*1.5,c,.34*hal);ctx.restore();}
  ctx.save();lumpy(r);ctx.clip();ctx.fillStyle=SM.rock;ctx.fillRect(-r*1.2,-r*1.2,r*2.4,r*2.4);
  for(const[cx,cy,cr]of CRAT){circ(cx*r,cy*r,cr*r,'#10131c');circ(cx*r-cr*r*.15,cy*r-cr*r*.15,cr*r*.8,'#232838',.6);}
  ctx.save();ctx.rotate(dir);const e=r*1.1*Math.cos(Math.PI*clamp(turn));ctx.beginPath();ctx.arc(0,0,r*1.15,-Math.PI/2,Math.PI/2);for(let i=0;i<=30;i++){const th=Math.PI/2-i/30*Math.PI;ctx.lineTo(e*Math.cos(th),r*1.15*Math.sin(th));}ctx.closePath();ctx.clip();ctx.rotate(-dir);
  const g=ctx.createRadialGradient(Math.cos(dir)*r*.4,Math.sin(dir)*r*.4,r*.1,0,0,r*1.15);g.addColorStop(0,o.normal?'#fff6df':'#ffffff');g.addColorStop(.6,lit);g.addColorStop(1,o.normal?'#cbb98f':SM.litD);ctx.fillStyle=g;ctx.fillRect(-r*1.2,-r*1.2,r*2.4,r*2.4);
  for(const[cx,cy,cr]of CRAT){circ(cx*r,cy*r,cr*r,o.normal?'#c2b48f':'#9fe6f3',.75);circ(cx*r+cr*r*.14,cy*r+cr*r*.14,cr*r*.72,o.normal?'#e8dcb9':'#d3f6fb',.9);}
  ctx.restore();ctx.restore();ctx.restore();}
function house(x,y,w,h,col,lit){fillRR(x,y-h,w,h,4,col);poly([x-14,y-h,x+w/2,y-h-w*.5,x+w+14,y-h],shade(col,-.2));if(lit){fillRR(x+w*.2,y-h*.7,w*.22,h*.3,3,'#ffd88a');fillRR(x+w*.58,y-h*.7,w*.22,h*.3,3,'#ffd88a');}}
// a little hilltop observatory dome
function domeOut(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-190,-150,380,170,8,'#5b6680');fillRR(-190,-150,380,18,6,'#74809b');
  ctx.fillStyle='#b9c3d6';ctx.beginPath();ctx.arc(0,-150,190,Math.PI,0);ctx.closePath();ctx.fill();ctx.fillStyle='#8f9ab1';ctx.beginPath();ctx.arc(0,-150,190,-Math.PI/2,0);ctx.closePath();ctx.fill();
  fillRR(-46,-330,92,180,8,'#10162a');fillRR(-30,-70,60,90,4,'#1b2233');glow(-120,-70,70,'rgba(255,210,130,1)',.4);fillRR(-140,-92,40,44,4,'#ffd88a');ctx.restore();}
// the town on the hill, seen from outside. o.beamA = how bright the moonbeam on the town is
function townHill(t,o={}){const hz=o.hz??1450;nightSky(t,hz);
  if(o.moon)o.moon();
  ctx.fillStyle=vgrad(hz-250,1980,[[0,'#121838'],[1,'#080a18']]);ctx.beginPath();ctx.moveTo(-100,1980);ctx.lineTo(-100,hz-40);ctx.quadraticCurveTo(300,hz-280,620,hz-120);ctx.quadraticCurveTo(900,hz,1180,hz-90);ctx.lineTo(1180,1980);ctx.closePath();ctx.fill();
  if(!o.noDome)domeOut(290,hz-175,.8);
  const H=[[560,1,90,70,'#262d4a'],[670,.95,110,84,'#2c3352'],[800,.92,86,62,'#232a46'],[900,.88,120,90,'#2a3150'],[1000,.9,90,70,'#242b48'],[-40,1.1,120,86,'#262d4a']];
  H.forEach(([x,k,w,h,c],i)=>house(x,hz+40+i*24-(i===5?0:0),w,h,c,i%2===0||o.allLit));
  if(o.beam){ctx.save();ctx.globalCompositeOperation='lighter';beam(o.bx??780,hz+120,o.ba??-.03,1100,360,.5*o.beam,SM.glow);ctx.restore();glow(790,hz+60,500,`rgba(${SM.glow},1)`,.3*o.beam);}
  if(o.fig)o.fig();}
function me(o){toon(Object.assign({jacket:'#3d5a4a',hat:'beanie',hatCol:'#f0683f',tag:'NIGHT\nOBSERVER',skin:'#e9b896',browCol:'#4a2e1f',pants:'#232634'},o));}
function ruth(o){toon(Object.assign({jacket:'#6a4a7a',hat:'helm',hatCol:'#d7d2c8',tag:'RUTH\nDIRECTOR',skin:'#e0b393',browCol:'#a8a39a',pants:'#2a2433'},o));}
// inside the dome. open 0..1 = shutter slot, a = telescope angle (radians up from horizontal), mx/my/mr/mo = moon in the slot
function domeRoom(t,o={}){fillAll('#090c16');const cx=540,cy=880,R=760,open=o.open??.0,top=cy-R;
  // the dome shell + ribs
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,Math.PI,0);ctx.lineTo(cx+R,1500);ctx.lineTo(cx-R,1500);ctx.closePath();ctx.fillStyle=vgrad(top,1500,[[0,SM.wall],[1,SM.wallD]]);ctx.fill();ctx.clip();
  for(let i=-4;i<=4;i++){const k=i/4.6;ctx.strokeStyle='rgba(180,195,230,.1)';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(cx,cy,Math.abs(k)*R,R,0,Math.PI,0);ctx.stroke();}
  for(const y of[420,720,1020,1280]){line(-100,y,1180,y,6,'rgba(180,195,230,.07)');}
  // the slot: sky seen through it
  const sw=360,sh=lerp(0,980,open),sx=cx-sw/2+40,sy=top-40;
  if(open>0){ctx.save();rr(sx,sy,sw,sh,14);ctx.clip();nightSky(t,1500);if(o.mr)moon2(o.mx??sx+sw/2,o.my??420,o.mr,t,Object.assign({dir:-.6},o.moon||{}));ctx.restore();
    ctx.strokeStyle='#333c58';ctx.lineWidth=16;rr(sx,sy,sw,sh,14);ctx.stroke();
    if(o.shaft>0){ctx.save();ctx.globalCompositeOperation='lighter';beam(sx+sw/2,sy+sh+560,0,700,sw*.75,.3*o.shaft,SM.glow);ctx.restore();}}
  fillRR(sx-12,sy+sh,sw+24,44,10,'#465070');
  ctx.restore();
  // floor + wall ring
  ctx.fillStyle=vgrad(1500,1980,[[0,'#1a2036'],[1,'#0b0e1a']]);ctx.fillRect(-200,1500,1480,560);fillRR(-200,1490,1480,20,0,'#2b3350');
  // pier
  fillRR(490,1220,140,320,12,'#3a4460');fillRR(460,1520,200,40,10,'#2a3350');
  // telescope
  scope(590,1160,o.a??.45,t,o);
  // control box with a big button
  fillRR(810,1100,190,330,14,'#222a42');fillRR(825,1120,160,110,8,'#0a1012');T2(o.pct||'CLOSED',905,1175,o.pct?40:30,o.pctRed?SM.red:SM.led,{f:'PM',w:500});
  circ(905,1320,58,'#5a1712');circ(905,1312,54,o.btn?'#ff5a45':'#c8322a');T2('DOME',905,1400,30,'#b9c3d6',{w:800});}
function scope(px,py,a,t,o={}){ctx.save();ctx.translate(px,py);ctx.rotate(-a);
  fillRR(-250,-72,780,144,20,'#e4e7ee');fillRR(-250,-72,780,40,18,'#ffffff');fillRR(470,-86,80,172,12,'#2b3350');fillRR(-90,-84,60,168,6,'#2b3350');fillRR(250,-84,40,168,6,'#2b3350');
  fillRR(-330,-44,90,88,8,'#2b3350');fillRR(-370,-24,50,48,6,'#14192a');
  // the rules note taped near the eyepiece
  if(o.note!==false){ctx.save();ctx.translate(-140,8);ctx.rotate(.12);fillRR(-48,-52,96,104,4,'#f1ebdd');for(let q=0;q<5;q++)line(-34,-32+q*16,34-(q%2)*18,-32+q*16,4,'rgba(40,40,50,.55)');ctx.restore();}
  ctx.restore();circ(px,py,46,'#2b3350');circ(px,py,22,'#14192a');}
function eyepiecePt(px,py,a){return[px-Math.cos(a)*372,py+Math.sin(a)*372];}
// rules card
const RULES=[["TRACK IT","BY NAKED EYE","ONLY."],["NEVER POINT","THE TELESCOPE","AT IT."],["IF THE BRIGHT SIDE","TURNS TO YOU,","CLOSE THE DOME."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#07090f');glow(300,1650,500,`rgba(${SM.glow},1)`,.1);glow(900,1600,420,'rgba(255,90,60,1)',.05);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.02);ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f1ebdd');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('MOON RULES',-330,-360,'900 76px MS','#1b1d23','left');line(-330,-330,130,-338,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;
    ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*56,'800 42px MS',j===2?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+40,420,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— RUTH',270,430,'800 40px MS','#3b3d44');
  if(o.q>0){ctx.save();ctx.globalAlpha=o.q;ctx.translate(230,430);ctx.rotate(.12);ctx.strokeStyle='#e0362a';ctx.lineWidth=8;ctx.beginPath();ctx.ellipse(40,-10,130,56,0,0,7);ctx.stroke();text('?',205,-10,'900 120px MS','#e0362a');ctx.restore();}
  ctx.restore();}
// the observatories log
function logScreen(t,o={}){fillAll('#050a08');ctx.save();ctx.globalAlpha=.08;for(let y=0;y<1920;y+=6)line(-80,y,1160,y,2,SM.led);ctx.restore();
  T2('MOON WATCH · NIGHTLY LOG',80,290,44,SM.led,{align:'left',f:'PM',w:500});line(80,330,1000,330,3,'rgba(92,242,162,.4)');
  const L=['CHILE','HAWAII','CANARY IS.','NAMIBIA','AUSTRALIA'];L.forEach((nm,j)=>{const y=450+j*150,a=o.rows?o.rows[j]:1;if(a<=0)return;const dead=o.dead?o.dead[j]:0;ctx.save();ctx.globalAlpha=a;
    if(dead){fillRR(50,y-60,980,120,12,'rgba(255,60,50,.16)');ctx.strokeStyle=SM.red;ctx.lineWidth=4;rr(50,y-60,980,120,12);ctx.stroke();}
    T2(nm,80,y,48,dead?SM.red:'#e9f6ef',{align:'left',w:900});T2(dead?'NO SIGNAL':'TELESCOPE ON',1000,y,38,dead?SM.red:SM.led,{align:'right',f:'PM',w:500});ctx.restore();});}
// the eye at the other end of the telescope
function eyeView(t,k,p){fillAll('#02030a');const cx=540,cy=880,R=lerp(380,460,k);ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.clip();
  moon2(cx,cy,R*1.25,t,{dir:0,turn:1,halo:0});
  // iris rings etched into the moon's surface, a pupil opening
  ctx.save();ctx.translate(cx,cy);for(let i=0;i<44;i++){const a=i/44*6.283+Math.sin(t*.4)*.04;const r0=R*.2,r1=R*(.74+.1*hash(i));line(Math.cos(a)*r0,Math.sin(a)*r0,Math.cos(a)*r1,Math.sin(a)*r1,7,`rgba(30,120,150,${.3+.3*hash(i+9)})`);}
  ctx.strokeStyle='rgba(16,70,100,.75)';ctx.lineWidth=20;ctx.beginPath();ctx.arc(0,0,R*.8,0,7);ctx.stroke();
  const pr=R*lerp(.08,.34,p);circ(0,0,pr*1.15,'rgba(4,8,20,.5)');circ(0,0,pr,'#03050c');circ(-pr*.34,-pr*.34,pr*.2,'#fff',.85);ctx.restore();ctx.restore();
  ctx.strokeStyle='#1b2030';ctx.lineWidth=46;ctx.beginPath();ctx.arc(cx,cy,R+23,0,7);ctx.stroke();glow(cx,cy,R*1.9,`rgba(${SM.glow},1)`,.2);}
