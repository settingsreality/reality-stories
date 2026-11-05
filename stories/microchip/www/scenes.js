// ===================== Microchip, scene by scene (v2: full 1080x1920 frame) =====================
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const nw=s=>s.replace(/[^A-Za-z0-9']/g,'').toLowerCase();
const wi=(i,s,n=0)=>{const w=TL.lines[i].words||[];let c=0;for(const x of w){if(nw(x.w)===nw(s)){if(c===n)return x.start;c++;}}return W(i,.5);};
const ap=(t,a,d=.35)=>ss(seg(t,a,a+d));
const vcam=(x,y,z)=>({x,y,z});
const NUM1='982 000 197 406 112',NUM2='982 000 197 406 113';
function stamp(s,x,y,t,t0,o={}){const q=ap(t,t0,.16);if(q<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(o.rot??-.14);const k=1.5-.5*q;ctx.scale(k,k);ctx.globalAlpha=q;const w=o.w||620;fillRR(-w/2,-74,w,148,16,'rgba(255,246,236,.96)');ctx.strokeStyle=MC.red;ctx.lineWidth=12;rr(-w/2,-74,w,148,16);ctx.stroke();T2(s,0,6,o.size||80,MC.red,{w:900});ctx.restore();}
// cold open: scanner on the back of my neck
function s1(t){const k=seg(t,0,E(0)),b=wi(0,'beeped');const hit=t>b-.03;const sh=hit?shakeAt(t,5,.5):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(960,1000,k)+sh.y,lerp(1.0,1.1,k)),1,()=>{room(t);vet({x:820,y:1900,h:1150,brow:hit?'scared':'worried',mouth:hit?'o':'flat',look:{x:-.7,y:.4},armL:[1.2,1.0],armR:[.1,.1]});
    if(hit)fillAll('rgba(255,40,30,'+(.14+.06*Math.sin(t*20))+')');
    back(430,1420,1.0);scanner(590,1400,1.0,{rot:-.95,on:hit?1:.3,red:hit,t,txt:hit?'BEEP':'...'});});
  if(t>b&&t<b+.1)flash(.5,'#ff5040');}
function s2(t){const c=wi(1,'every'),a=wi(1,'440'),k=seg(t,T(1),E(1));const clk=wi(1,'he');
  if(t<c-.05){const q=seg(t,T(1),c);vl(vcam(540,lerp(1120,1060,q),lerp(1.05,1.15,q)),1,()=>{porch(t);cat(540,1660,1.5,{t,eyes:'calm',look:{x:0,y:.2}});});
    const g=ap(t,wi(1,'torn')-.1);if(g>0)label('TORN EAR',780,690,{font:'900 44px MS',h:78,a:g,bg:'rgba(255,201,60,.95)',col:'#14110a'});return;}
  const pawK=Math.abs(Math.sin(t*7));vl(vcam(540,1020,lerp(1.0,1.06,k)),1,()=>{porch(t,{scr:Math.floor(lerp(0,9,seg(t,c,E(1))))});ctx.save();ctx.translate(540,1560);ctx.scale(-1,1);ctx.restore();
    // cat from behind, standing up the door
    ctx.save();ctx.translate(560,1560);fillRR(-120,-300,240,300,100,MC.cat);circ(0,-340,110,MC.cat);poly([-108,-370,-100,-480,-30,-430],MC.cat);poly([108,-370,100,-480,76,-456,84,-430,30,-430],MC.cat);
    ctx.strokeStyle=MC.catD;ctx.lineWidth=34;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-20);ctx.quadraticCurveTo(190,40,200,-140);ctx.stroke();
    fillRR(-110,-420-pawK*90,44,190,22,MC.cat);fillRR(66,-420-(1-pawK)*90,44,190,22,MC.cat);ctx.restore();});
  ctx.save();ctx.translate(540,470);fillRR(-300,-120,600,240,24,'rgba(6,8,16,.92)');T2('EVERY NIGHT',0,-70,42,'#fff',{w:900});T2('4:40 AM',0,34,116,MC.amber,{w:900});ctx.restore();}
