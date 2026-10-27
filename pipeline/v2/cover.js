// v2 cover: node pipeline/v2/cover.js <wwwdir> <t> <out.jpg> '<hook html, key word in <i>..</i>>' [kicker]
// renders the frame at t, hides the moving captions/end card, puts the hook big in the middle of the frame
const { chromium } = require('playwright');const path=require('path'),fs=require('fs');
const [,,www,tt,out,cap,kick]=process.argv;const ROOT=path.resolve(www);
(async()=>{const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});page.on('pageerror',e=>console.log('[err]',e.message));
 await page.route('http://local/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!fs.existsSync(f))return r.fulfill({status:404});r.fulfill({body:fs.readFileSync(f)});});
 await page.goto('http://local/index.html?render');await page.waitForFunction(()=>window.READY===true);
 await page.evaluate(t=>window.renderAt(t),+tt);
 await page.evaluate(({cap,kick})=>{const c=document.getElementById('cap');c.style.opacity=1;c.style.transform='none';c.style.top='560px';c.style.fontSize='44px';c.style.lineHeight='1.05';
   c.innerHTML=cap.replace(/<i>/g,'<span class="e">').replace(/<\/i>/g,'</span>');
   document.getElementById('end').style.opacity=0;document.getElementById('dim').style.opacity=.15;
   if(kick){const h=document.getElementById('hud');h.innerHTML=`<div class="tag" style="font-size:12px;padding:5px 9px">${kick}</div>`;}},{cap,kick});
 await page.screenshot({path:out,type:'jpeg',quality:92,clip:{x:0,y:0,width:540,height:960}});await browser.close();})();
