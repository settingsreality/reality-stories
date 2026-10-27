// ===================== How the Universe Ends: art (v2 vertical, How Time Works look) =====================
const U={bg0:'#05070f',bg1:'#0c1430',grid:'rgba(120,150,220,.07)',ink:'#e9edf5',dim:'rgba(233,237,245,.6)',y:'#ffc93c',ice:'#8fd8ff',red:'#ff5a48',org:'#ff9a4a',teal:'#4fd1c5'};
const USTARS=(()=>{const r=rng(5),a=[];for(let i=0;i<320;i++)a.push([r()*1180-50,r()*2000-40,r()<.1?2.4:1.3,.25+r()*.6]);return a;})();
function space(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,o.c0||U.bg0],[1,o.c1||U.bg1]]);ctx.fillRect(-100,-100,1280,2120);
  if(o.grid!==false){const s=o.s||90;for(let x=-s;x<1180;x+=s)line(x,-20,x,1940,1.5,U.grid);for(let y=0;y<1940;y+=s)line(-20,y,1100,y,1.5,U.grid);}
  const sa=o.starA??1;for(const[x,y,r,a]of USTARS)circ(x,y,r,'#e6ecff',a*sa);}
function T2(s,x,y,size,col=U.ink,o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px MS`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||U.ink},o));}
// a spiral galaxy glyph
function galaxy(x,y,r,rot,o={}){const col=o.col||'#cfe0ff',a=o.a??1;ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(1,o.flat??.6);
  glow(0,0,r*1.4,o.glowCol||'rgba(190,210,255,1)',.35*a);for(let arm=0;arm<2;arm++)for(let k=0;k<26;k++){const q=k/26,ang=arm*Math.PI+q*4.2,rr=r*q;
    const sx=(o.spread||0)*Math.cos(k*1.7+arm)*r*q,sy=(o.spread||0)*Math.sin(k*2.3+arm)*r*q;circ(Math.cos(ang)*rr+sx,Math.sin(ang)*rr+sy,r*.07*(1-q*.6),col,a*(1-q*.55));}
  circ(0,0,r*.16,'#fff6dc',a);ctx.restore();}
const GAL=(()=>{const r=rng(9),a=[];for(let i=0;i<22;i++)a.push({x:(r()-.5)*900,y:(r()-.5)*1500,r:30+r()*40,rot:r()*6,ph:r()*6});return a;})();
// the galaxy field around (cx,cy) scaled by s (expansion); tint for freeze / crunch
function field(t,cx,cy,s,o={}){for(const g of GAL){const x=cx+g.x*s,y=cy+g.y*s;if(x<-200||x>1280||y<-200||y>2120)continue;
  galaxy(x,y,g.r*(o.gs||1),g.rot+t*.05,{a:(o.a??1)*(o.fade?clamp(1-o.fade*(.4+hash(g.ph))):1),col:o.col,glowCol:o.glowCol,spread:o.spread});}}
function timeBar(x,y,w,marks,o={}){fillRR(x,y,w,16,8,'rgba(255,255,255,.12)');const k=o.k??1;fillRR(x,y,w*k,16,8,o.col||U.ice);
  for(const m of marks){if((m.a??1)<=0)continue;const mx=x+w*m.p;ctx.save();ctx.globalAlpha=m.a??1;line(mx,y-30,mx,y+46,4,m.col||U.ink);T2(m.top,mx,y-64,30,m.col||U.ink,{w:900});if(m.bot)T2(m.bot,mx,y+84,26,U.dim);ctx.restore();}}
// solar system with planets that fly off when free>0
function solar(x,y,s,t,free=0){glow(x,y,160*s,'rgba(255,200,90,1)',.5);circ(x,y,40*s,'#ffd36a');const P=[[90,'#c9b18a',1.6],[140,'#e8c27a',1.2],[200,'#4f8fd6',1.0],[260,'#d8644a',.8],[360,'#d9b07a',.5]];
  P.forEach(([R,c,sp],i)=>{ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,R*s,0,7);ctx.stroke();
    const a=t*sp*.6+i*1.3;let px=x+Math.cos(a)*R*s,py=y+Math.sin(a)*R*s;if(free>0){const d=free*900*(1+i*.2);px+=-Math.sin(a)*d;py+=Math.cos(a)*d;}circ(px,py,(12+i*2)*s,c);});}
function atom(x,y,s,t,free=0){glow(x,y,140*s,'rgba(140,200,255,1)',.3);for(let i=0;i<6;i++)circ(x+(hash(i)-.5)*30*s,y+(hash(i+9)-.5)*30*s,13*s,i%2?'#ff7a6a':'#7ab0ff');
  for(let k=0;k<3;k++){const rot=k*1.05;ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.strokeStyle=`rgba(200,230,255,${.4*(1-free)})`;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,150*s,50*s,0,0,7);ctx.stroke();
    const a=t*3+k*2;let ex=Math.cos(a)*150*s,ey=Math.sin(a)*50*s;ex*=1+free*6;ey*=1+free*6;photon(ex,ey,9*s);ctx.restore();}}
function photon(x,y,r=12,a=1){glow(x,y,r*5,'rgba(255,214,90,1)',.5*a);circ(x,y,r,'#fff3c4',a);}
function crack(x0,y0,x1,y1,seed,k){if(k<=0)return;const R=rng(seed);ctx.strokeStyle=`rgba(255,90,72,${.9*k})`;ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(x0,y0);const n=12;for(let i=1;i<=n;i++){const q=i/n;if(q>k)break;ctx.lineTo(lerp(x0,x1,q)+(R()-.5)*60,lerp(y0,y1,q)+(R()-.5)*30);}ctx.stroke();}
function sizeChart(x,y,w,h,k,o={}){// size of the universe over time: Big Bang -> now (13.8) -> peak (+11) -> crunch (+20); 0..33 Gyr
  line(x,y+h,x+w,y+h,4,U.dim);line(x,y,x,y+h,4,U.dim);T2('SIZE OF THE UNIVERSE',x+10,y-40,26,U.dim,{align:'left'});T2('TIME →',x+w,y+h+44,26,U.dim,{align:'right'});
  const f=q=>{const tg=q*33;return tg<24.8?Math.sin(Math.min(1,tg/24.8)*Math.PI/2)**1.2:Math.cos((tg-24.8)/8.2*Math.PI/2)**.8;};
  ctx.strokeStyle=U.org;ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();for(let q=0;q<=k;q+=.005){const px=x+q*w,py=y+h-f(q)*h*.92;q?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();
  if(o.freeze){ctx.strokeStyle='rgba(143,216,255,.6)';ctx.setLineDash([16,14]);ctx.lineWidth=5;ctx.beginPath();for(let q=13.8/33;q<=1;q+=.01){const px=x+q*w,py=y+h-Math.min(1.1,f(13.8/33)+(q-13.8/33)*1.2)*h*.92;ctx.lineTo(px,py);}ctx.stroke();ctx.setLineDash([]);}
  for(const[m,lab,sub,col]of o.marks||[]){const q=m/33;if(q>k+.001)continue;const px=x+q*w,py=y+h-f(q)*h*.92;circ(px,py,14,col);chip(lab,px,py-70,{size:26,bg:col,col:'#14110a'});if(sub)T2(sub,px,py+52,24,U.ink);}}
function arrow(x1,y1,x2,y2,w,c,a=1,head=22){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
  const an=Math.atan2(y2-y1,x2-x1);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x2,y2);ctx.lineTo(x2-Math.cos(an-.45)*head,y2-Math.sin(an-.45)*head);ctx.lineTo(x2-Math.cos(an+.45)*head,y2-Math.sin(an+.45)*head);ctx.closePath();ctx.fill();ctx.restore();}
