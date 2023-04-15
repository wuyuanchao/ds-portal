export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/inquiries',
    name: 'inquiry',
    icon: 'crown',
    component: './InquiryList',
  },
  {
    path: '/inquiries/:name',
    name: '询价单详情',
    hideInMenu: true,
    component: './InquiryList/detail',
  },
  {
    path: '/products',
    name: 'products',
    icon: 'table',
    component: './GoodsList',
  },
  {
    path: '/products/:goodsId',
    name: '商品详情',
    hideInMenu: true,
    component: './TableList/detail',
  },
  {
    path: '/welcome',
    component: './Welcome',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
