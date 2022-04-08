<script setup>
import { ref, watch } from 'vue';

import GraphNetwork from './graphs/GraphNetwork.vue';
import GraphTimeline from './graphs/GraphTimeline.vue';
import GraphTable from './graphs/GraphTable.vue';
// import SideBar from './graphs/SideBar.vue';

import { usePhFiltered } from '@/stores/filteredPhils'
const phFiltered = usePhFiltered();
// const phils = phFiltered.data;
console.log('kore', phFiltered.data);
// const phils = ref();
// phils.value = phFiltered.data;
const phils = ref(phFiltered.data);

// import { useSearchConditions } from '@/stores/conditions';
// const searchConditions = useSearchConditions();
// let conditions = searchConditions.$state;

const graphType = ref('');
import { useGraphType } from '@/stores/graphs';
const storeGraphType = useGraphType();
graphType.value = storeGraphType.type;

watch(storeGraphType, () => {
  graphType.value = storeGraphType.type;
})

watch(phFiltered, () => {
  console.log('korekore', phFiltered.data);
  phils.value = phFiltered.data;
  // phFiltered.data === undefined 
  //   ? console.log(`*`, phils) 
  //   : phils.value = phFiltered.data
  
})
</script>


<template>
  <div class='graphs_container flex'>
    <template v-if="graphType === 'network'">
      <GraphNetwork :data="phils" />
    </template>
    <template v-else-if="graphType === 'timeline'">
      <GraphTimeline :data="phils" />
    </template>
    <template v-else-if="graphType === 'table'">
      <GraphTable :data="phils" />
    </template>
  </div>
</template>

<style>
  /* .graphs_container {
    position: fixed;
    top: 100px;
    left: 30px;
    width: 80%;
    height: calc(100% - 100px);
  } */
</style>