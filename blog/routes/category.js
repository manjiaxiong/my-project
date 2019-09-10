const express = require('express')
const UserModel=require('./../models/users.js')
const CategoryModel=require('./../models/category.js')
const pagination=require('./../util/pagination.js')
const router = express.Router()
//权限验证
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send('<h1>请用管理员账号登录</h1>')
    }
})

//显示分类管理首页
router.get('/', (req, res) => {
    let page=req.query.page;
    const options={
        page:page,
        model:CategoryModel,
        query:{},
        sort:{order:-1},
        projection:"-__v"
    }
   pagination(options)
   .then(data=>{
     res.render("admin/category-list",{
            userInfo:req.userInfo,
            categories:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/category"
        })       
   })
   .catch(err=>{
       console.log('get category err:',err) 
    }) 
})
//显示新增分类分类管理首页
router.get('/add', (req, res) => {
    res.render("admin/category-add-edit",{
        userInfo:req.userInfo
    })
})
//处理新增分类分类页面
router.post('/add', (req, res) => {
   //获取参数

   let {name,order}=req.body;
   if(!order){
        order=0
   }
   CategoryModel.findOne({name:name})
   .then(category=>{
        if(category){
            res.render('admin/err',{
                message:"分类已经存在",
                url:'/category'
            })
        }
        else{
            CategoryModel.insertMany({name:name,order:order})
            .then(categories=>{
               res.render("admin/success",{
                    message:"新增分类成功",
                })
            })
            .catch(err=>{
                let message="数据库操作失败";
                if(err.errors['name'].message){//
                    message=err.errors['name'].message
                }
               res.render("admin/err",{
                    message:message,
                    url:'/category'
                })
            })
        }
   })
   .catch(err=>{
        res.render("admin/err",{
            message:"数据库操作失败",
            url:'/category'
        })
   })
})

//显示编辑分类分类管理首页
router.get('/edit/:id', (req, res) => {
    const id=req.params.id;
    // console.log(id);
    CategoryModel.findById(id)
    .then(category=>{
      // console.log(111)
        res.render("admin/category-add-edit",{
            userInfo:req.userInfo,
            category:category
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            message:"数据库操作失败",
            url:'/category'
        })
   })
    
})
//处理编辑分类
router.post('/edit',(req,res)=>{
  let {name,order,id}=req.body;
  if(!order){
    order=0
  }
  // console.log(name,order,id)
  CategoryModel.findById(id)
  .then(category=>{
    // console.log(category)
    if(category.name==name&&category.order==order){//如果未改变值
      res.render("admin/err",{
            message:"请更新后再提交",
        })
    }
    else{
        CategoryModel.findOne({name:name,_id:{$ne:id}})//
        .then(category=>{
            if(category){//存在这个值
               res.render("admin/err",{
                  message:"分类名称哟已经存在",
              })
            }else{
              CategoryModel.updateOne({_id:id},{name:name,order:order})
              .then(category=>{
                 res.render("admin/success",{
                      message:"编辑成功",
                      url:'/category'
                  })
              })
               .catch(err=>{
                    res.render("admin/err",{
                        message:"数据库操作失败",
                    })
               })
            }
        })
    }
  })
   .catch(err=>{
        res.render("admin/err",{
            message:"数据库操作失败"
        })
   })
})
//处理删除操作
router.get('/delete/:id', (req, res) => {
    const id=req.params.id;
    // console.log(id);
    CategoryModel.deleteOne({_id:id})
    .then(category=>{
      // console.log(111)
        res.render("admin/success",{
            message:"删除成功",
            url:'/category'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            message:"删除失败",
            url:'/category'
        })
   })
    
})
module.exports = router