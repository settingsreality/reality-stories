// ===================== Rizz x2: art (v2 vertical). Funny "what if": my rizz doubles every day. =====================
const RZ={pink:'#ff5fa2',pinkD:'#c23b7a',y:'#ffc93c',ink:'#f6f2ea',dim:'rgba(246,242,234,.6)',purple:'#7b4dff',night0:'#140c2c',night1:'#3a1d5c',red:'#ff4d3d',blue:'#4fa3ff'};
const SK='#e9b896';
// me: orange beanie, purple jacket, optional shades; sparkle aura grows with the rizz level (0..1)
function me(o){const h=o.h||800;toon(Object.assign({jacket:RZ.purple,hat:'beanie',hatCol:'#f0683f',skin:SK,browCol:'#4a2e1f',stripe:false,mouth:'smile'},o));
  const f=o.face||0,hx=o.x+f*.04*h,hy=o.y+(o.bob||0)-.83*h;
  if(o.shades){ctx.save();ctx.translate(hx,hy);ctx.rotate(o.tilt||0);const w=.075*h,ht=.05*h;
    for(const s of[-1,1]){fillRR(s*.062*h+f*.03*h-w/2,-.03*h,w,ht,.018*h,'#111318');ctx.save();ctx.globalAlpha=.55;line(s*.062*h+f*.03*h-w*.3,-.02*h,s*.062*h+f*.03*h-w*.05,-.02*h,.008*h,'#9fb4ff');ctx.restore();}
    line(-.025*h+f*.03*h,-.012*h,.025*h+f*.03*h,-.012*h,.01*h,'#111318');ctx.restore();}
  if(o.aura)aura(hx,hy+.25*h,h*.55,o.t||0,o.aura);}
// a 4-point twinkle
function star4(x,y,r,c='#fff',a=1){if(a<=0||r<=0)return;ctx.save();ctx.globalAlpha=clamp(a);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.quadraticCurveTo(x,y,x,y+r);
  ctx.quadraticCurveTo(x,y,x-r,y);ctx.quadraticCurveTo(x,y,x,y-r);ctx.fill();ctx.restore();}
function heart(x,y,s,c=RZ.pink,a=1){if(a<=0||s<=0)return;ctx.save();ctx.globalAlpha=clamp(a);ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(x,y+s*.35);
  ctx.bezierCurveTo(x-s*.9,y-s*.25,x-s*.45,y-s*.95,x,y-s*.45);ctx.bezierCurveTo(x+s*.45,y-s*.95,x+s*.9,y-s*.25,x,y+s*.35);ctx.fill();ctx.restore();}
// sparkles + floating hearts around a point; k = strength 0..1
function aura(x,y,r,t,k){if(k<=0)return;glow(x,y,r*1.1,'rgba(255,120,190,1)',.18*k);const R=rng(77);
  for(let i=0;i<Math.round(10+16*k);i++){const a=R()*6.28,d=r*(.55+R()*.6),ph=R()*6.28,sp=.6+R();const tw=Math.max(0,Math.sin(t*3*sp+ph));
    star4(x+Math.cos(a+t*.15)*d,y+Math.sin(a+t*.15)*d*1.1,(8+R()*16)*tw*(.6+.6*k),R()<.5?'#fff6c9':'#ffd1e8',.9*k);}
  for(let i=0;i<Math.round(3+6*k);i++){const ph=R(),u=fract(t*.22*(.7+R()*.6)+ph);heart(x+(R()-.5)*r*1.6,y+r*.4-u*r*1.6,(18+R()*22)*(.5+.5*k),RZ.pink,(1-u)*.85*k);}}
// the big day pop: DAY n / RIZZ xN in the upper middle at the start of each day
function dayPop(t,t0,day,mult,o={}){const k=seg(t,t0-.05,t0+.25),out=1-seg(t,t0+(o.hold||1.8),t0+(o.hold||1.8)+.4);const a=Math.min(k,out);if(a<=0)return;
  const s=lerp(1.25,1,ss(k));ctx.save();ctx.translate(540,o.y||330);ctx.scale(s,s);ctx.globalAlpha=a;
  label('DAY '+day,0,-46,{font:'900 64px MS',h:96,bg:'rgba(12,10,20,.88)',col:RZ.ink,px:30,r:16,a});
  label('RIZZ ×'+mult,0,58,{font:'900 50px MS',h:80,bg:RZ.y,col:'#1a1208',px:26,r:14,a});ctx.restore();}
