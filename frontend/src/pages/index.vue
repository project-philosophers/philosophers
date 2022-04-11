<script setup>
  import { ref, watchEffect, watch } from 'vue';

  import axios from 'axios';

  import Sidebar from '../components/Sidebar.vue';
  import Graph from '../components/Graph.vue';
  import Search from '../components/Search.vue';
  import Ph from '../components/Ph.vue';
  import Right from '../components/Right.vue';

  import { search } from '../lib/search';
  import data from '../util/data';

  import { usePhFiltered } from '@/stores/filteredPhils'
  const phFiltered = usePhFiltered();

  import { useIsSearching, useSearchConditions } from '@/stores/search';
  const isSearching = useIsSearching();

  const searchConditions = useSearchConditions();
  let conditions = searchConditions.conditions;

  watch(conditions, async () => {
    const filteredPhils = await search(data, conditions);
    phFiltered.filterPhils(filteredPhils);
  })
</script>

<template>
  <div class="main flex">
    <Sidebar class="absolute h-screen w-15 flex-col items-center bg-red-200"/>
    <div v-if="isSearching.isSearching">
      <Search class="w-9/12 fixed bottom-0" />
    </div>
    <Graph class="graph w-9/12 ml-15" />
    <Right class="w-3/12">
      <Ph />
    </Right>
  </div>
</template>

<style>

</style>