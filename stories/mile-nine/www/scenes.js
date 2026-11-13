// ===================== Mile Nine, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z0-9']/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
const hit=(t,at,d=.25,a=.3)=>{if(t>at-.05&&t<at+d)flash(a*(1-seg(t,at-.05,at+d)));};

// cold open: the kitchen drawer pulsing red, the beacon screaming SOS, me frozen in the doorway
function s1(t){const k=ss(seg(t,0,E(0)+.4));vl(vcam(540,lerp(1060,1020,k),lerp(1.05,1.15,k)),1,()=>{kitchen(t,{bs:.78,by:1120,bx:500});
  me({x:860,y:1980,h:900,brow:'scared',mouth:'o',look:{x:-.9,y:.4},face:-.4});});
  const p=.75+.25*Math.sin(t*9);label('SOS SENT',540,400,{font:'900 92px MS',bg:MN.red,col:'#fff',h:140,a:p});
  if(t>wi(0,'kitchen')-.1)label('IN THE DRAWER SINCE 2022',540,560,{font:'800 40px MS',bg:'rgba(255,201,60,.96)',col:'#14110a',h:72});}
// the ridge four years ago: the tent still lit, flap open, nobody; Dad's photo
function s3(t){const k=seg(t,T(1)-.2,E(1)+.4);vl(vcam(540,lerp(1150,1250,k),lerp(1.0,1.18,k)),1,()=>{ridge(t,{tx:540,ty:1500,ts:.95,lit:1});snow(t,3,40,{fall:30,wind:20,a:.25});});
  // photo of Dad, taped
  const pa=1-ss(seg(t,wi(1,'tent')-.3,wi(1,'tent')+.2));if(pa>0){ctx.save();ctx.globalAlpha=pa;ctx.translate(540,640);ctx.rotate(-.05);fillRR(-230,-280,460,560,8,'#f3efe6');ctx.save();rr(-200,-250,400,420,4);ctx.clip();
    ctx.fillStyle=vgrad(-250,170,[[0,'#7fb0d8'],[1,'#c9d9b0']]);ctx.fillRect(-200,-250,400,420);poly([-200,100,-60,-60,60,40,200,-80,200,170,-200,170],'#6a8a5a');dad({x:0,y:240,h:400,brow:'flat',mouth:'smile',look:{x:0,y:0}});ctx.restore();
    text('DAD · HOLLOW RIDGE',0,230,'800 30px MS','#2a2a30');ctx.restore();}
  if(t>wi(1,'not')-.1){label('NOT HIM',540,520,{font:'900 64px MS',bg:MN.red,col:'#fff',h:100});hit(t,wi(1,'not'));}}
// phone: rescue center message
function s4(t){const r=wi(2,'received'),q=wi(2,'are');const k=seg(t,T(2)-.2,E(2)+.4);fillAll('#06080d');glow(540,900,800,'rgba(80,140,255,1)',.10);
  vl(vcam(540,960,lerp(1.0,1.06,k)),1,()=>{phone(540,860,1.05,()=>{fillAll('#0b0f16');chatHeader('RESCUE CENTER','satellite · 24/7');
    let y=260;if(t>r-.15)y=bubble(y,['SOS RECEIVED.'],{bg:'#5a1410',font:'900 48px MS'});
    if(t>q-.1)y=bubble(y,['Are you injured?'],{});
    if(t>q+.6)bubble(y,['How many in','your group?'],{});
    fillRR(20,1110,570,90,40,'#1a1f2a');text('Message…',60,1166,'600 34px MS','rgba(255,255,255,.35)','left');});});
  hit(t,r,.2,.2);}
// topo map: pin at mile nine where the tent was
function s5(t){const k=seg(t,T(3)-.2,E(3)+.4);const n=wi(3,'nine');vl(vcam(lerp(560,420,ss(k)),lerp(960,720,ss(k)),lerp(1.0,1.35,ss(k))),1,()=>{topo(t,{});
  // tent icon at the end of the trail
  poly([370,600,400,560,430,600],'#7a4a24');
  if(t>n-.15)pin(400,590,1.0,MN.red,'MILE 9');});
  if(t>wi(3,'tent')-.1)label('WHERE HIS TENT WAS',540,1500,{font:'900 50px MS',bg:'rgba(20,24,32,.92)',col:'#fff',h:84});}
