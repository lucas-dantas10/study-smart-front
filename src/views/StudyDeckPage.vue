<template>
  <StudyDeck
    :cards="deckCards"
    @card-evaluated="onCardEvaluated"
    @review-undone="onReviewUndone"
    :save-card="onCardEdited"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import StudyDeck from '@/components/Card/StudyCard.vue';
import { useStore } from 'vuex';

const props = defineProps({
  deckId: String
});
const store = useStore();
const deckCards = computed(() => store.state.card.studyCards);

onMounted(async () => {
  await store.dispatch('card/fetchStudyCards', props.deckId);
});

// Avaliar e desfazer rodam em fila: um "desfazer" rápido não pode chegar ao servidor
// antes da avaliação que ele desfaz, senão apagaria a revisão anterior do card.
let queue = Promise.resolve();

function enqueue(task) {
  queue = queue.then(task).catch(() => {
    // o erro já foi publicado no store e aparece no modal; a fila segue funcionando
  });
}

function onCardEvaluated({ card, level }) {
  enqueue(() => store.dispatch('card/reviewCard', { cardId: card.id, level }));
}

function onReviewUndone({ card }) {
  enqueue(() => store.dispatch('card/undoReview', { cardId: card.id }));
}

async function onCardEdited({ card, front, back }) {
  await store.dispatch('card/updateCard', { cardId: card.id, front, back });
}
</script>
