<template>
    <div>
        
            <Button  style="margin-top: 100px;" type="primary" @click="gotoPage">进入详情</Button>
       
    </div>
</template>

<script>
import { Button } from 'vant'
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
            console.log('search',navBarData)
        })
    },
    watch: {

    },
    methods: {
        gotoPage(){
            this.$router.push({
                name:'home/search/detail',
            })
        }
    },
};
</script>

<style scoped lang="less">

</style>
