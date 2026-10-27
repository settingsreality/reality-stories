// Shared drawings for explainers (load after engine.js + engine2.js). Draw in world coordinates.
// earth(x,y,r,{spin}) — ocean, recognisable continents, clouds, night side, atmosphere rim
// blackHole(x,y,R,t) — Interstellar-style: shadow, photon ring, disk passing in FRONT along the bottom and lensed OVER the top
const _LAND=[ // rough continents in unit-disc coordinates (x right, y down), as seen with the Atlantic facing us
 [[-.62,-.55],[-.35,-.62],[-.22,-.45],[-.3,-.3],[-.42,-.18],[-.36,-.05],[-.48,.0],[-.58,-.2],[-.7,-.35]],          // North America
 [[-.34,.05],[-.18,.08],[-.1,.25],[-.2,.5],[-.28,.72],[-.36,.6],[-.38,.32],[-.42,.15]],                       // South America
 [[.05,-.12],[.3,-.18],[.42,-.02],[.4,.2],[.3,.42],[.18,.55],[.12,.38],[.02,.18],[-.02,.0]],                   // Africa
 [[.02,-.5],[.25,-.58],[.5,-.52],[.62,-.38],[.4,-.28],[.22,-.25],[.08,-.3]],                                    // Europe
 [[.62,.35],[.78,.3],[.86,.45],[.72,.55],[.6,.48]],                                                              // Australia (on the limb)
 [[-.25,-.9],[.2,-.95],[.45,-.82],[0,-.78]]];                                                                     // Greenland/arctic
function earth(x,y,r,o={}){const sp=(o.spin||0)%2;ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.clip();
  ctx.fillStyle=(()=>{const g=ctx.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r);g.addColorStop(0,'#3d8be0');g.addColorStop(1,'#123d78');return g;})();ctx.fillRect(x-r,y-r,2*r,2*r);
  for(const d of[0,-2,2])for(const L of _LAND){ctx.fillStyle='#4f9a5c';ctx.beginPath();L.forEach(([u,v],i)=>{const X=x+(u+sp+d)*r,Y=y+v*r;i?ctx.lineTo(X,Y):ctx.moveTo(X,Y);});ctx.closePath();ctx.fill();}
  ctx.fillStyle='rgba(255,255,255,.5)';for(let i=0;i<7;i++){const u=fract(hash(i*3.1)+sp*.3)*2.4-1.2,v=hash(i*7.7)*1.6-.8;ell(x+u*r,y+v*r,r*(.18+hash(i)*.2),r*.05,.3,'rgba(255,255,255,.45)');}
  ctx.fillStyle=(()=>{const g=ctx.createLinearGradient(x-r,y,x+r,y);g.addColorStop(.55,'rgba(4,8,20,0)');g.addColorStop(1,'rgba(4,8,20,.65)');return g;})();ctx.fillRect(x-r,y-r,2*r,2*r);ctx.restore();
  ctx.strokeStyle='rgba(140,190,255,.55)';ctx.lineWidth=Math.max(2,r*.03);ctx.beginPath();ctx.arc(x,y,r*1.01,0,7);ctx.stroke();glow(x,y,r*1.5,'rgba(110,168,255,1)',.16);}
function blackHole(x,y,R,t=0,o={}){const tilt=o.tilt??-.12,A=R*2.6,B=R*.42;ctx.save();ctx.translate(x,y);ctx.rotate(tilt);
  const disk=(from,to,w,al)=>{for(let k=0;k<5;k++){const f=k/4;ctx.strokeStyle=`rgba(255,${Math.round(lerp(150,235,f))},${Math.round(lerp(70,190,f))},${al*(1-f*.5)})`;ctx.lineWidth=w*(1-f*.6);ctx.beginPath();ctx.ellipse(0,0,A*(1-f*.12),B*(1-f*.12),0,from,to);ctx.stroke();}};
  glow(0,0,R*4,'rgba(255,160,70,1)',.16);
  disk(Math.PI,2*Math.PI,R*.32,.85);                                   // back half of the disk (behind the hole)
  // the far side of the disk, bent by gravity into an arc over the top and a thin one under the bottom
  ctx.strokeStyle='rgba(255,205,140,.9)';ctx.lineWidth=R*.2;ctx.beginPath();ctx.ellipse(0,-R*.08,R*1.28,R*1.18,0,Math.PI*1.04,Math.PI*1.96);ctx.stroke();
  ctx.strokeStyle='rgba(255,205,140,.55)';ctx.lineWidth=R*.07;ctx.beginPath();ctx.ellipse(0,R*.06,R*1.14,R*1.1,0,Math.PI*.1,Math.PI*.9);ctx.stroke();
  circ(0,0,R,'#000');                                                  // the shadow
  ctx.strokeStyle='rgba(255,240,215,.95)';ctx.lineWidth=R*.035;ctx.beginPath();ctx.arc(0,0,R*1.03,0,7);ctx.stroke();   // photon ring
  // front half of the disk, in front of the hole; the side coming toward us is brighter
  for(let k=0;k<5;k++){const f=k/4;const g=ctx.createLinearGradient(-A,0,A,0);g.addColorStop(0,`rgba(255,240,200,${.95-f*.3})`);g.addColorStop(1,`rgba(255,140,60,${.55-f*.25})`);
    ctx.strokeStyle=g;ctx.lineWidth=R*.32*(1-f*.6);ctx.beginPath();ctx.ellipse(0,0,A*(1-f*.12),B*(1-f*.12),0,0,Math.PI);ctx.stroke();}
  ctx.restore();}
