// ===================== Night Groomer, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const WT=(i,j)=>{const w=TL.lines[i].words;return w&&w[j]?w[j].start:W(i,j/Math.max(1,TL.lines[i].text.split(' ').length));};
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z']/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
// cold open: a skier standing in the headlights, close, perfectly still
function s1(t){const k=ss(seg(t,0,E(0)+.5));vl(vcam(540,lerp(980,940,k),lerp(1.0,1.1,k)),1,()=>cabPOV(t,{figs:[{d:lerp(.42,.36,k),x:.08,glint:.55+.45*ss(seg(t,wi(0,'six'),wi(0,'six')+.3))}],shake:1.2}));}
// the mountain at night, the cat crawling up
function s2(t){const k=seg(t,T(1)-.4,E(1)+.6);vl(vcam(lerp(540,470,k),lerp(1060,1020,k),lerp(1.0,1.18,k)),1,()=>mountainWide(t,{cat:lerp(.2,.45,k),label:ss(seg(t,W(1,.4),W(1,.6)))}));}
// Walt, the rules
function s3(t){const k=seg(t,T(2),E(2)+.5);vl(vcam(lerp(560,520,k),lerp(1000,940,k),lerp(1.0,1.1,k)),1,()=>garage(t,{hold:ss(seg(t,wi(2,'taped')-.4,wi(2,'taped')+.3)),look:{x:.6,y:.3}}));}
// the card: rules appear as they're read
function s4(t){const rv=[3,4,5].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(3),E(5));
  rulesCard(t,{reveal:rv,cy:lerp(780,760,k),s:lerp(.98,1.03,k)});}
// the slope, the cable, the anchor
function s6x(){}
function s5(t){const k=seg(t,T(6),E(6)+.7);vl(vcam(lerp(500,560,k),lerp(1100,1000,k),lerp(1.05,.98,k)),1,()=>slopeDiagram(t,{cat:.47,cable:ss(seg(t,wi(6,'cable')-.6,wi(6,'cable')+.4)),pulse:t>wi(6,'cable'),labels:ss(seg(t,wi(6,'anchored')-.3,wi(6,'anchored')+.2))}));}
// the first one; then another, closer to the anchor
function s6(t){if(t<T(8)-.05){const k=seg(t,T(7),E(7)+.6);const a=ss(seg(t,wi(7,'first')-.2,wi(7,'first')+.2));
    vl(vcam(540,980,lerp(1.0,1.06,k)),1,()=>cabPOV(t,{crest:620,anchor:true,cable:.8,figs:[{d:lerp(.8,.74,k),x:.55,a}],shake:1.4}));return;}
  const k=seg(t,T(8),E(8)+.5);const n=1+Math.floor(clamp((t-T(8))/(E(8)-T(8)),0,.999)*3);
  const F=[{d:.74,x:.9},{d:.64,x:-.85},{d:.53,x:.5},{d:.44,x:-.3}].slice(0,n+1);
  vl(vcam(540,980,lerp(1.04,1.1,k)),1,()=>cabPOV(t,{crest:620,anchor:true,cable:.8,figs:F,shake:1.4}));
  if(t-T(8)>0)blackout(dip(t,T(8)+(E(8)-T(8))*(n/3),.06)*.8);}
function dip(t,at,h=.18){return clamp(1-Math.abs(t-at)/h);}
// the winch reels in by itself
function s7(t){winchDrum(t,{spin:lerp(1,6,ss(seg(t,T(9),E(9)))),shake:lerp(3,8,seg(t,T(9),E(9)+.6))});}
// dragged up the slope toward all of them, holding the cable
function s8(t){const k=seg(t,T(10),E(10)+.6);vl(vcam(540,lerp(960,880,k),lerp(1.0,1.25,ss(k))),1,()=>cabPOV(t,{crest:lerp(700,780,k),crowdH:lerp(120,170,k),cable:1,taut:true,crowd:ss(seg(t,wi(10,'all')-.4,wi(10,'all')+.4)),pull:1,shake:6,glint:.8}));}
// the radio says my name; Walt's voice
function s9(t){if(t<T(12)-.1){const k=seg(t,T(11),E(11));vl(vcam(540,lerp(980,1040,k),lerp(1.0,1.06,k)),1,()=>meRadio(t,{radio:t>wi(11,'crackled')-.2?.5:0,brow:'worried',mouth:t>wi(11,'name')?'o':'flat',look:{x:.8,y:.7},back:true}));return;}
  const k=seg(t,T(12),E(12)+.5);vl(vcam(lerp(620,780,ss(k)),lerp(1100,1500,ss(k)),lerp(1.05,1.6,ss(k))),1,()=>meRadio(t,{radio:1,brow:'scared',mouth:'open',look:{x:1,y:.8}}));}
