import Vue from 'vue'
import Router from 'vue-router'

// 引入一级组件
import DashBoard from './../views/dashboard/DashBoard'
const Home = ()=> import('./../views/home/Home.vue');
const Category = ()=> import('./../views/category/Category.vue');
const Cart = ()=> import('./../views/cart/Cart.vue');

// 用户中心
const Mine = ()=> import('./../views/mine/Mine.vue');
const UserCenter = ()=> import('./../views/mine/children/UserCenter');
const MineOrder = ()=> import('./../views/mine/children/MineOrder');

// 引入组件相关
const Order = ()=> import('./../views/order/Order.vue');
const OrderDetail = ()=> import('./../views/order/children/OrderDetail.vue');
const MyAddress = ()=> import('./../views/order/children/MyAddress.vue');
const AddAddress = ()=> import('./../views/order/children/children/AddAddress.vue');
const EditAddress = ()=> import('./../views/order/children/children/EditAddress.vue');

// 引入登录
const Login = ()=> import('./../views/login/Login.vue');


Vue.use(Router);

export default new Router({
    routes: [
        {path: '/', redirect: '/dashboard'},
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashBoard,
          children: [
              {path: '/dashboard', redirect: '/dashboard/home'},
              {path: 'home', name:'home', component: Home, meta: { keepAlive: true}},
              {path: 'category', name:'category', component: Category, meta: { keepAlive: true}},
              {path: 'cart', name:'cart', component: Cart},
              {
                  path: 'mine',
                  name:'mine',
                  component: Mine,
                  children: [
                      {path: 'userCenter', component: UserCenter}, // 用户中心
                      {path: 'mineOrder', component: MineOrder} // 我的订单
                  ]
              }
          ]
        },
        {
            path: '/confirmOrder',
            name: 'order',
            component: Order,
            children: [
                {
                    path:'myAddress',
                    name: 'myAddress',
                    component: MyAddress,
                    children: [
                        // 添加地址
                        {path: 'addAddress', name:'addAddress', component: AddAddress},
                        {path: 'editAddress', name:'editAddress', component: EditAddress},
                    ]
                },
                {
                    path: 'orderDetail',
                    name: 'orderDetail',
                    component: OrderDetail
                }
            ]
        },
        {path: '/login', name: 'login', component: Login}
    ]
});