function s3(t){const g=wi(2,'grain'),b=wi(2,'no'),a=wi(2,'asks'),k=seg(t,T(2),E(2));
  if(t<g-.1){const q=seg(t,T(2),g);vl(vcam(540,lerp(1090,1060,q),lerp(1.0,1.06,q)),1,()=>{room(t);vet({x:800,y:1720,h:1100,brow:'flat',mouth:'smile',look:{x:-.7,y:.5},armL:[1.0,1.1],armR:[.1,.1],held:null});table(1460);cat(400,1470,1.1,{t,eyes:'calm',look:{x:.5,y:0}});scanner(610,1100,.8,{rot:-.9,on:.3,t,txt:'...'});});return;}
  const q=ss(seg(t,g-.1,g+.5));vl(vcam(540,960,lerp(1.0,1.08,seg(t,g,E(2)))),1,()=>{fillAll('#141a33');glow(540,860,800,'rgba(120,170,255,1)',.28);
    for(let i=0;i<16;i++)line(0,i*140,1080,i*140,2,'rgba(120,170,255,.1)');for(let i=0;i<9;i++)line(i*140,0,i*140,1920,2,'rgba(120,170,255,.1)');
    chip(540,820,820*lerp(.9,1,q),-.06);rice(540,1100,620,.05);label('A PET CHIP',540,620,{font:'900 48px MS',h:84,bg:'rgba(255,201,60,.95)',col:'#14110a'});label('A GRAIN OF RICE',540,1260,{font:'900 44px MS',h:78});
    const bt=ap(t,b-.1);if(bt>0)label('NO BATTERY',540,430,{font:'900 56px MS',h:96,a:bt,bg:'rgba(224,54,42,.96)'});
    const w=ap(t,a-.5,.3);if(w>0){for(let i=0;i<4;i++){ctx.strokeStyle=`rgba(92,242,162,${.9*w*(1-i*.2)})`;ctx.lineWidth=9;ctx.beginPath();ctx.arc(540,820,140+i*120+fract(t*1.3)*120,0,7);ctx.stroke();}}});}
function digitsBar(t,t0,num,y,o={}){const n=Math.floor(lerp(0,num.length,seg(t,t0,t0+(o.d||.9))));ctx.save();ctx.translate(540,y);fillRR(-490,-74,980,148,20,'rgba(6,8,16,.94)');T2(num.slice(0,n).replace(/ /g,' '),0,6,70,MC.led,{f:'PM',w:700});ctx.restore();}
function s4(t){const b=wi(3,'beep'),f=wi(3,'fifteen'),ty=wi(3,'typed'),q=wi(3,'quiet'),tr=wi(3,'turned'),k=seg(t,T(3),E(3));const rot=ss(seg(t,tr,tr+.8));
  vl(vcam(540,lerp(1080,1040,k),lerp(1.0,1.05,k)),1,()=>{room(t);table(1460);
    const sw=Math.max(.04,rot);ctx.save();ctx.translate(690,1000);ctx.scale(sw,1);ctx.translate(-690,-1000);if(rot>.5)monitor(690,950,560,520,(w,h)=>record(w,h,[],{id:''}));else{fillRR(388,668,604,564,18,'#232637');fillRR(620,1230,140,80,6,'#232637');fillRR(520,1296,340,20,8,'#232637');}ctx.restore();
    vet({x:880,y:1720,h:1050,brow:t>q?'worried':'flat',mouth:t>q?'flat':'smile',look:{x:-.7,y:.4},armL:rot>0?[1.3,.3]:[.1,.1]});
    cat(280,1470,1.0,{t,eyes:t>q?'slit':'calm',look:{x:.5,y:0}});if(t<ty)scanner(480,1140,.8,{rot:-1,on:1,t,txt:'BEEP'});});
  if(t>=f-.05&&t<ty+.8)digitsBar(t,f,NUM1,420);if(t>b&&t<b+.08)flash(.3);}
