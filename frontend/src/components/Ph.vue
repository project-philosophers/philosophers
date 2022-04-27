<script setup>
  import { ref, watchEffect, watch } from 'vue';
  import { getPh, parsePh } from '../util/philosopher';
  // import { usePhInfo } from '@/stores/phForm'
  import { useState } from '@/lib/state';

  // import PhView from './Ph/PhView.vue';
  // import PhEdit from './Ph/PhEdit.vue';
  // import PhConfirm from './Ph/PhConfirm.vue';

  import PhData from './Ph/PhData.vue';

  // const presentPhId = ref();
  // const mode = ref('view')
  const [presentPhId, setPresentPhId] = useState();

  const isCreating = ref(false);

  import { useMode } from '@/stores/phForm';
  const storeMode = useMode();
  const [mode, setMode] = useState(storeMode.mode);
  watch(storeMode, () => {
    setMode(storeMode.mode);
    console.log(mode.value);
  })

  import { useSelectedPhId } from '@/stores/selectedPh';
  const selectedPhId = useSelectedPhId();
  watch(selectedPhId, () => {
    console.log(mode.value, presentPhId.value);
    if (mode.value === 'view') {
      setPresentPhId(selectedPhId.id);
    }
  })
  
  // const { selectedPhId } = storeToRefs(selectedPh);


  // watchEffect(() => {
  //   // TODO SWITCH ID
  //   // TODO CLOSE SIDE
  //   phId.value = selectedPhId.value;
  //   console.log('hey');
  //   if(mode.value === 'view' && phId.value){
  //     isShowRightSide.value = true;
  //   }
  //   else {
  //     console.log('I saw it :)', selectedPhId.value)
  //   }
  // })


  // const toNext = (nextMode) => {
  //   mode.value = nextMode
  // }
  // const goBack = (lastMode) => {
  //   console.log('lastMode', lastMode)
  //   mode.value = lastMode
  // }
  // const toCreate = () => {
  //   presentPhId.value = 'create';
  //   mode.value = 'edit';
  //   isCreating.value = true;
  // }
  // const cancelCreate = () => {
  //   isCreating.value = false;
  //   mode.value = 'view';
  // }


</script>

<template>
  <div class="ph">
    <!-- <div v-if="!isCreating" @click="toCreate()" >Add philosopher</div> -->
    <template v-if="!!presentPhId">
      <PhData :phId="presentPhId" :key="presentPhId" @setMode="mode => setMode(mode)" />
<!--       
      <div v-if="mode === 'view'">
        <PhView :phId="presentPhId" @toNextMode="nextMode => toNext(nextMode)"></PhView>
      </div>
      <div v-else-if="mode === 'edit'">
        <PhEdit @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)"  @toCancel="cancelCreate()"/>
      </div>
      <div v-if="mode === 'confirm'">
        <PhConfirm @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)"/>
      </div>
      -->
    </template>
  </div>
</template>


<style>
  .ph {
    height: 100%;
  }
</style>
