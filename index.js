// import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import App from './src/views/app.vue';

// const Vue = require('vue');
// const ElementUI = require('element-ui');

Vue.use(ELEMENT);
// import {Pagination,Dialog,Menu,MenuItem,Input,
//     Radio,Select,Option,Table,TableColumn,Button,
//     DatePicker,Form,FormItem,Tabs,TabPane,Cascader,
//     Message,MessageBox} from 'element-ui';
// Vue.use(Pagination);
// Vue.use(Dialog);
// Vue.use(Menu);
// Vue.use(MenuItem);
// Vue.use(Input);
// Vue.use(Radio);
// Vue.use(Select);
// Vue.use(Option);
// Vue.use(Button);
// Vue.use(Table);
// Vue.use(TableColumn);
// Vue.use(DatePicker);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Tabs);
// Vue.use(TabPane);
// Vue.use(Cascader);
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$message = Message;


import createVuex from './store/index.js';
import createRouter from './vue-router/router.js'

Vue.use(Vuex);
Vue.use(VueRouter);
const router = createRouter();
const store = createVuex();

new Vue({
    el: "#root",
    router,
    store,
    render: (h) => h(App)
});



