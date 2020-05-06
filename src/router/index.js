import VueRouter from "vue-router";
import homerouter from "./home"
//防止重复跳转同一路由报警告
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => {
        console.log('重复路由',error)
    })
}
// window.addEventListener('popstate',(e)=>{
//     let isBack = window.getLocalStorage('routerIsBack')
//     if(!isBack){
//         window.history.back();
//     }
//     console.log('浏览器回退',e);
    
// })
export default new VueRouter({
    routes: [
        ...homerouter,
    ],
    
    scrollBehavior(to,from,savedPosition){
            let isBack = window.getLocalStorage('routerIsBack')
            ////对路由跳转进行拦截 如果不能回退或前进 就跳转到登录页
            if(!isBack){
                window.vm.$router.replace({
                    name:'user/login',
                })
            }else if(to.name == 'user/login'){
                //如果有人在退出后 多次点击回退 那么历史记录里就会出现多个登录界面url
                //此时再点击登录 然后点击回退就会进入login页面 
                //所以判断如果已经登录了 那么回退或者跳转到登录页面直接跳转到首页
                window.vm.$router.replace({
                    name:'layout/home',
                })
            } 
        // console.log('to',to)
        //console.log('to',to)
        // console.log('savedPosition',savedPosition)
    },
})