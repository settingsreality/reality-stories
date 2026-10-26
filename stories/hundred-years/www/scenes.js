// ===================== 100 Years Old, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,at){return dip(t,at,.12);}
// cold open: morning, and no front door
function h1(t){const k=ss(seg(t,0,E(0)+.6));houseExt({x:960,y:lerp(660,710,k),z:lerp(1.7,2.3,k)},t,{morning:1,door:false,sign:'snapped',lights:0});}
// the legend
function h2(t){if(t<T(2)-.15){yokai({x:960,y:540,z:lerp(1.08,1.0,seg(t,T(1),E(1)))},t,{title:ss(seg(t,T(1),W(1,.3)))});blackout(cut(t,T(2)-.15));return;}
  const a=k=>ss(seg(t,W(2,k),W(2,k)+.5));yokai({x:960,y:560,z:1.0},t,{u:a(0),l:a(.33),s:a(.66)});}
function h3(t){discard({x:960,y:lerp(560,640,seg(t,T(3),E(3))),z:lerp(1.0,1.5,ss(seg(t,W(3,.5),E(3))))},t,{eye:ss(seg(t,W(3,.72),W(3,.82))),label:'THROWN OUT AT 99 YEARS',labelA:ss(seg(t,T(3),W(3,.15)))});}
// the cupcake; the sign in the yard
function h4(t){if(t<T(5)-.15){const k=seg(t,T(4),E(4));kitchen({x:lerp(900,1000,k),y:lerp(520,470,k),z:lerp(1.0,1.5,ss(seg(t,W(4,.5),E(4))))},t,{candle:true,you:{}});blackout(cut(t,T(5)-.15));return;}
  const k=ss(seg(t,T(5),E(5)));houseExt({x:lerp(1100,1620,k),y:lerp(600,780,k),z:lerp(1.0,2.2,k)},t,{sign:'up',lights:1});}
// midnight: it breathes, it stretches
function h5(t){if(t<T(7)-.15){const L=1-.7*ss(seg(t,W(6,.15),W(6,.45)))+.25*ss(seg(t,W(6,.6),E(6)));kitchen({x:1000,y:470,z:1.5},t,{candle:true,lights:L,you:{}});blackout(cut(t,T(7)-.15));return;}
  const st=Math.sin((t-T(7))*1.4)*.5+.5;houseExt(shake({x:960,y:520,z:lerp(1.0,1.1,seg(t,T(7),E(7)))},t,2,2),t,{sign:'up',lights:.4,stretch:st*ss(seg(t,T(7),W(7,.3)))});}
// it locks me in; the hallway grows
function h6(t){if(t<T(9)-.15){doorInside({x:960,y:500,z:1.0},t,{lock:ss(seg(t,W(8,.2),W(8,.3))),latch:seg(t,W(8,.5),W(8,.9))});blackout(cut(t,T(9)-.15));return;}
  const k=seg(t,T(9),E(9));hallway({x:960,y:lerp(560,500,k),z:lerp(1.0,1.15,k)},t,{stretch:ss(seg(t,T(9),W(9,.8))),you:{},lights:1-k*.5});}
// the warm handle; the candle goes out; the wall speaks
function h7(t){if(t<T(11)-.15){const k=ss(seg(t,T(10),W(10,.5)));doorInside({x:lerp(960,1100,k),y:lerp(500,540,k),z:lerp(1.0,1.6,k)},t,{lock:1,latch:1,hand:k,warm:ss(seg(t,W(10,.7),E(10)))});blackout(cut(t,T(11)-.15));return;}
  if(t<W(11,.55)){kitchen({x:1000,y:470,z:lerp(1.5,1.8,seg(t,T(11),W(11,.55)))},t,{candle:t<W(11,.15),smoke:1,lights:.15,you:{}});return;}
  grainWall({x:960,y:540,z:lerp(1.25,1.05,seg(t,W(11,.55),E(12)))},t,{face:ss(seg(t,W(11,.6),E(11))),mouth:t>T(12)-.1&&t<E(12)+.3?ss(seg(t,T(12)-.1,T(12)+.3)):0});}
// morning again
function h8(t){const k=ss(seg(t,T(13),E(13)));const toSign=ss(seg(t,W(13,.62),W(13,.9)));houseExt({x:lerp(960,1620,toSign),y:lerp(680,900,toSign),z:lerp(1.6,2.2,toSign)},t,{morning:1,door:false,sign:'snapped',lights:0});
  if(t>E(13)+.6)blackout(ss(seg(t,E(13)+.6,E(13)+1.3)));}
const SCENES={h1,h2,h3,h4,h5,h6,h7,h8};
const FADES={h1:[0,.25],h2:[.25,.25],h3:[.25,.25],h4:[.25,.25],h5:[.25,.25],h6:[.25,.25],h7:[.25,.25],h8:[.25,0]};
function metaClock(t){if(t<T(1))return['7:02 A.M.',1];if(t<T(4))return['THE LEGEND',0];if(t<T(6))return['11:58 P.M.',0];if(t<T(13))return['12:00 A.M.',1];return['7:02 A.M.',1];}
