<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

// mock decks
const decks = ref({
  studied_recently: [
    {
      id: 1,
      name: 'Biology 101',
      cards: 20,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_taw55CRADeJ9XApLg-d0X9D-BzYucoZXmvIeybg0W-t_kvxzvbXZ8GaU5FZ9SmXkKtiUtJ7cCW3vy6e72gIkEqyhJbX8O1H7hfcwybspeFEhlWhv0DDrp8pwRHSsW3LTwJ-E-NSXYDY_4TZYTwH5IcR8_b8O-Mvz-wuC-G0HuiyAQQD1asIXPWGH1dhoz9WVGYXe43wXFsEHLAR5qJVzolsJI-FEoZwaLhqTsm5XnOtjlRApnqGJhCEXS1DTTNHD_IiQa086YUZd'
    },
    {
      id: 2,
      name: 'World History',
      cards: 30,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF7cvuquTwuuu4OSqF9yIBKvQ5hTF4H7B2EtGQOdvTqZ_0qi4aCnpo7yjL8MjcVggl-4nOuV0GgvJRMmQqVRhcln5bW2pfbxmTckh16ADubCTJOFhvMOKPZsuf9xPSqK3T2hJWlZKl3toZPIiXDoF63Aa0NBO9m2qzVo7eqIBHzazP_AKsvhReJIi7QGLD_kHVmeHW4lJtujRYBNmqu4HrKL9Ei82ZQYeqEeOJaOy3F3tkJdAGDvN8fU5rboNb4Sv0t2NG4LAP_sqP'
    },
    {
      id: 3,
      name: 'Calculus',
      cards: 25,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzE3cGQO7SK98QYhHb8b3ndbqI_nVwe_lgqzKmuTpvrT2wYzJhZxH144SpGZ9peDT48FTbpFq-4sJVX0NVdM_XxDZqfesVOvhoACmUvIkIkHj3E_KCydl-iX2ovfzjg49_3BR0kXlcQEqOO5ieNK5VhW8FzkjvoojD99uFCfKgVP9aTEEcSsaRFajS_qjsTkCfzb7499AdSrScc3Mm4Ct1D0G-oeybwOrchj8sa4MGAzllhl4GtVG_eFTNNNiLraft2H4nCjORw1j-'
    }
  ],
  all_decks: [
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
    },
    {
      id: 4,
      name: 'Calculus',
      cards: 30,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzE3cGQO7SK98QYhHb8b3ndbqI_nVwe_lgqzKmuTpvrT2wYzJhZxH144SpGZ9peDT48FTbpFq-4sJVX0NVdM_XxDZqfesVOvhoACmUvIkIkHj3E_KCydl-iX2ovfzjg49_3BR0kXlcQEqOO5ieNK5VhW8FzkjvoojD99uFCfKgVP9aTEEcSsaRFajS_qjsTkCfzb7499AdSrScc3Mm4Ct1D0G-oeybwOrchj8sa4MGAzllhl4GtVG_eFTNNNiLraft2H4nCjORw1j-'
    },
  ]
});

const hasDecks = ref(true)

function goToStudy(deckId) {
  router.push({ name: 'CardPage', params: { deckId } })
}
</script>

<template>
  <div v-if="!hasDecks" class="flex px-40 py-5 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
    <div class="layout-content-container flex flex-col flex-1">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-[32px] font-bold leading-tight min-w-72">
          Bem vindo de volta, Lucas
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
        <p class="tracking-light text-[32px] font-bold leading-tight min-w-72">Meus Decks</p>
      </div>
      <div class="px-4 py-3">
        <label class="flex flex-col min-w-40 h-12 w-full">
          <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div
              class="text-[#6a7681] dark:text-gray-400 flex border-none bg-[#f1f2f4] dark:bg-gray-800 items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor"
                viewBox="0 0 256 256">
                <path
                  d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z">
                </path>
              </svg>
            </div>
            <input placeholder="Busque seus decks"
              class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] dark:bg-gray-800 placeholder:text-[#6a7681] dark:placeholder:text-gray-400 h-full px-4 rounded-l-none text-base font-normal" />
          </div>
        </label>
      </div>
      <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Recentemente estudados</h3>
      <div
        class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div class="flex items-stretch p-4 gap-3">
          <div v-for="deck in decks.studied_recently" :key="deck.name"
            class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
            <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
              :style="{ backgroundImage: `url(${deck.image})` }">
            </div>
            <div>
              <p class="text-base font-medium leading-normal">{{ deck.name }}</p>
              <p class="text-sm font-normal leading-normal dark:text-gray-400">{{ deck.cards }} cards</p>
            </div>
          </div>
        </div>
      </div>
      <h3 class="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Todos os Decks</h3>
      <div
        class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div class="flex items-stretch p-4 gap-3">
          <div v-for="deck in decks.all_decks" :key="deck.name"
            class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
            <div class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
              :style="{ backgroundImage: `url(${deck.image})` }">
            </div>
            <div>
              <p class="text-base font-medium leading-normal">{{ deck.name }}</p>
              <p class="text-sm font-normal leading-normal dark:text-gray-400">{{ deck.cards }} cards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
