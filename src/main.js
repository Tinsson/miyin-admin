// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from '@/assets/js/vue'
import App from './App'
import router from './router'
import 'normalize.css'
import '@/assets/css/common.css'
import '@/assets/css/iview.css'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import store from '@/store'
Vue.use(iview)
import components from '@/assets/js/components'
import VueAxios from 'vue-axios'
import axios from '@/assets/js/axios'


import '@/mockjs'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

window.echarts = echarts;


// import '@/mockjs'

Vue.use(VueAxios, axios)

Vue.config.productionTip = false

Vue.use(components);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
