<script setup>
import * as d3 from 'd3'
import {ref,onMounted} from 'vue'
import axios from "axios";

const mockData = ref([])
const wrap = ref()
let stackData
let svg, gx, gy ,gArea, toolTip
let x, y, toolTipX
let width = 1000, height = 300, padding =  0.1
let tooltip_width = 300, tooltip_height = 10
let xUnion = [],typeUnion, color
const marginLeft = 70,
    marginRight = 30,
    marginTop = 20,
    marginBottom = 30;
function initGenerator(){
  xUnion = Array.from(d3.union(mockData.value.map(d=>d.state)))
  typeUnion = Array.from(d3.union(mockData.value.map(d=>d.age)))
  color = d3.scaleOrdinal()
      .domain(typeUnion)
      .range(d3.schemeSpectral[typeUnion.length])
      .unknown('#ccc')
  stackData = d3.stack()
      .keys(d3.union(mockData.value.map(d=>d.age)))
      .value((arr,key)=>arr[1].get(key).population)(d3.index(mockData.value, d=>d.state, d=>d.age))
  x = d3.scaleBand()
      // d3.groupSort(数据源, 排序依据, 排序key)
      .domain(d3.groupSort(mockData.value, D=> -d3.sum(D, d=>d.population), d=>d.state))
      .range([marginLeft, width-marginRight])
      .padding(padding)
  y = d3.scaleLinear()
      .domain([0,d3.max(stackData.flat().flat())])
      .range([height-marginTop-marginBottom,marginTop])
}

function initSvg(){
  if(!svg){
    svg = d3.create('svg')
        .attr('width',width)
        .attr('height',height)
        .attr('viewBox',[-width/2, -height/2, width, height])
  }
}

function initAxis(){
  if(!gx || !gy){
    gx = svg.append('g')
        .attr('transform',`translate(${[-width/2,height/2-marginBottom]})`)
        .call(d3.axisBottom(x))
    gy = svg.append('g')
        .attr('transform',`translate(${[-width/2+marginLeft,-height/2+marginTop]})`)
        .call(d3.axisLeft(y).ticks(null, "s"))

  }
}

function initBar(){
  if(!gArea){
    gArea = svg.append('g')
        .attr('transform',`translate(${[-width/2,-height/2+marginTop]})`)
        .selectAll('g')
        .data(stackData)
        .join('g')
        .attr('fill',d=>color(d.key))
        .selectAll('rect')
        .data(d=>d)
        .join('rect')
        .attr('x',d=>x(d.data[0]))
        .attr('y',d=>y(d[1]))
        .attr('width',x.bandwidth())
        .attr('height',d=>(y(d[0])- y(d[1])))

  }
}

function initToolTip(){
  if(!toolTip){
    toolTipX = d3.scaleBand()
        .domain(typeUnion)
        .range([0,tooltip_width])
        .padding(0.03)
    toolTip = svg.append('g')
    toolTip.append('g')
        .attr('transform',`translate(${[-width/2+marginLeft,-height/2+tooltip_height]})`)
        .call(d3.axisBottom(toolTipX))
        .selectAll('.domain').remove()
    toolTip.append('g')
        .attr('transform',`translate(${[-width/2+marginLeft,-height/2]})`)
        .selectAll('rect')
        .data(typeUnion)
        .join('rect')
        .attr('fill',d=>color(d))
        .attr('x',d=>toolTipX(d))
        .attr('y',0)
        .attr('width',toolTipX.bandwidth())
        .attr('height',tooltip_height)
    toolTip.append('text')
        .attr('transform',`translate(${[-width/2+marginLeft+tooltip_width+5,-height/2+tooltip_height-1]})`)
        .text('Age(years)')
        .attr('font-size','11')

  }
}
// 获取mock数据
function getMockData(){
  return axios.get('public/mock/stackedBarChart.json').then(res=>{
    mockData.value = res.data
  })
}

onMounted(()=>{
  getMockData().then(res=>{
    initGenerator()
    initSvg()
    initAxis()
    initBar()
    initToolTip()
    wrap.value.append(svg.node())
  })
})
</script>

<template>
  <div class="wrap" ref="wrap"></div>
</template>

<style scoped lang="scss">

</style>