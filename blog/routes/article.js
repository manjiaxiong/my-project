const express = require('express')
const multer = require('multer');
const upload = multer({dest:'public/uploads/'});
const ArticleModel=require('./../models/article.js')
const pagination=require('./../util/pagination.js')
const CategoryModel=require('./../models/category.js')
const router = express.Router()
//权限验证
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{ 
        res.send('<h1>请用管理员账号登录</h1>')
    }
})

//显示文章管理首页
router.get('/', (req, res) => {
    // let page = req.query.page
    // const options = {
    //     page:req.query.page,
    //     model:ArticleModel,
    //     query:{},
    //     sort:{_id:-1},
    //     projection:"-__v",
    //     populates:[{path: 'user', select: 'username' },{path: 'category', select: 'name'}]
    // } 
    // pagination(options)
    ArticleModel.getPaginationArticlesData(req)
    .then(data=>{ 
        // console.log("data.docs",data.docs)
        res.render("admin/article-list",{
            userInfo:req.userInfo,
            articles:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/article"
        })       
    })
    .catch(err=>{
       console.log('get articles err:',err) 
    })
})
//显示新增文章管理首页
router.get('/add', (req, res) => {
    CategoryModel.find({},"name")
    .sort({order:-1})
    .then(categories=>{
        res.render("admin/article-add",{
            userInfo:req.userInfo,
            categories
        })        
    })
})
//处理新增文章分类页面
router.post('/add', (req, res) => {
    const { title,category,intro,content } = req.body
    ArticleModel.insertMany({
        title,
        category,
        intro,
        content,
        user:req.userInfo._id
    })
    .then(articles=>{
        res.render("admin/success",{
            message:"新增文章成功",
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            message:"数据库操作失败",
            url:'/category'
        })
    })
})
//处理文章上传图片
router.post('/uploadImage',upload.single('upload'),(req,res)=>{
  // console.log(req.file)
  const uploadedFilePath = '/uploads/'+req.file.filename;
  res.json({
    uploaded:true,
    url:uploadedFilePath
  })
})
//显示编辑分类分类管理首页
router.get('/edit/:id', (req, res) => {
    const id=req.params.id;
    // console.log(id);
     CategoryModel.find({},"name")
    .sort({order:-1})
    .then(categories=>{
         ArticleModel.findById(id)
        .then(article=>{
          // console.log(categories)
            res.render("admin/article-edit",{
                userInfo:req.userInfo,
                article:article,
                categories:categories
            })
        })
        .catch(err=>{
            res.render("admin/err",{
                message:"数据库操作失败",
                url:'/article'
            })
       })
    })
})
//处理编辑分类
router.post('/edit',(req,res)=>{
  let {title,category,intro,content,id}=req.body;
  // console.log("id",id)
  ArticleModel.updateOne({_id:id},{title,category,intro,content})
    .then(article=>{
      // console.log(article);
       res.render("admin/success",{
            message:"文章编辑成功",
            url:'/article'
        })
    })
     .catch(err=>{
          res.render("admin/err",{
              message:"数据库操作失败",
          })
     })
})
//处理删除操作
router.get('/delete/:id', (req, res) => {
    const id=req.params.id;
    // console.log(id);
    ArticleModel.deleteOne({_id:id})
    .then(category=>{
      // console.log(111)
        res.render("admin/success",{
            message:"删除文章成功",
            url:'/article'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            message:"删除失败",
            url:'/article'
        })
   })
    
})
module.exports = router