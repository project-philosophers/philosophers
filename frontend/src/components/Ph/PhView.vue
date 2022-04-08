<script setup>
  import { ref, watch } from 'vue'
  import { getPh, parsePh, getNameList } from '../../util/philosopher';
  import { usePhInput } from '@/stores/phForm'
  import { useSelectedPhId } from '@/stores/selectedPh';

  const props = defineProps(['phId', 'type'])
  const emit = defineEmits(['toNextMode'])
  const phInput = usePhInput()

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
    <div v-for="(item, idx) in Object.keys(phDataDic)" :key="idx">
      <div class='block w-full my-1'>
        <span>{{ phDataDic[item] }}: </span>
        <span>{{ ph[item] }}</span>
      </div>
    </div>
    <div v-for="(key, idx) in ['influenced', 'influences']" :key="idx">
      <div class='block w-full my-1' :key="idx">
        <span>{{ key }}: </span>
        <div v-for="(p, idx) in getNameList(ph[key])" :key="idx">
          <span :key="idx" class='inline-block bg-white px-2 py-1 m-1 rounded-lg cursor-pointer'>{{ p }}</span>
        </div>
      </div>
    </div>
    <!-- <div v-for="info in ph">
      <div v-if="!!info">
        <div v-if="info.label === 'Influenced' || info.label === 'Influences'">
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <div v-for="person in info.value">
              <span class='inline-block bg-white px-2 py-1 m-1 rounded-lg'>{{ person }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="!!info.value">
          <div :key="info.label"  class='block w-full my-1'>
            <span>{{ info.label }}: </span>
            <span>{{ info.value }}</span>
          </div>
        </div>
      </div>
    </div> -->
    <button @click="toEdit" class="ml-2 border-zinc-900 border-2 text-black py-1 px-4 rounded">
      <div v-if="type === 'page'">
        <router-link :to="`/philosopher/edit/${phId}`">Edit</router-link>
      </div>
      <div v-else>
        Edit
      </div>
    </button>
  </div>
</template>

<style>

</style>