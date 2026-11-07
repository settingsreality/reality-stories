// ===================== Do Not Disturb: places and things (v2, 1080x1920) =====================
const DN={red:'#d8322a',redD:'#9e2019',cream:'#f6f1e4',teal:'#1f8f8a',amber:'#ffc93c',brick:'#7a4a3c',brickD:'#4a2c25',win:'255,214,140'};
function T2(s,x,y,size,col='#fff',o={}){ctx.save();ctx.globalAlpha=o.a??1;ctx.font=`${o.w||800} ${size}px ${o.f||'MS'}`;ctx.fillStyle=col;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.stroke){ctx.lineWidth=o.stroke;ctx.strokeStyle='rgba(5,6,10,.9)';ctx.lineJoin='round';ctx.strokeText(s,x,y);}ctx.fillText(s,x,y);ctx.restore();}
// me: orange beanie, hotel vest + name tag
function me(o){toon(Object.assign({jacket:'#2b2f4a',hat:'beanie',hatCol:'#f0683f',tag:'NIGHT\nMANAGER',skin:'#e9b896',browCol:'#4a2e1f',pants:'#1c1f2c',stripe:false},o));}
// sky: k = 0 night .. 1 morning; dim darkens it (the shadow leaning over)
function sky(t,o={}){const k=o.k??0,dim=o.dim??0;const top=k<.5?'#060a1c':'#5f8fc8',bot=k<.5?'#1c2850':'#f2c79a';
  ctx.fillStyle=vgrad(-300,1500,[[0,top],[1,bot]]);ctx.fillRect(-500,-500,2100,2100);
  if(k<.5)for(let i=0;i<120;i++)circ(hash(i)*1500-200,hash(i+9)*1200-200,1.3+hash(i*3)*2,'#e6ecff',.3+.5*hash(i*7));
  if(dim>0){ctx.save();ctx.globalAlpha=dim*.75;ctx.fillStyle='#0b0d18';ctx.fillRect(-500,-500,2100,2100);ctx.restore();}}
// the hotel: centre x, ground y, floors; o.lit (windows), o.neon
const FH=78;function hotel(x,y,o={}){const w=o.w??330,fl=o.floors??12,h=fl*FH+40,top=y-h;
  fillRR(x-w/2-14,top-30,w+28,40,6,'#3a2b2a');fillRR(x-w/2,top,w,h,4,DN.brick);fillRR(x+w*.18,top,w*.32,h,0,DN.brickD);
  for(let f=0;f<fl;f++)for(let c=0;c<5;c++){const wx=x-w/2+22+c*(w-44)/5,wy=top+30+f*FH;const on=hash(f*7+c+(o.seed||0))<(o.lit??.6);
    fillRR(wx,wy,(w-44)/5-14,FH-34,4,on?`rgb(${DN.win})`:'#1d2333');if(on&&o.glow!==false)glow(wx+20,wy+20,40,`rgba(${DN.win},1)`,.15);if(o.ring){ctx.save();ctx.strokeStyle=`rgba(255,255,255,${o.ring})`;ctx.lineWidth=4;rr(wx-4,wy-4,(w-44)/5-6,FH-26,6);ctx.stroke();ctx.restore();}}
  fillRR(x-70,y-110,140,110,6,'#2a1d1a');fillRR(x-60,y-100,120,100,4,`rgba(${DN.win},.9)`);fillRR(x-110,y-140,220,24,6,DN.red);
  if(o.neon!==false){const n=o.neon??1;fillRR(x-w/2-40,top+120,40,360,6,'#1a1416');
    ctx.save();ctx.translate(x-w/2-20,top+300);ctx.rotate(-Math.PI/2);T2('GRAND HALVERSON',0,0,30,`rgba(255,110,90,${n})`,{w:900});ctx.restore();}
  return top;}
// a giant door hanger. (x,y) = centre of the hole; H = length; flip 0 (red DND) .. 1 (white MAKE UP ROOM); rot = swing
function hanger(x,y,H,o={}){const W=H*.5,flip=o.flip??0;const sx=Math.cos(flip*Math.PI);const back=flip>.5;ctx.save();ctx.translate(x,y);ctx.rotate(o.rot||0);ctx.scale(Math.abs(sx)<.02?.02:Math.abs(sx),1);
  const col=back?DN.cream:DN.red,ink=back?DN.teal:DN.cream;const r=W*.3;ctx.translate(0,r*1.35);
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(-W/2,-r*1.2);ctx.arcTo(-W/2,-r*2.6,0,-r*2.6,W/2);ctx.arcTo(W/2,-r*2.6,W/2,-r*1.2,W/2);ctx.lineTo(W/2,H-r*2);ctx.arcTo(W/2,H-r*1.2,0,H-r*1.2,30);ctx.lineTo(-W/2+30,H-r*1.2);ctx.arcTo(-W/2,H-r*1.2,-W/2,H-r*2,30);ctx.closePath();ctx.moveTo(r*1.08,-r*1.35);ctx.arc(0,-r*1.35,r*1.08,0,Math.PI*2,true);ctx.fill('evenodd');
  ctx.fillStyle=shade(col,-.2);ctx.fillRect(W/2-W*.08,-r*1.2,W*.08,H-r*1.2);
  // the hole (cut out: drawn later by caller's foreground) + slit
  const fs=W*.16;if(!back){T2('DO NOT',0,H*.3,fs,ink,{w:900});T2('DISTURB',0,H*.3+fs*1.1,fs,ink,{w:900});line(-W*.3,H*.3+fs*2.1,W*.3,H*.3+fs*2.1,8,ink);}
  else{T2('PLEASE',0,H*.26,fs*.9,ink,{w:900});T2('MAKE UP',0,H*.26+fs,fs*.9,ink,{w:900});T2('ROOM',0,H*.26+fs*2,fs*1.05,ink,{w:900});line(-W*.3,H*.26+fs*2.9,W*.3,H*.26+fs*2.9,8,ink);}
  ctx.strokeStyle=shade(col,-.3);ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,-r*1.35,r*1.08,0,7);ctx.stroke();
  ctx.restore();}
