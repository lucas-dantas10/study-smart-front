<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  id: { type: String, default: 'tags-input' },
  max: { type: Number, default: 8 }
});

const emit = defineEmits(['update:modelValue']);

const draft = ref('');

// mesma regra do servidor: minúsculas, espaços viram hífen, só letras, números e hífen
function normalize(raw) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .slice(0, 30);
}

function commit() {
  const tag = normalize(draft.value);
  draft.value = '';

  if (!tag || props.modelValue.includes(tag) || props.modelValue.length >= props.max) return;

  emit('update:modelValue', [...props.modelValue, tag]);
}

function remove(tag) {
  emit('update:modelValue', props.modelValue.filter(t => t !== tag));
}

function onKeydown(event) {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault();
    commit();
  } else if (event.key === 'Backspace' && !draft.value && props.modelValue.length) {
    remove(props.modelValue[props.modelValue.length - 1]);
  }
}
</script>

<template>
  <div>
    <div
      class="flex flex-wrap items-center gap-2 w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-surface-light dark:bg-surface-dark px-3 py-2 focus-within:ring-2 focus-within:ring-primary-500/20"
    >
      <span
        v-for="tag in modelValue"
        :key="tag"
        class="inline-flex items-center gap-1 rounded-full bg-primary-50 dark:bg-primary-500/15 text-fg-primary text-sm px-2.5 py-0.5"
      >
        {{ tag }}
        <button
          type="button"
          class="cursor-pointer leading-none text-base hover:text-fg-error"
          :aria-label="`Remover tag ${tag}`"
          @click="remove(tag)"
        >
          ×
        </button>
      </span>
      <input
        :id="id"
        v-model="draft"
        type="text"
        class="flex-1 min-w-[8rem] bg-transparent py-1 text-base focus:outline-none placeholder:text-fg-muted"
        :placeholder="modelValue.length >= max ? 'Limite de tags atingido' : 'Digite e pressione Enter'"
        :disabled="modelValue.length >= max"
        @keydown="onKeydown"
        @blur="commit"
      />
    </div>
    <p class="text-xs text-fg-muted mt-1">Até {{ max }} tags por card. Use para filtrar na busca.</p>
  </div>
</template>
