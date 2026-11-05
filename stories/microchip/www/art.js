// ===================== Microchip: places and things (v2, 1080x1920) =====================
const MC={wall:'#4d5aa6',wallD:'#2c3470',floor:'#39405e',steel:'#c5ced9',steelD:'#7d8798',cream:'#f5ecd4',lamp:'255,226,170',red:'#ff4d3d',led:'#5cf2a2',amber:'#ffc93c',white:'#f4fbff',cat:'#8b929e',catD:'#5f6673',night:'#1b2348',porch:'#3a3f66'};
function T2(s,x,y,size,col='#fff',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function me(o){toon(Object.assign({jacket:'#2f8f6b',hat:'beanie',hatCol:'#f0683f',tag:null,skin:'#e9b896',browCol:'#4a2e1f',pants:'#232634',stripe:false},o));}
function vet(o){const h0=o.h,x0=o.x,y0=o.y+(o.bob||0);circ(x0,y0-.985*h0,.06*h0,'#22130c');circ(x0,y0-.82*h0,.195*h0,'#22130c');toon(Object.assign({jacket:'#e6edf2',hat:null,tag:'DR. ROSE',skin:'#a9744f',browCol:'#24140c',pants:'#3f6f9a',boots:'#e6edf2',glove:'#8fd0e8',stripe:false},o));
  // hair
  ctx.save();ctx.fillStyle='#22130c';ctx.beginPath();ctx.arc(x0,y0-.83*h0,.176*h0,Math.PI+.62,Math.PI*2-.62);ctx.closePath();ctx.fill();ctx.restore();}
// THE CAT: sitting, front view, gray, one torn ear. o:{eyes:'wide'|'slit'|'calm', paw:0..1 raised right paw, look, glow}
function cat(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const C=MC.cat,D=MC.catD;
  // tail
  ctx.strokeStyle=D;ctx.lineWidth=34;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(90,-20);ctx.quadraticCurveTo(210,-30,190,-140+Math.sin((o.t||0)*2)*16);ctx.stroke();
  // body + chest
  ctx.fillStyle=C;ctx.beginPath();ctx.moveTo(-115,0);ctx.quadraticCurveTo(-130,-190,-62,-262);ctx.lineTo(62,-262);ctx.quadraticCurveTo(130,-190,115,0);ctx.closePath();ctx.fill();
  ell(0,-130,56,90,0,'#c4c9d2');
  for(const s2 of[-1,1]){for(let i=0;i<3;i++)line(s2*(78-i*3),-190+i*44,s2*(112-i*2),-176+i*44,10,D);}
  // front legs
  const py=o.paw?lerp(0,-250,o.paw):0;fillRR(-62,-120,46,120,22,C);ell(-40,-6,34,18,0,'#d5d9e0');
  fillRR(16,-120+py,46,120,22,C);ell(38,-6+py,34,18,0,'#d5d9e0');
  // head
  const hy=-310;poly([-112,hy-20,-124,hy-132,-34,hy-92],C);ell(-84,hy-58,18,32,-.25,'#d99aa0');
  // the torn ear: a notch out of it
  poly([112,hy-20,124,hy-132,92,hy-108,104,hy-84,70,hy-104,34,hy-92],C);ell(82,hy-58,12,20,.25,'#d99aa0');
  ell(0,hy,122,102,0,C);ell(0,hy+40,60,44,0,'#d5d9e0');
  for(const s2 of[-1,1]){line(s2*30,hy-98,s2*20,hy-62,11,D);}line(0,hy-100,0,hy-58,11,D);
  const w=o.eyes||'calm',lx=(o.look?o.look.x:0)*12,ly=(o.look?o.look.y:0)*10;
  for(const s2 of[-1,1]){const ex=s2*52,ey=hy-8;if(o.glow)glow(ex,ey,90,'rgba(255,214,70,1)',.55*o.glow);ell(ex,ey,32,w==='slit'?22:32,0,'#ffd23c');
    const pw=w==='wide'?22:w==='slit'?7:12;ell(ex+lx,ey+ly,pw,w==='slit'?20:27,0,'#14151a');circ(ex+lx-8,ey+ly-10,6,'#fff');}
  poly([-11,hy+28,11,hy+28,0,hy+42],'#d9737f');line(0,hy+42,0,hy+56,5,'#6a5a60');
  ctx.strokeStyle='#6a5a60';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-22,hy+58);ctx.quadraticCurveTo(-8,hy+70,0,hy+56);ctx.quadraticCurveTo(8,hy+70,22,hy+58);ctx.stroke();
  for(const s2 of[-1,1])for(let i=0;i<3;i++)line(s2*72,hy+30+i*14,s2*152,hy+16+i*24,3.5,'rgba(240,240,250,.75)');
  ctx.restore();}
