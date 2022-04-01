<script setup>
import { onMounted } from 'vue';
import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
import { usePhFiltered } from '@/stores/filteredPhils';
import { useSearchConditions } from '@/stores/conditions';
// const emit = defineEmits(['triggerPeriodSearch'])

const phFiltered = usePhFiltered();
// const conditions = searchConditions.$state;

const searchConditions = useSearchConditions();
let conditions = searchConditions.$state;

const triggerPeriodSearch = async (val) => {
  // emit('triggerPeriodSearch', val);
  conditions.period = {
    from: val[0],
    to: val[1],
  };
  // console.log(conditions);
  // const filtered = await phFiltered.search(conditions);
  searchConditions.updateConditions(conditions);
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
    .on("end", val => {
      conditions.period = val;
      triggerPeriodSearch(val);
    });

  const gRange = d3
    .select('div#slider-range')
    .append('svg')
    .attr('width', 100)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

  gRange.call(sliderRange);
}

onMounted(() => {
  drawSlider();
})

</script>

<template>
  <div class='search-container z-10'>
    <div>Search</div>
    <div>
      <input
        id="name-search"
        placeholder="Name"
        @input="(e) => changeText(e)"
      />
    </div>
    <div class="row align-items-center">
      <!-- <div class="col-sm-2"><p id="value-range"></p></div> -->
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
  /* width: 500px; */
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