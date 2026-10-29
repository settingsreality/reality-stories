// ===================== Weather Balloon, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s)=>{const w=TL.lines[i].words||[];const k=w.findIndex(x=>x.w.replace(/[^A-Za-z'\-]/g,'').toLowerCase()===s.toLowerCase());return k<0?W(i,.5):w[k].start;};
const vcam=(x,y,z)=>({x,y,z});
// cold open: the monitor, 98.6 in red, my face in the glass
function s1(t){const k=ss(seg(t,0,E(0)+.6));const hot=t>wi(0,'ninety-eight')-.1;
  vl(vcam(540,lerp(1000,960,k),lerp(1.08,1.0,k)),1,()=>monitor(t,{mode:'temp',alt:58112,hot,face:1,clock:'7:02 PM',shake:hot?2:.5}));
  if(hot)flash(.35*(1-seg(t,wi(0,'ninety-eight')-.1,wi(0,'ninety-eight')+.25)),'#ff4d3d');}
// the plains, the 6 p.m. launch
function s2(t){const k=seg(t,T(1),E(1)+.6);const rel=ss(seg(t,wi(1,'launch'),wi(1,'launch')+3.2));
  vl(vcam(lerp(560,520,k),lerp(1080,980,k),lerp(1.05,1.15,k)),1,()=>plains(t,{rel,label:ss(seg(t,wi(1,'six')-.2,wi(1,'six')+.3))}));}
// the climb diagram
function s3(t){const k=seg(t,wi(2,'leaves'),wi(2,'pops')+.1);const pop=t>wi(2,'pops')?seg(t,wi(2,'pops'),wi(2,'pops')+.4):0;
  vl(vcam(540,960,lerp(1.0,1.04,k)),1,()=>climb(t,{k:ss(k),l1:ss(seg(t,wi(2,'five')-.2,wi(2,'five')+.3)),l2:ss(seg(t,wi(2,'thousand')-.2,wi(2,'thousand')+.3)),
    l3:ss(seg(t,wi(2,'house')-.3,wi(2,'house')+.2)),pop}));if(pop>0)flash(.4*(1-pop));}
// the station room, Mae's card by the radio
function s4(t){const k=seg(t,T(3),E(3)+.5);vl(vcam(lerp(600,700,ss(k)),lerp(960,820,ss(k)),lerp(1.0,1.2,ss(k))),1,()=>deskRoom(t,{look:ss(seg(t,wi(3,'card')-.3,wi(3,'card')+.4)),dot:.7}));}
// the rules, as they're read
function s5(t){const rv=[4,5,6].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(4),E(6));rulesCard(t,{reveal:rv,cy:lerp(780,760,k),s:lerp(.98,1.03,k)});}
// tonight's balloon climbs... then stops
function s6(t){const k=seg(t,T(7),E(7)+.5);const st=wi(7,'stopped');const fl=t<st?lerp(0,.45,seg(t,T(7),st)):.45+.55*seg(t,st,E(7)+.8);
  if(t<wi(7,'hanging')-.1){vl(vcam(540,lerp(820,760,k),lerp(1.0,1.1,k)),1,()=>monitor(t,{mode:'alt',alt:Math.round(lerp(31000,58112,clamp(fl/.45))),flat:fl,stopLabel:ss(seg(t,st,st+.3)),clock:'7:00 PM'}));return;}
  const q=seg(t,wi(7,'hanging')-.1,E(7)+.6);vl(vcam(540,lerp(700,640,q),lerp(1.0,1.25,q)),1,()=>{starSky(1920,{starA:1});balloon(540,640,70,t,{line:120,blink:true});
    label('58,112 FT · NOT MOVING',540,1000,{font:'800 34px MS',a:ss(seg(t,wi(7,'eleven')-.2,wi(7,'eleven')+.3)),bg:'rgba(255,77,61,.95)'});});}
// 98.6, then the pressure pulsing
function s7(t){const k=seg(t,T(8),E(8)+.5);const pr=t>wi(8,'pressure')-.2;
  const cnt=t>wi(8,'seventy-two')-.1?'72 / MIN':'';
  vl(vcam(540,lerp(pr?920:860,pr?960:880,k),lerp(1.04,1.1,k)),1,()=>monitor(t,{mode:'press',alt:58112,hot:true,amp:pr?ss(seg(t,wi(8,'pulsing')-.3,wi(8,'up'))):0,count:cnt,clock:'7:03 PM',shake:1}));}
// a heartbeat
function s8(t){const k=seg(t,T(9),E(9)+.6);vl(vcam(540,lerp(820,760,k),lerp(1.0,1.18,k)),1,()=>monitor(t,{mode:'ecg',clock:'7:04 PM',shake:1.5}));
  if(t>wi(9,'heartbeat')-.05)flash(.3*(1-seg(t,wi(9,'heartbeat')-.05,wi(9,'heartbeat')+.3)),'#ff4d3d');}
