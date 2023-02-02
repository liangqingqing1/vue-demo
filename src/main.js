import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router' //引入路由配置
import store from './store' //引入 Vuex 状态管理
import 'font-awesome/css/font-awesome.min.css'
/*导入qs*/
import qs from 'qs';
import axios from 'axios'
<<<<<<< Updated upstream
=======

// global css 全局样式
import './assets/styles/index.scss'
import './assets/styles/view.css'

// 阿里巴巴图标
import './assets/iconfont/iconfont.css'


>>>>>>> Stashed changes
/*全局绑定*/
Vue.prototype.$qs = qs;
Vue.prototype.$axios =axios;
Vue.prototype.http=axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router, //使用路由配置
  store //使用 Vuex 进行状态管理
}).$mount('#app')