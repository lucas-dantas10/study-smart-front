<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock dos decks
const decks = ref([
    {
        id: 1,
        name: 'Biology 101',
        cards: 40,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_taw55CRADeJ9XApLg-d0X9D-BzYucoZXmvIeybg0W-t_kvxzvbXZ8GaU5FZ9SmXkKtiUtJ7cCW3vy6e72gIkEqyhJbX8O1H7hfcwybspeFEhlWhv0DDrp8pwRHSsW3LTwJ-E-NSXYDY_4TZYTwH5IcR8_b8O-Mvz-wuC-G0HuiyAQQD1asIXPWGH1dhoz9WVGYXe43wXFsEHLAR5qJVzolsJI-FEoZwaLhqTsm5XnOtjlRApnqGJhCEXS1DTTNHD_IiQa086YUZd'
    },
    {
        id: 2,
        name: 'World History',
        cards: 10,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF7cvuquTwuuu4OSqF9yIBKvQ5hTF4H7B2EtGQOdvTqZ_0qi4aCnpo7yjL8MjcVggl-4nOuV0GgvJRMmQqVRhcln5bW2pfbxmTckh16ADubCTJOFhvMOKPZsuf9xPSqK3T2hJWlZKl3toZPIiXDoF63Aa0NBO9m2qzVo7eqIBHzazP_AKsvhReJIi7QGLD_kHVmeHW4lJtujRYBNmqu4HrKL9Ei82ZQYeqEeOJaOy3F3tkJdAGDvN8fU5rboNb4Sv0t2NG4LAP_sqP'
    },
    {
        id: 3,
        name: 'Calculus',
        cards: 15,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzE3cGQO7SK98QYhHb8b3ndbqI_nVwe_lgqzKmuTpvrT2wYzJhZxH144SpGZ9peDT48FTbpFq-4sJVX0NVdM_XxDZqfesVOvhoACmUvIkIkHj3E_KCydl-iX2ovfzjg49_3BR0kXlcQEqOO5ieNK5VhW8FzkjvoojD99uFCfKgVP9aTEEcSsaRFajS_qjsTkCfzb7499AdSrScc3Mm4Ct1D0G-oeybwOrchj8sa4MGAzllhl4GtVG_eFTNNNiLraft2H4nCjORw1j-'
    }
])

function createDeck() {
    router.push({ name: 'CreateDeckFormPage'});
}

function editDeck(deckId) {
    router.push({ name: 'EditDeckFormPage',  params: { deckId } });
}

function deleteDeck(deckId) {
    if (confirm('Tem certeza que deseja excluir este deck?')) {
        decks.value = decks.value.filter(d => d.id !== deckId)
    }
}

function manageCards(deckId) {
    router.push({ name: 'ManageDeckPage', params: { deckId } })
}
</script>

<template>
    <div class="px-6 py-8 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
        <div class="max-w-5xl mx-auto flex flex-col gap-6">
            <!-- Header -->
            <div class="flex flex-wrap justify-between items-center gap-4">
                <h1 class="text-3xl font-bold">Decks</h1>
                <button @click="createDeck"
                    class="flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 shadow transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 256 256">
                        <path
                            d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z">
                        </path>
                    </svg>
                    Criar Novo Deck
                </button>
            </div>

            <!-- Grid de decks -->
            <div v-if="decks.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div v-for="deck in decks" :key="deck.id"
                    class="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 p-4 flex flex-col gap-3 hover:shadow transition-shadow">
                    <div v-if="deck.image" class="w-full aspect-square bg-center bg-cover rounded-md"
                        :style="{ backgroundImage: `url(${deck.image})` }"></div>
                    <div v-else
                        class="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 dark:text-gray-500"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9 6 9-6" />
                        </svg>
                    </div>


                    <div class="flex flex-col gap-1">
                        <h2 class="text-base font-semibold">{{ deck.name }}</h2>
                        <p class="text-sm text-gray-500 dark:text-gray-400">{{ deck.cards }} cards</p>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-2 mt-2">
                        <button @click="manageCards(deck.id)"
                            class="flex-1 flex items-center justify-center gap-1 text-xs font-medium rounded-md cursor-pointer bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-2 py-1 hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor"
                                viewBox="0 0 256 256">
                                <path
                                    d="M208,48H48A16,16,0,0,0,32,64V192a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V64A16,16,0,0,0,208,48ZM48,64H208V80H48Zm0,128V96H208V192Z" />
                            </svg>
                            Gerenciar Cards
                        </button>
                        <button @click="editDeck(deck.id)"
                            class="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-600 dark:text-gray-300"
                                fill="currentColor" viewBox="0 0 256 256">
                                <path
                                    d="M227.31,72.69l-44-44a16,16,0,0,0-22.62,0L40,149.38V208a16,16,0,0,0,16,16h58.62L227.31,95.31A16,16,0,0,0,227.31,72.69ZM96,192H64V160l92-92,32,32ZM204.69,83.31,176,112,144,80l28.69-28.69Z" />
                            </svg>
                        </button>
                        <button @click="deleteDeck(deck.id)"
                            class="flex items-center justify-center p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-500" fill="currentColor"
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
        </div>
    </div>
</template>
