const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({//定义Schema
	  name:{
	         type:String,
	        required:[true,"分类必须输入"]
		},
	  order:{
	        type:String,
	        default:0
		},
	  isAdmin:{
			type:Number,
			default:0
		}
	 
	});
const CategoryModel = mongoose.model('category', CategorySchema);//定义模型
module.exports=CategoryModel//导出