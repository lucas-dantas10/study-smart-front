<template>
  <StudyDeck
    :cards="deckCards"
    @card-evaluated="onCardEvaluated"
    @study-finished="onStudyFinished"
  />
</template>

<script setup>
import { ref } from 'vue';
import StudyDeck from '@/components/Card/StudyCard.vue';

// Mock: no app real, você vai carregar do backend com espaçamento
const deckCards = ref([
  { question: 'Qual a capital da França?', answer: 'Paris' },
  { question: 'Quem pintou a Mona Lisa?', answer: 'Leonardo da Vinci' },
  { question: 'Qual o maior oceano do mundo?', answer: 'Oceano Pacífico' }
]);

function onCardEvaluated({ card, level }) {
  console.log('Card avaliado:', card, 'Nível:', level)
  // Aqui você atualiza o agendamento da repetição espaçada
  // Pode chamar backend, localStorage, etc.
}

function onStudyFinished() {
  // ação depois de estudar o deck
}
</script>
