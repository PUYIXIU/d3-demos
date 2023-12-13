<script setup>
import {computed} from "vue";
import {ref} from 'vue'
const rz = ref(16)
const rotateZ = computed(()=>`rotateZ(${rz.value}deg)`)

const textMenuRotate = (e)=>{
  const current = e.currentTarget
  if(Array.from(e.currentTarget.classList).includes('active-item')){ return }
  const item_list = Array.from(document.getElementsByClassName('tab-item'))
  const active_item = document.getElementsByClassName('active-item')[0]
  const cur_index = item_list.findIndex(i=>i == current)
  const act_index = item_list.findIndex(i=>i == active_item)
  const len = item_list.length
  // debugger
  console.log(act_index - cur_index)
  let split = act_index-cur_index
  if(split>4){split-=len}
  if(split<-4){split+=len}
  rz.value+=45 * split
  current.classList.add('active-item')
  active_item.classList.remove('active-item')
}

</script>

<template>
  <div class="content"  ref="textMenu">
    <svg width="100%" height="100%" viewBox="-50 -100 100 100">
      <defs>

        <linearGradient id="gradient1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#3486FF"  />
          <stop offset="25%" stop-color="#116FFD" stop-opacity="0" />
          <stop offset="50%" stop-color="transparent" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffffff55"  />
          <stop offset="25%" stop-color="#fff" stop-opacity="0" />
          <stop offset="50%" stop-color="transparent" />
        </linearGradient>
        <linearGradient id="gradient3" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#ffffff44"  />
          <stop offset="10%" stop-color="#ffffff22"  />
          <stop offset="100%" stop-color="transparent" />
        </linearGradient>
        <linearGradient id="gradient4" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stop-color="#307BEC"  />
          <stop offset="100%" stop-color="#000" stop-opacity="0.5" />
        </linearGradient>
        <filter id="shadow2">
          <feDropShadow dx="0" dy="0" stdDeviation="1" flood-color="cyan" />
        </filter>
      </defs>
      <path id="circle" d="M -50 -20 A 50 50 0 1 1 -50 -19.999" stroke="transparent" stroke-width="1" fill="none" transform="scale(0.96)"></path>
      <path d="M -50 -20 A 50 50 0 1 1 -50 -19.999" stroke="#0E174977" stroke-width="22" fill="none" style="filter:blur(1.5px)"></path>
      <path d="M -50 -20 A 50 50 0 1 1 -50 -19.999" stroke="url(#gradient1)" stroke-width="1" transform-origin="0 -20" fill="none" transform="scale(1.2)"></path>
      <path d="M -12 -68.5 A 50 50 0 0 1 15 -67.8" stroke="#fff" stroke-width="1.1"  transform-origin="0 -20" fill="none" transform="scale(1.2)" style="filter:brightness(5)"></path>
      <path d="M -12 -68.5 A 50 50 0 0 1 15 -67.8" stroke="#fff" stroke-width="1.1"  transform-origin="0 -20" fill="none" transform="scale(1.2)" style="filter:blur(1.5px)"></path>
      <path d="M -50 -20 A 50 50 0 1 1 -50 -19.999" stroke="url(#gradient2)" stroke-dasharray="3,2" stroke-width="1"  transform-origin="0 -20" fill="none" transform="scale(0.77)"></path>
      <path d="M -50 -20 A 50 50 0 1 1 -50 -19.999"   transform-origin="0 -20" fill="url(#gradient3)" transform="scale(0.77)"></path>
      <text font-size="6" font-weight="bold" fill="#fff" transform-origin="0 -20" id="text-path" :style="{
        transform:rotateZ
      }">
        <textPath href="#circle" side="right">
          <tspan dx="13.7" @click="textMenuRotate" class="tab-item">业务功能</tspan>
          <tspan dx="13.7" @click="textMenuRotate" class="tab-item active-item">教培体系</tspan>
          <tspan dx="13.7" @click="textMenuRotate" class="tab-item">系统功能</tspan>
          <tspan dx="13.7" @click="textMenuRotate" class="tab-item">业务功能</tspan>
          <tspan dx="13.7" @click="textMenuRotate" class="tab-item">教培体系</tspan>
          <tspan dx="13.7" @click="textMenuRotate" class="tab-item">系统功能</tspan>
          <tspan dx="13.7" @click="textMenuRotate" class="tab-item">业务功能</tspan>
          <tspan dx="13.7" @click="textMenuRotate" class="tab-item">教培体系</tspan>
        </textPath>
      </text>
      <g style="filter:blur(1px)">
        <polygon points=" -8,-53 0,-62 8,-53 3.5,-54 3.5,-56 0,-60 -3.5,-56 -3.5,-54" fill="#307BEC" ></polygon>
        <polygon points=" -2,-53 0 -45 2,-53 0,-50" fill="#307BEC"></polygon>
        <polygon points=" -2,-56 0 -58 2,-56 0,-54" fill="#307BEC" class="square" transform="translate(0,10) scale(0.9)"></polygon>
        <polygon points=" -2,-56 0 -58 2,-56 0,-54" fill="#307BEC" class="square" transform="translate(0,5) scale(0.7)"></polygon>
      </g>
      <g>
        <polygon points=" -8,-53 0,-62 8,-53 3.5,-54 3.5,-56 0,-60 -3.5,-56 -3.5,-54" fill="#fff"></polygon>
        <polygon points=" -2,-53 0 -45 2,-53 0,-50" fill="#fff"></polygon>
        <polygon points=" -2,-56 0 -58 2,-56 0,-54" fill="#fff" class="square" transform="translate(0,10) scale(0.9)"></polygon>
        <polygon points=" -2,-56 0 -58 2,-56 0,-54" fill="#fff" class="square" transform="translate(0,5) scale(0.7)"></polygon>
      </g>
      <polygon points=" -2,-56 0 -58 2,-56 0,-54" stroke-width="0.1" stroke="#ffffffaa" fill="url(#gradient4)" class="square"></polygon>
    </svg>
  </div>
</template>



<style scoped lang="scss">
.content{
  background-color: #1a1f34;
  height:100%;
  width:100%;
}
#text-path{
  transform: rotateZ(16deg);
  transition: 0.3s ease-in-out transform;
  .tab-item{
    cursor: pointer;
    user-select: none;
  }
}
.active-bar{
  box-shadow: #fff 0px 0px 10px;
}
//@keyframes rotate_z {
//  0%{
//    transform: rotateZ(20deg);
//  }
//  100%{
//    transform: rotateZ(380deg);
//  }
//}
</style>
