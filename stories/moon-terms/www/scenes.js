// ===================== Updated Terms, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const HX=[180,540,900];
const stare=(i)=>(x,y,h)=>neighbor(x,y,h,i,{brow:'flat',mouth:'flat',look:{x:0,y:.2}});
// s1 cold open: every neighbor staring out of their window at me; my phone says DECLINED
function s1(t){const k=seg(t,0,E(0));
  vl(vcam(540,lerp(880,860,k),lerp(1.14,1.2,k)),1,()=>{nightSky(1100);moon(820,330,110,t);
    HX.forEach((x,i)=>house(x,1150,320,440,{col:['#2a3550','#352c48','#2c3f45'][i],moon:.6,lit:.9,fig:stare(i)}));street(1150,1480);
    ctx.fillStyle='#0a0d14';ctx.fillRect(-300,1480,1680,800);});
  vl(vcam(540,960,1),.5,()=>{phone(540,1640,.6,()=>{ctx.fillStyle='#1a0c10';ctx.fillRect(0,0,400,820);T2('DECLINED',200,200,56,'#ff5a48',{w:900});T2('1',200,360,180,'#fff',{w:900});T2('OF 8,000,000,000',200,480,30,'rgba(255,255,255,.7)',{w:800});},{rot:-.04});});}
// s2: 11:58, the same pop-up on every phone
function s2(t){const k=seg(t,T(1),E(1)),up=wi(1,'moon');const a=ap(t,wi(1,'popup')-.2);
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{ctx.fillStyle=vgrad(0,1920,[[0,'#060912'],[1,'#121a30']]);ctx.fillRect(-300,-300,1680,2520);
    phone(540,1060,1.55,()=>{ctx.fillStyle=vgrad(0,820,[[0,'#16224a'],[1,'#3a2f5a']]);ctx.fillRect(0,0,400,820);T2('11:58',200,130,96,'#fff',{w:700});T2('TUESDAY',200,200,24,'rgba(255,255,255,.7)',{w:800});
      if(a>0){ctx.save();ctx.globalAlpha=a;popup('The Moon has\nupdated its Terms','Accept to keep receiving\nmoonlight.','Accept','Decline',{h:400});ctx.restore();}});});}
// s3: everyone taps Accept; then the terms card, clause by clause
function s3(t){const ev=wi(2,'everyone'),c1=wi(3,'one'),c4=wi(3,'four'),c9=wi(4,'nine'),hp=wi(4,'help');
  if(t<T(3)-.05){const k=seg(t,T(2),E(2));vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{ctx.fillStyle=vgrad(0,1920,[[0,'#060912'],[1,'#121a30']]);ctx.fillRect(-300,-300,1680,2520);
      for(let r=0;r<3;r++)for(let c=0;c<3;c++){const i=r*3+c;const on=t>ev+i*.18;phone(220+c*320,560+r*520,.5,()=>{ctx.fillStyle='#1b2442';ctx.fillRect(0,0,400,820);popup('Updated Terms','',' Accept','Decline',{h:300,hl:on?1:0});},{rot:(hash(i)-.5)*.12});}
      });const n=Math.floor(Math.max(0,(t-ev))*1.9e9);if(t>ev)chip('ACCEPTED: '+Math.min(7999999999,n).toLocaleString('en-US'),540,1790,{size:44,bg:M.grn});return;}
  const k=seg(t,T(3),E(4));
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.03,k)),1,()=>{ctx.fillStyle=vgrad(0,1920,[[0,'#060912'],[1,'#121a30']]);ctx.fillRect(-300,-300,1680,2520);
    termsCard(540,250,940,[{n:'CLAUSE 1',txt:'Moonlight is licensed,\nnot sold.',a:ap(t,c1-.15)},{n:'CLAUSE 4',txt:'Tides may change\nwithout notice.',a:ap(t,c4-.15)},{n:'CLAUSE 9',txt:'Users who accept help Support\nfind users who haven\'t.',a:ap(t,c9-.15),hot:t>hp-.1,hotCol:'rgba(224,54,42,.35)'}]);
    me2({x:540,y:2150,h:760,brow:t>hp?'worried':'flat',mouth:t>hp?'o':'flat',look:{x:0,y:-1}});});}
