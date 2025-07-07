<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h3 class="mb-2 font-bold">نمودار سفارشات ماهانه</h3>
      <Bar :data="barData" :options="barOptions" />
    </div>
    <div class="bg-white dark:bg-gray-800 rounded shadow p-4">
      <h3 class="mb-2 font-bold">وضعیت سفارشات</h3>
      <Doughnut :data="doughnutData" :options="doughnutOptions" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useOrderStore } from '../store/order';
import { Bar, Doughnut } from 'vue-chartjs';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, ArcElement);

const orderStore = useOrderStore();

const months = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const barData = computed(() => {
  // فرض: فیلد createdAt تاریخ سفارش است
  const counts = Array(12).fill(0);
  orderStore.orders.forEach(o => {
    if (o.createdAt) {
      const d = new Date(o.createdAt);
      const m = d.getMonth();
      counts[m]++;
    }
  });
  return {
    labels: months,
    datasets: [
      {
        label: 'تعداد سفارشات',
        data: counts,
        backgroundColor: '#2563eb',
      },
    ],
  };
});
const barOptions = { responsive: true, plugins: { legend: { display: false } } };

const doughnutData = computed(() => {
  // فرض: فیلد status وضعیت سفارش است
  const statusMap = {};
  orderStore.orders.forEach(o => {
    const s = o.status || 'نامشخص';
    statusMap[s] = (statusMap[s] || 0) + 1;
  });
  return {
    labels: Object.keys(statusMap),
    datasets: [
      {
        data: Object.values(statusMap),
        backgroundColor: ['#2563eb', '#22c55e', '#f59e42', '#ef4444', '#a855f7'],
      },
    ],
  };
});
const doughnutOptions = { responsive: true };
</script> 