function s5(t){const n=wi(4,'name'),a=wi(4,'address'),r=wi(4,'registered',1),y=wi(4,'1974');const k=seg(t,T(4),E(4));
  vl(vcam(540,lerp(900,880,k),lerp(1.0,1.04,k)),1,()=>{fillAll('#1a1f3a');glow(540,860,800,'rgba(160,210,255,1)',.3);monitor(540,860,920,960,(w,h)=>record(w,h,[['OWNER','SAM DOYLE (ME)',ap(t,n-.2)],['ADDRESS','14 ALDER COURT',ap(t,a-.2)],['REGISTERED',y<t?'1974':'',ap(t,r-.1),true]],{id:NUM1.slice(-7),step:260,size:78}));});
  stamp('1974',800,1110,t,y-.03,{w:360,size:120});}
function s6(t){const b=wi(5,'born'),d=wi(5,"didn't"),n=wi(5,'notes'),r=wi(5,'three'),k=seg(t,T(5),E(5));
  vl(vcam(540,lerp(960,940,k),lerp(1.0,1.04,k)),1,()=>{fillAll('#1a1f3a');for(let i=0;i<14;i++)line(i*90,0,i*90,1920,2,'rgba(160,190,255,.07)');
    const yr=(x,y,big,s,c,a)=>{if(a<=0)return;ctx.save();ctx.globalAlpha=a;fillRR(x-400,y-150,800,300,26,'#0a0d1c');T2(s,x,y-90,42,'#cfd8ea',{w:800});T2(big,x,y+36,170,c,{w:900});ctx.restore();};
    yr(540,520,'1996','I WAS BORN',MC.led,ap(t,b-.2));yr(540,900,'1974','THE CHIP',MC.red,ap(t,b+.2));});
  const a=ap(t,d-.1);if(a>0)label('PET CHIPS DIDN\'T EXIST',540,1180,{font:'900 56px MS',h:100,a,bg:'rgba(224,54,42,.96)'});
  const q=ap(t,n-.1);if(q>0)label('NOTES (3)',540,1320,{font:'900 48px MS',h:86,a:q,bg:'rgba(255,201,60,.95)',col:'#14110a'});}
const RULES=[['FEED HIM','BEFORE DARK.'],['WHEN HE SCRATCHES,','OPEN THE DOOR.'],['NEVER SCAN','THE OWNER.']];
function notes(t,o={}){const cy=o.cy??800;fillAll('#101428');glow(540,1500,700,`rgba(${MC.lamp},1)`,.1);monitor(540,cy,940,1060,(w,h)=>{fillRR(0,0,w,92,0,'#d4281c');T2('NOTES',34,47,44,'#fff',{align:'left',w:900});T2('Entered 1974',w-30,47,28,'#ffe4dc',{align:'right',f:'PM',w:500});
    for(let r=0;r<3;r++){const k=o.reveal[r];if(k<=0)continue;const y0=180+r*290;ctx.save();ctx.beginPath();ctx.rect(0,y0-70,w*clamp(k*1.15),270);ctx.clip();T2(`${r+1}.`,50,y0,78,'#16202c',{align:'left',w:900});RULES[r].forEach((q,j)=>T2(q,150,y0+j*78,58,j===1?'#c02317':'#16202c',{align:'left',w:900}));ctx.restore();
      const c=o.circle?o.circle[r]:0;if(c>0){ctx.strokeStyle=MC.red;ctx.lineWidth=10;ctx.beginPath();ctx.ellipse(w/2,y0+40,w/2-30,115,-.02,-1.4,-1.4+6.6*clamp(c));ctx.stroke();}}});}
