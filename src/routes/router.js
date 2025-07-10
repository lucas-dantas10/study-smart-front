import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/components/MainLayout.vue';
import StudyDeckPage from '@/views/StudyDeckPage.vue';
import HomePage from '@/views/HomePage.vue';
import DeckPage from '@/views/Deck/DeckPage.vue';

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
        component: StudyDeckPage,
        name: 'StudyDeckPage',
        props: true
      },
      {
        path: '/decks',
        component: DeckPage,
        name: 'DeckPage'
      },
      {
        path: '/decks/create',
        component: () => import('@/views/Deck/CreateDeckFormPage.vue'),
        name: 'CreateDeckFormPage'
      },
      {
        path: '/deck/:deckId/manage',
        name: 'ManageDeckPage',
        component: () => import('@/views/Deck/ManageDeckPage.vue'),
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
