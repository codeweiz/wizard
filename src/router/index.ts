import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
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
    },
    {
        path: '/form',
        name: 'Form',
        component: () => import('../components/form/Form.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
