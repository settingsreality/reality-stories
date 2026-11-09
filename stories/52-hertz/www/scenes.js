// ===================== 52 Hertz, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z0-9']/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
// cold open: the boat from below, shapes rising
function s1(t){const k=ss(seg(t,0,E(0)+.4));vl(vcam(540,lerp(980,1040,k),lerp(1,1.1,k)),1,()=>{seaBack(t,620);boat(t,540,620,1.4,1);
  me({x:790,y:560,h:230,brow:'scared',mouth:'o',look:{x:-.3,y:1}});
  rings(540,720,t*1.2,4,760,'255,90,70',.5);
  const W=[[200,1330,1.0,0],[860,1300,.95,1],[540,1500,1.25,0],[130,1050,.7,1],[960,1010,.62,0]];
  W.forEach(([x,y,s,f],i)=>{const y2=y-seg(t,0,8)*90;whale(x,y2,s,{f:f===1,col:'#2a5676',dk:'#173a55',eye:.9+.1*Math.sin(t*2+i),r:(f===1?.25:-.25)});});
  });}
// the lonely whale, the scale
function s2(t){const k=seg(t,T(1),E(1)+.4);vl(vcam(lerp(500,560,k),lerp(1000,960,k),lerp(1,1.12,k)),1,()=>{ctx.fillStyle=vgrad(-100,2000,[[0,'#0d2f4a'],[1,'#04101f']]);ctx.fillRect(-100,-100,1280,2200);rings(470,960,t,4,520);whale(470,960,.92,{col:'#2f5a7c',dk:'#1a3a55',eye:.9});});
  const y=430;fillRR(120,y-120,840,250,18,'rgba(4,10,20,.85)');text('WHALES SING AT',150,y-74,'800 34px MS','rgba(255,255,255,.7)','left');line(150,y+10,930,y+10,6,'rgba(255,255,255,.3)');
  const px=f=>150+(f/60)*780;fillRR(px(10),y-14,px(40)-px(10),48,10,'rgba(120,190,255,.55)');text('OTHERS 10–40 HZ',px(25),y+18,'800 26px MS','#fff');
  const on=ss(seg(t,wi(1,'52')-.15,wi(1,'52')+.3));if(on>0){fillRR(px(52)-10,y-34,20,88,6,HZ.gold);label('52',px(52),y-66,{font:'900 44px MS',bg:HZ.gold,col:'#14110a',h:64,a:on});}
  const n=ss(seg(t,wi(1,'seen')-.1,wi(1,'seen')+.3));if(n>0)label('NEVER SEEN',540,1320,{font:'900 58px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:92,a:n});}
// cabin, night watch, headphones
function s3(t){const k=seg(t,T(2),E(2)+.4);vl(vcam(540,lerp(1000,980,k),lerp(1,1.1,k)),1,()=>{ctx.fillStyle=vgrad(0,1920,[[0,'#16202e'],[1,'#0b1119']]);ctx.fillRect(-100,-100,1280,2200);
  circ(250,430,175,'#2b333f');circ(250,430,145,'#0a1a33');const R=rng(3);ctx.save();ctx.beginPath();ctx.arc(250,430,140,0,7);ctx.clip();for(let i=0;i<30;i++)circ(120+R()*260,300+R()*170,R()*2+1,'#dfe8ff',.8);ctx.fillStyle='#0a2740';ctx.fillRect(100,478+Math.sin(t*1.1)*10,300,200);ctx.restore();
  spectro(t,{x:560,y:300,w:440,h:320,lines:[0]});
  fillRR(60,1220,960,110,16,'#262c36');for(let i=0;i<7;i++)circ(140+i*130,1275,18,['#5cf2a2','#ffc93c','#ff4d3d'][i%3],.85);
  me({x:540,y:1830,h:1160,brow:'flat',mouth:'flat',look:{x:.7,y:-.4}});headset(540,1830-.83*1160,.17*1160);});}
function s4(t){const rv=[wi(3,'one'),wi(3,'two'),wi(3,'three')].map(a=>ss(seg(t,a-.05,a+.8)));rulesCard(t,{reveal:rv,s:lerp(.98,1.03,seg(t,T(3),E(3)))});}
function s5(t){const on=ss(seg(t,wi(4,'there')-.1,wi(4,'there')+.3));spectro(t,{lines:[on]});if(on>0){label('1 VOICE',540,1190,{font:'900 56px MS',bg:HZ.mint,col:'#06140c',h:86,a:on});}
  const log=ss(seg(t,wi(4,'logged')-.1,wi(4,'logged')+.3));if(log>0){ctx.save();ctx.translate(800,1330);ctx.rotate(-.1);ctx.globalAlpha=log;ctx.strokeStyle=HZ.red;ctx.lineWidth=7;rr(-140,-46,280,92,8);ctx.stroke();text('LOGGED',0,18,'900 54px MS',HZ.red);ctx.restore();}
  text('RANGE',230,1340,'800 34px MS','rgba(255,255,255,.6)','left');text('40 KM',230,1420,'900 90px MS',HZ.gold,'left',on);}
function s6(t){const at=wi(5,'second');const a=ss(seg(t,at-.05,at+.25));spectro(t,{y:250,h:620,lines:[1,a],off:[0,-1.6]});if(a>0&&t<at+.25)flash(.45*(1-seg(t,at,at+.25)));
  label('2 VOICES',540,1040,{font:'900 76px MS',bg:HZ.red,col:'#fff',h:112,a});
  vl(vcam(540,960,1),1,()=>{me({x:540,y:2500,h:1200,brow:'scared',mouth:'open',look:{x:0,y:-1}});headset(540,2500-.83*1200,.17*1200);});}
function s7(t){const dk=ss(seg(t,wi(6,'dark')-.05,wi(6,'dark')+.25));const L=1-dk;vl(vcam(540,960,1),1,()=>{seaBack(t,740);boat(t,540,740,1.35,L);if(dk>.2){ctx.fillStyle=`rgba(0,0,0,${.45*dk})`;ctx.fillRect(-100,-100,1280,960);}});
  const a=wi(6,'three'),b=wi(6,'nine'),c=wi(6,'forty');let n=2;if(t>a-.05)n=3;if(t>b-.05)n=9;if(t>c-.05)n=40;const hot=n>2;
  fillRR(170,950,740,430,28,'rgba(4,10,20,.9)');text('VOICES AT 52 HZ',540,1040,'800 40px MS','rgba(255,255,255,.7)');text(String(n),540,1300,'900 240px MS',hot?HZ.red:HZ.gold);if(t>a-.05&&t<a+.2||t>b-.05&&t<b+.2||t>c-.05&&t<c+.2)flash(.28);}
function s8(t){const q=ss(seg(t,T(7),E(7)+.3));const ar=ss(seg(t,wi(7,'heading')-.2,wi(7,'heading')+.5));radar(t,{q,arrow:ar,whale:-2.2});}
function s9(t){const lane=ss(seg(t,wi(8,'follows')-.1,wi(8,'follows')+.5));const tr=ss(seg(t,T(8)+.3,wi(8,'wandered')));chart(t,{track:tr,lanes:lane});if(lane>0)label('SHIPPING LANES',640,1320,{font:'900 58px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:92,a:lane});
  vl(vcam(540,960,1),1,()=>{ines({x:230,y:1900,h:560,brow:lane>.3?'scared':'worried',mouth:lane>.3?'o':'flat',look:{x:0,y:-1}});});}
function s10(t){fillAll('#06121e');glow(540,800,800,'rgba(90,190,220,1)',.12);text('THE WHALE’S SONG',540,300,'900 62px MS',HZ.gold);
  const ship=ss(seg(t,wi(9,'ship')-.1,wi(9,'ship')+.3));const at=T(10);const ours=t>at-.05;
  const n=7;for(let i=0;i<n+1;i++){const x=120+i*120;const isOurs=i===n;if(isOurs&&!ours&&t<wi(9,"last")-.1)continue;const col=isOurs?HZ.red:HZ.mint;const s=Math.abs(Math.sin(t*2.2+i*1.3));const h=isOurs?360:200+[1,.5,.8,.35,.7,.9,.6][i%7]*180+s*30;fillRR(x-30,860-h/2,60,h,12,col);if(ship>0||isOurs){shipIcon(x,560,1.25,isOurs?HZ.red:HZ.gold);ctx.globalAlpha=isOurs?1:ship;ctx.globalAlpha=1;}if(isOurs){const a=ours?1:.6;label('US',x,500,{font:'900 44px MS',bg:HZ.red,col:'#fff',h:66,a});}}
  if(ours&&t<at+.28)flash(.5*(1-seg(t,at,at+.28)));if(t>wi(9,'last')-.1)label('+1 NOTE',540,1150,{font:'900 76px MS',bg:HZ.red,col:'#fff',h:116});}
function s11(t){const k=seg(t,T(11),E(11)+.4);const tell=ss(seg(t,wi(11,'told')-.1,wi(11,'told')+.5));vl(vcam(540,lerp(950,970,k),lerp(1,1.12,k)),1,()=>{ctx.fillStyle=vgrad(-100,2000,[[0,'#092338'],[1,'#030a14']]);ctx.fillRect(-100,-100,1280,2200);whale(1400,1060,3.2,{col:'#23506f',dk:'#123147',eye:1});
  ctx.save();ctx.globalCompositeOperation='lighter';if(tell>0)rings(376,983,t*2,5,1100,'255,90,70',.55*tell);ctx.restore();});
  label('LOOKOUT',540,500,{font:'900 92px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:132,a:ss(seg(t,wi(11,'lookout')-.1,wi(11,'lookout')+.3))});}
function s12(t){const c=ss(seg(t,wi(12,'three'),wi(12,'three')+.7));radar(t,{cy:610,R:360,q:.95,n:40});readHud(540,1065,'900 M');vl(vcam(540,960,1),1,()=>{me({x:300,y:2300,h:900,brow:'scared',mouth:'o',look:{x:.9,y:0}});headset(300,2300-.83*900,.17*900);ines({x:790,y:2300,h:900,brow:'angry',mouth:'open',look:{x:-.9,y:0}});});
  if(c>0){fillRR(290,1205,500,110,14,'rgba(241,235,221,.96)');text('3. STAY DARK',540,1280,'900 56px MS','#a3261b','center',c);}}
function readHud(x,y,v){fillRR(x-260,y-90,520,180,22,'#2a0d0b');ctx.strokeStyle=HZ.red;ctx.lineWidth=6;rr(x-260,y-90,520,180,22);ctx.stroke();text(v,x,y+50,'900 130px MS',HZ.red);}
function s13(t){const p=.7+.3*Math.sin(t*5);fillAll('#050910');glow(540,1160,700,'rgba(255,60,40,1)',.2*p);fillRR(250,890,580,540,50,'#1b1f27');circ(540,1130,200,'#6d1410');circ(540,1130,175,HZ.red);glow(540,1130,380,'rgba(255,80,60,1)',.35*p);text('START',540,1160,'900 92px MS','#fff');text('ENGINE',540,1390,'800 44px MS','rgba(255,255,255,.65)');
  const R=rng(3);for(let i=0;i<24;i++){const a=i/24*6.283,d=320+Math.sin(t*2+i)*16;circ(540+Math.cos(a)*d,1130+Math.sin(a)*d,10,HZ.red,.65);}}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.84,s2:.78,s3:.8,s4:.86,s5:.82,s6:.92,s7:.84,s8:.86,s9:.86,s10:.78,s11:.82,s12:.93,s13:.86};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;let v='1',r='40 KM',hot=false;if(t<T(1)){v='40';r='900 M';hot=true;}else if(t<T(4)){v='—';r='—';}else if(t<wi(5,'second')){v='1';r='40 KM';}else if(t<wi(6,'three')-.05){v='2';r='31 KM';hot=true;}else if(t<wi(6,'nine')-.05){v='3';r='22 KM';hot=true;}else if(t<wi(6,'forty')-.05){v='9';r='14 KM';hot=true;}else{v='40';const k=seg(t,T(7),T(12));r=(lerp(14,.9,k)).toFixed(1)+' KM';hot=true;if(k>=1)r='900 M';}
  const tm=t<T(1)?'2:41 AM':t<T(4)?'1:50 AM':t<T(7)?'2:14 AM':'2:41 AM';
  const chips=[{k:'TIME',v:tm},{k:'VOICES',v,hot},{k:'RANGE',v:r,hot}];
  const tag={s1:'N. PACIFIC',s2:'52 HZ · REAL',s3:'NIGHT WATCH',s4:"INES'S RULES",s5:'HYDROPHONE',s6:'HYDROPHONE',s7:'GO DARK',s8:'RANGE',s9:'THE TRACKS',s10:'THE SONG',s11:'LOOKOUT',s12:'900 METERS',s13:'YOUR CALL'}[sc];return{chips,tag,tagRed:hot};}
