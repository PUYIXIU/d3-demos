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
  {name:'',value:4500},
  {name:'',value:4100},
  {name:'',value:2900},
  {name:'04',value:3000},
  {name:'',value:2300},
  {name:'',value:2100},
  {name:'',value:2000},
])
const options = reactive({
  color:['#3caaff','#00ffff'],
  xAxis:[{
    type:'category',
    data:['01','02','03','04','05','06','07'],
    axisLine:{
      show:true,
      lineStyle:{
        width:2,
        color:'rgb(79,79,79,0.5)'
      }
    },
    axisTick:{show:false},
    splitLine:{
      show:true,
      lineStyle:{
        color:{
          type:'linear',
          x:0,y:0,x2:0,y2:1,
          colorStops:[
            {offset:0,color:'rgb(79,79,79,0)'},
            {offset:1,color:'rgb(79,79,79,0.5)'}
          ]
        }
      }
    }
  }],
  yAxis:[{
    axisLine:{
      show:true,
      lineStyle:{
        width:2,
        color:'rgb(79,79,79,0.5)'
      }
    },
    splitLine:{show:false}
  }],
  series:[
    {
      type:"line",
      symbolSize:0,
      data:[],
      areaStyle:{
        color:{
          type:'linear',
          x:0, y:0, x2:0, y2:1,
          colorStops:[
            {offset:0,color:'rgba(0,46,255,0.5)'},
            {offset:1,color:'rgba(0,46,255,0.1)'},
          ]
        }
      }
    },
    {
      type:"line",
      symbolSize:0,
      data:[],
      areaStyle:{
        color:{
          type:'linear',
          x:0, y:0, x2:0, y2:1,
          colorStops:[
            {offset:0,color:'rgba(0,255,255,0.5)'},
            {offset:1,color:'rgba(0,255,255,0.1)'},
          ]
        }
      }
    },
  ]
})
let chart

function loadData(){
  const temp = []
  data.value.forEach(item=>{
    item.symbolSize = 0
    if(item.name == '04'){
      item.symbolSize = 10
      item.itemStyle={
        color:'#fff',
        shadowColor:"#fff",
        shadowBlur:10
      }
    }
    temp.push({
      ...item
    })
  })
  data.value = temp
}

function initChart(){
  options.series[0].data = data.value
  options.series[1].data = data.value.map(i=>({value:i.value})).reverse()
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
