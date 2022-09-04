// main.ts
import { createApp } from 'vue'
// 导入element plus组件
import ElementPlus from 'element-plus'
import '../node_modules/element-plus/dist/index.css'
// 导入router
import Router from './router/index'
import App from './App.vue'
import './index.css'
// import axios from './axiosInstance'

const app = createApp(App)
// app.config.globalProperties.$axios = axios

app.use(ElementPlus)
app.use(Router)

app.mount('#app')
