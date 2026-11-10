// ===================== The Fetch, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z0-9':]/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
const pop=(t,a,d=.3)=>ss(seg(t,a-.08,a-.08+d));
// lock screen with a status line
function lockScreen(sx,sy,sw,sh,t,o){ctx.fillStyle=vgrad(sy,sy+sh,[[0,'#16304f'],[1,'#0a1426']]);ctx.fillRect(sx,sy,sw,sh);
  text(o.time||'11:40',0,sy+170,'800 92px MS','#ffffff');text(o.date||'TUESDAY',0,sy+215,'700 26px MS','rgba(255,255,255,.7)');
  faceGlyph(0,sy+360,70,o.st||'scan',t);if(o.msg)text(o.msg,0,sy+480,'900 30px MS',o.st==='bad'?FC.red:o.st==='ok'?FC.mint:'#fff');if(o.msg2)text(o.msg2,0,sy+520,'800 24px MS','rgba(255,255,255,.75)');}
// s1 cold open: dark bedroom, me under the covers, the phone across the room unlocks
function s1(t){const k=seg(t,0,E(0)+.4);vl(vcam(lerp(540,560,k),lerp(960,980,k),lerp(1.0,1.08,k)),1,()=>{bedroom(t,{wx:300,wy:520,ww:400,wh:520,figure:(x,y,w,h)=>{fetchMe({x:x+60,y:y+380,h:520,look:{x:1,y:.3}});}});
  ctx.save();ctx.globalCompositeOperation='lighter';glow(820,860,700,'rgba(120,255,180,1)',.22);ctx.restore();
  me({x:210,y:1560,h:600,brow:'scared',mouth:'o',look:{x:1,y:0}});fillRR(-60,1260,640,320,40,'#33405e');fillRR(-60,1250,640,60,30,'#3f4d70');
  phone(810,860,.95,(sx,sy,sw,sh)=>lockScreen(sx,sy,sw,sh,t,{st:'ok',msg:'UNLOCKED',msg2:'FACE RECOGNIZED',time:'11:40'}));});
  label('ACROSS THE ROOM',780,300,{font:'900 44px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:72,a:pop(t,wi(0,'across'))});}
// s2 a fetch: me and my double
function s2(t){const k=seg(t,T(1),E(1)+.4);const d=pop(t,wi(1,'double'),.5);vl(vcam(540,lerp(1000,980,k),lerp(1,1.06,k)),1,()=>{fillAll('#101626');ctx.save();ctx.globalCompositeOperation='lighter';glow(540,900,700,'rgba(120,170,255,1)',.12);ctx.restore();
  ctx.fillStyle='#0a0e18';ctx.fillRect(-100,1450,1280,600);
  me({x:300,y:1480,h:760,brow:'worried',mouth:'flat',look:{x:1,y:0}});
  ctx.globalAlpha=d;fetchMe({x:780,y:1480,h:760});ctx.globalAlpha=1;});
  label('A FETCH',540,420,{font:'900 110px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:150,a:pop(t,wi(1,'fetch'))});
  label('YOU',300,1580,{font:'900 40px MS',h:64});label('YOUR DOUBLE',780,1580,{font:'900 40px MS',h:64,a:d});}
function s3(t){const rv=[wi(2,'one'),wi(2,'two')].map(a=>ss(seg(t,a-.05,a+.9)));rulesCard(t,{reveal:rv,circle:[0,ss(seg(t,wi(2,"don't"),wi(2,"don't")+.6))],s:lerp(.98,1.03,seg(t,T(2),E(2)))});}
// s4 two failed attempts, steam
function s4(t){const k=seg(t,T(3),E(3)+.4);vl(vcam(540,960,lerp(1,1.08,k)),1,()=>{fillAll('#2a3a48');const R=rng(7);for(let i=0;i<18;i++){const x=R()*1080,y=R()*1920;circ(x,y-t*20%400,120+R()*160,'#c8d6e0',.06);}
  for(let i=0;i<12;i++)fillRR(i*96,0,92,1920,0,i%2?'#33475a':'#2f4254');
  phone(540,860,1.35,(sx,sy,sw,sh)=>{lockScreen(sx,sy,sw,sh,t,{time:'7:02',date:'THIS MORNING',st:t>wi(3,'two')?'bad':'scan',msg:t>wi(3,'two')?'2 FAILED ATTEMPTS':''});},{bg:'#0a1426'});
  const sh=pop(t,wi(3,'shower'));if(sh>0){ctx.globalAlpha=sh;const R2=rng(2);for(let i=0;i<60;i++){const x=R2()*1080,y=(R2()*1920+t*900*(.6+R2()*.6))%1920;line(x,y,x-6,y+40,3,'rgba(220,235,255,.5)');}ctx.globalAlpha=1;}});
  label('I WAS IN THE SHOWER',540,1560,{font:'900 50px MS',bg:'rgba(10,12,16,.9)',h:84,a:pop(t,wi(3,'shower'))});}
// s5 the lock app photo: me, wet hair, kitchen, 7:02
function s5(t){const k=seg(t,T(4),E(4)+.4);const sn=pop(t,wi(4,'snapped'));fillAll('#0d1220');
  vl(vcam(540,960,lerp(1.02,1.1,k)),1,()=>{phone(540,880,1.4,(sx,sy,sw,sh)=>{ctx.fillStyle='#d9cdb3';ctx.fillRect(sx,sy,sw,sh);
    ctx.fillStyle='#bfae8e';ctx.fillRect(sx,sy+sh*.62,sw,sh);fillRR(sx+10,sy+160,120,90,6,'#8fb7d6');fillRR(sx+190,sy+300,150,220,8,'#e7e7e2');
    ctx.save();ctx.translate(0,sy+700);ctx.scale(.62,.62);fetchMe({x:0,y:0,h:700,eyes:0,aura:0,brow:'flat',mouth:'flat',look:{x:0,y:1}});
    for(let i=0;i<9;i++){const dx=-110+i*28,dy=-700*.97+((t*300+i*90)%160);circ(dx,dy,7,'#7fc6ff',.85);}ctx.restore();
    fillRR(sx,sy,sw,70,0,'rgba(0,0,0,.6)');text('INTRUDER PHOTO',0,sy+46,'900 26px MS','#fff');circ(sx+30,sy+36,9,FC.red,.5+.5*Math.sin(t*6));
    text('7:02 AM · KITCHEN',0,sy+sh-30,'900 28px MS','#fff');},{bg:'#000'});
    if(sn>0&&t<wi(4,'snapped')+.2)flash(.5*(1-seg(t,wi(4,'snapped'),wi(4,'snapped')+.2)));});
  label('WET HAIR',300,1600,{font:'900 50px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:82,a:pop(t,wi(4,'wet'))});
  label('KITCHEN',780,1600,{font:'900 50px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:82,a:pop(t,wi(4,'kitchen'))});}
// s6 Gran on the phone; outside the bakery that morning
function s6(t){const k=seg(t,T(5),E(5)+.4);const bk=pop(t,wi(5,'bakery'),.5);vl(vcam(540,960,lerp(1,1.06,k)),1,()=>{
  ctx.fillStyle=vgrad(-100,1100,[[0,'#8fd0ff'],[1,'#ffe7b8']]);ctx.fillRect(-100,-100,1280,1200);circ(880,180,90,'#fff3c4');glow(880,180,300,'rgba(255,240,180,1)',.5);
  fillRR(80,300,920,700,10,'#c96b4c');fillRR(80,280,920,60,6,'#7a3b2e');text('BAKERY',540,330,'900 52px MS','#fff3dc');fillRR(130,420,380,380,6,'#ffe3a6');fillRR(600,420,300,580,6,'#5a2c22');
  for(let i=0;i<4;i++)ell(220+i*80,760,34,22,0,'#c58a3e');
  ctx.fillStyle='#9c9c96';ctx.fillRect(-100,1000,1280,140);
  ctx.globalAlpha=bk;fetchMe({x:700,y:1130,h:560,eyes:0,aura:.3,look:{x:-1,y:0}});ctx.globalAlpha=1;
  ctx.fillStyle='#141a28';ctx.fillRect(-100,1140,1280,900);
  gran({x:300,y:1960,h:820,brow:'flat',mouth:'smile',look:{x:.6,y:-.3},armR:[2.6,.9],held:(hx,hy)=>{fillRR(hx-28,hy-60,56,110,10,'#111');}});});
  label('GRAN · CALLING',760,1340,{font:'900 44px MS',bg:FC.mint,col:'#06140c',h:72});
  label('THIS MORNING',700,1060-560*.0,{font:'900 40px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:64,a:bk});
  label('I NEVER LEFT THE HOUSE',540,1500,{font:'900 50px MS',bg:FC.red,col:'#fff',h:84,a:pop(t,wi(6-1,'never'))});}
// s7 11:40, unlocked, typing to Gran
function s7(t){const k=seg(t,T(6),E(6)+.4);const un=t>wi(6,'unlocked')-.05;vl(vcam(540,960,lerp(1,1.08,k)),1,()=>{fillAll('#090d16');
  phone(540,900,1.45,(sx,sy,sw,sh)=>{if(!un){lockScreen(sx,sy,sw,sh,t,{time:'11:40',st:'scan'});return;}
    ctx.fillStyle='#0d1118';ctx.fillRect(sx,sy,sw,sh);fillRR(sx,sy,sw,110,0,'#1b212c');circ(sx+60,sy+62,26,'#8a4a5c');text('Gran',sx+100,sy+74,'900 32px MS','#fff','left');
    bubble(sx+20,sy+160,240,'Night love x',{bg:'#2b313c',font:'800 26px MS',lh:32});
    const ty=t>wi(6,'typing')-.1;if(ty){const full="Don't worry about me.";const n=t>wi(6,"don't")?full.length:Math.floor(seg(t,wi(6,'typing'),wi(6,"don't"))*8);bubble(sx+sw-20,sy+300,270,full.slice(0,Math.max(1,n)),{right:true,font:'800 28px MS',lh:34});}
    fillRR(sx+16,sy+sh-80,sw-32,56,28,'#1b212c');text('typing…',sx+40,sy+sh-44,'700 22px MS','rgba(255,255,255,.5)','left',ty?1:0);},{bg:'#0d1118'});
  });
  if(un&&t<wi(6,'unlocked')+.25)flash(.35*(1-seg(t,wi(6,'unlocked'),wi(6,'unlocked')+.25)));
  label('UNLOCKED',540,240,{font:'900 76px MS',bg:FC.mint,col:'#06140c',h:110,a:pop(t,wi(6,'unlocked'))});
  label('NOBODY IS HOLDING IT',540,1620,{font:'900 46px MS',bg:'rgba(10,12,16,.9)',h:78,a:pop(t,wi(6,'itself'))});}
// s8 selfie view: me in front, the fetch in the yard through the window behind
function s8(t){const k=seg(t,T(7),E(7)+.4);const fig=pop(t,wi(7,'something'),.6);fillAll('#05070c');
  vl(vcam(540,960,lerp(1,1.06,k)),1,()=>{phone(540,960,2.3,(sx,sy,sw,sh)=>{ctx.save();ctx.scale(.42,.42);
    ctx.fillStyle='#1a2233';ctx.fillRect(-500,-900,1000,1800);
    win(60,-420,760,700,t,{figure:(x,y,w,h)=>{ctx.globalAlpha=fig;fetchMe({x:x+190,y:y+330,h:420,look:{x:0,y:0}});ctx.globalAlpha=1;}});
    me({x:-170,y:1250,h:1350,brow:fig>.5?'scared':'worried',mouth:fig>.5?'o':'flat',look:{x:.3,y:0}});ctx.restore();
    fillRR(sx,sy,sw,64,0,'rgba(0,0,0,.5)');circ(sx+30,sy+32,9,FC.red,.5+.5*Math.sin(t*6));text('FRONT CAMERA',0,sy+42,'900 22px MS','#fff');
    const z=ss(seg(t,wi(7,'something'),wi(7,'face')+.3));if(z>0){ctx.strokeStyle=FC.red;ctx.lineWidth=5;ctx.globalAlpha=z;const fx=(60+190)*.42,fy=(-420+330)*.42;rr(fx-70,fy-.42*420*1.05,140,.42*420*1.1,8);ctx.stroke();ctx.globalAlpha=1;}},{bg:'#000',lit:.4});});
  label('IN THE YARD',540,1640,{font:'900 64px MS',bg:FC.red,col:'#fff',h:100,a:pop(t,wi(7,'standing'))});}
// s9 face not recognized, again, again, locked out
function s9(t){const a=[wi(8,'face'),wi(8,'again'),W(8,.72),wi(8,'locked')];let n=0;a.forEach((x,i)=>{if(t>x-.05)n=i+1;});const lk=t>a[3]-.05;
  vl(vcam(540,960,1),1,()=>{fillAll('#0a0c12');ctx.save();ctx.globalCompositeOperation='lighter';glow(540,800,700,'rgba(255,60,40,1)',.08*n);ctx.restore();
    phone(540,720,1.15,(sx,sy,sw,sh)=>{if(lk){ctx.fillStyle='#1a0808';ctx.fillRect(sx,sy,sw,sh);fillRR(-70,sy+240,140,110,16,FC.red);ctx.strokeStyle=FC.red;ctx.lineWidth=22;ctx.beginPath();ctx.arc(0,sy+240,46,Math.PI,0);ctx.stroke();text('LOCKED OUT',0,sy+420,'900 40px MS',FC.red);text('Try again in 1 hour',0,sy+470,'700 24px MS','rgba(255,255,255,.7)');}
      else lockScreen(sx,sy,sw,sh,t,{st:n>0?'bad':'scan',msg:n>0?'NOT RECOGNIZED':'',msg2:n>0?`${2+n} FAILED`:''});},{lit:.5});
    me({x:540,y:2560,h:1100,brow:'scared',mouth:'open',look:{x:0,y:-1},armL:[2.7,.6],armR:[2.7,.6]});});
  for(let i=0;i<n&&i<4;i++){const at=a[i];if(t<at+.2&&t>at-.05)flash(.25,'#ff3b2b');}
  fillRR(140,1230,800,130,20,'rgba(10,12,16,.92)');for(let i=0;i<5;i++)circ(260+i*140,1295,38,i<Math.min(5,2+n)?FC.red:'#2a2e38');}
// s10 phone, door, bank: all accept it
function s10(t){fillAll('#0b0f18');const items=[['PHONE',wi(9,'phone')],['DOOR',wi(9,'door')],['BANK',wi(9,'bank')]];
  items.forEach(([nm,at],i)=>{const y=330+i*380,a=pop(t,at);if(a<=0)return;ctx.globalAlpha=a;fillRR(110,y,860,320,28,'#161c28');
    ctx.save();ctx.beginPath();ctx.arc(290,y+160,110,0,7);ctx.clip();ctx.fillStyle='#22324a';ctx.fillRect(170,y+40,240,240);fetchMe({x:290,y:y+509,h:420,aura:0});ctx.restore();
    ctx.globalAlpha=a;text(nm,450,y+130,'900 72px MS','#fff','left');label('✓ WELCOME BACK',450,y+215,{font:'900 38px MS',bg:FC.mint,col:'#06140c',h:64,align:'left',a});ctx.globalAlpha=1;});
  label('IT IS ME NOW',540,1560,{font:'900 76px MS',bg:FC.red,col:'#fff',h:116,a:pop(t,wi(9,"it's"))});}
// s11 Gran's text
function s11(t){const k=seg(t,T(10),E(10)+.4);fillAll('#0d1118');vl(vcam(540,960,lerp(1,1.05,k)),1,()=>{
  fillRR(0,140,1080,170,0,'#1b212c');circ(110,225,54,'#8a4a5c');text('Gran',200,245,'900 56px MS','#fff','left');
  const b=pop(t,wi(10,'saw'),.4);if(b>0)bubble(70,420,820,'Saw you this morning, love. You looked so well x',{bg:'#2b313c',font:'800 60px MS',lh:76,a:b});
  const m=pop(t,wi(10,'morning'));if(m>0){fillRR(150,1000,780,200,30,`rgba(255,201,60,${.96*m})`);text('MORNING =',540,1080,'900 56px MS','#14110a','center',m);text('A LONG LIFE',540,1160,'900 64px MS','#1d6b3e','center',m);}});}
// s12 split: it in the morning sun (long life) / me tonight
function s12(t){const sp=pop(t,wi(11,'tonight'),.5);
  ctx.save();ctx.beginPath();ctx.rect(0,0,1080,960);ctx.clip();ctx.fillStyle=vgrad(0,960,[[0,'#8fd0ff'],[1,'#ffe7b8']]);ctx.fillRect(0,0,1080,960);circ(860,200,90,'#fff3c4');glow(860,200,300,'rgba(255,240,180,1)',.5);ctx.fillStyle='#9c9c96';ctx.fillRect(0,860,1080,100);
  fetchMe({x:540,y:900,h:620,aura:.4,mouth:'smile'});label('IT: LONG LIFE',540,330,{font:'900 50px MS',bg:'#1d6b3e',col:'#fff',h:80,a:pop(t,wi(11,'it'))});ctx.restore();
  ctx.save();ctx.beginPath();ctx.rect(0,960,1080,960);ctx.clip();fillAll('#070a12');ctx.save();ctx.translate(0,960);bedroom(t,{wx:780,wy:300,ww:300,wh:300,dresser:false,figure:(x,y)=>{}});ctx.restore();
  me({x:540,y:1900,h:700,brow:'scared',mouth:'frown',look:{x:0,y:0}});label('ME: TONIGHT',540,1030,{font:'900 50px MS',bg:FC.red,col:'#fff',h:80,a:sp});ctx.restore();
  line(0,960,1080,960,8,'#fff');}
// s13 eyes shut, it taps the glass behind me
function s13(t){const p=.7+.3*Math.sin(t*5);vl(vcam(540,960,lerp(1.02,1.1,seg(t,T(12),E(12)+2))),1,()=>{bedroom(t,{wx:540,wy:620,ww:620,wh:640,dresser:false,figure:(x,y,w,h)=>{fetchMe({x:x-40,y:y+560,h:820,mouth:'smile',armR:[2.7,.2]});}});
    for(let i=0;i<3;i++){const q=fract(t*1.1+i/3);ctx.strokeStyle=`rgba(255,255,255,${.5*(1-q)})`;ctx.lineWidth=5;ctx.beginPath();ctx.arc(640,420,30+q*120,0,7);ctx.stroke();}
    me({x:540,y:1820,h:900,brow:'worried',mouth:'grit',blink:1,look:{x:0,y:0}});});
  ctx.save();ctx.globalCompositeOperation='lighter';glow(540,600,700,'rgba(255,60,40,1)',.12*p);ctx.restore();
  label('TAP · TAP · TAP',540,240,{font:'900 56px MS',bg:'rgba(10,12,16,.9)',h:90});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.84,s2:.86,s3:.88,s4:.9,s5:.88,s6:.92,s7:.9,s8:.93,s9:.64,s10:.9,s11:.78,s12:.5,s13:.9};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;let tm='11:40 PM',f='0',seen='—',hot=false;
  if(t<T(1)){f='0';seen='NIGHT';hot=true;}else if(t<T(3)){tm='—';}else if(t<T(5)){tm='7:02 AM';f='2';seen='MORNING';}else if(t<T(6)){tm='12:00 PM';f='2';seen='MORNING';}
  else if(t<T(8)){tm='11:40 PM';f='2';seen=t>wi(7,'something')?'NIGHT':'MORNING';hot=t>wi(7,'something');}
  else{tm='11:41 PM';const a=[wi(8,'face'),wi(8,'again'),W(8,.72),wi(8,'locked')];let n=2;a.forEach((x,i)=>{if(t>x-.05)n=3+i;});f=n>=6?'LOCKED':String(n);seen='NIGHT';hot=true;}
  const chips=[{k:'TIME',v:tm},{k:'FAILED',v:f,hot:f!=='0'&&f!=='—'},{k:'SEEN',v:seen,hot:seen==='NIGHT'}];
  const tag={s1:'MY ROOM',s2:'IRISH FOLKLORE',s3:"GRAN'S RULES",s4:'THIS MORNING',s5:'LOCK APP',s6:'NOON',s7:'11:40 PM',s8:'FRONT CAMERA',s9:'FACE UNLOCK',s10:'IT IS ME',s11:'GRAN',s12:'MORNING VS NIGHT',s13:'BEHIND ME'}[sc];return{chips,tag,tagRed:hot};}
