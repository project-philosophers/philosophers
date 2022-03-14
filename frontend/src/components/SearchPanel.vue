<script setup>
  import { useSearchCondition } from '@/stores/conditions'
  import { computed } from 'vue';

  const searchCondition = useSearchCondition();
  const conditions = searchCondition.$state;
  console.log('conditions', conditions)
  import Search from './Search.vue';
  //search
  import { search }  from '../lib/search'
  import { usePhFiltered } from '@/stores/phFilter'
  const phFiltered = usePhFiltered();
  const phils = phFiltered.$state;
  // console.log('phils',phils)
  const publishedBooksMessage = computed(() => {
    return author.books.length > 0 ? 'Yes' : 'No'
  })
  const  triggerPeriodSearch = async period => {
    conditions.period = {
      from: period[0],
      to: period[1],
      }
    const filtered = await phFiltered.search(conditions)
    phFiltered.$state = phils;
    console.log('phFiltered.$state', phFiltered.$state)
  }
</script>

<template>
  <div>
    <Search @triggerPeriodSearch="val => triggerPeriodSearch(val)"/>
  </div>
</template>

<style scoped>

</style>