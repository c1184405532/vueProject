<template>
    <div class="home_page">
        <div :key="index" v-for="(value,index) in buttonData">
            <Button :type="value.type" @click="gotoPage(value)">{{value.text}}</Button>
        </div>
    </div>
</template>

<script>
import {Button} from 'vant'
export default {
    components: {
        Button
    },
    props: {

    },
    data() {
        return {
            buttonData:[
                {type:'default',text:'测试二级页面跳转返回',routerName:'/home/twoPage'},
                {type:'primary',text:'测试二级页面跳转返回',routerName:'/home/twoPage'},
                {type:'info',text:'测试二级页面跳转返回',routerName:'/home/twoPage'},
                {type:'warning',text:'测试二级页面跳转返回',routerName:'/home/twoPage'},
                {type:'default',text:'测试二级页面跳转返回',routerName:'/home/twoPage'},
                {type:'danger',text:'测试二级页面跳转返回',routerName:'/subhome/twoPage'},
            ]
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
        gotoPage(data){
            this.$router.push({
                name:data.routerName
            })
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
