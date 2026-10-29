// ===================== Rizz x2, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z'\-]/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
const fmt=n=>Math.round(n).toLocaleString('en-US');
const pow2=d=>fmt(Math.pow(2,d));
function space(t){ctx.fillStyle=vgrad(0,1920,[[0,'#07081a'],[1,'#1a1240']]);ctx.fillRect(-200,-200,1480,2320);for(const[x,y,r,a]of CSTARS){circ(x,y,r,'#fff',a);circ(1080-x,y+820,r,'#fff',a*.7);}}

// cold open: day 30, the Moon leaning in, blushing
function s1(t){const k=seg(t,0,E(0)+.6);const cl=ss(seg(t,wi(0,'closer')-.4,wi(0,'closer')+.4));
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.06,k)),1,()=>{nightCity(t,{base:1450});moon(560,lerp(660,700,cl),lerp(300,380,cl),t,{face:1,blush:.6+.4*cl,look:{x:-.3,y:1},glowA:1.2});
    me({x:540,y:1990,h:1000,shades:true,aura:1,t,look:{x:.4,y:-1},bob:Math.sin(t*2)*4});});
  dayPop(t,-.4,30,pow2(30),{hold:2.9,y:290});}
// the notification
function s2(t){const n=wi(1,'notification'),on=ss(seg(t,wi(1,'times')-.1,wi(1,'times')+.3));const sh=shakeAt(t,t>n&&t<n+.5?5:0);
  vl(vcam(540+sh.x,900+sh.y,lerp(1.0,1.05,seg(t,T(1),E(1)+.6))),1,()=>{nightCity(t,{base:1700});
    phone({x:540,y:820,w:640,h:1180,time:'7:41',content:(x,y,w,h)=>{ctx.fillStyle=vgrad(y,y+h,[[0,'#3a1d6e'],[1,'#c2457f']]);ctx.fillRect(x,y,w,h);
      text('7:41',x+w/2,y+300,'800 150px MS','#fff');text('MONDAY',x+w/2,y+380,'800 32px MS','rgba(255,255,255,.8)');
      notifCard(x+28,y+460,w-56,'REALITY SETTINGS','Rizz: ×2 every day','Tap to manage',{k:ss(seg(t,n-.1,n+.3)),a:ss(seg(t,n-.1,n+.2))});
      if(t>n){ctx.save();ctx.globalAlpha=ss(seg(t,n,n+.4));fillRR(x+28,y+700,w-56,130,30,'rgba(246,242,234,.92)');text('Rizz',x+60,y+778,'900 40px MS','#15121c','left');
        text('×2 daily',x+170,y+778,'800 30px MS','#6b6475','left');toggle(x+w-170,y+734,on);ctx.restore();}
      if(on>.5)aura(x+w/2,y+760,260,t,on*.6);}});});}
// day 1: the barista, the heart
function s3(t){const d=wi(2,'drew'),hk=seg(t,wi(2,'heart')-.25,wi(2,'heart')+.25);
  if(t<d-.05){vl(vcam(540,lerp(900,860,seg(t,T(2),d)),1.0),1,()=>coffeeShop(t,{blush:.5,blink:fract(t*.5)>.93?1:0}));}
  else vl(vcam(540,lerp(980,940,seg(t,d,E(2)+.6)),lerp(1.0,1.08,seg(t,d,E(2)+.6))),1,()=>{coffeeShop(t,{blush:1});ctx.fillStyle='rgba(20,10,6,.55)';ctx.fillRect(-200,-200,1480,2320);
    latte(540,1030,250,hk,t);if(hk>0){aura(540,990,300,t,hk*.7);for(let i=0;i<6;i++)star4(540+Math.cos(i)*260*hk,990+Math.sin(i*1.3)*180*hk,30*(1-hk*.5),'#fff6c9',hk);}});
  dayPop(t,T(2),1,'2');}
// day 5: the crush texts back. a paragraph.
function s4(t){const ty=seg(t,wi(3,'crush'),wi(3,'crush')+.2),pa=seg(t,wi(3,'with')-.05,wi(3,'paragraph')+.5);
  vl(vcam(540,lerp(900,880,seg(t,T(3),E(3)+.6)),lerp(1.0,1.06,pa)),1,()=>{nightCity(t,{base:1750});
    phone({x:540,y:840,w:660,h:1200,time:'9:12',content:(x,y,w,h)=>chatScreen(x,y,w,h,t,{typing:ty,para:pa})});
    if(pa>.6)for(let i=0;i<5;i++)heart(180+i*180,1500-fract(t*.6+i*.3)*300,40,RZ.pink,(1-fract(t*.6+i*.3))*ss((pa-.6)/.4));});
  dayPop(t,T(3),5,'32');}
