import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import Index from './views/index.vue';
import Json from './views/json.vue';
import Front from './views/front.vue';
import Qrcode from './views/qrcode.vue';

Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {path: '/', component: Index},
        {path: '/json', component: Json},
        {path: '/front', component: Front},
        {path: '/qrcode', component: Qrcode},
        {path: '*', redirect: '/'}
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
})
