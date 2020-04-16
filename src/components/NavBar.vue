<template>
    <div>
        <NavBar 
            :title="title" 
            rightText="按钮"
            @click-right="rightClick" 
            class="nav_bar_box"
        />
    </div>
</template>

<script>
import {NavBar } from 'vant';
export default {
    components: {
        NavBar
    },
    props: {
        title:{
            type:String,
            default:'导航栏'
        }
    },
    data() {
        return {

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
        rightClick(){
            console.log('点击')
        },
    },
};
</script>

<style scoped lang="less">
    .nav_bar_box{
        //height: 100px;
        width: 100%;
    }
    .van-nav-bar__title{
        color: #f00;
    }
</style>
