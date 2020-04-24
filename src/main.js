import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// import {baseRouterPath} from './globaleConfig/routerConfig.js'
import './globaleConfig/routerConfig.js'
import router from './router/index'

import './globaleStyle/globale.less'

import Vconsole from 'vconsole'


import Vant from 'vant';
import 'vant/lib/index.css';

// let newvConsole = new Vconsole()
// Vue.use(newvConsole)

Vue.use(Vant);


Vue.config.productionTip = false;
Vue.use(VueRouter)
//全局Vue实例
window.vm =  new Vue({
    render: h => h(App),
    router
}).$mount('#app')
