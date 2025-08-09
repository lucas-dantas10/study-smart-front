import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/components/MainLayout.vue';
import StudyDeckPage from '@/views/StudyDeckPage.vue';
import HomePage from '@/views/HomePage.vue';
import DeckPage from '@/views/Deck/DeckPage.vue';
import LoginPage from '@/views/Auth/LoginPage.vue';

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/auth/callback',
    name: 'AuthCallback',
    component: () => import('@/views/Auth/AuthCallbackPage.vue')
  },  
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: HomePage,
        name: 'HomePage'
      },
      {
        path: '/profile',
        component: () => import('@/views/User/ProfilePage.vue'),
        name: 'ProfilePage'
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
        path: '/deck/:deckId/edit',
        name: 'EditDeckFormPage',
        component: () => import('@/views/Deck/EditDeckFormPage.vue'),
        props: true
      },
      {
        path: '/decks/:deckId/create/card',
        component: () => import('@/views/Card/CreateCardFormPage.vue'),
        name: 'CreateCardFormPage',
        props: true
      },
      {
        path: '/decks/:deckId/edit/card/:cardId',
        component: () => import('@/views/Card/EditCardFormPage.vue'),
        name: 'EditCardFormPage',
        props: true
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundPage.vue')
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'LoginPage' });
  } else {
    next();
  }
});

export default router;
