<script setup>
  import { ref, watch, onBeforeMount, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  const route = useRoute();
  const phId = route.params.id;

  import PhView from '../../components/Ph/PhView.vue';

  // import Ph from '../../components/Ph.vue';

  import { useStorePhils } from '@/stores/philosophers';
  const storePhils = useStorePhils();
  const data = storePhils.data;
  const getPh = id => data.find(ph => ph.id === id);
  const getNameList = (arr) => arr.map(id => getPh(id).name);

  const phData = getPh(phId);
  console.log(phData);
</script>

<template>
  <div class="main flex">
    <!-- <Ph class="absolute right-0 h-screen w-3/12" /> -->
    <PhView :phId="phId" class="transition ph-view absolute right-0 w-3/12"/>
    {{ phData.name }}
  </div>
</template>

<style>
  /* .ph-view { */
    /* transition:  */
  /* } */
</style>