// night city sky + rooftops
const CSTARS=(()=>{const R=rng(3),a=[];for(let i=0;i<160;i++)a.push([R()*1080,R()*1100,R()<.1?2.6:1.4,.3+R()*.6]);return a;})();
function nightCity(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,RZ.night0],[.6,RZ.night1],[1,'#5a2a5e']]);ctx.fillRect(-200,-200,1480,2320);
  for(const[x,y,r,a]of CSTARS)circ(x,y,r,'#fff',a*(.6+.4*Math.sin(t*2+x)));
  const base=o.base??1500,R=rng(11);let x=-40;while(x<1120){const w=90+R()*150,h=180+R()*420;fillRR(x,base-h,w-8,h+600,4,'#1d1336');
    for(let wy=base-h+30;wy<base-20;wy+=46)for(let wx=x+16;wx<x+w-30;wx+=34)if(R()<.35)fillRR(wx,wy,16,22,2,R()<.5?'#ffd27a':'#ff9ec9');x+=w;}}
// the Moon, optionally with a face: o.face 0..1, blush 0..1, look {x,y}, hearts (heart eyes 0..1)
function moon(x,y,r,t,o={}){glow(x,y,r*1.6,'rgba(255,240,220,1)',.22*(o.glowA??1));
  ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();ctx.fillStyle=(()=>{const g=ctx.createRadialGradient(x-r*.3,y-r*.35,r*.1,x,y,r);g.addColorStop(0,'#f4f1ea');g.addColorStop(1,'#a9a7b4');return g;})();
  ctx.fillRect(x-r,y-r,2*r,2*r);const R=rng(21);for(let i=0;i<14;i++){const cx=x+(R()-.5)*1.7*r,cy=y+(R()-.5)*1.7*r,cr=r*(.05+R()*.13);circ(cx,cy,cr,'#8d8b98',.45);circ(cx-cr*.15,cy-cr*.15,cr*.8,'#c9c6cf',.35);}
  ctx.restore();const fa=o.face??0;if(fa<=0)return;ctx.save();ctx.globalAlpha=fa;const lx=(o.look?.x||0)*r*.05,ly=(o.look?.y||0)*r*.05;
  for(const s of[-1,1]){const ex=x+s*r*.3,ey=y-r*.08;if((o.hearts||0)>.5){heart(ex,ey+r*.04,r*.26,RZ.pink);}else{ell(ex,ey,r*.11,r*.14,0,'#fbfaf6');circ(ex+lx,ey+ly,r*.065,'#1b1c24');circ(ex+lx+r*.02,ey+ly-r*.03,r*.02,'#fff');}
    ell(x+s*r*.48,y+r*.17,r*.14,r*.08,0,'rgba(255,95,162,'+(.55*(o.blush??0))+')');}
  ctx.strokeStyle='#4b3a44';ctx.lineWidth=r*.04;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-r*.16,y+r*.25);ctx.quadraticCurveTo(x,y+r*.38,x+r*.16,y+r*.25);ctx.stroke();ctx.restore();}
// phone with a screen; o: {x,y,w,h, time, content(fn x0,y0,w,h), tilt}
function phone(o){const w=o.w||620,h=o.h||1180,x=o.x-w/2,y=o.y-h/2;ctx.save();if(o.tilt){ctx.translate(o.x,o.y);ctx.rotate(o.tilt);ctx.translate(-o.x,-o.y);}
  glow(o.x,o.y,w*.9,o.glowCol||'rgba(160,120,255,1)',.18);fillRR(x-14,y-14,w+28,h+28,70,'#0d0e13');fillRR(x,y,w,h,58,o.bg||'#1b1630');
  ctx.save();rr(x,y,w,h,58);ctx.clip();if(o.content)o.content(x,y,w,h);ctx.restore();
  fillRR(o.x-90,y+18,180,44,22,'#0d0e13');text(o.time||'7:41',x+70,y+48,'800 30px MS','#fff','left');ctx.restore();}
function notifCard(x,y,w,app,title,body,o={}){const h=o.h||210;ctx.save();ctx.globalAlpha=o.a??1;const sy=(1-(o.k??1))*-60;ctx.translate(0,sy);
  fillRR(x,y,w,h,30,o.bg||'rgba(246,242,234,.95)');fillRR(x+26,y+26,52,52,14,o.icon||RZ.purple);star4(x+52,y+52,18,'#fff');
  text(app,x+96,y+56,'800 26px MS',o.dim||'#6b6475','left');text('now',x+w-26,y+56,'700 24px MS',o.dim||'#6b6475','right');
  text(title,x+30,y+118,'900 38px MS',o.ink||'#15121c','left');if(body)text(body,x+30,y+168,'700 30px MS',o.ink2||'#3b3546','left');ctx.restore();}
