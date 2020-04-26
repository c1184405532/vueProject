<template>
    <div class=" ignore_content_box">
        <PullRefresh 
            class="list_components_box" 
            :success-text="successText"
            v-model="isLoading" 
            @refresh="onRefresh"
        >
            <slot></slot>
        </PullRefresh>
    </div>
</template>

<script>
import { PullRefresh } from 'vant';
 
export default {
    components: {
        PullRefresh,
    },
    props: {
        successText:{
            type:String,
            default:"刷新成功"
        },
        onRefresh:{
            type:Function,
            default:function(){

            }
        }
    },
    data() {
        return {
            isLoading:false
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
       
        refreshSuccess(){
            this.isLoading = false
        },
    },
};
</script>

<style scoped lang="less">
    .list_components_box{
        min-height: 100px;
    }
</style>
