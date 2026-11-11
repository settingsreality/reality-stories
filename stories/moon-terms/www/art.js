// ===================== Updated Terms: places and things (v2, 1080x1920) =====================
const M={y:'#ffc93c',red:'#e0362a',grn:'#2fbf6a',ink:'#e9edf5',moon:'#dfe3ea',blue:'#9fc3ff',night0:'#03050c',night1:'#101a33'};
const MSTARS=(()=>{const r=rng(11),a=[];for(let i=0;i<220;i++)a.push([r()*1180-50,r()*1400-60,r()<.12?2.6:1.4,.25+r()*.6]);return a;})();
function nightSky(y1,o={}){ctx.fillStyle=vgrad(-60,y1,[[0,M.night0],[.65,'#0b1326'],[1,M.night1]]);ctx.fillRect(-300,-300,1680,y1+310);
  for(const[x,y,r,a]of MSTARS)if(y<y1-30)circ(x,y,r,'#e6ecff',a*(o.starA??1));}
function T2(s,x,y,size,col=M.ink,o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
function chip(s,x,y,o={}){if((o.a??1)<=0.01)return;label(s,x,y,Object.assign({font:`800 ${o.size||32}px MS`,h:(o.size||32)*1.8,bg:o.bg||'rgba(12,16,28,.92)',col:o.col||M.ink},o));}
function popT(s,x,y,size,col,t,t0,o={}){const q=ss(seg(t,t0,t0+.25));if(q<=0)return;ctx.save();ctx.translate(x,y);const k=1.4-.4*q;ctx.scale(k,k);T2(s,0,0,size,col,{w:900,stroke:12,a:q*(o.a??1)});ctx.restore();}
// the Moon; o.face 0..1 shows the face hidden in the craters, o.smile 0..1
const CRATERS=[[-.35,-.3,.16],[.3,-.35,.13],[.1,.25,.2],[-.4,.3,.1],[.45,.15,.09],[-.05,-.6,.08],[.55,-.55,.06],[-.6,-.05,.07]];
function moon(x,y,r,t,o={}){glow(x,y,r*2.6,'rgba(200,215,255,1)',.28*(o.glow??1));glow(x,y,r*1.5,'rgba(230,236,255,1)',.35*(o.glow??1));
  ctx.fillStyle=(()=>{const g=ctx.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);g.addColorStop(0,'#f4f6fa');g.addColorStop(1,'#b9c0cc');return g;})();ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();
  for(const[u,v,s]of CRATERS){circ(x+u*r,y+v*r,s*r,'rgba(120,130,150,.35)');circ(x+u*r+s*r*.15,y+v*r+s*r*.15,s*r*.8,'rgba(150,160,178,.35)');}
  const f=clamp(o.face||0);if(f>0){ctx.save();ctx.globalAlpha=f;
    for(const s of[-1,1]){ell(x+s*r*.3,y-r*.18,r*.13,r*.09,0,'rgba(70,78,98,.75)');circ(x+s*r*.3,y-r*.16,r*.045,'rgba(20,24,36,.9)');}
    const sm=clamp(o.smile||0);ctx.strokeStyle='rgba(70,78,98,.8)';ctx.lineWidth=r*.05;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x-r*.38,y+r*.3);ctx.quadraticCurveTo(x,y+r*(.3+.35*sm),x+r*.38,y+r*.3);ctx.stroke();
    ctx.restore();}
  ctx.strokeStyle='rgba(255,255,255,.25)';ctx.lineWidth=Math.max(2,r*.015);ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.stroke();}
