// ===================== Mimic, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,i){return dip(t,T(i)-.15,.12);}
function vignA(a){ctx.save();ctx.setTransform(1,0,0,1,0,0);const g=ctx.createRadialGradient(540,304,180,540,304,640);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(0,0,0,${a})`);ctx.fillStyle=g;ctx.fillRect(0,0,1080,608);ctx.restore();}
const OCT=(pose,from,k,extra={})=>Object.assign({x:960,y:900,s:1.25,pose,from,k},extra);
function wetPrints(t0,t1,t,x0,x1,y){const out=[];const n=14;for(let i=0;i<n;i++){const u=i/(n-1);const at=lerp(t0,t1,u);if(t<at)break;out.push({x:lerp(x0,x1,u)+(i%2?-14:14),y:y+(i%2?6:0),a:1});}return out;}
function m1(t){if(t<W(0,.55)){tank({x:960,y:lerp(560,520,seg(t,0,W(0,.55))),z:lerp(1.15,1.3,seg(t,0,W(0,.55)))},t,{octo:OCT('stand','stand',1,{y:880,s:1.3,wave:true})});vignA(.4);blackout(dip(t,W(0,.55),.1));return;}
  const x=lerp(300,900,seg(t,W(0,.55),E(0)));gallery({x:900,y:560,z:1.0},t,{fake:{x,y:1000,face:1,walk:t*4.5,tentacle:true},door:1500});cctvize(t,'GALLERY 2','04:10:31');blackout(dip(t,W(0,.55),.1));}
function m2(t){if(t<W(1,.45)){const x=lerp(-200,1100,seg(t,T(1),W(1,.45)));gallery({x:lerp(500,900,seg(t,T(1),W(1,.45))),y:560,z:1.0},t,{guard:{x,y:1000,face:1,walk:t*4,light:1},octo:OCT('rest','rest',1,{s:.9})});blackout(dip(t,W(1,.45),.1));return;}
  tank({x:960,y:600,z:1.0},t,{octo:OCT('rest','rest',1),label:'MIMIC OCTOPUS · FOUND IN 1998 · INDONESIA',labelA:ss(seg(t,W(1,.5),W(1,.65)))});blackout(dip(t,W(1,.45),.1));}
function m3(t){const u=seg(t,T(2),E(2));let pose,from,k;if(u<.33){pose='flat';from='rest';k=ss(seg(u,0,.12));}else if(u<.66){pose='lion';from='flat';k=ss(seg(u,.33,.45));}else{pose='snake';from='lion';k=ss(seg(u,.66,.78));}
  const lab=u<.33?'FLATFISH':u<.66?'LIONFISH':'SEA SNAKE';tank({x:960,y:600,z:1.0},t,{octo:OCT(pose,from,k,{y:pose==='flat'?860:900,striped:true}),label:lab,labelA:1});}
function m4(t){if(t<T(4)-.15){tank({x:960,y:620,z:1.05},t,{octo:OCT('rest','snake',1),guard:{x:lerp(-200,500,seg(t,T(3),E(3))),y:1180,face:1,walk:t*4}});vignA(.3);blackout(cut(t,4));return;}
  const k=ss(seg(t,T(4),W(4,.7)));tank({x:960,y:lerp(640,520,k),z:lerp(1.05,1.25,k)},t,{octo:OCT('stand','rest',k)});vignA(.35);blackout(cut(t,4));}
function m5(t){if(t<T(6)-.15){tank({x:960,y:600,z:1.0},t,{octo:OCT('stand','stand',1,{x:1100}),guard:{x:520,y:1180,face:1,eyes:1}});vignA(.3);blackout(cut(t,6));return;}
  const u=seg(t,T(6),E(6));const gx=lerp(300,1500,ss(seg(u,0,.35)));const watch=u>.4&&u<.65,wave=u>.7;const ox=lerp(500,1300,ss(seg(u,0,.35)));
  tank({x:960,y:620,z:.95},t,{octo:OCT('stand','stand',1,{x:ox,face:1,wave:wave}),guard:{x:gx,y:1180,face:wave?-1:1,walk:u<.35?t*4:null,armL:watch?2.3:(wave?2.9:.2),elbowL:watch?1.6:(wave?-.4+Math.sin(t*10)*.3:.3)}});vignA(.3);blackout(cut(t,6));}
function m6(t){const wake=t>W(7,.35);if(t<W(7,.6)){breakRoom({x:900,y:600,z:1.2},t,{sleep:!wake,clock:wake?'6:00':'2:14'});blackout(dip(t,W(7,.35),.1)+dip(t,W(7,.6),.1));return;}
  tank({x:960,y:560,z:1.0},t,{});vignA(.4);blackout(dip(t,W(7,.6),.1));}
function m7(t){if(t<T(9)-.15){breakRoom({x:960,y:560,z:1.0},t,{clock:'6:02',you:{face:1,lean:.05}});blackout(cut(t,9));return;}
  const x=lerp(-300,1550,seg(t,T(9),W(9,.85)));const dooro=ss(seg(t,W(9,.7),W(9,.8)));gallery({x:800,y:560,z:.9},t,{fake:x<1560?{x,y:1000,face:1,walk:t*4.5,tentacle:false}:null,door:1500,doorOpen:dooro,prints:wetPrints(T(9),W(9,.85),t,-300,1550,1005)});cctvize(t,'GALLERY 2','04:10:'+String(Math.floor(lerp(12,48,seg(t,T(9),E(9))))).padStart(2,'0'));blackout(cut(t,9));}
function m8(t){if(t<T(11)-.15){const k=ss(seg(t,T(10),E(10)));gallery({x:lerp(900,1100,k),y:lerp(560,640,k),z:lerp(1.3,2.0,k)},t,{fake:{x:1100,y:1000,face:-1,eyes:1,armL:2.9,elbowL:-.3+Math.sin(t*9)*.3,tentacle:true},door:1500});cctvize(t,'GALLERY 2','04:10:22');blackout(cut(t,11));return;}
  const k=ss(seg(t,T(11),E(11)));gallery({x:lerp(700,1300,k),y:800,z:1.4},t,{prints:wetPrints(0,1,9,-300,1550,1005),door:1500,guard:{x:lerp(200,600,k),y:1000,face:1,walk:t*3.5,light:1}});vignA(.4);blackout(cut(t,11));}
function m9(t){if(t<T(13)-.15){tank({x:960,y:lerp(560,640,seg(t,T(12),E(12))),z:lerp(1.0,1.15,seg(t,T(12),E(12)))},t,{puddle:true});vignA(.45);blackout(cut(t,13));return;}
  const k=ss(seg(t,T(13),E(13)+1.2));lot({x:lerp(1000,1050,k),y:lerp(620,800,k),z:lerp(1.0,1.4,k)},t,{prints:wetPrints(0,1,9,600,1100,940)});vignA(.4);blackout(cut(t,13)+ss(seg(t,E(13)+.6,E(13)+1.2)));}
const SCENES={m1,m2,m3,m4,m5,m6,m7,m8,m9};
const FADES={m1:[0,.25],m2:[.25,.25],m3:[.25,.25],m4:[.25,.25],m5:[.25,.25],m6:[.25,.25],m7:[.25,.25],m8:[.25,.25],m9:[.25,0]};
function metaClock(t){if(t<T(7))return['NIGHT SHIFT · AQUARIUM',0];if(t<T(8))return['6:00 A.M.',1];return['CAMERAS · 4:10 A.M.',1];}
