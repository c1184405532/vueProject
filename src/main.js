import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
import { Button,Modal,Dropdown ,Menu,Icon} from 'ant-design-vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './globaleStyle/globale.less'
import Vconsole from 'vconsole'
let newvConsole = new Vconsole()

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.use(newvConsole)
Vue.use(Button)
Vue.use( Modal)
Vue.use( Dropdown)
Vue.use( Menu)
console.dir(Menu)
Vue.use(Icon)
Vue.use(Antd)
//import 'lib-flexible/flexible'
//import './utils'
Vue.config.productionTip = false;
Vue.use(VueRouter)
new Vue({
    render: h => h(App),
    router
}).$mount('#app')
