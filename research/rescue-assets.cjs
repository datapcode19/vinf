const fs = require('node:fs');
(async () => {
  fs.mkdirSync('assets/rescue', { recursive: true });
  const records = [];
  for (const [name, slug] of [
    ['roadside', 'cuuho247'],
    ['ecall', 'ecall'],
  ]) {
    const source =
      'https://static-cms-prod.vinfastauto.com/statics/images/aftersale-rescue/rescue-slide-' +
      slug +
      '.jpg';
    const r = await fetch(source, { signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw Error(r.status);
    const file = 'assets/rescue/' + name + '.jpg';
    fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
    records.push({
      file,
      source,
      role: 'Rescue service / ' + name,
      permission: 'User confirmed educational image use, 2026-11-07',
    });
  }
  fs.writeFileSync(
    'assets/rescue/manifest.json',
    JSON.stringify(records, null, 2),
  );
  console.log('Saved rescue images');
})();
