// ===================== Lady Midday, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z']/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
// cold open: her in the wheat beside the road, the GPS asking
function s1(t){const k=ss(seg(t,0,E(0)+.5));vl(vcam(540,lerp(980,940,k),lerp(1.0,1.1,k)),1,()=>cabPOV(t,{fig:{d:.42,x:.6,glint:.8},gps:'q',q1:'WHY ARE YOU',q2:'WORKING AT NOON?',qk:ss(seg(t,wi(0,'question')-.3,wi(0,'question')+.2)),btn:true,shake:1}));}
// the farms, the heat
function s2(t){const k=seg(t,T(1)-.4,E(1)+.6);vl(vcam(540,lerp(1100,1020,k),lerp(1.0,1.15,k)),1,()=>farmWide(t,{van:lerp(.1,.45,k),label:ss(seg(t,wi(1,'hundred')-.2,wi(1,'hundred')+.3))}));}
// grandma and her rules
function s3(t){const k=seg(t,T(2),E(2)+.5);vl(vcam(lerp(560,520,k),lerp(1000,940,k),lerp(1.0,1.1,k)),1,()=>kitchen(t,{hold:ss(seg(t,wi(2,'write')-.4,wi(2,'write')+.3)),look:{x:.6,y:.3}}));}
// the card: rules appear as they're read
function s4(t){const rv=[3,4,5].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(3),E(5));rulesCard(t,{reveal:rv,cy:lerp(780,760,k),s:lerp(.98,1.03,k)});}
// the legend
function s5(t){const k=seg(t,T(6),E(6)+.7);vl(vcam(540,lerp(1100,960,k),lerp(1.0,1.12,k)),1,()=>legend(t,{l1:ss(seg(t,wi(6,'lady')-.2,wi(6,'lady')+.3)),l2:ss(seg(t,wi(6,'midday')+.2,wi(6,'midday')+.6)),l3:ss(seg(t,wi(6,'hottest')-.2,wi(6,'hottest')+.3))}));}
// dust devil crosses, GPS turns white
function s6(t){const k=seg(t,T(7),E(7)+.6);const wh=ss(seg(t,wi(7,'turned')-.1,wi(7,'turned')+.25));
  vl(vcam(540,lerp(980,1200,ss(seg(t,wi(7,'gps')-.4,E(7)))),lerp(1.0,1.35,ss(seg(t,wi(7,'gps')-.4,E(7))))),1,()=>cabPOV(t,{devil:ss(seg(t,T(7),T(7)+.6)),devilX:seg(t,T(7),wi(7,'and')),gps:wh>.5?'white':'map',shake:1.4}));
  flash(.5*clamp(1-Math.abs(t-wi(7,'turned')-.1)/.2),'#fff');}
// the GPS asks
function s7(t){const q=ss(seg(t,wi(8,'why')-.1,wi(8,'why')+.4));gpsClose(t,{mode:'q',q1:q>0?'WHY ARE YOU':'RECALCULATING…',q2:q>0?'WORKING AT NOON?':'',qk:1,btn:q>.5,refl:q,shake:.8});}
// stopped right next to the wheat
function s8(t){const k=seg(t,T(9),E(9)+.5);vl(vcam(540,lerp(980,1000,k),lerp(1.0,1.08,k)),1,()=>sideWindow(t,{fig:.15+.2*ss(seg(t,wi(9,'right')-.3,E(9))),brow:'scared',mouth:t>wi(9,'stopped')?'o':'flat'}));}
// every answer, one row closer
function s9(t){const n=Math.min(4,Math.floor(clamp((t-T(10))/(wi(10,'and')-T(10)))*5));const d=[.5,.42,.34,.27,.21][n];
  vl(vcam(540,980,lerp(1.0,1.08,seg(t,T(10),E(10)))),1,()=>cabPOV(t,{fig:{d,x:.95-n*.08,glint:.9},gps:'q',q1:['WHERE ARE','WHO ARE','DO YOU','WHAT DO YOU','WHY DON\'T'][n],q2:['YOU GOING?','YOU DELIVERING TO?','LIKE THE HEAT?','GROW HERE?','YOU REST?'][n],stopped:true,shake:.8,btn:true}));
  if(t>T(10))blackout(clamp(1-Math.abs(t-(T(10)+(wi(10,'and')-T(10))*(Math.max(1,n))/5))/.06)*.7*(n>0?1:0));}
