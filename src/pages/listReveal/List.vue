<template>
    <div class="list_component_box">
        <NavBar
            title="列表组件展示用法页"
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
            <div class="list" v-for="(value,index) in listData" :key="index" @click="gotoDetail('home/listReveal/detail',value)">
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

export default {
    name:'homelistReveallist',
    components: {
        NavBar,
        ListComponents,
      
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
            successText:'刷新成功',
            isListError:false
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
    beforeRouteLeave(to,from,next){
        //此注释配置用于v-if keep-alive 组件配置 用此方式就打开注释
        // console.log('to',to)
        // console.log('form',from)
        // to.meta.keepAlive = true; 
        // if(to.name !== 'home/listReveal/detail'){
        //     to.meta.keepAlive = false; 
        // }
        this.$nextTick(()=>{
            next()
        })
        
    },
    activated(){
       this.$refs.ListComponentsRef.$el.scrollTop = window.getLocalStorage('homelistReveallistScrollTop')
    },
    
    methods: {
        gotoDetail(routerName,data){
            
            window.setLocalStorage('homelistReveallistScrollTop',this.$refs.ListComponentsRef.$el.scrollTop)
            window.vm.$emit('setKeepAliveData','homelistReveallist')
            this.$router.push({
                name:routerName,
                query:data
            })
        },
        backCallback(route){
            window.removeLocalStorage('homelistReveallistScrollTop')
            window.vm.$emit('clearKeepAliveData','homelistReveallist')
            //console.log(route)
        },
        //本模板所有接口api都是用的自己封装的node接口
        //地址 https://github.com/c1184405532/myNodeRequest.git
        //有自己的服务器数据 就在http-default.js中设置你的服务器端口
        //没有就下载我的node.js文件 本地运行 然后配置端口请求就行
        getList(getDataType){
            Axios.get('api/list',{
                //当前页数
                page:this.page,
            },{
                //此配置详见Axios.js配置
                beforeRequestToastType:getDataType ? getDataType.beforeRequestToastType : true
            }).then((res)=>{
                //console.log('刷新成功',res)  
                if(res.success){
                    //数据合并
                    this.listData = [...this.listData,...res.data.list]
                    this.listTotal = res.data.total;
                    //如果数据全部加装完毕 设置滚动到底状态为完成
                    //滚动到底文字为没有更多了
                    if(this.listData.length >= this.listTotal ){
                        this.finishedText = '没有更多了';
                        this.$refs.ListComponentsRef.listFinished(true)
                    }else{
                        this.$refs.ListComponentsRef.listFinished(false)
                    }
                    //如果没有数据 设置滚动到底的提示文字为暂无数据
                    if(this.listData.length === 0){
                        this.finishedText = '暂无数据';
                    }
                }
                //如果是下拉刷新 重置下拉刷新状态
                if(getDataType && getDataType.clearRefresh){
                    //如果没有数据 设置下拉刷新成功文字 为空 避免和暂无数据两个提示重叠
                    if(this.listData.length === 0){
                        this.successText = '';
                    }else{
                        this.successText = '刷新成功';
                    }
                    this.$refs.ListComponentsRef.refreshSuccess()
                }
                //如果是滚动到底请求 重置滚动到底状态
                if(getDataType && getDataType.clearListLoad){
                    this.$refs.ListComponentsRef.listSuccess()
                }
                //如果是报错之后点击底部提示文字重新发起请求
                //重置状态
                if(this.isListError){
                    this.$refs.ListComponentsRef.listError(false)
                    this.isListError = false
                }
            },error=>{
                //console.log(error)
                //如果是下拉刷新请求报错 也重置下拉刷新状态
                if(getDataType && getDataType.clearRefresh){
                    this.$refs.ListComponentsRef.refreshSuccess()
                }
                if(getDataType && getDataType.clearListLoad){
                    //当请求报错的时候 会出现底部点击文字提示重新发起请求
                    //虽然上一次请求结果没成功 但是page的页数也会同样加一
                    //所以报错需要重复请求时page页数设置减一
                    this.isListError = true; 
                    this.$refs.ListComponentsRef.listError(true)
                    this.page -= 1;
                    this.$refs.ListComponentsRef.listSuccess()
                }
            })
        },
        listRefresh(){
            //下拉刷新时重置状态
            //获取数据接口传递状态当前为下拉刷新 用于判断请求成功后改变下拉状态
            this.page = 1;
            this.listData = [];
            this.finishedText = '';
            this.getList({clearRefresh:true})

        },
        listOnLoad(){
            console.log('滚动到的');            
            // console.log('this.listData.length',this.listData.length)
            // console.log('this.listTotal',this.listTotal)
            //滚动到底触发函数
            //页数加一
            //获取数据接口传递状态当前为滚动到底 并且当前请求发起不显示全局请求toast显示
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
    .list_component_box{
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
