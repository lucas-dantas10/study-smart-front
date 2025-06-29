<script setup>
</script>

<template>
    <main class="flex flex-col items-center mt-16">
      <h1 class="text-2xl font-bold mb-8">
        What is the capital of France?
      </h1>
      <button
        class="bg-blue-600 text-white text-lg px-10 py-4 rounded-xl mb-9 cursor-pointer font-semibold transition-colors duration-200 shadow hover:bg-blue-700"
        aria-label="Mostrar resposta"
      >
        Show Answer
      </button>
      <div class="flex gap-6">
        <button
          class="bg-gray-100 text-gray-900 text-base px-9 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow hover:bg-gray-200"
          aria-label="Fácil"
        >
          Easy
        </button>
        <button
          class="bg-gray-100 text-gray-900 text-base px-9 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow hover:bg-gray-200"
          aria-label="Médio"
        >
          Medium
        </button>
        <button
          class="bg-gray-100 text-gray-900 text-base px-9 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow hover:bg-gray-200"
          aria-label="Difícil"
        >
          Difficult
        </button>
      </div>
    </main>
</template>
