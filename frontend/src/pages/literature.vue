<script setup>
  import { ref, watch, onBeforeMount, onMounted } from 'vue';

  import axios from 'axios';
  import client from '../../config/axios';

  import Sidebar from '../components/Sidebar.vue';
  import GraphL from '../components/GraphL.vue';
  import Ph from '../components/Ph.vue';
  import Search from '../components/Search.vue';


  import { useStorePhils, usePresentPhils } from '@/stores/philosophers';
  const storePhils = useStorePhils();
  const presentPhils = usePresentPhils();

  import { useState } from '@/lib/state';
  const [data, setData] = useState([]);

  import { toEmptyArray } from '../lib/toEmptyArrays';
  onBeforeMount(async () => {
    const gotData = await axios.get('/api/literature/read')
      // .then(res => toEmptyArray(res.data.data));
      .then(res => res.data.data);
      // phils.value = data;
    setData(gotData);
    console.log('data', data.value);
  })


  // const phils = ref(storePhils.data);
  // watch(phils, () => {
  //   console.log('phils', phils.value);
  // })


  // import { search } from '..e/lib/search';
  // import { useIsSearching, useSearchConditions } from '@/stores/search';
  // const isSearching = useIsSearching();
  // const searchConditions = useSearchConditions();

  // let conditions = searchConditions.conditions;
  // watch(conditions, async () => {
  //   if (isSearching.isSearching) {
  //     const phils = storePhils.data;
  //     const filteredPhils = await search(phils, conditions);
  //     presentPhils.setPresentPhils(filteredPhils);
  //   }
  // })

  // import { useTagsType } from '@/stores/viewTypes';
  // const tagsType = useTagsType();

</script>

<template>
  <div class="main relative flex h-screen">
    <Sidebar class="sidebar absolute w-12 h-12/12 flex-col items-center border-r-1 border-black divide-y-1 divide-black"/>
    <GraphL class="graph w-9/12 ml-12 p-2" genos="literature" :data="data" :key="data" />
  </div>
</template>

<style>
  .sidebar {
    box-sizing: border-box;
  }
</style>