<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const decks = computed(() => (store.state.deck.list || []).map(d => ({ id: d.id, name: d.title, cards: 0, image: null })));
const hasDecks = computed(() => decks.value.length > 0);
const user = computed(() => store.state.auth.user || {});

function goToStudy(deckId) {
  router.push({ name: 'StudyDeckPage', params: { deckId } });
}

onMounted(async () => {
  await Promise.all([
    store.dispatch('deck/fetchDecks'),
    store.dispatch('auth/fetchMe')
  ]);
});

function goToCreateDeck() {
  router.push({ name: "CreateDeckFormPage" });
}
</script>

<template>
  <div v-if="!hasDecks" class="flex px-4 sm:px-8 md:px-20 lg:px-40 py-5 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
            class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] dark:bg-gray-700 text-[#121416] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span class="truncate">Criar deck</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-2xl sm:text-3xl font-bold leading-tight">Todos os Decks</p>
      </div>

      <div class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div class="flex items-stretch p-4 gap-3 w-full flex-wrap">
          <div
            v-for="deck in decks"
            :key="deck.id"
            @click="goToStudy(deck.id)"
            class="flex h-full flex-col gap-4 rounded-lg w-full sm:w-[48%] md:w-[31%] lg:w-[23%] cursor-pointer">

            <div class="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 dark:text-gray-500" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H7a4 4 0 00-4 4z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 7l9 6 9-6" />
              </svg>
            </div>

            <div>
              <p class="text-base font-medium leading-normal">{{ deck.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
