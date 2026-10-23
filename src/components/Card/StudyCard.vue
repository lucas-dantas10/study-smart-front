<script setup>
import { ref, watch, computed, nextTick, onMounted, onBeforeUnmount } from 'vue';
import confetti from 'canvas-confetti';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  },
  // salva a edição de um card; precisa devolver uma Promise para sabermos se deu certo
  saveCard: {
    type: Function,
    default: null
  }
})

const emit = defineEmits(['card-evaluated', 'review-undone'])

const ratings = [
  { level: 1, label: 'Difícil', field: 'hard', key: '1', classes: 'hover:border-accent-500 hover:text-accent-600 focus-visible:outline-accent-500' },
  { level: 2, label: 'Médio', field: 'medium', key: '2', classes: 'hover:border-secondary-500 hover:text-fg-info focus-visible:outline-secondary-500' },
  { level: 3, label: 'Fácil', field: 'easy', key: '3', classes: 'hover:border-success-500 hover:text-fg-success focus-visible:outline-success-500' }
]

const currentIndex = ref(0)
const showAnswer = ref(false)
const finished = ref(false)
const results = ref({ 1: 0, 2: 0, 3: 0 })
const history = ref([])
const overrides = ref({})

const editing = ref(false)
const editFront = ref('')
const editBack = ref('')
const editError = ref('')
const editFrontField = ref(null)

const totalCards = computed(() => props.cards.length)
const progress = computed(() => totalCards.value ? (finished.value ? 100 : (currentIndex.value / totalCards.value) * 100) : 0)
const currentCard = computed(() => props.cards[currentIndex.value])
const canUndo = computed(() => history.value.length > 0)

const frontText = computed(() => overrides.value[currentCard.value?.id]?.front ?? currentCard.value?.front_text)
const backText = computed(() => overrides.value[currentCard.value?.id]?.back ?? currentCard.value?.back_text)

watch(() => props.cards, () => {
  clearTimeout(advanceTimer)
  currentIndex.value = 0
  showAnswer.value = false
  finished.value = false
  results.value = { 1: 0, 2: 0, 3: 0 }
  history.value = []
  overrides.value = {}
})

function formatInterval(days) {
  if (days == null) return ''
  if (days <= 1) return '1 dia'
  if (days < 30) return `${days} dias`
  if (days < 365) {
    const months = Math.round(days / 30)
    return months === 1 ? '1 mês' : `${months} meses`
  }
  const years = Math.round((days / 365) * 10) / 10
  return years === 1 ? '1 ano' : `${String(years).replace('.', ',')} anos`
}

function revealAnswer() {
  if (finished.value || totalCards.value === 0) return
  showAnswer.value = true
}

function evaluateCard(level) {
  if (!showAnswer.value || finished.value) return

  emit('card-evaluated', {
    card: currentCard.value,
    level
  })
  results.value[level]++
  history.value.push({ index: currentIndex.value, level })

  showAnswer.value = false

  // espera o card desvirar antes de trocar o texto, para não vazar a próxima resposta
  advanceTimer = setTimeout(() => {
    if (currentIndex.value < totalCards.value - 1) {
      currentIndex.value++
    } else {
      finished.value = true
      launchConfetti()
    }
  }, 300)
}

function undoLast() {
  const last = history.value.pop()
  if (!last) return

  clearTimeout(advanceTimer)
  clearInterval(confettiTimer)

  results.value[last.level]--
  currentIndex.value = last.index
  finished.value = false
  showAnswer.value = false

  emit('review-undone', { card: props.cards[last.index] })
}

async function openEditor() {
  if (!currentCard.value || finished.value) return

  editFront.value = frontText.value
  editBack.value = backText.value
  editError.value = ''
  editing.value = true

  await nextTick()
  editFrontField.value?.focus()
}

async function saveEdit() {
  const front = editFront.value.trim()
  const back = editBack.value.trim()

  if (front.length < 2 || back.length < 2) {
    editError.value = 'Frente e verso precisam ter pelo menos 2 caracteres.'
    return
  }

  if (front.length > 255 || back.length > 255) {
    editError.value = 'Frente e verso aceitam até 255 caracteres.'
    return
  }

  try {
    if (props.saveCard) await props.saveCard({ card: currentCard.value, front, back })
    overrides.value = { ...overrides.value, [currentCard.value.id]: { front, back } }
    editing.value = false
  } catch (error) {
    editError.value = 'Não foi possível salvar. Tente novamente.'
  }
}

