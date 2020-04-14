<template>
    <div class="">
        <!-- <a-input  v-model="userAccount" class="input_style" placeholder="请输入账号" >
			<a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
		</a-input>
        <a-input type="password"  v-model="userPassword" class="input_style" placeholder="请输入密码" >
			<a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
		</a-input> -->
        <van-cell-group>
            <van-field v-model="userAccount" class="input_style" placeholder="请输入账号" />
        </van-cell-group>
        <van-cell-group>
            <van-field type="password" v-model="userPassword" class="input_style" placeholder="请输入密码" />
        </van-cell-group>
        <van-button round type="info" @click="handSubmit" class="input_style">登录</van-button>
        <div class="divs">
            文字文字
        </div>
    </div>
</template>

<script>
export default {
	components: {
    },
	props: {},
	data() {
		return {   
            userAccount:'',  
            userPassword:'',
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
            console.log({
                account:this.userAccount,
                password:this.userPassword
            })
        }
    }
}
</script>

<style scoped lang="css">
.input_style{
    margin-top: 20px;
}
.divs{
    width: 375px;
    height: 200px;
    background: #aaa;
    font-size: 40px;
}
</style>
