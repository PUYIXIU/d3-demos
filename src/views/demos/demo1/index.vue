<template>
  <div class="page">
    <div class="row flex-row" style="height:300px;">
      <div class="cell" >
        <CirclePie :id="'chart1'"></CirclePie>
      </div>
      <div class="cell" >
        <Bar :id="'chart2'"></Bar>
      </div>
      <div class="cell">
        <Line :id="'chart3'"></Line>
      </div>
    </div>
    <div class="row flex-row" style="height:300px;">
      <div class="cell" >
        <CircleTab></CircleTab>
      </div>
      <div class="cell" >
        <Bar :id="'chart5'"></Bar>
      </div>
      <div class="cell">
        <Line :id="'chart6'"></Line>
      </div>
    </div>
  </div>
</template>


<script setup>
// import CirclePie from "@/components/Charts/Pie/CirclePie"

import {onMounted} from "@vue/runtime-core";



onMounted(()=>{
})
</script>

<style scoped lang="scss">
// 3840 1080
.page{
  width: 100%;
  height:100vh;
  overflow: hidden;
  background: #26252f;
}
.row{
  width: 100%;
  background-color: palevioletred;
  .cell{
    flex:1;
    height:100%;
    background-color: #000;
    &:nth-child(2n){
      background-color: #131314;
    }
  }
  &:nth-child(2n){
    .cell{
      background-color: #131314;
      &:nth-child(2n){
        background-color: #000;
      }
    }
  }
}

</style>
