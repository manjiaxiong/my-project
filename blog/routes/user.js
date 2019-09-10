const express = require('express');
const router =express.Router();
const Usermodel=require('./../models/users.js');
const hmac=require('./../util/hmac.js')
//显示首页
router.post("/register",(req,res)=>{
	//1获取参数
	const {username,password}=req.body
	//同名验证
	Usermodel.findOne({username:username})
	.then(user=>{ 
		if(user){//有同名
			 res.json({
		    	status:10,
		    	message:"已有该名用户",
		    	user:user
		    })
		}else{//没有该名用户
			//插入数据
			Usermodel.insertMany({//3插入数据
				username:username,
				password:hmac(password),
				isAdmin:true
			})
			.then(user=>{
				res.json({
			    	status:0,
			    	message:"插入成功",
			    	user:user
			    })
			})
			.catch(err=>{
				console.log("插入失败",err)
			})

		}
	})
	.catch(err=>{
		console.log(err)
		res.json({
			    	status:10,
			    	message:"插入失败，请稍等",
			    	user:user
			    })
	})//注册操作
	
})
//登录
router.post("/login",(req,res)=>{//登陆操作
	//获取参数
	// console.log(req.cookies)
	const {username,password}=req.body;
	//验证
	Usermodel.findOne({username:username,password:hmac(password)},"username isAdmin")
	.then(user=>{
		if(user){//用户名 密码输入均正确(验证成功)
			//生成cookie并且返回
			// req.cookies.set('userInfo',JSON.stringify(user),{maxAge:1000*60*60*24})
			//添加session
			req.session.userInfo=user
			 res.json({
		    	status:0,
		    	message:"登陆成功",
		    	user:user
		    })
		}else{//（验证失败）
			res.send({
				status:10,
				message:"用户名或密码错误"
			})
		}
	})
	.catch(err=>{
		console.log("系统繁忙，请稍后再试")
		res.send({
			status:10,
			message:"系统繁忙，稍后再试"
		})
	})
})
//退出登录
router.get('/logout',(req,res)=>{
	// req.cookies.set('userInfo',null)
	req.session.destroy();
	res.json({
		status:0,
		message:"退出成功"
	})
})
 
module.exports=router;