<template>
    <div class="layout_page_box">
        <NavBar
            :title="navBarTitle"
            :fixed="true"
            :leftArrow="false"
            :navRightIcon="navRightIcon"
            :navRightText="navRightText"
            :navRightColor="navRightColor"
            :isHomeLayout="true"
            v-show="isShowNavBar"
            
        />
            <div class="ignore_page_content">
                <router-view/>
            </div>
        <TabBar
            :tabbarData="tabbarData"
            :tabbarClick="tabbarCallback"
        />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
export default {
    components: {
        NavBar,
        TabBar
    },
    props: {

    },
    data() {
        return {
            transitionName:'',
            tabbarData:[
                //详细配置请查看TabBar组件配置说明
                //icon tabbar图标 (可传vant图标名 图片链接 或者require(本地图片路径)) 图片缺点：不会随选中状态变更色彩
                //navTitle导航栏标题 如果没有则默认设置为tabbarTitle 
                //routerName 点击底部跳转路由name （不是path）
                //navBarType 是否显示头部导航栏
                {tabbarTitle:'首页',icon:'home-o',color:'#646566',activeColor:"#f00",tabImg:require('@/assets/logo.png'),tabActiveImg:require('@/assets/home.jpg'),navTitle:"首页",navRightIcon:require('@/assets/home.jpg'),navRightText:'右侧按钮',navRightColor:'#f00',routerName:'layout/home',navBarType:true},
                {tabbarTitle:'搜索',icon:'search',color:'#333',navTitle:"",navRightText:'右侧按钮',navRightColor:'#f00',routerName:'layout/search',navBarType:true},
                {tabbarTitle:'我的',icon:'contact',navTitle:"个人中心",navRightIcon:'',routerName:'layout/my',navBarType:true},
            ],
            navBarTitle:'',
            navRightIcon:'',
            navRightText:'',
            navRightColor:'',
            isShowNavBar:true,
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {
        
    },
    methods: {
        //点击底部跳转的回调
        tabbarCallback(tabbarData){
            console.log(tabbarData)
            this.isShowNavBar = tabbarData.navBarType;
            this.navBarTitle = tabbarData.navTitle ? tabbarData.navTitle : tabbarData.tabbarTitle;
            this.navRightIcon = tabbarData.navRightIcon;
            this.navRightText = tabbarData.navRightText;
            this.navRightColor = tabbarData.navRightColor;
        },
    },
};
</script>

<style scoped lang="less">
    .layout_page_box{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        //padding-bottom: 50PX;
        
    }
    .ignore_page_content{
        width: 100%;
        // height: 100%;
        flex: 1;
        //height: calc(100% - 96px);
        
        overflow: auto;
    }
</style>
