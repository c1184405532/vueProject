import VueRouter from "vue-router";
import homerouter from "./home"
export default new VueRouter({
    routes:[
        ...homerouter
    ]
})