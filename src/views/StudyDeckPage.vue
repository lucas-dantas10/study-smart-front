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
import { getCardsByStudy } from '@/services/card/cardService.js';
import { review } from '@/services/review/reviewService.js';
import { defineProps } from 'vue';

const props = defineProps({
  deckId: String
});
const deckCards = ref([]);

onMounted(async () => {
  const apiDecks = await getCardsByStudy(props.deckId);

  deckCards.value = apiDecks;
});

async function onCardEvaluated({ card, level }) {
  await review(card.id, level);
}

function onStudyFinished() {
  // ação depois de estudar o deck
}
</script>
