import 'babel-polyfill' //解决IE11空白事件
import Vue from 'vue'
// import '../static/css/index.css'
import '../static/theme/index.css'
import 'element-ui/lib/theme-chalk/display.css';
// import 'element-ui/lib/theme-chalk/index.css'
import ELEMENT from 'element-ui'
import Global from './common/Global'
import App from './App'
import router from './router'
import store from './store/store'
import VueQuillEditor from 'vue-quill-editor'
import 'common/stylus/common.styl';
import storeSi from 'si-store'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Print from 'vue-print-nb'
// window.Vue=Vue
Vue.use(Print);
Vue.use(VueQuillEditor)
Vue.use(Viewer, {
    defaultOptions: {
        zIndex: 9999
    }
})
Vue.use(ELEMENT);
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){
        // 判断该路由是否需要登录权限
        if (storeSi.get("tokenVal")||storeSi.get("navBarList")) {  // 判断当前的token是否存在
            next();
        }
        else {
            return next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })

        }
    }
    else {
        next();
    }
});
new Vue({
    el: '#app',
    store,
    router,
    Global,
    template: '<App/>',
    components: {App}
});

// router.afterEach((to, from, next) => {
//     /* 路由发生变化修改页面title */
//     if (to.meta.title) {
//         document.title = to.meta.title
//     }
// });
