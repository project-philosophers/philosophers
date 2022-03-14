<script setup>
  import { ref, onMounted, nextTick, watch } from 'vue';
  const props = defineProps(['data']);
  const emit = defineEmits(['response']);
  const clickedPhId = ref();

  import * as d3 from 'd3';

  const phils = props.data; // temp

  const preprocess = (data) => {
    const nodes = data.map(d => {
      return {"name": d.name}
    });

    let arr = [];
    data.forEach((d) => {
      if (d.influences) {
        d.influences.forEach((i) => {
          // console.log(i);
          // const d_found = data.find(dd => dd.id === i);
          const link = {
            "source": data.find(dd => dd.id === i).name,
            "target": d.name
          };
          if (!arr.includes(link)) {
            arr.push(link);
          }
        });
      }
    });
    const links = arr;

    return {
      "nodes": nodes,
      "links": links
    }
  }

  const graph = (data) => {
    const [width, height] = [window.innerWidth - 280, window.innerHeight - 38];
    // const [width, height] = [300, 300];

    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));
    console.log(nodes, links);
    const radius = 10;

    const svg = d3.select('svg')
      .attr('viewBox', [0, 0, width, height])

    const simulation = d3.forceSimulation(nodes)
      .force("link",
        d3.forceLink(links)
          .id(d => d.name)
          .strength(0.1)
        // .distance(200)
      )
      .force("charge",
        d3.forceManyBody()
          .strength(-20)
      )
      .force("center",
        d3.forceCenter(width/2, height/2)
        // d3.forceCenter(width, height)
      );
      // .force("collision", d3.forceCollide(15));

    // const link = svg.append("g")
    //   .attr("stroke", "#aaa")
    //   .attr("stroke-opacity", 0.2)
    //   .selectAll("line")
    //   .data(links)
    //   .join("line")
    //     .attr("stroke-width", d => Math.sqrt(d.value) / 2);
    const link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(links)
      .join("line")
        .attr("stroke", "#aaa")
        .attr("stroke-width", 2)
        .attr("stroke-opacity", 0.2);
    const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("r", radius)
        .attr("fill", "black")
        .attr("opacity", 0.2)
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
        )
        .on("mouseover", d => eventMouseOver(d))
        .on("mouseout", d => eventMouseOut(d))
        .on("click", d => eventClick(d));
    const textElems = svg.append('g')
        .attr('class', "textElems")
        .selectAll('text')
        .data(nodes)
        .join('text')
          .text(d => d.name)
          .attr('font-size',10)
          .attr('font-size',10);

    const ticked = () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      node
        .attr("cx", function(d) { return d.x = Math.max((radius+1), Math.min(width - (radius+1), d.x)); })
        .attr("cy", function(d) { return d.y = Math.max((radius+1), Math.min(height - (radius+1), d.y)); });
      textElems
        .attr("x", d => d.x + 10)
        .attr("y", d => d.y)
        .attr("visibility", "hidden");

      d3.select('#alpha_value').style('flex-basis', (simulation.alpha()*100) + '%');
    }

    simulation.on("tick", ticked);

    function dragstarted (event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    };
    function dragged (event, d) {
      d.fx = event.x;
      d.fy = event.y;
    };
    function dragended (event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    };



    const funcFocus = (d) => {
      const isConnected = (a, b) => {
        const linkedByIndex = links.map(d => {
          return `(${d.source.index}, ${d.target.index})`;
        });
        return linkedByIndex.includes(`(${a.index}, ${b.index})`) || linkedByIndex.includes(`(${b.index}, ${a.index})`) || a.index === b.index;
      };
      node.style('opacity', o => isConnected(d, o) ? 1 : 0.2);
      link.style('stroke-opacity', o => o.source === d || o.target === d ? 1 : 0.2);
      textElems.style('visibility', o => isConnected(d, o) ? "visible" : "hidden");
    };

    const eventMouseOver = (d_all) => {
      const d = d_all.target.__data__;
      funcFocus(d);
      // const phils = eval(context.phils);
      const ph_found = phils.find(ph => ph.name == d.name);
      // context.Over.setOveredPh(ph_found);
    };
    const eventMouseOut = (d_all) => {
      // const d = d_all.toElement.__data__;
      node.style("opacity", 0.2);
      link.style('stroke-opacity', 0.2);
      textElems.style('visibility', 'hidden');
      // context.Over.setOveredPh(null);
    };
    const eventClick = (d_all) => {
      const d = d_all.target.__data__;
      funcFocus(d);
      d3.select(this)
        .attr("id", "select");
      // const phils = eval(context.phils);
      const ph_found = phils.find(ph => ph.name == d.name);
      // context.Click.setClickedPh(ph_found);
    };

    //// const setOveredPh = context.Over.setOveredPh;
    //// const setClickedPh = context.Click.setClickedPh;
  }

// watch(phils, () => {
  // graph(preprocess(phils));
// })

  onMounted(() => {
    // const data = preprocess(phils)
    nextTick(() => {
      const data = preprocess(phils);
      graph(data);
      // graph(preprocess(phils))
    });
    // graph(preprocess(props.data));
    // console.log(preprocess(props.data));
  })
</script>

<template>
  <div class="container">
    <svg></svg>
  </div>
</template>

<style>
  /* svg {
    border: 5px solid #000;
    background-color: white;
    width: 100%;
    height: 500px;
  } */
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
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100%;
    height: 100%;
  }
  /* .chartNetwork svg text {
    font-size: 10px;
  } */
  .textElems {
    font-family: "Courier";
    font-size: 10;
  }
  .connect {
    color: "red";
  }
</style>