// ===================== Restart Required, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,at){return dip(t,at,.12);}
const scr=(wx,wy,c)=>({x:(wx-c.x)*c.z+960,y:(wy-c.y)*c.z+540});
// cold open: 99%
function r1(t){const k=seg(t,0,E(0)+.6);cityNight({x:960,y:lerp(420,460,k),z:lerp(1.05,1.0,k)},t,{pct:lerp(98.4,99,ss(seg(t,W(0,.4),W(0,.7)))),wires:true,starMove:1,trail:0});}
// the bar arrives; one percent
function r2(t){if(t<T(2)-.15){const k=seg(t,T(1),E(1));cityNight({x:lerp(700,1100,k),y:440,z:1.0},t,{pct:1,barA:ss(seg(t,W(1,.2),W(1,.45)))});blackout(cut(t,T(2)-.15));return;}
  cityNight({x:1100,y:lerp(460,420,seg(t,T(2),E(2))),z:1.05},t,{pct:1});}
// planes go through it; the memes
function r3(t){if(t<T(4)-.15){cityNight({x:960,y:440,z:1.0},t,{pct:3,plane:seg(t,T(3),W(3,.55))});blackout(cut(t,T(4)-.15));return;}
  const k=seg(t,T(4),E(4));phone({x:960,y:lerp(520,560,k),z:lerp(1.0,1.08,k)},t,()=>memeFeed(lerp(-80,520,ss(seg(t,W(4,.3),E(4)+.5))),t));}
// stars move; birds wait
function r4(t){if(t<T(6)-.15){cityNight({x:960,y:lerp(440,380,seg(t,T(5),E(5))),z:1.0},t,{pct:50,starMove:ss(seg(t,W(5,.15),W(5,.6)))});blackout(cut(t,T(6)-.15));return;}
  const k=seg(t,T(6),E(6));cityNight({x:lerp(900,1020,k),y:440,z:lerp(1.0,1.15,k)},t,{pct:80,wires:true,starMove:1,trail:0});}
// 99, and the box
function r5(t){const k=seg(t,T(7),E(8));cityNight({x:960,y:lerp(440,480,k),z:1.0},t,{pct:lerp(98,99,ss(seg(t,T(7),W(7,.4)))),starMove:1,trail:0,dialog:ss(seg(t,W(8,.05),W(8,.2)))});}
// everyone looks up; the cursor
function r6(t){const k=seg(t,T(9),E(10));const cA=ss(seg(t,W(10,.15),W(10,.35)));
  cityNight({x:960,y:lerp(640,600,k),z:lerp(1.0,1.08,k)},t,{pct:99,starMove:1,trail:0,crowd:true,dialog:1,cursor:cA>0?{x:lerp(1500,1380,seg(t,W(10,.2),E(10)+.6)),y:lerp(820,760,seg(t,W(10,.2),E(10)+.6)),s:.9,a:cA}:null});}
// it searches the whole planet; then stops over my house
function r7(t){if(t<T(12)-.15){const k=seg(t,T(11),E(11));earth({x:960,y:560,z:lerp(1.0,1.1,k)},t,{cursor:{x:lerp(420,1380,k)+Math.sin(k*9)*40,y:lerp(380,620,k)+Math.cos(k*7)*60,s:.85}});blackout(cut(t,T(12)-.15));return;}
  const z=t<W(12,.33)?1.0:t<W(12,.66)?1.4:1.85;const c={x:980,y:560,z};const hp=scr(980,470,c);
  cityNight(c,t,{pct:99,starMove:1,trail:0,house:true,cursor:{x:hp.x-6,y:lerp(hp.y-240,hp.y-25,ss(seg(t,T(12),W(12,.85)))),s:1.2}});}
// you choose
function r8(t){const k=ss(seg(t,T(13),E(13)+2));phone({x:960,y:lerp(560,420,k),z:lerp(1.0,1.35,k)},t,()=>notif(ss(seg(t,W(13,.35),W(13,.55))),t));
  if(t>E(13)+.6)blackout(ss(seg(t,E(13)+.6,E(13)+1.3)));}
const SCENES={r1,r2,r3,r4,r5,r6,r7,r8};
const FADES={r1:[0,.25],r2:[.25,.25],r3:[.25,.25],r4:[.25,.25],r5:[.25,.25],r6:[.25,.25],r7:[.25,.25],r8:[.25,0]};
function metaClock(t){if(t<T(1))return['DAY 99 · 11:59 P.M.',1];if(t<T(3))return['DAY 1',0];if(t<T(5))return['DAY 3',0];if(t<T(6))return['DAY 50',0];if(t<T(7))return['DAY 80',0];return['DAY 99 · 11:59 P.M.',1];}
