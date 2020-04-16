
import Login from '@/pages/user/Login.vue';
import Home from '@/pages/homePage/Home.vue';
export default [
    {
        path:'/',
        name:'/',
        redirect: '/user/login',
    },
    {
        path:'/user/login',
        name:'user/login',
        component:Login
    }, 
    {
        path:'/homePage/home',
        name:'homePage/home',
        component:Home
    },    
]