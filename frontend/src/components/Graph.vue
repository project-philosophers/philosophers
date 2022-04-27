<script setup>
  import { ref, watch } from 'vue';

  import GraphNetwork from './graphs/GraphNetwork.vue';
  import GraphTimeline from './graphs/GraphTimeline.vue';
  import GraphTable from './graphs/GraphTable.vue';

  import { useGraphType } from '@/stores/viewTypes';
  const graphType = useGraphType();


  import { usePresentPhils } from '@/stores/philosophers'
  const presentPhils = usePresentPhils();
  // console.log('presentPhils', presentPhils.data);

  // const phils = ref(presentPhils.data);
  // const [phils, setPhils] = useState([]);
  // const phils = ref([]);
  // phils.value = presentPhils.data;
  import { useState } from '@/lib/state';
  const [data, setData] = useState([]);

  watch(presentPhils, () => {
    setData(presentPhils.data);
    // setPhils(presentPhils.data);
    // phils.value = presentPhils.data;
    // presentPhils.data === undefined 
    //   ? console.log(`*`, phils) 
    //   : phils.value = presentPhils.data

    // console.log('graphs', phils.value);
  })

</script>


<template>
  <div class='graphs_container flex'>
    <template v-if="graphType.type === 'network'">
      <GraphNetwork :data="data" />
    </template>
    <template v-else-if="graphType.type === 'timeline'">
      <GraphTimeline :data="data" />
    </template>
    <template v-else-if="graphType.type === 'table'">
      <GraphTable :data="data" />
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