// ===================== Olo, scene by scene (v2 vertical, How Time Works look) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(x.w.replace(/[^A-Za-z0-9']/g,'').toLowerCase()===s.toLowerCase()){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.4)=>ss(seg(t,a,a+d));
// cold open: the colour nobody has seen, already glowing on frame 1
function c1(t){space(t,{c0:'#03100e',c1:'#071a24'});
  T2('A NEW COLOR',540,300,96,U.ink,{w:900});
  const z=lerp(1,1.08,seg(t,0,E(0)));oloSwatch(540,700,520*z,440*z,t,{});
  T2('OLO',540,700,170*(1+.12*(1-ss(seg(t,wi(0,'olo')-.15,wi(0,'olo')+.25)))*(t>wi(0,'olo')-.15?1:0)),'#062a22',{w:900});
  chip("YOUR SCREEN CAN'T SHOW IT",540,1000,{size:30,bg:'rgba(12,16,28,.92)',a:ap(t,1.8)});
  // five people
  for(let i=0;i<5;i++){const a=ap(t,wi(0,'five')+i*.12,.3);if(a<=0)continue;ctx.save();ctx.globalAlpha=a;
    const x=140+i*200;me2({x,y:1820,h:300,jacket:['#2f4f7a','#6a3d7a','#3d6a52','#7a5a2f','#4a4f5a'][i],hat:i===2?'beanie':null,hatCol:'#f0683f',look:{x:(540-x)/600,y:-1},brow:'worried',mouth:'o',blink:fract(t*.3+i*.21)<.03?1:0});ctx.restore();}
  if(t>wi(0,'five'))chip('ONLY 5 PEOPLE',540,1440,{size:40,bg:U.y,col:'#14110a',a:ap(t,wi(0,'five'))});}
// how you see it: the rules card, then the laser
function c2(t){space(t);const eyeAt=wi(1,'eye')-.25;
  if(t<eyeAt){T2('HOW TO SEE OLO',540,300,64,U.y,{w:900});fillRR(110,390,860,560,30,'rgba(255,255,255,.06)');
    const R=[['1','BITE DOWN ON A PLATE','bite'],['2','HOLD PERFECTLY STILL','still'],['3','LET A LASER IN','laser']];
    R.forEach(([n,s,w],j)=>{const a=ap(t,wi(1,w)-.25);const y=500+j*170;ctx.save();ctx.globalAlpha=.25+.75*a;circ(190,y,44,a>.5?U.y:'rgba(255,255,255,.15)');T2(n,190,y,44,'#14110a',{w:900});T2(s,260,y,44,U.ink,{align:'left',w:900});ctx.restore();});
    // the bite plate guy
    me2({x:540,y:1830,h:380,brow:'worried',mouth:'grit',look:{x:0,y:-1}});return;}
  const k=ap(t,eyeAt,.3);eye(540,760,1.25,t,{beam:k,from:{x:1100,y:200},pupil:lerp(55,40,k)});
  if(k>0)chip('LASER',880,330,{size:34,bg:U.M,col:'#05140c',a:k});}
// three cones, then the mix
function c3(t){space(t);
  if(t<T(3)-.05){T2('YOUR EYE HAS 3 CONES',540,300,64,U.ink,{w:900});
    const C=[['S','SHORT','short',U.S,250],['M','MEDIUM','medium',U.M,540],['L','LONG','long',U.L,830]];
    for(const[k,name,w,col,x]of C){const a0=ap(t,wi(2,'cones')-.2),a1=ap(t,wi(2,w)-.15);const pop=1+.25*(1-ss(seg(t,wi(2,w)-.15,wi(2,w)+.25)))*(a1>0?1:0);
      coneCell(x,700,1.25*pop,col,{a:Math.max(.3,a0*.5,a1),fire:a1*(.6+.4*Math.sin(t*5+x))});T2(name,x,1000,40,col,{w:900,a:a1});T2(k,x,1060,32,U.dim,{a:a1});}
    me2({x:540,y:1860,h:300,look:{x:0,y:-1},brow:'flat',mouth:'o'});return;}
  // mixing: three meters drive a swatch
  T2('EVERY COLOR = A MIX',540,300,64,U.ink,{w:900});const ph=(t-T(3))*1.1;
  const s=clamp(.5+.5*Math.sin(ph*1.3+2)),m=clamp(.5+.5*Math.sin(ph*1.7)),l=clamp(.5+.5*Math.sin(ph*1.1+1));
  meter(220,860,420,s,U.S,'S');meter(380,860,420,m,U.M,'M');meter(540,860,420,l,U.L,'L');
  const col=`rgb(${Math.round(255*clamp(l*1.1-m*.2))},${Math.round(255*clamp(m*.9+l*.25-s*.1))},${Math.round(255*clamp(s*1.1))})`;
  glow(820,640,240,col,.4);fillRR(680,430,280,420,30,col);ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=4;rr(680,430,280,420,30);ctx.stroke();
  T2('=',620,640,90,U.ink,{w:900});chip('YOUR BRAIN',820,920,{size:28});}
