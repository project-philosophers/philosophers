const fs = require('fs');
// const readline = require('readline');
const path = require('path');


// Array[Object]
const dataObj = [
{id: "92687501", name: "Descartes", name_original: null, name_other: null, born: 1596, born_date: null, born_questioning: false, died: 1650, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: ["00950212", "43159293", "97056520"], influences: null},
{id: "00950212", name: "Spinoza", name_original: null, name_other: null, born: 1632, born_date: null, born_questioning: false, died: 1677, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: ["97056520", "58540054", "64312836"], influences: ["92687501"]},
{id: "43159293", name: "Malbranche", name_original: null, name_other: null, born: 1638, born_date: null, born_questioning: false, died: 1715, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: null, influences: ["92687501"]},
{id: "97056520", name: "Leibniz", name_original: null, name_other: null, born: 1646, born_date: null, born_questioning: false, died: 1716, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: ["32889134"], influences: ["92687501", "00950212"]},
{id: "33429962", name: "Locke", name_original: null, name_other: null, born: 1632, born_date: null, born_questioning: false, died: 1704, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: ["81277889"], influences: null},
{id: "81277889", name: "Berkeley", name_original: null, name_other: null, born: 1685, born_date: null, born_questioning: false, died: 1753, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: ["43937724"], influences: ["33429962"]},
{id: "43937724", name: "Hume", name_original: null, name_other: null, born: 1711, born_date: null, born_questioning: false, died: 1776, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: ["32889134"], influences: ["81277889"]},
{id: "32889134", name: "Kant", name_original: null, name_other: null, born: 1724, born_date: null, born_questioning: false, died: 1804, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: ["82260680", "58540054", "64312836"], influences: ["97056520", "43937724"]},
{id: "82260680", name: "Fichte", name_original: null, name_other: null, born: 1762, born_date: null, born_questioning: false, died: 1814, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: ["58540054", "64312836"], influences: ["32889134"]},
{id: "58540054", name: "Schelling", name_original: null, name_other: null, born: 1775, born_date: null, born_questioning: false, died: 1854, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: null, influences: ["32889134", "82260680"]},
{id: "64312836", name: "Hegel", name_original: null, name_other: null, born: 1770, born_date: null, born_questioning: false, died: 1831, died_date: null, died_questioning: false, gender: 'male', birthplace: null, deathplace: null, influenced: null, influences: ["32889134", "82260680"]}
];




const exportCSV = (csvName, data) => {
  const toCSV = (data) => {
    let head = '';
    const keys = Object.keys(data[0]);
    keys.forEach(k => head += k.toString() + ', ');
    head = head.slice(0, -2);
  
    let body = '';
    data.forEach(d => {
      let b = '';
      Object.values(d).forEach(v => {
        if (!!v) {
          if (Array.isArray(v)) {
            b += '[' + v.toString().replaceAll(',', '/') + '], ';
          } else {
            b += v.toString() + ', ';
          }
        }
        else {
          b += 'null, '
        }
      });
      b = b.slice(0, -2);
      body += b + '\n';
    })
    body = body.slice(0, -1);
  
    const result = head + '\n' + body;
    return result;
  }

  fs
    .writeFileSync(path.join(__dirname, `${csvName}.csv`), data, (err) => {
      if (err) throw err;
      console.log('exported');
    });
}


const importCSV = (path) => {
  const data = fs.
    readFileSync(path, {
      encoding: 'utf-8'
    });
  const dataList = data.split('\n');

  const head = dataList[0].split(', ');
  const body = dataList.filter((d, i) => i !== 0);

  const result = body.map(b => {
    let d = {};
    head.forEach((key, i) => {
      d[key] = b.split(', ')[i];
    })
    return d;
  })

  return result;
}
const filePath = path.join(__dirname, 'hello.csv');
console.log(importCSV(filePath));

