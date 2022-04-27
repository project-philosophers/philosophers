<script setup>
  import { ref, watch, onBeforeMount, onMounted } from 'vue';

  import axios from 'axios';
  import client from '../../config/axios';

  import Sidebar from '../components/Sidebar.vue';
  import Graph from '../components/Graph.vue';
  import Ph from '../components/Ph.vue';
  import Search from '../components/Search.vue';


  import { useStorePhils, usePresentPhils } from '@/stores/philosophers';
  const [storePhils, setStorePhilsData] = [useStorePhils(), useStorePhils().setStorePhils];
  const [presentPhils, setPresentPhilsData] = [usePresentPhils(), usePresentPhils().setPresentPhils];
  


  import { useState } from '@/lib/state';
  const [data, setData] = useState([]);

  import { toEmptyArray } from '../lib/toEmptyArrays';
  onBeforeMount(async () => {
    const gotData = await axios.get('/api/philosophers/read')
      .then(res => toEmptyArray(res.data.data));
    setData(gotData);
    setStorePhilsData(gotData);
    setPresentPhilsData(gotData);
  })


  import { search } from '../lib/search';
  import { useIsSearching, useSearchConditions } from '@/stores/search';
  const isSearching = useIsSearching();
  const searchConditions = useSearchConditions();

  let conditions = searchConditions.conditions;
  watch(conditions, async () => {
    if (isSearching.isSearching) {
      const phils = storePhils.data;
      const filteredPhils = await search(phils, conditions);
      setPresentPhilsData(filteredPhils);
    }
  })

  // import { useTagsType } from '@/stores/viewTypes';
  // const tagsType = useTagsType();

</script>

<template>
  <div class="main relative flex flex-row h-12/12">
    <Sidebar class="sidebar left-0 w-12 flex-col items-center border-r-1 border-black divide-y-1 divide-black"/>
    <Graph class="graph flex-1 p-2" />
    <Ph class="w-3/12" />
    <div v-if="isSearching.isSearching">
      <Search class="absolute bottom-0 left-12 ml-3 w-8/12" />
    </div>    
  </div>
</template>

<style>
  .sidebar {
    box-sizing: border-box;
  }
</style>