<template>
    <div class="Login">
		<van-cell-group>
		  <van-field
		    v-model="username"
		    required
		    label="用户名"
		    placeholder="请输入用户名"
			:disabled="disabled"
		    :error-message="message"
		    @input="checkUsername(username)"

		  />

		  <van-field
		    v-model="password"
		    type="password"
		    label="密码"
		    placeholder="请输入密码"
		    required
		  />
		</van-cell-group>
		<van-button type="primary" @click="toLogin">登录</van-button> 
		<van-button type="primary" @click="toRegister">去注册</van-button> 
    </div>
</template>

<script>
	import {saveUsername} from 'util';
    export default {
        name:'Login',
        data() {
        return {
            username: '',
            password:'',
            phone:'',
            isSucess:false,
            message:'',
            disabled:false
	        }
	    },
	    methods:{
	    	toLogin:function(){
	    	},
	    	checkUsername:function(value){
	    		if(value.length>2){
	    			this.disabled=true
	    			this.message="最长字符为3"
	    		}
	    		else if(value){

	    		}
	    	},
	    	toRegister:function(){

	    	}
	    }
    }
</script>

<style>
  .van-button{
  	width: 50%;
  }
</style>