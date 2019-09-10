const mongoose = require('mongoose');
const moment = require('moment')
const pagination=require('./../util/pagination.js')
 
const ArticleSchema = new mongoose.Schema({//定义Schema
		title:{
	        type:String,
	        required:[true,"文章标题必须输入"],
	    }, 
	    intro:{
	        type:String,
	    },
	    user:{
	        type:mongoose.Schema.Types.ObjectId,
	        ref:'user'
	    },
	    category:{
	        type:mongoose.Schema.Types.ObjectId,
	        ref:'category'        
	    },
	    createdAt:{
	        type:Date,
	        default:Date.now
	    },
	    click:{
	        type:Number,
	        default:0
	    },
	    content:{
	        type:String
	    }
	});
 
ArticleSchema.virtual('createdTime').get(function(){
	return new Date(this.createdAt).toLocaleString()
})
ArticleSchema.statics.getPaginationArticlesData=function(req,query={}){//获取分页数据
	let page = req.query.page//获取前端发送的当前页数
    const options = {
        page:page,
        model:ArticleModel,
        query:query,
        sort:{_id:-1},
        projection:"-__v",
        populates:[{path: 'user', select: 'username' },{path: 'category', select: 'name'}]
    }
   return pagination(options)
   
}
const ArticleModel = mongoose.model('article', ArticleSchema);//定义模型
module.exports=ArticleModel//导出 