// the radio: Mae
function s9(t){if(t<T(11)-.1){const k=seg(t,T(10),E(10));vl(vcam(540,lerp(980,1040,k),lerp(1.0,1.06,k)),1,()=>meRadio(t,{radio:t>wi(10,'crackled')-.2?.5:0,brow:'worried',mouth:t>wi(10,'mae')?'o':'flat',look:{x:.8,y:.7},dot:true}));return;}
  const k=seg(t,T(11),E(11)+.5);vl(vcam(lerp(620,780,ss(k)),lerp(1100,1500,ss(k)),lerp(1.05,1.6,ss(k))),1,()=>meRadio(t,{radio:1,brow:'scared',mouth:'open',look:{x:1,y:.8},dot:true}));}
// rule three vs Mae, and the cut-down switch
function s10(t){const c3=ss(seg(t,wi(12,'three'),wi(12,'three')+.7));rulesCard(t,{reveal:[1,1,1],circle:[0,0,c3],cy:620,s:.72});
  cutSwitch(t,{y:1520,guard:ss(seg(t,wi(12,'mae'),wi(12,'down'))),hand:ss(seg(t,wi(12,'mae'),E(12))),shake:1});}
// my pulse... the screen keeps time with it
function s11(t){const at=wi(13,'and');const bpm=Math.round(lerp(88,112,seg(t,T(13),E(13))));
  if(t<at-.05){const k=seg(t,T(13),at);vl(vcam(540,lerp(1000,820,k),lerp(1.0,1.35,k)),1,()=>{fillAll('#07090d');glow(540,900,900,'rgba(80,255,160,1)',.10);
      me({x:540,y:2300,h:1900,brow:'scared',mouth:'grit',look:{x:0,y:0},bob:Math.sin(t*bpm/60*6.28)*6});
      ctx.save();ctx.globalAlpha=.6*beatK(t,bpm);ctx.strokeStyle='#ff4d3d';ctx.lineWidth=10;for(const s of[-1,1]){ctx.beginPath();ctx.arc(540+s*430,700,90,s>0?-.9:2.2,s>0?.9:4);ctx.stroke();}ctx.restore();});return;}
  const k=seg(t,at,E(13)+.6);vl(vcam(540,lerp(780,800,k),lerp(1.0,1.08,k)),1,()=>monitor(t,{mode:'sync',bpm,sync:ss(seg(t,wi(13,'keeping'),wi(13,'keeping')+.3)),clock:'7:06 PM',shake:2}));}
// the question: the balloon overhead, stretched, beating with me
function s12(t){const k=seg(t,T(14)-.3,TL.total);vl(vcam(540,lerp(820,760,k),lerp(1.0,1.12,k)),1,()=>bigSky(t,{r:280,y:1000,line:190,stretch:1,pulse:1.4,bpm:112,glowA:.3,tiny:true}));}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12};
const FADES={};
const CAPY={s1:.68,s3:.8,s5:.71,s6:.7,s7:.66,s8:.75,s10:.53,s11:.62,s12:.82};
const END_AT=null;
const HUDT=[[0,'7:02 PM'],[8,'5:59 PM'],[24,'6:58 PM'],[45,'7:00 PM'],[52.5,'7:03 PM'],[61,'7:04 PM'],[64.3,'7:05 PM'],[75,'7:06 PM']];
function hud(t){let tm=HUDT[0][1];for(const[a,v]of HUDT)if(t>=a)tm=v;const sc=sceneAt(t).id;
  const bad=['s1','s7','s8','s9','s10','s11','s12'].includes(sc);
  let alt=null;if(sc==='s1'||['s7','s8','s9','s10','s11','s12'].includes(sc))alt='58,112 FT';if(sc==='s6')alt=t<wi(7,'stopped')?Math.round(lerp(31000,58112,seg(t,T(7),wi(7,'stopped')))).toLocaleString('en-US')+' FT':'58,112 FT';
  const chips=[{k:'FLIGHT',v:'2'},{k:'TIME',v:tm}];if(alt)chips.push({k:'ALTITUDE',v:alt,hot:sc!=='s6'||t>wi(7,'stopped')});
  if(['s1','s7'].includes(sc))chips.push({k:'SENSOR',v:'98.6°F',hot:true});
  if(['s8','s9','s10'].includes(sc))chips.push({k:'PULSE',v:'72',hot:true});
  if(['s11','s12'].includes(sc))chips.push({k:'PULSE',v:String(Math.round(lerp(88,112,seg(t,T(13),E(13))))),hot:true});
  const tag={s1:'SONDE: READING WARM',s2:'WEATHER STATION',s3:'RADIOSONDE',s4:"MAE'S RULES",s5:"MAE'S RULES",s6:'BALLOON: STOPPED',s7:'SONDE: READING WARM',s8:'SONDE: HEARTBEAT',s9:'RADIO · CH 4',s10:"MAE'S RULES",s11:'SONDE: HEARTBEAT',s12:'SONDE: HEARTBEAT'}[sc];
  return{chips,tag,tagRed:bad};}
