<template>
  <nav class="navbar">
    <div class="logo">
      <router-link to="/"><img src="@/assets/BMI-img.png" alt="BMI Logo" /></router-link>
      <!-- <router-link to="/">BMI App</router-link> -->
    </div>

    <ul class="nav-links">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/bmi">BMI Calculator</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <!-- <li><router-link to="/chat-with-ai">ChatBot</router-link></li> -->
      <!-- <li><router-link to="/image-upload-ai">Image Upload</router-link></li> -->
    </ul>

    <button class="menu-btn" @click="toggleMenu">☰</button>

    <ul v-if="isMenuOpen" class="mobile-menu">
      <li><router-link to="/" @click="toggleMenu">Home</router-link></li>
      <li><router-link to="/bmi" @click="toggleMenu">BMI Calculator</router-link></li>
      <li><router-link to="/about" @click="toggleMenu">About</router-link></li>
      <!-- <li><router-link to="/chat-with-ai">ChatBot</router-link></li>
      <li><router-link to="/image-upload-ai">Image Upload</router-link></li> -->
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<style scoped>
/* ✨ Modern Gradient Background */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #494e56, #727a85);
  /* background: linear-gradient(135deg, #1e3c72, #2a5298); */
  color: white;
  padding: 15px 20px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  height: 54px;
}

/* ✨ Stylish Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  height: 40px;
  width: 40px;
  border-radius: 50%; /* Rounded Logo */
  background: white;
  padding: 5px;
  box-shadow: 0px 2px 5px rgba(255, 255, 255, 0.3);
}

.logo a {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
}

/* ✨ Navigation Links */
.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-links li a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-links li a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ✨ Mobile Menu Button */
.menu-btn {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
}

/* ✨ Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 60px;
  right: 20px;
  background: rgba(30, 60, 114, 0.95);
  border-radius: 10px;
  padding: 15px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: fadeIn 0.3s ease-in-out;
}

.mobile-menu li a {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 8px 12px;
  border-radius: 5px;
  display: block;
}

.mobile-menu li a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* ✨ Responsive Design */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .menu-btn {
    display: block;
  }
}

/* ✨ Smooth Fade-in Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
