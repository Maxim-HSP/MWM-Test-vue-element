import Vue from 'vue'
import App from './components/App.vue'

//引入router(注意首字母必须小写)
import router from "./router/router.js"
//引入store
import {store} from "./store/index.js"

//完整引入Element（如需按需引入，需要安装并配置babel-plugin-component）
import ElementUI from 'element-ui'
//注意，样式文件需要单独引入
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
