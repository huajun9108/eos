import Vue from "vue" ;
import VueRouter from "vue-router";
Vue.use(VueRouter);

import App from "../App"
import Area from "../views/area.vue";
import Account from "../views/account.vue";
import Kpi from "../views/kpi.vue";
import LossCate from "../views/lossCate.vue";
import Index from "../views/index.vue";
import LossInto from "../views/lossInto.vue";
import Login from "../views/login.vue";
import AccountInfo from "../views/accountInfo.vue";


var routes=[
    {
         path:"/",
         redirect:"/login",
    },
    {
        path:"/index",
        component:Index,
        name:"index",
        redirect:"/index/area",
        children:[
            {
                path:"area",
                component:Area,
                name:"area"
            },
            {
                path:"account",
                component:Account,
                name:"account"
            },
            {
                path:"kpi",
                component:Kpi,
                name:"kpi"
            },
            {
                path:"losscate",
                component:LossCate,
                name:"lossCategory"
            },
            {
                path:"lossinto",
                component:LossInto,
                name:"lossInto"
            },
            {
                path:"accountinfo",
                component:AccountInfo,
                name:"accountInfo",
            },
            {path:"*",redirect:"/index/area"}
        ]
    },
   
    {
        path:"/login",
        component:Login,
        name:"login",
    },
   
    {
        path:"*",redirect:"/"
    }


]

const router = new VueRouter({
    routes
})
export default router