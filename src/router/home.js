import IndexHome from '../components/aa.vue'
export default [
    {
        path:'/',
        redirect: '/index',
    },
    {
        path:'/index',
        name:'IndexHome',
        component:IndexHome
    },
]