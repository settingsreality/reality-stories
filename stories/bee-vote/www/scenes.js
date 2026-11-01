// ===================== The Bee Vote, scene by scene (v2 vertical, How Time Works look) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const pop=(t,a)=>1+.25*(1-ss(seg(t,a,a+.3)))*(t>a?1:0);
// cold open: the swarm on the branch, holding an election
function c1(t){const k=seg(t,0,E(0)+.5);vl(vcam(540,lerp(900,860,k),lerp(1.0,1.1,k)),1,()=>{space(t,{c0:'#0a0c06',c1:'#1a1406'});
    branch(-60,420,1140,380,t);swarmBeard(560,430,520,760,t);
    for(let i=0;i<6;i++){const a=t*.7+i;bee(560+Math.cos(a)*(380+i*20),800+Math.sin(a*1.3)*420,.8,t,{rot:Math.cos(a)*.3,flip:Math.sin(a)<0,ph:i});}
    T2('10,000 BEES',540,230,96,U.y,{w:900,stroke:10});
    const e=.85+.15*ap(t,wi(0,'holding')-.15,.3);{ctx.save();ctx.translate(540,1300);ctx.scale(pop(t,wi(0,'holding')-.15),pop(t,wi(0,'holding')-.15));
      fillRR(-230,-110,460,220,24,'#e9edf5');fillRR(-110,-130,220,26,10,'#1b1d23');T2('VOTE',0,10,110,'#1b1d23',{w:900,a:e});ctx.restore();}});}
// the hive splits; one pick
function c2(t){if(t<T(2)-.05){const k=seg(t,T(1),E(1));vl(vcam(540,lerp(980,940,k),lerp(1.0,1.06,k)),1,()=>{space(t);
      site(300,1000,1.6,t,{box:true,hole:80});T2('CROWDED HIVE',300,640,48,U.ink,{w:900,a:ap(t,wi(1,'crowded')-.2)});
      const go=seg(t,wi(1,'queen')-.4,E(1)+.4);for(let i=0;i<14;i++){const q=clamp(go*1.3-i*.06);if(q<=0)continue;bee(lerp(330,960,q)+Math.sin(t*4+i)*20,lerp(1080,700,q)+Math.cos(t*3+i)*60+i*28-180,.75,t,{ph:i,crown:i===0,tag:i===0?'OLD QUEEN':null});}
      const h=ap(t,wi(1,'half')-.15);if(h>0){T2('½',820,1450,240,U.y,{w:900,a:h,stroke:12});T2('OF THE COLONY',820,1600,40,U.ink,{w:900,a:h});}});return;}
  const k=seg(t,T(2),E(2)+.4);vl(vcam(540,lerp(960,920,k),lerp(1.0,1.08,k)),1,()=>{space(t,{c0:'#06070d',c1:'#101a30'});branch(-60,360,1140,330,t);swarmBeard(540,370,420,600,t);
    chip('NO HOME',540,1070,{size:44,a:ap(t,wi(2,'no')-.2),bg:'rgba(224,54,42,.95)'});
    const o=ap(t,wi(2,'one')-.15);if(o>0){ctx.save();ctx.translate(540,1340);ctx.scale(pop(t,wi(2,'one')-.15),pop(t,wi(2,'one')-.15));T2('1 PICK',0,0,150,U.y,{w:900,a:o,stroke:12});ctx.restore();}
    const d=ap(t,wi(2,'badly')-.2);if(d>0){chip('BAD PICK → COLONY CAN DIE IN WINTER',540,1600,{size:32,a:d});for(let i=0;i<10;i++){const q=fract(t*.15+i/10);T2('❄',100+i*95,1680+q*240,40,'#cfe3ff',{a:d*Math.sin(q*Math.PI)*.8});}}});}
// scouts fly out to the candidate sites
function c3(t){const k=seg(t,T(3),E(3)+.4);vl(vcam(540,lerp(960,920,k),lerp(1.0,1.06,k)),1,()=>{space(t);
    const S=[[180,520,U.A,'A'],[900,560,U.B,'B'],[200,1450,U.C,'C'],[880,1420,'#c58aff','D']];
    S.forEach(([x,y,c,l],j)=>site(x,y,.6,t,{label:'SITE '+l,col:c,a:1}));
    swarmBeard(540,830,200,280,t);
    const go=seg(t,wi(3,'scouts')-.4,E(3)+.4);for(let i=0;i<16;i++){const [x,y]=S[i%4];const q=fract(go*1.6+i*.13);bee(lerp(540,x,q),lerp(950,y,q)+Math.sin(q*9+i)*30,.55,t,{ph:i,flip:x<540,a:go>0?Math.sin(q*Math.PI):0});}
    chip('A FEW HUNDRED SCOUTS',540,1180,{size:40,a:ap(t,wi(3,'hundred')-.2),bg:U.y,col:'#14110a'});
    chip('THE ELECTION HAS RULES',540,1760,{size:36,a:ap(t,wi(3,'rules')-.2)});});}
