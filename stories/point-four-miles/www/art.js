// ===================== 0.4 Miles: places and things (v2, 1080x1920) =====================
const PM={sky0:'#10183a',sky1:'#2b2f63',sky2:'#5d4a7e',water:'#16263f',waterL:'#2e4a68',reed:'#0f2a2a',reedL:'#2f5a4a',wood:'#8a6a48',woodD:'#5c4530',wisp:'190,255,226',blue:'#39a8ff',red:'#ff4d3d',amber:'#ffc93c',led:'#5cf2a2'};
function T2(s,x,y,size,col='#fff',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function me(o){toon(Object.assign({jacket:'#d98a2b',hat:'beanie',hatCol:'#f0683f',tag:null,skin:'#e9b896',browCol:'#4a2e1f',pants:'#2b3142',stripe:false},o));}
const STAR=(()=>{const r=rng(7),a=[];for(let i=0;i<150;i++)a.push([r()*1300-110,r()*820-60,r()<.1?3:1.7,.3+r()*.6]);return a;})();
const REED=(()=>{const r=rng(12),a=[];for(let i=0;i<170;i++)a.push([r()*1500-200,r(),r()*.6+.5,(r()-.5)*.3]);return a;})();
function wisp(x,y,r0,t,o={}){const r=r0*1.5,b=Math.sin(t*2+x*.01)*r*.25,a=o.a??1;glow(x,y+b,r*5,`rgba(${PM.wisp},1)`,.5*a);glow(x,y+b,r*2.2,`rgba(${PM.wisp},1)`,.75*a);circ(x,y+b,r*.6,'#f2fff9',a);
  if(y<(o.hz??920)){ctx.save();ctx.globalAlpha=.22*a;ctx.fillStyle=`rgb(${PM.wisp})`;ctx.fillRect(x-r*.5,(o.hz??920)+(o.hz??920)-y-b-r*3,r,r*6);ctx.restore();}}
// the marsh. o:{dusk, hz, board:[len 0..1 how far it reaches], wisps:[[x,y,r]], reeds}
function marsh(t,o={}){const hz=o.hz??920;const d=o.dusk?1:0;ctx.fillStyle=vgrad(-100,hz,d?[[0,'#2c2f6a'],[.55,'#b5587a'],[1,'#ffb56a']]:[[0,PM.sky0],[.65,PM.sky1],[1,PM.sky2]]);ctx.fillRect(-300,-200,1680,hz+220);
  if(!d)for(const s of STAR)if(s[1]<hz-40)circ(s[0],s[1],s[2],'#e6ecff',s[3]);else;if(d)circ(760,hz-20,110,'#ffe4b0');
  // far treeline
  ctx.fillStyle=d?'#3a2a50':'#141c38';ctx.beginPath();ctx.moveTo(-300,hz+6);for(let i=0;i<=40;i++){const x=-300+i*42;ctx.lineTo(x,hz-26-hash(i)*46);}ctx.lineTo(1400,hz+6);ctx.closePath();ctx.fill();
  // water
  ctx.fillStyle=vgrad(hz,2000,d?[[0,'#c8707e'],[.3,'#6a4a70'],[1,'#1a2442']]:[[0,PM.sky2],[.1,PM.waterL],[1,PM.water]]);ctx.fillRect(-300,hz,1680,1400);
  for(let i=0;i<46;i++){const y=hz+12+i*i*.55,w=120+hash(i*3)*320,x=hash(i*7)*1400-200+Math.sin(t*.7+i)*14;line(x,y,x+w,y,2+i*.09,'rgba(210,225,255,.13)');}
  // boardwalk in perspective
  if(o.board!==false){const L=o.board??1,top=lerp(1780,hz+6,L),vx=540+(o.vx??0);const wAt=y=>lerp(0,430,(y-hz)/(2000-hz));poly([vx-wAt(top),top,vx+wAt(top),top,540+430,2000,540-430,2000],PM.woodD);
    for(let i=0;i<34;i++){const k=Math.pow(i/34,2.1),y=lerp(hz+8,2000,k);if(y<top)continue;const w=wAt(y),h=lerp(2,44,k),cx=lerp(vx,540,k);fillRR(cx-w,y,w*2,h,2,PM.wood);}
    for(const s of[-1,1])line(vx+s*wAt(top),top,540+s*430,2000,10,'#3a2d24');}
  // reeds
  for(const r of REED){const y=lerp(hz+30,1960,Math.pow(r[1],1.5)),s=lerp(.3,1.7,(y-hz)/(1960-hz));const x=r[0];if(o.board!==false&&Math.abs(x-540)<lerp(10,520,(y-hz)/(2000-hz))+20)continue;
    ctx.strokeStyle=d?'#3a2a4a':(r[1]>.5?PM.reed:PM.reedL);ctx.lineWidth=7*s;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y);const sw=Math.sin(t*1.1+x)*10*s;ctx.quadraticCurveTo(x+r[3]*90*s,y-100*r[2]*s,x+r[3]*180*s+sw,y-210*r[2]*s);ctx.stroke();}
  (o.wisps||[]).forEach(q=>wisp(q[0],q[1],q[2],t,{hz,a:q[3]??1}));}
