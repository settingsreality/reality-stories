// ===================== Witch Window =====================
const FSTARS=(()=>{const R=rng(19),a=[];for(let i=0;i<500;i++)a.push([R()*3600-800,R()*900-500,.5+R()*1.4,.2+R()*.7]);return a;})();
// the tilted window itself, in local coords (centered, rotated 45 deg). o.open slides the lower sash; o.lit
function tiltedWindow(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(-Math.PI/4);ctx.scale(s,s);
  fillRR(-130,-200,260,400,6,'#e8e4da');const glass=o.lit?'#ffcf8a':(o.glass||'#0b0f16');fillRR(-110,-180,220,170,3,glass);fillRR(-110,10,220,170,3,glass);
  if(o.open){ctx.fillStyle='#000';ctx.fillRect(-110,10,220,170*o.open);fillRR(-120,10+170*o.open-6,240,12,3,'#e8e4da');}
  line(0,-180,0,-10,6,'#e8e4da');line(0,10,0,180,6,'#e8e4da');line(-110,0,110,0,10,'#e8e4da');if(o.lit)glow(0,0,300,'rgba(255,200,130,1)',.4);ctx.restore();}
// the farmhouse at night, from the field
function farmhouse(cam,t,o){wl(cam,.25,()=>{const g=ctx.createLinearGradient(0,-600,0,700);g.addColorStop(0,'#03050b');g.addColorStop(1,'#141c2c');ctx.fillStyle=g;ctx.fillRect(-1600,-1200,5120,2800);for(const[x,y,r,a]of FSTARS)circ(x,y,r,'#e9eefc',a);circ(1450,60,40,'#ece6d6');glow(1450,60,200,'rgba(240,235,220,1)',.3);});
  wl(cam,1,()=>{ctx.fillStyle='#0a0d10';ctx.fillRect(-900,780,3720,900);
    // barn on the left
    poly([-300,780,-300,420,-100,280,100,420,100,780],'#3a1c18');fillRR(-160,560,120,220,4,'#2a1410');
    // house: clapboard, main gable, and the ell with the tilted window under the roofline
    const hx=900;fillRR(hx-300,330,600,450,4,'#cfcbc2');for(let y=340;y<780;y+=26)line(hx-300,y,hx+300,y,2,'rgba(0,0,0,.08)');poly([hx-330,340,hx+330,340,hx,90],'#2a2c30');
    fillRR(hx+300,470,420,310,4,'#c6c2b8');for(let y=480;y<780;y+=26)line(hx+300,y,hx+720,y,2,'rgba(0,0,0,.08)');poly([hx+290,480,hx+740,480,hx+300,250],'#2a2c30');
    for(const[wx,wy]of[[hx-180,440],[hx+80,440],[hx-180,620],[hx+80,620]])fillRR(wx,wy,100,140,3,'#1a1e26');fillRR(hx-40,640,80,140,3,'#3a2a20');
    tiltedWindow(hx+300,400,.42,{lit:o.lit,open:o.open});
    if(o.face){const f=o.face;ctx.save();ctx.translate(hx+300,400);ctx.rotate(-Math.PI/4);ctx.globalAlpha=f;ell(0,40,22,60,0,'#d9d6cc');ctx.restore();}
    if(o.you)YOU(Object.assign({h:220,eyes:1},o.you));});
  vignA(.4);}
