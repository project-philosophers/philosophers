<script setup>
const emit = defineEmits(['changeGraphType'])

const changeGraphType = (type) => {
  console.log(type)
  emit('changeGraphType', type)
}

</script>

<template>
  <div class="h-screen w-min flex items-center">
    <ul>
      <li><button @click="changeGraphType('timeline')">Timeline</button></li>
      <li><button @click="changeGraphType('table')">Table</button></li>
      <li><button @click="changeGraphType('network')">Network</button></li>
    </ul>
  </div>
</template>

<style>

</style>