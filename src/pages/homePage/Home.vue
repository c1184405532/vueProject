<template>
    <div class="home_page">
        <div class="">首页</div>
        <Button type="primary" @click="requestMethods('put')">put请求</Button>
        <Button type="primary"  @click="requestMethods('delete')">delete请求</Button>      
        <div class="layout_padding">
            <Button @click="gotoPage('home/listReveal/list')">二次封装列表组件展示</Button>
        </div>
    </div>
</template>

<script>
import {Button} from 'vant'
import Axios from '@/request/Axios.js'
export default {
    components: {
        Button
    },
    props: {

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
        vm.$off('navBarRightClick').$on('navBarRightClick',(navBarData)=>{
            console.log('home',navBarData)
        })
    },
    watch: {

    },
    methods: {
        gotoPage(routerName){
            this.$router.push({
                name:routerName,
            })
        },
        requestMethods(type){
            if(type === 'put'){
                let putData = [{name:'chenyuting',age:23},{name:'chenyuting',age:23}]
                Axios.put('api/add/list',
                    {
                        data:{list:putData}
                    }
                ).then((res)=>{
                    console.log('putres',res)
                })
            }
            if(type === 'delete'){
                let deleteData = ['1','2']
                Axios.delete('api/delete/list',{
                    data:{ids:deleteData}
                }).then((res)=>{
                    console.log('deleteres',res)
                })
            }
        }
    },
};
</script>

<style scoped lang="less">
    .home_page{
        height: 600PX;
        background: #ddd;
        width: 100%;
    }
</style>
