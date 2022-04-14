

export const search = async (data, conditions) => {
  const promise = new Promise((resolve, reject) => { 
      if (data.length !== 0) {
        resolve(data);
      } else {
        reject('no data');
      }
    });
  // order: tags, period, name
  return await promise
    // .then(res => tagsSearch(res, conditions.tags))
    .then(res => periodSearch(res, conditions.period))
    .catch(err => console.log(err));
}


const tagsSearch = (data0, tagsConditions) => {
  let data = data0.concat();
  const isAllIncludes = (target, arr) => arr.every(el => target.includes(el));

  Object.keys(tagsConditions).forEach(tagName => {
    // name -> id
    data = data.filter(d => isAllIncludes(d[tagName].map(t => t.name), tagsConditions[tagName]))
  });
  return data;
}

const periodSearch = (data, periodConditions) => {
  const [from, to] = [periodConditions.from, periodConditions.to];
  
  const fromFilter = d => from ? (d.born >= from) : true;
  const toFilter = d => to ? (d.died <= to) : true;

  return data.filter(d => fromFilter(d) && toFilter(d))
}


// import lunr from 'lunr';
// const lunr = require('lunr');

// export default {
//   name: 'Search',
//   data () {
//     return {
//       graph_type: '',
//       data: [],
//       result: ''
//     }
//   },
//   // methods: {
//   //   search () {

//   //   }
//   // },
//   mounted () {
//     // this.$axios
// 		// 	.get('/phils/read')
// 		// 	.then(res => this.data = res.data);
//     //   .then(res => {
//     //     console.log(res.data);
//     //   })
    
  
//     const idx = lunr(function () {
//       this.ref('name')
//       this.field('name')

//       data.forEach(function (d) {
//         this.add(d)
//       }, this)
//     })

//     this.result = idx.search('Hegel');
//     // console.log(idx.search('Spinoza'))
  
//   }
// }

