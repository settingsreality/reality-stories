// ===================== How Time Works: scenes (1920x1080) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(x.w.replace(/[^A-Za-z0-9.'-]/g,'').toLowerCase().replace(/[.]$/,'')===s.toLowerCase()){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.45)=>ss(seg(t,a,a+d));  // appear
const CH=[[0,'00','How time works'],[4,'01','The one rule'],[9,'02','The light clock'],[15,'03','Proof from the sky'],[20,'04','Space squeezes too'],[23,'05','The twin paradox'],[28,'06','Two travelers'],[37,'07','Gravity bends time'],[43,'08','No universal now']];
function chapter(t){let c=CH[0];for(const x of CH)if(t>=T(x[0])-1.2)c=x;return{n:c[1],t:c[2],card:c[0]>0,at:T(c[0])-1.1};}
const FADES={};

// ---------- 00: your head ages faster than your feet ----------
function h0(t){bgGrid(t);const k=seg(t,0,E(1));personA(820,1000,820,{brow:'flat',mouth:'smile',look:{x:.6,y:-.2}});
  const dt=t*1.0,head=dt*(1+3e-3*ap(t,.3,2)),feet=dt;
  for(const[y,lab,v,col]of[[300,'HEAD',head,C.y],[880,'FEET',feet,C.teal]]){line(1000,y,1180,y,3,'rgba(255,255,255,.25)');
    fillRR(1200,y-70,520,140,22,'rgba(12,16,28,.92)');T2(lab,1240,y-34,26,col,{align:'left'});T2(v.toFixed(9)+' s',1240,y+22,52,C.ink,{align:'left',f:'PM',w:500});}
  chip('EXAGGERATED A TRILLION TIMES',1460,170,{size:22,a:ap(t,1.2)});const g=ap(t,wi(1,'lifetime')-.2);if(g>0)chip('LIFETIME GAP: < 1 MILLIONTH OF A SECOND',1460,590,{a:g,bg:C.y,col:'#14110a',size:30});}
function h1(t){bgGrid(t,{stars:true});const a=ap(t,T(2)-.2,.6);T2('HOW TIME WORKS',960,300,120,C.ink,{w:900,a});
  const items=[[560,'SPEED',wi(2,'moving')],[960,'GRAVITY',wi(2,'heavy')],[1360,'WARP DRIVES',wi(3,'warp')]];
  items.forEach(([x,s,at],j)=>{const k=ap(t,at-.3);if(k<=0)return;ctx.save();ctx.globalAlpha=k;fillRR(x-170,560,340,260,28,'rgba(255,255,255,.05)');
    if(j===0)rocket(x,670,.7,{flame:1,t});if(j===1){circ(x,690,70,'#3a4f86');ell(x,690,120,24,-.2,'rgba(255,201,60,.0)');ctx.strokeStyle=C.y;ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(x,690,120,28,-.2,0,7);ctx.stroke();}
    if(j===2){ctx.strokeStyle=C.teal;ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(x,690,110,70,0,0,7);ctx.stroke();rocket(x,690,.35,{});}
    T2(s,x,780,34,C.ink);ctx.restore();});}

// ---------- 01: the one rule ----------
function r1(t){bgGrid(t,{dx:-t*300});const tx=lerp(-200,700,seg(t,T(4),E(5)));
  // ground + rails
  fillRR(-50,780,2020,20,4,'#2a3350');for(let x=-((t*600)%120);x<1960;x+=120)fillRR(x,800,60,10,3,'#1d243a');
  // train
  fillRR(tx-420,560,620,220,26,'#2f6fd6');for(let i=0;i<4;i++)fillRR(tx-390+i*140,600,100,80,10,'#cfe3ff');circ(tx-320,790,34,'#141821');circ(tx+80,790,34,'#141821');
  personA(tx+140,780,250,{look:{x:1,y:0},armR:[1.6,0]});
  const th=wi(4,'throw');const bk=seg(t,th,th+3);if(t>th){const bx=tx+200+bk*900;circ(bx,620,22,C.o);}
  const a=ap(t,wi(5,'adds')-.2);chip('TRAIN 100 km/h',tx-110,500,{a:ap(t,T(5))});if(a>0){chip('BALL 20 km/h',tx+400+bk*600,560,{a});chip('= 120 km/h',tx+420+bk*600,450,{a,bg:C.y,col:'#14110a'});}
  const b=ap(t,wi(5,'light')-.1);if(b>0)T2("LIGHT DOESN'T DO THAT",960,220,80,C.red,{a:b,w:900});}
