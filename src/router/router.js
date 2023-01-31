import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import ViewRole from "@/views/ViewRole";
import Main from "@/views/Main";
import Home from "@/views/Home";
import Login from "@views/Login"

const routes = [
    {
        path:"/login",
        component:Login,
    },
    {
        path: '/',
        component: Main,
        redirect:'/home',
        children: [
            {
                path: '/home',
                name: '首页',
                component: Home
            },
            {
                path: '/user/userList',
                name: 'viewUser',
                // 动态加载组件
                component: () => import('../views/ViewUser.vue')
            },
            {
                path: '/role/roleList',
                name: 'viewRole',
                // 静态加载
                component: ViewRole
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
