<script setup>
import "@/assets/styles/lottery.scss";
import "@/assets/styles/animate.min.css";
import {initAll} from "@/views/demos/lottery/js/index.js";
// import {initAll} from "@/views/demos/lottery/js/lottery.js";
import {initCanvas} from '@/views/demos/lottery/js/canvas.js'
import {onMounted,onBeforeUnmount} from "vue";
onMounted(()=>{
  document.body.style.overflow = ' hidden'
  initCanvas() // 初始化canvas
  initAll() // 初始化页面
})
onBeforeUnmount(()=>{
  document.body.style.overflow = ' visible'
  document.getElementById('container').innerHTML = ''
})
</script>

<template>
  <div class="wrap">
    <div class="canvas-box">
      <canvas id="canvas">你的浏览器不支持canvas</canvas>
    </div>
    <div id="prizeBar"></div>
    <div id="container"></div>

    <div id="menu">
      <button id="enter">进入抽奖</button>
      <div id="lotteryBar" class="none">
        <button id="lottery">开始抽奖</button>
        <button id="reLottery">重新抽奖</button>
        <div class="fixed-bar">
          <button id="save" class="fixed-btn">导出抽奖结果</button>
          <button id="reset" class="fixed-btn">重置</button>
        </div>
      </div>
    </div>

    <div class="qipao-container"></div>
  </div>
</template>

<style scoped lang="scss">
</style>