function r2(t){bgGrid(t,{stars:true,dx:-t*80,grid:false});const k=seg(t,T(6),E(7));rocket(560,520,1.1,{flame:1,t});chip('ROCKET: 0.5 c',560,380,{});
  const f=wi(6,'flashlight');const pk=seg(t,f,f+2.2);if(t>f){const px=780+pk*1100;ctx.save();ctx.globalCompositeOperation='lighter';line(780,520,px,520,10,'rgba(255,214,90,.55)');ctx.restore();photon(px,520,14);}
  const s=ap(t,wi(6,'same')-.3);if(t>wi(6,'one')-.2){T2('1.5 c',1500,380,64,C.dim,{a:ap(t,wi(6,'one')-.2)});if(s>0)line(1430,385,1570,375,8,C.red);}
  if(s>0)chip('LIGHT: 1 c',1500,660,{a:s,bg:C.y,col:'#14110a',size:40});
  const ev=ap(t,T(7));if(ev>0){[[300,860,'STANDING STILL'],[960,860,'RUNNING'],[1620,860,'ON A ROCKET']].forEach(([x,y,s2],j)=>{const kk=ap(t,T(7)+j*.4);fillRR(x-260,y-80,520,160,20,'rgba(12,16,28,.92)');
    T2(s2,x,y-34,26,C.dim,{a:kk});T2('299,792 km/s',x,y+20,50,C.y,{a:kk,f:'PM',w:500});});}}
function r3(t){bgGrid(t);const a=ap(t,T(8));T2('c NEVER CHANGES',960,330,96,C.y,{a,w:900});const b=ap(t,wi(8,'else')-.2);if(b>0)T2('SO SOMETHING ELSE HAS TO GIVE',960,470,56,C.ink,{a:b});
  const c=ap(t,wi(8,'time')-.15,.6);if(c>0){ctx.save();ctx.translate(960,760);ctx.scale(1+c*.35,1-c*.25);clockFace(0,0,150,t*12,{});ctx.restore();T2('TIME',960,960,70,C.o,{a:c,w:900});}}

// ---------- 02: the light clock ----------
function k1(t){bgGrid(t);const ship=ap(t,wi(10,'spaceship')-.3,.6);const k=(t-T(9))/1.2;
  if(ship>0){ctx.save();ctx.globalAlpha=ship;ctx.strokeStyle='rgba(233,237,245,.7)';ctx.lineWidth=6;rr(560,240,800,600,120);ctx.stroke();poly([1360,420,1520,540,1360,660],'rgba(233,237,245,.7)');ctx.restore();
    personA(820,820,420,{a:ship,look:{x:1,y:-.3}});}
  lightClock(1120,540,420,k,{w:180});const ticks=Math.max(0,Math.floor(k));chip(`TICKS: ${ticks}`,1120,250,{size:34});
  const tk=wi(10,'tick');if(t>tk){const p=fract((t-tk)/1.2);T2('TICK',1360,540,60,C.y,{a:1-p});}}
