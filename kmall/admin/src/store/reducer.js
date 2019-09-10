/*
* @Author: TomChen
* @Date:   2019-08-12 10:29:05
* @Last Modified by:   TomChen
* @Last Modified time: 2019-08-14 10:59:09
*/
import { combineReducers } from 'redux-immutable'//让整个store的数据都变成immutable数据
import { reducer as loginReducer } from 'pages/login/store'
import { reducer as homeReducer } from 'pages/home/store'
import { reducer as userReducer } from 'pages/user/store'
import { reducer as categoryReducer } from 'pages/category/store'
import { reducer as productReducer } from 'pages/product/store'
import { reducer as adReducer } from 'pages/ad/store'
import { reducer as orderReducer } from 'pages/order/store'


export default combineReducers({//把各种reducer合并
    home:homeReducer,
    login:loginReducer,
    user:userReducer,
    category:categoryReducer,
    product:productReducer,
    ad:adReducer,
    order:orderReducer,
})
