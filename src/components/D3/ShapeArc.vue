<script setup>
  import ExmapleArcs from "@/components/D3/ExmapleArcs.vue";
  import Arc from '@/components/D3/Arc.vue'
  import * as d3 from 'd3'
  import {ref} from 'vue'
  const width = ref(500)
  const height = ref(500)
  const cornerRadius = ref(20)
  const padAngle = ref(0.03)
  const padRadius = ref(200)
  const startAngle = ref(0)
  const endAngle = ref(Math.PI)
  const innerRadius = ref(20)
  const outerRadius = ref(50)
  const rotate = ref(0)
  setInterval(()=>{
    rotate.value+=1
  },1)
</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>arc 创建弧形</li>
      <li>centroid 获取到圆弧中心坐标</li>
      <li>innerRadius 内半径</li>
      <li>outerRadius 外半径</li>
      <li>cornerRadius 圆角半径 [0, (outerRadius - innerRadius)/2]</li>
      <li>startAngle 弧形开始角度</li>
      <li>endAngle 弧形结束角度</li>
      <li>padAngle 切块间隔角度</li>
      <li>padRadius 切块圆角</li>
    </div>
    <Arc :arc="d3.arc()({
        innerRadius: 100/5,
        outerRadius: 100/4,
        startAngle: 0,
        endAngle: -Math.PI *3 /2
    })" :width="100" :height="100" :fill="'#1581ff'" :transform="`rotate(${rotate})`"></Arc>
    <!--  链式写法  -->
    <Arc :arc="d3.arc().innerRadius(20).outerRadius(50).startAngle(Math.PI * 3/2).endAngle(0)" :width="100" :height="100" :fill="'#ff1567'" :transform="`rotate(${rotate})`"></Arc>
    <div class="content">
      <div style="display: flex;padding:5px 20px;">
        <span style="text-wrap: nowrap;margin-right: 20px">Corner Radius</span>
        <el-slider v-model="cornerRadius" :min="0" :max="100" size="small"></el-slider>
      </div>
      <div style="display: flex;padding:5px 20px;">
        <span style="text-wrap: nowrap;margin-right: 20px">Pad Radius</span>
        <el-slider v-model="padRadius" :min="0" :max="100" size="small"></el-slider>
      </div>
      <div style="display: flex;padding:5px 20px;">
        <span style="text-wrap: nowrap;margin-right: 20px">Pad Angle</span>
        <el-slider v-model="padAngle" :min="0" :max="0.5" size="small" step="0.01"></el-slider>
      </div>
      <ExmapleArcs :corner-radius="cornerRadius" :pad-angle="padAngle" :pad-radius="padRadius"></ExmapleArcs>
    </div>
    <div class="content">
      <div style="display: flex;padding:5px 20px;">
        <span style="text-wrap: nowrap;margin-right: 20px">Start Angle</span>
        <el-slider v-model="startAngle" :min="-Math.PI*2" :max="Math.PI*2" size="small" step="0.01"></el-slider>
      </div>
      <div style="display: flex;padding:5px 20px;">
        <span style="text-wrap: nowrap;margin-right: 20px">End Angle</span>
        <el-slider v-model="endAngle" :min="-Math.PI*2" :max="Math.PI*2" size="small" step="0.01"></el-slider>
      </div>
      <div style="display: flex;padding:5px 20px;">
        <span style="text-wrap: nowrap;margin-right: 20px">Inner Radius</span>
        <el-slider v-model="innerRadius" :min="0" :max="100" size="small" step="1"></el-slider>
      </div>
      <div style="display: flex;padding:5px 20px;">
        <span style="text-wrap: nowrap;margin-right: 20px">Outer Radius</span>
        <el-slider v-model="outerRadius" :min="0" :max="100" size="small" step="1"></el-slider>
      </div>
      <Arc :arc="d3.arc().innerRadius(innerRadius).outerRadius(outerRadius).startAngle(startAngle).endAngle(endAngle)" :width="100" :height="100" :fill="'#72ab7b'"></Arc>
    </div>
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
    //width: 900px;
    padding:5px;
  }
}
</style>