// inside: your bedroom, the slanted wall and the window in it
function bedroomW(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#2a2622';ctx.fillRect(-900,-600,3720,2280);
  // sloped ceiling on the right
  poly([700,-600,2820,-600,2820,700],'#221e1b');line(700,-600,2820,700,8,'#1a1714');
  ctx.fillStyle='#1d1a17';ctx.fillRect(-900,900,3720,800);
  // the window: night outside, moonlight in
  const wx=1420,wy=200;const g=ctx.createLinearGradient(wx,wy,wx-600,wy+800);g.addColorStop(0,'rgba(160,180,220,.25)');g.addColorStop(1,'rgba(160,180,220,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(wx-60,wy-60);ctx.lineTo(wx+60,wy+60);ctx.lineTo(wx-200,wy+900);ctx.lineTo(wx-700,wy+900);ctx.fill();
  tiltedWindow(wx,wy,.9,{glass:'#0d1626',open:o.open||0});
  if(o.face){const a=o.face;ctx.save();ctx.translate(wx,wy);ctx.rotate(-Math.PI/4);ctx.globalAlpha=a;ctx.save();ctx.beginPath();ctx.rect(-100,-170,200,350);ctx.clip();ell(0,-20,58,150,0,'#d9d6cc');ell(-22,-60,10,22,0,'#141210');ell(22,-60,10,22,0,'#141210');line(-16,40,16,40,4,'#5a554c');ctx.restore();ctx.restore();
    if(o.scratch){for(let i=0;i<4;i++){const k=(t*3+i*.25)%1;line(wx-90+i*14,wy+80-k*30,wx-80+i*14,wy+40-k*30,3,`rgba(217,214,204,${a*.7})`);}}}
  // the long thing coming in, sideways
  if(o.enter){const k=o.enter;ctx.save();ctx.translate(wx-40,wy+60);ctx.rotate(Math.PI*.75);ctx.translate(-200+k*520,0);ctx.fillStyle='#d9d6cc';ctx.beginPath();ctx.ellipse(0,0,240,46,0,0,7);ctx.fill();ell(220,0,60,40,0,'#d9d6cc');ell(240,-12,8,14,0,'#141210');ell(240,12,8,14,0,'#141210');
    for(const s of[-1,1])line(-60,s*30,-260,s*90,14,'#d9d6cc');ctx.restore();}
  // bed and you
  fillRR(-100,680,780,90,16,'#3a4458');fillRR(-100,640,780,50,20,'#5a6478');fillRR(-140,500,46,400,10,'#2a2420');line(-80,770,-80,900,14,'#2a2420');line(660,770,660,900,14,'#2a2420');
  if(o.you)YOU(Object.assign({h:400,eyes:1},o.you));else{circ(0,620,40,'#111317');ell(-12,598,40,20,-.2,PAL.orange);}});
  vignA(.45);}
// the old man on his porch, and the old photo
function porchTalk(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#8a8f96';ctx.fillRect(-900,-600,3720,2280);const g=ctx.createLinearGradient(0,-600,0,800);g.addColorStop(0,'#b9c6d6');g.addColorStop(1,'#e8dcc8');ctx.fillStyle=g;ctx.fillRect(-900,-600,3720,1400);
  fillRR(-900,500,1900,400,4,'#cfcbc2');for(let y=510;y<900;y+=26)line(-900,y,1000,y,2,'rgba(0,0,0,.08)');ctx.fillStyle='#5a4a3a';ctx.fillRect(-900,860,3720,60);ctx.fillStyle='#6a7a50';ctx.fillRect(1000,900,1820,800);ctx.fillStyle='#4a3a2a';ctx.fillRect(-900,900,1900,800);
  line(40,860,40,380,14,'#e8e4da');line(960,860,960,380,14,'#e8e4da');
  person({x:420,y:900,h:400,face:1,body:'#5a4a3a',legs:'#2a2622',head:'#c9a88a',hair:'#d9d6cc',hand:'#c9a88a',legA:[1.45,1.45],legB:[.1,.05],lift:110,lean:.05});fillRR(330,700,160,30,6,'#4a3424');
  YOU({x:800,y:900,h:400,face:-1,eyes:1});});}
function photo(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#14110e';ctx.fillRect(-900,-600,3720,2280);ctx.save();ctx.translate(960,540);ctx.rotate(.03);fillRR(-520,-360,1040,720,6,'#e8dfcc');ctx.save();ctx.beginPath();ctx.rect(-480,-320,960,560);ctx.clip();ctx.filter='sepia(1) contrast(1.1)';
    ctx.fillStyle='#bfb39a';ctx.fillRect(-480,-320,960,560);ctx.fillStyle='#d8ceb6';ctx.fillRect(-480,-320,960,300);poly([-480,-20,480,-20,480,240,-480,240],'#a89a80');
    tiltedWindow(80,-130,.5,{glass:'#2a241c',open:o.open??.8});
    // the coffin sliding out, on ropes
    const k=o.k??0;ctx.save();ctx.translate(80+k*-120,-60+k*180);ctx.rotate(-Math.PI/4);fillRR(-40,-140,80,280,8,'#5a4632');ctx.restore();line(-40,-300,80+k*-120,-60+k*180,3,'#4a3c2a');line(260,-300,80+k*-120,-60+k*180,3,'#4a3c2a');
    for(const x of[-300,-200,350])person({x,y:220,h:200,face:x<0?1:-1,body:'#4a4030',legs:'#2a241c',head:'#8a7a62',hair:'#3a3020',hand:'#8a7a62'});
    ctx.filter='none';ctx.restore();text('1961',-460,300,'italic 400 44px IS','#5a4a32','left');ctx.restore();});}
function vignA(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
