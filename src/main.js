// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
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
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next()
    } // 如果即将进入登录路由，则直接放行
    else { //进入的不是登录路由
        if (to.path.split("/")[1] === 'user') {
            if (to.meta.requiresAuth && (sessionStorage.getItem('userAccessToken') === "001")) {
                next()
            } else {
                next({ path: '/login' })
            }
            //下一跳路由需要登录验证，并且还未登录，则路由定向到 登录路由

        } else if (to.path.split("/")[1] === 'index') {
            if (to.meta.requiresAuth && sessionStorage.getItem('adminAccessToken') === "002") {
                next()
            } else {
                next({ path: '/login' })
            }
        } else {
            next()
        }
        //如果不需要登录验证，或者已经登录成功，则直接放行
    }
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})