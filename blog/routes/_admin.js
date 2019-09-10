const express = require('express')
const UserModel=require('./../models/users.js')
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
    let page=req.query.page;//第一次是空
    const limit=2;
    page=parseInt(page);//字符串转变成数字
    if(isNaN(page)){
        page=1
    }
    //上一页边界控制
    if(page==0){
        page=1;
    }
    //生成页码数组
    
    UserModel.countDocuments((err,count)=>{
        const pages=Math.ceil(count / limit);//总页数
        
        //下一页边界
        if(page>pages){
            page=pages
        }
        if(page==0){//防止pages为0时skip出错
             page=1;
         }
        // console.log(page)
        // console.log(pages)
        const list=[];
        for(let i=1;i<=pages;i++){
            list.push(i)
        }
        const skip=(page-1)*limit;
        UserModel.find({},"-password")//拿到所有用户信息
        .sort({_id:-1})//降序排列（最新的放在前面）（默认第一页）
        .skip(skip)
        .limit(limit)
        .then(users=>{
             res.render("admin/userlist",{
                userInfo:req.userInfo,
                users:users,
                page:page,
                list:list,
                pages:pages
            })
        })
        .catch(err=>{
            console.log(err)
        })
    })
   
   
})

module.exports = router