function s7(t){const rv=[6,7,8].map(i=>ss(seg(t,T(i)-.05,T(i)+.9)));const c=ap(t,wi(8,'owner')-.1,.6);notes(t,{reveal:rv,circle:[0,0,c],cy:lerp(800,780,seg(t,T(6),E(8)))});}
function s8(t){const l=wi(9,'laughed'),v=wi(9,'vet'),sp=wi(9,'same'),b=wi(9,'between'),k=seg(t,T(9),E(9));
  if(t<sp-.1){vl(vcam(540,lerp(1100,1060,seg(t,T(9),sp)),lerp(1.0,1.1,seg(t,T(9),sp))),1,()=>{room(t);me({x:300,y:1800,h:1100,brow:t>v+.2?'worried':'flat',mouth:t>v+.2?'flat':'smile',look:{x:.8,y:0}});vet({x:800,y:1800,h:1100,brow:'flat',mouth:'frown',look:{x:-.8,y:0}});});return;}
  // cat from behind: the X
  const q=ap(t,b-.05,.3);vl(vcam(540,lerp(1000,960,k),lerp(1.0,1.04,k)),1,()=>{fillAll('#222a4e');glow(540,950,800,`rgba(${MC.lamp},1)`,.22);ctx.save();ctx.translate(540,1560);fillRR(-210,-620,420,640,190,MC.cat);circ(0,-740,180,MC.cat);poly([-170,-800,-160,-970,-50,-890],MC.cat);poly([170,-800,160,-970,120,-930,134,-890,50,-890],MC.cat);
    ctx.strokeStyle=MC.catD;ctx.lineWidth=52;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(60,-20);ctx.quadraticCurveTo(300,0,290,-240);ctx.stroke();ell(-120,-520,70,34,-.5,MC.catD,.6);ell(120,-520,70,34,.5,MC.catD,.6);ctx.restore();
    if(q>0){ctx.save();ctx.globalAlpha=q;ctx.translate(540,1040);const r=lerp(120,84,q);line(-r,-r,r,r,24,MC.red);line(r,-r,-r,r,24,MC.red);ctx.strokeStyle=MC.red;ctx.lineWidth=10;ctx.beginPath();ctx.arc(0,0,r*1.7,0,7);ctx.stroke();ctx.restore();}});
  const a=ap(t,b+.2);if(a>0)label('EVERY ANIMAL. SAME SPOT.',540,440,{font:'900 50px MS',h:92,a,bg:'rgba(224,54,42,.96)'});}
// the grain under my own skin
function s9(t){const r=wi(10,'reached'),h=wi(10,'hard'),l=wi(10,'like'),k=seg(t,T(10),E(10));const up=ss(seg(t,r-.1,r+.6)),m=ap(t,h-.1,.4);
  vl(vcam(540,lerp(1020,1000,k),lerp(1.0,1.08,k)),1,()=>{room(t);back(540,1460,1.05);
    // my arm reaching back over the shoulder
    const hx=lerp(220,520,up),hy=lerp(1900,1300,up);line(120,1990,lerp(160,250,up),lerp(1800,1500,up),130,'#2f8f6b');line(lerp(160,250,up),lerp(1800,1500,up),hx,hy,110,'#2f8f6b');circ(hx,hy,74,'#e9b896');for(let i=0;i<4;i++)line(hx-30+i*24,hy-10,hx-20+i*20,hy-82,28,'#e9b896');
    if(m>0){ctx.save();ctx.globalAlpha=m;const mx=700,my=720,R=270;circ(mx,my,R+20,'#14161f');circ(mx,my,R,'#552a2a');ctx.save();ctx.beginPath();ctx.arc(mx,my,R,0,7);ctx.clip();fillAll('#6a3b34');for(let i=0;i<6;i++)ell(mx-200+i*80,my+Math.sin(i*2)*90,60,160,.3,'#7c4b3f',.5);chip(mx,my,lerp(320,380,seg(t,h,E(10))),-.5);ctx.restore();ctx.strokeStyle='#e5e9f2';ctx.lineWidth=12;ctx.beginPath();ctx.arc(mx,my,R+6,0,7);ctx.stroke();line(620,1000,500,1190,30,'#14161f');ctx.restore();}});}
function s10(t){const a=wi(11,'asked'),r=wi(11,'rule'),y=wi(11,'yes'),k=seg(t,T(11),E(11));
  vl(vcam(540,lerp(1080,1030,k),lerp(1.0,1.1,k)),1,()=>{room(t);me({x:290,y:1820,h:1120,brow:'worried',mouth:t>y?'frown':'flat',look:{x:.8,y:0}});vet({x:800,y:1820,h:1120,brow:'worried',mouth:'flat',look:{x:-.8,y:0},armL:[.9,1.0]});scanner(620,1150,.9,{rot:-.5,on:.3,t,txt:'...'});});
  const q=ap(t,r-.1);if(q>0)label('RULE 3: NEVER SCAN THE OWNER',540,440,{font:'900 44px MS',h:84,a:q,bg:'rgba(6,8,16,.92)'});stamp('BROKEN',540,640,t,y-.03,{size:100,w:480});}
