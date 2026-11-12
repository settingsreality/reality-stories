// ===================== The Backup: places and things (v2, 1080x1920) =====================
const SV={ice:'#9fd8ff',iceD:'#3b6c8f',con:'#5b6675',conD:'#3a434f',teal:'#5ff0e0',gold:'#ffc93c',red:'#ff4d3d',parka:'#2f4f7a',lamp:'255,236,200',skin:'#e9b896'};
// me: orange beanie, parka. bare:true = bare feet (the backup)
function me(o){toon(Object.assign({jacket:SV.parka,pants:'#1b2230',hat:'beanie',hatCol:'#f0683f',tag:'VAULT\nWATCH',skin:SV.skin,browCol:'#4a2e1f',stripe:true,boots:o&&o.bare?SV.skin:'#14161b'},o));}
function bjorn(o){toon(Object.assign({jacket:'#7a2f2a',pants:'#1b2230',hat:'cap',hatCol:'#1a2238',tag:'BJORN',skin:'#e2a985',beard:'#c9b9a0',browCol:'#c9b9a0',stripe:true},o));}
function pale(x,y,h,o={}){ctx.save();ctx.globalAlpha=o.a??.8;toon(Object.assign({x,y,h,jacket:'#cfe6f5',pants:'#b8d2e4',boots:'#e9f4fb',hat:null,blank:true,hatCol:'#dfeef8',glint:o.glint??1,tag:null,stripe:false,glove:'#e9f4fb'},o));ctx.restore();}
// ---------- polar night sky + snow mountain ----------
function polarSky(t,o={}){ctx.fillStyle=vgrad(-80,1300,[[0,'#050a18'],[.6,'#0b1a33'],[1,'#173052']]);ctx.fillRect(-200,-200,1480,1600);
  const R=rng(7);for(let i=0;i<140;i++){const x=R()*1200-60,y=R()*900-60;circ(x,y,R()*2.4+.6,'#fff',.25+.6*R()*(.6+.4*Math.sin(t*2+i)));}
  // aurora
  ctx.save();ctx.globalCompositeOperation='lighter';for(let k=0;k<3;k++){ctx.beginPath();for(let x=-100;x<=1200;x+=20){const y=260+k*70+Math.sin(x*.006+t*.4+k)*60+Math.sin(x*.017+t*.9)*20;x===-100?ctx.moveTo(x,y):ctx.lineTo(x,y);}
    ctx.strokeStyle=`rgba(90,255,190,${.10-k*.025})`;ctx.lineWidth=90-k*20;ctx.stroke();}ctx.restore();}
function mountain(o={}){const y0=o.y??1050;ctx.fillStyle=vgrad(y0-500,2000,[[0,'#dfeaf5'],[.4,'#a9bfd6'],[1,'#6f86a3']]);ctx.beginPath();ctx.moveTo(-200,y0+40);ctx.lineTo(120,y0-330);ctx.lineTo(330,y0-260);ctx.lineTo(620,y0-520);ctx.lineTo(900,y0-300);ctx.lineTo(1300,y0-120);ctx.lineTo(1300,2100);ctx.lineTo(-200,2100);ctx.fill();
  ctx.fillStyle='rgba(60,90,130,.35)';ctx.beginPath();ctx.moveTo(620,y0-520);ctx.lineTo(760,y0-200);ctx.lineTo(900,y0-300);ctx.fill();}
// the real entrance: a concrete wedge sticking out of the slope, glowing art panel on top
function entrance(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  poly([-160,0,160,0,160,-330,-160,-250],SV.con);poly([160,0,260,-40,260,-370,160,-330],SV.conD);
  // glowing art strip
  const g=.7+.3*Math.sin(t*1.7);poly([-160,-250,160,-330,160,-470,-160,-390],'#0d2a33');ctx.save();ctx.globalCompositeOperation='lighter';
  for(let i=0;i<10;i++){const a=hash(i+Math.floor(t*2))*.6+.4;poly([-150+i*31,-262-i*8,-124+i*31,-268-i*8,-124+i*31,-398-i*8,-150+i*31,-392-i*8],SV.teal,.35*a*g);}
  glow(0,-360,380,'rgba(95,240,224,1)',.35*g);ctx.restore();
  // door
  fillRR(-60,-170,120,170,6,'#2b333e');line(0,-170,0,0,4,'#1a1f27');circ(40,-80,7,'#9aa6b5');
  if(o.doorLight){ctx.save();ctx.globalCompositeOperation='lighter';glow(0,-80,220,'rgba(255,230,190,1)',.4*o.doorLight);ctx.restore();}
  ctx.restore();}
