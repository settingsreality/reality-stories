// ===================== Dead Pixel: places and things (v2, 1080x1920) =====================
const DP={wall:'#3f6d68',wallD:'#25443f',floor:'#2c2f3a',bench:'#6b4a33',benchT:'#8a6244',lamp:'255,214,150',red:'#ff4d3d',led:'#5cf2a2',amber:'#ffc93c',white:'#f4fbff',glove:'#2b5fd0'};
function T2(s,x,y,size,col='#fff',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
// THE SQUARE: perfectly flat black, sharp, no shading, a thin RGB fringe, little dead cells crawling off its edge
function deadSq(cx,cy,S,t,o={}){const f=Math.max(2,S*.012),h=S/2,q=Math.floor(t*9);ctx.save();ctx.globalAlpha=o.a??1;
  if(S>60){ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,40,50,.75)';ctx.fillRect(cx-h-f,cy-h,S,S);ctx.fillStyle='rgba(40,120,255,.75)';ctx.fillRect(cx-h+f,cy-h,S,S);ctx.fillStyle='rgba(50,255,120,.5)';ctx.fillRect(cx-h,cy-h-f,S,S+f*2);ctx.restore();}
  ctx.fillStyle='#000';ctx.fillRect(cx-h,cy-h,S,S);
  if(S>120){const c=S/16;for(let i=0;i<18;i++){const a=hash(i+q*.37),side=Math.floor(hash(i*3.3+q)*4),u=(hash(i*7.1+q*.7)-.5)*S,d=c*Math.floor(hash(i*1.9+q*.3)*2.2);let x=cx,y=cy;if(side===0){x=cx-h-d-c/2;y=cy+u;}if(side===1){x=cx+h+d+c/2;y=cy+u;}if(side===2){y=cy-h-d-c/2;x=cx+u;}if(side===3){y=cy+h+d+c/2;x=cx+u;}
    ctx.fillStyle=a>.6?'#000':a>.45?'rgba(255,50,60,.9)':a>.3?'rgba(60,230,120,.9)':'rgba(60,130,255,.9)';ctx.fillRect(Math.round((x-c/2)/c)*c,Math.round((y-c/2)/c)*c,c,c);}}
  ctx.restore();}
function me(o){toon(Object.assign({jacket:'#3f5f8a',hat:'beanie',hatCol:'#f0683f',tag:'REPAIR\nTECH',skin:'#e9b896',browCol:'#4a2e1f',pants:'#232634',stripe:false},o));}
function wrench(x,y,s,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);const c='#e3e8f1',d='#97a1b3';fillRR(-20,-120,40,250,12,c);fillRR(-7,-105,14,220,6,d);
  ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(-58,-210);ctx.lineTo(-24,-210);ctx.lineTo(-24,-160);ctx.lineTo(24,-160);ctx.lineTo(24,-210);ctx.lineTo(58,-210);ctx.lineTo(58,-140);ctx.quadraticCurveTo(40,-96,0,-96);ctx.quadraticCurveTo(-40,-96,-58,-140);ctx.closePath();ctx.fill();
  ctx.beginPath();ctx.arc(0,145,44,0,7);ctx.fill();circ(0,145,20,'#3a4050');ctx.restore();}
// the shop: lit wall, pegboard, shelf of phones, TV, door, the bench along the bottom
function shop(t,o={}){const L=o.light??1;ctx.fillStyle=vgrad(0,1500,[[0,DP.wallD],[.55,DP.wall],[1,'#335a56']]);ctx.fillRect(-300,-200,1680,1800);
  glow(300,1000,1000,`rgba(${DP.lamp},1)`,.28*L);
  // pegboard
  fillRR(70,480,470,430,12,'#7a5a3f');for(let i=0;i<10;i++)for(let j=0;j<9;j++)circ(100+i*46,510+j*46,4,'#4a3525');
  wrenchSil(170,700);line(280,540,280,830,16,'#c8d0dc');fillRR(262,520,36,70,8,'#d2402f');line(370,540,370,780,12,'#c8d0dc');fillRR(354,520,32,80,8,'#2f6fd2');ctx.fillStyle='#d9d9d9';ell(460,620,44,44,0,'#c9ccd2');circ(460,620,20,'#7a5a3f');
  // door with frame, 2 m tall: the scale for the square
  if(!o.noDoor){fillRR(790,700,250,960,10,'#1f2b33');fillRR(808,716,214,940,6,'#46535c');fillRR(830,740,170,360,6,'#8fb4c8');if(!o.noOpen)T2('OPEN',915,800,44,'#c8322a',{w:900});circ(840,1240,16,'#e0c070');}
  // shelf with phones
  fillRR(70,960,470,18,4,'#4a3525');for(let i=0;i<7;i++){fillRR(90+i*64,870,50,90,8,'#14161c');fillRR(95+i*64,876,40,76,4,i%3==1?'#4a7aa0':'#2d3644');}
  // floor
  ctx.fillStyle=vgrad(1560,1980,[[0,'#3a3e4b'],[1,'#1c1e27']]);ctx.fillRect(-300,1600,1680,800);fillRR(-300,1592,1680,14,0,'#1f2029');}
