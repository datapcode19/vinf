const fs = require('node:fs');
const files = {
  vf3: 'lich-bao-duong-vf3-ec-van.PNG',
  vf6: 'lich-bao-duong-vf6-7-8-e34.PNG',
  vf7: 'lich-bao-duong-vf6-7-8-e34_1.PNG',
  minio: 'lich-bao-duong-minio-green.PNG',
  ecvan: 'lich-bao-duong-vf3-ec-van_0.PNG',
  limo: 'lich-bao-duong-limo-green.PNG',
};
(async () => {
  fs.mkdirSync('assets/maintenance', { recursive: true });
  const records = [];
  for (const [id, name] of Object.entries(files)) {
    const source = 'https://static-cms-prod.vinfastauto.com/' + name;
    const r = await fetch(source, { signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw Error(id + ': ' + r.status);
    const file = 'assets/maintenance/' + id + '.png';
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    records.push({
      file,
      source,
      role: 'Original maintenance chart / ' + id,
      permission: 'Educational image use confirmed by user',
      reference: 'https://vinfastauto.com/vn_vi/dich-vu-bao-duong-oto',
    });
  }
  fs.writeFileSync(
    'assets/maintenance/manifest.json',
    JSON.stringify(records, null, 2),
  );
  console.log('6 schedule charts saved');
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
