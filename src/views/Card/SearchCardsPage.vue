<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { searchCards } from '@/services/card/cardService.js';

const router = useRouter();

const query = ref('');
const tag = ref('');
const results = ref([]);
const loading = ref(false);
const failed = ref(false);

let debounce = null;
let requestId = 0;

const hasFilter = computed(() => query.value.trim() !== '' || tag.value !== '');

async function run() {
  const current = ++requestId;
  loading.value = true;
  failed.value = false;

  try {
    const found = await searchCards({ q: query.value.trim(), tag: tag.value });
    // ignora respostas antigas quando o usuário já digitou outra coisa
    if (current === requestId) results.value = found;
  } catch (error) {
    if (current === requestId) failed.value = true;
  } finally {
    if (current === requestId) loading.value = false;
  }
}

watch([query, tag], () => {
  clearTimeout(debounce);
  debounce = setTimeout(run, 300);
});

onMounted(run);
onBeforeUnmount(() => clearTimeout(debounce));

function filterByTag(name) {
  tag.value = name;
}

function clear() {
  query.value = '';
  tag.value = '';
}

function edit(card) {
  router.push({ name: 'EditCardFormPage', params: { deckId: card.deck_id, cardId: card.id } });
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}
</script>

<template>
  <div class="w-full max-w-3xl mx-auto px-2 sm:px-6 py-4 text-gray-800 dark:text-gray-100">
    <header class="mb-5">
      <h1 class="text-2xl sm:text-3xl font-bold">Buscar cards</h1>
      <p class="text-sm text-fg-muted mt-1">Procure na frente e no verso de todos os seus decks.</p>
    </header>

    <div class="flex flex-col gap-3 mb-5">
      <label for="search-text" class="sr-only">Buscar cards</label>
      <input
        id="search-text"
        v-model="query"
        type="search"
        placeholder="Digite parte da pergunta ou da resposta"
        class="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-4 py-3 text-base focus:outline-0 focus:ring-2 focus:ring-primary-500/20 placeholder:text-fg-muted"
      />

      <div v-if="tag" class="flex items-center gap-2 text-sm">
        <span class="text-fg-muted">Filtrando pela tag</span>
        <span class="inline-flex items-center gap-1 rounded-full bg-primary-50 dark:bg-primary-500/15 text-fg-primary px-2.5 py-0.5">
          {{ tag }}
          <button class="cursor-pointer leading-none text-base" aria-label="Remover filtro de tag" @click="tag = ''">×</button>
        </span>
      </div>
    </div>

    <p v-if="failed" class="text-fg-error text-sm mb-4" role="alert">
      Não foi possível buscar agora. Verifique sua conexão e tente de novo.
    </p>

    <p class="text-sm text-fg-muted mb-3" aria-live="polite">
      <template v-if="loading">Buscando...</template>
      <template v-else-if="hasFilter">{{ plural(results.length, 'card encontrado', 'cards encontrados') }}{{ results.length === 100 ? ' (mostrando os 100 primeiros)' : '' }}.</template>
      <template v-else>Seus cards mais recentes.</template>
    </p>

    <ul v-if="results.length" class="flex flex-col gap-3 list-none">
      <li
        v-for="card in results"
        :key="card.id"
        class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
      >
        <div class="min-w-0">
          <p class="font-semibold break-words">{{ card.front_text }}</p>
          <p class="text-sm text-fg-muted break-words mt-0.5">{{ card.back_text }}</p>
          <div class="flex flex-wrap items-center gap-2 mt-2">
            <span class="text-xs text-fg-muted">{{ card.deck_title }}</span>
            <button
              v-for="name in card.tags"
              :key="name"
              class="cursor-pointer text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-fg-muted hover:text-fg-primary px-2.5 py-0.5 transition-colors"
              :title="`Filtrar pela tag ${name}`"
              @click="filterByTag(name)"
            >
              {{ name }}
            </button>
          </div>
        </div>
        <button
          class="cursor-pointer shrink-0 self-start rounded-lg px-4 h-9 text-sm font-medium bg-primary-50 dark:bg-primary-500/10 text-fg-primary hover:bg-primary-100 dark:hover:bg-primary-500/20 transition-colors"
          @click="edit(card)"
        >
          Editar
        </button>
      </li>
    </ul>

    <div v-else-if="!loading && !failed" class="flex flex-col items-center gap-3 py-14 text-center">
      <p class="font-semibold">{{ hasFilter ? 'Nenhum card encontrado' : 'Você ainda não tem cards' }}</p>
      <p class="text-sm text-fg-muted max-w-sm">
        {{ hasFilter ? 'Tente outra palavra ou remova o filtro de tag.' : 'Crie um deck e adicione cards para poder buscá-los aqui.' }}
      </p>
      <button v-if="hasFilter" class="cursor-pointer text-sm text-fg-primary hover:underline" @click="clear">Limpar busca</button>
    </div>
  </div>
</template>
