<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.app-bg {
  background: #fff;
  min-height: 100vh;
  font-family: 'Inter', 'Roboto', 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
}

.center-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza verticalmente */
  padding: 24px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  height: 64px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
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

.question {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
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
  width: 100%;
  max-width: 320px;
}

.show-answer-btn:hover {
  background: #1d4ed8;
}

.difficulty-btns {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 500px;
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
  margin-bottom: 8px;
  flex: 1 1 120px;
  min-width: 100px;
}

.diff-btn:hover {
  background: #e5e7eb;
}

/* Responsividade */
@media (max-width: 700px) {
  .navbar {
    padding: 0 12px;
    height: 56px;
  }
  .logo {
    font-size: 1.1rem;
  }
  .nav-menu {
    gap: 12px;
  }
  .profile-pic {
    width: 30px;
    height: 30px;
  }
  .question {
    font-size: 1.3rem;
    margin-bottom: 24px;
  }
  .show-answer-btn {
    font-size: 1rem;
    padding: 12px 0;
    max-width: 100%;
  }
  .difficulty-btns {
    gap: 12px;
    max-width: 100%;
  }
  .diff-btn {
    font-size: 0.95rem;
    padding: 12px 0;
    min-width: 80px;
  }
}

@media (max-width: 480px) {
  .center-content {
    padding: 8px;
  }
  .question {
    font-size: 1.1rem;
  }
  .show-answer-btn {
    font-size: 0.95rem;
    padding: 10px 0;
  }
  .diff-btn {
    font-size: 0.9rem;
    padding: 10px 0;
    min-width: 70px;
  }
}
</style>
