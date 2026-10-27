// ===================== {{TITLE}}, scene by scene (v2: full 1080x1920 frame) =====================
// One function per scene tag in script.py. T(i)/E(i) = start/end of narration line i; W(i,k) = k (0..1) through line i.
// TL.lines[i].words = [{w,start,end}] when voiced with ElevenLabs (word-accurate cues: WT(i,j) = start of word j of line i).
const T=i=>TL.lines[i].start,E=i=>TL.lines[i].end,W=(i,k)=>lerp(T(i),E(i),k);
const WT=(i,j)=>{const w=TL.lines[i].words;return w&&w[j]?w[j].start:W(i,j/Math.max(1,TL.lines[i].text.split(' ').length));};
// s1 is the cold open: the scariest image, on screen from frame 1, no fade.
function s1(t){place1({x:540,y:960,z:lerp(1.0,1.08,seg(t,0,E(0)))},t,{});}
function s2(t){place1({x:540,y:960,z:1},t,{});}
const SCENES={s1,s2};
const FADES={};                 // {scene:[fade in, fade out]} seconds; default hard cuts with a punch-in
const CAPY={};                  // {scene: caption top as a fraction of height} (default .6)
function hud(t){return{chips:[{k:'NIGHT',v:'1'},{k:'TIME',v:'2:14 AM'}],tag:'{{TITLE_UP}}'};}
