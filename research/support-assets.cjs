const fs = require('node:fs');
const files = {
  'about.png': 'about-us.png',
  'factory.jpg': 'nha-may-vinfast.jpg',
  'nasdaq.png': 'vinfast-ipo_1694854769.png',
  'maintenance-quality.jpg':
    'statics/images/aftersale-maintenance/benefit-quality-v2.jpg',
  'maintenance-network.jpg':
    'statics/images/aftersale-maintenance/benefit-network-v2.jpg',
  'repair-general.jpg':
    'statics/images/aftersale-repair/repair-slide-general.jpg',
  'repair-body.jpg': 'statics/images/aftersale-repair/repair-slide-dongson.jpg',
  'battery-rental.png':
    'loi-ich-cua-thue-pin_1657176007_1657677313_1659499007.png',
};
(async () => {
  fs.mkdirSync('assets/support', { recursive: true });
  const records = [];
  for (const [name, path] of Object.entries(files)) {
    const source = 'https://static-cms-prod.vinfastauto.com/' + path;
    const r = await fetch(source, { signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw Error(name + ': ' + r.status);
    const file = 'assets/support/' + name;
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    records.push({
      file,
      source,
      role: 'Support subpage / ' + name,
      permission: 'Educational use confirmed by user 2026-11-07',
      status: 'Source asset; layout not verified',
    });
  }
  fs.writeFileSync(
    'assets/support/manifest.json',
    JSON.stringify(records, null, 2),
  );
  console.log(records.length + ' support assets saved');
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
