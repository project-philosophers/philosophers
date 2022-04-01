<script setup>
  import { useSearchCondition } from '@/stores/conditions'
  import { computed } from 'vue';

  const searchCondition = useSearchCondition();
  const conditions = searchCondition.$state;
  // console.log('conditions', conditions)
  import Search from './Search.vue';
  //search
  import { search }  from '../lib/search'
  import { usePhFiltered } from '@/stores/phFilter'
  // import { storeToRefs } from 'pinia';
  const phFiltered = usePhFiltered();
  // const { phFilteredData } = storeToRefs(phFiltered);
  const phils = phFiltered.$state;
  // console.log('phils', phils);

  const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
  })
  const triggerPeriodSearch = async val => {
    conditions.period = {
      from: val[0],
      to: val[1],
    }
    const filtered = await phFiltered.search(conditions)
    phFiltered.$state = phils;
    // console.log('phFiltered.$state', phFiltered.$state)
  }
</script>

<template>
  <div class="z-5">
    <Search @triggerPeriodSearch="val => triggerPeriodSearch(val)"/>
  </div>
</template>

<style scoped>

</style>