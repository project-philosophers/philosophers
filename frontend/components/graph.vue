<script>
import GraphNetwork from './graphs/GraphNetwork';
import GraphTimeline from './graphs/GraphTimeline.vue';
import GraphTable from './graphs/GraphTable.vue';

export default {
  components:{
    GraphNetwork,
    GraphTimeline,
    GraphTable
  },
  name: 'Graph',
  data () {
    return {
      graph_type: '',
      data: []
    }
  },
  mounted () {
    // this.$axios
		// 	.get('/phils/read')
		// 	.then(res => this.data = res.data);
    //   .then(res => {
    //     console.log(res.data);
    //   })
    
    this.data = [{"id":"97056520","name":"Leibniz","name_original":null,"name_other":null,"born":1646,"born_date":null,"born_questioning":false,"died":1716,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["92687501","00950212"],"influenced":["32889134"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-03-19T10:07:43.014Z"},{"id":"81277889","name":"Berkeley","name_original":null,"name_other":null,"born":1685,"born_date":null,"born_questioning":false,"died":1753,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["33429962"],"influenced":["43937724"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-03-19T10:07:43.014Z"},{"id":"82260680","name":"Fichte","name_original":null,"name_other":null,"born":1762,"born_date":null,"born_questioning":false,"died":1814,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["32889134"],"influenced":["58540054","64312836"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-03-19T10:07:43.014Z"},{"id":"58540054","name":"Schelling","name_original":null,"name_other":null,"born":1775,"born_date":null,"born_questioning":false,"died":1854,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["32889134","82260680"],"influenced":null,"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-03-19T10:07:43.014Z"},{"id":"92687501","name":"René Descartes","name_original":null,"name_other":null,"born":1596,"born_date":null,"born_questioning":false,"died":1650,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":null,"influenced":["00950212","43159293","97056520"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-05-24T13:22:01.534Z"},{"id":"00950212","name":"Baruch De Spinoza","name_original":null,"name_other":null,"born":1632,"born_date":null,"born_questioning":false,"died":1677,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["92687501"],"influenced":["97056520","58540054","64312836"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-04-15T16:39:09.807Z"},{"id":"43937724","name":"David Hume","name_original":null,"name_other":null,"born":1711,"born_date":null,"born_questioning":false,"died":1776,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["81277889"],"influenced":["32889134"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-05-21T04:59:41.303Z"},{"id":"64312836","name":"Hegel","name_original":null,"name_other":null,"born":1770,"born_date":null,"born_questioning":false,"died":1831,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["32889134","82260680"],"influenced":null,"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-06-02T06:30:01.737Z"},{"id":"43159293","name":"Malbranche","name_original":null,"name_other":null,"born":1638,"born_date":null,"born_questioning":false,"died":1715,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["92687501"],"influenced":null,"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-06-02T16:07:17.394Z"},{"id":"33429962","name":"John Locke","name_original":null,"name_other":null,"born":1632,"born_date":null,"born_questioning":false,"died":1704,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":null,"influenced":["81277889"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-06-02T18:21:06.986Z"},{"id":"32889134","name":"Immanuel Kant","name_original":null,"name_other":null,"born":1724,"born_date":null,"born_questioning":false,"died":1804,"died_date":null,"died_questioning":false,"gender":"male","birthplace":null,"deathplace":null,"influences":["97056520","43937724"],"influenced":["82260680","58540054","64312836"],"createdAt":"2021-03-19T10:07:43.014Z","updatedAt":"2021-05-23T15:49:40.042Z"}];
  }
}
</script>

<template>
  <div class='graph'>
    <div>Graph</div>
    <!-- <D3 :data="data" /> -->
    <!-- <GraphNetwork :data="data" /> -->
    <GraphTable :data="data" />
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