<template>
    <div>
        <NavBar 
            :title="title" 
            rightText="按钮"
            :left-arrow="leftArrow"
            :placeholder="true"
            :fixed="fixed"
            @click-right="rightClick" 
            class="nav_bar_box"
            @click-left="leftClick"
        >
            <div slot="title">{{title}}</div>

        </NavBar>
    </div>
</template>

<script>
import {NavBar } from 'vant';
export default {
    components: {
        NavBar
    },
    props: {
        //中间标题
        title:{
            type:String,
            default:'导航栏'
        },
        //是否显示左侧箭头
        leftArrow:{
            type:Boolean,
            default:true,
        },
        //是否固定顶部 并保留位置
        fixed:{
            type:Boolean,
            default:true,
        },
        backClick:{
            type:Function,
            default:function(){

            }
        },
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
        leftClick(){
            if(this.leftArrow){
                if(this.backClick){
                    this.backClick(this.$router)
                }
                this.$router.go(-1)
            }

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
