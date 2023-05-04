import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import HomeView from '@/views/HomeView.vue'
import CampaignsView from '@/views/CampaignsView.vue'
import CharactersView from '@/views/CharactersView.vue'
import InitiativeView from '@/views/InitiativeView.vue'
import SettingsView from '@/views/SettingsView.vue'

import CampaignDetailsView from '@/views/CampaignDetailsView.vue'
import CharacterDetailsView from '@/views/CharacterDetailsView.vue'

import { supabase } from '@/lib/supabaseClient'

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
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
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
        path: 'initiative',
        name: 'initiative',
        component: InitiativeView,
      },
      {
        path: 'settings',
        name: 'settings',
        component: SettingsView,
      },
      {
        path: 'campaign-details/:id',
        name: 'campaign-details',
        component: CampaignDetailsView,
      },
      {
        path: 'character-details/:id',
        name: 'character-details',
        component: CharacterDetailsView,
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
