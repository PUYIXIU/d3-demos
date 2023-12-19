<template>
  <div class="content">
    <ul class="list">
      <li @click="router.push('/demos/demo1')">
        <div class="title">demo1 徐矿大屏组件</div>
        <img width="100%" src="@/assets/images/screenShot1.png" alt="">
      </li>
      <li @click="router.push('/demos/demo2')">
        <div class="title">demo2 D3</div>
        <img width="100%" src="" alt="">
      </li>
      <li @click.stop="router.push('/demos/demo3')">
        <div class="title" >demo3 Lottery</div>
        <div class="sub-model"  @click.stop="router.push('/demos/demo3/canvas')">canvas背景</div>
        <div class="sub-model">threejs+tween</div>
        <img width="100%" src="" alt="">
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<style scoped lang="scss">
.content{
  background: #000;
  height: 100vh;
  width:100%;
  overflow: hidden;
}
.list{
  margin:0px auto;
  width: 50%;
  li{
    cursor: pointer;
    background: #131314;
    min-width: 500px;
    width: 100%;
    border:1px solid #ff8a0f;
    list-style: none;
    margin-top:10px;
    padding:16px;
    &:hover{
      background: #341010;
    }
    .title{
      font-weight: bold;
      font-size: 20px;
      line-height: 30px;
      height:30px;
      color: #ff8a0f;
      text-align: center;
    }
    .sub-model{
      color:white;
      text-align: center;
      font-size:14px;
      padding: 3px 10px;
      border:1px solid #cccccc;
      margin:5px;
      &:hover{
        background: rgba(0, 0, 0, 0.4);
      }
    }
  }
}
</style>
