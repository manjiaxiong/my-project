import axios from 'axios'
import { message } from 'antd'
import * as types  from './actionTypes.js'
import api from 'api'
import { saveUsername } from 'util'//储存用户信息
const getSetCountAction = (payload)=>({
    type:types.SET_COUNT,
    payload
})

export const getCountAction = (values)=>{
    return (dispatch,getState)=>{
        api.getCounts()
         .then(result=>{
            // console.log(result)
            if(result.code == 0){
                dispatch(getSetCountAction(result.data))//派发去reducer
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            console.log(err)
            message.error('网络错误,请稍后再试')
        })     
}
    }
/*
export const getCountAction = (values)=>{
    return (dispatch,getState)=>{
        axios({
            method: 'get',
            url:'http://127.0.0.1:3000/counts/',
            withCredentials:true
        })
        .then(result=>{
            const data  = result.data
            // console.log(data.data)
            if(data.code == 0){
                dispatch(getSetCountAction(data.data))//派发去reducer
            }else{
                message.error('获取首页数据失败,请稍后再试')
            }
        })
        .catch(err=>{
            message.error('网络错误,请稍后再试')
        })     
    }
}
*/



