// ===================== 90 Meters: places and things (v2, 1080x1920) =====================
const NM={red:'#ff3b2f',amber:'#ffc93c',lamp:'255,226,170',steel:'#c9d1da',wallL:'#2a3446',wallD:'#0c1119',rosa:'#2f5fa8',hiv:'#d8ff3a',night:'#0a1122',grn:'#5cf2a2'};
function T2(s,x,y,size,col='#fff',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
// harness straps over a toon (drawn after it)
function harness(o){const h=o.h,x=o.x,y=o.y+(o.bob||0);ctx.save();ctx.globalAlpha=.95;const c='#f2b51f';
  line(x-.12*h,y-.66*h,x+.1*h,y-.38*h,.022*h,c);line(x+.12*h,y-.66*h,x-.1*h,y-.38*h,.022*h,c);line(x-.17*h,y-.4*h,x+.17*h,y-.4*h,.025*h,c);circ(x,y-.5*h,.025*h,'#9aa3ad');ctx.restore();}
// me: orange beanie, dark work jacket, yellow harness
function me(o){toon(Object.assign({jacket:'#2b5a4a',hat:'beanie',hatCol:'#f0683f',tag:null,skin:'#e9b896',browCol:'#4a2e1f',pants:'#232634',stripe:true},o));if(o.harness!==false)harness(o);}
// Rosa: blue workwear, white hard hat
function rosa(o){toon(Object.assign({jacket:NM.rosa,hat:'helm',hatCol:'#f4f4ef',tag:'ROSA',skin:'#c98f6a',browCol:'#2a1a12',pants:'#1d2433',stripe:true},o));if(o.harness!==false)harness(o);}
// the other "Rosa": same clothes, no face, two glints
function fake(o){toon(Object.assign({jacket:NM.rosa,hat:'helm',hatCol:'#f4f4ef',blank:true,glint:o.glint??.9,tag:'ROSA',pants:'#1d2433',stripe:true},o));if(o.harness!==false)harness(o);}
const NSTAR=(()=>{const r=rng(9),a=[];for(let i=0;i<220;i++)a.push([r()*1400-160,r()*1500-100,r()<.1?2.6:1.4,.25+r()*.6]);return a;})();
function nightSky(y1){ctx.fillStyle=vgrad(-200,y1,[[0,'#03050c'],[.6,'#0a1226'],[1,'#1b2846']]);ctx.fillRect(-400,-400,1880,y1+400);for(const[x,y,r,a]of NSTAR)if(y<y1-20)circ(x,y,r,'#e6ecff',a);}
const blink=t=>fract(t/2)<.45?1:.15; // turbines' red lights flash together
// a turbine seen from outside: base (x,y), tower height H, blade length L, rot (radians)
function turbine(x,y,H,L,rot,t,o={}){const w0=H*.045,w1=H*.026,top=y-H;const c=o.col||'#d9dee6',cd=shade(c,-.35);
  poly([x-w0,y,x+w0,y,x+w1,top,x-w1,top],c);poly([x+w0*.2,y,x+w0,y,x+w1,top,x+w1*.2,top],cd,.5);
  fillRR(x-w1*2.2,top-H*.035,w1*5.2,H*.05,H*.012,c);fillRR(x-w1*2.2,top-H*.008,w1*5.2,H*.02,H*.006,cd);
  const hx=x-w1*2.6,hy=top-H*.01;for(let k=0;k<3;k++){const a=rot+k*Math.PI*2/3;ctx.save();ctx.translate(hx,hy);ctx.rotate(a);poly([-L*.025,0,L*.025,0,L*.012,-L,-L*.004,-L],c);ctx.restore();}
  circ(hx,hy,H*.018,shade(c,.05));const b=blink(t)*(o.light??1);circ(x+w1*1.5,top-H*.04,Math.max(3,H*.006),NM.red,b);glow(x+w1*1.5,top-H*.04,Math.max(30,H*.05),'rgba(255,50,40,1)',.5*b);}
function farm(t,o={}){nightSky(1500);circ(880,300,46,'#f2f0dc');glow(880,300,260,'rgba(240,240,220,1)',.2);
  const far=[[60,1500,300],[230,1520,380],[1000,1500,320],[1180,1530,260],[-120,1530,240]];far.forEach(([x,y,H],i)=>turbine(x,y,H,H*.55,t*.35+i*1.3,t,{col:'#6b7690'}));
  ctx.fillStyle=vgrad(1480,1940,[[0,'#16213a'],[1,'#0b1222']]);ctx.fillRect(-400,1480,1880,700);
  for(let i=0;i<30;i++)line(hash(i)*1300-100,1540+hash(i+3)*360,hash(i)*1300-60,1530+hash(i+3)*360,3,'rgba(160,190,240,.12)');}
// ---------- inside the tower, cut open: m (0..90) -> y ----------
const Y0=1830,Y90=400,yOf=m=>Y0-m*(Y0-Y90)/90,LX=410,CX=660; // ladder x, lift x
function cage(x,y,o={}){const w=170,h=220;ctx.save();if(o.lit!==false)glow(x,y-h/2,180,`rgba(${NM.lamp},1)`,.35*(o.lit??1));fillRR(x-w/2,y-h,w,h,8,'rgba(30,38,52,.92)');
  if(o.who)o.who(x,y-6);
  ctx.strokeStyle='rgba(205,214,226,.75)';ctx.lineWidth=4;rr(x-w/2,y-h,w,h,8);ctx.stroke();for(let i=1;i<6;i++)line(x-w/2+i*w/6,y-h,x-w/2+i*w/6,y,2,'rgba(205,214,226,.35)');
  fillRR(x-w/2-6,y-h-10,w+12,16,4,'#8a94a2');fillRR(x-w/2-6,y-6,w+12,14,4,'#8a94a2');ctx.restore();}
function shaft(t,o={}){fillAll('#05070c');
  const g=ctx.createLinearGradient(220,0,880,0);g.addColorStop(0,NM.wallD);g.addColorStop(.35,NM.wallL);g.addColorStop(.7,'#1d2534');g.addColorStop(1,NM.wallD);ctx.fillStyle=g;ctx.fillRect(220,Y90-10,660,Y0-Y90+40);
  for(const m of[30,60]){const y=yOf(m);fillRR(220,y-8,660,16,3,'#3b4659');for(let x=230;x<880;x+=34)circ(x,y,3,'#8792a3');}
  for(let m=5;m<90;m+=15){const y=yOf(m);circ(850,y,9,'#ffe6b0');glow(850,y,160,`rgba(${NM.lamp},1)`,.22*(o.lights??1));}
  // ladder
  line(LX-34,Y0,LX-34,Y90,7,'#aab3bf');line(LX+34,Y0,LX+34,Y90,7,'#aab3bf');for(let y=Y0-8;y>Y90;y-=24)line(LX-34,y,LX+34,y,4,'rgba(170,179,191,.8)');
  line(LX,Y0,LX,Y90,2,'rgba(255,210,80,.5)');
  // lift cables
  line(CX-60,Y90,CX-60,Y0,3,'rgba(210,218,230,.55)');line(CX+60,Y90,CX+60,Y0,3,'rgba(210,218,230,.55)');
  // base: door + floor
  fillRR(220,Y0,660,70,4,'#1a2230');fillRR(600,Y0-230,150,230,6,'#141b27');if(o.door)glow(675,Y0-110,200,'rgba(120,150,210,1)',.18);
  // the nacelle on top, cut open
  const ny=Y90;ctx.fillStyle=vgrad(ny-260,ny,[[0,'#2b3445'],[1,'#3b4558']]);fillRR(110,ny-260,860,270,26,'#2e3748');fillRR(130,ny-240,820,240,18,'#3a4457');
  glow(560,ny-200,420,`rgba(${NM.lamp},1)`,.35*(o.lights??1));circ(560,ny-232,12,'#fff1c8');
  fillRR(170,ny-170,240,150,40,'#59647a');fillRR(430,ny-150,150,130,20,'#4c566b');for(let i=0;i<5;i++)line(190+i*45,ny-160,190+i*45,ny-30,4,'rgba(20,25,35,.35)');
  fillRR(CX-80,ny-8,160,16,4,o.hatchOpen?'#111':'#a8b1bd');line(CX-80,ny,CX+80,ny,3,'rgba(30,35,45,.6)');
  line(140,ny-215,940,ny-215,6,'#1c2230');// anchor rail
  fillRR(90,ny-10,900,22,6,'#232b39');}
// handheld radio, screen + waveform
function radio(x,y,s,t,on,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.rot||0);line(40,-150,40,-260,14,'#1a1d22');circ(40,-262,10,'#2a2e35');
  fillRR(-70,-160,150,300,26,'#22262e');fillRR(-58,-148,126,276,20,'#2d323b');fillRR(-48,-130,106,74,8,'#0b1a12');T2('CH 4',5,-112,22,NM.grn,{f:'PM',w:500});
  if(on>0)waveform(5,-78,90,30,t,on,NM.grn,9);for(let i=0;i<5;i++)line(-40,-20+i*22,50,-20+i*22,6,'rgba(0,0,0,.45)');circ(52,-180,9,on>0?NM.red:'#5a2020');if(on>0)glow(52,-180,40,'rgba(255,60,40,1)',.6);ctx.restore();}
