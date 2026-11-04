// ===================== The Sound That Rises Forever: art (v2 vertical, How Time Works look) =====================
const U={bg0:'#05070f',bg1:'#0c1430',grid:'rgba(120,150,220,.07)',ink:'#e9edf5',dim:'rgba(233,237,245,.6)',y:'#ffc93c',red:'#ff5a48',grn:'#3ee08a',A:'#3ee08a',B:'#5b8cff',C:'#ff6a4d',V:'#c58aff'};
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
// the real tone: N layers an octave apart, each climbing one octave every P seconds (same numbers as audio.py)
const P=10,NL=9;
const layerU=(k,t)=>fract((k+t/P)/NL);            // 0 = bottom of hearing, 1 = top
const bell=u=>Math.pow(Math.sin(Math.PI*u),2);    // loudness of a layer at height u
const hue=u=>`hsl(${Math.round(lerp(190,330,u))},95%,68%)`;
// spectrogram: time runs left to right, every layer a rising line, bright only where it is loud
function spectro(x,y,w,h,t,o={}){const span=o.span||14,step=w/90;ctx.save();ctx.lineCap='round';
  for(let k=0;k<NL;k++){for(let i=0;i<90;i++){const q=i/90,tt=t-span*(1-q),u=layerU(k,tt),u2=layerU(k,tt+span/90);if(u2<u)continue;const a=bell(u)*(o.a??1);if(a<.012)continue;
      ctx.globalAlpha=a;ctx.strokeStyle=hue(u);ctx.lineWidth=(o.lw||10)*(.45+.55*a);ctx.beginPath();ctx.moveTo(x+q*w,y+h*(1-u));ctx.lineTo(x+q*w+step,y+h*(1-u2));ctx.stroke();}}
  ctx.restore();}
// the stack: bars at each layer's height, width = loudness, with the bell beside them
function stack(x,y,w,h,t,o={}){const cx=x+w/2;fillRR(x-20,y-20,w+40,h+40,24,'rgba(255,255,255,.05)');
  ctx.save();ctx.strokeStyle='rgba(255,201,60,.4)';ctx.lineWidth=4;ctx.setLineDash([10,12]);for(const s of[-1,1]){ctx.beginPath();for(let i=0;i<=60;i++){const u=i/60,px=cx+s*bell(u)*w*.48,py=y+h*(1-u);i?ctx.lineTo(px,py):ctx.moveTo(px,py);}ctx.stroke();}ctx.restore();
  if(o.hiTop){ctx.save();ctx.globalAlpha=.22*o.hiTop;fillRR(x-20,y-20,w+40,h*.3,24,U.red);ctx.restore();}
  if(o.hiBot){ctx.save();ctx.globalAlpha=.22*o.hiBot;fillRR(x-20,y+h*.7+20,w+40,h*.3,24,U.grn);ctx.restore();}
  for(let k=0;k<NL;k++){const u=layerU(k,t),a=bell(u),bw=Math.max(14,a*w*.94),py=y+h*(1-u);ctx.save();ctx.globalAlpha=.18+.82*a;fillRR(cx-bw/2,py-11,bw,22,11,hue(u));ctx.restore();
    if(o.arrows&&a>.1)arrow(cx+bw/2+22,py+16,cx+bw/2+22,py-22,6,U.y,a);}}
// a big ear
function ear(x,y,s,col='#e9b896'){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-60,120);ctx.bezierCurveTo(-120,20,-140,-140,0,-170);ctx.bezierCurveTo(140,-190,150,-30,80,30);ctx.bezierCurveTo(50,60,50,120,10,160);ctx.bezierCurveTo(-20,185,-45,150,-60,120);ctx.fill();
  ctx.strokeStyle=shade(col,-.3);ctx.lineWidth=12;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-40,-60);ctx.bezierCurveTo(-30,-130,70,-130,70,-50);ctx.bezierCurveTo(70,0,20,0,20,50);ctx.stroke();ell(-5,20,24,34,.2,shade(col,-.5));ctx.restore();}
// room-sized 1960s computer
function mainframe(x,y,t){for(let c=0;c<3;c++){const cx=x+c*215;fillRR(cx,y,200,560,12,'#39465c');fillRR(cx+10,y+10,180,540,8,'#2a3446');
    if(c===1){for(const yy of[100,270]){circ(cx+60,y+yy,50,'#10141c');circ(cx+140,y+yy,50,'#10141c');for(const px of[60,140]){ctx.save();ctx.translate(cx+px,y+yy);ctx.rotate(t*(px<100?1.4:-1.1));for(let i=0;i<3;i++){ctx.rotate(2.09);ell(26,0,14,7,0,'#b9c4d6');}ctx.restore();circ(cx+px,y+yy,9,'#e9edf5');}}}
    else for(let r=0;r<9;r++)for(let q=0;q<6;q++){const on=hash(r*7+q*13+c*3+Math.floor(t*4+r))>.55;circ(cx+36+q*26,y+50+r*34,8,on?(q%3?U.y:U.red):'#141a26');}
    fillRR(cx+24,y+390,152,130,6,'#1c2432');for(let i=0;i<5;i++)line(cx+36,y+410+i*22,cx+164,y+410+i*22,4,'rgba(255,255,255,.14)');}}
