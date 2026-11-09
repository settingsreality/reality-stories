// ===================== 52 Hertz: places and things (v2, 1080x1920) =====================
const HZ={sea0:'#0a2740',sea1:'#061a2e',sea2:'#04101f',gold:'#ffc93c',red:'#ff4d3d',mint:'#5cf2a2',cream:'#f1ebdd',wh:'#1a3a55',whD:'#0f2840',whL:'#2f5a7c'};
function me(o){toon(Object.assign({jacket:'#1e6f78',pants:'#141a2a',hat:'beanie',hatCol:'#f0683f',tag:'WATCH',skin:'#e9b896',browCol:'#4a2e1f',stripe:false},o));}
function ines(o){toon(Object.assign({jacket:'#7a3b2e',pants:'#141a2a',hat:'cap',hatCol:'#1a2238',tag:'INES',skin:'#b98560',browCol:'#2a1a12',stripe:false},o));}
function headset(cx,cy,r){ctx.strokeStyle='#e8e4d8';ctx.lineWidth=r*.12;ctx.beginPath();ctx.arc(cx,cy,r*1.08,Math.PI*1.08,Math.PI*1.92);ctx.stroke();for(const s of[-1,1]){fillRR(cx+s*r*1.05-r*.2,cy-r*.28,r*.4,r*.62,r*.12,'#2a2f3a');fillRR(cx+s*r*1.05-r*.12,cy-r*.18,r*.24,r*.42,r*.08,'#5cf2a2');}}
// sea cross-section: wl = waterline y
function seaBack(t,wl=620){ctx.fillStyle=vgrad(-100,wl,[[0,'#040814'],[1,'#0a1a33']]);ctx.fillRect(-100,-100,1280,wl+100);
  const R=rng(9);for(let i=0;i<70;i++){const x=R()*1080,y=R()*wl*.9,a=.25+R()*.6;circ(x,y,1+R()*2.4,'#dfe8ff',a*(.7+.3*Math.sin(t*2+i)));}
  ctx.fillStyle=vgrad(wl,1960,[[0,HZ.sea0],[.5,HZ.sea1],[1,HZ.sea2]]);ctx.fillRect(-100,wl,1280,1400);
  ctx.strokeStyle='rgba(170,220,255,.55)';ctx.lineWidth=5;ctx.beginPath();for(let x=-100;x<=1180;x+=20){const y=wl+Math.sin(x*.012+t*1.4)*7+Math.sin(x*.03+t*.8)*4;x===-100?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();
  ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const x=120+i*180+Math.sin(t*.3+i)*40;ctx.fillStyle=`rgba(90,170,220,${.035})`;ctx.beginPath();ctx.moveTo(x-30,wl);ctx.lineTo(x+40,wl);ctx.lineTo(x+200,1500);ctx.lineTo(x-200,1500);ctx.fill();}ctx.restore();}
// research boat, side view. x,y = centre of waterline; lit 0..1
function boat(t,x,y,s,lit=1){ctx.save();ctx.translate(x,y+Math.sin(t*1.1)*5);ctx.scale(s,s);ctx.rotate(Math.sin(t*.8)*.012);
  poly([-290,-46,300,-46,250,44,-240,44],'#c9d3dd');poly([-290,-46,300,-46,292,-30,-284,-30],'#e85a3b');
  fillRR(-120,-176,240,132,10,'#e8ecef');fillRR(-70,-250,130,76,8,'#dfe4e8');
  for(let i=0;i<4;i++)fillRR(-100+i*52,-150,38,44,5,lit>.5?'#ffe2a0':'#233040');fillRR(-54,-234,96,38,5,lit>.5?'#ffe2a0':'#233040');
  line(-210,-46,-210,-210,9,'#46525e');line(-210,-210,-290,-210,8,'#46525e');line(-290,-210,-290,-46,6,'rgba(190,200,210,.6)');
  line(20,-250,20,-330,6,'#46525e');circ(20,-336,8,lit>.5?'#ff5f4c':'#333');
  if(lit>0){glow(0,-120,300,'rgba(255,220,150,1)',.25*lit);circ(20,-336,26,'#ff5f4c',.18*lit);}
  ctx.restore();}
