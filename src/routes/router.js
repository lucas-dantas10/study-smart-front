import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/components/MainLayout.vue';
import CardPage from '@/views/CardPage.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
    //   {
    //     path: '',
    //     component: HomePage
    //   },
      {
        path: '/card',
        component: CardPage,
        name: 'CardPage'
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