// the rules
function c4(t){const k=seg(t,T(4),E(6));vl(vcam(540,lerp(940,920,k),lerp(1.0,1.04,k)),1,()=>{space(t);T2('ELECTION RULES',540,300,70,U.y,{w:900});fillRR(90,390,900,600,30,'rgba(255,255,255,.06)');
    const R=[['1','FIND A SPOT. DANCE FOR IT.',4],['2','BETTER SPOT = LONGER DANCE',5],['3','GO SEE IT YOURSELF',6]];
    R.forEach(([n,s,i],j)=>{const a=ap(t,T(i)+.1);const y=500+j*190;ctx.save();ctx.globalAlpha=.2+.8*a;circ(170,y,46,a>.5?U.y:'rgba(255,255,255,.15)');T2(n,170,y,46,'#14110a',{w:900});T2(s,240,y,40,U.ink,{align:'left',w:900});ctx.restore();});
    // a bee doing the waggle dance below
    const p=waggle(540,1450,300,-.5,fract(t*.35));bee(p.x,p.y,1.2,t,{rot:p.rot,ph:1});ctx.save();ctx.globalAlpha=.25;ctx.setLineDash([12,14]);ctx.strokeStyle=U.y;ctx.lineWidth=4;ctx.beginPath();
    for(let q=0;q<=1;q+=.01){const r=waggle(540,1450,300,-.5,q);q?ctx.lineTo(r.x,r.y):ctx.moveTo(r.x,r.y);}ctx.stroke();ctx.restore();
    if(t>T(6)){const s2=ap(t,wi(6,'go')-.2);bee(850,1780-s2*120,.9,t,{a:s2,flip:false,tag:'CHECKING…',tagBg:'#e9edf5'});}});}
// 100 laps vs 12
function c5(t){const k=seg(t,T(7),E(7)+.4);vl(vcam(540,lerp(960,930,k),lerp(1.0,1.05,k)),1,()=>{comb(t,{a:.35});
    const a=seg(t,wi(7,'hundred')-.3,wi(7,'laps')+.2),b=seg(t,wi(7,'mediocre')-.1,wi(7,'twelve')+.3);
    bar(220,1500,220,900,a,U.A,'GREAT SITE',Math.round(100*a));bar(640,1500,220,900,b*.12,U.B,'MEDIOCRE',Math.round(12*b));
    T2('DANCE LAPS',540,330,70,U.ink,{w:900,stroke:10});
    const p=waggle(330,1700,140,0,fract(t*1.2));bee(p.x,p.y,.7,t,{rot:p.rot});const q=waggle(750,1700,140,0,fract(t*.3));bee(q.x,q.y,.7,t,{rot:q.rot,ph:2});});}
// the head-butt
function c6(t){const k=seg(t,T(8),E(8)+.4);const hb=wi(8,'headbutts');const hit=seg(t,hb-.2,hb+.1);const bp2=ap(t,wi(8,'beep')-.1,.2);
  vl(vcam(560,lerp(980,960,k),lerp(1.0,1.08,k)),1,()=>{comb(t,{a:.3});
    const p=waggle(760,900,200,0,fract(t*.6));const stop=t>hb+.1;bee(stop?760:p.x,stop?900:p.y,2.4,t,{rot:stop?0:p.rot,tag:'DANCING FOR B',tagBg:U.B,mouth:stop?'o':null,still:false});
    const bx=lerp(260,stop?600:570,ss(hit))+(stop?Math.sin(t*40)*4*(1-seg(t,hb+.1,hb+.5)):0);bee(bx,1120,2.4,t,{tag:'SITE A SCOUT',tagBg:U.A,ph:3});
    if(bp2>0){ctx.save();ctx.translate(620,560);ctx.scale(.6+.4*bp2,.6+.4*bp2);fillRR(-150,-70,300,140,40,'#fff');poly([-40,60,0,60,-60,120],'#fff');T2('BEEP!',0,0,76,'#14110a',{w:900});ctx.restore();}
    stamp('STOP SIGNAL',540,1450,ap(t,hb,.3),U.red,64);});}
