<script setup>
  import axios from 'axios';
  const userinfo = {
    id: '123456789',
    name: 'unchi'
  }

  import Nav from './components/Navigation.vue';

</script>

<template>
  <header>
    <div class="wrapper">
      <Nav :userName="userinfo.name" />
    </div>
  </header>
  <!-- <ul>
    <li><a href="/philosophers">Philosophers</a></li>
    <li><a href="/literature">Literature</a></li>
  </ul> -->
  <router-view></router-view>
</template>

<style>
  * {
    overflow: hidden;
    font-family: 'Courier';
  }
</style>
