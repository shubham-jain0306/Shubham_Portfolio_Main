const fs = require('fs');
const orig = fs.readFileSync('F:/Shubham Website/Shubham_Portfolio_Main/src/data/projects.ts', 'utf8');
const curr = fs.readFileSync('src/data/projects.ts', 'utf8');

['bizzbuzz', 'aquaflow', 'snackify', 'zengo'].forEach(id => {
  const getSub = (txt) => {
    const start = txt.indexOf('id: "' + id + '"');
    const nextMatch = txt.indexOf('id: "', start + 10);
    return txt.substring(start, nextMatch !== -1 ? nextMatch : txt.length);
  };
  const o = getSub(orig);
  const c = getSub(curr);
  console.log(id, 'match:', o.trim() === c.trim());
  if (o.trim() !== c.trim()) {
    console.log('--- ORIG LENGTH:', o.length, 'CURR LENGTH:', c.length);
  }
});
