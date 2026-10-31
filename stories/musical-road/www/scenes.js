// ===================== Musical Road, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z']/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
// the walker: one lit groove (a footprint of light) per step, from the far end to my door
const ST0=()=>T(10)+.25,STL=()=>wi(15,'note'),STEP=.72;
function steps(){const n=Math.max(4,Math.floor((STL()-ST0())/STEP));const a=[];for(let k=0;k<=n;k++)a.push({ts:ST0()+k*(STL()-ST0())/n,z:230*Math.pow(8/230,k/n),foot:k%2?1:-1});return a;}
let _ST=null;const S_=()=>_ST||(_ST=steps());
function litAt(t,keep=5){const out=[];for(const s of S_())if(t>=s.ts){const a=Math.exp(-(t-s.ts)*.9);out.push({z:s.z,a:clamp(a*1.2),foot:s.foot});}return out.slice(-keep);}
function walkerZ(t){let z=230;for(const s of S_())if(t>=s.ts)z=s.z;return z;}
// cold open: parked on the grooves, a footprint of light lights up ahead, notes rising, no car
function s1(t){const k=seg(t,0,E(0)+.6);const lit=[{z:16,a:.6+.4*ss(seg(t,.0,.4)),foot:-1},{z:12.5,a:ss(seg(t,wi(0,'nobody')-.2,wi(0,'nobody')+.1)),foot:1}];
  vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.1,k)),1,()=>roadPOV(t,{speed:0,warn:.7+.3*Math.sin(t*6),lights:.85,lit,notes:.9,notesZ:40,notesZ2:20,shake:.8}));}
// what a musical road is
function s2(t){const k=seg(t,T(1),E(1)+.5);vl(vcam(540,lerp(980,940,k),lerp(1.0,1.06,k)),1,()=>grooveDiagram(t,{lab:ss(seg(t,wi(1,'hum')-.3,wi(1,'hum')+.3))}));}
// Lancaster
function s3(t){const k=seg(t,T(2),E(2)+.5);vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.08,k)),1,()=>lancaster(t,{lab:ss(seg(t,T(2),T(2)+.5)),lab2:ss(seg(t,wi(2,'william')-.2,wi(2,'william')+.3)),lab3:ss(seg(t,wi(2,'badly')-.1,wi(2,'badly')+.3))}));}
// our road, me
function s4(t){const k=seg(t,T(3),E(3)+.5);vl(vcam(lerp(560,620,k),lerp(1000,1060,k),lerp(1.0,1.12,k)),1,()=>crewNight(t,{lab:ss(seg(t,wi(3,'night')-.2,wi(3,'night')+.3))}));}
// Ray
function s5(t){const k=seg(t,T(4),E(4)+.5);vl(vcam(lerp(520,480,k),lerp(1000,940,k),lerp(1.0,1.1,k)),1,()=>rayYard(t,{hold:ss(seg(t,wi(4,'taped')-.4,wi(4,'taped')+.3))}));}
// the card, rules appear as they're read
function s6(t){const rv=[5,6,7].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(5),E(7));rulesCard(t,{reveal:rv,cy:lerp(780,760,k),s:lerp(.98,1.03,k)});}
// driving at 55, a slow song nobody knows
function s7(t){const k=seg(t,T(8),E(8)+.6);vl(vcam(540,980,lerp(1.0,1.06,k)),1,()=>roadPOV(t,{drive:t*24.6,speed:55+Math.sin(t*2)*.4,sign:lerp(60,14,k),notes:.6,notesZ:30,notesZ2:12,shake:1.6}));
  staffOverlay(t,ss(seg(t,wi(8,'played')-.2,wi(8,'played')+.3)),{n:1+7*seg(t,wi(8,'played'),E(8)+.4)});}
// the engine dies on the grooves
function s8(t){const d=wi(9,'died');const k=seg(t,d,E(9));const fl=t<d?1:(t<d+.5?(Math.sin(t*60)>0?1:.1):.35);
  vl(vcam(540,lerp(980,1000,k),lerp(1.0,1.14,ss(k))),1,()=>roadPOV(t,{drive:24.6*(t-T(9))*(1-ss(k)*.9)+T(9)*24.6,speed:lerp(55,0,ss(k)),warn:t>d?.6+.4*Math.sin(t*7):0,lights:fl,dashOn:t>d?.3:1,shake:lerp(2,4,seg(t,d,d+.3))*(1-ss(seg(t,d+.4,E(9))))+.4}));}
