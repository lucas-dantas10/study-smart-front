<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="bg-white min-h-screen font-poppins flex flex-col">
    <nav class="flex justify-between items-center px-8 h-16 shadow-sm bg-white">
      <div class="font-bold text-lg tracking-wide">
        StudySmart
      </div>
      <div class="flex items-center gap-6">
        <span class="text-base text-gray-900 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100">
          Home
        </span>
        <span class="text-base text-gray-900 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100">
          Decks
        </span>
        <span class="text-base text-gray-900 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100">
          Stats
        </span>
        <span class="text-xl cursor-pointer" aria-label="Configurações">⚙️</span>
        <img
          class="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          aria-label="Perfil do usuário"
        />
      </div>
    </nav>
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
  </div>
</template>
