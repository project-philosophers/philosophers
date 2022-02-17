<script>
  // import * as d3 from 'd3';

  export default {
    name: 'GraphTable',
    data () {
      return {
        phIndeces: [
          "name",
          // "name_original",
          // "name_other",
          "born",
          // "born_date",
          // "born_questioning",
          "died",
          // "died_date",
          // "died_questioning",
          "gender",
          "birthplace",
          "deathplace",
          "languages",
          "nationalities",
          "education",
          "categories",
          "keywords",
          "influences",
          "influenced"
        ]
      }
    },
    props: ['data'],
    watch: {
      data: function (newData) {
        // console.log(this.preprocess(newData));
        // this.graph(this.preprocess(newData));
        // this.chart(this.preprocess(newData));
        // this.testD3(newData);
        // this.graph();
      }
    },
    // mounted () {
    //   this.graph
    // },
    methods: {
      preprocess (data) {
        return data;
      },
      // graph (data) {
      // }
    }
  }
</script>

<template>
  <div class="container">
    <thead>
      <tr>
        <template v-for="index in phIndeces">
          <th
            :key="index"
            :class="`columns ${index}`"
          >
            {{ index.toUpperCase() }}
          </th>
        </template>
      </tr>
    </thead>
    <table>
      <tbody>
        <template v-for="ph in this.preprocess(this.$props.data)">
          <tr
            :key="ph.id"
            class='records'
          >
            <th>{{ ph.name }}</th>
            <template v-for="index in phIndeces.slice(1)">
              <td
                :key="index"
                :class="index"
              >
                {{ ph[index] }}
              </td>
            </template>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>
.container {
  position: inherit;
  /* width: calc(100vw - 300px); */
  height: calc(100vh - 63px);
  overflow-x: scroll;
  overflow-y: scroll;
  z-index: 1;
  /* background-color: green; */
}
.container::-webkit-scrollbar {
  display: none;
}

.container table {
  display: table;
  border-collapse: separate;
  border-spacing: 0px;
  width: 100%;
  height: 100%;
  table-layout: fixed;
  /* background-color: green; */
}

/* .tablehead, .tablebody { */
  /* display: block; */
/* } */

.container thead {
  height: 20px;
  z-index: 1;
  overflow-x: hidden;
  /* font-weight: normal; */
}
.container thead th:first-child {
  z-index: 2;
  background-color: #FFFFFF;
}

.container thead th {
  position: sticky;
  /* position: -webkit-sticky; */
  top: 0;
  z-index: 1;
  width: 200px;
  text-align: center !important;
  font-weight: bold;
  /* white-space: nowrap; */
  border-bottom: 1px double #000000;
  /* background-clip: padding-box; */
  background-color: #FFFFFF;
}

.container th:first-child {
  position: sticky;
  left: 0;
  /* border-right: 1px solid #000000; */
  /* background-color: red; */
  /* z-index: 1; */
}


.container tbody {
  /* padding-top: 20px; */
  /* width: 100%; */

  /* height: 100%; */
  overflow-x: hidden;
  overflow-y: scroll;
}
.container tbody::-webkit-scrollbar {
  display: none;
}
.container tbody tr {
  height: 40px;
  max-height: 40px;
  cursor: default;
  /* border-bottom: 1px solid black; */
}
.container tbody th {
  text-align: left;
  font-weight: normal;
}
.container tbody td {
  /* text-align: right; */
  width: 200px;
}


.columns {
  cursor: pointer;
}

.records {
  background-color: #FFFFFF;
}
.records:hover {
  background-color: #AAAAAA;
}

.container .name {
  width: 200px;
  text-align: left;
  background-color: inherit;
}
.container .born,
.container .died {
  width: 50px;
  text-align: center;
}
.container .gender {
  width: 60px;
  text-align: center;
}

</style>