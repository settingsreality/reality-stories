// ===================== Low Tide, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(x.w.replace(/[^A-Za-z']/g,'').toLowerCase()===s.toLowerCase()){if(c===n)return x.start;c++;}}return W(i,.5);};
const vcam=(x,y,z)=>({x,y,z});
// cold open: wet footprints climbing the ladder to me
function s1(t){const k=ss(seg(t,0,E(0)+.6));vl(vcam(540,lerp(1000,920,k),lerp(1.0,1.12,k)),1,()=>ladderDown(t,{prints:1}));}
// the causeway goes under
function s2(t){const k=seg(t,T(1),E(1)+.5);vl(vcam(560,lerp(1250,1180,k),lerp(1.0,1.12,k)),1,()=>causeway(t,{tide:ss(seg(t,wi(1,'sea')-.5,E(1)))}));}
// the refuge box; I climb up
function s3(t){const k=seg(t,T(2),E(2)+.5);vl(vcam(540,lerp(1100,980,k),lerp(1.05,1.0,k)),1,()=>hutClose(t,{water:ss(k),me:true,climb:ss(seg(t,wi(2,'climbed')-.4,E(2)+.4))}));}
// a light walking along the pilgrim posts, under the water; it counts them, then turns to me
function s4(t){const a=seg(t,wi(3,'light')-.2,E(4)-1.6);const turn=ss(seg(t,wi(4,'turned')-.2,E(4)+.5));
  vl(vcam(560,lerp(1000,1060,seg(t,T(3),E(4))),lerp(1.0,1.08,seg(t,T(3),E(4)))),1,()=>window_(t,{lk:t<wi(3,'light')-.2?null:(turn>0?1+turn:a*.999)}));}
// no ripples
function s5(t){const k=seg(t,T(5)-.2,E(5)+.6);vl(vcam(540,lerp(1000,1060,k),lerp(1.0,1.1,k)),1,()=>stillWater(t,{k}));}
// the ladder creaks; holding the door
function s6(t){const c1=wi(6,'one'),c2=wi(6,'next');const knock=Math.max(1-Math.min(1,Math.abs(t-c1)/.25),1-Math.min(1,Math.abs(t-c2)/.25));
  const k=seg(t,T(6),E(7)+.5);vl(vcam(lerp(560,600,k),lerp(1000,940,k),lerp(1.0,1.15,k)),1,()=>inside(t,{knock,under:ss(seg(t,T(6),wi(6,'nothing'))),tremble:ss(seg(t,T(7),T(7)+1)),mouth:t>T(7)?'grit':'o'}));}
// dawn: the coastguard reads the ladder
function s7(t){const k=seg(t,T(8),E(9)+.4);vl(vcam(540,lerp(1150,800,ss(k)),lerp(1.0,1.15,k)),1,()=>dawnLadder(t,{brow:t>T(9)?'worried':'flat',mouth:t>wi(9,'none')?'o':'flat'}));}
// he looks past me, and backs away
function s8(t){const back=ss(seg(t,wi(10,'backed')-.2,E(10)+.4));vl(vcam(540,960,lerp(1.0,1.06,seg(t,T(10),E(10)))),1,()=>cgFace(t,{back}));}
// I haven't turned around
function s9(t){vl(vcam(540,lerp(1000,960,seg(t,T(11),E(11)+.5)),lerp(1.0,1.08,seg(t,T(11),E(11)+.5))),1,()=>behindMe(t,{glint:ss(seg(t,T(11)+.3,T(11)+.9))}));}
function s10(t){vl(vcam(540,940,1.1),1,()=>behindMe(t,{glint:1}));}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10};
const FADES={};
const CAPY={s7:.66};
function hud(t){const sc=sceneAt(t).id;const times={s1:'3:12 AM',s2:'11:31 PM',s3:'11:50 PM',s4:'12:04 AM',s5:'12:20 AM',s6:'12:26 AM',s7:'6:02 AM',s8:'6:03 AM',s9:'6:03 AM',s10:'6:03 AM'};
  const tide={s1:'2.1 M',s2:(lerp(0,.6,seg(t,T(1),E(1)))).toFixed(1)+' M',s3:(lerp(.6,1.2,seg(t,T(2),E(2)))).toFixed(1)+' M',s4:'1.8 M',s5:'2.0 M',s6:'2.0 M',s7:'0.4 M',s8:'0.4 M',s9:'0.4 M',s10:'0.4 M'}[sc];
  const hot=['s1','s5','s6','s9','s10'].includes(sc);
  return{chips:[{k:'TIME',v:times[sc]},{k:'TIDE',v:tide,hot},{k:'NEXT SAFE CROSSING',v:'5:40 AM'}],tag:sc==='s1'||sc==='s9'||sc==='s10'?'SOMETHING IS IN THE HUT':'HOLY ISLAND CAUSEWAY',tagRed:sc==='s1'||sc==='s9'||sc==='s10'};}
