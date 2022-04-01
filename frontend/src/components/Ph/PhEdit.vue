<script setup>
  import { usePhInfo } from '@/stores/phForm'
  import { initPh } from '../../util/philosopher';

  const emit = defineEmits(['toNextMode', 'toLastMode', 'toCancel'])
  const props = defineProps(['phId'])
  console.log('phId', props.phId)

  const phInfo = usePhInfo();
  // すでに保存されてるstateがあるかどうか
  const info = Object.keys(phInfo.$state).length ? phInfo.$state : initPh();

  const toNext = () => {
    phInfo.$state = info // TODO 効かない
    emit('toNextMode', 'confirm')
  }

  const goBack = () => {
    emit('toLastMode', 'view')
  }

  const cancelCreate = () => {
    console.log('ssss')
    emit('toCancel')
  }
</script>

<template>
  <div class="h-screen p-10 bg-orange-100">
    <div class="block w-full my-1"><label>Name: </label><input v-model="info.name" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Original Name: </label><input v-model="info.name_original" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Other Name: </label><input v-model="info.name_other" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Gender: </label><input v-model="info.gender" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Born: </label><input v-model="info.born" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Born Date: </label><input v-model="info.born_date" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Born Question: </label><input v-model="info.born_question" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Birth Place: </label><input v-model="info.birthplace" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Died: </label><input v-model="info.died" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Died Date: </label><input v-model="info.died_date" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Death Place: </label><input v-model="info.deathplace" class="pl-2" /></div>
    <div class="block w-full my-1"><label>Died Question: </label><input v-model="info.died_questioning" class="pl-2" /></div>
    <button @click="props.phId === 'create' ? cancelCreate() : goBack()" class="ml-2 border-zinc-900 border-2 text-black py-1 px-4 rounded">Back</button>
    <button @click="toNext" class="ml-2 border-zinc-900 border-2 text-black py-1 px-4 rounded">Next</button>
  </div>
</template>

<style>

</style>