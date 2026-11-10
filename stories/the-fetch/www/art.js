// ===================== The Fetch: places and things (v2, 1080x1920) =====================
const FC={wall0:'#1a2233',wall1:'#0f1522',gold:'#ffc93c',red:'#ff4d3d',mint:'#5cf2a2',cream:'#f1ebdd',scr:'#bfe3ff',pale:'#cfe0ee'};
function me(o){toon(Object.assign({jacket:'#3b4f7a',pants:'#1a1f2b',hat:'beanie',hatCol:'#f0683f',skin:'#e9b896',browCol:'#4a2e1f',stripe:false},o));}
// the fetch: exactly me, but too still, eyes all white, a calm little smile, a cold rim light
function fetchMe(o){const h=o.h||600;ctx.save();ctx.globalCompositeOperation='lighter';glow(o.x,o.y-.6*h,h*.75,'rgba(150,200,255,1)',.16*(o.aura??1));ctx.restore();
  me(Object.assign({brow:'flat',mouth:'smile',look:{x:0,y:0}},o));
  if(o.eyes!==0){const f=o.face||0,hx=o.x+f*.04*h,hy=o.y+(o.bob||0)-.83*h;for(const s of[-1,1]){const ex=hx+s*.062*h+f*.03*h,ey=hy-.005*h;ell(ex,ey,.041*h,.051*h,0,'#f4fbff');glow(ex,ey,.09*h,'rgba(200,235,255,1)',.5);}}}
// gran: grey bun, cardigan
function gran(o){const h=o.h||600;toon(Object.assign({jacket:'#8a4a5c',pants:'#2a2230',hat:null,skin:'#efc4a4',browCol:'#9a9a9a',stripe:false,mouth:'smile'},o));
  const f=o.face||0,hx=o.x+f*.04*h,hy=o.y-.83*h;ctx.fillStyle='#d9d6d0';ctx.beginPath();ctx.arc(hx,hy-.02*h,.175*h,Math.PI*1.05,Math.PI*1.95);ctx.fill();circ(hx,hy-.2*h,.06*h,'#d9d6d0');
  ctx.strokeStyle='#3a3a40';ctx.lineWidth=.008*h;for(const s of[-1,1]){ctx.beginPath();ctx.arc(hx+s*.062*h,hy-.005*h,.05*h,0,7);ctx.stroke();}}
// dark bedroom: wall, window (yard behind), bed, dresser
function bedroom(t,o={}){ctx.fillStyle=vgrad(-100,2000,[[0,FC.wall0],[1,FC.wall1]]);ctx.fillRect(-200,-200,1480,2400);
  ctx.fillStyle='#0b0f17';ctx.fillRect(-200,1380,1480,800);
  if(o.window!==false)win(o.wx??540,o.wy??560,o.ww??420,o.wh??520,t,o);
  // bed
  fillRR(-60,1180,760,330,30,'#2b3550');fillRR(-60,1150,760,90,30,'#3a4767');fillRR(-60,1000,120,520,20,'#3a2a22');
  fillRR(40,1080,260,120,50,'#d8dde6');
  // dresser
  if(o.dresser!==false){fillRR(760,1120,300,300,10,'#3a2a22');for(let i=0;i<3;i++)fillRR(780,1150+i*88,260,72,6,'#4a3528');}}
