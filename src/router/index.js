import VueRouter from "vue-router";
import homerouter from "./home"
import homesubpage from "./homesubpage"
//防止重复跳转同一路由报警告
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch((error) => {
        console.log('重复路由',error)
    })
}
export default new VueRouter({
    routes: [
        ...homerouter,
        ...homesubpage
    ]
})