function toggle(x,y,on,c=RZ.pink){fillRR(x,y,110,62,31,on>0.5?c:'#5b5668');circ(x+31+48*ss(clamp(on)),y+31,25,'#fff');}
// coffee shop counter + barista
function coffeeShop(t,o={}){ctx.fillStyle=vgrad(0,1920,[[0,'#3a2418'],[1,'#20140e']]);ctx.fillRect(-200,-200,1480,2320);
  for(let i=0;i<4;i++){fillRR(80+i*240,300,160,120,10,'#5a3a26');for(let j=0;j<3;j++)circ(110+i*240+j*48,330,14,'#c98b5a');}
  for(let i=0;i<3;i++){line(220+i*320,0,220+i*320,180,4,'#140c08');glow(220+i*320,200,120,'rgba(255,200,120,1)',.35);circ(220+i*320,195,26,'#ffd68a');}
  toon({x:540,y:1500,h:1000,jacket:'#2f6b4f',hat:'cap',hatCol:'#2f6b4f',skin:'#c98f6a',browCol:'#2a1a14',mouth:o.mouth||'smile',look:{x:0,y:.6},tag:'BARISTA',stripe:false,armR:[.9,-1.2],armL:[.2,.1],blink:o.blink||0});
  if(o.blush)for(const s of[-1,1])ell(540+s*.1*1000,1500-.79*1000,.035*1000,.02*1000,0,'rgba(255,95,162,'+(.6*o.blush)+')');
  fillRR(-50,1260,1180,90,8,'#6b4a33');fillRR(-50,1350,1180,700,0,'#4a3123');}
function latte(x,y,s,hk,t){ell(x,y+s*.9,s*1.25,s*.28,0,'#e9e4dc');fillRR(x-s*.95,y-s*.1,s*1.9,s*1.0,s*.35,'#f4f1ea');ctx.strokeStyle='#f4f1ea';ctx.lineWidth=s*.12;ctx.beginPath();ctx.arc(x+s*1.0,y+s*.35,s*.28,-1.2,1.2);ctx.stroke();
  ell(x,y-s*.08,s*.95,s*.28,0,'#e7e1d8');ell(x,y-s*.06,s*.84,s*.23,0,'#8a5a3a');if(hk>0){ctx.save();ctx.translate(x,y-s*.06);ctx.scale(1,.3);heart(0,s*.12,s*.62*ss(hk),'#f2e4d0');ctx.restore();}}
// chat UI inside the phone
function chatScreen(x,y,w,h,t,o){ctx.fillStyle='#120f1d';ctx.fillRect(x,y,w,h);fillRR(x,y,w,170,0,'#1d1830');circ(x+80,y+110,34,'#ff9ec9');heart(x+80,y+116,30,'#fff');
  text('CRUSH',x+132,y+102,'900 34px MS','#fff','left');text(o.typing>0&&o.para<=0?'typing…':'online',x+132,y+138,'700 22px MS','#a9a1bd','left');
  const by=y+260;fillRR(x+w-300,by,260,80,36,RZ.purple);text('hey',x+w-170,by+52,'800 32px MS','#fff');text('Read 3 weeks ago',x+w-40,by+118,'700 20px MS','#7d7591','right');
  if(o.para>0){const k=ss(o.para),ph=Math.round(lerp(1,14,k));const py=by+170;fillRR(x+30,py,w-110,ph*44+50,36,'#2b2540');const R=rng(8);
    for(let i=0;i<ph;i++){const lw=(w-170)*(i===ph-1?.55:.8+R()*.2);fillRR(x+60,py+30+i*44,lw,18,9,'#cfc8e3');}}
  else if(o.typing>0){fillRR(x+30,by+170,150,70,34,'#2b2540');for(let i=0;i<3;i++)circ(x+75+i*30,by+205,9,'#cfc8e3',.4+.6*Math.max(0,Math.sin(t*8-i)));}}
// park path in perspective + pigeons in a line
function park(t){ctx.fillStyle=vgrad(0,640,[[0,'#8ec9ff'],[1,'#d7ecff']]);ctx.fillRect(-200,-200,1480,860);ctx.fillStyle=vgrad(620,1920,[[0,'#5aa25a'],[1,'#2f6b35']]);ctx.fillRect(-200,620,1480,1400);
  for(const[x,s]of[[110,1],[960,1.2],[300,.6],[790,.55]]){fillRR(x-14*s,640-200*s,28*s,220*s,6,'#5a3d28');circ(x,640-230*s,110*s,'#3f8a46');circ(x-60*s,640-190*s,80*s,'#4b9a52');circ(x+60*s,640-200*s,85*s,'#357a3d');}
  ctx.fillStyle='#d8c9a6';ctx.beginPath();ctx.moveTo(500,630);ctx.lineTo(580,630);ctx.lineTo(1000,1960);ctx.lineTo(80,1960);ctx.closePath();ctx.fill();}
