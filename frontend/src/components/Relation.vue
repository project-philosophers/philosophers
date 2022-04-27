<script setup>
  import { ref, watch, onMounted, onBeforeMount } from 'vue';
  import { useState } from '../lib/state';

  const props = defineProps(['id']);
  const [id, setId] = useState(props.id);
  watch(props, () =>{
    setId(props.id);
  })

  const [item, setItem] = useState('about');

  const itemList = [
    'about',
    'keywords',
    'literature',
    'papers',
    'community'
  ]
</script>

<template>
  <div>
    <div class="bar w-12/12 h-7">
      <ul class="flex flex-nowrap">
        <template v-for="item in itemList">
          <li>{{ item }}</li>
        </template>
      </ul>
    </div>
    <div>
      {{ id }}
    </div>
  </div>
</template>

<style scoped>
  .bar {
    border-bottom: 1px solid black;
    /* box-sizing: border-box */
  }

  li {
    /* width: 100%; */
    padding-right: 15px;
    opacity: 0.3;
    cursor: default;
  }
  li:hover {
    opacity: 1;
    /* font-weight: 600; */
    /* border-bottom: 1px solid black; */
    /* box-sizing: border-box */
  }
</style>