// laminated rules card, taped by the hatch
const RULES=[['TWO PEOPLE UP,','TWO PEOPLE DOWN.'],['THE LIFT NEVER MOVES','WITH NOBODY IN IT.'],['NEVER OPEN THE HATCH','UNTIL YOU HEAR OUR KNOCK.']];
function rulesCard(cx,cy,o={}){ctx.save();ctx.translate(cx,cy);ctx.rotate(.02);const w=920,h=1000;fillRR(-w/2+12,-h/2+16,w,h,20,'rgba(0,0,0,.4)');fillRR(-w/2,-h/2,w,h,20,'#f6f3e6');
  fillRR(-w/2,-h/2,w,150,20,'#ffcf3a');fillRR(-w/2,-h/2+120,w,30,0,'#ffcf3a');for(let i=0;i<9;i++)poly([-w/2+i*110,-h/2+150,-w/2+i*110+55,-h/2+150,-w/2+i*110+5,-h/2+130],'#141414',.0);
  T2('SITE RULES: CLIMB SAFE',0,-h/2+78,58,'#14110a',{w:900});
  for(const s of[-1,1]){ctx.save();ctx.translate(s*380,-h/2-6);ctx.rotate(s*.35);fillRR(-80,-24,160,48,4,'rgba(220,226,232,.7)');ctx.restore();}
  for(let r=0;r<3;r++){const k=o.reveal[r];if(k<=0)continue;const y0=-h/2+270+r*260;ctx.save();ctx.beginPath();ctx.rect(-w/2,y0-80,w*clamp(k*1.15),240);ctx.clip();
    T2(`${r+1}.`,-w/2+70,y0+30,80,'#1f2a44',{w:900});RULES[r].forEach((q,j)=>T2(q,-w/2+140,y0+j*84,q.length>20?44:52,j===1?'#b4261b':'#1f2a44',{align:'left',w:900}));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle=NM.red;ctx.lineWidth=10;ctx.beginPath();ctx.ellipse(20,y0+42,w/2-24,118,-.02,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  ctx.restore();}
// looking down at the floor hatch from above. o: frost 0..1, crack (light leaks), eyes 0..1, knock (ring k)
function hatchTop(t,o={}){fillAll('#232a36');for(let x=-400;x<1480;x+=46)line(x,-400,x,2400,3,'rgba(10,14,20,.5)');for(let y=-400;y<2400;y+=46)line(-400,y,1480,y,3,'rgba(10,14,20,.5)');
  glow(540,300,700,`rgba(${NM.lamp},1)`,.22);
  const cx=540,cy=1060,s=640;fillRR(cx-s/2-40,cy-s/2-40,s+80,s+80,20,'#3a4354');fillRR(cx-s/2,cy-s/2,s,s,12,'#8f9aa8');
  if(o.crack){ctx.save();ctx.globalAlpha=o.crack;line(cx-s/2,cy-s/2,cx+s/2,cy-s/2,6,'#ffe9b8');line(cx-s/2,cy+s/2,cx+s/2,cy+s/2,6,'#ffe9b8');ctx.restore();glow(cx,cy+s/2,300,`rgba(${NM.lamp},1)`,.25*o.crack);}
  for(let i=0;i<7;i++)line(cx-s/2+30,cy-s/2+60+i*80,cx+s/2-30,cy-s/2+60+i*80,8,'rgba(60,68,80,.6)');
  fillRR(cx+s/2-150,cy-60,90,120,12,'#2a313d');fillRR(cx+s/2-130,cy-40,50,80,8,NM.amber);T2('LATCH',cx+s/2-105,cy+100,30,'#e8edf3',{w:900});
  T2('HATCH',cx,cy-s/2+30,34,'rgba(20,24,30,.6)',{w:900});
  if(o.eyes>0){ctx.save();ctx.globalAlpha=o.eyes;fillRR(cx-s/2+10,cy+s/2-10,s-20,70,8,'#020306');ctx.save();ctx.beginPath();ctx.rect(cx-s/2+10,cy+s/2-10,s-20,70);ctx.clip();ell(cx-25,cy+s/2+6,120,30,0,'#f4f4ef');circ(cx-25,cy+s/2+90,80,'#121418');circ(cx-70,cy+s/2+44,9,'#f4f1e8');circ(cx+20,cy+s/2+44,9,'#f4f1e8');glow(cx-25,cy+s/2+44,80,'rgba(244,241,232,1)',.35);ctx.restore();ctx.restore();}
  const fr=o.frost??0;if(fr>0){ctx.save();ctx.globalAlpha=.85*fr;for(let i=0;i<70;i++){const a=hash(i)*6.28,r=s*.62*(1-hash(i+5)*.5*fr);const x=cx+Math.cos(a)*r*.9,y=cy+Math.sin(a)*r*.9;line(x,y,x+Math.cos(a+2)*40,y+Math.sin(a+2)*40,3,'#e8f6ff');}
    ctx.fillStyle=`rgba(220,240,255,${.25*fr})`;ctx.fillRect(cx-s/2,cy-s/2,s,s);ctx.restore();}
  if(o.ring!=null){const q=o.ring;ctx.save();ctx.strokeStyle=`rgba(255,255,255,${.8*(1-q)})`;ctx.lineWidth=10;rr(cx-s/2-q*240,cy-s/2-q*240,s+q*480,s+q*480,20+q*60);ctx.stroke();ctx.restore();}}
// inside the nacelle, side view: the hatch at left, the dark tail at right. o.lines: draw lanyards; o.dark; o.eyes
function nacelleIn(t,o={}){fillAll('#0b0f16');ctx.fillStyle=vgrad(300,1600,[[0,'#2f3849'],[1,'#1b2230']]);fillRR(-300,320,1700,1240,60,'#27303f');
  glow(300,520,700,`rgba(${NM.lamp},1)`,.4);circ(300,440,18,'#fff1c8');line(300,330,300,420,5,'#1a1f28');
  fillRR(-200,700,520,420,80,'#5a6579');for(let i=0;i<8;i++)line(-180+i*60,710,-180+i*60,1110,5,'rgba(20,25,35,.35)');fillRR(330,760,240,330,30,'#4b5569');
  line(-300,420,1400,420,10,'#141922');for(const x of[150,450,750])fillRR(x-14,420,28,40,6,'#8a94a2');
  fillRR(-300,1180,1700,60,6,'#3a4354');fillRR(40,1176,220,18,4,'#a8b1bd');T2('HATCH',150,1222,26,'#d8dde4',{w:900});
  // the dark tail, a gradient into nothing
  const d=o.dark??1;ctx.save();const g=ctx.createLinearGradient(560,0,1200,0);g.addColorStop(0,'rgba(3,4,8,0)');g.addColorStop(.5,`rgba(3,4,8,${.85*d})`);g.addColorStop(1,`rgba(3,4,8,${d})`);ctx.fillStyle=g;ctx.fillRect(560,320,900,1300);ctx.restore();
  if(o.eyes>0){const ex=o.ex??980,h=o.eh??620;fake({x:ex,y:1180,h,glint:0,harness:true});ctx.save();ctx.globalAlpha=1-o.eyes*(o.body??.4);ctx.fillStyle='#03040a';ctx.fillRect(ex-h*.4,1180-h*1.05,h*.8,h*1.1);ctx.restore();
    const hy=1180-.83*h;for(const s of[-1,1]){circ(ex+s*.055*h,hy,.012*h,'#f4f1e8',o.eyes);glow(ex+s*.055*h,hy,40,'rgba(244,241,232,1)',.4*o.eyes);}}}
// a lanyard from anchor (ax,ay) to (bx,by); tight = straight, else sagging
function lanyard(ax,ay,bx,by,tight,col='#e05a2b'){ctx.strokeStyle=col;ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(ax,ay);if(tight)ctx.lineTo(bx,by);else ctx.quadraticCurveTo((ax+bx)/2,Math.max(ay,by)+90,bx,by);ctx.stroke();
  circ(ax,ay,14,'#c9d1da');circ(bx,by,12,'#c9d1da');}
