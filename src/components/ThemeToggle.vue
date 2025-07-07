<template>
  <button @click="toggleTheme" class="theme-toggle" :title="theme === 'dark' ? 'تم روشن' : 'تم تاریک'">
    <span v-if="theme === 'dark'">🌙</span>
    <span v-else>☀️</span>
  </button>
</template>

<script setup>
import { useTheme } from '../composables/useTheme';
const { theme, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-toggle {
  @apply p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-xl;
}
</style> 