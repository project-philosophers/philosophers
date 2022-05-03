<script setup>
  import { useGraphType, useTagsType, useViewType } from '@/stores/viewTypes';
  const graphType = useGraphType();
  const tagsType = useTagsType();
  const viewType = useViewType();

  import { useIsSearching } from '@/stores/search';
  const isSearching = useIsSearching();

</script>

<template>
  <div class="sidebar">
    <div class="top-0 cursor-pointer" @click="isSearching.switch()">Search</div>
    <div class="mt-10">
      <!-- GRAPHS -->
      <ul>
        <li class="cursor-pointer" @click="viewType.switchType(['graph', 'table'])">table</li>
        <li class="cursor-pointer" @click="viewType.switchType(['graph', 'timeline'])">timeline</li>
        <li class="cursor-pointer" @click="viewType.switchType(['graph', 'network'])">network</li>

        <!-- <li class="cursor-pointer" @click="viewType.switchType(['graph', 'table'])">table</li> -->
        <!-- <li class="cursor-pointer" @click="viewType.switchType(['graph', 'timeline'])">timeline</li> -->
        <!-- <li class="cursor-pointer" @click="viewType.switchType(['graph', 'network'])">network</li> -->
      </ul>
    </div>
    <div class="mt-10">
      <!-- TAGS -->
      <ul>
        <li class="cursor-pointer" @click="tagsType.switchType(['tags'])">categories</li>
        <!-- <li class="cursor-pointer" @click="tagsType.switchType('languages')">languages</li>
        <li class="cursor-pointer" @click="tagsType.switchType('nationalities')">nationalities</li>
        <li class="cursor-pointer" @click="tagsType.switchType('education')">education</li>
        <li class="cursor-pointer" @click="tagsType.switchType('categories')">categories</li> -->
        <!-- <li class="cursor-pointer" @click="tagsType.switchType('network')">keywords</li> -->
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