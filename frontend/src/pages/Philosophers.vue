<script setup>
  import PhilosopherView from '../components/PhilosopherView.vue';
  import { ref } from 'vue';
  // utils
  const phId = ref(97056520);
</script>

<template>
  <div class="main">
    <div class="graph">GRAPH</div>
    <template v-if="phId">
      <PhilosopherView :phId="phId"/>
    </template>
  </div>
  

</template>

<style>

</style>