<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import TagsInput from '@/components/TagsInput.vue';
import { bulkCreate } from '@/services/card/cardService.js';

const BATCH_SIZE = 500;

const route = useRoute();
const router = useRouter();
const store = useStore();
const deckId = route.params.deckId;

const raw = ref('');
const sharedTags = ref([]);
const saving = ref(false);
const failure = ref('');
const fileInput = ref(null);

function normalizeTag(tag) {
  return tag.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\p{L}\p{N}-]/gu, '').slice(0, 30);
}

// cada linha: frente <separador> verso [<separador> tags separadas por vírgula]
// o separador é a tabulação (colar de planilha ou exportar do Anki) ou ponto e vírgula
function parseLine(line) {
  const separator = line.includes('\t') ? '\t' : ';';
  const parts = line.split(separator).map(part => part.trim());

  return {
    front: parts[0] || '',
    back: parts[1] || '',
    tags: (parts[2] || '').split(',').map(normalizeTag).filter(Boolean)
  };
}

function problemOf(card) {
  if (!card.back) return 'falta o verso';
  if (card.front.length < 2 || card.back.length < 2) return 'frente e verso precisam de pelo menos 2 caracteres';
  if (card.front.length > 255 || card.back.length > 255) return 'frente e verso aceitam até 255 caracteres';
  return '';
}

const lines = computed(() => raw.value
  .split(/\r?\n/)
  .map((text, index) => ({ text, number: index + 1 }))
  .filter(line => line.text.trim() !== ''));

const parsed = computed(() => lines.value.map(line => {
  const card = parseLine(line.text);
  return { ...card, number: line.number, problem: problemOf(card) };
}));

const validCards = computed(() => parsed.value.filter(card => !card.problem));
const invalidCards = computed(() => parsed.value.filter(card => card.problem));

function withSharedTags(card) {
  return { ...card, tags: [...new Set([...card.tags, ...sharedTags.value])].slice(0, 8) };
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}

function loadFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    raw.value = String(reader.result || '');
  };
  reader.readAsText(file);
  event.target.value = '';
}

async function save() {
  if (!validCards.value.length || saving.value) return;

  saving.value = true;
  failure.value = '';

  const cards = validCards.value.map(withSharedTags);
  let created = 0;

  try {
    for (let start = 0; start < cards.length; start += BATCH_SIZE) {
      const result = await bulkCreate(deckId, cards.slice(start, start + BATCH_SIZE));
      created += result.created;
    }

    const deck = await store.dispatch('deck/fetchDeck', deckId);
    await store.dispatch('card/fetchCardsByDeck', { deckId, forceRefresh: true });
    await router.push({ name: 'ManageDeckPage', params: { deckId, deckTitle: deck.title } });
  } catch (error) {
    failure.value = created > 0
      ? `${plural(created, 'card foi adicionado', 'cards foram adicionados')} antes do erro. Remova essas linhas do texto antes de tentar de novo.`
      : 'Não foi possível adicionar os cards. Verifique sua conexão e tente de novo.';
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="flex flex-1 justify-center py-5 px-0 sm:px-6 text-gray-800 dark:text-gray-100">
    <div class="flex flex-col w-full max-w-[720px] gap-6">
      <header>
        <h1 class="text-2xl sm:text-3xl font-bold">Adicionar vários cards</h1>
        <p class="text-sm text-fg-muted mt-1">
          Cole uma lista com um card por linha: frente, separador e verso. Funciona com texto copiado de planilhas e com arquivos exportados do Anki.
        </p>
      </header>

      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between gap-3">
          <label for="bulk-text" class="text-sm font-medium">Cards</label>
          <button type="button" class="cursor-pointer text-sm text-fg-primary hover:underline" @click="fileInput.click()">
            Carregar arquivo .txt ou .csv
          </button>
          <input ref="fileInput" type="file" accept=".txt,.csv,.tsv,text/plain,text/csv" class="hidden" @change="loadFile" />
        </div>
        <textarea
          id="bulk-text"
          v-model="raw"
          rows="10"
          spellcheck="false"
          placeholder="Capital da França;Paris&#10;Fórmula da água;H2O;quimica,basico"
          class="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-4 py-3 text-base font-mono resize-y focus:outline-0 focus:ring-2 focus:ring-primary-500/20 placeholder:text-fg-muted"
        ></textarea>
        <p class="text-xs text-fg-muted">
          Separe frente e verso com ponto e vírgula ou tabulação. Uma terceira coluna opcional aceita tags separadas por vírgula.
        </p>
      </div>

      <div class="flex flex-col gap-2">
        <label for="bulk-tags" class="text-sm font-medium">Tags para todos os cards <span class="text-fg-muted font-normal">(opcional)</span></label>
        <TagsInput id="bulk-tags" v-model="sharedTags" />
      </div>

      <section v-if="parsed.length" aria-live="polite" class="flex flex-col gap-3">
        <p class="font-medium">
          {{ plural(validCards.length, 'card pronto', 'cards prontos') }} para adicionar<template v-if="invalidCards.length">,
          <span class="text-fg-error">{{ plural(invalidCards.length, 'linha com problema', 'linhas com problema') }}</span></template>.
        </p>

        <ul v-if="invalidCards.length" class="flex flex-col gap-1 text-sm list-none">
          <li v-for="card in invalidCards.slice(0, 5)" :key="card.number" class="text-fg-error">
            Linha {{ card.number }}: {{ card.problem }}.
          </li>
          <li v-if="invalidCards.length > 5" class="text-fg-muted">e mais {{ invalidCards.length - 5 }}.</li>
        </ul>

        <div v-if="validCards.length" class="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-fg-muted bg-gray-50 dark:bg-gray-800/40">
                <th class="px-4 py-2 font-medium">Frente</th>
                <th class="px-4 py-2 font-medium">Verso</th>
                <th class="px-4 py-2 font-medium">Tags</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="card in validCards.slice(0, 5)" :key="card.number" class="border-t border-gray-100 dark:border-gray-800">
                <td class="px-4 py-2 break-words">{{ card.front }}</td>
                <td class="px-4 py-2 break-words">{{ card.back }}</td>
                <td class="px-4 py-2 text-fg-muted">{{ withSharedTags(card).tags.join(', ') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-if="validCards.length > 5" class="text-xs text-fg-muted">Mostrando 5 de {{ validCards.length }}.</p>
      </section>

      <p v-if="failure" class="text-sm text-fg-error" role="alert">{{ failure }}</p>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="save"
          :disabled="!validCards.length || saving"
          class="cursor-pointer rounded-xl h-11 px-8 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold transition-colors"
        >
          {{ saving ? 'Adicionando...' : validCards.length ? `Adicionar ${plural(validCards.length, 'card', 'cards')}` : 'Adicionar cards' }}
        </button>
        <button
          @click="router.back()"
          class="cursor-pointer rounded-xl h-11 px-8 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>
