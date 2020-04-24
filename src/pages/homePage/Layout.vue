<template>
    <div class="layout_page_box">
        <NavBar
            :title="navBarTitle"
            :fixed="true"
            :leftArrow="false"
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
                {title:'首页',icon:'home-o',path:'layout/home',navBarType:true},
                {title:'搜索',icon:'search',path:'layout/search',navBarType:false},
            ],
            navBarTitle:'',
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
        tabbarCallback(tabbarData){
            console.log(tabbarData)
            this.navBarTitle = tabbarData.title
            this.isShowNavBar = tabbarData.navBarType
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