// day 10: the pigeons get in line
const PIGS=(()=>{const a=[];for(let i=0;i<14;i++){const q=i/13;a.push({q,x:lerp(470,548,q)+Math.sin(i*1.7)*lerp(40,4,q),y:lerp(1560,690,Math.pow(q,.7)),s:lerp(1.3,.16,Math.pow(q,.6))});}return a;})();
function s5(t){const p0=wi(4,'pigeon')-.2,lineK=seg(t,p0,wi(4,'got')+.3);
  vl(vcam(540,lerp(980,940,seg(t,T(4),E(4)+.6)),lerp(1.0,1.05,seg(t,T(4),E(4)+.6))),1,()=>{park(t);
    for(let i=PIGS.length-1;i>=0;i--){const p=PIGS[i];const vis=ss(seg(lineK*14-(13-i)*.6,0,1));if(vis<=0)continue;const xo=(1-ss(lineK))*(i%2?1:-1)*180*(1-p.q);
      pigeon(p.x+xo,p.y,p.s,t,i);}
    me({x:780,y:1990,h:820,look:{x:-1,y:-.2},face:-.3,aura:.35,t,mouth:'smile'});});
  dayPop(t,T(4),10,'1,024');}
// day 15: an A on a test I didn't take
function s6(t){const a=seg(t,wi(5,'a')-.1,wi(5,'a')+.4),nt=wi(5,'didn\'t');const bl=ss(seg(t,nt,nt+.3));
  vl(vcam(540,lerp(900,880,seg(t,T(5),E(5)+.6)),lerp(1.0,1.07,seg(t,T(5),E(5)+.6))),1,()=>{testPaper(t,{a,blank:bl,shake:t>nt&&t<nt+.6});
    if(a>0)for(let i=0;i<5;i++)star4(690+Math.cos(i*1.25)*200,720+Math.sin(i*1.25)*200,24*Math.max(0,Math.sin(t*4+i)),'#fff6c9',a);});
  dayPop(t,T(5),15,'32,768');}
// day 20: the clouds move for my jawline
function s7(t){const part=seg(t,wi(6,'clouds')-.1,wi(6,'moved')+.9),jw=wi(6,'jawline');const sp=seg(t,jw-.05,jw+.6);
  vl(vcam(540,lerp(960,1000,seg(t,T(6),E(6)+.6)),lerp(1.0,1.08,seg(t,T(6),E(6)+.6))),1,()=>{sunbeamSky(t,part);
    me({x:540,y:1990,h:1050,shades:true,aura:.4+.6*part,t,look:{x:0,y:-1},tilt:-.12*ss(part),face:.2});
    if(sp>0){const jx=540+.2*.04*1050+80,jy=1990-.83*1050+120;star4(jx,jy,lerp(20,110,ss(Math.min(1,sp*2)))*(1-seg(sp,.6,1)),'#fff',1);glow(jx,jy,200,'rgba(255,255,255,1)',.5*(1-sp));}});
  dayPop(t,T(6),20,'1,048,576');}
// day 25: GPS sends the whole city to my street
function s8(t){const k=seg(t,wi(7,'rerouted'),wi(7,'whole')+.5);
  vl(vcam(560,lerp(980,1000,seg(t,T(7),E(7)+.6)),lerp(1.15,1.0,ss(seg(t,T(7),E(7)+.6)))),1,()=>gpsMap(t,{k:ss(k),eta:ss(seg(t,wi(7,'whole'),wi(7,'whole')+.3))}));
  dayPop(t,T(7),25,'33,554,432');}
