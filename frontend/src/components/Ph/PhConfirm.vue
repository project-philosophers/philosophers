<script setup>
  import { ref } from 'vue'
  import { usePhInput } from '@/stores/phForm'
  import { parsePh } from '../../util/philosopher';
  import client from '../../../config/axios.js'

  const emit = defineEmits(['toNextMode', 'toLastMode'])
  const props = defineProps(['phId'])
  const mode = ref(props.phId === 'create' ? 'create' : 'update')
  const phInput = usePhInput();
  const info = phInput.data;
  const ph = ref({});
  ph.value = parsePh(info);
  const resError = ref(false);

  // const submitPh = async () => {
  //   if (mode.value === 'create'){
  //     const res = await client({
  //       method: 'post',
  //       url: `/create`,
  //       data: {
  //         id: ph.id,
  //         ...info
  //       }
  //     }).catch(error => {
  //       console.log(error),
  //       resError.value = true
  //     })
  //   } else {
  //     const res = await client({
  //       method: 'put',
  //       url: `/update`,
  //       data: {
  //         ...info
  //       }
  //     }).catch(error => {
  //       console.log(error),
  //       resError.value = true
  //     })
  //   }

  //   if (ref.state === 200) {
  //     emit('toNextMode', 'view')
  //   }
  // }

  const submitPh = () => {
    console.log(info);
  }

  const goBack = () => {
    emit('toLastMode', 'edit')
  }
</script>

<template>
  <div class="h-screen pb-20 p-8 bg-green-100 text-xs overflow-y-scroll">
    <div v-for="(info, idx) in ph" :key="idx">
      <div v-if="!!info">
        <div v-if="info.label === 'Influenced' || info.label === 'Influences'">
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <div v-for="person in info.value" :key="person">
              <span class='inline-block bg-white px-2 py-1 m-1 rounded-lg'>{{ person }}</span>
            </div>
          </div>
        </div>
        <div v-else>
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <span>{{ info.value }}</span>
          </div>
        </div>
      </div>
    </div>
    <p v-if="resError">Fail to {{mode}}, try later.</p>
    <button @click="goBack" class="border-zinc-900 border-2 text-black py-1 px-4 rounded">Back</button>
    <button @click="submitPh" class="pl-2 border-zinc-900 border-2 text-black py-1 px-4 rounded">Submit</button>
  </div>
  
</template>

<style>
</style>