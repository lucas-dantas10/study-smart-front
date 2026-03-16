<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  title: { type: String, default: 'Confirmação' },
  message: { type: String, default: 'Você tem certeza?' },
  confirmText: { type: String, default: 'Confirmar' },
  cancelText: { type: String, default: 'Cancelar' }
})

const emit = defineEmits(['confirm', 'cancel'])

function confirm() {
  emit('confirm')
}

function cancel() {
  emit('cancel')
}
</script>

<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-md mx-4 rounded-2xl bg-surface-light dark:bg-surface-dark shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div class="px-5 py-4 bg-primary-50 dark:bg-primary-500/10 border-b border-primary-100 dark:border-primary-500/20">
          <div class="flex items-center gap-3">
            <div class="h-9 w-9 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center">
              <svg class="h-5 w-5 text-primary-600 dark:text-primary-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V4M12 20V15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-base font-semibold text-primary-700 dark:text-white">{{ title }}</h3>
          </div>
        </div>
        <div class="px-5 py-4 space-y-2">
          <p class="text-sm text-gray-800 dark:text-gray-100">{{ message }}</p>
        </div>
        <div class="px-5 py-3 bg-gray-50 dark:bg-primary-500/5 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
          <button @click="cancel" class="inline-flex items-center gap-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 cursor-pointer transition-colors">
            {{ cancelText }}
          </button>
          <button @click="confirm" class="inline-flex items-center gap-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium px-4 py-2 cursor-pointer transition-colors shadow-lg shadow-primary-500/10">
            {{ confirmText }}
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
