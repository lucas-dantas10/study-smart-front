<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();
const deckId = route.params.deckId;
const deckName = route.params.deckTitle;

const cards = computed(() => store.getters['card/cardsByDeck'](deckId));

onMounted(async () => {
  try {
    await store.dispatch('card/fetchCardsByDeck', deckId);
  } catch (error) {
    // noop
  }
})

function createCard() {
  router.push({ name: 'CreateCardFormPage' })
}

function editCard(cardId) {
  router.push({ name: 'EditCardFormPage', params: { deckId, cardId } })
}

async function deleteCard(cardId) {
  if (confirm('Tem certeza que deseja excluir este card?')) {
    await store.dispatch('card/removeCard', { cardId, deckId });
  }
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 text-[#121416] dark:text-white">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4 items-center">
        <div class="flex items-center gap-3">
          <button
            @click="goBack"
            class="flex items-center justify-center overflow-hidden rounded-full h-8 w-8 bg-[#f1f2f4] dark:bg-gray-700 text-[#121416] dark:text-white hover:bg-[#e1e2e4] dark:hover:bg-gray-600 cursor-pointer transition"
            title="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <p class="tracking-light text-[32px] font-bold leading-tight min-w-72">Gerenciar Cards</p>
            <p class="text-[#60758a] dark:text-gray-400 text-sm">Deck: {{ deckName }}</p>
          </div>
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
            <p class="text-base font-medium text-[#121416] dark:text-white">{{ card.front_text }}</p>
            <p class="text-sm text-[#60758a] dark:text-gray-400">{{ card.back_text }}</p>
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
