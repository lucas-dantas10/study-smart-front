<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const deckId = route.params.deckId

const deckName = ref('Biology 101')

const cards = ref([
  { id: 1, front: 'O que é HTML?', back: 'Linguagem de marcação para a web.' },
  { id: 2, front: 'O que é CSS?', back: 'Linguagem de estilo.' },
  { id: 3, front: 'O que é JavaScript?', back: 'Linguagem de programação.' }
])

onMounted(() => {
  // Aqui você pode buscar os cards do deck usando deckId
})

function createCard() {
  alert('Criar novo card')
}

function editCard(cardId) {
  alert(`Editar card ${cardId}`)
}

function deleteCard(cardId) {
  if (confirm('Tem certeza que deseja excluir este card?')) {
    cards.value = cards.value.filter(c => c.id !== cardId)
  }
}
</script>

<template>
  <div class="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 text-[#121416] dark:text-white">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <div>
          <p class="tracking-light text-[32px] font-bold leading-tight min-w-72">Gerenciar Cards</p>
          <p class="text-[#60758a] dark:text-gray-400 text-sm">Deck: {{ deckName }}</p>
        </div>
        <button
          @click="createCard"
          class="flex items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f1f2f4] dark:bg-gray-700 text-[#121416] dark:text-white text-sm font-medium cursor-pointer"
        >
          Novo Card
        </button>
      </div>

      <div v-if="cards.length" class="flex flex-col gap-4 p-4">
        <div
          v-for="card in cards"
          :key="card.id"
          class="bg-[#f9fafa] dark:bg-gray-800 border border-[#f0f2f5] dark:border-gray-700 rounded-xl p-4 flex flex-col gap-2"
        >
          <div>
            <p class="text-base font-medium text-[#121416] dark:text-white">{{ card.front }}</p>
            <p class="text-sm text-[#60758a] dark:text-gray-400">{{ card.back }}</p>
          </div>
          <div class="flex gap-2 mt-2">
            <button
              @click="editCard(card.id)"
              class="flex items-center justify-center px-3 h-8 cursor-pointer bg-[#f1f2f4] dark:bg-gray-700 hover:bg-[#e1e2e4] dark:hover:bg-gray-600 text-sm text-[#121416] dark:text-white rounded-full transition"
            >
              Editar
            </button>
            <button
              @click="deleteCard(card.id)"
              class="flex items-center justify-center px-3 h-8 cursor-pointer bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700 text-sm text-red-700 dark:text-red-300 rounded-full transition"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center gap-4 mt-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-[#60758a] dark:text-gray-400" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9 6 9-6" />
        </svg>
        <p class="text-lg font-medium text-[#121416] dark:text-white">Nenhum card encontrado</p>
        <p class="text-sm text-[#60758a] dark:text-gray-400 text-center">
          Comece criando seu primeiro card neste deck.
        </p>
        <button
          @click="createCard"
          class="flex items-center justify-center overflow-hidden rounded-full h-8 px-4 bg-[#f1f2f4] dark:bg-gray-700 text-[#121416] dark:text-white text-sm font-medium cursor-pointer"
        >
          Criar Card
        </button>
      </div>
    </div>
  </div>
</template>
