<template>
    <div>
        搜索搜索
    </div>
</template>

<script>
export default {
    components: {

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
        
    },
};
</script>

<style scoped lang="less">

</style>
