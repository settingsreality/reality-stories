// ===================== Only a Test, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z0-9':]/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
const pop=(t,a,d=.3)=>ss(seg(t,a-.08,a-.08+d));
// crowd on the sand: n walkers spread between y0..y1, moving toward the water by q (0..1)
function crowd(t,n,shore,q,o={}){const R=rng(o.seed||3);const P=[];for(let i=0;i<n;i++){const x=R()*1000+40,y0=1450+R()*200,y1=lerp(shore+40,shore+380,R());P.push([x,lerp(y0,y1,q),R()]);}
  P.sort((a,b)=>a[1]-b[1]);for(const[x,y,r]of P){const h=lerp(40,110,clamp((y-760)/800));walker(x,y,h,Math.floor(r*999),{walk:o.still?null:t*6,face:o.face,glint:o.glint});}}
function speech(x,y,txt,a,o={}){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.font=o.font||'900 54px MS';const lines=txt.split('\n');const w=Math.max(...lines.map(s=>ctx.measureText(s).width))+70,h=lines.length*(o.lh||64)+44;
  fillRR(x-w/2,y-h,w,h,24,o.bg||'#f4f1ea');poly([x-24,y-2,x+24,y-2,x,y+40],o.bg||'#f4f1ea');lines.forEach((s,k)=>text(s,x,y-h+22+(o.lh||64)*.8+k*(o.lh||64),o.font||'900 54px MS',o.col||'#14110a','center'));ctx.restore();}
// s1 cold open: from my window, the whole town walking down onto the dry seabed under the tower
function s1(t){const k=seg(t,0,E(0)+.4);vl(vcam(540,lerp(960,940,k),lerp(1.0,1.08,k)),1,()=>{const sh=bay(t,{ret:1,townY:1560});tower(880,1100,.95,t,{on:1});crowd(t,70,sh,.55+.08*k,{seed:5});
    ctx.fillStyle='#0b0f17';ctx.fillRect(-200,1560,1480,600);fillRR(-200,1530,1480,40,0,'#c9c2b4');
    me({x:220,y:2120,h:820,brow:'scared',mouth:'o',look:{x:.8,y:-.6}});});
  speech(760,360,'THIS IS ONLY\nA TEST.',pop(t,wi(0,'this')),{bg:OT.gold});}