// rule two vs rule three, and the release lever
function s10(t){const c2=ss(seg(t,wi(13,'two'),wi(13,'two')+.7)),c3=ss(seg(t,wi(13,'three'),wi(13,'three')+.7));
  rulesCard(t,{reveal:[1,1,1],circle:[0,c2,c3],cy:620,s:.72});lever(t,{y:1520,hand:ss(seg(t,T(13),E(13))),shake:1});}
// their jackets... then mine
function s11(t){const at=wi(14,'same');if(t<at-.05){const k=seg(t,T(14),at);vl(vcam(540,lerp(1050,980,k),lerp(1.0,1.12,k)),1,()=>jackets(t));return;}
  const k=seg(t,at,E(14)+1);vl(vcam(540,lerp(1000,960,k),lerp(1.12,1.0,ss(seg(t,at,at+.25)))),1,()=>myTag(t));flash(.5*(1-seg(t,at,at+.2)));}
// the question
function s12(t){vl(vcam(540,940,1.12),1,()=>cabPOV(t,{crest:720,cable:1,taut:true,crowd:1,crowdH:180,figs:[{d:.42,x:-.7},{d:.38,x:.75},{d:.34,x:.05}],shake:3,lights:.6+.4*(Math.sin(t*17)>-.6?1:0)}));}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12};
const FADES={};
const CAPY={s4:.71,s7:.7,s10:.53,s11:.66};
const END_AT=null;
const HUDT=[[0,'2:14 AM'],[5.0,'12:00 AM'],[10,'11:52 PM'],[28,'1:40 AM'],[35,'2:00 AM'],[43,'2:31 AM'],[47,'2:44 AM'],[51,'2:45 AM'],[56,'2:46 AM'],[62,'2:46 AM'],[67,'2:47 AM']];
function hud(t){let tm=HUDT[0][1];for(const[a,v]of HUDT)if(t>=a)tm=v;const sc=sceneAt(t).id;
  const reel=['s7','s8','s12'].includes(sc)||(sc==='s11');
  let cable=null;if(['s5','s6'].includes(sc))cable='1,200 M';if(sc==='s7')cable=Math.round(lerp(640,520,seg(t,T(9),E(9))))+' M';if(sc==='s8')cable=Math.round(lerp(510,240,seg(t,T(10),E(10))))+' M';
  if(['s9','s10'].includes(sc))cable=Math.round(lerp(230,120,seg(t,T(11),E(13))))+' M';if(['s11','s12'].includes(sc))cable=Math.round(lerp(110,40,seg(t,T(14),TL.total)))+' M';
  const chips=[{k:'NIGHT',v:'1'},{k:'TIME',v:tm,hot:reel}];if(cable)chips.push({k:'CABLE OUT',v:cable,hot:reel});
  const tag={s1:"WIDOW'S RUN",s2:'NIGHT GROOMER',s3:"WALT'S RULES",s4:"WALT'S RULES",s5:"WIDOW'S RUN",s6:"WIDOW'S RUN",s7:'WINCH: REELING IN',s8:'WINCH: REELING IN',s9:'RADIO · CH 2',s10:"WALT'S RULES",s11:'WINCH: REELING IN',s12:'WINCH: REELING IN'}[sc];
  return{chips,tag,tagRed:reel};}
