<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const token = route.query.token;

if (token) {
  localStorage.setItem('token', token);
  router.replace({ name: 'HomePage' });
} else {
  router.replace({ name: 'LoginPage' })
}
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <p>Processando login...</p>
  </div>
</template>
