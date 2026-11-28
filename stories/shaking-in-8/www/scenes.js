// ===================== Shaking in 8, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
// a countdown driven by real seconds from t0 (8 -> 0)
const cd=(t,t0)=>Math.max(0,8-Math.floor(Math.max(0,t-t0)));
// cold open: me under the kitchen table, phone blazing red in my face, countdown
function s1(t){const k=seg(t,0,E(0)+.4),by=wi(0,'backyard');const sh=shakeAt(t,4+6*ap(t,by));
  vl(vcam(540+sh.x,lerp(1260,1220,k)+sh.y,lerp(1.25,1.4,k)),1,()=>{kitchen(t,{rattle:.6+.4*ap(t,by),phoneGlow:[430,1420,.45],
    tableMe:()=>me({x:420,y:1500,h:300,brow:'scared',mouth:'open',look:{x:.3,y:-.3},armR:[2.6,.4]}),
    });});
  phone(720,700,.78,t,{n:cd(t,.25),glow:.45,rot:.06});
  const a=ap(t,by-.05);if(a>0)chip('EPICENTER: YOUR BACKYARD',540,1180,{size:40,a,bg:'rgba(255,59,48,.96)'});}
// millions of phones on chargers: tiny seismometers
function s2(t){const k=seg(t,T(1),E(1)+.4),ts=wi(1,'tiny');
  vl(vcam(540,lerp(1050,980,k),lerp(1.15,1.0,k)),1,()=>{town(t,{t0:T(1)+.6});});
  chip('PHONES ON CHARGERS = SENSORS',540,1740,{size:34,a:ap(t,wi(1,'chargers')-.1)});
  popT('TINY SEISMOMETERS',540,1590,72,K.y,t,ts-.05);}
// first wave -> alert -> strong shaking
function s3(t){const k=seg(t,T(2),E(2));vl(vcam(540,lerp(1000,980,k),lerp(1.0,1.04,k)),1,()=>{waves(t,T(2)+.2);});
  popT('SECONDS OF WARNING',540,380,70,K.y,t,wi(2,'before')-.05);}
// grandpa's rules on the fridge
function s4(t){if(t<T(4)-.05){const k=seg(t,T(3),E(3)+.4);
    vl(vcam(lerp(600,200,k),lerp(1000,900,k),lerp(1.0,1.3,k)),1,()=>{kitchen(t,{tableMe:()=>{}});me({x:620,y:1560,h:620,brow:'flat',mouth:'flat',look:{x:-1,y:0}});});
    chip('GRANDPA\'S HOUSE',540,330,{size:40,a:ap(t,T(3)+.3)});return;}
  const rv=[4,5,6].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(4),E(6));rulesCard(t,{reveal:rv,cy:lerp(800,770,k),s:lerp(.98,1.03,k)});}
// 2:10, first alert; 8, 7 ... 0; nothing shook
function s5(t){const k=seg(t,T(7),E(7)+.5),al=wi(7,'first'),ns=wi(7,'nothing');
  const n=t<wi(7,'seven')?8:t<wi(7,'zero')?7:0;
  vl(vcam(540,lerp(980,940,k),lerp(1.0,1.06,k)),1,()=>{fillAll('#0b0f1c');kitchen(t,{phoneGlow:[540,1000,.25]});});
  phone(540,980,1.05,t,{n,flash:t>ns?.1:undefined,glow:.4});
  const a=ap(t,ns-.05);if(a>0){ctx.save();ctx.globalAlpha=a*.6;fillAll('#05060a');ctx.restore();popT('NOTHING SHOOK',540,1640,92,K.y,t,ns-.05);}}
