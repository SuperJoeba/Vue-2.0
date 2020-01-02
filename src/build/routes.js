
// 页面路由

module.exports = [
  {
    name: '首页',
    path: '/',
    component: resolve => require.ensure(['../pages/home.vue'], require => require(['../pages/home.vue'], resolve), 'pages/home')
  },
    {
        name: '首页',
        path: '/home',
        component: resolve => require.ensure(['../pages/home.vue'], require => require(['../pages/home.vue'], resolve), 'pages/home')
    },
    {
        name: '登录',
        path: '/login',
        component: resolve => require.ensure(['../pages/login.vue'], require => require(['../pages/login.vue'], resolve), 'pages/login')
    },
    {
      name: '视频',
      path: '/videos',
      component: resolve => require.ensure(['../pages/videos.vue'], require => require(['../pages/videos.vue'], resolve), 'pages/videos')
  }
]