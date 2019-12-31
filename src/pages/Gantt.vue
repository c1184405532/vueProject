<template>
    <div >
        <iframe class="box" v-show="iframeState" id="show-iframe"  frameborder=0 name="showHere" scrolling=auto :src="src"></iframe>
    </div>
</template>

<script>
import { Button } from 'vant';
export default {
    components:{
        Button,
    },
    data(){
        return {
            iframeState:true,
            src:"https://www.baidu.com/"
        }
    },
    created(){
        let params = `user=${encodeURI('陈禹廷')}&id=18584084806`;
        this.src = 'http://192.168.8.36:9898/gantt.html?'+params
    },
    methods:{
        gotoPage(){
            console.log(555)
        },
    },
}
</script>

<style scoped lang="less">
    .box{
        height: 100vh;
        width: 100vw;
    }
</style>