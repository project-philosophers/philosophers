<script setup>
  import { ref, watch } from 'vue';
  import { useState } from '../lib/state';

  // const userinfo = ref();

  import { useUserInfo } from '@/stores/userInfo';
  const storeUserInfo = useUserInfo();
  const [userinfo, setUserinfo] = useState(storeUserInfo.info);
  watch(storeUserInfo, () => {
    setUserinfo(storeUserInfo.info);
    // userinfo.value = storeUserInfo.info;
    console.log(storeUserInfo.info);
  })


  const [isOpenData, setIsOpenData] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);

  import axios from 'axios';
  import client from '../../config/axios';
  const logout = () => {
    client.get('/api/users/logout');
    console.log('logged out');
  }
</script>

<template>
  <!-- <div class='nav w-full h-12 flex justify-around items-center shadow-md'> -->
  <div class='nav flex items-center'>
    <div class="ml-10 text-3xl">
      <a href="/">Falāsifa</a>
    </div>
    <div class="links ml-20 flex-row pl-10">
      <div><a href="/home">Home</a></div>
      <div class="pl-10 cursor-default" @click="setIsOpenData(!isOpenData)">data</div>
      <template v-if="isOpenData">
        <div class="dropdown fixed top-11 p-2 w-50 bg-white border-1 border-black rounded-md shadow-xl z-999">
          <ul class="divide-y-1 divide-black">
            <!-- <li>Home</li> -->
            <li><a href="/philosophers">Philosophers</a></li>
            <li><a href="/literature">Literature</a></li>
            <li>Keywords</li>
          </ul>
        </div>
      </template>
    </div>
    <div class="absolute right-10">
      <!-- <template v-if="isDefinedUserinfo"> -->
      <template v-if="!!userinfo.id">
        <!-- <a href="/users/:id" class="nav-item">{{ userinfo.name }}</a>         -->
        <div class="cursor-default" @click="setIsOpenUser(!isOpenUser)">{{ userinfo.name }}</div>
        <template v-if="isOpenUser">
          <div class="dropdown fixed top-11 right-10 p-2 w-50 bg-white border-1 border-black rounded-md shadow-xl z-999">
            <ul class="divide-y-1 divide-black">
              <li><a href="/philosophers">My Page</a></li>
              <li class="cursor-default" @click="logout()">log out</li>
            </ul>
          </div>
        </template>
      </template>
      <template v-else>
        <a href="/users/login" class="nav-item">Login</a>
      </template>
    </div>
  </div>
</template>

<style>
  .nav {
    /* display: flex;
    flex-direction: row; */
    border-bottom: 2px solid black;
    box-sizing: border-box
  }
  .links {
    display: flex;
  }
  .nav-item {
    margin-left: 15px;
  }
</style>