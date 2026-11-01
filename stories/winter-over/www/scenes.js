// ===================== Winter-Over, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
// cold open: the board says 41, the extra badge flashing red
function s1(t){const k=seg(t,0,E(0)+.6);const f41=wi(0,'fortyone');
  vl(vcam(540,lerp(900,860,k),lerp(1.0,1.1,k)),1,()=>{fillAll('#07090e');glow(540,800,900,'rgba(255,60,50,1)',.10+.06*Math.sin(t*9));board(540,800,1.05,t,{n:41});});
  if(Math.abs(t-f41)<.18)flash(.3*(1-Math.abs(t-f41)/.18),'#ff4d3d');}
// the last plane leaves
function s2(t){const k=seg(t,T(1),E(1)+.5);vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.08,k)),1,()=>{polarSky(t,{hz:1250,aur:.6});station(540,1330,.75,t,{});
    // the plane flying off, getting small
    const q=seg(t,T(1)-.2,wi(1,'next'));const px=lerp(300,940,q),py=lerp(900,420,q),s=lerp(1.1,.25,q);ctx.save();ctx.translate(px,py);ctx.scale(s,s);ctx.rotate(-.18);
    fillRR(-180,-26,360,52,26,'#c9ced8');poly([-30,-20,40,-20,-60,-170,-110,-170],'#aeb5c2');poly([-30,20,40,20,-60,170,-110,170],'#aeb5c2');poly([150,-10,190,-10,200,-90,170,-90],'#aeb5c2');
    for(const y of[-110,-60,60,110])circ(-60,y,14,'#5a6170');circ(-160,0,8,'#ff3b2f',.5+.5*Math.sin(t*10));ctx.restore();
    label('LAST PLANE: FEBRUARY',540,1500,{font:'900 40px MS',a:ap(t,wi(1,'february')-.2)});
    label('NEXT PLANE: LATE OCTOBER',540,1590,{font:'900 40px MS',a:ap(t,wi(1,'october')-.2),bg:'rgba(255,201,60,.95)',col:'#14110a'});
    if(t>wi(1,'nobody')-.1)label('NOBODY IN · NOBODY OUT',540,1690,{font:'900 36px MS',a:ap(t,wi(1,'nobody')-.1),bg:'rgba(224,54,42,.95)'});});}
// the real station
function s3(t){const k=seg(t,T(2),E(2)+.5);vl(vcam(lerp(500,580,k),lerp(1020,980,k),lerp(1.05,1.15,k)),1,()=>{polarSky(t,{hz:1220});station(540,1300,.8,t,{});
    snow(t,3,90,{fall:40,wind:-300,a:.5});
    label('AMUNDSEN-SCOTT SOUTH POLE STATION',540,1500,{font:'900 34px MS',a:ap(t,wi(2,'amundsenscott')-.2)});
    label('6 MONTHS OF NIGHT',540,1590,{font:'900 40px MS',a:ap(t,wi(2,'six')-.1),bg:'rgba(255,201,60,.95)',col:'#14110a'});
    const m=ap(t,wi(2,'minus')-.1);if(m>0){ctx.save();ctx.translate(540,520);ctx.scale(.7+.3*m,.7+.3*m);glow(0,0,300,'rgba(120,180,255,1)',.4*m);T2('−100°F',0,0,190,'#dff0ff',{w:900,a:m,stroke:12});ctx.restore();}});}
// me at the comms desk, the board on the wall (a normal night: 40)
function s4(t){const k=seg(t,T(3),E(3)+.5);const tp=wi(3,'taps');const n=t<tp?37:Math.min(40,37+Math.floor((t-tp)/.35));
  vl(vcam(lerp(560,640,k),lerp(980,880,k),lerp(1.0,1.12,k)),1,()=>commsRoom(t,{n,bs:.5,fig:()=>me({x:330,y:1700,h:900,brow:'flat',mouth:'flat',look:{x:.8,y:-.6},armR:[.6,.9],armL:[.4,.9]})}));}
