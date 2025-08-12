<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { create } from '@/services/deck/deckService.js';

const router = useRouter();

const title = ref('');
// const description = ref('');
// const imageFile = ref(null);
// const imagePreview = ref(null);

function handleImageChange(event) {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = e => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  } else {
    imageFile.value = null
    imagePreview.value = null
  }
}

async function createDeck() {
  if (!title.value.trim()) {
    alert('O título é obrigatório.')
    return
  }

  await create(title.value);

  await router.push({name: 'HomePage'})
}
</script>

<template>
  <div class="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 text-[#121416] dark:text-white">
    <div class="layout-content-container flex flex-col max-w-[640px] w-full">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-[32px] font-bold leading-tight">Criar Novo Deck</p>
      </div>

      <div class="flex flex-col gap-6 p-4">
        <!-- Título -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-[#121416] dark:text-white" for="deck-title">
            Título do Deck
            <span class="text-red-500">*</span>
          </label>
          <input
            id="deck-title"
            v-model="title"
            type="text"
            placeholder="Ex: Biologia, História, Inglês..."
            class="form-input w-full rounded-xl border-none bg-[#f1f2f4] dark:bg-gray-800 text-[#121416] dark:text-white placeholder:text-[#6a7681] dark:placeholder:text-gray-400 h-12 px-4 text-base font-normal focus:outline-0 focus:ring-0"
          />
        </div>

        <!-- Descrição -->
<!--        <div class="flex flex-col gap-2">-->
<!--          <label class="text-sm font-medium text-[#121416] dark:text-white" for="deck-description">-->
<!--            Descrição <span class="text-sm text-[#6a7681] dark:text-gray-400">(opcional)</span>-->
<!--          </label>-->
<!--          <textarea-->
<!--            id="deck-description"-->
<!--            v-model="description"-->
<!--            rows="3"-->
<!--            placeholder="Descreva o conteúdo ou objetivo do deck..."-->
<!--            class="form-textarea w-full rounded-xl border-none bg-[#f1f2f4] dark:bg-gray-800 text-[#121416] dark:text-white placeholder:text-[#6a7681] dark:placeholder:text-gray-400 px-4 py-3 text-base font-normal resize-none focus:outline-0 focus:ring-0"-->
<!--          ></textarea>-->
<!--        </div>-->

        <!-- Upload de Imagem -->
<!--        <div class="flex flex-col gap-2">-->
<!--          <label class="text-sm font-medium text-[#121416] dark:text-white" for="deck-image">-->
<!--            Imagem do Deck <span class="text-sm text-[#6a7681] dark:text-gray-400">(opcional)</span>-->
<!--          </label>-->
<!--          <input-->
<!--            id="deck-image"-->
<!--            type="file"-->
<!--            accept="image/*"-->
<!--            @change="handleImageChange"-->
<!--            class="block w-full text-sm text-[#6a7681] dark:text-gray-400-->
<!--                   file:mr-4 file:py-2 file:px-4-->
<!--                   file:rounded-full file:border-0-->
<!--                   file:text-sm file:font-semibold-->
<!--                   file:bg-[#f1f2f4] file:text-[#121416]-->
<!--                   hover:file:bg-[#e1e2e4]-->
<!--                   dark:file:bg-gray-700 dark:file:text-white dark:hover:file:bg-gray-600"-->
<!--          />-->

<!--          &lt;!&ndash; Preview &ndash;&gt;-->
<!--          <div v-if="imagePreview" class="mt-2">-->
<!--            <img :src="imagePreview" alt="Pré-visualização da imagem" class="rounded-xl max-h-48 object-contain border border-[#f0f2f5] dark:border-gray-700"/>-->
<!--          </div>-->
<!--        </div>-->

        <!-- Ações -->
        <div class="flex gap-3">
          <button
            @click="createDeck"
            class="flex items-center justify-center overflow-hidden rounded-full h-10 cursor-pointer px-5 bg-[#f1f2f4] dark:bg-gray-700 text-[#121416] dark:text-white text-sm font-medium hover:bg-[#e1e2e4] dark:hover:bg-gray-600 transition"
          >
            Criar Deck
          </button>

          <button
            @click="router.back()"
            class="flex items-center justify-center overflow-hidden rounded-full h-10 cursor-pointer px-5 bg-transparent border border-[#f1f2f4] dark:border-gray-700 text-sm text-[#121416] dark:text-white hover:bg-[#f1f2f4] dark:hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