// rules card on the back of the beacon
function s6(t){const rv=[5,6].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const c=ss(seg(t,wi(5,'didnt')-.1,wi(5,'didnt')+.7));rulesCard(t,{reveal:rv,circle:[c,0],s:lerp(.96,1.02,seg(t,T(4),E(6))),cy:860});}
// phone: my reply, their answer with a moving dot
function s7(t){const a=wi(7,'texted'),b=wi(7,'replied'),m=wi(7,'moving');fillAll('#06080d');glow(540,900,800,'rgba(80,140,255,1)',.10);
  vl(vcam(540,960,lerp(1.0,1.06,seg(t,T(7),E(7)))),1,()=>{phone(540,860,1.05,()=>{fillAll('#0b0f16');chatHeader('RESCUE CENTER','satellite · 24/7');
    let y=260;y=bubble(y,['SOS RECEIVED.'],{bg:'#5a1410',font:'900 48px MS'});
    if(t>a)y=bubble(y,["It's in my drawer.","I'm home."],{mine:true,w:420});
    if(t>b+.1){y=bubble(y,['We can see it','moving.'],{});
      // mini map
      fillRR(30,y,420,260,24,'#e9e2cc');ctx.save();rr(30,y,420,260,24);ctx.clip();ctx.translate(30,y);ctx.scale(.42,.42);ctx.translate(-150,-500);topo(t,{house:false});track(clamp(.08+seg(t,m,m+3)*.08),t);ctx.restore();}
    fillRR(20,1110,570,90,40,'#1a1f2a');text('Message…',60,1166,'600 34px MS','rgba(255,255,255,.35)','left');});});
  hit(t,m,.25,.25);}
// the track comes down the ridge, onto the highway, toward home
function s8(t){const k=ss(seg(t,T(8)+.2,E(8)+.3));vl(vcam(lerp(400,560,k),lerp(960,1150,k),1.08),1,()=>{topo(t,{title:false});pin(400,590,.7,'#7a4a24');track(lerp(.08,.45,k),t);});
  if(t>wi(8,'toward')-.1){label('TOWARD MY HOUSE',540,420,{font:'900 56px MS',bg:MN.red,col:'#fff',h:96});}
  label('NEW POINT · EVERY 10 MIN',540,300,{font:'800 34px PM',bg:'rgba(20,24,32,.9)',col:MN.green,h:64});}
// distance counter
function s9(t){const a=wi(9,'forty'),b=wi(9,'twelve'),c=wi(9,'three');const v=t<b-.1?40:t<c-.1?12:3;fillAll('#07090f');glow(540,800,800,'rgba(255,70,50,1)',.10+.06*(40-v)/37);
  fillRR(140,420,800,640,40,'#05070c');ctx.strokeStyle=MN.red;ctx.lineWidth=8;rr(140,420,800,640,40);ctx.stroke();
  text('DISTANCE TO HOME',540,510,'800 44px MS','rgba(255,255,255,.6)');text(String(v),540,880,'900 320px MS',v<20?MN.red:'#fff');text('MILES',540,1000,'900 60px MS',v<20?MN.red:'#fff');
  // the walking pace sign
  fillRR(260,1130,560,120,20,'rgba(20,24,32,.9)');text('PACE: 3 MPH',540,1210,'900 56px PM',MN.green);
  for(const at of[b,c])hit(t,at,.2,.3);
  if(t>wi(9,'impossible')-.1)label('IMPOSSIBLE',540,320,{font:'900 64px MS',bg:'rgba(255,201,60,.97)',col:'#14110a',h:100});}
// the beacon in the drawer types a message
function s10(t){const p=wi(10,'porch'),kd=wi(10,'kiddo'),d=wi(10,'dad');const k=seg(t,T(10)-.2,E(10)+.4);
  const msg='LEAVE THE PORCH LIGHT ON, KIDDO';const n=Math.floor(clamp(seg(t,wi(10,'leave')-.1,kd+.3))*msg.length);
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.08,k)),1,()=>{fillAll('#0a0c12');ctx.save();ctx.globalCompositeOperation='lighter';glow(540,900,800,'rgba(255,60,40,1)',.16);ctx.restore();
    // drawer edges
    fillRR(40,1500,1000,420,20,'#2a3342');fillRR(40,1460,1000,60,10,'#3a4352');
    beacon(540,1080,1.5,t,{on:1,screen:()=>{fillAll('#0d1a14');text('MSG · MILE 9',120,34,'700 22px PM','rgba(92,242,162,.7)');
      const s=msg.slice(0,n);const words=s.split(' ');let lines=[''];for(const w of words){if((lines[lines.length-1]+' '+w).length>12)lines.push(w);else lines[lines.length-1]=(lines[lines.length-1]+' '+w).trim();}
      lines.slice(0,4).forEach((l,i)=>text(l,120,66+i*30,'700 26px PM',MN.green));}});});
  if(t>d-.1){ctx.save();ctx.translate(800,1640);ctx.rotate(.04);fillRR(-180,-120,360,240,8,'#f3efe6');ctx.save();rr(-160,-100,320,170,4);ctx.clip();ctx.fillStyle='#7fb0d8';ctx.fillRect(-160,-100,320,170);dad({x:0,y:200,h:300,brow:'flat',mouth:'smile'});ctx.restore();text('DAD',0,100,'800 26px MS','#2a2a30');ctx.restore();}
  hit(t,p,.2,.15);}
