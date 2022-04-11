<script setup>
  import axios from 'axios';
  import { ref, watch, onMounted, onBeforeMount } from 'vue';
  import { useState } from '../lib/state';


  // import { usePhilosophers } from '@/stores/philosophers';
  // import { storeToRefs } from 'pinia';
  // const philosophers = usePhilosophers();
  // const { phils } = storeToRefs(philosophers);


  import { useTagsType } from '@/stores/viewTypes';
  const tagsType = useTagsType();

  // onBeforeMount(async () => {
  //   const tags = await axios.get('/api/tags/read').then(res => res.data.data);
  //   console.log(tags[0].name);
  // })

  // const tags = tags0.data.data;


  const tagsTypes = ['languages', 'nationalities', 'education', 'categories'];

  const tags = [
    {name: 'Latin'},
    {name: 'German'}
  ]

  const tagClick = (tagName) => {
    console.log(tagName);
  }

  const newTag = ref('');
  const addTag = () => {
    const addTagInfo = {
      tagsType: tagsType.type,
      newTag: newTag.value
    }
    console.log(addTagInfo);
  }


</script>

<template>
  <!-- <Sidebar /> -->
  <div class="tags absolute ml-15 z-10">
    <template v-for="tagsType in tagsTypes">
    <div class="pb-10">
    <!-- <h1 class="font-bold">{{ tagsType.type }}</h1> -->
    <h1 class="font-bold">{{ tagsType }}</h1>
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
        class="border-1 border-black"
        placeholder="new"
        v-model="newTag"
      />
      <div @click="addTag()">add</div>
    </div>
    </div>
    </template>
  </div>
</template>

<style>

</style>