// the music keeps going, one note at a time, far away
function s9(t){const k=seg(t,T(10),E(10)+.5);vl(vcam(540,lerp(900,880,k),lerp(1.1,1.5,ss(k))),1,()=>roadPOV(t,{speed:0,warn:.5,lights:.35,dashOn:.3,lit:litAt(t),shake:.5}));}
// coming toward the truck
function s10(t){const k=seg(t,T(11),E(11)+.5);vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.12,k)),1,()=>roadPOV(t,{speed:0,warn:.5,lights:.35,dashOn:.3,lit:litAt(t),shake:.6}));}
// rule two vs rule three
function s11(t){const c2=ss(seg(t,wi(12,'two'),wi(12,'two')+.7)),c3=ss(seg(t,wi(12,'three'),wi(12,'three')+.7));rulesCard(t,{reveal:[1,1,1],circle:[0,c2,c3],cy:lerp(700,660,seg(t,T(12),E(12))),s:.8});
  // the next step lighting up at the bottom of the frame
  const lit=litAt(t,1)[0];if(lit){ctx.save();ctx.globalCompositeOperation='lighter';glow(540,1700,500,`rgba(${MR.note},1)`,.3*lit.a);ctx.restore();}}
// Ray on the radio
function s12(t){const gx=lerp(250,800,seg(t,T(13),E(14)));if(t<T(14)-.1){const k=seg(t,T(13),E(13));vl(vcam(540,lerp(980,1030,k),lerp(1.0,1.06,k)),1,()=>meRadio(t,{radio:t>wi(13,'clicked')-.2?.5:0,glowX:gx,look:{x:.8,y:.7}}));return;}
  const k=seg(t,T(14),E(14)+.5);vl(vcam(lerp(620,780,ss(k)),lerp(1100,1500,ss(k)),lerp(1.05,1.6,ss(k))),1,()=>meRadio(t,{radio:1,glowX:gx,brow:'scared',mouth:'open',look:{x:1,y:.8}}));}
// the last note, right outside my door. I know the song.
function s13(t){const kn=wi(15,'knew');if(t<kn-.05){const k=seg(t,T(15),kn);const g=ss(seg(t,STL()-.1,STL()+.2));
    vl(vcam(540,lerp(960,900,k),lerp(1.0,1.12,k)),1,()=>doorView(t,{glow:g,feet:g,locked:true}));if(Math.abs(t-STL())<.15)flash(.25*(1-Math.abs(t-STL())/.15),`rgb(${MR.note})`);return;}
  const k=seg(t,kn,E(15)+.6);vl(vcam(540,lerp(980,940,k),lerp(1.1,1.0,ss(seg(t,kn,kn+.3)))),1,()=>meClose(t,{notes:ss(seg(t,wi(15,'hum')-.2,wi(15,'hum')+.3)),mouth:t>wi(15,'hum')?'grit':'o'}));
  flash(.45*(1-seg(t,kn,kn+.2)));}
// the question: lit footprints all around the truck
function s14(t){const ph=t-T(16);const lit=[{z:7.5,a:.7+.3*Math.sin(t*3),foot:-1},{z:9,a:.5,foot:1},{z:11,a:.35,foot:-1}];
  vl(vcam(540,960,1.12),1,()=>roadPOV(t,{speed:0,warn:.6,lights:.3+.3*(Math.sin(t*13)>-.5?1:0),dashOn:.3,lit,notes:.7,notesZ:14,notesZ2:8,shake:1}));}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14};
const FADES={};
const CAPY={s2:.78,s3:.44,s4:.30,s6:.71,s11:.62};
const END_AT=null;
function clock(t){const m=Math.floor(lerp(0,9,seg(t,T(8),TL.total)));return '2:'+String(40+m).padStart(2,'0')+' AM';}
function hud(t){const sc=sceneAt(t).id;const stopped=['s1','s9','s10','s11','s12','s13','s14'].includes(sc);
  let sp=55;if(stopped)sp=0;if(sc==='s8')sp=Math.round(lerp(55,0,ss(seg(t,wi(9,'died'),E(9)))));
  const chips=[];
  if(['s1','s7','s8','s9','s10','s12','s13','s14'].includes(sc))chips.push({k:'SPEED',v:sp+' MPH',hot:sp<50});
  chips.push({k:'TIME',v:sc==='s1'?'2:48 AM':(['s2','s3','s4','s5','s6'].includes(sc)?'—':clock(t))});
  if(['s9','s10','s11','s12','s13'].includes(sc))chips.push({k:'NOTE',v:Math.max(0,Math.round(walkerZ(t)-6))+' M AWAY',hot:true});
  if(sc==='s1')chips.push({k:'NOTE',v:'7 M AWAY',hot:true});
  const tag={s1:'MUSICAL ROAD',s2:'REAL: MUSICAL ROADS',s3:'LANCASTER, CA',s4:'COUNTY RD 9',s5:"RAY'S RULES",s6:"RAY'S RULES",s7:'MUSICAL ROAD · 55',s8:'ENGINE: OFF',s9:'SOMETHING ON THE GROOVES',s10:'SOMETHING ON THE GROOVES',s11:"RAY'S RULES",s12:'RADIO · CH 1',s13:'RIGHT OUTSIDE',s14:'SOMETHING ON THE GROOVES'}[sc];
  return{chips,tag,tagRed:stopped||sc==='s8'};}
