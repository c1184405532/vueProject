<template>
    <div class="list_box">

        <van-list v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad">
            <van-cell v-for="item in list"
                :key="item"
                :title="item" />
        </van-list>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ListComponents from "@/components/ListComponents.vue";
import Axios from "@/request/Axios.js";
import { PullRefresh, List } from "vant";
export default {
    components: {
        NavBar,
        ListComponents,
        List
    },
    props: {},
    data() {
        return {
            list: [],
            loading: false,
            finished: false
        };
    },
    computed: {},
    created() {},
    mounted() {
        
    },
    watch: {},
    methods: {
        onLoad() {
            console.log('加载加载')
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                for (let i = 0; i < 10; i++) {
                    this.list.push(this.list.length + 1);
                }

                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 1000);
        }
    }
};
</script>

<style scoped lang="less">
.detail_box {
    height: 100%;
    width: 100%;
    // overflow: auto;
    .list {
        padding: 42px;
        border-top: 1px solid #ddd;
    }
}
.list_box {
    height: 1000px;
    width: 100%;
    overflow: auto;
}
</style>