function phone(cx,cy,h,fn,o={}){const w=h*.5,x=cx-w/2,y=cy-h/2,r=h*.07;ctx.save();ctx.translate(cx,cy);ctx.rotate(o.rot||0);ctx.translate(-cx,-cy);if(o.glow!==0)glow(cx,cy,h*.8,'rgba(120,200,255,1)',o.glow??.25);fillRR(x-h*.016,y-h*.016,w+h*.032,h*1.032,r,'#22252f');fillRR(x,y,w,h,r*.8,'#0a0b0f');ctx.save();rr(x+h*.012,y+h*.012,w-h*.024,h-h*.024,r*.7);ctx.clip();ctx.translate(x+h*.012,y+h*.012);fn(w-h*.024,h-h*.024);ctx.restore();ctx.restore();}
// topo map on the phone. o:{batt, line 0..1 (blue trail drawn), dots:[[x,y,name,when,a]], meY}
function mapS(w,h,t,o={}){ctx.fillStyle='#d9e3c8';ctx.fillRect(0,0,w,h);ctx.fillStyle='#a8cbe0';ctx.beginPath();ctx.ellipse(w*.6,h*.42,w*.55,h*.28,.2,0,7);ctx.fill();
  ctx.strokeStyle='rgba(90,120,80,.35)';ctx.lineWidth=2.5;for(let i=0;i<7;i++){ctx.beginPath();ctx.ellipse(w*.5,h*.5,w*.2+i*w*.09,h*.14+i*h*.06,.3,0,7);ctx.stroke();}
  // easy loop
  ctx.strokeStyle='#d0473a';ctx.setLineDash([16,12]);ctx.lineWidth=7;ctx.beginPath();ctx.ellipse(w*.3,h*.76,w*.2,h*.13,0,0,7);ctx.stroke();ctx.setLineDash([]);
  const P=[[w*.3,h*.63],[w*.42,h*.52],[w*.56,h*.46],[w*.68,h*.36],[w*.62,h*.26],[w*.78,h*.18]];const k=(o.line??0)*(P.length-1);ctx.strokeStyle=PM.blue;ctx.lineWidth=11;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(P[0][0],P[0][1]);for(let i=1;i<P.length;i++){if(k<i-1)break;const q=clamp(k-i+1);ctx.lineTo(lerp(P[i-1][0],P[i][0],q),lerp(P[i-1][1],P[i][1],q));}ctx.stroke();
  fillRR(0,0,w,h*.13,0,'#16202c');T2('TRAILHEAD',w*.08,h*.045,h*.03,'#9fb4c8',{align:'left',w:800});T2('0.4 MI',w*.08,h*.095,h*.052,'#fff',{align:'left',w:900});
  const b=o.batt??60;T2(b+'%',w*.92,h*.07,h*.04,b<=5?PM.red:'#fff',{align:'right',w:900});
  (o.dots||[]).forEach(d=>{const a=d[4]??1;if(a<=0)return;ctx.save();ctx.globalAlpha=a;circ(d[0]*w,d[1]*h,h*.016,'#fff');circ(d[0]*w,d[1]*h,h*.012,PM.blue);if(d[2]){fillRR(d[0]*w-h*.02,d[1]*h+h*.02,h*.16,h*.05,6,'rgba(10,14,24,.85)');T2(d[2],d[0]*w-h*.012,d[1]*h+h*.036,h*.018,'#fff',{align:'left',w:800});T2(d[3],d[0]*w-h*.012,d[1]*h+h*.056,h*.017,d[5]?PM.red:PM.amber,{align:'left',w:800});}ctx.restore();});
  if(o.me!==false){const mx=(o.mx??.68)*w,my=(o.my??.36)*h;circ(mx,my,h*.028,'rgba(240,104,63,.35)');circ(mx,my,h*.016,'#f0683f');}}
