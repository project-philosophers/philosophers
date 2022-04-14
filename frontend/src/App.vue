<script setup>
  import { ref, onBeforeMount } from 'vue';
  import axios from 'axios';

  import { useUserInfo } from '@/stores/userInfo';
  const storeUserInfo = useUserInfo();
  // const userinfo = ref();
  onBeforeMount(async () => {
    const userinfo = await axios.get('/api/users/info')
      .then(res => res.data.data)
      .catch(err => console.error(err.stack));
    // userinfo.value = userinfo0;
    storeUserInfo.info = userinfo;
  })

  import Nav from './components/Navigation.vue';

</script>

<template>
  <header>
    <div class="wrapper">
      <Nav />
      <!-- <Nav /> -->
    </div>
  </header>
  <router-view></router-view>
</template>

<style>
  * {
    overflow: hidden;
    font-family: 'Courier';
  }
</style>
