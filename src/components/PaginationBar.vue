<script setup>
defineProps({
  pagination: { type: Object, required: true }
})

defineEmits(['change'])
</script>

<template>
  <nav v-if="pagination.totalPages > 1" class="flex justify-center items-center gap-4 p-6 mt-4" aria-label="Paginação">
    <button
      @click="$emit('change', pagination.currentPage - 1)"
      :disabled="pagination.first"
      class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      aria-label="Página anterior">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <span class="text-sm font-medium text-gray-700 dark:text-gray-300" aria-live="polite">
      Página {{ pagination.currentPage + 1 }} de {{ pagination.totalPages }}
    </span>

    <button
      @click="$emit('change', pagination.currentPage + 1)"
      :disabled="pagination.last"
      class="flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      aria-label="Próxima página">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>
</template>
