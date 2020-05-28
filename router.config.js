// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView } from '@/layouts'
import { openPermission } from '@/config/index'

// import exampleModle from '@/router/modules/example'
// import linkModle from '@/router/modules/link'

// 自定义 icon引入
// import { bxAnaalyse } from '@/core/icons'

// 默认加载和登陆成功跳转路由
export const defaultRootRoutePath = '/dashboard'

// 不跳转白名单路由名
export const whiteList = ['login']

// 前端未找到页面路由（固定不用改）
export const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true,
}

// 基础路由 固定不变的路由
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
    ],
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  },
]

// 同步路由 一般为前端写死的路由不通过接口获取
let syncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: `${defaultRootRoutePath}/Workplace`,
    children: [
      // 默认页
      {
        path: defaultRootRoutePath,
        name: 'dashboard',
        redirect: `${defaultRootRoutePath}/Workplace`,
        component: RouteView,
        meta: { title: '工作台', keepAlive: true, icon: 'dashboard', permission: ['dashboard'] },
        children: [
          {
            path: `${defaultRootRoutePath}/Workplace`,
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '首页', keepAlive: true, permission: ['dashboard'] },
          },
        ],
      },
      // exampleModle,
      // linkModle,
    ],
  },
]

if (!openPermission) {
  syncRouterMap.push(notFoundRouter)
}

export { syncRouterMap }
