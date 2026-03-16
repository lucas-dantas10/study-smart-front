<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const cardId = route.params.cardId;
const deckId = route.params.deckId;

const front = ref('');
const back = ref('');
const frontError = ref('');
const backError = ref('');

onMounted(async () => {
  const card = await store.dispatch('card/fetchCard', cardId);

  front.value = card.front_text;
  back.value = card.back_text;
})

async function saveCard() {
  let hasError = false;

  if (!front.value.trim()) {
    frontError.value = 'O campo da frente é obrigatório.';
    hasError = true;
  } else {
    frontError.value = '';
  }

  if (!back.value.trim()) {
    backError.value = 'O campo do verso é obrigatório.';
    hasError = true;
  } else {
    backError.value = '';
  }

  if (hasError) {
    return;
  }

  await store.dispatch('card/updateCard', { cardId, front: front.value, back: back.value, deckId });
  router.back()
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="px-6 py-8 w-full bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 min-h-screen">
    <div class="max-w-2xl mx-auto flex flex-col gap-6">
      <!-- Header -->
      <div class="flex items-center gap-3">
        <button
          @click="goBack"
          class="flex items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-primary-500 transition shadow-sm"
          title="Voltar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold text-primary-500">Editar Card</h1>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Frente <span class="text-error-500">*</span></label>
          <input
            v-model="front"
            type="text"
            placeholder="Conteúdo da frente do card"
            class="w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark h-11 px-4 text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-0 focus:ring-2 focus:ring-primary-500/20 transition-all text-gray-800 dark:text-gray-100"
            :class="{'border-error-500': frontError}"
          />
          <p v-if="frontError" class="text-error-500 text-sm mt-1">{{ frontError }}</p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Verso <span class="text-error-500">*</span></label>
          <textarea
            v-model="back"
            @input="backError = ''"
            rows="4"
            placeholder="Conteúdo do verso do card"
            class="w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-4 py-3 text-base placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-0 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none text-gray-800 dark:text-gray-100"
            :class="{'border-error-500': backError}"
          ></textarea>
          <p v-if="backError" class="text-error-500 text-sm mt-1">{{ backError }}</p>
        </div>

        <div class="flex gap-4 mt-6">
          <button
            @click="saveCard"
            class="flex items-center justify-center gap-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold px-6 h-11 cursor-pointer shadow-lg hover:shadow-primary-500/20 transition"
          >
            Salvar Alterações
          </button>
          <button
            @click="goBack"
            class="flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm font-medium px-6 h-11 cursor-pointer transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
