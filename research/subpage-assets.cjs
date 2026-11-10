const fs = require('node:fs');
const path = require('node:path');
const cdn = 'https://static-cms-prod.vinfastauto.com/';
const sources = require('./subpage-assets.json');

(async () => {
  for (const [model, config] of Object.entries(sources)) {
    fs.mkdirSync(`assets/${model}`, { recursive: true });
    const manifest = [];
    for (const [name, remote] of Object.entries(config.files)) {
      const source = cdn + (remote.startsWith('/') ? remote.slice(1) : config.base + remote);
      const file = `assets/${model}/${name}${path.extname(remote)}`;
      if (!fs.existsSync(file)) {
        const response = await fetch(source, { signal: AbortSignal.timeout(45000) });
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw Error(`${response.status} ${source}`);
        fs.writeFileSync(file, Buffer.from(await response.arrayBuffer()));
      }
      manifest.push({file, source, reference: `https://vinfastauto.com/vn_vi/${config.route}`, accessed: '2026-11-10', permission: 'User-authorized VinFast images for this educational project', role: name});
    }
    fs.writeFileSync(`assets/${model}/manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
    console.log(`${model}: ${manifest.length} assets`);
  }
})().catch(error => {console.error(error); process.exitCode = 1;});
