<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const token = route.query.token;

try {
  if (token) {
    store.commit('auth/setToken', token);
    store.dispatch('auth/fetchMe').catch(() => {});
    router.replace({ name: 'HomePage' });
  } else {
    router.replace({ name: 'LoginPage' })
  }
} catch (e) {
  router.replace({ name: 'LoginPage' })
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <p>Processando login...</p>
  </div>
</template>
