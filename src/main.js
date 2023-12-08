import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.scss'
import router from './router'

import ElementPlus from 'element-plus'
const app = createApp(App)
app.use(router)

app.use(ElementPlus)

app.mount('#app')

