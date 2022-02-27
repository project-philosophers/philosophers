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
    font-family: 'Courier';
  }
</style>
