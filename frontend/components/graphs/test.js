// D3 Vue file
// D3.vue

import * as d3 from "d3";

const data = [
 {
   "rank": 1,
   "city": "新北市",
   "cata": "直轄市",
   "count": "3,987,520"
 },
 {
   "rank": 2,
   "city": "臺中市",
   "cata": "直轄市",
   "count": "2,794,933"
 },
 {
   "rank": 3,
   "city": "高雄市",
   "cata": "直轄市",
   "count": "2,773,932"
 },
 {
   "rank": 4,
   "city": "臺北市",
   "cata": "直轄市",
   "count": "2,675,713"
 },
 {
   "rank": 5,
   "city": "桃園市",
   "cata": "直轄市",
   "count": "2,204,824"
 },
 {
   "rank": 6,
   "city": "臺南市",
   "cata": "直轄市",
   "count": "1,884,717"
 },
 {
   "rank": 7,
   "city": "彰化縣",
   "cata": "縣",
   "count": "1,279,276"
 },
 {
   "rank": 8,
   "city": "屏東縣",
   "cata": "縣",
   "count": "828,275"
 },
 {
   "rank": 9,
   "city": "雲林縣",
   "cata": "縣",
   "count": "688,717"
 },
 {
   "rank": 10,
   "city": "新竹縣",
   "cata": "縣",
   "count": "554,541"
 },
 {
   "rank": 11,
   "city": "苗栗縣",
   "cata": "縣",
   "count": "551,082"
 },
 {
   "rank": 12,
   "city": "嘉義縣",
   "cata": "縣",
   "count": "509,161"
 },
 {
   "rank": 13,
   "city": "南投縣",
   "cata": "縣",
   "count": "499,194"
 },
 {
   "rank": 14,
   "city": "宜蘭縣",
   "cata": "縣",
   "count": "456,006"
 },
 {
   "rank": 15,
   "city": "新竹市",
   "cata": "市",
   "count": "443,351"
 },
 {
   "rank": 16,
   "city": "基隆市",
   "cata": "市",
   "count": "370,795"
 },
 {
   "rank": 17,
   "city": "花蓮縣",
   "cata": "縣",
   "count": "328,749"
 },
 {
   "rank": 18,
   "city": "嘉義市",
   "cata": "市",
   "count": "268,951"
 },
 {
   "rank": 19,
   "city": "臺東縣",
   "cata": "縣",
   "count": "219,643"
 },
 {
   "rank": 20,
   "city": "金門縣",
   "cata": "縣",
   "count": "137,837"
 },
 {
   "rank": 21,
   "city": "澎湖縣",
   "cata": "縣",
   "count": "104,013"
 },
 {
   "rank": 22,
   "city": "連江縣",
   "cata": "縣",
   "count": "13,044"
 }
]
data.forEach(d=>{
  d.count = +d.count.split(",").join("")
})


function testD3 () {
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


export default testD3();
