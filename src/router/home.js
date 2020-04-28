/*
组件动画配置 组件缓存keep-alive配置
在路由对象中配置meta字段
meta:{
    index:0 || N,//type number 值越大代表进入动画 越小代表返回动画 如A B组件 A=0 B = 1 从A跳转到B时 就是进入动画 从B跳转到A时就是返回动画
    keepAlive:true || false,//默认false 只要不设置true都代表不缓存组件 
}
//第一次进入缓存组件后 不管是跳转新页面还是返回上一级页面都不会触发函数创建生命周期
//如需配置进入某个页面后缓存当前页面 返回时就不触发加载 但进入或返回非指定页面时 再次进入当前组件需要触发加载 需在beforeRouteLeave生命周期配置
beforeRouteLeave(to,from,next){
    // console.log('to',to)
    // console.log('form',from)
    to.meta.keepAlive = true; 
    //只要进入的页面不是你所指定的路由name名那么设置to.meta.keepAlive为false 再次从其他页面进入当前页面时不会缓存组件 
    if(to.name !== 'home/listReveal/detail'){
        to.meta.keepAlive = false; 
    }
    next()
},
使用示例详见 listReveal/List
//
*/
const Login = ()=> import('@/pages/user/Login.vue');

const Layout = ()=> import('@/pages/homePage/Layout.vue');
const Home = ()=> import('@/pages/homePage/Home.vue');
const Search = ()=> import('@/pages/homePage/Search.vue');
const My = ()=> import('@/pages/homePage/My.vue');
const List = ()=> import('@/pages/listReveal/List.vue');
const Detail = ()=> import('@/pages/listReveal/Detail.vue');
export default [
    {
        path:'/',
        name:'/',
        redirect: '/user/login',
    },
    {
        meta: { index:0},
        path:'/user/login',
        name:'user/login',
        component:Login
    }, 
    {
        meta: { index:1},
        path:'/homePage/layout',
        name:'homePage/layout',
        component:Layout,
        children:[
            {
                meta: { index:2},
                path: 'home',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
                name: 'layout/home',
                component: Home
            },
            {
                meta: { index:2},
                path: 'search',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
                name: 'layout/search',
                component: Search
            },
            {
                meta: { index:2},
                path: 'my',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
                name: 'layout/my',
                component: My
            },
            
        ]
    }, 
    {
        meta: { index:3,keepAlive:true},
        path: '/home/listReveal/list',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'home/listReveal/list',
        component: List
    },  
    {
        meta: { index:4},
        path: '/home/listReveal/detail',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'home/listReveal/detail',
        component: Detail
    }, 
]