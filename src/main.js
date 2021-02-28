import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.less'

// 导入vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'

//  设置rem基准值的包
import 'amfe-flexible'
// 加载 day.js
import '@/utils/dayjs.js'

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
