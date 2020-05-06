<template>
    <div class="tabbar_layout">
        <Tabbar 
            v-model="tabActive"
            class="tab_bar_box"
        >
            <TabbarItem  :key="value.title" v-for="(value,index) in tabbarData" @click="gotoPage(value.routerName)" >
                <span :style="{color:index === tabActive ?value.activeColor:value.color}"> {{value.tabbarTitle}}</span>
                <template #icon="props">
                    <Icon v-if="!value.tabImg" :name="value.icon" :color="props.active ? value.activeColor : value.color " />
                    <img v-if="value.tabImg"  :src="imgSrc(props.active,value)" />
                </template>
            </TabbarItem>
          
            
        </Tabbar>
    </div>
</template>

<script>
import {Tabbar,TabbarItem ,Icon } from 'vant';
export default {
    components: {
        Tabbar,
        TabbarItem,
        Icon
    },
    props: {
        tabbarData:{
            type:Array,
            default:function(){
                //数据格式 Array（Object）
                //{tabbarTitle:'首页',icon:'home-o',routerName:'layout/home'},
                /*
                    tabbarTitle: String, 底部列文字 
                    icon: String 图标名, (可传vant图标名 图片链接 或者require(本地图片路径)) 图片缺点：不会随选中状态变更色彩
                    color: String'#646566',未选中字体颜色 
                    activeColor: String "#f00",选中字体颜色
                    tabImg:String require('@/assets/logo.png') || http图片链接, 默认图标地址 当设置了此配置项时 icon字段 无效
                    tabActiveImg: String require('@/assets/home.jpg') || http图片链接,选中图片地址 当设置了此配置项时 icon字段 无效
                    navTitle: String "首页", 头部导航栏文字
                    navRightIcon: String 'home-o' || require('@/assets/home.jpg') || http图片链接 ,头部导航栏右侧图标
                    navRightText: String '右侧按钮',头部右侧导航文字 当navRightIcon存在时 此配置无效
                    navRightColor: String '#f00', 头部导航栏右侧图标或文字颜色
                    routerName: String 'layout/home',要跳转的路由名 （是router.js中的name字段不是path字段请注意）
                    navBarType: Boolean true, 是否显示头部导航栏
                */
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
            tabbarDataFilter:[],
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
            this.$router.replace({
                name:routerName
            })
        },
        imgSrc(type,value){
            if(type && value.tabActiveImg){
                return value.tabActiveImg
            }else{
                return value.tabImg
            }
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
