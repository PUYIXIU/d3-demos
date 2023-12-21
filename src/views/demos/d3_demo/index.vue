<script setup>
import Axis from '@/components/D3/Aixs.vue'
import SvgAxis from "@/components/D3/SvgAxis.vue";
import Chord from "@/components/D3/Chord.vue";
import ShapeLines from "@/components/D3/ShapeLines.vue";

import {onMounted} from "@vue/runtime-core";
import ShapeSymbol from "@/components/D3/ShapeSymbol.vue";
import ShapeRadialAreas from "@/components/D3/ShapeRadialAreas.vue";

onMounted(()=>{
  let {scrollHeight} = document.body;
  window.scrollTo(0,scrollHeight)
})
</script>

<template>
  <div class="page">
    <div class="nav-cell">
      <div class="leaf-content content-1"></div>
      <div class="content-2">
        <div class="content-2-1">
          <div class="leaf-content content-2-1-1"></div>
          <div class="leaf-content content-2-1-2"></div>
        </div>
        <div class="content-2-2">
          <div class="leaf-content content-2-2-1"></div>
          <div class="leaf-content content-2-2-2"></div>
        </div>
      </div>
    </div>
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
    <div class="cell" >
      <div class="title">2.4.d3-shape-links</div>
      <ShapeLinks></ShapeLinks>
    </div>
    <div class="cell" >
      <div class="title">2.5.d3-shape-pie</div>
      <ShapePie></ShapePie>
    </div>
    <div class="cell" >
      <div class="title">2.6.d3-shape-stacks</div>
      <ShapeStack></ShapeStack>
    </div>
    <div class="cell" >
      <div class="title">2.7.d3-shape-symbol</div>
      <ShapeSymbol></ShapeSymbol>
    </div>
    <div class="cell" >
      <div class="title">2.8.d3-shape-RadialAreas</div>
      <ShapeRadialAreas></ShapeRadialAreas>
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
.nav-cell{
  width:90%;
  height:250px;
  margin:10px auto;
  display: flex;
  .leaf-content{
    cursor:pointer;
    transform-origin: center;
    transition:all 0.3s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px;
    &:hover{
      transform: scale(1.2);
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px
    }
  }
  .content-1{
    background: #c4ffdf;
    width: 30%;
  }
  .content-2{
    background: #ffd6d6;
    width: 70%;
    .content-2-1{
      height:45%;
      width: 100%;
      background: #cde8fa;
      display: flex;
      .content-2-1-1{
        height:100%;
        width:45%;
        background: #ffedd5;
      }
      .content-2-1-2{
        height:100%;
        width:55%;
        background: #ffd9d5;
      }
    }
    .content-2-2{
      height:55%;
      width: 100%;
      background: #f4cdfa;
      display: flex;
      .content-2-2-1{
        height:100%;
        width:55%;
        background: #d5feff;
      }
      .content-2-2-2{
        height:100%;
        width:45%;
        background: #e0d5ff;
      }
    }
  }
}
</style>