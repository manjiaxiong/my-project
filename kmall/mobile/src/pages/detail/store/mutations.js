import {GET_DETAILE} from './types.js'
export default {
    [GET_DETAILE](state,payload){
    	// console.log(payload.detaile)
        state.detaile = payload.detaile      
    }                 
}