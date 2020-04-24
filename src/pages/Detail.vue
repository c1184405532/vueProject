<template>
    <div class="detail_box">
        <NavBar
            title="详情页"
            :fixed="true"
            :backClick="backCallback"
        />
        我是详情页
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
    components: {
        NavBar
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
    }
</style>
