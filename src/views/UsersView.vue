<template>
  <div class="p-6">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
      <h1 class="text-2xl font-bold">مدیریت کاربران</h1>
      <div class="flex gap-2">
        <input v-model="search" type="text" placeholder="جستجو..." class="input" />
        <button @click="openAddModal" class="btn">افزودن کاربر</button>
      </div>
    </div>
    <div v-if="userStore.loading" class="text-center py-8">در حال بارگذاری...</div>
    <div v-else>
      <table class="min-w-full bg-white dark:bg-gray-800 rounded shadow overflow-x-auto">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col" class="py-2 px-4 border-b">{{ col }}</th>
            <th class="py-2 px-4 border-b">عملیات</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td v-for="col in columns" :key="col" class="py-2 px-4 border-b">
              <img v-if="col==='avatar'" :src="user[col]" class="w-8 h-8 rounded-full mx-auto" />
              <span v-else>{{ user[col] }}</span>
            </td>
            <td class="py-2 px-4 border-b flex gap-2">
              <button @click="openEditModal(user)" class="btn btn-sm bg-yellow-500 hover:bg-yellow-600">ویرایش</button>
              <button @click="openDeleteModal(user)" class="btn btn-sm bg-red-600 hover:bg-red-700">حذف</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="userStore.error" class="text-red-500 mt-4">{{ userStore.error }}</div>
    </div>
    <!-- Modals -->
    <UserModal v-if="showModal" :user="selectedUser" :mode="modalMode" @close="closeModal" @saved="onSaved" />
    <DeleteModal v-if="showDelete" :user="selectedUser" @close="closeDelete" @deleted="onDeleted" />
    <!-- Toast -->
    <div v-if="toast" :class="toastClass" class="fixed bottom-4 left-4 px-4 py-2 rounded shadow">{{ toast }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '../store/user';
import UserModal from '../components/UserModal.vue';
import DeleteModal from '../components/DeleteModal.vue';

const userStore = useUserStore();
const search = ref('');
const showModal = ref(false);
const showDelete = ref(false);
const selectedUser = ref(null);
const modalMode = ref('add');
const toast = ref('');
const toastClass = ref('bg-green-500 text-white');

onMounted(() => {
  userStore.fetchUsers();
});

const columns = computed(() => {
  if (userStore.users.length === 0) return [];
  return Object.keys(userStore.users[0]);
});

const filteredUsers = computed(() => {
  if (!search.value) return userStore.users;
  return userStore.users.filter(u =>
    Object.values(u).some(val => String(val).toLowerCase().includes(search.value.toLowerCase()))
  );
});

function openAddModal() {
  selectedUser.value = null;
  modalMode.value = 'add';
  showModal.value = true;
}
function openEditModal(user) {
  selectedUser.value = { ...user };
  modalMode.value = 'edit';
  showModal.value = true;
}
function closeModal() {
  showModal.value = false;
}
async function onSaved(msg) {
  showModal.value = false;
  await userStore.fetchUsers();
  toast.value = msg;
  toastClass.value = 'bg-green-500 text-white';
  setTimeout(() => (toast.value = ''), 2000);
}
function openDeleteModal(user) {
  selectedUser.value = { ...user };
  showDelete.value = true;
}
function closeDelete() {
  showDelete.value = false;
}
async function onDeleted(msg) {
  showDelete.value = false;
  await userStore.fetchUsers();
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