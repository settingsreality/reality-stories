// ===================== How the Universe Ends, scene by scene (v2 vertical) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(x.w.replace(/[^A-Za-z0-9']/g,'').toLowerCase()===s.toLowerCase()){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.4)=>ss(seg(t,a,a+d));
// three little panels: freeze / rip / crunch
function panels(t,o={}){const P=[['FREEZE',U.ice,0],['RIP',U.red,1],['CRUNCH',U.org,2]];const hi=o.hi??-1;o.y=o.y??480;
  P.forEach(([name,col,k],j)=>{const x=40+j*345,y=o.y??380,w=310,h=640;const on=hi===j;
    fillRR(x,y,w,h,26,on?'rgba(255,255,255,.10)':'rgba(255,255,255,.04)');ctx.save();rr(x,y,w,h,26);ctx.clip();const cx=x+w/2,cy=y+h/2-30;
    if(k===0){for(let i=0;i<7;i++){const a=i*.9+t*.05,d=(60+i*28)*(1+fract(t*.08)*.4);galaxy(cx+Math.cos(a)*d*.8,cy+Math.sin(a)*d*1.2,34,a,{col:'#bfe6ff',a:.95-i*.08,glowCol:'rgba(143,216,255,1)'});}}
    if(k===1){galaxy(cx,cy,90,t*.3,{col:'#ffd0c8',spread:.5+.4*Math.sin(t*1.5),glowCol:'rgba(255,90,72,1)'});crack(x+20,cy-200,x+w-20,cy+220,7,1);}
    if(k===2){const q=fract(t*.35);for(let i=0;i<8;i++){const a=i*.785,d=(1-q)*200;galaxy(cx+Math.cos(a)*d*.7,cy+Math.sin(a)*d*1.2,28,a,{col:'#ffd9b0',a:.95,glowCol:'rgba(255,154,74,1)'});}glow(cx,cy,180,'rgba(255,180,90,1)',.7*q);circ(cx,cy,20*q,'#fff2d8',q);}
    ctx.restore();ctx.strokeStyle=on?col:'rgba(255,255,255,.12)';ctx.lineWidth=on?7:3;rr(x,y,w,h,26);ctx.stroke();T2(name,cx,y+h-60,46,col,{w:900});});}
function c1(t){space(t);T2('HOW THE UNIVERSE',540,300,70,U.ink,{w:900});T2('ENDS',540,395,100,U.y,{w:900});
  const w=wi(0,'winning');let hi=-1;if(t>w-.6){const k=Math.min(1,(t-(w-.6))/1.2);const steps=Math.floor(k*7);hi=steps%3;if(k>=1)hi=2;}
  panels(t,{hi});if(t>w+.6)T2('?',880,390,110,U.y,{w:900,a:ap(t,w+.6)});}
// dark energy pushing everything apart
function c2(t){space(t,{starA:.6});const k=seg(t,T(1),E(1)+.6);const s=lerp(.55,1.5,k*k);field(t,540,820,s,{});
  for(let i=0;i<8;i++){const a=i*.785;const r0=170*s,r1=r0+90;arrow(540+Math.cos(a)*r0,820+Math.sin(a)*r0,540+Math.cos(a)*r1,820+Math.sin(a)*r1,6,'rgba(255,201,60,.8)',ap(t,wi(1,'push')-.2));}
  const c=ap(t,wi(1,'dark')-.2);if(c>0)chip('DARK ENERGY ≈ 68% OF EVERYTHING',540,330,{a:c,bg:U.y,col:'#14110a',size:34});
  ctx.fillStyle='#1a2236';ctx.beginPath();ctx.ellipse(540,2180,900,560,0,0,7);ctx.fill();me2({x:540,y:1700,h:300,look:{x:0,y:-1},brow:'worried',mouth:'o'});}