function onKeydown(event) {
  if (editing.value) {
    if (event.key === 'Escape') editing.value = false
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) saveEdit()
    return
  }

  if (totalCards.value === 0) return

  const target = event.target
  const typing = target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable]')
  if (typing) return

  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z') {
    event.preventDefault()
    undoLast()
    return
  }

  if (event.metaKey || event.ctrlKey || event.altKey) return

  if (event.key.toLowerCase() === 'z') {
    undoLast()
    return
  }

  if (finished.value) return

  if (event.key.toLowerCase() === 'e') {
    event.preventDefault()
    openEditor()
    return
  }

  const onButton = target instanceof HTMLElement && target.closest('button, a')

  if ((event.key === ' ' || event.key === 'Enter') && !onButton && !showAnswer.value) {
    event.preventDefault()
    revealAnswer()
    return
  }

  const rating = ratings.find(r => r.key === event.key)
  if (rating && showAnswer.value) evaluateCard(rating.level)
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearInterval(confettiTimer)
  clearTimeout(advanceTimer)
})

function backHome() {
  router.push({ name: 'HomePage' });
}

let advanceTimer = null
let confettiTimer = null

function launchConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const duration = 2.5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  confettiTimer = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      clearInterval(confettiTimer)
      return
    }

    const particleCount = 40 * (timeLeft / duration)

    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    }))
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    }))
  }, 250)
}
</script>