function wrenchSil(x,y){fillRR(x-11,y-90,22,190,8,'#c8d0dc');circ(x,y-104,32,'#c8d0dc');fillRR(x-12,y-142,24,40,4,'#7a5a3f');circ(x,y+100,26,'#c8d0dc');circ(x,y+100,11,'#7a5a3f');}
function bench(y,t,o={}){fillRR(-200,y,1480,40,6,DP.benchT);fillRR(-200,y+36,1480,900,0,DP.bench);ctx.save();ctx.globalAlpha=.6;for(let i=0;i<16;i++)line(-200,y+70+i*50,1280,y+70+i*50,3,'#4f3524');ctx.restore();}
function lampHead(x,y,t){line(x,y-200,x,y-40,14,'#2a2d36');poly([x-120,y+30,x+120,y+30,x+50,y-60,x-50,y-60],'#d9a23a');glow(x,y+100,420,`rgba(${DP.lamp},1)`,.5);}
// wallpaper seen on all the screens
function wall(x,y,w,h){const g=ctx.createLinearGradient(0,y,0,y+h);g.addColorStop(0,'#3a56c8');g.addColorStop(.55,'#b65aa8');g.addColorStop(1,'#ffb66a');ctx.fillStyle=g;ctx.fillRect(x,y,w,h);circ(x+w*.3,y+h*.62,w*.09,'#fff1c8');
  ctx.fillStyle='#2a2257';ctx.beginPath();ctx.moveTo(x,y+h);ctx.lineTo(x,y+h*.8);ctx.lineTo(x+w*.3,y+h*.66);ctx.lineTo(x+w*.55,y+h*.8);ctx.lineTo(x+w*.8,y+h*.62);ctx.lineTo(x+w,y+h*.76);ctx.lineTo(x+w,y+h);ctx.closePath();ctx.fill();}
const DOT=[.62,.34];
function phoneBig(cx,cy,h,t,o={}){const w=h*.49,x=cx-w/2,y=cy-h/2,r=h*.075;fillRR(x-h*.014,y-h*.014,w+h*.028,h*1.028,r,'#2a2d36');fillRR(x,y,w,h,r*.8,'#0a0b0f');ctx.save();rr(x+h*.012,y+h*.012,w-h*.024,h-h*.024,r*.7);ctx.clip();
  if(o.off){ctx.fillStyle='#0c0e14';ctx.fillRect(x,y,w,h);}else if(o.chat){ctx.fillStyle='#1b2c48';ctx.fillRect(x,y,w,h);}else wall(x,y,w,h);
  if(!o.off&&!o.chat){T2('23:47',cx,y+h*.14,h*.075,'#fff',{w:800});}ctx.restore();
  if(o.dot){const s=o.dot;ctx.fillStyle='#000';ctx.fillRect(x+w*DOT[0]-s/2,y+h*DOT[1]-s/2,s,s);}}