// s4: I tap Decline: one out of eight billion
function s4(t){const k=seg(t,T(5),E(5)),dc=wi(5,'decline'),on=wi(5,'one');
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{ctx.fillStyle=vgrad(0,1920,[[0,'#060912'],[1,'#121a30']]);ctx.fillRect(-300,-300,1680,2520);
    phone(540,880,1.3,()=>{ctx.fillStyle='#1b2442';ctx.fillRect(0,0,400,820);popup('The Moon has\nupdated its Terms','Accept to keep receiving\nmoonlight.','Accept','Decline',{h:400,hl:t>dc+.2?2:0});
      if(t>on-.2){T2('DECLINED:',200,700,28,'rgba(255,255,255,.75)',{w:800});T2('1',200,760,64,'#ff5a48',{w:900});}});});
  popT('1',300,1650,200,'#ff5a48',t,on-.1);popT('8,000,000,000',700,1650,64,M.grn,t,wi(5,'eight')-.1);T2('DECLINED',300,1800,36,M.ink,{w:900,a:ap(t,on)});T2('ACCEPTED',700,1800,36,M.ink,{w:900,a:ap(t,wi(5,'eight'))});}
// row of houses, mine in the middle
function row(t,o={}){nightSky(1250);moon(800,430,o.mr||100,t,{face:o.face||0});
  HX.forEach((x,i)=>{const mine=i===1;house(x,1250,290,370,{col:['#2a3550','#30384a','#2c3f45'][i],moon:mine?0:(o.moonA??0),dark:mine&&o.dark,lit:mine?.9:.8,door:mine?0:(o.door||0),
    fig:mine?(o.dark?(x,y,h)=>{glow(x,y-h*.75,90,'rgba(140,170,255,1)',.5);me2({x,y,h,brow:'worried',mouth:'o',look:{x:0,y:-1}});}:null):stare(i)});
  });
  street(1250,1620);ctx.fillStyle='#0b0e16';ctx.fillRect(-300,1620,1680,700);}
function moonBeams(a){if(a<=0)return;for(const x of[180,900]){const ang=Math.atan2(x-540,-(250-1000));ctx.save();ctx.globalCompositeOperation='lighter';beam(800,430,Math.PI+Math.atan2(800-x,1000-430),1000,190,.22*a,'170,195,255');ctx.restore();}}
// s5: midnight: moonlight on every house except mine
function s5(t){const k=seg(t,T(6),E(6)),ex=wi(6,'except'),mn=wi(6,'mine',1);const ma=ap(t,T(6)+.4,1);
  vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.05,k)),1,()=>{row(t,{moonA:ma,dark:t>mn-.1});moonBeams(ma);
    if(t>ex-.1){ctx.save();ctx.globalAlpha=.55*ap(t,ex-.1);ctx.fillStyle='#000';ctx.beginPath();ctx.moveTo(540-170,1250-370-160);ctx.lineTo(540+170,1250-370-160);ctx.lineTo(540+170,1250);ctx.lineTo(540-170,1250);ctx.fill();ctx.restore();}});
  chip('EXCEPT MINE',540,1460,{size:46,a:ap(t,ex),bg:'rgba(224,54,42,.96)'});}
