import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import CampaignsView from '@/views/CampaignsView.vue'
import CharactersView from '@/views/CharactersView.vue'
import EncountersView from '@/views/EncountersView.vue'
import SettingsView from '@/views/SettingsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    children: [
      {
        path: 'campaigns',
        name: 'campaigns',
        component: CampaignsView,
      },
      {
        path: 'characters',
        name: 'characters',
        component: CharactersView,
      },
      {
        path: 'encounters',
        name: 'encounters',
        component: EncountersView,
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
