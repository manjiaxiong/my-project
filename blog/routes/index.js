const express = require('express'); 
const router =express.Router();
const CategoryModel=require('./../models/category.js')
const ArticleModle=require('./../models/article.js')
const CommentModel=require('./../models/comment.js')
 
async function getCommonData(){
    const categoriesPromise=CategoryModel.find({},"name").sort({order:-1})
    const topArticlesPromise= ArticleModle.find({},"click title ").sort({click:-1}).limit(10)
    const categories=await categoriesPromise;
    const topArticles = await topArticlesPromise
    // console.log(topArticles)
    return {
        categories,
        topArticles
    }
}
 
//显示首页
router.get("/",(req,res)=>{
	
	// console.log("userInfo::::",userInfo);
    getCommonData()
    .then(data=>{
        const { categories,topArticles } = data
         ArticleModle.getPaginationArticlesData(req)
        .then(data=>{
            // console.log(data.page)
             res.render("main/index",{
                userInfo:req.userInfo,
                categories,
                topArticles,//右边的点击排行榜 
                
                //首页前端 分页数据
                articles:data.docs,
                page:data.page,
                list:data.list,
                pages:data.pages,
                url:"/"
            })
        })
    })
})
 
//处理文章分页数据ajax
router.get("/articles",(req,res)=>{
    const id = req.query.id
    const query = {}
    if(id){//有分类   （若无分类显示全部文章）
        query.category = id
    }
    // console.log("userInfo::::",userInfo);
    getCommonData()
        .then(data=>{
             ArticleModle.getPaginationArticlesData(req,query)
            .then(data=>{
               res.json({
                status:0,
                message:"获取数据成功",
                data:data
               })
            })
            .catch(err=>{
                res.json({
                status:10,
                message:"获取数据失败"
               })
            })
        })
    })
//显示列表
router.get("/list/:id",(req,res)=>{
	//render作用：
	//1替换block 
	//2把页面的html返回
    const id=req.params.id;
    getCommonData() 
    .then(data=>{
        const { categories,topArticles } = data
        console.log(topArticles)
         ArticleModle.getPaginationArticlesData(req,{category:id})
        .then(data=>{ 
            // console.log(data)
             res.render("main/list",{
                userInfo:req.userInfo,
                categories,
                topArticles,
                //首页前端 分页数据
                articles:data.docs,
                page:data.page,
                list:data.list,
                pages:data.pages,
                //回传分类Id
                currentCategoryId:id
                })
        })
    })
})
async function getDetailData(req){
    
    const id = req.params.id

    const commonDataPromise = getCommonData()
    const articlePromise = ArticleModle.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
                               .populate({path: 'user', select: 'username' })
                               .populate({path: 'category', select: 'name'})
    const commentPageDataPromise = CommentModel.getPaginationCommentsData(req,{article:id})
    const commonData = await commonDataPromise
    const article = await articlePromise
    const commentPageData = await commentPageDataPromise
    const { categories,topArticles } = commonData
    // console.log(commentPageData.docs)
    return {
        categories,
        topArticles,
        article,
        commentPageData
    }
}
 //显示详情
router.get('/detail/:id', (req, res) => {
    getDetailData(req)
    .then(data=>{
        const {categories,topArticles,article,commentPageData} = data
        res.render("main/detail",{
            userInfo:req.userInfo,
            categories,
            topArticles,
            article,
            //首次刷新的的评论数据,
            comments:commentPageData.docs,//显示的评论的详细信息
            page:commentPageData.page,//显示页数（默认是第一页）
            list:commentPageData.list,
            pages:commentPageData.pages,
            currentCategoryId:article.category._id//顶部标题显示正确颜色
        })        
    })
})

 
module.exports=router;