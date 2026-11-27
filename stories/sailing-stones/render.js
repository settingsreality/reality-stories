const { chromium } = require('playwright');
const path=require('path'),fs=require('fs');
const {spawn}=require('child_process');
const ROOT=path.join(__dirname,'www');
const MIME={'.html':'text/html','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml','.json':'application/json','.png':'image/png'};
(async()=>{
  const args=process.argv.slice(2);
  const mode=args[0]; // 'stills' or 'video'
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});
  page.on('console',m=>console.log('[page]',m.text()));page.on('pageerror',e=>console.log('[err]',e.message));
  await page.route('http://local/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));
    if(!fs.existsSync(f))return r.fulfill({status:404});r.fulfill({body:fs.readFileSync(f),contentType:MIME[path.extname(f)]||'application/octet-stream'});});
  await page.goto('http://local/index.html?render');
  await page.waitForFunction(()=>window.READY===true,null,{timeout:120000});
  if(mode==='stills'){
    const times=args[1].split(',').map(Number);const out=args[2];fs.mkdirSync(out,{recursive:true});
    for(const t of times){const s=Date.now();await page.evaluate(t=>window.renderAt(t),t);
      await page.screenshot({path:`${out}/t${t.toFixed(2)}.png`,clip:{x:0,y:0,width:540,height:960}});console.log('t',t,Date.now()-s,'ms');}
  } else {
    const fps=30,t0=+args[1]||0,t1=+args[2]||10,out=args[3];
    const ff=spawn('ffmpeg',['-y','-v','error','-f','image2pipe','-framerate',String(fps),'-c:v','png','-i','-','-c:v','libx264','-preset','veryfast','-crf','18','-pix_fmt','yuv420p',out],{stdio:['pipe','inherit','inherit']});
    const N=Math.round((t1-t0)*fps);const st=Date.now();
    for(let i=0;i<N;i++){const t=t0+i/fps;await page.evaluate(t=>window.renderAt(t),t);
      const buf=await page.screenshot({clip:{x:0,y:0,width:540,height:960},type:'png'});
      if(!ff.stdin.write(buf))await new Promise(r=>ff.stdin.once('drain',r));
      if(i%30===0)console.log(`frame ${i}/${N} ${((Date.now()-st)/1000).toFixed(0)}s`);}
    ff.stdin.end();await new Promise(r=>ff.on('close',r));
  }
  await browser.close();
})();
