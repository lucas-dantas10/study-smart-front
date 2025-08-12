<template>
  <StudyDeck
    :cards="deckCards"
    @card-evaluated="onCardEvaluated"
    @study-finished="onStudyFinished"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StudyDeck from '@/components/Card/StudyCard.vue';
import { getCardsByDeckId } from '@/services/card/cardService.js';
import { defineProps } from 'vue';

const props = defineProps({
  deckId: String
});
const deckCards = ref([]);

onMounted(async () => {
  const apiDecks = await getCardsByDeckId(props.deckId);

  deckCards.value = apiDecks;
});

function onCardEvaluated({ card, level }) {
  console.log('Card avaliado:', card, 'Nível:', level)
  // Aqui você atualiza o agendamento da repetição espaçada
  // Pode chamar backend, localStorage, etc.
}

function onStudyFinished() {
  // ação depois de estudar o deck
}
</script>
