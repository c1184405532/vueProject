<template>
    <div>
        <PullRefresh 
            class="list_components_box"
            v-model="refreshLoading" 
            @refresh="onRefresh"
            :success-text="successText"  
            :disabled="refreshDisabled"
        >
            <List
                v-if="!listDisabled"
                v-model="listLoading"
                @load="listOnLoad"
                :finished="listFinishedType"
                :finished-text="finishedText"
                :error-text="listErrorText"
                :error.sync="listErrorType"
                :immediate-check="immediateCheck"
                :offset="listOffset"               
            >
                <slot></slot>
            </List>
            <slot v-if="listDisabled"></slot>
        </PullRefresh>
    </div>
</template>

<script>
/*
使用方式 
import ListComponents from '@/components/ListComponents.vue'
components: {
    ListComponents,
},
//添加一个class名 设置高度 和ovflow:auto
//下列参数含义见props说明
//使用this.$refs.ListComponentsRef 设置各种状态 详见methods说明
<ListComponents 
    class="ignore_content_box"
    :onRefresh="listRefresh" 
    :listOnLoad="listOnLoad"
    :refreshDisabled="false"
    :listDisabled="false"
    :finishedText="finishedText"
    :successText="successText"
    ref="ListComponentsRef"
    
>
    这里是放数据dom
    <div class="list" v-for="(value,index) in listData" :key="index">
        <p>姓名：{{value.name}}</p>
        <p>年龄：{{value.age}}</p>
    </div>
</ListComponents>
*/
import { PullRefresh,List } from 'vant';
 
export default {
    components: {
        PullRefresh,
        List
    },
    props: {
        //下拉刷新 刷新成功提示文字
        successText:{
            type:String,
            default:"刷新成功"
        },
        //下拉刷新触发函数
        onRefresh:{
            type:Function,
            default:function(){

            }
        },
        //是否禁用下拉刷新
        refreshDisabled:{
            type:Boolean,
            default:false
        },
        //是否禁用滚动到底加载
        listDisabled:{
            type:Boolean,
            default:false
        },
        //滚动到底数据全部加载文字提示
        finishedText:{
            type:String,
            default:'没有更多了'
        },
        //滚动到底load请求失败文字
        listErrorText:{
            type:String,
            default:'请求失败，点击重新加载'
        },
        //滚动到底触发函数
        listOnLoad:{
            type:Function,
            default:function(){
               
            }
        },
        //滚动到距离底部多少距离时触发listOnLoad
        listOffset:{
            type:Number,
            default:50
        },
        //是否在初始化时立即执行滚动位置检查
        immediateCheck:{
            type:Boolean,
            default:false,
        }
    },
    data() {
        return {
            refreshLoading :false,
            listLoading:false,
            listFinishedType:false,
            listErrorType:false,
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
        //设置下拉刷新状态 在请求结束后 数据加载完毕调用 
        refreshSuccess(){
            this.refreshLoading  = false
        },
        //设置滚动到底数据请求成功后调用函数 代表当前一次数据已经填充完毕 可触发下一次滚动到底
        listSuccess(){
            this.listLoading = false;
        },
        //设置滚动到底请求失败 是否显示提示文字 并可点击重新触发load事件 
        //@params true 显示提示文字 fasle 不显示提示文字
        listError(type){
            this.listErrorType = type;
        },
        //设置滚动到底加载数据 是否加载完成 
        //@params true 全部加载 fasle 未全部加载
        listFinished(type){
            this.listFinishedType = type;
            
        },
    },
};
</script>

<style scoped lang="less">
    .list_components_box{
        min-height: 300px;
    }
    .list_load_box{
        padding-bottom: 100px;
    }
</style>
