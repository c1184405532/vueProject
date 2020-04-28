<template>
    <div class="detail_box">
        <NavBar
            title="列表展示详情页"
            :fixed="true"
            :backClick="backCallback"
        />
       
       <p>{{parentData.name}}</p>
       <p>{{parentData.age}}</p>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Axios from '@/request/Axios.js'

export default {
    components: {
        NavBar,

    },
    props: {

    },
    data() {
        return {
            parentData:{}
        };
    },
    computed: {

    },
    created() {
        //console.log('路由参数',this.$route)
        this.parentData = this.$route.query
    },
    mounted() {
        
    },
    watch: {

    },
    methods: {
        backCallback(route){
            //console.log(route)
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
