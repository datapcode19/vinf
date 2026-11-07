const {chromium}=require('C:/Users/TIEN DAT/AppData/Local/Python/pythoncore-3.14-64/Lib/site-packages/playwright/driver/package');
const fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.ttf':'font/ttf'};
const server=http.createServer((req,res)=>{const pathname=new URL(req.url,'http://localhost').pathname;const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':decodeURIComponent(pathname)));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}).end(data);});});
let browser;
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;browser=await chromium.launch({headless:true});const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));fs.mkdirSync('tests/home-visual',{recursive:true});const result=[];
for(const width of [1440,1366,768,390]){
 await page.setViewportSize({width,height:900});await page.goto(base);await page.locator('main h1').waitFor();
 await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(i=>{i.loading='eager';return i.decode();})));
 await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`tests/home-visual/home-${width}.png`,fullPage:true});
 await page.locator('footer').screenshot({path:`tests/home-visual/footer-${width}.png`});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
 for(const title of ['Ô tô','Xe máy điện','Dịch vụ hậu mãi','Pin và trạm sạc']){
  await page.evaluate(()=>scrollTo(0,0));const mobile=page.locator('.menu-toggle');if(width<=1050&&await mobile.getAttribute('aria-expanded')==='false')await mobile.click();
  const trigger=page.getByRole('button',{name:title,exact:true});await trigger.click();const id=await trigger.getAttribute('aria-controls');
  await page.locator('#'+id+' details').evaluateAll(items=>items.forEach(i=>i.open=true));
  await page.screenshot({path:`tests/home-visual/menu-${id}-${width}.png`});await page.keyboard.press('Escape');
 }
 if(width<=1050&&await page.locator('.menu-toggle').getAttribute('aria-expanded')==='true')await page.locator('.menu-toggle').click();
 if(width===1440||width===390){for(const id of ['oto','xe-may-dien','hau-mai','tuong-lai-xanh','he-sinh-thai','ho-tro-mua-xe','phu-kien','nhan-thong-tin']){await page.locator('#'+id).screenshot({path:`tests/home-visual/section-${id}-${width}.png`});}}
 result.push({width,overflow,referenceComparison:'BLOCKED: chưa có screenshot nguồn'});
}
const assets=JSON.parse(fs.readFileSync('assets/home/manifest.json','utf8'));
for(const asset of assets.filter(a=>a.status==='downloaded')){const data=fs.readFileSync(asset.file).toString('base64');Object.assign(asset,await page.evaluate(async data=>{const i=new Image();i.src='data:image/webp;base64,'+data;await i.decode();return {width:i.naturalWidth,height:i.naturalHeight,aspectRatio:i.naturalWidth/i.naturalHeight};},data));}
fs.writeFileSync('assets/home/manifest.json',JSON.stringify(assets,null,2));
fs.writeFileSync('tests/home-visual/results.json',JSON.stringify({date:'2026-11-07',result,errors},null,2));console.log(JSON.stringify({result,errors}));if(errors.length||result.some(x=>x.overflow))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.close();});
