<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue';
import confetti from 'canvas-confetti';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['card-evaluated', 'study-finished'])

const ratings = [
  { level: 1, label: 'Difícil', key: '1', classes: 'hover:border-accent-500 hover:text-accent-600 focus-visible:outline-accent-500' },
  { level: 2, label: 'Médio', key: '2', classes: 'hover:border-secondary-500 hover:text-fg-info focus-visible:outline-secondary-500' },
  { level: 3, label: 'Fácil', key: '3', classes: 'hover:border-success-500 hover:text-fg-success focus-visible:outline-success-500' }
]

const currentIndex = ref(0)
const showAnswer = ref(false)
const finished = ref(false)
const results = ref({ 1: 0, 2: 0, 3: 0 })

const totalCards = computed(() => props.cards.length)
const progress = computed(() => totalCards.value ? (finished.value ? 100 : (currentIndex.value / totalCards.value) * 100) : 0)
const currentCard = computed(() => props.cards[currentIndex.value])

watch(() => props.cards, () => {
  currentIndex.value = 0
  showAnswer.value = false
  finished.value = false
  results.value = { 1: 0, 2: 0, 3: 0 }
})

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

  showAnswer.value = false

  // espera o card desvirar antes de trocar o texto, para não vazar a próxima resposta
  advanceTimer = setTimeout(() => {
    if (currentIndex.value < totalCards.value - 1) {
      currentIndex.value++
    } else {
      finished.value = true
      emit('study-finished')
      launchConfetti()
    }
  }, 300)
}

let advanceTimer = null

function onKeydown(event) {
  if (finished.value || totalCards.value === 0) return
  if (event.metaKey || event.ctrlKey || event.altKey) return

  const onButton = event.target instanceof HTMLElement && event.target.closest('button, a')

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

          <button
            @click="backHome"
            class="cursor-pointer rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold px-10 py-3.5 transition-colors w-full max-w-[300px]"
          >
            Voltar para o início
          </button>
        </div>
      </template>

      <template v-else>
        <div class="flex items-center gap-4 mb-8">
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

        <div class="flip-scene">
          <div class="flip-card grid" :class="{ 'is-flipped': showAnswer }">
            <div
              :key="'front-' + currentIndex"
              class="flip-face [grid-area:1/1] min-h-[260px] flex flex-col items-center justify-center text-center gap-3 rounded-3xl border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark shadow-sm px-8 py-10"
              :aria-hidden="showAnswer"
            >
              <span class="text-xs text-fg-muted">Pergunta</span>
              <p class="font-[family-name:var(--font-card)] text-2xl sm:text-3xl font-semibold leading-snug break-words max-w-full">
                {{ currentCard.front_text }}
              </p>
            </div>

            <div
              class="flip-face flip-back [grid-area:1/1] min-h-[260px] flex flex-col items-center justify-center text-center gap-3 rounded-3xl border border-primary-500/30 bg-primary-50 dark:bg-primary-500/10 shadow-sm px-8 py-10"
              :aria-hidden="!showAnswer"
            >
              <span class="text-xs text-fg-primary dark:text-primary-100">Resposta</span>
              <p class="font-[family-name:var(--font-card)] text-2xl sm:text-3xl font-semibold leading-snug break-words max-w-full text-primary-700 dark:text-white">
                {{ currentCard.back_text }}
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
              <span class="hidden sm:inline text-xs font-normal text-fg-muted">Tecla {{ rating.key }}</span>
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