// ---------- the tunnel: one-point perspective tube ----------
// returns screen point for depth d (0 near .. 1 far), u (-1..1 across), v (-1 floor .. 1 ceiling)
function tunPt(d,u,v,o={}){const vx=o.vx??540,vy=o.vy??900;const q=1/(1+d*9);return[vx+u*620*q,vy-v*620*q+ (v<0?0:0)];}
function tunnel(t,o={}){const vx=o.vx??540,vy=o.vy??900;fillAll('#0a121d');
  // far end
  const far=tunPt(1,0,0,o);const fw=620/10;
  ctx.fillStyle=vgrad(0,1920,[[0,'#101c2c'],[.47,'#1b2d44'],[.53,'#22384f'],[1,'#2a4058']]);ctx.fillRect(-80,-80,1240,2080);
  // walls as a tube: rings
  for(let k=0;k<12;k++){const d=k/11;const q=1/(1+d*9);const r=620*q;ctx.strokeStyle=`rgba(160,200,235,${.22*(1-d*.6)})`;ctx.lineWidth=Math.max(2,10*q);ctx.beginPath();ctx.ellipse(vx,vy,r,r*1.05,0,Math.PI*1.0,Math.PI*2.0);ctx.stroke();line(vx-r,vy,vx-r,vy+r*.9,Math.max(2,10*q),`rgba(160,200,235,${.18*(1-d*.6)})`);line(vx+r,vy,vx+r,vy+r*.9,Math.max(2,10*q),`rgba(160,200,235,${.18*(1-d*.6)})`);
    if(k%2===0){ctx.save();ctx.globalCompositeOperation='lighter';circ(vx,vy-r*1.02,Math.max(3,26*q),'rgb(255,236,200)',.8);glow(vx,vy-r*.95,260*q,`rgba(${SV.lamp},1)`,.25);ctx.restore();}}
  // frosty floor
  ctx.fillStyle='rgba(210,235,255,.18)';ctx.beginPath();ctx.moveTo(vx-620,vy+560);ctx.lineTo(vx-62,vy+56);ctx.lineTo(vx+62,vy+56);ctx.lineTo(vx+620,vy+560);ctx.lineTo(vx+620,2000);ctx.lineTo(vx-620,2000);ctx.fill();
  const R=rng(3);for(let i=0;i<220;i++){const d=R(),u=R()*1.8-.9;const q=1/(1+d*9);circ(vx+u*620*q,vy+560*q+ R()*20*q,2+4*q,'#eaf6ff',.25);}
  // end door
  const dw=o.doorW??1;const dr=620/10;fillRR(vx-dr*.7,vy-dr*.9,dr*1.4,dr*1.8,4,'#2b333e');
  if(o.doorOpen){ctx.save();ctx.globalCompositeOperation='lighter';fillRR(vx-dr*.7,vy-dr*.9,dr*1.4*o.doorOpen,dr*1.8,4,'rgba(255,240,210,.9)');glow(vx,vy,dr*6,`rgba(${SV.lamp},1)`,.5*o.doorOpen);ctx.restore();}
  if(o.mist){for(let i=0;i<8;i++){const x=vx+Math.sin(t*.5+i)*120,y=vy+30+i*12;glow(x,y,90+i*20,'rgba(220,240,255,1)',.08*o.mist);}}}
// a bare footprint on the floor at depth d, across u; dir +1 = toes toward camera
function footprint(d,u,o={}){const vx=o.vx??540,vy=o.vy??900;const q=1/(1+d*9);const x=vx+u*620*q,y=vy+560*q;const s=q*1.0;ctx.save();ctx.translate(x,y);ctx.scale(s,s*.55);ctx.globalAlpha=o.a??1;
  ell(0,0,26,46,0,'#5a7e9e');ell(0,-4,18,34,0,'#45698a');for(let k=0;k<5;k++)circ(-20+k*10,48+Math.abs(k-1.5)*-3,6-k*.6,'#45698a');ctx.restore();}
