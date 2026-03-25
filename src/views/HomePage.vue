<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const decks = computed(() => (store.state.deck.list || []).map(d => ({
  id: d.id,
  name: d.title,
  total_cards: d.total_cards || 0,
  study_count: d.cards_to_review_today || 0,
  last_studied: d.last_reviewed_at,
  image: d.image_url || null
})));
const hasDecks = computed(() => decks.value.length > 0);
const user = computed(() => store.state.auth.user || {});
const pagination = computed(() => store.state.deck.pagination);

async function changePage(page) {
  await store.dispatch('deck/fetchDecks', { page, forceRefresh: true });
}

function formatLastStudied(date) {
  if (!date) return 'Nunca estudado';

  const lastStudy = new Date(date);
  const now = new Date();

  const d1 = new Date(lastStudy.getFullYear(), lastStudy.getMonth(), lastStudy.getDate());
  const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = d2 - d1;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'hoje';
  if (diffDays === 1) return 'ontem';
  return `${diffDays} dias atrás`;
}

function goToStudy(deckId) {
  router.push({ name: 'StudyDeckPage', params: { deckId } });
}

onMounted(async () => {
  await Promise.all([
    store.dispatch('deck/fetchDecks', true),
    store.dispatch('auth/fetchMe')
  ]);
});

function goToCreateDeck() {
  router.push({ name: "CreateDeckFormPage" });
}
</script>

<template>
  <div v-if="!hasDecks" class="flex px-4 sm:px-8 md:px-20 lg:px-40 py-5 w-full bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100">
    <div class="layout-content-container flex flex-col flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-2xl sm:text-3xl font-bold leading-tight">
          Bem vindo de volta, {{ user.name }}
        </p>
      </div>
      <div class="flex-1 flex-col items-center px-4 py-6 w-full">
        <div class="flex flex-col items-center gap-6">
          <div
            class="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px]"
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDJRa6PP-ubp76-UMc-wuQOqs4UYfdzLasm7RnisrIZkfJSyrOYDx36dp9luhSFr0407H2G7yZ-AoWat4za-b-qAE_b0Psw1Dm5LuGcdd8J72vCT1jiqIJRoajQN-Na3WjErE1P5BhOdyWpt0FStQ-_1m8E3WHQxKAamFUPF3wi97uF-6ZcRtmn1NaFzi6Uj00KXXH9NMGXBWL8B2hmv4dsMHp1Afp6PHq9W3I_WlIAGCH4RToVGCr_qdqPzxdWAQXfZKbHK5E5Yk-");'>
          </div>
          <div class="flex max-w-[480px] flex-col items-center gap-2">
            <p class="text-lg sm:text-xl font-bold leading-tight tracking-[-0.015em] text-center">
              Nenhum deck criado ainda
            </p>
            <p class="text-sm font-normal leading-normal text-center dark:text-gray-400">
              Crie seu primeiro deck para começar a estudar
            </p>
          </div>
          <button
            @click="goToCreateDeck"
            class="flex min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-11 px-6 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold leading-normal tracking-wide transition-all shadow-lg hover:shadow-primary-500/20">
            <span class="truncate">Criar deck</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5 bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-2xl sm:text-3xl font-bold leading-tight">Todos os Decks</p>
      </div>

      <div class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div class="flex items-start p-4 gap-3 w-full flex-wrap">
          <div
            v-for="deck in decks"
            :key="deck.id"
            @click="goToStudy(deck.id)"
            class="flex flex-col gap-4 rounded-lg w-full sm:w-[48%] md:w-[31%] lg:w-[23%] cursor-pointer">

            <div class="w-full aspect-square bg-secondary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center border border-secondary-500/10 dark:border-primary-500/20 transition-colors group-hover:bg-secondary-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-secondary-500 dark:text-primary-500" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9 6 9-6" />
              </svg>
            </div>

            <div class="flex flex-col gap-2">
              <p class="text-base font-bold leading-tight text-gray-800 dark:text-gray-100">{{ deck.name }}</p>

              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>Total: <span class="font-medium text-gray-700 dark:text-gray-200">{{ deck.total_cards }} cards</span></span>
                </div>

                <div class="flex items-center gap-1.5 text-xs" :class="deck.study_count > 0 ? 'text-secondary-600 dark:text-secondary-400' : 'text-gray-500 dark:text-gray-400'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Para hoje: <span class="font-bold">{{ deck.study_count }} cards</span></span>
                </div>

                <div class="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 mt-1 italic">
                  <span>Último estudo: {{ formatLastStudied(deck.last_studied) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="pagination.totalPages > 1" class="flex justify-center items-center gap-4 p-6 mt-4">
        <button
          @click="changePage(pagination.currentPage - 1)"
          :disabled="pagination.first"
          class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          title="Página Anterior">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div class="flex items-center gap-2">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            Página {{ pagination.currentPage + 1 }} de {{ pagination.totalPages }}
          </span>
        </div>

        <button
          @click="changePage(pagination.currentPage + 1)"
          :disabled="pagination.last"
          class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
          title="Próxima Página">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
