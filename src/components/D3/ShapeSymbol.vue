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
      <li>symbol() 创建符号生成器</li>
      <li>symbol.type() 指定符号类型 默认圆圈</li>
      <li>symbol.size() 指定符号尺寸 默认64</li>
      <li>d3.pointRadial(angle, radius) 根据弧度角和半径获取坐标值</li>
    </div>
    <div class="symbol-content">
      <d3-symbol :type="'symbolAsterisk'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolCircle'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolCross'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolDiamond'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolDiamond2'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolPlus'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolSquare'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolSquare2'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolStar'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolTriangle'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolTriangle2'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolWye'" :size="30" ></d3-symbol>
      <d3-symbol :type="'symbolTimes'" :size="30" ></d3-symbol>
    </div>
    <div class="symbol-content">
      <custom-symbol :customSymbol="d3.symbol().type(customSymbolType)" :size="30"></custom-symbol>
      <custom-symbol :customSymbol="d3.symbol().type(customSymbolType)" :size="50"></custom-symbol>
      <custom-symbol :customSymbol="d3.symbol().type(customSymbolType)" :size="30"></custom-symbol>
      <custom-symbol :customSymbol="d3.symbol().type(customSymbolType)" :size="50"></custom-symbol>
      <custom-symbol :customSymbol="d3.symbol().type(customSymbolType)" :size="30"></custom-symbol>
      <custom-symbol :customSymbol="d3.symbol().type(customSymbolType)" :size="50"></custom-symbol>
      <custom-symbol :customSymbol="d3.symbol().type(customSymbolType)" :size="30"></custom-symbol>
    </div>
    <FittedSymbols></FittedSymbols>
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