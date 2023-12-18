<script setup>
import Axis from '@/components/D3/Aixs.vue'
import SvgAxis from "@/components/D3/SvgAxis.vue";
import Chord from "@/components/D3/Chord.vue";
</script>

<template>
  <div class="page">
    <div class="cell" >
      <div class="title">0.引入D3</div>
      <Axis :id="'axis'" class="chart"></Axis>
    </div>
    <div class="cell" >
      <div class="title">1.d3-axis</div>
      <SvgAxis></SvgAxis>
    </div>
    <div class="cell" >
      <div class="title">2.1.d3-shape-arc</div>
      <ShapeArc></ShapeArc>
    </div>
    <div class="cell" >
      <div class="title">2.2.d3-shape-areas</div>
      <ShapeArea></ShapeArea>
    </div>
    <div class="cell" >
      <div class="title">2.3.d3-shape-lines</div>
      <ShapeLines></ShapeLines>
    </div>
<!--    <div class="cell" >-->
<!--      <div class="title">2.d3-chord</div>-->
<!--      <Chord></Chord>-->
<!--    </div>-->
<!--    <div class="cell" >-->
<!--      <div class="title">3.d3-color</div>-->
<!--      <Color></Color>-->
<!--    </div>-->
  </div>
</template>


<style scoped lang="scss">
.page{
  width: 100%;
  height: fit-content;
}
.cell{
  border:1px solid #000;
  width:fit-content;
  margin:10px auto;
  padding:10px;
  box-shadow: rgba(10, 13, 22, 0.2) 0px 5px 10px;
  background: #949494;
  .title{
    text-align: center;
    color:white;
    height:30px;
    line-height: 30px;
    font-weight: bold;
    border-bottom: 1px solid #545454;
    margin-bottom: 10px;
  }
  .chart{
    background: #fff;
  }
}

</style>