// day 30: the Moon drifts away 3.8 cm a year... this week it came back
function s9(t){const cb=wi(9,'came');
  if(t<T(9)-.1){const k=seg(t,T(8),E(8)+.6);vl(vcam(540,lerp(820,800,k),lerp(1.0,1.05,k)),1,()=>{space(t);earth(300,780,170,{spin:t*.03});
      const mx=820+seg(t,wi(8,'drifts'),E(8))*40;moon(mx,780,70,t,{glowA:.6});const la=ss(seg(t,wi(8,'four')-.2,wi(8,'four')+.3));
      if(la>0){ctx.save();ctx.globalAlpha=la;line(mx+90,780,mx+190,780,8,RZ.y);poly([[mx+210,780],[mx+182,762],[mx+182,798]],RZ.y);ctx.restore();label('3.8 CM / YEAR',mx,900,{font:'900 40px MS',bg:RZ.y,col:'#1a1208',a:la});}
      label('EARTH',300,1000,{font:'800 32px MS',bg:'rgba(20,16,40,.85)'});});
    dayPop(t,T(8),30,'1,073,741,824');return;}
  const z=ss(seg(t,cb-.15,cb+.35));const sh=shakeAt(t,t>cb&&t<cb+.8?6:0);
  vl(vcam(540+sh.x,800+sh.y,1.0),1,()=>{space(t);moon(lerp(860,540,z),lerp(780,760,z),lerp(70,430,z),t,{face:z,blush:z,hearts:t>wi(9,'back')?1:0,look:{x:0,y:.8},glowA:1.3});});}
// day 33: more rizz than people on Earth
function s10(t){vl(vcam(540,lerp(900,880,seg(t,T(10),E(10)+.6)),1.0),1,()=>bars(t,{k1:seg(t,T(10)+.2,wi(10,'more')),k2:seg(t,wi(10,'rizz')-.1,wi(10,'people')+.2),win:ss(seg(t,wi(10,'earth'),wi(10,'earth')+.4))}));
  dayPop(t,T(10),33,'8,589,934,592',{y:300});}
// the second notification: can't be turned off, only shared
function s11(t){const n=wi(11,'notification'),tr=wi(11,'turned');const tryOff=t>tr&&t<tr+.9?1-Math.sin(seg(t,tr,tr+.9)*Math.PI)*.9:1;const sh=shakeAt(t,t>tr&&t<tr+.9?4:0);
  vl(vcam(540+sh.x,900+sh.y,lerp(1.0,1.06,seg(t,T(11),E(11)+.6))),1,()=>{nightCity(t,{base:1700});
    phone({x:540,y:820,w:640,h:1180,time:'7:41',glowCol:'rgba(255,77,61,1)',content:(x,y,w,h)=>{ctx.fillStyle=vgrad(y,y+h,[[0,'#3a1d3e'],[1,'#8a2a3f']]);ctx.fillRect(x,y,w,h);
      text('7:41',x+w/2,y+300,'800 150px MS','#fff');
      notifCard(x+28,y+400,w-56,'REALITY SETTINGS',"Rizz can't be turned off.",'Only shared.',{k:ss(seg(t,n-.1,n+.3)),a:ss(seg(t,n-.1,n+.2)),icon:RZ.red});
      ctx.save();ctx.globalAlpha=ss(seg(t,n,n+.4));fillRR(x+28,y+640,w-56,130,30,'rgba(246,242,234,.92)');text('Rizz',x+60,y+718,'900 40px MS','#15121c','left');fillRR(x+168,y+700,30,24,5,'#15121c');ctx.strokeStyle='#15121c';ctx.lineWidth=5;ctx.beginPath();ctx.arc(x+183,y+700,10,Math.PI,0);ctx.stroke();
      toggle(x+w-170,y+674,tryOff,RZ.red);ctx.restore();
      const b=ss(seg(t,wi(11,'only'),wi(11,'shared')+.3));if(b>0){ctx.save();ctx.globalAlpha=b;fillRR(x+28,y+820,(w-76)/2,110,26,RZ.pink);fillRR(x+48+(w-76)/2,y+820,(w-76)/2,110,26,'#f4f1ea');
        text('SHARE',x+28+(w-76)/4,y+892,'900 40px MS','#fff');text('KEEP',x+48+(w-76)*3/4,y+892,'900 40px MS','#15121c');ctx.restore();}}});});}
