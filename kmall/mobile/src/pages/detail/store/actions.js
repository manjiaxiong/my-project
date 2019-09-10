import api from 'api'

import {GET_DETAILE} from './types.js'
export default {

    async [GET_DETAILE]({commit},detailId){
    	// console.log(detailId)
        const result = await api.getProductsDetail({
        	id:detailId
        })
        if(result.code == 0){
            commit(GET_DETAILE,{detaile:result.data})
        }
    }                  
}