function k2(t){bgGrid(t,{dx:-t*60});const v=.6;const span=E(12)-T(11);const sp=1300/span;
  // Earth's own clock (left), standing still
  fillRR(90,200,330,640,24,'rgba(255,255,255,.04)');T2("EARTH'S CLOCK",255,170,26,C.teal);lightClock(255,520,420,(t-T(11))/1.2,{w:160});
  // the moving ship clock, seen from Earth: the photon draws a zigzag
  const x0=560,k=seg(t,T(11),E(12));const sx=x0+k*1300;const per=1.2/0.6;const h=420,y0=310,y1=730;
  ctx.save();ctx.strokeStyle='rgba(233,237,245,.55)';ctx.lineWidth=5;rr(sx-130,240,260,560,40);ctx.stroke();ctx.restore();
  fillRR(sx-80,y0-14,160,14,5,'#cfd8e8');fillRR(sx-80,y1,160,14,5,'#cfd8e8');
  const ph=(t-T(11))/per;const pts=[];for(let q=0;q<=ph;q+=.02){const xx=x0+(q*per/span)*1300;const yy=y1-Math.abs(1-2*(q%1))*h;pts.push([xx,yy]);}
  ctx.save();ctx.strokeStyle='rgba(255,214,90,.8)';ctx.lineWidth=5;ctx.beginPath();pts.forEach((p,j)=>j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.restore();
  photon(sx,y1-Math.abs(1-2*(ph%1))*h,12);
  const L=ap(t,wi(11,'longer')-.3);if(L>0){chip('LONGER PATH',sx+60,190,{a:L,bg:C.y,col:'#14110a'});}
  const sl=ap(t,wi(12,'slow')-.3);if(sl>0)T2("SHIP'S CLOCK: SLOW",1240,920,64,C.red,{a:sl,w:900});}
function k3(t){bgGrid(t);const items=[['HEARTBEAT',wi(13,'heartbeats')],['THOUGHTS',wi(13,'thoughts')],['AGING',wi(13,'aging')]];
  items.forEach(([s,at],j)=>{const x=420+j*540,a=ap(t,at-.2);if(a<=0)return;fillRR(x-220,260,440,420,30,'rgba(255,255,255,.05)');T2(s,x,320,36,C.ink,{a});
    const ph=(t-at)*.5;if(j===0){ctx.save();ctx.strokeStyle=C.red;ctx.lineWidth=6;ctx.beginPath();for(let q=0;q<=1;q+=.01){const xx=x-180+q*360,b=fract(q*2-ph);const yy=500-(b<.08?Math.sin(b/.08*Math.PI)*120:0);q?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);}ctx.stroke();ctx.restore();}
    if(j===1){for(let q=0;q<3;q++)circ(x-60+q*60,500+Math.sin(ph*3+q)*20,22,C.blue,a);}
    if(j===2)clockFace(x,500,110,ph*20,{});T2('SLOWER',x,630,34,C.y,{a});});
  const c=ap(t,wi(13,"can't")-.2);if(c>0)T2('NOTHING FEELS DIFFERENT ON BOARD',960,880,54,C.ink,{a:c});}
function k4(t){bgGrid(t);T2('1 YEAR ON THE SHIP  =  ? YEARS ON EARTH',960,170,50,C.dim,{a:ap(t,T(14))});
  const rows=[['50% c',1.15,'1.15',wi(14,'half')],['90% c',2.29,'2.3',wi(14,'ninety')],['99% c',7.09,'7',wi(14,'ninety-nine')],['99.99% c',70.7,'70',wi(14,'seventy')-1.2]];
  rows.forEach(([s,g,v,at],j)=>{const a=ap(t,at-.2,.7);const y=300+j*170;T2(s,360,y+30,46,C.ink,{a:ap(t,at-.3),align:'right'});bar(420,y,1150,60,a*Math.log10(g*10)/Math.log10(707),j===3?C.o:C.y,{});if(a>.5)T2(v+' yrs',1600,y+30,48,C.ink,{align:'left',a:ss((a-.5)*2),w:900});});}

// ---------- 03: muons ----------
function sky(t,o={}){ctx.fillStyle=vgrad(0,1080,[[0,'#04060e'],[.7,'#12224a'],[1,'#3a5e9a']]);ctx.fillRect(-50,-50,2020,1180);
  ctx.fillStyle='#0d1a2c';ctx.beginPath();ctx.ellipse(960,2780,2400,1900,0,0,7);ctx.fill();fillRR(-50,880,2020,220,0,'#0b1422');
  for(let i=0;i<6;i++)line(-50,150+i*125,1970,150+i*125,1,'rgba(160,190,255,.06)');
  line(90,120,90,880,3,'rgba(233,237,245,.35)');for(let k=0;k<=15;k+=5){const y=lerp(880,120,k/15);line(80,y,100,y,3,'rgba(233,237,245,.5)');T2(k+' km',115,y,26,C.dim,{align:'left'});}}
function m1(t){sky(t);const hit=wi(16,'cosmic');const k=seg(t,hit-.4,hit+.2);if(t>hit-.4){const x=lerp(1500,980,k),y=lerp(-60,120,k);line(lerp(1700,1500,0),-120,x,y,6,'rgba(255,255,255,.7)');photon(x,y,10);}
  if(t>hit+.2){glow(980,120,180,'rgba(255,240,200,1)',.5*(1-seg(t,hit+.2,hit+1.4)));const R=rng(9);for(let i=0;i<14;i++){const a=R()*1.6+.8,d=seg(t,hit+.2,hit+2)*(200+R()*300);circ(980+Math.cos(a)*d,120+Math.sin(a)*d,5,C.blue,.7);}}
  const mu=ap(t,wi(16,'muons')-.3);if(mu>0){const y=lerp(140,300,seg(t,wi(16,'muons'),E(16)));photon(960,y,13,mu);chip('MUON',1060,y,{a:mu,bg:C.y,col:'#14110a',align:'left'});}
  const lt=ap(t,wi(16,'millionths')-.3);if(lt>0)chip('LIFETIME ≈ 2.2 MILLIONTHS OF A SECOND',960,560,{a:lt,size:34});}