// alerts every minute: epicenters walking toward the house
function s6(t){const k=seg(t,T(8),E(8)+.3),wk=wi(8,'walking');const H=[560,1300];
  const P=[[180,520],[260,690],[330,860],[400,1010],[470,1150]];const st=[T(8)+.1,wi(8,'another',1),wi(8,'minute'),wi(8,'line'),wk];
  const pts=P.map((p,i)=>[p[0],p[1],ap(t,st[i]-.05)]);
  vl(vcam(lerp(540,500,k),lerp(960,1050,k),lerp(1.0,1.05,k)),1,()=>{quakeMap(t,{pts,line:true,house:H,time:['2:11 AM','2:12 AM','2:13 AM','2:14 AM','2:15 AM'][Math.max(0,pts.filter(p=>p[2]>0).length-1)]});});
  if(ap(t,wk)>0){T2('FOOTSTEPS',540,560,96,K.red,{w:900,stroke:12,a:ap(t,wk)});}}
// under the table, the glasses ring
function s7(t){const k=seg(t,T(9),E(9)+.3),gl=wi(9,'glasses'),cl=wi(9,'closer');const sh=shakeAt(t,3+12*ap(t,cl));
  vl(vcam(lerp(400,330,k)+sh.x,lerp(1180,1100,k)+sh.y,lerp(1.25,1.45,k)),1,()=>{kitchen(t,{rattle:clamp(ap(t,gl-.2,.8)*.7+ap(t,cl)*.3),phoneGlow:[460,1440,.3],
    tableMe:()=>me({x:430,y:1500,h:300,brow:'scared',mouth:'grit',look:{x:-1,y:-.4},armR:[2.6,.4]})});});
  popT('CLOSER',540,1700,120,K.red,t,cl-.05);}
// still. a text from grandpa
function s8(t){const k=seg(t,T(10),E(10)+.3),gp=wi(10,'grandpa');
  vl(vcam(430,lerp(1300,1360,k),lerp(1.6,1.75,k)),1,()=>{kitchen(t,{phoneGlow:[470,1430,.15],tableMe:()=>me({x:430,y:1500,h:300,brow:'worried',mouth:'o',look:{x:.4,y:.6},armR:[2.6,.4]})});});
  const a=ap(t,gp-.2);if(a>0){ctx.save();ctx.globalAlpha=a;fillRR(140,300,800,170,36,'rgba(30,34,44,.96)');circ(230,385,48,'#6b7a90');T2('G',230,385,50,'#fff',{w:900});T2('Grandpa',310,350,40,'#fff',{w:900,align:'left'});T2('1 new message',310,415,30,'#aab3c6',{w:700,align:'left'});ctx.restore();}}
// the text, close
function s9(t){const k=seg(t,T(11),E(11)+.3);const m1=wi(11,'it'),m2=wi(11,'it',1),m3=wi(11,'whatever');
  vl(vcam(540,lerp(980,960,k),lerp(1.0,1.06,k)),1,()=>{fillAll('#07090f');glow(540,900,900,'rgba(120,150,255,1)',.08);});
  phone(540,960,1.6,t,{mode:'text',msgs:[{lines:['It doesn\'t feel','the ground.'],a:ap(t,m1-.1)},{lines:['It feels the','*PHONES.'],a:ap(t,m2-.1)},{lines:['Whatever shakes,','*it walks to.'],a:ap(t,m3-.1)}]});}
// my hand, shaking; the phone thinks I'm the earthquake
function s10(t){const k=seg(t,T(12),E(12)),sh=wi(12,'shaking');const amp=.4+.6*ap(t,sh-.2,.6);
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.05,k)),1,()=>{fillAll('#0a0d16');glow(540,1000,900,'rgba(255,59,48,1)',.1);});
  handPhone(t,{amp,n:'YOU',sub:'DETECTED',unit:'M 1.1 · 0 KM'});
  popT('I WAS THE QUAKE',540,330,74,K.y,t,wi(12,'earthquake')-.3);}
