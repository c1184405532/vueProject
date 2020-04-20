<template>
    <div class="two_page_box">
        <NavBar
            title="二级页面"
            :fixed="true"
        />
        <div class="boxaa" @click="gotoPage"></div>
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
        gotoPage(data){
            this.$router.push({
                name:'/home/threepage'
            })
        }
    },
};
</script>

<style scoped lang="less">
    .two_page_box{
        height: 100%;
        width: 100%;
        background: #ddd;
        .boxaa{
            margin-top: 100px;
            width: 100%;
            height: 200px;
            background: #f00;
        }
    }
</style>
