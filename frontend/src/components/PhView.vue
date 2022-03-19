<script setup>
import { ref } from 'vue'
import { getPh, parsePh } from '../util/philosopher';
import { usePhInfo } from '@/stores/phForm'

const props = defineProps(['phId', 'type'])
const emit = defineEmits(['toNextMode'])
const phInfo = usePhInfo()

const phData = getPh(props.phId);
const ph = ref({});
ph.value = parsePh(phData);

const toNext = () => {
  phInfo.$state = phData
  emit('toNextMode', 'edit')
}

</script>

<template>
  <div class="h-screen p-10 bg-gray-100">
    <template v-for="info in ph">
      <template v-if="!!info">
        <template v-if="info.label === 'Influenced' || info.label === 'Influences'">
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <template v-for="person in info.value">
              <span class='inline-block bg-white px-2 py-1 m-1 rounded-lg'>{{ person }}</span>
            </template>
          </div>
        </template>
        <template v-else-if="!!info.value">
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <span>{{ info.value }}</span>
          </div>
        </template>
      </template>
    </template>
    <button class="border-zinc-900 border-2 text-black py-1 px-4 rounded">
      <template v-if="type === 'page'">
        <router-link :to="`/philosopher/edit/${phId}`">Edit</router-link>
      </template>
      <template v-else>
        <p @click="toNext">Edit</p>
      </template>
    </button>
  </div>
</template>

<style>

</style>