// ===================== Letters Home, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
// cold open: on the bridge; the ghost ship glowing red in the window; the screen asks
function s1(t){const k=seg(t,0,E(0)+.4),ml=wi(0,'carry');
  vl(vcam(540,lerp(1000,1060,k),lerp(1.0,1.08,k)),1,()=>{bridge(t,{flash:t>2.6&&t<2.75?.5:0,out:()=>ghostShip(660,640,.72,t,{glowK:1.3}),
    me:()=>me({x:190,y:1330,h:560,brow:'scared',mouth:'o',look:{x:.8,y:-.3}}),
    screen:()=>{aisScreen(t,{ghost:{x:560,y:200,a:1,label:'NO NAME'}});const a=1;if(a>0){ctx.save();ctx.globalAlpha=a;fillRR(60,330,680,180,16,'rgba(40,5,5,.92)');T2('MSG FROM: —',90,370,24,'#ff9a8a',{w:800,align:'left'});T2('WILL YOU CARRY',90,420,40,'#fff',{w:900,align:'left'});T2('OUR MAIL?',90,470,40,L.red,{w:900,align:'left'});ctx.restore();}}});});}
// a cargo ship rounding the Cape at night
function s2(t){const k=seg(t,T(1),E(1)+.5),fd=wi(1,'flying');
  vl(vcam(540,lerp(1000,960,k),lerp(1.1,1.0,k)),1,()=>{stormSky(1050,t);
    ctx.fillStyle='#0b0f18';ctx.beginPath();ctx.moveTo(-300,1060);ctx.lineTo(-100,880);ctx.lineTo(120,960);ctx.lineTo(260,1060);ctx.fill();circ(40,900,8,'#fff3c4');glow(40,900,120,'rgba(255,240,190,1)',.5);
    sea(1050,t);cargoShip(620,1350,.75,t);});
  chip('CAPE OF GOOD HOPE',540,330,{size:40,a:ap(t,wi(1,'cape')-.1),bg:'rgba(12,16,28,.92)'});chip('SOUTH AFRICA',540,410,{size:28,a:ap(t,wi(1,'cape')+.3),bg:'rgba(12,16,28,.7)'});
  popT('THE FLYING DUTCHMAN',540,1700,70,L.ghost,t,fd-.05);}
// the legend: the captain who swore; then his crew holding out letters
function s3(t){const k=seg(t,T(2),E(3)+.4),dd=wi(2,'doomsday'),lt=wi(3,'letters'),sh=T(3);
  vl(vcam(lerp(540,620,ss(seg(t,sh-.3,sh+1))),lerp(1000,1050,k),lerp(1.0,1.25,ss(seg(t,sh-.3,sh+1)))),1,()=>{stormSky(1150,t,{flash:t>dd&&t<dd+.15?.6:0});sea(1150,t);
    ghostShip(560,1250,1.1,t,{glowK:.8});
    if(t<sh){toon({x:300,y:1150,h:300,jacket:'#3a1a1a',hat:'cap',hatCol:'#1a0d0d',skin:'#d9a07c',beard:'#3a2a20',brow:'angry',mouth:'open',armR:[3.0,.1],look:{x:.6,y:-.6}});}
    ghostHand(780,1060,1.0,ap(t,wi(3,'begs')-.2,.6));});
  chip('LEGEND · 1600s',540,330,{size:36,bg:L.y,col:'#14110a',a:ap(t,T(2))});
  if(t<sh)popT('UNTIL DOOMSDAY',540,1640,80,L.y,t,dd-.05);else popT('LETTERS HOME',540,1640,90,L.y,t,lt-.05);}
// the bosun's rules, written in the log
function s4(t){if(t<T(5)-.05){const k=seg(t,T(4),E(4)+.4);
    vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.08,k)),1,()=>{bridge(t,{me:()=>{nkosi({x:720,y:1350,h:760,brow:'worried',mouth:'flat',look:{x:-.8,y:.3},armR:[.5,.9]});me({x:250,y:1330,h:700,brow:'flat',mouth:'flat',look:{x:.8,y:0}});},screen:()=>aisScreen(t,{})});});
    chip('BOSUN NKOSI',720,420,{size:36,a:ap(t,wi(4,'nkosi')-.1)});return;}
  const rv=[5,6,7].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(5),E(7));rulesCard(t,{reveal:rv,cy:lerp(800,770,k),s:lerp(.98,1.03,k)});}
