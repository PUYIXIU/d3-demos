<script setup>
  import * as d3 from 'd3'
  import {ref,watch,onMounted} from 'vue'
  const props = defineProps({
    data:{type:Array,default:[]},
    arc:{type:Function},
    pie:{type:Function},
    width:{type:Number, default:500},
    height:{type:Number,default:300},
  })
  //
  let color
  const wrap = ref()
  let svg, pieG, labelG
  // 初始化svg
  function initSvg(){
    let {width,height} = props
    if(!svg){
      svg = d3.create('svg')
          .attr('width',width)
          .attr('height',height)
          .attr('viewBox',[-width/2, - height/2, width, height])
    }
  }
  // 创建pie
  function createPie(){
    let {width,height,data ,pie, arc}  = props
    if(!pieG){
      pieG = svg.append('g')
          .selectAll('path')
          .data(pie(data))
          .join('path')
          .attr('fill',d=>color(d.data.name))
          .attr('d',arc)
    }
  }
  // 创建标签
  function createLabel(){
    let {width,height,data ,pie, arc}  = props
    if(!labelG){
      labelG = svg.append('g')
          .selectAll('text')
          .data(pie(data))
          .join('text')
          .attr('transform',d=>`translate(${arc.centroid(d)})`)
          .attr('font-size','0.5em')
          .call(
              text=>
                  text.append('tspan')
                      .attr('font-weight','bold')
                      .attr('x','-1em')
                      .attr('y','-0.4em')
                      .text(d=>(d.endAngle - d.startAngle)>0.25?d.data.name:'')
          )
          .call(
              text=>
                  text.append('tspan')
                      .attr('font-size','0.7em')
                      .attr('x','-1em')
                      .attr('y','0.7em')
                      .attr("fill-opacity", 0.7)
                      .text(d=>(d.endAngle - d.startAngle)>0.25?d.data.value:'')
          )

    }
  }
  watch(()=>props.data,(newVal,oldVal)=>{
    // 围绕光谱给每个名字分配颜色 domain 类 range 值
    color = d3.scaleOrdinal()
        .domain(newVal.map(d=>d.name))
        .range(d3.quantize(t=>d3.interpolateSpectral(t*0.8+0.1),newVal.length).reverse())
    createPie()
    createLabel()
  })
  onMounted(()=>{
    initSvg()
    wrap.value.append(svg.node())
  })
</script>

<template>
  <div class="wrap" ref="wrap"></div>
</template>

<style scoped lang="scss">
.wrap{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>