const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({//定义Schema
	  username:{
	         type:String,
	         minlength:[3,"用户名最小长度为三个字符"],
	         maxlength:[10,"用户名最大长度为十个字符"]
		},
	  password:{
	         type:String,
	         required:[true,"密码必须输入"]
		},
	  isAdmin:{
			type:Boolean,
			default:false
		}
	 
	});
const UserModel = mongoose.model('user', UserSchema);//定义模型
module.exports=UserModel//导出