// s6: the tide comes up my street and stops one step from my door
function s6(t){const k=seg(t,T(7),E(7)),us=wi(7,'up',1),st=wi(7,'stopped');const wy=lerp(1950,1282,ss(seg(t,us-.6,st)));
  vl(vcam(540,lerp(1000,1060,k),lerp(1.0,1.08,k)),1,()=>{row(t,{moonA:1,dark:true});moonBeams(.8);
    ctx.fillStyle=vgrad(wy,1950,[[0,'rgba(60,110,170,.95)'],[1,'rgba(10,30,60,.98)']]);ctx.fillRect(-300,wy,1680,2200-wy);
    for(let i=0;i<8;i++){const y=wy+20+i*60;line(-300,y+Math.sin(t*2+i)*6,1380,y+Math.sin(t*2+i+1)*6,3,'rgba(190,215,255,.25)');}
    ell(540,wy+120,60,300,0,'rgba(220,230,255,.18)');
    if(t>st){ctx.save();ctx.globalAlpha=ap(t,st);ctx.strokeStyle=M.y;ctx.lineWidth=6;ctx.setLineDash([12,10]);line(500,1252,500,1282,0,'#000');ctx.beginPath();ctx.moveTo(420,1266);ctx.lineTo(760,1266);ctx.stroke();ctx.setLineDash([]);ctx.restore();}});
  chip('ONE STEP FROM MY DOOR',540,1560,{size:44,a:ap(t,st),bg:M.y,col:'#14110a'});}
// s7: "We noticed you haven't accepted." Remind me later. The Moon gets bigger.
function roomWindow(t,mr,o={}){ctx.fillStyle='#07090f';ctx.fillRect(-300,-300,1680,2520);ctx.save();rr(160,180,760,980,20);ctx.clip();nightSky(1200);moon(540,o.my||620,mr,t,{face:o.face||0,smile:o.smile||0});ctx.restore();
  ctx.strokeStyle='#1d2230';ctx.lineWidth=36;rr(160,180,760,980,20);ctx.stroke();line(540,180,540,1160,22,'#1d2230');line(160,670,920,670,22,'#1d2230');}
function s7(t){const k=seg(t,T(8),E(8)),bz=wi(8,'buzzed'),rm=wi(8,'remind'),bg=wi(8,'bigger');const mr=t<bg?90:lerp(90,150,ss(seg(t,bg-.1,bg+.6)));
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.04,k)),1,()=>{roomWindow(t,mr);
    const sh=t>bz&&t<bz+.6?Math.sin(t*90)*8:0;phone(540+sh,1450,.95,()=>{ctx.fillStyle='#1b2442';ctx.fillRect(0,0,400,820);popup('We noticed you\nhaven\'t accepted.','',' Accept','Later',{h:300,hl:t>rm+.2?2:0,b2col:'#5b6b8a'});},{rot:.03});});}
// s8: every "later" brings it closer until it fills the window
function s8(t){const k=seg(t,T(9),E(9)),tw=wi(9,'two'),ff=wi(9,'fifty'),wh=wi(9,'whole');
  const mr=t<tw?150:t<ff?lerp(150,230,ap(t,tw,.5)):t<wh?lerp(230,380,ap(t,ff,.5)):lerp(380,560,ap(t,wh,.8));
  vl(vcam(540,lerp(820,760,k),lerp(1.0,1.12,k)),1,()=>{roomWindow(t,mr,{my:640});});
  popT('200,000 km',540,1400,96,M.y,t,tw-.1,{a:t<ff?1:0});popT('50,000 km',540,1400,110,'#ff9a3c',t,ff-.1,{a:t<wh?1:0});}
// s9: every door opens; the neighbors walk to my house
function s9(t){const k=seg(t,T(10),E(10)),op=wi(10,'opened'),wk=wi(10,'walked'),cn=wi(10,'nine');const d=ap(t,op-.1,.4),wp=ss(seg(t,wk-.3,E(10)+.6));
  vl(vcam(540,lerp(1000,1000,k),lerp(1.0,1.06,k)),1,()=>{row(t,{moonA:1,dark:true,door:d});moonBeams(.8);
    if(t>op){for(let i=0;i<6;i++){const fromL=i<3;const sx=(fromL?180:900)+52+(i%3)*28,ex=540+(fromL?-120:120)-(i%3)*(fromL?50:-50);const x=lerp(sx,ex,wp),y=1290+(i%3)*90+wp*60;
      neighbor(x,y,320,i,{step:Math.sin(t*6+i)*wp,look:{x:fromL?.6:-.6,y:0},face:fromL?.4:-.4});}}});
  chip('CLAUSE 9',540,1760,{size:52,a:ap(t,cn-.1),bg:'rgba(224,54,42,.96)'});}
