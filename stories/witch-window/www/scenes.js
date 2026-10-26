// ===================== Witch Window, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,i){return dip(t,T(i)-.15,.12);}
function w1(t){const k=ss(seg(t,0,E(0)+.8));bedroomW({x:lerp(1300,1400,k),y:lerp(260,220,k),z:lerp(1.9,2.4,k)},t,{face:1,scratch:false});}
function w2(t){if(t<T(2)-.15){farmhouse({x:lerp(800,1000,seg(t,T(1),E(1))),y:480,z:lerp(.9,1.05,seg(t,T(1),E(1)))},t,{lit:true});text2('WITCH WINDOW',ss(seg(t,W(1,.2),W(1,.35))));blackout(cut(t,2));return;}
  farmhouse({x:lerp(1050,1200,ss(seg(t,T(2),E(2)))),y:lerp(450,400,ss(seg(t,T(2),E(2)))),z:lerp(1.3,2.6,ss(seg(t,T(2),E(2))))},t,{lit:true});blackout(cut(t,2));}
function text2(s,a){if(a<=0)return;ctx.save();ctx.setTransform(SC,0,0,SC,0,0);text(s,960,980,'500 46px PM','#f4e6dc','center',a);ctx.restore();}
function w3(t){if(t<T(4)-.15){const x=lerp(1500,950,ss(seg(t,T(3),W(3,.7))));farmhouse({x:900,y:520,z:.95},t,{lit:false,you:{x,y:800,face:-1,walk:t<W(3,.7)?t*4:null}});blackout(cut(t,4));return;}
  bedroomW({x:lerp(800,1000,seg(t,T(4),E(4))),y:420,z:1.0},t,{face:0});}
function w4(t){if(t<T(6)-.15){bedroomW({x:lerp(1000,1250,ss(seg(t,T(5),E(5)))),y:lerp(420,300,ss(seg(t,T(5),E(5)))),z:lerp(1.0,1.5,ss(seg(t,T(5),E(5))))},t,{face:ss(seg(t,W(5,.35),W(5,.6)))});blackout(cut(t,6));return;}
  bedroomW({x:lerp(1350,1420,seg(t,T(6),E(6))),y:lerp(250,210,seg(t,T(6),E(6))),z:lerp(2.0,2.6,ss(seg(t,T(6),E(6))))},t,{face:1,scratch:true});blackout(cut(t,6));}
function w5(t){if(t<T(8)-.15){porchTalk({x:620,y:600,z:lerp(1.0,1.1,seg(t,T(7),E(7)))},t,{});blackout(cut(t,8));return;}
  photo({x:960,y:540,z:lerp(1.0,1.08,seg(t,T(8),E(8)))},t,{k:ss(seg(t,W(8,.4),E(8)+2))*.8});blackout(cut(t,8));}
function w6(t){if(t<T(10)-.15){photo({x:960,y:540,z:1.08},t,{k:.8+.2*ss(seg(t,T(9),E(9)))});blackout(cut(t,10));return;}
  porchTalk({x:lerp(500,420,seg(t,T(10),E(10))),y:lerp(560,500,seg(t,T(10),E(10))),z:lerp(1.3,1.8,ss(seg(t,T(10),E(10))))},t,{});blackout(cut(t,10));}
function w7(t){const op=ss(seg(t,W(12,.15),W(12,.45)))*.85;const en=ss(seg(t,W(12,.55),E(12)+3))*.6;bedroomW({x:lerp(900,1150,ss(seg(t,T(12),E(12)))),y:lerp(420,330,ss(seg(t,T(12),E(12)))),z:lerp(1.0,1.35,ss(seg(t,T(12),E(12))))},t,{open:t<T(12)?0:op,enter:t<T(12)?0:en});}
function w8(t){const en=lerp(.6,1,ss(seg(t,T(13)-.5,E(13)+.6)));bedroomW({x:1150,y:330,z:1.35},t,{open:.85,enter:en});if(t>E(13)+.5)blackout(ss(seg(t,E(13)+.5,E(13)+1.1)));}
const SCENES={w1,w2,w3,w4,w5,w6,w7,w8};
const FADES={w1:[0,.25],w2:[.25,.25],w3:[.25,0],w4:[0,.25],w5:[.25,.25],w6:[.25,.25],w7:[.25,0],w8:[0,0]};
function metaClock(t){if(t<T(7))return['VERMONT · 2:40 A.M.',0];if(t<T(11))return['THE OLD OWNER',0];return['2:40 A.M.',1];}
