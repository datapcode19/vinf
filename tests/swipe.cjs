const {chromium}=require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const results=[];
let browser,server;
async function check(name,run){try{await run();results.push({name,status:'PASS'});console.log('PASS',name);}catch(error){results.push({name,status:'FAIL',error:error.message});console.error('FAIL',name,error.message);}}
const wait=page=>page.waitForTimeout(440);
const index=viewport=>viewport.getAttribute('data-swipe-index').then(Number);
async function center(viewport){await viewport.scrollIntoViewIfNeeded();const b=await viewport.boundingBox();return {x:b.x+b.width*.7,y:b.y+Math.min(b.height*.5,230),width:b.width};}
async function mouseDrag(page,viewport,dx,{pause=0,steps=12}={}){
 const p=await center(viewport);await page.mouse.move(p.x,p.y);await page.mouse.down();
 await page.mouse.move(p.x+dx,p.y+2,{steps});
 const during=await viewport.locator('.swipe-slide:not([hidden])').first().evaluate(e=>getComputedStyle(e).transform);
 if(pause)await page.waitForTimeout(pause);
 await page.mouse.up();await wait(page);return during;
}
async function touchDrag(page,cdp,viewport,dx,dy=0,{steps=10,delay=18}={}){
 const p=await center(viewport);
 // Real browser touch input via CDP, not JavaScript-dispatched PointerEvents.
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:p.x,y:p.y,id:1}]});
 for(let n=1;n<=steps;n++){
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:p.x+dx*n/steps,y:p.y+dy*n/steps,id:1}]});
  await page.waitForTimeout(delay);
 }
 const during=await viewport.locator('.swipe-slide:not([hidden])').first().evaluate(e=>getComputedStyle(e).transform);
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(page);return during;
}
(async()=>{
 fs.mkdirSync('tests/swipe',{recursive:true});
 server=await require('./static-server.cjs').start('/vinf');browser=await chromium.launch({headless:true});
 for(const width of [375,390,768,1366,1440]){
  const context=await browser.newContext({viewport:{width,height:950},hasTouch:true,isMobile:width<1000});
  const page=await context.newPage(),cdp=await context.newCDPSession(page),errors=[],broken=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)broken.push(r.url());});
  for(const [path,selector,count] of [['index.html','.home-hero .swipe-viewport',2],['pages/vf3.html','.vf3-gallery .swipe-viewport',4]]){
   const label=width+' '+path;
   await page.goto(server.base+'/vinf/'+path);
   const viewport=page.locator(selector);
   await viewport.waitFor();
   await viewport.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));
   await wait(page);
   await check(label+' mouse follows pointer + next/previous',async()=>{
    const transform=await mouseDrag(page,viewport,-Math.min(width*.45,260));assert.notEqual(transform,'none');assert.notEqual(transform,'matrix(1, 0, 0, 1, 0, 0)');assert.equal(await index(viewport),1);
    await mouseDrag(page,viewport,Math.min(width*.3,190));assert.equal(await index(viewport),0);
   });
   await check(label+' short drag snaps back',async()=>{await mouseDrag(page,viewport,-15,{pause:180});assert.equal(await index(viewport),0);});
   await check(label+' CDP touch left/right follows finger',async()=>{
    const transform=await touchDrag(page,cdp,viewport,-Math.min(width*.4,240));assert.notEqual(transform,'matrix(1, 0, 0, 1, 0, 0)');assert.equal(await index(viewport),1);
    await touchDrag(page,cdp,viewport,Math.min(width*.25,180));assert.equal(await index(viewport),0);
   });
   await check(label+' CDP vertical touch scrolls page without changing slide',async()=>{
    await center(viewport);const before=await page.evaluate(()=>scrollY),old=await index(viewport);
    await touchDrag(page,cdp,viewport,5,-160);
    assert.equal(await index(viewport),old);assert(await page.evaluate(()=>scrollY)>before+40);
   });
   await check(label+' quick flick + repeated swipes + loop + pagination + height',async()=>{
    await center(viewport);const height=await viewport.evaluate(e=>e.offsetHeight);
    await touchDrag(page,cdp,viewport,-60,0,{steps:3,delay:5});assert.equal(await index(viewport),1);
    for(let n=0;n<count+1;n++)await mouseDrag(page,viewport,-Math.min(width*.4,240));
    assert.equal(await index(viewport),(count+2)%count);
    assert.equal(await viewport.evaluate(e=>e.offsetHeight),height);
    const root=viewport.locator('..');assert.equal(await root.locator('[data-slide-to][aria-pressed="true"]').getAttribute('data-slide-to'),String(await index(viewport)));
    assert.equal(await viewport.locator('.swipe-slide:not([hidden])').count(),1);
   });
   await check(label+' horizontal wheel; vertical wheel remains scroll',async()=>{
    const p=await center(viewport),before=await index(viewport);await page.mouse.move(p.x,p.y);await page.mouse.wheel(130,0);await wait(page);assert.equal(await index(viewport),(before+1)%count);
    const y=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,180);await wait(page);assert(await page.evaluate(()=>scrollY)>y);assert.equal(await index(viewport),(before+1)%count);
   });
   await check(label+' reduced motion + resize + no overflow',async()=>{
    await page.emulateMedia({reducedMotion:'reduce'});await mouseDrag(page,viewport,-Math.min(width*.4,240));
    assert.equal(await viewport.locator('.swipe-slide:not([hidden])').count(),1);
    await page.setViewportSize({width:width===1440?390:1440,height:950});await wait(page);assert.equal(await viewport.evaluate(e=>Math.round(e.getBoundingClientRect().height)),await viewport.locator('.swipe-slide:not([hidden])').evaluate(e=>Math.ceil(e.getBoundingClientRect().height)));
    await page.setViewportSize({width,height:950});await wait(page);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.emulateMedia({reducedMotion:'no-preference'});
   });
   await page.screenshot({path:`tests/swipe/${width}-${path.includes('vf3')?'vf3':'home'}.png`});
  }
  await page.goto(server.base+'/vinf/index.html');
  await check(width+' product scenes move image + specs together; buttons and links',async()=>{
   const root=page.locator('[data-showcase="cars-0"]'),viewport=root.locator('.swipe-viewport');
   await viewport.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await wait(page);
   const height=await viewport.evaluate(e=>e.offsetHeight);
   await touchDrag(page,cdp,viewport,-Math.min(width*.4,220));assert.equal(await index(viewport),1);
   assert.equal(await root.locator('[data-model="1"]').getAttribute('aria-pressed'),'true');
   assert(await root.locator('[data-model-image]').evaluate(e=>e.closest('.swipe-slide')===document.querySelector('[data-showcase="cars-0"] [data-model-specs]').closest('.swipe-slide')));
   await root.locator('[data-model-next]').click();await wait(page);assert.equal(await index(viewport),2);assert.equal(await viewport.evaluate(e=>e.offsetHeight),height);
   await root.locator('[data-model="1"]').click();await wait(page);assert.equal(await index(viewport),1);
   const href=await root.locator('[data-model-link]').getAttribute('href');assert(!href.startsWith('/pages/'));
   await root.locator('[data-model-link]').click();await page.waitForURL(url=>!url.pathname.endsWith('index.html'));assert(page.url().includes('/vinf/'));
  });
  await page.goto(server.base+'/vinf/pages/product.html?id=kinet');
  await check(width+' Kinet color image swipe and swatch synchronization',async()=>{
   const viewport=page.locator('.vehicle-stage .swipe-viewport');await viewport.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>i.decode())));await wait(page);
   await touchDrag(page,cdp,viewport,-Math.min(width*.4,220));assert.equal(await index(viewport),1);assert.equal(await page.locator('[data-color="1"]').getAttribute('aria-pressed'),'true');
   await page.locator('[data-color="4"]').click();await wait(page);assert.equal(await index(viewport),4);assert.equal(await page.locator('#vehicle-image').count(),1);
  });
  await page.goto(server.base+'/vinf/index.html');
  await check(width+' native touch + mouse scrolling model row and normal hero link click',async()=>{
   const row=page.locator('[data-showcase="cars-0"] .model-picker');
   if(await row.evaluate(e=>e.scrollWidth>e.clientWidth+1)){
    await row.scrollIntoViewIfNeeded();await row.evaluate(e=>e.scrollLeft=0);
    const b=await row.boundingBox(),x=b.x+b.width*.8,y=b.y+b.height/2;
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y,id:1}]});
    for(let n=1;n<=10;n++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-n*12,y,id:1}]});await page.waitForTimeout(16);}
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await wait(page);
    assert(await row.evaluate(e=>e.scrollLeft)>35);
    await row.evaluate(e=>e.scrollLeft=0);await page.mouse.move(x,y);await page.mouse.down();await page.mouse.move(x-100,y,{steps:8});await page.mouse.up();assert(await row.evaluate(e=>e.scrollLeft)>35);
    assert.equal(await page.locator('[data-showcase="cars-0"] .swipe-viewport').getAttribute('data-swipe-index'),'0');
   }
   await page.locator('.home-hero .hero-copy a').first().click();await page.waitForURL('**/vinf/pages/product.html?id=vf6');
  });
  await check(width+' no JS errors or missing assets under /vinf/',async()=>{assert.deepEqual(errors,[]);assert.deepEqual(broken,[]);});
  await context.close();
 }
})().catch(error=>{console.error(error);results.push({name:'runner',status:'FAIL',error:error.stack});}).finally(async()=>{
 fs.writeFileSync('tests/swipe/results.json',JSON.stringify({date:'2026-11-08',input:'Mouse + Chromium CDP Input.dispatchTouchEvent (emulated touch hardware)',results},null,2));
 if(browser)await browser.close();if(server)await server.close();if(results.some(r=>r.status==='FAIL'))process.exitCode=1;
});
