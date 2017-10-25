import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import Area from "../views/area.vue";
import Account from "../views/account.vue";
import Dictionary from "../views/dictionary.vue";
import Index from "../views/index.vue";
import Login from "../views/login.vue";
import User from "../views/user.vue";
import AccountInfo from "../views/accountInfo.vue";
import Overview from "../views/overview.vue";
import Performance from "../views/performance.vue";
import Target from "../views/target.vue"
import Lossmaping from "../views/lossmaping.vue";
import Savingbook from "../views/savingbook.vue"
import Datainput from "../views/datainput.vue"
import Useraccount from "../views/useraccount.vue"
import Pert from "../views/pert.vue"
import Lossm from "../views/lossm.vue"


var routes = [{
        path: "/",
        redirect: "/login",
    },
    {
        path: "/index",
        component: Index,
        name: "index",
        redirect: "/index/area",
        children: [{
                path: "area",
                component: Area,
                name: "area"
            },
            {
                path: "account",
                component: Account,
                name: "account"
            },
            {
                path: "dictionary",
                component: Dictionary,
                name: "dictionary"
            },

            {
                path: "accountinfo",
                component: AccountInfo,
                name: "accountInfo",
            },
            { path: "*", redirect: "/index/area" }
        ]
    },
    {
        path: "/user",
        component: User,
        name: "user",
        redirect: "/user/overview",
        children: [{
                path: "overview",
                component: Overview,
                name: "overview",
                children: [{
                        path: "pert",
                        component: Pert,
                        name: "pert",
                    },
                    {
                        path: "lossm",
                        component: Lossm,
                        name: "lossm",
                    }
                ],
                redirect: "/user/overview/pert",
            },
            {
                path: "performance",
                component: Performance,
                name: "performance"
            },
            {
                path: "target",
                component: Target,
                name: "target"
            },
            {
                path: "lossmaping",
                component: Lossmaping,
                name: "lossmaping"
            },
            {
                path: "savingbook",
                component: Savingbook,
                name: "savingbook"
            },
            {
                path: "datainput",
                component: Datainput,
                name: "datainput",
            },
            {
                path: "useraccount",
                component: Useraccount,
                name: "useraccount",
            },
            { path: "*", redirect: "/user/overview/pert" }
        ]
    },

    {
        path: "/login",
        component: Login,
        name: "login",
    },

    {
        path: "*",
        redirect: "/"
    }


]

const router = new VueRouter({
    routes
})
export default router