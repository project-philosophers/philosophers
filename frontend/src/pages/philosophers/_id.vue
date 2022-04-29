<script setup>
  import { ref, watch, onBeforeMount, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const phId = route.params.id;


  import Page from '../../components/Page.vue';


  import { useState } from '@/lib/state';

// Or, get in 'App.vue'
  import { useStorePhils } from '@/stores/philosophers';
  const storePhils = useStorePhils();
  import { lenObj } from '@/lib/funcObjs';
  import { toEmptyArray } from '@/lib/toEmptyArrays';
  onMounted(async () => {
    let data;
    if (lenObj(storePhils.data) === 0) {
      data = await axios.get('/api/philosophers/read').then(res => toEmptyArray(res.data.data));
    } else {
      data = storePhils.data;
    }
    storePhils.setStorePhils(data);
  })
  // console.log(storePhils.data);
  // const data = storePhils.data;
  // const getPh = id => data.find(ph => ph.id === id);
  // const getNameList = (arr) => arr.map(id => getPh(id).name);

  // const phData = getPh(phId);
  // console.log(phData);

  const [phData, setPhData] = useState([]);
  import axios from 'axios';
  onMounted(async () => {
    const data = await axios.get(`/api/philosophers/read/${phId}`).then(res => res.data.data);
    setPhData(data)
  });

</script>

<template>
  <div class="main relative h-12/12">
    <!-- <Ph class="absolute right-0 h-screen w-3/12" /> -->
    <!-- <PhView :phId="phId" class="transition ph-view absolute right-0 w-3/12"/> -->
    <!-- {{ phData.name }} -->
    <Page class="page w-screen" genos="philosophers" :data="phData" />
  </div>
</template>

<style>
  .page {
    width: 100%;
  }
</style>