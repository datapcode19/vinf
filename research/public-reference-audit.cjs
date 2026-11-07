const fs=require('node:fs');
const {chromium}=require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
(async()=>{
 fs.mkdirSync('research/current',{recursive:true});
 const browser=await chromium.launch({headless:true});
 const report=[];
 for(const [slug,url] of [['home','https://vinfastauto.com/vn_vi'],['language','https://vinfastauto.com/vn_en']]){
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const failed=[];page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  try{const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:30000});await page.waitForTimeout(12000);const html=await page.content();fs.writeFileSync(`research/current/${slug}.html`,html);await page.screenshot({path:`research/current/${slug}-1440.png`,fullPage:true});
   const images=await page.locator('img,video,source').evaluateAll(ns=>ns.map(n=>({tag:n.tagName,alt:n.alt||'',src:n.currentSrc||n.src||n.getAttribute('srcset')||'',poster:n.poster||''})));
   const links=await page.locator('a[href]').evaluateAll(ns=>ns.map(n=>({text:n.textContent.trim(),url:n.href})).filter(n=>n.text));
   report.push({slug,url,status:response.status(),title:await page.title(),text:(await page.locator('body').innerText()).slice(0,2000),blocked:/IM_UNDER_ATTACK|captcha|challenge-platform/i.test(html),images,links,failed});
  }catch(e){report.push({slug,url,error:e.message,failed});}
  await page.close();
 }
 await browser.close();
 for(const [slug,url] of [['robots','https://vinfastauto.com/robots.txt'],['sitemap','https://vinfastauto.com/sitemap.xml']]){
  try{const r=await fetch(url,{signal:AbortSignal.timeout(20000)});const body=await r.text();fs.writeFileSync('research/current/'+slug+'.txt',body);report.push({slug,url,status:r.status,blocked:/IM_UNDER_ATTACK|captcha|challenge-platform/i.test(body),length:body.length});}catch(e){report.push({slug,url,error:e.message});}
 }
 fs.writeFileSync('research/current/audit.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report.map(({images,links,failed,text,...r})=>({...r,images:images?.length,links:links?.length,failed:failed?.length}))));
})().catch(e=>{console.error(e);process.exit(1)});
