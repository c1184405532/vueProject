<template>
    <div>
        <Tabbar 
            v-model="tabActive"
            class="tab_bar_box"
        >
        <TabbarItem icon="home-o"  @click="gotoPage('layout/home')" >首页</TabbarItem>
        <TabbarItem icon="search"  @click="gotoPage('layout/search')" >搜索</TabbarItem>
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
        title:{
            type:String,
            default:'导航栏'
        }
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

    },
    watch: {

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
    .tab_bar_box{
        //height: 100px;
        width: 100%;
    }
    // .van-nav-bar__title{
    //     color: #f00;
    // }
</style>
