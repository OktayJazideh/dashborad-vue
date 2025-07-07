<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div class="stat-card">
      <div class="stat-title">تعداد کاربران</div>
      <div class="stat-value">{{ usersCount }}</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">تعداد سفارشات</div>
      <div class="stat-value">{{ ordersCount }}</div>
    </div>
    <div class="stat-card">
      <div class="stat-title">جمع مبلغ سفارشات</div>
      <div class="stat-value">{{ totalAmount }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../store/user';
import { useOrderStore } from '../store/order';

const userStore = useUserStore();
const orderStore = useOrderStore();

const usersCount = computed(() => userStore.users.length);
const ordersCount = computed(() => orderStore.orders.length);
const totalAmount = computed(() => {
  if (!orderStore.orders.length) return 0;
  return orderStore.orders.reduce((sum, o) => sum + (parseFloat(o.price) || 0), 0).toLocaleString();
});
</script>

<style scoped>
.stat-card {
  @apply bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col items-center;
}
.stat-title {
  @apply text-gray-500 dark:text-gray-300 mb-2;
}
.stat-value {
  @apply text-3xl font-bold text-blue-600 dark:text-blue-400;
}
</style> 