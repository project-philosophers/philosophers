<script setup>
import { onMounted } from 'vue';
import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { useSearchCondition } from '@/stores/conditions'
// import  from 'https://unpkg.com/d3-simple-slider@1.10.4/dist/d3-simple-slider.min.js'
const emit = defineEmits(['triggerPeriodSearch'])

const searchCondition = useSearchCondition();
const conditions = searchCondition.$state;
// console.log(conditions)

const triggerPeriodSearch = (val) => {
  emit('triggerPeriodSearch', val);
}

const drawSlider = () => {
  const data = [-1000, 2000];

  // Range
  var sliderRange = sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(500)
    .tickFormat(d3.format('100'))
    .ticks(5)
    .default([1500, 1800])
    .fill('#2196f3')
    .handle(
      d3
        .symbol()
        .type(d3.symbolCircle)
        .size(200)()
    )
    .on('onchange', val => {
      d3.select('p#value-range')
        .text(val.map(d3.format('100'))
        .join(' -'));
    })
    .on("end", val => {
      conditions.period = val
      triggerPeriodSearch(val);
    });

  var gRange = d3
    .select('div#slider-range')
    .append('svg')
    .attr('width', 100)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gRange.call(sliderRange);

  d3.select('p#value-range').text(
    sliderRange
      .value()
      .map(d3.format('100'))
      .join(' -')
  );
}

onMounted(() => {
  drawSlider();
})
</script>


<template>
  <div class='search'>
    <div>Search</div>
    <div>Name<input v-model="conditions.name"/></div>
    <div class="row align-items-center">
      <div class="col-sm-2"><p id="value-range"></p></div>
      <div class="col-sm"><div id="slider-range"></div></div>
    </div>
    <!-- {{ this.result }} -->
    <!-- <svg></svg> -->
  </div>
</template>

<style>
.search svg {
  width: 700px;
  height: 100px;
}
#slider-range {
  width: 500px;
}
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