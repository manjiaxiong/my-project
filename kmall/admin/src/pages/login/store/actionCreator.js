import axios from 'axios'
import { message } from 'antd'
import * as types  from './actionTypes.js'
import { saveUsername } from 'util'//储存用户信息
import api from 'api'
const getLoginReqestStartAction = ()=>({
    type:types.LOGIN_REQEST_START,
})
const getLoginReqestDoneAction = ()=>({
    type:types.LOGIN_REQEST_DONE,
})

export const getLoginAction = (values)=>{
    return (dispatch,getState)=>{
        dispatch(getLoginReqestStartAction())
        values.role = 'admin'
        api.login(values)
        .then(result=>{
            console.log('result:::',result)
            if(result.code == 0){//数据库中有该管理员信息
                //1.在前端保存登录信息
                saveUsername(result.data.username)
                //2.跳转到后台首页
                window.location.href = "/"
            }else{
                message.error(result.message)
            }            
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })
        .finally(()=>{
            dispatch(getLoginReqestDoneAction())
        })        
}
}



/*
export const getLoginAction = (values)=>{
     return (dispatch,getState)=>{
        dispatch(getLoginReqestStartAction())
        values.role = 'admin'
        axios({//向服务端发送请求 （管理员登录）
            method: 'post',
            url:'http://127.0.0.1:3000/sessions/users',
            data:values,
            withCredentials:true
        })
        .then(result=>{
            const data  = result.data
            if(data.code == 0){//数据库有该管理员信息
                //1.在前端保存登录信息
                saveUsername(data.data.username)
                //2.跳转到后台首页
                window.location.href = "/"
            }else{
                message.error(data.message)
            }
        })
        .catch(err=>{
           message.error('网络错误,请稍后再试')
        }) 
        .finally(()=>{
            console.log(1)
            dispatch(getLoginReqestDoneAction())
        })       
    }
}
*/



