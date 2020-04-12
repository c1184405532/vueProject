
import Login from '../pages/user/Login.vue';
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
]