<script setup>
  import { ref, watch } from 'vue';
  import { useState } from '../lib/state';

  import GraphNetwork from './graphs/GraphNetwork.vue';
  import GraphTimeline from './graphs/GraphTimeline.vue';

  import GraphTableL from './graphs/GraphTableL.vue';

  import { useGraphType } from '@/stores/viewTypes';
  const graphType = useGraphType();

  const props = defineProps(['data']);
  const [data, setData] = useState(props.data);

  watch(props, () => {
    setData(props.data);
  })
  console.log('graphL', data.value);

</script>


<template>
  <div class='graphs_container flex'>
    <!-- <template v-if="graphType.type === 'network'">
      <GraphNetwork :data="phils" />
    </template>
    <template v-else-if="graphType.type === 'timeline'">
      <GraphTimeline :data="phils" />
    </template>
    <template v-else-if="graphType.type === 'table'">
      <GraphTable :data="phils" />
    </template> -->
    <GraphTableL :data="data" />
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