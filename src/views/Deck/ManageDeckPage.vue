<script setup>
import {computed, onMounted, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

const route = useRoute();
const router = useRouter();
const store = useStore();
const deckId = route.params.deckId;
const deckName = route.params.deckTitle;

const cards = computed(() => store.getters['card/cardsByDeck'](deckId));

const filter = ref('')
const showDeleteModal = ref(false)
const cardToDelete = ref(null)

// filtra por texto da frente/verso ou por tag, só nos cards já carregados deste deck
const visibleCards = computed(() => {
  const term = filter.value.trim().toLowerCase()
  if (!term) return cards.value

  return cards.value.filter(card =>
    card.front_text.toLowerCase().includes(term) ||
    card.back_text.toLowerCase().includes(term) ||
    (card.tags || []).some(tag => tag.includes(term))
  )
})

onMounted(async () => {
  try {
    await store.dispatch('card/fetchCardsByDeck', {deckId, forceRefresh: false});
  } catch (error) {
  }
})

function createCard() {
  router.push({name: 'CreateCardFormPage', params: {deckId}})
}

function bulkAdd() {
  router.push({name: 'BulkAddCardsPage', params: {deckId}})
}

function editCard(cardId) {
  router.push({name: 'EditCardFormPage', params: {deckId, cardId}})
}

function deleteCard(cardId) {
  cardToDelete.value = cardId
  showDeleteModal.value = true
}

async function confirmDeleteCard() {
  if (cardToDelete.value) {
    await store.dispatch('card/removeCard', {cardId: cardToDelete.value, deckId});
    showDeleteModal.value = false
    cardToDelete.value = null
  }
}

function cancelDeleteCard() {
  showDeleteModal.value = false
  cardToDelete.value = null
}

function goBack() {
  router.push({name: 'DeckPage'});
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`
}
</script>

<template>
  <div class="px-2 sm:px-6 md:px-12 lg:px-24 flex flex-1 justify-center py-5 text-gray-800 dark:text-gray-100">
    <div class="flex flex-col max-w-[960px] flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4 items-center">
        <div class="flex items-center gap-3">
          <button
              @click="goBack"
              class="flex items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-fg-primary cursor-pointer transition"
              aria-label="Voltar para os decks"
              title="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold leading-tight">Gerenciar cards</h1>
            <p class="text-fg-muted text-sm">Deck: {{ deckName }}</p>
          </div>
        </div>
        <div class="flex gap-2">
          <button
              @click="bulkAdd"
              class="cursor-pointer rounded-xl h-10 px-4 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-fg-primary transition-colors"
          >
            Adicionar vários
          </button>
          <button
              @click="createCard"
              class="cursor-pointer rounded-xl h-10 px-5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold transition-colors"
          >
            Novo card
          </button>
        </div>
      </div>

      <div v-if="cards.length" class="px-4 pb-2">
        <label for="filter-cards" class="sr-only">Filtrar cards deste deck</label>
        <input
            id="filter-cards"
            v-model="filter"
            type="search"
            placeholder="Filtrar por texto ou tag"
            class="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-4 py-2.5 text-base focus:outline-0 focus:ring-2 focus:ring-primary-500/20 placeholder:text-fg-muted"
        />
        <p class="text-sm text-fg-muted mt-2" aria-live="polite">
          {{ filter.trim() ? `${plural(visibleCards.length, 'card encontrado', 'cards encontrados')} de ${cards.length}.` : plural(cards.length, 'card', 'cards') + ' neste deck.' }}
        </p>
      </div>

      <ul v-if="visibleCards.length" class="flex flex-col gap-3 p-4 list-none">
        <li
            v-for="card in visibleCards"
            :key="card.id"
            class="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col gap-3"
        >
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div class="min-w-0">
              <p class="text-base font-semibold text-gray-800 dark:text-gray-100 break-words">
                {{ card.front_text }}
              </p>
              <p class="text-sm text-fg-muted break-words">
                {{ card.back_text }}
              </p>
              <div v-if="card.tags && card.tags.length" class="flex flex-wrap gap-1.5 mt-2">
                <button
                    v-for="tag in card.tags"
                    :key="tag"
                    class="cursor-pointer text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-fg-muted hover:text-fg-primary px-2.5 py-0.5 transition-colors"
                    :title="`Filtrar pela tag ${tag}`"
                    @click="filter = tag"
                >
                  {{ tag }}
                </button>
              </div>
            </div>

            <p class="shrink-0 text-xs sm:text-sm rounded-full px-3 py-1 whitespace-nowrap"
               :class="card.next_review_at ? 'bg-primary-50 dark:bg-primary-500/15 text-fg-primary' : 'bg-gray-100 dark:bg-gray-800 text-fg-muted'">
              {{ card.next_review_at ? `Próxima revisão: ${card.next_review_at}` : 'Nunca revisado' }}
            </p>
          </div>

          <div class="flex gap-2">
            <button
                @click="editCard(card.id)"
                class="cursor-pointer px-4 h-9 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 text-sm text-fg-primary font-medium rounded-full transition"
            >
              Editar
            </button>
            <button
                @click="deleteCard(card.id)"
                class="cursor-pointer px-4 h-9 bg-error-500/10 hover:bg-error-500/20 text-sm text-fg-error font-medium rounded-full transition"
            >
              Excluir
            </button>
          </div>
        </li>
      </ul>

      <div v-else-if="cards.length" class="flex flex-col items-center gap-2 mt-8 p-8 text-center">
        <p class="font-semibold">Nenhum card encontrado</p>
        <button class="cursor-pointer text-sm text-fg-primary hover:underline" @click="filter = ''">Limpar filtro</button>
      </div>

      <div v-else class="flex flex-col items-center gap-4 mt-12 bg-surface-light dark:bg-surface-dark p-12 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
        <p class="text-xl font-bold text-gray-800 dark:text-gray-100">Este deck ainda não tem cards</p>
        <p class="text-base text-fg-muted text-center max-w-sm">
          Crie o primeiro card ou cole uma lista inteira de uma vez.
        </p>
        <div class="flex flex-col sm:flex-row gap-3 mt-2">
          <button
              @click="createCard"
              class="cursor-pointer rounded-xl h-11 px-8 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold transition-colors"
          >
            Criar primeiro card
          </button>
          <button
              @click="bulkAdd"
              class="cursor-pointer rounded-xl h-11 px-8 border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors"
          >
            Adicionar vários
          </button>
        </div>
      </div>

      <ConfirmationModal
          :show="showDeleteModal"
          title="Excluir card"
          message="Tem certeza que deseja excluir este card? Esta ação não pode ser desfeita."
          confirm-text="Excluir card"
          cancel-text="Cancelar"
          @confirm="confirmDeleteCard"
          @cancel="cancelDeleteCard"
      />
    </div>
  </div>
</template>
