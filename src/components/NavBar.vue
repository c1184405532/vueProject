<template>
    <div>
        <NavBar 
            :left-arrow="leftArrow"
            :placeholder="true"
            :fixed="fixed"
            @click-right="rightClick" 
            class="nav_bar_box"
            @click-left="leftClick"
        >
            <div slot="title">{{title}}</div>
            <div slot="right" class="nav_right_box">
                <Icon :name="navRightIcon" v-if="navRightIcon" size="18" :style="{color:navRightColor}"/>
                <span v-if="!navRightIcon" :style="{color:navRightColor}">{{navRightText}}</span>
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
        //右侧文字
        navRightText:{
            type:String,
            default:''
        },
        //右侧文字或图标颜色
        navRightColor:{
            type:String,
            default:''
        },    
        //右侧点击回调
        navRightClick:{
            type:Function,
        },
        //是否是在首页调用的NavBar组件
        isHomeLayout:{
            type:Boolean,
            default:false,
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
            //如果是首页那么调用监听事件
            if(this.isHomeLayout && (this.navRightText || this.navRightIcon)){
                vm.$emit('navBarRightClick',{
                    title:this.title,
                    navRightIcon:this.navRightIcon
                })
            }else{
                if(this.navRightClick){
                    this.navRightClick({
                        title:this.title,
                        navRightIcon:this.navRightIcon
                    })
                }
            }
            
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
