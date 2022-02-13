<script>
// Composition
import { useRoute } from '@nuxtjs/composition-api'

// Components
import PhilosopherConfirm from '../../../components/PhilosopherConfirm.vue';
import PhilosopherEdit from '../../../components/PhilosopherEdit.vue';
import PhilosopherShow from '../../../components/PhilosopherShow.vue';

// utils
import { getPhilosophers } from '../../../utils/philosopher.ts';

export default {
  components: { PhilosopherShow, PhilosopherConfirm, PhilosopherEdit },
  name: 'philosopher',
  setup() {
      const route = useRoute()
      const philoId = route.value.params.id;
      const mode = route.value.params.mode;

    return {
      philoId,
      mode,
      data: getPhilosophers(philoId),
    }
  },
}
</script>

<template>
  <div class='login'>
    <Nav />
    <template v-if="mode === 'show'">
      <PhilosopherShow :philoInfo="data" :philoId="philoId"/>
    </template>
    <template v-if="mode === 'edit'">
      <PhilosopherEdit :data="data" :philoId="philoId"/>
    </template>
    <template v-if="mode === 'confirm'">
      <philosopher-Confirm :data="data" :philoId="philoId"/>
    </template>
  </div>
</template>

<style>

</style>