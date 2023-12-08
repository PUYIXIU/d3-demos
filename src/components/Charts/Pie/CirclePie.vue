<template>
  <div class="content">
    <div :id="id" class="inner"></div>
  </div>
</template>


<script setup>
import * as echarts from 'echarts'
import {ref,reactive} from 'vue'
import {onMounted} from '@vue/runtime-core'
const props = defineProps({
  id:{
    type:String,
    default:''
  }
})
const data = ref([
    {name:'',value:1},
    {name:'',value:2},
    {name:'',value:3},
])
const options = reactive({
  color:['#75D063','#0066FF','#0FBEE4'],
  series:[
    {
      type:"pie",
      data:[],
      roseType:'radius',
      radius:['50%','75%'],
    },
    {
      type:"pie",
      itemStyle:{
        opacity:0.2,
      },
      data:[],
      radius:['40%','47%']
    },
  ]
})
let chart

function loadData(){
  const temp = []
  const sum = data.value.reduce((pre,cur)=>pre+cur.value,0)
  const gap = (1 * sum) / 100
  data.value.forEach(item=>{
    temp.push({
      ...item,
      itemStyle:{
        borderColor:{
          type:'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [{
            offset: 0, color: 'transparent' // 0% 处的颜色
          }, {
            offset: 1, color: 'rgba(255,255,255,0.8)' // 100% 处的颜色
          }],
        },
        borderWidth:2,
      }
    })
    temp.push({
      value:gap,
      itemStyle:{
        color:'transparent'
      }
    })
  })
  data.value = temp
}

function initChart(){
  options.series[0].data = data.value
  options.series[1].data = JSON.parse(JSON.stringify(data.value))
  options.series[1].data.forEach(i=>{
    i.itemStyle.opacity = 0.3
  })
  const dom = document.getElementById(props.id)
  dom && (chart = echarts.init(dom))
  chart.setOption(options)
}
function resize(){
  chart.resize()
}
onMounted(()=>{
  loadData()
  initChart()
  window.addEventListener('resize',resize)
})
</script>

<style scoped lang="scss">
.content, .inner{
  width: 100%;
  height:100%;
}
</style>