// grandma's text
function s10(t){const k=seg(t,T(11),E(11)+.5);vl(vcam(540,lerp(900,860,k),lerp(1.0,1.1,k)),1,()=>phone(t,{msg:seg(t,wi(11,'text')-.2,wi(11,'text')+.3),clock:'12:20'}));}
// rule two vs rule three
function s11(t){const c2=ss(seg(t,wi(12,'two'),wi(12,'two')+.7)),c3=ss(seg(t,wi(12,'changing')-.2,wi(12,'changing')+.6));
  rulesCard(t,{reveal:[1,1,1],circle:[0,c2,c3],cy:620,s:.72});
  ctx.save();ctx.translate(540,1560);ctx.rotate(.06);fillRR(-260,-170,520,300,36,'#0d0d0f');fillRR(-240,-150,480,260,26,'#f2f2f4');circ(-170,-80,30,'#b8423a');text('G',-170,-78,'900 30px MS','#fff');
  text('Grandma',-120,-90,'800 28px MS','#1b1b1b','left');text('Stop answering.',-120,-30,'800 32px MS','#1b1b1b','left');text('Drive.',-120,20,'900 32px MS','#c0392b','left');ctx.restore();}
// grandma doesn't text: she's in the hospital, with heatstroke
function s12(t){const k=seg(t,T(13),E(13)+.6);vl(vcam(lerp(540,600,k),lerp(960,1100,ss(k)),lerp(1.0,1.15,k)),1,()=>hospital(t,{chart:ss(seg(t,wi(13,'heatstroke')-.2,wi(13,'heatstroke')+.3)),fig:t>wi(13,'hospital')}));}
// the question: she's at the window
function s13(t){vl(vcam(540,960,lerp(1.05,1.15,seg(t,T(14),TL.total))),1,()=>cabPOV(t,{fig:{d:.2,x:.5,glint:1,eyes:.9},gps:'q',q1:'WHO ARE YOU',q2:'TALKING TO?',stopped:true,shake:1.6,btn:true}));}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.45,s4:.71,s6:.45,s7:.61,s8:.42,s9:.45,s10:.68,s11:.5,s12:.4,s13:.45};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const after=['s1','s6','s7','s8','s9','s10','s11','s12','s13'].includes(sc);
  let tm={s1:'12:00 PM',s2:'11:38 AM',s3:'JUNE',s4:'JUNE',s5:'JUNE',s6:'12:00 PM',s7:'12:00 PM',s8:'12:01 PM',s10:'12:20 PM',s11:'12:20 PM',s12:'12:20 PM',s13:'12:21 PM'}[sc];
  if(sc==='s9')tm='12:'+String(Math.round(lerp(2,20,seg(t,T(10),wi(10,'twenty'))))).padStart(2,'0')+' PM';
  const chips=[{k:'TIME',v:tm,hot:after},{k:'TEMP',v:'104°F',hot:after}];
  if(['s1','s2','s6'].includes(sc))chips.push({k:'STOPS LEFT',v:'9'});
  if(['s8','s9','s13'].includes(sc)){const rows=sc==='s9'?5-Math.min(4,Math.floor(clamp((t-T(10))/(wi(10,'and')-T(10)))*5)):sc==='s8'?6:1;chips.push({k:'ROWS AWAY',v:String(rows),hot:true});}
  const tag={s1:'ROUTE 9 · FARM ROADS',s2:'ROUTE 9 · FARM ROADS',s3:"GRANDMA'S RULES",s4:"GRANDMA'S RULES",s5:'LADY MIDDAY',s6:'12:00',s7:'GPS',s8:'VAN: STOPPED',s9:'VAN: STOPPED',s10:'NEW MESSAGE',s11:"GRANDMA'S RULES",s12:'COUNTY HOSPITAL',s13:'VAN: STOPPED'}[sc];
  return{chips,tag,tagRed:after};}
