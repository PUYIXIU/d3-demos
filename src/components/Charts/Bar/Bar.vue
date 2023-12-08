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
  {name:'',value:1900},
  {name:'',value:700},
  {name:'',value:1400},
  {name:'',value:1550},
  {name:'',value:799},
  {name:'',value:300},
  {name:'',value:1120},
  {name:'',value:500},
  {name:'',value:980},
])
const options = reactive({
  xAxis:[{
    type:'category',
    data:['01','02','03','04','05','06','07','08','09'],
    axisLine:{show:false},
    axisTick:{show:false}
  }],
  yAxis:[{
    axisLine:{
      show:true,
      lineStyle:{
        width:2,
        color:'rgb(79,79,79,0.5)'
      }
    },
    splitLine:{
      lineStyle:{
        type:'dashed',
        color:'rgb(79,79,79,0.5)'
      }
    }
  }],
  series:[
    {
      type:"bar",
      barWidth:7,
      data:[]
    },
  ]
})
let chart

function loadData(){
  const temp = []
  const colors = {
    blue:['rgb(0,85,255,0.1)','rgba(0,255,255)'],
    green:['rgb(26,255,0,0.1)','rgb(0,255,4)']
  }
  const sum = data.value.reduce((pre,cur)=>pre+cur.value,0)
  const gap = (1 * sum) / 100
  data.value.forEach(item=>{
    let color = colors[item.value == '799'?'green':'blue']
    temp.push({
      ...item,
      itemStyle:{
        borderRadius:5,
        borderWidth:2,
        borderColor:{
          type:'linear',
          x:0, y:0, x2:0, y2:1,
          colorStops:[
            {offset:0,color:color[0]},
            {offset:1,color:color[1]},
          ]
        },
        color:{
          type:'linear',
          x:0, y:0, x2:0, y2:1,
          colorStops:[
            {offset:0,color:color[0]},
            {offset:1,color:color[1]},
          ]
        }
      }
    })
  })
  data.value = temp
}

function initChart(){
  options.series[0].data = data.value
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