// s2 daytime: noon, first Monday, Westminster chimes
function s2(t){const k=seg(t,T(1),E(1)+.4);vl(vcam(540,lerp(980,960,k),lerp(1,1.06,k)),1,()=>{bay(t,{day:1,ret:0,townY:1700});tower(540,1500,1.2,t,{on:pop(t,wi(1,'westminster'))});
  notes(540,700,t,6,pop(t,wi(1,'westminster')));});
  label('WESTMINSTER CHIMES',540,330,{font:'900 58px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:92,a:pop(t,wi(1,'westminster'))});
  label('1ST MONDAY · 12:00 NOON',540,1580,{font:'900 50px MS',bg:'rgba(10,12,16,.9)',h:84,a:pop(t,wi(1,'noon'))});
  label('WASHINGTON COAST · REAL',540,450,{font:'800 34px MS',h:58,a:pop(t,wi(1,'washington'))});}
// s3 the real warning: wail, walk uphill, no cars
function s3(t){const w=pop(t,wi(2,'wailing'));vl(vcam(540,960,1),1,()=>{fillAll('#1a0d10');ctx.save();ctx.globalCompositeOperation='lighter';glow(300,500,700,'rgba(255,60,40,1)',.2*w);ctx.restore();
  tower(300,1150,.9,t,{on:w,wail:1});
  poly([-100,1900,1180,1250,1180,1950,-100,1950],'#2a3442');const up=pop(t,wi(2,'uphill'));
  for(let i=0;i<3;i++){const q=fract(t*.12+i/3);walker(lerp(150,950,q),lerp(1840,1340,q),150,i*7,{walk:t*6});}
  if(up>0){ctx.globalAlpha=up;line(560,1500,860,1350,22,OT.mint);poly([900,1330,830,1310,860,1390],OT.mint);ctx.globalAlpha=1;}
  const dr=pop(t,wi(3-1,'drive'));if(dr>0){ctx.save();ctx.globalAlpha=dr;ctx.translate(820,560);fillRR(-150,-40,300,80,18,'#5f7ea0');fillRR(-90,-100,180,70,16,'#5f7ea0');circ(-90,44,34,'#111');circ(90,44,34,'#111');ctx.strokeStyle=OT.red;ctx.lineWidth=22;ctx.beginPath();ctx.arc(0,0,200,0,7);ctx.stroke();line(-140,-140,140,140,22,OT.red);ctx.restore();}});
  label('REAL WARNING: A WAIL',540,330,{font:'900 56px MS',bg:OT.red,col:'#fff',h:92,a:w});
  label('WALK UPHILL',700,1180,{font:'900 50px MS',bg:OT.mint,col:'#06140c',h:82,a:pop(t,wi(2,'uphill'))});}
function s4(t){const rv=[wi(3,'one'),wi(3,'two'),wi(3,'three')].map(a=>ss(seg(t,a-.05,a+.9)));rulesCard(t,{reveal:rv,s:lerp(.98,1.03,seg(t,T(3),E(3)))});}
// s5 Tuesday 3:07, the chimes slowly
function s5(t){const k=seg(t,T(4),E(4)+.4);const ch=pop(t,wi(4,'chimes'),.6);vl(vcam(540,lerp(1000,960,k),lerp(1,1.1,k)),1,()=>{fillAll('#070b18');const R=rng(2);for(let i=0;i<70;i++)circ(R()*1080,R()*1200,R()*2+.6,'#dfe8ff',.6);
  tower(540,1900,1.9,t,{on:ch});notes(540,620,t,5,ch,'#ffe2a0',.12);});
  fillRR(240,1330,600,260,30,'rgba(5,8,14,.9)');text('TUESDAY',540,1400,'800 40px MS','rgba(255,255,255,.7)');text('3:07 AM',540,1540,'900 130px MS',OT.gold,'center',pop(t,wi(4,'3:07')));
  label('NOT A TEST DAY',540,330,{font:'900 50px MS',bg:OT.red,col:'#fff',h:84,a:pop(t,wi(4,'tuesday'))});}
// s6 the bay is gone
function s6(t){const ret=ss(seg(t,wi(5,'gone')-.6,wi(5,'mile')+.4));vl(vcam(540,960,lerp(1,1.06,seg(t,T(5),E(5)))),1,()=>{const sh=bay(t,{ret,townY:1700});tower(900,1260,.7,t,{on:.3});
  if(ret>.2){ctx.globalAlpha=clamp(ret*1.5-.3);line(160,sh+10,160,1140,8,OT.gold);poly([160,sh-6,140,sh+34,180,sh+34],OT.gold);poly([160,1150,140,1110,180,1110],OT.gold);ctx.globalAlpha=1;label('~1 MILE',300,lerp(sh,1140,.5),{font:'900 48px MS',bg:OT.gold,col:'#14110a',h:78,a:clamp(ret*1.5-.3)});}});
  label('THE BAY IS GONE',540,330,{font:'900 64px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:100,a:pop(t,wi(5,'gone'))});
  label('NATURE\'S OWN WARNING',540,1580,{font:'900 46px MS',bg:OT.red,col:'#fff',h:78,a:pop(t,wi(5,'sign'))});}
// s7 neighbors in pajamas walk down the street onto the sand
function s7(t){const k=seg(t,T(6),E(6)+.4);vl(vcam(540,lerp(1000,960,k),lerp(1,1.08,k)),1,()=>{const sh=bay(t,{ret:1,town:false});
  ctx.fillStyle='#1d2433';poly([300,1920,780,1920,600,sh+40,480,sh+40],'#2a3140');for(let i=0;i<4;i++){const x=i<2?-40+i*170:760+(i-2)*170;poly([x,1920,x,1400,x+80,1330,x+160,1400,x+160,1920],'#141b2a');fillRR(x+50,1460,50,50,4,'#ffd9a0');}
  const R=rng(9);for(let i=0;i<16;i++){const q=fract(t*.06+R());const y=lerp(1950,sh+80,q),x=lerp(540+(R()-.5)*300,540+(R()-.5)*900,q);walker(x,y,lerp(260,60,q),i*13,{walk:t*6});}});
  label('BAREFOOT',300,330,{font:'900 50px MS',bg:'rgba(10,12,16,.9)',h:84,a:pop(t,wi(6,'barefoot'))});
  label('DOWN',780,330,{font:'900 64px MS',bg:OT.red,col:'#fff',h:100,a:pop(t,wi(6,'down'))});}
// s8 Mom in her robe, me at the window
function s8(t){const k=seg(t,T(7),E(7)+.4);const sh_=pop(t,wi(7,'she'));vl(vcam(540,960,lerp(1,1.06,k)),1,()=>{const sh=bay(t,{ret:1,town:false});
  mom({x:lerp(520,600,k),y:1500,h:620,back:1,armL:[.1,.1],armR:[.1,.1]});
  ctx.fillStyle='#0b0f17';ctx.fillRect(-200,1560,1480,600);fillRR(-200,1530,1480,40,0,'#c9c2b4');
  me({x:240,y:2200,h:900,brow:'scared',mouth:'open',look:{x:.6,y:-.8},armR:[2.6,.5]});});
  label('MOM!',380,1140,{font:'900 70px MS',bg:'#f4f1ea',col:'#14110a',h:104,a:pop(t,wi(7,'mom'))});
  label("SHE DOESN'T HEAR ME",540,330,{font:'900 52px MS',bg:OT.red,col:'#fff',h:86,a:sh_});}
// s9 counting from the window
function s9(t){const a=wi(8,'twelve'),b=wi(8,'forty'),c=wi(8,'two');let n=0,show=4;if(t>a-.05){n=12;show=12;}if(t>b-.05){n=40;show=40;}if(t>c-.05){n=200;show=200;}
  vl(vcam(540,960,1),1,()=>{const sh=bay(t,{ret:1,town:false});crowd(t,Math.min(show,140),sh,.7,{seed:8});
    ctx.fillStyle='#0b0f17';ctx.fillRect(-200,1500,1480,700);fillRR(-200,1470,1480,40,0,'#c9c2b4');});
  fillRR(240,1560,600,280,30,'rgba(5,8,14,.92)');text('WALKING DOWN',540,1630,'800 40px MS','rgba(255,255,255,.7)');text(n?String(n):'—',540,1790,'900 150px MS',n>12?OT.red:OT.gold);
  for(const x of[a,b,c])if(t>x-.05&&t<x+.18)flash(.25);
  label('RULE 3: NEVER GO DOWN',540,330,{font:'900 48px MS',bg:'#f4f1ea',col:'#a3261b',h:80,a:pop(t,wi(8,'rule'))});}
// s10 rows on the seabed, facing the tower
function s10(t){const k=seg(t,T(9),E(9)+.4);vl(vcam(540,lerp(980,940,k),lerp(1,1.1,k)),1,()=>{const sh=bay(t,{ret:1,town:false});tower(540,sh+120,.8,t,{on:.5});
  for(let r=0;r<7;r++)for(let i=0;i<14;i++){const y=sh+260+r*150,x=60+i*70+(r%2)*35;walker(x,y,lerp(70,170,r/6),r*20+i);}});
  label('LIKE AN AUDIENCE',540,330,{font:'900 58px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:92,a:pop(t,wi(9,'like'))});}
// s11 the tower speaks; my address
function s11(t){const k=seg(t,T(10),E(10)+.4);vl(vcam(540,960,lerp(1,1.08,k)),1,()=>{fillAll('#070b18');tower(540,2100,2.1,t,{on:1});});
  speech(540,720,'TEST COMPLETE.\n1 RESIDENT\nDID NOT RESPOND.',pop(t,wi(10,'test')),{bg:'#f4f1ea'});
  const ad=pop(t,wi(10,'my'));if(ad>0){label('14 HARBOR VIEW ROAD',540,980,{font:'900 64px MS',bg:OT.red,col:'#fff',h:104,a:ad});if(t<wi(10,'my')+.25)flash(.4*(1-seg(t,wi(10,'my'),wi(10,'my')+.25)),'#ff3b2b');}}
// s12 everyone passed but me: every face turns to my house
function s12(t){const tu=pop(t,wi(11,'us'),.6);vl(vcam(540,960,lerp(1,1.08,seg(t,T(11),E(11)))),1,()=>{const sh=bay(t,{ret:1,town:false});
  for(let r=0;r<6;r++)for(let i=0;i<12;i++){const y=sh+300+r*170,x=70+i*85+(r%2)*40;walker(x,y,lerp(90,200,r/5),r*20+i,{face:tu>.5,glint:tu});}});
  label('PASSED ✓',540,330,{font:'900 64px MS',bg:OT.mint,col:'#06140c',h:100,a:pop(t,wi(11,'us'))});
  label('FAILED: ME',540,460,{font:'900 64px MS',bg:OT.red,col:'#fff',h:100,a:pop(t,wi(11,'but'))});}
// s13 the sea coming back, Mom in the front row
function s13(t){const p=.7+.3*Math.sin(t*5);const back=ss(seg(t,T(12),T(12)+8));vl(vcam(540,960,1.04),1,()=>{const sh=bay(t,{ret:1-back*.35,town:false});
  const wy=780+back*120;ctx.fillStyle='rgba(20,60,90,1)';ctx.beginPath();ctx.moveTo(-200,wy);for(let x=-200;x<=1280;x+=40)ctx.lineTo(x,wy-60-Math.sin(x*.01+t)*20);ctx.lineTo(1280,wy+60);ctx.lineTo(-200,wy+60);ctx.fill();
  ctx.strokeStyle='rgba(230,245,255,.7)';ctx.lineWidth=8;ctx.beginPath();for(let x=-200;x<=1280;x+=40){const yy=wy-60-Math.sin(x*.01+t)*20;x===-200?ctx.moveTo(x,yy):ctx.lineTo(x,yy);}ctx.stroke();
  for(let i=0;i<12;i++)walker(70+i*85,sh+300,90,i);mom({x:540,y:sh+560,h:300,back:1});
  ctx.fillStyle='#0b0f17';ctx.fillRect(-200,1640,1480,600);fillRR(-200,1610,1480,40,0,'#c9c2b4');});
  ctx.save();ctx.globalCompositeOperation='lighter';glow(540,800,700,'rgba(255,60,40,1)',.1*p);ctx.restore();
  label('MOM · FRONT ROW',540,1180,{font:'900 44px MS',bg:'#d98aa6',col:'#14110a',h:72});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.6,s2:.88,s3:.9,s4:.9,s5:.56,s6:.9,s7:.86,s8:.86,s9:.62,s10:.9,s11:.62,s12:.9,s13:.9};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;let tm='3:07 AM',shore='0',down='0',hot=false;
  if(t<T(1)){tm='3:12 AM';shore='-1 MI';down='ALL';hot=true;}else if(t<T(4)){tm='—';shore='—';down='—';}
  else if(t<T(5)){tm='3:07 AM';}
  else if(t<T(6)){tm='3:08 AM';const r=ss(seg(t,wi(5,'gone')-.6,wi(5,'mile')+.4));shore=r>.05?'-'+(r).toFixed(1)+' MI':'0';hot=r>.05;}
  else{tm=t<T(10)?'3:10 AM':'3:12 AM';shore='-1 MI';hot=true;down=t<T(8)?'?':'';
    if(t>=T(8)){const a=wi(8,'twelve'),b=wi(8,'forty'),c=wi(8,'two');down=t>c-.05?'200':t>b-.05?'40':t>a-.05?'12':'?';}if(t>=T(9))down='ALL';if(t<T(8))down=t<T(7)?'MANY':'+MOM';}
  const chips=[{k:'TIME',v:tm},{k:'SEA',v:shore,hot},{k:'WALKING DOWN',v:down,hot:down!=='0'&&down!=='—'}];
  const tag={s1:'MY WINDOW',s2:'REAL · WA COAST',s3:'REAL WARNING',s4:"MOM'S RULES",s5:'TUESDAY',s6:'THE BAY',s7:'MY STREET',s8:'MOM',s9:'RULE THREE',s10:'THE SEABED',s11:'THE TOWER',s12:'THE TEST',s13:'YOUR CALL'}[sc];return{chips,tag,tagRed:hot};}
