<script setup>
import {ref} from 'vue';
import {useRouter, useRoute} from 'vue-router';
import {useStore} from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();

const deckId = route.params.deckId;

const front = ref('');
const back = ref('');
const frontError = ref('');
const backError = ref('');

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

  if (hasError) return;

  await store.dispatch('card/saveCard', {front: front.value, back: back.value, deckId});
  const deck = await store.dispatch('deck/fetchDeck', deckId);
  const deckTitle = deck.title;

  await router.push({name: 'ManageDeckPage', params: {deckId, deckTitle}});
}
</script>

<template>
  <div
      class="flex flex-1 justify-center py-5 bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 px-4 sm:px-6 md:px-10 lg:px-40">
    <div class="flex flex-col w-full max-w-[640px]">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-[32px] font-bold leading-tight text-primary-500">Criar Novo Card</p>
      </div>

      <div class="flex flex-col gap-6 p-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300" for="card-front">
            Frente do Card
            <span class="text-error-500">*</span>
          </label>
          <textarea
              id="card-front"
              v-model="front"
              @input="frontError = ''"
              rows="3"
              placeholder="Digite o conteúdo da frente..."
              class="form-textarea w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-base font-normal resize-none focus:outline-0 focus:ring-2 focus:ring-primary-500/20 transition-all"
              :class="{'border-error-500': frontError}"
          ></textarea>
          <p v-if="frontError" class="text-error-500 text-sm mt-1">{{ frontError }}</p>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300" for="card-back">
            Verso do Card
            <span class="text-error-500">*</span>
          </label>
          <textarea
              id="card-back"
              v-model="back"
              @input="backError = ''"
              rows="3"
              placeholder="Digite o conteúdo do verso..."
              class="form-textarea w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-4 py-3 text-base font-normal resize-none focus:outline-0 focus:ring-2 focus:ring-primary-500/20 transition-all"
              :class="{'border-error-500': backError}"
          ></textarea>
          <p v-if="backError" class="text-error-500 text-sm mt-1">{{ backError }}</p>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mt-4">
          <button
              @click="saveCard"
              class="flex items-center justify-center cursor-pointer rounded-xl h-11 px-8 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold shadow-lg hover:shadow-primary-500/20 transition-all w-full sm:w-auto"
          >
            Salvar Card
          </button>
          <button
              @click="router.back()"
              class="flex items-center justify-center cursor-pointer rounded-xl h-11 px-8 bg-transparent border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition w-full sm:w-auto"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
