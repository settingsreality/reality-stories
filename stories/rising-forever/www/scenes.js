// ===================== The Sound That Rises Forever, scene by scene =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const pop=(t,a)=>1+.25*(1-ss(seg(t,a,a+.3)))*(t>a?1:0);
const popT=(s,x,y,size,col,t,a,o={})=>{const q=ap(t,a);if(q<=0)return;ctx.save();ctx.translate(x,y);const p=pop(t,a);ctx.scale(p,p);T2(s,0,0,size,col,Object.assign({w:900,a:q,stroke:12},o));ctx.restore();};
// tone pairs of the ending (same times in audio.py)
const PAIRS=()=>{const a=E(15)+.3,b=E(16)+.5;return[a,a+2.0,b,b+2.1];};
const toneOn=(t,which)=>{let v=0;for(const a of PAIRS()){const s=a+(which?.75:0);if(t>=s&&t<s+.65)v=1;}return v;};
function c1(t){const k=seg(t,0,T(1));vl(vcam(540,lerp(960,930,k),lerp(1.0,1.08,k)),1,({})=>{space(t,{c0:'#060410',c1:'#120a2a'});
    spectro(-40,150,1160,1500,t+6,{lw:16,span:5});
    glow(540,1500,520,'rgba(90,120,255,1)',.2);
    arrow(540,500,540,190,26,U.y,.95,70);
    T2('RISING',540,590,120,U.y,{w:900,stroke:14});
    me2({x:540,y:1890,h:640,brow:'scared',mouth:'o',look:{x:0,y:-1},armL:[2.5,.7],armR:[2.5,.7]});
    popT('HIGHER BY: 0 Hz',540,780,76,U.red,t,wi(0,'never')-.1);});}
function c2(t){if(t<T(2)-.05){const k=seg(t,T(1)-.2,E(1));vl(vcam(540,lerp(980,950,k),lerp(1,1.06,k)),1,()=>{space(t);
      for(let i=0;i<4;i++){const q=fract(t*.4+i/4);ctx.save();ctx.strokeStyle=U.y;ctx.lineWidth=10;ctx.globalAlpha=Math.sin(q*Math.PI)*.8;ctx.beginPath();ctx.arc(600,960,lerp(460,160,q),2.5,3.8);ctx.stroke();ctx.restore();}
      ear(600,960,1.9);popT('SHEPARD',540,380,150,U.y,t,wi(1,'shepard')-.15);popT('TONE',540,530,150,U.y,t,wi(1,'shepard')-.05);
      chip('AN ILLUSION FOR YOUR EARS',540,1640,{size:42,a:ap(t,wi(1,'illusion')-.2),bg:U.y,col:'#14110a'});});return;}
  const k=seg(t,T(2),E(2)+.3);vl(vcam(540,lerp(960,930,k),lerp(1,1.05,k)),1,()=>{space(t,{c0:'#080a12',c1:'#141a2a'});
    popT('1964',540,330,190,U.y,t,wi(2,'1964',0)-.1);chip('BELL LABS',540,480,{size:44,a:ap(t,wi(2,'bell')-.2)});
    mainframe(215,640,t);
    toon({x:200,y:1480,h:520,jacket:'#e6e9ef',stripe:false,skin:'#e9b896',brow:'flat',mouth:'smile',face:.5,look:{x:1,y:-.2},pants:'#2a3142',hat:'helm',hatCol:'#3a2a20',armR:[1.2,.6]});
    chip('ROGER SHEPARD',540,1700,{size:40,a:ap(t,wi(2,'roger')-.2),bg:U.y,col:'#14110a'});});}
