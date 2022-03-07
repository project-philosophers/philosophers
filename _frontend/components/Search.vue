<script>
// import lunr from 'lunr';
const lunr = require('lunr');

export default {
  name: 'Search',
  data () {
    return {
      graph_type: '',
      data: [],
      result: ''
    }
  },
  // methods: {
  //   search () {

  //   }
  // },
  mounted () {
    // this.$axios
		// 	.get('/phils/read')
		// 	.then(res => this.data = res.data);
    //   .then(res => {
    //     console.log(res.data);
    //   })
    
    const data = [{"id":"00950212","name":"Baruch De Spinoza","name_original":null,"name_other":null,"born":1632,"born_date":null,"born_questioning":false,"died":1677,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["92687501"],"influenced":["97056520","58540054","64312836"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-04-15T16:39:09.807Z","languages":[],"nationalities":[],"education":[],"categories":[],"keywords":[]},{"id":"32889134","name":"Immanuel Kant","name_original":null,"name_other":null,"born":1724,"born_date":null,"born_questioning":false,"died":1804,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["97056520","43937724"],"influenced":["82260680","58540054","64312836"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-05-23T15:49:40.042Z","languages":[{"id":4,"name":"German","createdAt":"2021-03-19T10:07:43.042Z","updatedAt":"2021-03-19T10:07:43.042Z","phils-languages":{"createdAt":"2021-05-23T15:49:40.094Z","updatedAt":"2021-05-23T15:49:40.094Z","ph_id":"32889134","language_id":4}},{"id":2,"name":"Latin","createdAt":"2021-03-19T10:07:43.042Z","updatedAt":"2021-03-19T10:07:43.042Z","phils-languages":{"createdAt":"2021-05-23T15:49:40.094Z","updatedAt":"2021-05-23T15:49:40.094Z","ph_id":"32889134","language_id":2}}],"nationalities":[{"id":1,"name":"Germany","createdAt":"2021-05-18T02:57:48.689Z","updatedAt":"2021-05-18T02:57:48.689Z","phils-nationalities":{"createdAt":"2021-05-23T15:49:40.124Z","updatedAt":"2021-05-23T15:49:40.124Z","ph_id":"32889134","nationality_id":1}}],"education":[],"categories":[],"keywords":[]},{"id":"33429962","name":"John Locke","name_original":null,"name_other":null,"born":1632,"born_date":null,"born_questioning":false,"died":1704,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":null,"influenced":["81277889"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-06-02T18:21:06.986Z","languages":[{"id":41,"name":"English","createdAt":"2021-05-01T14:19:33.176Z","updatedAt":"2021-05-01T14:19:33.176Z","phils-languages":{"createdAt":"2021-06-02T18:21:07.019Z","updatedAt":"2021-06-02T18:21:07.019Z","ph_id":"33429962","language_id":41}},{"id":2,"name":"Latin","createdAt":"2021-03-19T10:07:43.042Z","updatedAt":"2021-03-19T10:07:43.042Z","phils-languages":{"createdAt":"2021-06-02T18:21:07.019Z","updatedAt":"2021-06-02T18:21:07.019Z","ph_id":"33429962","language_id":2}}],"nationalities":[{"id":2,"name":"UK","createdAt":"2021-05-18T02:57:48.689Z","updatedAt":"2021-05-18T02:57:48.689Z","phils-nationalities":{"createdAt":"2021-06-02T18:21:07.031Z","updatedAt":"2021-06-02T18:21:07.031Z","ph_id":"33429962","nationality_id":2}}],"education":[],"categories":[{"id":1,"name":"Empiricism","createdAt":"2021-06-02T18:20:59.726Z","updatedAt":"2021-06-02T18:20:59.726Z","phils-categories":{"createdAt":"2021-06-02T18:21:07.048Z","updatedAt":"2021-06-02T18:21:07.048Z","ph_id":"33429962","category_id":1}}],"keywords":[]},{"id":"43159293","name":"Malbranche","name_original":null,"name_other":null,"born":1638,"born_date":null,"born_questioning":false,"died":1715,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["92687501"],"influenced":null,"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-06-02T16:07:17.394Z","languages":[{"id":3,"name":"French","createdAt":"2021-03-19T10:07:43.042Z","updatedAt":"2021-03-19T10:07:43.042Z","phils-languages":{"createdAt":"2021-06-02T16:07:17.442Z","updatedAt":"2021-06-02T16:07:17.442Z","ph_id":"43159293","language_id":3}}],"nationalities":[{"id":3,"name":"France","createdAt":"2021-05-18T02:57:48.689Z","updatedAt":"2021-05-18T02:57:48.689Z","phils-nationalities":{"createdAt":"2021-06-02T16:07:17.460Z","updatedAt":"2021-06-02T16:07:17.460Z","ph_id":"43159293","nationality_id":3}}],"education":[],"categories":[],"keywords":[]},{"id":"43937724","name":"David Hume","name_original":null,"name_other":null,"born":1711,"born_date":null,"born_questioning":false,"died":1776,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["81277889"],"influenced":["32889134"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-05-21T04:59:41.303Z","languages":[{"id":41,"name":"English","createdAt":"2021-05-01T14:19:33.176Z","updatedAt":"2021-05-01T14:19:33.176Z","phils-languages":{"createdAt":"2021-05-21T04:59:41.336Z","updatedAt":"2021-05-21T04:59:41.336Z","ph_id":"43937724","language_id":41}},{"id":2,"name":"Latin","createdAt":"2021-03-19T10:07:43.042Z","updatedAt":"2021-03-19T10:07:43.042Z","phils-languages":{"createdAt":"2021-05-21T04:59:41.336Z","updatedAt":"2021-05-21T04:59:41.336Z","ph_id":"43937724","language_id":2}}],"nationalities":[{"id":2,"name":"UK","createdAt":"2021-05-18T02:57:48.689Z","updatedAt":"2021-05-18T02:57:48.689Z","phils-nationalities":{"createdAt":"2021-05-21T04:59:41.365Z","updatedAt":"2021-05-21T04:59:41.365Z","ph_id":"43937724","nationality_id":2}}],"education":[],"categories":[],"keywords":[]},{"id":"58540054","name":"Schelling","name_original":null,"name_other":null,"born":1775,"born_date":null,"born_questioning":false,"died":1854,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["32889134","82260680"],"influenced":null,"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-03-19T10:07:43.014Z","languages":[],"nationalities":[],"education":[],"categories":[],"keywords":[]},{"id":"64312836","name":"Hegel","name_original":null,"name_other":null,"born":1770,"born_date":null,"born_questioning":false,"died":1831,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["32889134","82260680"],"influenced":null,"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-06-02T06:30:01.737Z","languages":[{"id":4,"name":"German","createdAt":"2021-03-19T10:07:43.042Z","updatedAt":"2021-03-19T10:07:43.042Z","phils-languages":{"createdAt":"2021-06-02T06:30:01.760Z","updatedAt":"2021-06-02T06:30:01.760Z","ph_id":"64312836","language_id":4}}],"nationalities":[],"education":[],"categories":[],"keywords":[]},{"id":"81277889","name":"Berkeley","name_original":null,"name_other":null,"born":1685,"born_date":null,"born_questioning":false,"died":1753,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["33429962"],"influenced":["43937724"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-03-19T10:07:43.014Z","languages":[],"nationalities":[],"education":[],"categories":[],"keywords":[]},{"id":"82260680","name":"Fichte","name_original":null,"name_other":null,"born":1762,"born_date":null,"born_questioning":false,"died":1814,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["32889134"],"influenced":["58540054","64312836"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-03-19T10:07:43.014Z","languages":[],"nationalities":[],"education":[],"categories":[],"keywords":[]},{"id":"92687501","name":"René Descartes","name_original":null,"name_other":null,"born":1596,"born_date":null,"born_questioning":false,"died":1650,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":null,"influenced":["00950212","43159293","97056520"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-05-24T13:22:01.534Z","languages":[{"id":2,"name":"Latin","createdAt":"2021-03-19T10:07:43.042Z","updatedAt":"2021-03-19T10:07:43.042Z","phils-languages":{"createdAt":"2021-05-24T13:22:01.601Z","updatedAt":"2021-05-24T13:22:01.601Z","ph_id":"92687501","language_id":2}},{"id":3,"name":"French","createdAt":"2021-03-19T10:07:43.042Z","updatedAt":"2021-03-19T10:07:43.042Z","phils-languages":{"createdAt":"2021-05-24T13:22:01.601Z","updatedAt":"2021-05-24T13:22:01.601Z","ph_id":"92687501","language_id":3}}],"nationalities":[{"id":3,"name":"France","createdAt":"2021-05-18T02:57:48.689Z","updatedAt":"2021-05-18T02:57:48.689Z","phils-nationalities":{"createdAt":"2021-05-24T13:22:01.627Z","updatedAt":"2021-05-24T13:22:01.627Z","ph_id":"92687501","nationality_id":3}}],"education":[],"categories":[],"keywords":[]},{"id":"97056520","name":"Leibniz","name_original":null,"name_other":null,"born":1646,"born_date":null,"born_questioning":false,"died":1716,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["92687501","00950212"],"influenced":["32889134"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-03-19T10:07:43.014Z","languages":[],"nationalities":[],"education":[],"categories":[],"keywords":[]}]
  
    const idx = lunr(function () {
      this.ref('name')
      this.field('name')

      data.forEach(function (d) {
        this.add(d)
      }, this)
    })

    this.result = idx.search('Hegel');
    // console.log(idx.search('Spinoza'))
  
  }
}
</script>

<template>
  <div class='search'>
    <div>Search</div>
    {{ this.result }}
  </div>
</template>

<style>
  /* .nav {
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
  .links {
    display: flex;
  }
  .nav-item {
    margin-left: 15px;
  } */
</style>