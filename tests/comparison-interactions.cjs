const {chromium}=require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs=require('node:fs'),assert=require('node:assert/strict');
let server,browser;const results=[];
const wait=p=>p.waitForTimeout(330);
async function check(name,fn){try{await fn();results.push({name,status:'PASS'});console.log('PASS',name);}catch(e){results.push({name,status:'FAIL',error:e.message});console.error('FAIL',name,e.message);}}
async function swipe(page,viewport,dx){await viewport.scrollIntoViewIfNeeded();const b=await viewport.boundingBox(),x=b.x+b.width*.6,y=b.y+Math.min(160,b.height*.5);const c=await page.context().newCDPSession(page);await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});for(let n=1;n<=10;n++){await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*n/10,y,id:1}]});await page.waitForTimeout(15);}await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(page);await c.detach();}
(async()=>{
 server=await require('./static-server.cjs').start('/vinf');browser=await chromium.launch();const missing=[],errors=[];
 for(const width of [1440,1366,768,390,375]){
  const page=await browser.newPage({viewport:{width,height:950},hasTouch:true,isMobile:width<=768});page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)missing.push(r.url());});
  await page.goto(server.base+'/vinf/index.html');
  await check(width+' menu facts and new internal destinations',async()=>{
   if(width<=768)await page.locator('.menu-toggle').tap();await page.locator('[aria-controls="menu-2"]').click();
   const viper=page.locator('#menu-2 .mega-product-card').filter({hasText:'Viper'});assert.match(await viper.innerText(),/35\.000\.000 VNĐ/);assert(!(await viper.innerText()).includes('km/h'));assert.match(await viper.getAttribute('href'),/\/vinf\/pages\/viper.html$/);
   await page.keyboard.press('Escape');if(width<=768)await page.locator('.menu-toggle').tap();
   const root=page.locator('[data-showcase="cars-0"]');await root.locator('[data-model="5"]').click();await wait(page);assert.match(await root.locator('[data-model-link]').getAttribute('href'),/\/vinf\/pages\/vf5.html$/);
   await root.locator('[data-model="9"]').click();await wait(page);assert.match(await root.locator('[data-model-price]').textContent(),/1,3 tỷ/);
   assert((await page.locator('[data-showcase="scooters-0"] [data-model-specs]').textContent()).includes('km/lần sạc'));
   for(const url of await page.locator('.accessory-list a').evaluateAll(nodes=>nodes.map(n=>n.href)))assert(url.endsWith('/vinf/pages/accessories.html'));
   if(width>1200){const r=await root.locator('.swipe-slide:not([hidden]) .showcase-info').evaluate(e=>{const stats=e.querySelector('[data-model-specs]').getBoundingClientRect(),price=e.querySelector('[data-model-price]').getBoundingClientRect();return {stats,price};});assert(Math.abs(r.stats.top-r.price.top)<40);}
  });
  await page.goto(server.base+'/vinf/pages/vf5.html');
  await check(width+' VF5 gallery touch both ways, tabs and contextual CTA',async()=>{
   const viewport=page.locator('.detail-gallery .swipe-viewport');await viewport.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await swipe(page,viewport,-140);assert.equal(await viewport.getAttribute('data-swipe-index'),'1');await swipe(page,viewport,140);assert.equal(await viewport.getAttribute('data-swipe-index'),'0');
   await page.locator('#vf5-specs-tab-1').click();assert.match(await page.locator('#vf5-specs-panel-1').textContent(),/37,23 kWh/);assert.match(await page.locator('#vf5-specs-panel-1').textContent(),/33 phút/);
   await page.locator('a[href*="test-drive.html?model=vf5"]').click();assert.equal(await page.locator('#model').inputValue(),'vf5');
  });
  await page.goto(server.base+'/vinf/pages/viper.html');
  await check(width+' Viper colors touch both ways and distinct equipment',async()=>{
   const viewport=page.locator('[data-viper-colors]');await viewport.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await swipe(page,viewport,-140);assert.equal(await viewport.getAttribute('data-swipe-index'),'1');assert.equal(await page.locator('[data-viper-color="1"]').getAttribute('aria-pressed'),'true');await swipe(page,viewport,140);assert.equal(await viewport.getAttribute('data-swipe-index'),'0');
   await page.locator('[data-viper-color="3"]').click();await wait(page);assert.match(await page.locator('[data-viper-color-name]').textContent(),/Đen/);
   await page.locator('#viper-specs-tab-1').click();assert.match(await page.locator('#viper-specs-panel-1').textContent(),/1,5 kWh/);assert.equal(await page.locator('.viper-equipment img').count(),4);
   assert(!(await page.locator('main').innerText()).includes('Kinet'));
  });
  await check(width+' mounted local links resolve without leaving /vinf/',async()=>{
   const links=await page.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.href));for(const url of [...new Set(links)].filter(u=>u.startsWith(server.base))){assert(new URL(url).pathname.startsWith('/vinf/'));assert((await page.request.get(url)).ok(),url);}
  });await page.close();
 }
 await check('No JS errors or missing runtime assets',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);});
})().catch(e=>{console.error(e);results.push({name:'runner',status:'FAIL',error:e.stack});}).finally(async()=>{fs.mkdirSync('tests/comparison',{recursive:true});fs.writeFileSync('tests/comparison/interactions.json',JSON.stringify(results,null,2));if(browser)await browser.close();if(server)await server.close();if(results.some(r=>r.status==='FAIL'))process.exitCode=1;});
