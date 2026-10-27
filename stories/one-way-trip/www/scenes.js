// ===================== No One to Come Back To, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,at){return dip(t,at,.12);}
const fade=(t,a,b)=>ss(seg(t,a,b));
// cold open: home, a hundred years later
function a1(t){const k=ss(seg(t,0,E(1)));ruins({x:lerp(980,960,k),y:lerp(600,540,k),z:lerp(1.5,1.0,k)},t,{});
  pill(60,60,'SHIP CLOCK','2 YEARS',OW.cy,fade(t,W(0,.2),W(0,.3)),420);pill(1440,60,'EARTH','100 YEARS',OW.or,fade(t,W(0,.62),W(0,.72)),420);}
// more motion through space = less through time
function b1(t){stArrow({x:960,y:540,z:1},t,{v:ss(seg(t,W(2,.35),E(2)))});}
// the light clock; on a ship
function b2(t){if(t<T(4)-.15){lightClock({x:960,y:540,z:lerp(1.08,1,seg(t,T(3),E(3)))},t,{P:1.2,pillA:fade(t,W(3,.6),W(3,.7))});blackout(cut(t,T(4)-.15));return;}
  lightClock({x:960,y:540,z:lerp(1,.86,ss(seg(t,T(4),W(4,.4))))},t,{P:1.2,inShip:true,pillA:1});}
// from Earth: the slanted path; the speed limit
function b3(t){if(t<T(6)-.15){earthView({x:960,y:540,z:1},t,{P:1.6,v:440,t0:T(5),compare:fade(t,W(5,.72),W(5,.85))});blackout(cut(t,T(6)-.15));return;}
  speedSign({x:960,y:540,z:1},t,{s:lerp(.9,1,ss(seg(t,T(6),W(6,.3))))});}
// so the ship's clock ticks slower; everything slows with it
function b4(t){twoClocks({x:960,y:540,z:1},t,{P2:2.6,ecg:fade(t,T(8),T(8)+.4)});}
// GPS
function c1(t){gps({x:960,y:540,z:1},t,{drift:ss(seg(t,W(9,.5),E(9))),pillA:fade(t,W(9,.25),W(9,.35))});}
// the speed slider
function c2(t){let pct='0%',knob=0,rate='100%',earth='1 s',years=0,streak=0;
  if(t<T(11)-.1){const k=ss(seg(t,W(10,.3),W(10,.55)));knob=lerp(.1,.55,k);pct=k<1?Math.round(lerp(10,90,k))+'%':'90%';rate=k>.95?'44%':'—';earth=k>.95?'2.3 s':'—';streak=.1*k;}
  else{const k1=ss(seg(t,W(11,0),W(11,.12))),k2=ss(seg(t,W(11,.3),W(11,.45)));knob=lerp(lerp(.55,.8,k1),.97,k2);pct=k2>.95?'99.99%':(k1>.95?'99%':'90%');rate=k2>.95?'1.4%':(k1>.95?'14%':'44%');earth=k2>.95?'70.7 s':(k1>.95?'7.1 s':'2.3 s');streak=lerp(.2,.7,k2);years=fade(t,W(11,.7),W(11,.82));}
  speedPanel({x:960,y:540,z:1},t,{pct:0,label:pct,knob,rate,earth,years,streak});}
// the round trip to a star 50 light-years away
function d1(t){const k=seg(t,W(12,.3),W(13,.6));starMap({x:960,y:540,z:1},t,{k,you:lerp(0,1.4,k),earth:lerp(0,100,k)});}
// a hundred years; you're the younger one
function d2(t){if(t<T(15)-.15){century({x:960,y:540,z:lerp(1,1.05,seg(t,T(14),E(14)))},t,{k:ss(seg(t,T(14),W(14,.85)))});blackout(cut(t,T(15)-.15));return;}
  twins({x:960,y:540,z:1},t,{k:ss(seg(t,T(15),W(15,.6))),figs:fade(t,W(15,.6),W(15,.75))});}
// Andromeda; Earth after 2.5 million years
function d3(t){if(t<T(17)-.15){andromeda({x:960,y:540,z:1},t,{k:ss(seg(t,W(16,.2),E(16)))});blackout(cut(t,T(17)-.15));return;}
  earthFade({x:960,y:540,z:lerp(1,1.1,seg(t,T(17),E(17)))},t,{k:ss(seg(t,W(17,.4),E(17)))});}
// no one to come back to
function d4(t){const k=ss(seg(t,T(18),E(18)+.8));ruins({x:lerp(960,960,k),y:lerp(540,640,k),z:lerp(1.0,1.6,k)},t,{});}
// Alcubierre
function e1(t){equation({x:960,y:540,z:lerp(1.0,1.06,seg(t,T(19),E(19)))},t,{eq:fade(t,T(19),W(19,.3)),name:fade(t,W(19,.5),W(19,.65))});}
// squeeze ahead, stretch behind; a moving walkway
function e2(t){if(t<W(20,.7)){warpSurface({x:960,y:540,z:1},t,{amp:fade(t,T(20),W(20,.2)),labels:fade(t,W(20,.15),W(20,.3)),streak:.25});blackout(cut(t,W(20,.7)));return;}
  walkway({x:960,y:540,z:1},t,{});}
// no time dilation inside; you could come home
function e3(t){if(t<T(22)-.15){syncClocks({x:960,y:540,z:1},t,{same:fade(t,W(21,.6),W(21,.75))});blackout(cut(t,T(22)-.15));return;}
  homecoming({x:960,y:600,z:lerp(1.0,1.12,seg(t,T(22),E(22)+.8))},t,{});}
// the catch
function e4(t){if(t<T(24)-.15){negEnergy({x:960,y:540,z:1},t,{v:ss(seg(t,W(23,.15),W(23,.4))),q:fade(t,W(23,.55),W(23,.7))});blackout(cut(t,T(24)-.15));return;}
  causality({x:960,y:540,z:1},t,{k:seg(t,W(24,.25),W(24,.7))});}
// one-way trip
function f1(t){const k=ss(seg(t,T(25),E(26)));departure({x:960,y:540,z:1},t,{k,streak:lerp(0,.6,ss(seg(t,T(26),E(26))))});
  if(t>E(26)+.6)blackout(ss(seg(t,E(26)+.6,E(26)+1.2)));}
const SCENES={a1,b1,b2,b3,b4,c1,c2,d1,d2,d3,d4,e1,e2,e3,e4,f1};
const FADES={a1:[0,.25],b1:[.25,.25],b2:[.25,.25],b3:[.25,.25],b4:[.25,.25],c1:[.25,.25],c2:[.25,.25],d1:[.25,.25],d2:[.25,.25],d3:[.25,.25],d4:[.25,.25],e1:[.25,.25],e2:[.25,.25],e3:[.25,.25],e4:[.25,.25],f1:[.25,0]};
function metaClock(t){if(t<T(2))return['SHIP LOG · YEAR 2',1];if(t<T(12))return['SPECIAL RELATIVITY',0];if(t<T(19))return['THE TRIP',0];if(t<T(25))return['WARP DRIVE',0];return['ONE-WAY',1];}
