const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({//定义Schema
	  task:{
	  	type:String
	  },
	 id:{
	 	type:String
	 }
	});
const UserModel = mongoose.model('user', UserSchema);//定义模型
module.exports=UserModel//导出