// vet room: lit wall, height chart, shelf, table along the bottom
function room(t,o={}){ctx.fillStyle=vgrad(0,1500,[[0,MC.wallD],[.6,MC.wall],[1,'#3f4b92']]);ctx.fillRect(-300,-200,1680,1900);glow(540,820,1000,`rgba(${MC.lamp},1)`,.3);
  // poster + shelf + cabinet
  fillRR(90,420,300,380,8,'#f0ead8');T2('IS YOUR',240,480,34,'#c0392b',{w:900});T2('PET CHIPPED?',240,526,38,'#c0392b',{w:900});
  ell(240,670,90,70,0,'#c4b490');circ(205,610,24,'#c4b490');circ(275,610,24,'#c4b490');circ(170,650,20,'#c4b490');circ(310,650,20,'#c4b490');
  fillRR(690,620,330,18,4,'#d8dde4');for(let i=0;i<5;i++){fillRR(710+i*60,520,44,100,10,['#e4a23a','#5fb6d9','#e06a5a'][i%3]);fillRR(710+i*60,520,44,26,6,'#f4f4f0');}
  fillRR(690,740,330,300,10,'#d8dde4');line(855,750,855,1030,5,'#9aa3b0');circ(830,890,8,'#7d8798');circ(880,890,8,'#7d8798');
  ctx.fillStyle=vgrad(1500,1980,[[0,'#3f466a'],[1,'#20243c']]);ctx.fillRect(-300,1500,1680,900);}
