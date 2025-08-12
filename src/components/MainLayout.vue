<script setup>
import { computed, onMounted, ref } from 'vue';
import { me } from '@/services/auth/authService.js';
const user = ref({});

onMounted(async () => {
  user.value = await me();
});

const userPhoto = computed(() => {
  return user.value.picture
    ? user.value.picture
    : 'https://www.gravatar.com/avatar/?d=mp';
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen font-poppins flex flex-col">
    <nav class="flex justify-between items-center px-8 h-16 shadow-sm bg-white dark:bg-gray-800">
      <div class="font-bold text-lg tracking-wide text-gray-900 dark:text-white">
        StudySmart
      </div>
      <div class="flex items-center gap-6">
        <router-link
          to="/"
          class="text-base text-gray-900 dark:text-white font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Início
        </router-link>
        <router-link
          to="/decks"
          class="text-base text-gray-900 dark:text-white font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Decks
        </router-link>

        <router-link
          to="/profile"
          class="flex items-center justify-center cursor-pointer"
          aria-label="Abrir perfil do usuário"
        >
          <img
            class="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            :src="userPhoto"
            alt="Foto de perfil"
          />
        </router-link>
      </div>
    </nav>
    <main class="w-full flex flex-col flex-1 text-gray-900 dark:text-white">
      <router-view />
    </main>
  </div>
</template>