// s10: the last clause, the one nobody reads
function s10(t){const k=seg(t,T(11),E(11)),c14=wi(11,'fourteen'),bc=wi(11,'become');const sc=0;
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.04,k)),1,()=>{ctx.fillStyle=vgrad(0,1920,[[0,'#060912'],[1,'#121a30']]);ctx.fillRect(-300,-300,1680,2520);
    me2({x:540,y:2150,h:760,brow:'scared',mouth:'o',look:{x:0,y:-1}});termsCard(540,330+sc,940,[{n:'CLAUSE 12',txt:'Craters are not\nrefundable.'},{n:'CLAUSE 13',txt:'"Later" means\nsooner.'},{n:'CLAUSE 14',txt:'Users who decline\nbecome the new Moon.',a:ap(t,c14-.2),hot:t>bc-.1,hotCol:'rgba(224,54,42,.4)'}],{h:740});});
  popT('THE NEW MOON',540,1500,110,'#ff5a48',t,wi(11,'moon')-.1);}
// s11: the last one who declined, up there for 4.5 billion years
function s11(t){const k=seg(t,T(12),E(12)),ps=wi(12,'person'),fr=wi(12,'four'),cd=wi(12,'come');const f=ap(t,ps,1.5);
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.08,k)),1,()=>{nightSky(1920);const dy=t>cd?ss(seg(t,cd,cd+1.2))*90:0;moon(540,900+dy,400,t,{face:f,smile:t>cd?ap(t,cd,.8):0});});
  popT('4,500,000,000 YEARS',540,1500,72,M.y,t,fr-.1);}
// s12: it's at my window, smiling
function s12(t){const k=seg(t,T(13),TL.total);
  vl(vcam(540,lerp(820,800,k),lerp(1.12,1.18,k)),1,()=>{roomWindow(t,560,{my:660,face:1,smile:1});});
  me2({x:540,y:1990,h:700,brow:'scared',mouth:'o',look:{x:0,y:-1}});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12};
const FADES={};
const CAPY={s1:.6,s2:.13,s3:.55,s4:.13,s5:.72,s6:.3,s7:.52,s8:.13,s9:.3,s10:.64,s11:.13,s12:.13};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;
  const time={s1:'12:31 AM',s2:'11:58 PM',s3:'11:59 PM',s4:'11:59 PM',s5:'12:00 AM',s6:'12:07 AM',s7:'12:12 AM',s8:'12:20 AM',s9:'12:31 AM',s10:'12:33 AM',s11:'12:34 AM',s12:'12:34 AM'}[sc];
  let d='384,400 km';if(sc==='s7'&&t>wi(8,'bigger'))d='300,000 km';if(sc==='s8')d=t<wi(9,'two')?'300,000 km':t<wi(9,'fifty')?'200,000 km':t<wi(9,'whole')?'50,000 km':'12,000 km';
  if(['s9','s10','s11'].includes(sc))d='9,000 km';if(sc==='s12')d='AT MY WINDOW';if(sc==='s1')d='9,000 km';
  const hot=['s1','s8','s9','s10','s11','s12'].includes(sc)||(sc==='s7'&&t>wi(8,'bigger'));
  const chips=[{k:'TIME',v:time},{k:'DECLINED',v:sc==='s2'||sc==='s3'||(sc==='s4'&&t<wi(5,'decline'))?'0':'1',hot:!['s2','s3'].includes(sc)},{k:'MOON',v:d,hot}];
  const tag={s3:'TERMS OF THE MOON',s10:'CLAUSE 14',s9:'CLAUSE 9'}[sc]||'UPDATED TERMS';
  return{chips,tag,tagRed:['s9','s10','s11','s12','s1'].includes(sc)};}
