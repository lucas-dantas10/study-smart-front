<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();
const baseUrl = import.meta.env.VITE_STUDY_SMART_API_BASE_URL;

function loginWithGoogle() {
  window.location.href = `${baseUrl}/oauth2/authorization/google`;
}
</script>

<template>
  <div class="flex justify-center items-center px-4 py-10 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
    <div class="w-full max-w-md bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center gap-6 transition">
      
      <h1 class="text-2xl font-bold text-center">Bem-vindo</h1>
      <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
        Entre para continuar usando o app
      </p>

      <button
        @click="loginWithGoogle"
        class="flex cursor-pointer items-center justify-center gap-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-3 transition-colors shadow w-full"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 bg-white rounded-full p-1" viewBox="0 0 48 48">
          <path fill="#EA4335" d="M24 9.5c3.1 0 5.9 1.1 8.1 3.1l6-6C34.6 2.4 29.6 0 24 0 14.6 0 6.3 5.7 2.5 14l7 5.4C11.6 13.6 17.3 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.1 24.5c0-1.4-.1-2.8-.4-4.1H24v8h12.4c-.6 3-2.4 5.6-5 7.3l7 5.4C43.7 36.2 46.1 30.8 46.1 24.5z"/>
          <path fill="#FBBC05" d="M9.5 28.6c-1.1-3-1.1-6.3 0-9.3l-7-5.4C-1.3 19.6-1.3 29.4 2.5 36.8l7-5.4z"/>
          <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-7-5.4c-2.2 1.5-5 2.3-9 2.3-6.7 0-12.4-4.1-14.5-9.9l-7 5.4C6.3 42.3 14.6 48 24 48z"/>
        </svg>
        Entrar com Google
      </button>
    </div>
  </div>
</template>
