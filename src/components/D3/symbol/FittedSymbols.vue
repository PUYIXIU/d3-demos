<script setup>
import * as d3 from 'd3'
import {ref, onMounted} from 'vue'

let svg, symbolG
let width = 300, height = 300
let SNOW_NUMBER = 100
let snowArr = []
const wrapRef = ref()
function createSymbol(){
  if(!symbolG){
    symbolG = svg.append('g')
        .attr('id','snow-g')
        .selectAll('path')
        .data(snowArr)
        .join('path')
        .attr('class','snow-flack')
        .attr('d',d=>d.d)
        .attr('fill-opacity',d=>d.opacity)
        .attr('transform',d=>`translate(${d.position[0]-width/2},${d.position[1]-height/2})`)
        .attr('fill','#ffffff')
  }else{
    symbolG =  d3.select('#snow-g')
        .data(snowArr)
        .selectAll('path')
        .attr('class','snow-flack')
        .attr('d',d=>d.d)
        .attr('fill-opacity',d=>d.opacity)
        .attr('transform',d=>`translate(${d.position[0]-width/2},${d.position[1]-height/2})`)
        .attr('fill','#ffffff')
  }
}

function initSvg(){
  if(!svg){
    svg = d3.create('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox',[-width/2,-height/2,width,height])
    svg.append('rect')
        .attr('fill','#224450')
        .attr('x',-width/2)
        .attr('y',-height/2)
        .attr('width',width)
        .attr('height',height)
  }
}

function initPosition(){
  snowArr = []
  for(let i = 0; i<SNOW_NUMBER;i++){
    let singleSnow = {
      position:[width*Math.random(), height*Math.random()],
      opacity:Math.random(),
      size:Math.random()*100,
    }
    singleSnow.d = d3.symbol().type(d3.symbolCircle).size(singleSnow.size)()
    singleSnow.speed = Math.min(Math.random()*singleSnow.size/100, 10)
    snowArr.push(singleSnow)
  }
}

function updatePosition(){
  for(let i = 0 ;i <snowArr.length;i++){
    snowArr[i].position[1]+=snowArr[i].speed
    if(snowArr[i].position[1]>=height){
      snowArr[i].position[1] = -height/2
    }
  }
}

function animate(){
  updatePosition()
  createSymbol()
}

onMounted(()=>{
  initPosition()
  initSvg()
  createSymbol()
  setInterval(()=>{
    animate()
  },1)
  wrapRef.value.append(svg.node())
})

</script>

<template>
  <div class="wrap" ref="wrapRef"></div>
</template>

<style lang="scss">
.wrap{
  display: flex;
  justify-content: center;
}
</style>