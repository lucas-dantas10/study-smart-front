<script setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import PaginationBar from '@/components/PaginationBar.vue';

const router = useRouter();
const store = useStore();

const decks = computed(() => (store.state.deck.list || []).map(d => ({
  id: d.id,
  name: d.title,
  total_cards: d.total_cards || 0,
  study_count: d.cards_to_review_today || 0,
  last_studied: d.last_reviewed_at
})));

// decks com revisão pendente primeiro; a ordem original é mantida dentro de cada grupo
const sortedDecks = computed(() => [...decks.value].sort((a, b) => (b.study_count > 0) - (a.study_count > 0)));
const pendingDecks = computed(() => decks.value.filter(d => d.study_count > 0));
const pendingTotal = computed(() => pendingDecks.value.reduce((sum, d) => sum + d.study_count, 0));
const hasDecks = computed(() => decks.value.length > 0);
const user = computed(() => store.state.auth.user || {});
const firstName = computed(() => (user.value.name || '').split(' ')[0]);
const pagination = computed(() => store.state.deck.pagination);

async function changePage(page) {
  await store.dispatch('deck/fetchDecks', { page, forceRefresh: true });
}

function formatLastStudied(date) {
  if (!date) return 'Nunca estudado';

  const lastStudy = new Date(date);
  const now = new Date();

  const d1 = new Date(lastStudy.getFullYear(), lastStudy.getMonth(), lastStudy.getDate());
  const d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return 'hoje';
  if (diffDays === 1) return 'ontem';
  return `${diffDays} dias atrás`;
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}

onMounted(async () => {
  await Promise.all([
    store.dispatch('deck/fetchDecks', true),
    store.dispatch('auth/fetchMe')
  ]);
});

function goToCreateDeck() {
  router.push({ name: "CreateDeckFormPage" });
}

function studyFirstPending() {
  const deck = pendingDecks.value[0];
  if (deck) router.push({ name: 'StudyDeckPage', params: { deckId: deck.id } });
}
</script>

<template>
  <div v-if="!hasDecks" class="flex flex-1 justify-center px-4 sm:px-8 py-10">
    <div class="flex flex-col items-center text-center gap-6 max-w-[480px]">
      <div class="w-24 h-24 rounded-3xl bg-primary-50 dark:bg-primary-500/10 border border-primary-500/20 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-fg-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      </div>
      <div class="flex flex-col gap-2">
        <h1 class="text-2xl sm:text-3xl font-bold leading-tight">
          Olá{{ firstName ? ', ' + firstName : '' }}
        </h1>
        <p class="text-fg-muted">
          Você ainda não tem decks. Crie o primeiro para começar a estudar.
        </p>
      </div>
      <button
        @click="goToCreateDeck"
        class="cursor-pointer rounded-xl h-11 px-6 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold transition-colors">
        Criar deck
      </button>
    </div>
  </div>

  <div v-else class="flex flex-1 justify-center py-5 px-0 sm:px-4 md:px-12">
    <div class="flex flex-col max-w-[960px] flex-1">
      <header class="flex flex-wrap items-end justify-between gap-4 p-4">
        <div class="flex flex-col gap-1">
          <h1 class="text-2xl sm:text-3xl font-bold leading-tight">
            {{ pendingTotal > 0 ? `${plural(pendingTotal, 'card', 'cards')} para revisar hoje` : 'Tudo em dia por hoje' }}
          </h1>
          <p class="text-sm text-fg-muted">
            <template v-if="pendingTotal > 0">
              Em {{ plural(pendingDecks.length, 'deck', 'decks') }}. Comece pelo que está pendente.
            </template>
            <template v-else>
              Nenhuma revisão pendente{{ firstName ? ', ' + firstName : '' }}. Que tal adicionar novos cards?
            </template>
          </p>
        </div>
        <button
          v-if="pendingTotal > 0"
          @click="studyFirstPending"
          class="cursor-pointer rounded-xl h-11 px-6 bg-primary-500 hover:bg-primary-600 text-white text-sm font-bold transition-colors">
          Estudar agora
        </button>
      </header>

      <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 list-none">
        <li v-for="deck in sortedDecks" :key="deck.id">
          <router-link
            :to="{ name: 'StudyDeckPage', params: { deckId: deck.id } }"
            class="group flex flex-col gap-4 h-full rounded-2xl border bg-surface-light dark:bg-surface-dark p-4 transition-colors"
            :class="deck.study_count > 0
              ? 'border-pending-500/40 hover:border-pending-500'
              : 'border-gray-200 dark:border-gray-800 hover:border-primary-500/40'">

            <div class="w-full aspect-[4/3] rounded-xl flex items-center justify-center bg-secondary-50 dark:bg-primary-500/10 border border-secondary-500/10 dark:border-primary-500/20 transition-colors group-hover:bg-secondary-100 dark:group-hover:bg-primary-500/20">
              <span class="font-[family-name:var(--font-card)] text-5xl font-semibold text-fg-info dark:text-primary-100 select-none" aria-hidden="true">
                {{ (deck.name || '?').trim().charAt(0).toUpperCase() }}
              </span>
            </div>

            <div class="flex flex-col gap-2">
              <h2 class="text-base font-bold leading-tight break-words">{{ deck.name }}</h2>

              <p
                class="text-sm font-semibold"
                :class="deck.study_count > 0 ? 'text-fg-pending' : 'text-fg-success'">
                {{ deck.study_count > 0 ? `${plural(deck.study_count, 'card', 'cards')} para hoje` : 'Em dia' }}
              </p>

              <p class="text-xs text-fg-muted">
                {{ plural(deck.total_cards, 'card', 'cards') }} no total · Último estudo: {{ formatLastStudied(deck.last_studied) }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>

      <PaginationBar :pagination="pagination" @change="changePage" />
    </div>
  </div>
</template>
