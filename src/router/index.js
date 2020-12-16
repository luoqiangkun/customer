import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '@/views/home'
import homeSearch from '@/views/home/search'
import homeGoods from '@/views/home/goodsDetail'
import homeDeal from '@/views/home/dealOrder'

import search from '@/views/search'
import cart from '@/views/cart'

import shop from '@/views/shop'
import shopSearch from '@/views/shop/search'
import shopGoods from '@/views/shop/goodsDetail'
import shopDeal from '@/views/shop/dealOrder'

import store from '@/views/store'
import storeSearch from '@/views/store/search'
import storeGoods from '@/views/store/goodsDetail'
import storeDeal from '@/views/store/dealOrder'


import orderHome from '@/views/orderHome'
import login from '@/views/login'
import placeOrder from '@/views/placeOrder'
import successPlaceOrder from '@/views/successPlaceOrder'
import user from '@/views/user'


import table from '@/views/table'
import userOrder from '@/views/userOrder'
import order from '@/views/order'
import orderInfo from '@/views/order/info'
import orderLists from '@/views/order/lists'
import orderDetail from '@/views/order/detail'

import returnLists from '@/views/return/lists'
import returnDetail from '@/views/return/detail'
import returnManage from '@/views/return/manage'

import confirm from '@/views/confirm'
import confirmOrder from '@/views/confirmOrder'

import queue from '@/views/queue'

import pay from '@/views/pay'
import paySuccess from '@/views/paySuccess'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/user'
    },
    {
      path:'/home/:store_id/:table_id',
      name:'home',
      component:home
    },
    {
      path:'/homeSearch/:store_id/:table_id',
      name:'homeSearch',
      component:homeSearch
    },
    {
      path:'/homeGoods/:id/:table_id',
      name:'homeGoods',
      component:homeGoods
    },
    {
      path: '/homeDeal/:cart_id?/:order_id?',
      name: 'homeDeal',
      component: homeDeal
    },
    {
      path:'/shop/:store_id',
      name:'shop',
      component:shop
    },
    {
      path:'/shopSearch/:store_id',
      name:'shopSearch',
      component:shopSearch
    },
    {
      path:'/shopGoods/:id',
      name:'shopGoods',
      component:shopGoods
    },
    {
      path: '/shopDeal/:cart_id',
      name: 'shopDeal',
      component: shopDeal
    },
    {
      path:'/store/:store_id',
      name:'store',
      component:store
    },
    {
      path:'/storeSearch/:store_id',
      name:'storeSearch',
      component:storeSearch
    },
    {
      path:'/storeGoods/:id',
      name:'storeGoods',
      component:storeGoods
    },
    {
      path: '/storeDeal/:cart_id',
      name: 'storeDeal',
      component: storeDeal
    },
    {
      path:'/cart/',
      name:'cart',
      component:cart
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path: '/orderHome/:store_id/:table_id?',
      name: 'orderHome',
      component: orderHome
    },
    {
      path: '/table',
      name: 'table',
      component: table
    },
    {
      path: '/placeOrder/:id',
      name: 'placeOrder',
      component: placeOrder
    },
    {
      path: '/successPlaceOrder/:id',
      name: 'successPlaceOrder',
      component: successPlaceOrder
    },
    {
      path: '/userOrder',
      name: 'userOrder',
      component: userOrder
    },
    {
      path: '/order/:id',
      name: 'order',
      component: order
    },
    {
      path: '/orderInfo/:id',
      name: 'orderInfo',
      component: orderInfo
    },
    {
      path: '/orderLists',
      name: 'orderLists',
      component: orderLists
    },
    {
      path: '/orderDetail/:id',
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/confirm/:cart_id?/:order_id?',
      name: 'confirm',
      component: confirm
    },
    {
      path: '/pay/:order_id/:order_amount',
      name: 'pay',
      component: pay
    },
    {
      path: '/paySuccess/:id',
      name: 'paySuccess',
      component: paySuccess
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/queue/:id',
      name: 'queue',
      component: queue
    },
    {
      path: '/returnLists',
      name: 'returnLists',
      component: returnLists
    },
    {
      path: '/returnDetail/:id',
      name: 'returnDetail',
      component: returnDetail
    },{
      path: '/returnManage/:id',
      name: 'returnManage',
      component: returnManage
    }
  ]
})
