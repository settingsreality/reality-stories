// node cover.js <wwwdir> <t> <out.jpg> '<caption html>' [kicker]
const { chromium } = require('playwright');const path=require('path'),fs=require('fs');
const [,,www,tt,out,cap,kick]=process.argv;const ROOT=path.resolve(www);
const MIME={'.html':'text/html','.js':'text/javascript','.woff2':'font/woff2','.svg':'image/svg+xml','.json':'application/json'};
(async()=>{const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:540,height:960},deviceScaleFactor:2});page.on('pageerror',e=>console.log('[err]',e.message));
 await page.route('http://local/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!fs.existsSync(f))return r.fulfill({status:404});r.fulfill({body:fs.readFileSync(f),contentType:MIME[path.extname(f)]||'application/octet-stream'});});
 await page.goto('http://local/index.html?render');await page.waitForFunction(()=>window.READY===true);
 await page.evaluate(t=>window.renderAt(t),+tt);
 await page.evaluate(({cap,kick})=>{const c=document.getElementById('cap');c.className='';c.style.opacity=1;c.style.visibility='visible';c.innerHTML=cap;c.style.fontSize='34px';c.style.top='668px';
   c.querySelectorAll('span').forEach(s=>s.style.opacity=1);document.getElementById('prog').style.display='none';
   const t=document.querySelector('.t');t.style.fontSize='54px';document.querySelector('.top').style.top='96px';if(kick)document.querySelector('.k').textContent=kick;
   const e=document.getElementById('end');if(e)e.style.opacity=0;const ec=document.getElementById('endcap');if(ec)ec.style.opacity=0;},{cap,kick});
 await page.screenshot({path:out,type:'jpeg',quality:92,clip:{x:0,y:0,width:540,height:960}});await browser.close();})();
