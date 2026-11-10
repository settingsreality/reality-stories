// ===================== Only a Test: places and things (v2, 1080x1920) =====================
const OT={gold:'#ffc93c',red:'#ff4d3d',mint:'#5cf2a2',cream:'#f1ebdd',sand:'#5b5246',sandD:'#3d372f',sea:'#123a55',night0:'#070b18',night1:'#18223e'};
function me(o){toon(Object.assign({jacket:'#2f5d50',pants:'#1a1f2b',hat:'beanie',hatCol:'#f0683f',skin:'#e9b896',browCol:'#4a2e1f',stripe:false},o));}
function mom(o){toon(Object.assign({jacket:'#d98aa6',pants:'#d98aa6',boots:'#e9b896',hat:null,skin:'#e3b08c',browCol:'#5a3a2a',stripe:false},o));
  const h=o.h||600,f=o.face||0,hx=o.x+f*.04*h,hy=o.y-.83*h;ctx.fillStyle='#6a3f2a';ctx.beginPath();ctx.arc(hx,hy-.02*h,.18*h,Math.PI*1.0,Math.PI*2.0);ctx.fill();if(o.back)circ(hx,hy,.17*h,'#6a3f2a');}
// a tiny townsperson (back view by default): pajama colours from seed
function walker(x,y,h,seed,o={}){const R=rng(seed);const cols=['#7aa0c8','#c87a7a','#8fc87a','#c8b87a','#a58ac8','#d0d0d0','#6f8fa8'];const c=cols[Math.floor(R()*cols.length)];
  const ph=o.walk!=null?o.walk+R()*6:null;const bob=ph!=null?Math.abs(Math.sin(ph))*h*.03:0;ctx.save();ctx.translate(x,y-bob);
  for(const s of[-1,1]){const sw=ph!=null?Math.sin(ph+(s>0?Math.PI:0))*h*.06:0;line(s*h*.05,-h*.42,s*h*.05+sw,-h*.02,h*.08,shade(c,-.2));circ(s*h*.05+sw,-h*.02,h*.04,'#e3b08c');}
  fillRR(-h*.14,-h*.8,h*.28,h*.42,h*.1,c);circ(0,-h*.9,h*.12,o.face?'#e3b08c':['#2a1d14','#6a3f2a','#c9c2b4','#1a1a1a'][Math.floor(R()*4)]);
  if(o.face){circ(-h*.04,-h*.91,h*.018,'#111');circ(h*.04,-h*.91,h*.018,'#111');if(o.glint)glow(0,-h*.91,h*.3,'rgba(255,240,200,1)',.3*o.glint);}
  ctx.restore();}
// the siren tower: pole, cluster of horns, solar panel. x,y = base; s scale; on = glow 0..1; wail = red
function tower(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  line(0,0,0,-560,22,'#8d939c');line(-6,0,-6,-560,4,'rgba(255,255,255,.25)');
  poly([18,-420,150,-470,150,-360,18,-380],'#29323d');poly([24,-414,144,-460,144,-370,24,-386],'#3a5f8f');
  fillRR(-70,-640,140,90,16,'#c9ced6');for(let i=0;i<4;i++){const a=-Math.PI/2+(i-1.5)*.55;ctx.save();ctx.translate(0,-600);ctx.rotate(a+Math.PI/2);poly([-26,-40,26,-40,60,-150,-60,-150],'#e2e6ec');ell(0,-150,60,14,0,'#5d636d');ctx.restore();}
  fillRR(-40,-700,80,60,10,'#aab1bb');
  const on=o.on??0;if(on>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(0,-640,420,o.wail?'rgba(255,60,40,1)':'rgba(255,220,140,1)',.45*on);ctx.restore();
    for(let i=0;i<4;i++){const q=fract(t*(o.wail?1.4:.5)+i/4);ctx.strokeStyle=o.wail?`rgba(255,90,70,${on*(1-q)})`:`rgba(255,220,140,${.8*on*(1-q)})`;ctx.lineWidth=10*(1-q)+2;ctx.beginPath();ctx.arc(0,-640,80+q*520,-Math.PI*.95,-Math.PI*.05);ctx.stroke();}}
  ctx.restore();}
