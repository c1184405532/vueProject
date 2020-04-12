<template>
    <div class="layout_padding">
        <a-input  v-model="userAccount" class="input_style" placeholder="请输入账号" >
			<a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
		</a-input>
        <a-input type="password"  v-model="userPassword" class="input_style" placeholder="请输入密码" >
			<a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
		</a-input>
        <a-button class="input_style" type="primary" @click="handSubmit">登录</a-button>
    </div>
</template>

<script>

export default {
	components: {},
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
                this.$message.info('请输入用户账号')
                return;
            }
            if(this.userPassword === ''){
                this.$message.info('请输入用户密码')
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

<style scoped lang="less">
.input_style{
    margin-top: 20px;
}
</style>
