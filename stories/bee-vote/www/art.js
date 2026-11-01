// ===================== The Bee Vote: art (v2 vertical, How Time Works look) =====================
const U={bg0:'#05070f',bg1:'#0c1430',grid:'rgba(120,150,220,.07)',ink:'#e9edf5',dim:'rgba(233,237,245,.6)',y:'#ffc93c',red:'#ff5a48',grn:'#3ee08a',
  bee:'#f6b81c',beeD:'#1b1608',wing:'rgba(220,240,255,.55)',A:'#3ee08a',B:'#5b8cff',C:'#ff6a4d',wood:'#6b4a2b',woodD:'#4a321c'};
function space(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,o.c0||U.bg0],[1,o.c1||U.bg1]]);ctx.fillRect(-100,-100,1280,2120);
  const s=o.s||90;for(let x=-s;x<1180;x+=s)line(x,-20,x,1940,1.5,U.grid);for(let y=0;y<1940;y+=s)line(-20,y,1100,y,1.5,U.grid);}
function T2(s,x,y,size,col=U.ink,o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px MS`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||U.ink},o));}
function me2(o){toon(Object.assign({jacket:'#2f4f7a',hat:'beanie',hatCol:'#f0683f',stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}
function hexRgb(h){const n=parseInt(h.slice(1),16);return`${n>>16&255},${n>>8&255},${n&255}`;}
function stamp(s,x,y,a,col=U.red,size=64,rot=-.08){if(a<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(1+(1-a)*.6,1+(1-a)*.6);ctx.globalAlpha=a;ctx.font=`900 ${size}px MS`;const w=ctx.measureText(s).width+60;
  ctx.strokeStyle=col;ctx.lineWidth=8;rr(-w/2,-size*.85,w,size*1.7,18);ctx.stroke();T2(s,0,0,size,col,{w:900});ctx.restore();}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
// a cartoon bee, facing right (rot rotates it). o: wings phase, mood, crown, tag, glowCol
function bee(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(s,s);if(o.flip)ctx.scale(-1,1);const a=o.a??1;ctx.globalAlpha=a;
  if(o.glowCol)glow(0,0,110,`rgba(${hexRgb(o.glowCol)},1)`,.45);
  const wf=Math.sin(t*(o.still?0:70)+(o.ph||0));ctx.save();ctx.globalAlpha=a*.85;ell(-6,-38,30,16+6*wf,-.6,U.wing);ell(14,-40,26,14+5*wf,-.2,U.wing);ctx.restore();
  ell(-34,0,36,30,0,U.bee);ctx.save();ctx.beginPath();ctx.ellipse(-34,0,36,30,0,0,7);ctx.clip();for(const sx of[-52,-30,-8])fillRR(sx,-32,11,64,3,U.beeD);ctx.restore();
  poly([-70,-4,-84,0,-70,4],U.beeD);
  ell(6,0,20,20,0,'#3a2c10');circ(30,-4,24,U.bee);
  circ(38,-10,9,'#fff');circ(40,-10,5,'#111');
  line(36,-24,46,-44,3,U.beeD);line(28,-26,30,-48,3,U.beeD);circ(46,-44,4,U.beeD);circ(30,-48,4,U.beeD);
  if(o.mouth==='o')circ(46,6,4,'#3a1715');else{ctx.strokeStyle='#3a1715';ctx.lineWidth=3;ctx.beginPath();ctx.arc(40,4,7,.2,Math.PI-.4);ctx.stroke();}
  for(const k of[-1,1])line(-20+k*12,22,-26+k*14,40,4,U.beeD);
  if(o.crown){poly([10,-34,16,-54,24,-40,32,-58,38,-40,46,-54,48,-32],U.y);}
  ctx.restore();
  if(o.tag)chip(o.tag,x,y-70*s,{size:Math.round(22*Math.max(.8,s)),bg:o.tagBg||U.y,col:'#14110a'});}
// many tiny bees as a dot-cloud with wings flicker (swarm). shape fn(i,n)->[x,y]
const SW=(()=>{const R=rng(5),a=[];for(let i=0;i<520;i++)a.push({u:R(),v:R(),ph:R()*6.28,r:R()});return a;})();
function swarmBeard(cx,cy,w,h,t,o={}){const a=o.a??1;ctx.save();ctx.globalAlpha=a;glow(cx,cy+h*.4,w*1.2,'rgba(246,184,28,1)',.14);
  for(const p of SW){const yy=p.v,ww=w*(1-Math.pow(yy,1.6)*.75)*(.85+.15*Math.sin(yy*9+t));const x=cx+(p.u-.5)*ww+Math.sin(t*3+p.ph)*4,y=cy+yy*h+Math.cos(t*2.5+p.ph)*3;
    ell(x,y,9,6,p.ph,p.r>.5?U.bee:'#c98d10');ell(x-2,y,3,6,0,U.beeD,.8);}
  ctx.restore();}
function branch(x0,y0,x1,y1,t){line(x0,y0,x1,y1,34,U.woodD);line(x0,y0-6,x1,y1-6,20,U.wood);for(let i=0;i<5;i++){const k=.15+i*.18,x=lerp(x0,x1,k),y=lerp(y0,y1,k);
  ctx.save();ctx.translate(x,y);ctx.rotate(-.6+(i%2)*1.2+Math.sin(t+i)*.05);ell(0,-40,22,46,0,'#2f7a3a');line(0,0,0,-80,3,'#1f5a2a');ctx.restore();}}
// a nest site: a tree hollow / box with an entrance; o.q quality stars, o.label
function site(x,y,s,t,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const col=o.col||U.A;
  fillRR(-110,-150,220,300,28,o.box?'#8a6a45':U.wood);ctx.strokeStyle=shade(o.box?'#8a6a45':U.wood,-.3);ctx.lineWidth=6;rr(-110,-150,220,300,28);ctx.stroke();
  for(let i=0;i<4;i++)line(-90,-110+i*70,90,-100+i*70,3,'rgba(0,0,0,.18)');ell(0,o.hole??40,40,30,0,'#120c06');
  if(o.glow)glow(0,0,240,`rgba(${hexRgb(col)},1)`,.3*o.glow);
  ctx.restore();
  if(o.label)chip(o.label,x,y-185*s,{size:Math.round(30*Math.max(.7,s)),bg:col,col:'#07120c'});
  if(o.stars!=null)T2('★'.repeat(o.stars)+'☆'.repeat(3-o.stars),x,y+190*s,40*s,U.y,{w:900});}
// honeycomb background
function comb(t,o={}){space(t,{c0:'#120c04',c1:'#2a1a06'});const r=56;ctx.save();ctx.globalAlpha=o.a??.5;
  for(let row=0;row<22;row++)for(let c=0;c<12;c++){const x=c*r*1.73+(row%2)*r*.866-40,y=row*r*1.5-40;ctx.beginPath();for(let k=0;k<6;k++){const an=Math.PI/6+k*Math.PI/3;ctx.lineTo(x+Math.cos(an)*r*.95,y+Math.sin(an)*r*.95);}ctx.closePath();
    ctx.fillStyle=hash(row*13+c)>.7?'#7a4f0e':'#4a300a';ctx.fill();ctx.strokeStyle='#9a6a18';ctx.lineWidth=3;ctx.stroke();}ctx.restore();}
// waggle dance path: figure-8 with straight waggle run; returns position at phase p (0..1) and angle
function waggle(cx,cy,L,ang,p){const ca=Math.cos(ang),sa=Math.sin(ang);let lx,ly,rot;
  if(p<.4){const k=p/.4;lx=lerp(-L/2,L/2,k);ly=Math.sin(k*60)*10;rot=0;}
  else{const k=(p-.4)/.6;const side=Math.floor(k*2)%2?1:-1;const q=(k*2)%1;const an=Math.PI*q;lx=L/2*Math.cos(an);ly=side*L*.45*Math.sin(an);rot=Math.PI+(side>0?an:-an);}
  return{x:cx+lx*ca-ly*sa,y:cy+lx*sa+ly*ca,rot:ang+rot};}
function bar(x,y,w,h,k,col,lab,val){fillRR(x,y-h,w,h,16,'rgba(255,255,255,.07)');fillRR(x,y-h*k,w,Math.max(16,h*k),16,col);if(k>.5)glow(x+w/2,y-h*k,90,`rgba(${hexRgb(col)},1)`,.3);
  T2(lab,x+w/2,y+44,36,col,{w:900});if(val!=null)T2(val,x+w/2,y-h*k-46,64,U.y,{w:900,stroke:8});}
// the swarm thermometer
function thermo(x,y,h,k,t){fillRR(x-34,y-h,68,h,34,'rgba(255,255,255,.1)');circ(x,y+30,62,'rgba(255,255,255,.1)');const col=k>.8?U.red:'#ff9a3c';
  fillRR(x-20,y-h*k,40,h*k+10,20,col);circ(x,y+30,48,col);glow(x,y+30,160,'rgba(255,100,60,1)',.3*k);
  for(let i=0;i<=5;i++)line(x+40,y-h*i/5,x+64,y-h*i/5,4,U.dim);}
// neuron glyph
function neuron(x,y,s,col,on){ctx.save();ctx.translate(x,y);ctx.scale(s,s);if(on>0)glow(0,0,130,`rgba(${hexRgb(col)},1)`,.5*on);
  for(let i=0;i<7;i++){const a=i/7*6.283;ctx.strokeStyle=col;ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(Math.cos(a+.4)*50,Math.sin(a+.4)*50,Math.cos(a)*90,Math.sin(a)*90);ctx.stroke();}
  circ(0,0,38,col);circ(0,0,16,'rgba(255,255,255,.5)');ctx.restore();}
// a little house on a hill (the ending)
function house(x,y,s,col='#c94f3a'){ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-110,-120,220,140,6,'#e8e1d0');poly([-140,-110,0,-230,140,-110],col);fillRR(-30,-60,60,80,4,'#5a3a22');
  fillRR(-90,-95,44,40,4,'#ffd88a');fillRR(46,-95,44,40,4,'#ffd88a');ctx.restore();}