function me2(o){toon(Object.assign({jacket:'#2f4f7a',hat:'beanie',hatCol:'#f0683f',stripe:false,skin:'#e9b896',browCol:'#4a2e1f'},o));}
// a neighbor: plain clothes, pale in moonlight, staring
const NCOL=['#6b4f7a','#4f7a5c','#7a5b3f','#3f5f7a','#7a3f4a','#5a5a6a'];
function neighbor(x,y,h,i,o={}){toon(Object.assign({x,y,h,jacket:NCOL[i%6],hat:null,stripe:false,skin:['#e7c6ad','#c99a78','#8d5f45','#f0d2bb'][i%4],brow:'flat',mouth:'flat',look:{x:0,y:0},pants:'#22252e'},o));}
// a house front: o.lit = window light (0..1), o.moon = moonlight wash, o.fig = fn(x,y) drawn inside the window, o.door 0..1 open
function house(x,base,w,h,o={}){const c=o.col||'#2a3550';const roof=h*.42;
  ctx.fillStyle=c;ctx.fillRect(x-w/2,base-h,w,h);ctx.fillStyle=shade(c,-.3);ctx.beginPath();ctx.moveTo(x-w/2-24,base-h);ctx.lineTo(x,base-h-roof);ctx.lineTo(x+w/2+24,base-h);ctx.closePath();ctx.fill();
  // window
  const wx=x-w*.28,wy=base-h*.78,ww=w*.56,wh=h*.38;fillRR(wx-8,wy-8,ww+16,wh+16,6,shade(c,-.45));
  ctx.fillStyle=o.dark?'#05070c':`rgba(${o.wc||'255,214,140'},${.25+.65*(o.lit??.8)})`;ctx.fillRect(wx,wy,ww,wh);
  if(o.fig){ctx.save();ctx.beginPath();ctx.rect(wx,wy,ww,wh);ctx.clip();o.fig(x,wy+wh*1.9,wh*1.6);ctx.restore();}
  line(x,wy,x,wy+wh,6,shade(c,-.45));line(wx,wy+wh/2,wx+ww,wy+wh/2,6,shade(c,-.45));
  // door
  const dw=w*.24,dh=h*.36,dx=x+w*.18;const op=clamp(o.door||0);ctx.fillStyle=op>0?`rgba(255,214,140,${.9})`:'#000';ctx.fillRect(dx-dw/2,base-dh,dw,dh);
  ctx.fillStyle=shade(c,-.55);ctx.fillRect(dx-dw/2,base-dh,dw*(1-op*.8),dh);
  if(o.moon>0){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=o.moon*.28;ctx.fillStyle='#9fb8ff';ctx.fillRect(x-w/2-24,base-h-roof,w+48,h+roof);ctx.restore();}}
// a phone, centre (x,y), scale s; draw(content) gets local coords (0,0)-(400,800)
function phone(x,y,s,draw,o={}){ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(s,s);ctx.translate(-220,-430);
  glow(220,430,520,'rgba(140,170,255,1)',.12);fillRR(0,0,440,860,58,'#0d0f14');fillRR(18,18,404,824,44,'#121726');
  ctx.save();rr(18,18,404,824,44);ctx.clip();ctx.translate(20,20);draw();ctx.restore();fillRR(170,30,100,24,12,'#05060a');ctx.restore();}
// a system pop-up drawn inside a phone screen (400 wide)
function popup(title,body,b1,b2,o={}){fillRR(20,240,360,o.h||380,30,'rgba(240,242,248,.97)');
  moon(200,310,40,0,{glow:0});ctx.save();ctx.fillStyle='#14161c';ctx.font='900 30px MS';ctx.textAlign='center';ctx.textBaseline='middle';
  title.split('\n').forEach((s,k)=>ctx.fillText(s,200,385+k*36));ctx.font='600 22px MS';ctx.fillStyle='#4a4f5e';(body||'').split('\n').forEach((s,k)=>ctx.fillText(s,200,385+title.split('\n').length*36+12+k*28));ctx.restore();
  const by=240+(o.h||380)-76;const hl=o.hl||0;
  for(const[k,txt,col]of[[0,b1,M.grn],[1,b2,o.b2col||M.red]]){const bx=40+k*170;fillRR(bx,by,150,56,16,hl===k+1?col:'rgba(20,24,36,.08)');ctx.save();ctx.font='900 24px MS';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=hl===k+1?'#fff':col;ctx.fillText(txt,bx+75,by+29);ctx.restore();}}
// a terms card: rows [{n,txt,hot}] shown with k (0..1 reveal each)
function termsCard(x,y,w,rows,o={}){const h=o.h||(150+rows.length*190);fillRR(x-w/2,y,w,h,26,'rgba(244,240,228,.97)');ctx.save();ctx.strokeStyle='#14161c';ctx.lineWidth=4;rr(x-w/2,y,w,h,26);ctx.stroke();ctx.restore();
  T2(o.title||'TERMS OF THE MOON',x,y+62,54,'#14161c',{w:900});line(x-w/2+40,y+100,x+w/2-40,y+100,3,'rgba(20,22,28,.3)');
  rows.forEach((r,i)=>{const a=clamp(r.a??1);if(a<=0)return;const ry=y+170+i*190;ctx.save();ctx.globalAlpha=a;if(r.hot)fillRR(x-w/2+24,ry-52,w-48,170,16,r.hotCol||'rgba(255,201,60,.55)');
    T2(r.n,x-w/2+50,ry-14,36,'#7a1f18',{w:900,align:'left'});ctx.font='800 44px MS';ctx.fillStyle='#14161c';ctx.textAlign='left';ctx.textBaseline='middle';r.txt.split('\n').forEach((s,k)=>ctx.fillText(s,x-w/2+50,ry+36+k*50));ctx.restore();});}
function street(y0,y1){ctx.fillStyle='#161b26';ctx.fillRect(-300,y0,1680,y1-y0);ctx.fillStyle='#232a38';ctx.fillRect(-300,y0,1680,40);for(let x=-200;x<1300;x+=200)fillRR(x,(y0+y1)/2,110,14,7,'rgba(255,214,120,.45)');}