function c3(t){const hz=[55,110,220,440,880,1760,3520,7040];const s1=t>=T(4)-.05;const k=seg(t,T(3),E(4));vl(vcam(540,lerp(960,940,k),lerp(1,1.04,k)),1,()=>{space(t);
    T2('ONE NOTE IS REALLY',540,270,54,U.ink,{w:900});T2('A STACK',540,360,96,U.y,{w:900});
    hz.slice().reverse().forEach((f,j)=>{const i=7-j,y=500+j*110,q=ap(t,wi(3,'stack')-.2+i*.12);if(q<=0)return;fillRR(250,y-38,lerp(0,520,q),76,16,hue(i/7));T2('A',310,y,46,'#0c1430',{w:900,a:q});T2(f.toLocaleString()+' Hz',730,y,38,'#0c1430',{w:900,a:q,align:'right'});
      if(s1&&i<7){const a=ap(t,wi(4,'double')-.3+i*.08);if(a>0){ctx.save();ctx.globalAlpha=a;ctx.strokeStyle=U.y;ctx.lineWidth=6;ctx.beginPath();ctx.arc(800,y-55,48,1.57,-1.57,true);ctx.stroke();ctx.restore();T2('×2',900,y-55,38,U.y,{w:900,a});}}});
    if(s1){chip('20 Hz → 20,000 Hz',540,1420,{size:46,a:ap(t,wi(4,'ears')-.2)});}});}
function c4(t){const k=seg(t,T(5),E(7));vl(vcam(540,lerp(950,930,k),lerp(1,1.03,k)),1,()=>{space(t);T2('THE RULES',540,270,76,U.y,{w:900});fillRR(70,340,940,400,30,'rgba(255,255,255,.06)');
    const R=[['1','SAME SPEED, ALL LAYERS',5,'rule'],['2','TOP: FADE OUT',6,'rule'],['3','BOTTOM: FADE IN',7,'rule']];
    R.forEach(([n,s,i],j)=>{const a=ap(t,i===5?wi(5,'rule')-.05:T(i)+.05);const y=430+j*125;ctx.save();ctx.globalAlpha=.2+.8*a;circ(150,y,46,a>.5?U.y:'rgba(255,255,255,.15)');T2(n,150,y+1,50,'#14110a',{w:900});T2(s,225,y,46,U.ink,{align:'left',w:900});ctx.restore();});
    stack(190,800,700,560,t,{arrows:t<T(6),hiTop:ap(t,wi(6,'fades')-.2)*(t<T(7)?1:.4),hiBot:ap(t,wi(7,'fades')-.2)});
    T2('LOUD',960,1080,30,U.y,{w:800});T2('HIGH',960,830,30,U.dim,{w:800});T2('LOW',960,1340,30,U.dim,{w:800});});}
function c5(t){const k=seg(t,T(8),T(9));vl(vcam(540,lerp(960,930,k),lerp(1,1.06,k)),1,()=>{space(t);
    pole(150,420,280,1000,t);stack(540,420,400,1000,t,{arrows:true});
    chip('ALWAYS RISING',290,1570,{size:38,a:ap(t,wi(8,'rising')-.2),bg:U.y,col:'#14110a'});
    chip('STACK NEVER MOVES',740,1570,{size:32,a:ap(t,wi(8,'never')-.2),bg:'rgba(224,54,42,.95)'});
    const g=ap(t,E(8)+.2);if(g>0)T2('LISTEN…',540,270,100,U.y,{w:900,a:g*(1-ap(t,T(9)-.3,.2)),stroke:12});});}
function c6(t){const s2=T(10)-.05,k=seg(t,T(9),E(10));const fl=ss(seg(t,wi(10,'erased')-.1,wi(10,'circle')));
  vl(vcam(540,lerp(960,940,k),lerp(1,1.04,k)),1,()=>{space(t,{c0:'#070a18',c1:'#0e1a3a'});
    helix(540,lerp(1000,800,fl),lerp(330,360,fl),300,t,{flat:fl,climb:t*.14});
    const lad=1-ap(t,wi(9,'spiral')-.3,.4);if(lad>.01){ctx.save();ctx.globalAlpha=lad;fillAll('rgba(7,10,24,.92)');for(let i=0;i<9;i++){const y=420+i*120;fillRR(380,y,320,26,8,'#9fc0ff');}line(380,380,380,1420,16,'#5b8cff');line(700,380,700,1420,16,'#5b8cff');ctx.restore();stamp('NOT A LADDER',540,900,lad,U.red,72);}
    if(t<s2){chip('SAME NOTE, ONE FLOOR UP',560,340,{size:40,a:ap(t,wi(9,'land')-.2),bg:U.y,col:'#14110a'});}
    else{stamp('FLOORS ERASED',540,330,ap(t,wi(10,'erased')-.1,.3),U.red,66);
      const a=(t*.8)%6.283-1.571,R=360;circ(540+Math.cos(a)*R,800+Math.sin(a)*R,fl>.6?44:0,U.grn);if(fl>.6){T2('YOU',540+Math.cos(a)*R,800+Math.sin(a)*R+1,26,'#07120c',{w:900});arrow(540+Math.cos(a)*R,800+Math.sin(a)*R,540+Math.cos(a+.3)*R,800+Math.sin(a+.3)*R,8,U.grn,1,24);}}});}
