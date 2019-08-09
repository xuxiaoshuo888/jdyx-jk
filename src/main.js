import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import Echarts from 'echarts'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
// Vue.use(echarts)

Vue.config.productionTip = false
Vue.$echarts = Echarts
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
