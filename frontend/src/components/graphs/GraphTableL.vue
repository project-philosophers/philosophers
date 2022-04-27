<script setup>
  import { nextTick, onBeforeMount, onMounted, ref, watch, toRefs } from 'vue';
  import { useState } from '../../lib/state';

  const props = defineProps(['data']);

  import { useSelectedPhId } from '@/stores/selectedPh';
  const selectedPhId = useSelectedPhId();

  const dataIndeces = [
    "title",
    // "name_original",
    // "name_other",
    "year",
    "authors",
    // "languages"
  ];
  

  const preprocess = (rowData) => {
    const data = JSON.parse(JSON.stringify(rowData));

    // const data = [...rowData];
    // if (!data) { return []; }

    // const tagsIndeces = [
    //   'authors',
    //   // 'languages'
    // ];

    // data.forEach(d => {
    //   tagsIndeces.forEach(tagsIndex => {
    //     d[tagsIndex] = d[tagsIndex].map(t => t.name);
    //     // console.log(t.name);
    //   });
    // });

    return data;
  }

  const [viewData, setViewData] = useState(preprocess(props.data));
  watch(props, () => {
    setViewData(preprocess(props.data));
    console.log('view', viewData.value);
  })

</script>

<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <template v-for="index in dataIndeces">
            <th :class="`columns ${index}`">
              {{ index.toUpperCase() }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="d in viewData">
          <tr
            class='records h-20px text-sm'
            @click="selectedPhId.update(d.id);"
          >
            <template v-for="index in dataIndeces">
              <td :class="index">
                <div class="h-20px overflow-y-scroll">{{ d[index] }}</div>
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
  table-layout: fixed;
}

.container thead {
  width: 100%;
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
  text-align: center;
  font-weight: bold;
  /* white-space: nowrap; */
  border-bottom: 1px double #000000;
  /* background-clip: padding-box; */
  background-color: #FFFFFF;
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
  height: 30px;
  /* max-height: 40px; */
  cursor: default;
  /* overflow-y: hidden; */
  /* border-bottom: 1px solid black; */
}
.container tbody td {
  /* text-align: right; */
  /* white-space: nowrap; */ /* CRUCIAL */
  width: 200px;
  overflow-y: hidden;
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
  /* background-color: #FFFFFF; */
  background-color: transparent;
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