function trail(n,a=1,o={}){for(let i=0;i<n;i++){const d=.95-i*(.9/14);footprint(Math.max(.02,d),(i%2?.09:-.09),Object.assign({a},o));}}
// ---------- vault hall: shelves of boxes ----------
const COUNTRIES=['NORWAY','INDIA','MEXICO','KENYA','PERU','JAPAN','SYRIA','BRAZIL','NEPAL','GHANA','CHILE','IRAN','CANADA','SUDAN','KOREA','EGYPT','ITALY','CHAD'];
function vaultHall(t,o={}){fillAll('#0b1420');ctx.fillStyle=vgrad(0,1920,[[0,'#0d1828'],[.6,'#152338'],[1,'#22344c']]);ctx.fillRect(-80,-80,1240,2080);
  // frost-white rock walls
  ctx.fillStyle='rgba(220,235,250,.08)';for(let i=0;i<30;i++){const R=rng(i);ell(R()*1080,R()*600,80+R()*120,40+R()*70,R(),'#cfe2f4',.06);}
  // shelving units
  let n=0;for(let r=0;r<5;r++){const y=420+r*260;line(40,y+170,1040,y+170,14,'#7a8898');for(let c=0;c<4;c++){const x=70+c*245;if(o.skip&&o.skip(r,c)){n++;continue;}
    fillRR(x,y,200,160,8,r%2?'#1d2533':'#232c3b');fillRR(x+30,y+36,140,46,5,'#e8ecef');text(COUNTRIES[(n++)%COUNTRIES.length],x+100,y+59,'800 26px MS','#20242c');}}
  for(const x of[40,1040])line(x,380,x,1760,14,'#7a8898');}
// the open box (a long crate), lid off, cold mist; label on front
function openCrate(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.save();ctx.globalCompositeOperation='lighter';glow(0,-80,420,'rgba(170,220,255,1)',.35);ctx.restore();
  poly([-330,-110,330,-110,280,-40,-280,-40],'#0c1018');fillRR(-330,-40,660,190,10,'#2a3446');fillRR(-310,-30,620,10,4,'#3a4760');
  // lid leaning
  ctx.save();ctx.translate(380,60);ctx.rotate(-.35);fillRR(-30,-260,60,330,8,'#323e53');ctx.restore();
  ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const k=fract(t*.25+i/7);glow(-200+i*65,-110-k*220,90+k*60,'rgba(220,240,255,1)',.10*(1-k));}ctx.restore();
  fillRR(-250,10,500,110,8,'#f1ebdd');text('BACKUP',0,52,'900 64px MS','#a3261b');text('OPEN ONLY IF THE ORIGINAL IS LOST',0,100,'800 24px MS','#1b1d23');
  ctx.restore();}
// ---------- watch room monitors ----------
function screenBox(x,y,w,h,fn,o={}){fillRR(x-12,y-12,w+24,h+24,14,'#11151c');fillRR(x,y,w,h,8,o.bg||'#061018');ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();ctx.translate(x,y);fn();ctx.restore();
  for(let yy=y;yy<y+h;yy+=6)line(x,yy,x+w,yy,1,'rgba(0,0,0,.25)');}
function doorLog(x,y,w,h,t,o={}){screenBox(x,y,w,h,()=>{text('DOOR LOG · VAULT',24,46,'800 32px MS',SV.teal,'left');
  const rows=o.rows||[['14 FEB','OUTER','OPEN · OUTSIDE',0],['14 FEB','INNER','OPEN · OUTSIDE',0],['14 FEB','INNER','SEALED',0],['03:14','INNER','OPEN · INSIDE',1]];
  rows.forEach((r,i)=>{const a=o.rowA?o.rowA(i):1;if(a<=0)return;const yy=110+i*66;if(r[3]){fillRR(10,yy-36,w-20,58,6,'rgba(255,77,61,.25)');}
    text(r[0],24,yy,'500 32px PM',r[3]?SV.red:'rgba(190,255,230,.85)','left',a);text(r[1],210,yy,'500 32px PM',r[3]?SV.red:'rgba(190,255,230,.85)','left',a);text(r[2],w-24,yy,'500 32px PM',r[3]?SV.red:'rgba(190,255,230,.85)','right',a);});});}
function thermo(x,y,v,o={}){const w=o.w??520,h=o.h??240,hot=v>-18;fillRR(x-w/2,y-h/2,w,h,20,'#05070c');ctx.strokeStyle=hot?SV.red:'rgba(255,255,255,.25)';ctx.lineWidth=6;rr(x-w/2,y-h/2,w,h,20);ctx.stroke();
  text(o.k||'VAULT TEMP',x,y-h/2+34,'800 28px MS','rgba(255,255,255,.6)');text((v<0?'−':'')+Math.abs(Math.round(v))+'°C',x,y+30,`900 ${o.fs||120}px MS`,hot?SV.red:SV.ice);}
