<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
      <h1 class="text-2xl font-bold">مدیریت سفارشات</h1>
      <div class="flex gap-2">
        <input v-model="search" type="text" placeholder="جستجو..." class="input" />
        <button @click="openAddModal" class="btn">افزودن سفارش</button>
      </div>
    </div>
    <div v-if="orderStore.loading" class="text-center py-8">در حال بارگذاری...</div>
    <div v-else>
      <table class="min-w-full bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col" class="py-2 px-4 border-b cursor-pointer" @click="sortBy(col)">
              {{ col }}
              <span v-if="sort.column === col">{{ sort.asc ? '▲' : '▼' }}</span>
            </th>
            <th class="py-2 px-4 border-b">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in paginatedOrders" :key="order.id">
            <td v-for="col in columns" :key="col" class="py-2 px-4 border-b">
              <span>{{ order[col] }}</span>
            </td>
            <td class="py-2 px-4 border-b flex gap-2">
              <button @click="openEditModal(order)" class="btn btn-sm bg-yellow-500 hover:bg-yellow-600">ویرایش</button>
              <button @click="openDeleteModal(order)" class="btn btn-sm bg-red-600 hover:bg-red-700">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div class="flex justify-center mt-4 gap-2">
        <button class="btn btn-sm" :disabled="page===1" @click="page--">قبلی</button>
        <span>صفحه {{ page }} از {{ totalPages }}</span>
        <button class="btn btn-sm" :disabled="page===totalPages" @click="page++">بعدی</button>
      </div>
      <div v-if="orderStore.error" class="text-red-500 mt-4">{{ orderStore.error }}</div>
    </div>
    <!-- Modals -->
    <OrderModal v-if="showModal" :order="selectedOrder" :mode="modalMode" @close="closeModal" @saved="onSaved" />
    <DeleteOrderModal v-if="showDelete" :order="selectedOrder" @close="closeDelete" @deleted="onDeleted" />
    <!-- Toast -->
    <div v-if="toast" :class="toastClass" class="fixed bottom-4 left-4 px-4 py-2 rounded shadow">{{ toast }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useOrderStore } from '../store/order';
import OrderModal from '../components/OrderModal.vue';
import DeleteOrderModal from '../components/DeleteOrderModal.vue';

const orderStore = useOrderStore();
const search = ref('');
const showModal = ref(false);
const showDelete = ref(false);
const selectedOrder = ref(null);
const modalMode = ref('add');
const toast = ref('');
const toastClass = ref('bg-green-500 text-white');
const sort = ref({ column: '', asc: true });
const page = ref(1);
const pageSize = 10;

onMounted(() => {
  orderStore.fetchOrders();
});

const columns = computed(() => {
  if (orderStore.orders.length === 0) return [];
  return Object.keys(orderStore.orders[0]);
});

const filteredOrders = computed(() => {
  let data = orderStore.orders;
  if (search.value) {
    data = data.filter(o =>
      Object.values(o).some(val => String(val).toLowerCase().includes(search.value.toLowerCase()))
    );
  }
  if (sort.value.column) {
    data = [...data].sort((a, b) => {
      if (a[sort.value.column] < b[sort.value.column]) return sort.value.asc ? -1 : 1;
      if (a[sort.value.column] > b[sort.value.column]) return sort.value.asc ? 1 : -1;
      return 0;
    });
  }
  return data;
});

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / pageSize));
const paginatedOrders = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredOrders.value.slice(start, start + pageSize);
});

function sortBy(col) {
  if (sort.value.column === col) {
    sort.value.asc = !sort.value.asc;
  } else {
    sort.value.column = col;
    sort.value.asc = true;
  }
}

function openAddModal() {
  selectedOrder.value = null;
  modalMode.value = 'add';
  showModal.value = true;
}
function openEditModal(order) {
  selectedOrder.value = { ...order };
  modalMode.value = 'edit';
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}
async function onSaved(msg) {
  showModal.value = false;
  await orderStore.fetchOrders();
  toast.value = msg;
  toastClass.value = 'bg-green-500 text-white';
  setTimeout(() => (toast.value = ''), 2000);
}
function openDeleteModal(order) {
  selectedOrder.value = { ...order };
  showDelete.value = true;
}
function closeDelete() {
  showDelete.value = false;
}
async function onDeleted(msg) {
  showDelete.value = false;
  await orderStore.fetchOrders();
  toast.value = msg;
  toastClass.value = 'bg-red-600 text-white';
  setTimeout(() => (toast.value = ''), 2000);
}
</script>

<style scoped>
.input {
  @apply px-3 py-2 border rounded focus:outline-none focus:ring dark:bg-gray-700 dark:text-white;
}
.btn {
  @apply bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition;
}
.btn-sm {
  @apply text-xs py-1 px-2;
}
</style> 