<template>
    <div class="Me">
       <van-image
		  round
		  width="3rem"
		  height="3rem"
		  src="https://img.yzcdn.cn/vant/cat.jpeg"
		/>
		<van-button type="primary" @click="toLogin">登录</van-button>
    </div>
</template>

<script>
	import Vue from 'vue';
	import { getUsername } from 'util';
    export default {
        name:'Me',
        beforeCreate(){
        	if(!getUsername()){
        		window.location.href="/#/login"
        	}
        },
        methods:{
        	toLogin:function(){
        	}
        }
    }
</script>

<style>
 .van-button--normal{
 	/*width: 30px;*/
 }
  
</style>