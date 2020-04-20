
const ThreePage = ()=> import('@/pages/homeSubPage/ThreePage.vue');
const TwoPage = ()=> import('@/pages/homeSubPage/TwoPage.vue');
export default [
    {
        meta: { index:3},
        path:`/home/twoPage`,
        name:`/home/twoPage`,
        component:TwoPage,
    },
    {
        meta: { index:4},
        path:`/home/threepage`,
        name:`/home/threepage`,
        component:ThreePage,
    },  
]