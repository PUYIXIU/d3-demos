<script setup>
import * as d3 from 'd3'
import {onMounted} from "@vue/runtime-core";
const props = defineProps({
  id:{
    type:String,
    default:''
  }
})
let container
function loadChart(){
  const width = 700;
  const height = 300;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 40;

  // domain:内部范围 range:外部范围
  // x坐标范围（UTC时间类型）
  const x = d3.scaleUtc()
      .domain([new Date("2023-01-01"), new Date("2024-01-01")])
      .range([marginLeft, width - marginRight])
  // y坐标范围（线性类型）
  const y = d3.scaleLinear()
      .domain([0,100])
      .range([height - marginBottom, marginTop])
  // svg容器
  const svg = d3.create('svg')
      .attr('width', width)
      .attr('height',height)
  // svg添加x轴
  const gx = svg.append('g')
      .attr('transform',`translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x))
  // svg添加y轴
  const gy = svg.append('g')
      .attr('transform',`translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
  // dom容器添加svg
  container?.append(svg.node())
}

onMounted(()=>{
  container = document.getElementById(props.id)
  loadChart()
})
</script>

<template>
  <div :id="id" class="container"></div>
</template>

<style scoped lang="scss">
.container{
  width: fit-content;
  margin:0 auto;
}
</style>