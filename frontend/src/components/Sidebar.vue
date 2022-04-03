<script setup>
  import { useGraphType } from '@/stores/graphs';
  const graphType = useGraphType();

  import { useIsSearching } from '@/stores/search';
  const isSearching = useIsSearching();

</script>

<template>
  <div class="sidebar h-screen w-15 flex-col items-center bg-red-200">
    <div>
      <ul>
        <li class="cursor-pointer" @click="graphType.switchType('timeline')">timeline</li>
        <li class="cursor-pointer" @click="graphType.switchType('table')">table</li>
        <li class="cursor-pointer" @click="graphType.switchType('network')">network</li>
      </ul>
    </div>
    <!-- <div class="absolute bottom-0"> -->
    <div>
      <div class="absolute bottom-0 cursor-pointer" @click="isSearching.switch()">Search</div>
    </div>
  </div>
</template>

<style>

</style>