// weak sites lose, strong gain: quorum at 15
function c7(t){const k=seg(t,T(9),E(9));vl(vcam(540,lerp(960,930,k),lerp(1.0,1.05,k)),1,()=>{space(t);
    const a=Math.round(lerp(3,15,ss(seg(t,wi(9,'strong')-.3,wi(9,'fifteen')+.1)))),b=Math.round(lerp(6,1,ss(seg(t,T(9),wi(9,'strong'))))),c=Math.round(lerp(4,0,ss(seg(t,T(9),wi(9,'strong')+.5))));
    [[220,a,U.A,'A',3],[540,b,U.B,'B',1],[860,c,U.C,'C',2]].forEach(([x,n,col,l,st])=>{site(x,520,.7,t,{label:'SITE '+l,col,glow:l==='A'?seg(t,wi(9,'fifteen')-.2,wi(9,'fifteen')+.3):0});
      for(let i=0;i<n;i++){const r=i%3,cc=Math.floor(i/3);bee(x-60+r*60+Math.sin(t*3+i)*4,820+cc*86,.42,t,{ph:i});}
      T2(String(n),x,1330,90,n>=15?U.y:col,{w:900});});
    T2('SCOUTS AT EACH SITE',540,1440,36,U.dim,{w:800});
    const q=ap(t,wi(9,'fifteen')-.15);if(q>0)chip('15 = QUORUM',540,1620,{size:48,a:q,bg:U.y,col:'#14110a'});});}
// warming the swarm up to 95°F
function c8(t){const k=seg(t,T(10),E(10)+.4);const w=ss(seg(t,wi(10,'buzz')-.2,wi(10,'ninetyfive')+.2));
  vl(vcam(540,lerp(960,930,k),lerp(1.0,1.06,k)),1,()=>{space(t,{c0:'#0b0606',c1:lerp(0,1,w)>.5?'#2a1008':'#1a0c08'});
    stamp('QUORUM',540,330,ap(t,T(10),.3),U.y,80,-.05);
    const sh=shakeAt(t,2+6*w,1.4);ctx.save();ctx.translate(sh.x,sh.y);branch(-60,560,700,540,t);swarmBeard(400,570,360,560,t);ctx.restore();
    glow(400,850,500,'rgba(255,90,40,1)',.25*w);
    thermo(860,1300,700,lerp(.3,1,w),t);T2(Math.round(lerp(70,95,w))+'°F',860,1500,70,w>.9?U.y:U.ink,{w:900,stroke:8});T2(Math.round(lerp(21,35,w))+'°C',860,1590,44,U.dim,{w:800});
    chip('FLIGHT MUSCLES ON',400,1300,{size:38,a:ap(t,wi(10,'buzz')-.2)});});}
// takeoff: 16 hours, best site
function c9(t){const k=seg(t,T(11),E(11)+.4);const go=ss(seg(t,T(11)-.2,wi(11,'study')+.3));
  vl(vcam(540,lerp(960,920,k),lerp(1.0,1.06,k)),1,()=>{space(t);branch(-60,1120,520,1100,t);swarmBeard(200,1120,300*(1-go),420*(1-go)+1,t,{a:1-go});site(860,560,.8,t,{label:'SITE A',col:U.A,stars:3,glow:.6+.4*Math.sin(t*3)});
    for(let i=0;i<70;i++){const q=clamp(go*1.2-hash(i)*.4);const x=lerp(200,860,q)+(hash(i*3)-.5)*lerp(260,60,q)+Math.sin(t*5+i)*10,y=lerp(1250,560,q)+(hash(i*7)-.5)*lerp(380,60,q)+Math.cos(t*4+i)*10;
      const cx=860+Math.cos(t*2+i)*(120+hash(i*5)*80),cy=560+Math.sin(t*2.3+i)*(100+hash(i*9)*60);const z=ss(seg(t,wi(11,'study')+.3,wi(11,'study')+1.3));bee(lerp(x,cx,z),lerp(y,cy,z),.35,t,{ph:i,rot:-.6});}
    const h=ap(t,wi(11,'sixteen')-.15);if(h>0){T2('16 HOURS',540,1420,140,U.y,{w:900,a:h,stroke:12});}
    chip('ALMOST ALWAYS THE BEST SITE',540,1640,{size:38,a:ap(t,wi(11,'almost')-.2),bg:U.A,col:'#07120c'});});}
