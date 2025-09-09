<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import ErrorModal from '@/components/ErrorModal.vue'
import HelpModal from '@/components/HelpModal.vue';

const store = useStore();
const showHelpModal = ref(false);

onMounted(() => {
  store.dispatch('auth/fetchMe');
});

const user = computed(() => store.state.auth.user || {});
const isLoading = computed(() => store.state.auth.loading || store.state.deck?.loading || store.state.card?.loading);
const errorState = computed(() => store.state.auth.error || store.state.deck?.error || store.state.card?.error);

function clearErrors() {
  if (store.state.auth.error) store.commit('auth/setError', null);
  if (store.state.deck?.error) store.commit('deck/setError', null);
  if (store.state.card?.error) store.commit('card/setError', null);
}

function toggleHelpModal() {
  showHelpModal.value = !showHelpModal.value;
}

const userPhoto = computed(() => {
  return user.value.picture
    ? user.value.picture
    : 'https://www.gravatar.com/avatar/?d=mp';
})
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen font-poppins flex flex-col">
    <nav class="flex justify-between items-center px-8 h-16 shadow-sm bg-white dark:bg-gray-800">
      <div class="font-bold text-lg tracking-wide text-gray-900 dark:text-white">
        StudySmart
      </div>
      <div class="flex items-center gap-6">
        <router-link
          to="/"
          class="text-base text-gray-900 dark:text-white font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Início
        </router-link>
        <router-link
          to="/decks"
          class="text-base text-gray-900 dark:text-white font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Decks
        </router-link>
        <button
          @click="toggleHelpModal"
          class="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 dark:border-gray-600 text-gray-900 dark:text-white font-bold hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Abrir ajuda"
          title="Ajuda"
        >
          ?
        </button>

        <router-link
          to="/profile"
          class="flex items-center justify-center cursor-pointer"
          aria-label="Abrir perfil do usuário"
        >
          <img
            class="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
            :src="userPhoto"
            alt="Foto de perfil"
          />
        </router-link>
      </div>
    </nav>
    <main class="w-full flex flex-col flex-1 text-gray-900 dark:text-white">
      <router-view />
    </main>
    <LoadingOverlay :show="!!isLoading" message="Carregando..." />
    <ErrorModal
      :show="!!errorState"
      title="Ocorreu um erro"
      :message="'Não foi possível completar a operação.'"
      :details="String(errorState || '')"
      @close="clearErrors"
    />
    <HelpModal :show="showHelpModal" @close="toggleHelpModal" />
  </div>
</template>
