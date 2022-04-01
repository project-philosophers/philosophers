<script setup>
  import { ref, onMounted } from 'vue';
  const props = defineProps(['data']);
  const emit = defineEmits(['response']);
  import { useSelectedPhId } from '@/stores/selectedPh';
  import { storeToRefs } from 'pinia';
  const selectedPhId = useSelectedPhId();
  // const { selectedPhId } = storeToRefs(selectedPh);

  import * as d3 from 'd3';

//   import { usePhFiltered } from '@/stores/phFilter'
// const phFiltered = usePhFiltered();
// const phils = phFiltered.$state;
  
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

  // import { usePhilosophers } from '@/stores/philosophers';
  // const philosophers = usePhilosophers();
  // const phils = storeToRefs(philosophers);
  // console.log(phils);

  // console.log(phils.$state);

  const graph = (data) => {
    const padding = { top: 20, right: 30, bottom: 20, left: 30 }
    const paddingBetween = 5;
    const barHeight = 15


    // console.log(data.length);
    const width = window.innerWidth;
    const height = padding.top + ((paddingBetween + barHeight) * data.length) + padding.bottom;
    // const [width, height] = [window.innerWidth - 280, 500];
    // const [width, height] = [15000, window.innerHeight - 70];

    // const svg = d3.select('.inner')
    //   .attr("viewBox", [0, 0, width, height]);

    // const drawGraph = () => {
      let limits = {
        minX: 0,
        maxX: 2000
      };

      // const g = svg.append('g')
      //   .call(zoom)
      //   .on("wheel.zoom", wheeled);

      // const padding = { top: 20, right: 30, bottom: 20, left: 30 }


      const xScale = d3.scaleLinear()
        .domain([limits.minX, limits.maxX])
        .range([padding.left, width - padding.right]);

      const lineY = (d) => {
        let i = data.indexOf(d);
        const y = padding.top + (i * (barHeight + paddingBetween));
        return y;
      }

  



      // let chartHeight = height - padding.top - padding.bottom


      // const axis_top = d3.select('#graph-timeline')
      //   .append('svg')
      //   .attr('width', width)
      //   .attr('height', padding.top)
      //   // .style('position', 'fixed')
      //   .append('g')
      //     .attr('transform', 'translate(' + 0 + ',' + padding.top + ')');
      // axis_top.call(d3.axisTop(xScale))
        // .selectAll('text')
        // .style('text-anchor', 'end')
        // .style('position', 'fixed')

      // const axis_bottom = d3.select('#graph-timeline')
      //   .append('svg')
      //   .attr('width', width)
      //   .attr('height', padding.top)
      //   // .style('position', 'fixed')
      //   .append('g')
      //     .attr('transform', 'translate(' + 0 + ',' + (height - padding.bottom) + ')');
      // axis_bottom.call(d3.axisBottom(xScale))


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
        // .style('width', width)
        .attr("viewBox", [0, 0, width, height]);
      
      const svg_bottom = d3.select('#graph-timeline')
        .append('svg')
        .attr('width', width)
        .attr('height', padding.bottom)
        .style('position','sticky')
        .style('bottom', 0);




      // axis.call(d3.axisBottom(xScale))
        // .selectAll("text")
        // .style("text-anchor", "end")
        // .style("position", "fixed")
        // .attr("dx", 15)
        // .attr("dy", 5)
        // .attr("transform", "rotate(-65)");


      const xAxis_top = d3.axisTop(xScale)
        // .style('position', 'fixed')
        // .ticks(10)
      const gX_top = svg_top.append('g')
        .attr('transform', 'translate(' + 0 + ',' + padding.top + ')')
        // .style('position', 'fixed')
        .call(xAxis_top)
        // .selectAll('text')
        // .style('position', 'fixed')

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
          .attr("clip-path", "url(#clip-rect)")
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
        // .on("mouseover", d => eventMouseOver(d))
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
        .attr('font-size', 10);


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
        // .wheelDelta(delta)
        .on("zoom", zoomed);

      svg_top.call(zoom)
      svg_bottom.call(zoom)



      function delta(event) {
        console.log(event.deltaY);
        return -event.deltaY * (event.deltaMode ? 120 : 1) / 1500
      }

      // var currentTransform = d3.zoomIdentity;

      function zoomed(event) {
        // let dx = Math.abs(event.wheelDelta);
        // let dy = Math.abs(event.transform.y);
        // let dy = Math.abs(event.sourceEvent.wheelDeltaY);
        // console.log(event.wheelDelta);
        // console.log();
        // if (dy > 6) {
          gX_top.call(xAxis_top.scale(event.transform.rescaleX(xScale)));
          gX_bottom.call(xAxis_bottom.scale(event.transform.rescaleX(xScale)));
          let new_xScale = event.transform.rescaleX(xScale);

          d3.selectAll('.timeBar')
            .attr('x', d => new_xScale(d.born))
            .attr('width', d => new_xScale(d.died) - new_xScale(d.born))
        // }
        // if (dx > dy) {
        //   console.log("dx");
        // } else if (dx < dy) {
        // d3.select('svg').attr("transform", event.transform);

        // d3.select('.timeLines')
        //   .selectAll('rect')
        //   .data(data)
        //     .attr('x', d => new_xScale(d.born))
        //     .attr('width', d => new_xScale(d.died) - new_xScale(d.born))

        // d3.select('.textElems')
        //   .selectAll('text')
        //   .data(data)
        //     .attr('x', d => new_xScale(d.born))
        // }
      }

      function pan(event) {
        // let event = d3.event;
        let dx = Math.abs(event.deltaX);
        let dy = Math.abs(event.deltaY);

        // if (dx > dy) {
          // console.log("dx");
          // zoom.translateBy(timeLines, -event.deltaX);
            // tUpdate(d3.zoomTransform(canvas.node()));
          // zoom.translateBy(svg, -event.deltaX);
          // phRows.transition()
          //   .attr("transform", "translate(" + -event.wheelDeltaX + ", 0)")

        // } else if (dx < dy) {

        // if (dy > 12) {
          console.log(dy);
          // zoom.translateBy(yScale, 0, -event.deltaY);
          // zoom.translateBy(phRows, 0, -event.deltaY);
          // currentTransform.x += event.wheelDeltaX;
          // currentTransform.y += event.wheelDeltaY;
          // timeBar.translate(currentTransform.x, currentTransform.y);

          current_translate = event.transform(svg.attr("transform")).translate;
            ddx = event.wheelDeltaX + current_translate[0];
            ddy = event.wheelDeltaY + current_translate[1];
            
          timeBar.attr("transform", "translate(" + [ddx,ddy] + ")");

          // timeBar.translate(0, -dy)
            // .attr('y', d => lineY(d) + dy);
            // .attr('fill', 'green')
          //   .duration(100)
            // .attr("transform", "translate(0," + -event.deltaY+ ")")
          // phRows.attr('y', y => y + dy);

            // let new_scale = 1; // How do you make a new scale here?
            // zoom.scaleBy(canvas, new_scale);
            // tUpdate(d3.zoomTransform(canvas.node()));
        // }
        event.preventDefault();
      }
      

      const eventMouseOver = (d0) => {
        d3.select(this).attr('style', 'fill: red');
        const d = d0.target.__data__;
        focus(d);
        // const phils = eval(context.phils);
        // const ph_found = phils.find(ph => ph.name == d.name);
        // context.Over.setOveredPh(ph_found);
      };
      const eventMouseOut = (d_all) => {
        // const d = d_all.toElement.__data__;
        // node.style("opacity", 0.2);
        // link.style('stroke-opacity', 0.2);
        // textElems.style('visibility', 'hidden');
        // context.Over.setOveredPh(null);
      };
      const eventClick = (d_all) => {
        const d = d_all.target.__data__;
        selectedPhId.update(d.id);
        // console.log(selectedPhId.$state);
        // funcFocus(d);
        // d3.select(this)
        //   .attr("id", "select");
        // // const phils = eval(context.phils);
        // const ph_found = phils.find(ph => ph.name == d.name);
        // context.Click.setClickedPh(ph_found);
      };

      const focus = (d) => {
        // console.log(d);
        timeLines.style('opacity', 0.5);
      }

    // }

    // drawGraph();
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

  #graph-timeline {
    position: relative;
    /* border: solid 1px red; */
    /* width: 600px; */
    height: 150px;
    overflow: scroll;
  }

  /* .chart { */
    /* width: 500px; */
    /* overflow-y: hidden; */
  /* } */

  .textElems {
    font-family: "Courier";
    font-size: 10;
    /* overflow-y: scroll; */
  }

</style>