import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dishes from '../views/Dishes/Dishes.vue'
import Menu from '../views/Menu/Menu.vue'
import MenuList from '../views/MenuList/MenuList.vue'
import Cart from '../views/Cart/Cart.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
  {
    path: '/menulist',
    redirect: { name: 'menulist' , params:{id: 'pork'}}
  },
  {
    path: '/menulist/:id',
    name: 'menulist',
    component: MenuList,
    props: true,
  },
  {
    path: '/dishes/:id',
    name: 'dishes',
    component: Dishes,
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
