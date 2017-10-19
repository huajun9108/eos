// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router';

const qs = require ('qs')
import axios from 'axios'

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
