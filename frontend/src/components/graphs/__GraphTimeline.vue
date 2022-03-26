<script setup>
  import { ref, onMounted } from 'vue';
  const props = defineProps(['data']);
  const emit = defineEmits(['response']);
  const clickedPhId = ref();

  import * as d3 from 'd3';
  // import * as d3 from "https://d3js.org/d3.v4.min.js"
  
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
    // const padding = { top: 20, right: 30, bottom: 20, left: 30 }
    // const paddingBetween = 5;
    // const barHeight = 15


    // console.log(data.length);
    // const width = window.innerWidth;
    // const height = padding.top + ((paddingBetween + barHeight) * data.length) + padding.bottom;
    // // const [width, height] = [window.innerWidth - 280, 500];
    // // const [width, height] = [15000, window.innerHeight - 70];

    // const svg = d3.select('.outer')
    //   .attr("viewBox", [0, 0, width, height]);

    // // const svg = d3.select('.inner')
    // //   .attr("viewBox", [0, 0, width, height]);

    // const drawGraph = () => {
    //   let limits = {
    //     minX: 0,
    //     maxX: 2000
    //   };

    //   // const g = svg.append('g')
    //   //   .call(zoom)
    //   //   .on("wheel.zoom", wheeled);

    //   // const padding = { top: 20, right: 30, bottom: 20, left: 30 }


    //   const xScale = d3.scaleLinear()
    //     .domain([limits.minX, limits.maxX])
    //     .range([padding.left, width - padding.right]);

    //   const lineY = (d) => {
    //     let i = data.indexOf(d);
    //     const y = padding.top + (i * (barHeight + paddingBetween));
    //     return y;
    //   }

    //   const phRows = svg.append('g')
    //     .selectAll('.rows')
    //     .data(data)
    //     .join('g')
    //       .attr('class', 'rows')
    //       .attr("clip-path", "url(#clip-rect)")
    //       // .attr('x', 0)
    //       // .attr('y', 100)
    //       // .call(d => console.log(d.data))

    //   const timeBar = phRows.append('rect')
    //     .attr('class', 'timeBar')
    //     .attr('x', d => xScale(d.born))
    //     // .attr('y', chartCenterY - barHeight / 2)
    //     .attr('y', d => lineY(d))
    //     .attr('width', d => xScale(d.died) - xScale(d.born))
    //     .attr('height', barHeight)
    //     .attr("fill", "black")
    //     .attr("opacity", 0.2)
    //     // .on("mouseover", d => eventMouseOver(d))
    //     .on('mouseover', function(d) {d3.select(this).attr('opacity', 0.5)})
    //     .on("mouseout", function(d) {d3.select(this).attr('opacity', 0.2)})
    //     .on("click", d => eventClick(d));

    //   const textElem = phRows.append('text')
    //     .attr('class', 'textElem')
    //     .text(d => d.name)
    //     .attr('x', padding.left)
    //     .attr('y', d => lineY(d))
    //     // .attr('y', chartCenterY)
    //     .attr('dy', '0.7rem')
    //     .attr('font-size', 10);



    //   // let chartHeight = height - padding.top - padding.bottom

    //   // const svg2 = d3.select('.inner');

    //   const xAxis_top = d3.axisTop(xScale)
    //     // .ticks(10)
    //   const gX_top = svg.append('g')
    //     .attr('transform', 'translate(' + 0 + ',' + padding.top + ')')
    //     .style('position', 'fixed')
    //     .call(xAxis_top)

    //   const xAxis_bottom = d3.axisBottom(xScale)
    //     // .ticks(10)
    //   const gX_bottom = svg.append('g')
    //     .attr('transform', 'translate(' + 0 + ',' + (height - padding.bottom) + ')')
    //     .call(xAxis_bottom)
      
    //   // const yScale = d3.scaleLinear();
    //   // const yAxis = d3.axisLeft(yScale);
    //   // const gY = svg2.append('g')
    //   //   .call(yAxis);


//     var width = 500,
//   height = 600,
//   margintop = 50,
//   marginbottom = 50,
//   marginright = 10,
//   marginleft = 50
// d3.csv("https://raw.githubusercontent.com/Lea1216/d3/main/heatmap.csv")
//   .then(data => {
//       console.log(data);

//   // Add the axis *before* adding the SVG, because the order matters in HTML
//   var axis = d3.select("#my_dataviz")
//     .append("svg")
//     .attr("width", width + marginleft + marginright)
//     // Add 2 so you have a little bit of room left for the black bar
//     // i.e. margin top has to be less than total height!
//     .attr("height", margintop + 2)
//     .style("position", "fixed") // this makes the axis fixed
//     .append("g")
//     .attr("transform", "translate(" + marginleft + ", " + margintop + ")");

