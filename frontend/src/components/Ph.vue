<script setup>
  import { ref, watchEffect, watch } from 'vue';
  import { getPh, parsePh } from '../util/philosopher';
  // import { usePhInfo } from '@/stores/phForm'

  import PhView from './Ph/PhView.vue';
  import PhEdit from './Ph/PhEdit.vue';
  import PhConfirm from './Ph/PhConfirm.vue';

  const presentPhId = ref();
  const mode = ref('view')

  const isShowRightSide = ref(true);
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
    // if (phId === select)
    // console.log('change');
    presentPhId.value = selectedPhId.id;
    // console.log(presentPhId.value);
    // if(mode.value === 'view' && phId.value){
      // isShowRightSide.value = true;
    // }
  //   else {
  //     console.log('I saw it :)', selectedPhId.value)
  //   }
  })


  const toNext = (nextMode) => {
    mode.value = nextMode
  }
  const goBack = (lastMode) => {
    mode.value = lastMode
  }
  const toCreate = () => {
    isShowRightSide.value = true;
    // phId.value = 'create';
    mode.value = 'edit';
    isCreating.value = true;
  }
  const cancelCreate = () => {
    isCreating.value = false;
    isShowRightSide.value =false;
    mode.value = 'view';
  }


</script>

<template>
  <template v-if="!!presentPhId">
    <template v-if="mode === 'view'">
      <PhView :phId="presentPhId" @toNextMode="nextMode => toNext(nextMode)" class="w-3/12"/>
    </template>
    <template v-else-if="mode === 'edit'">
      <PhEdit @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)"  @toCancel="cancelCreate()" class="w-3/12"/>
    </template>
    <template v-if="mode === 'confirm'">
      <PhConfirm @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)" class="w-3/12"/>
    </template>
  </template>
</template>

<style>

</style>