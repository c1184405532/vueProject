// import Layout from '@/pages/homePage/Layout.vue';
// import Login from '@/pages/user/Login.vue';
// import Home from '@/pages/homePage/Home.vue';
// import Search from '@/pages/homePage/Search.vue';
const Login = ()=> import('@/pages/user/Login.vue');

const Layout = ()=> import('@/pages/homePage/Layout.vue');
const Home = ()=> import('@/pages/homePage/Home.vue');
const Search = ()=> import('@/pages/homePage/Search.vue');
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
            
        ]
    },    
]