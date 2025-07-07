<script setup>
import ThemeToggle from './components/ThemeToggle.vue';
import LoadingOverlay from './components/LoadingOverlay.vue';
import { useUiStore } from './store';
import { computed } from 'vue';

const ui = useUiStore();
const showLoading = computed(() => ui.loading);
const showToast = computed(() => ui.toast);
const toastType = computed(() => ui.toastType);
</script>

<template>
  <div>
    <div class="flex justify-end p-4">
      <ThemeToggle />
    </div>
    <router-view />
    <LoadingOverlay v-if="showLoading" />
    <div v-if="showToast" :class="['fixed bottom-4 left-4 px-4 py-2 rounded shadow z-50', toastType === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white']">
      {{ ui.toast }}
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
