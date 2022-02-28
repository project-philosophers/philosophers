// D3 Vue file
// D3.vue
<script>
import * as d3 from "d3";

export default {
  name: 'D3',
  props: ['data'],
  methods: {
    testD3(data) {
      data.forEach(d=>{
        d.count = +d.count.split(",").join("")
      });
      console.log('test d3');
      const svg = d3.select("svg")
      console.log('svg', svg);
      svg.attr("width",960).attr("height",540)

      var scaleHeight = d3.scaleLinear()
            .domain([0,4000000])
            .range([0,400])
      var scaleColor = d3.scaleLinear()
            .domain([0,4000000])
            .range(['blue','#fc993c'])
      var groups = svg.selectAll("g.city")
        .data(data)
        .enter()
        .append("g")
      groups.append('text')
            .text(d=>d.city)
            .attr("y",520)
            .attr("x",(d,i)=>i*100)
      groups.append("circle")
            .attr("cx",(d,i)=>i*100+20)
            .attr("cy",400)
            .attr("r",(d)=>0)
            .attr("fill",(d)=>scaleColor(d.count))
            .transition()
            .duration(1000)
            .delay((d,i)=>i*200)
            .attr("r",(d)=>scaleHeight(d.count)/10)
            .attr("cy",200)

      groups.append("text")
            .text(d=>d.count)
            .attr("x",(d,i)=>i*100+10)
            .attr("y", (d)=>480-scaleHeight(d.count))
            .style('font-size',"13px")
            .style("opacity",0)
      .transition()
            .duration(1000) 
            .delay((d,i)=>i*200)
            .style("opacity",1)
            
      var line = d3.line()
                  .x((d,i)=>i*100)
                  .y((d,i)=>-d.count/10000+500)
      svg.append("path")
        .datum(data)
        .attr("d",line)
        .attr("fill","none")
        .attr("stroke","black") 
    }
  },
  mounted () {
    this.testD3(this.$props.data);
  }
}

</script>

<template>
  <div class="container">
    <svg></svg>
  </div>
</template>

<style>
  svg {
    border: 5px solid #000
  }
</style>