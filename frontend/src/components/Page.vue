<script setup>
  import { ref, watch, onMounted, onBeforeMount } from 'vue';
  import { useState } from '../lib/state';

  const props = defineProps(['data']);

  const [phData, setPhData] = useState(props.data);
  // let data = props.data;
  watch(props, () => {
    // data = props.data;
    setPhData(props.data)
    // console.log(props.data);
  })
  // console.log(phData.value);

  import Info from './Info.vue';
  import Items from './Items.vue';
  import Buttons from './Buttons.vue';

</script>

<template>
  <div class="w-screen h-12/12 flex flex-col">
    <div class="title relative w-screen h-10 text-2xl text-bottom">
      <div class="absolute bottom-1 left-3">
        <span class="font-bold">Ph</span>
        {{ phData.name }}
      </div>
    </div>
    <div class="flex-1 flex flex-row">
      <div class="right-0 w-3/12">
        <Info :data="phData" />
        <!-- <PhData :data="phData" /> -->
        <!-- <Buttons :storeMode="storePageMode" @submit="submit()" /> -->
      </div>
      <div class="flex-1 pl-5 pr-5">
        <Items :id="phData.id" />
      </div>
    </div>
  </div>
</template>

<style>

</style>