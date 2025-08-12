<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getDecks } from '@/services/deck/deckService.js';
import { me } from '@/services/auth/authService.js';

const router = useRouter();
const decks = ref([]);
const hasDecks = ref(true);
const user = ref({});

function goToStudy(deckId) {
  router.push({ name: 'StudyDeckPage', params: { deckId } });
}

onMounted(async () => {
  try {
    const apiDecks = await getDecks();
    user.value = await me();

    decks.value = await apiDecks.map(d => ({
      id: d.id,
      name: d.title,
      cards: 0,
      image: null
    }));

    hasDecks.value = decks.value.length > 0;
  } catch (error) {
    hasDecks.value = false;
  }
});

function goToCreateDeck() {
  router.push({ name: "CreateDeckFormPage" });
}
</script>

<template>
  <div v-if="!hasDecks" class="flex px-40 py-5 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <div class="layout-content-container flex flex-col flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-[32px] font-bold leading-tight min-w-72">
          Bem vindo de volta, {{ user.name }}
        </p>
      </div>
      <div class="flex-1 flex-col items-center px-4 py-6 w-full">
        <div class="flex flex-col items-center gap-6">
          <div class="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px]"
            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDJRa6PP-ubp76-UMc-wuQOqs4UYfdzLasm7RnisrIZkfJSyrOYDx36dp9luhSFr0407H2G7yZ-AoWat4za-b-qAE_b0Psw1Dm5LuGcdd8J72vCT1jiqIJRoajQN-Na3WjErE1P5BhOdyWpt0FStQ-_1m8E3WHQxKAamFUPF3wi97uF-6ZcRtmn1NaFzi6Uj00KXXH9NMGXBWL8B2hmv4dsMHp1Afp6PHq9W3I_WlIAGCH4RToVGCr_qdqPzxdWAQXfZKbHK5E5Yk-");'>
          </div>
          <div class="flex max-w-[480px] flex-col items-center gap-2">
            <p class="text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
              Nenhum deck criado ainda
            </p>
            <p class="text-sm font-normal leading-normal max-w-[480px] text-center dark:text-gray-400">
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

  <div v-else class="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-[32px] font-bold leading-tight min-w-72">Todos os Decks</p>
      </div>

<!--      <div class="px-4 py-3">-->
<!--        <label class="flex flex-col min-w-40 h-12 w-full">-->
<!--          <div class="flex w-full flex-1 items-stretch rounded-xl h-full">-->
<!--            <div-->
<!--              class="text-[#6a7681] dark:text-gray-400 flex border-none bg-[#f1f2f4] dark:bg-gray-800 items-center justify-center pl-4 rounded-l-xl border-r-0">-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor"-->
<!--                viewBox="0 0 256 256">-->
<!--                <path-->
<!--                  d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">-->
<!--                </path>-->
<!--              </svg>-->
<!--            </div>-->
<!--            <input placeholder="Busque seus decks"-->
<!--              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] dark:bg-gray-800 placeholder:text-[#6a7681] dark:placeholder:text-gray-400 h-full px-4 rounded-l-none text-base font-normal" />-->
<!--          </div>-->
<!--        </label>-->
<!--      </div>-->

      <div class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div class="flex items-stretch p-4 gap-3 w-full flex-wrap">
          <div v-for="deck in decks" :key="deck.id" @click="goToStudy(deck.id)"
            class="flex h-full flex-col gap-4 rounded-lg min-w-40 cursor-pointer max-w-xs">

            <div
              class="w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center">
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
