<script setup>
  import PhView from '../components/PhView.vue';
  import PhEdit from '../components/PhEdit.vue';
  import Graph from '../components/Graph.vue';
  import SearchPanel from '../components/SearchPanel.vue';
  import { ref } from 'vue';
  import PhConfirm from '../components/PhConfirm.vue';
  // utils
  const phId = ref(97056520);
  const mode = ref('view')

  const toNext = (nextMode) => {
    mode.value = nextMode
  }
  const goBack = (lastMode) => {
    mode.value = lastMode
  }
</script>

<template>
  <div class="main flex">
    <Graph class="graph w-8/12" />
    <SearchPanel class="fixed bottom-px"/>
    <div class="w-4/12">
      <template v-if="phId">
        <template v-if="mode === 'view'">
          <PhView :phId="phId" @toNextMode="nextMode => toNext(nextMode)" />
        </template>
        <template v-else-if="mode === 'edit'">
          <PhEdit @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)" />
        </template>
        <template v-if="mode === 'confirm'">
          <PhConfirm @toNextMode="nextMode => toNext(nextMode)" @toLastMode="lastMode => goBack(lastMode)" />
        </template>
      </template>
    </div>
  </div>
</template>

<style>

</style>