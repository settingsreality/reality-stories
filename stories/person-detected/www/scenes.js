// ===================== Person Detected, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
function blackout(a){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=clamp(a);ctx.fillStyle='#000';ctx.fillRect(0,0,1080,608);ctx.restore();}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
function cut(t,i){return dip(t,T(i)-.15,.12);}
const stamp=s=>{const m=Math.floor(s/60),x=Math.floor(s%60);return `3:${String(12+m).padStart(2,'0')}:${String(x).padStart(2,'0')} AM`;};
function banner(t,a,title,sub,red){if(a<=0)return;ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=a;const y=lerp(-80,60,a);fillRR(250,y,580,86,20,'rgba(235,240,248,.95)');fillRR(268,y+14,58,58,14,red?'#ff4a3a':'#3a8ad0');circ(297,y+43,12,'#fff');
  ctx.font='500 22px PM';ctx.textAlign='left';ctx.fillStyle='#111';ctx.fillText(title,342,y+38);ctx.font='400 20px PM';ctx.fillStyle='#333';ctx.fillText(sub,342,y+66);ctx.fillStyle='#666';ctx.textAlign='right';ctx.fillText('now',810,y+38);ctx.restore();}
function e1(t){const z=t<T(1)?lerp(1.0,1.1,seg(t,0,T(1))):lerp(1.1,1.7,ss(seg(t,T(1),E(1))));
  camView({x:960,y:lerp(560,640,ss(seg(t,T(1),E(1)))),z},t,{place:'porch',night:true,stamp:stamp(t+4),boxes:[{x:960,y:960,w:230,h:470,label:'Person 97%',a:1}]});
  banner(t,ss(seg(t,.3,.8))*(1-ss(seg(t,W(0,.85),E(0)))),'Front Door','Person detected');}
function e2(t){if(t<T(3)-.15){const x=lerp(1500,1050,ss(seg(t,T(2),W(2,.6))));camView({x:960,y:560,z:1.0},t,{place:'porch',night:false,camName:'FRONT DOOR',stamp:'2:41:16 PM',you:{x,y:960,face:-1,walk:t<W(2,.6)?t*5:null},boxes:[{x,y:965,w:220,h:450,label:'Person 99%',a:t>W(2,.25)?1:0}]});blackout(cut(t,3));return;}
  const k=ss(seg(t,W(3,.45),E(3)));camView({x:960,y:600,z:1.15},t,{place:'porch',night:true,stamp:stamp(lerp(10,370,seg(t,T(3),E(3)))),boxes:[{x:lerp(960,960,k),y:lerp(960,830,k),w:lerp(230,200,k),h:lerp(470,430,k)+Math.sin(t*6)*4*k,label:'Person 97%'}]});blackout(cut(t,3));}
function e3(t){const A=[{title:'Driveway',sub:'Person detected · 3:09 AM',k:ss(seg(t,W(4,.3),W(4,.4)))},{title:'Front Door',sub:'Person detected · 3:11 AM',k:ss(seg(t,W(4,.55),W(4,.65)))},{title:'Hallway',sub:'Person detected · 3:12 AM',k:ss(seg(t,T(5)-.1,T(5)+.15))}];
  phoneAlerts({x:960,y:lerp(560,600,seg(t,T(4),E(5))),z:lerp(1.0,1.15,seg(t,T(4),E(5)+.5))},t,{alerts:A,time:'3:12'});}
function e4(t){const k=ss(seg(t,T(6)+.3,E(6)));const w=lerp(70,520,k),h=lerp(150,1100,k);const named=t>T(7)+.3;
  camView({x:960,y:lerp(470,520,k),z:lerp(1.0,1.15,k)},t,{place:'hallway2',night:true,camName:'HALLWAY',stamp:stamp(lerp(0,40,k)),boxes:[{x:960,y:lerp(590,1500,k),w,h,label:named?'Familiar face':'Person 96%'}]});}
function e5(t){faces({x:960,y:560,z:lerp(1.0,1.08,seg(t,T(8),E(9)))},t,{newTile:ss(seg(t,W(9,.2),W(9,.45)))});}
function e6(t){if(t<T(11)-.2){const x=lerp(1900,560,ss(seg(t,T(10),W(10,.8))));camView({x:960,y:560,z:1.0},t,{place:'kitchen',night:false,camName:'KITCHEN',stamp:'7:42:10 AM',you:{x,y:860,face:-1,walk:t<W(10,.8)?t*5:null}});blackout(dip(t,T(11)-.2,.12));return;}
  camView({x:960,y:560,z:1.05},t,{place:'kitchen',night:false,camName:'KITCHEN',stamp:'7:42:14 AM',you:{x:560,y:860,face:1,eyes:1}});banner(t,ss(seg(t,T(11)-.1,T(11)+.3)),'Kitchen','Unfamiliar person detected',true);blackout(dip(t,T(11)-.2,.12));}
function e7(t){const k=ss(seg(t,T(13)-.4,E(13)+1));camView({x:lerp(1100,1640,k),y:lerp(560,600,k),z:lerp(1.0,2.0,k)},t,{place:'kitchen',night:false,camName:'KITCHEN',stamp:'7:42:16 AM',you:{x:560,y:860,face:1,eyes:1},
    boxes:[{x:560,y:870,w:220,h:450,label:'Unfamiliar',col:'#ff4a3a',a:ss(seg(t,T(12),T(12)+.4))},{x:1640,y:690,w:200,h:330,label:'Me',a:ss(seg(t,W(12,.45),W(12,.6)))}]});if(t>E(13)+.6)blackout(ss(seg(t,E(13)+.6,E(13)+1.2)));}
const SCENES={e1,e2,e3,e4,e5,e6,e7};
const FADES={e1:[0,.25],e2:[.25,.25],e3:[.25,.25],e4:[.25,.25],e5:[.25,.25],e6:[.25,.25],e7:[.25,0]};
function metaClock(t){if(t<T(10))return['NIGHT · 3:12 AM',1];return['MORNING · 7:42 AM',0];}
