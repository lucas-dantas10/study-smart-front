<script setup>
import {computed, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';

const route = useRoute();
const router = useRouter();
const store = useStore();
const deckId = route.params.deckId;
const deckName = route.params.deckTitle;

const cards = computed(() => store.getters['card/cardsByDeck'](deckId));

onMounted(async () => {
  try {
    await store.dispatch('card/fetchCardsByDeck', {deckId, forceRefresh: false});
  } catch (error) {
  }
})

function createCard() {
  router.push({name: 'CreateCardFormPage'})
}

function editCard(cardId) {
  router.push({name: 'EditCardFormPage', params: {deckId, cardId}})
}

async function deleteCard(cardId) {
  if (confirm('Tem certeza que deseja excluir este card?')) {
    await store.dispatch('card/removeCard', {cardId, deckId});
  }
}

function goBack() {
  router.push({name: 'DeckPage'});
}
</script>

<template>
  <div class="px-40 flex flex-1 justify-center py-5 bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4 items-center">
        <div class="flex items-center gap-3">
          <button
              @click="goBack"
              class="flex items-center justify-center overflow-hidden rounded-full h-8 w-8 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-500 cursor-pointer transition shadow-sm"
              title="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <p class="tracking-light text-[32px] font-bold leading-tight min-w-72 text-primary-500">Gerenciar Cards</p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">Deck: {{ deckName }}</p>
          </div>
        </div>
        <button
            @click="createCard"
            class="flex items-center justify-center overflow-hidden rounded-full h-9 px-5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold cursor-pointer transition-all shadow-lg shadow-primary-500/10"
        >
          Novo Card
        </button>
      </div>

      <div v-if="cards.length" class="flex flex-col gap-4 p-4">
        <div
            v-for="card in cards"
            :key="card.id"
            class="bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div>
              <p class="text-base font-semibold text-gray-800 dark:text-gray-100">
                {{ card.front_text }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ card.back_text }}
              </p>
            </div>

            <div class="flex-shrink-0">
              <span
                  v-if="card.next_review_at"
                  class="inline-block text-xs sm:text-sm text-white bg-secondary-500 px-3 py-1 rounded-full whitespace-nowrap shadow-sm"
              >
                📅 {{ card.next_review_at }}
              </span>
              <span
                  v-else
                  class="inline-block text-xs sm:text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full whitespace-nowrap"
              >
                Nenhuma revisão
              </span>
            </div>
          </div>

          <div class="flex gap-2 mt-2">
            <button
                @click="editCard(card.id)"
                class="flex items-center justify-center px-4 h-8 cursor-pointer bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 text-sm text-primary-600 dark:text-primary-500 font-medium rounded-full transition"
            >
              Editar
            </button>
            <button
                @click="deleteCard(card.id)"
                class="flex items-center justify-center px-4 h-8 cursor-pointer bg-error-500/10 hover:bg-error-500/20 text-sm text-error-500 font-medium rounded-full transition"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center gap-4 mt-12 bg-surface-light dark:bg-surface-dark p-12 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-primary-500 animate-pulse" fill="none"
             viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9 6 9-6"/>
        </svg>
        <p class="text-xl font-bold text-gray-800 dark:text-gray-100">Nenhum card encontrado</p>
        <p class="text-base text-gray-500 dark:text-gray-400 text-center max-w-sm">
          Este deck ainda está vázio. Comece criando seu primeiro card agora para começar sua jornada!
        </p>
        <button
            @click="createCard"
            class="mt-4 flex items-center justify-center overflow-hidden rounded-full h-11 px-8 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold cursor-pointer transition-all shadow-lg hover:shadow-primary-500/20"
        >
          Criar Primeiro Card
        </button>
      </div>
    </div>
  </div>
</template>
