<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getCardById, update } from '@/services/card/cardService.js';

const router = useRouter();
const route = useRoute();

const cardId = route.params.cardId;

const front = ref('');
const back = ref('');

onMounted(async () => {
  const card = await getCardById(cardId);

  front.value = card.front_text;
  back.value = card.back_text;
})

function saveCard() {
  if (!front.value.trim() || !back.value.trim()) {
    alert('Ambos os campos são obrigatórios.')
    return
  }

  update(cardId, front.value, back.value);
  router.back()
}

function goBack() {
  router.back()
}
</script>

<template>
  <div class="px-6 py-8 w-full bg-white dark:bg-gray-900 text-[#121416] dark:text-white min-h-screen">
    <div class="max-w-2xl mx-auto flex flex-col gap-6">
      <!-- Header -->
      <div class="flex items-center gap-3">
        <button
          @click="goBack"
          class="flex items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-[#f1f2f4] dark:bg-gray-700 hover:bg-[#e1e2e4] dark:hover:bg-gray-600 transition"
          title="Voltar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-2xl font-bold">Editar Card</h1>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Frente <span class="text-red-500">*</span></label>
          <input
            v-model="front"
            type="text"
            placeholder="Conteúdo da frente do card"
            class="w-full rounded-lg border-none bg-[#f1f2f4] dark:bg-gray-800 h-11 px-4 text-base placeholder:text-[#6a7681] dark:placeholder:text-gray-400 focus:outline-0"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Verso <span class="text-red-500">*</span></label>
          <textarea
            v-model="back"
            rows="4"
            placeholder="Conteúdo do verso do card"
            class="w-full rounded-lg border-none bg-[#f1f2f4] dark:bg-gray-800 px-4 py-3 text-base placeholder:text-[#6a7681] dark:placeholder:text-gray-400 focus:outline-0 resize-none"
          ></textarea>
        </div>

        <div class="flex gap-3 mt-4">
          <button
            @click="saveCard"
            class="flex items-center justify-center gap-2 rounded-full bg-[#f1f2f4] dark:bg-gray-700 hover:bg-[#e1e2e4] dark:hover:bg-gray-600 text-[#121416] dark:text-white text-sm font-medium px-5 h-10 cursor-pointer transition"
          >
            Salvar Alterações
          </button>
          <button
            @click="goBack"
            class="flex items-center justify-center gap-2 rounded-full border border-[#f1f2f4] dark:border-gray-700 hover:bg-[#f1f2f4] dark:hover:bg-gray-700 text-sm text-[#121416] dark:text-white px-5 h-10 cursor-pointer transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