function win(x,y,w,h,t,o={}){fillRR(x-w/2-24,y-h/2-24,w+48,h+48,10,'#c9c2b4');
  ctx.save();rr(x-w/2,y-h/2,w,h,4);ctx.clip();ctx.fillStyle=vgrad(y-h/2,y+h/2,[[0,'#06101e'],[1,'#10233a']]);ctx.fillRect(x-w/2,y-h/2,w,h);
  const R=rng(5);for(let i=0;i<25;i++)circ(x-w/2+R()*w,y-h/2+R()*h*.5,R()*2+1,'#dfe8ff',.7);
  ctx.fillStyle='#0a1a12';ctx.fillRect(x-w/2,y+h*.18,w,h);for(let i=0;i<6;i++)circ(x-w/2+i*w/5,y+h*.18,40+hash(i)*30,'#0c2016');
  if(o.figure)o.figure(x,y,w,h);
  ctx.restore();line(x,y-h/2,x,y+h/2,14,'#c9c2b4');line(x-w/2,y,x+w/2,y,14,'#c9c2b4');
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(180,210,255,.05)';poly([x-w/2+20,y-h/2,x-w/2+90,y-h/2,x-w/2+20,y-h/2+120],'rgba(220,235,255,.12)');ctx.restore();}
// phone with a screen; fn(sx,sy,sw,sh) draws the screen contents in screen space
function phone(x,y,s,fn,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(o.r||0);
  if(o.lit!==false){ctx.save();ctx.globalCompositeOperation='lighter';glow(0,0,520,'rgba(150,200,255,1)',.22*(o.lit??1));ctx.restore();}
  fillRR(-190,-380,380,760,58,'#0d0f14');fillRR(-176,-366,352,732,48,'#20242c');
  ctx.save();rr(-168,-358,336,716,42);ctx.clip();ctx.fillStyle=o.bg||'#0b1830';ctx.fillRect(-168,-358,336,716);fn(-168,-358,336,716);ctx.restore();
  fillRR(-52,-346,104,24,12,'#000');ctx.restore();}
// face-scan glyph: corners + a face; st: 'ok' | 'bad' | 'scan'
function faceGlyph(x,y,r,st,t){const c=st==='ok'?FC.mint:st==='bad'?FC.red:'#ffffff';ctx.strokeStyle=c;ctx.lineWidth=r*.09;ctx.lineCap='round';
  for(const[sx,sy]of[[-1,-1],[1,-1],[-1,1],[1,1]]){ctx.beginPath();ctx.moveTo(x+sx*r,y+sy*r*.45);ctx.lineTo(x+sx*r,y+sy*r);ctx.lineTo(x+sx*r*.45,y+sy*r);ctx.stroke();}
  if(st==='bad'){line(x-r*.4,y-r*.4,x+r*.4,y+r*.4,r*.1,c);line(x+r*.4,y-r*.4,x-r*.4,y+r*.4,r*.1,c);return;}
  circ(x-r*.25,y-r*.2,r*.07,c);circ(x+r*.25,y-r*.2,r*.07,c);ctx.beginPath();ctx.arc(x,y+r*.05,r*.3,.3,Math.PI-.3);ctx.stroke();
  if(st==='scan'){const yy=y-r+fract(t*1.2)*2*r;line(x-r,yy,x+r,yy,r*.04,'rgba(255,255,255,.6)');}}
function bubble(x,y,w,txt,o={}){ctx.font=o.font||'800 40px MS';const words=txt.split(' ');const lines=[];let cur='';for(const wd of words){const tt=cur?cur+' '+wd:wd;if(ctx.measureText(tt).width>w-60&&cur){lines.push(cur);cur=wd;}else cur=tt;}lines.push(cur);
  const lh=o.lh||50,h=lines.length*lh+40;const bx=o.right?x-w:x;ctx.globalAlpha=o.a??1;fillRR(bx,y,w,h,28,o.bg||'#2f80ff');lines.forEach((s,k)=>text(s,bx+30,y+20+lh*.78+k*lh,o.font||'800 40px MS',o.col||'#fff','left',o.a??1));ctx.globalAlpha=1;return h;}
// ---------- rules card ----------
const RULES=[["SEE IT IN THE MORNING:","A LONG LIFE."],["SEE IT AT NIGHT:","DON'T LOOK BACK."]];
function rulesCard(t,o={}){fillAll('#0b0b10');glow(280,1680,520,'rgba(150,200,255,1)',.12);ctx.save();ctx.translate(540,o.cy??760);ctx.scale(o.s??1,o.s??1);ctx.rotate(-.025);ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-430,820,860,16);ctx.fill();
  fillRR(-410,-440,820,860,14,FC.cream);for(let k=0;k<15;k++)line(-380,-290+k*48,380,-290+k*48,2,'rgba(90,120,170,.14)');ctx.globalAlpha=.75;fillRR(-330,-465,150,48,4,'#d8ceb0');fillRR(180,-465,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text("GRAN'S RULES",-330,-320,'900 76px MS','#1b1d23','left');line(-330,-296,190,-304,7,'#1b1d23');text('(for the fetch)',-330,-236,'700 34px MS','#5d5f66','left');
  for(let r=0;r<2;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-120+r*250;ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),220);ctx.clip();text(`${r+1}.`,-330,y0,'900 56px MS','#1b1d23','left');
    RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*66,'800 46px MS',j===1?(r===1?'#a3261b':'#1d6b3e'):'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(20,y0+40,420,120,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— Gran',280,370,'800 40px MS','#3b3d44');ctx.restore();}
