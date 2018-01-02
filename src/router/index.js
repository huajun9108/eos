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
import Lossmaping from "../views/lossmaping.vue";
import Savingbook from "../views/savingbook.vue"
import Datainput from "../views/datainput.vue"
import Useraccount from "../views/userAccount.vue"
import target from "../views/target.vue"
import Improvement from "../views/improvement.vue"
import Project from "../views/project.vue"
import Rca from "../views/rca.vue"
import ProductSet from "../views/productSet.vue";

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
                name: "area",
                meta: { requiresAuth: true },
            },
            {
                path: "account",
                component: Account,
                name: "account",
                meta: { requiresAuth: true },
            },
            {
                path: "dictionary",
                component: Dictionary,
                name: "dictionary",
                meta: { requiresAuth: true },
            },
            {
                path: "accountinfo",
                component: AccountInfo,
                name: "accountInfo",
                meta: { requiresAuth: true },
            },
            {
                path: "productset",
                component: ProductSet,
                name: "productset",
                meta: { requiresAuth: true },
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
                meta: { requiresAuth: true },
            },
            {
                path: "summary",
                component: Summary,
                name: "Project Summary",
                meta: { requiresAuth: true },

            },
            {
                path: "lossmaping",
                component: Lossmaping,
                name: "Loss Mapping",
                meta: { requiresAuth: true },
            },
            {
                path: "savingbook",
                component: Savingbook,
                name: "Saving Book",
                meta: { requiresAuth: true },
            },
            {
                path: "improvement",
                component: Improvement,
                name: "Improvement",
                children: [{
                        path: "project",
                        component: Project,
                        name: "project",
                        meta: { requiresAuth: true },
                    },
                    {
                        path: "rca",
                        component: Rca,
                        name: "rca",
                        meta: { requiresAuth: true },
                    },

                ],
                redirect: "/user/improvement/project",
            },
            {
                path: "datainput",
                component: Datainput,
                name: "Data Input",
                meta: { requiresAuth: true },
            },
            {
                path: "useraccount",
                component: Useraccount,
                name: "Account",
                meta: { requiresAuth: true },
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