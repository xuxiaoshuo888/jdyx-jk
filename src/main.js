import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from './request'

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false;

/*pc端适配*/
(function () {
    function setRootFontSize() {
        let rem, rootWidth;
        let rootHtml = document.documentElement;
        //限制展现页面的最小宽度,适配宽带1200px~1920px
        rootWidth = rootHtml.clientWidth < 1200 ? 1200 : rootHtml.clientWidth;
        // 19.2 = 设计图尺寸宽 / 100（ 设计图的rem = 100 ）
        rem = (rootWidth / 1920) * 62.5;
        // 动态写入样式
        rootHtml.style.fontSize = `${rem}%`;
    }

    setRootFontSize();
    window.addEventListener("resize", setRootFontSize, false);
})();


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
