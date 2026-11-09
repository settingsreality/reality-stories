// ===================== The Mirror Question: diagrams =====================
const M={gold:'#ffc93c',red:'#ff4d3d',mint:'#5cf2a2',blue:'#6db8ff',ink:'#0c1524',grid:'rgba(120,170,255,.08)'};
function me(o){toon(Object.assign({jacket:'#2d6fb0',pants:'#141a2a',hat:'beanie',hatCol:'#f0683f',skin:'#e9b896',browCol:'#4a2e1f',stripe:false},o));}
function bg(){ctx.fillStyle=vgrad(0,1920,[[0,'#101a2c'],[1,'#080d18']]);ctx.fillRect(-200,-200,1480,2400);for(let i=-2;i<14;i++)line(i*90,-200,i*90,2200,2,M.grid);for(let j=-2;j<26;j++)line(-200,j*90,1280,j*90,2,M.grid);}
// back-of-head view of me; R = raise screen-right arm
function backMe(x,y,h,o={}){const J='#2d6fb0',P='#141a2a';ctx.save();ctx.translate(x,y);
  for(const s of[-1,1])line(s*.07*h,-.36*h,s*.075*h,-.03*h,.1*h,P);
  fillRR(-.19*h,-.67*h,.38*h,.43*h,.1*h,J);
  const arm=(s,up)=>{const sx=s*.18*h,sy=-.6*h;if(up){line(sx,sy,sx+s*.1*h,sy-.17*h,.09*h,J);line(sx+s*.1*h,sy-.17*h,sx+s*.1*h,sy-.36*h,.08*h,J);circ(sx+s*.1*h,sy-.4*h,.05*h,'#e9b896');}else{line(sx,sy,sx+s*.05*h,sy+.2*h,.09*h,J);line(sx+s*.05*h,sy+.2*h,sx+s*.05*h,sy+.36*h,.08*h,J);}};
  arm(-1,o.upL);arm(1,o.upR);
  circ(0,-.83*h,.17*h,'#e9b896');ctx.fillStyle='#f0683f';ctx.beginPath();ctx.arc(0,-.84*h,.175*h,Math.PI,0);ctx.fill();fillRR(-.18*h,-.86*h,.36*h,.06*h,.03*h,shade('#f0683f',-.15));circ(0,-1.02*h,.035*h,'#ff8a5e');ctx.restore();}
// wall mirror
function mirrorFrame(x,y,w,h,fn){fillRR(x-12,y-12,w+24,h+24,14,'#7b6236');fillRR(x,y,w,h,8,'#16283f');ctx.save();rr(x,y,w,h,8);ctx.clip();ctx.fillStyle=vgrad(y,y+h,[[0,'#2a4768'],[1,'#132438']]);ctx.fillRect(x,y,w,h);fn&&fn();ctx.save();ctx.globalAlpha=.09;ctx.fillStyle='#fff';ctx.beginPath();ctx.moveTo(x+w*.15,y);ctx.lineTo(x+w*.45,y);ctx.lineTo(x+w*.1,y+h);ctx.lineTo(x-w*.2,y+h);ctx.fill();ctx.restore();ctx.restore();}
function arrow(x1,y1,x2,y2,w,c){line(x1,y1,x2,y2,w,c);const a=Math.atan2(y2-y1,x2-x1),L=w*3.4;poly([x2+Math.cos(a)*L*.4,y2+Math.sin(a)*L*.4,x2-Math.cos(a-.5)*L,y2-Math.sin(a-.5)*L,x2-Math.cos(a+.5)*L,y2-Math.sin(a+.5)*L],c);}
function bigX(x,y,r,a){ctx.save();ctx.globalAlpha=a;line(x-r,y-r,x+r,y+r,26,M.red);line(x+r,y-r,x-r,y+r,26,M.red);ctx.restore();}
// top-down me: head circle, nose wedge pointing dir (radians, 0 = up), hands labelled
function topMe(x,y,r,a,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(a);ell(0,0,r*1.55,r*.62,0,o.col||'#2d6fb0');
  poly([-r*.34,-r*.75,r*.34,-r*.75,0,-r*1.42],'#e9b896');circ(0,0,r*.78,'#f0683f');circ(0,-r*.1,r*.3,'#ff8a5e');
  ctx.restore();ctx.save();ctx.translate(x,y);const ca=Math.cos(a),sa=Math.sin(a);const hL=[-ca*r*1.55,-sa*r*1.55],hR=[ca*r*1.55,sa*r*1.55];
  circ(hL[0],hL[1],r*.28,o.lc||'#ffd2b4');circ(hR[0],hR[1],r*.28,o.rc||M.gold);
  if(o.ll!==0){const f=`900 ${Math.round(r*.42)}px MS`;text(o.lt||'L',hL[0],hL[1]+r*.16,f,'#14110a');text(o.rt||'R',hR[0],hR[1]+r*.16,f,'#14110a');}ctx.restore();}
function mirrorLine(y){fillRR(120,y-10,840,20,6,M.blue);glow(540,y,500,'rgba(109,184,255,1)',.14);text('MIRROR',930,y-26,'800 30px MS',M.blue,'right');}
// glove outline, right-hand pointing up, flip with sx
function glove(x,y,s,sx,o={}){ctx.save();ctx.translate(x,y);ctx.scale(s*sx,s);const c=o.col||M.gold;fillRR(-110,-30,220,240,50,c);const F=[-90,-32,26,84],H=[190,240,250,205];F.forEach((fx,i)=>fillRR(fx-27,-30-H[i],54,H[i]+40,27,c));ctx.save();ctx.translate(-110,60);ctx.rotate(-.6);fillRR(-30,-160,58,180,29,c);ctx.restore();fillRR(-110,200,220,70,16,shade(c,-.25));
  ctx.restore();}
// paper / plastic sheet with word, sx/sy flips
function sheet(x,y,w,h,word,o={}){ctx.save();ctx.translate(x,y);ctx.scale(o.sx??1,o.sy??1);const clear=o.clear;fillRR(-w/2,-h/2,w,h,14,clear?'rgba(190,225,255,.18)':'#f1ebdd');if(clear){ctx.strokeStyle='rgba(190,225,255,.7)';ctx.lineWidth=4;rr(-w/2,-h/2,w,h,14);ctx.stroke();}
  ctx.font=`900 ${o.fs||110}px MS`;ctx.fillStyle=clear?'#fff':'#1b1d23';ctx.textAlign='center';ctx.textBaseline='middle';if(o.back){ctx.globalAlpha=.3;}ctx.fillText(word,0,6);ctx.globalAlpha=1;ctx.restore();}
function mole(x,y,h){circ(x,y,h*.012,'#6a3f28');}