function m2(t){sky(t);const k=seg(t,T(17),E(17)-1);const y=lerp(120,200,k);photon(960,y,13);
  const m=ap(t,wi(17,'six')-.3);if(m>0){line(1200,120,1200,200,6,C.y);T2('660 m',1240,160,40,C.y,{align:'left',a:m});dash(700,200,1500,200,4,C.red);T2('IT SHOULD DIE HERE',1100,250,40,C.red,{a:ap(t,wi(17,'die')-.3),align:'left'});}}
function m3(t){sky(t);const R=rng(17);for(let i=0;i<26;i++){const st=T(18)+R()*8,x=200+R()*1500;const k=seg(t,st,st+2.4);if(k<=0||k>=1)continue;const y=lerp(100,875,k);line(x,y-80,x,y,4,'rgba(255,214,90,.4)');photon(x,y,8);}
  fillRR(760,870,400,36,8,C.teal);T2('DETECTOR',960,935,26,C.ink);
  const c=ap(t,wi(18,'every')-.2);if(c>0)chip('≈ 1 PER cm² EVERY MINUTE',960,520,{a:c*(1-ap(t,T(19)-.2)),size:36});
  const s=ap(t,T(19));if(s>0){fillRR(560,330,800,300,30,'rgba(12,16,28,.92)');T2("THE MUON'S CLOCK, AS WE SEE IT",960,380,30,C.dim,{a:s});T2('2.2 μs  →  30+ μs',960,470,76,C.y,{a:s,w:900});T2('TIME SLOWED ~15×',960,560,36,C.ink,{a:ap(t,wi(19,'stretch')-.2)});}}

// ---------- 04: space squeezes ----------
function q1(t){bgGrid(t,{stars:true,grid:false});const a=ap(t,T(20));photon(960,380,40,a);personA(960,900,380,{a,hat:'helm',hatCol:C.y,jacket:C.y,brow:'flat',mouth:'smile'});chip('THE MUON',960,240,{a,bg:C.y,col:'#14110a'});
  clockFace(1350,450,110,t*20,{label:'MY CLOCK: NORMAL',labelCol:C.teal});const q=ap(t,wi(20,'how')-.2);if(q>0)T2('?',600,450,200,C.y,{a:q,w:900});}
function q2(t){sky(t);const s=ss(seg(t,wi(21,'squeezed')-.3,wi(21,'squeezed')+1.2));
  const top2=lerp(120,820,s);ctx.save();ctx.fillStyle='rgba(110,168,255,.10)';ctx.fillRect(-50,top2,2020,880-top2);for(let i=0;i<8;i++){const y=lerp(top2,880,i/8);line(-50,y,1970,y,3,'rgba(160,190,255,.35)');}ctx.restore();
  line(1500,top2,1500,880,8,C.y);T2(s<.5?'15 KM':'~1 KM',1540,(top2+880)/2,56,C.y,{align:'left',w:900});const top=top2;photon(960,top+10,13);
  const b=ap(t,T(22));if(b>0)chip('SLOWER TIME (OUR VIEW)  =  SHORTER DISTANCE (ITS VIEW)',960,300,{a:b,size:32});}

// ---------- 05: the twins ----------
function t1(t){bgGrid(t,{stars:true,grid:false});earth(300,820,180);personA(380,640,300,{look:{x:1,y:-.3},armR:[2.6,.2]});
  const st=wi(23,'flies');const k=seg(t,st,E(23));const rx=lerp(520,1500,ss(k));rocket(rx,lerp(600,420,ss(k)),.7,{flame:k>0&&k<1?1:0,t});star(1700,360,26);
  const d=ap(t,wi(23,'four')-.2);if(d>0){dash(500,300,1650,300,4,C.dim);chip('4 LIGHT-YEARS',1075,300,{a:d});}const v=ap(t,wi(23,'ninety-nine')-.2);if(v>0)chip('99.5% c',rx,520,{a:v,bg:C.y,col:'#14110a'});}
