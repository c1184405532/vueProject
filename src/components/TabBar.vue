<template>
    <div class="tabbar_layout">
        <Tabbar 
            v-model="tabActive"
            class="tab_bar_box"
        >
        <TabbarItem :icon="value.icon" :key="value.title" v-for="(value) in tabbarData" @click="gotoPage(value.path)" >
            {{value.title}}
        </TabbarItem>
        
            <!-- <van-tabbar-item icon="home-o">标签1</van-tabbar-item>
            <van-tabbar-item icon="search">标签2</van-tabbar-item>
            <van-tabbar-item icon="freinds-o">标签3</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签4</van-tabbar-item> -->

        </Tabbar>
    </div>
</template>

<script>
import {Tabbar,TabbarItem } from 'vant';
export default {
    components: {
        Tabbar,
        TabbarItem
    },
    props: {
        tabbarData:{
            type:Array,
            default:function(){
                //数据格式 Array（Object）
                //{title:'首页',icon:'home-o',path:'layout/home'},
                return []
            }
        },
        //点击切换回调
        tabbarClick:{
            type:Function,
            default:function(){

            }
        },
    },
    data() {
        return {
            tabActive:0,
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        //做判断的原因是 如果记录的值不同 会走两次tabbarClick 一次mounted 一次watch
        //tab跳入详情页或其他路由页 返回时需要记录当前tabBarActive
        if(localStorage.getItem('tabBarActive')){
            //如果相同就不会触发watch监听 就要手动加载一次tabbarClick
            if(this.tabActive === Number(localStorage.getItem('tabBarActive'))){
                if(this.tabbarClick){
                    this.tabbarClick(this.tabbarData[this.tabActive])
                }
            }
            //赋值 如果值不同的话就会触发watch监听 进行tabbarClick调用
            this.tabActive = Number(localStorage.getItem('tabBarActive'))          
        }else{
            if(this.tabbarClick){
                this.tabbarClick(this.tabbarData[this.tabActive])
            }
        }
        localStorage.setItem('tabBarActive',this.tabActive)
        
    },
    watch: {
        tabActive(newValue){
            localStorage.setItem('tabBarActive',newValue)
            if(this.tabbarClick){
                this.tabbarClick(this.tabbarData[newValue]) 
            }
        },
    },
    methods: {
        gotoPage(routerName){
            this.$router.push({
                name:routerName
            })
        },
    },
};
</script>

<style scoped lang="less">
    .tabbar_layout{
        height: 50PX;
        width: 100%;
    }
    // .van-nav-bar__title{
    //     color: #f00;
    // }
</style>
