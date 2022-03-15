<script setup>
  import PhView from '../components/PhView.vue';
  import PhEdit from '../components/PhEdit.vue';
  import Graph from '../components/Graph.vue';
  import SearchPanel from '../components/SearchPanel.vue';
  import { ref } from 'vue';
  import PhConfirm from '../components/PhConfirm.vue';
  // utils
  const phId = ref();
  const mode = ref('view')
  const isShowRightSide = ref(true);
  const isCreating = ref(false);

  const toNext = (nextMode) => {
    mode.value = nextMode
  }
  const goBack = (lastMode) => {
    mode.value = lastMode
  }
  const toCreate = () => {
    phId.value = 'create';
    mode.value = 'edit';
    isCreating.value = true;
    console.log('isShowRightSide', isShowRightSide.value)
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
            <PhView @toNextMode="nextMode => toNext(nextMode)" />
          </template>
          <template v-else-if="mode === 'edit'">
            <PhEdit :phId="phId" @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)" />
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