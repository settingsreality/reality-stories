// ===================== Green Light, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,at){return dip(t,at,.12);}
function label(s,a,y=110){if(a<=0)return;ctx.save();ctx.setTransform(SC,0,0,SC,0,0);text(s,960,y,'500 40px PM','#f4e6dc','center',a);ctx.restore();}
// cold open: the door has stopped halfway and is going back up; the beam is broken in the empty bay
function g1(t){const k=ss(seg(t,0,E(0)+.6));const up=ss(seg(t,W(0,.15),W(0,.5)));
  garage({x:lerp(1150,1000,k),y:lerp(640,620,k),z:lerp(1.55,1.2,k)},t,{door:.5*(1-up),light:1,beam:1,brk:1236,tracks:1,vapor:1,tail:1,exhaustMine:.5});vign(.35);}
// the loop under the road: a car sets it off, a bike doesn't
function g2(t){if(t<T(2)-.15){const k=seg(t,T(1),E(1));const cx=lerp(-300,960,ss(seg(t,W(1,.45),W(1,.75))));
    loopCut({x:960,y:lerp(640,600,k),z:lerp(1.05,1.15,k)},t,{car:true,carX:cx,det:cx>800?1:0,label:t>W(1,.8)?'CAR DETECTED':''});blackout(cut(t,T(2)-.15));return;}
  const bx=lerp(-200,960,ss(seg(t,T(2),W(2,.4))));loopCut({x:960,y:600,z:1.1},t,{bike:1,bikeX:bx,det:0,label:t>W(2,.45)?'NOTHING DETECTED':''});}
// 3 a.m. at the light, then the empty side street gets a green
function g3(t){const sw=W(3,.62);
  if(t<sw-.12){const k=seg(t,T(3),sw);dashView({x:960,y:lerp(560,500,k),z:lerp(1,1.08,k)},t,{light:'r'});blackout(cut(t,sw-.12));return;}
  if(t<T(4)-.15){const k=ss(seg(t,sw,E(3)));topInt({x:lerp(900,880,k),y:lerp(560,420,k),z:lerp(.95,1.25,k)},t,{sig:{mine:'r',turn:'r',side:'g'},det:{mine:1,side:1},labels:true});return;}
  const k=ss(seg(t,T(4),E(4)));topInt({x:lerp(880,880,k),y:lerp(420,300,k),z:lerp(1.25,2.0,k)},t,{sig:{mine:'r',turn:'r',side:t<W(4,.8)?'g':'r'},det:{mine:1,side:t<W(4,.8)?1:0}});
  label('NOTHING ON IT',ss(seg(t,W(4,.15),W(4,.3)))*(1-ss(seg(t,W(4,.85),E(4)))));}
// the turn lane beside me gets its own green
function g4(t){if(t<T(6)-.15){const k=ss(seg(t,T(5),E(5)));const on=t>W(5,.3);
    topInt({x:lerp(800,720,k),y:lerp(560,610,k),z:lerp(1.3,1.9,k)},t,{sig:{mine:'r',turn:on?'g':'r',side:'r'},det:{mine:1,turn:on?1:0}});blackout(cut(t,T(6)-.15));return;}
  const k=seg(t,T(6),E(6)+1);sideWindow(shake({x:lerp(980,1060,k),y:lerp(520,560,k),z:lerp(1.05,1.25,k)},t,2,6),t,{arrow:'g',vapor:ss(seg(t,W(6,.2),W(6,.5))),gap:ss(seg(t,W(6,.4),E(6)))*.9,hand:1});vign(.3);}
// green, and every light ahead already green
function g5(t){if(t<T(8)-.15){const gk=t>W(7,.15);const sp=ss(seg(t,W(7,.5),E(7)+.3));
    dashView(shake({x:960,y:520,z:lerp(1.08,1.0,sp)},t,sp*4,3),t,{light:gk?'g':'r',off:Math.max(0,t-W(7,.5))*sp*1.6});blackout(cut(t,T(8)-.15));return;}
  dashView(shake({x:960,y:520,z:1.0},t,3,3),t,{ahead:true,off:(t-T(8))*2.2});}
// the mirror: empty, the whole way
function g6(t){const k=ss(seg(t,T(9),W(9,.5)));dashView(shake({x:lerp(960,1180,k),y:lerp(520,130,k),z:lerp(1,3.6,k)},t,lerp(3,1,k),3),t,{nosig:true,off:(t-T(8))*2.2,mx:1180,my:120});
  vign(.35);}
// home: the door comes down, stops, goes back up
function g7(t){const k=seg(t,T(10),E(11));const down=ss(seg(t,W(10,.25),T(11)+.5))*.48;const up=ss(seg(t,T(11)+.9,E(11)+.8));
  const brk=t>T(11)+.4?1236:null;garage({x:lerp(960,1020,k),y:lerp(600,640,k),z:lerp(1.0,1.15,k)},t,{door:down*(1-up),light:1,beam:t>W(10,.4)?1:0,brk,tail:1,exhaustMine:.6,tracks:ss(seg(t,T(11)+.4,T(11)+1.4))});
  if(t<W(10,.4))label('',0);}
// engine off. quiet. then the other engine
function g8(t){const k=ss(seg(t,T(12),E(13)+2));const off=t>W(12,.25);
  garage(shake({x:lerp(1020,1200,k),y:lerp(640,760,k),z:lerp(1.15,2.0,k)},t,ss(seg(t,W(13,.4),E(13)))*2,4),t,{door:0,light:1,beam:1,brk:1236,tail:!off,exhaustMine:off?0:.6,tracks:1,vapor:ss(seg(t,W(13,.3),W(13,.6)))});vign(.4);
  if(t>E(13)+.6)blackout(ss(seg(t,E(13)+.6,E(13)+1.3)));}
const SCENES={g1,g2,g3,g4,g5,g6,g7,g8};
const FADES={g1:[0,.25],g2:[.25,.25],g3:[.25,0],g4:[0,.25],g5:[.25,0],g6:[0,.25],g7:[.25,0],g8:[0,0]};
function metaClock(t){if(t<T(1))return['3:19 A.M.',1];if(t<T(10))return['3:04 A.M.',0];return['3:19 A.M.',t>T(13)?1:0];}