// barber pole: the stripes climb forever
function pole(x,y,w,h,t){ctx.save();rr(x,y,w,h,20);ctx.clip();ctx.fillStyle='#f2f2ee';ctx.fillRect(x,y,w,h);const per=170,o=(t*140)%per;
  ['#e0362a','#2f6fe0'].forEach((c,j)=>{for(let i=-3;i<14;i++){const yy=y+h-(i*per-o)+j*per/2 -per;ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x-10,yy);ctx.lineTo(x+w+10,yy-w*.75);ctx.lineTo(x+w+10,yy-w*.75-per*.28);ctx.lineTo(x-10,yy-per*.28);ctx.closePath();ctx.fill();}});
  const g=ctx.createLinearGradient(x,0,x+w,0);g.addColorStop(0,'rgba(0,0,0,.45)');g.addColorStop(.35,'rgba(255,255,255,.18)');g.addColorStop(1,'rgba(0,0,0,.5)');ctx.fillStyle=g;ctx.fillRect(x,y,w,h);ctx.restore();
  fillRR(x-20,y-34,w+40,44,14,'#c9ced8');fillRR(x-20,y+h-10,w+40,44,14,'#c9ced8');circ(x+w/2,y-60,40,'#dfe3ea');}
const NOTES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
// spiral staircase of notes. flat 0 = a tall helix, 1 = squashed into a plain circle. sc = how far we have climbed (in octaves)
function helix(cx,cy,R,pitch,t,o={}){const fl=o.flat||0,sq=lerp(.34,1,fl),pt=pitch*(1-fl),climb=o.climb||0,pts=[];const fr=fract(climb);
  for(let j=-120;j<=120;j++){const i=j/4;const a=(i/12)*6.283-1.571+climb*6.283;const h=(i/12)*pt;pts.push({i,x:cx+Math.cos(a)*R,y:cy-h+Math.sin(a)*R*sq,z:Math.sin(a)});}
  ctx.save();ctx.lineCap='round';for(let j=0;j<pts.length-1;j++){const p=pts[j],q=pts[j+1];const edge=clamp(1-Math.abs(p.i)/30);ctx.globalAlpha=edge*(.4+.3*(p.z+1));ctx.strokeStyle='#5b8cff';ctx.lineWidth=lerp(18,26,(p.z+1)/2);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}ctx.restore();
  for(const p of pts){if(!Number.isInteger(p.i))continue;if(fl>.5&&(p.i<-6||p.i>5))continue;const edge=clamp((30-Math.abs(p.i))/10);const m=((p.i%12)+12)%12;const sharp=NOTES[m].length>1;const same=m===0;const a=edge*(.5+.5*(p.z+1)/2);
    circ(p.x,p.y,same?30:(sharp?14:20),same?U.y:(sharp?'#3c5a9e':'#9fc0ff'),a);if(same)T2('C',p.x,p.y+1,34,'#14110a',{w:900,a});else if(fl>.5&&!sharp)T2(NOTES[m],p.x,p.y+1,24,'#0c1430',{w:900,a});}}
// note circle, 12 positions
const ringPos=(cx,cy,R,i)=>{const a=(i/12)*6.283-1.571;return[cx+Math.cos(a)*R,cy+Math.sin(a)*R];};
function ring(cx,cy,R,o={}){ctx.save();ctx.strokeStyle='rgba(255,255,255,.14)';ctx.lineWidth=20;ctx.beginPath();ctx.arc(cx,cy,R,0,6.2832);ctx.stroke();ctx.restore();
  for(let i=0;i<12;i++){const[x,y]=ringPos(cx,cy,R,i);const hot=o.hot&&o.hot.includes(i);circ(x,y,hot?56:32,hot?U.y:'#2a3a62');T2(NOTES[i],x,y+1,hot?42:26,hot?'#14110a':U.ink,{w:900});}}
function arcTo(cx,cy,R,a0,a1,col,k,lw=14){if(k<=0)return;ctx.save();ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.lineCap='round';ctx.beginPath();ctx.arc(cx,cy,R,a0,lerp(a0,a1,k),a1<a0);ctx.stroke();ctx.restore();}
// speaker
function speaker(x,y,s,p){ctx.save();ctx.translate(x,y);ctx.scale(s,s);fillRR(-170,-240,340,480,26,'#232c40');fillRR(-156,-226,312,452,20,'#171e2e');
  circ(0,-120,58,'#0c1018');circ(0,-120,24*(1+p*.2),'#4a5670');const r=118*(1+p*.06);circ(0,70,r+20,'#0c1018');circ(0,70,r,'#2d3750');circ(0,70,r*.45,'#5b6a8c');ctx.restore();}
// stairs that scroll up forever in a little window
function stairsIcon(x,y,w,h,t){ctx.save();rr(x,y,w,h,14);ctx.clip();fillRR(x,y,w,h,14,'#141c30');const sw=70,sh=40,o=fract(t*.5);for(let i=-1;i<9;i++){const px=x+(i-o)*sw,py=y+h-(i-o)*sh-30;ctx.fillStyle=i%2?'#c9a26b':'#b48e58';ctx.fillRect(px,py,sw+1,sh+h);}ctx.restore();
  me2({x:x+w*.42,y:y+h-30-w*.42/sw*sh+6,h:h*.62,brow:'worried',mouth:'frown',step:Math.sin(t*9)});}
