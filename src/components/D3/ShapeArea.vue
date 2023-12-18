<script setup>
import * as d3 from 'd3'
import {ref, onMounted, computed} from 'vue'
import ExampleAreas from "@/components/D3/ExampleAreas.vue";
import axios from "axios";

const mockData = ref([])
const y0 = ref(0)
const dataRange = ref([0,20])
const mockRangeData = computed(()=>mockData.value.slice(dataRange.value[0],dataRange.value[1]))
const curve = ref('curveLinear')

const curveOptions = ref([
  {label:'curveBasis',value:'curveBasis'},
  {label:'curveLinear',value:'curveLinear'},
  {label:'curveLinearClosed',value:'curveLinearClosed'},
  {label:'curveStep',value:'curveStep'},
  {label:'curveStepAfter',value:'curveStepAfter'},
  {label:'curveStepBefore',value:'curveStepBefore'},
  {label:'curveBasisClosed',value:'curveBasisClosed'},
  {label:'curveBasisOpen',value:'curveBasisOpen'},
  {label:'curveBumpX',value:'curveBumpX'},
  {label:'curveBumpY',value:'curveBumpY'},
  // {label:'curveBundle',value:'curveBundle'},
  {label:'curveCardinal',value:'curveCardinal'},
  {label:'curveCardinalClosed',value:'curveCardinalClosed'},
  {label:'curveCardinalOpen',value:'curveCardinalOpen'},
  {label:'curveCatmullRom',value:'curveCatmullRom'},
  {label:'curveCatmullRomClosed',value:'curveCatmullRomClosed'},
  {label:'curveCatmullRomOpen',value:'curveCatmullRomOpen'},
  {label:'curveMonotoneX',value:'curveMonotoneX'},
  {label:'curveMonotoneY',value:'curveMonotoneY'},
  {label:'curveNatural',value:'curveNatural'},
])
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
      <li>area.defined() 数据过滤</li>
      <li>area.curve() 曲线</li>
    </div>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">x0/y0</span>
      <el-slider v-model="y0" :min="0" :max="600"></el-slider>
    </div>
    <ExampleAreas :data="mockData" :y0="y0"></ExampleAreas>
    <ExampleAreas :data="mockData" :transpose="true" :y0="y0" :width="400" :height="500"></ExampleAreas>
    <ExampleAreas :data="mockData" :y0="y0" :define="d=>new Date(d.date).getFullYear()%2 == 0" :hasBase="true"></ExampleAreas>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Range</span>
      <el-slider v-model="dataRange" range :min="0" :max="Math.max(mockData.length,20)"></el-slider>
    </div>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Curve</span>
      <el-select v-model="curve">
        <el-option v-for="option in curveOptions" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </div>
    <ExampleAreas :data="mockRangeData" :y0="0" :curve="curve"></ExampleAreas>
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