// the weird part: no voter sees everything
function c10(t){const k=seg(t,T(12),E(12)+.4);const s2=wi(12,'most')-.1;
  vl(vcam(540,lerp(960,930,k),lerp(1.0,1.06,k)),1,()=>{space(t);
    if(t<s2){bee(540,900,3.2,t,{crown:true,still:false});T2('THE QUEEN',540,560,70,U.ink,{w:900});stamp('NO VOTE',540,1350,ap(t,wi(12,'vote')-.2,.3),U.red,90);return;}
    const S=[[180,520,U.A],[540,420,U.B],[900,520,U.C]];S.forEach(([x,y,c])=>site(x,y,.55,t,{col:c}));
    for(let i=0;i<9;i++){const s=S[i%3];const bx=150+(i%3)*370+Math.floor(i/3)*40,by=1050+Math.floor(i/3)*170;line(bx,by,s[0],s[1]+90,4,`rgba(${hexRgb(s[2])},.6)`);bee(bx,by,.7,t,{ph:i,rot:-1.2});}
    T2('1 SCOUT = 1 SITE',540,1600,80,U.y,{w:900,a:ap(t,wi(12,'one')-.2),stroke:10});
    chip('NOBODY COMPARES THEM ALL',540,1760,{size:36,a:ap(t,wi(12,'nobody')-.2),bg:'rgba(224,54,42,.95)'});});}
// like neurons in your brain
function c11(t){const k=seg(t,T(13),E(13)+.4);vl(vcam(540,lerp(960,920,k),lerp(1.0,1.06,k)),1,()=>{space(t,{c0:'#0a0614',c1:'#160c2a'});
    const ex=ap(t,wi(13,'dances')-.1),inh=ap(t,wi(13,'headbutts')-.1);
    neuron(280,640,1.1,U.A,ex*(.6+.4*Math.sin(t*8)));neuron(800,640,1.1,U.B,lerp(1,.15,inh));
    arrow(380,640,690,640,10,U.A,ex,30);if(ex>0)T2('DANCE = GO',540,560,40,U.A,{w:900,a:ex});
    if(inh>0){line(420,760,670,760,10,U.red);line(670,720,670,800,12,U.red);T2('HEAD-BUTT = STOP',540,860,40,U.red,{w:900,a:inh});}
    me2({x:540,y:1880,h:520,brow:'worried',mouth:'o',look:{x:0,y:-1}});glow(540,1440,200,'rgba(197,138,255,1)',.25+.15*Math.sin(t*4));});}
// would you trust it?
function c12(t){vl(vcam(540,980,lerp(1.0,1.08,seg(t,T(14),TL.total))),1,()=>{space(t);house(540,1500,1.4);
    for(let i=0;i<10;i++){const a=t*.8+i*.63;bee(540+Math.cos(a)*360,1200+Math.sin(a*1.2)*260,.6,t,{ph:i,flip:Math.sin(a)>0});}
    me2({x:220,y:1880,h:420,brow:'worried',mouth:'flat',look:{x:1,y:-.4}});});}
const SCENES={c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12};
const FADES={};
const CAPY={c1:.79,c2:.2,c3:.36,c4:.56,c5:.86,c6:.86,c7:.92,c8:.9,c9:.9,c10:.6,c11:.6,c12:.5};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const chips=[{k:'SWARM',v:'10,000'}];
  const hr=Math.round(lerp(0,16,seg(t,T(3),wi(11,'sixteen'))));if(t>T(3))chips.push({k:'HOUR',v:String(hr),hot:false});
  chips.push({k:'HOME',v:t>T(11)+1?'FOUND':'NONE',hot:t<=T(11)+1});
  const tag={c1:'REAL SCIENCE',c2:'SWARM SEASON',c3:'THE SCOUTS',c4:'THE RULES',c5:'SEELEY ET AL.',c6:'STOP SIGNAL',c7:'THE COUNT',c8:'QUORUM',c9:'TAKEOFF',c10:'THE WEIRD PART',c11:'LIKE A BRAIN',c12:'YOUR VOTE'}[sc];
  return{chips,tag,tagRed:false};}
