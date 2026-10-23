<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getStats } from '@/services/stats/statsService.js';

const router = useRouter();

const stats = ref(null);
const loading = ref(true);
const failed = ref(false);
const showTable = ref(false);
const tooltip = ref(null);

async function load() {
  loading.value = true;
  failed.value = false;

  try {
    stats.value = await getStats();
  } catch (error) {
    failed.value = true;
  } finally {
    loading.value = false;
  }
}

onMounted(load);

function parseDay(iso) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function isoOf(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function plural(n, one, many) {
  return `${n} ${n === 1 ? one : many}`;
}

const longDate = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
const shortWeekday = new Intl.DateTimeFormat('pt-BR', { weekday: 'short' });
const monthName = new Intl.DateTimeFormat('pt-BR', { month: 'short' });

const hasStudied = computed(() => (stats.value?.total_reviews || 0) > 0);

const streakHint = computed(() => {
  const s = stats.value;
  if (!s) return '';
  if (s.current_streak === 0) return 'Estude hoje para começar uma sequência.';
  if (s.reviews_today === 0) return 'Estude hoje para manter a sequência.';
  return 'Você já estudou hoje.';
});

// --- atividade (mapa de calor) ---
const WEEKS = 26;

const activityByDay = computed(() => {
  const map = new Map();
  (stats.value?.activity || []).forEach(day => map.set(day.date, day.count));
  return map;
});

const heatmap = computed(() => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // a grade termina na semana de hoje; cada coluna é uma semana começando no domingo
  const start = new Date(today);
  start.setDate(start.getDate() - today.getDay() - (WEEKS - 1) * 7);

  const counts = [...activityByDay.value.values()].filter(c => c > 0).sort((a, b) => a - b);
  const quantile = q => counts.length ? counts[Math.min(counts.length - 1, Math.floor(q * counts.length))] : 0;
  const cuts = [quantile(0.25), quantile(0.5), quantile(0.75)];

  function levelOf(count) {
    if (count === 0) return 0;
    if (count <= cuts[0]) return 1;
    if (count <= cuts[1]) return 2;
    if (count <= cuts[2]) return 3;
    return 4;
  }

  const weeks = [];
  for (let w = 0; w < WEEKS; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      const iso = isoOf(date);
      const future = date > today;
      const count = activityByDay.value.get(iso) || 0;
      days.push({ iso, date, future, count, level: future ? -1 : levelOf(count) });
    }
    weeks.push(days);
  }

  const months = weeks.map((week, index) => {
    const label = monthName.format(week[0].date).replace('.', '');
    const previous = index > 0 ? monthName.format(weeks[index - 1][0].date).replace('.', '') : null;
    return label !== previous ? label : '';
  });

  // a primeira coluna só ganha rótulo se o mês seguinte não começar já na coluna ao lado
  if (months[1]) months[0] = '';

  return { weeks, months };
});

const activeDays = computed(() => (stats.value?.activity || []).filter(d => d.count > 0).length);

const tableRows = computed(() => [...(stats.value?.activity || [])].filter(d => d.count > 0).reverse());

function showTip(event, text) {
  const rect = event.currentTarget.getBoundingClientRect();
  tooltip.value = { text, x: rect.left + rect.width / 2, y: rect.top };
}

function hideTip() {
  tooltip.value = null;
}

function cellText(cell) {
  const label = longDate.format(cell.date);
  return cell.count === 0 ? `${label}: nenhuma revisão` : `${label}: ${plural(cell.count, 'revisão', 'revisões')}`;
}

// --- previsão dos próximos dias ---
const forecast = computed(() => {
  const days = stats.value?.forecast || [];
  const max = Math.max(1, ...days.map(d => d.count));

  return days.map((day, index) => {
    const date = parseDay(day.date);
    const label = index === 0 ? 'Hoje' : index === 1 ? 'Amanhã' : shortWeekday.format(date).replace('.', '');
    return { ...day, date, label, height: Math.round((day.count / max) * 100) };
  });
});

const forecastTotal = computed(() => forecast.value.reduce((sum, d) => sum + d.count, 0));

function forecastText(day) {
  return `${longDate.format(day.date)}: ${plural(day.count, 'card', 'cards')} para revisar`;
}