function t2(t){bgGrid(t);const a=ap(t,T(24)),b=ap(t,wi(24,'ship')-.2);
  personA(620,960,560,{hat:'beanie',hatCol:'#9aa0ab',brow:'worried',mouth:'flat',beard:a>.5?'#cfcac2':null});personA(1300,960,560,{brow:'flat',mouth:'smile'});
  chip('EARTH TWIN',620,250,{});chip('TRAVELER',1300,250,{});T2('8 YEARS',620,350,80,C.teal,{a,w:900});T2('< 10 MONTHS',1300,350,80,C.y,{a:b,w:900});}
function swDiag(t,o){// spacetime diagram: time up, space right
  const X0=700,Y0=880,H=720,Wd=600;line(X0,Y0,X0,Y0-H-30,4,C.dim);line(X0,Y0,X0+Wd+150,Y0,4,C.dim);T2('TIME',X0-30,Y0-H-30,32,C.dim,{align:'right'});T2('SPACE',X0+Wd+150,Y0+40,32,C.dim,{align:'right'});
  const k=o.k??1;line(X0,Y0,X0,Y0-H*k,10,C.teal);const turn=[X0+Wd*.995,Y0-H/2];
  const p=Math.min(k,.5)/.5;line(X0,Y0,lerp(X0,turn[0],p),lerp(Y0,turn[1],p),10,C.o);if(k>.5){const q=(k-.5)/.5;line(turn[0],turn[1],lerp(turn[0],X0,q),lerp(turn[1],Y0-H,q),10,C.o);}
  circ(X0,Y0,14,C.ink);circ(X0,Y0-H,14,C.ink);return{X0,Y0,H,Wd,turn};}
function t3(t){bgGrid(t);if(t<T(26)-.1){const a=ap(t,T(25));personA(620,960,500,{brow:'worried',mouth:'o'});arrow(820,600,1200,600,8,C.y,a);arrow(1200,700,820,700,8,C.teal,ap(t,wi(25,"earth's")-.3));T2('WHO IS MOVING?',960,250,70,C.ink,{a,w:900});return;}
  const g=swDiag(t,{k:1});const k=seg(t,wi(26,'turn')-.5,wi(26,'turn')+1.6);
  // the traveler's "now" lines: tilted one way going out, the other way coming back
  const out=1-ss(k);for(const[f,col]of[[.25,'rgba(255,201,60,.6)'],[.45,'rgba(255,201,60,.6)']]){}
  const tx=g.turn[0],ty=g.turn[1];const s1=.36,s2=-.36;const sl=lerp(s1,s2,ss(k));line(tx,ty,g.X0,ty+(tx-g.X0)*sl,5,C.y);
  const yE=ty+(tx-g.X0)*sl;circ(g.X0,yE,16,C.y);chip(`EARTH'S "NOW"`,g.X0-200,yE,{size:26});if(k>.3)T2('JUMPS YEARS AHEAD',1500,300,56,C.y,{a:ap(t,wi(26,'jump')-.3),w:900});
  chip('TURNAROUND',tx+170,ty,{size:26,bg:C.o,col:'#14110a'});}
function t4(t){bgGrid(t);const k=ss(seg(t,T(27)+.5,W(27,.6)));const g=swDiag(t,{k});
  if(ap(t,wi(27,'straight')-.2)>0){chip('8 YEARS',g.X0-120,g.Y0-g.H/2,{bg:C.teal,col:'#06201d'});}
  if(ap(t,wi(27,'detour')-.2)>0){chip('0.8 YEARS',g.turn[0]+170,g.turn[1]+120,{bg:C.o,col:'#14110a'});}
  const m=ap(t,wi(27,'most')-.2);if(m>0)T2('STRAIGHT LINE = MOST TIME',1450,200,46,C.y,{a:m,w:900});}

