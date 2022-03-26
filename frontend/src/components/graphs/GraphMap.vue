<script setup>
  import { ref, onMounted } from 'vue';

  import World from './world.vue';


  const props = defineProps(['data']);
  const emit = defineEmits(['response']);
  const clickedPhId = ref();

  import * as d3 from 'd3';

  const preprocess = (data) => {
    // return data.map(d => {
    //   return {
    //     id: d.id,
    //     name: d.name,
    //     born: d.born,
    //     died: d.died
    //   }
    // }).sort((d1, d2) => {
    //   if (d1.born > d2.born) return 1;
    //   else if (d1.born < d2.born) return -1;
    //   else {
    //     if (d1.died > d2.died) return 1;
    //     else if (d1.died < d2.died) return -1;
    //   }
    // });
  }



  onMounted(() => {
    // graph(preprocess(props.data));
    // console.log('hey');
  })
</script>

<template>
  <div class="container">
    <div class="map">
      <World />
    </div>
  </div>
</template>

<style>
  .map {
    position: absolute;
    left: 0;
    /* width: 1600px; */
    /* height: 80%; */
  }
</style>