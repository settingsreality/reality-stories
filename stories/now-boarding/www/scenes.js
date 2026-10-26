// ===================== Now Boarding, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,at){return dip(t,at,.12);}
const easeOut=x=>1-(1-clamp(x))**2;
// where the plane is (distance along the route) and what the card says, over the whole story
function planeD(t){
  if(t<T(3))return 0;
  if(t<W(3,.85))return lerp(0,RD.exit,easeOut(seg(t,T(3),W(3,.85))));
  if(t<T(5))return lerp(RD.exit,RD.fence,seg(t,W(3,.85),E(4)+.6));
  if(t<T(7))return lerp(RD.fence,RD.corner+200,seg(t,T(5),E(6)+.4));
  if(t<T(11))return lerp(RD.maple-60,RD.near,seg(t,T(7),E(9)));
  return lerp(RD.near,RD.end,ss(seg(t,T(11),W(11,.9))));}
function card(t){const d=planeD(t);if(t<T(1))return{status:'Arrived',spd:0};
  if(t<W(3,.85))return{status:'Landed',spd:Math.round(lerp(140,18,easeOut(seg(t,T(3),W(3,.85)))))};
  if(t<T(11))return{status:'Taxiing',spd:t<T(5)?18:29};
  if(t<W(12,.3))return{status:'Taxiing',spd:Math.round(lerp(25,0,seg(t,T(11),W(11,.9))))};
  return{status:'Arrived',spd:0,boarding:t>W(13,.55)?ss(seg(t,W(13,.55),W(13,.75))):0};}
function camOn(d,z,dx=0,dy=0){const p=routeAt(d);return{x:p.x+dx,y:p.y+dy,z};}
// cold open: the plane in my driveway
function b1(t){const k=ss(seg(t,0,E(0)+.6));mapView(camOn(RD.end,lerp(2.6,1.6,k),-60,80),t,{d:RD.end,h:-Math.PI/2,tag:true,card:card(t)});}
// every flight, live; then me on the couch
function b2(t){if(t<T(2)-.15){const k=seg(t,T(1),E(1));mapView({x:1400,y:420,z:lerp(.32,.42,k)},t+20,{others:true,d:0,card:null});blackout(cut(t,T(2)-.15));return;}
  const k=seg(t,T(2),E(2));room({x:lerp(700,560,k),y:lerp(560,600,k),z:lerp(1.0,1.25,k)},t,{sit:true});}
// landing, off the runway, past the gate
function b3(t){const d=planeD(t);const z=t<T(4)?lerp(.75,1.15,ss(seg(t,T(3),E(3)))):1.15;mapView(camOn(d,z,60,40),t,{d,tag:true,card:card(t)});}
// through the fence, across the highway, toward the houses
function b4(t){const d=planeD(t);mapView(camOn(d,lerp(1.0,.7,ss(seg(t,T(5),E(6)))),200,60),t,{d,tag:true,card:card(t)});}
// the airline, then dad
function b5(t){if(t<T(8)-.15){phone({x:960,y:lerp(560,500,seg(t,T(7),E(7))),z:lerp(.95,1.05,seg(t,T(7),E(7)))},t,()=>airlineScreen(seg(t,W(7,.35),W(7,.5))));blackout(cut(t,T(8)-.15));return;}
  phone({x:960,y:480,z:lerp(1.0,1.1,seg(t,T(8),E(8)))},t,()=>textScreen(seg(t,W(8,.2),W(8,.35))));}
// turning onto my street; the window shows nothing
function b6(t){if(t<T(10)-.15){const d=planeD(t);mapView(camOn(d,lerp(1.1,1.5,seg(t,T(9),E(9))),80,-40),t,{d,tag:true,card:card(t)});blackout(cut(t,T(10)-.15));return;}
  const k=seg(t,T(10),E(10)+.8);street({x:lerp(980,960,k),y:lerp(600,640,k),z:lerp(1.0,1.15,k)},t,{});vign(.4);}
// it slows and turns into the driveway: Arrived
function b7(t){const d=planeD(t);mapView(camOn(d,lerp(1.6,2.4,ss(seg(t,T(11),E(12)))),-40,60),t,{d,h:d>RD.turn?-Math.PI/2:undefined,tag:true,card:card(t)});}
// one more line
function b8(t){const k=ss(seg(t,T(13)-.5,E(13)+2));mapView(camOn(RD.end,lerp(2.4,2.9,k),-40,-70),t,{d:RD.end,h:-Math.PI/2,tag:true,card:card(t)});vign(.35);
  if(t>E(13)+.6)blackout(ss(seg(t,E(13)+.6,E(13)+1.3)));}
const SCENES={b1,b2,b3,b4,b5,b6,b7,b8};
const FADES={b1:[0,.25],b2:[.25,.25],b3:[.25,0],b4:[0,.25],b5:[.25,.25],b6:[.25,.25],b7:[.25,0],b8:[0,0]};
function metaClock(t){if(t<T(1))return['12:31 A.M.',1];if(t<T(3))return['11:38 P.M.',0];if(t<T(7))return['11:42 P.M.',0];if(t<T(9))return['11:58 P.M.',0];return['12:31 A.M.',t>T(13)?1:0];}
