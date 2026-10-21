<template>
    <div v-if="show" class="fixed inset-0 bg-background-dark/80 backdrop-blur-sm flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="help-modal-title" @click.self="close" @keydown.esc="close">
      <div class="bg-surface-light dark:bg-surface-dark text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl w-11/12 max-w-2xl p-8 relative border border-gray-100 dark:border-gray-800">
        <div class="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
          <h2 id="help-modal-title" class="text-2xl font-bold text-fg-primary">Como o Study Smart funciona?</h2>
          <button @click="close" aria-label="Fechar ajuda" class="text-fg-muted hover:text-fg-primary transition-colors text-3xl leading-none cursor-pointer">
            ×
          </button>
        </div>
  
        <div>
          <h3 class="text-xl font-semibold mb-3 text-fg-primary">Bem-vindo ao Study Smart!</h3>
          <p class="mb-4">Este aplicativo foi projetado para te ajudar a aprender e memorizar informações usando cartões de estudo.</p>
  
          <h4 class="text-lg font-semibold mb-3 text-fg-info">Como usar:</h4>
          <ul class="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Crie Decks:</strong> Organize seus cartões em categorias (decks). Por exemplo: "Matemática", "História", "Idiomas".</li>
            <li><strong>Adicione Cartões:</strong> Dentro de cada deck, adicione cartões com uma pergunta na frente e a resposta no verso.</li>
            <li><strong>Estude:</strong> O sistema apresentará os cartões em intervalos otimizados para maximizar a retenção, baseado no seu desempenho.</li>
            <li><strong class="text-fg-primary">Avalie seu Conhecimento:</strong> Após ver a resposta, classifique o cartão como Difícil, Médio ou Fácil (atalhos 1, 2 e 3; Espaço mostra a resposta). Isso ajuda o algoritmo a decidir quando mostrar o cartão novamente.</li>
          </ul>
  
          <p class="leading-relaxed">Com o Study Smart, você pode gerenciar seus estudos de forma eficiente e garantir que as informações permaneçam frescas em sua memória.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, onMounted, onBeforeUnmount } from 'vue';
  
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

  const onKeydown = (e) => {
    if (e.key === 'Escape' && props.show) close();
  };

  onMounted(() => window.addEventListener('keydown', onKeydown));
  onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown));
  </script>
  