// a blue-whale silhouette facing left. x,y centre, s scale. o.f flip, o.eye glow 0..1
function whale(x,y,s,o={}){const C=o.col||HZ.wh,D=o.dk||HZ.whD;ctx.save();ctx.translate(x,y);ctx.scale((o.f?-1:1)*s,s);ctx.rotate(o.r||0);
  ctx.fillStyle=C;ctx.beginPath();ctx.moveTo(-430,-10);ctx.bezierCurveTo(-360,-90,-140,-112,60,-82);ctx.bezierCurveTo(220,-62,360,-30,470,-14);ctx.bezierCurveTo(360,16,210,70,40,86);ctx.bezierCurveTo(-160,112,-370,78,-430,-10);ctx.fill();
  poly([470,-14,560,-96,600,-82,538,-22,600,44,564,56],C);
  ctx.fillStyle=D;ctx.beginPath();ctx.moveTo(-418,10);ctx.bezierCurveTo(-300,56,-120,96,40,86);ctx.bezierCurveTo(-140,108,-360,84,-418,10);ctx.fill();
  poly([-90,60,-30,70,-120,190,-180,170],D);
  ctx.strokeStyle='rgba(200,230,255,.13)';ctx.lineWidth=4;for(let i=0;i<7;i++){ctx.beginPath();ctx.moveTo(-390+i*44,18+i*7);ctx.quadraticCurveTo(-310+i*40,62+i*5,-250+i*46,74+i*2);ctx.stroke();}
  const e=o.eye??0;if(e>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(-320,-24,120,'rgba(255,245,200,1)',.5*e);ctx.restore();circ(-320,-24,17,'#fff8e0',e);circ(-320,-24,6,'#101218',e);}
  ctx.restore();}
function rings(x,y,t,n,R,col='92,242,162',a=.6){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<n;i++){const q=fract(t*.45+i/n);ctx.strokeStyle=`rgba(${col},${a*(1-q)})`;ctx.lineWidth=7*(1-q)+1;ctx.beginPath();ctx.arc(x,y,20+q*R,0,7);ctx.stroke();}ctx.restore();}
// ---------- spectrogram screen ----------
function spectro(t,o={}){const x0=o.x??80,y0=o.y??300,w=o.w??920,h=o.h??820;fillRR(x0-20,y0-20,w+40,h+40,24,'#1b1f27');fillRR(x0,y0,w,h,12,'#040b13');
  ctx.save();rr(x0,y0,w,h,12);ctx.clip();const R=rng(4);for(let i=0;i<280;i++){const xx=x0+R()*w,yy=y0+R()*h;ctx.fillStyle=`rgba(40,120,160,${R()*.16})`;ctx.fillRect(xx,yy,R()*26+6,3);}
  for(let k=0;k<=5;k++){const y=y0+k/5*h;line(x0,y,x0+w,y,1.5,'rgba(120,190,255,.13)');}
  const yOf=f=>y0+h-(f/80)*h;
  text('80 HZ',x0+18,y0+42,'500 28px PM','rgba(190,240,255,.65)','left');text('0',x0+18,y0+h-16,'500 28px PM','rgba(190,240,255,.65)','left');
  const lines=o.lines??[1];lines.forEach((a,idx)=>{if(a<=0)return;const f=52+(o.off?o.off[idx]:0),y=yOf(f),col=idx===0?HZ.mint:HZ.red;ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<80;i++){const xx=x0+w-i*14-(t*30%14);const am=.5+.5*Math.sin(xx*.02+t+idx*2);ctx.fillStyle=col;ctx.globalAlpha=a*am;ctx.fillRect(xx,y-5,11,10);}ctx.globalAlpha=1;ctx.restore();});
  text('52 HZ',x0+w-18,yOf(52)-22,'900 44px MS',HZ.gold,'right');
  if(o.below)o.below(x0,y0,w,h);ctx.restore();
  ctx.strokeStyle='rgba(120,190,255,.4)';ctx.lineWidth=4;rr(x0,y0,w,h,12);ctx.stroke();}
