<script>
// Composition
import { useRoute } from '@nuxtjs/composition-api'

// Components
import PhilosopherConfirm from '../../../components/PhilosopherConfirm.vue';
import PhilosopherEdit from '../../../components/PhilosopherEdit.vue';
import PhilosopherShow from '../../../components/PhilosopherShow.vue';

// utils
import { getPh, parsePh } from '../../../utils/philosopher.ts';

export default {
  components: { PhilosopherShow, PhilosopherConfirm, PhilosopherEdit },
  name: 'philosopher',
  setup() {
      const route = useRoute()
      const phId = route.value.params.id;
      const mode = route.value.params.mode;

    return {
      phId,
      mode,
      data: parsePh(getPh(phId)),
    }
  },
}
</script>

<template>
  <div class='login'>
    <Nav />
    <template v-if="mode === 'show'">
      <PhilosopherShow :phInfo="data" :phId="phId"/>
    </template>
    <template v-if="mode === 'edit'">
      <PhilosopherEdit :data="data" :phId="phId"/>
    </template>
    <template v-if="mode === 'confirm'">
      <philosopher-Confirm :data="data" :phId="phId"/>
    </template>
  </div>
</template>

<style>

</style>