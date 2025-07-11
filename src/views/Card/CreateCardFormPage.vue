<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const deckId = route.params.deckId

const front = ref('')
const back = ref('')

function saveCard() {
  if (!front.value.trim() || !back.value.trim()) {
    alert('Por favor, preencha frente e verso do card.')
    return
  }

  // Aqui você pode enviar ao backend
  alert(`Card criado:\nFrente: ${front.value}\nVerso: ${back.value}`)

  // Redirecionar para a lista de cards
  router.push({ name: 'ManageCards', params: { deckId } })
}
</script>

<template>
  <div class="px-40 flex flex-1 justify-center py-5 bg-white dark:bg-gray-900 text-[#121416] dark:text-white">
    <div class="layout-content-container flex flex-col max-w-[640px] w-full">
      <div class="flex flex-wrap justify-between gap-3 p-4">
        <p class="tracking-light text-[32px] font-bold leading-tight">Criar Novo Card</p>
      </div>

      <div class="flex flex-col gap-6 p-4">
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="card-front">
            Frente do Card
            <span class="text-red-500">*</span>
          </label>
          <textarea
            id="card-front"
            v-model="front"
            rows="3"
            placeholder="Digite o conteúdo da frente..."
            class="form-textarea w-full rounded-xl border-none bg-[#f1f2f4] dark:bg-gray-800 text-[#121416] dark:text-white placeholder:text-[#6a7681] dark:placeholder:text-gray-400 px-4 py-3 text-base font-normal resize-none focus:outline-0 focus:ring-0"
          ></textarea>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium" for="card-back">
            Verso do Card
            <span class="text-red-500">*</span>
          </label>
          <textarea
            id="card-back"
            v-model="back"
            rows="3"
            placeholder="Digite o conteúdo do verso..."
            class="form-textarea w-full rounded-xl border-none bg-[#f1f2f4] dark:bg-gray-800 text-[#121416] dark:text-white placeholder:text-[#6a7681] dark:placeholder:text-gray-400 px-4 py-3 text-base font-normal resize-none focus:outline-0 focus:ring-0"
          ></textarea>
        </div>

        <div class="flex gap-3">
          <button
            @click="saveCard"
            class="flex items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-[#f1f2f4] dark:bg-gray-700 text-[#121416] dark:text-white text-sm font-medium hover:bg-[#e1e2e4] dark:hover:bg-gray-600 transition"
          >
            Salvar Card
          </button>

          <button
            @click="router.back()"
            class="flex items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-transparent border border-[#f1f2f4] dark:border-gray-700 text-sm text-[#121416] dark:text-white hover:bg-[#f1f2f4] dark:hover:bg-gray-700 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