// ---------- 06: two travelers, two lines each (the owner's idea) ----------
function panel(x,y,title,col,o){fillRR(x-400,y,800,640,30,'rgba(255,255,255,.04)');T2(title,x,y+56,44,col,{w:900});
  const bw=560,bx=x-260;
  T2('DISTANCE',bx-20,y+170,26,C.dim,{align:'right'});bar(bx,y+150,bw,40,o.dist,col,{});T2(o.distLab||'',bx+bw*o.dist+20,y+170,30,C.ink,{align:'left'});
  T2(o.who+' TIME',bx-20,y+290,26,C.dim,{align:'right'});bar(bx,y+270,bw,40,o.time,col,{});T2(o.timeLab||'',bx+bw*o.time+20,y+290,30,C.ink,{align:'left'});
  T2('EARTH TIME',bx-20,y+390,26,C.dim,{align:'right'});bar(bx,y+370,bw,40,o.earth,C.teal,{});T2(o.earthLab||'',bx+bw*o.earth+20,y+390,30,C.ink,{align:'left'});
  if(o.gap>0){const x1=bx+bw*o.time,x2=bx+bw*o.earth;ctx.save();ctx.globalAlpha=o.gap;fillRR(x1,y+262,x2-x1,156,10,'rgba(255,90,72,.18)');ctx.restore();T2('THE GAP',(x1+x2)/2,y+470,40,C.red,{a:o.gap,w:900});}
  if(o.note)T2(o.note,x,y+580,30,col,{a:o.noteA??1});}
function a1(t){bgGrid(t);const a=ap(t,T(28)),b=ap(t,wi(28,'time')-.3);ctx.save();ctx.globalAlpha=a;
  panel(500,220,'TRAVELER A','#ff9a5a',{who:'A',dist:b,time:b,earth:b,distLab:'',timeLab:''});panel(1420,220,'TRAVELER B','#7fe0d6',{who:'B',dist:b,time:b,earth:b});ctx.restore();}
function a2(t){bgGrid(t);const c1=ap(t,wi(30,'four')-.2),c2=ap(t,wi(30,'five')-.2,.8),c3=ap(t,wi(30,'shrank')-.2,1.2);
  panel(500,220,'TRAVELER A','#ff9a5a',{who:'A',dist:lerp(1,.1,c3),distLab:c3>.5?'0.4 ly (A sees)':'4 ly',time:lerp(1,.1,c2),timeLab:c2>.5?'~5 months':'',earth:c1,earthLab:c1>.3?'~4 years':''});
  rocket(1400,500,.9,{flame:1,t});chip('99.5% c',1400,380,{bg:C.y,col:'#14110a'});star(1800,500,24);}
function a3(t){bgGrid(t);const g=ap(t,wi(31,'gap')-.3);panel(500,220,'TRAVELER A','#ff9a5a',{who:'A',dist:.1,distLab:'0.4 ly',time:.1,timeLab:'~5 months',earth:1,earthLab:'~4 years',gap:g});
  const h=ap(t,wi(31,'home')-.2);if(h>0){personA(1350,960,520,{a:h,brow:'worried',mouth:'o'});T2('EVERYONE ELSE: YEARS OLDER',1400,300,46,C.red,{a:h,w:900});}}
function warpGrid(t,cx,cy,o={}){// space grid squeezed ahead of the bubble (right), stretched behind (left)
  const str=o.str??1,g=u=>{if(Math.abs(u)<=260)return u;if(u>0){const s1=lerp(1,.35,str);return u<1000?260+(u-260)*s1:260+740*s1+(u-1000);}const s2=lerp(1,1.9,str);return u>-700?-260+(u+260)*s2:-260-440*s2+(u+700);};
  for(let i=-40;i<=40;i++){const u=i*60;const x=cx+g(u);if(x<-20||x>1940)continue;const dense=u>260&&u<1000;line(x,cy-380,x,cy+380,dense?3:2,`rgba(127,224,214,${dense?.4:.16})`);}
  for(let j=-5;j<=5;j++)line(cx-1700,cy+j*76,cx+1700,cy+j*76,1.5,'rgba(127,224,214,.08)');}
function b1(t){bgGrid(t,{grid:false,stars:true});const s=ap(t,T(32),1.2);warpGrid(t,960,560,{str:s});
  ctx.strokeStyle='rgba(127,224,214,.9)';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(960,560,230,150,0,0,7);ctx.stroke();glow(960,560,260,'rgba(127,224,214,1)',.12);rocket(960,560,.55,{});
  const q=ap(t,wi(32,'squeezes')-.2),r=ap(t,wi(32,'stretches')-.2),c=ap(t,wi(32,'calm')-.2);if(q>0)chip('SPACE SQUEEZED',1450,260,{a:q,bg:'#7fe0d6',col:'#06201d'});if(r>0)chip('SPACE STRETCHED',470,260,{a:r});if(c>0)chip('CALM BUBBLE',960,820,{a:c});}
