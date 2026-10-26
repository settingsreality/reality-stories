// ===================== {{TITLE}}, scene by scene =====================
// One function per scene tag used in script.py. Each gets t (seconds) and draws the 16:9 band.
// T(i)/E(i) = start/end of narration line i; W(i,k) = k (0..1) of the way through line i.
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,i){return dip(t,T(i)-.15,.12);}  // quick dip to black right before line i
// s1 is the cold open: the creepiest image of the whole story, on screen from frame 1.
function s1(t){const k=ss(seg(t,0,E(0)+.8));place1({x:960,y:540,z:lerp(1.4,1.7,k)},t,{});}
function s2(t){place1({x:lerp(800,1000,seg(t,T(1),E(1))),y:540,z:1},t,{});}
const SCENES={s1,s2};
const FADES={s1:[0,.25],s2:[.25,0]};      // [fade in, fade out] seconds per scene
function metaClock(t){return['3:12 A.M.',0];} // [text for the top-right clock, 1 = red/blinking]