// 4 a.m.: a contact with no name, nine knots into the wind
function s5(t){const k=seg(t,T(8),E(8)+.5),nn=wi(8,'no'),kn=wi(8,'nine');
  vl(vcam(540,lerp(1500,1490,k),lerp(1.3,1.36,k)),1,()=>{bridge(t,{screen:()=>aisScreen(t,{time:'04:00',wind:true,ships:[[180,140,'MSC ANNA'],[600,120,'TRITON V']],ghost:{x:lerp(520,420,seg(t,T(8),E(8)+1)),y:lerp(470,380,seg(t,T(8),E(8)+1)),a:ap(t,wi(8,'contact')-.1),label:t>kn?'NO NAME · 9 KN':'NO NAME'}})});});
  popT('NO NAME',540,500,110,L.red,t,nn-.05);if(t>wi(8,'straight'))chip('INTO THE WIND',540,640,{size:40,bg:L.red,a:ap(t,wi(8,'straight'))});}
// the message prints out
function s6(t){const k=seg(t,T(9),E(9)+.5),pr=wi(9,'printed'),wl=wi(9,'will');
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.06,k)),1,()=>{fillAll('#0b0f18');glow(540,700,700,'rgba(255,110,80,1)',.12);
    fillRR(170,560,740,240,30,'#2a303c');fillRR(210,760,660,30,10,'#0c0e14');
    const len=lerp(0,900,ss(seg(t,pr,E(9))));ctx.save();ctx.beginPath();ctx.rect(200,780,680,len);ctx.clip();fillRR(240,780,600,900,0,'#f1ecdf');
    for(let j=0;j<12;j++)line(270,820+j*60,810,820+j*60,2,'rgba(0,0,0,.06)');T2('NAVTEX · AIS MSG',280,830,26,'#6a6a72',{w:500,f:'PM',align:'left'});T2('FROM: [NO NAME]',280,880,28,'#2a2418',{w:500,f:'PM',align:'left'});
    const msg=['WILL YOU','CARRY OUR','LETTERS','HOME?'];msg.forEach((m,j)=>{const a=ap(t,wl+j*.25,.2);if(a>0)T2(m,280,980+j*95,72,j===3?'#a3261b':'#141414',{w:900,align:'left',a});});ctx.restore();});}
// the radio answers in my voice; Nkosi shouting no
function s7(t){const k=seg(t,T(10),E(10)+.4),an=wi(10,'answering'),mv=wi(10,'in'),ys=wi(10,'yes');const talk=t>an&&t<E(10);
  vl(vcam(540,lerp(1000,1040,k),lerp(1.0,1.1,k)),1,()=>{fillAll('#0a0e18');glow(540,1100,800,'rgba(92,242,162,1)',.06);
    me({x:330,y:1900,h:1300,brow:'scared',mouth:'flat',look:{x:.8,y:.3}});
    nkosi({x:880,y:1500,h:700,brow:'angry',mouth:t<wi(10,'but')?'open':'o',look:{x:-1,y:0},armL:[2.4,.3]});
    ctx.save();ctx.translate(700,1140);ctx.rotate(.1);fillRR(-130,-200,260,400,30,'#1b1e26');fillRR(-100,-160,200,130,14,'#0e2a1c');
    if(talk)waveform(0,-95,170,90,t,1,L.red,11);else T2('CH 16',0,-95,40,'#2f6b4a',{w:800});ctx.restore();
    if(talk)glow(700,1050,260,'rgba(255,77,61,1)',.35);});
  popT('IN MY VOICE',540,420,96,L.y,t,mv-.05);popT('"YES."',540,560,110,L.red,t,ys-.05);}
// dawn: the deck covered in wet envelopes
function s8(t){const k=seg(t,T(11),E(11)+.4),hd=wi(11,'hundreds'),ce=wi(11,'centuries');
  vl(vcam(540,lerp(1100,1000,k),lerp(1.2,1.0,k)),1,()=>{ctx.fillStyle=vgrad(-300,900,[[0,'#3a4660'],[1,'#c98a6a']]);ctx.fillRect(-300,-300,1680,1300);sea(820,t);
    fillRR(-300,1000,1680,1300,0,'#5b636e');for(let i=0;i<8;i++)line(-300,1000+i*130,1380,1000+i*130,4,'rgba(0,0,0,.25)');
    const R=rng(9);const n=Math.floor(lerp(10,90,ss(seg(t,T(11),hd+.3))));for(let i=0;i<n;i++){const x=R()*1200-60,y=1020+R()*900,r=R()*1-.5;envelope(x,y,.28+(y-1000)/2600,r,{wet:true,seal:R()<.3});}
    me({x:540,y:1500,h:560,brow:'scared',mouth:'o',look:{x:0,y:1}});});
  popT('HUNDREDS',540,420,120,L.y,t,hd-.05);const a=ap(t,ce-.2);if(a>0){chip('TO: ELSKE, 1652',300,560,{size:30,a,bg:'rgba(233,223,198,.95)',col:'#2a2418'});chip('TO: PIETER, 1701',780,640,{size:30,a,bg:'rgba(233,223,198,.95)',col:'#2a2418'});}}
