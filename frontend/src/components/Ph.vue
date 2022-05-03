<script setup>
  import { ref, watchEffect, watch } from 'vue';
  // import { getPh, parsePh } from '../util/philosopher';
  // import { usePhInfo } from '@/stores/phForm'
  import { useState } from '@/lib/state';

  // import PhView from './Ph/PhView.vue';
  // import PhEdit from './Ph/PhEdit.vue';
  // import PhConfirm from './Ph/PhConfirm.vue';

  import PhData from './PhData.vue';
  import Buttons from './Buttons.vue';

  // const presentPhId = ref();
  // const mode = ref('view')
  const [presentPhId, setPresentPhId] = useState();


  // import { useStorePhils } from '@/stores/philosophers';
  // const storePhils = useStorePhils();
  // const data = storePhils.data;
  // const getPh = id => data.find(ph => ph.id === id);
  // // const getNameList = (arr) => arr.map(id => getPh(id).name);

  // const [phData, setPhData] = useState({});



  // const isCreating = ref(false);

  import { useMode } from '@/stores/phForm';
  const storeMode = useMode();
  const [mode, setMode] = useState(storeMode.mode);
  watch(storeMode, () => {
    setMode(storeMode.mode);
    // console.log('Ph', mode.value);
  })

  import { useSelectedPhId } from '@/stores/selectedPh';
  const selectedPhId = useSelectedPhId();
  watch(selectedPhId, () => {
    // console.log(mode.value, presentPhId.value);
    if (mode.value === 'view') {
      setPresentPhId(selectedPhId.id);
      // setPhData(getPh(presentPhId));
    }
  })

  const [inputData, setInputData] = useState({});
  import { submitPh } from '@/lib/subimtPh';
  const submit = () => {
    // if (!!inputData.value) {
    console.log('submit', inputData.value);
    // const res = await submitPh(inputData.value);
    // if (res.status === 200) {
    //   storeMode.switchMode('view');
    // }
    // }
    const res = submitPh(inputData.value)
      // .then(res => {
      //   if (res.status === 200) {
      //     storeMode.switchMode('view');
      //   }
      // })
      .catch(err => console.error(err.stack));
    console.log(res.status);
  }


  const bgColor = {
    view: 'bg-gray-100',
    edit: 'bg-orange-100',
    confirm: 'bg-green-100'
  }


  const goPage = () => {
    // router.push(`/philosophers/${phData.id}`);
  }
</script>

<template>
  <div class="ph relative">
    <!-- <div v-if="!isCreating" @click="toCreate()" >Add philosopher</div> -->
    <template v-if="!!presentPhId">
      <div :class="'relative w-12/12 h-12/12 flex flex-col p-4' + ' ' + bgColor[mode]">
        <div class="flex-1">
          <PhData :phId="presentPhId" :key="presentPhId" @setInputData="inputData => setInputData(inputData)" />
        </div>
        <div class="mt-2">
          <Buttons :storeMode="storeMode" @submit="submit()" />
        </div>
        <div class="bottom-0 text-xs text-right cursor-pointer" @click="goPage()">
          <router-link :to="`/philosophers/${presentPhId}`">> page</router-link>
          <!-- <a :href="`/philosophers/${phId}`">page</a> -->
        </div>
      </div>
    </template>
  </div>
</template>


<style>
  /* .ph {
    height: 100%;
  } */
</style>
