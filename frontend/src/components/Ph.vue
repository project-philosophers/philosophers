<script setup>
  import { ref, watchEffect, watch } from 'vue';
  import { getPh, parsePh } from '../util/philosopher';
  // import { usePhInfo } from '@/stores/phForm'

  import PhView from './Ph/PhView.vue';
  import PhEdit from './Ph/PhEdit.vue';
  import PhConfirm from './Ph/PhConfirm.vue';

  const presentPhId = ref();
  const mode = ref('view')

  const isCreating = ref(false);

  // import { storeToRefs } from 'pinia';
  import { useSelectedPhId } from '@/stores/selectedPh';
  const selectedPhId = useSelectedPhId();
  
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

  watch(selectedPhId, () => {
    presentPhId.value = selectedPhId.id;
  })


  const toNext = (nextMode) => {
    mode.value = nextMode
  }
  const goBack = (lastMode) => {
    console.log('lastMode', lastMode)
    mode.value = lastMode
  }
  const toCreate = () => {
    presentPhId.value = 'create';
    mode.value = 'edit';
    isCreating.value = true;
  }
  const cancelCreate = () => {
    isCreating.value = false;
    mode.value = 'view';
  }


</script>

<template>
  <div>
    <div v-if="!isCreating" @click="toCreate()" >Add philosopher</div>
    <div v-if="!!presentPhId">
      <div v-if="mode === 'view'">
        <PhView :phId="presentPhId" @toNextMode="nextMode => toNext(nextMode)"></PhView>
      </div>
      <div v-else-if="mode === 'edit'">
        <PhEdit @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)"  @toCancel="cancelCreate()"/>
      </div>
      <div v-if="mode === 'confirm'">
        <PhConfirm @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)"/>
      </div>
    </div>
  </div>
</template>


<style>

</style>
