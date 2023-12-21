<script setup>
import * as d3 from 'd3'
import {ref,watch,onMounted} from 'vue'

const props = defineProps({
  width:{type:Number,default:20},
  height:{type:Number,default:20},
  customSymbol:{type:Function},
  size:{type:Number,default:64}
})
let svg, symbol
const symbolRef = ref()
function createSvg(){
  let {width,height,size} = props
  if(!svg){
    svg = d3.create('svg')
        .attr('width',size)
        .attr('height',size)
        .attr('viewBox',[-size/2,-size/2,size,size])
  }
}

function createSymbol(){
  let {width,height,customSymbol,size} = props
  if(!symbol){
    symbol = svg.append('path')
        .attr('d',customSymbol.size(size)())
        .attr('stroke','#57466e')
        .attr('stroke-width','2')
        .attr('fill','#fff693')

  }
}
onMounted(()=>{
  createSvg()
  createSymbol()
  symbolRef.value.append(svg.node())
})

</script>

<template>
  <div ref="symbolRef" class="symbol"></div>
</template>

<style scoped lang="scss">

</style>