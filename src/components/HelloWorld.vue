<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="app-bg">
    <nav class="navbar">
      <div class="logo">StudySmart</div>
      <div class="nav-menu">
        <span class="menu-item">Home</span>
        <span class="menu-item">Decks</span>
        <span class="menu-item">Stats</span>
        <span class="icon" aria-label="Configurações">⚙️</span>
        <img class="profile-pic" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile" aria-label="Perfil do usuário" />
      </div>
    </nav>
    <main class="center-content">
      <h1 class="question">What is the capital of France?</h1>
      <button class="show-answer-btn" aria-label="Mostrar resposta">Show Answer</button>
      <div class="difficulty-btns">
        <button class="diff-btn" aria-label="Fácil">Easy</button>
        <button class="diff-btn" aria-label="Médio">Medium</button>
        <button class="diff-btn" aria-label="Difícil">Difficult</button>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');

.app-bg {
  background: #fff;
  min-height: 100vh;
  font-family: 'Poppins', 'Inter', 'Roboto', 'Montserrat', Arial, sans-serif;
  display: flex;
  flex-direction: column;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 64px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  background: #fff;
}

.logo {
  font-weight: 700;
  font-size: 1.3rem;
  letter-spacing: 1px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 24px;
}

.menu-item {
  font-size: 1rem;
  color: #222;
  font-weight: 500;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: background 0.2s;
}

.menu-item:hover {
  background: #f3f4f6;
}

.icon {
  font-size: 1.3rem;
  cursor: pointer;
}

.profile-pic {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #eee;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
}

.question {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 32px;
}

.show-answer-btn {
  background: #2563eb;
  color: #fff;
  font-size: 1.2rem;
  padding: 16px 40px;
  border: none;
  border-radius: 12px;
  margin-bottom: 36px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(37,99,235,0.08);
}

.show-answer-btn:hover {
  background: #1d4ed8;
}

.difficulty-btns {
  display: flex;
  gap: 24px;
}

.diff-btn {
  background: #f3f4f6;
  color: #222;
  font-size: 1rem;
  padding: 14px 36px;
  border: none;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}

.diff-btn:hover {
  background: #e5e7eb;
}
</style>