// share it (everyone gets one) vs keep it (it doubles again)
function s12(t){const sh=seg(t,wi(12,'share')-.1,wi(12,'one')+.6),kp=seg(t,wi(12,'keep')-.1,wi(12,'doubles')+.6);const foc=t<wi(12,'keep')-.1?0:1;
  vl(vcam(540,960,1.0),1,()=>{space(t);
    ctx.save();ctx.globalAlpha=foc?.35:1;earth(540,470,250,{spin:t*.05});const R=rng(4);for(let i=0;i<40;i++){const a=R()*6.28,d=R()*230,ph=R();const u=fract(t*.5+ph);if(ss(sh)*40<i)continue;
      heart(540+Math.cos(a)*d,470+Math.sin(a)*d*.95-u*40,14+R()*10,RZ.pink,(1-u));}
    label('SHARE: 1 RIZZ EACH',540,790,{font:'900 40px MS',bg:RZ.pink,a:ss(seg(t,wi(12,'one')-.2,wi(12,'one')+.2))*(foc?.5:1)});ctx.restore();
    ctx.save();ctx.globalAlpha=foc?1:.35;me({x:540,y:1990,h:700,shades:true,aura:foc?.4+.6*ss(kp):.3,t,look:{x:0,y:-.5}});
    label('KEEP: DAY 34 · ×17,179,869,184',540,1840,{font:'900 38px MS',bg:RZ.y,col:'#1a1208',a:ss(seg(t,wi(12,'doubles')-.2,wi(12,'doubles')+.2))});ctx.restore();});}
// this morning the sun came up twice
function s13(t){const up=wi(13,'up'),tw=wi(13,'twice');let k=ss(seg(t,T(13),up+.2));if(t>tw-.5)k=t<tw?lerp(1,.15,ss(seg(t,tw-.5,tw-.1))):lerp(.15,1.05,ss(seg(t,tw,tw+.5)));
  vl(vcam(540,lerp(940,900,seg(t,T(13),E(13)+.6)),lerp(1.0,1.05,seg(t,T(13),E(13)+.6))),1,()=>{sunrise(t,{up:k,face:t>tw?ss(seg(t,tw,tw+.4)):0});
    if(t>tw)for(let i=0;i<6;i++)star4(540+Math.cos(i*1.05+t)*260,lerp(1250,820,k)+Math.sin(i*1.05+t)*240,26*Math.max(0,Math.sin(t*5+i)),'#fff6c9',1);
    me({x:870,y:1990,h:520,look:{x:-.8,y:-1},mouth:t>tw?'o':'smile',aura:.3,t});});
  dayPop(t,T(13),34,'17,179,869,184');}
// the question: me, the Moon and the Sun both looking
function s14(t){const k=seg(t,T(14)-.3,TL.total);
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.06,k)),1,()=>{nightCity(t,{base:1550});moon(160,460,170,t,{face:1,blush:1,hearts:1,glowA:.8});
    glow(930,420,260,'rgba(255,220,140,1)',.5);circ(930,420,150,'#ffe08a');for(const s of[-1,1]){ell(930+s*48,400,12,17,0,'#3a2418');ell(930+s*85,450,26,14,0,'rgba(255,95,162,.6)');}
    me({x:540,y:2240,h:1100,shades:true,aura:1,t,look:{x:0,y:-1},bob:Math.sin(t*2)*4});});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14};
const FADES={};
const CAPY={s1:.78,s2:.79,s3:.76,s4:.8,s5:.33,s6:.74,s7:.28,s8:.8,s9:.66,s10:.66,s11:.8,s12:.47,s13:.66,s14:.84};
const END_AT=null;
// HUD: the day and the multiplier tick up at the start of each scene
const DAYS={s1:30,s2:0,s3:1,s4:5,s5:10,s6:15,s7:20,s8:25,s9:30,s10:33,s11:33,s12:33,s13:34,s14:34};
const ORDER=['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13','s14'];
function hud(t){const sc=sceneAt(t).id;const i=ORDER.indexOf(sc);const d=DAYS[sc],pd=i>1?DAYS[ORDER[i-1]]:d;
  const st=TL.lines.find(l=>l.scene===sc).start;const dd=lerp(pd,d,ss(seg(t,st,st+.9)));const n=Math.pow(2,dd);
  const red=['s11','s12'].includes(sc);
  return{chips:[{k:'DAY',v:String(Math.round(dd))},{k:'RIZZ',v:'×'+fmt(n),hot:d>=20}],tag:red?"RIZZ: CAN'T TURN OFF":'RIZZ ×2 · DAILY',tagRed:red};}
