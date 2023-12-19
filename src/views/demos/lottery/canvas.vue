<script setup>
import {onMounted, ref, watch} from "@vue/runtime-core";

const canvasRef = ref()
var numStarts = ref(800); // 星点总数量
var warp = ref(false); // 是否在绘制每一帧之前都清空画布
var animate = ref(true);
var focalLength = ref(0)
let canvas, c  //画布dom 上下文 焦距
var centerX, centerY; // 中心坐标
var stars = [], star; // 星点存储数组

function initCanvas(){
  canvas = canvasRef.value
  c = canvas.getContext('2d')
   // 焦距是画布宽度的两倍
  focalLength.value = canvas.width * 2;
}

function resizeCanavs(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight
}

// 初始化星点
function initializeStars(){
  centerX = canvas.width/2;
  centerY = canvas.height/2;
  stars = [];
  for(let i=0; i<numStarts.value; i++){
    star = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * canvas.width , // 放在幕前，方便向后推进
      o: "0." + Math.floor(Math.random() * 99) + 1 // 0.001-0.991之间随机数 用于生成随机透明度
    };
    stars.push(star)
  }
}

// 执行动画
function executeFrame(){
  if(animate.value){
    requestAnimationFrame(executeFrame)
  }
  moveStars()
  drawStars()
}

// 计算星点位置（顺着z轴负方向循环）
function moveStars(){
  for(let i=0;i<numStarts.value;i++){
    star = stars[i];
    star.z--;
    if(star.z <=0){
      star.z = canvas.width
    }
  }
}
// 绘制星点
function drawStars(){
  var pixelX, pixelY, pixelRadius; // 星点坐标
  // 重新生成位置
  if(canvas.width != window.innerWidth || canvas.height !== window.innerHeight){
    resizeCanavs()
    initializeStars()
  }
  // 覆盖新的背景色 用于清空轨迹
  if(!warp.value){
    c.fillStyle="rgba(0,10,20,1)";
    c.fillRect(0,0,canvas.width,canvas.height);
  }
  // 绘制第一颗星的颜色
  c.fillStyle=`rgba(209,255,255,${`0.${Math.floor(Math.random()*99)}1`})`
  for(let i=0;i<numStarts.value;i++){
    star = stars[i];
    /**
     * 焦距：靠近中心店的距离
     * abs(焦距)↑ 尺寸↑ 边缘化
     * 100*(1/7-1/6) 10*(1/7-1/6)
     * x和y越大（靠近边缘） 移动速度越快
     *
     * pixelX = (点坐标x - 中心点x) * (焦距/点坐标z)
     *
     */
    pixelX = (star.x - centerX) * (focalLength.value/star.z);
    pixelX += centerX;
    pixelY = (star.y - centerY) * (focalLength.value/star.z);
    pixelY += centerY;
    pixelRadius = 1 * (focalLength.value / star.z);
    c.fillRect(pixelX,pixelY, pixelRadius, pixelRadius);
    c.fillStyle = `rgba(209,255,255,${star.o})`;
  }
}

watch(animate,(newVal, oldVal)=>{
  if(newVal){
    requestAnimationFrame(executeFrame)
  }
})

watch(numStarts, (newVal, oldVal)=>{
  initializeStars()
  if(!animate.value) executeFrame()
})

watch(focalLength,(newVal,oldVal)=>{
  if(!animate.value) executeFrame()
})


onMounted(()=>{
  initCanvas()
  initializeStars()
  executeFrame()
  window.onresize = resizeCanavs
})

</script>

<template>
  <div class="wrap">
    <div class="controller">
      <div class="item">
        <span>星点数量</span>
        <el-slider size="small" v-model="numStarts" :min="0" :max="1600" style="background:transparent"></el-slider>
      </div>
      <div class="item">
        <span>焦距</span>
        <el-slider size="small" v-model="focalLength"  :min="-2000" :max="2000" style="background:transparent"></el-slider>
      </div>
      <div class="item">
        <span>显示轨迹</span>
        <el-switch size="small" v-model="warp" :active-value="true" :inactive-value="false" style="background:transparent"></el-switch>
      </div>
      <div class="item">
        <span>动画</span>
        <el-switch size="small" v-model="animate" :active-value="true" :inactive-value="false" style="background:transparent"></el-switch>
      </div>
    </div>
    <canvas id="canvas" ref="canvasRef"></canvas>
  </div>
</template>

<style scoped lang="scss">
.wrap{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  //background: #0a0d16;
  canvas{
    width: 100%;
    height:100%;
  }
  .controller{
    position:absolute;
    top:16px;
    left:16px;
    padding:16px;
    background: rgba(145, 241, 213, 0.22);
    .item{
      display: flex;
      width: 300px;
      font-size: 12px;
      line-height: 25px;
      color: rgba(57, 215, 208, 0.53);
      font-weight: bold;
      span{
        text-wrap: nowrap;
        margin-right:10px;
      }
      ::v-deep(.el-slider__bar){
        background-color: rgba(16, 65, 63, 0.53) !important;
      }
      ::v-deep(.el-switch.is-checked .el-switch__core){
        background-color: rgb(87 193 188 / 53%) !important
      }
    }
  }
}

</style>