function screenSet(x,y,w,h,o={}){fillRR(x-16,y-16,w+32,h+32,12,'#15171f');if(o.off){ctx.fillStyle='#0b0c12';ctx.fillRect(x,y,w,h);}else wall(x,y,w,h);const s=o.dot??14;ctx.fillStyle='#000';ctx.fillRect(x+w*DOT[0]-s/2,y+h*DOT[1]-s/2,s,s);
  if(o.off){ctx.strokeStyle='rgba(255,60,50,.9)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(x+w*DOT[0],y+h*DOT[1],s*1.6,0,7);ctx.stroke();ctx.fillStyle='#000';}
  if(o.ring>0){ctx.strokeStyle=DP.red;ctx.lineWidth=9;ctx.beginPath();ctx.arc(x+w*DOT[0],y+h*DOT[1],lerp(170,48,o.ring),0,7);ctx.stroke();}}
// subpixels: a lit RGB grid, one cell dead
function subpix(k,t){fillAll('#05060a');const c=lerp(70,150,k),n=9;ctx.save();ctx.translate(540,800);for(let j=-n;j<=n;j++)for(let i=-n;i<=n;i++){if(i===0&&j===0)continue;const x=i*c,y=j*c,b=c*.28;for(let s=0;s<3;s++){fillRR(x-c*.42+s*c*.3,y-c*.4,b,c*.8,4,['#ff3a44','#3cf07e','#3a7aff'][s]);}}ctx.fillStyle='#000';ctx.fillRect(-c*.5,-c*.5,c,c);ctx.restore();}
function hair(x0,y0,x1,y1,a){ctx.save();ctx.globalAlpha=a;ctx.strokeStyle='#3b2416';ctx.lineWidth=46;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x0,y0);ctx.quadraticCurveTo((x0+x1)/2+60,(y0+y1)/2-90,x1,y1);ctx.stroke();ctx.strokeStyle='rgba(180,130,90,.5)';ctx.lineWidth=8;ctx.stroke();ctx.restore();}
function polaroid(x,y,s,rot,t){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);fillRR(-150,-185,300,370,6,'#efeadf');fillRR(-128,-162,256,256,2,'#5a7a78');ctx.save();rr(-128,-162,256,256,2);ctx.clip();toon({x:0,y:160,h:300,jacket:'#7a4a3a',hat:'cap',hatCol:'#2f6fd2',skin:'#dcae8c',browCol:'#6a6a6a',beard:'#8a8a8a',mouth:'smile',tag:null,stripe:false});ctx.restore();T2('MARTY',0,138,44,'#1b1d23',{w:900});ctx.restore();}
function phoneBack(cx,cy,s,t){ctx.save();ctx.translate(cx,cy);ctx.rotate(-.06);ctx.scale(s,s);fillRR(-210,-420,420,840,70,'#2d3038');fillRR(-180,-390,150,190,30,'#1b1d23');circ(-105,-340,44,'#0a0b10');circ(-105,-250,44,'#0a0b10');ctx.restore();}
// the repair-ticket rules (each rule gets crossed out as it's broken)
const RULES=[["NEVER PRESS","ON IT."],["NEVER","FEED IT."],["IF SOMETHING COMES","BACK, DON'T READ IT."]];
function ticket(t,o={}){const cy=o.cy??780,s=o.s??1;fillAll('#0a0d12');glow(540,1500,700,`rgba(${DP.lamp},1)`,.12);ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.025);
  fillRR(-396,-466,820,960,14,'rgba(0,0,0,.5)');fillRR(-410,-480,820,960,14,'#ffe9a8');fillRR(-410,-480,820,120,14,'#e0362a');fillRR(-410,-400,820,40,0,'#e0362a');T2('REPAIR TICKET',-360,-420,52,'#fff',{align:'left',w:900});T2('Nº 0001',360,-420,38,'#fff',{align:'right',f:'PM',w:500});
  fillRR(-180,-505,360,50,4,'rgba(210,205,180,.8)');
  for(let k=0;k<13;k++)line(-380,-300+k*52,380,-300+k*52,2,'rgba(160,110,50,.22)');
  text('DEAD PIXEL RULES',-350,-285,'900 58px MS','#1b1d23','left');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-185+r*190;ctx.save();ctx.beginPath();ctx.rect(-400,y0-60,800*clamp(k*1.15),180);ctx.clip();
    text(`${r+1}.`,-350,y0,'900 58px MS','#1b1d23','left');RULES[r].forEach((q,j)=>text(q,-270,y0+j*60,'800 46px MS',j===RULES[r].length-1?'#a3261b':'#1b1d23','left'));ctx.restore();
    const st=o.strike?o.strike[r]:0;if(st>0){const x1=lerp(-380,390,clamp(st));line(-380,y0+18,x1,y0+8,14,'#e0362a');if(st>=.98)T2('BROKEN',300,y0+66,36,'#e0362a',{w:900});}
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+24,398,96,-.02,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— MARTY',-60,410,'800 46px MS','#3b3d44','left');ctx.restore();}
// outside: my street at night, the sky is a pane of glass
const STARS=(()=>{const r=rng(31),a=[];for(let i=0;i<220;i++)a.push([r()*1300-110,r()*1400-100,r()<.08?3:1.6,.3+r()*.6]);return a;})();
function street(t,o={}){ctx.fillStyle=vgrad(-100,1500,[[0,'#0b1236'],[.7,'#1d2a66'],[1,'#44427e']]);ctx.fillRect(-200,-200,1480,1800);for(const[x,y,r,a]of STARS)circ(x,y,r,'#eef3ff',a);circ(250,440,86,'#f4eedb');circ(222,420,16,'#d7cfb8');circ(280,470,22,'#d7cfb8');
  const B=[[-40,1120,240],[190,1020,200],[380,1160,220],[590,980,240],[820,1100,300]];B.forEach(([x,y,w],i)=>{fillRR(x,y,w,900,6,['#1a2040','#212a50','#171d3a','#232c56','#1b2244'][i]);for(let a=0;a<4;a++)for(let b=0;b<7;b++)if(hash(i*9+a*3+b)>.5)fillRR(x+24+a*w/4.4,y+36+b*74,w/8,40,3,'#ffd88a');});
  fillRR(-200,1660,1480,400,0,'#191b24');fillRR(-200,1650,1480,14,0,'#3a3d4a');
  // my shop
  fillRR(90,1270,900,400,8,'#2f3f48');fillRR(90,1230,900,90,8,'#d2402f');T2('SCREEN REPAIR',540,1276,64,'#fff',{w:900});fillRR(150,1360,500,240,6,'#ffe2a8');fillRR(720,1370,190,300,6,'#14181e');deadSq(400,1480,110,t);}
