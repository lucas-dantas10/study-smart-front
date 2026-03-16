<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Algo deu errado' },
  message: { type: String, default: 'Ocorreu um erro inesperado.' },
  details: { type: String, default: '' }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-md mx-4 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div class="px-5 py-4 bg-error-500/10 dark:bg-error-500/20 border-b border-error-500/20">
          <div class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-full bg-error-500/10 flex items-center justify-center">
              <svg class="h-5 w-5 text-error-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9v4m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-base font-semibold text-error-500">{{ title }}</h3>
          </div>
        </div>
        <div class="px-5 py-4 space-y-2">
          <p class="text-sm text-gray-800 dark:text-gray-100">{{ message }}</p>
          <p v-if="details" class="text-xs text-gray-500 dark:text-gray-400 whitespace-pre-wrap break-words">{{ details }}</p>
        </div>
        <div class="px-5 py-3 bg-gray-50 dark:bg-primary-500/5 border-t border-gray-200 dark:border-gray-800 flex justify-end">
          <button @click="close" class="inline-flex items-center gap-2 rounded-lg bg-error-500 hover:bg-error-600 text-white text-sm font-medium px-4 py-2 cursor-pointer transition-colors shadow-lg shadow-error-500/10">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>


