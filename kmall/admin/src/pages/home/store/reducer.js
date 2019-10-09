
import * as types  from './actionTypes.js'

import { fromJS } from 'immutable'

const defaultState = fromJS({
    usernum:0,
    ordernum:0,
    productnum:0   
})

export default (state=defaultState,action)=>{
    if(action.type == types.SET_COUNT){
        return state.merge({
            usernum:action.payload.usernum,
            ordernum:action.payload.ordernum,
            productnum:action.payload.productnum,  
        })
    }
    return state
}