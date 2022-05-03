<script setup>
  import { ref, watch } from 'vue';

  import GraphNetwork from './graphs/GraphNetwork.vue';
  import GraphTimeline from './graphs/GraphTimeline.vue';
  import GraphTable from './graphs/GraphTable.vue';

  import { useGraphType, useViewType } from '@/stores/viewTypes';
  const viewType = useViewType();
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
  console.log(viewType.view.type);

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
    <template v-if="viewType.view.type === 'network'">
      <GraphNetwork :data="data" />
    </template>
    <template v-else-if="viewType.view.type === 'timeline'">
      <GraphTimeline :data="data" />
    </template>
    <template v-else-if="viewType.view.type === 'table'">
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