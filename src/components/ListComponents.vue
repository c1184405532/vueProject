<template>
    <div class=" ignore_content_box">
        <PullRefresh 
            class="list_components_box" 
            :success-text="successText"
            v-model="refreshLoading " 
            @refresh="onRefresh"
        >
            <List
                class="list_load_box"
                v-model="listLoading"
                :finished="listFinishedType"
                :finished-text="finishedText"
                :error-text="listErrorText"
                :error.sync="listErrorType"
                :immediate-check="immediateCheck"
                :offset="1000"
                @load="listOnLoad"
            >
                <slot></slot>
            </List>
            
        </PullRefresh>
    </div>
</template>

<script>
import { PullRefresh,List } from 'vant';
 
export default {
    components: {
        PullRefresh,
        List
    },
    props: {
        successText:{
            type:String,
            default:"刷新成功"
        },
        onRefresh:{
            type:Function,
            default:function(){

            }
        },
        finishedText:{
            type:String,
            default:'没有更多了'
        },
        listErrorText:{
            type:String,
            default:'请求失败，点击重新加载'
        },
        listOnLoad:{
            type:Function,
            default:function(){
               
            }
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
       
        refreshSuccess(){
            this.refreshLoading  = false
        },
        listSuccess(){
            this.listLoading = false;
        },
        listError(type){
            this.listErrorType = type;
        },
        listFinished(){
            this.listFinished = true;
        }
    },
};
</script>

<style scoped lang="less">
    .list_components_box{
        min-height: 100px;
    }
    .list_load_box{
        padding-bottom: 100px;
    }
</style>
