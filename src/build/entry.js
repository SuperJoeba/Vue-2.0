// webpack 入口文件

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '../store/index'
import 'lib-flexible'
import title from './title'
import Notification from '../components/notification'


Vue.use(Notification)
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes
});


router.afterEach((to, from) => {
    // window.document.title = to.name
    title(to.name)
});

const app = new Vue({

    router,
    store

}).$mount('#app');
