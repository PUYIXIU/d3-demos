<script setup>
import * as d3 from 'd3'
import {ref, onMounted, computed} from 'vue'
import ExampleLines from "@/components/D3/ExampleLines.vue";
import axios from "axios";

const mockData = ref([])
function getMock(){
  return axios.get('public/mock/aapl.json')
}

onMounted(()=>{
  getMock().then(res=>{
    mockData.value = [...res.data]
  })
})

</script>

<template>
  <div class="container">
    <div class="read-me">
      <li>line</li>
    </div>
    <ExampleLines :data="mockData"></ExampleLines>
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
    background: #eaeaea;
    padding:10px;
    line-height:30px;
  }
  .content{
    padding:5px;
  }
}
</style>