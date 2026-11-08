const {chromium}=require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs=require('node:fs'),assert=require('node:assert/strict');
const paths=['about.html','vingroup.html','maintenance.html','repair.html','scooter-battery.html','scooter-warranty.html','service-booking.html','accessories.html',...['EEP71061000','ACS10000246','ACS40000094','EEP69072176AB'].map(id=>'accessory.html?id='+id)];
let browser,server;const checks=[],errors=[],badResponses=[],requests=[];
(async()=>{
 fs.mkdirSync('tests/support-pages',{recursive:true});server=await require('./static-server.cjs').start('/vinf');browser=await chromium.launch({headless:true});const page=await browser.newPage();
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)badResponses.push(r.url());});page.on('request',r=>requests.push({url:r.url(),method:r.method()}));
 const go=path=>page.goto(server.base+'/vinf/pages/'+path);
 const links=new Set();
 for(const width of [1920,1440,1366,1024,768,390,375]){
  await page.setViewportSize({width,height:900});
  for(const [i,path] of paths.entries()){
   await go(path);await page.locator('main h1').waitFor();
   await page.locator('img').evaluateAll(images=>Promise.all(images.map(img=>{img.loading='eager';return img.decode();})));
   await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,width+' '+path);
   const urls=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.href));
   assert.equal(urls.some(url=>/^https?:\/\/(shop\.)?vinfastauto\.com\//.test(url)),false);
   urls.filter(url=>url.startsWith(server.base)).forEach(url=>links.add(url.split('#')[0]));
   if([1440,390].includes(width))await page.screenshot({path:`tests/support-pages/${width}-${i}.png`,fullPage:true});
   checks.push({width,path,status:'PASS'});
  }
 }
 for(const link of links){assert(new URL(link).pathname.startsWith('/vinf/'));assert((await page.request.get(link)).ok(),link);}
 await go('maintenance.html');for(const id of ['vf3','vf6','vf7','minio','ecvan','limo']){await page.locator('#schedule-model').selectOption(id);const img=page.locator('#schedule-image');await img.evaluate(i=>i.decode());assert.match(await img.getAttribute('src'),new RegExp('/'+id+'.png$'));assert.equal(await page.locator('#schedule-original').getAttribute('href'),await img.getAttribute('src'));}
 await page.locator('#maintenance-0-label').click();assert.equal(await page.locator('#maintenance-0-label').getAttribute('aria-expanded'),'true');
 await go('repair.html');await page.locator('#repair-types-tab-1').click();assert.match(await page.locator('#repair-types-panel-1 img').getAttribute('src'),/repair-body.jpg/);
 await go('about.html');await page.locator('#history-tab-0').focus();await page.keyboard.press('End');assert.equal(await page.locator('#history-tab-2').getAttribute('aria-selected'),'true');
 await go('accessories.html');await page.locator('#accessories-tab-2').click();assert.equal(await page.locator('#accessories-panel-2 article').count(),1);await page.locator('#accessories-panel-2 a').first().click();assert.match(page.url(),/EEP69072176AB/);await page.locator('[data-demo-order]').click();assert(await page.locator('#accessory-demo').isVisible());await page.keyboard.press('Escape');assert(await page.locator('#accessory-demo').isHidden());await page.reload();assert.match(await page.locator('main h1').textContent(),/3 kW/);await page.goBack();assert.match(page.url(),/accessories.html$/);await page.goForward();assert.match(page.url(),/EEP69072176AB/);
 await go('service-booking.html');await page.locator('button[type=submit]').click();assert.equal(await page.locator('form').evaluate(f=>f.checkValidity()),false);await page.locator('[name=vehicle]').selectOption({index:1});await page.locator('[name=service]').selectOption({index:1});await page.locator('[name=date]').fill('2000-01-01');await page.locator('input[type=checkbox]').check();assert.equal(await page.locator('form').evaluate(f=>f.checkValidity()),false);const min=await page.locator('[name=date]').getAttribute('min');await page.locator('[name=date]').fill(min);await page.locator('button[type=submit]').click();assert.match(await page.locator('#booking-status').textContent(),/Không tạo lịch hẹn thật/);await page.locator('button[type=reset]').click();assert.equal(await page.locator('#booking-status').textContent(),'');
 assert.deepEqual(errors,[]);assert.deepEqual(badResponses,[]);assert.equal(requests.filter(r=>r.method!=='GET').length,0);assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);
 const report={date:'2026-11-08',checks,links:links.size,errors,badResponses,interactions:'6 schedules, process accordion, repair tabs, history keyboard, category tabs, product dialog, reload/history, booking validation/reset PASS',visualComparison:'UNVERIFIED'};
 fs.writeFileSync('tests/support-pages/results.json',JSON.stringify(report,null,2));
 fs.writeFileSync('tests/support-pages/index.html',`<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Kiểm tra trang phụ</title><style>body{font:16px/1.6 Arial;max-width:1100px;margin:auto;padding:24px}.pair{display:grid;grid-template-columns:3fr 1fr;gap:20px}img{width:100%}section{margin:32px 0}summary{cursor:pointer}@media(max-width:600px){.pair{grid-template-columns:1fr}}</style><h1>Trang phụ — screenshot cục bộ</h1><p>Chưa đối chiếu screenshot production. <a href="results.json">Kết quả kiểm thử</a></p>${paths.map((path,i)=>`<section><h2>${path}</h2><a href="1440-${i}.png">1440px</a> · <a href="390-${i}.png">390px</a><details><summary>Xem ảnh</summary><div class="pair"><img loading="lazy" src="1440-${i}.png" alt="Desktop"><img loading="lazy" src="390-${i}.png" alt="Mobile"></div></details></section>`).join('')}</html>`);
 console.log(JSON.stringify({states:checks.length,links:links.size,errors,badResponses}));
})().catch(e=>{console.error(e);fs.writeFileSync('tests/support-pages/failure.json',JSON.stringify({error:e.message,checks,errors,badResponses},null,2));process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();if(server)await server.close();});
