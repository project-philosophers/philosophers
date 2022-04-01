<script setup>
  import axios from 'axios';
  import { ref, watchEffect, watch } from 'vue';
  import Graph from '../components/Graph.vue';
  import Search from '../components/Search.vue';
  import Ph from '../components/Ph.vue';

  import { usePhFiltered } from '@/stores/filteredPhils'
  const phFiltered = usePhFiltered();
  import { useSearchConditions } from '@/stores/conditions';
  const searchConditions = useSearchConditions();
  let conditions = searchConditions.$state;

  import { search } from '../lib/search';
  import data from '../util/data';

  watch(conditions, async () => {
    // console.log('graph-conditions', conditions);
    const filteredPhils = await search(data, conditions);
    phFiltered.filterPhils(filteredPhils);
    // console.log(filteredPhils);
  })
</script>

<template>
  <div class="main flex">
    <Graph class="graph w-9/12" />
    <Search class="w-3/12 fixed bottom-0" />
    <Ph class="w-3/12 fixed" />
  </div>
</template>

<style>

</style>