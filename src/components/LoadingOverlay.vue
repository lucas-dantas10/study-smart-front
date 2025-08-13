<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: { type: Boolean, default: false },
  message: { type: String, default: 'Carregando...' }
})

const visible = computed(() => props.show)
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/60 backdrop-blur-sm">
      <div class="flex flex-col items-center gap-4 p-6 rounded-2xl shadow-lg bg-white/90 dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700">
        <div class="relative">
          <div class="h-12 w-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-600 animate-spin"></div>
          <svg class="absolute inset-0 h-12 w-12 text-indigo-600 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-700 dark:text-gray-200">{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>


