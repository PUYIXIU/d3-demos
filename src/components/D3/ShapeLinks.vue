<script setup>
import * as d3 from 'd3'
import {ref,  reactive, onMounted, watch, computed} from 'vue'
import axios from "axios";
import ExampleLinks from "@/components/D3/ExampleLinks.vue";

const size = ref([500,150])
const linkData = reactive({
  xRange:[0,size.value[0]],
  yRange:[0,size.value[1]]
})
const treeOptions = reactive({
  curve:'curveBumpY',
  dx:10,
  dy:0.7
})
let treeData = ref({})
const linkSD = computed(()=>({
  source:[linkData.xRange[0],linkData.yRange[0]],
  target:[linkData.xRange[1],linkData.yRange[1]]
}))
const curve = ref('curveBumpY')
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
  return axios.get('public/mock/flare.json')
}

onMounted(()=>{
  getMock().then(res=>{
    treeData.value = res.data
  })
})


</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>link(curve) 指定曲线类型</li>
      <li>linkVertical() = link(d3.curveBumpY)</li>
      <li>linkHorizontal() = link(d3.curveBumpX)</li>
      <li>link(...arguments) 指定数据和数据存取器</li>
      <li>link.source(source) 指定link源存取器</li>
      <li>link.target(target) 指定link目标存取器</li>
      <li>link.x(x) 指定x坐标存取器</li>
      <li>link.y(y) 指定y坐标存取器</li>
    </div>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">x range</span>
      <el-slider v-model="linkData.xRange" range :min="0" :max="size[0]"></el-slider>
    </div>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">y range</span>
      <el-slider v-model="linkData.yRange"  range :min="0" :max="size[1]"></el-slider>
    </div>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Curve</span>
      <el-select v-model="curve">
        <el-option v-for="option in curveOptions" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </div>
    <ExampleLinks :width="size[0]" :height="size[1]" :links="d3.link(d3[curve])(linkSD)"></ExampleLinks>
    <ExampleLinks :width="size[0]" :height="size[1]" :links="d3.linkVertical()(linkSD)"></ExampleLinks>
    <ExampleLinks :width="size[0]" :height="size[1]" :links="d3.linkHorizontal()(linkSD)"></ExampleLinks>

    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">Curve</span>
      <el-select v-model="treeOptions.curve">
        <el-option v-for="option in curveOptions" :label="option.label" :value="option.value"></el-option>
      </el-select>
    </div>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">dx</span>
      <el-slider v-model="treeOptions.dx" :min="0" :max="30" :step="0.1"></el-slider>
    </div>
    <div style="display: flex;padding:5px 20px;">
      <span style="text-wrap: nowrap;margin-right: 20px">dy</span>
      <el-slider v-model="treeOptions.dy" :min="0" :max="2" :step="0.1"></el-slider>
    </div>
    <LinkTree :data="treeData" :options="treeOptions"></LinkTree>
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