// --- acerto por deck ---
const decks = computed(() => (stats.value?.deck_accuracy || []).map(deck => ({
  ...deck,
  percent: deck.reviews ? Math.round((deck.correct / deck.reviews) * 100) : 0
})));
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-2 sm:px-6 py-4 text-gray-800 dark:text-gray-100">
    <header class="mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold">Seu estudo</h1>
      <p class="text-sm text-fg-muted mt-1">Constância, carga dos próximos dias e desempenho por deck.</p>
    </header>

    <p v-if="loading" class="text-fg-muted py-16 text-center">Carregando estatísticas...</p>

    <div v-else-if="failed" class="flex flex-col items-center gap-4 py-16 text-center">
      <p class="font-semibold">Não foi possível carregar as estatísticas</p>
      <p class="text-sm text-fg-muted">Verifique sua conexão e tente de novo.</p>
      <button @click="load" class="cursor-pointer rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-6 py-2.5 transition-colors">
        Tentar novamente
      </button>
    </div>

    <div v-else-if="!hasStudied" class="flex flex-col items-center gap-4 py-16 text-center">
      <p class="text-lg font-semibold">Você ainda não revisou nenhum card</p>
      <p class="text-sm text-fg-muted max-w-sm">Suas estatísticas aparecem aqui depois da primeira revisão.</p>
      <button @click="router.push({ name: 'HomePage' })" class="cursor-pointer rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-6 py-2.5 transition-colors">
        Começar a estudar
      </button>
    </div>

    <div v-else class="flex flex-col gap-6">
      <!-- sequência -->
      <section class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-6" aria-labelledby="streak-title">
        <h2 id="streak-title" class="text-sm font-medium text-fg-muted">Sequência de estudo</h2>
        <div class="flex flex-wrap items-end gap-x-8 gap-y-4 mt-2">
          <div>
            <p class="text-5xl font-bold leading-none">
              {{ stats.current_streak }}
              <span class="text-lg font-medium text-fg-muted">{{ stats.current_streak === 1 ? 'dia' : 'dias' }}</span>
            </p>
            <p class="text-sm text-fg-muted mt-2">{{ streakHint }}</p>
          </div>
          <dl class="flex gap-8 text-sm">
            <div>
              <dd class="text-xl font-semibold">{{ stats.longest_streak }}</dd>
              <dt class="text-fg-muted">Maior sequência</dt>
            </div>
            <div>
              <dd class="text-xl font-semibold">{{ stats.reviews_today }}</dd>
              <dt class="text-fg-muted">Revisões hoje</dt>
            </div>
            <div>
              <dd class="text-xl font-semibold">{{ stats.total_reviews }}</dd>
              <dt class="text-fg-muted">Revisões no total</dt>
            </div>
          </dl>
        </div>
      </section>

      <!-- atividade -->
      <section class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-6" aria-labelledby="activity-title">
        <div class="flex flex-wrap items-baseline justify-between gap-2 mb-4">
          <div>
            <h2 id="activity-title" class="font-semibold">Atividade nos últimos 6 meses</h2>
            <p class="text-sm text-fg-muted">Você estudou em {{ plural(activeDays, 'dia', 'dias') }}.</p>
          </div>
          <button @click="showTable = !showTable" class="cursor-pointer text-sm text-fg-primary hover:underline" :aria-expanded="showTable">
            {{ showTable ? 'Ver como gráfico' : 'Ver como tabela' }}
          </button>
        </div>

        <div v-if="!showTable" class="overflow-x-auto pb-2">
          <div class="inline-block">
            <div class="heat-months" :style="{ gridTemplateColumns: `repeat(${heatmap.weeks.length}, 12px)` }" aria-hidden="true">
              <span v-for="(label, index) in heatmap.months" :key="index" class="text-xs text-fg-muted leading-none">{{ label }}</span>
            </div>
            <div class="heat-grid" :style="{ gridTemplateColumns: `repeat(${heatmap.weeks.length}, 12px)` }" role="img" :aria-label="`Mapa de atividade: ${plural(activeDays, 'dia', 'dias')} de estudo nos últimos 6 meses. Use a visão em tabela para ver os valores.`">
              <template v-for="week in heatmap.weeks" :key="week[0].iso">
                <span
                  v-for="cell in week"
                  :key="cell.iso"
                  class="heat-cell"
                  :class="'level-' + cell.level"
                  @mouseenter="cell.future ? null : showTip($event, cellText(cell))"
                  @mouseleave="hideTip"
                ></span>
              </template>
            </div>
          </div>
        </div>

        <div v-if="!showTable" class="flex items-center gap-2 text-xs text-fg-muted mt-3">
          Menos
          <span v-for="level in 5" :key="level" class="heat-cell" :class="'level-' + (level - 1)"></span>
          Mais
        </div>

        <div v-else class="max-h-72 overflow-y-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-left text-fg-muted">
                <th class="py-2 font-medium">Dia</th>
                <th class="py-2 font-medium text-right">Revisões</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in tableRows" :key="row.date" class="border-t border-gray-100 dark:border-gray-800">
                <td class="py-2">{{ longDate.format(parseDay(row.date)) }}</td>
                <td class="py-2 text-right tabular-nums">{{ row.count }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- previsão -->
      <section class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-6" aria-labelledby="forecast-title">
        <h2 id="forecast-title" class="font-semibold">Cards para revisar nos próximos 7 dias</h2>
        <p class="text-sm text-fg-muted mb-4">
          {{ forecastTotal === 0 ? 'Nenhum card agendado.' : plural(forecastTotal, 'card agendado', 'cards agendados') + '. Atrasados e novos contam em hoje.' }}
        </p>

        <ul class="forecast-bars list-none" role="list">
          <li
            v-for="day in forecast"
            :key="day.date"
            class="forecast-col"
            tabindex="0"
            :aria-label="forecastText(day)"
            @mouseenter="showTip($event, forecastText(day))"
            @mouseleave="hideTip"
            @focus="showTip($event, forecastText(day))"
            @blur="hideTip"
          >
            <span class="text-xs font-medium tabular-nums">{{ day.count }}</span>
            <span class="forecast-track">
              <span class="forecast-bar" :style="{ height: Math.max(day.height, day.count > 0 ? 4 : 0) + '%' }"></span>
            </span>
            <span class="text-xs text-fg-muted">{{ day.label }}</span>
          </li>
        </ul>
      </section>

      <!-- acerto por deck -->
      <section v-if="decks.length" class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark p-6" aria-labelledby="accuracy-title">
        <h2 id="accuracy-title" class="font-semibold">Acertos por deck</h2>
        <p class="text-sm text-fg-muted mb-4">Contam como acerto as avaliações Médio e Fácil.</p>

        <ul class="flex flex-col gap-4 list-none">
          <li v-for="deck in decks" :key="deck.deck_id">
            <div class="flex items-baseline justify-between gap-4 text-sm mb-1.5">
              <span class="font-medium break-words min-w-0">{{ deck.deck_title }}</span>
              <span class="text-fg-muted tabular-nums shrink-0">{{ deck.percent }}% · {{ plural(deck.reviews, 'revisão', 'revisões') }}</span>
            </div>
            <div class="meter-track" role="meter" :aria-valuenow="deck.percent" aria-valuemin="0" aria-valuemax="100" :aria-label="`Acertos em ${deck.deck_title}`">
              <div class="meter-fill" :style="{ width: deck.percent + '%' }"></div>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <div
      v-if="tooltip"
      class="stat-tooltip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
      role="tooltip"
    >
      {{ tooltip.text }}
    </div>
  </div>
</template>

<style scoped>
/* uma única cor (o índigo da marca) em degraus de intensidade; o degrau 0 é o cinza neutro da superfície */
.heat-months,
.heat-grid {
  display: grid;
  column-gap: 3px;
}

.heat-months {
  height: 14px;
  margin-bottom: 4px;
}

.heat-months span {
  white-space: nowrap;
  overflow: visible;
}

.heat-grid {
  grid-template-rows: repeat(7, 12px);
  grid-auto-flow: column;
  row-gap: 3px;
}

.heat-cell {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 3px;
}

.level--1 { visibility: hidden; }
.level-0 { background: #e5e7eb; }
.level-1 { background: color-mix(in srgb, var(--color-primary-500) 30%, #e5e7eb); }
.level-2 { background: color-mix(in srgb, var(--color-primary-500) 55%, #e5e7eb); }
.level-3 { background: color-mix(in srgb, var(--color-primary-500) 80%, #e5e7eb); }
.level-4 { background: var(--color-primary-600); }

@media (prefers-color-scheme: dark) {
  .level-0 { background: #232a40; }
  .level-1 { background: color-mix(in srgb, var(--color-primary-500) 35%, #232a40); }
  .level-2 { background: color-mix(in srgb, var(--color-primary-500) 60%, #232a40); }
  .level-3 { background: color-mix(in srgb, var(--color-primary-500) 85%, #232a40); }
  .level-4 { background: #8ea2ff; }
}

.forecast-bars {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
  align-items: end;
}

.forecast-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  border-radius: 8px;
  padding: 4px 0;
}

.forecast-track {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #e5e7eb;
}

.forecast-bar {
  display: block;
  width: min(24px, 60%);
  background: var(--color-primary-500);
  border-radius: 4px 4px 0 0;
}

.meter-track {
  height: 8px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--color-primary-500) 18%, transparent);
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  border-radius: 4px;
  background: var(--color-primary-500);
}

.stat-tooltip {
  position: fixed;
  z-index: 60;
  transform: translate(-50%, calc(-100% - 8px));
  max-width: 260px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.3;
  color: #fff;
  background: #1f2937;
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .forecast-track { border-bottom-color: #2a3150; }
  .forecast-bar { background: #8ea2ff; }
  .meter-fill { background: #8ea2ff; }
  .stat-tooltip { background: #e5e7eb; color: #111827; }
}
</style>