<template>
  <div class="flex justify-center text-gray-800 dark:text-gray-100 py-4 sm:py-8">
    <div class="flex flex-col w-full max-w-[640px]">
      <template v-if="totalCards === 0">
        <div class="flex flex-col items-center gap-4 text-center py-16">
          <p class="text-xl font-semibold">Este deck está em dia</p>
          <p class="text-sm text-fg-muted max-w-sm">
            Não há cards para revisar agora. Volte amanhã ou adicione novos cards ao deck.
          </p>
          <button
            @click="backHome"
            class="mt-2 cursor-pointer rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-6 py-3 transition-colors"
          >
            Voltar para o início
          </button>
        </div>
      </template>

      <template v-else-if="finished">
        <div class="flex flex-col items-center gap-6 text-center py-12">
          <h1 class="text-3xl font-bold">Revisão concluída</h1>
          <p class="text-fg-muted">
            Você revisou {{ totalCards }} {{ totalCards === 1 ? 'card' : 'cards' }} neste deck.
          </p>

          <dl class="grid grid-cols-3 gap-3 w-full max-w-sm">
            <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark py-4">
              <dd class="text-2xl font-bold text-accent-600">{{ results[1] }}</dd>
              <dt class="text-xs text-fg-muted">Difíceis</dt>
            </div>
            <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark py-4">
              <dd class="text-2xl font-bold text-fg-info">{{ results[2] }}</dd>
              <dt class="text-xs text-fg-muted">Médios</dt>
            </div>
            <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark py-4">
              <dd class="text-2xl font-bold text-fg-success">{{ results[3] }}</dd>
              <dt class="text-xs text-fg-muted">Fáceis</dt>
            </div>
          </dl>

          <div class="flex flex-col items-center gap-3 w-full max-w-[300px]">
            <button
              @click="backHome"
              class="cursor-pointer rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold px-10 py-3.5 transition-colors w-full"
            >
              Voltar para o início
            </button>
            <button
              @click="undoLast"
              class="cursor-pointer text-sm text-fg-muted hover:text-fg-primary transition-colors"
            >
              Desfazer última avaliação
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex items-center gap-3 mb-8">
          <button
            @click="backHome"
            class="cursor-pointer flex items-center gap-1 text-sm text-fg-muted hover:text-fg-primary transition-colors"
            aria-label="Sair do estudo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Sair
          </button>
          <div
            class="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
            role="progressbar"
            :aria-valuenow="currentIndex"
            aria-valuemin="0"
            :aria-valuemax="totalCards"
            aria-label="Progresso da revisão"
          >
            <div class="h-full bg-primary-500 transition-all duration-300" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="text-sm font-medium text-fg-muted tabular-nums">
            {{ currentIndex + 1 }}/{{ totalCards }}
          </span>
        </div>

        <div class="flex justify-end gap-1 mb-2 -mt-4">
          <button
            @click="undoLast"
            :disabled="!canUndo"
            class="cursor-pointer text-sm text-fg-muted hover:text-fg-primary px-2 py-1 rounded-md transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:text-fg-muted"
            title="Desfazer última avaliação (Z)"
          >
            Desfazer
          </button>
          <button
            @click="openEditor"
            class="cursor-pointer text-sm text-fg-muted hover:text-fg-primary px-2 py-1 rounded-md transition-colors"
            title="Editar este card (E)"
          >
            Editar card
          </button>
        </div>

        <div class="flip-scene">
          <div class="flip-card grid" :class="{ 'is-flipped': showAnswer }">
            <div
              class="flip-face [grid-area:1/1] min-h-[260px] flex flex-col items-center justify-center text-center gap-3 rounded-3xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark shadow-sm px-8 py-10"
              :aria-hidden="showAnswer"
            >
              <span class="text-xs text-fg-muted">Pergunta</span>
              <p class="font-[family-name:var(--font-card)] text-2xl sm:text-3xl font-semibold leading-snug break-words max-w-full">
                {{ frontText }}
              </p>
              <ul v-if="currentCard.tags && currentCard.tags.length" class="flex flex-wrap justify-center gap-1.5 mt-1 list-none">
                <li
                  v-for="tag in currentCard.tags"
                  :key="tag"
                  class="text-xs text-fg-muted bg-gray-100 dark:bg-gray-800 rounded-full px-2.5 py-0.5"
                >
                  {{ tag }}
                </li>
              </ul>
            </div>

            <div
              class="flip-face flip-back [grid-area:1/1] min-h-[260px] flex flex-col items-center justify-center text-center gap-3 rounded-3xl border border-primary-500/30 bg-primary-50 dark:bg-primary-500/10 shadow-sm px-8 py-10"
              :aria-hidden="!showAnswer"
            >
              <span class="text-xs text-fg-primary">Resposta</span>
              <p class="font-[family-name:var(--font-card)] text-2xl sm:text-3xl font-semibold leading-snug break-words max-w-full text-primary-700 dark:text-white">
                {{ backText }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-8 min-h-[92px]">
          <button
            v-if="!showAnswer"
            @click="revealAnswer"
            class="cursor-pointer w-full rounded-2xl bg-primary-500 hover:bg-primary-600 text-white text-lg font-semibold px-10 py-4 transition-colors"
          >
            Mostrar resposta
            <span class="hidden sm:inline text-sm font-normal opacity-70 ml-2">Espaço</span>
          </button>

          <div v-else class="grid grid-cols-3 gap-3">
            <button
              v-for="rating in ratings"
              :key="rating.level"
              @click="evaluateCard(rating.level)"
              class="cursor-pointer flex flex-col items-center gap-0.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-gray-700 dark:text-gray-200 px-3 py-3 font-semibold transition-colors"
              :class="rating.classes"
            >
              <span class="text-base">{{ rating.label }}</span>
              <span v-if="currentCard.next_intervals" class="text-xs font-normal text-fg-muted">
                {{ formatInterval(currentCard.next_intervals[rating.field]) }}
              </span>
              <span v-else class="hidden sm:inline text-xs font-normal text-fg-muted">Tecla {{ rating.key }}</span>
            </button>
          </div>
        </div>
      </template>
    </div>

    <div
      v-if="editing"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-card-title"
      @click.self="editing = false"
    >
      <div class="w-full max-w-lg rounded-2xl bg-surface-light dark:bg-surface-dark border border-gray-100 dark:border-gray-800 shadow-2xl p-6 flex flex-col gap-4">
        <h2 id="edit-card-title" class="text-lg font-semibold">Editar card</h2>

        <label class="flex flex-col gap-1.5 text-sm font-medium">
          Frente
          <textarea
            ref="editFrontField"
            v-model="editFront"
            rows="3"
            maxlength="255"
            class="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 text-base font-normal resize-none focus:outline-0 focus:ring-2 focus:ring-primary-500/30"
          ></textarea>
        </label>

        <label class="flex flex-col gap-1.5 text-sm font-medium">
          Verso
          <textarea
            v-model="editBack"
            rows="3"
            maxlength="255"
            class="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-3 text-base font-normal resize-none focus:outline-0 focus:ring-2 focus:ring-primary-500/30"
          ></textarea>
        </label>

        <p v-if="editError" class="text-sm text-fg-error" role="alert">{{ editError }}</p>

        <div class="flex justify-end gap-3">
          <button
            @click="editing = false"
            class="cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="saveEdit"
            class="cursor-pointer rounded-lg bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 text-sm font-semibold transition-colors"
          >
            Salvar alterações
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