function table(y){fillRR(-200,y,1480,36,8,MC.steel);fillRR(-200,y+30,1480,16,0,MC.steelD);ctx.fillStyle=vgrad(y+40,y+700,[[0,'#59627a'],[1,'#2a2f42']]);ctx.fillRect(-200,y+44,1480,900);}
// handheld scanner: looped paddle, LCD in the grip
function scanner(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(s,s);const on=o.on||0;
  if(on>0){for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(255,${o.red?90:220},${o.red?70:150},${.8*on*(1-i*.3)})`;ctx.lineWidth=8;ctx.beginPath();ctx.arc(0,-120,110+i*50+fract((o.t||0)*1.4)*50,0,7);ctx.stroke();}}
  ctx.strokeStyle='#ffb52e';ctx.lineWidth=38;ctx.beginPath();ctx.arc(0,-120,92,0,7);ctx.stroke();ctx.strokeStyle='rgba(0,0,0,.2)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,-120,74,0,7);ctx.stroke();
  fillRR(-60,-30,120,300,34,'#2b2f3f');fillRR(-46,-12,92,116,10,o.red?'#3a0d0d':'#0f2a22');
  const c=o.red?'#ff5a4a':MC.led;if(o.txt)T2(o.txt,0,46,o.txt.length>3?34:44,c,{w:900,f:'PM'});
  circ(0,160,24,o.red?'#ff4d3d':'#e9b13a');ctx.restore();}
function monitor(cx,cy,w,h,fn){fillRR(cx-w/2-22,cy-h/2-22,w+44,h+44,18,'#232637');fillRR(cx-w/2,cy-h/2,w,h,6,'#f4f7fb');ctx.save();rr(cx-w/2,cy-h/2,w,h,6);ctx.clip();ctx.translate(cx-w/2,cy-h/2);fn&&fn(w,h);ctx.restore();fillRR(cx-70,cy+h/2+22,140,70,6,'#232637');fillRR(cx-170,cy+h/2+86,340,20,8,'#232637');}
// registry record. rows:[[key,val,k,hot]]
function record(w,h,rows,o={}){fillRR(0,0,w,92,0,o.bar||'#2a7fb8');T2(o.title||'PET REGISTRY',34,47,42,'#fff',{align:'left',w:900});T2(o.id||'',w-30,47,28,'#dff2ff',{align:'right',f:'PM',w:500});
  rows.forEach((r,i)=>{const y=150+i*o.step,a=r[2]??1;if(a<=0)return;ctx.globalAlpha=a;T2(r[0],34,y,30,'#6a7686',{align:'left',w:800,a});T2(r[1],34,y+(o.size||54)*.62+24,o.size||54,r[3]?'#d4281c':'#16202c',{align:'left',w:900,a});line(30,y+(o.size||54)*1.3+28,w-30,y+(o.size||54)*1.3+28,3,'rgba(100,120,140,.3)');ctx.globalAlpha=1;});}
function rice(x,y,L,rot,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ell(0,0,L/2,L*.14,0,o.c||'#fff6e0');ell(-L*.12,-L*.04,L*.26,L*.05,0,'rgba(255,255,255,.7)');ctx.restore();}
function chip(x,y,L,rot,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(rot);fillRR(-L/2,-L*.09,L,L*.18,L*.09,'rgba(200,235,255,.5)');ctx.strokeStyle='rgba(235,250,255,.95)';ctx.lineWidth=Math.max(2,L*.008);rr(-L/2,-L*.09,L,L*.18,L*.09);ctx.stroke();
  // copper coil + ferrite rod + the little IC
  fillRR(-L*.42,-L*.035,L*.5,L*.07,4,'#3a3440');for(let i=0;i<26;i++)line(-L*.42+i*L*.02,-L*.062,-L*.42+i*L*.02,L*.062,Math.max(1.5,L*.008),'#d98a3a');
  fillRR(L*.14,-L*.05,L*.22,L*.1,3,'#1b1d27');line(L*.08,0,L*.14,0,Math.max(2,L*.01),'#d98a3a');ctx.restore();}
// back of my head and shoulders (seen from behind), on the exam table
function back(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  fillRR(-330,-40,660,900,120,'#2f8f6b');fillRR(-330,120,660,10,0,'rgba(0,0,0,0)');
  ell(0,-50,150,74,0,'#267a5b');fillRR(-86,-170,172,150,40,'#e0ad8a');ell(0,-30,88,26,0,'#267a5b');
  // head from behind + beanie
  circ(0,-300,190,'#e0ad8a');ctx.fillStyle='#f0683f';ctx.beginPath();ctx.arc(0,-300,196,Math.PI*.98,Math.PI*2.02);ctx.fill();fillRR(-204,-330,408,76,32,'#c9502c');for(let i=0;i<9;i++)line(-170+i*42,-322,-170+i*42,-262,6,'rgba(0,0,0,.14)');ell(-192,-240,22,38,0,'#d49c7a');ell(192,-240,22,38,0,'#d49c7a');
  ctx.restore();}
// night porch: door, warm bulb, boards
function porch(t,o={}){fillAll(MC.night);ctx.fillStyle=vgrad(0,1500,[[0,'#262e5c'],[1,'#39406e']]);ctx.fillRect(-300,-200,1680,1800);
  for(let i=0;i<14;i++)line(-300,120+i*110,1380,120+i*110,5,'rgba(10,14,40,.5)');
  fillRR(290,330,520,1190,10,'#6e3f28');fillRR(320,360,460,1160,8,'#a2573a');for(const[a,b]of[[370,420],[370,640],[370,940],[590,420],[590,640],[590,940]])fillRR(a,b,160,190,6,'#8f4a30');
  circ(740,1000,20,'#f0cf74');glow(540,240,800,`rgba(${MC.lamp},1)`,.5);line(540,120,540,200,8,'#20243c');circ(540,220,30,'#fff3cb');
  // scratch marks
  const n=o.scr??0;for(let i=0;i<n;i++){const x=420+i*34;line(x,1180+((i%3)*12),x+18,1440,8,'#f0cdb0');line(x+5,1180+((i%3)*12),x+22,1440,3,'#6e3f28');}
  ctx.fillStyle=vgrad(1500,1980,[[0,'#6b5546'],[1,'#3a2d27']]);ctx.fillRect(-300,1520,1680,900);for(let i=0;i<6;i++)line(-300,1560+i*70,1380,1560+i*70,5,'#3a2d27');
  fillRR(380,1500,340,40,6,'#c4a06a');T2('WELCOME',550,1520,28,'#5a4426',{w:900});}
// inside my house, door from the hall; o.light under the door
function hall(t,o={}){fillAll('#14172b');ctx.fillStyle=vgrad(0,1500,[[0,'#232848'],[1,'#3b3660']]);ctx.fillRect(-300,-200,1680,1800);
  fillRR(250,250,580,1300,10,'#4d3324');fillRR(285,285,510,1265,8,'#7a4e36');for(const[a,b]of[[330,330],[330,700],[560,330],[560,700]])fillRR(a,b,190,320,6,'#6a432e');circ(745,960,20,'#d9b65e');
  fillRR(380,1120,320,60,6,'#c9a050');fillRR(392,1132,296,36,4,'#2a1c12');
  ctx.fillStyle=vgrad(1520,1980,[[0,'#403556'],[1,'#191726']]);ctx.fillRect(-300,1550,1680,800);
  glow(540,1556,520,`rgba(${MC.lamp},1)`,.5);ctx.fillStyle=`rgba(${MC.lamp},.85)`;ctx.fillRect(285,1546,510,8);
  poly([285,1554,795,1554,950,1760,130,1760],`rgba(${MC.lamp},1)`,.12);}
// the "LOST" poster on a pole, with my face
function poster(x,y,s,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);fillRR(-262,-352,540,720,6,'rgba(0,0,0,.4)');fillRR(-270,-360,540,720,6,'#f7f2df');
  T2('LOST',0,-290,108,'#d4281c',{w:900});fillRR(-200,-220,400,340,6,'#7a93b8');ctx.save();rr(-200,-220,400,340,6);ctx.clip();me({x:0,y:290,h:560,mouth:'flat',brow:'flat',look:{x:0,y:0}});ctx.restore();
  T2('MY PET',0,170,62,'#16202c',{w:900});T2('ANSWERS TO 4:40',0,232,38,'#16202c',{w:800});T2('MISSING SINCE 1974',-20,284,34,'#d4281c',{w:900});
  for(const[a,b]of[[-230,-330],[230,-330]])circ(a,b,12,'#c0c6d0');
  // paw print signature
  ctx.fillStyle='#16202c';ell(215,330,20,16,0,'#16202c');for(const[a,b]of[[-22,-20],[-8,-30],[8,-30],[22,-20]])circ(215+a,330+b,7,'#16202c');ctx.restore();}
function paw(x,y,s,c='#14151a',a=1){ctx.save();ctx.globalAlpha=a;ell(x,y+20*s,62*s,50*s,0,c);for(const[p,q,r]of[[-72,-30,23],[-28,-66,25],[28,-66,25],[72,-30,23]])ell(x+p*s,y+q*s,r*s,r*1.25*s,0,c);ctx.restore();}