function me2(o){toon(Object.assign({jacket:'#2f4f7a',hat:'beanie',hatCol:'#f0683f',stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}
// ending 1: the big freeze
function c3(t){const fade=seg(t,T(3),E(3));const dark=ss(seg(t,wi(4,'nothing')-.3,wi(4,'nothing')+1.2));
  space(t,{c0:'#04070e',c1:'#0a1830',starA:lerp(1,.15,fade)*(1-dark)});
  T2('ENDING 1',540,250,40,U.dim,{w:800,a:1-dark});T2('BIG FREEZE',540,330,100,U.ice,{w:900,a:1-dark});
  const s=lerp(1,2.6,seg(t,T(2),E(3)));field(t,540,900,s,{fade:fade,col:'#bfe6ff',glowCol:'rgba(143,216,255,1)',a:1-dark});
  const bh=ap(t,T(4)-.2);if(bh>0&&dark<1){const r=lerp(110,10,seg(t,wi(4,'evaporate')-.3,wi(4,'nothing')));ctx.save();ctx.globalAlpha=bh*(1-dark);blackHole(540,900,r,t,{});
    for(let i=0;i<12;i++){const a=hash(i)*6.28+t,d=r*1.6+fract(t*.6+hash(i*3))*160;circ(540+Math.cos(a)*d,900+Math.sin(a)*d,3,'#ffe4c0',.7*(1-fract(t*.6+hash(i*3))));}ctx.restore();}
  const m=[{p:.04,top:'NOW',bot:'13.8 B yrs',col:U.teal,a:ap(t,T(3))},{p:.45,top:'LAST STARS',bot:'100 trillion yrs',col:U.ice,a:ap(t,wi(3,'hundred')-.2)},{p:.92,top:'LAST BLACK HOLES',bot:'10¹⁰⁰ yrs',col:U.y,a:ap(t,wi(4,'black')-.2)}];
  if(dark<.5){ctx.save();ctx.globalAlpha=1-dark*2;timeBar(120,1480,840,m.map(x=>Object.assign({},x,{a:x.a*(1-dark*2)})),{k:lerp(.04,1,seg(t,T(3),E(4))),col:U.ice});ctx.restore();}
}
// ending 2: the big rip
function c4(t){space(t,{c0:'#0c0508',c1:'#1c0a10'});T2('ENDING 2',540,250,40,U.dim);T2('BIG RIP',540,330,110,U.red,{w:900});
  const a5=seg(t,T(5),E(5));for(let i=0;i<3;i++)crack(-40,620+i*520,1120,560+i*560,11+i,ss(seg(t,W(5,.3)+i*.4,W(5,.3)+i*.4+1.4)));
  if(t<T(6)-.05){galaxy(540,900,230,t*.2,{col:'#ffd0c8',spread:lerp(0,.25,a5),glowCol:'rgba(255,90,72,1)'});return;}
  if(t<T(7)-.05){const sol=wi(6,'solar')-.2;if(t<sol){galaxy(540,900,230,t*.2,{col:'#ffd0c8',spread:ss(seg(t,wi(6,'galaxies')-.2,sol))*2.2,glowCol:'rgba(255,90,72,1)'});}
      else solar(540,920,1.2,t,ss(seg(t,wi(6,'months')-.3,E(6)+.6)));return;}
  const at=wi(7,'atoms')-.3;if(t<at){earth(540,920,260,{spin:t*.02});const k=ss(seg(t,wi(7,'rip')-.2,at));for(let i=0;i<6;i++)crack(540+Math.cos(i)*40,920+Math.sin(i)*40,540+Math.cos(i)*300,920+Math.sin(i)*300,30+i,k);return;}
  atom(540,920,1.6,t,ss(seg(t,at+.2,E(7)+.5)));flash(ss(seg(t,E(7)+.2,E(7)+.6))*.9,'#fff');}
// ending 3: the big crunch
function c5(t){space(t,{c0:'#0d0805',c1:'#1e120a'});T2('ENDING 3',540,250,40,U.dim);T2('BIG CRUNCH',540,330,100,U.org,{w:900});
  if(t<T(9)-.05){const k=seg(t,wi(8,'falls')-1,E(8)+.5);const s=lerp(1.4,.08,ss(k));field(t,540,920,s,{col:'#ffd9b0',glowCol:'rgba(255,154,74,1)'});glow(540,920,lerp(60,420,ss(k)),'rgba(255,190,110,1)',lerp(.2,.8,ss(k)));return;}
  // the two surveys + the dark energy gauge
  const d=ap(t,wi(9,'surveys')-.3);ctx.save();ctx.globalAlpha=d;for(const[x,lab]of[[320,'DESI'],[760,'DES']]){fillRR(x-120,760,240,140,16,'#2a3044');ctx.fillStyle='#c9cfda';ctx.beginPath();ctx.arc(x,760,120,Math.PI,0);ctx.fill();fillRR(x-14,650,28,110,6,'#1b1f2a');chip(lab,x,960,{size:34,bg:U.y,col:'#14110a'});}ctx.restore();
  const g=ap(t,wi(9,'hints')-.3);if(g>0){T2('DARK ENERGY STRENGTH',540,1330,30,U.dim,{a:g});const k=ss(seg(t,wi(9,'weaker')-.6,E(9)+.4));bar(170,1380,740,46,lerp(.9,.55,k),U.org);if(k>.5)T2('WEAKER?',540,1500,60,U.org,{w:900,a:ss((k-.5)*2)});}
  const y=ap(t,wi(9,'2025')-.2);if(y>0)chip('2025',540,560,{a:y,size:40});}
function bar(x,y,w,h,k,col){fillRR(x,y,w,h,h/2,'rgba(255,255,255,.1)');fillRR(x,y,Math.max(h,w*k),h,h/2,col);}
// the date: stops growing in ~11 billion years, crunch ~20 billion years from now
function c6(t){space(t,{starA:.5});const k=seg(t,T(10)+.3,wi(10,'twenty')+1);
  sizeChart(110,560,860,620,lerp(.43,1,ss(k)),{marks:[[13.8,'NOW',null,U.teal],[24.8,'MAX SIZE','+11 B yrs',U.y],[33,'CRUNCH','+20 B yrs',U.red]].filter(m=>m[0]<14||(m[0]<25&&t>wi(10,'growing')-.3)||t>wi(10,'collapses')-.2)});}
// almost halfway
function c7(t){space(t,{starA:.6});const k=ap(t,T(11)+.2,1.2);T2("THE UNIVERSE'S LIFE (IF IT CRUNCHES)",540,460,32,U.dim,{a:k});
  fillRR(110,700,860,60,30,'rgba(255,255,255,.1)');fillRR(110,700,860*.418*k,60,30,U.teal);T2('BIG BANG',110,810,28,U.dim,{align:'left',a:k});T2('CRUNCH: 33 B yrs',970,810,28,U.red,{align:'right',a:k});
  const h=ap(t,wi(11,'halfway')-.2);if(h>0){chip('YOU ARE HERE · 13.8 B yrs',Math.max(300,110+860*.418),590,{a:h,bg:U.y,col:'#14110a',size:30});line(110+860*.418,620,110+860*.418,700,5,U.y);}
  const p=ap(t,wi(11,'proof')-.3);if(p>0){ctx.save();ctx.translate(540,1000);ctx.rotate(-.08);ctx.globalAlpha=p;ctx.strokeStyle=U.red;ctx.lineWidth=8;rr(-330,-70,660,140,18);ctx.stroke();T2('HINTS, NOT PROOF',0,0,64,U.red,{w:900});ctx.restore();}
  const m=ap(t,wi(11,'more')-.2);if(m>0)chip('MORE DATA COMING',540,1200,{a:m,size:34});}
function c8(t){space(t);T2('HOW THE UNIVERSE',540,300,70,U.ink,{w:900});T2('ENDS',540,395,100,U.y,{w:900});panels(t,{hi:Math.floor(t*1.5)%3,y:480});}
const SCENES={c1,c2,c3,c4,c5,c6,c7,c8};
const FADES={};
const CAPY={c6:.73,c3:.6};
function hud(t){const sc=sceneAt(t).id;const tag={c1:'REAL PHYSICS',c2:'DARK ENERGY',c3:'ENDING 1: BIG FREEZE',c4:'ENDING 2: BIG RIP',c5:'ENDING 3: BIG CRUNCH',c6:'ENDING 3: BIG CRUNCH',c7:'2025 HINTS',c8:'REAL PHYSICS'}[sc];
  const chips=[{k:'UNIVERSE AGE',v:'13.8 B YRS'}];
  if(sc==='c4'){let v='T−22 B YRS';if(t>wi(6,'galaxies')-.2)v='T−60 M YRS';if(t>wi(6,'solar')-.2)v='T−3 MONTHS';if(t>wi(7,'final')-.2)v='T−MINUTES';if(t>wi(7,'atoms')-.3)v='T−0';chips.push({k:'BIG RIP IN',v,hot:true});}
  return{chips,tag,tagRed:sc==='c4'};}
