<template>
    <div class="home_page">
        
        <div class="button_box">
            <Button class="login_out" type="primary" @click="loginOut()">退出登录</Button>
        </div>
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
            console.log('home',navBarData)
        })
    },
    watch: {

    },
    methods: {
       loginOut(){
           window.clearToken();
           this.$router.push({
                name:'user/login',
            })
       },
    },
};
</script>

<style scoped lang="less">
    .button_box{
        width: 100%;
        text-align: center;
    }
    .login_out{
        margin-top: 100px;

    }
</style>
