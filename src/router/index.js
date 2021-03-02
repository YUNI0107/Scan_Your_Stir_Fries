import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Dishes from '../views/Dishes/Dishes.vue'
import Menu from '../views/Menu/Menu.vue'
import MenuList from '../views/MenuList/MenuList.vue'
import Cart from '../views/Cart/Cart.vue'
import Lottery from '../views/Lottery/Lottery.vue'
import Question from '../views/Question/Question.vue'


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
  {
    path: '/lottery',
    name: 'lottery',
    component: Lottery
  },
  {
    path: '/question/:id',
    name: 'question',
    component: Question,
    beforeEnter: (to, from, next) => {
      if(to.params.id == 0 || to.params.id > 10){
        let q_id = Math.floor(Math.random() * 10 + 1);
        next({ name: "question", params: { id: q_id } });
      }else{
        next()
      }
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
