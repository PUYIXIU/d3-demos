<script setup>
  import * as d3 from 'd3'
  import {ref, onMounted, onUpdated, watch, watchEffect} from "@vue/runtime-core";
  const props = defineProps({
    data:{type:Array, default:[]},
    width:{type:Number,default:500},
    height:{type:Number,default:300},
    transpose:{type:Boolean, default:false},
    y0:{type:Number, default:0}
  })
  let svg, rect, x, y, xAxis, yAxis, area
  const marginLeft = 40,
        marginRight = 30,
        marginTop = 20,
        marginBottom = 30;

  const root = ref()
  const gx = ref()
  const gy = ref()
  const svgBox = ref()
  // 创建svg
  function createSvg(){
    let {width,height} = props
    svg = d3.select(svgBox.value)
        .attr('width',width)
        .attr('height',height)
        .attr('viewBox',[-width/2, -height/2, width, height])
  }
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
  // 创建区域
  function createAreas(){
    let {y0, transpose, data, width,height} = props
    if(transpose){
      area = d3.area()
          .y(d=>x(new Date(d.date)))
          .x0(y(y0))
          .x1(d=>y(d.close))
    }else{
      area = d3.area()
          .x(d=>x(new Date(d.date)))
          .y0(y(y0))
          .y1(d=>y(d.close))
    }
    svg.append('path')
        .attr('transform',`translate(${-width/2},${-height/2})`)
        .attr('fill','#7db1bb')
        .attr('d',area(data))
  }
  watch(props.y0,(newVal,oldVal)=>{
    debugger
  })
  watch(props.data,(newVal,oldVal)=>{
    createAxis()
    createAreas()
  })

  onMounted(()=>{
    createSvg()
    // root.value.append(svg.node())
  })
  // onUpdated(()=>{
  //   createAxis()
  //   // createAreas()
  // })
</script>

<template>
  <div ref="root">
    <svg ref="svgBox">
      <g ref="gx"></g>
      <g ref="gy"></g>
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