function card(x,y,w,h,a,title,sub,fn,t,tcol=U.y){if(a<=0)return;ctx.save();ctx.translate(lerp(60,0,a),0);ctx.globalAlpha=a;fillRR(x,y,w,h,26,'#121a2e');ctx.strokeStyle=tcol;ctx.lineWidth=5;rr(x,y,w,h,26);ctx.stroke();ctx.restore();ctx.save();ctx.translate(lerp(60,0,a),0);ctx.globalAlpha=a;fn(x+24,y+24,340,h-48);T2(title,x+390,y+h*.4,48,tcol,{w:900,align:'left'});T2(sub,x+390,y+h*.66,27,U.dim,{w:800,align:'left'});ctx.restore();}
function c7(t){const k=seg(t,T(11),E(11)+.3);vl(vcam(540,lerp(960,940,k),lerp(1,1.03,k)),1,()=>{space(t);
    T2('IT\'S EVERYWHERE',540,310,70,U.y,{w:900});
    card(60,380,960,330,ap(t,wi(11,'endless')-.3),'MARIO 64','ENDLESS STAIRS, 1996',(x,y,w,h)=>stairsIcon(x,y,w,h,t),t);
    card(60,750,960,330,ap(t,wi(11,'batpod')-.25),'THE BATPOD','THE DARK KNIGHT, 2008',(x,y,w,h)=>{fillRR(x,y,w,h,14,'#141c30');const c=[x+w/2,y+h*.72];ctx.save();ctx.strokeStyle='#3a4560';ctx.lineWidth=20;ctx.beginPath();ctx.arc(c[0],c[1],130,3.3,6.1);ctx.stroke();ctx.strokeStyle=U.red;ctx.lineWidth=20;ctx.beginPath();ctx.arc(c[0],c[1],130,5.2,6.1);ctx.stroke();ctx.restore();const a=-.42+Math.sin(t*14)*.03;line(c[0],c[1],c[0]+Math.cos(a)*120,c[1]+Math.sin(a)*120,10,U.y);circ(c[0],c[1],18,U.ink);chip('NEVER SHIFTS GEAR',x+w/2,y+h-22,{size:20});},t,U.red);
    card(60,1120,960,330,ap(t,wi(11,'dunkirk')-.25),'DUNKIRK','SCRIPT BUILT ON IT, 2017',(x,y,w,h)=>{fillRR(x,y,w,h,14,'#141c30');spectro(x+8,y+10,w-16,h-20,t,{lw:6,span:10});},t,U.B);});}
function c8(t){const s2=t>=T(13)-.05,k=seg(t,T(12),E(13));const cx=540,cy=740,R=350;vl(vcam(540,lerp(960,930,k),lerp(1,1.05,k)),1,()=>{space(t,{c0:'#0a0614',c1:'#160c2a'});
    const on=ap(t,wi(12,'half')-.2);ring(cx,cy,R,{hot:on>.5?[0,6]:[0]});
    if(on>0){const a=seg(t,wi(12,'half')-.1,wi(12,'circle')+.5);arcTo(cx,cy,R-70,-1.571,1.571,U.grn,a);arcTo(cx,cy,R-70,-1.571,-4.712,U.red,a);}
    if(s2){T2('6 STEPS',cx+150,cy,34,U.grn,{w:900,a:ap(t,T(13))});T2('6 STEPS',cx-150,cy,34,U.red,{w:900,a:ap(t,T(13))});
      const g=ap(t,wi(13,'guess')-.15);popT('?',cx,cy-90,150,U.y,t,wi(13,'guess')-.15);}
    me2({x:540,y:1890,h:430,brow:'worried',mouth:s2?'frown':'flat',look:{x:0,y:-1}});});}