function b2(t){bgGrid(t,{grid:false,stars:true});const k=seg(t,T(33),E(34));warpGrid(t,960-k*0,560,{str:1});ctx.strokeStyle='rgba(127,224,214,.9)';ctx.lineWidth=6;ctx.beginPath();ctx.ellipse(960,560,330,220,0,0,7);ctx.stroke();
  personA(960,700,300,{brow:'flat',mouth:'smile',hat:'beanie'});const s=ap(t,wi(33,'still')-.2);if(s>0)chip('B: SITTING STILL',960,250,{a:s});
  if(t>T(34)-.2){clockFace(500,560,100,t*15,{label:"B'S CLOCK",labelCol:'#7fe0d6'});clockFace(1420,560,100,t*15,{label:"EARTH'S CLOCK",labelCol:C.teal});const m=ap(t,wi(34,'month')-.2);if(m>0)T2('1 MONTH = 1 MONTH',960,920,60,C.y,{a:m,w:900});}}
function b3(t){bgGrid(t);const s=ap(t,T(35),1);panel(1420,220,'TRAVELER B','#7fe0d6',{who:'B',dist:lerp(1,.1,s),distLab:s>.5?'squeezed for real':'',time:lerp(1,.1,ap(t,wi(35,'together')-.4,1)),timeLab:'',earth:lerp(1,.1,ap(t,wi(35,'together')-.4,1)),earthLab:'',note:'NO GAP',noteA:ap(t,wi(35,'gap')-.2)});
  panel(500,220,'TRAVELER A','#ff9a5a',{who:'A',dist:.1,distLab:'0.4 ly',time:.1,timeLab:'',earth:1,earthLab:'',gap:1});}
function b4(t){bgGrid(t);const a=ap(t,wi(36,'negative')-.3),b=ap(t,wi(36,'before')-.4);
  if(a>0){fillRR(260,300,620,420,30,'rgba(255,255,255,.05)');T2('NEGATIVE ENERGY',570,380,44,C.red,{a,w:900});T2('MAY NOT EXIST',570,450,34,C.dim,{a});circ(570,600,80,'#1b2236',a);T2('−E',570,600,70,C.red,{a,w:900});}
  if(b>0){fillRR(1040,300,620,420,30,'rgba(255,255,255,.05)');T2('FASTER THAN LIGHT?',1350,380,44,C.red,{a:b,w:900});T2('ARRIVE BEFORE YOU LEAVE',1350,450,34,C.dim,{a:b});clockFace(1350,610,80,-t*40,{});}}

