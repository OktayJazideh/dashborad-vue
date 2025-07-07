<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-4">داشبورد ادمین</h1>
    <DashboardStats />
    <DashboardCharts />
  </div>
</template>

<script setup>
import DashboardStats from '../components/DashboardStats.vue';
import DashboardCharts from '../components/DashboardCharts.vue';
</script> 