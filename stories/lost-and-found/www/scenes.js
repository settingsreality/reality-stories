// ===================== Lost & Found, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,at){return dip(t,at,.12);}
const FIRST=['keys','wallet','headphones','phone'],ALL=['keys','wallet','headphones','phone','watch','glasses','collar'];
function upto(t,list,times){return list.filter((n,i)=>t>=times[i]);}
// the box on the porch
function l1(t){const k=ss(seg(t,0,E(0)+.6));boxTop({x:lerp(980,960,k),y:lerp(620,560,k),z:lerp(1.35,1.0,k)},t,{show:[...ALL,'photo'],small:true,smallLab:0});}
function l2(t){const k=ss(seg(t,T(1),E(1)));porch({x:lerp(960,900,k),y:lerp(560,760,k),z:lerp(1.1,2.6,k)},t,{});}
// my keys, twice; then the rest of the top layer
function l3(t){if(t<W(2,.3)){boxTop({x:lerp(960,760,ss(seg(t,T(2),W(2,.3)))),y:lerp(560,460,ss(seg(t,T(2),W(2,.3)))),z:lerp(1.0,1.6,ss(seg(t,T(2),W(2,.3))))},t,{show:['keys']});blackout(cut(t,W(2,.3)));return;}
  if(t<T(3)-.15){twoKeys({x:960,y:560,z:lerp(1.0,1.05,seg(t,W(2,.3),E(2)))},t,{match:ss(seg(t,W(2,.6),W(2,.75)))});blackout(cut(t,T(3)-.15));return;}
  const show=upto(t,['keys','wallet','headphones','phone'],[0,W(3,.15),W(3,.3),W(3,.5)]);const z=ss(seg(t,W(3,.6),E(3)));
  boxTop({x:lerp(960,960,z),y:lerp(560,620,z),z:lerp(1.0,1.9,z)},t,{show});}
// it cracks, the same way
function l4(t){if(t<T(5)-.15){const d=ss(seg(t,W(4,.35),W(4,.45)));floorDrop({x:lerp(960,1200,ss(seg(t,W(4,.7),E(4)))),y:560,z:lerp(1.3,1.0,ss(seg(t,W(4,.7),E(4))))},t,{drop:d,crack:ss(seg(t,W(4,.45),W(4,.6))),compare:t>W(4,.7)});blackout(cut(t,T(5)-.15));return;}
  boxTop({x:960,y:560,z:lerp(1.2,1.0,seg(t,T(5),E(5)))},t,{show:FIRST});}
// deeper: the watch, the glasses, her collar; she's asleep on the couch
function l5(t){if(t<W(6,.8)){const show=upto(t,ALL,[0,0,0,0,W(6,.2),W(6,.35),W(6,.5)]);const z=ss(seg(t,W(6,.5),W(6,.75)));boxTop({x:lerp(960,780,z),y:lerp(560,860,z),z:lerp(1.0,2.2,z)},t,{show});blackout(cut(t,W(6,.8)));return;}
  couch({x:960,y:560,z:lerp(1.0,1.1,seg(t,W(6,.8),E(6)+.8))},t,{noCollar:true});}
// a week of losing them; something new every night
function l6(t){if(t<T(8)-.15){week({x:960,y:540,z:1.0},t,{day:lerp(0,2.6,seg(t,W(7,.2),E(7)))});blackout(cut(t,T(8)-.15));return;}
  const pa=ss(seg(t,W(8,.45),W(8,.7)));boxTop({x:lerp(960,1200,pa),y:lerp(560,400,pa),z:lerp(1.0,1.6,pa)},t,{show:[...ALL,'photo'],gone:['keys','headphones'],photoA:pa});}
// the small box at the bottom
function l7(t){const lab=ss(seg(t,W(9,.6),W(9,.8)));const z=t<T(10)?ss(seg(t,W(9,.5),E(9)))*.6:.6+.4*ss(seg(t,T(10),W(10,.4)));
  boxTop({x:960,y:lerp(560,520,z),z:lerp(1.0,2.4,z)},t,{small:true,smallLab:t<W(9,.6)?0:lab});}
// the note in the lid
function l8(t){const w=seg(t,T(12)-.2,E(12)-.1);const z=ss(seg(t,T(11),E(12)+1.5));boxTop({x:960,y:540,z:lerp(1.0,1.5,z)},t,{small:true,lid:ss(seg(t,W(11,.3),W(11,.6))),write:t<T(12)-.2?0:w});
  if(t>E(12)+.6)blackout(ss(seg(t,E(12)+.6,E(12)+1.3)));}
const SCENES={l1,l2,l3,l4,l5,l6,l7,l8};
const FADES={l1:[0,.25],l2:[.25,.25],l3:[.25,.25],l4:[.25,.25],l5:[.25,.25],l6:[.25,.25],l7:[.25,.25],l8:[.25,0]};
function metaClock(t){if(t<T(4))return['SUNDAY',0];if(t<T(7))return['MONDAY',0];if(t<T(9))return['THIS WEEK',0];return['SATURDAY · OCT 26',1];}
