<script>
import { ref, useRoute, reactive } from '@nuxtjs/composition-api'
import { getPh, parsePh } from '../utils/philosopher.ts'

const formTemplate = {
  "id": "",
  "name": "",
  "name_original": '',
  "name_other": '',
  "born": '',
  "born_date": '',
  "born_questioning": false,
  "died": '',
  "died_date": '',
  "died_questioning": false,
  "gender": "",
  "birthplace": '',
  "deathplace": '',
  "influences": [],
  "influenced": [],
  "createdAt": "",
  "updatedAt": "",
}

export default {
  name: 'PhilosopherEdit',
  props:['phId'],
  setup(){
    // const phForm = reactive(formTemplate);
    const route = useRoute();
    // const philosopher = ref({});
    const id = route.value.params.id;
    const ph = parsePh(getPh(id));

    return {
      // philosopher,
      id,
      ph,
      // phForm,
    }
  },
  created() {
    // this.philosopher.value = this.phInfo
  }
}
</script>

<template>
  <div class="h-screen p-10 bg-gray-100">
    <template v-for="info in ph">
      <template v-if="!!info">
        <template v-if="info.label === 'Influenced' || info.label === 'Influences'">
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <span>TODO...</span>
          </div>
        </template>
        <template v-else>
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <input key="info.label" v-model="info.value"/>
          </div>
        </template>
      </template>
    </template>
    <button>
      <nuxt-link :to="`/philosopher/show/${id}`">Back(building)</nuxt-link>
    </button>
    <button>
      <nuxt-link :to="`/philosopher/confirm/${id}`">Confirm(building)</nuxt-link>
    </button>
  </div>
</template>

<style>

</style>