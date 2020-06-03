import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import logout from '@/views/logout'
import main from '@/views/manageinfo/main'
import first from '@/views/manageinfo/first'
import usercontrol from '@/views/manageinfo/usercontrol'
import productkind from '@/views/product/productkind'
import productlist from '@/views/product/productlist'
import supplier from '@/views/import/supplier'
import newlist from '@/views/import/newlist'
import requestlist from '@/views/import/requestlist'
import compelete from '@/views/import/compelete'
import instock from '@/views/stockmanage/instockreg'
import outstock from '@/views/stockmanage/outstockreg'
import requeststock from '@/views/stockmanage/requeststock'
import stockcheck from '@/views/stockmanage/stockcheck'
import client from '@/views/sales/client'
import newsaleslist from '@/views/sales/newsaleslist'
import salescompelete from '@/views/sales/salescompelete'
import requestsales from '@/views/sales/requestsales'
import receive from '@/views/finance/receive'
import monthreport from '@/views/monthreport/monthreport'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: login
    },
    {
      path: '/manageinfo',
      // redirect: '/manageinfo/first',
      component: main,
      meta: {
        title: "管理信息"
      },
      children: [{
          path: '',
          component: first,
          meta: {
            title: "首页"
          },
        },
        {
          path: '/manageinfo/usercontrol',
          component: usercontrol,
          meta: {
            title: "用户管理"
          },
        },
        {
          path: '/manageinfo/logout',
          component: logout,
        },
        {
          path: '/productmanage',
          meta: {
            title: "产品管理"
          }
        },
        {
          path: '/productmanage/productkind',
          component: productkind,
          meta: {
            title: "产品分类列表"
          }
        },
        {
          path: '/productmanage/productlist',
          component: productlist,
          meta: {
            title: "产品列表"
          }
        },
        {
          path: '/purchase',
          name: 'purchase',
          meta: {
            title: "采购管理"
          },
        },

        {
          path: '/purchase/supply',
          component: supplier,
          meta: {
            title: "供应商管理"
          }
        },
        {
          path: '/purchase/newlist',
          component: newlist,
          meta: {
            title: "新增采购单"
          }
        },
        {
          path: '/purchase/requestlist',
          component: requestlist,
          meta: {
            title: "采购单查询"
          }
        },
        {
          path: '/purchase/compelete',
          component: compelete
        },
        {
          path:'/stock/instock',
          component:instock,
          meta: {
            title: "入库登记"
          }
        },
        {
          path:'/stock/outstock',
          component:outstock,
          meta: {
            title: "出库登记"
          }
        },
        {
          path:'/stock/requeststock',
          component:requeststock,
          meta: {
            title: "库存查询"
          }
        },
        {
          path:'/stock/stockcheck',
          component:stockcheck,
          meta: {
            title: "库存盘点"
          }
        },
        {
          path:'/sales/client',
          component:client,
          meta: {
            title: "客户管理"
          }
        },
        {
          path:'/sales/newsaleslist',
          component:newsaleslist,
          meta: {
            title: "新增销售单"
          }
        },
        {
          path:'/sales/salescompelete',
          component:salescompelete,
          meta: {
            title: "销售单了结"
          }
        },
        {
          path:'/sales/requestsales',
          component:requestsales,
          meta: {
            title: "销售单查询"
          }
        },
        {
          path:'/finance/receive',
          component:receive,
          meta: {
            title: "收款登记"
          }
        },
        {
          path: '/monthreport',
          component: monthreport,
          meta: {
            title: "月度报表"
          }
        }
      ]
    },










  ]
})