function skyLift(t,k,tool,o={}){const a=lerp(0,980,k),b=lerp(0,1260,k);if(k<=0)return;const Cx=1080,Cy=0,Ax=1080-a,Ay=0,Bx=1080,By=b;
  // backlight behind the pane
  ctx.save();ctx.beginPath();ctx.moveTo(Ax,Ay-400);ctx.lineTo(1500,-400);ctx.lineTo(1500,By+400);ctx.lineTo(Bx,By);ctx.lineTo(Ax,Ay);ctx.closePath();ctx.fillStyle='#fff';ctx.fill();ctx.clip();ctx.fillStyle='#dff3ff';ctx.fillRect(0,-400,1500,2000);for(let i=0;i<30;i++)for(let j=0;j<30;j++){circ(560+i*60,-300+j*60,17,'#ffffff');}ctx.restore();
  // the lifted corner, folded back
  const dx=Bx-Ax,dy=By-Ay,l2=dx*dx+dy*dy,u=((Cx-Ax)*dx+(Cy-Ay)*dy)/l2,px=Ax+u*dx,py=Ay+u*dy,Rx=2*px-Cx,Ry=2*py-Cy;
  poly([Ax,Ay,Bx,By,Rx,Ry],'#2a2f3a');const g=ctx.createLinearGradient(Ax,Ay,Rx,Ry);ctx.save();ctx.globalAlpha=.25;line(lerp(Ax,Rx,.3),lerp(Ay,Ry,.3),lerp(Bx,Rx,.3),lerp(By,Ry,.3),26,'#caa33a');ctx.restore();
  ctx.save();ctx.globalCompositeOperation='lighter';glow((Ax+Bx)/2,(Ay+By)/2,700,'rgba(220,240,255,1)',.45);ctx.restore();
  // the tool, and the gloved fingers holding it
  if(tool>0){const mx=lerp(Ax,Bx,.5),my=lerp(Ay,By,.5),nx=dy/Math.hypot(dx,dy),ny=-dx/Math.hypot(dx,dy),off=lerp(700,-90,tool),tx=mx+nx*off,ty=my+ny*off;const ang=Math.atan2(ny,nx);
    ctx.save();ctx.translate(tx,ty);ctx.rotate(ang);ctx.scale(.55,.55);poly([0,0,620,-70,620,70],'#f28a1e');fillRR(600,-70,500,140,20,'#f2a43e');fillRR(620,-180,200,380,90,DP.glove);fillRR(760,-210,220,420,100,'#2450b0');for(let i=0;i<3;i++)line(640+i*70,-120,640+i*70,120,14,'#1d459c');ctx.restore();}}
// the world being swapped out cell by cell, keep = function(x,y) true where cell stays
function swapCells(k,cx,cy){const c=108;for(let j=-2;j<19;j++)for(let i=-2;i<12;i++){const x=i*c,y=j*c,d=Math.hypot(x-cx,y-cy)/1500,th=d*.72+hash(i*13.1+j*7.3)*.28;if(k>th){ctx.fillStyle='#f4fbff';ctx.fillRect(x,y,c+1,c+1);ctx.strokeStyle='rgba(120,170,220,.35)';ctx.lineWidth=3;ctx.strokeRect(x,y,c,c);}}}