// the one on top: addressed to me
function s9(t){const k=seg(t,T(12),E(12)+.4),tm=wi(12,'to');
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.12,k)),1,()=>{fillAll('#171b24');glow(540,960,700,'rgba(255,220,170,1)',.12);
    envelope(540,960,2.2,-.05,{wet:true,to:t>tm-.1?['TO: THE 3RD OFFICER','BRIDGE, MV CAPE ROSE','(ME)']:['TO: ……','……'],big:true});
    for(const s of[-1,1])fillRR(540+s*470-60,1180,120,220,50,'#e0ab88');});
  popT('TO ME',540,1500,120,L.red,t,tm-.05);}
// in my handwriting; postmarked tomorrow; from that ship
function s10(t){const k=seg(t,T(13),E(13)+.4),pm=wi(13,'tomorrow'),fr=wi(13,'sent');
  vl(vcam(540,lerp(960,940,k),lerp(1.05,1.12,k)),1,()=>{fillAll('#171b24');glow(540,960,700,'rgba(255,90,60,1)',.12);
    envelope(540,960,2.2,.04,{wet:true,to:['TO: ME','FROM: THE','FLYING DUTCHMAN'],stamp:t>pm-.1?['CAPE','TOMORROW']:null,big:true});});
  chip('MY HANDWRITING',540,520,{size:42,a:ap(t,wi(13,'handwriting')-.1),bg:L.y,col:'#14110a'});}
// the twist: me on the ghost ship's deck, writing letters by lantern
function s11(t){const k=seg(t,T(14),E(14)+.4),sg=wi(14,'signs'),wr=wi(14,'write');
  vl(vcam(540,lerp(1050,980,k),lerp(1.15,1.0,k)),1,()=>{stormSky(900,t);sea(900,t);ghostShip(540,1000,.8,t,{glowK:.9});
    ctx.fillStyle='#1a0d0d';ctx.fillRect(-300,1300,1680,900);glow(540,1450,500,'rgba(255,140,90,1)',.35);
    fillRR(260,1500,560,40,6,'#3a2216');fillRR(300,1540,30,300,4,'#2a170f');fillRR(750,1540,30,300,4,'#2a170f');
    me({x:540,y:1700,h:520,jacket:'#3a1a1a',brow:'flat',mouth:'flat',look:{x:0,y:1},armR:[2.2,.6],armL:[2.0,-.4]});
    for(let i=0;i<5;i++)envelope(380+i*70,1495-i*4,.22,-.1+i*.05,{});circ(760,1470,16,'#ffd28a');glow(760,1470,120,'rgba(255,200,120,1)',.6);});
  popT('SIGNED ON',540,420,110,L.y,t,sg-.05);if(t>wr-.1)chip('SOMEBODY HAS TO WRITE THEM',540,560,{size:34,a:ap(t,wr-.1),bg:L.red});}
// end: the bridge, the contact back on the screen, the envelope in my hand
function s12(t){const k=seg(t,T(15),TL.total);
  vl(vcam(540,lerp(1040,1000,k),lerp(1.0,1.06,k)),1,()=>{bridge(t,{out:()=>ghostShip(700,620,.45,t),
    me:()=>me({x:330,y:1320,h:720,brow:'worried',mouth:'frown',look:{x:.6,y:.3},held:(x,y,h)=>envelope(x+10,y-10,.35,-.3,{wet:true,seal:true})}),
    screen:()=>aisScreen(t,{ghost:{x:470,y:250,a:1,label:'WAITING'}})});});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12};
const FADES={};
const CAPY={s1:.58,s2:.8,s3:.8,s4:.88,s5:.86,s6:.14,s7:.62,s8:.9,s9:.86,s10:.86,s11:.86,s12:.2};
const END_AT=null;
function clockAt(t){const m=Math.floor(lerp(240,330,clamp((t-T(8))/(TL.total-T(8)))));return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0');}
function hud(t){const sc=sceneAt(t).id;const chips=[];
  chips.push({k:'TIME',v:t<T(8)?(sc==='s1'?'04:12':'03:40'):clockAt(t)});
  chips.push({k:'WIND',v:'NW 40 KN'});
  const named=sc==='s1'||t>=T(8);if(named)chips.push({k:'CONTACT',v:'NO NAME',hot:true});
  if(t>=T(11))chips.push({k:'LETTERS',v:String(t<wi(11,'hundreds')?Math.floor(lerp(10,300,seg(t,T(11),wi(11,'hundreds')))):312),hot:true});
  const tag={s1:'BRIDGE · 04:12',s2:'34°S · CAPE OF GOOD HOPE',s3:'LEGEND',s4:"NKOSI'S RULES",s5:'RULE 1',s6:'RULE 2',s7:'RULE 2',s8:'DAWN',s9:'RULE 3',s10:'RULE 3',s11:'THE CREW',s12:'IT\'S BACK'}[sc];
  return{chips,tag,tagRed:['s1','s5','s7','s12'].includes(sc)};}