// the overlap: M never fires alone
function c4(t){space(t);
  if(t<T(5)-.05){T2('THE OVERLAP',540,290,72,U.ink,{w:900});const sw=seg(t,wi(4,'any')-.3,E(4));const nm=lerp(470,600,ss(sw))+Math.sin(t*1.3)*6;
    const L1=wi(4,'also')-.2,hl=ap(t,L1);
    curves(110,420,860,440,{alpha:{S:.35,M:1,L:1},fill:{S:.05,M:.22,L:.12+.25*hl},lw:{L:8+6*hl}});
    if(t>wi(4,'any')-.4){const px=110+(nm-400)/300*860;line(px,400,px,880,6,'#fff');circ(px,880,14,'#fff');chip('LIGHT',px,370,{size:28,bg:'#fff',col:'#111'});
      meter(400,1650,240,resp('M',nm),U.M,'M');meter(680,1650,240,resp('L',nm),U.L,'L');}
    if(hl>0)stamp('ALSO HITS L',540,1290,hl,U.L,52);
    return;}
  // the signal you've never had
  T2('THE MISSING SIGNAL',540,290,64,U.ink,{w:900});const al=ap(t,wi(5,'alone')-.2);
  curves(110,420,860,440,{alpha:{S:lerp(.35,.08,al),M:1,L:lerp(1,.08,al)},fill:{M:.15+.3*al},lw:{M:8+8*al}});
  meter(260,1700,260,0,U.S,'S');meter(540,1700,260,lerp(.6,1,al),U.M,'M');meter(820,1700,260,lerp(.6,0,al),U.L,'L');
  if(al>0){glow(540,1450,200,U.oloG,.4*al);}
  stamp('NEVER IN NATURE',540,1290,ap(t,wi(5,'never')-.2),U.y,52,-.05);}
// Oz
function c5(t){space(t,{c0:'#04120c',c1:'#0a2418'});const oz=ap(t,wi(6,'oz')-.15,.25);
  chip('UC BERKELEY',540,300,{size:40,a:ap(t,T(6))});ozRig(540,760,1.05,t);
  me2({x:220,y:1860,h:330,jacket:'#e8ecf2',stripe:false,hat:null,look:{x:1,y:-.6},brow:'flat',mouth:'smile'});
  if(oz>0){ctx.save();ctx.translate(540,1450);ctx.scale(.6+.4*oz,.6+.4*oz);glow(0,0,320,'rgba(62,224,138,1)',.55*oz);T2('OZ',0,0,240,'#c8ffe0',{w:900,a:oz,stroke:10});ctx.restore();}}
// map the cones, then hit only the M cones
function c6(t){space(t,{c0:'#0b0610',c1:'#1a0c16'});const s1=T(8)-.05;
  if(t<s1){const k=seg(t,wi(7,'maps')-.2,wi(7,'single')+.6);T2('STEP 1: MAP EVERY CONE',540,280,54,U.y,{w:900});
    mosaic(540,800,1.0,t,{scanY:k<1?k:null,labelK:c=>ss(clamp((k-c.y/(19*46*.87))*8))});
    if(k>.3){chip('S',260,1420,{size:36,bg:U.S});chip('M',540,1420,{size:36,bg:U.M,col:'#05140c'});chip('L',820,1420,{size:36,bg:U.L});}
    return;}
  T2('STEP 2: HIT ONLY M',540,280,60,U.M,{w:900});const dr=(t-T(8));const ox=Math.sin(dr*1.3)*40,oy=Math.cos(dr*1.1)*26;
  const fire=t>wi(8,'fires')-.2;const hitN=fire?clamp((t-wi(8,'fires'))/(E(8)-wi(8,'fires'))):0;
  mosaic(540+ox,800+oy,1.0,t,{labelK:()=>1,hit:c=>c.k==='M'&&fire&&hash(c.ph*99)<hitN+.15?.5+.5*Math.sin(t*14+c.ph*30):0});
  // tracking crosshair
  ctx.strokeStyle='rgba(255,201,60,.9)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(540+ox,800+oy,90,0,7);ctx.stroke();line(540+ox-130,800+oy,540+ox+130,800+oy,3,'rgba(255,201,60,.7)');line(540+ox,800+oy-130,540+ox,800+oy+130,3,'rgba(255,201,60,.7)');
  chip('TRACKING',540,1420,{size:30,a:ap(t,wi(8,'follows')-.2)});}
// olo vs the most saturated colour in nature
function c7(t){space(t,{c0:'#03100e',c1:'#071a24'});const p=ap(t,wi(9,'pale')-.2,.6);
  oloSwatch(540,620,600,480,t,{});T2('OLO',540,620,130,'#062a22',{w:900});
  const nat=mixHex('#1fbf9c','#9cc9bf',p);fillRR(330,1340,420,300,30,nat);ctx.strokeStyle='rgba(255,255,255,.3)';ctx.lineWidth=4;rr(330,1340,420,300,30);ctx.stroke();
  T2('BEST IN NATURE',540,1690,34,U.dim,{w:900});if(p>0)stamp('PALE',540,1490,p,U.ink,70);
  me2({x:900,y:1860,h:260,look:{x:-1,y:-1},brow:'scared',mouth:'o'});}