function s11(t){const n=wi(12,'different'),ty=wi(12,'typed'),h=wi(12,'hand'),s=wi(12,'started'),k=seg(t,T(12),E(12));const sh=t>s?shakeAt(t,9,1):{x:0,y:0};
  vl(vcam(540+sh.x,lerp(1000,960,k)+sh.y,lerp(1.05,1.0,k)),1,()=>{room(t);back(300,1640,.8);vet({x:790,y:1800,h:1200,brow:t>h?'scared':'worried',mouth:t>h?'open':'flat',look:{x:-.7,y:.4},armL:[.9,.8]});if(t<ty+.3)scanner(420,1120,.9,{rot:-.7,on:1,red:true,t,txt:'BEEP'});});
  if(t<ty+.8){digitsBar(t,n-.3,NUM2,420,{d:.7});const a=ap(t,n);if(a>0)label('A DIFFERENT NUMBER',540,540,{font:'900 44px MS',h:80,a,bg:'rgba(224,54,42,.96)'});}if(t>T(12)&&t<T(12)+.08)flash(.35,'#ff5040');}
function rec2(w,h,t){const a=wi(13,'animal'),s=wi(13,'status'),r=wi(13,'reported'),y=wi(13,'1974');record(w,h,[['ANIMAL','HUMAN',ap(t,a-.2)],['STATUS','LOST',ap(t,s-.1),true],['REPORTED MISSING',t>y-.1?'1974':'',ap(t,r-.2),true],['OWNER','',ap(t,r-.2)]],{title:'PET REGISTRY',id:NUM2.slice(-7),step:190,size:68,bar:'#a8281e'});
  const q=ap(t,a-.1);if(q>0){ctx.save();ctx.globalAlpha=q;fillRR(w-300,120,270,300,8,'#7a93b8');ctx.save();rr(w-300,120,270,300,8);ctx.clip();me({x:w-165,y:560,h:520,mouth:'flat'});ctx.restore();ctx.restore();}}
function s12(t){const k=seg(t,T(13),E(13));vl(vcam(540,lerp(900,880,k),lerp(1.0,1.05,k)),1,()=>{fillAll('#241022');glow(540,860,800,'rgba(255,120,110,1)',.25);monitor(540,860,920,1000,(w,h)=>rec2(w,h,t));});}
function s13(t){const p=wi(14,'reached'),o=wi(14,'one'),sc=wi(14,'screen'),k=seg(t,T(14),E(14));const pk=ss(seg(t,p-.1,o+.2)),hit=t>sc-.05;
  vl(vcam(540,lerp(1000,960,k),lerp(1.02,1.1,k)),1,()=>{fillAll('#241022');glow(540,760,800,'rgba(255,120,110,1)',.25);monitor(540,790,920,880,(w,h)=>{rec2(w,h,t+99);if(hit)paw(280,772,.62,'#14151a',ap(t,sc-.05,.15));});
    cat(560,1900,1.25,{t,eyes:hit?'wide':'calm',look:{x:0,y:-.8}});if(pk>0){const hx=lerp(640,360,pk),hy=lerp(1720,1130,pk);ctx.lineCap='round';line(640,1760,hx,hy,74,MC.cat);ell(hx,hy,52,44,0,'#d5d9e0');}});
  if(t>sc&&t<sc+.1)flash(.35);const q=ap(t,sc+.05);if(q>0)label('OWNER: FOUND',540,1310,{font:'900 56px MS',h:98,a:q,bg:'rgba(224,54,42,.96)'});}
