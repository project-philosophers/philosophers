<script setup>
  import { ref, watch, onBeforeMount, onMounted } from 'vue';

  import axios from 'axios';
  import client from '../../config/axios';

  import Sidebar from '../components/Sidebar.vue';
  import Graph from '../components/Graph.vue';
  import Search from '../components/Search.vue';
  import Ph from '../components/Ph.vue';
  import Right from '../components/Right.vue';

  import Tags from '../components/Tags.vue';

  import { useStorePhils, usePresentPhils } from '@/stores/philosophers';
  const storePhils = useStorePhils();
  const presentPhils = usePresentPhils();

  // import data from '../util/data';
  import { toEmptyArray } from '../lib/toEmptyArrays';
  const phils = ref([]);

  onBeforeMount(async () => {
    const data = await axios.get('/api/philosophers/read')
      .then(res => toEmptyArray(res.data.data));
    phils.value = data;
    storePhils.setStorePhils(data);
    presentPhils.setPresentPhils(data);
    // console.log('phils', phils.value);
  })

  // const phils = ref(storePhils.data);
  // watch(phils, () => {
  //   console.log('phils', phils.value);
  // })


  import { search } from '../lib/search';
  import { useIsSearching, useSearchConditions } from '@/stores/search';
  const isSearching = useIsSearching();
  const searchConditions = useSearchConditions();

  let conditions = searchConditions.conditions;
  watch(conditions, async () => {
    if (isSearching.isSearching) {
      const phils = storePhils.data;
      const filteredPhils = await search(phils, conditions);
      presentPhils.setPresentPhils(filteredPhils);
    }
  })

  // import { useTagsType } from '@/stores/viewTypes';
  // const tagsType = useTagsType();

</script>

<template>
  <div class="main relative flex">
    <Sidebar class="sidebar absolute h-screen w-12 flex-col items-center border-r-1 border-black divide-y-1 divide-black"/>
    <div v-if="isSearching.isSearching">
      <Search class="absolute bottom-0 left-12 ml-3 w-8/12" />
    </div>
    <!-- <template v-if="" -->
    <Graph class="graph w-9/12 ml-12 p-2" />
    <Right class="w-3/12">
      <Ph />
    </Right>
    <!-- <Tags /> -->
  </div>
</template>

<style>
  .sidebar {
    box-sizing: border-box;
  }
</style>