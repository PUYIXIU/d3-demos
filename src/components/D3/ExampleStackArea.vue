<script setup>
import * as d3 from 'd3'
import {ref, watch, onMounted} from 'vue'
const wrap = ref()
const props = defineProps({
  data:{type:Array,default:[]},
  width:{type:Number, default:500},
  height:{type:Number,default:300},
  stack:{type:Array},
  color:{type:Function}
})
const marginLeft = 40,
    marginRight = 30,
    marginTop = 20,
    marginBottom = 30;
let svg, areaG
let gx,gy,x,y
// 创建svg
function createSvg(){
  let { width, height } = props
  if(!svg){
    svg = d3.create('svg')
        .attr('width',width)
        .attr('height',height)
        .attr('viewBox',[-width/2, -height/2, width, height])
  }
}
// 创建坐标系
function createAxis(){
  let {data, width,height,stack} = props
  x = d3.scaleBand()
      .domain(Array.from(d3.union(data.map(d=>d.date))))
      .range([marginLeft, width-marginRight])
  y = d3.scaleLinear()
      .domain([0, d3.max(stack.flat().flat())])
      .range([height-marginTop-marginBottom,marginTop])
  if(!gx){
    gx = svg.append('g')
        .attr('transform',`translate(${-width/2},${height/2-marginBottom})`)
        .call(d3.axisBottom(x))
  }
  if(!gy){
    gy = svg.append('g')
        .attr('transform',`translate(${[-width/2+marginLeft,-height/2+marginTop]})`)
        .call(d3.axisLeft(y).ticks(height/40))
  }
}

// 创建堆栈图
function createStack(){
  let {width,height, data,stack,color} = props
  const area = d3.area()
      .x(d=> x(d.data[0]))
      .y0(y(0))
      .y1(d=>y(d[1]))
  if(!areaG){
    areaG = svg.append('g')
        .attr('id','stack-g')
        .attr('transform',`translate(${[-width/2+marginLeft,-height/2+marginTop]})`)
        .selectAll('path')
        .data(stack)
        .join('path')
        .attr('fill',d=>color(d.key))
        .attr('fill-opacity','0.5')
        .attr('d',d=>area(d))
  }else{
    areaG = d3.select('#stack-g')
        .selectAll('path')
        .data(stack)
        .attr('d',d=>area(d))
  }
}
watch(()=>props.stack,()=>{
  if(svg){
    createStack()
  }
  // svg && createStack()
})

watch(()=>props.data,(newVal,oldVal)=>{
  createSvg()
  createAxis()
  createStack()
  wrap.value.append(svg.node())
})
</script>

<template>
  <div class="wrap" ref="wrap">
  </div>
</template>

<style scoped lang="scss">
.wrap{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