function pigeon(x,y,s,t,ph=0){const hop=Math.abs(Math.sin(t*6+ph))*6*s;ctx.save();ctx.translate(x,y-hop);ell(0,0,46*s,30*s,0,'#8e95a3');ell(-10*s,-4*s,30*s,20*s,.3,'#79808f');
  circ(32*s,-26*s,18*s,'#6f7686');circ(38*s,-30*s,4*s,'#111');poly([[48*s,-24*s],[60*s,-20*s],[48*s,-18*s]],'#e0b04a');ell(30*s,-12*s,12*s,7*s,0,'#5fae8e',.8);
  line(-6*s,26*s,-8*s,40*s,4*s,'#d97a6a');line(8*s,26*s,10*s,40*s,4*s,'#d97a6a');ell(-44*s,6*s,18*s,10*s,-.2,'#5b6170');ctx.restore();}
// test paper with an A+
function testPaper(t,o){ctx.fillStyle=vgrad(0,1920,[[0,'#2c3a52'],[1,'#1a2232']]);ctx.fillRect(-200,-200,1480,2320);fillRR(-100,1180,1280,900,0,'#7a5a3e');
  ctx.save();ctx.translate(540,760);ctx.rotate(-.04+(o.shake?Math.sin(t*60)*.01:0));fillRR(-340,-440,680,880,10,'#f7f4ec');
  text('MATH TEST',-300,-370,'900 40px MS','#22252e','left');text('NAME: ME',-300,-318,'800 28px MS','#4a4f5c','left');
  for(let i=0;i<6;i++){text((i+1)+'.',-300,-220+i*100,'800 30px MS','#4a4f5c','left');line(-250,-212+i*100,280,-212+i*100,3,'#cfd3dc');}
  if(o.a>0){ctx.save();ctx.globalAlpha=clamp(o.a*3);const s=lerp(1.6,1,ss(o.a));ctx.translate(150,-40);ctx.rotate(-.18);ctx.scale(s,s);ctx.strokeStyle='#e0302a';ctx.lineWidth=12;ctx.beginPath();ctx.arc(0,0,150,0,7);ctx.stroke();
    text('A+',0,10,'900 170px MS','#e0302a');ctx.restore();}
  if(o.blank>0){ctx.save();ctx.globalAlpha=o.blank;label('0 ANSWERS',-120,330,{font:'900 36px MS',bg:'rgba(224,48,42,.92)',a:o.blank});ctx.restore();}ctx.restore();}
// clouds parting + god rays
function cloud(x,y,s,c='#f4f1fb',a=1){for(const[dx,dy,r]of[[0,0,90],[80,-30,100],[170,0,85],[-70,20,70],[90,40,90]])circ(x+dx*s,y+dy*s,r*s,c,a);}
function sunbeamSky(t,part){ctx.fillStyle=vgrad(0,1920,[[0,'#5b4b9a'],[.5,'#e88aa8'],[1,'#ffcf8a']]);ctx.fillRect(-200,-200,1480,2320);
  if(part>0){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=-4;i<=4;i++){const a=i*.09+Math.sin(t*.7+i)*.01;ctx.save();ctx.translate(540,120);ctx.rotate(a);
    const g=ctx.createLinearGradient(0,0,0,1900);g.addColorStop(0,`rgba(255,236,170,${.35*part})`);g.addColorStop(1,'rgba(255,236,170,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-20,0);ctx.lineTo(-90,1900);ctx.lineTo(90,1900);ctx.lineTo(20,0);ctx.fill();ctx.restore();}ctx.restore();
    glow(540,120,260,'rgba(255,240,190,1)',.8*part);circ(540,120,90,'#fff6d6',part);}
  const d=ss(part)*420;cloud(250-d,190,1.4,'#f6eefc');cloud(680+d,170,1.5,'#f6eefc');cloud(120-d*.6,420,1.1,'#efe3f8');cloud(820+d*.6,400,1.15,'#efe3f8');
  ctx.fillStyle='#3d2a4a';ctx.fillRect(-200,1700,1480,400);}
// GPS map: grid streets, my pin, cars converging
function gpsMap(t,o){ctx.fillStyle='#e9ecef';ctx.fillRect(-200,-200,1480,2320);const R=rng(5);
  for(let i=0;i<12;i++)for(let j=0;j<16;j++)fillRR(-40+i*110+8,-40+j*130+8,94,114,10,R()<.15?'#cde8c8':'#dde1e6');
  for(let i=0;i<12;i++)line(-40+i*110,-200,-40+i*110,2200,14,'#fbfbfc');for(let j=0;j<16;j++)line(-200,-40+j*130,1300,-40+j*130,14,'#fbfbfc');
  const hx=565,hy=1000;const k=o.k||0;const R2=rng(9);
  for(let i=0;i<26;i++){const sx=R2()<.5?(R2()<.5?-60:1140):-40+Math.floor(R2()*12)*110,sy=sx<0||sx>1100?-40+Math.floor(R2()*16)*130:(R2()<.5?-60:1980);
    ctx.strokeStyle=`rgba(66,133,244,${.75*k})`;ctx.lineWidth=12;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx,hy);ctx.lineTo(hx,hy);ctx.stroke();
    const u=fract(t*.18+R2());const px=u<.5?sx:lerp(sx,hx,(u-.5)*2),py=u<.5?lerp(sy,hy,u*2):hy;if(k>0)fillRR(px-16,py-16,32,32,8,R2()<.5?'#ff5f5f':'#ffffff');}
  glow(hx,hy-60,160,'rgba(255,95,162,1)',.5);ctx.fillStyle=RZ.pink;ctx.beginPath();ctx.arc(hx,hy-90,52,Math.PI,0);ctx.lineTo(hx,hy);ctx.closePath();ctx.fill();circ(hx,hy-90,22,'#fff');
  label('MY STREET',hx,hy+60,{font:'900 32px MS',bg:'rgba(20,16,30,.9)'});
  if(o.eta>0)label('ALL ROUTES → MY STREET',540,1430,{font:'900 38px MS',bg:'#4285f4',a:o.eta});}
