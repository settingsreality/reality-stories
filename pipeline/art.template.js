// ===================== {{TITLE}}: places and things =====================
// Draw in a 1920x1080 world. wl(cam,depth,fn) sets the camera ({x,y,z} = center + zoom) for that layer.
// Helpers from engine.js: fillRR, circ, ell, line, poly, glow, text, person, YOU, PAL, rng, hash, lerp, ss, seg, clamp.
function place1(cam,t,o){wl(cam,1,()=>{ctx.fillStyle='#14171c';ctx.fillRect(-900,-600,3720,2280);
  ctx.fillStyle='#1d2127';ctx.fillRect(-900,800,3720,900);
  YOU({x:960,y:800,h:400,face:1,eyes:1});});}
