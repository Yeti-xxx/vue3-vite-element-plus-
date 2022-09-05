import { createRouter, createWebHashHistory } from "vue-router";
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import User from '../components/User.vue'
import Update from '../components/Update.vue'
const Router = createRouter({
    history: createWebHashHistory(),
    // 声明路由规则
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login, name: 'login' },
        {
            path: '/home', component: Home, name: 'home',
            children: [
                { path: 'userinfo', component: User },
                { path: 'updateuserinfo', component: Update }
            ]
        },
    ]
})

// 声明路由守卫
Router.beforeEach((to, from, next) => {
    // 访问首页或登录也放行
    if (to.path === '/login') {
        return next();
    } else {
        // 如果访问为需带身份页面则判断是否具有token
        const tokenStr = localStorage.getItem('token');
        if (!tokenStr) {
            next('/login');
        } else {
            next();
        }
    }
})

export default Router;