// size bars: rizz vs people on Earth
function bars(t,o){ctx.fillStyle=vgrad(0,1920,[[0,'#120c26'],[1,'#2b1650']]);ctx.fillRect(-200,-200,1480,2320);for(let y=0;y<1920;y+=90)line(-20,y,1100,y,1.5,'rgba(255,255,255,.05)');
  const x0=110,W=860,k1=o.k1||0,k2=o.k2||0;
  text('PEOPLE ON EARTH',x0,520,'900 40px MS',RZ.ink,'left');fillRR(x0,560,W,90,20,'rgba(255,255,255,.1)');fillRR(x0,560,W*.966*ss(k1),90,20,RZ.blue);
  text('≈ 8.3 BILLION',x0,700,'800 34px MS',RZ.dim,'left');
  text('MY RIZZ',x0,830,'900 40px MS',RZ.ink,'left');fillRR(x0,870,W,90,20,'rgba(255,255,255,.1)');fillRR(x0,870,W*ss(k2),90,20,RZ.y);
  text('×'+Math.round(lerp(0,8589934592,ss(k2))).toLocaleString('en-US'),x0,1010,'900 46px MS',RZ.y,'left');
  if(o.win>0)heart(x0+W-10,915,70*ss(o.win),RZ.pink,o.win);}
// sunrise over a hill; the sun has a (shy) face
function sunrise(t,o){const k=o.up||0;ctx.fillStyle=vgrad(0,1920,[[0,'#2a2d6b'],[.45,'#e7799a'],[.62,'#ffb46b'],[1,'#ffd99a']]);ctx.fillRect(-200,-200,1480,2320);
  const sy=lerp(1250,820,k);glow(540,sy,420,'rgba(255,220,140,1)',.55);circ(540,sy,190,'#ffe08a');
  if(o.face>0){ctx.save();ctx.globalAlpha=o.face;for(const s of[-1,1]){ell(540+s*62,sy-20,16,22,0,'#3a2418');ell(540+s*110,sy+40,34,18,0,'rgba(255,95,162,.6)');}
    ctx.strokeStyle='#3a2418';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(510,sy+50);ctx.quadraticCurveTo(540,sy+72,570,sy+50);ctx.stroke();ctx.restore();}
  ctx.fillStyle='#3b2a52';ctx.beginPath();ctx.moveTo(-200,1180);ctx.quadraticCurveTo(300,1060,620,1150);ctx.quadraticCurveTo(900,1220,1300,1120);ctx.lineTo(1300,2200);ctx.lineTo(-200,2200);ctx.closePath();ctx.fill();
  ctx.fillStyle='#2a1d3d';ctx.beginPath();ctx.moveTo(-200,1400);ctx.quadraticCurveTo(500,1300,1300,1420);ctx.lineTo(1300,2200);ctx.lineTo(-200,2200);ctx.closePath();ctx.fill();}
