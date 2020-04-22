<template>
    <div class="home_page">
        <div class="">首页</div>
        <Button @click="gotoPage()">查看详情</Button>
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
       gotoPage(){
           this.$router.push({
                name:'home/detail',
            })
       },
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
