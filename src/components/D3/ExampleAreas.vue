<script setup>
  import * as d3 from 'd3'
  import {ref, onMounted, watch} from "@vue/runtime-core";
  const props = defineProps({
    data:{type:Array, default:[]},
    width:{type:Number,default:500},
    height:{type:Number,default:300},
    transpose:{type:Boolean, default:false},
    y0:{type:Number, default:0},
    define:{type:Function, default:(d)=>true},
    hasBase:{type:Boolean, default:false},
    curve:{type:String,default:'curveLinear'}
  })
  let svg, x, y, area, baseArea

  const marginLeft = 40,
        marginRight = 30,
        marginTop = 20,
        marginBottom = 30;

  const gx = ref()
  const gy = ref()
  const areaPath = ref()
  const basePath = ref() // 背景底图
  const svgBox = ref()
  // 创建svg
  function createSvg(){
    let {width,height } = props
    svg = d3.select(svgBox.value)
        .attr('width',width)
        .attr('height',height)
        .attr('viewBox',[-width/2, -height/2, width, height])
  }
  // 更新坐标系
  function updateAxis(){
    let {transpose,data, width,height} = props
    x = d3.scaleUtc(d3.extent(data, d=>new Date(d.date)), [marginLeft, width-marginRight])
    y = d3.scaleLinear([0, d3.max(data, d=>d.close)], [height - marginBottom, marginTop])
    if(transpose){ // xy轴转置
      x = d3.scaleLinear([0, d3.max(data, d=>d.close)], [marginLeft, width-marginRight])
      y = d3.scaleUtc(d3.extent(data, d=>new Date(d.date)),[height - marginBottom, marginTop])
    }
    d3.select(gx.value)
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x).ticks(width/80).tickSizeOuter(0))
    d3.select(gy.value)
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y).ticks(height/40))
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
    function areaGenerator(labelAxisFun, valueAxisFun, baseValueAxisFun, labelAxis, valueAxis, y0=0, define=(()=>true)){
      let area = d3.area().defined(define).curve(d3[props.curve])
      return area
          [labelAxisFun](d=>labelAxis(new Date(d.date)))
          [baseValueAxisFun](valueAxis(y0))
          [valueAxisFun](d=>valueAxis(d.close))

    }
    let {y0, transpose, data, width,height, define} = props

    if(transpose){
      area = areaGenerator('y','x0','x1',y,x,y0,define)
      baseArea = areaGenerator('y','x0','x1',y,x,y0)
    }else{
      area = areaGenerator('x','y0','y1',x,y,y0,define)
      baseArea = areaGenerator('x','y0','y1',x,y,y0)
    }
    // 背景蒙版
    d3.select(basePath.value)
        .attr('transform',`translate(${-width/2},${-height/2})`)
        .attr('fill','rgba(0,0,0,0.15)')
        .attr('d',baseArea(data))
    // 图表图层
    d3.select(areaPath.value)
        .attr('transform',`translate(${-width/2},${-height/2})`)
        .attr('fill','#7db1bb')
        .attr('d',area(data))

  }
  watch(
      ()=>[props.y0,props.curve],
      (newVal,oldVal)=>{
            createAreas()
          })
  watch(
      ()=>props.data,
      (newVal,oldVal)=>{
            if(newVal!==oldVal){
              if(x!==undefined){
                updateAxis()
              }else{
                createAxis()
              }
              createAreas()
            }
          })

  onMounted(()=>{
    createSvg()
  })
</script>

<template>
  <div ref="root" class="wrap">
    <svg ref="svgBox">
      <g ref="gx"></g>
      <g ref="gy"></g>
      <path ref="basePath"></path>
      <path ref="areaPath"></path>
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