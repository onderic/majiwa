import { createRouter, createWebHistory } from 'vue-router'

import User from '@/layouts/User.vue'
import HomeView from '@/views/HomeView.vue'
import SymptomView from '@/views/SymptomView.vue'
import AddSymptom from '@/views/admin/AddSymptoms.vue'
import Hospital from '@/views/admin/Hostpital.vue'

import Register from '@/views/Authentication/Register.vue'
import Login from '@/views/Authentication/Login.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: User,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: '/user-symptoms',
          name: 'symptoms',
          component: SymptomView
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue')
        }
      ]
      
    },
    {
      path: '/admin/add/symptoms',
      name: 'addSymptom',
      component: AddSymptom
    },
    {
      path: '/admin/add/hospitals',
      name: 'addHospital',
      component: Hospital
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
   
   
  ]
})

export default router
