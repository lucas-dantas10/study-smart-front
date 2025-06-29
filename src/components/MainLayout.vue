<script setup>
</script>

<template>
  <div class="bg-white min-h-screen font-poppins flex flex-col">
    <nav class="flex justify-between items-center px-8 h-16 shadow-sm bg-white">
      <div class="font-bold text-lg tracking-wide">
        StudySmart
      </div>
      <div class="flex items-center gap-6">
        <router-link
          to="/"
          class="text-base text-gray-900 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Home
        </router-link>
        <router-link
          to="/decks"
          class="text-base text-gray-900 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Decks
        </router-link>
        <router-link
          to="/stats"
          class="text-base text-gray-900 font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          Estatísticas
        </router-link>
        <span class="text-xl cursor-pointer" aria-label="Configurações">⚙️</span>
        <img
          class="w-9 h-9 rounded-full object-cover border-2 border-gray-200"
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Profile"
          aria-label="Perfil do usuário"
        />
      </div>
    </nav>
    <main class="w-full flex flex-col flex-1">
      <router-view />
    </main>
  </div>
</template>
