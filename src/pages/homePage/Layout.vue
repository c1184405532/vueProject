<template>
    <div class="layout_page_box">
        <NavBar
            title="首页"
            :fixed="true"
            :leftArrow="false"
        />
            <div class="ignore_page_content">
                <router-view/>
            </div>
        <TabBar />
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import TabBar from '@/components/TabBar.vue'
export default {
    components: {
        NavBar,
        TabBar
    },
    props: {

    },
    data() {
        return {
            transitionName:'',
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

    },
};
</script>

<style scoped lang="less">
    .layout_page_box{
        height: 100%;
        width: 100%;
        //padding-bottom: 50PX;
        
    }
    .ignore_page_content{
        width: 100%;
        height: calc(100% - 96px);
        background: #ddd;
        overflow: auto;
    }
</style>
