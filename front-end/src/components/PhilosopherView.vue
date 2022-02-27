<script setup>
import { ref } from 'vue'
import { getPh, parsePh } from '../../utils/philosopher';

const props = defineProps(['phId'])

const philosopher = ref({});
philosopher.value = parsePh(getPh(`${props.phId}`));
</script>

<template>
  <div class="h-screen p-10 bg-gray-100">
    <template v-for="info in philosopher">
      <template v-if="!!info">
        <template v-if="info.label === 'Influenced' || info.label === 'Influences'">
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <template v-for="person in info.value" :key="person">
              <span class='inline-block bg-white px-2 py-1 m-1 rounded-lg'>{{ person }}</span>
            </template>
          </div>
        </template>
        <template v-else>
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <span>{{ info.value }}</span>
          </div>
        </template>
      </template>
    </template>
    <button>
      <router-link :to="`/philosopher/edit/${phId}`">Edit</router-link>
    </button>
  </div>
</template>

<style>

</style>