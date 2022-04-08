<script setup>
  import Nav from '../components/Navigation.vue'

</script>

<template>
  <header>
    <div class="wrapper">
      <Nav />
    </div>
  </header>
  <ul>
    <li><a href="/philosophers">Philosophers</a></li>
    <li><a href="/literature">Literature</a></li>
  </ul>
    <router-view></router-view>

</template>

<style>
  * {
    overflow: hidden;
    font-family: 'Courier';
  }
</style>
