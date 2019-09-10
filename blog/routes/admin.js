const express = require('express')
const UserModel=require('./../models/users.js');
const pagination=require('./../util/pagination.js')
const CommentModel=require('./../models/comment.js')
const hmac=require('./../util/hmac.js')
const router = express.Router()
//权限验证
router.use((req,res,next)=>{
    if(req.userInfo.isAdmin){
        next()
    }else{
        res.send('<h1>请用管理员账号登录</h1>')
    }
})

//显示后台管理首页
router.get('/', (req, res) => {
    res.render("admin/index",{
        userInfo:req.userInfo
    })
})
//显示用户列表
router.get('/users', (req, res) => {
/*
        分页分析：
        前提条件：要知道获取第几页，前端发送参数，page=？
        约定：每页显示几条数据，约定好每页显示两条数据limit=2
        第一页：显示第一条第二条（跳过0条）skip(0) limit(2)
        第二页：显示第三条第四条。。。。。（跳过2条）skip(2)limit(2)
        第三页：跳过四条显示5,6条 skip(4)limit(2)
            
        第page 页skin(page-1)*limit
*/
    let page=req.query.page;
    const options={
        page:page,
        model:UserModel,
        query:{},
        sort:{_id:-1},
        projection:"-password -__v"
    }
   pagination(options)
   .then(data=>{
     res.render("admin/userlist",{
            userInfo:req.userInfo,
            users:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/admin/users"
        })       
   })
   .catch(err=>{
       console.log('get users err:',err) 
    }) 
})
//显示后台评论列表
router.get('/comments', (req, res) => {
    CommentModel.getPaginationCommentsData(req)//获取所有评论数据
    .then(data=>{
        res.render("admin/comment-list",{
            userInfo:req.userInfo,
            comments:data.docs,
            page:data.page,
            list:data.list,
            pages:data.pages,
            url:"/admin/comments"
        }) 
    })
    .catch(err=>{
        console.log('get comments err:',err)
    })    
})
//处理删除操作
router.get('/comment/delete/:id', (req, res) => {
    const { id } = req.params
    CommentModel.deleteOne({_id:id})
    .then(result=>{
        res.render("admin/success",{
            message:"删除评论成功",
            userInfo:req.userInfo,
            url:'/admin/comments'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            message:"数据库操作失败",
             userInfo:req.userInfo,
            url:'/admin/comments'
        })
    })    
})
//显示修改密码页面
router.get('/password',(req,res)=>{
    res.render("admin/password",{
        userInfo:req.userInfo
    })
})
//处理修改密码
router.post('/password',(req,res)=>{
    const { password } = req.body
    UserModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
    .then(result=>{
        req.session.destroy()
        res.render("admin/success",{
            userInfo:req.userInfo,
            message:"修改密码成功,请重新登录",
            url:'/'
        })
    })
    .catch(err=>{
        res.render("admin/err",{
            userInfo:req.userInfo,
            message:"修改密码失败",
            url:'/admin/password'
        })
    })
})
module.exports = router