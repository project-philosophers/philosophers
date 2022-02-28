<script setup>
// import * as d3 from 'd3';
import {ref, watch} from 'vue'
const props = defineProps(['data']);
const emit = defineEmits(['response']);
const data_table = ref();
const clickedPhId = ref();


const phIndeces = [
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
];

const preprocess = (rowData) => {
  const data = rowData.concat();

  const tagsIndeces = [
    'languages',
    'nationalities',
    'education',
    'categories',
    'keywords'
  ];

  data.forEach(d => {
    tagsIndeces.forEach(tagsIndex => {
      d[tagsIndex] = d[tagsIndex].map(t => t.name);
    });

    if (d.influences) {
      d.influences = d.influences.map(infs => data.find(dd => dd.id == infs).name);
    }
    if (d.influenced) {
      d.influenced = d.influenced.map(infd => data.find(dd => dd.id == infd).name);
    }
  });

  return data;
}

const click = (id) => {
  clickedPhId.value = id;
  console.log('id', id);
  emit("response", id);
}

data_table.value = preprocess(props.data)
watch(clickedPhId, () => {
  console.log('catch ya', clickedPhId)
})

</script>

<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <template v-for="index in phIndeces">
            <th
              :class="`columns ${index}`"
            >
              {{ index.toUpperCase() }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="ph in this.data_table">
          <tr
            class='records'
            @click="click(ph.id)"
          >
            <!-- <th>{{ ph.name }}</th> -->
            <template v-for="index in phIndeces">
              <td
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
  width: 100%;
  height: 20px;
  z-index: 1;
  overflow-x: hidden;
  /* font-weight: normal; */
}
.container thead th:first-child {
  z-index: 2;
  background-color: transparent;
}

.container thead th {
  position: sticky;
  /* position: -webkit-sticky; */
  top: 0;
  z-index: 1;
  width: 200px;
  text-align: center;
  font-weight: bold;
  /* white-space: nowrap; */
  border-bottom: 1px double #000000;
  /* background-clip: padding-box; */
  background-color: transparent;
}

.container thead th:first-child {
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
  /* overflow-y: hidden; */
  /* border-bottom: 1px solid black; */
}
.container tbody td {
  /* text-align: right; */
  /* white-space: nowrap; */ /* CRUCIAL */
  width: 200px;
}
.container tbody td:first-child {
  position: sticky;
  left: 0;
  text-align: left;
  font-weight: normal;
  background-color: transparent;
}


.columns {
  cursor: pointer;
}

.records {
  height: 40px;
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