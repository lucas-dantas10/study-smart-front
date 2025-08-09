<script setup>
import { ref, watch, computed, defineEmits, defineProps } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['card-evaluated', 'study-finished'])

const currentIndex = ref(0)
const showAnswer = ref(false)
const finished = ref(false)

const totalCards = computed(() => props.cards.length)

watch(() => props.cards, () => {
  currentIndex.value = 0
  showAnswer.value = false
  finished.value = false
})

function toggleAnswer() {
  showAnswer.value = !showAnswer.value
}

function evaluateCard(level) {
  emit('card-evaluated', {
    card: props.cards[currentIndex.value],
    level
  })

  showAnswer.value = false

  if (currentIndex.value < totalCards.value - 1) {
    currentIndex.value++
  } else {
    finished.value = true
    emit('study-finished')
    launchConfetti()
  }
}

function restart() {
  currentIndex.value = 0
  showAnswer.value = false
  finished.value = false
}

function launchConfetti() {
  const duration = 4 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      clearInterval(interval)
      return
    }

    const particleCount = 50 * (timeLeft / duration)

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
  <div
    class="flex justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-12 min-h-screen"
  >
    <div class="flex flex-col items-center w-full max-w-[600px] px-4">
      <template v-if="totalCards === 0">
        <p class="text-center text-lg font-medium">Nenhum card para estudar 😕</p>
      </template>

      <template v-else>
        <transition name="fade-slide" mode="out-in">
          <div :key="finished ? 'finished' : currentIndex" class="w-full text-center">
            <template v-if="finished">
              <h1 class="text-4xl font-extrabold mb-4">🎉 Parabéns! 🎉</h1>
              <p class="text-lg mb-8">Você completou todos os cards deste deck.</p>
              <button
                @click="restart"
                class="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white text-lg px-10 py-4 rounded-xl cursor-pointer font-semibold transition-all duration-200 shadow-lg focus:outline-none max-w-[300px] w-full mx-auto"
              >
                Estudar novamente
              </button>
            </template>

            <template v-else>
              <div class="mb-4 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                Card {{ currentIndex + 1 }} de {{ totalCards }}
              </div>

              <h1 class="text-3xl font-bold mb-4 text-center leading-snug">
                {{ props.cards[currentIndex].front_text }}
              </h1>

              <transition name="fade-slide">
                <div
                  v-if="showAnswer"
                  class="w-full max-w-[300px] mx-auto bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-6 py-4 mb-6 text-center shadow"
                >
                  <p class="text-xl font-semibold">
                    {{ props.cards[currentIndex].back_text }}
                  </p>
                </div>
              </transition>

              <button
                @click="toggleAnswer"
                class="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 text-white text-lg px-10 py-4 rounded-xl mb-10 cursor-pointer font-semibold transition-all duration-200 shadow-lg focus:outline-none w-full max-w-[300px] mx-auto block"
                :aria-label="showAnswer ? 'Ocultar resposta' : 'Mostrar resposta'"
              >
                {{ showAnswer ? 'Ocultar resposta' : 'Mostrar resposta' }}
              </button>

              <div class="flex flex-wrap justify-center gap-4 w-full max-w-[600px] mx-auto">
                <button
                  @click="evaluateCard('easy')"
                  class="flex-1 min-w-[120px] border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base px-6 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Fácil
                </button>
                <button
                  @click="evaluateCard('medium')"
                  class="flex-1 min-w-[120px] border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base px-6 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Médio
                </button>
                <button
                  @click="evaluateCard('hard')"
                  class="flex-1 min-w-[120px] border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-base px-6 py-3 rounded-full font-medium cursor-pointer transition-colors duration-200 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Difícil
                </button>
              </div>
            </template>
          </div>
        </transition>
      </template>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
