<script setup>
  import { ref, onBeforeMount } from 'vue';
  // import axios from 'axios';
  import client from '../config/axios';

  import { useUserInfo } from '@/stores/userInfo';
  const storeUserInfo = useUserInfo();
  // const userinfo = ref();
  onBeforeMount(async () => {
    const userinfo = await client.get('/api/users/info')
      .then(res => res.data.data)
      .catch(err => console.error(err.stack));
    // userinfo.value = userinfo0;
    // storeUserInfo.info = userinfo;
    storeUserInfo.addUserInfo(userinfo)
    console.log('App', userinfo);
  })

  import Nav from './components/Navigation.vue';

</script>

<template>
  <!-- <header> -->
  <div class="wrapper flex flex-col">
    <Nav class="top-0 w-screen h-10" />
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
  <!-- </header> -->
</template>

<style>
  * {
    /* width: 100vw; */
    /* height: 100vh; */
    overflow: hidden;
    font-family: 'Courier';
  }
  .wrapper {
    width: 100vw;
    height: 100vh;
  }
</style>
