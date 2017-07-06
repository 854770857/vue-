import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views'// 主路由

import Home from '@/views/Home'// 首页
import Index1 from '@/views/Home/children/first'
import Children from '@/views/Home/children/list'

import ShopDetail from '@/views/ShopDetail'// 详情

import Shopping from '@/views/Shopping'// 购物
import Client from '@/views/Client'// 客户
import Contact from '@/views/Contact'// 我们

Vue.use(Router)

export default new Router({
  mode:"history",
  scrollBehavior (savedPosition){
   if(savedPosition) {
     return savedPosition;
   }else{
     return {x:0,y:0}
   }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect:"/home/index/1",
      children: [
      	{
      		path: "home",
      		name: "home",
      		component: Home,
          redirect:"/home/index/1",
          children:[
            {
              path: "index/1",
              name: "index",
              component: Index1
            },
            {
              path: "children/:id",
              name: "children",
              component: Children
            }
          ]
      	},
      	{
      		path: "shopping",// 购物车
      		name: "shopping",
      		component: Shopping
      	},
      	{
      		path: "client", // 客户
      		name: "client",
      		component: Client
      	},
      	{
      		path: "contact",// 我们
      		name: "contact",
      		component: Contact
      	},
        {
          path: '/shopdetail/:ProductID',//详情页
          name : 'shopdetail',
          component: ShopDetail
        }
      ]
    }
  ]
})
