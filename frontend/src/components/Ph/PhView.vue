<script setup>
  import { ref, watch } from 'vue'
  import { getPh, parsePh, getNameList } from '../../util/philosopher';
  import { usePhInput } from '@/stores/phForm'

  const props = defineProps(['phId', 'type'])
  const emit = defineEmits(['toNextMode'])
  const phInput = usePhInput()

  import { useSelectedPhId } from '@/stores/selectedPh';
  let phData = getPh(props.phId);
  const selectedPhId = useSelectedPhId();

  const ph = ref({});
  // ph.value = parsePh(phData);
  ph.value = phData;

  watch(selectedPhId, () => {
    phData = getPh(selectedPhId.id);
    // ph.value = parsePh(phData);
    ph.value = phData;
  })

  const toEdit = () => {
    phInput.init(phData);
    emit('toNextMode', 'edit')
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
</script>

<template>
  <div class="h-screen pb-20 p-8 bg-gray-100 text-xs overflow-y-scroll">
    <template v-for="key in Object.keys(phDataDic)">
      <div class='block w-full my-1'>
        <span>{{ phDataDic[key] }}: </span>
        <span>{{ ph[key] }}</span>
      </div>
    </template>
    <template v-for="key in ['influenced', 'influences']">
      <div class='block w-full my-1'>
        <span>{{ key }}: </span>
        <template v-for="p in getNameList(ph[key])">
          <span class='inline-block bg-white px-2 py-1 m-1 rounded-lg cursor-pointer'>{{ p }}</span>
        </template>
      </div>
    </template>
    <!-- <template v-for="info in ph">
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
    </template> -->
    <button @click="toEdit" class="ml-2 border-zinc-900 border-2 text-black py-1 px-4 rounded">
      <template v-if="type === 'page'">
        <router-link :to="`/philosopher/edit/${phId}`">Edit</router-link>
      </template>
      <template v-else>
        Edit
      </template>
    </button>
  </div>
</template>

<style>

</style>