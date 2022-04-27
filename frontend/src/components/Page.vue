<script setup>
  import { ref, watch, onMounted, onBeforeMount } from 'vue';
  import { useState } from '../lib/state';

  const props = defineProps(['data']);

  const [phData, setPhData] = useState(props.data);
  watch(props, () => {
    setPhData(props.data)
    console.log(props.data);
  })

  import PhData from './Ph/PhData.vue';
  import Relation from './Relation.vue';

</script>

<template>
  <div class="w-screen h-12/12 flex flex-col">
    <div class="title relative w-screen h-10 text-2xl text-bottom">
      <div class="absolute bottom-0">
        <span>Ph</span>
        {{ phData.name }}
      </div>
    </div>
    <div class="flex-1 flex flex-row">
      <div class="right-0 w-3/12">
        <!-- <PhData :data="phData" /> -->
      </div>
      <div class="flex-1 pl-5 pr-5">
        <Relation :id="phData.id" />
      </div>
    </div>
  </div>
</template>

<style>

</style>