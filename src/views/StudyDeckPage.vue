<template>
  <StudyDeck
    :cards="deckCards"
    @card-evaluated="onCardEvaluated"
    @study-finished="onStudyFinished"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import StudyDeck from '@/components/Card/StudyCard.vue';
import { useStore } from 'vuex';
import { defineProps } from 'vue';

const props = defineProps({
  deckId: String
});
const store = useStore();
const deckCards = computed(() => store.state.card.studyCards);

onMounted(async () => {
  await store.dispatch('card/fetchStudyCards', props.deckId);
});

async function onCardEvaluated({ card, level }) {
  await store.dispatch('card/reviewCard', { cardId: card.id, level });
}

function onStudyFinished() {
  // ação depois de estudar o deck
}
</script>
