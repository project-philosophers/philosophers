<script>
import { ref } from '@nuxtjs/composition-api'
import { getName } from '../utils/philosopher.ts'

export default {
  name: 'PhilosopherShow',
  props:['philoId', 'philoInfo'],
  setup(){
    const philosopher = ref({});
    const influences = ref([]);

    return {
      philosopher,
      next: 'edit',
    }
  },
  created() {
    this.philosopher.value = this.philoInfo
  }
}
</script>

<template>
  <div class="h-screen flex flex-wrap justify-center p-10 bg-gray-100">
    <div class='block w-full my-2'>
      <span>id</span>
      <span>{{philosopher.value.id}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>name:</span>
      <span>{{philosopher.value.name}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>name_original:</span>
      <span>{{philosopher.value.name_original}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>name_other:</span>
      <span>{{philosopher.value.name_other}}</span>
    </div>
    <div class="block w-full my-2">
      <span>Born:</span>
      <span>{{ philosopher.value.born }}{{ philosopher.value.born_date ? ` ${philosopher.value.born_date }` :'' }}{{ philosopher.value.born_questioning? '(questioning)' :'' }}</span>
    </div>
    <div class="block w-full my-2">
      <span>Born:</span>
      <span>{{ philosopher.value.died }}{{ philosopher.value.died_date ? ` ${philosopher.value.died_date }` :''}}{{ philosopher.value.died_questioning? '(questioning)' :'' }}</span>
    </div>
    <div class='block w-full my-2'>
      <span>gender:</span>
      <span>{{philosopher.value.gender}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>birthplace:</span>
      <span>{{philosopher.value.birthplace}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>deathplace:</span>
      <span>{{philosopher.value.deathplace}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>influences:</span>
      <span>{{philosopher.value.influences}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>influenced:</span>
      <span>{{philosopher.value.influenced}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>createdAt:</span>
      <span>{{philosopher.value.createdAt}}</span>
    </div>
    <div class='block w-full my-2'>
      <span>updatedAt:</span>
      <span>{{philosopher.value.updatedAt}}</span>
    </div>


  

    <button>
      <!-- <nuxt-link :to="`/philosopher/${next}/${philoId}`">Edit</nuxt-link> -->
      </button>
  </div>
</template>

<style>

</style>