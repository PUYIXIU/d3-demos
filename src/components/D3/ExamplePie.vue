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
  const wrap = ref()
  let svg, pieG
  function initSvg(){
    let {width,height} = props
    if(!svg){
      svg = d3.create('svg')
          .attr('width',width)
          .attr('height',height)
          .attr('viewBox',[-width/2, - height/2, width, height])
    }
  }
  function createPie(){
    let {width,height,data}  = props
    const pie = d3.pie()
    if(!pieG){
      pieG = svg.append('g')

    }
  }

  watch(()=>props.data,()=>{

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