<script setup>
import { ref } from 'vue'

const showAnswer = ref(false)

function revealAnswer() {
  showAnswer.value = true
}
</script>

<template>
  <div class="flex justify-center w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12">
    <div class="flex flex-col items-center w-full max-w-[600px]">
      <h1 class="text-3xl font-bold mb-4 text-center leading-snug">
        Qual a capital da França?
      </h1>

      <transition name="fade-slide" appear>
        <div
          v-if="showAnswer"
          class="w-full max-w-[300px] bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-4 mb-6 text-center shadow transition-all duration-200"
        >
          <p class="text-xl font-semibold">
            Paris
          </p>
        </div>
      </transition>

      <button
        v-if="!showAnswer"
        @click="revealAnswer"
        class="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white text-lg px-10 py-4 rounded-xl mb-10 cursor-pointer font-semibold transition-all duration-200 shadow-lg focus:outline-none w-full max-w-[300px]"
        aria-label="Mostrar resposta">
        Mostrar resposta
      </button>

      <div class="flex flex-wrap justify-center gap-4 w-full">
        <button
          class="flex-1 min-w-[120px] border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base px-6 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Fácil">
          Fácil
        </button>
        <button
          class="flex-1 min-w-[120px] border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base px-6 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Médio">
          Médio
        </button>
        <button
          class="flex-1 min-w-[120px] border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base px-6 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Difícil">
          Difícil
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
