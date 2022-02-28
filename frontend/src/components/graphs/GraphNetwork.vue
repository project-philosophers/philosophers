<script>
  import * as d3 from 'd3';

  export default {
    name: 'GraphNetwork',
    props: ['data'],
    watch: {
      data: function (newData) {
        // console.log(this.preprocess(newData));
        this.graph(this.preprocess(newData));
        // this.graph0();
        // this.chart(this.preprocess(newData));
        // this.testD3(newData);
      }
    },
    methods: {
      preprocess (data) {
        const nodes = data.map(d => {
          return {"id": d.name}
        });
        const links = data.map(d => {
          if (d.influences) {
            return d.influences.map(i => {
              return {
                "source": data.find(dd => dd.id === i).name,
                "target": d.name
              }
            })
          }
        }).filter(d => d);
        return {
          "nodes": nodes,
          "links": links
        };
      },
      graph (data) {
        // const [width, height] = [500, 500];
        const width = 250;
        const height = 250;

        const links = data.links;
        const nodes = data.nodes;
        console.log(nodes, links);
        // const links = data.links.map(d => Object.create(d));
        // const nodes = data.nodes.map(d => Object.create(d));
        const radius = 10;

        const svg = d3.select('svg')
          // .attr("viewBox", `0 0 ${width} ${height}`)
          .attr('viewBox', [0, 0, width, height])
          // .attr("width", width)
          // .attr("height", height);


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
            // d3.forceCenter(width/2, height/2)
            d3.forceCenter(width, height)
          );
          // .force("collision", d3.forceCollide(15));

        // simulation.start();

        // d3.datum(data, function(error, _graph) {
        //   if (error) throw error;
        //   graph = _graph;
          // initializeDisplay();
          // initializeSimulation();
        // });




        // force simulation
        // const simulation = d3.forceSimulation();

        // function initializeSimulation () {
        //   simulation.nodes(nodes);
        //   initializeForces();
        //   simulation.on("tick", ticked);
        // }

        // const forceProperties = {
        //   center: {
        //     x: 0.5,
        //     y: 0.5
        //   },
        //   charge: {
        //     enabled: true,
        //     strength: -20,
        //     distanceMin: 1,
        //     distanceMax: 2000
        //   },
        //   collide: {
        //     enabled: true,
        //     strength: .7,
        //     iterations: 1,
        //     radius: 5
        //   },
        //   forceX: {
        //     enabled: false,
        //     strength: .1,
        //     x: .5
        //   },
        //   forceY: {
        //     enabled: false,
        //     strength: .1,
        //     y: .5
        //   },
        //   link: {
        //     enabled: true,
        //     distance: 30,
        //     iterations: 1
        //   }
        // };

        // const initializeForces = () => {
        //   simulation
        //     .force("link", d3.forceLink())
        //     .force("charge", d3.forceManyBody())
        //     .force("collide", d3.forceCollide())
        //     .force("center", d3.forceCenter())
        //     .force("forceX", d3.forceX())
        //     .force("forceY", d3.forceY());
        //   updateForces();
        // }

        // const updateForces = () => {
        //   simulation.force("center")
        //     .x(width * forceProperties.center.x)
        //     .y(height * forceProperties.center.y);
        //   simulation.force("charge")
        //     .strength(forceProperties.charge.strength * forceProperties.charge.enabled)
        //     .distanceMin(forceProperties.charge.distanceMin)
        //     .distanceMax(forceProperties.charge.distanceMax);
        //   simulation.force("collide")
        //     .strength(forceProperties.collide.strength * forceProperties.collide.enabled)
        //     .radius(forceProperties.collide.radius)
        //     .iterations(forceProperties.collide.iterations);
        //   simulation.force("forceX")
        //     .strength(forceProperties.forceX.strength * forceProperties.forceX.enabled)
        //     .x(width * forceProperties.forceX.x);
        //   simulation.force("forceY")
        //     .strength(forceProperties.forceY.strength * forceProperties.forceY.enabled)
        //     .y(height * forceProperties.forceY.y);
        //   simulation.force("link")
        //     .id(d => d.name)
        //     .distance(forceProperties.link.distance)
        //     .iterations(forceProperties.link.iterations)
        //     .links(forceProperties.link.enabled ? graph.links : []);

        //   simulation.alpha(1).restart();
        // }

        const link = svg.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(links)
          .join("line")
            .attr("stroke", "#aaa")
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
            );

        const textElems = svg.append('g')
            .attr('class', "textElems")
            .selectAll('text')
            .data(nodes)
            .join('text')
              .text(d => d.name)
              .attr('font-size',10)
              .attr('font-size',10);

        simulation.on("tick", ticked);

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

          // d3.select('#alpha_value').style('flex-basis', (simulation.alpha()*100) + '%');
        }

        function dragstarted (event, d) {
          console.log(d, 'dragstarted')
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        };
        function dragged (event, d) {
          console.log('dragged')
          console.log('d', d)
          d.fx = event.x;
          d.fy = event.y;
        };
        function dragended (event, d) {
          console.log(d, 'dragended');
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
    border: 5px solid #000;
    background-color: white;
    width: 100%;
    height: 100%;
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