function notes(x,y,t,n,a=1,col='#ffc93c',sp=.35){for(let i=0;i<n;i++){const q=fract(t*sp+i/n);const xx=x+Math.sin(q*6+i)*80+i*30-n*15,yy=y-q*420;ctx.globalAlpha=a*(1-q)*Math.min(1,q*5);ctx.font='900 70px MS';ctx.fillStyle=col;ctx.textAlign='center';ctx.fillText(i%2?'♪':'♫',xx,yy);}ctx.globalAlpha=1;}
// the bay from up the hill: sky, far sea, seabed (exposed by `ret` 0..1), town rooftops at the bottom
function bay(t,o={}){const ret=o.ret??0;const sky=o.day?[[0,'#7fc0f0'],[1,'#ffe6b5']]:[[0,OT.night0],[1,OT.night1]];ctx.fillStyle=vgrad(-100,760,sky);ctx.fillRect(-200,-200,1480,980);
  if(!o.day){const R=rng(11);for(let i=0;i<80;i++)circ(R()*1080,R()*600,R()*2+.6,'#dfe8ff',.4+.4*Math.sin(t+i));circ(860,190,46,'#efe8d4');glow(860,190,240,'rgba(240,230,200,1)',.25);}
  else{circ(860,170,80,'#fff4c8');glow(860,170,280,'rgba(255,240,180,1)',.5);}
  const hz=760;poly([-200,hz-40,120,hz-120,300,hz-70,420,hz-30,-200,hz],o.day?'#4d7a5a':'#0c1622');poly([1280,hz-60,940,hz-160,760,hz-60,660,hz,1280,hz],o.day?'#4d7a5a':'#0c1622');
  const shore=lerp(hz+380,hz+20,ret);
  ctx.fillStyle=o.day?'#2f78a8':OT.sea;ctx.fillRect(-200,hz,1480,1400);
  ctx.fillStyle=vgrad(shore,hz+900,[[0,o.day?'#a8936f':OT.sand],[1,o.day?'#8a7553':OT.sandD]]);ctx.fillRect(-200,shore,1480,1600);
  ctx.strokeStyle=o.day?'rgba(255,255,255,.7)':'rgba(170,220,255,.5)';ctx.lineWidth=5;ctx.beginPath();for(let x=-200;x<=1280;x+=20){const yy=shore+Math.sin(x*.02+t*1.2)*5;x===-200?ctx.moveTo(x,yy):ctx.lineTo(x,yy);}ctx.stroke();
  if(ret>.3){const R=rng(4);ctx.globalAlpha=clamp((ret-.3)*2);for(let i=0;i<5;i++){const bx=100+R()*880,by=lerp(shore,hz+600,R());ctx.save();ctx.translate(bx,by);ctx.rotate(.2*(R()-.5));poly([-50,0,50,0,36,18,-36,18],'#c9ced6');line(0,0,0,-60,4,'#8d939c');ctx.restore();}
    for(let i=0;i<30;i++){const rx=R()*1080,ry=lerp(shore+20,hz+700,R());ell(rx,ry,8+R()*20,4+R()*6,0,'rgba(20,18,15,.5)');}ctx.globalAlpha=1;}
  if(o.town!==false){const by=o.townY??1500;for(let i=0;i<9;i++){const x=-40+i*140,h=120+hash(i)*90;poly([x,by,x,by-h,x+65,by-h-60,x+130,by-h,x+130,by],o.day?'#c9b8a0':'#141b2a');if(!o.day&&hash(i*3)>.4)fillRR(x+40,by-h+30,40,40,4,'#ffd9a0');}ctx.fillStyle=o.day?'#6e6a63':'#0d1220';ctx.fillRect(-200,by,1480,800);}
  return shore;}
// ---------- rules card (on the fridge) ----------
const RULES=[["CHIMES","= TEST."],["A WAIL","= WALK UPHILL."],["NEVER GO DOWN","TO LOOK AT THE WATER."]];
function rulesCard(t,o={}){fillAll('#c9ccd0');for(let i=0;i<9;i++)line(0,i*240,1080,i*240,2,'rgba(0,0,0,.05)');ctx.save();ctx.translate(540,o.cy??800);ctx.scale(o.s??1,o.s??1);ctx.rotate(.02);ctx.fillStyle='rgba(0,0,0,.25)';rr(-395,-460,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,OT.cream);for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');circ(-300,-470,34,'#e0362a');circ(300,-470,34,'#2a7ae0');
  text("MOM'S RULES",-330,-360,'900 76px MS','#1b1d23','left');line(-330,-336,190,-344,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-245+r*205;ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),210);ctx.clip();text(`${r+1}.`,-330,y0,'900 52px MS','#1b1d23','left');
    RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*58,'800 44px MS',j===RULES[r].length-1?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+30,420,110,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— Mom x',290,430,'800 40px MS','#3b3d44');ctx.restore();}