// the hotel with the hanger looped over its top floors: the ring drawn in two halves so it wraps the building
function hotelHung(t,x,y,o={}){const top=y-(12*FH+40),hy=top+70,H=o.H??940;const sw=Math.sin(t*.8)*.02*(o.swing??1);
  hotel(x,y,Object.assign({w:270},o));hanger(x,hy,H,{flip:o.flip??0,rot:(o.rot??-.2)+sw});return{top,hy};}
// town: little houses + the street; o.empty hides cars/birds
function town(t,y,o={}){for(let i=0;i<16;i++){const x=-260+i*110+hash(i)*40,h=120+hash(i+3)*180;fillRR(x,y-h,90,h,4,shade('#3d4a66',hash(i+5)*.3-.15));poly([x-8,y-h,x+45,y-h-50,x+98,y-h],'#2a3248');
    for(let j=0;j<2;j++)fillRR(x+14+j*38,y-h+30,24,30,3,hash(i*3+j)<(o.lit??.4)?`rgb(${DN.win})`:'#1a2033');}
  fillRR(-500,y,2100,400,0,'#2a2f3d');for(let x=-480;x<1600;x+=140)fillRR(x,y+150,70,12,4,'#e8d27a');}
function phone(x,y,s,t,ring){ctx.save();ctx.translate(x+(ring?Math.sin(t*60)*4:0),y);ctx.scale(s,s);fillRR(-120,-30,240,110,26,'#c23a30');fillRR(-150,-80,300,60,30,'#a32c24');for(let i=0;i<3;i++)for(let j=0;j<3;j++)circ(-30+j*30,10+i*22,8,'#f3e9d8');ctx.restore();
  if(ring){for(const s2 of[-1,1]){T2(')',x+s2*190,y-40,90,DN.amber,{w:900,a:.5+.5*Math.sin(t*20)});}}}
// binder page with 3 rules
const RULES=[['NEVER TAKE','THE SIGN DOWN.'],["WHILE IT'S UP,",'NOBODY CHECKS OUT.'],["IF IT FLIPS, IT'S HOUSEKEEPING.",'KEEP GUESTS FROM THE WINDOWS.']];
function binder(cx,cy,o={}){ctx.save();ctx.translate(cx,cy);ctx.rotate(-.02);const w=920,h=1060;fillRR(-w/2-40,-h/2-30,w+80,h+60,24,'#26365e');fillRR(-w/2+12,-h/2+16,w,h,10,'rgba(0,0,0,.35)');fillRR(-w/2,-h/2,w,h,10,DN.cream);
  for(let i=0;i<3;i++)circ(-w/2+50,-h/2+200+i*330,20,'#26365e');
  T2('SECTION 9: EXTERIOR SIGNAGE',30,-h/2+90,46,'#1f2a44',{w:900});line(-w/2+110,-h/2+140,w/2-40,-h/2+140,4,'#1f2a44');
  for(let r=0;r<3;r++){const k=o.reveal[r];if(k<=0)continue;const y0=-h/2+270+r*270;ctx.save();ctx.beginPath();ctx.rect(-w/2,y0-80,w*clamp(k*1.15),240);ctx.clip();
    T2(`${r+1}.`,-w/2+120,y0+30,76,'#1f2a44',{w:900});RULES[r].forEach((q,j)=>T2(q,-w/2+180,y0+j*84,q.length>26?34:q.length>22?40:52,j===1?'#b4261b':'#1f2a44',{align:'left',w:900}));ctx.restore();
    const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle=DN.red;ctx.lineWidth=10;ctx.beginPath();ctx.ellipse(50,y0+42,w/2-50,118,-.02,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}
  ctx.restore();}
// giant knuckles knocking on the sky
function knuckles(x,y,s,a){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);for(let i=0;i<4;i++)fillRR(-200+i*100,-60-Math.abs(i-1.5)*20,94,240,46,'#d9a98a');fillRR(-210,60,400,220,80,'#d9a98a');
  for(let i=0;i<4;i++)ell(-153+i*100,-10-Math.abs(i-1.5)*20,24,10,0,'rgba(120,70,50,.5)');ctx.restore();}
// the card slid under the door
function card(cx,cy,a,rot){ctx.save();ctx.globalAlpha=a;ctx.translate(cx,cy);ctx.rotate(rot);fillRR(-380,-230,760,460,14,'rgba(0,0,0,.4)');fillRR(-390,-240,760,460,14,DN.cream);ctx.strokeStyle=DN.teal;ctx.lineWidth=6;rr(-370,-220,720,420,10);ctx.stroke();
  T2('HOUSEKEEPING',-10,-160,48,DN.teal,{w:900});T2("We'll be in shortly.",-10,-70,42,'#1f2a44',{w:700});T2('Please leave anything',-10,10,42,'#1f2a44',{w:700});T2('you want to keep',-10,70,42,'#1f2a44',{w:700});T2('BY THE DOOR.',-10,150,50,DN.red,{w:900});ctx.restore();}
