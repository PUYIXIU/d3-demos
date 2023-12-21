<script setup>
import * as d3 from 'd3'
import {ref,  reactive, onMounted, watch, computed} from 'vue'
import axios from "axios";
import D3Symbol from "@/components/D3/symbol/D3Symbol.vue";
import CustomSymbol from "@/components/D3/symbol/CustomSymbol.vue";
import FittedSymbols from "@/components/D3/symbol/FittedSymbols.vue";

// 自定义symbol包含draw方法
const customSymbolType = {
  draw:function (context, size){
    context.moveTo(size/8, -size/2)
    context.lineTo(-size/4, size/15 )
    context.lineTo(0, size/15 )
    context.lineTo(-size/8, size/2 )
    context.lineTo(size/4, -size/15 )
    context.lineTo(0, -size/15  )
    context.lineTo(size/8, -size/2 )
  }
}

</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>areaRadial() 创建放射区域生成器</li>
      <li>areaRadial(data) 数据转换</li>
      <li>areaRadial.angle(angle) 定义角度存取器</li>
      <li>areaRadial.startAngle(angle) 定义起始角度存取器</li>
      <li>areaRadial.endAngle(angle) 定义结束角度存取器</li>
      <li>areaRadial.radius(radius) 定义半径存取器</li>
      <li>areaRadial.innerRadius(radius) 定义内径存取器</li>
      <li>areaRadial.outerRadius(radius) 定义外径存取器</li>
      <li>areaRadial.defined(defined) 数据过滤器</li>
      <li>areaRadial.curve(curve) 曲度</li>
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
    background:#eaeaea;
    padding:10px;
    line-height:30px;
  }
  .content{
    padding:5px;
  }
  .symbol-content{
    display:flex;
    width:100%;
    justify-content: space-around;
  }
}
</style>