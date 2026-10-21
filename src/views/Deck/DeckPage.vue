<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ConfirmationModal from '@/components/ConfirmationModal.vue';
import PaginationBar from '@/components/PaginationBar.vue';

const router = useRouter()
const store = useStore()

const decks = computed(() => store.state.deck.list)
const pagination = computed(() => store.state.deck.pagination);

async function changePage(page) {
  await store.dispatch('deck/fetchDecks', { page, forceRefresh: true });
}

const showDeleteModal = ref(false)
const deckToDelete = ref(null)

const deckToDeleteTitle = computed(() => decks.value.find(d => d.id === deckToDelete.value)?.title || '')

onMounted(async () => {
  await store.dispatch('deck/fetchDecks', true)
});

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`
}

function createDeck() {
  router.push({ name: 'CreateDeckFormPage' });
}

function studyDeck(deckId) {
  router.push({ name: 'StudyDeckPage', params: { deckId } });
}

function editDeck(deckId) {
  router.push({ name: 'EditDeckFormPage', params: { deckId } });
}

function deleteDeck(deckId) {
  deckToDelete.value = deckId
  showDeleteModal.value = true
}

async function confirmDeleteDeck() {
  if (deckToDelete.value) {
    await store.dispatch('deck/removeDeck', deckToDelete.value)
    showDeleteModal.value = false
    deckToDelete.value = null
  }
}

function cancelDeleteDeck() {
  showDeleteModal.value = false
  deckToDelete.value = null
}

function manageCards(deckId, deckTitle) {
  router.push({ name: 'ManageDeckPage', params: { deckId, deckTitle } })
}
</script>

<template>
  <div class="px-2 sm:px-6 py-4 w-full text-gray-800 dark:text-gray-100">
    <div class="max-w-5xl mx-auto flex flex-col gap-6">
      <header class="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold">Meus decks</h1>
          <p v-if="decks.length" class="text-sm text-fg-muted mt-1">
            Estude, edite ou organize os cards de cada deck.
          </p>
        </div>
        <button @click="createDeck"
          class="flex items-center gap-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold px-5 py-2.5 transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
            <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
          </svg>
          Novo deck
        </button>
      </header>

      <ul v-if="decks.length" class="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
        <li v-for="deck in decks" :key="deck.id"
          class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-4 flex flex-col gap-4">

          <div class="flex items-start gap-4">
            <div class="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-secondary-50 dark:bg-primary-500/10 border border-secondary-500/10 dark:border-primary-500/20" aria-hidden="true">
              <span class="font-[family-name:var(--font-card)] text-2xl font-semibold text-fg-info select-none">
                {{ (deck.title || '?').trim().charAt(0).toUpperCase() }}
              </span>
            </div>

            <div class="min-w-0 flex-1">
              <h2 class="text-base font-semibold leading-snug break-words">{{ deck.title }}</h2>
              <p class="text-sm text-fg-muted mt-0.5">
                {{ plural(deck.total_cards || 0, 'card', 'cards') }}
              </p>
              <p class="text-sm font-medium mt-1"
                :class="deck.cards_to_review_today > 0 ? 'text-fg-pending' : 'text-fg-success'">
                {{ deck.cards_to_review_today > 0 ? `${plural(deck.cards_to_review_today, 'card', 'cards')} para hoje` : 'Em dia' }}
              </p>
            </div>

            <div class="flex shrink-0 -mr-1 -mt-1">
              <button @click="editDeck(deck.id)"
                :aria-label="`Editar deck ${deck.title}`" title="Editar deck"
                class="flex items-center justify-center w-10 h-10 rounded-lg text-fg-muted hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-fg-primary transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
                  <path d="M227.31,72.69l-44-44a16,16,0,0,0-22.62,0L40,149.38V208a16,16,0,0,0,16,16h58.62L227.31,95.31A16,16,0,0,0,227.31,72.69ZM96,192H64V160l92-92,32,32ZM204.69,83.31,176,112,144,80l28.69-28.69Z" />
                </svg>
              </button>
              <button @click="deleteDeck(deck.id)"
                :aria-label="`Excluir deck ${deck.title}`" title="Excluir deck"
                class="flex items-center justify-center w-10 h-10 rounded-lg text-fg-muted hover:bg-error-500/10 hover:text-fg-error transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true">
                  <path d="M216,48H176V40a16,16,0,0,0-16-16H96A16,16,0,0,0,80,40v8H40A8,8,0,0,0,40,64H48V200a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40h64V48H96Zm96,160H64V64H192Z" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex gap-2">
            <button @click="studyDeck(deck.id)"
              class="flex-1 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2.5 transition-colors cursor-pointer">
              Estudar
            </button>
            <button @click="manageCards(deck.id, deck.title)"
              class="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-700 dark:text-gray-200 px-4 py-2.5 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-fg-primary transition-colors cursor-pointer">
              Gerenciar cards
            </button>
          </div>
        </li>
      </ul>

      <div v-else class="flex flex-col items-center gap-4 text-center py-16">
        <p class="text-lg font-semibold">Você ainda não tem decks</p>
        <p class="text-sm text-fg-muted max-w-sm">Crie um deck para cada assunto e adicione os cards que quer memorizar.</p>
        <button @click="createDeck"
          class="rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold px-6 py-3 transition-colors cursor-pointer">
          Criar primeiro deck
        </button>
      </div>

      <ConfirmationModal
        :show="showDeleteModal"
        title="Excluir deck"
        :message="`Excluir &quot;${deckToDeleteTitle}&quot; e todos os cards dele? Esta ação não pode ser desfeita.`"
        confirm-text="Excluir deck"
        cancel-text="Cancelar"
        @confirm="confirmDeleteDeck"
        @cancel="cancelDeleteDeck"
      />

      <PaginationBar :pagination="pagination" @change="changePage" />
    </div>
  </div>
</template>
