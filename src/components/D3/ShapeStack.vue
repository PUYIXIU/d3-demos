<script setup>
import * as d3 from 'd3'
import {ref,  reactive, onMounted, watch, computed} from 'vue'
import axios from "axios";
import ExampleStacks from "@/components/D3/ExampleStacks.vue";
import StackedBarChart from "@/components/D3/StackedBarChart.vue";
let stackData = ref([])
let radius = ref(130)
let stack = computed(()=>{
  return d3.stack()
      .keys(d3.union(stackData.value.map(d=>d.fruit)))
      .value(([,group],key)=>group.get(key).sales)(d3.index(stackData.value, d=>d.date, d=>d.fruit))
})
let color = computed(()=>{
  let types = Array.from(d3.union(stackData.value.map(d=>d.fruit)))
  return d3.scaleOrdinal()
      .domain(types)
      .range(d3.quantize(t=>d3.interpolateSpectral(t*0.8+0.1),types.length))
})

function getMock(){
  return axios.get('public/mock/stack.json')
}

onMounted(()=>{
  getMock().then(res=>{
    stackData.value = res.data
  })
})


</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>stacks与area的关系：stacks用于生成数据，area用于创建图形 </li>
      <li>stack() 创建堆栈图生成器</li>
      <li>stack(data, ...arguments) 将data转换为绘制堆栈图需要的数据格式</li>
      <li>stack.keys(keys) 指定key存取器</li>
      <li>stack.value(value) 指定value存取器</li>
      <li>stack.order(order) 指定order存取器</li>
      <li>stack.offset(offset) 指定offset存取器</li>
    </div>
    <ExampleStacks
        :data="stackData"
        :stack="stack"
        :color="color"
    ></ExampleStacks>
    <StackedBarChart></StackedBarChart>
  </div>
</template>

<style scoped lang="scss">
.container{
  width: 100%;
  padding-top:10px;
  width:fit-content;
  background: white;
  .read-me{
    margin:10px;
    background:#eaeaea;
    padding:10px;
    line-height:30px;
  }
  .content{
    padding:5px;
  }
}
</style>