function ranger(o){toon(Object.assign({jacket:'#4a6a3f',hat:'cap',hatCol:'#7a5a2f',tag:'RANGER',skin:'#c9926a',browCol:'#b8b8b8',beard:'#b8b8b8',pants:'#3a3226',stripe:false},o));}
const RULES=[['STAY ON THE','BOARDWALK.'],["IF YOU SEE A LIGHT","DON'T FOLLOW IT."],['NEVER TURN','YOURS OFF.']];
function card(t,o={}){const cy=o.cy??800;fillAll('#0d1426');glow(540,1500,700,`rgba(${PM.wisp},1)`,.08);ctx.save();ctx.translate(540,cy);ctx.rotate(-.02);fillRR(-400,-500,820,1020,16,'rgba(0,0,0,.5)');fillRR(-410,-510,820,1020,16,'#efe6c6');fillRR(-410,-510,820,126,16,'#3f6a3a');fillRR(-410,-420,820,36,0,'#3f6a3a');T2('MARSH LOOP',-360,-448,56,'#fff',{align:'left',w:900});T2('4.0 MI',360,-448,36,'#dbe8c8',{align:'right',f:'PM',w:500});
  T2('AFTER SUNSET',-352,-320,52,'#1b1d23',{align:'left',w:900});
  for(let r=0;r<3;r++){const k=o.reveal[r];if(k<=0)continue;const y0=-200+r*220;ctx.save();ctx.beginPath();ctx.rect(-400,y0-60,800*clamp(k*1.15),210);ctx.clip();T2(`${r+1}.`,-350,y0,64,'#1b1d23',{align:'left',w:900});RULES[r].forEach((q,j)=>T2(q,-270,y0+j*66,50,j===1?'#a3261b':'#1b1d23',{align:'left',w:900}));ctx.restore();}
  ctx.restore();}
// sepia storybook bog
function bookBog(t,k,wa){ctx.save();fillAll('#c7a673');ctx.fillStyle=vgrad(0,1920,[[0,'#3c2a1a'],[.5,'#7a5a36'],[.75,'#a88858'],[1,'#3c2a1a']]);ctx.fillRect(-300,-200,1680,2400);
  ctx.fillStyle='#2a1c10';ctx.beginPath();ctx.moveTo(-300,1320);for(let i=0;i<=30;i++)ctx.lineTo(-300+i*60,1300+Math.sin(i*1.3)*44);ctx.lineTo(1400,2300);ctx.lineTo(-300,2300);ctx.fill();
  for(let i=0;i<8;i++){const y=1400+i*60;line(-100+i*90,y,300+i*120,y,6,'rgba(230,200,140,.35)');}
  for(const[x,h]of[[120,420],[260,300],[880,480],[980,340]]){line(x,1340,x+20,1340-h,26,'#1e140b');line(x+10,1340-h*.5,x+90,1340-h*.75,12,'#1e140b');line(x+10,1340-h*.7,x-70,1340-h*.92,10,'#1e140b');}
  ctx.restore();}
// old lantern traveler, a dark toon
function traveler(x,y,h){toon({x,y,h,jacket:'#3a2a1c',hat:'cap',hatCol:'#241810',skin:'#d8b48a',browCol:'#2a1c10',pants:'#2a1c10',stripe:false,mouth:'flat',look:{x:.8,y:-.2},armR:[1.1,.1],held:(a,b)=>{line(a,b,a,b+50,6,'#241810');fillRR(a-22,b+50,44,60,6,'#ffcf6e');glow(a,b+80,140,'rgba(255,200,110,1)',.5);}});}
