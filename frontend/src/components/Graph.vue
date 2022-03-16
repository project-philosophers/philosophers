<script setup>
import GraphNetwork from './graphs/GraphNetwork.vue';
import GraphTimeline from './graphs/GraphTimeline.vue';
import GraphTable from './graphs/GraphTable.vue';
import SideBar from './graphs/SideBar.vue';

import { usePhFiltered } from '@/stores/phFilter'
const phFiltered = usePhFiltered();
const phils = phFiltered.$state;

import { ref } from 'vue';
const graphType = ref('network')
const changeType = (type) => {
  graphType.value = type
};

</script>


<template>
  <div class='graphs_container flex'>
    <SideBar @changeGraphType="type => changeType(type)" />
    <template v-if="graphType === 'network'">
      <GraphNetwork :data="phils" />
    </template>
    <template v-else-if="graphType === 'timeline'">
      <GraphTimeline :data="phils" />
    </template>
    <template v-else-if="graphType === 'table'">
      <GraphTable
        :data="phils"
        @response="id => www(id)"
      />
    </template>
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
  /* .graphs_container {
    position: fixed;
    top: 100px;
    left: 30px;
    width: 80%;
    height: calc(100% - 100px);
  } */
</style>