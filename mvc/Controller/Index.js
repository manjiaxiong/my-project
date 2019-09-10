/*
* @Author: TomChen
* @Date:   2019-07-26 16:52:36
* @Last Modified by:   TomChen
* @Last Modified time: 2019-07-26 16:54:05
*/
const {get:getItem,add:addItem,del:delItem}=require('./../model/item.js');
const path=require('path');
const swig=require('swig');
const querystring=require('querystring')
const UserModel=require('./../modules/users.js')
class Controller{
   index(req,res,...args){
        //1.获取数据
        getItem()
        .then(data=>{
            //将数据分配到页面并返回页面
            console.log("data222222222222",data)
            const filePath = path.normalize(__dirname+"/../View/Item/index.html")
            //引入模版
            const template = swig.compileFile(filePath)
            
            const html = template({
                data:data
            })
            res.setHeader('Content-type',"text/html;charset=UTF-8")
            res.end(html) 
        })
        .catch(err=>{
            console.log('err:',err)
            res.setHeader('Content-type',"text/html;charset=UTF-8")
            res.statusCode = 404
            res.end('<h1>请求出错了</h1>')
        })
    }
}

module.exports = new Controller()