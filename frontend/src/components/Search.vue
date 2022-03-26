<script setup>
import { onMounted } from 'vue';
import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { useSearchCondition } from '@/stores/conditions'
// import  from 'https://unpkg.com/d3-simple-slider@1.10.4/dist/d3-simple-slider.min.js'
const emit = defineEmits(['triggerPeriodSearch'])

// <<<<<<< HEAD

// import { useConditions } from '@/stores/conditions';
// const conditions = useConditions();

// // const conditions = {
// //   name: null,
// //   period: {
// //     from: 0,
// //     to: 2000
// //   },
// //   tags: {
// //     categories: [],
// //     education: [],
// //     keywords: [],
// //     languages: [],
// //     nationalities: []
// //   }
// // }

// const changeText = (e) => {
//   conditions.$state.name = e.target.value;
//   console.log(conditions.$state);
// =======
const searchCondition = useSearchCondition();
const conditions = searchCondition.$state;
// console.log(conditions)

const triggerPeriodSearch = (val) => {
  emit('triggerPeriodSearch', val);
// >>>>>>> 6cddffa3b9b15ff57f22de86476402b51d26ac1d
}

const drawSlider = () => {
  const data = [-1000, 2000];

  // Range
  const sliderRange = sliderBottom()
    .min(d3.min(data))
    .max(d3.max(data))
    .width(500)
    .tickFormat(d3.format('100'))
    .ticks(5)
    .default([800, 1100])
    .fill('#2196f3')
    .handle(
      d3.symbol()
        .type(d3.symbolCircle)
        .size(200)()
    )
    .on('onchange', val => {
      // d3.select('p#value-range')
// <<<<<<< HEAD
    //     .text(val.map(d3.format('1'))
    //     .join(' - '));
    // })
    // .on('end', val => {
    //   conditions.$state.period.from = val[0];
    //   conditions.$state.period.to = val[1];
    //   console.log(conditions.$state);
// =======
        // .text(val.map(d3.format('100'))
        // .join(' -'));
    })
    .on("end", val => {
      conditions.period = val
      triggerPeriodSearch(val);
// >>>>>>> 6cddffa3b9b15ff57f22de86476402b51d26ac1d
    });

  const gRange = d3
    .select('div#slider-range')
    .append('svg')
    .attr('width', 100)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gRange.call(sliderRange);

  // d3.select('p#value-range').text(
  //   sliderRange
  //     .value()
  //     .map(d3.format('100'))
  //     .join(' -')
  // );
}

onMounted(() => {
  drawSlider();
})

</script>

<template>
  <div class='search-container'>
    <div>Search</div>
    <div>
      <input
        id="name-search"
        placeholder="Name"
        @input="(e) => changeText(e)"
      />
    </div>
    <div class="row align-items-center">
      <div class="col-sm-2"><p id="value-range"></p></div>
      <div class="col-sm"><div id="slider-range"></div></div>
    </div>
  </div>
</template>

<style>
.search-container {
  display: flex;
  flex-direction: column;
  padding-left: 100px;
}
.search-container svg {
  width: 700px;
  height: 100px;
}
#slider-range {
  width: 500px;
}
.search-container #name-search {
  padding-left: 20px;
  width: 500px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
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