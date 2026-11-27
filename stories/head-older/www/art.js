// ===================== Your Head Is Older: art (v2 vertical, How Time Works look) =====================
const U={bg0:'#05070f',bg1:'#0c1430',grid:'rgba(120,150,220,.07)',ink:'#e9edf5',dim:'rgba(233,237,245,.6)',y:'#ffc93c',red:'#ff5a48',grn:'#3ee08a',B:'#5b8cff',or:'#ff9a3c',cy:'#5fd8ff'};
function space(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,o.c0||U.bg0],[1,o.c1||U.bg1]]);ctx.fillRect(-300,-300,1680,2520);
  const s=o.s||90;for(let x=-s*3;x<1380;x+=s)line(x,-300,x,2220,1.5,U.grid);for(let y=-s*3;y<2220;y+=s)line(-300,y,1380,y,1.5,U.grid);
  if(o.stars!==false)for(let i=0;i<70;i++)circ(hash(i*1.7)*1080,hash(i*3.3)*1920,1+hash(i*9.1)*2.2,'#dfe8ff',.25+.35*hash(i*5.5));}
function T2(s,x,y,size,col=U.ink,o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){if((o.a??1)<=0)return;label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||U.ink},o));}
function popT(s,x,y,size,col,t,t0,o={}){const q=ss(seg(t,t0,t0+.25));if(q<=0)return;ctx.save();ctx.translate(x,y);const k=1.4-.4*q;ctx.scale(k,k);T2(s,0,0,size,col,{w:900,stroke:12,a:q*(o.a??1)});ctx.restore();}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
function me2(o){toon(Object.assign({jacket:'#2f4f7a',hat:'beanie',hatCol:'#f0683f',stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}
// a clock face; ang = hand angle in turns (any number, wraps); col = rim/hand colour
function clk(x,y,r,ang,o={}){circ(x,y,r,'rgba(12,16,28,.95)');ctx.strokeStyle=o.rim||U.ink;ctx.lineWidth=Math.max(3,r*.06);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();
  for(let i=0;i<12;i++){const a=i/12*6.283;line(x+Math.sin(a)*r*.78,y-Math.cos(a)*r*.78,x+Math.sin(a)*r*.9,y-Math.cos(a)*r*.9,Math.max(2,r*.04),U.dim);}
  const a=ang*6.283;line(x,y,x+Math.sin(a)*r*.75,y-Math.cos(a)*r*.75,Math.max(3,r*.07),o.hand||U.y);circ(x,y,Math.max(4,r*.08),o.hand||U.y);
  if(o.glow)glow(x,y,r*1.8,o.glow,.35);}
function bar(x,y,w,h,k,col,lab,val){fillRR(x,y,w,h,h/2,'rgba(255,255,255,.08)');if(k>0)fillRR(x,y,Math.max(h,w*clamp(k)),h,h/2,col);T2(lab,x,y-36,30,U.dim,{align:'left',w:800});T2(val,x+w,y-36,38,col,{align:'right',w:900});}
// an atomic clock: a lab box with a glowing laser window and a digital readout
function atomClock(x,y,s,digits,col=U.cy){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  fillRR(-150,-110,300,220,22,'#2a3242');fillRR(-150,-110,300,40,22,'#353f52');fillRR(-130,-50,140,90,12,'#0b1220');
  glow(-60,-5,80,'rgba(95,216,255,1)',.55);line(-120,-5,0,-5,6,col);circ(-60,-5,12,'#e8fbff');
  fillRR(25,-50,105,44,8,'#0b1220');T2(digits,77,-27,24,U.grn,{w:900});for(let i=0;i<3;i++)circ(45+i*30,25,9,i===0?U.red:'#56607a');
  line(-120,110,-120,130,10,'#1a1f2a');line(120,110,120,130,10,'#1a1f2a');ctx.restore();}
// a lab table
function table(y){fillRR(-200,y,1480,36,8,'#5a4634');ctx.fillStyle='#3d2f22';ctx.fillRect(-200,y+36,1480,500);}
// cutaway Earth: crust, mantle, outer + inner core (a wedge removed)
function cutEarth(x,y,r,t,o={}){earth(x,y,r,{spin:.25+t*.004});ctx.save();ctx.beginPath();ctx.moveTo(x,y);ctx.arc(x,y,r+2,-Math.PI/2,0);ctx.closePath();ctx.clip();
  const L=[[1,'#7a5236'],[.98,'#c2552c'],[.55,'#f08a2a'],[.19,'#ffe17a']];for(const[k,c]of L){circ(x,y,r*k,c);}ctx.restore();
  line(x,y,x,y-r,4,'rgba(0,0,0,.35)');line(x,y,x+r,y,4,'rgba(0,0,0,.35)');glow(x,y,r*.3,'rgba(255,240,170,1)',.5);}
// a little city map with roads and a GPS dot
function cityMap(cx,cy,w,h){fillRR(cx-w/2,cy-h/2,w,h,30,'#1b2433');ctx.save();ctx.beginPath();rr(cx-w/2,cy-h/2,w,h,30);ctx.clip();
  for(let i=0;i<9;i++){const x=cx-w/2+i*w/8;line(x,cy-h/2,x+(i%3-1)*40,cy+h/2,i%4===0?22:10,'#2c3a50');}
  for(let i=0;i<9;i++){const y=cy-h/2+i*h/8;line(cx-w/2,y,cx+w/2,y+(i%3-1)*30,i%3===0?22:10,'#2c3a50');}
  for(let i=0;i<14;i++)fillRR(cx-w/2+hash(i)*w,cy-h/2+hash(i+5)*h,40+hash(i+2)*60,30+hash(i+7)*50,6,'#223047');
  ell(cx+w*.2,cy-h*.25,120,70,.3,'#1d3c5a');ctx.restore();}
function pin(x,y,col){ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y-46,30,Math.PI,0);ctx.lineTo(x,y);ctx.closePath();ctx.fill();circ(x,y-46,12,'#fff');}
// a satellite
function sat(x,y,s,a=0){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.scale(s,s);fillRR(-110,-22,80,44,4,'#2d5fb0');fillRR(30,-22,80,44,4,'#2d5fb0');
  for(let i=0;i<3;i++){line(-110+i*27,-22,-110+i*27,22,2,'#9cc3ff');line(30+i*27,-22,30+i*27,22,2,'#9cc3ff');}line(-30,0,30,0,6,'#ccd');fillRR(-26,-30,52,60,8,'#e3c46a');circ(0,-38,8,'#eee');ctx.restore();}
// an apartment tower cross-section: n floors
function tower(x,y,w,fh,n,lit){fillRR(x-w/2,y-fh*n,w,fh*n,10,'#232a38');for(let i=0;i<n;i++){const fy=y-fh*(i+1);line(x-w/2,fy,x+w/2,fy,4,'#151a24');
  for(let j=0;j<4;j++)fillRR(x-w/2+20+j*(w-40)/4,fy+18,(w-40)/4-18,fh-36,6,i===lit?'#ffd36b':'#3b4560');}
  fillRR(x-w/2-10,y-fh*n-20,w+20,24,6,'#2d3546');}