// door to door, the poster
function s14(t){const s=wi(15,'stray'),d=wi(15,'door'),l=wi(15,'looking'),pt=wi(15,'pet'),k=seg(t,T(15),E(15));
  if(t<l-.1){const q=seg(t,T(15),l);vl(vcam(lerp(420,660,q),1200,1.0),1,()=>{fillAll(MC.night);for(let i=0;i<40;i++)circ(hash(i)*1400-100,hash(i+9)*700,2+hash(i*3)*2,'#dfe6ff',.7);
      for(let i=0;i<6;i++){const x=-140+i*300,c=['#3b4a7a','#55406e','#3a5b70'][i%3];fillRR(x,960,250,600,6,c);poly([x-30,960,x+125,800,x+280,960],'#2a2340');fillRR(x+80,1280,90,280,4,'#c9a050');fillRR(x+30,1040,70,90,4,'#ffd98a');fillRR(x+150,1040,70,90,4,'#ffd98a');
        const q2=seg(t,T(15)+i*.5,T(15)+i*.5+.3);if(q2>0){ctx.save();ctx.globalAlpha=q2;line(x+60,1340,x+190,1470,14,MC.red);line(x+190,1340,x+60,1470,14,MC.red);ctx.restore();}}
      ctx.fillStyle='#2b2f4c';ctx.fillRect(-300,1560,1800,700);line(-300,1720,1500,1720,8,'rgba(255,220,120,.4)');cat(lerp(300,900,q),1700,.5,{t,eyes:'calm',look:{x:1,y:0}});});
    const a=ap(t,d-.3);if(a>0)label('DOOR TO DOOR',540,560,{font:'900 50px MS',h:88,a,bg:'rgba(255,201,60,.95)',col:'#14110a'});return;}
  const q=ap(t,l-.1,.3);vl(vcam(540,lerp(980,920,k),lerp(1.05,1.14,seg(t,l,E(15)))),1,()=>{fillAll(MC.night);glow(540,800,900,`rgba(${MC.lamp},1)`,.4);fillRR(470,-200,140,2400,6,'#4a3a33');for(let i=0;i<9;i++)line(490,i*260,590,i*260+20,4,'#3a2d27');poster(540,800,1.25,.03);cat(820,1740,.75,{t,eyes:'slit',look:{x:-1,y:-.2}});});
  if(t>pt&&t<pt+.08)flash(.3);}
// the last line: inside, his paws under the door
function s15(t){const k=seg(t,T(16),TL.total);const sc=Math.sin(t*9)>0;
  vl(vcam(540,lerp(1140,1180,k),lerp(1.0,1.06,k)),1,()=>{hall(t);if(sc){ell(470,1553,40,14,0,'#111322');ell(610,1553,40,14,0,'#111322');}
    // two eyes through the mail slot
    circ(490,1150,14,'#ffd23c');circ(590,1150,14,'#ffd23c');circ(490,1150,6,'#14151a');circ(590,1150,6,'#14151a');glow(540,1150,130,'rgba(255,214,70,1)',.3);
    me({x:170,y:1860,h:900,brow:'scared',mouth:'o',look:{x:.9,y:-.2}});});
  ctx.save();ctx.translate(860,200);fillRR(-180,-90,360,180,20,'rgba(6,8,16,.92)');T2('4:39',0,6,120,MC.red,{w:900});ctx.restore();}
const SCENES={s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12,s13,s14,s15};
const FADES={};
const CAPY={s1:.87,s2:.86,s3:.87,s4:.87,s5:.86,s6:.8,s7:.9,s8:.87,s9:.14,s10:.87,s11:.87,s12:.87,s13:.87,s14:.87,s15:.22};
const END_AT=null;
function hud(t){const sc=sceneAt(t).id;const i=+sc.slice(1);const chips=[];
  chips.push({k:'TIME',v:i===15?'4:39 AM':i===2?'4:40 AM':'2:15 PM',hot:i===15});
  if(i>=5&&i<=7)chips.push({k:'CHIP AGE',v:'52 YRS',hot:true});if(i>=5&&i<=7)chips.push({k:'MY AGE',v:'30'});
  if(i===1||i>=10)chips.push({k:'SCANS',v:'2',hot:true});else if(i>=3)chips.push({k:'SCANS',v:'1'});
  const tag={s1:'SCAN 2',s2:'THE STRAY',s3:'HOW A CHIP WORKS',s4:'SCAN 1',s5:'THE RECORD',s6:'IMPOSSIBLE',s7:'NOTES',s8:'SAME SPOT',s9:'UNDER MY SKIN',s10:'RULE 3',s11:'SCAN 2',s12:'THE RECORD',s13:'THE OWNER',s14:'LOST',s15:'4:39'}[sc];
  return{chips,tag,tagRed:i>=10||i===1};}
