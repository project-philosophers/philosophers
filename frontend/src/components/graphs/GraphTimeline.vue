<script setup>
  import { ref, onMounted } from 'vue';
  const props = defineProps(['data']);
  
  import { useSelectedPhId } from '@/stores/selectedPh';
  const selectedPhId = useSelectedPhId();

  import * as d3 from 'd3';

  
  const preprocess = (data) => {
    return data.map(d => {
      return {
        id: d.id,
        name: d.name,
        born: d.born,
        died: d.died
      }
    }).sort((d1, d2) => {
      if (d1.born > d2.born) return 1;
      else if (d1.born < d2.born) return -1;
      else {
        if (d1.died > d2.died) return 1;
        else if (d1.died < d2.died) return -1;
      }
    });
  }

  const graph = (data) => {
    const padding = { top: 20, right: 30, bottom: 20, left: 30 }
    const paddingBetween = 5;
    const barHeight = 15

    // TODO: width
    const width = window.innerWidth;
    // const width = 10000;
    const height = padding.top + ((paddingBetween + barHeight) * data.length) + padding.bottom;
    // const [width, height] = [window.innerWidth - 280, 500];
    // const [width, height] = [15000, window.innerHeight - 70];


    let limits = {
      minX: -1000,
      maxX: 2000
    };


    const xScale = d3.scaleLinear()
      .domain([limits.minX, limits.maxX])
      .range([padding.left, width - padding.right]);

    const lineY = (d) => {
      let i = data.indexOf(d);
      const y = padding.top + (i * (barHeight + paddingBetween));
      return y;
    }


    const svg_top = d3.select('#graph-timeline')
      .append('svg')
      .attr('width', width)
      .attr('height', padding.top)
      .style('position','sticky')
      .style('top', 0)
      // .attr('fill', 'white')

    const svg = d3.select('#graph-timeline')
      .append('div')
      .attr('class', 'chart')
      // .style('width', width)
      .append('svg')
      .attr('width', width)
      .attr("viewBox", [0, 0, width, height]);
    
    const svg_bottom = d3.select('#graph-timeline')
      .append('svg')
      .attr('class', 'axis-bottom')
      .attr('width', width)
      .attr('height', padding.bottom)
      .style('position','sticky')
      .style('bottom', 0);


    const xAxis_top = d3.axisTop(xScale)
      // .style('position', 'fixed')
      // .ticks(10)
    const gX_top = svg_top.append('g')
      .attr('transform', 'translate(' + 0 + ',' + padding.top + ')')
      .call(xAxis_top)

    const xAxis_bottom = d3.axisBottom(xScale)
      // .ticks(10)
    const gX_bottom = svg_bottom.append('g')
      // .attr('transform', 'translate(' + 0 + ',' + (height - padding.bottom) + ')')
      .call(xAxis_bottom)


    const phRows = svg.append('g')
      .selectAll('.rows')
      .data(data)
      .join('g')
        .attr('class', 'rows')
        // .attr("clip-path", "url(#clip-rect)")
        // .attr('x', 0)
        // .attr('y', 100)
        // .call(d => console.log(d.data))

    const timeBar = phRows.append('rect')
      .attr('class', 'timeBar')
      .attr('x', d => xScale(d.born))
      // .attr('y', chartCenterY - barHeight / 2)
      .attr('y', d => lineY(d))
      .attr('width', d => xScale(d.died) - xScale(d.born))
      .attr('height', barHeight)
      .attr("fill", "black")
      .attr("opacity", 0.2)
      .on('mouseover', function(d) {d3.select(this).attr('opacity', 0.5)})
      .on("mouseout", function(d) {d3.select(this).attr('opacity', 0.2)})
      .on("click", d => eventClick(d));

    const textElem = phRows.append('text')
      .attr('class', 'textElem')
      .text(d => d.name)
      .attr('x', padding.left)
      .attr('y', d => lineY(d))
      // .attr('y', chartCenterY)
      .attr('dy', '0.7rem')
      .attr('font-size', 10)
      .attr('position', 'sticky');


    // const axisArea = svg.append('g')
    //   // .attr('color', 'white');
    // // .call(zoom)

    // const area_top = axisArea.append('rect')
    //   .attr('x', 0)
    //   .attr('y', 0)
    //   .attr('width', width)
    //   .attr('height', padding.top)
    //   .attr('fill', 'white')
    //   .attr('fill-opacity', 0);

    // const area_bottom = axisArea.append('rect')
    //   .attr('x', 0)
    //   .attr('y', height - padding.bottom)
    //   .attr('width', width)
    //   .attr('height', padding.bottom)
    //   // .attr('color', 'white')
    //   .attr('fill-opacity', 0);


    const zoom = d3.zoom()
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

    svg_top.call(zoom)
    svg_bottom.call(zoom)
    


    function zoomed(event) {
        // gX_top.on(rescaling);
        // gX_bottom.on(rescaling);
        gX_top.call(xAxis_top.scale(event.transform.rescaleX(xScale)))
          // .call(xAxis_bottom.scale(event.transform.rescaleX(xScale)));
        gX_bottom.call(xAxis_bottom.scale(event.transform.rescaleX(xScale)))
          // .call(xAxis_top.scale(event.transform.rescaleX(xScale)));
        let new_xScale = event.transform.rescaleX(xScale);

        d3.selectAll('.timeBar')
          .attr('x', d => new_xScale(d.born))
          .attr('width', d => new_xScale(d.died) - new_xScale(d.born))
    }

    function rescaling(event) {
      xAxis_top.scale(event.transform.rescaleX(xScale));
      xAxis_bottom.scale(event.transform.rescaleX(xScale));
    } 
    
    const eventClick = (d_all) => {
      const d = d_all.target.__data__;
      selectedPhId.update(d.id);
    };

  }

  onMounted(() => {
    graph(preprocess(props.data));
    // graph(phils);
    // console.log('hey');
  })
</script>

<template>
  <div class="container">
    <div id="graph-timeline"></div>
  </div>
</template>

<style scoped>
  .container {
    position: relative;
    /* width: calc(70vw - 20px); */
    width: 1000px;
    /* height: 500px; */
    /* background-color: aqua; */
  }

  #graph-timeline {
    /* position: absolute; */
    /* border: solid 1px red; */
    /* width: 600px; */
    height: 150px;
    /* height: 100%; */
    overflow-y: scroll;
  }

  .textElems {
    font-family: "Courier";
    font-size: 10;
    /* overflow-y: scroll; */
  }

  /* .axis-bottom {
    position: absolute;
    color: brown;
    bottom: 0;
  } */

</style>