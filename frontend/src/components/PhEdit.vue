<script setup>
  import { usePhInfo } from '@/stores/phForm'

  const emit = defineEmits(['toNextMode', 'toLastMode'])
  const phInfo = usePhInfo();
  const info = phInfo.$state;
  const toNext = () => {
    phInfo.$state = info
    emit('toNextMode', 'confirm')
  }
  const goBack = () => {
    emit('toLastMode', 'view')
  }
</script>

<template>
  <div class="h-screen p-10 bg-orange-100">
    <div class="block w-full my-1"><label>ID: </label><input v-model="info.id" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Name: </label><input v-model="info.name" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Original Name </label><input v-model="info.name_original" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Other Name </label><input v-model="info.name_other" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Gender: </label><input v-model="info.gender" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Born: </label><input v-model="info.born" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Born Date </label><input v-model="info.born_date" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Born Question </label><input v-model="info.born_question" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Birth Place </label><input v-model="info.birthplace" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Died: </label><input v-model="info.died" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Died Date </label><input v-model="info.died_date" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Death Place </label><input v-model="info.deathplace" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Died Question </label><input v-model="info.died_questioning" class="pl-2" /></div>
    <button @click="goBack" class="border-zinc-900 border-2 text-black py-1 px-4 rounded">Back</button>
    <button @click="toNext" class="ml-2 border-zinc-900 border-2 text-black py-1 px-4 rounded">Next</button>
  </div>
</template>

<style>

</style>