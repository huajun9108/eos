

//store  最大的容器 
//接收state , 注入到store 所有数据从store获取  store.state.

//接收action

//接收  mutations 

import Vue from "vue"
import Vuex from "vuex";
import state from "./state"
import mutations from "./mutations"
import actions from "./actions"
// import VueResource from "vue-resource"

Vue.use(Vuex)



const store = new Vuex.Store({
    state ,
    mutations,
    actions
})

export default store