<template>
    <div class="layout_padding">
        <h1 class="demo_home_title">
            <img src="https://img.yzcdn.cn/vant/logo.png">
            <span>Vant</span>
        </h1>
        <h2 class="demo_home__desc">
            轻量、可靠的移动端 Vue 组件库
            <a href="https://youzan.github.io/vant/#/zh-CN/quickstart" target="_Blank">进入官网</a>
        </h2>
        <van-cell-group>
            <van-field v-model="userAccount" class="input_style" placeholder="请输入账号" />
        </van-cell-group>
        <van-cell-group>
            <van-field type="password" v-model="userPassword" class="input_style" placeholder="请输入密码" />
        </van-cell-group>
        <van-button round type="info" @click="handSubmit" class="input_style">登录</van-button>
        
    </div>
</template>

<script>
import Axions from '@/request/Axios.js'
export default {
	components: {
    },
	props: {},
	data() {
		return {   
            userAccount:'admin',  
            userPassword:'123456',
        }
	},
	computed: {},
	created() {},
	mounted() {
      
    },
	watch: {},
	methods: {
        handSubmit(){
            if(this.userAccount === ''){
                this.$toast('请输入用户账号')
                return;
            }
            if(this.userPassword === ''){
                this.$toast('请输入用户密码')
                return;
            }
            localStorage.setItem('tabBarActive',0)
            Axions.post('api/login',{
                userName:this.userAccount,
                passWord:this.userPassword,
            }).then((res)=>{
                if(res.success){
                    window.setToken(res.data.token)
                    this.$router.push({
                        name:'layout/home',
                    })
                }
                //console.log(res)
            })
           
            
        }
    }
}
</script>

<style scoped lang="less">
.input_style{
    margin-top: 20px;
}
.demo_home_title{
    font-size: 32px;
    margin: 0 0 16px;
    width: 100%;
    height: 70px;
    padding-left: 16px;
    line-height: 70px;
    img{
        height: 100%;
        display: inline-block;
        vertical-align: middle;
    }
    span{
        margin-left: 16px;
        font-weight: 500;
    }
}
.demo_home__desc{
    padding-left: 16px;
    margin: 0 0 40px;
    color: rgba(69, 90, 100, 0.6);
    font-size: 28px;
}
</style>