// the front door: porch light on, a shape behind the frosted glass, three knocks
function s11(t){const kn=[E(11)+.05,E(11)+.5,E(11)+.95];let sh={x:0,y:0};for(const a of kn){if(t>a&&t<a+.18){const s=shakeAt(t,10*(1-seg(t,a,a+.18)));sh=s;}}
  const f=ss(seg(t,wi(11,'zero')-.1,wi(11,'zero')+.6));vl(vcam(540+sh.x,960+sh.y,lerp(1.0,1.1,seg(t,T(11),E(11)+1.2))),1,()=>{frontDoor(t,{porch:1,fig:f*.85,feet:f>.5});});
  if(t>wi(11,'zero')-.1){hit(t,wi(11,'zero'),.25,.3);}
  for(const a of kn)if(t>a)label('KNOCK',a===kn[0]?300:a===kn[1]?780:540,a===kn[2]?1420:1300,{font:'900 60px MS',bg:'rgba(255,255,255,.95)',col:'#14110a',h:96,a:1-seg(t,a+.6,a+1.2)});}
// last check-in: a photo of Dad with the rescue team
function s12(t){const u=wi(12,'us'),d=wi(12,'door');fillAll('#06080d');glow(540,900,800,'rgba(80,140,255,1)',.10);
  vl(vcam(540,960,lerp(1.0,1.05,seg(t,T(12),E(12)))),1,()=>{phone(540,860,1.05,()=>{fillAll('#0b0f16');chatHeader('RESCUE CENTER','satellite · 24/7');
    let y=230;y=bubble(y,['Our team reached','mile nine.'],{});
    if(t>wi(12,'dad')-.2)y=bubble(y,['Your dad is here,','with us.'],{bg:'#1d4a2c'});
    if(t>u-.1){// photo attachment
      fillRR(30,y,520,420,24,'#1b2230');ctx.save();rr(30,y,520,420,24);ctx.clip();ctx.translate(30,y);ridge(t,{tent:false});
      ctx.save();ctx.translate(0,0);ctx.scale(.5,.5);ctx.translate(0,-420);
      toon({x:240,y:1250,h:560,jacket:'#e85d1f',hat:'helm',hatCol:'#e8e8e8',tag:'RESCUE',brow:'flat',mouth:'flat'});
      dad({x:560,y:1250,h:580,brow:'flat',mouth:'smile',look:{x:0,y:0},jacket:'#c9c9d0'});
      toon({x:870,y:1250,h:560,jacket:'#e85d1f',hat:'helm',hatCol:'#e8e8e8',tag:'RESCUE',brow:'flat',mouth:'flat'});ctx.restore();ctx.restore();}});});
  if(t>u-.1)hit(t,u,.25,.25);
}
// final: me in the hall, the door behind me, porch light on, the shape in the glass
function s13(t){vl(vcam(540,980,lerp(1.0,1.08,seg(t,T(13),E(13)+3))),1,()=>{frontDoor(t,{porch:Math.sin(t*13)>-.7?1:0,fig:.9,feet:true});
  me({x:540,y:2150,h:1150,brow:'scared',mouth:'o',look:{x:0,y:.1}});});}
const SCENES={s1,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.66,s3:.72,s4:.82,s5:.80,s6:.86,s7:.84,s8:.80,s9:.72,s10:.17,s11:.80,s12:.80,s13:.10};
const END_AT=null;
function dist(t){if(t<T(8))return 40;if(t<wi(9,'twelve')-.1)return 40;if(t<wi(9,'three')-.1)return 12;if(t<wi(11,'zero')-.1)return 3;return 0;}
function hud(t){const sc=sceneAt(t).id;const d=dist(t);const tm=t<T(8)?'1:12 AM':t<T(10)?'1:58 AM':t<T(11)?'2:20 AM':'2:31 AM';
  const chips=[{k:'SOS',v:'ACTIVE',hot:true},{k:'DIST',v:d+' MI',hot:t>=T(8)},{k:'TIME',v:tm}];
  const tag={s1:'KITCHEN',s3:'HOLLOW RIDGE · 2022',s4:'CHECK-IN',s5:'COORDINATES',s6:'BACK OF THE BEACON',s7:'CHECK-IN',s8:'TRACKING',s9:'TRACKING',s10:'NEW MESSAGE',s11:'FRONT DOOR',s12:'LAST CHECK-IN',s13:'FRONT DOOR'}[sc];
  return{chips,tag,tagRed:true};}
