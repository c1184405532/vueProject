<template>
    <div class="detail_box">
        <NavBar
            title="详情页"
            :fixed="true"
            :backClick="backCallback"
        />
        <ListComponents 
            :onRefresh="listRefresh" 
            ref="ListComponentsRef"
            class="ignore_list_box" 
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
export default {
    components: {
        NavBar,
        ListComponents
    },
    props: {

    },
    data() {
        return {
            listData:[
                
            ],
            page:1
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
        getList(){
            Axios.get('api/list',{
                page:this.page,
            }).then((res)=>{
                console.log('刷新成功',res)
                if(res.success){
                    let newArr = []
                    res.data.list.forEach(element => {
                        newArr.push(element)
                    });
                    this.listData = newArr
                }
                
            },error=>{
                
            })
        },
        listRefresh(){
           this.$refs.ListComponentsRef.refreshSuccess()
        },
    },
};
</script>

<style scoped lang="less">
    .detail_box{
        height: 100%;
        width: 100%;
        .ignore_list_box{
            
            .list{
                padding: 24px;
                border-top: 1px solid #ddd;
            }
        }
    }
</style>
