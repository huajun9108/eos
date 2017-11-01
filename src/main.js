// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';
import $ from './assets/js/jquery-1.10.1.min'
import './assets/bootstrap/js/bootstrap.min.js'
import './assets/bootstrap/css/bootstrap.min.css'
import './assets/icomoon/style.css'
const qs = require('qs')
import axios from 'axios'
import "./assets/js/jquery-1.4.4.min.js";
import "./assets/js/jquery.ztree.core.js";
import "./assets/js/jquery.ztree.excheck.js";
import "./assets/js/jquery.ztree.exedit.js";
import "./assets/js/jquery.ztree.exhide.js";
import "./assets/js/tip.js"

Vue.use(VueRouter);
Vue.config.productionTip = false

/* eslint-disable no-new */

// 路由配置
const RouterConfig = {
    mode: 'history',
};
const router1 = new VueRouter(RouterConfig);

router1.beforeEach((to, from, next) => {
    next();
});

router1.afterEach(() => {
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
