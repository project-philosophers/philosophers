<script setup>
  import { useCounterStore } from '@/stores/counter'
  const counter = useCounterStore()
</script>

<template>
  <h1>
    Show Counter: {{ counter.counter }}
  </h1>
</template>