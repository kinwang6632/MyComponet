import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Date from '../views/Date.vue'
import Date2 from '../views/Date2.vue'
import ShowDateExample from '../views/ShowDateExample.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/date',
    name:'Date',
    component : Date
  },
  {
    path:'/date2',
    name:'Date2',
    component:Date2
  },
  {
    path:'/showdateexample',
    name:'ShowDateExample',
    component:ShowDateExample
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
