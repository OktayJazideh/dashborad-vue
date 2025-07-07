<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-sm relative">
      <h2 class="text-xl font-bold mb-4">حذف کاربر</h2>
      <p>آیا از حذف کاربر <b>{{ user?.name || user?.email || user?.id }}</b> مطمئن هستید؟</p>
      <div class="flex justify-end gap-2 mt-6">
        <button type="button" class="btn bg-gray-400 hover:bg-gray-500" @click="$emit('close')">انصراف</button>
        <button type="button" class="btn bg-red-600 hover:bg-red-700" @click="onDelete">حذف</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../store/user';
const props = defineProps({ user: Object });
const emit = defineEmits(['close', 'deleted']);
const userStore = useUserStore();

async function onDelete() {
  const success = await userStore.deleteUser(props.user.id);
  if (success) emit('deleted', 'کاربر با موفقیت حذف شد!');
  else emit('deleted', userStore.error || 'خطا!');
}
</script>

<style scoped>
.btn {
  @apply bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition;
}
</style> 