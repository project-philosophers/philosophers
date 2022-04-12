<script setup>
  import { ref, watch } from 'vue';
  import { useState } from '../lib/state';

  import GraphNetwork from './graphs/GraphNetwork.vue';
  import GraphTimeline from './graphs/GraphTimeline.vue';
  import GraphTable from './graphs/GraphTable.vue';

  import { useGraphType } from '@/stores/viewTypes';
  const graphType = useGraphType();


  import { usePresentPhils } from '@/stores/philosophers'
  const presentPhils = usePresentPhils();
  console.log('presentPhils', presentPhils.data);

  // const phils = ref(presentPhils.data);
  const [phils, setPhils] = useState([]);


  watch(presentPhils, () => {
    setPhils(presentPhils.data);
    // phils.value = presentPhils.data;
    // presentPhils.data === undefined 
    //   ? console.log(`*`, phils) 
    //   : phils.value = presentPhils.data
    console.log('korekore', presentPhils.data);
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
    <template v-if="graphType.type === 'network'">
      <GraphNetwork :data="phils" />
    </template>
    <template v-else-if="graphType.type === 'timeline'">
      <GraphTimeline :data="phils" />
    </template>
    <template v-else-if="graphType.type === 'table'">
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