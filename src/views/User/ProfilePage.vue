<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Mock do usuário
const user = ref({
  name: 'Usuário Exemplo',
  email: 'usuario@example.com',
  photo: '' // URL da foto ou vazio
})

const userPhoto = computed(() =>
  user.value.photo
    ? user.value.photo
    : 'https://www.gravatar.com/avatar/?d=mp'
)

function editProfile() {
  router.push({ name: 'EditProfile' })
}
</script>

<template>
  <div class="flex justify-center items-center px-4 py-10 bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
    <div class="w-full max-w-md bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col items-center gap-6 transition">
      <!-- Foto -->
      <div class="relative group">
        <img
          :src="userPhoto"
          alt="Foto de perfil"
          class="w-28 h-28 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 transition-transform group-hover:scale-105"
        />
        <button
          @click="editProfile"
          class="absolute bottom-0 right-0 p-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full border-2 border-white dark:border-gray-800"
          title="Editar foto"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 11l3.536-3.536a2 2 0 112.828 2.828L11.828 13.828a2 2 0 01-2.828 0L9 13m0 0l-2 2m2-2l2 2"/>
          </svg>
        </button>
      </div>

      <!-- Dados -->
      <div class="text-center space-y-1">
        <h1 class="text-xl font-semibold">{{ user.name }}</h1>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ user.email }}</p>
      </div>

      <!-- Botão -->
      <button
        @click="editProfile"
        class="flex items-center justify-center gap-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 transition-colors shadow"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 256 256">
          <path d="M227.31,72.69l-44-44a16,16,0,0,0-22.62,0L40,149.38V208a16,16,0,0,0,16,16h58.62L227.31,95.31A16,16,0,0,0,227.31,72.69ZM96,192H64V160l92-92,32,32Z"/>
        </svg>
        Editar Perfil
      </button>
    </div>
  </div>
</template>
