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
            <div slot="right" class="nav_right_box">
                <Icon :name="navRightIcon" size="18" />
            </div>
        </NavBar>
    </div>
</template>

<script>
import {NavBar ,Icon} from 'vant';
export default {
    components: {
        NavBar,
        Icon
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
        //左侧点击回调
        backClick:{
            type:Function,
            default:function(){

            }
        },
        //右侧图标
        navRightIcon:{
            type:String,
            default:''
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
            vm.$emit('navBarRightClick',{
                title:this.title,
                navRightIcon:this.navRightIcon
            })
            //console.log('点击')
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

    .nav_right_box{
        height: 100%;
        display: flex;
        align-items: center;
    }
    .van-nav-bar__title{
        color: #f00;
    }
</style>