function c9(t){const k=seg(t,T(14),E(14)+.3);const r=wi(14,'rise'),f=wi(14,'fall');vl(vcam(540,lerp(960,930,k),lerp(1,1.05,k)),1,()=>{space(t);
    T2('TRITONE',540,290,110,U.y,{w:900,stroke:10,a:ap(t,wi(14,'tritone')-.2)});T2('PARADOX',540,410,110,U.y,{w:900,stroke:10,a:ap(t,wi(14,'paradox')-.2)});
    speaker(540,720,.55,.5+.5*Math.sin(t*12));chip('SAME 2 NOTES',540,930,{size:36,a:ap(t,wi(14,'same')-.2)});
    me2({x:270,y:1890,h:560,brow:'flat',mouth:t>r?'smile':'flat',look:{x:.8,y:-.5}});
    toon({x:810,y:1890,h:560,jacket:'#7a3a5a',hat:'cap',hatCol:'#3a8a6a',stripe:false,skin:'#b98560',browCol:'#2a1a12',brow:'flat',mouth:t>f?'o':'flat',look:{x:-.8,y:-.5}});
    arrow(120,1180,120,860,22,U.grn,ap(t,r-.15),56);T2('RISE',260,1020,62,U.grn,{w:900,a:ap(t,r-.15),stroke:8});
    arrow(960,860,960,1180,22,U.red,ap(t,f-.15),56);T2('FALL',820,1020,62,U.red,{w:900,a:ap(t,f-.15),stroke:8});});}
function c10(t){const end=ap(t,T(16)-.1);const p=Math.max(toneOn(t,0),toneOn(t,1));vl(vcam(540,lerp(960,940,seg(t,T(15),TL.total)),1.0+.05*seg(t,T(15),TL.total)),1,()=>{space(t,{c0:'#070512',c1:'#14103a'});
    const q=p?(.5+.5*Math.sin(t*50)):0;glow(540,1460,430+60*p,'rgba(255,201,60,1)',.08+.22*p);speaker(540,1470,1.0,q);
    for(let i=0;i<3;i++){const u=fract(t*.8+i/3);if(p){ctx.save();ctx.strokeStyle=U.y;ctx.lineWidth=8;ctx.globalAlpha=(1-u)*.6;ctx.beginPath();ctx.arc(540,1500,240+u*300,0,6.283);ctx.stroke();ctx.restore();}}
    const a=1-end;if(a>0){T2('LISTEN',540,500,130,U.y,{w:900,stroke:12,a});
      [[300,0],[780,1]].forEach(([x,w])=>{const on=toneOn(t,w);ctx.save();ctx.globalAlpha=a;fillRR(x-160,640,320,200,26,on?U.y:'rgba(255,255,255,.08)');T2('TONE '+(w+1),x,740,58,on?'#14110a':U.dim,{w:900});ctx.restore();});arrow(470,740,610,740,12,U.ink,a*.7,32);}
    });}
const SCENES={c1,c2,c3,c4,c5,c6,c7,c8,c9,c10};
const FADES={};
const CAPY={c1:.5,c2:.8,c3:.84,c4:.75,c5:.11,c6:.86,c7:.86,c8:.73,c9:.64,c10:.58};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const s=Math.floor(t+6);const chips=[{k:'RISING FOR',v:`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`},{k:'HIGHER BY',v:'0 Hz',hot:true}];
  const tag={c1:'REAL SCIENCE',c2:'SHEPARD, 1964',c3:'THE TRICK',c4:'THE RULES',c5:'THE ILLUSION',c6:'THE SHAPE OF PITCH',c7:'IN THE WILD',c8:'THE WEIRD PART',c9:'DEUTSCH, 1986',c10:'YOUR EARS'}[sc];
  return{chips,tag,tagRed:false};}
