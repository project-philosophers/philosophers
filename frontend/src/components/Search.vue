<script setup>
import { ref } from 'vue';
import * as d3 from 'd3';

// const condition = ref();

const conditions = {
  name: null,
  period: {
    from: 0,
    to: 2000
  },
  tags: {
    categories: [],
    education: [],
    keywords: [],
    languages: [],
    nationalities: []
  }
}


const drawSlider = () => {
  const svg = d3.select('svg');
  // svg.append()
  const slider = d3.slider();
}

</script>

<template>
  <div class='search'>
    <div>Search</div>
    <!-- {{ this.result }} -->
    <svg></svg>
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
  }
  .links {
    display: flex;
  }
  .nav-item {
    margin-left: 15px;
  } */
</style>