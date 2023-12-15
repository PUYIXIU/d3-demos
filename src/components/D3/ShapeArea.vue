<script setup>
import * as d3 from 'd3'
import {ref, onMounted} from 'vue'
import ExampleAreas from "@/components/D3/ExampleAreas.vue";
import axios from "axios";

const mockData = ref([])
const y0 = ref(0)
function getMock(){
  return axios.get('public/mock/aapl.json')
}

onMounted(()=>{
  getMock().then(res=>{
    mockData.value = [...res.data].map(i=>{
      i.start = i.close + 100*Math.random()
      return i
    })
  })
})

</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>area(x, y0, y1) 创建区域</li>
      <li>area(data) 向区域内注入数据</li>
      <li>area.x() 横坐标定义</li>
      <li>area.x0() 横坐标定义</li>
      <li>area.x1() 横坐标定义</li>
    </div>
    <div>
      <span>y0</span>
      <el-slider v-model="y0"></el-slider>
    </div>
    <ExampleAreas :data="mockData" :y0="y0"></ExampleAreas>
    <ExampleAreas :data="mockData" :transpose="true"></ExampleAreas>
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
    background: #eaeaea;
    padding:10px;
    line-height:30px;
  }
  .content{
    padding:5px;
  }
}
</style>