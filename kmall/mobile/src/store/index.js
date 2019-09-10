import Vue from 'vue'
import Vuex from 'vuex'

import home from 'pages/home/store'
import detail from 'pages/detail/store'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        home:home,
        detail:detail
    }
})
