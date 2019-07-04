// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// import VueResource from 'vue-resource'
//引入路由
import VueRouter from 'vue-router'
import Routes from './routes'
import axios from 'axios'


//全局配置
axios.defaults.baseURL = 'https://vuedemo-f5deb.firebaseio.com'

// Vue.use(VueResource)
//使用路由
Vue.use(VueRouter)
//自定义指令
Vue.directive('rainbow',{
  bind(el,binding,vnode){
    el.style.color = "#" + Math.random().toString(16).slice(2,8);
  }
})
// Vue.directive('theme',{
//   bind(el,binding,vnode){
//     if(binding.value==='wide') {
//       el.style.maxWidth = "1260px"
//     } else if (binding.value==='narrow') {
//       el.style.maxWidth = "560px"
//     }
//   }
// })
//定义全局过滤器
// Vue.filter('toUppercase', function (value) {
//   if (!value) return ''
//   value = value.toString()
//   return value.charAt(0).toUpperCase() + value.slice(1)
// })

//配置路由
const router = new VueRouter({
  routes:Routes,
  mode:"history"
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:router
})
