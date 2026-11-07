const fs = require('node:fs');
const base = 'https://static-cms-prod.vinfastauto.com/';
const items = [
 ['vf6-hero.webp','statics/car/vf6/hinh-anh-xe-vinfast-vf6-mau-trang-duong-deo-nui-desktop.webp'],
 ['vf6-white.webp','statics/car/vf6/hinh-anh-xe-vinfast-vf6-mau-trang-02-desktop.webp'],
 ...[['vf3','vang'],['vf5','bac'],['vf6-eco','do'],['vf7','den'],['vf8','xanh'],['vf9','xam']].map(([m,c])=>[m+'.webp',`vinfast-${m}-mau-${c}-home.webp`]),
 ...['do','xi-mang','trang','den','nau'].map(c=>[`kinet-${c}.webp`,`statics/e-scooter/kinet/hinh-anh-vinfast-kinet-mau-${c}-mobile.webp`])
];
(async()=>{const records=[];for(const [file,path] of items){const r=await fetch(base+path);if(!r.ok)throw Error(`${file}: ${r.status}`);fs.writeFileSync('assets/'+file,Buffer.from(await r.arrayBuffer()));records.push({file:'assets/'+file,source:base+path,permission:'Người dùng xác nhận được phép dùng cho đồ án học tập ngày 07/11/2026; không suy rộng sang mục đích thương mại.',usage:file.startsWith('kinet')?'Chi tiết Kinet / bộ chọn màu':'Trang chủ, danh mục, chi tiết ô tô'});}fs.writeFileSync('assets/manifest.json',JSON.stringify(records,null,2));console.log('Saved '+records.length+' assets');})().catch(e=>{console.error(e);process.exit(1)});
