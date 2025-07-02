<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white px-6 py-12"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center"
    >
      <h1
        class="text-8xl font-extrabold mb-6 tracking-wide text-indigo-600 dark:text-indigo-400 select-none animate-pulse"
      >
        404
      </h1>
      <p
        class="text-xl font-semibold mb-8 leading-relaxed text-gray-700 dark:text-gray-300"
      >
        Ops! A página que você está procurando não foi encontrada.
      </p>
      <button
        @click="goHome"
        class="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-700 text-white font-semibold text-lg px-8 py-3 rounded-xl transition-shadow shadow-md hover:shadow-lg focus:outline-none"
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
