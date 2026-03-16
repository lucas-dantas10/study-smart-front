<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-primary-50 via-background-light to-secondary-50 dark:from-background-dark dark:via-surface-dark dark:to-background-dark text-gray-800 dark:text-gray-100 px-6 py-12"
  >
    <div
      class="bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center border border-gray-100 dark:border-gray-800"
    >
      <h1
        class="text-8xl font-extrabold mb-6 tracking-wide text-primary-500 animate-pulse"
      >
        404
      </h1>
      <p
        class="text-xl font-semibold mb-8 leading-relaxed text-gray-600 dark:text-gray-400"
      >
        Ops! A página que você está procurando não foi encontrada.
      </p>
      <button
        @click="goHome"
        class="inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-500/20 text-white font-bold text-lg px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary-500/20 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Voltar para Início
      </button>
    </div>
  </div>
</template>
