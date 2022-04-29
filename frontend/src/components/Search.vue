<script setup>
import { onMounted } from 'vue';
import * as d3 from 'd3';
import { sliderBottom } from 'd3-simple-slider';
// import { usePhFiltered } from '@/stores/filteredPhils';
import { useSearchConditions } from '@/stores/search';
// const emit = defineEmits(['triggerPeriodSearch'])

// const phFiltered = usePhFiltered();
// const conditions = searchConditions.$state;

const searchConditions = useSearchConditions();
let conditions = searchConditions.conditions;

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
    // .tickFormat(d3.format('100'))
    .ticks(5)
    // default period
    .default([-1000, 2000])
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
  <div class='search-container left-1/12 w-7/12 pt-5 pl-10 border-2 rounded-1xl z-2 flex flex-col'>
    <!-- <div>Search</div> -->
    <div class="h-10">
      <input
        id="name-search"
        class="m-2 h-5 text-sm"
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
  /* box-sizing: border-box; */
}
.search-container svg {
  width: 100%;
  height: 100px;
}
.search-container #name-search {
  padding-left: 20px;
  width: 500px;
  height: 30px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>