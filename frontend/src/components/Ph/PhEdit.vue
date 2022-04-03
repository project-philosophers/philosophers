<script setup>
  import { ref, watch } from 'vue';
  import { usePhInput } from '@/stores/phForm'
  import { initPh, getNameList } from '../../util/philosopher';

  const emit = defineEmits(['toNextMode', 'toLastMode', 'toCancel'])
  const props = defineProps(['phId'])
  console.log('phId', props.phId)

  const phInput = usePhInput();
  // すでに保存されてるstateがあるかどうか
  const inputData = Object.keys(phInput.$state).length ? phInput.$state : initPh();

  const toConfirm = () => {
    phInput.update(inputData);
    emit('toNextMode', 'confirm')
  }
  const goBack = () => {
    emit('toLastMode', 'view')
  }
  const cancelCreate = () => {
    console.log('ssss')
    emit('toCancel')
  }

  const phDataDic = {
    name: 'Name',
    name_original: 'Original Name',
    name_other: 'Other Names',
    gender: 'Gender',
    born: 'Born',
    born_date: 'Born Date',
    birthplace: 'Birth Place',
    died: 'Died',
    died_date: 'Died Date',
    deathplace: 'Death Place'
  }


  const edittingKey = ref();
  edittingKey.value = 'default';

  import { useSelectedPhId } from '@/stores/selectedPh';
  const selectedPhId = useSelectedPhId();
  console.log(selectedPhId.id);

  const plusInfs = e => {
    const key = e.target.id;
    edittingKey.value = key;
    console.log('on', key);
  }

  watch(selectedPhId, () => {
    const key = edittingKey.value;
    if (key !== 'default') {
      console.log(selectedPhId.id);
      console.log(phInput);
    }
  })

</script>

<template>
  <div class="h-screen p-8 bg-orange-100 text-xs overflow-y-scroll">
    <template v-for="key in Object.keys(phDataDic)">
      <div class="block w-full my-1">
        <label>{{ phDataDic[key] }}: </label>
        <input v-model="inputData[key]" class="pl-2" />
      </div>
    </template>
     <template v-for="key in ['influenced', 'influences']">
      <div class='block w-full my-1'>
        <span>{{ key }}: </span>
        <span :id="key" class='plus inline-block bg-white px-1 py-0 rounded-lg cursor-pointer' @click="(e) => plusInfs(e)">
          {{ edittingKey.value == key ? '-' : '+' }}
        </span>
        <template v-for="p in getNameList(inputData[key])">
          <span class='inline-block bg-white px-2 py-1 m-1 rounded-lg cursor-pointer'>
            {{ p + ' ' }}
            <span>x</span>
          </span>
        </template>
      </div>
    </template>
    <button @click="props.phId === 'create' ? cancelCreate() : goBack()" class="ml-2 border-zinc-900 border-2 text-black py-1 px-4 rounded">Back</button>
    <button @click="toConfirm" class="ml-2 border-zinc-900 border-2 text-black py-1 px-4 rounded">Next</button>
  </div>
</template>

<style>
.plus {
  transform: translateY(4px);
}
</style>