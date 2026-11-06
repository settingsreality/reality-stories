// ===================== Fish Finder: places and things (v2, 1080x1920) =====================
const FF={wood:'#6b4a32',woodD:'#3a2a22',woodL:'#8a6244',lamp:'255,214,150',ice0:'#d9eef8',ice1:'#86b9d6',water0:'#14344f',water1:'#050b16',red:'#ff4d3d',grn:'#5cf2a2',amber:'#ffc93c',night:'#141c3a',pale:'#d3dde4',parka:'#2f4c40'};
function T2(s,x,y,size,col='#fff',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
// me: orange beanie with a headlamp, green parka
function me(o){toon(Object.assign({jacket:'#2f8f6b',hat:'beanie',hatCol:'#f0683f',tag:null,skin:'#e9b896',browCol:'#4a2e1f',pants:'#232634',stripe:false},o));
  const h=o.h,x=o.x+(o.face||0)*.04*h,y=o.y+(o.bob||0)-.83*h-.15*h;fillRR(x-.04*h,y-.02*h,.08*h,.045*h,.012*h,'#20232b');circ(x,y,.016*h,'#fff7d6');if(o.lamp!==false)glow(x,y,.12*h,'rgba(255,247,214,1)',.5);}
// the thing under the ice: a pale, faceless figure standing upside down, boots against the underside of the ice
const ICE0=1000,ICE1=1110;
function under(x,h,o={}){ctx.save();ctx.translate(x,ICE1);ctx.scale(1,-1);
  toon({x:0,y:0,h,blank:true,hatCol:FF.pale,jacket:FF.parka,pants:'#1c2a30',boots:'#0e1418',glove:FF.pale,stripe:false,glint:o.glint??.9,armL:o.armL,armR:o.armR,held:o.held,heldHand:o.heldHand});ctx.restore();}
// cross-section: shanty above, 18 in of ice, black water below. o:{hole:x}
function section(t,o={}){const hx=o.hole??640;
  ctx.fillStyle=vgrad(-200,ICE0,[[0,FF.woodD],[1,FF.wood]]);ctx.fillRect(-400,-400,1880,ICE0+400);
  for(let x=-360;x<1480;x+=96)line(x,-400,x,ICE0,4,'rgba(20,12,8,.35)');
  fillRR(90,330,230,200,10,'#2a1c14');fillRR(106,346,198,168,6,FF.night);circ(250,400,26,'#f2f0dc');for(let i=0;i<6;i++)circ(130+hash(i)*160,370+hash(i+5)*120,2.5,'#dfe6ff',.8);
  line(800,-400,800,120,6,'#20160f');circ(800,150,34,'#fff1c8');glow(800,150,700,`rgba(${FF.lamp},1)`,.42);
  fillRR(820,780,360,40,8,FF.woodL);fillRR(860,820,30,180,6,FF.woodD);fillRR(1110,820,30,180,6,FF.woodD);
  ctx.fillStyle=vgrad(ICE1,1940,[[0,FF.water0],[1,FF.water1]]);ctx.fillRect(-400,ICE1,1880,1400);
  for(let i=0;i<50;i++){const px=fract(hash(i)+t*.004*(1+hash(i+3)))*1300-110,py=ICE1+30+fract(hash(i+7)-t*.01*hash(i+2))*800;circ(px,py,1.5+hash(i+1)*2.5,'#9fc7e0',.25);}
  beam(hx,ICE1,Math.PI,700,170,.14,'180,220,255');
  ctx.fillStyle=vgrad(ICE0,ICE1,[[0,FF.ice0],[1,FF.ice1]]);ctx.fillRect(-400,ICE0,1880,ICE1-ICE0);fillRR(-400,ICE0-10,1880,16,6,'#f2f7fb');
  for(let i=0;i<40;i++)circ(hash(i*3)*1300-110,ICE0+16+hash(i*5)*84,2+hash(i)*4,'rgba(255,255,255,.55)');
  fillRR(hx-42,ICE0-10,84,ICE1-ICE0+12,10,'#0d2236');ell(hx,ICE0-4,52,14,0,'#0a1a2a');}
function murk(a=.28){ctx.fillStyle=`rgba(6,16,30,${a})`;ctx.fillRect(-400,ICE1,1880,1400);}
// rod: handle at (hx,hy), tip at (tx,ty); o.to = where the line goes
function rod(hx,hy,tx,ty,o={}){line(hx,hy,tx,ty,10,'#2a2d33');line(hx,hy,hx+(tx-hx)*.18,hy+(ty-hy)*.18,18,'#c9a050');circ(hx+(tx-hx)*.1,hy+(ty-hy)*.1+18,16,'#8d939c');
  if(o.to){ctx.strokeStyle=o.tight?'rgba(240,250,255,.95)':'rgba(220,235,245,.7)';ctx.lineWidth=o.tight?4:3;ctx.beginPath();ctx.moveTo(tx,ty);if(o.tight)ctx.lineTo(o.to[0],o.to[1]);else ctx.quadraticCurveTo((tx+o.to[0])/2,Math.max(ty,o.to[1])+30,o.to[0],o.to[1]);ctx.stroke();}}
// flasher-style fish finder: 0 ft at the top, depth clockwise. bands: [[d0,d1,col,alpha]]
const DEPTH=40,dAng=d=>-Math.PI/2+d/DEPTH*Math.PI*2*.94;
function flasher(cx,cy,R,o={}){fillRR(cx-R*1.18,cy-R*1.2,R*2.36,R*2.5,R*.22,'#1c1f26');fillRR(cx-R*1.1,cy-R*1.12,R*2.2,R*2.34,R*.18,'#2a2e37');
  circ(cx,cy,R,'#06080c');ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=R*.16;ctx.beginPath();ctx.arc(cx,cy,R*.86,dAng(0),dAng(DEPTH));ctx.stroke();
  for(let d=0;d<=DEPTH;d+=2){const a=dAng(d),r0=d%10?R*.7:R*.64;line(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0,cx+Math.cos(a)*R*.76,cy+Math.sin(a)*R*.76,d%10?2:5,'rgba(220,230,240,.6)');
    if(d%10===0)T2(String(d),cx+Math.cos(a)*R*.53,cy+Math.sin(a)*R*.53,R*.11,'#cfd8e2',{w:800});}
  for(const[d0,d1,c,a]of(o.bands||[])){ctx.save();ctx.globalAlpha=a??1;ctx.strokeStyle=c;ctx.lineWidth=R*.16;ctx.shadowColor=c;ctx.shadowBlur=R*.12;ctx.beginPath();ctx.arc(cx,cy,R*.86,dAng(d0),dAng(Math.max(d1,d0+.35)));ctx.stroke();ctx.restore();}
  if(o.read!=null){fillRR(cx-R*.3,cy-R*.16,R*.6,R*.32,R*.06,'#11161c');T2(o.read,cx,cy+R*.01,R*.17,o.readCol||FF.grn,{f:'PM',w:500});T2('FT',cx,cy+R*.27,R*.08,'#8b96a3',{w:800});}
  circ(cx-R*.75,cy+R*1.02,R*.07,'#c84a3a');circ(cx+R*.75,cy+R*1.02,R*.07,'#3a3f4a');}
// grandpa's note, taped on
const RULES=[['NEVER FISH','PAST MIDNIGHT.'],['BLIP BIGGER THAN YOU?',"DON'T LOOK DOWN THE HOLE."],['SOMETHING TAKES YOUR BAIT?','CUT THE LINE. NEVER REEL IT IN.']];
function note(cx,cy,o={}){ctx.save();ctx.translate(cx,cy);ctx.rotate(-.025);const w=920,h=1080;fillRR(-w/2+10,-h/2+14,w,h,8,'rgba(0,0,0,.35)');fillRR(-w/2,-h/2,w,h,8,'#f4ecd2');
  for(let i=0;i<12;i++)line(-w/2+30,-h/2+190+i*76,w/2-30,-h/2+190+i*76,2,'rgba(80,120,170,.25)');line(-w/2+110,-h/2,-w/2+110,h/2,3,'rgba(210,80,80,.35)');
  for(const s of[-1,1]){ctx.save();ctx.translate(s*330,-h/2);ctx.rotate(s*.3);fillRR(-80,-26,160,52,4,'rgba(230,226,200,.75)');ctx.restore();}
  T2("GRANDPA'S RULES",0,-h/2+100,62,'#1f2a44',{w:900});
  for(let r=0;r<3;r++){const k=o.reveal[r];if(k<=0)continue;const y0=-h/2+260+r*280;ctx.save();ctx.beginPath();ctx.rect(-w/2,y0-70,w*clamp(k*1.15),260);ctx.clip();
    T2(`${r+1}.`,-w/2+70,y0,72,'#1f2a44',{w:900});RULES[r].forEach((q,j)=>T2(q,-w/2+140,y0+j*82,q.length>24?42:52,j===1?'#b4261b':'#1f2a44',{align:'left',w:900}));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle=FF.red;ctx.lineWidth=10;ctx.beginPath();ctx.ellipse(10,y0+40,w/2-20,120,-.02,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  ctx.restore();}
// outside: frozen lake at night, the shanty, Grandpa's flag far out
function lake(t,o={}){ctx.fillStyle=vgrad(0,1100,[[0,'#0a1030'],[1,'#26336a']]);ctx.fillRect(-400,-400,1880,1500);
  for(let i=0;i<90;i++)circ(hash(i)*1400-160,hash(i+11)*900-100,1.5+hash(i*3)*2.5,'#e6ecff',.4+.5*hash(i*7));circ(860,330,60,'#f3f1df');glow(860,330,300,'rgba(240,240,220,1)',.25);
  poly([-400,1000,-100,860,200,930,420,840,700,920,1000,860,1480,960,1480,1100,-400,1100],'#141a33');
  ctx.fillStyle=vgrad(1000,1940,[[0,'#8fb3d4'],[1,'#d7e7f3']]);ctx.fillRect(-400,1000,1880,940);
  for(let i=0;i<14;i++)line(hash(i)*1300-100,1080+hash(i+2)*800,hash(i)*1300+120,1100+hash(i+2)*800,3,'rgba(255,255,255,.5)');
  if(o.flag){const fx=180,fy=1150;ell(fx,fy+6,90,22,0,'#24334a');line(fx,fy,fx,fy-130,5,'#3a3f4a');poly([fx+3,fy-130,fx+60,fy-115,fx+3,fy-100],FF.red);}
  const sx=o.sx??540,sy=o.sy??1480,S=o.s??1;ctx.save();ctx.translate(sx,sy);ctx.scale(S,S);ell(0,10,330,40,0,'rgba(20,30,60,.35)');
  fillRR(-260,-420,520,430,8,'#a8342a');for(let i=0;i<6;i++)line(-260,-380+i*70,260,-380+i*70,4,'rgba(60,10,10,.35)');poly([-300,-410,0,-560,300,-410],'#5a5f6a');
  fillRR(-180,-330,140,120,6,'#ffd98a');glow(-110,-270,300,`rgba(${FF.lamp},1)`,.5);fillRR(40,-300,150,300,6,'#6e2a22');circ(160,-150,10,'#e0c070');ctx.restore();}
// looking straight down the hole: o.sole 0..1
function holeView(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,'#2c3f52'],[1,'#1a2633']]);ctx.fillRect(-400,-400,1880,2720);
  for(let i=0;i<30;i++)line(hash(i)*1300-100,hash(i+4)*1900,hash(i)*1300+60+hash(i+9)*90,hash(i+4)*1900+40,3,'rgba(200,225,245,.18)');
  const cx=540,cy=1000,R=330;circ(cx,cy,R+60,'#b9d5e8');circ(cx,cy,R+30,'#7fa9c4');circ(cx,cy,R,'#071320');
  ctx.save();ctx.beginPath();ctx.arc(cx,cy,R,0,7);ctx.clip();glow(cx+40,cy-30,R*1.2,'rgba(200,235,255,1)',.25);
  const s=o.sole??0;if(s>0){ctx.save();ctx.globalAlpha=s;ctx.translate(cx+10,cy+20);ctx.rotate(.2);ell(0,40,130,240,0,'#c8d3da');ell(0,-150,112,120,0,'#d6dfe5');
    for(let i=0;i<8;i++)fillRR(-90,-240+i*58,180,22,8,'#93a2ad');ctx.restore();}
  ctx.fillStyle='rgba(10,30,50,.3)';ctx.fillRect(cx-R,cy-R,2*R,2*R);ctx.restore();
  beam(560,-80,Math.PI,1250,330,.18,'255,247,214');}
function knife(x,y,s,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);fillRR(-14,0,28,90,10,'#2b2f3a');poly([-14,0,14,0,10,-150,-14,-120],'#dfe6ee');line(-6,-10,-6,-110,3,'rgba(255,255,255,.7)');ctx.restore();}
