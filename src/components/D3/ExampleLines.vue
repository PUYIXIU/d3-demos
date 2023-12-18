<script setup>
import * as d3 from 'd3'
import {ref, onMounted, watch} from 'vue'
const props = defineProps({
  data:{type:Array, default:[]},
  width:{type:Number, default:500},
  height:{type:Number,default:300},
  define:{type:Function,default:(d)=>true},
  curve:{type:String,default:'curveLinear'}
})

let svg, x, y, line, baseLine

const marginLeft = 40,
    marginRight = 30,
    marginTop = 20,
    marginBottom = 30;

const gx = ref()
const gy = ref()
const linePath = ref()
const basePath = ref()
const svgBox = ref()
// 创建坐标系
function createAxis(){
  let {transpose,data, width,height} = props
  x = d3.scaleUtc(d3.extent(data, d=>new Date(d.date)), [marginLeft, width-marginRight])
  y = d3.scaleLinear([0, d3.max(data, d=>d.close)], [height - marginBottom, marginTop])
  if(transpose){ // xy轴转置
    x = d3.scaleLinear([0, d3.max(data, d=>d.close)], [marginLeft, width-marginRight])
    y = d3.scaleUtc(d3.extent(data, d=>new Date(d.date)),[height - marginBottom, marginTop])
  }
  d3.select(gx.value)
      .attr('transform', `translate(${-width/2}, ${height/2-marginBottom})`)
      .call(d3.axisBottom(x).ticks(width/80).tickSizeOuter(0))
      .call(g=>g.append('text')
          .attr('y',10)
          .attr('x',width-marginLeft)
          .attr('text-anchor','end')
          .text('x'))
  d3.select(gy.value)
      .attr('transform', `translate(${marginLeft-width/2},${-height/2})`)
      .call(d3.axisLeft(y).ticks(height/40))
      .call(g=>g.select('.domain').remove()) //去掉y轴
      .call(g=>g.selectAll('.tick line').clone() // 添加split-line
          .attr('x2',width-marginLeft-marginRight)
          .attr('stroke-opacity',0.1))
      .call(g=>g.append('text') // 添加y轴描述
          .attr('y',10)
          .attr('fill','currentColor')
          .attr('text-anchor','start')
          .text('y轴描述'));
}

function createSvg(){
  let {width,height } = props
  svg = d3.select(svgBox.value)
      .attr('width',width)
      .attr('height',height)
      .attr('viewBox',[-width/2, -height/2, width, height])
}

function createLines(){
  let {data,width,height} = props
  const line = d3.line()
      .x(d=>x(new Date(d.date)))
      .y(d=>y(d.close))
  d3.select(linePath.value)
      .attr('transform',`translate(${-width/2},${-height/2})`)
      .attr('fill','none')
      .attr('stroke','#b45c5c')
      .attr('stroke-width',1)
      .attr('d',line(data))
}

watch(
    ()=>props.data,
    ()=>{
      createSvg()
      createAxis()
      createLines()
    }
)
watch(
    ()=>props.curve,
    ()=>{

    }
)
</script>

<template>
  <div class="wrap">
    <svg ref="svgBox">
      <g ref="gx"></g>
      <g ref="gy"></g>
      <path ref="basePath"></path>
      <path ref="linePath"></path>
    </svg>
  </div>
</template>

<style scoped lang="scss">
.wrap{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>