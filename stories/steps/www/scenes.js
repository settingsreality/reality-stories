// ===================== Steps, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,i){return dip(t,T(i)-.15,.12);}
function vignA(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
const hm=(h,m,s)=>`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
function s1(t){if(t<W(0,.55)){stepPhone({x:960,y:lerp(470,520,seg(t,0,W(0,.55))),z:lerp(1.2,1.1,seg(t,0,W(0,.55)))},t,{k:ss(seg(t,0,1.6))});blackout(dip(t,W(0,.55),.1));return;}
  bedCam({x:960,y:560,z:1.05},t,{phone:'up',stamp:'02:47:13'});blackout(dip(t,W(0,.55),.1));}
function s2(t){if(t<T(2)-.15){bedCam({x:lerp(900,1000,seg(t,T(1),E(1))),y:600,z:1.25},t,{phone:'up',dirt:true,ir:t<W(1,.55)?false:true,stamp:'23:58:40'});vignA(.3);blackout(cut(t,2));return;}
  stepPhone({x:960,y:500,z:1.1},t,{k:0,bg:'#0d0f13'});blackout(cut(t,2));}
function s3(t){const gone=t>W(4,.55);const s=Math.floor(lerp(0,59,seg(t,T(3),E(4))));bedCam({x:t<T(4)?960:lerp(800,500,ss(seg(t,T(4),W(4,.5)))),y:600,z:t<T(4)?1.05:lerp(1.05,2.0,ss(seg(t,T(4),W(4,.5))))},t,{phone:gone?'gone':'up',stamp:t<T(4)?hm(1,40+Math.floor(s/3),s):hm(3,11,Math.floor(lerp(40,59,seg(t,T(4),W(4,.55)))))+''});
  if(t>W(4,.5)&&t<W(4,.6))blackout(.6);}
function s4(t){const back=t>W(5,.25);bedCam({x:lerp(500,700,seg(t,T(5),E(5))),y:600,z:lerp(2.0,1.6,seg(t,T(5),E(5)))},t,{phone:back?'down':'gone',stamp:back?'03:52:07':'03:31:22'});if(t>W(5,.2)&&t<W(5,.28))blackout(.6);}
function s5(t){if(t<T(7)-.15){stepPhone({x:960,y:520,z:1.1},t,{k:1});blackout(cut(t,7));return;}
  stepPhone({x:960,y:lerp(500,470,seg(t,T(7),E(7))),z:lerp(1.1,1.25,seg(t,T(7),E(7)))},t,{mode:'map',route:ss(seg(t,W(7,.15),E(7)+3))*.55});blackout(cut(t,7));}
function s6(t){if(t<T(9)-.15){stepPhone({x:960,y:470,z:1.3},t,{mode:'map',route:lerp(.55,1,ss(seg(t,T(8),E(8))))});blackout(cut(t,9));return;}
  topDown({x:960,y:540,z:lerp(.9,1.0,seg(t,T(9),E(9)))},t,{walker:{ang:t*1.1,a:.5}});vignA(.5);blackout(cut(t,9));}
function s7(t){const k=ss(seg(t,T(10),W(11,.3)));topDown({x:960,y:540,z:lerp(.85,.95,seg(t,T(10),E(11)))},t,{ring:k});vignA(.35);}
function s8(t){if(t<T(13)-.15){topDown({x:960,y:540,z:.9},t,{ring:1});vignA(.4);blackout(cut(t,13));return;}
  const carry=t>T(14)-.1?1:0;topDown({x:960,y:540,z:lerp(.9,1.05,seg(t,T(13),E(14)+1))},t,{ring:1,walker:{ang:t*.9,a:1},carry});vignA(.55);if(t>E(14)+.6)blackout(ss(seg(t,E(14)+.6,E(14)+1.2)));}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8};
const FADES={s1:[0,.25],s2:[.25,.25],s3:[.25,0],s4:[0,.25],s5:[.25,.25],s6:[.25,.25],s7:[.25,.25],s8:[.25,0]};
function metaClock(t){if(t<T(3))return['STEPS · LAST NIGHT',0];if(t<T(6))return['BEDROOM CAM',1];return['4,212 STEPS · 40 MIN',1];}