// ---------- 07: gravity ----------
function wellGrid(cx,cy,depth){const P=(i,j)=>{const x=cx+i*70,yb=cy+j*30;const r=Math.hypot(i*70,j*30*2.2);return[x,yb+depth*Math.exp(-r*r/90000)];};ctx.strokeStyle='rgba(110,168,255,.3)';ctx.lineWidth=2;
  for(let i=-14;i<=14;i++){ctx.beginPath();for(let j=-9;j<=9;j++){const[x,y]=P(i,j);j===-9?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}
  for(let j=-9;j<=9;j++){ctx.beginPath();for(let i=-14;i<=14;i++){const[x,y]=P(i,j);i===-14?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}}
function g1(t){bgGrid(t,{grid:false});const a=ap(t,T(37));wellGrid(960,560,a*260);earth(960,560+a*200,130);
  const p=ap(t,T(38));if(p>0){personA(1500,940,520,{a:p});chip('HEAD: FASTER',1720,520,{a:p,bg:C.y,col:'#14110a'});chip('FEET: SLOWER',1720,900,{a:p});}}
function g2(t){bgGrid(t,{grid:false,stars:true});earth(760,560,170,{spin:t*.02});ctx.strokeStyle='rgba(233,237,245,.25)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(760,560,420,420,0,0,7);ctx.stroke();
  const an=t*.25;const sx=760+Math.cos(an)*420,sy=560+Math.sin(an)*420;fillRR(sx-40,sy-14,80,28,6,'#cfd8e8');fillRR(sx-90,sy-8,40,16,3,C.blue);fillRR(sx+50,sy-8,40,16,3,C.blue);
  const r1=ap(t,wi(39,'seven')-.3),r2=ap(t,wi(39,'forty-five')-.4),r3=ap(t,T(40));
  if(r1>0)chip('SPEED: −7 μs / day',1450,300,{a:r1,size:36});if(r2>0)chip('WEAKER GRAVITY: +45 μs / day',1450,410,{a:r2,size:36});if(ap(t,wi(39,'twenty')-.3)>0)chip('20,200 KM UP',760,90,{size:28});
  if(r3>0){chip('NET: +38 μs / day',1450,540,{a:r3,bg:C.y,col:'#14110a',size:40});}
  const d=ap(t,wi(40,'drift')-.3);if(d>0){fillRR(1180,660,560,300,26,'#dfe6d6');for(let i=0;i<6;i++)line(1180,700+i*45,1740,690+i*48,4,'#c6cfba');const px=1330+d*230;circ(1330,820,14,C.teal);dash(1330,820,px,820,5,C.red);circ(px,820,18,C.red);T2('~10 KM / DAY',1460,900,40,C.red,{a:d,w:900});}}
function g3(t){bgGrid(t);const a=ap(t,T(41));fillRR(760,180,400,760,60,'#11141c');fillRR(785,230,350,660,30,'#dfe6d6');for(let i=0;i<9;i++)line(785,260+i*70,1135,250+i*75,5,'#c6cfba');
  circ(960,560,22,C.blue);glow(960,560,80,'rgba(110,168,255,1)',.4*(.6+.4*Math.sin(t*4)));chip('RELATIVITY CORRECTED',1500,560,{a,bg:C.y,col:'#14110a',size:34});}
function g4(t){bgGrid(t,{grid:false,stars:true});const a=ap(t,T(42),.6);circ(820,540,200,'#000');ctx.strokeStyle='rgba(255,190,120,.9)';ctx.lineWidth=14;ctx.beginPath();ctx.ellipse(820,540,320,70,-.15,0,7);ctx.stroke();glow(820,540,420,'rgba(255,170,80,1)',.18);circ(820,540,200,'#000');
  clockFace(1130,640,70,(t-T(42))*.3,{label:'NEAR THE EDGE: 1 HOUR',labelCol:C.o});clockFace(1600,400,90,(t-T(42))*120,{label:'FAR AWAY: YEARS',labelCol:C.teal});}

// ---------- 08: no universal now ----------
function n1(t){bgGrid(t);const X0=960,Y0=900;line(X0-700,Y0,X0+700,Y0,3,C.dim);line(X0,Y0+20,X0,180,3,C.dim);T2('TIME',X0+20,180,28,C.dim,{align:'left'});
  const e1=[X0-380,560],e2=[X0+380,560];star(e1[0],e1[1],14,'#ff9a5a');star(e2[0],e2[1],14,'#7fe0d6');
  const a=ap(t,T(43)+.5);dash(X0-700,560,X0+700,560,6,`rgba(255,201,60,${.9*a})`);if(a>0)chip('YOUR "NOW"',X0-560,500,{a,size:26,bg:C.y,col:'#14110a'});
  const b=ap(t,T(44)+.4),sl=-.32*b;if(b>0){dash(X0-700,560-(-700)*sl,X0+700,560-700*sl,6,`rgba(127,224,214,${.9*b})`);chip(`THEIR "NOW"`,X0+520,560-520*sl-60,{a:b,size:26,bg:'#7fe0d6',col:'#06201d'});}
  const c=ap(t,wi(44,'neither')-.2);if(c>0)T2('NEITHER IS WRONG',960,1000,50,C.ink,{a:c,w:900});}
function n2(t){bgGrid(t);const R=rng(41);for(let i=0;i<12;i++){const x=200+(i%6)*300,y=330+Math.floor(i/6)*380;const sp=.3+R()*3;clockFace(x,y,90,t*sp*20,{face:'#f4f1ea'});}
  const a=ap(t,wi(45,'own')-.3);if(a>0)T2('EVERYONE CARRIES THEIR OWN CLOCK',960,900,52,C.y,{a,w:900});}
function n3(t){bgGrid(t,{grid:false,stars:true});const k=seg(t,T(46),E(46)+3);earth(420,1080,420);const rk=ss(seg(t,W(46,.2),E(46)+2));rocket(lerp(700,1500,rk),lerp(700,300,rk),.8,{flame:1,t});
  const q=ap(t,wi(46,'would')-.2,.6);if(q>0)T2('WOULD YOU GO?',1250,560,110,C.y,{a:q,w:900,stroke:10});}
const SCENES={h0,h1,r1,r2,r3,k1,k2,k3,k4,m1,m2,m3,q1,q2,t1,t2,t3,t4,a1,a2,a3,b1,b2,b3,b4,g1,g2,g3,g4,n1,n2,n3};
