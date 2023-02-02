<<<<<<< Updated upstream
import Vue from 'vue' //引入 Vue
import VueRouter from 'vue-router' //引入 Vue 路由
import Main from "@/views/Main";
import Home from "@/views/Home";
import ViewRole from "@/views/ViewRole";
=======
/* 
  路由管理
*/
import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import ViewRole from "@/views/ViewRole";
import Main from "@/views/Main";
import Home from "@/views/Home";
>>>>>>> Stashed changes

Vue.use(VueRouter); //安装插件

export const constantRouterMap = [
    //配置默认的路径，默认显示登录页
    { path: '/login', component: () => import('@/views/Login')},

    //配置登录成功页面，使用时需要使用 path 路径来实现跳转
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
                component: () => import(/* webpackChunkName: "about" */ '../views/ViewUser.vue')
            },
            {
                path: '/role/roleList',
                name: 'viewRole',
                // 静态加载
                component: ViewRole
            }
        ]
    },



    //配置登录成功页面，使用时需要使用 path 路径来实现跳转
    { path: '/success', component: () => import('@/views/success')},

    //配置登录失败页面，使用时需要使用 path 路径来实现跳转
    // { path: '/error', component: () => import('@/views/error'), hidden: true }
]

export default new VueRouter({
    mode:"history",
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap //指定路由列表
})