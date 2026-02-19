<template>
  <div class="relative flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black">
      <!-- Glowing Background Effect -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20 blur-3xl"></div>

      <!-- Illustration -->
      <div class="w-80 md:w-96 mb-6 relative z-10">
          <img src="@/assets/not-f.png" alt="404 Not Found" class="w-full">
      </div>

      <!-- Text Content -->
      <h1 class="text-6xl font-bold text-white drop-shadow-lg">404</h1>
      <p class="text-lg text-gray-300 mt-2">
          Oops! The page you're looking for doesn't exist.
      </p>

      <!-- Home Button -->
      <router-link to="/" class="mt-6 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 
                text-white rounded-lg shadow-lg hover:scale-105 transition-all relative z-10">
          Go Home
      </router-link>
  </div>
</template>
