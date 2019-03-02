import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './src/views/app.vue';


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import createRouter from './vue-router/router.js'


Vue.use(VueRouter);
const router = createRouter();

new Vue({
    el:"#root",
    router,
    render: (h) => h(App)
});