// Jo tapes the rules up
function s5(t){const k=seg(t,T(4),E(4)+.5);const hold=ap(t,wi(4,'taped')-.4,.6);
  vl(vcam(lerp(520,470,k),lerp(1000,930,k),lerp(1.0,1.1,k)),1,()=>commsRoom(t,{n:40,bs:.42,fig:()=>jo({x:420,y:1780,h:1250,brow:'flat',mouth:'flat',look:{x:.6,y:.2},
    armR:[lerp(.1,1.15,hold),lerp(.1,.9,hold)],held:(hx,hy)=>{ctx.save();ctx.translate(hx+30,hy-40);ctx.rotate(-.12);fillRR(-80,-110,170,210,8,'#efe9db');
      for(let q=0;q<5;q++)line(-55,-60+q*34,60-(q%2)*35,-60+q*34,6,'rgba(40,40,50,.55)');text('RULES',5,-78,'900 26px MS','#1d1f25');ctx.restore();}})}));}
// the rules card
function s6(t){const rv=[5,6,7].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const k=seg(t,T(5),E(7));rulesCard(t,{reveal:rv,cy:lerp(780,760,k),s:lerp(.98,1.03,k)});}
// counting faces down the hall: 35..40
function s7(t){const k=seg(t,T(8),E(8)+.5);const c0=wi(8,'walked');const cnt=[0,1,2,3,4,5].map(i=>ap(t,c0+i*.24,.2));
  if(t<c0-.1){vl(vcam(540,lerp(900,880,k),1.05),1,()=>{fillAll('#07090e');board(540,780,.95,t,{n:41});});return;}
  vl(vcam(540,lerp(1000,900,k),lerp(1.0,1.12,k)),1,()=>corridor(t,{count:cnt,num0:35,tags:true}));
  const f=ap(t,wi(8,'forty')-.1);if(f>0){ctx.save();ctx.translate(540,520);ctx.scale(.8+.2*f,.8+.2*f);T2('40',0,0,220,'#ffc93c',{w:900,a:f,stroke:14});T2('FACES',0,140,60,'#fff',{w:900,a:f,stroke:8});ctx.restore();}}
// the badge log: Jo twice, once outside
function s8(t){const k=seg(t,T(9),E(9)+.5);const rows=[0,1,2,3].map(j=>ap(t,T(9)+.1+j*.12));rows.push(ap(t,wi(9,'and')-.1,.25));
  vl(vcam(540,lerp(820,880,k),lerp(1.0,1.1,k)),1,()=>logScreen(t,{rows,dup:t>wi(9,'twice')-.1,cursor:Math.sin(t*8)>0}));
  const o=wi(9,'outside');if(Math.abs(t-o)<.15)flash(.25*(1-Math.abs(t-o)/.15),'#ff4d3d');}
// the radio clicks on; Jo outside at the flag line
function s9(t){if(t<T(11)-.1){const k=seg(t,T(10),E(10));const r=t>wi(10,'clicked')-.15?.5+.3*Math.sin(t*20):0;
    vl(vcam(lerp(640,780,k),lerp(1000,1150,k),lerp(1.1,1.35,k)),1,()=>commsRoom(t,{n:41,bs:.42,radio:r,fig:()=>me({x:420,y:1700,h:900,brow:'worried',mouth:'o',look:{x:1,y:.5},armR:[.6,.9],armL:[.4,.9]})}));return;}
  const k=seg(t,T(11),E(11)+.4);vl(vcam(540,lerp(1000,940,k),lerp(1.0,1.18,k)),1,()=>flagLine(t,{fig:1,figZ:lerp(.24,.32,k),wave:true,shake:.6}));
  // radio inset
  fillRR(640,1530,380,170,22,'rgba(10,14,18,.9)');waveform(830,1600,300,90,t,.85,WO.led,13);T2('JO · CH 1',830,1675,26,WO.led,{w:800});}
// Jo walks in behind me: "That's not me."
function s10(t){const k=seg(t,T(12),E(12)+.5);const jw=ap(t,wi(12,'walked')-.2,.5);const nm=t>wi(12,"that's")-.1;
  vl(vcam(lerp(560,640,k),lerp(960,900,k),lerp(1.0,1.1,k)),1,()=>behind(t,{jo:jw,joBrow:nm?'angry':'flat',joMouth:nm?'open':'flat',point:t>wi(12,'lock')-.1,brow:'scared',mouth:nm?'open':'o'}));}
