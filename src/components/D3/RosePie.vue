<script setup>
  import * as d3 from 'd3'
  import {ref, watch, onMounted} from 'vue'
  const wrap = ref()
  const props = defineProps({
    data:{type:Array,default:[]}
  })
  let color = d3.scaleOrdinal(d3.schemeTableau10)
  let svg, pieG, strokeG
  let pie, strokeArc, arc
  let outerRadius = ref([70,150])
  let innerRadius = ref([50, 68])
  let startAngle = 0, endAngle = Math.PI*2
  let padAngle = ref(1/Math.max(...innerRadius.value,...outerRadius.value))
  let cornerRadius = ref(10)
  let padRadius = ref(200)
  let width = 500,height = 500
  let gradient = ref(1)
  // 初始化生成器
  function initGenerator(){
    pie = d3.pie()
        .startAngle(startAngle)
        .endAngle(endAngle)
        .value(d=>d.value)
    arc = d3.arc()
        .padAngle(padAngle.value)
        .cornerRadius(cornerRadius.value)
        .padRadius(padRadius.value)
        .innerRadius(outerRadius.value[0])
        .outerRadius((d,index,data)=>{
          return outerRadius.value[1]+gradient.value*d.index
        })
    strokeArc = d3.arc()
        .padAngle(padAngle.value)
        .padRadius(padRadius.value)
        .cornerRadius(cornerRadius.value)
        .innerRadius(innerRadius.value[0])
        .outerRadius(innerRadius.value[1])
  }
  // 创建svg
  function createSvg(){
    if(!svg){
      svg = d3.create('svg')
          .attr('width',width)
          .attr('height',height)
          .attr('viewBox',[-width/2, -height/2, width, height])
    }
  }
  // 创建饼图
  function createPie(){
    let {data} = props
    if(!pieG){
      pieG = svg.append('g')
          .attr('id','pie-g')
          .selectAll('path')
          .data(pie(data))
          .join('path')
          .attr('d',arc)
          .attr('fill',d=>color(d.data.name))
          .attr('fill-opacity',0.8)
    }else{
      svg.select('#pie-g')
          .selectAll('path')
          .attr('d',arc)
          .attr('fill',d=>color(d.data.name))
          .attr('fill-opacity',0.8)
    }
    if(!strokeG){
      strokeG = svg.append('g')
          .attr('id','stroke-g')
          .selectAll('path')
          .data(pie(data))
          .join('path')
          .attr('d',strokeArc)
          .attr('fill',d=>color(d.data.name))
          .attr('fill-opacity',0.5)

    }else{
      svg.select('#stroke-g')
          .selectAll('path')
          .attr('d',strokeArc)
          .attr('fill',d=>color(d.data.name))
          .attr('fill-opacity',0.5)
    }
  }

  watch(()=>props.data,(newVal,oldVal)=>{
    initGenerator()
    createSvg()
    createPie()
    wrap.value.append(svg.node())
  })
  watch([outerRadius,innerRadius,gradient,padAngle,cornerRadius,padRadius],()=>{
    initGenerator()
    createPie()
  })
</script>

<template>
  <div class="wrap" ref="wrap">
    <div style="width:80%;display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Outer Radius</span>
      <el-slider v-model="outerRadius" range :min="10" :max="200" size="small"></el-slider>
    </div>
    <div style="width:80%;display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Inner Radius</span>
      <el-slider v-model="innerRadius" range :min="10" :max="200" size="small"></el-slider>
    </div>
    <div style="width:80%;display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Gradient</span>
      <el-slider v-model="gradient" :min="0" :max="10" :step="0.1" size="small"></el-slider>
    </div>
    <div style="width:80%;display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">PadAngle</span>
      <el-slider v-model="padAngle" :min="0" :max="Math.PI/6" :step="0.01" size="small"></el-slider>
    </div>
    <div style="width:80%;display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">CornerRadius</span>
      <el-slider v-model="cornerRadius" :min="0" :max="20" :step="0.1" size="small"></el-slider>
    </div>
    <div style="width:80%;display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">PadRadius</span>
      <el-slider v-model="padRadius" :min="0" :max="400" :step="1" size="small"></el-slider>
    </div>
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

<style  lang="scss">
 #pie-g path{
  cursor: pointer;
  transition:0.1s ease-in-out all;
  &:hover{
    fill-opacity: 1;
    transform: scale(1.1);
  }
}
</style>