import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './src/views/app.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import createVuex from './store/index.js';
import createRouter from './vue-router/router.js'

Vue.use(Vuex);
Vue.use(VueRouter);
const router = createRouter();
const store =createVuex();

new Vue({
    el:"#root",
    router,
    store,
    render: (h) => h(App)
});



