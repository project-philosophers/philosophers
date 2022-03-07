<script>
import { ref } from '@nuxtjs/composition-api'

export default {
  name: 'PhilosopherShow',
  props:['phId', 'phInfo'],
  setup(){
    const philosopher = ref({});

    return {
      philosopher,
    }
  },
  created() {
    this.philosopher.value = this.phInfo
  }
}
</script>

<template>
  <div class="h-screen p-10 bg-gray-100">
    <template v-for="info in phInfo">
      <template v-if="!!info.value">
        <template v-if="info.label === 'Influenced' || info.label === 'Influences'">
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <template v-for="person in info.value">
              <span :key='person' class='inline-block bg-white px-2 py-1 m-1 rounded-lg'>{{ person }}</span>
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
      <nuxt-link :to="`/philosopher/edit/${phId}`">Edit</nuxt-link>
    </button>
  </div>
</template>

<style>

</style>