// Exact public image URLs exposed by the official VF 5/Viper pages.
// User explicitly authorized additional VinFast imagery for this educational project.
const fs=require('node:fs');
const base='https://static-cms-prod.vinfastauto.com/';
const files=[
 ['vf5','hero','statics/car/vf5/xe-dien-vinfast-vf5-gia-dinh-cam-trai-ben-ho-desktop.webp'],
 ['vf5','rear-seat','statics/car/vf5/xe-dien-vinfast-vf5-hang-ghe-sau-rong-thoai-mai-desktop.webp'],
 ['vf5','cargo','statics/car/vf5/xe-dien-vinfast-vf5-cop-xe-tien-dung-mua-sam-desktop.webp'],
 ['vf5','exterior','statics/car/vf5/xe-dien-vinfast-vf5-ngoai-that-mau-do-goc-nhin-tren-desktop.webp'],
 ['vf5','interior','statics/car/vf5/xe-dien-vinfast-vf5-noi-that-man-hinh-cam-ung-vo-lang-desktop.webp'],
 ['vf5','front','statics/car/vf5/hinh-anh-vinfast-vf5-ngoai-that-xam-dau-xe-desktop.webp'],
 ['vf5','rear','statics/car/vf5/hinh-anh-vinfast-vf5-ngoai-that-xam-duoi-xe-desktop.webp'],
 ['vf5','wheel','statics/car/vf5/hinh-anh-vinfast-vf5-ngoai-that-do-mam-xe-desktop.webp'],
 ['vf5','white','statics/car/vf5/hinh-anh-vinfast-vf5-ngoai-that-mau-trang-desktop.webp'],
 ['viper','hero','statics/e-scooter/viper/hinh-anh-vinfast-viper-hero-banner-mobile.webp'],
 ...[['red','do'],['grey','xam'],['white','trang'],['black','den']].map(([name,color])=>['viper',name,`statics/e-scooter/viper/hinh-anh-vinfast-viper-mau-${color}-mobile.webp`]),
 ...[['screen','01-screen'],['storage','02-storage'],['suspension','04-shock-absorber'],['brake','05-brake']].map(([name,file])=>['viper',name,`statics/e-scooter/updated/viper/viper-detail-${file}-mobile.webp`])
];
(async()=>{const results=[];for(const [model,name,path]of files){const file=`assets/${model}/${name}.webp`,source=base+path;fs.mkdirSync('assets/'+model,{recursive:true});try{const r=await fetch(source,{signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('HTTP '+r.status);if(!r.headers.get('content-type')?.startsWith('image/'))throw Error('Not an image');const bytes=Buffer.from(await r.arrayBuffer());fs.writeFileSync(file,bytes);results.push({file,source,reference:'https://vinfastauto.com/vn_vi/'+(model==='vf5'?'dat-coc-xe-dien-vf5':'xe-may-dien-vinfast-viper'),permission:'User confirmed additional VinFast image use for educational project in current conversation, 2026-11-08. Not a public/commercial license.',status:'downloaded',bytes:bytes.length});console.log('Downloaded',file);}catch(e){results.push({file,source,status:'unavailable',error:e.message});console.log('Unavailable',file,e.message);}}
 for(const model of ['vf5','viper'])fs.writeFileSync(`assets/${model}/manifest.json`,JSON.stringify(results.filter(r=>r.file.startsWith('assets/'+model+'/')),null,2));})();
