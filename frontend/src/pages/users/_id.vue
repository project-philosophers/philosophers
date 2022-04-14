<script setup>
  import { ref, watch, onBeforeMount } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const router = useRouter();

  import axios from 'axios';

  const userName = ref();

  onBeforeMount(async () => {
    const userinfo = await axios.get('/api/users/info')
      .then(res => res.data.data)
      .catch(err => console.error(err.stack));

    if (!userinfo.id) {
      router.push('/users/login');
    }

    console.log(userinfo.name);
    userName.value = userinfo.name;
  })

</script>

<template>
  <div class='user'>
    hey
    {{ userName }}
  </div>
</template>

<style>

</style>