// ---------- rules card ----------
const RULES=[["FIFTY-TWO?","LOG IT."],["NEVER","ANSWER IT."],["TWO VOICES:","KILL THE ENGINE.","GO DARK."]];
function rulesCard(t,o={}){const cy=o.cy??780,s=o.s??1;fillAll('#07080b');glow(280,1680,520,'rgba(90,190,220,1)',.12);ctx.save();ctx.translate(540,cy);ctx.scale(s,s);ctx.rotate(-.025);ctx.fillStyle='rgba(0,0,0,.45)';rr(-400,-470,820,960,16);ctx.fill();
  fillRR(-410,-480,820,960,14,HZ.cream);for(let k=0;k<17;k++)line(-380,-330+k*48,380,-330+k*48,2,'rgba(90,120,170,.14)');ctx.globalAlpha=.75;fillRR(-330,-505,150,48,4,'#d8ceb0');fillRR(180,-505,150,48,4,'#d8ceb0');ctx.globalAlpha=1;
  text('NIGHT WATCH',-330,-360,'900 76px MS','#1b1d23','left');line(-330,-336,170,-344,7,'#1b1d23');
  for(let r=0;r<3;r++){const k=o.reveal?o.reveal[r]:1;if(k<=0)continue;const y0=-245+r*205;ctx.save();ctx.beginPath();ctx.rect(-380,y0-60,760*clamp(k*1.15),210);ctx.clip();text(`${r+1}.`,-330,y0,'900 52px MS','#1b1d23','left');
    RULES[r].forEach((s2,j)=>text(s2,-250,y0+j*58,'800 44px MS',j===RULES[r].length-1?'#a3261b':'#1b1d23','left'));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle='#e0362a';ctx.lineWidth=9;ctx.lineCap='round';ctx.beginPath();ctx.ellipse(10,y0+50,420,120,-.03,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  text('— Ines',290,430,'800 40px MS','#3b3d44');ctx.restore();}
// ---------- radar: boat at centre, dots converging ----------
function radar(t,o={}){const cx=540,cy=o.cy??800,R=o.R??470;fillAll('#05090f');glow(cx,cy,R+300,'rgba(60,160,180,1)',.12);circ(cx,cy,R+10,'#0a1a24');circ(cx,cy,R,'#06141c');ctx.strokeStyle='rgba(92,242,162,.35)';ctx.lineWidth=3;for(const q of[.25,.5,.75,1]){ctx.beginPath();ctx.arc(cx,cy,R*q,0,7);ctx.stroke();}line(cx-R,cy,cx+R,cy,2,'rgba(92,242,162,.25)');line(cx,cy-R,cx,cy+R,2,'rgba(92,242,162,.25)');
  const a=t*1.6;ctx.save();ctx.translate(cx,cy);ctx.rotate(a);ctx.globalCompositeOperation='lighter';const g=ctx.createConicGradient?ctx.createConicGradient(-.9,0,0):null;if(g){g.addColorStop(0,'rgba(92,242,162,0)');g.addColorStop(.14,'rgba(92,242,162,.32)');g.addColorStop(.15,'rgba(92,242,162,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,0,7);ctx.fill();}ctx.restore();
  const n=o.n??40;const q=o.q??0;const R2=rng(21);for(let i=0;i<n;i++){const ang=R2()*6.283,d0=.45+R2()*.5,d=lerp(d0,.12+R2()*.1,q);circ(cx+Math.cos(ang)*d*R,cy+Math.sin(ang)*d*R,11,HZ.red);glow(cx+Math.cos(ang)*d*R,cy+Math.sin(ang)*d*R,40,'rgba(255,70,50,1)',.3);}
  if(o.whale!=null){const ang=o.whale,d=.82;circ(cx+Math.cos(ang)*d*R,cy+Math.sin(ang)*d*R,14,HZ.mint);label('52',cx+Math.cos(ang)*d*R,cy+Math.sin(ang)*d*R-40,{font:'900 34px MS',bg:HZ.mint,col:'#06140c',h:50});}
  fillRR(cx-34,cy-16,68,32,8,HZ.gold);label('US',cx,cy+56,{font:'900 38px MS',bg:HZ.gold,col:'#14110a',h:56});
  if(o.arrow>0){ctx.save();ctx.globalAlpha=o.arrow;const R3=rng(21);for(let i=0;i<n;i+=2){const ang=R3()*6.283;R3();R3();const r0=R*.82,r1=R*.34;line(cx+Math.cos(ang)*r0,cy+Math.sin(ang)*r0,cx+Math.cos(ang)*r1,cy+Math.sin(ang)*r1,3,'rgba(255,120,100,.5)');}ctx.restore();}}
// ---------- the North Pacific chart ----------
function chart(t,o={}){fillAll('#0a1420');const y0=300,h=950;fillRR(50,y0,980,h,18,'#0f2233');ctx.save();rr(50,y0,980,h,18);ctx.clip();
  for(let i=1;i<12;i++)line(50+i*82,y0,50+i*82,y0+h,1.2,'rgba(150,200,255,.09)');for(let j=1;j<12;j++)line(50,y0+j*82,1030,y0+j*82,1.2,'rgba(150,200,255,.09)');
  poly([50,y0,50,y0+700,150,y0+560,230,y0+380,330,y0+230,380,y0+90,330,y0,],'#2a3b2f');poly([1030,y0,1030,y0+820,960,y0+700,900,y0+460,840,y0+300,720,y0+160,640,y0+90,520,y0],'#2a3b2f');
  ctx.font='900 34px MS';ctx.fillStyle='rgba(220,235,200,.55)';ctx.textAlign='left';ctx.fillText('ASIA',76,y0+90);ctx.textAlign='right';ctx.fillText('N. AMERICA',1010,y0+640);text('NORTH PACIFIC',540,y0+h-50,'800 30px MS','rgba(190,220,255,.5)');
  const LANES=[[[160,y0+520],[420,y0+390],[700,y0+410],[900,y0+520]],[[250,y0+340],[470,y0+250],[720,y0+300],[860,y0+370]],[[120,y0+650],[430,y0+640],[720,y0+620],[960,y0+680]]];
  const sp=(a,u)=>{const n=a.length-1,x=clamp(u)*n,i=Math.min(n-1,Math.floor(x)),f=x-i;return[lerp(a[i][0],a[i+1][0],f),lerp(a[i][1],a[i+1][1],f)];};
  const ta=o.track??1,lk=o.lanes??0;
  LANES.forEach((L,j)=>{if(lk>0){ctx.globalAlpha=lk;ctx.strokeStyle='rgba(255,201,60,.8)';ctx.lineWidth=7;ctx.setLineDash([22,16]);ctx.beginPath();for(let k=0;k<=40;k++){const[p,q]=sp(L,k/40);k?ctx.lineTo(p,q):ctx.moveTo(p,q);}ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;}});
  const n=Math.max(3,Math.floor(ta*100));ctx.strokeStyle=HZ.mint;ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();LANES.forEach((L,j)=>{const lim=j===0?ta*3:ta*3-j;if(lim<=0)return;const u=clamp(lim);let first=true;for(let k=0;k<=30;k++){const[p,q]=sp(L,k/30*u);first?ctx.moveTo(p,q+(j*6)):ctx.lineTo(p,q+(j*6));first=false;}});ctx.stroke();
  if(ta>0){const[p,q]=sp(LANES[0],clamp(ta*3));circ(p,q,16,HZ.mint);glow(p,q,70,'rgba(92,242,162,1)',.5);}ctx.restore();ctx.strokeStyle='rgba(120,190,255,.3)';ctx.lineWidth=4;rr(50,y0,980,h,18);ctx.stroke();}
function shipIcon(x,y,s,c){poly([x-32*s,y,x+32*s,y,x+22*s,y+18*s,x-22*s,y+18*s],c);fillRR(x-12*s,y-18*s,24*s,18*s,3,c);}
