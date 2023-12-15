<script setup>
import * as d3 from 'd3'
import {onMounted, onUpdated, ref} from "vue";

const props = defineProps({
  width:{type:Number,default:300},
  height:{type:Number,default:300},
  tx:{type:Number,default:0},
  ty:{type:Number,default:0},
  fill:{type:String,default:'#000'},
  arc:true,
  transform:{type:String,default:''}
})
const path = ref()


onMounted(()=>{
  const arc = d3.select(path.value)
      .attr('d',props.arc)
      .attr('fill',props.fill)
})

onUpdated(()=>{
  const arc = d3.select(path.value)
      .attr('d',props.arc)
      .attr('fill',props.fill)
})

</script>

<template>
  <div class="wrap">
    <svg :width="width" :height="height" :viewBox="[-width/2, -height/2, width, height].join(' ')" style="max-width:100%;height:auto;">
      <path :transform="`translate(${tx},${ty}) ${transform}`" ref="path"></path>
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