// new alert: epicenter my kitchen; the footsteps stop at the window
function s11(t){const k=seg(t,T(13),E(13)+.3),kt=wi(13,'kitchen'),stp=wi(13,'stopped');const H=[560,1300];
  const P=[[180,520],[260,690],[330,860],[400,1010],[470,1150],[540,1250]];const pts=P.map((p,i)=>[p[0],p[1],i<5?1:ap(t,stp-.1)]);pts.push([H[0],H[1],ap(t,kt-.1)]);
  vl(vcam(lerp(540,560,k),lerp(1050,1180,k),lerp(1.0,1.2,k)),1,()=>{quakeMap(t,{pts,line:true,house:H,you:false,time:'2:19 AM'});});
  const a=ap(t,kt-.05);if(a>0)chip('EPICENTER: KITCHEN',540,420,{size:44,a,bg:K.red});
  popT('STOPPED',540,1700,110,K.red,t,stp-.05);}
// the window: it is crouched outside, listening
function s12(t){const k=seg(t,T(14),E(14)+1),wh=wi(14,'where');
  vl(vcam(lerp(820,860,k),lerp(600,560,k),lerp(1.7,2.1,k)),1,()=>{kitchen(t,{win:(x,y,w,h)=>{listener(x+w/2+10,y+h*.5+60,.7,{tilt:-.45,hand:true,col:'#020307'});const a=ap(t,wh-.2,.4);if(a>0)glow(x+w/2,y+h/2,200,'rgba(255,59,48,1)',.25*a);}});});
  popT('WHERE I AM',540,1600,100,K.y,t,wh-.05);}
// end: me under the table, phone in my shaking hand, the shape at the window
function s13(t){const k=seg(t,T(15),TL.total);const sh=shakeAt(t,3);
  vl(vcam(540+sh.x*.4,lerp(1150,1120,k),lerp(1.05,1.12,k)),1,()=>{kitchen(t,{phoneGlow:[430,1430,.35],
    win:(x,y,w,h)=>listener(x+w/2+10,y+h*.5+60,.7,{tilt:-.45,hand:true,col:'#020307'}),
    tableMe:()=>me({x:420+sh.x,y:1500,h:300,brow:'scared',mouth:'grit',look:{x:.8,y:-.6},armR:[2.6,.4]})});});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.86,s2:.62,s3:.16,s4:.88,s5:.12,s6:.88,s7:.2,s8:.62,s9:.86,s10:.86,s11:.9,s12:.2,s13:.2};
const END_AT=null;
function clockAt(t){const m=Math.floor(lerp(130,140,clamp((t-T(7))/(TL.total-T(7)))));return Math.floor(m/60)+':'+String(m%60).padStart(2,'0')+' AM';}
function hud(t){const sc=sceneAt(t).id;const chips=[];
  chips.push({k:'TIME',v:t<T(7)?'2:19 AM':clockAt(t)});
  let al='—';let hot=false;if(sc==='s1'){al=cd(t,.25)+'s';hot=true;}else if(sc==='s5'){al=(t<wi(7,'seven')?8:t<wi(7,'zero')?7:0)+'s';hot=true;}else if(['s6','s7','s11','s12','s13'].includes(sc)){al='0s';hot=true;}
  chips.push({k:'SHAKING IN',v:al,hot});
  let d=null;if(sc==='s1'||sc==='s13'||sc==='s12')d='0 KM';else if(sc==='s5')d='9 KM';else if(sc==='s6'){const n=[9,7,5,3,1];const st=[T(8),wi(8,'another',1),wi(8,'minute'),wi(8,'line'),wi(8,'walking')];let j=0;st.forEach((s,i)=>{if(t>=s)j=i;});d=n[j]+' KM';}else if(sc==='s7')d='0.4 KM';else if(sc==='s11')d=t<wi(13,'kitchen')?'0.1 KM':'0 KM';
  if(d)chips.push({k:'EPICENTER',v:d,hot:true});
  const tag={s1:'2:19 AM',s2:'REAL',s3:'HOW IT WORKS',s4:"GRANDPA'S RULES",s5:'ALERT 1',s6:'ALERTS 2–6',s7:'RULE 1',s8:'STILL',s9:'GRANDPA',s10:'RULE 3',s11:'NEW ALERT',s12:'THE WINDOW',s13:'DON\'T MOVE'}[sc];
  return{chips,tag,tagRed:['s1','s11','s12'].includes(sc)};}
