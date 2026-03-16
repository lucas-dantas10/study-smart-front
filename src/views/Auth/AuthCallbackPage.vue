<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import LoadingOverlay from '@/components/LoadingOverlay.vue'

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
  <div class="flex justify-center items-center min-h-screen bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100">
    <LoadingOverlay :show="true" message="Entrando com Google..." />
  </div>
</template>
