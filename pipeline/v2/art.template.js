// ===================== {{TITLE}}: places and things (v2) =====================
// Draw in a 1080x1920 world. vl(cam,depth,fn) sets the camera ({x,y,z} = centre + zoom) for a layer.
// engine.js: fillRR, circ, ell, line, poly, glow, text, rng, hash, lerp, ss, seg, clamp, shade
// engine2.js: toon(), snow(), beam(), label(), waveform(), vgrad(), fillAll(), blackout(), shakeAt()
function place1(cam,t,o){vl(cam,1,()=>{fillAll('#14171c');ctx.fillStyle='#1d2127';ctx.fillRect(-500,1300,2080,900);
  toon({x:540,y:1500,h:700,hat:'beanie',tag:'NIGHT\nGROOMER',brow:'worried',mouth:'o'});});}
