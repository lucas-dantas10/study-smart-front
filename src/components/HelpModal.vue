<template>
    <div v-if="show" class="fixed inset-0 bg-black opacity-90 flex items-center justify-center z-50" @click.self="close">
      <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-xl shadow-lg w-11/12 max-w-2xl p-6 relative">
        <div class="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 mb-4">
          <h2 class="text-xl font-bold">Como o Study Smart funciona?</h2>
          <button @click="close" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl leading-none">
            ×
          </button>
        </div>
  
        <div>
          <h3 class="text-lg font-semibold mb-2">Bem-vindo ao Study Smart!</h3>
          <p class="mb-4">Este aplicativo foi projetado para te ajudar a aprender e memorizar informações usando cartões de estudo.</p>
  
          <h4 class="text-md font-semibold mb-2">Como usar:</h4>
          <ul class="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Crie Decks:</strong> Organize seus cartões em categorias (decks). Por exemplo: "Matemática", "História", "Idiomas".</li>
            <li><strong>Adicione Cartões:</strong> Dentro de cada deck, adicione cartões com uma pergunta na frente e a resposta no verso.</li>
            <li><strong>Estude:</strong> O sistema apresentará os cartões em intervalos otimizados para maximizar a retenção, baseado no seu desempenho.</li>
            <li><strong>Avalie seu Conhecimento:</strong> Após ver a resposta, classifique o cartão como Fácil, Médio ou Difícil. Isso ajuda o algoritmo a decidir quando mostrar o cartão novamente.</li>
          </ul>
  
          <p class="leading-relaxed">Com o Study Smart, você pode gerenciar seus estudos de forma eficiente e garantir que as informações permaneçam frescas em sua memória.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    show: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  </script>
  