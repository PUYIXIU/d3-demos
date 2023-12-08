import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import echarts from 'echarts'
const app = create(App)
app.use(ElementPlus)
app.use(echarts)
app.mount('#app')

