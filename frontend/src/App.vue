<script setup>
import Nav from './components/Nav.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <Nav />
    </div>
  </header>
  <router-view></router-view>
</template>

<style>
  * {
    /* overflow: hidden; */
    font-family: 'Courier';
  }
</style>
