<script setup>
  import PhView from '../components/PhView.vue';
  import { ref } from 'vue';
  // utils
  const phId = ref(97056520);
</script>

<template>
  <div class="main">
    <div class="graph">GRAPH</div>
    <template v-if="phId">
      <PhView :phId="phId" />
    </template>
  </div>
  

</template>

<style>

</style>