//   var svg = d3.select("#my_dataviz")
//     .append("svg")
//     .attr("width", width + marginleft + marginright)
//     .attr("height", height + margintop + marginbottom)
//     .append("g")
//     .attr("transform", "translate(" + marginleft + ", " + margintop + ")");

//   var x_axis = d3.scaleBand()
//     .range([0, width])
//     .domain(data.map(function(d) {
//       return d.group;
//     }))
//     .padding(0.01);

//   axis.call(d3.axisTop(x_axis))
//     .selectAll("text")
//     .style("text-anchor", "end")
//     .style("position", "fixed")
//     .attr("dx", 15)
//     .attr("dy", 5)
//     .attr("transform", "rotate(-65)");

//   var y_axis = d3.scaleBand()
//     .range([height, 0])
//     .domain(data.map(function(d) {
//       return d.activity;
//     }))
//     .padding(0.01);

//   svg.append("g")
//     .call(d3.axisLeft(y_axis))
//     .attr("class", "y_axis")
//     .selectAll("text")
//     .on("click", function(d) {
//       window.open(d.url, "_blank")
//     });

//   var myColor = d3.scaleLinear()
//     .range(["white", "#C37B89"])
//     .domain([1, 100])

//   svg.selectAll()
//     .data(data, function(d) {
//       return d.group + ':' + d.activity;
//     })
//     .enter()
//     .append("rect")
//     .attr("x", function(d) {
//       return x_axis(d.group)
//     })
//     .attr("y", function(d) {
//       return y_axis(d.activity)
//     })
//     .attr("width", x_axis.bandwidth())
//     .attr("height", y_axis.bandwidth())
//     .style("fill", function(d) {
//       return myColor(d.value)
//     })
//     .style("stroke-width", 1)
//     .style("stroke", "none")

// })



    var width = 500,
      height = 600,
      margintop = 50,
      marginbottom = 50,
      marginright = 10,
      marginleft = 50

    d3.csv("https://raw.githubusercontent.com/Lea1216/d3/main/heatmap.csv")
      .then(data => {
      console.log(data);

      // Add the axis *before* adding the SVG, because the order matters in HTML
      var axis = d3.select("#my_dataviz")
        .append("svg")
        .style("position", "fixed")
        .attr("width", width + marginleft + marginright)
        // Add 2 so you have a little bit of room left for the black bar
        // i.e. margin top has to be less than total height!
        .attr("height", margintop + 1)
        .append("g")
        .attr("transform", "translate(" + marginleft + ", " + margintop + ")");

      var svg = d3.select("#my_dataviz")
        .append("div")
        // Note the CSS rules for .chart
        .attr("class", "chart")
        .append("svg")
        .attr("width", width + marginleft + marginright)
        // No margin-top required here, because the other element already took care of it
        .attr("height", height + marginbottom)
        .append("g")
        // Same, no margin-top
        .attr("transform", "translate(" + marginleft + ", 0)");

      var x_axis = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function(d) {
          return d.group;
        }))
        .padding(0.01);

      axis.call(d3.axisTop(x_axis))
        .selectAll("text")
        .style("text-anchor", "end")
        .style("position", "fixed")
        .attr("dx", 15)
        .attr("dy", 5)
        .attr("transform", "rotate(-65)");

      var y_axis = d3.scaleBand()
        .range([height, 0])
        .domain(data.map(function(d) {
          return d.activity;
        }))
        .padding(0.01);

      svg.append("g")
        .call(d3.axisLeft(y_axis))
        .attr("class", "y_axis")
        .selectAll("text")
        .on("click", function(d) {
          window.open(d.url, "_blank")
        });

      var myColor = d3.scaleLinear()
        .range(["white", "#C37B89"])
        .domain([1, 100])

      svg.selectAll()
        .data(data, function(d) {
          return d.group + ':' + d.activity;
        })
        .enter()
        .append("rect")
        .attr("x", function(d) {
          return x_axis(d.group)
        })
        .attr("y", function(d) {
          return y_axis(d.activity)
        })
        .attr("width", x_axis.bandwidth())
        .attr("height", y_axis.bandwidth())
        .style("fill", function(d) {
          return myColor(d.value)
        })
        .style("stroke-width", 1)
        .style("stroke", "none")

    })

  }

  onMounted(() => {
    graph(preprocess(props.data));
    // graph(phils);
    // console.log('hey');
  })
</script>

<template>
  <div class="container">
    <div id="my_dataviz"></div>
    <!-- <div class="area">
      <svg class="outer"></svg>
    </div>
    <svg class="inner"></svg> -->
  </div>
</template>

<style scoped>

  .rect {
  opacity: 0.8;
}



#my_dataviz {
  border: solid 1px red;
  width: 200px;
  height: 300px;
  overflow: scroll;
}

/* To make sure there is no space between the DIV and the SVG */
#my_dataviz > * {
  display: block;
}

.chart {
  overflow-y: hidden;
  max-height: 300px;
}

</style>