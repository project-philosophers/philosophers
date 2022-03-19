<script setup>
  import PhView from '../components/PhView.vue';
  import PhEdit from '../components/PhEdit.vue';
  import Graph from '../components/Graph.vue';
  import SearchPanel from '../components/SearchPanel.vue';
  import PhConfirm from '../components/PhConfirm.vue';

  import { ref, watchEffect } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useSelectedPh } from '../../src/stores/selectedPh';
  const selectedPh = useSelectedPh();

  const { selectedPhId } = storeToRefs(selectedPh);

  // utils
  const phId = ref();
  const mode = ref('view')
  const isShowRightSide = ref(true);
  const isCreating = ref(false);

  watchEffect(() => {
    // TODO SWITCH ID
    // TODO CLOSE SIDE
    phId.value = selectedPhId.value;
    if(mode.value === 'view' && phId.value){
      isShowRightSide.value = true;
    }
    else {
      console.log('I saw it :)', selectedPhId.value)
    }
  })

  const toNext = (nextMode) => {
    mode.value = nextMode
  }
  const goBack = (lastMode) => {
    mode.value = lastMode
  }
  const toCreate = () => {
    isShowRightSide.value = true;
    phId.value = 'create';
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
  <div class="main flex">
    <Graph class="graph w-8/12" />
    <SearchPanel class="fixed bottom-px"/>
    <div class="w-4/12">
      <div v-if="!isCreating" class="fixed" @click="toCreate()">Add philosopher</div>
      <template v-if="isShowRightSide">
        <template v-if="!!phId">
          <template v-if="mode === 'view'">
            <PhView @toNextMode="nextMode => toNext(nextMode)" :phId="phId"/>
          </template>
          <template v-else-if="mode === 'edit'">
            <PhEdit :phId="phId" @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)"  @toCancel="cancelCreate()"/>
          </template>
          <template v-if="mode === 'confirm'">
            <PhConfirm :phId="phId" @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)" />
          </template>
        </template>
      </template>
    </div>
  </div>
</template>

<style>

</style>