<script>
  import * as d3 from 'd3';

  export default {
    name: 'GraphTimeline',
    props: ['data'],
    watch: {
      data: function (newData) {
        console.log('newData', newData);
        this.graph(this.preprocess(newData));
        // this.chart(this.preprocess(newData));
        // this.testD3(newData);
        // this.graph();
      }
    },
    // mounted () {
    //   this.graph
    // },
    methods: {
      preprocess (data) {
        return data.map(d => {
          return {
            id: d.id,
            name: d.name,
            born: d.born,
            died: d.died
          }
        });
      },
      graph (data) {
        const [width, height] = [window.innerWidth - 280, 200];
        // const [width, height] = [15000, window.innerHeight - 70];

        const svg = d3.select('svg')
            .attr("viewBox", [0, 0, width, height]);

        const drawGraph = () => {
          let limits = {
            minX: 0,
            maxX: 2000
          };

          // const g = svg.append('g')
          //   .call(zoom)
          //   .on("wheel.zoom", wheeled);

          const padding = { top: 20, right: 30, bottom: 20, left: 30 }
          const xScale = d3.scaleLinear()
            .domain([limits.minX, limits.maxX])
            .range([padding.left, width - padding.right]);

          let chartHeight = height - padding.top - padding.bottom

          const xAxis_top = d3.axisTop(xScale)
            // .ticks(10)
          const gX_top = svg.append('g')
            .attr('transform', 'translate(' + 0 + ',' + padding.top + ')')
            .call(xAxis_top)

          const xAxis_bottom = d3.axisBottom(xScale)
            // .ticks(10)
          const gX_bottom = svg.append('g')
            .attr('transform', 'translate(' + 0 + ',' + (height - padding.bottom) + ')')
            .call(xAxis_bottom)
          
          // const yScale = d3.scaleLinear();
          // const yAxis = d3.axisLeft(yScale);
          // const gY = svg.append('g')
          //   .call(yAxis);

          const chartCenterY = padding.top + chartHeight / 2
          

          const barHeight = 15
          // var scheduleG = svg.selectAll()
          //   .data(dataset)
          //   .enter()
          //   .append('g')
          const paddingBetween = 5;
          const lineY = (d) => {
            let i = data.indexOf(d);
            const y = padding.top + 10 + (i * (barHeight + paddingBetween));
            return y;
          }

          const zoom = d3.zoom()
            .scaleExtent([1, 10])
            .on("zoom", zoomed);

          svg.call(zoom)
            // .on("wheel.zoom", null)
            .on("wheel", pan);
          // svg.on("wheel", wheeled)
            // .call(zoom)

          // function zoomed() {
          //   lineY.attr("transform", d3.event.transform);
          //   gX.call(xAxis.scale(d3.event.transform.rescaleX(x)));
          //   gY.call(yAxis.scale(d3.event.transform.rescaleY(y)));
          // }

          function zoomed(event) {
            let dx = Math.abs(event.deltaX);
            let dy = Math.abs(event.deltaY);

            // if (dx > dy) {
            //   console.log("dx");
            // } else if (dx < dy) {
            // d3.select('svg').attr("transform", event.transform);
            gX_top.call(xAxis_top.scale(event.transform.rescaleX(xScale)));
            gX_bottom.call(xAxis_bottom.scale(event.transform.rescaleX(xScale)));
            let new_xScale = event.transform.rescaleX(xScale);

            // d3.select('.timeLines')
            //   .selectAll('rect')
            //   .data(data)
            //     .attr('x', d => new_xScale(d.born))
            //     .attr('width', d => new_xScale(d.died) - new_xScale(d.born))
            d3.selectAll('.timeBar')
              .attr('x', d => new_xScale(d.born))
              .attr('width', d => new_xScale(d.died) - new_xScale(d.born))

            // d3.select('.textElems')
            //   .selectAll('text')
            //   .data(data)
            //     .attr('x', d => new_xScale(d.born))
            // }
            // if (settings.detail.type == "line") {
            //     line.x(function(d) { return  new_x(new Date(d.DATA_DATE)); })
            //     d3.select("#canvas").selectAll("path.line")
            //                     .data(mainData)
            //                     .attr("d",function(d){
            //                         return line(d.data);
            //                     }); 
            // } else if(settings.detail.type == "bar"){
            //     barWidth = new_x(new Date("2016-01-02")) - new_x(new Date("2016-01-01"));
            //     d3.select("#canvas").selectAll("rect.bar")
            //                         .data(mainData[0].data)    
            //                         .attr("x",function(d){return new_x(new Date(d.DATA_DATE))-barWidth*0.5;})
            //                         .attr("width",barWidth);
            // }
          }

          function pan(event) {
            // let event = d3.event;
            let dx = Math.abs(event.deltaX);
            let dy = Math.abs(event.deltaY);

            if (dx > dy) {
              // console.log("dx");
              // zoom.translateBy(timeLines, -event.deltaX);
                // tUpdate(d3.zoomTransform(canvas.node()));
              // zoom.translateBy(svg, -event.deltaX);
              // phRows.transition()
              //   .attr("transform", "translate(" + -event.wheelDeltaX + ", 0)")

            } else if (dx < dy) {
              console.log("dy");
              // zoom.translateBy(yScale, 0, -event.deltaY);
              // zoom.translateBy(phRows, 0, -event.deltaY);
              phRows.transition()
                .attr("transform", "translate(0," + -event.wheelDeltaY+ ")")

                // let new_scale = 1; // How do you make a new scale here?
                // zoom.scaleBy(canvas, new_scale);
                // tUpdate(d3.zoomTransform(canvas.node()));
            }
            event.preventDefault();
          }
          

          const phRows = svg.append('g')
            .selectAll('.rows')
            .data(data)
            .join('g')
              .attr('class', 'rows')
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

          
          // const timeLines = svg.append("g")
          //   .attr("class", "timeLines")
          //   .selectAll("rect")
          //   .data(data)
          //   .join("rect")
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

          // const textElems = svg.append('g')
          //   .attr('class', "textElems")
          //   .selectAll('text')
          //   .data(data)
          //   .join('text')
          //   // .text(dataset.date.format(dateDispFormat))
          //     .text(d => d.name)
          //     .attr('x', padding.left)
          //     .attr('y', d => lineY(d))
          //     // .attr('y', chartCenterY)
          //     .attr('dy', '0.7rem')
          //     .attr('font-size', 10);


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
            // const d = d_all.target.__data__;
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

        }

        drawGraph();
      }
    }
  }
</script>

<template>
  <div class="container">
    <svg></svg>
  </div>
</template>

<style>
  /* .container { */
    /* overflow-x: scroll; */
  /* } */
  svg {
    border: 5px solid #000;
    background-color: white;
  }
  .chartNetwork {
    position: inherit;
    width: 100%;
    height: 100%;
    margin: 0;
    /* overflow-x: scroll; */
    z-index: 1;
    /* overflow-y: hidden; */
    /* background-color: green; */
    /* border: 1px solid black; */
  }
  .chartNetwork svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  /* .chartNetwork svg text {
    font-size: 10px;
  } */
  .textElems {
    font-family: "Courier";
    font-size: 10;
    /* overflow-y: scroll; */
  }
</style>