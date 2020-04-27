<template>
    <div class="detail_box">
        <NavBar
            title="详情页"
            :fixed="true"
            :backClick="backCallback"
        />
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
            <div class="list" v-for="(value,index) in listData" :key="index">
                <p>姓名：{{value.name}}</p>
                <p>年龄：{{value.age}}</p>
            </div>
        </ListComponents>
       
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ListComponents from '@/components/ListComponents.vue'
import Axios from '@/request/Axios.js'
import { PullRefresh,List } from 'vant';
export default {
    components: {
        NavBar,
        ListComponents,
        List
    },
    props: {

    },
    data() {
        return {
            listData:[
                
            ],
            page:1,
            listTotal:0,
            finishedText:'',
            successText:'刷新成功'
        };
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getList()
    },
    watch: {

    },
    methods: {
        backCallback(route){
            //console.log(route)
        },
        getList(getDataType){
            Axios.get('api/list',{
                page:this.page,
            },{
                beforeRequestToastType:getDataType ? getDataType.beforeRequestToastType : true
            }).then((res)=>{
                //console.log('刷新成功',res)
                
                if(res.success){
                    
                    this.listData = [...this.listData,...res.data.list]
                    this.listTotal = res.data.total;
                    if(this.listData.length >= this.listTotal ){
                        this.finishedText = '没有更多了';
                        this.$refs.ListComponentsRef.listFinished(true)
                    }else{
                        this.$refs.ListComponentsRef.listFinished(false)
                    }
                    if(this.listData.length === 0){
                        this.finishedText = '暂无数据';
                    }
                }
                if(getDataType && getDataType.clearRefresh){
                    if(this.listData.length === 0){
                        this.successText = '';
                    }else{
                        this.successText = '刷新成功';
                    }
                    this.$refs.ListComponentsRef.refreshSuccess()
                }
                if(getDataType && getDataType.clearListLoad){
                    this.$refs.ListComponentsRef.listSuccess()
                }
                
            },error=>{
                if(getDataType && getDataType.clearRefresh){
                    this.$refs.ListComponentsRef.refreshSuccess()
                }
                if(getDataType && getDataType.clearListLoad){
                    this.$refs.ListComponentsRef.listSuccess()
                }
            })
        },
        listRefresh(){
            this.page = 1;
            this.listData = [];
            this.finishedText = '';
            this.getList({clearRefresh:true})

        },
        listOnLoad(){
            console.log('滚动到的');            
            // console.log('this.listData.length',this.listData.length)
            // console.log('this.listTotal',this.listTotal)
            if(this.listData.length < this.listTotal){
                this.page += 1;
                this.getList({
                    clearListLoad:true,
                    beforeRequestToastType:false,
                })
            }
            
            
        },
    },
};
</script>

<style scoped lang="less">
    .detail_box{
        height: 100%;
        width: 100%;
        // overflow: auto;
        .list{
            padding: 42px;
            border-top: 1px solid #ddd;
        }
    }
    .list_box{
        height: 1000px;
        width: 100%;
        overflow: auto  ;
    }   
</style>
