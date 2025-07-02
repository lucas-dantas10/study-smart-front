import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/components/MainLayout.vue';
import DeckPage from '@/views/DeckPage.vue';
import HomePage from '@/views/HomePage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: HomePage,
        name: 'HomePage'
      },
      {
        path: '/deck/:deckId',
        component: DeckPage,
        name: 'DeckPage',
        props: true
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundPage.vue')
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
