<script setup>
import * as d3 from 'd3'
import {defineProps, ref, onMounted, onUpdated} from 'vue'
const props = defineProps({
  width:{type:Number, default:860},
  height:{type:Number, default:250},
  axisConfig:{type:Array, default:[
      {axis:d3.axisTop(d3.scaleLinear([0,100],[0,800])), x:30, y:20},
      {axis:d3.axisRight(d3.scaleLinear([0,100],[0,200])), x:830, y:20},
      {axis:d3.axisBottom(d3.scaleLinear([0,100],[0,800])), x:30, y:220},
      {axis:d3.axisLeft(d3.scaleLinear([0,100],[0,200])), x:30, y:20},
    ]}
})
const axisList = ref([])
const svg = ref()

onMounted(()=>{
  axisList.value = props.axisConfig.map(config=>{
    // svg中动态添加元素时，需要使用createElementNS
    let g = document.createElementNS('http://www.w3.org/2000/svg','g')
    g.setAttribute('transform',`translate(${config.x},${config.y})`)
    d3.select(g).call(config.axis)
    svg.value.append(g)
  })
})

</script>

<template>
  <div style="margin:20px;" >
    <svg :width="width" :height="height" :viewBox="[0, 0, width, height].join(' ')" style="max-width:100%;height:auto" ref="svg">
    </svg>
  </div>
</template>

<style scoped lang="scss">

</style>