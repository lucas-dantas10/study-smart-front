<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ConfirmationModal from '@/components/ConfirmationModal.vue';

const router = useRouter()
const store = useStore()

const decks = computed(() => store.state.deck.list)

const showDeleteModal = ref(false)
const deckToDelete = ref(null)

onMounted(async () => {
  await store.dispatch('deck/fetchDecks')
});

function createDeck() {
    router.push({ name: 'CreateDeckFormPage'});
}

function editDeck(deckId) {
    router.push({ name: 'EditDeckFormPage',  params: { deckId } });
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
    <div class="px-6 py-8 w-full bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 min-h-screen">
        <div class="max-w-5xl mx-auto flex flex-col gap-6">
            <!-- Header -->
            <div class="flex flex-wrap justify-between items-center gap-4">
                <h1 class="text-3xl font-bold text-primary-500">Decks</h1>
                <button @click="createDeck"
                    class="flex items-center gap-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold px-5 py-2.5 shadow-lg hover:shadow-primary-500/20 transition-all cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z">
                        </path>
                    </svg>
                    Criar Novo Deck
                </button>
            </div>

            <div v-if="decks.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                <div v-for="deck in decks" :key="deck.id"
                    class="rounded-2xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-5 flex flex-col gap-4 hover:shadow-xl hover:border-primary-500/20 transition-all group">
<!--                    <div v-if="deck.image" class="w-full aspect-square bg-center bg-cover rounded-md"-->
<!--                        :style="{ backgroundImage: `url(${deck.image})` }"></div>-->
<!--                    <div v-else-->
<!--                        class="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">-->
<!--                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 dark:text-gray-500"-->
<!--                            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round"-->
<!--                                d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />-->
<!--                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9 6 9-6" />-->
<!--                        </svg>-->
<!--                    </div>-->
                    <div
                         class="w-full aspect-square bg-secondary-50 dark:bg-primary-500/5 rounded-xl flex items-center justify-center transition-colors group-hover:bg-secondary-100 dark:group-hover:bg-primary-500/10">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-secondary-500 dark:text-primary-500"
                           fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9 6 9-6" />
                      </svg>
                    </div>

                    <div class="flex flex-col gap-1">
                        <h2 class="text-base font-semibold">{{ deck.title }}</h2>
<!--                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ deck.cards }} cards</p>-->
                    </div>

                    <div class="flex gap-2 mt-2">
                        <button @click="manageCards(deck.id, deck.title)"
                            class="flex-1 flex items-center justify-center gap-2 text-xs font-bold rounded-lg cursor-pointer bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500 px-3 py-2 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 dark:hover:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor"
                                viewBox="0 0 256 256">
                                <path
                                    d="M208,48H48A16,16,0,0,0,32,64V192a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V64A16,16,0,0,0,208,48ZM48,64H208V80H48Zm0,128V96H208V192Z" />
                            </svg>
                            Gerenciar Cards
                        </button>
                        <button @click="editDeck(deck.id)"
                            class="flex items-center justify-center p-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-500/10 text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-all cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                fill="currentColor" viewBox="0 0 256 256">
                                <path
                                    d="M227.31,72.69l-44-44a16,16,0,0,0-22.62,0L40,149.38V208a16,16,0,0,0,16,16h58.62L227.31,95.31A16,16,0,0,0,227.31,72.69ZM96,192H64V160l92-92,32,32ZM204.69,83.31,176,112,144,80l28.69-28.69Z" />
                            </svg>
                        </button>
                        <button @click="deleteDeck(deck.id)"
                            class="flex items-center justify-center p-2 rounded-lg hover:bg-error-500/10 text-gray-500 hover:text-error-500 transition-all cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor"
                                viewBox="0 0 256 256">
                                <path
                                    d="M216,48H176V40a16,16,0,0,0-16-16H96A16,16,0,0,0,80,40v8H40A8,8,0,0,0,40,64H48V200a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40h64V48H96Zm96,160H64V64H192Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div v-else class="text-center text-gray-500 dark:text-gray-400 py-12">
                Nenhum deck criado ainda.
            </div>

            <ConfirmationModal
                :show="showDeleteModal"
                title="Excluir Deck"
                message="Tem certeza que deseja excluir este deck? Esta ação não pode ser desfeita."
                confirm-text="Excluir"
                cancel-text="Cancelar"
                @confirm="confirmDeleteDeck"
                @cancel="cancelDeleteDeck"
            />
        </div>
    </div>
</template>
