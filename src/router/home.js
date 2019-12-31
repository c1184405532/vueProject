
import IndexHome from '../pages/LayUi.vue';
import Vant from '../pages/vant.vue';
import Videos from '../pages/Videos.vue';
import Gantt from '../pages/Gantt.vue';
export default [
    {
        path:'/',
        redirect:'/vant',
        name:'IndexHome',
        component:IndexHome
    },
    {
        path:'/vant',
        name:'Vant',
        component:Vant
    },
    {
        path:'/gantt',
        name:'Gantt',
        component:Gantt
    },
    {
        path:'/video',
        name:'Videos',
        component:Videos
    }
]