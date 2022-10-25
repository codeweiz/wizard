import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../components/login/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('../components/register/Register.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
