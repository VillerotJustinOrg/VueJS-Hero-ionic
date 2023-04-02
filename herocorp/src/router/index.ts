import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'profile',
        component: () => import('@/views/ProfileView.vue')
      },
      {
        path: 'teams',
        component: () => import('@/views/TeamsView.vue')
      },
      {
        path: 'orgs',
        component: () => import('@/views/OrganisationView.vue')
      },
      {
        path: 'auth',
        component: () => import('@/views/AuthView.vue')
      },
      {
        path: 'home',
        component: () => import('@/views/HView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
