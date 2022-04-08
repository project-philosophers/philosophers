<script setup>
  import { useGraphType } from '@/stores/graphs';
  const graphType = useGraphType();

  import { useIsSearching } from '@/stores/search';
  const isSearching = useIsSearching();

</script>

<template>
  <div class="sidebar h-screen w-15 flex-col items-center bg-red-200">
    <div class="top-0 cursor-pointer" @click="isSearching.switch()">search</div>
    <div class="mt-10">
      <!-- GRAPHS -->
      <ul>
      <li class="cursor-pointer" @click="graphType.switchType('table')">table</li>
      <li class="cursor-pointer" @click="graphType.switchType('timeline')">timeline</li>
        <li class="cursor-pointer" @click="graphType.switchType('network')">network</li>
      </ul>
    </div>
    <div class="mt-10">
      <!-- TAGS -->
      <ul>
        <li class="cursor-pointer" @click="graphType.switchType('timeline')">languages</li>
        <li class="cursor-pointer" @click="graphType.switchType('timeline')">nationalities</li>
        <li class="cursor-pointer" @click="graphType.switchType('network')">education</li>
        <li class="cursor-pointer" @click="graphType.switchType('network')">categories</li>
        <li class="cursor-pointer" @click="graphType.switchType('network')">keywords</li>
      </ul>
    </div>
    <div class="mt-10">
      <!-- RELATION -->
      <ul>
        <li class="cursor-pointer" @click="graphType.switchType('timeline')">Literature</li>
        <li class="cursor-pointer" @click="graphType.switchType('timeline')">Keywords</li>
      </ul>
    </div>
    <div class="absolute bottom-0">Add</div>
  </div>
</template>

<style>

</style>