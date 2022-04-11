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


  const graphTypeName = ref('');
  import { useGraphType } from '@/stores/viewTypes';
  const graphType = useGraphType();
  graphTypeName.value = graphType.type;

// <<<<<<< HEAD
  watch(graphType, () => {
    graphTypeName.value = graphType.type;
  })

  watch(phFiltered, () => {
    console.log('korekore', phFiltered.data);
    phils.value = phFiltered.data;
    // phFiltered.data === undefined 
    //   ? console.log(`*`, phils) 
    //   : phils.value = phFiltered.data
    
  })
// =======
  // watch(phFiltered, () => {
  //   console.log('korekore', phFiltered.data);
  //   // phils.value = phFiltered.data;
  //   if (phFiltered.data === undefined) return;
  //   phils.value = phFiltered.data
  // })
// >>>>>>> 2fb3d07dfb06598019241c476582935f6c5efffe
</script>


<template>
  <div class='graphs_container flex'>
    <template v-if="graphTypeName === 'network'">
      <GraphNetwork :data="phils" />
    </template>
    <template v-else-if="graphTypeName === 'timeline'">
      <GraphTimeline :data="phils" />
    </template>
    <template v-else-if="graphTypeName === 'table'">
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