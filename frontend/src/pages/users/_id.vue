<script setup>
  import { useRoute, useRouter } from 'vue-router';
</script>

<template>
  <div class='user'>
    hey
    {{ this.$route.params.id }}
  </div>
</template>

<style>

</style>