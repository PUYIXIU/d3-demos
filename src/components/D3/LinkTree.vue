<script setup>
import * as d3 from 'd3'
import {onMounted, ref, watch} from "@vue/runtime-core";

const wrap = ref()
const props = defineProps({
  width:{type:Number, default:500},
  height:{type:Number,default:300},
  data:{type:Object,default:{name:'root',children:[]}},
  curve:{type:String,default:'curveBumpY'},
  options:{type:Object,default:()=>({})}
})

watch(()=>props.options,()=>{
  initData()
  createTree()
  createNodes()
  createTitle()
},{
  deep:true
})

let height = ref(0)
let root = ref({})
let svg, branch, nodes, circle, title
let  dy
let x0 = Infinity // 最大x值
let x1 = -x0; // 最小x值

// 初始化数据
function initData(){
  let { data, curve, width, options } = props
  // 层级布局
  root.value = d3.hierarchy(data)
  // 获取某节点的所有后代
  const descendants = root.value.descendants()
  // svg宽度/层级深度*间隔大小
  dy = width/root.value.height*options.dy
  // 树形布局
  d3.tree().nodeSize([options.dx, dy])(root.value)
  root.value.each(d=>{
    if(d.x>x1) x1 = d.x
    if(d.x<x0) x0 = d.x
  })
  height.value = x1-x0+options.dx*2
}

// 创建svg
function createSvg(){
  let {width, options} = props
  if(!svg){
    svg = d3.create('svg')
  }
  svg
      .attr('width',width)
      .attr('height',height.value)
      .attr('viewBox',[-dy/2,x0-options.dx,width,height.value])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);
}

// 创建树节点之间的连线
function createTree(){
  let { data, curve, width } = props
  if(!branch){
    branch =  svg.append('g')
  }
  branch
      .attr('id','branch')
      .attr('fill','none')
      .attr('stroke','rgba(0,0,0,0.24)')
      .attr('stroke-width',1)
      .selectAll('path')
      .data(root.value.links())
      .join('path')
      .attr('d',d3.link(d3[props.options.curve])
          .x(d=>d.y)
          .y(d=>d.x))
  //     .
}

// 创建节点
function createNodes(){
  if(!nodes){
    nodes = svg.append('g')
        .selectAll('circle')
        .data(root.value.descendants())
        .join('g')
        .attr('class','label')
  }else{
    // debugger
    nodes = d3.selectAll('svg .label')
        .data(root.value.descendants())
  }
  nodes
      .attr("transform", d => `translate(${d.y},${d.x})`)
  if(!circle){
    circle = nodes.append('circle')
  }
  circle
      .attr('r',3)
      .attr('fill',d=>d.children?'rgba(0,0,0,0.66)':'rgba(0,0,0,0.25)')
}
// 创建标题
function createTitle(){
  if(!title){
    title = nodes.append('text')
  }
  title
      .text(({data})=>data.name)
      .attr("dy", "0.32em")
      .attr("x", d => d.children ? -6 : 6)
      .attr("text-anchor", d => d.children ? "end" : "start")
      .attr("paint-order", "stroke")
      .attr("stroke", '#9b9b9b')
      .attr("stroke-width", 1)
}

function initTree(){
  const root = d3.stratify().path()
  initData()
  createSvg()
  createTree()
  createNodes()
  createTitle()
  wrap.value.append(svg.node())
}

watch(
    ()=>props.data,
    ()=>{
      initTree()
    }
)

</script>

<template>
  <div class="wrap" ref="wrap">
  </div>
</template>

<style scoped lang="scss">

</style>