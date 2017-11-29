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
import Summary from "../views/summary.vue";
import Target from "../views/target.vue"
import Lossmaping from "../views/lossmaping.vue";
import Savingbook from "../views/savingbook.vue"
import Datainput from "../views/datainput.vue"
import Useraccount from "../views/userAccount.vue"
import target from "../views/target.vue"
import Improvement from "../views/improvement.vue"
import Status from "../views/status.vue"
import Phase from "../views/phase.vue"
import Project from "../views/project.vue"
import Rca from "../views/rca.vue"


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
            {
                path: "target",
                component: target,
                name: "target",
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
                name: "Overview",
            },
            {
                path: "summary",
                component: Summary,
                name: "Project Summary",
                children: [{
                        path: "status",
                        component: Status,
                        name: "status",
                    },
                    {
                        path: "phase",
                        component: Phase,
                        name: "phase",
                    },

                ],
                redirect: "/user/summary/status",
            },
            {
                path: "lossmaping",
                component: Lossmaping,
                name: "Loss Mapping"
            },
            {
                path: "savingbook",
                component: Savingbook,
                name: "Saving Book"
            },
            {
                path: "improvement",
                component: Improvement,
                name: "Improvement",
                children: [{
                        path: "project",
                        component: Project,
                        name: "project",
                    },
                    {
                        path: "rca",
                        component: Rca,
                        name: "rca",
                    },

                ],
                redirect: "/user/improvement/project",
            },
            {
                path: "datainput",
                component: Datainput,
                name: "Data Input",
            },
            {
                path: "useraccount",
                component: Useraccount,
                name: "Account",
            },
            { path: "*", redirect: "/user/overview" }
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