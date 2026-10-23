<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import ErrorModal from '@/components/ErrorModal.vue'
import HelpModal from '@/components/HelpModal.vue';

const store = useStore();
const route = useRoute();
const showHelpModal = ref(false);
const open = ref(false);

onMounted(() => {
  store.dispatch('auth/fetchMe');
  window.addEventListener('keydown', onKeydown);
});

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));

watch(() => route.fullPath, closeMenu);

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

function onKeydown(e) {
  if (e.key === 'Escape') closeMenu();
}

const linkClass = 'nav-link text-sm text-gray-700 dark:text-gray-300 font-medium px-3 py-2 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-500/10 transition-colors';
</script>

<template>
  <div class="bg-background-light dark:bg-background-dark min-h-screen font-poppins flex flex-col">
    <header class="sticky top-0 z-40 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
      <nav class="flex items-center justify-between gap-4 px-4 sm:px-8 h-16" aria-label="Principal">
        <div class="flex items-center gap-2 lg:gap-6">
          <router-link to="/" class="flex items-center gap-2 font-bold text-lg text-fg-primary dark:text-white">
            <img src="@/assets/logo.jpg" alt="" class="w-8 h-8 rounded-lg object-cover" />
            StudySmart
          </router-link>

          <div class="hidden md:flex items-center gap-1 ml-2">
            <router-link to="/" exact-active-class="is-active" :class="linkClass">Início</router-link>
            <router-link to="/decks" active-class="is-active" :class="linkClass">Decks</router-link>
            <router-link to="/search" active-class="is-active" :class="linkClass">Buscar</router-link>
            <router-link to="/stats" active-class="is-active" :class="linkClass">Estatísticas</router-link>
          </div>
        </div>

        <div class="hidden md:flex items-center gap-3">
          <router-link
              :to="{ name: 'CreateDeckFormPage' }"
              class="rounded-lg bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2 transition-colors"
          >
            Novo deck
          </router-link>

          <button
              @click="toggleHelpModal"
              class="cursor-pointer w-9 h-9 flex items-center justify-center rounded-full text-fg-muted hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-fg-primary transition-colors"
              aria-label="Abrir ajuda"
              title="Ajuda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          <router-link
              to="/profile"
              class="flex items-center justify-center rounded-full"
              :aria-label="user.name ? `Perfil de ${user.name}` : 'Abrir perfil'"
              title="Perfil"
          >
            <img
                class="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                :src="userPhoto"
                alt=""
            />
          </router-link>
        </div>

        <button
            @click="toggleMenu"
            class="md:hidden cursor-pointer w-10 h-10 flex items-center justify-center rounded-lg text-fg-primary dark:text-white hover:bg-primary-50 dark:hover:bg-primary-500/10"
            :aria-expanded="open"
            aria-controls="mobile-menu"
            :aria-label="open ? 'Fechar menu' : 'Abrir menu'"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path v-if="!open" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </nav>

      <transition name="slide-fade">
        <div v-if="open" id="mobile-menu" class="md:hidden absolute top-full inset-x-0 bg-surface-light dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800 shadow-xl p-3 flex flex-col gap-1">
          <router-link to="/" exact-active-class="is-active" :class="[linkClass, 'text-base py-3']">Início</router-link>
          <router-link to="/decks" active-class="is-active" :class="[linkClass, 'text-base py-3']">Decks</router-link>
          <router-link to="/search" active-class="is-active" :class="[linkClass, 'text-base py-3']">Buscar</router-link>
          <router-link to="/stats" active-class="is-active" :class="[linkClass, 'text-base py-3']">Estatísticas</router-link>
          <router-link to="/profile" active-class="is-active" :class="[linkClass, 'text-base py-3 flex items-center gap-3']">
            <img class="w-7 h-7 rounded-full object-cover" :src="userPhoto" alt="" />
            Perfil
          </router-link>
          <button @click="closeMenu(); toggleHelpModal()" :class="[linkClass, 'text-base py-3 text-left cursor-pointer']">Ajuda</button>
          <router-link
              :to="{ name: 'CreateDeckFormPage' }"
              class="mt-2 text-center rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-semibold px-4 py-3 transition-colors"
          >
            Novo deck
          </router-link>
        </div>
      </transition>
    </header>

    <div v-if="open" class="md:hidden fixed inset-0 top-16 z-30 bg-black/40" @click="closeMenu" aria-hidden="true"></div>

    <main class="w-full flex flex-col flex-1 text-gray-800 dark:text-gray-100 px-4 sm:px-8 py-4">
      <router-view/>
    </main>

    <LoadingOverlay :show="!!isLoading" message="Carregando..."/>
    <ErrorModal
        :show="!!errorState"
        title="Ocorreu um erro"
        :message="'Não foi possível concluir a ação. Verifique sua conexão e tente novamente.'"
        :details="String(errorState || '')"
        @close="clearErrors"
    />
    <HelpModal :show="showHelpModal" @close="toggleHelpModal" />
  </div>
</template>

<style>
.nav-link.is-active {
  color: var(--fg-primary);
  background-color: var(--color-primary-50);
}

@media (prefers-color-scheme: dark) {
  .nav-link.is-active {
    background-color: color-mix(in srgb, var(--color-primary-500) 20%, transparent);
  }
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