// jitter test, then the code 010
function c8(t){space(t);const s2=T(11)-.05;
  if(t<s2){const v=ss(seg(t,wi(10,'vanished')-.3,wi(10,'vanished')+.6));const head=ap(t,wi(10,'inside')-.25);
    if(head<1){ctx.save();ctx.globalAlpha=1-head;T2('TEST: HIT RANDOM CONES',540,290,52,U.red,{w:900});
      mosaic(540,650,.62,t,{labelK:()=>1,hit:c=>hash(c.ph*77+Math.floor(t*8))<.3?.8:0});
      oloSwatch(540,1500,360,260,t,{sat:1-v});if(v>.5)T2('GONE',540,1500,80,'#2a2f33',{w:900,a:v});ctx.restore();}
    if(head>0){ctx.save();ctx.globalAlpha=head;// a head in profile with the colour inside
      ctx.fillStyle='#1f2a3c';ctx.beginPath();ctx.arc(540,700,260,0,7);ctx.fill();ctx.fillRect(420,880,240,260);
      ctx.beginPath();ctx.moveTo(780,640);ctx.lineTo(850,760);ctx.lineTo(780,790);ctx.fill();
      ctx.save();ctx.beginPath();ctx.arc(540,700,260,0,7);ctx.clip();oloSwatch(520,640,260,200,t,{r:100});ctx.restore();
      T2('ONLY IN HERE',540,1480,60,U.olo,{w:900});ctx.restore();}
    return;}
  T2('THE NAME',540,290,60,U.dim,{w:900});
  const D=[['0','L','long',U.L,0],['1','M','medium',U.M,1],['0','S','short',U.S,0]];const z0=wi(11,'zero'),o1=wi(11,'one'),z1=wi(11,'zero',1);
  D.forEach(([d,k,w,col,on],j)=>{const x=250+j*290;const a=ap(t,[z0,o1,z1][j]-.15,.25);const lit=ap(t,wi(11,w)-.2);
    fillRR(x-120,460,240,320,30,on&&lit>0?`rgba(62,224,138,${.2+.3*lit})`:'rgba(255,255,255,.06)');T2(d,x,620,200,on?U.M:U.ink,{w:900,a});
    T2(k,x,850,56,col,{w:900,a:lit});T2(on?'ON':'OFF',x,920,36,on?U.M:U.dim,{w:900,a:lit});});
  const o=ap(t,wi(11,'short')+.4,.5);if(o>0){T2('0 1 0  →  O L O',540,1470,72,U.y,{w:900,a:o});}}
// the question
function c9(t){space(t,{c0:'#03100e',c1:'#071a24'});oloSwatch(540,1180,380,260,t,{});T2('OLO',540,1180,100,'#062a22',{w:900});
  me2({x:540,y:1880,h:420,look:{x:.4,y:-1},brow:'worried',mouth:'o'});const b=ap(t,wi(12,'laser')-.3);
  if(b>0){ctx.save();ctx.globalAlpha=b;line(1100,1250,572,1530,12,'rgba(62,224,138,.35)');line(1100,1250,572,1530,4,'#c8ffe0');glow(572,1530,50,'rgba(62,224,138,1)',.8);ctx.restore();}}
const SCENES={c1,c2,c3,c4,c5,c6,c7,c8,c9};
const FADES={};
const CAPY={c2:.6,c4:.56,c6:.8,c7:.47,c8:.62,c9:.22};
function hud(t){const sc=sceneAt(t).id;const tag={c1:'REAL SCIENCE · 2025',c2:'THE OZ TEST',c3:'HOW COLOR WORKS',c4:'THE OVERLAP',c5:'UC BERKELEY',c6:'THE OZ LASER',c7:'WHAT THEY SAW',c8:'THE PROOF',c9:'REAL SCIENCE'}[sc];
  const chips=[{k:'NEW COLOR',v:'OLO'},{k:'SEEN BY',v:'5 PEOPLE'}];
  if(sc==='c4'&&t>wi(5,'never')-.2)chips.push({k:'M CONES ALONE',v:'NEVER',hot:true});
  if(sc==='c6'&&t>=T(8)-.05){const f=wi(8,'fires');const n=t<f?0:Math.round(1000*ss(clamp((t-f)/(wi(8,'thousand')+.4-f))));chips.push({k:'M CONES HIT',v:String(n)});}
  if(sc==='c8'&&t<T(11)-.05&&t>wi(10,'vanished')-.2)chips.push({k:'COLOR',v:'GONE',hot:true});
  return{chips,tag,tagRed:sc==='c8'&&t<T(11)};}
