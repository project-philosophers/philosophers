<script setup>
  import axios from 'axios';
  import { ref, onMounted, onBeforeMount } from 'vue';


  // import { usePhilosophers } from '@/stores/philosophers';
  // import { storeToRefs } from 'pinia';
  // const philosophers = usePhilosophers();
  // const { phils } = storeToRefs(philosophers);



  // onBeforeMount(async () => {
  //   const tags = await axios.get('/api/tags/read').then(res => res.data.data);
  //   console.log(tags[0].name);
  // })

  // const tags = tags0.data.data;

  const tags = [
    {name: 'Latin'},
    {name: 'German'}
  ]

  const tagClick = (tagName) => {
    console.log(tagName);
  }

  const newTagName = ref('');
  const addTag = () => {
    console.log(newTagName.value);
  }


</script>

<template>
  <!-- <Sidebar /> -->
  <div class="tags languages absolute ml-15 z-10">
    <h1 class="font-bold">Languages</h1>
    <div class="tags-area">
      <template v-for="tag in tags">
        <div @click="tagClick(tag.name)">
          <span>{{ tag.name }}</span>
        </div>
      </template>
    </div>
    <div class="new-tag">
      <input
        id="tags-input"
        placeholder="new"
        v-model="newTagName"
      />
      <div @click="addTag()">add</div>
    </div>
  </div>
</template>

<style>

</style>