// which one is Jo?
function s11(t){const c3=ap(t,wi(13,'three'),.7),q=ap(t,wi(13,'which')-.1,.4);rulesCard(t,{reveal:[1,1,1],circle:[0,0,c3],q,cy:lerp(760,720,seg(t,T(13),E(13))),s:.86});}
// the board refreshes: the badge outside is mine
function s12(t){const mn=wi(14,'it');const rf=wi(14,'refreshed');
  if(t<mn-.05){const k=seg(t,T(14),mn);const who=t<wi(14,"wasn't")?'JO':(Math.sin(t*30)>0?'JO':'——');
    vl(vcam(540,lerp(900,960,k),lerp(1.0,1.12,k)),1,()=>logScreen(t,{rows:[1,1,1,1,1],who,cursor:true}));if(Math.abs(t-rf)<.12)flash(.2,'#5cf2a2');return;}
  const k=seg(t,mn,E(14)+.6);vl(vcam(540,lerp(940,900,k),lerp(1.15,1.0,ss(seg(t,mn,mn+.3)))),1,()=>{fillAll('#0a0405');glow(540,900,800,'rgba(255,60,50,1)',.2);
    badge(540,900,2.0,{name:'COMMS TECH',sub:'OUTSIDE · FLAG LINE',rot:-.04});});
  flash(.5*(1-seg(t,mn,mn+.25)),'#fff');}
// the question: out the window, at the flag line, someone in my beanie
function s13(t){const ph=t-T(15);vl(vcam(540,960,lerp(1.05,1.15,seg(t,T(15),TL.total))),1,()=>{flagLine(t,{fig:1,figZ:lerp(.5,.58,seg(t,T(15),TL.total)),figHat:'beanie',figHatCol:'#f0683f',glint:.8,shake:.2,aur:.5});
    // the window frame
    ctx.fillStyle='#07090d';ctx.fillRect(-100,-100,1280,240);ctx.fillRect(-100,1700,1280,400);ctx.fillRect(-100,-100,160,2200);ctx.fillRect(1020,-100,160,2200);
    ctx.strokeStyle='#1b2230';ctx.lineWidth=30;rr(60,140,960,1560,50);ctx.stroke();ctx.save();ctx.globalAlpha=.06;fillRR(60,140,960,1560,50,'#cfe3ff');ctx.restore();});}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13};
const FADES={};
const CAPY={s1:.79,s2:.3,s3:.42,s4:.66,s5:.75,s6:.71,s7:.86,s8:.78,s9:.36,s10:.62,s11:.62,s12:.82,s13:.86};
const END_AT=null;
function clk(t){const sc=sceneAt(t).id;const m={s1:0,s7:4,s8:9,s9:13,s10:15,s11:15,s12:17,s13:18}[sc];if(m==null)return null;return '20:'+String(m+(sc==='s7'?Math.floor(seg(t,T(8),E(8))*4):0)).padStart(2,'0');}
function hud(t){const sc=sceneAt(t).id;const night=['s1','s7','s8','s9','s10','s11','s12','s13'].includes(sc);
  const chips=[];const c=clk(t);chips.push({k:'TIME',v:c||'—'});
  chips.push({k:'OUTSIDE',v:'−98°F',hot:sc==='s3'||sc==='s9'||sc==='s13'});
  if(night)chips.push({k:'HEADCOUNT',v:'41 / 40',hot:true});else chips.push({k:'NEXT PLANE',v:'126 DAYS'});
  const tag={s1:'SOUTH POLE · WINTER',s2:'NO FLIGHTS',s3:'REAL: SOUTH POLE STATION',s4:'COMMS ROOM',s5:"JO'S RULES",s6:"JO'S RULES",s7:'COUNTING FACES',s8:'BADGE LOG',s9:'RADIO · CH 1',s10:'COMMS ROOM',s11:"JO'S RULES",s12:'BADGE LOG',s13:'THE FLAG LINE'}[sc];
  return{chips,tag,tagRed:night};}
