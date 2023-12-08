<template>
  <div class="content">
    <div class="inner">
      <div class="tab-bar flex-row">
<!--        <div class="tab-item">业务功能</div>-->
<!--        <div class="tab-item">教培体系</div>-->
<!--        <div class="tab-item">系统功能</div>-->
        <div class="tab-text">
          <svg viewBox="0 0 100 100">
            <path d="M 0 100 A 70 50 0 0 1 100 100" stroke="none" fill="none" id="circle"/>
            <text font-size="7" font-weight="bold" fill="#fff">
              <textPath xlink:href="#circle" spacing="auto">
                <tspan x="5" @click="tabToggle('left')">业务功能</tspan>
                <tspan x="40" @click="tabToggle('center')">教培体系</tspan>
                <tspan x="75" @click="tabToggle('right')">系统功能</tspan>
              </textPath>
            </text>
          </svg>
        </div>
      </div>
      <div :class="['arrow',direction]"></div>
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue'
const direction = ref('center')
function tabToggle(option){
  direction.value = option
}
</script>

<style scoped lang="scss">
.content{
  //background-color: #dae1ff;
  height:100%;
}
.inner{
  position:relative;
  height:40%;
  border: 5px solid transparent;
  border-bottom: 0px;
  overflow: hidden;

}
.tab-bar{
  position:relative;
  height:100%;
  display: flex;
  justify-content: space-around;

  .tab-item{
    color:#fff;
    font-weight: bold;
  }
  .tab-text{
    position: absolute;
    top:0;
    left:0;
    height:100%;
    width: 100%;
    overflow: hidden;
    svg{
      position:absolute;
      bottom:0;
    }
  }
}
.arrow{
  position:absolute;
  bottom:-1px;
  left:50%;
  transform: translateX(-50%);
  width:5px;
  height:25px;
  background-color: aqua;
  transform-origin: bottom;
  transition:0.3s all ease-in-out;
  &::before{
    content:"";
    display: block;
    position:absolute;
    background-color: #00ffff;
    clip-path: polygon(50% 0,100% 100%, 0 100%);
    width:10px;
    height:10px;
    top:-10px;
    left: -2.5px;
  }
  &.left{
    transform: rotateZ(-45deg);
  }
  &.center{
    transform: rotateZ(0deg);
  }
  &.right{
    transform: rotateZ(45deg);
  }
}
</style>
