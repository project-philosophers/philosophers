<script setup>
  import { watch } from 'vue';

  const props = defineProps(['userName']);
  const userName = props.userName;

  // import { useUserInfo } from '@/stores/userInfo';
  // import { storeToRefs } from 'pinia';
  // const storeUserInfo = useUserInfo();
  // const { userInfo } = storeToRefs(storeUserInfo);

  // let userName = userInfo.name || 'Login';
  // watch(userInfo, () => {
  //   const userName = userInfo.name || 'Login';
  // });
</script>

<template>
  <div class='nav w-full h-12 flex justify-around items-center shadow-md'>
    <a href="/"><h1 class="absolute top-0 left-0 text-3xl">Philosophers</h1></a>
    <div class="left-20 w-50 h-10 overflow-y-scroll z-5">
      <ul>
        <li>Home</li>
        <li>Philosophers</li>
        <li>Literature</li>
        <li>Keywords</li>
      </ul>
    </div>
    <div class="links">
      <template v-if="!!userName">
        <a href="/users/_id" class="nav-item">{{ userName }}</a>        
      </template>
      <template v-else>
        <a href="/users/login" class="nav-item">Login</a>
      </template>
    </div>
  </div>
</template>

<style>
  /* .nav {
    width: 100vw;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  } */
  .links {
    display: flex;
  }
  .nav-item {
    margin-left: 15px;
  }
</style>