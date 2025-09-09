<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import ErrorModal from '@/components/ErrorModal.vue'
import HelpModal from '@/components/HelpModal.vue';

const store = useStore();
const showHelpModal = ref(false);
const open = ref(false);

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

function toggleMenu() {
  open.value = !open.value;
}

function closeMenu() {
  open.value = false;
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 min-h-screen font-poppins flex flex-col">
    <nav class="flex justify-between items-center px-4 sm:px-8 h-16 shadow-sm bg-white dark:bg-gray-800">
      <div class="flex items-center">
        <div class="font-bold text-lg tracking-wide text-gray-900 dark:text-white">
          StudySmart
        </div>
      </div>

      <div class="hidden md:flex items-center gap-4 lg:gap-6">
        <router-link
            to="/"
            class="text-base text-gray-900 dark:text-white font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Início
        </router-link>
        <router-link
            to="/decks"
            class="text-base text-gray-900 dark:text-white font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
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

      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="cursor-pointer text-gray-900 dark:text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </nav>

    <transition name="slide-fade">
      <div v-if="open" class="md:hidden fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col pt-16">
        <router-link
            to="/"
            class="text-white px-6 py-4 text-lg hover:bg-gray-800"
            @click="closeMenu"
        >
          Início
        </router-link>
        <router-link
            to="/decks"
            class="text-white px-6 py-4 text-lg hover:bg-gray-800"
            @click="closeMenu"
        >
          Decks
        </router-link>
        <button
          @click="toggleHelpModal"
          class="text-white px-6 py-4 text-lg text-left hover:bg-gray-800"
        >
          Ajuda (?)
        </button>
        <router-link
            to="/profile"
            class="flex items-center px-6 py-4 text-lg text-white hover:bg-gray-800"
            @click="closeMenu"
        >
          <img
              class="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
              :src="userPhoto"
              alt="Foto de perfil"
          />
          <span class="ml-4">Perfil</span>
        </router-link>
      </div>
    </transition>

    <main class="w-full flex flex-col flex-1 text-gray-900 dark:text-white px-4 sm:px-8 py-4">
      <router-view/>
    </main>

    <LoadingOverlay :show="!!isLoading" message="Carregando..."/>
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

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
