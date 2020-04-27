<template>
    <div class="detail_box">
        <NavBar
            title="详情页"
            :fixed="true"
            :backClick="backCallback"
        />
        <!-- <ListComponents 
            :onRefresh="listRefresh" 
            :listOnLoad="listOnLoad"
            ref="ListComponentsRef"
            class="ignore_list_box" 
        >
            <div class="list" v-for="(value,index) in listData" :key="index">
                <p>姓名：{{value.name}}</p>
                <p>年龄：{{value.age}}</p>
            </div>
        </ListComponents> -->
        <!-- <List
                class=" list_box"  
                v-model="listLoading"
                :finished="listFinishedType"
                :finished-text="finishedText"
                
                :offset="1000"
                @load="listOnLoad"
            >-->
                <div class="list" v-for="(value,index) in listData" :key="index">
                <p>姓名：{{value.name}}</p>
                <p>年龄：{{value.age}}</p>
            </div>
          <!--</List> -->
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
            listLoading:false,
            listFinishedType:false,
            finishedText:'加载完成'
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
            }).then((res)=>{
                console.log('刷新成功',res)
                if(getDataType && getDataType.clearRefresh){
                    this.$refs.ListComponentsRef.refreshSuccess()
                }
                if(res.success){
                    let newArr = []
                    res.data.list.forEach(element => {
                        newArr.push(element)
                    });
                    this.listData = newArr
                }
                
                
            },error=>{
                if(getDataType && getDataType.clearRefresh){
                    this.$refs.ListComponentsRef.refreshSuccess()
                }
                
            })
        },
        listRefresh(){
            this.page = 1;
            this.listData = [];
            this.getList({clearRefresh:true})

        },
        listOnLoad(){
            console.log('滚动加载')
            this.listLoading = false
            // this.listFinishedType = false
            //this.$refs.ListComponentsRef.listSuccess()
        },
    },
};
</script>

<style scoped lang="less">
    .detail_box{
        height: 100%;
        width: 100%;
        .list{
            padding: 42px;
            border-top: 1px solid #ddd;
        }
    }
    .list_box{
        
    }
</style>
