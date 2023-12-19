<script setup>
import * as d3 from 'd3'
import {ref, onMounted, watch} from 'vue'
const props = defineProps({
  links:{},
  width:{type:Number, default:500},
  height:{type:Number,default:300},
  curve:{type:String,default:'curveBumpY'},
})

let svg, x, y, links
const marginLeft = 40,
    marginRight = 30,
    marginTop = 20,
    marginBottom = 30;

const gx = ref()
const gy = ref()
const linksPath = ref()
const svgRef = ref()

function createSvg(){
  let {width, height} = props
  d3.select(svgRef.value)
      .attr('width',width)
      .attr('height',height)
      .attr('viewBox',[0,0,width,height])
  d3.select('svg #background')
      .attr('x',0)
      .attr('y',0)
      .attr('width',width)
      .attr('height',height)
      .attr('fill','#fdd1a4')
}

function createAxis(){

}

function createLinks(){
  let {links,curve} = props
  d3.select(linksPath.value)
      .attr('fill','#c59e76')
      .attr('stroke','rgba(108,93,75,0.69)')
      .attr('stroke-width',5)
      .attr('d',links)
}

watch(
    ()=>props.links,
    ()=>{
      createLinks()
    }
)

onMounted(()=>{
  createSvg()
  createLinks()
})
</script>

<template>
  <div class="wrap">
    <svg ref="svgRef">
      <rect id="background"></rect>
      <g ref="gx"></g>
      <g ref="gy"></g>
      <path ref="linksPath"></path>
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