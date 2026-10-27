// ===================== Keys In It, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,at){return dip(t,at,.12);}
const stuckPose={armL:-1.6,elbowL:.1,lean:-.12};
// cold open: the car at the water, my hand on the door
function k1(t){const k=ss(seg(t,0,E(0)+.6));loch({x:lerp(760,700,k),y:lerp(640,700,k),z:lerp(1.2,1.7,k)},t,{car:true,beam:true,exhaust:true,you:Object.assign({x:520},stuckPose),mist:true});}
// the legend, as an old woodcut
function k2(t){if(t<T(2)-.15){woodcut({x:960,y:540,z:lerp(1.0,1.05,seg(t,T(1),E(1)))},t,{caption:'Each-uisge · the water horse'});blackout(cut(t,T(2)-.15));return;}
  const k=ss(seg(t,T(2),E(2)));woodcut({x:lerp(960,700,k),y:lerp(540,640,k),z:lerp(1.0,1.5,k)},t,{horse:true,saddle:true});}
function k3(t){if(t<T(4)-.15){woodcut({x:960,y:560,z:1.0},t,{horse:true,saddle:true,rider:true,ride:ss(seg(t,W(3,.25),E(3)))});blackout(cut(t,T(4)-.15));return;}
  woodcut({x:1300,y:700,z:lerp(1.4,1.6,seg(t,T(4),E(4)))},t,{ripples:true});}
// nobody rides horses anymore; tonight, the car
function k4(t){if(t<T(6)-.15){const k=seg(t,T(5),E(5));loch({x:lerp(400,700,k),y:620,z:1.0},t,{mist:true});blackout(cut(t,T(6)-.15));return;}
  const k=ss(seg(t,T(6),E(6)));loch({x:lerp(700,640,k),y:lerp(620,700,k),z:lerp(1.0,1.4,k)},t,{car:true,carA:ss(seg(t,W(6,.15),W(6,.4))),mist:true});}
// engine, headlights, keys; I touch the door
function k5(t){if(t<T(8)-.15){interior({x:lerp(900,700,seg(t,T(7),E(7))),y:lerp(400,560,seg(t,T(7),E(7))),z:lerp(1.0,1.6,ss(seg(t,W(7,.55),E(7))))},t,{beam:true,gear:0});blackout(cut(t,T(8)-.15));return;}
  const k=ss(seg(t,T(8),E(8)));loch({x:lerp(800,600,k),y:lerp(680,720,k),z:lerp(1.2,1.7,k)},t,{car:true,beam:true,exhaust:true,you:Object.assign({x:lerp(200,520,ss(seg(t,T(8),W(8,.6)))),walk:t<W(8,.6)?t*4:null},t>W(8,.7)?stuckPose:{}),mist:true});}
// warm, soft, stuck; the door opens, the seat is wet, the radio plays water
function k6(t){if(t<T(10)-.15){handDoor({x:960,y:560,z:lerp(1.0,1.15,seg(t,T(9),E(9)))},t,{stick:ss(seg(t,W(9,.2),W(9,.6))),pull:ss(seg(t,W(9,.6),E(9)))});blackout(cut(t,T(10)-.15));return;}
  const k=seg(t,T(10),E(10));interior({x:lerp(700,960,k),y:lerp(800,560,k),z:lerp(1.6,1.1,k)},t,{door:true,beam:true,gear:0});}
// the boy and his finger; my pocketknife
function k7(t){if(t<T(12)-.15){woodcut({x:lerp(960,900,seg(t,T(11),E(11))),y:600,z:lerp(1.0,1.3,seg(t,T(11),E(11)))},t,{child:true,stuck:t>W(11,.4)});blackout(cut(t,T(12)-.15));return;}
  handDoor({x:lerp(1100,1250,seg(t,T(12),E(12))),y:lerp(620,720,seg(t,T(12),E(12))),z:lerp(1.1,1.3,seg(t,T(12),E(12)))},t,{stick:1,pull:.3,knife:ss(seg(t,W(12,.1),W(12,.5)))});}
// into drive, by itself; the car starts to roll
function k8(t){if(t<W(13,.75)){const g=ss(seg(t,W(13,.15),W(13,.4)));interior({x:lerp(1100,1300,ss(seg(t,T(13),W(13,.3)))),y:lerp(600,780,ss(seg(t,T(13),W(13,.3)))),z:lerp(1.3,2.0,ss(seg(t,T(13),W(13,.3))))},t,{door:true,beam:true,gear:g});return;}
  const r=ss(seg(t,W(13,.75),E(13)+1.6));loch({x:lerp(700,820,r),y:700,z:1.3},t,{car:true,carX:lerp(640,860,r),beam:true,exhaust:true,you:Object.assign({x:lerp(520,740,r)},stuckPose),mist:true});
  if(t>E(13)+.8)blackout(ss(seg(t,E(13)+.8,E(13)+1.5)));}
const SCENES={k1,k2,k3,k4,k5,k6,k7,k8};
const FADES={k1:[0,.25],k2:[.25,.25],k3:[.25,.25],k4:[.25,.25],k5:[.25,.25],k6:[.25,.25],k7:[.25,.25],k8:[.25,0]};
function metaClock(t){if(t<T(1))return['LOCH · 1:20 A.M.',1];if(t<T(5))return['THE LEGEND',0];if(t<T(11))return['LOCH · 1:14 A.M.',0];return['LOCH · 1:20 A.M.',1];}
