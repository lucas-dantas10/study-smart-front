<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Pegamos o deckId da rota
const deckId = route.params.deckId

// Campos do formulário
const title = ref('')
const description = ref('')
const imageFile = ref(null)
const imagePreview = ref('')

// Mock de carregamento inicial (poderia vir da API)
onMounted(() => {
  // Exemplo: preencher campos com dados já existentes do deck
  // (substitua com chamada real)
  title.value = 'Nome do Deck Exemplo'
  description.value = 'Descrição do deck exemplo.'
  imagePreview.value = 'https://via.placeholder.com/300x300.png?text=Imagem+Existente'
})

function handleImageChange(event) {
  const file = event.target.files[0]
  if (file) {
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
  }
}

function removeImage() {
  imageFile.value = null
  imagePreview.value = ''
}

function saveDeck() {
  if (!title.value.trim()) {
    alert('O título é obrigatório.')
    return
  }

  // Aqui você faria uma requisição ao backend
  alert(`Deck atualizado:\nTítulo: ${title.value}\nDescrição: ${description.value}\nImagem: ${imageFile.value ? imageFile.value.name : 'Sem alteração'}`)
  router.push({ name: 'Home' })
}
</script>

<template>
  <div class="px-6 py-8 w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
    <div class="max-w-2xl mx-auto flex flex-col gap-6">
      <div class="flex items-center gap-3">
        <button
          @click="router.back()"
          class="h-9 w-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title="Voltar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <h1 class="text-2xl font-bold">Editar Deck</h1>
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="title" class="text-sm font-medium">Título <span class="text-red-500">*</span></label>
          <input
            id="title"
            v-model="title"
            type="text"
            class="w-full rounded-lg border-none bg-gray-100 dark:bg-gray-800 h-11 px-4 text-base placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-0"
            placeholder="Título do deck"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="description" class="text-sm font-medium">Descrição <span class="text-gray-500">(opcional)</span></label>
          <textarea
            id="description"
            v-model="description"
            rows="3"
            class="w-full rounded-lg border-none bg-gray-100 dark:bg-gray-800 px-4 py-3 text-base placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-0 resize-none"
            placeholder="Descreva o conteúdo ou objetivo do deck..."
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Imagem</label>
          <div v-if="imagePreview" class="relative w-48 h-48">
            <img :src="imagePreview" class="object-cover rounded-lg w-full h-full" />
            <button
              @click="removeImage"
              class="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition"
              title="Remover imagem"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
            class="mt-1 block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900 file:text-indigo-700 dark:file:text-indigo-200 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-800"
          />
        </div>

        <div class="flex gap-3 mt-4">
          <button
            @click="saveDeck"
            class="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 shadow transition"
          >
            Salvar Alterações
          </button>
          <button
            @click="router.back()"
            class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium px-5 py-2 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
