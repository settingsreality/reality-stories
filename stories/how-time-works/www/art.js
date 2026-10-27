// ===================== How Time Works: art (1920x1080) =====================
const C={bg0:'#070b16',bg1:'#0e1630',grid:'rgba(120,150,220,.07)',ink:'#e9edf5',dim:'rgba(233,237,245,.55)',y:'#ffc93c',o:'#f0683f',teal:'#4fd1c5',red:'#ff5a48',blue:'#6ea8ff'};
function bgGrid(t,o={}){ctx.fillStyle=vgrad(0,1080,[[0,o.c0||C.bg0],[1,o.c1||C.bg1]]);ctx.fillRect(-200,-200,2320,1480);
  if(o.grid!==false){const s=o.s||80,ox=((o.dx||0)%s+s)%s;for(let x=-s+ox;x<2000;x+=s)line(x,-10,x,1090,1.5,C.grid);for(let y=0;y<1100;y+=s)line(-10,y,1930,y,1.5,C.grid);}
  if(o.stars){const R=rng(3);for(let i=0;i<180;i++){const x=(R()*2100-90+(o.dx||0)*R()*.3)%2000,y=R()*1080;circ(x<0?x+2000:x,y,R()<.1?2.4:1.3,'#e6ecff',.3+R()*.5);}}}
function T2(s,x,y,size,col=C.ink,o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline=o.base||'middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){label(s,x,y,Object.assign({font:`800 ${o.size||30}px MS`,h:(o.size||30)*1.8,bg:o.bg||'rgba(12,16,28,.9)',col:o.col||C.ink,stroke:o.stroke},o));}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){ctx.save();ctx.globalAlpha=a;line(x1,y1,x2,y2,w,c);const an=Math.atan2(y2-y1,x2-x1);poly([x2,y2,x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head,x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head],c);ctx.restore();}
function photon(x,y,r=12,a=1){glow(x,y,r*5,'rgba(255,214,90,1)',.5*a);circ(x,y,r,'#fff3c4',a);}
function dash(x1,y1,x2,y2,w,c,d=[14,12],off=0){ctx.save();ctx.setLineDash(d);ctx.lineDashOffset=off;line(x1,y1,x2,y2,w,c);ctx.restore();}
function clockFace(x,y,r,secs,o={}){circ(x,y,r+8,o.rim||'#1b2236');circ(x,y,r,o.face||'#f4f1ea');for(let i=0;i<12;i++){const a=i/12*6.283;line(x+Math.sin(a)*r*.82,y-Math.cos(a)*r*.82,x+Math.sin(a)*r*.93,y-Math.cos(a)*r*.93,r*.04,'#1b1d22');}
  const a=secs/60*6.283;line(x,y,x+Math.sin(a)*r*.8,y-Math.cos(a)*r*.8,r*.05,o.hand||C.o);const m=secs/3600*6.283;line(x,y,x+Math.sin(m)*r*.55,y-Math.cos(m)*r*.55,r*.08,'#1b1d22');circ(x,y,r*.07,'#1b1d22');
  if(o.label)T2(o.label,x,y+r+52,30,o.labelCol||C.ink);}
function bar(x,y,w,h,k,col,o={}){fillRR(x,y,w,h,h/2,'rgba(255,255,255,.08)');if(k>0)fillRR(x,y,Math.max(h,w*clamp(k)),h,h/2,col);if(o.label)T2(o.label,x-24,y+h/2,o.ls||30,o.lc||C.dim,{align:'right'});if(o.val)T2(o.val,x+Math.max(h,w*clamp(k))+20,y+h/2,o.vs||32,o.vc||C.ink,{align:'left'});}
function rocket(x,y,s,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s*(o.face||1),s);if(o.flame){const f=.8+.2*Math.sin((o.t||0)*40);poly([-150,-26,-150,26,-150-110*f*o.flame,0],'rgba(255,170,70,.95)');poly([-150,-14,-150,14,-150-60*f*o.flame,0],'#fff3c4');}
  poly([-150,-40,120,-40,190,0,120,40,-150,40],o.col||'#e9edf5');poly([-150,-40,-190,-80,-110,-40],o.fin||C.o);poly([-150,40,-190,80,-110,40],o.fin||C.o);circ(60,0,20,'#22324a');circ(60,0,13,'#5b8bd6');line(-60,-40,-60,40,5,'rgba(0,0,0,.15)');ctx.restore();}
function earth(x,y,r,o={}){circ(x,y,r,'#1d4f8f');ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();const R=rng(o.seed||4);for(let i=0;i<9;i++){const a=R()*6.28,d=R()*r*.8;ell(x+Math.cos(a)*d+(o.spin||0)*r,y+Math.sin(a)*d*.8,r*(.15+R()*.25),r*(.1+R()*.15),R()*3,'#3f8f5a');}ctx.restore();glow(x,y,r*1.5,'rgba(110,168,255,1)',.18);}
function star(x,y,r,col='#fff4c9'){glow(x,y,r*6,'rgba(255,230,150,1)',.35);circ(x,y,r,col);}
function personA(x,y,h,o={}){toon(Object.assign({x,y,h,jacket:o.jacket||'#2f6fd6',hat:o.hat??'beanie',hatCol:o.hatCol||C.o,stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}
// the light clock: two mirrors and a bouncing photon. k = 0..1 phase of a round trip
function lightClock(x,y,h,k,o={}){const w=o.w||150;fillRR(x-w/2,y-h/2-14,w,14,5,'#cfd8e8');fillRR(x-w/2,y+h/2,w,14,5,'#cfd8e8');const ph=k%1;const py=y+h/2-Math.abs(1-2*ph)*h;photon(x,py,o.r||11);}
