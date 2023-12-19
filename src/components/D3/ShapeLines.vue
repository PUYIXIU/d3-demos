<script setup>
import * as d3 from 'd3'
import {ref, onMounted, computed} from 'vue'
import ExampleLines from "@/components/D3/ExampleLines.vue";
import axios from "axios";
import ExampleAreas from "@/components/D3/ExampleAreas.vue";

const mockData = ref([])
const dataRange = ref([0,100])
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
const mockRangeData = computed(()=>mockData.value.slice(dataRange.value[0],dataRange.value[1]))
function getMock(){
  return axios.get('public/mock/aapl.json')
}

onMounted(()=>{
  getMock().then(res=>{
    mockData.value = [...res.data]
  })
})

</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>line(x, y) 指定一条直线的x、y存取器函数</li>
      <li>line(data) 提供数据，生成路径</li>
      <li>line.x(x) 指定x存取器函数</li>
      <li>line.y(y) 指定y存取器函数</li>
      <li>line.defined(defined) 添加过滤器</li>
      <li>line.curve(curve) 曲线化</li>
    </div>
    <ExampleLines :data="mockData"></ExampleLines>
    <ExampleLines :data="mockData" :define="d=>new Date(d.date).getUTCMonth()>3"></ExampleLines>
    <ExampleAreas :data="mockData" :y0="y0" :define="d=>new Date(d.date).getFullYear()%2 == 0" :hasBase="true"></ExampleAreas>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Range</span>
      <el-slider v-model="dataRange" range :min="0" :max="Math.max(mockData.length,100)"></el-slider>
    </div>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Curve</span>
      <el-select v-model="curve">
        <el-option v-for="option in curveOptions" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </div>
    <ExampleLines :data="mockRangeData" :curve="curve"></ExampleLines>
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