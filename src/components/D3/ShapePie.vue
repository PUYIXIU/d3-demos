<script setup>
import * as d3 from 'd3'
import {ref,  reactive, onMounted, watch, computed} from 'vue'
import axios from "axios";
import ExamplePie from "@/components/D3/ExamplePie.vue";

let mockData = ref([])
let radius = ref(80)
function getMock(){
  return axios.get('public/mock/PieData.json')
}

onMounted(()=>{
  getMock().then(res=>{
    mockData.value = res.data
  })
})


</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>pie与arc的关系：pie用于生成数据，arc用于创建图形 </li>
      <li>pie() 创建饼图生成器</li>
      <li>pie(data) 将data转换为绘制饼图需要的数据格式</li>
      <li>pie.value(value) 指定value存取器</li>
      <li>pie.sort(compare) 指定数据排序比较方法</li>
      <li>pie.sortValue(compare) 根据value指定的数据进行排序比较的方法</li>
      <li>pie.startAngle(angle) 指定起始角度</li>
      <li>pie.endAngle(angle) 指定终止角度</li>
      <li>pie.padAngle(angle) 指定间隔角度</li>
    </div>
    <ExamplePie
      :data="mockData"
      :arc="d3.arc().innerRadius(radius*0.67)"
      :pie="d3.pie().padAngle(1/radius).value(d=>d.value)"
    ></ExamplePie>
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