// ---------- rules card ----------
const RULES=[["THE INNER DOOR","ONLY OPENS","FROM OUTSIDE."],["NEVER GO IN","ALONE.",""],["IF THE VAULT GETS WARM,","SEAL THE","OUTER DOOR."]];
function rulesCard(t,o={}){const cy=o.cy??760,s=o.s??1;fillAll('#07080b');glow(300,1650,500,'rgba(120,200,255,1)',.10);
  ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.025);ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,'#f1ebdd');for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');
  ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('VAULT RULES',-330,-360,'900 76px MS','#1b1d23','left');line(-330,-336,150,-344,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-250+r*235;ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();
    text(`${r+1}.`,-330,y0,'900 50px MS','#1b1d23','left');RULES[r].forEach((s2,j)=>{const last=j===RULES[r].length-1||RULES[r][j+1]==='';text(s2,-250,y0+j*56,'800 42px MS',last?'#a3261b':'#1b1d23','left');});ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+40,420,140,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}
    const x=o.cross?o.cross[r]:0;if(x>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=12;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-340,y0+20);ctx.lineTo(lerp(-340,380,clamp(x)),y0+10+40*clamp(x));ctx.stroke();}}
  text('— B.',300,430,'800 40px MS','#3b3d44');ctx.restore();}
// ---------- radio ----------
function radio(t,o={}){fillAll('#07090f');ctx.fillStyle=vgrad(0,1920,[[0,'#0c1220'],[1,'#05070a']]);ctx.fillRect(-80,-80,1240,2080);glow(540,1250,800,'rgba(80,255,160,1)',.14);
  me({x:540,y:2300,h:1950,brow:o.brow||'scared',mouth:o.mouth||'open',look:o.look||{x:.8,y:.7},armR:[.1,.1],armL:[.1,.1]});
  ctx.save();ctx.translate(830,1290);ctx.rotate(-.08);fillRR(-190,-230,380,520,30,'#1b1e26');line(120,-230,120,-430,14,'#111318');fillRR(-160,-195,320,150,14,'#0e2a1c');waveform(0,-120,280,110,t,o.radio??1,'#5cf2a2',13);circ(130,-10,15,'#5cf2a2');for(let i=0;i<6;i++)line(-140,30+i*22,70,30+i*22,7,'#111318');ctx.restore();}
// ---------- bare feet close-up ----------
function bareFeet(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);for(const sx of[-1,1]){ctx.save();ctx.translate(sx*120,0);
  fillRR(-60,-560,120,420,50,'#1b2230');fillRR(-48,-170,96,150,40,SV.skin);ell(0,-10,80,48,0,SV.skin);ell(0,30,96,58,0,shade(SV.skin,-.03));
  for(let k=0;k<5;k++){const tx=sx*(-62+k*29)*-1;ell(tx,78-Math.abs(k-1)*5,17-k*1.6,15-k*1.2,0,shade(SV.skin,-.12));}line(-40,-150,40,-150,6,shade(SV.skin,-.15));ctx.restore();}ctx.restore();}
// ---------- CCTV frame ----------
function cctv(t,fn,o={}){fillAll('#060810');const top=o.top??300,h=o.h??860;fillRR(70,top,940,h,20,'#0a0f1b');ctx.save();rr(90,top+20,900,h-40,14);ctx.clip();ctx.translate(90,top+20);fn();ctx.restore();
  for(let y=top+20;y<top+h-20;y+=6)line(90,y,990,y,1,'rgba(0,0,0,.25)');text(o.cam||'CAM 02 · OUTER DOOR',130,top+64,'500 30px PM','rgba(190,255,220,.85)','left');
  if(Math.sin(t*6)>0)circ(950,top+54,10,SV.red);}
// big seal lever/button by the outer door
function sealButton(x,y,s,press=0){ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-150,-190,300,380,20,'#c9a23a');fillRR(-130,-170,260,340,14,'#262b33');text('SEAL',0,-110,'900 56px MS','#fff');
  circ(0,40,90+0,'#5a0f0b');circ(0,40-10*(1-press),82,SV.red);ctx.save();ctx.globalCompositeOperation='lighter';glow(0,40,200,'rgba(255,70,50,1)',.3+.3*press);ctx.restore();ctx.restore();}
