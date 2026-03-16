<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const title = ref('');
const titleError = ref('');
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
    titleError.value = 'O título é obrigatório.';
    return;
  }
  titleError.value = '';
  await store.dispatch('deck/createDeck', title.value);

  await router.push({name: 'DeckPage'})
}
</script>

<template>
  <div class="flex flex-1 justify-center py-5 bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-100 px-4 sm:px-6 md:px-10 lg:px-40">
    <div class="layout-content-container flex flex-col w-full max-w-[640px]">

      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-[32px] font-bold leading-tight text-primary-500">Criar Novo Deck</p>
      </div>

      <div class="flex flex-col gap-6 p-4">
        <!-- Título -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300" for="deck-title">
            Título do Deck
            <span class="text-error-500">*</span>
          </label>
          <input
              id="deck-title"
              v-model="title"
              @input="titleError = ''"
              type="text"
              placeholder="Ex: Biologia, História, Inglês..."
              class="form-input w-full rounded-xl border border-gray-100 dark:border-gray-800 bg-surface-light dark:bg-surface-dark text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 h-12 px-4 text-base font-normal focus:outline-0 focus:ring-2 focus:ring-primary-500/20 transition-all"
              :class="{'border-error-500': titleError, 'focus:ring-error-500/20': titleError}"
          />
          <p v-if="titleError" class="text-error-500 text-sm mt-1">{{ titleError }}</p>
        </div>

        <!-- Descrição -->
        <!--
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-[#121416] dark:text-white" for="deck-description">
            Descrição <span class="text-sm text-[#6a7681] dark:text-gray-400">(opcional)</span>
          </label>
          <textarea
            id="deck-description"
            v-model="description"
            rows="3"
            placeholder="Descreva o conteúdo ou objetivo do deck..."
            class="form-textarea w-full rounded-xl border-none bg-[#f1f2f4] dark:bg-gray-800 text-[#121416] dark:text-white placeholder:text-[#6a7681] dark:placeholder:text-gray-400 px-4 py-3 text-base font-normal resize-none focus:outline-0 focus:ring-0"
          ></textarea>
        </div>
        -->

        <!-- Upload de Imagem -->
        <!--
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-[#121416] dark:text-white" for="deck-image">
            Imagem do Deck <span class="text-sm text-[#6a7681] dark:text-gray-400">(opcional)</span>
          </label>
          <input
            id="deck-image"
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="block w-full text-sm text-[#6a7681] dark:text-gray-400
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-[#f1f2f4] file:text-[#121416]
                   hover:file:bg-[#e1e2e4]
                   dark:file:bg-gray-700 dark:file:text-white dark:hover:file:bg-gray-600"
          />
      -->

      <div class="flex flex-col sm:flex-row gap-4 mt-4">
        <button
            @click="createDeck"
            class="flex items-center justify-center cursor-pointer overflow-hidden rounded-xl h-12 px-8 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold shadow-lg hover:shadow-primary-500/20 transition-all w-full sm:w-auto"
        >
          Salvar Deck
        </button>
        <button
            @click="router.back()"
            class="flex items-center justify-center cursor-pointer overflow-hidden rounded-xl h-12 px-8 bg-transparent border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition w-full sm:w-auto"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
  </div>
</template>
